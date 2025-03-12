# Wake Todo Frontend

Welcome to the **Wake Todo Frontend** repository! This project is a simple yet functional Todo application built with modern web technologies. It features a mock backend server for development purposes, allowing you to test and interact with the application without setting up a full-fledged backend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
    - [Starting the Mock Backend Server](#starting-the-mock-backend-server)
    - [Starting the Frontend Application](#starting-the-frontend-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)

## Features

- **Add Tasks**: Easily add new tasks to your todo list.
- **Edit Tasks**: Modify existing tasks by double-clicking on them.
- **Delete Tasks**: Remove tasks that are no longer needed.
- **Task Categories**: View counts of tasks based on their status: incomplete, complete, and deleted.
- **Theme Switcher**: Toggle between light and dark modes for a personalized experience.
- **Language Switcher**: Change the application language as per your preference.
- **Mock Backend**: Utilize a mock backend powered by `json-server` for development and testing.

## Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/): A React framework for production.
  - [React](https://reactjs.org/): A JavaScript library for building user interfaces.
  - [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript.
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework.
  - [ShadCN](https://ui.shadcn.com/):A highly customizable and accessible UI component library for React
- **Backend**:
  - [json-server](https://github.com/typicode/json-server): A full fake REST API for testing and prototyping.
- **Testing**:
  - [Jest](https://jestjs.io/): A delightful JavaScript testing framework.
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro): Simple and complete React DOM testing utilities.
- **Development Tools**:
  - [Storybook](https://storybook.js.org/): UI component explorer for frontend developers.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. **Clone the repo**
```
    git clone https://github.com/mubashir-irfan/wake_todo_frontend.git
    cd wake_todo_frontend
```
2. **Installing Dependencies**

Using `npm install` or `yarn install`

3. **Installing Mock Backend Dependencies (for local development)**

The codebase has a local file-system based mock backend, to facilitate isolated development and testing. It's essentially an indepdent package and needs its own dependencies
```
    cd mock-backend
    npm install or yarn install
```
### Running the Application
1. **Running the mock backend**
```
    cd mock-backend
    node server.js
```
By default, the mock backend will be accessible at ` http://localhost:3003`
2. **Starting the Frontend Application**
In a terminal session different from mock-backend's, run `npm run dev or yarn dev`
By default, the application will be accessible at `http://localhost:3000`

## Project Structure

The application follows a modular, feature-isolation structure. The structure envisions the app size and team growing with time, hence provides a feature-level isolation so that teams can work without unnecessary conflicts.

- Global entities are present directly inside src (e.g src/contexts hosts global contexts)
- Feature level entities (components,types,hooks) have their isolated structure inside src/app/[feature])
- Shared entities are present inside src/shared

## Available scripts
In the project directory, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Runs the built application in production mode.
- `npm run lint`: Lints the codebase for potential issues.
- `npm run test`: Runs the test suite.
- `npm run storybook`: Starts the Storybook server for component exploration.

## Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Commit your changes (git commit -m 'Add YourFeature').
4. Push to the branch (git push origin feature/YourFeature).
5. Open a pull request.
