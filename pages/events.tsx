import { Inter } from "@next/font/google";
import { Center, VStack, Text, Spinner, SimpleGrid } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
// @ts-ignore
import { getAllEvents } from "@/utils/api";
import { lazy, useEffect, useState } from "react";
// @ts-ignore
import { IEventInfo } from "@/utils/parsers";
// @ts-ignore
import EventPanel from "@/components/EventPanel";
// @ts-ignore
import EventCardFull from "@/components/EventCardFull";
// @ts-ignore
const inter = Inter({ subsets: ["latin"] });

function Title() {
    return (
        <Center>
            <Text as="h2" color="white" fontSize="6xl" fontWeight="semibold">
                Events
            </Text>
        </Center>
    );
}

interface IDisplayProps {
    events: IEventInfo[];
    loading: boolean;
}

function DisplayEvents(props: IDisplayProps) {
    const { events, loading } = props;
    const [isSmallerThan1200] = useMediaQuery("(max-width: 1200px)", {
        ssr: true,
        fallback: false, // return false on the server, and re-evaluate on the client side
    });
    const [isSmallerThan450] = useMediaQuery("(max-width: 450px)", {
        ssr: true,
        fallback: false, // return false on the server, and re-evaluate on the client side
    });

    if (loading) {
        return (
            <Spinner
                thickness="4px"
                speed="0.65s"
                color="brand.purple"
                size="xl"
            />
        );
    }

    if (isSmallerThan1200) {
        return (
            <SimpleGrid
                columns={isSmallerThan450 ? undefined : [1, 1, 2, 2, 3]}
                spacing="40px"
            >
                {events.map((event) => (
                    <EventCardFull
                        key={event.name}
                        name={event.name}
                        date={event.date}
                        location={event.location}
                        description={event.description}
                        image={event.image ?? "/HCPLogo.webp"}
                        loading={loading}
                    />
                ))}
            </SimpleGrid>
        );
    }

    return (
        <VStack>
            {events.map((event: IEventInfo) => (
                <EventPanel
                    key={event.name}
                    name={event.name}
                    date={event.date}
                    location={event.location}
                    description={event.description}
                    image={event.image ?? "/HCPLogo.webp"}
                />
            ))}
        </VStack>
    );
}

export default function Events() {
    // Scroll to top of page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [events, setEvents] = useState<IEventInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getData = (data: IEventInfo[]) => {
            setEvents(data);
            setLoading(false);
        };
        getAllEvents(getData, true);
    }, []);

    return (
        <VStack spacing="40px">
            <Title />
            <DisplayEvents
                events={events}
                loading={loading || events.length === 0}
            />
        </VStack>
    );
}
