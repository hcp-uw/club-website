import { Inter } from "@next/font/google";
import {
    Center,
    VStack,
    Flex,
    Box,
    Text,
    Image,
    IconButton,
    Circle,
    Button,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <VStack>
            <Flex height='calc(100vh - 150px)' direction='column'>
                <Center height='80vh'>
                    <Box width='35vw'>
                        <Text display='inline' fontSize="3xl" color="white">
                            Husky Coding Project's objective is to break the circular reasoning of
                        </Text>
                        <Text display='inline' fontSize="3xl" color="brand.pink">
                            { } "needing experience to get experience"
                        </Text>
                        <Text display='inline' fontSize="3xl" color="white">
                            { } that prevents hundreds of students from landing their frist software
                            internship or job.
                        </Text>
                    </Box>
                    <Box width='15vw'/>
                    <Box  width='35vw'>
                        <Center>
                            <Image width='30vw' src="/HCPLogoText-Crop.png" alt="HCP Logo" />
                        </Center>
                        <Box height='30px'/>
                        <Center>
                            <Text as="kbd" fontSize="4xl" color="white">
                                Let's Git Good!
                            </Text>
                        </Center>
                    </Box>
                </Center>
                <Center height='20vh'>
                    <IconButton
                        id="scroll-down"
                        variant='ghost'
                        isRound={true}
                        aria-label="Scroll Down"
                        size='lg'
                        border='3px solid transparent'
                        onClick={() => {document.getElementById("scroll-down").scrollIntoView({ behavior: "smooth" })}}
                        _hover={{border: '3px solid white', cursor: 'pointer'}}
                        icon={<FontAwesomeIcon height='30px' color='white' icon={faArrowDown} />}
                    />
                </Center>
            </Flex>
            <Center>
                <Image
                    src="/output-onlinegiftools.gif"
                    width={300}
                    height={300}
                    alt="13"
                />
            </Center>
        </VStack>
    );
}
