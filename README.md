<img width="1919" height="932" alt="Screenshot 2025-08-08 123324" src="https://github.com/user-attachments/assets/da8e540c-362d-45de-a65e-f62628fda3e9" />

TaskTogether
LiveLink: https://a11-tasktogether.web.app/

**Project Description**

TaskTogether is a collaborative assignment management platform designed to streamline the process of creating, distributing, and submitting assignments. It provides robust user authentication, a clean user interface, and essential features for both assignment creators and participants.

**Features**

**1. User Authentication:**
- Email & Password: Secure registration and login.
- Google Login: Seamless sign-in using Google accounts.
- Password Reset: Easy recovery of forgotten passwords via email prompt.
- Logout Confirmation: SweetAlert2 integration for a confirming logout experience.

**2.Assignment Management:**
- Home Page: Overview or landing page.
- All Assignments: Browse and view available assignments.
- Create Assignments (Authenticated): Users can create new assignments with various details.
- My Submissions (Authenticated): Track and manage submitted assignments.
- Pending Assignments (Authenticated): View assignments awaiting submission or evaluation.

**3.User Profile:**
- Update Profile (Authenticated): Users can update their display name and profile picture.
  
**4.Theming:**
- Dark/Light Mode Toggle: Switch between light and dark themes for improved user experience.
  
**5.Responsive Design:**
- Dynamic Navbar: Adapts to different screen sizes with a responsive hamburger menu for mobile and a full menu for desktop.
- "More" Dropdown: A dedicated dropdown in the navbar (for both desktop and mobile) for additional links like "About Us," "Contact," "Jobs," and "Press Kit," accessible to all users.
  
**6.Interactive UI:**
- React Toastify: Provides clear and non-intrusive feedback messages for user actions (success, error, info).
- Framer Motion: Subtle animations for UI elements for a smoother experience.

**Technologies Used**

**Frontend**:
- React
- Vite for tooling
- React Router DOM for routing
- Tailwind CSS for utility-first CSS styling
- DaisyUI as a Tailwind CSS component library
- Framer Motion for animations
- React Toastify for notifications
- SweetAlert2 for beautiful, customizable alerts
  
**Backend (Authentication):**
- Firebase Authentication (for email/password, Google Sign-In, password reset)
  
**Other:**
- Context API for state management (AuthContext)
