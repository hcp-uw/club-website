import { useState, useEffect } from "react";
import { Inter } from "@next/font/google";
import { Flex, Text, Center, VStack, Input, Textarea } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUpRightFromSquare,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import { sendEmail } from "@/utils/api";
// @ts-ignore
import { auth } from "@/back_end/utils/index.js";

import { UserCredential, signOut } from "firebase/auth";
// @ts-ignore
// import { useAuth } from "@/context/AuthContext";
// @ts-ignore
import { exchangeAuth } from "@/utils/api.js";
// @ts-ignore
import { SpecialIconButton, SpecialSubmitButton } from "@/components/Parts";
const inter = Inter({ subsets: ["latin"] });

function Title() {
    return (
        <Center>
            <Text as='h2' color='white' fontSize='6xl' fontWeight='semibold'>
                Join Us
            </Text>
        </Center>
    );
}

function FormLink() {
    return (
        <VStack spacing={10}>
            <Text
                display='inline'
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
                display='inline'
                fontSize="2xl"
                color="white"
                textAlign="center"
            >
                Have any questions? Send us a message!
            </Text>
            <VStack spacing={5} width="100%">
                <Flex direction="row" width="100%">
                    <Input
                        variant='outline'
                        placeholder='Name'
                        width="50%"
                        color="white"
                        marginRight="20px"
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                    />
                    <Input
                        variant='outline'
                        placeholder='Email'
                        width="50%"
                        color="white"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                </Flex>
                <Textarea
                    variant='outline'
                    placeholder='Type your message here...'
                    width="100%"
                    color="white"
                    height="300px"
                    onChange={(event) => setContent(event.target.value)}
                    value={content}
                />
            </VStack>
            <VStack spacing={5} width="100%">
                <SpecialSubmitButton
                    text="Submit"
                    onClick={handleClick}
                    icon={<FontAwesomeIcon size="lg" icon={faEnvelope} />}
                />
                <Text display='inline' fontSize="md" color="red">
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

    // const { currentUser, isAdmin, getUser } = useAuth()

    // const handleSignInSuccess = async (result: UserCredential) => {
    //     console.log(isAdmin);
    //     console.log(getUser());
    //     const user = auth.currentUser
    //     console.log(await user?.getIdToken());
    //     console.log(await exchangeAuth(user?.getIdToken()))
    // }

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <VStack spacing='40px'>
            <Title />
            <FormLink />
            <EmailForm />
        </VStack>
    );

    // return (
    //     <div id={isMobile ? "join-background-mobile" : "join-background"}>
    //         <>
    //     {currentUser ? (

    //         <div>
    //             <Center>
    //                 <Card
    //                     background="brand.mid_white"
    //                     width='400px'
    //                     height='100px'
    //                 >
    //                     <CardBody alignContent="flex-start">
    //                         <Image
    //                             boxSize="50px"
    //                             src={currentUser.photoURL ?? ""}
    //                         />
    //                         <Text>
    //                             {currentUser.displayName}
    //                         </Text>
    //                     </CardBody>
    //                 </Card>
    //             </Center>
    //             <Center p={8}>
    //             <Button onClick={handleSignOut}
    //                     bg='gray'
    //                     w={'full'}
    //                     maxW={'md'}
    //                     variant={'outline'}
    //             >
    //                 <Center>
    //                 <Text>Sign Out</Text>
    //                 </Center>
    //             </Button>
    //             </Center>
    //         </div>
    //     ) : (
    //         <div>
    //             <SignInComponent onSignInSuccess={handleSignInSuccess} />
    //         </div>
    //     )}
    //     </>
    //         <Flex
    //         //  id={isMobile ? "join-container-mobile" : "join-container"}
    //             height='700px'
    //             direction='column'
    //             width='100vw'
    //             maxW='1500px'
    //             borderRadius='30px'
    //             alignItems='center'
    //         >
    //             <Text
    //                 fontFamily={'Segoe'}
    //                 fontSize='5xl'
    //                 color="white"
    //                 marginTop='4'
    //             >
    //                 Join Us
    //             </Text>
    //             <Text
    //                 display='inline'
    //                 fontSize="2xl"
    //                 color="white"
    //                 marginTop='8'
    //             >
    //                 Fill out the form below to join Husky Coding Project!
    //             </Text>

    //             <Link href="https://forms.gle/JpJaoznG4FBvS1paA">
    //                 <Button
    //                     rightIcon={                        <FontAwesomeIcon
    //                         // height='40px'
    //                         // color='white'
    //                         icon={faEnvelope}
    //                     />}
    //                     colorScheme='purple' size='s' variant='solid'>
    //                     Link to Form
    //                 </Button>
    //             </Link>
    //             {/* <FontAwesomeIcon
    //                 height='40px'
    //                 color='white'
    //                 icon={faEnvelope}
    //             /> */}
    //         </Flex>
    //     </div>
    // );
}
