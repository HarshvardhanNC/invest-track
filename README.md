# 💼 Web Investments - Portfolio Management App

A modern, full-stack investment portfolio management application built with React, Node.js, Express, and MongoDB.

![Tech Stack](https://img.shields.io/badge/React-19.1.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Deployment](https://img.shields.io/badge/Deploy-Render%20%2B%20Vercel-purple)

---

## 🌟 Features

- **User Authentication** - Secure registration and login with JWT
- **Investment Tracking** - Add, edit, delete, and view your investments
- **Portfolio Analytics** - View total value and investment breakdown
- **Multiple Asset Types** - Stocks, Bonds, Mutual Funds, Crypto, Real Estate, and more
- **Search & Filter** - Easily find investments with search and category filters
- **Sorting Options** - Sort by date, amount, or asset name
- **Responsive Design** - Beautiful UI that works on all devices
- **Real-time Market Data** - NIFTY and BankNIFTY indices integration

---

## 🚀 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt.js** - Password hashing
- **CORS** - Cross-origin resource sharing

---

## 📁 Project Structure

```
web-investments/
├── client/                     # Frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Auth/         # Authentication components
│   │   │   ├── Dashboard/    # Dashboard components
│   │   │   ├── pages/        # Page components
│   │   │   └── Utils/        # Utility components
│   │   ├── context/          # React Context for state management
│   │   ├── config/           # Configuration files (API client)
│   │   └── assets/           # Static assets
│   ├── public/               # Public files
│   ├── vercel.json           # Vercel deployment config
│   └── package.json          # Frontend dependencies
│
├── server/                    # Backend application
│   ├── controller/           # Route controllers
│   ├── model/                # Database models
│   ├── route/                # API routes
│   ├── middleware/           # Custom middleware
│   └── package.json          # Backend dependencies
│
├── DEPLOYMENT_GUIDE.md       # Detailed deployment instructions
├── DEPLOYMENT_QUICKSTART.md  # Quick deployment reference
└── DEPLOYMENT_CHANGES.md     # Summary of production changes
```

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd web-investments
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment variables file
# Copy ENV_TEMPLATE.md and create .env file
```

Create a `.env` file in the `server` directory:
```env
MONGODB_URI=mongodb://localhost:27017/investments
JWT_SECRET=your_secret_key_here
PORT=8000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

```bash
# Start the backend server
npm start
```

Backend will run on `http://localhost:8000`

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create environment file
```

Create a `.env.development` file in the `client` directory:
```env
VITE_API_URL=/api
```

```bash
# Start the development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Access the Application

Open your browser and visit: `http://localhost:5173`

---

## 🌐 Deployment

This application is designed to be deployed on:
- **Backend:** Render (Free tier)
- **Frontend:** Vercel (Free tier)
- **Database:** MongoDB Atlas (Free tier)

### Quick Deployment

Follow our **[Quick Deployment Guide](./DEPLOYMENT_QUICKSTART.md)** for a 15-minute setup.

### Detailed Instructions

For step-by-step instructions with screenshots and troubleshooting, see our **[Comprehensive Deployment Guide](./DEPLOYMENT_GUIDE.md)**.

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/validate` | Validate JWT token |

### Investment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/investments` | Get all user investments | ✅ |
| GET | `/api/investments/:id` | Get single investment | ✅ |
| POST | `/api/investments` | Create new investment | ✅ |
| PUT | `/api/investments/:id` | Update investment | ✅ |
| DELETE | `/api/investments/:id` | Delete investment | ✅ |

### Market Data Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/nifty` | Get NIFTY 50 data |
| GET | `/api/banknifty` | Get Bank NIFTY data |

---

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **CORS Protection** - Configured for specific origins
- **Environment Variables** - Sensitive data protection
- **Input Validation** - Server-side validation
- **Protected Routes** - Middleware-based route protection

---

## 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface
- **Responsive Layout** - Mobile, tablet, and desktop support
- **Smooth Animations** - Framer Motion animations
- **Loading States** - User-friendly loading indicators
- **Error Handling** - Clear error messages
- **Dark Mode Ready** - Prepared for dark mode implementation

---

## 🧪 Testing

```bash
# Backend tests (if implemented)
cd server
npm test

# Frontend tests (if implemented)
cd client
npm test
```

---

## 📊 Investment Types Supported

- 📈 **Stocks** - Equity investments
- 📄 **Bonds** - Fixed income securities
- 💼 **Mutual Funds** - Professionally managed portfolios
- ₿ **Cryptocurrency** - Digital assets
- 🏠 **Real Estate** - Property investments
- 📦 **Other** - Custom investment types

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🐛 Known Issues & Limitations

### Free Tier Limitations:
- **Render:** Backend spins down after 15 minutes of inactivity (30-60s cold start)
- **MongoDB Atlas:** 512MB storage limit
- **Vercel:** 100GB bandwidth/month

### Current Limitations:
- No email verification
- No password reset functionality
- No two-factor authentication
- No real-time updates (WebSocket)

---

## 🔮 Future Enhancements

- [ ] Real-time portfolio value updates
- [ ] Investment performance charts
- [ ] Export data to CSV/PDF
- [ ] Email notifications
- [ ] Multi-currency support
- [ ] Investment recommendations
- [ ] Portfolio comparison
- [ ] Mobile app (React Native)
- [ ] Dark mode
- [ ] Advanced analytics dashboard

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Deployment Guide](./DEPLOYMENT_GUIDE.md) for common issues
2. Review the [Changes Documentation](./DEPLOYMENT_CHANGES.md)
3. Open an issue on GitHub

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database
- Render & Vercel for free hosting
- Tailwind CSS for the styling system
- All open-source contributors

---

## 📸 Screenshots

### Dashboard
![Dashboard Screenshot](screenshots/dashboard.png)

### Add Investment
![Add Investment Screenshot](screenshots/add-investment.png)

### Portfolio View
![Portfolio View Screenshot](screenshots/portfolio.png)

---

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub!

---

**Made with ❤️ and ☕**

**Last Updated:** October 2025

