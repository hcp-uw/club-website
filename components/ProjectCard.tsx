import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Image,
    Skeleton,
    Text,
    VStack,
} from "@chakra-ui/react";
import { SpecialLinkButton } from "./Parts";

interface IProjectCard {
    name: string;
    startDate: Date;
    endDate: Date;
    completed: boolean;
    category: string;
    pm: string;
    gitLink: string | null;
    description: string;
    members: string;
    image: string;
    loading: boolean;
}

export default function ProjectCard(props: IProjectCard) {
    const {
        name,
        startDate,
        endDate,
        completed,
        category,
        pm,
        gitLink,
        description,
        members,
        image,
        loading,
    } = props;

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
            borderWidth="5px"
            borderColor={completed ? "black" : "green.500"}
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
                            <Text fontSize="lg" fontWeight="bold">
                                {name}
                            </Text>
                        </Box>
                    </Skeleton>
                    <Skeleton isLoaded={!loading} width="100%">
                        <Box justifyContent="flex-start" width="100%">
                            <Text fontSize="sm">
                                {startDate.toLocaleDateString()} •{" "}
                                {completed
                                    ? endDate.toLocaleDateString()
                                    : "Present"}
                            </Text>
                        </Box>
                    </Skeleton>
                    <Skeleton isLoaded={!loading} width="100%">
                        <Box justifyContent="flex-start" width="100%">
                            <Text fontSize="xs">{description}</Text>
                        </Box>
                    </Skeleton>
                </VStack>
            </CardBody>
            <CardFooter paddingTop="0px" justifyContent="flex-start">
                <Skeleton isLoaded={!loading}>
                    <SpecialLinkButton path={gitLink ?? ""} text="Details" />
                </Skeleton>
            </CardFooter>
        </Card>
    );
}
