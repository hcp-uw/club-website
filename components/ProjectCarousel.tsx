import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/utils/api";
import type { IProjectInfo } from "@/utils/parsers";
import { Box, Heading, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

// Slick carousel settings
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Change based on the screen size
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};

export default function ProjectCarousel() {
    const [projects, setProjects] = useState<IProjectInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getData = (data: IProjectInfo[]) => {
            console.log(data);
            setProjects(data);
            setLoading(false);
        };
        getAllProjects(getData);
    }, []);

    if (projects.length === 0 && !loading) {
        return (
            <VStack paddingBottom={100}>
                <Heading
                    as="h6"
                    color="white"
                    fontSize="2xl"
                    fontWeight="semibold"
                >
                    No projects found :(
                </Heading>
            </VStack>
        );
    }

    return (
        <Box width="100%" py={10} maxW="1200px" mx="auto">
            <Slider {...settings}>
                {projects.map((project: IProjectInfo) => (
                    <Box key={project.name} px={2}>
                        <ProjectCard
                            key={project.name}
                            name={project.name}
                            startDate={project.startDate}
                            endDate={project.endDate}
                            completed={project.completed}
                            category={project.category}
                            pm={project.pm}
                            gitLink={project.gitLink ?? ""}
                            description={project.description}
                            members={project.members}
                            image={project.image ?? "/HCPLogo.webp"}
                            loading={loading}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}
