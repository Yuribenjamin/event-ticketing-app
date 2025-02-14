<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Event Ticketing System

### Project Description
This project is a backend service for an **event ticketing system** built using **NestJS**, **GraphQL**, and **PostgreSQL**. The system allows users to:
- Retrieve event details
- Get a list of users and their orders
- Purchase tickets for events
- Create new events

#### Technical Stack
- **Backend:** NestJS (TypeScript)
- **Database:** PostgreSQL (via TypeORM)
- **GraphQL API:** Managed with Apollo Server
- **Containerization:** Docker with `docker-compose`


### Setup Instructions
#### Prerequisites
Ensure you have the following installed on your system:
- **Node.js (v20 or later)**
- **Yarn**
- **Docker & Docker Compose**

### Installation
1. Clone the repository:
  ```sh
  git clone https://github.com/your-repo/event-ticketing-app.git
  cd event-ticketing-app/backend
  ```

2. Install dependencies:
  ```sh
  yarn
  ```

#### Running the Database with Docker
1. Start the database container:
   
  ```sh
  docker-compose up -d
  ```
   
  - This will start a PostgreSQL 17 database container named ticketing_postgres .
  - The database will be accessible at localhost:5433 .
2. To check if the database is running:
   
  ```sh
  docker ps
  ```
   
  - Look for a container named ticketing_postgres .
3. Stop the database when done:
   
  ```sh
  docker-compose down
  ``` 

#### Configure the Environment Variables

Rename .env.example to .env and update the database settings:

```plaintext
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=ticketing
NODE_ENV=development
 ```
#### Running Migrations To generate a new migration:

```sh
yarn run migration:generate
 ```

To run existing migrations:

```sh
yarn run migration:run
 ```
#### Running the Seed Script To seed the database with initial data:

```sh
yarn run seed:run
 ```

Starting the Server

```sh
yarn start:dev
 ```

### Database Schema & Entities
1. Event Entity
- Represents an event where users can purchase tickets.
- Fields:
  - id (ULID, Primary Key)
  - name (String)
  - date (DateTime)
  - totalTickets (Int)
  - availableTickets (Int)
  - isFutureEvent (Boolean, computed based on the date)
  - isSoldOut (Boolean, computed based on availableTickets )

2. User Entity
- Represents a registered user.
- Fields:
  - id (ULID, Primary Key)
  - name (String)
  - email (String, Unique)

3. Order Entity
- Represents a user's ticket purchase.
- Fields:
  - id (ULID, Primary Key)
  - orderNumber (String, Unique)
  - purchaseDate (DateTime)
  - ticketCount (Int)
  - status (String, ENUM: PENDING , CONFIRMED , CANCELLED )
  - eventId (Foreign Key → Event)
  - userId (Foreign Key → User)

### GraphQL API Documentation

### Queries

1. Get All Events

```graphql
query {
  getEvents {
    id
    name
    totalTickets
    availableTickets
    isFutureEvent
    isSoldOut
  }
}
 ```

2. Get All Users

```graphql
query {
  getUsers {
    id
    name
    email
  }
}
 ```

3. Get All Orders

```graphql
query {
  getOrders {
    id
    orderNumber
    purchaseDate
    ticketCount
    status
    event {
      name
    }
    user {
      name
    }
  }
}
 ```

4. Get Event by ID

```graphql
query GetEvent($id: String!) {
  getEvent(id: $id) {
    id
    name
    totalTickets
    availableTickets
    isFutureEvent
    isSoldOut
  }
}
```

5. Get User by ID

```graphql
query GetUser($ID: String!) {
  getUser(id: $ID) {
    id
    name
    email
  }
}
 ```

### Mutations

1. Purchase Tickets

```graphql
mutation PurchaseTickets($eventId: String!, $userId: String!, $ticketCount: Int!) {
  purchaseTickets(purchaseTicketsData: {
    eventId: $eventId,
    userId: $userId,
    ticketCount: $ticketCount
  }) {
    id
    eventId
    ticketCount
    createdAt
  }
}
 ```

2. Create an Event
```graphql
mutation CreateEvent($Name: String!, $Date: DateTime!, $TotalTickets: Int!, $AvailableTickets: Int!) {
  createEvent(createEvent: { 
    name: $Name, 
    date: $Date, 
    totalTickets: $TotalTickets, 
    availableTickets: $AvailableTickets 
  }) {
    id
    name
    date
    totalTickets
    availableTickets
    isFutureEvent
    isSoldOut
  }
}
 ```

### GraphQL Playground
To test the GraphQL API, navigate to:

```plaintext
http://localhost:3000/graphql
 ```