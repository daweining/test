import React, { useState, useEffect } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

export const Auth = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const fetch = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userId: '1',
      });
    }, 1000);
  });
  useEffect(() => {
    fetch().then((res) => {
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading ? (
        <Backdrop sx={{ color: 'black' }} open>
          <CircularProgress />
        </Backdrop>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

const withRoute = () => Component => (p) => {
  console.log(p);
  return (
    <Auth>
      <Component />
    </Auth>
  );
};

export default withRoute;
