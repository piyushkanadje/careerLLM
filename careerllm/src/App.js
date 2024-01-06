// import logo from "./logo.svg";
import React from "react";
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from "./components/LoginComponent";
import DashboardComponent from "./components/DashboardComponent";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import JobComparatorComponent from "./components/JobComparatorComponent";

import "./App.css";
import { Fragment } from 'react';
import  {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ResumeChat from "./components/resumeChat";
import InterviewChat from "./components/interviewChat";

const router = createBrowserRouter([{
  path: '/',  
  element: <RootLayout/>,
  children: [
    {
      path: "/",
      element: <Home/>,
    },
    {
      path:"/resumeChat",
      element: <ResumeChat />

    },
    {
      path:"/login",
      element: <LoginComponent/>
    },
    {
      path:"/register",
      element:<RegisterComponent />

    },
    {
      path:"/dashboard",
      element:<DashboardComponent />
    },
    {
      path:"comparison",
      element:<JobComparatorComponent />
    },{
      path:"/interview",
      element:<InterviewChat />
    }
  ]
}])
const App = () => {
  return (
    
    <Fragment>
      <RouterProvider router={router}/>
    </Fragment>
  );
}

export default App;
