import { createBrowserRouter } from 'react-router-dom';
import Error from '~/pages/error/Error';
import Form from '~/pages/form/Form';
import Home from '~/pages/home/Home';

export const routes = createBrowserRouter([
  {
    path: '/*',
    element: <Error />,
    errorElement: <Error />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/create',
    element: <Form />,
  },
  {
    path: '/edit/:id',
    element: <Form />,
  },
]);
