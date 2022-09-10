import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography, Button } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useNavigate } from "react-router-dom";
import './Header.css';

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

function Header(props) {
    const {
        pages,
    } = props;
    const navigate = useNavigate();

    const renderTabs = () => {
        return pages.map((obj) =>
            <Button color="inherit" className="page-button" onClick={() => navigate(obj.path)}>
                <Typography variant='h4' color="#FFFFFF"> { obj.name } </Typography>
            </Button>
        )
    };

    return (
        <div>
            <ElevationScroll {...props}>
                <AppBar color='transparent' position='fixed' className="appbar">
                    <Toolbar className="toolbar">
                        <div className='logo'>
                            <Typography variant='h1' color="#FFFFFF"> LOGO </Typography>
                        </div>
                        <div className='page'>
                        { renderTabs() }
                        </div>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </div>
    );
};

export default Header;