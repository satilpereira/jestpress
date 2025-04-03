SELECT 'CREATE DATABASE "jestpress-db"'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'jestpress-db')\gexec
