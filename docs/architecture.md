# MindWell System Architecture

MindWell is built using a modern **client-server** structure utilizing Node.js, Express, and React.

## Directory Layout

```text
MindWell/
├── client/          # Vite + React (JavaScript Frontend)
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/   # Global guards and wrappers
│   │   │   ├── layout/   # Navbar, Sidebar, Shell layouts
│   │   │   └── ui/       # Atom components (Button, Card, Input)
│   │   ├── context/      # Context providers (Auth, Toasts)
│   │   ├── pages/        # Dashboard, Login, Register, Profile
│   │   └── routes/       # Router layouts
├── server/          # Express + Node.js (REST Backend)
│   ├── src/
│   │   ├── config/       # MongoDB Mongoose configurations
│   │   ├── controllers/  # Route event handlers
│   │   ├── middleware/   # JWT verification and permissions check
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API endpoints (Auth, AI Chat)
│   │   └── services/     # Third-party integrations (Gemini AI API)
├── shared/          # Utility scripts and validation rules
└── docs/            # Platform documentations and blueprints
```

## User Roles & Capabilities

1. **Teen**: Access to journaling, personal mood analytics (SVG charts), mood logs, and AI therapeutic assistant.
2. **Parent**: High-level family statistics, progress reports summary, and consultation appointment request actions.
3. **Therapist**: Client directories management, clinical notes logger, session schedule calendars.
4. **Admin**: Platform health indices, system metrics logs, account moderations.

## Tech Stack Summary

- **Frontend**: React 19, Vite, Tailwind CSS v4, React Router v6, Axios, Framer Motion, React Hook Form, TanStack Query, Lucide Icons.
- **Backend**: Node.js, Express, Mongoose, JWT, Bcrypt, Multer, Helmet, Morgan, Cloudinary.
- **AI Integrations**: Google Gemini API via REST endpoints with local conversational fallbacks.
