# Employee Management System - Frontend

Deployment Live Url 
Frontend - https://hrapps.netlify.app/
Backend - https://hrms-backend-dopd.onrender.com
This is the frontend part of the Employee Management System. It helps employees and admins manage attendance and leave requests.

## What it does
- Login and register users
- Mark attendance (check in/out)
- Apply for leave
- View leave history and summary
- Admin can approve/reject leaves and see employees and leaes and dashboard 

## Tech Used
- React (with Vite for fast development)
- Tailwind CSS (for nice styles)
- Axios (to talk to the backend)
- JWT (for secure login)

## How to Run

1. Go to the frontend folder:
 cd frontend
 
2. Install packages:
 npm install
 
3. Copy the example env file:
 cp .env.example .env
 
4. Start the app:
 npm run dev
 

The app will run at http://localhost:5173



Available Pages

Employee
Dashboard: Leave summary & recent attendance
Attendance: Clock In / Clock Out, view attendance history
Apply Leave: Submit new leave request
My Leaves: View pending/approved/rejected leave requests
Profile: View basic info & leave balance
Logout


Admin
Admin Dashboard: Approve/Reject leaves, view all employees and attendance
All pages above accessible according to role


AI Usage Declaration
ChatGPT was used for:
Boilerplate frontend setup
Debugging API integration errors (Clock In/Clock Out, leave approval/rejection)
All components, UI, styling, and integration with backend were implemented manually.

Time Spend:
2 days 
