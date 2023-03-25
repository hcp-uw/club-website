import {
    Flex,
    Spacer,
    Image,
    LinkBox,
    Button,
    ButtonGroup,
    LinkOverlay,
    Center,
    Box,
    IconButton
} from "@chakra-ui/react";

import { useMediaQuery } from '@chakra-ui/react';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    HeaderButton,
    SpecialHeaderButton
 } from "./Parts";

export default function Header(props: {showSidebar: () => void}) {
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

    return (
        <>
            {isLargerThan1200 ?
                <Flex h="150px">
                    <Spacer />
                    <Center>
                        <LinkBox>
                            <LinkOverlay href="/">
                                <Image width="150px" src="/HCPLogoText-Crop.png" alt="HCP Logo" />
                            </LinkOverlay>
                        </LinkBox>
                    </Center>
                    <Spacer />
                    <Center>
                        <ButtonGroup variant='ghost' spacing='5'>
                            <HeaderButton path='/' text='Home'/>
                            <HeaderButton path='/about' text='About Us'/>
                            <HeaderButton path='/projects' text='Projects'/>
                            <HeaderButton path='/events' text='Events'/>
                            <SpecialHeaderButton path='/join' text='Join Us'/>
                        </ButtonGroup>
                    </Center>
                    <Spacer />
                </Flex>
                :
                <Flex h="150px" justifyContent='flex-start' width='100%'>
                    <Center justifyContent='center'>
                        <Box paddingLeft='50px' width='100px'>
                            <IconButton
                                variant='ghost'
                                aria-label='menu'
                                zIndex='100'
                                size='lg'
                                icon={<FontAwesomeIcon height='40px' color='white' icon={faBars} />}
                                _hover={{border: '3px solid white', cursor: 'pointer'}}
                                onClick={props.showSidebar}
                            />
                        </Box>
                    </Center>
                    <Center justifyContent='center'  height='100%' width='100%' position='absolute' left='50%' transform='translateX(-50%)'>
                        <LinkBox>
                            <LinkOverlay href="/">
                                <Image width="150px" src="/HCPLogoText-Crop.png" alt="HCP Logo" />
                            </LinkOverlay>
                        </LinkBox>
                    </Center>
                </Flex>
            }
        </>
    );
}
