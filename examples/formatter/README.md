# SimC AST Formatter

A web-based tool for parsing and visualizing SimulationCraft (SimC) code by generating an Abstract Syntax Tree (AST).

## Features

- Parse SimC code and generate an AST
- Visualize the AST in both text and graphical formats
- Optimize the AST for better readability
- Syntax highlighting for SimC code
- Dark and light theme support

## Technology Stack

- **Frontend Framework:** Svelte 5
- **UI Framework:** Bulma CSS
- **Code Editor:** Monaco Editor
- **Visualization:** Konva.js
- **Parser:** simc-ast-builder
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v8 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/simc-ast-builder.git
   cd simc-ast-builder/examples/formatter-new
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `build` directory and can be served using any static file server.

To preview the production build locally:

```bash
npm run preview
```

## Usage

1. Enter your SimC code in the editor
2. Click "Parse Code" to generate the AST
3. Toggle between "Text View" and "Visual Tree" to visualize the AST
4. Use the "Optimize AST" option to simplify complex conditions

## Development

### Code Structure

- `src/lib/components/` - Reusable components
- `src/lib/types/` - TypeScript type definitions
- `src/routes/` - SvelteKit routes
- `src/theme/` - Theme-related styles

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run check` - Run TypeScript checks
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint

## License

This project is licensed under the MIT License - see the LICENSE file for details.
