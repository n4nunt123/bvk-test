import { createBrowserRouter } from 'react-router-dom'
import Main from '../views/Main'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  }
])

export default router