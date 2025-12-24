import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { Loadable } from '../utils';

const Home = lazy(() => import('../../pages/Home'));
const GameDetail = lazy(() => import('../../pages/GameDetail'));
const Categories = lazy(() => import('../../pages/Categories'));
const SearchResults = lazy(() => import('../../pages/SearchResults'));
const NotFound = lazy(() => import('../../pages/NotFound'));

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
    path: '*',
    element: Loadable(NotFound)({})
  }
];