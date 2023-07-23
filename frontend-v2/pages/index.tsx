import { Inter } from "@next/font/google";
import {
    Center,
    VStack,
    Flex,
    Box,
    Text,
    IconButton,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import { getFeaturedEvents } from "@/utils/api";
import Image from 'next/image';
import { lazy, useEffect, useState } from "react";
import EventCard from "components/EventCard";

const Room = lazy(() => import("components/Room"));
const inter = Inter({ subsets: ["latin"] });

function Title() {
    return (
        <Flex height='calc(100vh - 150px)' maxW='1500px' direction='column'>
            <Center height='80vh'>
                <Box width='35vw'>
                    <Text display='inline' fontSize="3xl" color="white">
                        Husky Coding Project's objective is to break the
                        circular reasoning of
                    </Text>
                    <Text display='inline' fontSize="3xl" color="brand.pink">
                        {} "needing experience to get experience"
                    </Text>
                    <Text display='inline' fontSize="3xl" color="white">
                        {} that prevents hundreds of students from landing their
                        first software internship or job.
                    </Text>
                </Box>
                <Box width='15vw' />
                <Box width='35vw'>
                    <Center>
                        <Image
                            width={200}
                            height={200}
                            style={{ width: '30vw' }}
                            src="/HCPLogoText-Crop.webp"
                            alt="HCP Logo"
                        />
                    </Center>
                    <Box height='30px' />
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
                    onClick={() => {
                        document
                            .getElementById("featured-events")!
                            .scrollIntoView({ behavior: "smooth" });
                    }}
                    _hover={{
                        border: "3px solid white",
                        cursor: "pointer",
                    }}
                    icon={
                        <FontAwesomeIcon
                            height='30px'
                            color='white'
                            icon={faArrowDown}
                        />
                    }
                />
            </Center>
        </Flex>
    );
}

interface IEventType {
    date: Date;
    name: string;
    location: string;
    description: string;
    image: string;
}

function Events() {
    const [events, setEvents] = useState<IEventType[]>([
        {
            date: new Date("3/21/2023"),
            name: "Default Event",
            location: "Default Location",
            description: "Default Description",
            image: "",
        },
        {
            date: new Date("3/21/2023"),
            name: "Default Event1",
            location: "Default Location",
            description: "Default Description",
            image: "",
        },
        {
            date: new Date("3/21/2023"),
            name: "Default Event2",
            location: "Default Location",
            description: "Default Description",
            image: "",
        },
    ]);
    const [loading, setLoading] = useState<boolean>(true);

    // Uses the getFeaturedEvents API
    useEffect(() => {
        const getData = async (data: IEventType[]) => {
            setEvents(data);
            setLoading(false);
        };
        getFeaturedEvents(getData);
    });

    return (
        <Flex dir="row" width='100%' justify='center'>
            {events.map((event) => (
                <EventCard
                    key={event.name}
                    name={event.name}
                    date={event.date}
                    location={event.location}
                    loading={loading}
                    image={event.image != null ? event.image : "/HCPLogo.webp"}
                />
            ))}
        </Flex>
    );
}

function FeaturedEvents() {
    return (
        <Flex
            id='featured-events'
            height='550px'
            direction='column'
            width='80vw'
            maxW='1500px'
            scrollMarginTop='100px'
        >
            <Box
                bgGradient='linear(to-b, brand.mid_purple, brand.hot_pink)'
                borderRadius='30px'
                height='450px'
                width='100%'
            >
                <Center>
                    <Text
                        as='h2'
                        color='white'
                        fontSize='6xl'
                        fontWeight='semibold'
                        marginTop='8'
                    >
                        Featured Events
                    </Text>
                </Center>
                <Center marginTop='35px'>
                    <Events />
                </Center>
            </Box>
        </Flex>
    );
}

function MeetingInfo() {
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
            <Text
                as='h2'
                color='white'
                fontSize='6xl'
                fontWeight='semibold'
                marginTop='8'
            >
                General Meetings
            </Text>
            <Text
                width='70%'
                marginTop='30px'
                marginBottom='50px'
                fontSize='2xl'
                color='brand.light_brown'
                textAlign="center"
            >
                Join us every Thursday from 6:00pm to 7:30pm PST at MEB
                (Mechanical Engineering Building) 248!
            </Text>
            <Box borderRadius='15px' overflow='hidden'>
                <Room />
            </Box>
            <Text
                width='70%'
                marginTop='5px'
                fontSize='md'
                color='brand.light_brown'
                textAlign="center"
            >
                Mechanical Engineering Building Room 248 @ University of
                Washington
            </Text>
        </Flex>
    );
}

interface ISlogan {
    name: string;
    icon: string;
}

function Values() {
    const slogans: ISlogan[] = [
        { name: "Listen Loudly", icon: "/listen.webp" },
        { name: "Freedom to Fail", icon: "/ok_fail.webp" },
        { name: "Turn Talk into Action", icon: "/action.webp" },
        { name: "Respect for all Folks", icon: "/respect.webp" },
    ];
    return (
        <VStack
            id='club-values'
            height='600px'
            direction='column'
            width='80vw'
            alignItems='center'
        >
            <Text
                as='h2'
                color='white'
                fontSize='6xl'
                fontWeight='semibold'
                marginTop='8'
            >
                Club Values
            </Text>
            <Flex direction='row' width='100%' justifyContent='center'>
                {slogans.map((slogan) => (
                    <VStack
                        direction='column'
                        width='200px'
                        marginX='40px'
                        alignItems='center'
                        paddingTop='80px'
                        key={slogan.name}
                    >
                        <Image
                            width={125}
                            height={125}
                            style={{ width: 'auto', height: '125px' }}
                            src={slogan.icon}
                            alt={slogan.name}
                        />
                        <Text
                            marginTop='25px'
                            fontSize='2xl'
                            color='white'
                            textAlign="center"
                        >
                            {slogan.name}
                        </Text>
                    </VStack>
                ))}
            </Flex>
        </VStack>
    );
}

export default function Home() {
    // Scroll to top of page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <VStack spacing='150px'>
            <Title />
            <FeaturedEvents />
            <MeetingInfo />
            <Values />
        </VStack>
    );
}
