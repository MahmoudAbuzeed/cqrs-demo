# CQRS Demo Project

## Overview

This project is a demonstration of implementing the Command Query Responsibility Segregation (CQRS) pattern using NestJS with MongoDB as the database and TypeORM as the ORM. The application allows you to create, update, delete, and query user entities while persisting all changes as events in an event store.

## Features Implemented

1. **User Management**:

   - **Create User**: Adds a new user to the system.
   - **Update User**: Updates an existing user’s details.
   - **Delete User**: Removes a user from the system.
   - **Get Users**: Retrieves a list of all users.

2. **CQRS Implementation**:

   - Command and query handlers are defined for managing user operations.
   - Commands include `CreateUserCommand`, `UpdateUserCommand`, `DeleteUserCommand`, and `GetUsersQuery`.

3. **Event Sourcing**:

   - Events are emitted for each user action (creation, update, deletion) and stored in an event store.
   - The event store is implemented using a MongoDB collection, where each event is logged with its type and payload.

4. **TypeORM Integration**:
   - Entities for `User` and `Event` are defined using TypeORM, allowing for seamless interaction with MongoDB.
   - The application configuration uses TypeORM for establishing a connection to the MongoDB database.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- NestJS CLI

### Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd cqrs-demo
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up MongoDB**:
   Ensure that MongoDB is running locally or update the connection settings in `app.module.ts` to point to your MongoDB instance.

### Running the Application

1. Start the application:

   ```bash
   npm run start
   ```

2. The application will be available at `http://localhost:3000`.

### API Endpoints

- **Create User**: `POST /users`

  - Request Body:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
    ```

- **Update User**: `PATCH /users/:id`

  - Request Body:
    ```json
    {
      "name": "Updated Name",
      "email": "updated.email@example.com"
    }
    ```

- **Delete User**: `DELETE /users/:id`

- **Get Users**: `GET /users`

- **Get Events**: `GET /users/events`

## Folder Structure

```
src/
├── commands/
│   ├── create-user.command.ts
│   ├── update-user.command.ts
│   ├── delete-user.command.ts
│   └── get-users.query.ts
├── entities/
│   ├── user.entity.ts
│   └── event.entity.ts
├── events/
│   └── user.events.ts
├── queries/
│   └── get-users.handler.ts
├── controllers/
│   └── user.controller.ts
├── listeners/
│   └── user.listener.ts
├── services/
│   └── event-store.service.ts
│
└── app.module.ts
```

## Next Steps

In the next phase of development, we will focus on:

1. **Implementing Advanced Patterns**:

   - **Sagas**: To manage complex workflows that involve multiple operations.
   - **Event-Driven Architecture**: Enhancing the application to respond to events in real-time and potentially integrating with other services.

2. **Unit Testing**:

   - Implement unit tests for command and query handlers to ensure functionality and reliability.

3. **Data Validation**:

   - Integrate validation using `class-validator` to ensure that incoming requests meet the necessary criteria.

4. **Error Handling**:

   - Enhance error handling mechanisms to provide clearer feedback and manage exceptions effectively.

5. **Persistent Event Store**:
   - Explore more robust solutions for event storage, such as using dedicated event store databases or message brokers.

## Contributing

If you would like to contribute to this project, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
