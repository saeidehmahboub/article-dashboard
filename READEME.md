# Article Management Dashboard

An internal dashboard to manage bicycle component articles.  
Includes CRUD, filtering, sorting, pagination, unit tests, and API documentation.

---

## Technologies Used

- **Backend**: `C#` .NET Core 8.0
- **Database**: SQLite with Entity Framework Core
- **Frontend**: Angular 18 with Angular Material

---

## Prerequisites

To run this project, you need the following installed:

- **Node.js** (for the frontend)
- .NET SDK 8.0 (for the backend)

---

## How to Run the Project

### Option 1: Manual Run

### 1. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
```

#### Run Database Migration:

Follow these steps to create migration based on models:

```bash
dotnet ef migrations add InitialCreate
```

Then run the following command to update the database:

```bash
dotnet ef database update
```

If you receive an error related to `dotnet-ef`, please install it with the following command:

```bash
dotnet tool install --global dotnet-ef --version 8.0
```

Follow these steps to run the backend:

#### 1. Restore dependencies:

```bash
dotnet restore
```

#### 2. Build and run the project:

```bash
dotnet run
```

The backend will run on the default address `http://localhost:5000`.

Swagger UI is available at `http://localhost:5000/swagger/index.html`.

#### Backend Testing

Navigate to the backend directory:

```bash
cd Backend.Tests
```

To run unit tests, use the following command:

```bash
dotnet build
dotnet test
```

This will execute all the tests and display their success or failure status.

### 2. Set Up the Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install the required dependencies using:

```bash
npm install
```

Once the dependencies are installed, start the frontend with:

```bash
ng serve
```

The frontend will run on the default address `http://localhost:4200`, and you can access the project in your browser.

### Option 2: Using the provided Shell Script (Linux / Mac)

You can run both backend and frontend using the provided script:

```bash
./run.sh
```

---

## Project Features

1. Manage Articles.
2. Full CRUD operations for bicycle component articles
3. Filtering by Article Category, Bicycle Category, and Material
4. Sorting by Net Weight and Article Category
5. Pagination (Backend + Frontend)
6. Form validation
7. Unit tests for Angular components/service and Backend controller/service
8. Swagger API documentation
9. Shell script to run both backend and frontend
10. Data seeder implemented for pre-populating sample articles

---

## Additional Information

- The project includes a simple data seeder to pre-populate the database with sample articles.
- Data is persisted in the `articles.db` SQLite database.

---

## License

This project is released under the MIT License.
