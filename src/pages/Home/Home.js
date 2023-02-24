import { useEffect, useState } from "react";
import {
    Typography,
    IconButton,
    Paper,
    CircularProgress,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
} from "@mui/material";
import Logo from "../../assets/HCPLogo-highres.png";
import Logo2 from "../../assets/HCPLogo.jpg";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { getFeaturedEvents } from "../../api/api";
import { useNavigate } from "react-router-dom";
import "./Home.css";

/**
 * Main Application page
 */
function Home(props) {

    // Scroll to top of page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [width, setWidth] = useState(window.innerWidth);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Determines the width of the page
    useEffect(() => {
        const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    // Uses the getFeaturedEvents API
    useEffect(() => {
        const getData = async (data) => {
            setEvents(data);
            setLoading(false);
        };
        getFeaturedEvents(getData);
    });

    // Sizes of page
    const isMobile = width <= 800;
    const isMobile2 = width <= 1000 && width > 800;
    // Allows navigation per page
    const navigate = useNavigate();

    // Renders the club motto
    const renderMotto = () => {
        return (
            <div className={isMobile ? "home-body-mobile" : "home-body"}>
                <Typography id="objective" variant="subtitle1" color="primary">
                    Husky Coding Project’s objective is to break the circular reasoning of
                    <Typography component="span" color="accent.main" variant="subtitle1">
                        &nbsp;“needing experience to get experience”&nbsp;
                    </Typography>
                    that prevents hundreds of students
                    from landing their first software internship or job.
                </Typography>
            </div>
        );
    };

    // Renders the logo
    const renderLogo = () => {
        return (
            <div id="home-logo-container">
                <img src={Logo} alt="logo" id="home-logo" />
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
        );
    };

    // Renders the club meeting location and time
    const renderMeetingDetails = () => {
        return (
            <div className={isMobile ? "home-body-mobile" : "home-body"}>
                <Typography className="home-title" component="h4" variant="h4" color="primary">
                    General Meetings
                </Typography>
                <br />
                <Typography component="h2" variant="subtitle1" color="primary">
                    Join us every
                    <Typography component="span" color="accent.main" variant="subtitle1">
                        &nbsp;Tuesday&nbsp;
                    </Typography>
                    from
                    <Typography component="span" color="accent.main" variant="subtitle1">
                        &nbsp;6:00pm to 7:30pm PST&nbsp;
                    </Typography>
                    at
                    <Typography component="span" color="accent.main" variant="subtitle1">
                        &nbsp;MEB 238
                    </Typography>
                    !
                </Typography>
                <Paper id="home-meeting" elevation={12} style={{ background: "dark.light" }}>
                    <div id="home-paper-vr">
                        <iframe
                            title="OUG141"
                            id="home-vr"
                            style={{ border: "0px" }}
                            allowFullScreen
                            scrolling="no"
                            src="https://www.washington.edu/classroom/vrview/index.html?image=https://features.classrooms.uw.edu/room-images/panoramas/MEB_238_panorama.jpg&amp;"
                        />
                    </div>
                    <Typography component="h2" variant="caption" color="primary">
                        Mechanical Engineering Building 238, University of Washington
                    </Typography>
                </Paper>
            </div>
        );
    };

    // Renders a single event
    const renderEvent = (data) => {
        return (
            <Card key={data.name} className="home-event" elevation={12} sx={{ width: 300, height: 400 }}>
                <CardMedia
                    component="img"
                    style={{ height: 150 }}
                    image={ data.image !== null ? data.image : Logo2 }
                    alt="event image"
                />
                <CardContent>
                    <Typography gutterBottom variant="subtitle1" fontWeight={500} component="div" color="primary">
                        {data.name}
                    </Typography>
                    <Typography align="left" variant="subtitle2" color="primary" sx={{ wordWrap: "break-word", marginBottom:"-10px" }}>
                        {data.description.length > 220 ? data.description.slice(0, 220) + "..." : data.description}
                    </Typography>
                </CardContent>
                <div className="flex-grow" />
                <CardActions id="home-event-learn-more">
                    <Button size="small" color="primary" onClick={() => navigate("/events")}>Learn More</Button>
                </CardActions>
            </Card>
        );
    };

    // Renders multiple events
    const displayEvents = () => {
        if (loading) {
            return <CircularProgress color="secondary" style={{ alignSelf: "center" }}/>;
        }
        if (events.length === 0) {
            return <Typography component="h2" variant="subtitle1" color="primary">
            Sadly there are no featured events at this time, check again later!
            </Typography>;
        }
        if (isMobile2 && events.length === 3) {
            return (
                <>
                    <div id="home-events">
                        { renderEvent(events[0]) }
                        { renderEvent(events[1]) }
                    </div>
                    <div id="home-events">
                        { renderEvent(events[2]) }
                    </div>
                </>
            );
        }
        return (
            <div id={isMobile ? "home-events-mobile" : "home-events"}>
                { events.map((obj) => renderEvent(obj)) }
            </div>
        );
    };

    // Renders the "Featured Events" section
    const renderFeaturedEvents = () => {
        return (
            <div className={isMobile ? "home-body-mobile" : "home-body"}>
                <Typography gutterBottom className="home-title" component="h4" variant="h4" color="primary">
                    Featured Events
                </Typography>
                <br />
                {displayEvents()}
            </div>
        );
    };

    return (
        <div className="home-container">
            { renderLogo() }
            { renderMotto() }
            { renderMeetingDetails() }
            { renderFeaturedEvents() }
        </div>
    );
}


export default Home;
