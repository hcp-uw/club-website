import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Image,
    Skeleton,
    Text,
    VStack,
    useColorModeValue,
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
        description,
        gitLink,
        image,
        loading,
    } = props;

    // Adjust card styling dynamically for color modes
    const cardBg = useColorModeValue("gray.900", "gray.700");
    const textColor = useColorModeValue("white", "white");

    return (
        <Card
            variant="elevated"
            key={name}
            width="320px"
            height="400px" // Fixed height to keep things uniform
            marginX="25px"
            bg={cardBg}
            color={textColor}
            boxShadow="lg"
            transition="all 0.3s ease"
            _hover={{
                transform: "scale(1.05)",
                boxShadow: "2xl",
            }}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <CardBody padding="16px">
                <Skeleton isLoaded={!loading} borderRadius="10px">
                    <Image
                        src={image}
                        alt={name}
                        borderRadius="12px"
                        width="100%"
                        height="160px"
                        objectFit="cover"
                    />
                </Skeleton>
                <VStack
                    paddingTop="12px"
                    align="flex-start"
                    spacing="2"
                    flexGrow={1}
                >
                    <Skeleton isLoaded={!loading} width="100%">
                        <Box>
                            <Text fontSize="xl" fontWeight="bold">
                                {name}
                            </Text>
                        </Box>
                    </Skeleton>
                    <Skeleton isLoaded={!loading} width="100%">
                        <Box>
                            <Text fontSize="sm" color="gray.500">
                                {startDate.toLocaleDateString("UTC", {
                                    month: "long",
                                    year: "numeric",
                                })}{" "}
                                -{" "}
                                {completed
                                    ? endDate.toLocaleDateString("UTC", {
                                          month: "long",
                                          year: "numeric",
                                      })
                                    : "Present"}
                            </Text>
                        </Box>
                    </Skeleton>
                    <Skeleton isLoaded={!loading} width="100%">
                        <Box>
                            <Text
                                fontSize="sm"
                                noOfLines={3} // Restrict to 3 lines, truncating the rest
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="normal"
                            >
                                {description}
                            </Text>
                        </Box>
                    </Skeleton>
                </VStack>
            </CardBody>
            <CardFooter padding="16px" justifyContent="flex-start">
                <Skeleton isLoaded={!loading}>
                    <SpecialLinkButton path={gitLink ?? ""} text="GitHub" />
                </Skeleton>
            </CardFooter>
        </Card>
    );
}
