import { Inter } from "@next/font/google";
import {
    Center,
    VStack,
    Flex,
    Box,
    Text,
    Input,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import { getProjects } from "@/utils/api";
import Image from 'next/image';
import { ChangeEvent, lazy, memo, useEffect, useState } from "react";
import EventCard from "components/EventCard";
import { IProjectInfo } from "utils/parsers";

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
    projects: IProjectInfo[] | null;
}

function DisplayProjects(props: IDisplayProps) {
    const { searchTerm, projects } = props;

    // Compute search
    const searchField = (field: keyof IProjectInfo): IProjectInfo[] => {
        if (field == null || projects == null) {
            return [];
        }
        return projects.filter((obj: IProjectInfo) =>
            obj[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const filterDuplicates = (curr: IProjectInfo[], add: IProjectInfo[]): IProjectInfo[] => {
        return add.filter((obj: IProjectInfo, idx: number) => curr.indexOf(obj) == -1);
    };

    const filterProjects = (): IProjectInfo[] => {
        if (searchTerm === "") {
            return projects ?? [];
        }
        const cards: IProjectInfo[] = [];
        cards.push(...filterDuplicates(cards, searchField("name")));
        cards.push(...filterDuplicates(cards, searchField("category")));
        cards.push(...filterDuplicates(cards, searchField("description")));
        cards.push(...filterDuplicates(cards, searchField("pm")));
        cards.push(...filterDuplicates(cards, searchField("members")));
        return cards;
    };
    console.log(projects);
    let filteredProjects: IProjectInfo[] = [];
    if (projects != null) {
        filteredProjects = filterProjects();
    }
    console.log(filteredProjects);
    return (
        <></>
    );
}

export default function Projects() {
    // Scroll to top of page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [projects, setProjects] = useState<IProjectInfo[] | null>(null);

    useEffect(() => {
        getProjects(setProjects);
    }, []);

    return (
        <VStack spacing='40px'>
            <Title />
            <SearchBar setSearchTerm={setSearchTerm}/>
            <DisplayProjects searchTerm={searchTerm} projects={projects}/>
        </VStack>
    );
}
