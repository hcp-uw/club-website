import { Inter } from "@next/font/google";
import {
    Center,
    VStack,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    SimpleGrid,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import { getProjects } from "@/utils/api";
import { ChangeEvent, lazy, useEffect, useState } from "react";
import { IProjectInfo } from "utils/parsers";
import ProjectCard from "components/ProjectCard";

const Room = lazy(() => import("components/Room"));
const inter = Inter({ subsets: ["latin"] });

function Title() {
    return (
        <Center>
            <Text
                as='h2'
                color='white'
                fontSize='6xl'
                fontWeight='semibold'
            >
                Projects
            </Text>
        </Center>
    );
}

interface ISearchBar {
    setSearchTerm: (value: string) => void;
}

function SearchBar(props: ISearchBar) {
    const { setSearchTerm } = props;

    return (
        <Center>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    paddingLeft={2}
                    paddingTop={2}
                >
                    <FontAwesomeIcon
                        color='grey'
                        height='20px'
                        icon={faSearch}
                    />
                </InputLeftElement>
                <Input
                    placeholder='Search for projects...'
                    textColor='white'
                    width='80vw'
                    borderRadius='2xl'
                    maxW='1500px'
                    size="lg"
                    onChange={
                        (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)
                    }
                />
            </InputGroup>
        </Center>
    );
}

interface IDisplayProps {
    searchTerm: string;
    projects: IProjectInfo[];
    loading: boolean;
}

function DisplayProjects(props: IDisplayProps) {
    const { searchTerm, projects, loading } = props;

    // Helper functions for search
    const searchField = (field: keyof IProjectInfo): IProjectInfo[] => {
        if (field == null || projects == null) {
            return [];
        }
        return projects.filter((obj: IProjectInfo) =>
            obj[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const filterDuplicates = (curr: IProjectInfo[], add: IProjectInfo[]): IProjectInfo[] => {
        return add.filter((obj: IProjectInfo, idx: number) => curr.indexOf(obj) === -1);
    };

    const filterProjects = (): IProjectInfo[] => {
        if (searchTerm === "") {
            return projects ?? [];
        }
        const cards: IProjectInfo[] = [];
        const filterOrder: (keyof IProjectInfo)[] = 
            ["name", "category", "description", "pm", "members"];
        filterOrder.forEach((key: keyof IProjectInfo) => 
            cards.push(...filterDuplicates(cards, searchField(key))));
        return cards;
    };
    
    // Display cards
    let filteredProjects: IProjectInfo[] = [];
    if (loading) {
        filteredProjects = projects;
    } else {
        filteredProjects = filterProjects();
    }
    if (filteredProjects.length === 0) {
        return (
            <VStack paddingBottom={100}>
                <Text
                    as='h6'
                    color='white'
                    fontSize='2xl'
                    fontWeight='semibold'
                >
                    No projects found :(
                </Text>
            </VStack>
        );
    }
    return (
        <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing='40px'>
            {filteredProjects.map((project: IProjectInfo) =>
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
            )}
        </SimpleGrid>
    );
}

export default function Projects() {
    // Scroll to top of page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [projects, setProjects] = useState<IProjectInfo[]>([
        {
            name: "Project 1",
            startDate: new Date("3/21/2023"),
            endDate: new Date("3/21/2023"),
            completed: true,
            category: "",
            pm: "",
            gitLink: "",
            description: "Default description that is very long and should wrap around to the next few lines.",
            members: "",
            image: "",
        },
        {
            name: "Project 2",
            startDate: new Date("3/21/2023"),
            endDate: new Date("3/21/2023"),
            completed: true,
            category: "",
            pm: "",
            gitLink: "",
            description: "Default description that is very long and should wrap around to the next few lines.",
            members: "",
            image: "",
        },
        {
            name: "Project 3",
            startDate: new Date("3/21/2023"),
            endDate: new Date("3/21/2023"),
            completed: true,
            category: "",
            pm: "",
            gitLink: "",
            description: "Default description that is very long and should wrap around to the next few lines.",
            members: "",
            image: "",
        },
    ]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getData = (data: IProjectInfo[]) => {
            setProjects(data);
            setLoading(false);
        }
        getProjects(getData);
    }, []);

    return (
        <VStack spacing='40px'>
            <Title />
            <SearchBar setSearchTerm={setSearchTerm}/>
            <DisplayProjects searchTerm={searchTerm} projects={projects} loading={loading}/>
        </VStack>
    );
}
