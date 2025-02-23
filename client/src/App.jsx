import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Auth from "./Pages/Auth"



const App = () => {
  // for routing we are using modern routing here 
  const router = createBrowserRouter([
    {
      path:"/",
      element:<><Auth/></>
    },
    // {
    //   path:"/login",
    //   element:<><Login/></>

    // },
    // {
    //   path:"/signup",
    //   element:<><SignUp/></>
    // }
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App