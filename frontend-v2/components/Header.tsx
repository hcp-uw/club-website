import {
    Flex,
    Spacer,
    Image,
    LinkBox,
    Button,
    ButtonGroup,
    LinkOverlay,
    Center
} from "@chakra-ui/react";

import {
    HeaderButton,
    SpecialHeaderButton
 } from "./Parts";

export default function Header() {
    return (
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
    );
}
