import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { Loadable } from '../utils';

const Home = lazy(() => import('../../pages/Home'));
const GameDetail = lazy(() => import('../../pages/GameDetail'));
const Categories = lazy(() => import('../../pages/Categories'));
const SearchResults = lazy(() => import('../../pages/SearchResults'));
const NotFound = lazy(() => import('../../pages/NotFound'));
const Blog = lazy(() => import('../../pages/Blog'));
const BlogDetail = lazy(() => import('../../pages/BlogDetail'));


const LicenseGame = lazy(() => import('../../pages/LicenseGame'));
const AboutUs = lazy(() => import('../../pages/AboutUs'));
const Terms = lazy(() => import('../../pages/Terms'));
const Privacy = lazy(() => import('../../pages/Privacy'));
const Contact = lazy(() => import('../../pages/Contact'));
const CookiesPage = lazy(() => import('../../pages/Cookies'));
export const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: Loadable(Home)({})
  },
  {
    path: 'game/:id',
    element: Loadable(GameDetail)({})
  },
  {
    path: 'categories',
    element: Loadable(Categories)({})
  },
  {
    path: 'search',
    element: Loadable(SearchResults)({})
  },
  {
    path: 'licenseGame',
    element: Loadable(LicenseGame)({})
  },
  {
    path: 'aboutUs',
    element: Loadable(AboutUs)({})
  },
  {
    path: 'terms',
    element: Loadable(Terms)({})
  },
  {
    path: 'privacy',
    element: Loadable(Privacy)({})
  },
  {
    path: 'contact',
    element: Loadable(Contact)({})
  },
  {
    path: 'cookies', 
    element: Loadable(CookiesPage)({})
  },
  {
    path: 'blog',
    element: Loadable(Blog)({})
  },
  {
    path: 'blog/:id',
    element: Loadable(BlogDetail)({})
  },
  {
    path: '*',
    element: Loadable(NotFound)({})
  }
];