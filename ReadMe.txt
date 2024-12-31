# Interactive Login Page

This is an interactive login page built with **HTML**, **CSS**, **JavaScript**, **npm**, and **Express**. The project features a login form that interacts with a backend database, providing functionality for user authentication and session management.

## Features

- **Responsive Design**: The login page is fully responsive, ensuring a seamless experience across different devices.
- **User Authentication**: Users can log in with their credentials. The credentials are validated through the backend connected to a native database.
- **Backend Integration**: The backend is powered by **Express.js**, with a database to store and retrieve user information.

## Technologies Used

- **HTML**: For the structure of the login page.
- **CSS**: For styling and creating a responsive layout.
- **JavaScript**: For form validation and dynamic interactions on the frontend and backend.
- **npm**: For managing dependencies and scripts.
- **Express.js**: For creating the backend server and handling requests.

### How it works
Frontend: The login form is built using HTML and styled with CSS. JavaScript is used to validate the form before submission, ensuring the user enters valid credentials.
Backend: The backend is built with Express.js, which listens for POST requests from the login form. It checks the user credentials against the database and returns a response indicating whether the login is successful.
Database: The database stores user information such as usernames and hashed passwords. The backend retrieves the information to validate the user's credentials.
## Setup Instructions

Follow these steps to set up the project on your local machine.

**1. Clone the repository and Navigate to the Backend File**
```bash
git clone https://github.com/JSCOTT40/LoginPage.git
cd LoginPage/Backend
```
**2. Install Dependencies and run the Server**
```bash
npm install
npm run 
```
**3. Navigate to Login Page**
```bash
http://localhost:3000
```
