import {
    Flex,
    Spacer,
    Image,
    LinkBox,
    ButtonGroup,
    LinkOverlay,
    Center,
    Box,
    IconButton,
} from "@chakra-ui/react";
import { useMediaQuery } from '@chakra-ui/react'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeaderButton, SpecialHeaderButton } from "./Parts";
// @ts-ignore
// import { useAuth } from "@/context/AuthContext";

export default function Header(props: { showSidebar: () => void }) {
    const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)", {
        ssr: true,
        fallback: true, // return false on the server, and re-evaluate on the client side
    });
    const [isSmallerThan450] = useMediaQuery("(max-width: 450px)", {
        ssr: true,
        fallback: false, // return false on the server, and re-evaluate on the client side
    });
    // const { currentUser, isAdmin } = useAuth()

    return (
        <>
            {isLargerThan1200 ? (
                <Flex h="150px">
                    <Spacer />
                    <Center>
                        <LinkBox>
                            <LinkOverlay href="/">
                                <Image
                                    width="150px"
                                    src="/HCPLogoText-Crop.webp"
                                    alt="HCP Logo"
                                />
                            </LinkOverlay>
                        </LinkBox>
                    </Center>
                    <Spacer />
                    <Center>
                        <ButtonGroup variant='ghost' spacing='5'>
                            <HeaderButton path='/' text='Home' />
                            <HeaderButton path='/about' text='About Us' />
                            <HeaderButton path='/projects' text='Projects' />
                            <HeaderButton path='/events' text='Events' />
                            <SpecialHeaderButton path='/join' text='Join Us' />
                        </ButtonGroup>
                        {/* {!currentUser ? (
                            
                        ) : (
                            <ButtonGroup variant='ghost' spacing='5'>
                                <HeaderButton path='/' text='Home' />
                                { isAdmin && <HeaderButton path='/admin' text='Admin' /> }
                                <HeaderButton path='/resources' text='Resources' />
                                <HeaderButton path='/dashboard' text='Dashboard' />
                                <HeaderButton path='/profile' text='Profile' />
                                <HeaderButton path='/private_project' text='Project' />
                                <SpecialHeaderButton path='/join' text='Join Us' />
                            </ButtonGroup>
                        )} */}
                    </Center>
                    <Spacer />
                </Flex>
            ) : (
                <Flex h="100px" justifyContent='flex-start' width='100%'>
                    <Center justifyContent='center'>
                        <Box paddingLeft={isSmallerThan450 ? "25px" : "50px"} width='100px'>
                            <IconButton
                                variant='ghost'
                                aria-label='menu'
                                zIndex='100'
                                size='lg'
                                icon={
                                    <FontAwesomeIcon
                                        height='30px'
                                        color='white'
                                        icon={faBars}
                                    />
                                }
                                _hover={{
                                    border: "3px solid white",
                                    cursor: "pointer",
                                }}
                                onClick={props.showSidebar}
                            />
                        </Box>
                    </Center>
                    <Center
                        justifyContent='center'
                        height='100%'
                        width='100%'
                        position='absolute'
                        left='50%'
                        transform='translateX(-50%)'
                    >
                        <LinkBox>
                            <LinkOverlay href="/">
                                <Image
                                    width={isSmallerThan450 ? "100px" : "150px"}
                                    src="/HCPLogoText-Crop.webp"
                                    alt="HCP Logo"
                                />
                            </LinkOverlay>
                        </LinkBox>
                    </Center>
                </Flex>
            )}
        </>
    );
}
