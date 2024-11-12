import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from './components/pages/HomePage'
import MovieListPage from './components/pages/MovieListPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "movie-list",
        element: <MovieListPage />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
