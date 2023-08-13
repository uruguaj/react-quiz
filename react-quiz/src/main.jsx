import React, { useState, Suspense } from "react";
import ReactDOM from 'react-dom/client'
// import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import Quiz from "./quiz/quiz.jsx";

const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>
    },
    {
        path:"/quiz",
        element:<Quiz/>
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />

)
