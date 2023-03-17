import {
    Center,
    Image,
    LinkBox,
    Text,
    LinkOverlay,
    VStack,
    HStack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
    faInstagram,
    faFacebook,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <Center>
            <VStack>
                <LinkBox>
                    <LinkOverlay href="/">
                        <Image
                            width="200px"
                            src="/HCPLogoText.png"
                            alt="HCP Logo"
                        />
                    </LinkOverlay>
                </LinkBox>

                <HStack>
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faLinkedin} />
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faEnvelope} />
                </HStack>
                <Text>
                    Copyright © 2022 Husky Coding Project. All Rights Reserved
                </Text>
            </VStack>
        </Center>
    );
}
