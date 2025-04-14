import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css'; // Optional: Add custom styles for breadcrumbs

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav className="breadcrumbs">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <li key={to}>
                            {isLast ? (
                                <span>{value}</span>
                            ) : (
                                <Link to={to}>{value}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;