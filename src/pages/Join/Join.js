import { useState, useEffect } from 'react';
import { Typography, TextField } from '@mui/material';
import './Join.css';
import Button from '@mui/material/Button';
import { sendEmail } from '../../api/api';
import SendIcon from '@mui/icons-material/Send';

function Join(props) {
    const [width, setWidth] = useState(window.innerWidth);
    const[name, setName] = useState("");
    const[content, setContent] = useState("");
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

    const displayJoinPage = () => {
        return (
            <div className='google-form-embed'>
                <iframe
                    className='iframe'
                    title="club sign up google form"
                    frameBorder={0}
                    src="https://docs.google.com/forms/d/e/1FAIpQLSc5wyLuacKqZpezaffwB8jZZVz9yBo83tvA-U_vsRMiPbGslA/viewform?embedded=true"
                >
                    Loading…
                </iframe>
            </div>
        );
    };
    
    const displayEmailForm = () => {

        const handleClick = () => {
            //console.log(name)
            //console.log(content)
            sendEmail(name, content);
        };
        const handleNameChange = (event) => {
            setName(event.target.value);
        };
        const handleContentChange = (event) => {
            setContent(event.target.value);
        };
        return (
            <div id="emailform">
                <br/>
                <br/>
                <Typography className="about-title" component="h4" variant="h4" color="primary">
                Send us an Email!
                <br/>
                <br/>
                </Typography>
                <form>
                <label>
                    <TextField color="primary" focused id="filled-basic" label="Name" variant="filled" value={name} InputLabelProps={{style: { color: '#ffff' },}} onChange={handleNameChange}/>
                    {/* <input type="text" name="name" value={name} onChange={handleNameChange}/> */}
                </label><br></br>
                <label>
                    <TextField color="primary" focused id="filled-basic" label="Content" variant="filled" value={content} onChange={handleContentChange}/>
                </label>
                <br></br>
                <br></br>
                <Button variant="contained" color="secondary" onClic1k={handleClick} endIcon={<SendIcon />}>Submit</Button>
                </form>
            </div>
        );
    }

    const displayJoinPageMobile = () => {
        return (
            <Button color="secondary" variant="contained" href={"https://forms.gle/JpJaoznG4FBvS1paA"} target="_blank"> Link to Form </Button>
        );
    };

    const renderJoinPage = () => {
        return (
            <div id={isMobile ? 'join-container-mobile' : 'join-container'}>
                <Typography variant="h4" color="primary" paddingBottom={2}> Join Us </Typography>
                <br />
                <Typography id="objective" variant="subtitle1" color="primary">
                    Fill out the form below to join HCP!
                </Typography>
                <br />
                {isMobile ? displayJoinPageMobile() : displayJoinPage()}
                {displayEmailForm()}
            </div>
        );
    }

    return (
        <div id={isMobile ? 'join-background-mobile' : 'join-background'}>
            {renderJoinPage()}
        </div>
    );
};

export default Join;