# The Big Bang Collective Website

This is the official website for The Big Bang Collective, built using modern web technologies to showcase our STEM festivals and initiatives. The website serves as a central hub for information about our events, galleries of past activities, and updates about our community.

## 🛠️ Technology Stack

- [Astro](https://astro.build/) - Our core framework for fast, static site generation
- [TypeScript](https://www.typescriptlang.org/) - For type-safe development
- [Tailwind CSS](https://tailwindcss.com/) - For styling, including:
  - [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) - For beautiful typography
- [Video.js](https://videojs.com/) - For enhanced video playback
- [date-fns](https://date-fns.org/) - For date manipulation and formatting
- Custom fonts:
  - [Bungee Inline](https://fonts.google.com/specimen/Bungee+Inline)
  - [Inter](https://fonts.google.com/specimen/Inter)
  - [Lora](https://fonts.google.com/specimen/Lora)

## 📁 Project Structure

```text
/
├── src/
│   ├── assets/      # Static assets like images
│   ├── components/  # Reusable Astro components
│   ├── content/     # Content collections
│   ├── layouts/     # Page layouts
│   ├── pages/       # Route pages
│   ├── styles/      # Global styles
│   └── util/        # Utility functions
├── public/          # Static files
└── dist/           # Built files (generated)
```

## 🚀 Getting Started

1. **Prerequisites**
   - Node.js (Latest LTS version recommended)
   - npm (comes with Node.js)

2. **Clone the repository**
   ```sh
   git clone https://github.com/TheBigBangCollective/TheBigBangCollective.github.io.git
   cd TheBigBangCollective.github.io
   ```

3. **Install dependencies**
   ```sh
   npm install
   ```

4. **Available Commands**
   ```sh
   # Start development server
   npm run dev       # Runs at localhost:4321

   # Build for production
   npm run build    # Outputs to ./dist/

   # Preview production build
   npm run preview

   # Run Astro commands
   npm run astro
   ```

## 🔄 Deployment

The website is automatically deployed using GitHub Actions whenever changes are pushed to the `main` branch. The deployment process:

1. Triggers on push to `main` branch
2. Builds the site using the Astro build process
3. Deploys to GitHub Pages
4. Makes the site available at [www.thebigbangcollective.com](https://www.thebigbangcollective.com)

The deployment configuration can be found in `.github/workflows/deploy.yml`.

## 🤝 Contributing

We welcome contributions! If you'd like to improve the website:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure your code follows the existing style and includes appropriate documentation.

## 👥 Maintainers

- [Orlando](https://github.com/Orlando-PB)
- [Kaj Siebert](https://github.com/kws)

