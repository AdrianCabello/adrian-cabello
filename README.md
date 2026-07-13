# Adrian Cabello - Portfolio

## 🚀 Overview

Personal portfolio and private Personal OS dashboard built with Angular 19. The public site presents my work as a Full-Stack Product Engineer and Tech Lead, while the authenticated dashboard connects to the Rakium backend for tasks, notes, finances, and portfolio project management.

## ✨ Features

- **Modern UI/UX**: Clean and professional design with smooth transitions
- **Responsive Design**: Fully responsive layout that works on all devices
- **SEO Optimized**: Implemented meta tags and Open Graph protocol for better sharing
- **Performance Focused**: Optimized build process and lazy loading
- **Private Dashboard**: Authenticated Personal OS routes for tasks, expenses, notes, and quick financial movements
- **Static-Friendly Routing**: Deep-link support for GitHub Pages and the Express runner

## 🛠️ Technologies

- Angular 19
- TypeScript
- TailwindCSS
- Angular build with static/SPA deployment support
- GitHub Actions (CI/CD)

## 🏗️ Architecture

The project follows a modular architecture with:

- Component-based structure
- Service-oriented design
- Lazy-loaded modules
- SEO service implementation
- Authenticated private dashboard backed by Rakium APIs
- Automated deployment pipeline

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/AdrianCabello/adrian-cabello.git

# Navigate to project directory
cd adrian-cabello

# Install dependencies
npm install

# Start development server
npm start
```

## 🚀 Deployment

The project is automatically deployed to GitHub Pages using GitHub Actions. Every push to the main branch triggers:

1. Production Angular build
2. Static route preparation for deep links such as `/login`, `/dashboard`, `/gastos`, `/tareas/nueva`, and `/movimiento-rapido`
3. Deployment to GitHub Pages

## 🌐 Live Demo

Visit the live site at [adriancabello.dev](https://adriancabello.dev)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Contact

- Website: [adriancabello.dev](https://adriancabello.dev)
- LinkedIn: [Adrian Cabello](https://linkedin.com/in/adrian-cabello)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/AdrianCabello/adrian-cabello/issues).

---

⭐️ If you like this project, please give it a star!
