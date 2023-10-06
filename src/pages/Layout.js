import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    {/* <li>
                        <Link to="/" className='nav-link active text-warning'>首頁</Link>
                    </li> */}
                    {/* <li>
                        <Link to="/contact">關於我們</Link>
                    </li>
                    <li>
                        <Link to="/redbaba">Redbaba</Link>
                    </li>
                    <li>
                        <Link to="*">錯誤頁面</Link>
                    </li> */}
                </ul>
            </nav>

            <Outlet />
        </>
    );
};

export default Layout;