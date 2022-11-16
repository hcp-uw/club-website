import { useEffect, useState } from 'react';
import { Typography, CircularProgress, Card, CardMedia, CardContent, Grid } from '@mui/material';
import { getPeople } from '../../api/api';
import './About.css';
import Logo2 from '../../assets/HCPLogo.jpg'

function About(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    const [width, setWidth] = useState(window.innerWidth);
    const [people, setPeople] = useState([]);
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
        const getData = async (data) => {
            setPeople(data);
            setLoading(false);
        }
        getPeople(getData);
    })

    const renderProblemStatement = () => {
        return(
        <div id={isMobile ? 'about-body-mobile' : 'about-body'}>
            <Typography className="about-title" component="h4" variant="h4" color="primary"> 
            What is the Problem?
                </Typography>
                <br/>
                <Typography id="objective" variant="subtitle1" color="primary">
            The majority of projects offered by CS coursework are solo or in pairs, 
            so future programmers miss out on the invaluable experience of working in larger teams. 
            The leading motivation to do CS class projects are for grades, rather than for the learning experience.
            </Typography>
            <br/>
            <Typography id="objective" variant="subtitle1" color="primary">
            Getting internships is the best ways to gain real world experience on the job. 
            However, it is also quite difficult to obtain without having some prior experience.
            </Typography>
            <br/>
            <Typography id="objective" variant="subtitle1" color="primary">
            This circular logic plagues every generation of programmers.
            </Typography>
        </div>
        )
    }

    const renderMissionStatement = () => {
        return(
        <div id={isMobile ? 'about-body-mobile' : 'about-body'}>
            <Typography className="about-title" component="h4" variant="h4" color="primary"> 
            Our Mission
                </Typography>
                <br/>
                <Typography id="objective" variant="subtitle1" color="primary">
                To create a tech internship-like environment that promotes the growth and development of our club members. 
                We provide team-based programming project experience and encouraging
                <Typography component="span" color="accent.main" variant="subtitle1">
                    &nbsp;peer-to-peer learning.&nbsp;
                    </Typography>
                </Typography>
                <br/>
                <Typography id="objective" variant="subtitle1" color="primary">
                To provide the next generation of programmers & designers with the tools and experience to 
                <Typography component="span" color="accent.main" variant="subtitle1">
                    &nbsp;succeed in future tech careers.&nbsp;
                    </Typography>
                </Typography>
        </div>
        )
    }

    const renderClubValues = () => {
        return(
        <div id={isMobile ? 'about-body-mobile' : 'about-body'}>
            <Typography className="about-title" component="h4" variant="h4" color="primary">
                Club Values
                <br/>
                <br/>
            </Typography>
            <br/>
                <Typography id="objective" variant="subtitle1" color="primary">Listen Loudly</Typography>
                <br/>
                <Typography id="objective" variant="subtitle1" color="primary">Freedom to Fail</Typography>
                <br/>
                <Typography id="objective" variant="subtitle1" color="primary">Turn Talk to Action</Typography>
                <br/>
                <Typography id="objective" variant="subtitle1" color="primary">Respect for all Folx</Typography>
        </div>
        )
    }

    const renderPerson = (data) => {
        return (
            <Card key={data.id} className="about-team" elevation={12} sx={{ width: 200, height: 270 }}>
                <CardMedia 
                component="img" 
                style={{height: 150}}
                image={ data.image !== null ? data.image : Logo2 } 
                alt="person image"  
                />
                <CardContent>
                    <Typography gutterBottom variant="subtitle3" component="div" color="primary">
                    {data.name}
                    </Typography>
                    <Typography variant="subtitle2" component="div" color="primary">
                        Role: {data.role}
                        <br/>
                        Year: {data.year}
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    const displayTeam = () => {
        if (loading) {
            return <CircularProgress color='secondary' style={{alignSelf: "center"}}/>;
        }
        if (isMobile2 && people.length === 3) {
            return (
                <>
                <div id='about-teams'>
                    { renderPerson(people[0]) }
                    { renderPerson(people[1]) }
                    { renderPerson(people[2]) }
                </div>
                </>
            );
        }
        return (
            <div id={isMobile ? 'about-team-mobile' : 'about-teams'}>
                <Grid container spacing={4} direction="row" justifyContent={'center'}  alignItems="center" marginTop={5} marginLeft={0}>
                { people.map((obj) => renderPerson(obj)) }
                </Grid>
            </div>
        );
    }

    const renderTeam = () => {
        return(
        <div id={isMobile ? 'about-body-mobile' : 'about-body'}>
            <Typography className="about-title" component="h5" variant="h4" color="primary">
                Our Team
            </Typography>
            <br/>
            <br/>
            <br/>
            { displayTeam() }
        </div>
        )
    }


    return (
        <div className='about-container'>
            { renderProblemStatement() }
            { renderMissionStatement() }
            { renderClubValues() }
            { renderTeam() }
        </div>
    );
};

export default About;



