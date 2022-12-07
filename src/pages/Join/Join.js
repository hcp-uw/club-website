import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import "./Join.css";
import Button from "@mui/material/Button";

function Join(props) {

    // Scroll to top of page
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [width, setWidth] = useState(window.innerWidth);

    // Handle window size
    useEffect(() => {
        const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    const isMobile = width <= 800;

    // Display embedded google form
    const displayJoinPage = () => {
        return (
            <div className="google-form-embed">
                <iframe
                    className="iframe"
                    title="club sign up google form"
                    frameBorder={0}
                    src="https://docs.google.com/forms/d/e/1FAIpQLSc5wyLuacKqZpezaffwB8jZZVz9yBo83tvA-U_vsRMiPbGslA/viewform?embedded=true"
                >
                    Loading…
                </iframe>
            </div>
        );
    };

    // Button link to google form 
    const displayJoinPageMobile = () => {
        return (
            <Button color="secondary" variant="contained" href="https://forms.gle/JpJaoznG4FBvS1paA" target="_blank"> Link to Form </Button>
        );
    };

    // Join Page information
    const renderJoinPage = () => {
        return (
            <div id={isMobile ? "join-container-mobile" : "join-container"}>
                <Typography variant="h4" color="primary" paddingBottom={2}> Join Us </Typography>
                <br />
                <Typography id="objective" variant="subtitle1" color="primary">
                    Fill out the form below to join HCP!
                </Typography>
                <br />
                {isMobile ? displayJoinPageMobile() : displayJoinPage()}
            </div>
        );
    };

    return (
        <div id={isMobile ? "join-background-mobile" : "join-background"}>
            {renderJoinPage()}
        </div>
    );
};

export default Join;
