import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root';
import Home from './pages/Home';
import Practice from './pages/Practice';
import AddCard from './pages/AddCard';
import Progress from './pages/Progress';
import UserState from './contexts/user/UserState';
import ModalState from './contexts/Modal/ModalState';
import Profile from './pages/Profile';
import LoginPage from './pages/Login';
import Shelf from './pages/Shelf';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'practice',
        element: <Practice />
      },
      {
        path: 'addcard',
        element: <AddCard />
      },
      {
        path: 'progress',
        element: <Progress />
      },
      {
        path:'profile',
        element:<Profile/>
      },
      {
        path:'login',
        element:<LoginPage/>
      },
      {
        path:'shelf',
        element:<Shelf/>
      },
      {
        path:'*',
        element:<h3 style={{textAlign:'center'}}>404 Not Found!!</h3>
      }
    ]
  }
])

function App() {
  return (
    <UserState>
      <ModalState>
        <RouterProvider router={router} />
      </ModalState>
    </UserState>
  );
}

export default App;
