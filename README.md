# BookWorm Buddy

A modern, responsive web application for book enthusiasts to discover, explore, and manage their reading journey. Built as a capstone project using React and powered by the Open Library API.

## Description

BookWorm Buddy is a comprehensive book management application that allows users to search for books, view detailed information, and organize their reading lists. The app features a clean, intuitive interface with responsive design that works seamlessly across all devices.

## Features

- **Book Search**: Search through millions of books using the Open Library database
- **Book Details**: View comprehensive information about books including summaries, authors, and covers
- **Reading Lists**: Organize books into Favorites, Reading List, and Books Read categories
- **Responsive Design**: Fully responsive layout that adapts to mobile, tablet, and desktop screens
- **Pagination**: Efficient browsing through large result sets with automatic scroll-to-top functionality
- **Persistent Storage**: Reading lists are saved locally using Zustand state management
- **Modern UI**: Beautiful interface built with Tailwind CSS and smooth animations

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Icons**: React Icons
- **API**: Open Library API
- **Build Tool**: Vite
- **Linting**: ESLint

## Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/bookworm-buddy.git
   cd bookworm-buddy
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   The application uses environment variables for API endpoints. A `.env` file is already configured with the necessary Open Library API URLs.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

### Searching for Books

- Use the search bar on the home page to find books by title, author, or keywords
- The app loads with random default books to get you started
- Results are paginated for easy browsing

### Managing Reading Lists

- **Favorites**: Save books you're interested in
- **Reading List**: Track books you plan to read
- **Books Read**: Keep a record of completed books

### Navigation

- Use the responsive navigation menu (hamburger menu on mobile)
- Access different sections: Home, Favorites, Reading List, Books Read
- Click on any book card to view detailed information

## Project Structure

```
bookworm-buddy/
├── public/
│   └── BookWormBuddy.jpg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Layout.jsx
│   │   │   ├── NavBar.jsx
│   │   │   └── Footer.jsx
│   │   ├── BookCard.jsx
│   │   ├── BookDetailsModal.jsx
│   │   ├── BookDisplay.jsx
│   │   ├── Pagination.jsx
│   │   └── SearchBar.jsx
│   ├── config/
│   │   └── index.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── BookDetails.jsx
│   │   ├── FavoritesPage.jsx
│   │   ├── ReadingListPage.jsx
│   │   └── BooksReadPage.jsx
│   ├── services/
│   │   ├── books.js
│   │   └── RandomBooksService.js
│   ├── store/
│   │   └── books/
│   │       ├── useBooksStore.js
│   │       └── useRandomBooksStore.js
│   └── utils/
├── .env
├── package.json
├── vite.config.js
└── README.md
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Open Library](https://openlibrary.org/) for providing the book data API
- [React](https://reactjs.org/) for the amazing frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Zustand](https://zustand-demo.pmnd.rs/) for simple state management

---

Built as a capstone project.
