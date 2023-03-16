import {Flex, Spacer, Image, LinkBox, Link, Button, LinkOverlay} from "@chakra-ui/react";

export default function Header() {
    return (
        <Flex>
            <Spacer />
            <LinkBox>
                <LinkOverlay href="/">
                <Image width="80px" src="/HCPLogoText.png" alt="HCP Logo" />
                </LinkOverlay>
            </LinkBox>
            <Spacer />
            <Link margin={5} href="/home">Home</Link>
            <Link margin={5} href="/aboutus">About Us</Link>
            <Link margin={5} href="/projects">Projects</Link>
            <Link margin={5} href="/events">Events</Link>
            <Button>Join Us</Button>
            <Spacer />
        </Flex>
    );
}
