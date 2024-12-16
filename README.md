# Localhost Dashboard

A modern web-based dashboard for monitoring and managing local development servers and services running on your machine. Built with Node.js, Express, and React, featuring a sleek dark theme UI.

## 🌟 Features

- **Real-time Service Detection**: Automatically discovers services running on common localhost ports
- **Process Information**: Displays detailed process information for each running service
- **Quick Access**: Direct "Open in Browser" links for each service
- **Auto-refresh**: Automatically updates service status every 10 seconds
- **Dark Theme**: Easy on the eyes for long development sessions
- **Responsive Design**: Works seamlessly on all screen sizes
- **Cross-platform**: Compatible with Windows, macOS, and Linux

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/localhost-dashboard.git
cd localhost-dashboard
```

2. Set up the backend:
```bash
cd backend
npm install
npm run dev
```

3. Set up the frontend:
```bash
cd ../frontend
npm install
npm start
```

The dashboard will be available at `http://localhost:3000`, and the backend API will run on `http://localhost:3333`.

## 📊 Monitored Services

The dashboard monitors common development ports including:

- 3000: React Development
- 8080: HTTP Alternative
- 4200: Angular Development
- 8000: Python/Django
- 5000: Flask/Python
- 1337: Node.js Alternative
- 80: HTTP
- 443: HTTPS
- 3306: MySQL
- 27017: MongoDB
- 6379: Redis
- 5432: PostgreSQL

## 🛠️ Technology Stack

### Backend
- Node.js
- Express
- net (Node.js built-in)
- child_process (for process detection)

### Frontend
- React
- Tailwind CSS
- Lucide Icons
- Modern ES6+ JavaScript

## 📝 Configuration

To add or modify monitored ports, edit the `commonPorts` array in `backend/server.js`:

```javascript
const commonPorts = [
    { port: 3000, name: 'React Development' },
    // Add your custom ports here
];
```

## 🔒 Security Considerations

- The dashboard is intended for local development use only
- The backend includes basic CORS configuration for local development
- Process information is sanitized before being sent to the frontend
- External links open in new tabs with security attributes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Lucide Icons](https://lucide.dev/) for the beautiful icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- The open-source community for inspiration and tools

## 🐛 Known Issues

- Some process information might not be available on certain operating systems
- Port scanning might require elevated privileges on some systems for ports below 1024

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/yourusername/localhost-dashboard/issues) page
2. Create a new issue if your problem isn't already listed
3. Provide as much detail as possible, including your OS and Node.js version

---

Made with ❤️ for developers who juggle multiple local services
