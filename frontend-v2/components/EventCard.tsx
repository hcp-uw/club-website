import {
    Image,
    Text,
    VStack,
    Card,
    CardBody,
    CardFooter,
    Box,
    Skeleton
} from "@chakra-ui/react";

import { SpecialArrowButton } from "./Parts";

export default function EventCard(props: {name: string, date: Date, location: string, image: string, loading: boolean}) {
    return (
        <Card variant='elevated' size='sm' key={props.name} width='300px' height='375px' borderRadius='15px' marginX='25px' background='brand.mid_blue' color="white">
            <CardBody alignContent='flex-start'>
                <Skeleton isLoaded={!props.loading}>
                    <Image src={props.image} alt={props.name} borderRadius='15px' width='100%' height='150px' objectFit='cover'/>
                </Skeleton>
                <VStack paddingTop='10px' direction='column' spacing='2'>
                    <Skeleton isLoaded={!props.loading} width='100%'>
                        <Box justifyContent='flex-start' width='100%'>
                            <Text fontSize='2xl' fontWeight='bold'>{props.name}</Text>
                        </Box>
                    </Skeleton>
                    <Skeleton isLoaded={!props.loading} width='100%'>
                        <Box justifyContent='flex-start' width='100%'>
                            <Text fontSize='lg'>{props.date.toLocaleDateString()} • {props.date.toLocaleTimeString()}</Text>
                        </Box>
                    </Skeleton>
                    <Skeleton isLoaded={!props.loading} width='100%'>
                        <Box justifyContent='flex-start' width='100%'>
                            <Text fontSize='lg'>Location: {props.location}</Text>
                        </Box>
                    </Skeleton>
                </VStack>
            </CardBody>
            <CardFooter paddingTop='0px' justifyContent='flex-start'>
                <Skeleton isLoaded={!props.loading}>
                    <SpecialArrowButton path='/events' text='Details'/>
                </Skeleton>
            </CardFooter>
        </Card>
    );
}
