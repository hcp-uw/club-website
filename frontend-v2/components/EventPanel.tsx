import {
    Image,
    Box,
    Skeleton,
    Flex,
    Text,
    VStack,
} from "@chakra-ui/react";

interface IEventPanel {
    name: string;
    date: Date;
    location: string;
    description: string;
    image: string;
    loading: boolean;
}

export default function EventPanel(props: IEventPanel) {
    const {name, date, location, description, image, loading} = props;

    return (
        <Flex
            id='meeting-info'
            height='450px'
            direction='row'
            width='80vw'
            maxW='1500px'
            bgGradient='linear(to-t, brand.mid_purple, brand.hot_pink)'
            borderRadius='30px'
            alignItems='center'
            marginBottom='50px'
        >
            <Box width='30vw' maxW='500px'>
                <Skeleton isLoaded={!loading}>
                    <Image
                        src={image}
                        alt={name}
                        height='350px'
                        width='350px'
                        marginLeft='50px'
                        borderRadius='15px'
                        objectFit='cover'
                    />
                </Skeleton>
            </Box>
            <VStack width='50vw' maxWidth='1000px'>
                <Skeleton isLoaded={!loading} width='100%'>
                    <Box justifyContent='flex-start' width='100%'>
                        <Text fontSize='4xl' fontWeight='bold' color='white'>
                            {name}
                        </Text>
                    </Box>
                </Skeleton>
                <Skeleton isLoaded={!loading} width='100%'>
                    <Box justifyContent='flex-start' width='100%'>
                        <Text fontSize='xl' fontWeight='bold' color='white'>
                            {date.toLocaleDateString()} • {location}
                        </Text>
                    </Box>
                </Skeleton>
                <Skeleton isLoaded={!loading} width='100%' height='200px' marginTop='30px'>
                    <Box justifyContent='flex-start' width='100%'>
                        <Text fontSize='xl' color='white'>
                            {description}
                        </Text>
                    </Box>
                </Skeleton>
            </VStack>
        </Flex>
    );
}
