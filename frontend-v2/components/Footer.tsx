import {
    Center,
    Image,
    Link,
    Text,
    LinkOverlay,
    VStack,
    HStack,
    Spacer,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
    faInstagram,
    faFacebookSquare,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <Center height='300px'>
            <VStack>
                <Link href="/">
                    <Image
                        width="200px"
                        src="/HCPLogoText-Crop.webp"
                        alt="HCP Logo"
                    />
                </Link>
                <Spacer />
                <Spacer />
                <HStack spacing={4}>
                    <Link href="https://instagram.com/huskycodingproject?igshid=YmMyMTA2M2Y=">
                        <FontAwesomeIcon
                            height='40px'
                            color='white'
                            icon={faInstagram}
                        />
                    </Link>
                    <Link href="https://www.linkedin.com/company/husky-coding-project/">
                        <FontAwesomeIcon
                            height='40px'
                            color='white'
                            icon={faLinkedin}
                        />
                    </Link>
                    <Link href="https://www.facebook.com/profile.php?id=100087380841446">
                        <FontAwesomeIcon
                            height='40px'
                            color='white'
                            icon={faFacebookSquare}
                        />
                    </Link>
                    <Link href="mailto:hcpuw@uw.edu">
                        <FontAwesomeIcon
                            height='40px'
                            color='white'
                            icon={faEnvelope}
                        />
                    </Link>
                </HStack>
                <Spacer />
                <Spacer />
                <Spacer />
                <Text fontSize='xs' color='white'>
                    Copyright © 2023 Husky Coding Project. All Rights Reserved
                </Text>
            </VStack>
        </Center>
    );
}
