import { optionalSessionMiddleware } from '../../middleware/session.js';
import { getAuthData } from '../../db/saveAuthData.js';

/**
 * Generate GitHub insights and recommendations
 * Analyzes user's GitHub activity to provide personalized recommendations
 */
async function githubInsights(req, res) {
  try {
    // Check if user is authenticated
    if (!req.user || req.user.provider !== 'github') {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'GitHub authentication required',
      });
    }

    // Get auth data with GitHub data
    const authData = await getAuthData('github', req.user.user_id);
    
    if (!authData || !authData.profile?.github_data) {
      return res.status(404).json({
        error: 'GitHub data not found',
        message: 'Please complete GitHub authentication first',
      });
    }

    const githubData = authData.profile.github_data || {};
    const repos = githubData.repos || [];
    const events = githubData.events || [];
    const commits = githubData.commits || {};
    
    // If no repos/events data (due to limited scopes), return basic insights
    if (repos.length === 0 && events.length === 0) {
      return res.json({
        today: [],
        weeklyHighlights: {
          commitsPastWeek: 0,
          activeRepos: 0,
          totalRepos: 0,
          mostActiveRepo: null,
          mostActiveHour: null,
          eventsCount: 0,
        },
        recommendedTasks: [],
        activitySummary: {
          commitsPastWeek: 0,
          activeRepos: 0,
          totalRepos: 0,
          eventsPastWeek: 0,
          mostActiveHour: null,
        },
        message: 'Limited data available. Grant "repo" scope to see full insights.',
      });
    }

    // Analyze activity patterns
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Filter recent events
    const recentEvents = events.filter(e => {
      const eventDate = new Date(e.created_at);
      return eventDate >= oneWeekAgo;
    });

    // Count commits in past week
    let commitsPastWeek = 0;
    Object.values(commits).forEach(repoCommits => {
      if (Array.isArray(repoCommits)) {
        commitsPastWeek += repoCommits.filter(c => {
          const commitDate = new Date(c.commit?.author?.date || c.commit?.committer?.date);
          return commitDate >= oneWeekAgo;
        }).length;
      }
    });

    // Get active repos (updated in last week)
    const activeRepos = repos
      .filter(r => {
        const updatedAt = new Date(r.updated_at || r.pushed_at);
        return updatedAt >= oneWeekAgo;
      })
      .sort((a, b) => new Date(b.updated_at || b.pushed_at) - new Date(a.updated_at || a.pushed_at))
      .slice(0, 5);

    // Analyze push times to find patterns
    const pushTimes = [];
    recentEvents.forEach(event => {
      if (event.type === 'PushEvent') {
        const eventDate = new Date(event.created_at);
        pushTimes.push({
          hour: eventDate.getHours(),
          day: eventDate.getDay(),
        });
      }
    });

    // Find most active hour
    const hourCounts = {};
    pushTimes.forEach(pt => {
      hourCounts[pt.hour] = (hourCounts[pt.hour] || 0) + 1;
    });
    const mostActiveHour = Object.keys(hourCounts).reduce((a, b) => 
      hourCounts[a] > hourCounts[b] ? a : b, 9
    ); // Default to 9 AM if no data

    // Generate today's focus tasks
    const todayTasks = [];
    
    // Add tasks from active repos
    activeRepos.slice(0, 3).forEach(repo => {
      const repoCommits = commits[repo.full_name] || [];
      const recentCommits = repoCommits.filter(c => {
        const commitDate = new Date(c.commit?.author?.date || c.commit?.committer?.date);
        return commitDate >= oneDayAgo;
      });

      if (recentCommits.length > 0) {
        // Check if there are unfinished commits (commits without pushes)
        todayTasks.push({
          task: `Continue work on ${repo.name}`,
          repo: repo.name,
          repo_full_name: repo.full_name,
          time: `${mostActiveHour}:00-${parseInt(mostActiveHour) + 2}:00`,
          priority: 'high',
          reason: `${recentCommits.length} recent commit(s)`,
        });
      } else if (repo.pushed_at) {
        const lastPush = new Date(repo.pushed_at);
        const daysSincePush = (now - lastPush) / (1000 * 60 * 60 * 24);
        
        if (daysSincePush < 7) {
          todayTasks.push({
            task: `Review and update ${repo.name}`,
            repo: repo.name,
            repo_full_name: repo.full_name,
            time: `${mostActiveHour}:00-${parseInt(mostActiveHour) + 2}:00`,
            priority: 'medium',
            reason: `Last updated ${Math.floor(daysSincePush)} day(s) ago`,
          });
        }
      }
    });

    // Check for PR events
    const prEvents = recentEvents.filter(e => 
      e.type === 'PullRequestEvent' && e.payload?.action === 'opened'
    );
    
    prEvents.forEach(prEvent => {
      todayTasks.push({
        task: `Review PR in ${prEvent.repo}`,
        repo: prEvent.repo,
        time: '2:00-3:00 PM',
        priority: 'high',
        reason: 'Pending PR review',
      });
    });

    // Weekly highlights
    const weeklyHighlights = {
      commitsPastWeek,
      activeRepos: activeRepos.length,
      totalRepos: repos.length,
      mostActiveRepo: activeRepos[0]?.name || null,
      mostActiveHour: `${mostActiveHour}:00`,
      eventsCount: recentEvents.length,
    };

    // Recommended tasks (based on patterns)
    const recommendedTasks = [];
    
    // Suggest working on repos with recent activity
    activeRepos.slice(0, 2).forEach(repo => {
      recommendedTasks.push({
        task: `Focus on ${repo.name}`,
        repo: repo.name,
        reason: 'Most active repository this week',
        estimatedTime: '2-3 hours',
      });
    });

    // Suggest reviewing repos with no recent activity
    const staleRepos = repos
      .filter(r => {
        const updatedAt = new Date(r.updated_at || r.pushed_at);
        const daysSinceUpdate = (now - updatedAt) / (1000 * 60 * 60 * 24);
        return daysSinceUpdate > 30 && daysSinceUpdate < 90;
      })
      .slice(0, 2);

    staleRepos.forEach(repo => {
      recommendedTasks.push({
        task: `Review ${repo.name}`,
        repo: repo.name,
        reason: 'No activity in 30+ days',
        estimatedTime: '30 minutes',
      });
    });

    return res.json({
      today: todayTasks.slice(0, 5), // Limit to 5 tasks
      weeklyHighlights,
      recommendedTasks: recommendedTasks.slice(0, 4),
      activitySummary: {
        commitsPastWeek,
        activeRepos: activeRepos.length,
        totalRepos: repos.length,
        eventsPastWeek: recentEvents.length,
        mostActiveHour: `${mostActiveHour}:00`,
      },
    });
  } catch (error) {
    console.error('[GitHub Insights] Error:', error);
    return res.status(500).json({
      error: 'Failed to generate insights',
      message: error.message,
    });
  }
}

// Export with middleware
export default function githubInsightsRoute(req, res) {
  optionalSessionMiddleware(req, res, () => {
    githubInsights(req, res);
  });
}

