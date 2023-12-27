import {
    Image,
    Text,
    VStack,
    Card,
    CardBody,
    CardFooter,
    Box,
    Skeleton,
} from "@chakra-ui/react";
import { SpecialLinkButton } from "./Parts";

interface IEventCard {
    name: string;
    date: Date;
    location: string;
    image: string;
    loading: boolean;
}

export default function EventCard(props: IEventCard) {
    const { name, date, location, image, loading } = props;
    return (
        <Card
            variant="elevated"
            size="sm"
            key={name}
            width="300px"
            height="375px"
            borderRadius="15px"
            marginX="25px"
            background="brand.mid_white"
            color="black"
        >
            <CardBody alignContent="flex-start">
                <Skeleton isLoaded={!loading}>
                    <Image
                        src={image}
                        alt={name}
                        borderRadius="15px"
                        width="100%"
                        height="150px"
                        objectFit="cover"
                    />
                </Skeleton>
                <VStack paddingTop="10px" direction="column" spacing="2">
                    <Skeleton isLoaded={!loading} width="100%">
                        <Box justifyContent="flex-start" width="100%">
                            <Text fontSize="2xl" fontWeight="bold">
                                {name}
                            </Text>
                        </Box>
                    </Skeleton>
                    <Skeleton isLoaded={!loading} width="100%">
                        <Box justifyContent="flex-start" width="100%">
                            <Text fontSize="lg">
                                {date.toLocaleDateString()} •{" "}
                                {date.toLocaleTimeString()}
                            </Text>
                        </Box>
                    </Skeleton>
                    <Skeleton isLoaded={!loading} width="100%">
                        <Box justifyContent="flex-start" width="100%">
                            <Text fontSize="lg">Location: {location}</Text>
                        </Box>
                    </Skeleton>
                </VStack>
            </CardBody>
            <CardFooter paddingTop="0px" justifyContent="flex-start">
                <Skeleton isLoaded={!loading}>
                    <SpecialLinkButton path="/events" text="Details" />
                </Skeleton>
            </CardFooter>
        </Card>
    );
}
