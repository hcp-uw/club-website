import { Inter } from "@next/font/google";
import {
    Center,
    VStack,
    Flex,
    Box,
    Text,
    Image,
    IconButton,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { getFeaturedEvents } from "./api/api";

import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import EventCard from "components/EventCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    // Scroll to top of page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [events, setEvents] = useState([
        {
            date: new Date('3/21/2023'),
            name: "Default Event",
            location: "Default Location",
            description: "Default Description",
            image: null
        },
        {
            date: new Date('3/21/2023'),
            name: "Default Event",
            location: "Default Location",
            description: "Default Description",
            image: null
        },
        {
            date: new Date('3/21/2023'),
            name: "Default Event",
            location: "Default Location",
            description: "Default Description",
            image: null
        }
    ]);
    const [loading, setLoading] = useState(true);

    // Uses the getFeaturedEvents API
    useEffect(() => {
        const getData = async (data : any) => {
            setEvents(data);
            setLoading(false);
        };
        getFeaturedEvents(getData);
    });

    const renderTitle = () => {
        return (
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
                            { } that prevents hundreds of students from landing their first software
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
                        variant='ghost'
                        isRound={true}
                        aria-label="Scroll Down"
                        size='lg'
                        zIndex='1'
                        border='3px solid transparent'
                        onClick={() => {document.getElementById("featured-events")!.scrollIntoView({ behavior: "smooth" })}}
                        _hover={{border: '3px solid white', cursor: 'pointer'}}
                        icon={<FontAwesomeIcon height='30px' color='white' icon={faArrowDown} />}
                    />
                </Center>
            </Flex>
        );
    };

    const displayEvents = () => {
        return (
            <Flex dir="row" width='100%' justify='center'>
                {
                   events.map((event) =>
                        <EventCard
                            name={event.name}
                            date={event.date}
                            location={event.location}
                            loading={loading}
                            image={event.image !== null ? event.image : "/HCPLogo.jpg"}
                        />
                    )
                }
            </Flex>
        );
    };

    const renderFeaturedEvents = () => {
        return (
            <Flex id='featured-events' height='550px' direction='column' width='80vw' scrollMarginTop='150px'>
                <Box bgGradient='linear(to-b, brand.mid_purple, brand.hot_pink)' borderRadius='30px' height='450px' width='100%'>
                    <Center>
                        <Text as='h2' color='white' fontSize='6xl' fontWeight='semibold' marginTop='8'>
                            Featured Events
                        </Text>
                    </Center>
                    <Center marginTop='35px'>
                        { displayEvents() }
                    </Center>
                </Box>
            </Flex>
        );
    }

    return (
        <VStack>
            { renderTitle() }
            { renderFeaturedEvents() }
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
