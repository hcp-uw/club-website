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
            <Button color="inherit" className="sidebar-button" onClick={() => navigate(obj.path)}>
                <Typography variant='h4' color="#FFFFFF"> { obj.name } </Typography>
            </Button>
        )
    };

    return (
        <>
            <nav className={show ? 'sidebar active' : 'sidebar'}>
                <ul className='sidebar-items' onClick={handleShow}>
                    { renderTabs() }
                </ul>
            </nav>
        </>
    )
}

export default Sidebar;