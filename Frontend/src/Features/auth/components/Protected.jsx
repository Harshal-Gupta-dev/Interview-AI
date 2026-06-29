// import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import { useauth } from "../Hooks/useAuth";
import React from 'react'

const Protected = ({children}) => {
    const { loading, user } = useauth()
    
    if (loading) {
    return (
        <main className="h-screen w-screen bg-[#0d0e12] text-white flex flex-col items-center justify-center font-sans antialiased">
            <div className="relative flex flex-col items-center">
                {/* Modern Spinning Ring */}
                <div className="w-10 h-10 border-2 border-gray-800 border-t-[#ec4899] rounded-full animate-spin mb-4" />
                
                {/* Subtle Progress Typography */}
                <h1 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-mono animate-pulse">
                    Loading Data...
                </h1>
            </div>
        </main>
    );
}

    if(!user){
        return <Navigate to={'/login'}/>
    }

    return children
}

export default Protected
