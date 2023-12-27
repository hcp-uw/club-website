import { useEffect, useMemo, useState } from "react";
import {
    Center,
    Flex,
    Box,
    Text,
    Spacer,
    Image,
    Spinner,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
// @ts-ignore
import { getPeople } from "@/utils/api";
// @ts-ignore
import { IPeopleInfo } from "@/utils/parsers";

export default function About() {
    // Scroll to top of page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [people, setPeople] = useState<IPeopleInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSmallerThan1400] = useMediaQuery("(max-width: 1400px)", {
        ssr: true,
        fallback: false, // return false on the server, and re-evaluate on the client side
    });

    useEffect(() => {
        const getData = (data: IPeopleInfo[]) => {
            if (data.length !== 0) {
                setPeople(data);
                setIsLoading(false);
            }
        };
        getPeople(getData);
    }, []);

    function formatName(name: string) {
        // example Rasmus Makiniemi
        const lastInitial = `${name.split(" ")[1][0]}.`;
        return `${name.split(" ")[0]} ${lastInitial}`;
    }

    function formatRole(role: string) {
        // example Onboarding/Education
        if (role.split("/").length !== 1) {
            return `${role.split("/")[0]} & ${role.split("/")[1]}`;
        } else return role;
    }

    const generateAvatars = useMemo(() => {
        if (isLoading) {
            return (
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    color="brand.purple"
                    size="xl"
                />
            );
        }
        return (
            <Flex
                justifyContent="center"
                flexWrap="wrap"
                width="80%"
                margin="auto"
                paddingTop="30px"
            >
                {people.map((person) => {
                    return (
                        <Flex
                            flexDirection="column"
                            alignItems="center"
                            margin="20px"
                            width="15%"
                            key={person.email}
                        >
                            <Box
                                width="150px"
                                height="150px"
                                backgroundImage={
                                    person.image ?? "/HCPLogo.webp"
                                }
                                backgroundSize="100%"
                                backgroundPosition="center"
                                borderRadius="50%"
                                marginBottom="30px"
                            />
                            <Text
                                fontSize={["md", "xl", "2xl"]}
                                color="white"
                                overflowWrap="anywhere"
                                textAlign="center"
                                width="90%"
                            >
                                {formatName(person.name)}
                            </Text>
                            <Text
                                fontSize="large"
                                color="#FD72F8"
                                overflowWrap="anywhere"
                                textAlign="center"
                            >
                                {formatRole(person.role)}
                            </Text>
                        </Flex>
                    );
                })}
            </Flex>
        );
    }, [people, isLoading]);

    const theWhy = useMemo(
        () => (
            <Flex
                justify="center"
                margin="auto"
                width="80vw"
                marginTop="20px"
                maxWidth="1500px"
                direction={isSmallerThan1400 ? "column" : "row"}
            >
                <Flex
                    direction="column"
                    color="white"
                    width={isSmallerThan1400 ? "100%" : "60%"}
                    marginBottom={isSmallerThan1400 ? "100px" : undefined}
                >
                    <Text
                        fontSize={["3xl", "4xl", "5xl", "6xl"]}
                        fontWeight="semibold"
                    >
                        The Why
                    </Text>
                    <Text fontSize={["md", "xl", "2xl"]} marginTop="1em">
                        The majority of projects offered by CS coursework are
                        solo or in pairs, so future programmers miss out on the
                        invaluable experience of working in larger teams.
                        Additionally, the leading motivation to do CS class
                        projects are for grades, rather than for the learning
                        experience.
                    </Text>
                    <Text fontSize={["md", "xl", "2xl"]} marginTop="1em">
                        Getting internships is the best ways to gain real world
                        experience on the job. However, it is also quite
                        difficult to obtain without having some prior
                        experience.
                    </Text>
                    <Text fontSize={["md", "xl", "2xl"]} marginTop="1em">
                        This circular logic plagues every generation of
                        programmers.
                    </Text>
                </Flex>
                <Spacer />
                <Flex
                    height="100%"
                    width={isSmallerThan1400 ? "100%" : "40%"}
                    marginLeft={isSmallerThan1400 ? undefined : "150px"}
                    alignSelf="center"
                    justifyContent="center"
                >
                    <Image src="/loop-graphic.png" alt="some cool design" />
                </Flex>
            </Flex>
        ),
        [isSmallerThan1400],
    );

    const ourMission = useMemo(
        () => (
            <Flex
                justify="center"
                margin="auto"
                width="80vw"
                marginTop={isSmallerThan1400 ? "100px" : "150px"}
                maxWidth="1500px"
                direction={isSmallerThan1400 ? "column" : "row"}
            >
                <Flex
                    direction="column"
                    color="white"
                    width={isSmallerThan1400 ? "100%" : "60%"}
                    marginBottom={isSmallerThan1400 ? "100px" : undefined}
                >
                    <Text
                        fontSize={["3xl", "4xl", "5xl", "6xl"]}
                        fontWeight="semibold"
                    >
                        Our Mission
                    </Text>
                    <Box>
                        <Text
                            fontSize={["md", "xl", "2xl"]}
                            display="inline"
                            marginTop="1em"
                        >
                            To create a tech internship-like environment that
                            promotes the growth and development of our club
                            members. We provide team-based programming project
                            experience and encourage
                        </Text>
                        <Text
                            fontSize={["md", "xl", "2xl"]}
                            display="inline"
                            color="brand.pink"
                        >
                            {} peer-to-peer learning
                        </Text>
                        <Text fontSize={["md", "xl", "2xl"]} display="inline">
                            {} to provide the next generation of programmers &
                            designers with the tools and experience to
                        </Text>
                        <Text
                            fontSize={["md", "xl", "2xl"]}
                            display="inline"
                            color="brand.pink"
                        >
                            {} succeed in future tech careers.
                        </Text>
                    </Box>
                </Flex>
                <Flex
                    height="100%"
                    width={isSmallerThan1400 ? "100%" : "40%"}
                    marginLeft={isSmallerThan1400 ? undefined : "150px"}
                    alignSelf="center"
                    justifyContent="center"
                    marginTop="-40px"
                >
                    <Image
                        src="/output-onlinegiftools.gif"
                        alt="some cool design"
                        width="400px"
                    />
                </Flex>
            </Flex>
        ),
        [isSmallerThan1400],
    );

    const ourTeam = useMemo(() => {
        if (isSmallerThan1400) return <></>;
        return (
            <>
                <Text
                    textAlign="center"
                    color="white"
                    fontSize={["3xl", "4xl", "5xl", "6xl"]}
                    marginTop="150px"
                    fontWeight="semibold"
                >
                    Our Team
                </Text>
                {isLoading ? (
                    <Center marginTop="30px">
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            color="brand.purple"
                            size="xl"
                        />
                    </Center>
                ) : (
                    generateAvatars
                )}
            </>
        );
    }, [isLoading, isSmallerThan1400]);

    return (
        <>
            {theWhy}
            {ourMission}
            {ourTeam}
        </>
    );
}
