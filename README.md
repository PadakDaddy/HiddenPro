# HiddenPro

A service marketplace web application inspired by Soomgo, built with React, Node.js, and PostgreSQL.  
HiddenPro allows users to register, login, browse expert profiles, and view expert details.  
All authentication is handled with JWT tokens, and user data is stored securely in a PostgreSQL database.

## Features

- User registration and login (JWT-based authentication)
- Main page listing recommended experts
- Expert detail page (accessible after login)
- Category/filter and search (extendable)
- Secure token management & protected routes
- Responsive, beginner-friendly UI flow

## Tech Stack

- Frontend: React, Axios, React Router
- Backend: Node.js, Express, Sequelize
- Database: PostgreSQL
- Auth: JWT (JSON Web Token)
- Others: bcrypt for password hashing, dotenv for environment variables

## Getting Started

### Prerequisites

- Node.js & npm installed
- PostgreSQL installed & running (default port 5432)
- Clone the repository

### Project Structure
├── client # React frontend
├── server # Node.js backend API
└── README.md # This file


### Usage

1. Start backend and frontend servers in two separate terminal windows.
2. Visit [http://localhost:3000](http://localhost:3000) to view the application.
3. Register a new user, log in, and browse experts.
4. Click an expert on the main page for their detailed profile.

### Security Notes

- All sensitive keys and DB credentials must be placed in `.env` and listed in `.gitignore`.
- JWT_SECRET in backend code should always be loaded via `process.env`, never hardcoded.

## Contributing

Feel free to fork and contribute by opening pull requests! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

