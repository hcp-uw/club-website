import { Box, Flex, useMediaQuery as chakraMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Room = () => {
    const [isClient, setIsClient] = useState(false);
    const [isLargeScreen] = chakraMediaQuery("(min-width: 1000px)");

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <Flex
            flex="1"
            direction={isLargeScreen ? "row" : "column"}
            justifyContent="space-between"
            p={4}
        >
            {isLargeScreen && (
                <Box
                    flex="1"
                    mr={4}
                    borderRadius="md"
                    boxShadow="lg"
                    overflow="hidden"
                >
                    <iframe
                        title="OUG141"
                        id="home-vr"
                        allowFullScreen
                        width="100%"
                        height="100%"
                        src="https://www.washington.edu/classroom/vrview/index.html?image=https://features.classrooms.uw.edu/room-images/panoramas/MOR_220_panorama.jpg&"
                        style={{ borderRadius: "5px" }}
                    />
                </Box>
            )}
            <Box
                flex="1"
                ml={isLargeScreen ? 4 : 0}
                mt={isLargeScreen ? 0 : 4}
                borderRadius="md"
                boxShadow="lg"
                overflow="hidden"
            >
                <Image
                    src="/more_hall.webp"
                    alt="UW CSE2 (Gates Center) Building"
                    width={500}
                    height={300}
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "5px",
                        objectFit: "cover",
                    }}
                />
            </Box>
        </Flex>
    );
};

export default Room;
