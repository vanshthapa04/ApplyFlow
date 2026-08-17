# ApplyFlow

ApplyFlow is a full-stack Job Application Tracker that helps users manage their job applications, companies, interviews, and job-search progress from one place.

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Create, update, and delete job applications
- Manage companies
- Schedule and manage interviews
- Track application and interview statuses
- Online and offline interview modes
- Dashboard with application statistics
- Monthly application trend
- Application status distribution
- Recent applications
- Upcoming interviews

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- Axios
- Recharts
- Lucide React

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JSON Web Token
- Zod

## Architecture

```text
React + TypeScript
        |
        | REST API
        v
Express.js
        |
        v
Controllers
        |
        v
Services
        |
        v
Repositories
        |
        v
PostgreSQL
