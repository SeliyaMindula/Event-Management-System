# Authentication System Setup Guide

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `backend` directory with the following variables:

```
MONGODB_URI=mongodb://localhost:27017/eventproject
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 3. Start MongoDB
Make sure MongoDB is running on your system. If using Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### 4. Seed Initial Super Admin
Run the seed script to create the initial Super Admin user:
```bash
npm run seed
```

This will create a Super Admin with:
- Email: `superadmin@example.com`
- Password: `SuperAdmin123!`
- Role: `SUPER_ADMIN`

### 5. Start Backend Server
```bash
npm run start:dev
```

The backend will run on `http://localhost:3001`

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Configuration (Optional)
Create a `.env` file in the `frontend` directory if you need to change the API URL:

```
VITE_API_URL=http://localhost:3001
```

### 3. Start Frontend Server
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## User Roles

The system supports three user roles:

1. **SUPER_ADMIN** - Full access to create and manage events
2. **ADMIN** - Can manage invitations and view reports (College IT)
3. **STUDENT** - Can register for events and check in (College Student)

## Testing the Login

1. Open `http://localhost:3000` in your browser
2. You'll be redirected to the login page
3. Use the Super Admin credentials:
   - Email: `superadmin@example.com`
   - Password: `SuperAdmin123!`
4. After successful login, you'll be redirected to the dashboard based on your role

## API Endpoints

### POST /auth/login
Login endpoint that accepts:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Returns:
```json
{
  "access_token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "SUPER_ADMIN"
  }
}
```

## Protected Routes

The frontend has protected routes:
- `/dashboard` - Accessible by all authenticated users
- `/admin/dashboard` - Only for SUPER_ADMIN and ADMIN roles
- `/student/dashboard` - Only for STUDENT role

## Next Steps

After authentication is working, you can proceed with:
- Event management (Super Admin)
- Invitation management (Admin)
- Guest registration and check-in (Student)

