import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Auth from "./Pages/Auth"
import {ToastContainer} from "react-toastify"
import EntryPortal from "./Pages/EntryPortal"
import ForgetPassword from "./Pages/ForgetPassword"



const App = () => {
  // for routing we are using modern routing here 
  const router = createBrowserRouter([
    {
      path:"/",
      element:<><EntryPortal/></>
    },
    {
      path:"/auth",
      element:<><Auth/></>

    },
    {
      path:"/forgetPassword/*",
      element:<><ForgetPassword/> </>
    }
  ])

  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={3000}
    closeOnClick
    pauseOnFocusLoss
    theme="colored"/>
    <RouterProvider router={router}/>
    </>
  )
}

export default App