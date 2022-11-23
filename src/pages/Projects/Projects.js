import { useEffect, useState } from 'react';
import { Typography, Button, CircularProgress, Card, CardActions, CardMedia, CardContent, } from '@mui/material';
import { getProjects } from '../../api/api';
import './Projects.css';
import Logo2 from '../../assets/HCPLogo.jpg'

function Projects(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [width, setWidth] = useState(window.innerWidth);
    const [projects, setProjects] = useState([]);
    const [pastProjects, setPastProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const isMobile = width <= 800;
    const isMobile2 = width <= 1000 && width > 800;

    useEffect(() => {
        const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    useEffect(() => {
        const getData1 = async (data) => {
            setPastProjects(data);
            setLoading(false);
        }
        const getData = async (data) => {
            setProjects(data);
            getProjects(getData1, false);
        }
        getProjects(getData, true);
    }, []);

    const renderActiveProjects = () => {
        return(
        <div id={isMobile ? 'projects-body-mobile' : 'projects-body'}>
        <Typography className="projects-title" component="h4" variant="h4" color="primary"> Active Projects </Typography>
        <br/>
        <br/>
        { displayActiveProjects() }
        </div>
        )
    }

    const renderPastProjects = () => {
        return(
        <div id={isMobile ? 'projects-body-mobile' : 'projects-body'}>
        <Typography className="projects-title" component="h4" variant="h4" color="primary"> Past Projects </Typography>
        <br/>
        <br/>
        { displayPastProjects() }
        </div>
        )
    }

    const renderProjectCard = (data) => {
        return (
            <div key={data.name}>
                <Card key={data.name} className="project-card" elevation={12} sx={{ width: 300, height: 400 }}>
                    <CardMedia
                        component="img"
                        style={{height: 170}}
                        image={ data.image !== null ? data.image : Logo2 }
                        alt="project image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="subtitle1" fontWeight={500} component="div" color="primary">
                            {data.name}
                        </Typography>
                        <Typography align="left" variant="subtitle2" color="primary" sx={{wordWrap: 'break-word', marginBottom:'-10px'}}>
                            {data.description.length > 220 ? data.description.slice(0, 220) + '...' : data.description}
                        </Typography>
                    </CardContent>
                    <div className="flex-grow" />
                    <CardActions id="home-event-learn-more">
                        <Button size="small" color='primary' onClick={() => window.open(data.gitLink)}>Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }

    const displayActiveProjects = () => {
        if (loading) {
            return <CircularProgress color='secondary' style={{alignSelf: "center"}}/>;
        }
        if (isMobile2 && projects.length === 3) {
            return (
                <div id='about-teams'>
                    { renderProjectCard(projects[0]) }
                    { renderProjectCard(projects[1]) }
                    { renderProjectCard(projects[2]) }
                </div>
            );
        }
        return (
            <div id='project-grid'>
                { projects.map((obj) => renderProjectCard(obj)) }
            </div>
        );
    }
    
    const displayPastProjects = () => {
        if (loading) {
            return <CircularProgress color='secondary' style={{alignSelf: "center"}}/>;
        }
        if (isMobile2 && projects.length === 3) {
            return (
                <div id='about-teams'>
                    { renderProjectCard(pastProjects[0]) }
                    { renderProjectCard(pastProjects[1]) }
                    { renderProjectCard(pastProjects[2]) }
                </div>
            );
        }
        return (
            <div id='project-grid'>
                { pastProjects.map((obj) => renderProjectCard(obj)) }
            </div>
        );
    }
    return (
        <div className='projects-container'>
                { renderActiveProjects() }
                { renderPastProjects() }
        </div>
    );
};

export default Projects;