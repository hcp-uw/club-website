import { useState, useEffect } from "react";
import { Typography, TextField } from "@mui/material";
import "./Join.css";
import Button from "@mui/material/Button";
import { sendEmail } from "../../api/api";
import SendIcon from "@mui/icons-material/Send";

function Join(props) {

    // Scroll to top of page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [width, setWidth] = useState(window.innerWidth);
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[content, setContent] = useState("");
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
    
    const displayEmailForm = () => {

        const handleClick = () => {
            setName("");
            setEmail("");
            setContent("");
            sendEmail(name, email, content);
        };
        const handleNameChange = (event) => {
            setName(event.target.value);
        };
        const handleEmailChange = (event) => {
            setEmail(event.target.value);
        };
        const handleContentChange = (event) => {
            setContent(event.target.value);
        };
        return (
            <div id="emailform">
                <br/>
                <br/>
                <Typography id="objective" variant="subtitle1" color="primary">
                    ...or send us a message :)
                    <br/>
                    <br/>
                </Typography>
                <form>
                    <label>
                        <TextField color="primary" required sx={{ input: { color: "white" } }} fullWidth focused id="filled-basic" label="Name" variant="outlined" value={name} onChange={handleNameChange}/>
                        {/* <input type="text" name="name" value={name} onChange={handleNameChange}/> */}
                    </label>
                    <br/>
                    <br/>
                    <label>
                        <TextField color="primary" required sx={{ input: { color: "white" } }} fullWidth focused id="filled-basic" label="Email" variant="outlined" value={email} onChange={handleEmailChange}/>
                    </label>
                    <br/>
                    <br/>
                    <label>
                        <TextField color="primary" inputProps={{ style: { color: "white" } }} required focused id="filled-basic" label="Message" variant="outlined" multiline
                            rows={6} fullWidth value={content} onChange={handleContentChange}
                        />

                    </label>
                    <br></br>
                    <br></br>
                    <Button variant="contained" color="secondary" onClick={handleClick} endIcon={<SendIcon />} disabled={name === "" || email === "" || content === ""}>Submit</Button>
                </form>
            </div>
        );
    };

    const displayJoinPage = () => {
        return (
            // <div className="google-form-embed">
            //     <iframe
            //         className="iframe"
            //         title="club sign up google form"
            //         frameBorder={0}
            //         src="https://docs.google.com/forms/d/e/1FAIpQLSc5wyLuacKqZpezaffwB8jZZVz9yBo83tvA-U_vsRMiPbGslA/viewform?embedded=true"
            //     >
            //         Loading…
            //     </iframe>
            //     {displayEmailForm()}
            // </div>
            <div style={{ width: "70%" }}>
                <Button color="secondary" variant="contained" href="https://forms.gle/JpJaoznG4FBvS1paA" target="_blank"> Link to Form </Button>
                <br/>
                { displayEmailForm() }
            </div>
        );
    };

    // Button link to google form
    const displayJoinPageMobile = () => {
        return (
            <div>
                <Button color="secondary" variant="contained" href="https://forms.gle/JpJaoznG4FBvS1paA" target="_blank"> Link to Form </Button>
            </div>
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
