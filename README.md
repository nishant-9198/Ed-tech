# StudyNotion - MERN Stack App

A full-stack web application built with the **MERN stack**:
- **MongoDB** for the database
- **Express.js** for backend
- **React.js** (with Tailwind CSS) for frontend
- **Node.js** for runtime

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd StudyNotion


cd client
npm install
cd ../server
npm install
cd ..


PORT=4000
MONGO_URI=your-mongo-uri
JWT_SECRET=your-secret

REACT_APP_API_URL=http://localhost:5000
npm install   # installs concurrently if not already
npm run dev


cd client
npm run build

StudyNotion/
│
├── client/ # React frontend
│ ├── public/ # Static assets (index.html, favicon, images)
│ ├── src/ # React source code
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page-level components
│ │ ├── context/ # React Context / State management
│ │ ├── hooks/ # Custom hooks
│ │ ├── utils/ # Helper functions
│ │ ├── services/ # API calls (axios/fetch)
│ │ ├── App.js
│ │ └── index.js
│ ├── package.json
│ └── .env # Frontend env variables (like API URL)
│
├── server/ # Express backend
│ ├── config/ # DB config, environment configs
│ ├── controllers/ # Route controllers (business logic)
│ ├── models/ # Mongoose models
│ ├── routes/ # Express routes
│ ├── middleware/ # Auth, error handling, logging
│ ├── utils/ # Helper functions
│ ├── server.js # Entry point
│ ├── package.json
│ └── .env # Backend secrets (DB_URI, JWT_SECRET, etc.)
│
├── .gitignore # Ignores node_modules, env, build, etc.
├── README.md # Project documentation
└── package.json # Root package.json (for scripts like dev)