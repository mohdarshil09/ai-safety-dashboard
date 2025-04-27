# AI Safety Incident Dashboard

A React application for tracking, reporting, and managing AI safety incidents.

## Project Overview

This dashboard provides a centralized platform to:
- View and filter AI safety incidents by severity level
- Sort incidents by date reported
- Report new incidents through a user-friendly form
- Monitor AI safety trends and issues

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:

```
npm install
```

### Running the Application

To start the development server:

```
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To create a production-optimized build:

```
npm run build
```

The build files will be located in the `build` folder.

## Features

- **Incident Tracking**: View a list of reported AI safety incidents
- **Filtering**: Filter incidents by severity (Low, Medium, High)
- **Sorting**: Sort incidents by date (newest or oldest first)
- **Incident Reporting**: Submit new AI safety incidents through a form
- **Responsive Design**: Works across desktop and mobile devices

## Tech Stack

- React 19
- TypeScript
- CSS

## Project Structure

- `/components`: React components
- `/data`: Mock data and data utilities
- `/styles`: CSS stylesheets
- `/types`: TypeScript type definitions

## Design Decisions and Challenges

### Technical Choices
- **React with TypeScript**: Chosen for type safety and improved developer experience
- **Component Architecture**: Designed with reusability and separation of concerns in mind
- **State Management**: Used React's built-in useState for managing application state
- **CSS Modules**: Implemented to avoid styling conflicts and improve maintainability

### Challenges Addressed
- **Data Modeling**: Designing a flexible incident model that captures varied AI safety scenarios
- **User Experience**: Balancing comprehensive incident reporting with simplicity
- **Performance Optimization**: Ensuring efficient rendering with potentially large incident datasets
- **Responsive Design**: Creating a dashboard that works across devices with different screen sizes

### Future Improvements
- Implement user authentication and role-based access control
- Add data visualization for incident trends
- Integrate with a backend for persistent storage
- Add export functionality for reports

## License

This project is open source and available under the MIT license.
