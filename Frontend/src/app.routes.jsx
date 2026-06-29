import { createBrowserRouter } from "react-router";
import Login from "./Features/auth/pages/Login.jsx"
import Register from "./Features/auth/pages/Register.jsx"
import App from "./App.jsx"
import Protected from "./Features/auth/components/Protected.jsx";
import Home  from "./Features/interview AI/pages/Home.jsx";
import Interview from "./Features/interview AI/pages/Interview.jsx";

export const router= createBrowserRouter([
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/',
        element:<Protected><Home/></Protected>
    },
    {
        path:'/interview/:interview',
        element:<Protected><Interview/></Protected>   
    }
])