import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Auth from "./Pages/Auth"
import EntryPortal from "./Pages/EntryPortal"



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
    // {
    //   path:"/mailverify",
    //   element:<> </>
    // }
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App