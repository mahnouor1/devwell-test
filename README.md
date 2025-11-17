# 🚀 DevWell Dashboard

A modern productivity dashboard that integrates with GitHub and Slack to provide personalized insights and task management.

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![Express](https://img.shields.io/badge/Express-4.21.1-000000?style=for-the-badge&logo=express)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite)

**Connect your GitHub account and transform your productivity** ✨

</div>

---

## ✨ Features

- 🔐 **GitHub OAuth Integration** - Secure login with your GitHub account
- 📊 **Real-time Dashboard** - View your repositories, commits, and activity
- 🎯 **Personalized Insights** - AI-driven recommendations based on your GitHub activity
- 📝 **Task Management** - Tasks generated from your actual GitHub events
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- ⚡ **Fast Performance** - Built with React and Vite for optimal speed

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- GitHub OAuth App (for authentication)

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd Devbeing_project
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

4. **Configure your `.env` file**

Open `.env` and fill in your OAuth credentials:

```env
# GitHub OAuth (Required)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URL=http://localhost:5173/api/auth/github/callback

# JWT (Required)
JWT_SECRET=your_secure_random_string

# Server Configuration (Optional)
PORT=3000
FRONTEND_URL=http://localhost:5173
```

5. **Start the development servers**

**Terminal 1 - Backend:**
```bash
npm run dev:server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

6. **Open your browser**

Navigate to: `http://localhost:5173`

---

## 🔧 GitHub OAuth Setup

To enable GitHub authentication, you need to create a GitHub OAuth App:

1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Your app name
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: `http://localhost:5173/api/auth/github/callback`
4. Click "Register application"
5. Copy the **Client ID** and **Client Secret**
6. Add them to your `.env` file

**Required Scopes:**
- `repo` - Access repositories
- `read:user` - Read user profile
- `user:email` - Read user email

---

## 📁 Project Structure

```
Devbeing_project/
├── server/                 # Backend Express server
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication routes
│   │   └── github/        # GitHub insights
│   ├── db/                # Database layer
│   ├── lib/               # Utility libraries
│   │   └── oauth/         # OAuth helpers
│   └── middleware/        # Express middleware
├── src/                   # Frontend React app
│   ├── App.jsx           # Main app component
│   ├── lib/              # Frontend utilities
│   └── assets/           # Static assets
├── public/               # Public assets
├── .env.example          # Environment variables template
├── package.json          # Dependencies
└── vite.config.js        # Vite configuration
```

---

## 🛠️ Available Scripts

- `npm run dev` - Start frontend development server (port 5173)
- `npm run dev:server` - Start backend API server (port 3000)
- `npm run dev:all` - Start both servers concurrently
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## 🔌 API Endpoints

### Authentication
- `GET /api/auth/github/login` - Initiate GitHub OAuth
- `GET /api/auth/github/callback` - GitHub OAuth callback
- `GET /api/auth/me` - Get current user profile

### GitHub Data
- `GET /api/github/insights` - Get personalized insights

### Health Check
- `GET /api/health` - Server health status

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_CLIENT_ID` | Yes | GitHub OAuth Client ID |
| `GITHUB_CLIENT_SECRET` | Yes | GitHub OAuth Client Secret |
| `GITHUB_REDIRECT_URL` | Yes | OAuth callback URL |
| `JWT_SECRET` | Yes | Secret for JWT token signing |
| `PORT` | No | Backend server port (default: 3000) |
| `FRONTEND_URL` | No | Frontend URL (default: http://localhost:5173) |

---

## 📊 Dashboard Features

### GitHub Profile
- Display your GitHub username, avatar, and profile information
- View your repositories with stars and forks
- See recent commits from your active repositories
- Track recent GitHub activity

### Personalized Insights
- Today's focus tasks based on your GitHub activity
- Weekly highlights (commits, active repos, events)
- Recommended tasks from your repositories
- Wellbeing score calculated from your activity

---

## 🧪 Testing

1. Start both servers (`npm run dev:server` and `npm run dev`)
2. Visit `http://localhost:5173`
3. Click "Continue with GitHub"
4. Authorize the application
5. You should be redirected to the dashboard with your GitHub data

---

## 🐛 Troubleshooting

### OAuth Issues
- **"Redirect URI mismatch"**: Ensure your GitHub OAuth App callback URL matches exactly: `http://localhost:5173/api/auth/github/callback`
- **"CSRF validation failed"**: Clear cookies and try again
- **"State cookie not found"**: Check that cookies are enabled in your browser

### Server Issues
- **Port 3000 already in use**: Change `PORT` in `.env` or kill the process using port 3000
- **Port 5173 already in use**: Change Vite port in `vite.config.js`

### Data Issues
- **No repositories showing**: Ensure you granted `repo` scope during OAuth
- **Empty dashboard**: Check that your GitHub account has activity

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ using React, Express, and Vite**
