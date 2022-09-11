import { useEffect, useState, cloneElement } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    useScrollTrigger
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';
import './Header.css';

function ElevationScroll(props) {
    const { children, window, showSide } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return cloneElement(children, {
        elevation: (trigger || showSide) ? 4 : 0,
        color: (trigger || showSide) ? 'secondary' : 'transparent',
    });
}

function Header(props) {
    const {
        pages,
    } = props;

    const [width, setWidth] = useState(window.innerWidth);
    const [showSide, setShowSide] = useState(false);

    useEffect(() => {
        const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const navigate = useNavigate();
    const isMobile = width <= 1200;

    const location = useLocation();

    let currPage = pages.find(
        page => location.pathname === page.path
      );

    const renderTabs = () => {
        if (currPage === undefined) {
            currPage = pages[0];
        }
        return pages.map((obj) =>
            <Button key={obj.name} color="inherit" className="header-page-button" onClick={() => navigate(obj.path)}>
                {
                    obj.name === currPage.name ?
                        <Typography variant='h4' color="#FFFFFF"> { "<" + obj.name + "/>" } </Typography>
                    :
                        <Typography variant='h4' color="#FFFFFF"> { obj.name } </Typography>
                }
            </Button>
        )
    };

    const showSideBar = () => {
        setShowSide(!showSide);
    };

    return (
        <div>
            {
                isMobile &&
                    <Sidebar
                        pages={pages}
                        show={showSide}
                        handleShow={showSideBar}
                    />
            }
            <ElevationScroll {...props} showSide={showSide}>
                <AppBar position='fixed' className="header-appbar">
                    <Toolbar className="toolbar">
                        {
                            isMobile &&
                                <IconButton
                                    color="primary"
                                    aria-label="menu"
                                    className="header-menu"
                                    onClick={showSideBar}
                                >
                                    <MenuIcon  sx={{ fontSize: 40 }}/>
                                </IconButton>
                        }
                        <div className={isMobile ? 'header-logo centered' : 'header-logo'}>
                            <Typography variant='h1' color="#FFFFFF"> LOGO </Typography>
                        </div>
                        {
                            !isMobile &&
                                <div className='header-page'>
                                    { renderTabs() }
                                </div>
                        }
                        {
                            isMobile &&
                                <div className='header-icon-place-holder' />
                        }
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </div>
    );
};

export default Header;