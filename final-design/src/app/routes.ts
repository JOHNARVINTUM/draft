import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import { HomePage } from './pages/HomePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CoversPage } from './pages/CoversPage';
import { CoverDetailPage } from './pages/CoverDetailPage';
import { MagazinesPage } from './pages/MagazinesPage';
import { MagazineDetailPage } from './pages/MagazineDetailPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'articles', Component: ArticlesPage },
      { path: 'articles/:slug', Component: ArticleDetailPage },
      { path: 'covers', Component: CoversPage },
      { path: 'covers/:slug', Component: CoverDetailPage },
      { path: 'magazines', Component: MagazinesPage },
      { path: 'magazines/:slug', Component: MagazineDetailPage },
      { path: 'about', Component: AboutPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
