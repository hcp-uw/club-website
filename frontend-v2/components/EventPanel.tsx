import {
    Image,
    Box,
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
}

export default function EventPanel(props: IEventPanel) {
    const {name, date, location, description, image} = props;

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
                <Image
                    src={image}
                    alt={name}
                    height='350px'
                    width='350px'
                    marginLeft='50px'
                    borderRadius='15px'
                    objectFit='cover'
                />
            </Box>
            <VStack width='50vw' maxWidth='1000px'>
                <Box justifyContent='flex-start' width='100%'>
                    <Text fontSize='4xl' fontWeight='bold' color='white'>
                        {name}
                    </Text>
                </Box>
                <Box justifyContent='flex-start' width='100%'>
                    <Text fontSize='xl' fontWeight='bold' color='white'>
                        {date.toLocaleDateString()} • {location}
                    </Text>
                </Box>
                <Box justifyContent='flex-start' width='100%'>
                    <Text fontSize='xl' color='white'>
                        {description}
                    </Text>
                </Box>
            </VStack>
        </Flex>
    );
}
