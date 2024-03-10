# Airtribe Course Management System

This repository contains the server-side code and database design for the Airtribe Course Management System. This system allows instructors to create and manage courses, learners to register for courses, and instructors to interact with leads (learner applications).

## Setup Instructions

Follow these steps to set up and run the server:

1. Clone this repository to your local machine.
2. Create a `.env` file in the root directory of the project and add the following environment variables:

   ```
    PORT=<YOUR-SERVER-PORT>
    DATABASE_USER_PASSWORD<YOUR-MYSQL-USERPASSWORD>
    DATABASE_USER=<YOUR-MYSQL-USERNAME>
    DATABASE_HOST=localhost
    DATABASE_DATABASENAME=airtribe
    DB_PORT = 3306

    MYSQLDB_USER=<MYSQL-IMAGE-USER(root)>
    MYSQLDB_ROOT_PASSWORD=<MYSQL-IMAGE-PASSWORD>
    MYSQLDB_DATABASE=airtribe
    MYSQLDB_LOCAL_PORT=3307
    MYSQLDB_DOCKER_PORT=3306

    NODE_DOCKER_PORT=<DOCKER-SERVER-PORT>
   ```

3. Make sure you have Docker and Docker Compose installed on your machine.
4. Run the following command to start the Docker container:
   ```
   docker-compose up
   ```
5. Once the Docker container is up and running, the server should be accessible.
6. Run the following command to stop the Docker container:
   ```
   docker-compose down
   ```

# Server APIs

## Instructors API Routes

### Get All Instructors API

- **URL:** `/api/v1/instructors`
- **Method:** GET
- **Response:** Returns a list of all instructors.

### Create Instructor API

- **URL:** `/api/v1/new/instructor`
- **Method:** POST
- **Request Body:**
  ```
  {
      "name": "<course-name>",
      "email":"<instructor email>",
      "Phone Number:"<instructor phone>"
  }
  ```
- **Response:** Returns the newly created course object.

### Get Single Instructor Detail API

- **URL:** `/api/v1/instructor/:id`
- **Method:** GET
- ***Important:** Make sure the id passed here is created in the database.*
- **Response:** Returns a details of instructor as a object.

### Update Course Details API

- **URL:** `/api/v1/instructor/:id`
- **Method:** PUT
- ***Important:** Make sure the id passed here is created in the database.*
- **Request Body:**
  ```
  {
      "name": "Updated instructor Name",
      "email":"<instructor email>",
      "Phone Number:"<instructor phone>"
  }
  ```
- **Response:** Returns the updated course object.

### Get all Courses by the instructor

- **URL:** `/api/v1/course/:id`
- **Method:** GET
- ***Important:** Make sure the id passed here is created in the database*
- **Response:** Returns all the courses by the instructor.

## Course API Routes

### Get All Courses API

- **URL:** `/api/v1/courses`
- **Method:** GET
- **Response:** Returns a list of courses object.

### Create Course API

- **URL:** `/api/v1/new/course`
- **Method:** POST
- ***Important:** First make sure the instructor_id passed here is created in the database.*
- **Request Body:**
  ```
  {
      "name": "<course-name>",
      "max_seats": 30,
      "start_date": "2024-04-01",
      "instructor_id": "instructor_id_here"
  }
  ```
- **Response:** Returns the newly created course object.

### Get Single Course Detail API

- **URL:** `/api/v1/course/:id`
- **Method:** GET
- ***Important:** Make sure the id passed here is created in the database.*
- **Response:** Returns a details of course as a object.

### Update Course Details API

- **URL:** `/api/v1/course/:id`
- **Method:** PUT
- ***Important:** Make sure the id passed here is created in the database.*
- **Request Body:**
  ```
  {
      "name": "Updated Course Name",
      "max_seats": 25,
      "start_date": "2024-05-01"
  }
  ```
- **Response:** Returns the updated course object.

### Delete Course API

- **URL:** `/api/v1/course/:id`
- **Method:** DELETE
- ***Important:** Make sure the id passed here is created in the database, also the leads related to this course id will be deleted*
- **Response:** Returns the updated course object.

## Leads API Route

### Course Registration API

- **URL:** `/api/v1/new/lead`
- **Method:** POST
- ***Important:** Make sure the id passed here is created in the database*
- **Request Body:**
  ```
  {
      "name": "Learner Name",
      "email": "learner@example.com",
      "phone": "1234567890",
      "linkedin_profile": "https://www.linkedin.com/in/learner",
      "course_id": "course_id_here"
  }
  ```
- **Response:** Returns the newly created lead object.

### Lead Update API

- **URL:** `/api/v1/lead/:id`
- **Method:** PUT
- ***Important:** Make sure the status passed here is one of Accepted, Rejected or Waitlist*
- **Request Body:**
  ```
  {
      "status": "accepted"
  }
  ```
- **Response:** Returns the updated lead object.

### Lead Search API

- **URL:** `/api/v1/search/lead`
- **Method:** GET
- **Query Parameters:** `q` (name or email)
- **Response:** Returns a list of leads matching the search query.

### Get all leads API

- **URL:** `/api/v1/leads`
- **Method:** GET
- **Response:** Returns a list of all the leads.

## Comment API Route

### Get all comments API

- **URL:** `/api/v1/comments`
- **Method:** GET
- **Response:** Returns the comments object.

### Add Comment API

- **URL:** `/api/v1/new/comment`
- **Method:** POST
- **Request Body:**
  ```
  {
      "content": "This learner seems highly motivated.",
      "lead_id": "<lead-id-which-is-commented>"
      "instructor_id":"<id-of-instructor-who-commented>"
  }
  ```
- **Response:** Returns the comment object.

# Testing APIs

You can test the APIs using Postman or any other API testing tool. Use the provided endpoints and sample request bodies to interact with the server.

## Contributors

- [Kirtan Jain](https://github.com/kirtann)
