declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Application configuration
      NODE_ENV?: 'development' | 'production' | 'test';
      PORT?: string;

      // JWT configuration
      JWT_SECRET?: string;

      // MongoDB configuration
      DB_HOST?: string;
      DB_USER?: string;
      DB_PASSWORD?: string;
      DB_NAME?: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
