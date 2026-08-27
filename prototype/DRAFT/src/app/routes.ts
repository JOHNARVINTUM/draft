import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import { HomePage } from './pages/HomePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CoversPage } from './pages/CoversPage';
import { MagazinesPage } from './pages/MagazinesPage';
import { AboutPage } from './pages/AboutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'articles', Component: ArticlesPage },
      { path: 'articles/:slug', Component: ArticleDetailPage },
      { path: 'covers', Component: CoversPage },
      { path: 'magazines', Component: MagazinesPage },
      { path: 'about', Component: AboutPage },
    ],
  },
]);
