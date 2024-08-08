# Kanban Project

This project is a Kanban board application built using **Next.js** and **TypeScript**, with drag-and-drop functionality powered by **@dnd-kit/core** and **@dnd-kit/sortable**.

![Kanban Board Preview](https://path-to-image.png)

## Features

- **Drag-and-Drop**: Intuitive drag-and-drop functionality using `@dnd-kit/core` and `@dnd-kit/sortable`.
- **Column Management**: Add, remove, and manage columns on your board.
- **Task Management**: Add tasks to different columns, move them between columns, and organize your workflow efficiently.
- **Project Overview**: Navigate between different projects easily.

## Tech Stack

- **Next.js**: A React framework for production.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **@dnd-kit/core**: A modern drag-and-drop toolkit for React.
- **@dnd-kit/sortable**: Extension of `@dnd-kit/core` for sorting and reordering items.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   \`\`\`bash
   git clone https://github.com/yourusername/kanban-project.git
   \`\`\`

2. Navigate to the project directory:

   \`\`\`bash
   cd kanban-project
   \`\`\`

3. Install the dependencies:

   \`\`\`bash
   npm install
   \`\`\`

4. Start the development server:

   \`\`\`bash
   npm run dev
   \`\`\`

   The app should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

- **Creating Columns**: Use the "Add Column" button to create new columns on the board.
- **Managing Tasks**: Click on the "+" icon in any column to add a new task. Drag tasks between columns to update their status.
- **Customization**: The project is built with flexibility in mind. You can easily extend it to fit your specific needs.

## Project Structure

- **`components/`**: Contains reusable React components.
- **`pages/`**: Contains the Next.js pages.
- **`styles/`**: Contains the tailwind files.
- **`utils/`**: Contains utility functions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
