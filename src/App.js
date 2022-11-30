import './App.css';
import React, { useEffect } from 'react';
import MainRoutes from './routes/MainRoutes';
import { useNavigate } from 'react-router-dom';
import { GlobalStoreContext } from './Context/GlobalContext';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate('/login');
    }
  }, [sessionStorage.getItem('token')]);
  return (
    <React.Fragment>
      <GlobalStoreContext>
        <MainRoutes />
      </GlobalStoreContext>
    </React.Fragment>
  );
}

export default App;
