import { Button, Text } from "@chakra-ui/react";
import { FormEventHandler, ReactElement } from "react";
import NextLink from "next/link";

interface IButton {
    text: string;
    textColor?: string;
}

interface ILinkButton extends IButton {
    path: string;
    handleShow?: () => void;
}

interface IIconButton extends ILinkButton {
    icon: ReactElement;
}

interface ICallbackButton extends IButton {
    onClick: FormEventHandler<HTMLButtonElement>;
}

interface IIconCallbackButton extends ICallbackButton {
    icon: ReactElement;
}

/**
 * Header Button (transparent with white border on hover)
 */
export const HeaderButton = (props: ILinkButton) => {
    const { path, text } = props;

    return (
        <NextLink href={path}>
            <Button
                variant="ghost"
                rounded="xl"
                height="50px"
                border="3px solid transparent"
                _hover={{ border: "3px solid white", cursor: "pointer" }}
            >
                <Text color="white" fontSize="xl" fontWeight="normal">
                    {text}
                </Text>
            </Button>
        </NextLink>
    );
};

/**
 * Special Header Button (purple gradient with white border on hover)
 */
export const SpecialHeaderButton = (props: ILinkButton) => {
    const { path, text } = props;

    return (
        <NextLink href={path}>
            <Button
                rounded="xl"
                bgGradient="linear(to-b, brand.purple, brand.dark_purple)"
                color="white"
                shadow="xl"
                height="50px"
                marginLeft="3px"
                marginRight="3px"
                _hover={{
                    border: "3px solid white",
                    cursor: "pointer",
                    marginLeft: "0px",
                    marginRight: "0px",
                }}
            >
                <Text
                    color="white"
                    fontSize="xl"
                    fontWeight="normal"
                    padding={5}
                >
                    {text}
                </Text>
            </Button>
        </NextLink>
    );
};

/**
 * Special Header Button (purple gradient with white border on hover)
 */
export const SpecialIconButton = (props: IIconButton) => {
    const { path, text, icon } = props;

    return (
        <NextLink href={path} target="_blank">
            <Button
                rounded="xl"
                bgGradient="linear(to-b, brand.purple, brand.dark_purple)"
                color="white"
                shadow="xl"
                height="50px"
                marginLeft="3px"
                marginRight="3px"
                _hover={{
                    border: "3px solid white",
                    cursor: "pointer",
                    marginLeft: "0px",
                    marginRight: "0px",
                }}
                rightIcon={icon}
            >
                <Text
                    color="white"
                    fontSize="xl"
                    fontWeight="normal"
                    paddingLeft={5}
                    paddingBottom={5}
                    paddingTop={5}
                    paddingRight={2}
                >
                    {text}
                </Text>
            </Button>
        </NextLink>
    );
};

/**
 * Special Header Button (purple gradient with white border on hover)
 */
export const SpecialIconSubmitButton = (props: IIconCallbackButton) => {
    const { text, onClick, icon } = props;

    return (
        <Button
            rounded="xl"
            bgGradient="linear(to-b, brand.purple, brand.dark_purple)"
            color="white"
            shadow="xl"
            height="50px"
            marginLeft="3px"
            marginRight="3px"
            _hover={{
                border: "3px solid white",
                cursor: "pointer",
                marginLeft: "0px",
                marginRight: "0px",
            }}
            rightIcon={icon}
            onClick={onClick}
        >
            <Text
                color="white"
                fontSize="xl"
                fontWeight="normal"
                paddingLeft={5}
                paddingBottom={5}
                paddingTop={5}
                marginRight={2}
            >
                {text}
            </Text>
        </Button>
    );
};

/**
 * Special Header Button (purple gradient with white border on hover)
 */
export const SpecialSubmitButton = (props: ICallbackButton) => {
    const { text, onClick } = props;

    return (
        <Button
            rounded="xl"
            bgGradient="linear(to-b, brand.purple, brand.dark_purple)"
            color="white"
            shadow="xl"
            height="50px"
            marginLeft="3px"
            marginRight="3px"
            _hover={{
                border: "3px solid white",
                cursor: "pointer",
                marginLeft: "0px",
                marginRight: "0px",
            }}
            onClick={onClick}
        >
            <Text color="white" fontSize="xl" fontWeight="normal" padding={5}>
                {text}
            </Text>
        </Button>
    );
};

/**
 * Sidebar Button (transparent with white border on hover)
 */
export const SidebarButton = (props: ILinkButton) => {
    const { path, text, handleShow } = props;

    return (
        <NextLink href={path}>
            <Button
                variant="ghost"
                width="100%"
                rounded="xl"
                height="50px"
                border="3px solid transparent"
                _hover={{ border: "3px solid white", cursor: "pointer" }}
                onClick={handleShow}
            >
                <Text color="white" fontSize="xl" fontWeight="normal">
                    {text}
                </Text>
            </Button>
        </NextLink>
    );
};

/**
 * Normal Button (transparent with a border on hover)
 */
export const NormalButton = (props: ILinkButton) => {
    const { path, text, textColor } = props;

    return (
        <NextLink href={path}>
            <Button
                variant="ghost"
                rounded="lg"
                height="40px"
                border="3px solid transparent"
                _hover={{
                    border: `3px solid ${textColor}`,
                    cursor: "pointer",
                }}
            >
                <Text
                    color={textColor ?? "white"}
                    fontSize="lg"
                    fontWeight="normal"
                >
                    {text}
                </Text>
            </Button>
        </NextLink>
    );
};

/**
 * Arrow Button (down arrow on home page)
 */
export const SpecialLinkButton = (props: ILinkButton) => {
    const { path, text } = props;

    return (
        <NextLink
            href={path}
            target={path.charAt(0) === "/" ? undefined : "_blank"}
        >
            <Button
                rounded="lg"
                bgGradient="linear(to-b, brand.purple, brand.dark_purple)"
                color="white"
                shadow="lg"
                height="40px"
                _hover={{ cursor: "pointer" }}
            >
                <Text
                    color="white"
                    fontSize="xl"
                    fontWeight="normal"
                    padding={5}
                >
                    {text}
                </Text>
            </Button>
        </NextLink>
    );
};

/**
 * Wraps a component based on a condition (used for Skeletons)
 */
interface IConditionalWrapper {
    condition: boolean;
    wrapper: Function;
    children: ReactElement;
}

export const ConditionalWrapper = (props: IConditionalWrapper) => {
    const { condition, wrapper, children } = props;
    return condition ? wrapper(children) : children;
};
