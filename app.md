# 📝 MERN Stack Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, CRUD operations, and a modern responsive design.

## 🚀 Live Demo

- **Frontend**: [https://blog-app-3b5173.netlify.app/](https://blog-app-3b5173.netlify.app/)
- **Backend**: [https://backend-server-blog-trial.onrender.com](https://backend-server-blog-trial.onrender.com)
- **GitHub Repository**: [https://github.com/PLP-MERN-Stack-Development/mern-stack-integration-iampunit123.git](https://github.com/PLP-MERN-Stack-Development/mern-stack-integration-iampunit123.git)

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Protected routes for authenticated users
- Secure password hashing with bcrypt

### 📝 Blog Management
- Create, read, update, and delete blog posts
- Rich text content with cover images
- Categories and tags organization
- Featured posts highlighting
- Reading time estimation

### 🎨 User Experience
- Modern, responsive design with Tailwind CSS v4
- Mobile-first approach
- Smooth animations and transitions
- Loading states and error handling
- Intuitive user interface

### 🔧 Technical Features
- RESTful API architecture
- MongoDB database with Mongoose ODM
- React Router for navigation
- Context API for state management
- Environment-based configuration

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **Tailwind CSS v4** - Styling
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/PLP-MERN-Stack-Development/mern-stack-integration-iampunit123.git
cd mern-stack-integration-iampunit123
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Environment setup
cp .env.example .env
# Edit .env with your configurations:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=5000

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Environment setup
cp .env.example .env
# Edit .env with your configurations:
# VITE_API_BASE_URL=http://localhost:5000

# Start development server
npm run dev
```

## 🏗️ Project Structure

```
mern-blog-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main app component
│   ├── public/             # Static files
│   └── package.json
├── server/                 # Express backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── controllers/        # Route controllers
│   ├── config/             # Database configuration
│   └── package.json
└── README.md
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `GET /api/posts?featured=true` - Get featured posts

### Query Parameters
- `limit` - Limit number of posts
- `featured` - Filter featured posts
- `category` - Filter by category

## 🎯 Key Components

### Frontend Components
- **Home** - Landing page with featured and recent posts
- **Login/Register** - Authentication forms
- **CreatePost** - Blog post creation form
- **PostDetail** - Individual post view
- **Navbar** - Navigation with auth state

### Backend Models
- **User** - User authentication and profile
- **Post** - Blog posts with categories and tags

## 🔒 Environment Variables

### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
```

## 🚀 Deployment

### Frontend (Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Backend (Render)
1. Connect GitHub repository to Render
2. Set environment variables
3. Deploy automatically on git push

## 🧪 Testing the Application

1. **Visit the live site**: [https://blog-app-3b5173.netlify.app/](https://blog-app-3b5173.netlify.app/)
2. **Register a new account** or use existing credentials
3. **Create a new blog post** with title, content, and cover image
4. **Explore categories** and featured posts
5. **Test authentication** by logging out and back in

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktop computers

## 🔄 Development Scripts

### Backend
```bash
npm run dev      # Start development server
npm start        # Start production server
npm test         # Run tests
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 👨‍💻 Author

**Punit**
- GitHub: [@iampunit123](https://github.com/iampunit123)
- Project: MERN Stack Integration

## 🙏 Acknowledgments

- PLP MERN Stack Development program
- Tailwind CSS team for the amazing framework
- MongoDB, Express, React, Node.js communities

---

**⭐ Star this repository if you find it helpful!**
# 📝 MERN Stack Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, CRUD operations, and a modern responsive design.

## 🚀 Live Demo

- **Frontend**: [https://blog-app-3b5173.netlify.app/](https://blog-app-3b5173.netlify.app/)
- **Backend**: [https://backend-server-blog-trial.onrender.com](https://backend-server-blog-trial.onrender.com)
- **GitHub Repository**: [https://github.com/PLP-MERN-Stack-Development/mern-stack-integration-iampunit123.git](https://github.com/PLP-MERN-Stack-Development/mern-stack-integration-iampunit123.git)

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Protected routes for authenticated users
- Secure password hashing with bcrypt

### 📝 Blog Management
- Create, read, update, and delete blog posts
- Rich text content with cover images
- Categories and tags organization
- Featured posts highlighting
- Reading time estimation

### 🎨 User Experience
- Modern, responsive design with Tailwind CSS v4
- Mobile-first approach
- Smooth animations and transitions
- Loading states and error handling
- Intuitive user interface

### 🔧 Technical Features
- RESTful API architecture
- MongoDB database with Mongoose ODM
- React Router for navigation
- Context API for state management
- Environment-based configuration

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **Tailwind CSS v4** - Styling
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/PLP-MERN-Stack-Development/mern-stack-integration-iampunit123.git
cd mern-stack-integration-iampunit123
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Environment setup
cp .env.example .env
# Edit .env with your configurations:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=5000

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Environment setup
cp .env.example .env
# Edit .env with your configurations:
# VITE_API_BASE_URL=http://localhost:5000

# Start development server
npm run dev
```

## 🏗️ Project Structure

```
mern-blog-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main app component
│   ├── public/             # Static files
│   └── package.json
├── server/                 # Express backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── controllers/        # Route controllers
│   ├── config/             # Database configuration
│   └── package.json
└── README.md
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `GET /api/posts?featured=true` - Get featured posts

### Query Parameters
- `limit` - Limit number of posts
- `featured` - Filter featured posts
- `category` - Filter by category

## 🎯 Key Components

### Frontend Components
- **Home** - Landing page with featured and recent posts
- **Login/Register** - Authentication forms
- **CreatePost** - Blog post creation form
- **PostDetail** - Individual post view
- **Navbar** - Navigation with auth state

### Backend Models
- **User** - User authentication and profile
- **Post** - Blog posts with categories and tags

## 🔒 Environment Variables

### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
```

## 🚀 Deployment

### Frontend (Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Backend (Render)
1. Connect GitHub repository to Render
2. Set environment variables
3. Deploy automatically on git push

## 🧪 Testing the Application

1. **Visit the live site**: [https://blog-app-3b5173.netlify.app/](https://blog-app-3b5173.netlify.app/)
2. **Register a new account** or use existing credentials
3. **Create a new blog post** with title, content, and cover image
4. **Explore categories** and featured posts
5. **Test authentication** by logging out and back in

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktop computers

## 🔄 Development Scripts

### Backend
```bash
npm run dev      # Start development server
npm start        # Start production server
npm test         # Run tests
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 👨‍💻 Author

**Punit**
- GitHub: [@iampunit123](https://github.com/iampunit123)
- Project: MERN Stack Integration

## 🙏 Acknowledgments

- PLP MERN Stack Development program
- Tailwind CSS team for the amazing framework
- MongoDB, Express, React, Node.js communities

---

**⭐ Star this repository if you find it helpful!**
