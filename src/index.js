import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from "./store/store"
import HomePage from './Pages/HomePage';
import WatchPage from './Pages/WatchPage';
import SearchPage from './Pages/SearchPage';
import PlaylistPage from './Pages/PlaylistPage';
import TrendingPage from './Pages/TrendingPage';
import LikedVideosPage from './Pages/LikedVideosPage';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/watch",
        element: <WatchPage />
      },
      {
        path: "/search",
        element: <SearchPage />
      },
      {
        path: "/playlist",
        element: <PlaylistPage />
      },
      {
        path: "/trending",
        element: <TrendingPage />
      },
      {
        path: "/liked",
        element: <LikedVideosPage />
      },
      {
        path: "/privacy",
        element: <Privacy />
      },
      {
        path: "/terms",
        element: <Terms />
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
