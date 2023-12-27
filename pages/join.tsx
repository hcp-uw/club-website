import { Center, Flex, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";

// @ts-ignore
import { SpecialIconButton, SpecialIconSubmitButton } from "@/components/Parts";
// @ts-ignore
import { sendEmail } from "@/utils/api";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
import {
    faEnvelope,
    faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

function Title() {
    return (
        <Center>
            <Text as="h2" color="white" fontSize="6xl" fontWeight="semibold">
                Join Us
            </Text>
        </Center>
    );
}

function FormLink() {
    return (
        <VStack spacing={10}>
            <Text
                display="inline"
                fontSize="2xl"
                color="white"
                textAlign="center"
            >
                Fill out the form below to join Husky Coding Project!
            </Text>
            <SpecialIconButton
                path="https://forms.gle/EJZKu64nNQwsGxLm8"
                text="Sign-up Form"
                icon={<FontAwesomeIcon size="lg" icon={faUpRightFromSquare} />}
            />
        </VStack>
    );
}

function EmailForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const isEmailValid = (email: string): boolean => {
        return /^\S+@\S+\.\S+$/.test(email);
    };

    const handleClick = () => {
        if (name.length === 0) {
            setError("Name is required");
        } else if (email.length === 0) {
            setError("Email is required");
        } else if (content.length === 0) {
            setError("Content is required");
        } else if (!isEmailValid(email)) {
            setError("Invalid email address");
        } else {
            setName("");
            setEmail("");
            setContent("");
            sendEmail(name, email, content);
        }
    };

    return (
        <VStack spacing={10} marginTop="50px" width="50vw" minWidth="300px">
            <Text
                display="inline"
                fontSize="2xl"
                color="white"
                textAlign="center"
            >
                Have any questions? Send us a message!
            </Text>
            <VStack spacing={5} width="100%">
                <Flex direction="row" width="100%">
                    <Input
                        variant="outline"
                        placeholder="Name"
                        width="50%"
                        color="white"
                        marginRight="20px"
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                    />
                    <Input
                        variant="outline"
                        placeholder="Email"
                        width="50%"
                        color="white"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                </Flex>
                <Textarea
                    variant="outline"
                    placeholder="Type your message here..."
                    width="100%"
                    color="white"
                    height="300px"
                    onChange={(event) => setContent(event.target.value)}
                    value={content}
                />
            </VStack>
            <VStack spacing={5} width="100%">
                <SpecialIconSubmitButton
                    text="Submit"
                    onClick={handleClick}
                    icon={<FontAwesomeIcon size="lg" icon={faEnvelope} />}
                />
                <Text display="inline" fontSize="md" color="red">
                    {error}
                </Text>
            </VStack>
        </VStack>
    );
}

export default function Join() {
    // Scroll to top of page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <VStack spacing="40px">
            <Title />
            <FormLink />
            <EmailForm />
        </VStack>
    );
}
