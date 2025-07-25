# Real Estate App

Real Estate App is a house rental application designed to streamline the tenant management and rent collection process and provide a seamless experience for house owners/managers.

## Features

- **View All Tenants**: Easily view list of all Tenants.
- **Add/Remove Tenants**: Manage Tenants Records.
- **Add/Update/Remove Tenants Rent Payment Records**: Manage Tenants Rent Payment Records.
- **View Tenants Rent Payment Statement**: View Tenants Rent Payment Statement.
- **Download Tenants Rent Payment Statement**: Download Tenants Rent Payment Statement.

## Tech Stack

- **Frontend**: React with Vite for a fast development experience.
- **State Management**: React UseState for managing application state.
- **Routing**: React Router for navigation between pages.
- **Backend**: Python for backend services.
- **Data Fetching**: React Fetch for efficient data fetching and caching.
- **Styling**: Tailwind CSS for styling components.

## Routes

- **Login**: `/login` - User login page.
- **Admin Dashboard**: `dashboard` - Dashboard for managing tenant records.
  - **Manage Tenants**: `/dashboard/manageTenants` - Manage Tenants Records.
  - **Manage Rent Payments**: `/dashboard/manageRentPayments` - Manage Tenants Rent Payments Records.
  - **Reports**: `/dashboard/reports` - View and Download Tenants Rent Statements.
- **Not Found**: `*` - Page displayed when a route is not found.

## Screenshots

![Landing Page](/public/Login.PNG)


## Installation

To get started with House GRW, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone git@github.com:{yourusername}/real-estate-app-with-django.git
   
   ```

2. Navigate to the project directory:

   ```bash
   cd ds_client
   ```

3. Install dependencies using npm:

   ```bash
   npm install
   ```

## Usage

Once you have installed the dependencies, you can run the project locally:

```bash
npm run dev
```

This will start the development server. You can now access the application by navigating to `http://localhost:3000` in your web browser.