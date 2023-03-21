import {
    Button,
    Text
} from "@chakra-ui/react";

import { ReactElement } from 'react';

import NextLink from 'next/link';

export const HeaderButton = (props: {path: string, text: string}) => {
    return (
        <NextLink href={props.path}>
            <Button rounded="xl" height='50px' border='3px solid transparent' _hover={{border: '3px solid white', cursor: 'pointer'}}>
                <Text color='white' fontSize='xl' fontWeight='normal'>
                    {props.text}
                </Text>
            </Button>
        </NextLink>
    );
}

export const SpecialHeaderButton = (props: {path: string, text: string}) => {
    return (
        <NextLink href={props.path}>
            <Button
                rounded="xl"
                bgGradient="linear(to-b, brand.purple, brand.dark_purple)"
                color="white"
                shadow='xl'
                height='50px'
                marginLeft='2.225px'
                marginRight='2.225px'
                _hover={{border: '3px solid white', cursor: 'pointer', marginLeft: '0px', marginRight: '0px'}}
                >
                <Text color='white' fontSize='xl' fontWeight='normal' padding={5}>
                    {props.text}
                </Text>
            </Button>
        </NextLink>
    );
}

export const NormalButton = (props: {path: string, text: string, textColor: string}) => {
    return (
        <NextLink href={props.path}>
            <Button variant='ghost' rounded="lg" height='40px' border='3px solid transparent' _hover={{border: `3px solid ${props.textColor}`, cursor: 'pointer'}}>
                <Text color={props.textColor} fontSize='lg' fontWeight='normal'>
                    {props.text}
                </Text>
            </Button>
        </NextLink>
    );
}

export const SpecialArrowButton = (props: {path: string, text: string}) => {
    return (
        <NextLink href={props.path}>
            <Button
                rounded="lg"
                bgGradient="linear(to-b, brand.purple, brand.dark_purple)"
                color="white"
                shadow='lg'
                height='40px'
                _hover={{cursor: 'pointer'}}
                >
                <Text color='white' fontSize='xl' fontWeight='normal' padding={5}>
                    {props.text}
                </Text>
            </Button>
        </NextLink>
    );
}


export const ConditionalWrapper = (props: { condition: boolean, wrapper: Function, children: ReactElement }) => {
    return (props.condition ? props.wrapper(props.children) : props.children);
};