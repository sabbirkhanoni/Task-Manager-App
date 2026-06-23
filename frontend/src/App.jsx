import React from "react"
import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <main>
        <Outlet />
      </main>

       <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  )
}

export default App
