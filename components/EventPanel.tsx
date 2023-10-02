import { Image, Box, Flex, Text, VStack } from "@chakra-ui/react";

interface IEventPanel {
    name: string;
    date: Date;
    location: string;
    description: string;
    image: string;
}

export default function EventPanel(props: IEventPanel) {
    const { name, date, location, description, image } = props;

    return (
        <Flex
            id='meeting-info'
            direction='row'
            width='80vw'
            maxW='1500px'
            bgGradient='linear(to-t, brand.mid_purple, brand.hot_pink)'
            borderRadius='30px'
            alignItems='center'
            marginBottom='50px'
        >
            <Box width='500px' margin='50px'>
                <Image
                    src={image}
                    alt={name}
                    height='350px'
                    width='350px'
                    borderRadius='15px'
                    objectFit='cover'
                />
            </Box>
            <VStack
                width='calc(min(80vw, 1500px) - 350px)'
                paddingRight="50px"
                marginTop='50px'
                marginBottom='50px'
            >
                <Box justifyContent='flex-start' width='100%'>
                    <Text
                        fontSize={["2xl", "2xl", "4xl"]}
                        fontWeight='bold'
                        color='white'
                    >
                        {name}
                    </Text>
                </Box>
                <Box justifyContent='flex-start' width='100%'>
                    <Text
                        fontSize={["md", "md", "xl"]}
                        fontWeight='bold'
                        color='white'
                    >
                        {date.toLocaleDateString()} • {location}
                    </Text>
                </Box>
                <Box justifyContent='flex-start' width='100%'>
                    <Text fontSize={["md", "md", "xl"]} color='white'>
                        {description}
                    </Text>
                </Box>
            </VStack>
        </Flex>
    );
}
