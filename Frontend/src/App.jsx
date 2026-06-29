import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./Features/auth/auth.context.jsx"
import { InterviewProvider } from "./Features/interview AI/interview.context.jsx"

function App() {


  return (
    <>
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>

    </>
  )
}

export default App
