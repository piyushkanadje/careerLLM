
// import {NavLink, Link} from 'react-router-dom';
// const MainNavigation =()=>{
//     return (
//   <header>
//     <header>
//       <nav>
//         <ul>
//           <li>
//             <NavLink to='/' end>  HomePage </NavLink>
//           </li>
//           <li>
//             <Link to="/milestones">MileStones</Link>
//           </li>
//           <li>
//             <Link to="/Travel">Travel</Link>
//           </li>
//           <li>
//             <Link to="/for-recruiters">For Recruiters</Link>
//           </li>
//           <li>
//             <Link to="/projects"> Projects</Link>
//           </li>
//           <li>
//             <Link to="/blog">Blogs</Link>
//           </li>
//           <li>
//             <Link to="/contactme">
//               ContactMe!
//             </Link>
//           </li>
//         </ul>
//     </nav>
//     </header>
//   </header>

// )
// }

// export default MainNavigation;


import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export const Navigation = () => {
  return (
      <>
      <div className={classes.divs}>
        <nav className={ classes.navBox + " navbar navbar-expand-lg"} >
        <NavLink className={classes.navLogo + " navbar-brand"} to="/">
          <p className={classes.logoText}><img src="../../img/log.png"/></p>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className={classes.mlauto + " navbar-nav"}>
            <li className="nav-item ">
              <NavLink className={ classes.navLink + " nav-link"} to="/" exact>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={ classes.navLink + " nav-link"}to="/resumeChat">
                ResumeChat
              </NavLink>
            </li>
            <li className=  "nav-item">
              <NavLink className={ classes.navLink + " nav-link"} to="/interview">
                InterviewChat
              </NavLink>
            </li>
            <li className=  "nav-item">
              <NavLink className={ classes.navLink + " nav-link"} to="/dashboard">
              ResumeParser
              </NavLink>
            </li>
            <li className=  "nav-item">
            <NavLink className={classes.navLink + " btn btn-primary btn-sm"} to="/register">SignUp/LogIn</NavLink>
            </li>
          </ul>
        </div>
        
      </nav>
        </div>
      </>
  );
};


