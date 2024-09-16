import { Box, IconButton, Image, useColorModeValue } from "@chakra-ui/react";
import type React from "react";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ImageCarouselProps {
    images: string[];
    interval?: number; // Optional prop for cycling interval in milliseconds
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
    images,
    interval = 3000,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically cycle through images
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer); // Cleanup interval on component unmount
    }, [images, interval]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1,
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <Box position="relative" width="full" overflow="hidden">
            <Image
                src={images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                width="full"
                height="400px"
                objectFit="cover"
                borderRadius="md"
                boxShadow="md"
                transition="opacity 0.5s ease-in-out"
            />

            {/* Left Arrow */}
            <IconButton
                aria-label="Previous Slide"
                icon={<FaArrowLeft />}
                onClick={prevSlide}
                position="absolute"
                left="10px"
                top="50%"
                transform="translateY(-50%)"
                bg={useColorModeValue("whiteAlpha.800", "blackAlpha.800")}
                _hover={{
                    bg: useColorModeValue("whiteAlpha.900", "blackAlpha.900"),
                }}
                zIndex={2}
            />

            {/* Right Arrow */}
            <IconButton
                aria-label="Next Slide"
                icon={<FaArrowRight />}
                onClick={nextSlide}
                position="absolute"
                right="10px"
                top="50%"
                transform="translateY(-50%)"
                bg={useColorModeValue("whiteAlpha.800", "blackAlpha.800")}
                _hover={{
                    bg: useColorModeValue("whiteAlpha.900", "blackAlpha.900"),
                }}
                zIndex={2}
            />
        </Box>
    );
};

export default ImageCarousel;
