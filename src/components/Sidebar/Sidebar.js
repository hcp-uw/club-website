import { useNavigate, useLocation } from "react-router-dom";
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
    const location = useLocation();

    let currPage = pages.find(
        page => location.pathname === page.path
      );

    const renderTabs = () => {
        if (currPage === undefined) {
            currPage = pages[0];
        }
        return pages.map((obj) =>
            <Button key={obj.name} color="inherit" className="sidebar-button" onClick={() => navigate(obj.path)}>
                {
                    obj.name === currPage.name ?
                        <Typography variant='h5' color="primary"> { "<" + obj.name + "/>" } </Typography>
                    :
                        <Typography variant='h5' color="primary"> { obj.name } </Typography>
                }
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