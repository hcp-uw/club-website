import { useEffect, useState } from 'react';
import { Typography, IconButton } from '@mui/material';
import Logo from '../../assets/HCPLogoText-Crop.png'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import './Home.css';


function Home(props) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 800;

    return (
        <div className='home-container'>
            <div id="home-logo-container">
                <img src={Logo} alt="logo" id="home-logo"/>
                <Typography id="motto" component="h2" variant="h4" color="primary">
                    Let's Git Good!
                </Typography>
                <div id="home-scroll-button">
                    <IconButton
                        color="primary"
                        href="#home-scroll-button"
                    >
                        <ArrowCircleDownIcon sx={{ fontSize: 50 }} />
                    </IconButton>
                </div>
            </div>
            <div id={isMobile ? 'home-body-mobile' : 'home-body'}>
                <Typography id="objective" variant="subtitle1" color="primary">
                    Husky Coding Project’s objective is to break the circular reasoning of
                    <Typography id="objective" component="span" variant="subtitle1" color="secondary">
                        &nbsp;“needing experience to get experience”&nbsp;
                    </Typography>
                    that prevents hundreds of students
                    from landing their first software internship or job.
                </Typography>
            </div>
        </div>
    );
}


export default Home;
