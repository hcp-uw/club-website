import { useEffect } from 'react';
import { Typography, IconButton } from '@mui/material';
import Logo from '../../assets/HCPLogoText.png'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import './Home.css';

function Home(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='home-background'>
            <div className='home-container'>
                <img src={Logo} alt="logo" id="home-logo"/>
                <Typography id="motto" component="h2" variant="h4" color="primary"> Let's Git Good! </Typography>
                <IconButton
                    color="primary"
                    href="#home-body"
                    id="home-scroll-button"
                >
                    <ArrowCircleDownIcon sx={{ fontSize: 50 }} />
                </IconButton>
                <div id='home-body'>
                    <Typography id="objective" component="h4" variant="h5" color="primary">
                        Husky Coding Project’s objective is to break the circular reasoning of
                        <span id="purple"> “needing experience to get experience” </span>that prevents hundreds of students
                        from landing their first software internship or job.
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default Home;