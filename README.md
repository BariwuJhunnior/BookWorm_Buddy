# BookWorm Buddy

A modern, responsive web application designed for book lovers to discover, organize, and track their reading journey. Built with React, this app integrates with the Google Books API to provide a seamless experience for searching and managing books.

## Features

- **Book Search & Discovery**: Search through millions of books using the Google Books API
- **Reading Lists**: Create and manage your personal reading lists
- **Favorites**: Save your favorite books for quick access
- **Books Read Tracking**: Keep track of books you've completed
- **Detailed Book Views**: View comprehensive book information including descriptions, authors, and ratings
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS

## Tech Stack

- **Frontend**: React 19, React Router 7
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Icons**: React Icons
- **Utilities**: Lodash

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/bookworm-buddy.git
   cd bookworm-buddy
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Shared components (Layout, NavBar, Footer, etc.)
│   ├── BookCard.jsx     # Individual book display component
│   ├── BookDetailsModal.jsx  # Modal for book details
│   ├── BookDisplay.jsx  # Book list/grid display
│   ├── Pagination.jsx   # Pagination component
│   └── SearchBar.jsx    # Search input component
├── pages/
│   ├── HomePage.jsx     # Main search and discovery page
│   ├── BookDetails.jsx  # Individual book details page
│   ├── FavoritesPage.jsx # User's favorite books
│   ├── ReadingListPage.jsx # Reading list management
│   └── BooksReadPage.jsx # Completed books tracking
├── services/
│   ├── books.js         # Google Books API service
│   └── RandomBooksService.js # Random books service
├── store/
│   └── books/
│       ├── useBooksStore.js     # Main books state management
│       └── useRandomBooksStore.js # Random books state
├── config/
│   └── index.js         # Application configuration
└── utils/               # Utility functions
```

## API Integration

This application integrates with the Google Books API to fetch book data. The API key configuration is handled in `src/config/index.js`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Books API for providing comprehensive book data
- React community for excellent documentation and tools
- Tailwind CSS for the utility-first CSS framework

**Built as my capstone project**
