import { supabaseAdmin } from './supabase';

export const initializeDatabase = async () => {
  try {
    // Check if tables exist by running a simple query
    const { error } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .limit(1);

    if (error && error.code === '42P01') {
      console.log('Database tables not found. Please run the migration scripts.');
      return false;
    }

    console.log('Database connection established successfully');
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
};

export const createTablesIfNotExists = async () => {
  // This would normally be handled by Supabase migrations
  // For development, we'll provide SQL scripts
  console.log('Please ensure the following tables exist in your Supabase database:');
  console.log('- profiles');
  console.log('- user_stats');
  console.log('Run the provided migration scripts in your Supabase dashboard');
};