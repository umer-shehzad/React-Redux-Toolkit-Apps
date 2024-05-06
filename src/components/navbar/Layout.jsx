import { Outlet, Link } from "react-router-dom";

const navStyle = {
    display: 'flex',
    listStyleType: 'none',
    padding: 0,
};

const linkStyle = {
    textDecoration: 'none', // Remove underline
    display: 'inline-block',
    padding: '10px 20px', // Add padding to make it look like a button
    backgroundColor: '#007bff', // Add background color
    color: '#fff', // Add text color
    borderRadius: '5px', // Add rounded corners
    margin: '0 10px', // Add margin between links
  };

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