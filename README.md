# Documentation


```markdown
# Task Management Application

A feature-rich task management application built with React, Redux, and Tailwind CSS v4. This project was developed as part of the **JdeRobot GSoC 2025 React Programming Challenge**.

![Task Manager Preview](./screenshots/preview.png)

## Features

### Core Features
- **Add, Edit, Delete Tasks** - Full CRUD operations for task management
- **Search** - Real-time search functionality to find tasks by title or description
- **Categories** - Organize tasks into Personal, Work, Groceries, and Health categories
- **Priority Levels** - Set High, Medium, or Low priority for each task
- **Due Dates** - Set and track due dates with visual indicators
- **Notifications** - Browser notifications for overdue and due-today tasks
- **Drag & Drop** - Reorder tasks with intuitive drag and drop
- **Persistent Storage** - All data saved to localStorage

### Filtering & Sorting
- Filter by completion status (All, Active, Completed)
- Filter by category
- Filter by priority
- Sort by date created, priority, due date, or title

### User Authentication
- User registration and login
- User-specific task lists
- Persistent authentication state

### UI/UX
- Modern, clean design with Tailwind CSS v4
- Responsive layout for all devices
- Smooth animations and transitions
- Color-coded priorities and categories
- Progress bar for task completion

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI Library |
| Redux Toolkit | 2.x | State Management |
| Tailwind CSS | 4.x | Styling |
| Webpack | 5.x | Module Bundler |
| react-dnd | 16.x | Drag and Drop |
| date-fns | 4.x | Date Utilities |

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## Usage Guide

### Getting Started

1. **Create an Account**
   - Open the application
   - Click "Sign Up" to create a new account
   - Enter username, email, and password

2. **Login**
   - Enter your credentials
   - Click "Sign In"

### Managing Tasks

#### Adding a Task
1. Click on the input field "Add a new task..."
2. Enter the task title
3. (Optional) Expand to set:
   - Description
   - Category (Personal, Work, Groceries, Health)
   - Priority (High, Medium, Low)
   - Due Date
4. Click "Add Task" or press Enter

#### Editing a Task
1. Click the (edit) button on a task
2. Modify the title or description
3. Click "Save" or press Enter
4. Press Escape to cancel

#### Completing a Task
- Click the checkbox next to any task to toggle completion
- Completed tasks move to the bottom and appear faded

#### Deleting a Task
1. Click the (delete) button
2. Confirm the deletion

#### Reordering Tasks
1. Hover over a task
2. Grab the ⋮⋮ (drag handle) on the left
3. Drag to the desired position
4. Release to drop

### Filtering & Searching

#### Search
- Type in the search bar to filter tasks by title or description
- Search updates in real-time

#### Status Filter
- **All** - Show all tasks
- **Active** - Show only incomplete tasks
- **Completed** - Show only completed tasks

#### Category Filter
- Select a category from the dropdown to filter

#### Priority Filter
- Select a priority level from the dropdown to filter

#### Sorting
- **Date Created** - Newest first
- **Priority** - High → Medium → Low
- **Due Date** - Earliest first
- **Title** - Alphabetical (A-Z)

### Notifications

1. Click "Enable" on the notification banner
2. Allow notifications in your browser
3. Receive alerts for:
   - Overdue tasks
   - Tasks due today
   - Daily summary

### User Account

#### Logout
1. Click your username/avatar in the header
2. Select "Sign Out"
3. Confirm logout

## Project Structure

```
task-management-app/
├── public/
│   └── index.html
├── src/
│   ├── index.jsx                 # Entry point
│   ├── App.jsx                   # Main application component
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthForm.jsx      # Login/Register form
│   │   │   └── UserMenu.jsx      # User dropdown menu
│   │   ├── DndProvider.jsx       # Drag and drop context
│   │   ├── DraggableTaskItem.jsx # Draggable task wrapper
│   │   ├── DueDateBadge.jsx      # Due date display component
│   │   ├── FilterBar.jsx         # Filter controls
│   │   ├── NotificationBanner.jsx # Permission request banner
│   │   ├── NotificationManager.jsx # Background notification handler
│   │   ├── SearchBar.jsx         # Search input component
│   │   ├── SortSelect.jsx        # Sort dropdown
│   │   ├── TaskForm.jsx          # Add task form
│   │   ├── TaskItem.jsx          # Individual task display
│   │   ├── TaskList.jsx          # Task list container
│   │   └── UrgentTasksAlert.jsx  # Overdue/today tasks alert
│   ├── hooks/
│   │   └── useNotifications.js   # Notification hook
│   ├── store/
│   │   ├── index.js              # Redux store configuration
│   │   ├── selectors.js          # Memoized selectors
│   │   └── slices/
│   │       ├── authSlice.js      # Authentication state
│   │       └── tasksSlice.js     # Tasks state
│   ├── utils/
│   │   ├── authStorage.js        # Auth localStorage utilities
│   │   └── localStorage.js       # Tasks localStorage utilities
│   └── styles/
│       └── index.css             # Tailwind CSS styles
├── webpack.config.js             # Webpack configuration
├── postcss.config.js             # PostCSS configuration
├── babel.config.js               # Babel configuration
├── package.json
└── README.md
```

## Configuration

### Webpack Configuration

The application uses Webpack 5 with the following features:
- Babel loader for JSX transformation
- PostCSS loader for Tailwind CSS
- HTML Webpack Plugin for template generation
- Development server with hot reloading

### Tailwind CSS v4

Custom theme configuration in `src/styles/index.css`:
- Custom color palette for priorities and categories
- Custom animations (fade-in, slide-in)
- Reusable component classes

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run dev` | Start dev server and open browser |
| `npm run build` | Build for production |
| `npm test` | Run tests (if configured) |

## Responsive Design

The application is fully responsive and works on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1280px+)

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader friendly

## 🔒 Security Notes

> ⚠️ **Important**: This application uses localStorage for data persistence and a simple hash function for passwords. This is suitable for demonstration purposes only.

For production use, consider:
- Implementing a backend server with secure authentication
- Using bcrypt for password hashing
- Implementing JWT tokens
- Using HTTPS
- Adding rate limiting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**[Loay Tarek Mostafa]**
- GitHub: [@username](https://github.com/LoayTarek5)
- LinkedIn: [LinkedIn](https://linkedin.com/in/loay-tarek-682905221)
- Email: loayelnoamani@gmail.com

## 🙏 Acknowledgments

- [JdeRobot](https://jderobot.github.io/) - For the GSoC challenge
- [React](https://react.dev/) - UI Library
- [Redux Toolkit](https://redux-toolkit.js.org/) - State Management
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [react-dnd](https://react-dnd.github.io/react-dnd/) - Drag and Drop

---

## 📊 Features Checklist

| Feature | Status |
|---------|--------|
| Add/Remove/Complete Tasks | ✅ |
| Filter by Status | ✅ |
| Task Categories | ✅ |
| Task Priority | ✅ |
| Priority Sorting | ✅ |
| Search Functionality | ✅ |
| Drag and Drop | ✅ |
| Due Dates | ✅ |
| Due Date Notifications | ✅ |
| User Authentication | ✅ |
| Responsive Design | ✅ |
| localStorage Persistence | ✅ |
| Webpack Configuration | ✅ |

---

<p align="center">
  Made with ❤️ for JdeRobot GSoC 2025
</p>
```

