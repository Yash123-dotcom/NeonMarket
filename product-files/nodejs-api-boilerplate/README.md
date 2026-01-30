# Node.js API Boilerplate

## Features
- Express.js server
- MongoDB with Mongoose
- JWT authentication
- Password hashing
- CORS enabled
- Security headers
- Error handling
- Input validation
- Rate limiting
- API documentation

## Quick Start
```bash
npm install
npm run dev
```

## Environment Variables
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/api
JWT_SECRET=your_jwt_secret
```

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/users/profile
- PUT /api/users/profile