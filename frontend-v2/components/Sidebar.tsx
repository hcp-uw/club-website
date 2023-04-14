import { Flex, IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
    faInstagram,
    faFacebookSquare,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { HeaderButton1 } from "./Parts";

export default function Sidebar(props: {
    show: boolean;
    handleShow: () => void;
}) {
    return (
        <Flex
            flexDirection='column'
            backgroundColor='brand.dark_blue'
            width='250px'
            paddingTop='10px'
            height='100vh'
            position='fixed'
            top='0'
            left={`${props.show ? "0" : "-100%"}`}
            transition={`${props.show ? "350ms" : "850ms"}`}
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
                onClick={props.handleShow}
                _hover={{ border: "3px solid white", cursor: "pointer" }}
                icon={
                    <FontAwesomeIcon
                        height='30px'
                        color='white'
                        icon={faXmark}
                    />
                }
            />
            <HeaderButton1 path='/' text='Home' handleShow={props.handleShow} />
            <HeaderButton1
                path='/about'
                text='About Us'
                handleShow={props.handleShow}
            />
            <HeaderButton1
                path='/projects'
                text='Projects'
                handleShow={props.handleShow}
            />
            <HeaderButton1
                path='/events'
                text='Events'
                handleShow={props.handleShow}
            />
            <HeaderButton1
                path='/join'
                text='Join Us'
                handleShow={props.handleShow}
            />
        </Flex>
    );
}
