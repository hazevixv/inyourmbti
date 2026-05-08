import { neon } from '@neondatabase/serverless';

// Lazy initialization - only create client when needed
let sql: ReturnType<typeof neon> | null = null;

function getSQL() {
  if (!sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set in environment variables');
    }
    sql = neon(process.env.DATABASE_URL);
  }
  return sql;
}

// Types
export interface User {
  id: string;
  email?: string;
  name?: string;
  gender?: string;
  age?: number;
  phone?: string;
  occupation?: string;
  interests?: string;
  self_mbti_type?: string;
  enneagram_type?: string;
  cognitive_functions_familiarity?: string;
  mbti_type?: string;
  created_at: Date;
  updated_at: Date;
}

export interface TestResult {
  id: string;
  user_id: string;
  mbti_type: string;
  variant: string;
  percentages: Record<string, number>;
  dominant_function: string;
  auxiliary_function: string;
  tertiary_function: string;
  inferior_function: string;
  test_date: Date;
  created_at: Date;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  mbti_type: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: Date;
}

export interface Analytics {
  id: string;
  event_type: string;
  event_data: Record<string, any>;
  user_id?: string;
  created_at: Date;
}

/**
 * Initialize database tables
 */
export async function initDatabase() {
  try {
    const sql = getSQL();
    
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        name TEXT,
        gender TEXT CHECK (gender IN ('male', 'female', 'other')),
        age INTEGER,
        phone TEXT,
        occupation TEXT,
        interests TEXT,
        mbti_type TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Safe migration: add columns if they don't exist
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS occupation TEXT`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS interests TEXT`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS age INTEGER`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS gender TEXT`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS self_mbti_type TEXT`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS enneagram_type TEXT`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS cognitive_functions_familiarity TEXT`;

    // Create test_results table
    await sql`
      CREATE TABLE IF NOT EXISTS test_results (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        mbti_type TEXT NOT NULL,
        variant TEXT NOT NULL,
        percentages JSONB NOT NULL,
        dominant_function TEXT NOT NULL,
        auxiliary_function TEXT NOT NULL,
        tertiary_function TEXT NOT NULL,
        inferior_function TEXT NOT NULL,
        test_date TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    // Create chat_messages table
    await sql`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        mbti_type TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    // Create analytics table
    await sql`
      CREATE TABLE IF NOT EXISTS analytics (
        id TEXT PRIMARY KEY,
        event_type TEXT NOT NULL,
        event_data JSONB NOT NULL,
        user_id TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `;

    // Create indexes for better performance
    await sql`CREATE INDEX IF NOT EXISTS idx_test_results_user_id ON test_results(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_test_results_mbti_type ON test_results(mbti_type)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at)`;

    console.log('✅ Database tables initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
}

/**
 * User Management
 */
export async function createUser(data: { 
  id: string; email?: string; name?: string; gender?: string; 
  age?: number; phone?: string; occupation?: string; interests?: string;
  self_mbti_type?: string; enneagram_type?: string; cognitive_functions_familiarity?: string;
  mbti_type?: string 
}) {
  try {
    const sql = getSQL();
    const result = await sql`
      INSERT INTO users (
        id, email, name, gender, age, phone, occupation, interests,
        self_mbti_type, enneagram_type, cognitive_functions_familiarity,
        mbti_type, created_at, updated_at
      )
      VALUES (
        ${data.id}, ${data.email || null}, ${data.name || null}, ${data.gender || null},
        ${data.age || null}, ${data.phone || null}, ${data.occupation || null}, ${data.interests || null},
        ${data.self_mbti_type || null}, ${data.enneagram_type || null}, ${data.cognitive_functions_familiarity || null},
        ${data.mbti_type || null}, NOW(), NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        email = COALESCE(EXCLUDED.email, users.email),
        name = COALESCE(EXCLUDED.name, users.name),
        gender = COALESCE(EXCLUDED.gender, users.gender),
        age = COALESCE(EXCLUDED.age, users.age),
        phone = COALESCE(EXCLUDED.phone, users.phone),
        occupation = COALESCE(EXCLUDED.occupation, users.occupation),
        interests = COALESCE(EXCLUDED.interests, users.interests),
        self_mbti_type = COALESCE(EXCLUDED.self_mbti_type, users.self_mbti_type),
        enneagram_type = COALESCE(EXCLUDED.enneagram_type, users.enneagram_type),
        cognitive_functions_familiarity = COALESCE(EXCLUDED.cognitive_functions_familiarity, users.cognitive_functions_familiarity),
        mbti_type = COALESCE(EXCLUDED.mbti_type, users.mbti_type),
        updated_at = NOW()
      RETURNING *
    `;
    return (result as any)[0] as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getUser(userId: string) {
  try {
    const sql = getSQL();
    const result = await sql`SELECT * FROM users WHERE id = ${userId}`;
    return (result as any)[0] as User | undefined;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

export async function updateUser(userId: string, data: Partial<User> & { gender?: string; phone?: string; occupation?: string; interests?: string }) {
  try {
    const sql = getSQL();
    const result = await sql`
      UPDATE users
      SET 
        email = COALESCE(${data.email || null}, email),
        name = COALESCE(${data.name || null}, name),
        gender = COALESCE(${data.gender || null}, gender),
        age = COALESCE(${data.age || null}, age),
        phone = COALESCE(${data.phone || null}, phone),
        occupation = COALESCE(${data.occupation || null}, occupation),
        interests = COALESCE(${data.interests || null}, interests),
        mbti_type = COALESCE(${data.mbti_type || null}, mbti_type),
        updated_at = NOW()
      WHERE id = ${userId}
      RETURNING *
    `;
    return (result as any)[0] as User;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

/**
 * Test Results Management
 */
export async function saveTestResult(data: {
  id: string;
  user_id: string;
  mbti_type: string;
  variant: string;
  percentages: Record<string, number>;
  dominant_function: string;
  auxiliary_function: string;
  tertiary_function: string;
  inferior_function: string;
  test_date: Date;
}) {
  try {
    const sql = getSQL();
    const result = await sql`
      INSERT INTO test_results (
        id, user_id, mbti_type, variant, percentages,
        dominant_function, auxiliary_function, tertiary_function, inferior_function,
        test_date, created_at
      )
      VALUES (
        ${data.id}, ${data.user_id}, ${data.mbti_type}, ${data.variant},
        ${JSON.stringify(data.percentages)},
        ${data.dominant_function}, ${data.auxiliary_function},
        ${data.tertiary_function}, ${data.inferior_function},
        ${data.test_date.toISOString()}, NOW()
      )
      RETURNING *
    `;
    return (result as any)[0] as TestResult;
  } catch (error) {
    console.error('Error saving test result:', error);
    throw error;
  }
}

export async function getTestResults(userId: string) {
  try {
    const sql = getSQL();
    const results = await sql`
      SELECT * FROM test_results
      WHERE user_id = ${userId}
      ORDER BY test_date DESC
    `;
    return results as TestResult[];
  } catch (error) {
    console.error('Error getting test results:', error);
    throw error;
  }
}

export async function getLatestTestResult(userId: string) {
  try {
    const sql = getSQL();
    const result = await sql`
      SELECT * FROM test_results
      WHERE user_id = ${userId}
      ORDER BY test_date DESC
      LIMIT 1
    `;
    return (result as any)[0] as TestResult | undefined;
  } catch (error) {
    console.error('Error getting latest test result:', error);
    throw error;
  }
}

/**
 * Chat Messages Management
 */
export async function saveChatMessage(data: {
  id: string;
  user_id: string;
  mbti_type: string;
  role: 'user' | 'assistant';
  content: string;
}) {
  try {
    const sql = getSQL();
    const result = await sql`
      INSERT INTO chat_messages (id, user_id, mbti_type, role, content, created_at)
      VALUES (${data.id}, ${data.user_id}, ${data.mbti_type}, ${data.role}, ${data.content}, NOW())
      RETURNING *
    `;
    return (result as any)[0] as ChatMessage;
  } catch (error) {
    console.error('Error saving chat message:', error);
    throw error;
  }
}

export async function getChatHistory(userId: string, limit: number = 50) {
  try {
    const sql = getSQL();
    const messages = await sql`
      SELECT * FROM chat_messages
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
    return (messages as ChatMessage[]).reverse(); // Return in chronological order
  } catch (error) {
    console.error('Error getting chat history:', error);
    throw error;
  }
}

/**
 * Analytics Management
 */
export async function trackEvent(data: {
  id: string;
  event_type: string;
  event_data: Record<string, any>;
  user_id?: string;
}) {
  try {
    const sql = getSQL();
    const result = await sql`
      INSERT INTO analytics (id, event_type, event_data, user_id, created_at)
      VALUES (${data.id}, ${data.event_type}, ${JSON.stringify(data.event_data)}, ${data.user_id || null}, NOW())
      RETURNING *
    `;
    return (result as any)[0] as Analytics;
  } catch (error) {
    console.error('Error tracking event:', error);
    throw error;
  }
}

export async function getAnalytics(eventType?: string, startDate?: Date, endDate?: Date) {
  try {
    const sqlClient = getSQL();
    let results;
    
    if (eventType && startDate && endDate) {
      results = await sqlClient`
        SELECT * FROM analytics 
        WHERE event_type = ${eventType}
        AND created_at >= ${startDate.toISOString()} 
        AND created_at <= ${endDate.toISOString()}
        ORDER BY created_at DESC 
        LIMIT 1000
      `;
    } else if (eventType) {
      results = await sqlClient`
        SELECT * FROM analytics 
        WHERE event_type = ${eventType}
        ORDER BY created_at DESC 
        LIMIT 1000
      `;
    } else if (startDate && endDate) {
      results = await sqlClient`
        SELECT * FROM analytics 
        WHERE created_at >= ${startDate.toISOString()} 
        AND created_at <= ${endDate.toISOString()}
        ORDER BY created_at DESC 
        LIMIT 1000
      `;
    } else {
      results = await sqlClient`
        SELECT * FROM analytics 
        ORDER BY created_at DESC 
        LIMIT 1000
      `;
    }
    
    return results as Analytics[];
  } catch (error) {
    console.error('Error getting analytics:', error);
    throw error;
  }
}

/**
 * Statistics
 */
export async function getStatistics() {
  try {
    const sql = getSQL();
    const totalUsersResult = await sql`SELECT COUNT(*) as count FROM users`;
    const totalTestsResult = await sql`SELECT COUNT(*) as count FROM test_results`;
    const totalChatsResult = await sql`SELECT COUNT(*) as count FROM chat_messages`;
    
    const totalUsers = (totalUsersResult as any)[0];
    const totalTests = (totalTestsResult as any)[0];
    const totalChats = (totalChatsResult as any)[0];
    
    const mbtiDistribution = await sql`
      SELECT mbti_type, COUNT(*) as count
      FROM test_results
      GROUP BY mbti_type
      ORDER BY count DESC
    `;
    
    const recentTests = await sql`
      SELECT DATE(test_date) as date, COUNT(*) as count
      FROM test_results
      WHERE test_date >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(test_date)
      ORDER BY date DESC
    `;
    
    return {
      totalUsers: parseInt(totalUsers.count as string),
      totalTests: parseInt(totalTests.count as string),
      totalChats: parseInt(totalChats.count as string),
      mbtiDistribution,
      recentTests
    };
  } catch (error) {
    console.error('Error getting statistics:', error);
    throw error;
  }
}

/**
 * Cleanup old data (optional, for maintenance)
 */
export async function cleanupOldData(daysToKeep: number = 90) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    const sql = getSQL();
    await sql`DELETE FROM analytics WHERE created_at < ${cutoffDate.toISOString()}`;
    
    console.log(`✅ Cleaned up analytics older than ${daysToKeep} days`);
    return { success: true };
  } catch (error) {
    console.error('Error cleaning up old data:', error);
    throw error;
  }
}
