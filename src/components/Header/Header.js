import { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';
import './Header.css';
import Logo from '../../assets/HCPLogoText-Crop.png'

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
                        <Typography variant='h5' color="#FFFFFF" fontSize="1.0rem"> { "<" + obj.name + "/>" } </Typography>
                    :
                        <Typography variant='h5' color="#FFFFFF"> { obj.name } </Typography>
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
            <AppBar position='fixed' className="header-appbar" elevation={4} color="secondary">
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
                    <img
                        onClick={() => navigate(pages[0].path)}
                        src={Logo}
                        alt="logo"
                        className={isMobile ? 'header-logo centered' : 'header-logo'}
                    />
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
        </div>
    );
};

export default Header;