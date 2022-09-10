import { useNavigate } from "react-router-dom";
import {
    Typography,
    Button,
} from '@mui/material';
import './Sidebar.css';

function Sidebar(props) {
    const {
        pages,
        show,
        handleShow,
    } = props;

    const navigate = useNavigate();

    const renderTabs = () => {
        return pages.map((obj) =>
            <Button color="inherit" className="header-page-button" onClick={() => navigate(obj.path)}>
                <Typography variant='h4' color="#FFFFFF"> { obj.name } </Typography>
            </Button>
        )
    };

    return (
        <>
            <nav className={show ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={handleShow}>
                    { renderTabs() }
                </ul>
            </nav>
        </>
    )
}

export default Sidebar;