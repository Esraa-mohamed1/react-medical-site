import { useEffect } from 'react';
import { postData } from './../services/api';

const useRefreshToken = () => {
    useEffect(() => {

        const interval = setInterval(() => {
            postData('/users/refresh/')
                .then(response => {
                    localStorage.setItem('access', response.access);
                    localStorage.setItem('refresh', response.refresh);
                    console.log('Access token refreshed');
                })
                .catch(error => {
                    console.error('failed to get refresh tokens:', error);
                });
        }, 3 * 60 * 1000); // 3 minutes

        return () => clearInterval(interval); // cleanup on unmount
    }, []);
};

export default useRefreshToken;
