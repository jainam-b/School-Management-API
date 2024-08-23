
# School Management API

This project provides a set of APIs for managing school data using Node.js, Express.js, and MySQL. The API allows users to add new schools and retrieve a list of schools sorted by proximity to a specified location.

## Features

- **Add School API**: Allows you to add a new school to the database.
- **List Schools API**: Retrieves a list of schools sorted by proximity to a user-specified location.

## API Endpoints

### 1. Add School API

- **Endpoint**: `/addSchool`
- **Method**: `POST`
- **Description**: Adds a new school to the database.
- **Request Payload**:
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.345678,
    "longitude": 98.765432
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "message": "School added successfully.",
      "data": {
        "insertId": 1
      }
    }
    ```
  - **Error**:
    ```json
    {
      "error": "All fields are required."
    }
    ```

### 2. List Schools API

- **Endpoint**: `/listSchools`
- **Method**: `GET`
- **Parameters**:
  - `latitude`: User's latitude.
  - `longitude`: User's longitude.
- **Description**: Retrieves a list of schools sorted by proximity to the user's location.
- **Response**:
  - **Success**:
    ```json
    [
      {
        "id": 1,
        "name": "School Name",
        "address": "School Address",
        "latitude": 12.345678,
        "longitude": 98.765432,
        "distance": 1234.56
      }
    ]
    ```
  - **Error**:
    ```json
    {
      "error": "Invalid parameters."
    }
    ```

## Postman Collection

You can test the APIs using the Postman collection. [View and download the Postman collection](https://documenter.getpostman.com/view/32312387/2sAXjF6tU5).

## GitHub Repository

The source code for this project is available on GitHub. You can access it [here](https://github.com/jainam-b/School-Management-API).

## Setup and Deployment

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jainam-b/School-Management-API.git
   ```

2. **Install Dependencies**:
   ```bash
   cd School-Management-API
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following configuration:
   ```env
   DB_HOST=your-database-host
   DB_PORT=your-database-port
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   ```

4. **Run the Application**:
   ```bash
   npm run start
   ```

5. **Build and Deploy**:
   Follow the instructions for deploying your application to your preferred hosting service (e.g., Vercel, Heroku).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
