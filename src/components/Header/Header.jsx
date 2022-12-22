import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { logout } from '../../api/auth-service';
import { auth } from 'src/firebase/config';
import { AppContext } from 'src/Context/AppProvider';
import AccountMenu from '../AccountMenu/AccountMenu';

const Header = ({ setCoords }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);
  const { clearState } = React.useContext(AppContext);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  const handleLogOut = () => {
    logout();
    clearState();
    auth.signOut();
    navigate('/login');
  };
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          <Link to={'/home'} className={classes.link}>
            Travel Planner
          </Link>
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <SearchIcon sx={{ lineHeight: '15px' }} />
              <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
          </Autocomplete>
        </Box>
        {/* <Button variant="contained" color="secondary" onClick={handleLogOut}>
          Log Out
        </Button> */}
        <AccountMenu handleLogOut={handleLogOut} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
