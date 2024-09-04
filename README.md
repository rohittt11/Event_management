Event Management API Documentation
Overview
The Event Management API is designed to facilitate the creation, retrieval, updating and deletion of events. Users can also register for events, with a confirmation email sent upon successful registration. The API is built using Node.js and MongoDB and includes features such as data validation, error handling, pagination and file upload functionality using multer.
Technologies Used
•	Node.js: JavaScript runtime for building the server-side application.
•	Express.js: Web framework for building the RESTful API.
•	MongoDB: Database for storing event data and user registrations.
•	express-validator: Libraries for validating incoming data.
•	Multer: Middleware for handling file uploads.
•	Nodemailer: Module for sending confirmation emails.
•	ESLint: Linter for identifying and fixing problems in JavaScript code.
•	Prettier: Code formatter for consistent style.
API Endpoints
1. Create a New Event
•	Endpoint: POST /events
•	Description: Creates a new event.
•	Request Body:
Json
{
  "name": "Event Name",
  "description": "Event Description",
  "date": "YYYY-MM-DD",
  "location": "Event Location"
}
Response:
Success (201 Created):
json
{
  "id": "event_id",
  "name": "Event Name",
  "description": "Event Description",
  "date": "YYYY-MM-DD",
  "location": "Event Location"
}
Error (400 Bad Request):
json
{
  "error": "Invalid data"
}
2. Retrieve List of Events
•	Endpoint: GET /events
•	Description: Retrieves a list of events with pagination.
•	Query Parameters:
o	page: Page number (default: 1)
o	limit: Number of events per page (default: 4)
•	Response:
o	Success (200 OK):
json
{
  "events": [
    {
      "id": "event_id",
      "name": "Event Name",
      "description": "Event Description",
      "date": "YYYY-MM-DD",
      "location": "Event Location"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10
}
3. Retrieve Event Details by ID
•	Endpoint: GET /events/:id
•	Description: Retrieves event details by ID.
•	Response:
Success (200 OK):
json
{
  "id": "event_id",
  "name": "Event Name",
  "description": "Event Description",
  "date": "YYYY-MM-DD",
  "location": "Event Location"
}
Error (404 Not Found):
json
{
  "error": "Event not found"
}
4. Update Event Details
•	Endpoint: PUT /events/:id
•	Description: Updates event details by ID.
•	Request Body:
{
  "name": "Updated Event Name",
  "description": "Updated Event Description",
  "date": "YYYY-MM-DD",
  "location": "Updated Event Location"
}
Response:
Success (200 OK):
json
{
  "id": "event_id",
  "name": "Updated Event Name",
  "description": "Updated Event Description",
  "date": "YYYY-MM-DD",
  "location": "Updated Event Location"
}


Error (400 Bad Request):
json
{
  "error": "Invalid data"
}
5. Delete an Event
•	Endpoint: DELETE /events/:id
•	Description: Deletes an event by ID.
•	Response:
Success (204 No Content): No content is returned.
Error (404 Not Found):
json
{
  "error": "Event not found"
}
6. Register for an Event
•	Endpoint: POST /events/:id/register
•	Description: Registers a user for an event and sends a confirmation email.
•	Request Body:
json
{
  "name": "User Name",
  "email": "user@example.com"
}
•	Response:
Success (200 OK):
json
{
  "message": "Registration successful, confirmation email sent"
}
Error (400 Bad Request):
json
{
  "error": "Invalid data"
}
Database
•	Database: MongoDB
•	Schema:
o	Event: name, description, date, location
o	Registration: event_id, user_name, user_email
Validation
•	Libraries Used: express-validator
•	Validation Rules:
o	Ensure name, description, date, and location fields are provided for event creation.
o	Validate that the date is not in the past during creation or updating.
Error Handling
•	Proper error responses for invalid data, non-existent event IDs and failed email delivery.
•	Error handling for database operations and email sending.
Pagination
•	Implemented pagination for listing events with page and limit query parameters.
File Upload
•	Functionality: Upload event banners or images.
•	Implementation: Used multer for handling file uploads.
•	Challenges:
o	Handling large file sizes and ensuring efficient storage.
o	Validating file types and sizes to avoid security issues.
o	Managing file storage and retrieval efficiently.
Project Structure
•	Pattern: MVC (Model-View-Controller)
•	Directories:
o	models/ - Database models
o	controllers/ - Business logic
o	routes/ - API routes
o	middleware/ - Validation and error handling
o	config/ - Configuration files
Documentation
•	Detailed API documentation outlining endpoints, request/response formats, and error handling.
Code Quality
•	Linters: ESLint
•	Formatting: Prettier
•	Version Control: Git with meaningful commit messages
Images
•	Screenshots of Application: The images showcasing the application are included in the attached Word document.
1.	Home page
 
2.	Create event
 

3.	Details in Create-event
 




4.	All events list page
 

5.	Newly created event
 


6.	Get event by its id 
 

7.	Update event
 


8.	Location updated
 

9.	Updated event
 
10.	Register for an event
 

11.	Confirmation mail 
 


Thank you for considering my project. I appreciate the opportunity to showcase my work and look forward to any feedback or further discussion. Your time and consideration are greatly valued.
Also see my portfolio which is live now on Netlify
https://rohit-pawar.netlify.app/


