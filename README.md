# JOT API Documentation

## Overview

This is a backend API built with **NestJS** that allows users to manage tasks and handle authentication. The app supports user sign-up, sign-in, and task management functionalities. It also provides endpoints for creating, updating, retrieving, and deleting tasks.

## Table of Contents

- [Installation](#installation)
- [Authentication](#authentication)
  - [Sign Up](#sign-up)
  - [Sign In](#sign-in)
- [Task Management](#task-management)
  - [Get Tasks](#get-tasks)
  - [Create Task](#create-task)
  - [Update Task](#update-task)
  - [Delete Task](#delete-task)
- [Testing](#testing)

## Installation

1. Clone the repository to your local machine.

2. Install dependencies using **pnpm**:

   `pnpm install`

3. Set up your environment variables in a **.env** file:

   - **DATABASE_URL**: Connection string for your database.
   - **AT_SECRET**: Secret key for generating JWT tokens.
   - **AT_EXPIRESIN**: Expiry Date for Your access token.

4. Run the application in development mode:

   `pnpm run start:dev`

   This will start the server on the default port (3333).

## Authentication

The authentication system provides routes for user sign-up and sign-in.

### Sign Up

- **Endpoint**: `POST /auth/signup`

- **Description**: Registers a new user and returns JWT tokens for authentication.

- **Request Body**:

  - **email**: User's email.
  - **password**: User's password.
  - **firstName**: User's first name.
  - **lastName**: User's last name.
  - **password**: User's password.
  - **passwordConfirm**: passwod confirmation.

- **Response**:
  - **accessToken**: The JWT token used for authenticating API requests.

### Sign In

- **Endpoint**: `POST /auth/signin`

- **Description**: Authenticates the user and returns JWT tokens for authentication.

- **Request Body**:

  - **email**: User's email.
  - **password**: User's password.

- **Response**:
  - **accessToken**: The JWT token used for authenticating API requests.

## Task Management

### Get Tasks

- **Endpoint**: `GET /task`

- **Description**: Retrieves a list of tasks for the authenticated user.

- **Query Parameters**:

  - **page**: The page number (default is 1).
  - **limit**: The number of tasks to return per page (default is 10).

- **Response**: An array of tasks for the user.

### Create Task

- **Endpoint**: `POST /task`

- **Description**: Creates a new task for the authenticated user.

- **Request Body**:

  - **title**: The title of the task.
  - **description**: The description of the task.
  - **status**: The status of the task (e.g., "pending", "completed").

- **Response**: The created task object.

### Update Task

- **Endpoint**: `PATCH /task/:id`

- **Description**: Updates the details of a specific task for the authenticated user.

- **Request Body**:

  - **title**: The updated title of the task.
  - **description**: The updated description of the task.
  - **status**: The updated status of the task.

- **Response**: The updated task object.

### Delete Task

- **Endpoint**: `DELETE /task/:id`

- **Description**: Deletes a specific task for the authenticated user.

- **Response**: A success message or status indicating that the task has been deleted.

## Testing

To run the tests for the application, you can use **Jest**:

1. Run tests with the following command:

   `pnpm run test`

2. To run a specific test file, use:

   `pnpm run test task.service.spec.ts`

This will execute the tests and provide the output in the console.
