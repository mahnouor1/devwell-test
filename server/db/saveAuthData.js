import { writeFile, readFile, mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database file path (JSON file for now)
const DB_DIR = join(__dirname, '../../data');
const DB_FILE = join(DB_DIR, 'auth_data.json');

/**
 * Initialize database file if it doesn't exist
 */
async function initDB() {
  try {
    await mkdir(DB_DIR, { recursive: true });
    try {
      await readFile(DB_FILE, 'utf-8');
    } catch {
      // File doesn't exist, create it
      await writeFile(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

/**
 * Read all auth data from database
 * @returns {Promise<Array>} Array of auth records
 */
async function readDB() {
  await initDB();
  try {
    const content = await readFile(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading database:', error);
    return [];
  }
}

/**
 * Write auth data to database
 * @param {Array} data - Array of auth records
 */
async function writeDB(data) {
  await initDB();
  await writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Save authentication data to database
 * @param {Object} authData - Authentication data to save
 * @param {string} authData.provider - "slack" or "github"
 * @param {string} authData.access_token - OAuth access token
 * @param {string} [authData.refresh_token] - Refresh token (if available)
 * @param {string} authData.user_id - User ID from provider
 * @param {string} [authData.team_id] - Team ID (for Slack)
 * @param {string} [authData.scope] - OAuth scopes
 * @param {number} [authData.expires_in] - Token expiration time in seconds
 * @param {Object} [authData.profile] - User profile data
 * @returns {Promise<Object>} Saved auth record
 */
export async function saveAuthData(authData) {
  const {
    provider,
    access_token,
    refresh_token,
    user_id,
    team_id,
    scope,
    expires_in,
    profile,
  } = authData;

  if (!provider || !access_token || !user_id) {
    throw new Error('Missing required fields: provider, access_token, user_id');
  }

  const records = await readDB();
  
  // Find existing record for this provider + user_id (and team_id for Slack)
  const existingIndex = records.findIndex(record => {
    if (record.provider !== provider) return false;
    if (record.user_id !== user_id) return false;
    if (provider === 'slack' && record.team_id !== team_id) return false;
    return true;
  });

  const authRecord = {
    provider,
    access_token,
    refresh_token: refresh_token || null,
    user_id,
    team_id: team_id || null,
    scope: scope || null,
    expires_in: expires_in || null,
    expires_at: expires_in ? new Date(Date.now() + expires_in * 1000).toISOString() : null,
    profile: profile || null,
    created_at: existingIndex >= 0 ? records[existingIndex].created_at : new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    // Update existing record
    records[existingIndex] = authRecord;
  } else {
    // Add new record
    records.push(authRecord);
  }

  await writeDB(records);
  return authRecord;
}

/**
 * Get auth data by provider and user_id
 * @param {string} provider - "slack" or "github"
 * @param {string} user_id - User ID
 * @param {string} [team_id] - Team ID (for Slack)
 * @returns {Promise<Object|null>} Auth record or null
 */
export async function getAuthData(provider, user_id, team_id = null) {
  const records = await readDB();
  return records.find(record => {
    if (record.provider !== provider) return false;
    if (record.user_id !== user_id) return false;
    if (provider === 'slack' && record.team_id !== team_id) return false;
    return true;
  }) || null;
}

/**
 * Get all auth data for a provider
 * @param {string} provider - "slack" or "github"
 * @returns {Promise<Array>} Array of auth records
 */
export async function getAllAuthData(provider) {
  const records = await readDB();
  return records.filter(record => record.provider === provider);
}

