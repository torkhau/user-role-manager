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

### UX Behavior

- **Auto-save on blur** — the role selection component (`Select`) automatically triggers a save operation when the user clicks outside the dropdown. This ensures that changes are applied immediately without requiring an explicit "Save" action.
- The update is sent to the backend via `PATCH /users/:id/roles`, and the application state reflects the new role assignment in real time.
- If the current user loses Admin rights during this interaction, the session updates instantly and editing capabilities are revoked.

###  Disclaimer

This is a pet project intended for educational and architectural exploration. As such:

- No `.env` file is used; sensitive values like passwords are stored in plain text for simplicity.
- The session mechanism is a simplified prototype and does not use secure JWT tokens.
- Authentication and role management are implemented for demonstration purposes only and should not be considered production-ready.

Future improvements may include:

- Secure password hashing and storage
- JWT-based session handling
- Environment variable management via `.env`
- Role-based guards and access control middleware

### Simulated Network Delay

To test how the application behaves under slow network conditions, a built-in delay mechanism is available.

- By default, all requests are executed without delay.
- To enable artificial delay, open: `frontend/src/core/const/const.ts` and set the following constant: `export const FAKE_DELAY = false;` to `export const FAKE_DELAY = true;`. This will apply a 3000ms delay to all frontend requests, allowing you to observe loading indicators and UX behavior under simulated latency.

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
### Screenshots
<img width="1873" height="826" alt="image" src="https://github.com/user-attachments/assets/85f1d49e-54e6-4e34-8756-959e54fccb88" />
<img width="1879" height="833" alt="image" src="https://github.com/user-attachments/assets/5cd43bb8-5941-4ba5-a622-ea50410b9684" />
<img width="913" height="744" alt="image" src="https://github.com/user-attachments/assets/6f52d110-4940-40a2-a51c-0d1317134f98" />


