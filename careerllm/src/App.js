// import logo from "./logo.svg";
import React from "react";
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from "./components/LoginComponent";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import "./App.css";
import { Fragment } from 'react';
import  {createBrowserRouter, RouterProvider} from 'react-router-dom';
const router = createBrowserRouter([{
  path: '/',  
  element: <RootLayout/>,
  children: [
    {
      path: "/",
      element: <Home/>,
    },
    {
      path:"/login",
      element: <LoginComponent/>
    },
    {
      path:"/register",
      element:<RegisterComponent />

    },
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
