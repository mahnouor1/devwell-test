import { optionalSessionMiddleware } from '../middleware/session.js';

// Simple AI-like responses based on user queries
const generateResponse = (message, context) => {
  const lowerMessage = message.toLowerCase().trim();

  // Greetings
  if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
    return "Hello! 👋 I'm DevWell, your development wellbeing assistant. How can I help you today?";
  }

  // What to work on next
  if (lowerMessage.includes('work on next') || lowerMessage.includes('what should i do') || lowerMessage.includes('next task')) {
    const repos = context?.githubData?.repos || 0;
    const commits = context?.githubData?.commits || 0;
    
    if (repos > 0) {
      return `Based on your GitHub activity, you have ${repos} repository${repos > 1 ? 'ies' : 'y'} with recent activity. I'd recommend:\n\n1. Review and merge any pending pull requests\n2. Address any open issues in your repositories\n3. Continue working on your most active project\n4. Update documentation for your projects\n\nWould you like me to help you prioritize specific tasks?`;
    } else {
      return "I don't see any GitHub repositories connected yet. Consider:\n\n1. Starting a new project\n2. Contributing to open source\n3. Setting up your development environment\n4. Learning a new technology\n\nConnect your GitHub account to get personalized recommendations!";
    }
  }

  // Weekly performance
  if (lowerMessage.includes('how am i doing') || lowerMessage.includes('this week') || lowerMessage.includes('performance') || lowerMessage.includes('progress')) {
    const commits = context?.insights?.commitsPastWeek || 0;
    const activeRepos = context?.insights?.activeRepos || 0;
    
    if (commits > 0) {
      return `Great work this week! 🎉\n\n📊 Your Stats:\n• ${commits} commit${commits > 1 ? 's' : ''} this week\n• ${activeRepos} active repository${activeRepos > 1 ? 'ies' : ''}\n\n${commits >= 10 ? "You're on fire! Keep up the momentum!" : commits >= 5 ? "You're making steady progress. Great job!" : "Every commit counts! Keep building!"}\n\nWould you like suggestions on how to improve your workflow?`;
    } else {
      return "I don't see much activity this week yet. That's okay! Here are some ideas to get started:\n\n1. Make your first commit of the week\n2. Review and update your projects\n3. Set up a new development goal\n4. Take a break if you need it - rest is important too!\n\nRemember, consistency is key. Even small commits add up!";
    }
  }

  // Block time / schedule
  if (lowerMessage.includes('block') || lowerMessage.includes('schedule') || lowerMessage.includes('time') || lowerMessage.includes('afternoon') || lowerMessage.includes('morning')) {
    return "I'd love to help you block time for coding! ⏰\n\nHere's what I recommend:\n\n1. **Deep Work Session** (2-3 hours)\n   - Turn off notifications\n   - Focus on one main task\n   - Take breaks every 45-60 minutes\n\n2. **Quick Tasks** (30-60 minutes)\n   - Code reviews\n   - Documentation updates\n   - Bug fixes\n\n3. **Learning Time** (1-2 hours)\n   - Explore new technologies\n   - Read documentation\n   - Watch tutorials\n\nWould you like me to suggest the best time based on your activity patterns?";
  }

  // Recent activity
  if (lowerMessage.includes('recent activity') || lowerMessage.includes('what have i done') || lowerMessage.includes('my activity')) {
    const commits = context?.githubData?.commits || 0;
    const repos = context?.githubData?.repos || 0;
    
    if (commits > 0 || repos > 0) {
      return `Here's a summary of your recent activity:\n\n📝 **Commits**: ${commits} recent commit${commits > 1 ? 's' : ''}\n📦 **Repositories**: ${repos} repository${repos > 1 ? 'ies' : ''} with activity\n\nCheck your dashboard for detailed information about your commits, repositories, and GitHub events. You can also see your recent commits in the left sidebar!\n\nWould you like specific details about any repository?`;
    } else {
      return "I don't see recent activity in your GitHub account. This could mean:\n\n1. You haven't made commits recently\n2. Your GitHub account isn't fully connected\n3. You're taking a well-deserved break\n\nConnect your GitHub account or start a new project to see your activity here!";
    }
  }

  // Top repositories
  if (lowerMessage.includes('top repos') || lowerMessage.includes('best repos') || lowerMessage.includes('favorite repos') || lowerMessage.includes('repositories')) {
    const repos = context?.githubData?.repos || 0;
    
    if (repos > 0) {
      return `You have ${repos} repository${repos > 1 ? 'ies' : ''} in your GitHub account! 🎉\n\nTo see your top repositories:\n1. Check the "Your Repositories" section on your dashboard\n2. Look for repositories with the most stars, forks, or recent activity\n3. Focus on repositories that align with your current goals\n\nWould you like help prioritizing which repositories to work on?`;
    } else {
      return "I don't see any repositories in your GitHub account yet. Here's how to get started:\n\n1. Create a new repository on GitHub\n2. Clone it to your local machine\n3. Make your first commit\n4. Push it back to GitHub\n\nOnce you have repositories, I can help you track and prioritize your work!";
    }
  }

  // Help / general
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you do') || lowerMessage.includes('capabilities')) {
    return "I'm DevWell, your development wellbeing assistant! I can help you with:\n\n✨ **Task Management**\n• Suggest what to work on next\n• Prioritize your tasks\n• Track your progress\n\n📊 **Insights & Analytics**\n• Review your weekly performance\n• Analyze your GitHub activity\n• Provide productivity insights\n\n⏰ **Time Management**\n• Block time for coding\n• Schedule focus sessions\n• Suggest optimal work times\n\n💡 **General Support**\n• Answer questions about your activity\n• Provide development tips\n• Help you stay productive\n\nJust ask me anything! Try: 'What should I work on next?' or 'How am I doing this week?'";
  }

  // Default response
  return `I understand you're asking about "${message}". Let me help you with that!\n\nI can assist you with:\n• Task recommendations\n• Performance insights\n• Time blocking\n• Repository information\n• General development questions\n\nTry asking:\n• "What should I work on next?"\n• "How am I doing this week?"\n• "Show me my recent activity"\n• Or ask me anything about your development workflow!`;
};

// Chat handler
async function chatHandler(req, res) {
  try {
    console.log('[Chat] Request received:', {
      method: req.method,
      path: req.path,
      body: req.body,
    });

    const { message, context } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      console.log('[Chat] Invalid message:', message);
      return res.status(400).json({
        success: false,
        error: 'Message is required',
      });
    }

    console.log('[Chat] Processing message:', message);
    
    // Generate response based on message and context
    const response = generateResponse(message, context || {});

    console.log('[Chat] Response generated, length:', response.length);

    res.json({
      success: true,
      response: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Chat] Error:', error);
    console.error('[Chat] Error stack:', error.stack);
    res.status(500).json({
      success: false,
      error: 'Failed to process chat message',
      message: error.message,
    });
  }
}

// Export with middleware
export default function chatRoute(req, res) {
  optionalSessionMiddleware(req, res, () => {
    chatHandler(req, res);
  });
}

