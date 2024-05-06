import { Outlet, Link } from "react-router-dom";

import { navStyle, linkStyle } from "../../constants/Style";

const PostLayout = () => {
    return (
        <>
            <nav>
                <ul style={{ ...navStyle, justifyContent:'center' }}>
                    <li>
                        <Link to="/post" style={linkStyle}>Posts</Link>
                    </li>
                    <li>
                        <Link to="/post/add" style={linkStyle}>Add Post</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
};

export default PostLayout;