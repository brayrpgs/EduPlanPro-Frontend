import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from "../icons/MainIcons/HomeIcon";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
  //  const commonClass = "text-sm text-blue-600 hover:underline";

    return (
        <nav className="breadcrumbs bg-gray-100 p-2 rounded-md shadow-sm max-w-full max-h-[5vh] overflow-hidden">
            <ul className="flex space-x-2 text-sm text-white-700">
                <li>
                    <div className="absolute left-[1%] h-[10.5vh] w-[15vh]"> 
                        <Link to="/" className="text-white-600 hover:underline">
                        <HomeIcon/>
                        </Link>
                    </div>
                </li>
   
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <React.Fragment key={to}>
                            <li className="flex items-center">
                                {isLast ? (
                                    <span className="font-semibold text-gray-900">{value}</span>
                                ) : (
                                    <Link to={to} className="text-blue-600 hover:underline">{value}</Link>
                                )}
                            </li>
                            {!isLast && <li className="text-gray-500">/</li>}
                        </React.Fragment>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;