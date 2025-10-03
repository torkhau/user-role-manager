# Fullstack User Role Manager App

## Overview

This is a pet project demonstrating a fullstack architecture for managing user roles. It includes basic authentication, a prototype session mechanism, responsive design, and role-based access control.

## Tech Stack

- **Frontend**: React 19, Material UI
- **Backend**: NestJS, TypeORM
- **Database**: SQLite

## Key Features

- **User authentication** — basic login mechanism with session tracking
- **Responsive UI** — optimized for both desktop and mobile devices
- **Notification system** — displays real-time feedback for server responses and error handling
- **User list with role-based filtering** — ability to filter users by their assigned roles
- **Role editing (restricted to administrators)** — only users with Admin rights can modify roles
- **Loading indicators** — skeleton components are used to improve perceived performance during data fetching
- **Session prototype**:
  - Sessions are available to all authenticated users and last for 1 hour
  - Role-based access is enforced within the session: only active administrators can edit roles
  - If an administrator revokes their own rights, the session updates immediately and editing access is lost
- **Backend API (NestJS)**:
  - `GET /users` — fetches the list of users
  - `GET /roles` — retrieves available role types
  - `PATCH /users/:id/roles` — updates user roles; validates session and denies access if the current user is not an administrator
 
## Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/torkhau/user-role-manager.git
cd user-role-manager
```

### Prerequisites

Make sure you have the following installed:

- Node.js (version 22.18.0 or higher)
- npm or yarn

### Backend Setup
#### From the root of the project
Navigate to the backend folder
```bash
cd backend
```
Install dependencies
```bash
npm install
```
Run database migrations
```bash
npm run migration:init
```
This command will create a `data/` directory (if it doesn't exist) and generate a `database.sqlite` file inside it. This file serves as the local SQLite database used by the backend.

Run databaseseed
```bash
npm run seed:init
```
After running the seed script, the following tables will be populated:

Role table
| id | roleName |
|----|----------|
| 1  | Admin    |
| 2  | Editor   |
| 3  | Viewer   |

 User table
| id | username |     email        | password |
|----|----------|------------------|----------|
| 1  | David    | david@mail.com   | p4       |
| 2  | Charlie  | charlie@mail.com | p3       |
| 3  | Eve      | eve@mail.com     | p5       |
| 4  | Bob      | bob@mail.com     | p2       |
| 5  | Alice    | alice@mail.com   | p1       |

User-roles 
| Users    |     Roles      | 
|----------|----------------|
| David    | Editor         | 
| Charlie  | Viewer         |
| Eve      | Editor, Viewer |
| Bob      | Admin          |
| Alice    | Admin          |

Start the server
```bash
npm run start
```

### Frontend Setup
#### From the root of the project
Navigate to the frontend folder
```bash
cd frontend
```
Install dependencies
```bash
npm install
```
Start the development server
```bash
npm run dev
```
The frontend will launch on http://localhost:5173 by default. It communicates with the backend via REST API and uses session context to manage access control.
