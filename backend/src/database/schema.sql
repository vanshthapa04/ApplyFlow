CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS refresh_tokens CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS interviews CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS cover_letters CASCADE;
DROP TABLE IF EXISTS resumes CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS users CASCADE;

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

    location VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

----------------------------------------------------
-- RESUMES
----------------------------------------------------

CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    title VARCHAR(100) NOT NULL,

    file_url TEXT NOT NULL,

    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

----------------------------------------------------
-- COVER LETTERS
----------------------------------------------------

CREATE TABLE cover_letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    title VARCHAR(100) NOT NULL,

    content TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

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

    resume_id UUID,

    cover_letter_id UUID,

    role VARCHAR(255) NOT NULL,

    status VARCHAR(50) NOT NULL DEFAULT 'Applied',

    priority VARCHAR(20) DEFAULT 'Medium',

    salary VARCHAR(100),

    applied_date DATE,

    job_url TEXT,

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (company_id)
        REFERENCES companies(id)
        ON DELETE CASCADE,

    FOREIGN KEY (resume_id)
        REFERENCES resumes(id)
        ON DELETE SET NULL,

    FOREIGN KEY (cover_letter_id)
        REFERENCES cover_letters(id)
        ON DELETE SET NULL
);

----------------------------------------------------
-- INTERVIEWS
----------------------------------------------------

CREATE TABLE interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    application_id UUID NOT NULL,

    interview_date DATE NOT NULL,

    interview_time TIME NOT NULL,

    interview_type VARCHAR(50),

    meeting_link TEXT,

    interviewer VARCHAR(255),

    round VARCHAR(100),

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (application_id)
        REFERENCES applications(id)
        ON DELETE CASCADE
);

----------------------------------------------------
-- NOTES
----------------------------------------------------

CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    application_id UUID NOT NULL,

    content TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

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