import './Footer.css';
import { Typography, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


function Footer() {


    const generateIcon = (icon, link) => {
        return (
            <IconButton
                color="primary"
                aria-label={link}
                className="social-button"
                href={link}
                target="_blank"
            >
                {icon}
            </IconButton>
        )
    }

    return (
        <footer>
            <Typography id="logo" component="h2" variant="h2" color="primary">{"<HCP />"}</Typography>
            <Typography id="motto" component="h4" variant="h4" color="primary"> Let's Git Good </Typography>
            <div id="socials">
                {generateIcon(<InstagramIcon sx={{ fontSize: 40 }}/>, "https://instagram.com/huskycodingproject?igshid=YmMyMTA2M2Y=")}
                {generateIcon(<LinkedInIcon sx={{ fontSize: 40 }}/>, "https://www.linkedin.com/company/husky-coding-project/")}
                {generateIcon(<MailOutlineIcon sx={{ fontSize: 40 }}/>, "mailto:hcpuw@uw.edu")}
            </div>
        </footer>
    )
}

export default Footer;