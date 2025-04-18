# AI Readiness Assessment Tool

A web-based assessment tool to help organizations evaluate their readiness for AI implementation, with a specific focus on Zendesk integration capabilities.

## Project Goals

- Provide a comprehensive assessment of an organization's AI readiness
- Focus on Zendesk-specific features and capabilities
- Generate actionable insights and recommendations
- Offer a clear implementation path based on assessment results

## Features

- Interactive questionnaire covering multiple readiness dimensions
- Real-time scoring and evaluation
- Customized recommendations based on responses
- Mobile-responsive design
- Standalone HTML version available
- React-based web application version

## Technical Standards

- Modern React with TypeScript for type safety
- Vite for fast development and optimized builds
- Tailwind CSS for styling
- ESLint and Prettier for code quality
- Responsive design principles
- Accessibility compliance

## Project Structure

```
ai-readiness-app/
├── src/                    # Source code
│   ├── components/        # React components
│   ├── styles/           # CSS and Tailwind styles
│   └── assets/          # Static assets
├── public/               # Public assets
├── index.html           # Entry HTML file
├── vite.config.js       # Vite configuration
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Project dependencies
```

## Requirements

- Node.js >= 18.0.0
- npm >= 9.0.0

## Dependencies

Main dependencies:
- react: ^18.2.0
- react-dom: ^18.2.0
- tailwindcss: ^3.4.1
- vite: ^5.1.4
- @vitejs/plugin-react: ^4.2.1
- postcss: ^8.4.35
- autoprefixer: ^10.4.17

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Development Guidelines

- Follow React best practices and hooks patterns
- Use TypeScript for all new components
- Style components using Tailwind CSS utility classes
- Maintain mobile-first responsive design
- Write meaningful commit messages
- Keep components modular and reusable

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## License

MIT License 