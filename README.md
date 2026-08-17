# ApplyFlow

ApplyFlow is a full-stack Job Application Tracker designed to help job seekers manage applications, companies, interviews, and overall job-search progress from one place.

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Application management
- Company management
- Interview scheduling and tracking
- Interview editing and deletion
- Application status tracking
- Dashboard statistics
- Monthly application trends
- Application status distribution
- Recent applications
- Upcoming interviews
- Online and offline interview modes
- Responsive dashboard interface
- PostgreSQL data persistence

## Dashboard

The dashboard provides a centralized overview of the user's job search, including:

- Total Applications
- Interviews
- Offers
- Success Rate
- Monthly Applications
- Status Distribution
- Recent Applications
- Upcoming Interviews

## Application Management

Users can create and manage their job applications.

Each application can contain information such as:

- Job title
- Company
- Application date
- Application status
- Notes and other relevant information

Supported application operations:

- Create application
- View applications
- Update application
- Delete application

## Company Management

ApplyFlow allows users to maintain information about companies they are applying to.

Users can:

- Add companies
- Edit companies
- Delete companies
- Associate companies with applications

## Interview Management

ApplyFlow includes a complete interview scheduling and tracking system.

Users can:

- Schedule interviews
- Edit interviews
- Delete interviews
- Select an application
- Specify the interview round
- Add interviewer name
- Select date and time
- Select interview mode
- Add meeting links
- Add physical locations
- Track interview status

### Interview Modes

- Online
- Offline

### Interview Statuses

- Scheduled
- Completed
- Cancelled
- Rescheduled

## Authentication

ApplyFlow uses JWT-based authentication to protect user data and API endpoints.

Authentication includes:

- User registration
- User login
- JWT token authentication
- Protected frontend routes
- User-specific application data
- User-specific company data
- User-specific interview data

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
- date-fns
- Sonner

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Zod
- JSON Web Token

### Database

- PostgreSQL

## Architecture

ApplyFlow follows a layered backend architecture:

```text
Frontend
   │
   ▼
REST API
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
PostgreSQL
