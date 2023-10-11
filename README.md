# Movies App
Web application that fetches data from https://github.com/lischetti-lorenzo/movies-app-backend. It allows you to see popular movies and TV shows, search movies and tv shows by name, details for specific movie or TV show, and the ability to mark your favorites.

# Features

- Sign up and log in.
- Explore popular movies and TV shows.
- Search for movies or TV shows by name.
- Get detailed information about a specific movie or TV show.
- Mark your favorite movies or TV shows.

# Environment Variables

The application uses environment variables, therefore, before running the application, make sure to set up the environment variables in the .env file (you can follow the .env.template file as a guide).

# Getting Started

1. Clone the repository to your local machine:
```bash
$ git clone https://github.com/lischetti-lorenzo/movies-app-frontend.git
```

2. Navigate to the project directory:
```bash
$ cd movies-app-frontend
```

3. Install project dependencies:
```bash
$ npm install
```

4. Create a .env file in the root of the project and add the environment variables following the .env.template file.

5. Start the application:
```bash
$ npm run dev
```

6. Open your browser and visit http://localhost:${PORT} to see the application in action.

# Usage

Explore Movies and TV Shows: The home page showcases popular movies and shows. Click on a card to get more information.

Search: Use the search bar at the top to search for movies or TV shows by name.

Details: Click on a card to view specific details about a movie or TV show.

Favorites: Mark movies or TV shows as favorites by clicking the favorite icon. You can view your favorites on the Favorites page.
