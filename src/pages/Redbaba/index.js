import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Redbaba = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/redbaba/redchild1">redchild1</Link>
                    </li>
                    <li>
                        <Link to="/redbaba/redchild2">redchild2</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    );
};

export default Redbaba;