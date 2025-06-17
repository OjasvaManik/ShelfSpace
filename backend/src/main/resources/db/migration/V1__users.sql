CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       user_name VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       role VARCHAR(50) NOT NULL DEFAULT 'ROLE_PLEB',
                       profile_image TEXT,
                       is_banned BOOLEAN NOT NULL DEFAULT FALSE,
                       is_whitelisted BOOLEAN NOT NULL DEFAULT FALSE,
                       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
