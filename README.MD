# GuestBook Project

## Overview

This project is a GuestBook web application that enables users to submit and view messages through an Express.js server and a PostgreSQL database, interactively managed through a frontend built with HTML, CSS, and JavaScript.

## Features

### Functional Requirements

- **HTML Form Submission:** Users can submit messages via a form that sends data to an Express server, which then stores it in a PostgreSQL database. [Requirement Achieved ✅]
- **Responsive Design:** The application is designed to be responsive across various devices using CSS media queries, ensuring a consistent user experience on both mobile and desktop views. [Requirement Achieved ✅]
- **GET API Route:** The server includes a GET route (`/messages`) that fetches all stored messages from the database, displaying them on the frontend. [Requirement Achieved ✅]
- **POST API Route:** The frontend submits new messages to the server using a POST request, which are then stored in the database. [Requirement Achieved ✅]
- **Database Seeding:** Dummy data has been seeded into the database to demonstrate the application's functionality, viewable through the GET route. [Requirement Achieved ✅]

### Stretch Features

- **Form Validation:** The form includes client-side validation to ensure all fields are filled out correctly before submission. This is achieved through JavaScript functions that check each input field. [Partially Achieached 🔄]
- **Advanced Styling and UX:** The CSS file includes styles that enhance the user interface, such as dynamic colors, shadows, and layouts that adjust based on screen size. [Requirement Achieved ✅]
- **DELETE Route & Button:** A DELETE route is planned to allow users to remove messages, which will be accessible via a delete button next to each message. [Stretch Goal Pending ❌]
- **Like Feature:** A feature to allow users to like messages is planned for future implementation. [Stretch Goal Pending ❌]

## Project Setup -- If running on localhost

1. Clone the repository and navigate into the directory:
   ```bash
   git clone <repository-url>
   cd guestbook-project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   - `DATABASE_URL=<Your PostgreSQL connection string>`
4. Run the server:
   ```bash
   npm start
   ```

## Key Files and Their Roles

- **server.js:** Sets up the Express server, defines API routes, and connects to the PostgreSQL database.
- **index.html:** Contains the HTML structure for the guestbook form and display area.
- **style.css:** Provides the styling for the application, making it responsive and visually appealing.
- **app.js:** Manages frontend logic, including form submission, data retrieval, validation, and dynamic content updates.

## Reflection

### Achievements

🎯 The application meets all core requirements, providing a fully functional and responsive guestbook with a backend connection.

### Challenges

🏹 Implementing the DELETE and Like features were beyond the current scope but are planned as enhancements.

### Future Improvements

- Implement the DELETE functionality for messages.
- Add a Like feature for user interactions.
- Further enhance form validation for robust error handling and user feedback.
