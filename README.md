# Readers' Lounge - MERN Stack Book Sharing Platform

## Live Demo
[Visit Readers' Lounge](https://readerslounge.netlify.app)

## Project Overview
Readers' Lounge is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It's a platform where book enthusiasts can share and discover their favorite books. The application features secure book management through PIN-based authentication for edit/delete operations.

## Technical Stack

### Frontend
- **React.js** with Vite for fast development and optimized builds
- **Tailwind CSS** for responsive and modern UI design
- **React Router DOM** for client-side routing
- **Axios** for HTTP requests
- **Notistack** for toast notifications
- **React Icons** for consistent UI elements

### Backend
- **Node.js** & **Express.js** for RESTful API development
- **MongoDB** with Mongoose ODM for data persistence
- **CORS** for secure cross-origin resource sharing
- **dotenv** for environment variable management

## Key Features

### Security
- PIN-based authentication system for book management
- Secure route protection for edit/delete operations
- Input validation and sanitization

### User Interface
- Responsive design for all device sizes
- Dual view modes: Table and Card layouts
- Real-time feedback with toast notifications
- Modern and intuitive user experience

### API Architecture
- RESTful API design principles
- CRUD operations with error handling
- MongoDB schema validation
- Efficient database queries

## Development Practices
- Git version control
- Environment variable management
- Code organization and modularity
- Error handling and logging
- Modern ES6+ JavaScript features

## Project Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/readerslounge.git
```

2. Install dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

3. Configure environment variables
```bash
# Backend .env
MONGODB_URL=your_mongodb_url
PORT=3000

# Frontend .env
VITE_API_URL=http://localhost:3000
```

4. Run the application
```bash
# Frontend
npm run dev

# Backend
npm run dev
```

## Future Enhancements
- User authentication with JWT
- Social sharing features
- Book recommendations
- Search and filtering capabilities
- Book rating system

## What I Learned
- Full-stack application architecture
- State management in React
- RESTful API design
- Database modeling with MongoDB
- Deployment and hosting
- Security implementation
- Responsive design principles

## Contact
- LinkedIn: http://www.linkedin.com/in/shynal-prasad
- Email: pshynal23@gmail.com