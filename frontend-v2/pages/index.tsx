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
import {
    faArrowDown,
    faEarListen,
    faPersonFallingBurst,
    faComments,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import { getFeaturedEvents } from "@/utils/api";

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
            image: ""
        },
        {
            date: new Date('3/21/2023'),
            name: "Default Event",
            location: "Default Location",
            description: "Default Description",
            image: ""
        },
        {
            date: new Date('3/21/2023'),
            name: "Default Event",
            location: "Default Location",
            description: "Default Description",
            image: ""
        }
    ]);
    const [loading, setLoading] = useState(true);

    // Uses the getFeaturedEvents API
    useEffect(() => {
        const getData = async (data : Array<{date: Date, name: string, location: string, description: string, image: string}>) => {
            //setEvents(data);
            setLoading(false);
        };
        getFeaturedEvents(getData);
    });

    const renderTitle = () => {
        return (
            <Flex height='calc(100vh - 150px)' maxW='1500px' direction='column'>
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
                            image={event.image !== "" ? event.image : "/HCPLogo.jpg"}
                        />
                    )
                }
            </Flex>
        );
    };

    const renderFeaturedEvents = () => {
        return (
            <Flex id='featured-events' height='550px' direction='column' width='80vw' maxW='1500px' scrollMarginTop='100px'>
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

    const renderMeetingInfo = () => {
        return (
            <Flex
                id='meeting-info'
                height='700px'
                direction='column'
                width='80vw'
                maxW='1500px'
                bgGradient='linear(to-t, brand.mid_purple, brand.hot_pink)'
                borderRadius='30px'
                alignItems='center'
            >
                <Text as='h2' color='white' fontSize='6xl' fontWeight='semibold' marginTop='8'>
                    General Meetings
                </Text>
                <Text  width='70%' marginTop='30px' marginBottom='50px' fontSize='2xl' color='brand.light_brown' textAlign="center">
                    Join us every Thursday from 6:00pm to 7:30pm PST at MEB (Mechanical Engineering Building) 248!
                </Text>
                <Box borderRadius='15px' overflow='hidden'>
                    <iframe
                        title="OUG141"
                        id="home-vr"
                        allowFullScreen
                        width='740px'
                        height='370px'
                        src="https://www.washington.edu/classroom/vrview/index.html?image=https://features.classrooms.uw.edu/room-images/panoramas/MEB_238_panorama.jpg&"
                    />
                </Box>
                <Text width='70%' marginTop='5px' fontSize='md' color='brand.light_brown' textAlign="center">
                    Mechanical Engineering Building Room 248 @ University of Washington
                </Text>
            </Flex>
        )
    }

    const renderValues = () => {
        var icons = [
            {name: "Listen Loudly", icon: faEarListen},
            {name: "Freedom to Fail", icon: faPersonFallingBurst},
            {name: "Turn Talk into Action", icon: faComments},
            {name: "Respect for all Folks", icon: faUsers}
        ];
        return (
            <Flex
                id='club-values'
                height='600px'
                direction='column'
                width='80vw'
                alignItems='center'
            >
                <Text as='h2' color='white' fontSize='6xl' fontWeight='semibold' marginTop='8'>
                    Club Values
                </Text>
                <Flex direction='row' width='100%' justifyContent='center'>
                    {
                        icons.map((icon) =>
                        <Flex direction='column' width='200px' marginX='40px' alignItems='center' paddingTop='80px'>
                            <FontAwesomeIcon width='125px' height='125px' color='white' icon={icon.icon}  />
                            <Text marginTop='25px'fontSize='2xl' color='white' textAlign="center">
                                {icon.name}
                            </Text>
                        </Flex>
                        )
                    }
                </Flex>
            </Flex>
        )
    }

    return (
        <VStack spacing='150px'>
            { renderTitle() }
            { renderFeaturedEvents() }
            { renderMeetingInfo() }
            { renderValues() }
        </VStack>
    );
}
