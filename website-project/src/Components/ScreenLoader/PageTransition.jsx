// components/PageTransition.jsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScreenLoader from './ScreenLoader';

const PageTransition = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1000); // Adjust timing as needed

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <>
            {loading && <ScreenLoader />}
            {children}
        </>
    );
};

export default PageTransition;