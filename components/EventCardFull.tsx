import {
    Image,
    Text,
    VStack,
    Card,
    CardBody,
    Box,
    Skeleton,
} from "@chakra-ui/react";

interface IEventCardFull {
    name: string;
    date: Date;
    location: string;
    image: string;
    description: string;
    loading: boolean;
}

export default function EventCardFull(props: IEventCardFull) {
    const { name, date, location, image, description, loading } = props;

    return (
        <Card
            variant='elevated'
            size='sm'
            key={name}
            width='300px'
            borderRadius='15px'
            marginX='25px'
            background='brand.mid_white'
            color="black"
        >
            <CardBody alignContent='flex-start'>
                <Skeleton isLoaded={!loading}>
                    <Image
                        src={image}
                        alt={name}
                        borderRadius='15px'
                        width='100%'
                        height='300px'
                        objectFit='cover'
                    />
                </Skeleton>
                <VStack paddingTop='10px' direction='column' spacing='2'>
                    <Skeleton isLoaded={!loading} width='100%'>
                        <Box justifyContent='flex-start' width='100%'>
                            <Text fontSize='xl' fontWeight='bold'>
                                {name}
                            </Text>
                        </Box>
                    </Skeleton>
                    <Skeleton isLoaded={!loading} width='100%'>
                        <Box justifyContent='flex-start' width='100%'>
                            <Text fontSize='md'>
                                {date.toLocaleDateString()} •{" "}
                                {date.toLocaleTimeString()}
                            </Text>
                        </Box>
                    </Skeleton>
                    <Skeleton isLoaded={!loading} width='100%'>
                        <Box justifyContent='flex-start' width='100%'>
                            <Text fontSize='md'>Location: {location}</Text>
                        </Box>
                    </Skeleton>
                    <Skeleton isLoaded={!loading} width='100%'>
                        <Box justifyContent='flex-start' width='100%'>
                            <Text fontSize='sm'>{description}</Text>
                        </Box>
                    </Skeleton>
                </VStack>
            </CardBody>
        </Card>
    );
}
