import EventCard from "@/components/EventCard";
import ProjectCarousel from "@/components/ProjectCarousel";
import Room from "@/components/Room";
import Terminal from "@/components/Terminal";
import { getFeaturedEvents } from "@/utils/api";
import type { IEventInfo } from "@/utils/parsers";
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Heading,
    IconButton,
    Spacer,
    Text,
    VStack,
    Wrap,
    WrapItem,
    useColorModeValue,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inter } from "@next/font/google";
import { motion } from "framer-motion";
import Image from "next/image";
import { lazy, useEffect, useState } from "react";
import About from "./about";

const inter = Inter({ subsets: ["latin"] });

function Title() {
    const bgGradient = useColorModeValue(
        "linear(to-r, blue.400, purple.500)",
        "linear(to-r, blue.600, purple.700)",
    );
    const textColor = useColorModeValue("white", "white");
    const accentColor = useColorModeValue("brand.purple", "brand.light_pink");

    return (
        <Flex
            height="calc(100vh - 150px)"
            maxW="1200px"
            direction="column"
            justify="center"
        >
            <Center height="80vh" flexDirection={["column", "column", "row"]}>
                <Box width={["90vw", "90vw", "35vw"]} mb={[8, 8, 0]}>
                    <Heading
                        as="h1"
                        fontSize={["3xl", "4xl", "5xl"]}
                        color={textColor}
                        mb={4}
                    >
                        Breaking the cycle
                    </Heading>
                    <Text fontSize={["xl", "2xl"]} color={textColor} mb={2}>
                        The Husky Coding Project aims to break the circular
                        reasoning of
                    </Text>
                    <Text
                        fontSize={["xl", "2xl"]}
                        color={accentColor}
                        fontWeight="bold"
                        mb={2}
                    >
                        "needing experience to get experience"
                    </Text>
                    <Text fontSize={["xl", "2xl"]} color={textColor}>
                        that prevents students from landing their first software
                        internship or job.
                    </Text>
                </Box>
                <Box width={["90vw", "90vw", "35vw"]} marginLeft={[0, 0, 8]}>
                    <Center flexDirection="column" marginTop={4}>
                        <Terminal />
                    </Center>
                </Box>
            </Center>
            <Center height="20vh">
                <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 0.5,
                    }}
                >
                    <IconButton
                        variant="outline"
                        isRound={true}
                        aria-label="Scroll Down"
                        size="lg"
                        zIndex="1"
                        border="2px solid"
                        borderColor={accentColor}
                        color={accentColor}
                        bgGradient={bgGradient}
                        onClick={() => {
                            document
                                .getElementById("club-values")
                                ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        _hover={{
                            bgGradient: "linear(to-r, blue.500, purple.600)",
                            color: "white",
                        }}
                        icon={
                            <FontAwesomeIcon height="20px" icon={faArrowDown} />
                        }
                    />
                </motion.div>
            </Center>
        </Flex>
    );
}

function TitleMobile() {
    const [isLargerThan450] = useMediaQuery("(min-width: 450px)", {
        ssr: true,
        fallback: true, // return false on the server, and re-evaluate on the client side
    });
    const bgGradient = useColorModeValue(
        "linear(to-r, blue.400, purple.500)",
        "linear(to-r, blue.600, purple.700)",
    );
    const textColor = "white";
    const accentColor = "brand.dark_purple";

    return (
        <Flex
            height="calc(100vh - 150px)"
            maxW="1500px"
            direction="column"
            marginTop="20px"
        >
            <Center height="80vh">
                <Box width="70vw">
                    <Heading
                        as="h1"
                        fontSize={["3xl", "4xl", "5xl"]}
                        color={textColor}
                        mb={4}
                    >
                        Breaking the cycle
                    </Heading>
                    <Text fontSize={["xl", "2xl"]} color={textColor} mb={2}>
                        The Husky Coding Project aims to break the circular
                        reasoning of
                    </Text>
                    <Text
                        fontSize={["xl", "2xl"]}
                        color={accentColor}
                        fontWeight="bold"
                        mb={2}
                    >
                        "needing experience to get experience"
                    </Text>
                    <Text fontSize={["xl", "2xl"]} color={textColor}>
                        that prevents students from landing their first software
                        internship or job.
                    </Text>
                </Box>
            </Center>
            <Center height="20vh">
                <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 0.5,
                    }}
                >
                    <IconButton
                        variant="outline"
                        isRound={true}
                        aria-label="Scroll Down"
                        size="lg"
                        zIndex="1"
                        border="2px solid"
                        borderColor={accentColor}
                        color={accentColor}
                        bgGradient={bgGradient}
                        onClick={() => {
                            document
                                .getElementById("meeting-info")
                                ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        _hover={{
                            bgGradient: "linear(to-r, blue.500, purple.600)",
                            color: "white",
                        }}
                        icon={
                            <FontAwesomeIcon height="20px" icon={faArrowDown} />
                        }
                    />
                </motion.div>
            </Center>
        </Flex>
    );
}

function Projects() {
    return (
        <Box id="projects" width="100%" maxW="1500px" py="16">
            <Heading
                as="h2"
                color="white"
                fontSize={["3xl", "4xl", "5xl"]}
                fontWeight="bold"
                textAlign="center"
                mb={8}
            >
                Some of our current projects
            </Heading>
            <ProjectCarousel />
        </Box>
    );
}

function Events(props: { count: number }) {
    const [events, setEvents] = useState<IEventInfo[]>([
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
        const getData = (data: IEventInfo[]) => {
            if (data.length > 0) {
                setEvents(data);
                setLoading(false);
            }
        };
        getFeaturedEvents(getData);
    });

    return (
        <Flex dir="row" width="100%" justify="center">
            {events.map((event, idx) => {
                if (idx < props.count) {
                    return (
                        <EventCard
                            key={event.name}
                            name={event.name}
                            date={event.date}
                            location={event.location}
                            loading={loading}
                            image={event.image ?? "/HCPLogo.webp"}
                        />
                    );
                }
            })}
        </Flex>
    );
}

function FeaturedEvents() {
    const [isSmallerThan1400] = useMediaQuery("(max-width: 1200px)");
    const [isSmallerThan1000] = useMediaQuery("(max-width: 1000px)");
    let count = 3;
    if (isSmallerThan1400) count = 2;
    if (isSmallerThan1000) count = 1;

    return (
        <Flex
            id="featured-events"
            minHeight="550px"
            direction="column"
            width="100%"
            maxW="1500px"
            scrollMarginTop="100px"
            py={12}
        >
            <Container maxW="container.xl">
                <Box
                    bgGradient="linear(to-br, brand.mid_purple, brand.hot_pink)"
                    borderRadius="xl"
                    p={8}
                    boxShadow="xl"
                >
                    <Heading
                        as="h2"
                        color="white"
                        fontSize={["3xl", "4xl", "5xl"]}
                        fontWeight="bold"
                        textAlign="center"
                        mb={8}
                    >
                        {count === 1 ? "Featured Event" : "Featured Events"}
                    </Heading>
                    <Center>
                        <Events count={count} />
                    </Center>
                </Box>
            </Container>
        </Flex>
    );
}

function MeetingInfo() {
    const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
    const [isLargerThan450] = useMediaQuery("(min-width: 450px)");

    const textColor = "white";
    const accentColor = "brand.light_brown";
    const bgGradient = useColorModeValue(
        "linear(to-r, blue.400, purple.500)",
        "linear(to-r, blue.600, purple.700)",
    );
    return (
        <Flex
            id="meeting-info"
            minHeight="700px"
            direction="column"
            width="100%"
            maxW="1500px"
            // bgGradient={
            //     isLargerThan450
            //         ? "linear(to-t, brand.mid_purple, brand.hot_pink)"
            //         : "linear(to-b, brand.mid_purple, brand.hot_pink)"
            // }
            alignItems="center"
            py={16}
        >
            <Container maxW="container.lg">
                <VStack spacing={8} align="center">
                    <Heading
                        as="h2"
                        color={textColor}
                        fontSize={["3xl", "4xl", "5xl", "6xl"]}
                        fontWeight="bold"
                        textAlign="center"
                    >
                        Weekly Meetings
                    </Heading>
                    <Text
                        fontSize={["lg", "xl", "2xl"]}
                        color={accentColor}
                        textAlign="center"
                    >
                        Join us every Tuesday from 6:00pm to 7:30pm PST at MOR
                        Hall 220!
                    </Text>
                    <Box width="100%" maxW="800px">
                        <Room />
                    </Box>
                    <Center height="20vh">
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 0.5,
                            }}
                        >
                            <IconButton
                                variant="outline"
                                isRound={true}
                                aria-label="Scroll Down"
                                size="lg"
                                zIndex="1"
                                border="2px solid"
                                borderColor={accentColor}
                                color={accentColor}
                                bgGradient={bgGradient}
                                onClick={() => {
                                    document
                                        .getElementById("projects")
                                        ?.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                }}
                                _hover={{
                                    bgGradient:
                                        "linear(to-r, blue.500, purple.600)",
                                    color: "white",
                                }}
                                icon={
                                    <FontAwesomeIcon
                                        height="20px"
                                        icon={faArrowDown}
                                    />
                                }
                            />
                        </motion.div>
                    </Center>
                </VStack>
            </Container>
        </Flex>
    );
}

interface ISlogan {
    name: string;
    icon: string;
    description: string;
}

const Values = () => {
    const bgGradient = useColorModeValue(
        "linear(to-r, blue.400, purple.500)",
        "linear(to-r, blue.600, purple.700)",
    );
    const accentColor = useColorModeValue(
        "brand.dark_purple",
        "brand.light_pink",
    );
    const textColor = "white";
    const listenLoudlyDescription = `
    Everyone has a voice and we want to make sure that everyone is heard. We emphasize active listening and understanding in all of our interactions.
    `;
    const freedomToFailDescription = `
    We encourage experimentation and learning from mistakes. We believe that failure is a part of the learning process and that it is important to embrace it.
    `;

    const turnTalkIntoActionDescription = `
    We focus on implementing ideas and following through. We believe that it is important to take action and make things happen.
    `;

    const respectForAllFolksDescription = `
    Everyone has a seat at the table. We promote respect and inclusivity in all interactions.
    `;

    const slogans: ISlogan[] = [
        {
            name: "Listen Loudly",
            icon: "/listen.webp",
            description: listenLoudlyDescription,
        },
        {
            name: "Freedom to Fail",
            icon: "/ok_fail.webp",
            description: freedomToFailDescription,
        },
        {
            name: "Turn Talk into Action",
            icon: "/action.webp",
            description: turnTalkIntoActionDescription,
        },
        {
            name: "Respect for all Folks",
            icon: "/respect.webp",
            description: respectForAllFolksDescription,
        },
    ];

    const [selectedSlogan, setSelectedSlogan] = useState<ISlogan | null>(null);

    return (
        <VStack
            id="club-values"
            minHeight="400px"
            mb={30}
            width="100%"
            alignItems="center"
            spacing={12}
            py={16}
        >
            <Heading
                as="h2"
                color="white"
                fontSize={["3xl", "4xl", "5xl"]}
                fontWeight="bold"
                textAlign="center"
            >
                Club Values
            </Heading>
            <Box p={6} width="80%" maxW="600px" h="8em" textAlign="center">
                <Text fontSize="2xl" color="white">
                    {selectedSlogan
                        ? selectedSlogan.description
                        : "Hover over a value to learn more about it."}
                </Text>
            </Box>
            <Wrap spacing={12} justify="center">
                {slogans.map((slogan) => (
                    <WrapItem key={slogan.name}>
                        <VStack
                            spacing={4}
                            align="center"
                            bg="whiteAlpha.100"
                            p={6}
                            borderRadius="lg"
                            boxShadow="md"
                            transition="all 0.3s"
                            _hover={{
                                transform: "translateY(-5px)",
                                boxShadow: "lg",
                            }}
                            onMouseEnter={() => setSelectedSlogan(slogan)}
                            onMouseLeave={() => setSelectedSlogan(null)}
                            onClick={() => setSelectedSlogan(slogan)}
                            cursor="pointer"
                        >
                            <Image
                                width={100}
                                height={100}
                                style={{ width: "auto", height: "100px" }}
                                src={slogan.icon}
                                alt={slogan.name}
                            />
                            <Text
                                fontSize="xl"
                                fontWeight="semibold"
                                color="white"
                                textAlign="center"
                            >
                                {slogan.name}
                            </Text>
                        </VStack>
                    </WrapItem>
                ))}
            </Wrap>
            <Center height="20vh">
                <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 0.5,
                    }}
                >
                    <IconButton
                        variant="outline"
                        isRound={true}
                        aria-label="Scroll Down"
                        size="lg"
                        zIndex="1"
                        border="2px solid"
                        borderColor={accentColor}
                        color={accentColor}
                        bgGradient={bgGradient}
                        onClick={() => {
                            document
                                .getElementById("meeting-info")
                                ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        _hover={{
                            bgGradient: "linear(to-r, blue.500, purple.600)",
                            color: "white",
                        }}
                        icon={
                            <FontAwesomeIcon height="20px" icon={faArrowDown} />
                        }
                    />
                </motion.div>
            </Center>
        </VStack>
    );
};

function ValuesMobile() {
    const bgGradient = useColorModeValue(
        "linear(to-r, blue.400, purple.500)",
        "linear(to-r, blue.600, purple.700)",
    );

    const textColor = "white";
    const accentColor = "brand.light_pink";
    const slogans: ISlogan[] = [
        { name: "Listen Loudly", icon: "/listen.webp", description: "" },
        { name: "Freedom to Fail", icon: "/ok_fail.webp", description: "" },
        {
            name: "Turn Talk into Action",
            icon: "/action.webp",
            description: "",
        },
        {
            name: "Respect for all Folks",
            icon: "/respect.webp",
            description: "",
        },
    ];
    return (
        <VStack
            id="club-values"
            minHeight="400px"
            mb={30}
            width="100%"
            alignItems="center"
            spacing={12}
            py={16}
        >
            <Heading
                as="h2"
                color="white"
                fontSize={["3xl", "4xl", "5xl"]}
                fontWeight="bold"
                textAlign="center"
            >
                Club Values
            </Heading>
            <Wrap spacing={12} justify="center">
                {slogans.map((slogan) => (
                    <WrapItem key={slogan.name}>
                        <VStack
                            spacing={4}
                            align="center"
                            bg="whiteAlpha.100"
                            p={6}
                            borderRadius="lg"
                            boxShadow="md"
                            transition="all 0.3s"
                            _hover={{
                                transform: "translateY(-5px)",
                                boxShadow: "lg",
                            }}
                        >
                            <Image
                                width={100}
                                height={100}
                                style={{ width: "auto", height: "100px" }}
                                src={slogan.icon}
                                alt={slogan.name}
                            />
                            <Text
                                fontSize="xl"
                                fontWeight="semibold"
                                color="white"
                                textAlign="center"
                            >
                                {slogan.name}
                            </Text>
                        </VStack>
                    </WrapItem>
                ))}
            </Wrap>
            <Center height="20vh">
                <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 0.5,
                    }}
                >
                    <IconButton
                        variant="outline"
                        isRound={true}
                        aria-label="Scroll Down"
                        size="lg"
                        zIndex="1"
                        border="2px solid"
                        borderColor={accentColor}
                        color={accentColor}
                        bgGradient={bgGradient}
                        onClick={() => {
                            document
                                .getElementById("meeting-info")
                                ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        _hover={{
                            bgGradient: "linear(to-r, blue.500, purple.600)",
                            color: "white",
                        }}
                        icon={
                            <FontAwesomeIcon height="20px" icon={faArrowDown} />
                        }
                    />
                </motion.div>
            </Center>
        </VStack>
    );
}

export default function Home() {
    const [isSmallerThan1200] = useMediaQuery("(max-width: 1200px)");
    const [isLargerThan450] = useMediaQuery("(min-width: 450px)");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <VStack spacing={20} width="100%">
            {isSmallerThan1200 ? <TitleMobile /> : <Title />}
            {/* {isLargerThan450 && <FeaturedEvents />} */}

            {/* could change to use MobileValues, but removing for now */}
            {!isSmallerThan1200 && <Values />}
            <MeetingInfo />
            <Projects />
        </VStack>
    );
}
