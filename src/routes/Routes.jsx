import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import Login from '../pages/Home/Login/Login'
import SignUp from '../pages/Home/SignUp/SignUp'
import RoomDetails from '../pages/Home/RoomDetails/RoomDetails'
import DashboardLayout from '../layouts/DashboardLayout'
import AddRoom from '../pages/Home/Dashboard/AddRoom'
import { getRoom } from '../api/rooms'
import MyBookings from '../pages/Home/Dashboard/MyBookings'
import MyListings from '../pages/Home/Dashboard/MyListings'
import PrivateRoute from './PrivateRoute'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children:[
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/room/:id',
        element: (
          <PrivateRoute>
            <RoomDetails></RoomDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) => getRoom(params.id),
      },
    ],
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/signup',
    element: <SignUp></SignUp>
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
       <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { path: '/dashboard/', 
      element: <MyBookings></MyBookings> 
    },
      { path: '/dashboard/add-room',
      element: <AddRoom></AddRoom> 
    },
      { path: '/dashboard/my-bookings', element: <MyBookings></MyBookings>},
      { path: '/dashboard/my-listings', element: <MyListings></MyListings> },]
  }
])
