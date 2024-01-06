import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation";


const RootLayout =()=>{
    return (
        <>
            <Navigation />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout;