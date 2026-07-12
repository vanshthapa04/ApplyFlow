CREATE EXTENSION IF NOT EXISTS pgcrypto;

----------------------------------------------------
-- DROP TABLES
----------------------------------------------------

DROP TABLE IF EXISTS refresh_tokens CASCADE;
DROP TABLE IF EXISTS interviews CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS cover_letters CASCADE;
DROP TABLE IF EXISTS resumes CASCADE;

----------------------------------------------------
-- USERS
----------------------------------------------------

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

----------------------------------------------------
-- COMPANIES
----------------------------------------------------

CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    name VARCHAR(255) NOT NULL,

    website VARCHAR(255),

    industry VARCHAR(100),

    location VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

----------------------------------------------------
-- APPLICATIONS
----------------------------------------------------

CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    company_id UUID NOT NULL,

    job_title VARCHAR(255) NOT NULL,

    job_type VARCHAR(100),

    location VARCHAR(255),

    salary NUMERIC(12,2),

    application_date DATE NOT NULL DEFAULT CURRENT_DATE,

    status VARCHAR(50) NOT NULL DEFAULT 'Applied',

    job_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (company_id)
        REFERENCES companies(id)
        ON DELETE CASCADE
);

----------------------------------------------------
-- INTERVIEWS
----------------------------------------------------

CREATE TABLE interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    application_id UUID NOT NULL,

    round VARCHAR(100) NOT NULL,

    interviewer_name VARCHAR(255),

    interview_date TIMESTAMP NOT NULL,

    mode VARCHAR(20) NOT NULL,

    meeting_link TEXT,

    location VARCHAR(255),

    status VARCHAR(50) NOT NULL DEFAULT 'Scheduled',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (application_id)
        REFERENCES applications(id)
        ON DELETE CASCADE
);

----------------------------------------------------
-- REFRESH TOKENS
----------------------------------------------------

CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    token TEXT NOT NULL,

    expires_at TIMESTAMP NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);