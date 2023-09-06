import { Inter } from "@next/font/google";
import {
    Center,
    VStack,
    Text,
} from "@chakra-ui/react";
// @ts-ignore
import { getAllEvents } from "@/utils/api";
import { lazy, useEffect, useState } from "react";
import { IEventInfo } from "utils/parsers";
import EventPanel from "components/EventPanel";

const Room = lazy(() => import("components/Room"));
const inter = Inter({ subsets: ["latin"] });

function Title() {
    return (
        <Center>
            <Text
                as='h2'
                color='white'
                fontSize='6xl'
                fontWeight='semibold'
            >
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

    return (
        <VStack>
            {events.map((event: IEventInfo) =>
                <EventPanel
                    key={event.name}
                    name={event.name}
                    date={event.date}
                    location={event.location}
                    description={event.description}
                    image={event.image ?? "/HCPLogo.webp"}
                    loading={loading}
                />              
            )}
        </VStack>
    );
}

export default function Events() {
    // Scroll to top of page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [events, setEvents] = useState<IEventInfo[]>([
        {
            date: new Date("3/21/2023"),
            name: "Default Event",
            location: "Default Location",
            description: "Long".repeat(100),
            image: "",
        },
    ]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getData = (data: IEventInfo[]) => {
            setEvents(data);
            setLoading(false);
        }
        getAllEvents(getData, true);
    }, []);

    return (
        <VStack spacing='40px'>
            <Title />
            <DisplayEvents events={events} loading={loading}/>
        </VStack>
    );
}
