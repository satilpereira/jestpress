DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'jestpress-test-db') 
    THEN 
        CREATE DATABASE "jestpress-test-db";
    END IF; 
END $$;
