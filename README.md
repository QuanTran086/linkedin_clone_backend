# LinkedIn Clone using Node with Express and PostgreSQL Server

## Technologies Used

- Node
- Express
- REST API
- PostgreSQL

## Folder Structure

- `controllers/`: Contains files defining the logic for handling requests for each route.
- `database/`: Includes configurations for the PostgreSQL database and migration scripts.
- `models/`: The models directory includes files that define data structures and methods for querying and manipulating data in the database. The models use these definitions to interact with the corresponding tables in PostgreSQL.
- `node_modules/`: Created when you run `npm install`, this folder houses all the project dependencies.
- `routes/`: Contains files that define the HTTP request routes.
- `.env`: A file to store environment variables (not included in the repository for security reasons).
- `app.js`: The entry point for the Express application.
- `package-lock.json` & `package.json`: Node configuration files specifying the project's dependencies and scripts.
- `README.md`: Provides information about the project and setup instructions.

## Routes
Visit http://localhost:5000
  - /sign-up
  - /sign-in
  - /feed
  - /profile

## Database Design
![Screenshot 2024-03-30 190720](https://github.com/QuanTran086/linkedin_clone_backend/assets/130350185/ccb27ec7-d1d5-44da-a966-e1a6172a6e9d)

## Installation
- Clone the repository
```
git clone linkedin_clone_backend
```
- Install dependencies
```
cd linkedin_cline_backend
npm install
```
- Build and run the project
```
nodemon app
```
  Navigate to `http://localhost:5000`
