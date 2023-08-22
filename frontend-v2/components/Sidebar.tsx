import { Flex, IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { SidebarButton } from "./Parts";

interface ISideBar {
    show: boolean;
    handleShow: () => void;
}

interface ISidebarButton {
    path: string;
    text: string;
}

export default function Sidebar(props: ISideBar) {
    const { show, handleShow } = props;
    const buttons: ISidebarButton[] = [
        {
            path: '/',
            text: 'Home',
        },
        {
            path: '/about',
            text: 'About Us',
        },
        {
            path: '/projects',
            text: 'Projects',
        },
        {
            path: '/events',
            text: 'Events',
        },
        {
            path: '/join',
            text: 'Join Us',
        },
        {
            path: '/admin',
            text: 'Admin'
        }
    ];

    return (
        <Flex
            flexDirection='column'
            backgroundColor='brand.dark_blue'
            width='250px'
            paddingTop='10px'
            height='100vh'
            position='fixed'
            top='0'
            left={`${show ? "0" : "-100%"}`}
            transition={`${show ? "350ms" : "850ms"}`}
            zIndex='99'
            gap='4'
        >
            <IconButton
                alignSelf='flex-end'
                variant='ghost'
                aria-label="Scroll Down"
                size='lg'
                zIndex='1'
                marginRight='5px'
                border='3px solid transparent'
                onClick={handleShow}
                _hover={{ border: "3px solid white", cursor: "pointer" }}
                icon={
                    <FontAwesomeIcon
                        height='30px'
                        color='white'
                        icon={faXmark}
                    />
                }
            />
            {
                buttons.map(button =>
                    <SidebarButton key={button.text} path={button.path} text={button.text} handleShow={handleShow} />
                )
            }
        </Flex>
    );
}
