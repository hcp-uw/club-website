import "./Footer.css";
import { Typography, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import Logo from "../../assets/HCPLogoText-Crop.png";


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
        );
    };

    return (
        <>
            <footer>
                <img src={Logo} alt="logo" id="logo"/>
                <Typography id="motto" component="h4" variant="h4" color="primary"> Let's Git Good </Typography>
                <div id="socials">
                    {generateIcon(<InstagramIcon sx={{ fontSize: 40 }}/>, "https://instagram.com/huskycodingproject?igshid=YmMyMTA2M2Y=")}
                    {generateIcon(<LinkedInIcon sx={{ fontSize: 40 }}/>, "https://www.linkedin.com/company/husky-coding-project/")}
                    {generateIcon(<FacebookIcon sx={{ fontSize: 40 }}/>, "https://www.facebook.com/profile.php?id=100087380841446")}
                    {generateIcon(<MailOutlineIcon sx={{ fontSize: 40 }}/>, "mailto:hcpuw@uw.edu")}
                </div>
                <br />
                <Typography variant="caption" color="primary"> Copyright © 2022 Husky Coding Project. All Rights Reserved </Typography>
            </footer>
        </>
    );
}

export default Footer;
