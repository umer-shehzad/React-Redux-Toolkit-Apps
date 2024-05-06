import { Outlet, Link } from "react-router-dom";

import { navStyle, linkStyle } from "../../constants/Style";

const Layout = () => {
    return (
        <>
            <nav>
                <ul style={navStyle}>
                    <li>
                        <Link to="/" style={linkStyle}>Home</Link>
                    </li>
                    <li>
                        <Link to="/counter-app" style={linkStyle}>Counter App</Link>
                    </li>
                    <li>
                        <Link to="/post" style={linkStyle}>Post App</Link>
                    </li>
                    <li>
                        <Link to="/feedback" style={linkStyle}>Feedback App</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
};

export default Layout;