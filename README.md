# Event Management API

## Overview

The Event Management API is a simple Node.js application that allows users to create, view, update, and delete events. It also supports user registrations for events and sends a confirmation email upon successful registration. This API is designed to manage event data efficiently and includes features such as pagination and file upload functionality for event images.

## Features

- **Create, Read, Update, Delete Events**: Manage events with CRUD operations.
- **Event Registration**: Users can register for events and receive a confirmation email.
- **Pagination**: Retrieve events with pagination for improved performance.
- **File Upload**: Support for uploading event banners or images.
- **Validation**: Ensures data integrity with validation checks.
- **Error Handling**: Proper error handling for invalid data and non-existent events.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for Node.js to handle HTTP requests.
- **MongoDB**: Database for storing event data and user registrations.
- **Joi/express-validator**: Libraries for validating incoming data.
- **Nodemailer**: Module for sending emails.
- **Multer**: Middleware for handling file uploads.
- **ESLint**: Tool for identifying and fixing problems in JavaScript code.
- **Prettier**: Code formatter for consistent styling.

## Installation

To get started with the Event Management API, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/event-management-api.git
   cd event-management-api
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory and add your environment variables:

   ```env
   MONGO_URI=mongodb://localhost:27017/eventdb
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
   ```

4. **Run the Application:**

   ```bash
   npm start
   ```

## API Endpoints

### Create Event

- **Endpoint**: `POST /events`
- **Request Body**: `{ "name": "Event Name", "description": "Event Description", "date": "Event Date", "location": "Event Location" }`
- **Response**: Event object with created details.

### Retrieve Events

- **Endpoint**: `GET /events`
- **Response**: List of events with pagination.

### Retrieve Event Details

- **Endpoint**: `GET /events/:id`
- **Response**: Event details by ID.

### Update Event

- **Endpoint**: `PUT /events/:id`
- **Request Body**: `{ "name": "Updated Name", "description": "Updated Description", "date": "Updated Date", "location": "Updated Location" }`
- **Response**: Updated event object.

### Delete Event

- **Endpoint**: `DELETE /events/:id`
- **Response**: Confirmation of deletion.

### Register for Event

- **Endpoint**: `POST /events/:id/register`
- **Request Body**: `{ "name": "User Name", "email": "user@example.com" }`
- **Response**: Registration confirmation email sent.

## Error Handling

- **Invalid Data**: Returns 400 Bad Request with error details.
- **Non-existent Event ID**: Returns 404 Not Found.
- **Failed Email Delivery**: Returns 500 Internal Server Error.

## Acknowledgements

Special thanks to the open-source communities and documentation authors whose tools and guidance were invaluable in developing this project.

## Thank You

Thank you for considering my project. I appreciate the opportunity to showcase my work and look forward to any feedback or further discussion.
