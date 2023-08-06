import React, { useState } from "react";
import {
    Box,
    Button,
    Divider,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    Flex,
    Grid
} from "@chakra-ui/react";


interface Event {
    date: Date;
    name: string;
    location: string;
    sponsor: string | null;
    attendees: number;
    description: string;
    image: string | null;
}

interface Person {
    name: string;
    id: number;
    joinDate: Date;
    active: boolean;
    year: string;
    role: string;
    email: string;
    team: string;
    leftDate: Date | null;
    image: string;
}

interface Project {
    name: string;
    startDate: Date;
    endDate: Date;
    completed: boolean;
    category: string;
    pm: string;
    gitLink: string;
    description: string;
    members: string;
    image: string;
}

interface FormProps<T> {
    data: T[];
    onDataUpdate: (updatedData: T[]) => void;
}

type FormField = {
    label: string;
    key: string;
    type: "text" | "textarea" | "datetime-local";
};

const Form: React.FC<FormProps<any>> = ({ data, onDataUpdate }) => {
    const [currentData, setCurrentData] = useState<any[]>(data);

    const getInputType = (val: any) => {
        if (val instanceof Date) return "datetime-local";
        if (typeof val === "number") return "number";
        return "text";
    };

    const handleInputChange = (index: number, key: string, value: any) => {
        setCurrentData((prevData) => {
            const newData = [...prevData];
            newData[index][key] = value;
            return newData;
        });
    };

    const handleSubmit = () => {
        onDataUpdate(currentData)
        console.log(currentData)
    };

    return (
        <form>
            {currentData.map((item, index) => (
                <Box key={index} mb={4}>
                    {Object.entries(item).map(([key, value]) => (
                        <Flex key={key} align="center" mb={2}>
                            <FormLabel htmlFor={key} mr={2}>
                                {key}
                            </FormLabel>
                            <Input
                                type={getInputType(value)}
                                id={key}
                                name={key}
                                value={String(value)}
                                onChange={(event) =>
                                    handleInputChange(index, key, event.target.value)
                                }
                            />
                        </Flex>
                    ))}
                    <br />
                </Box>
            ))}
            <Button type="button" onClick={handleSubmit}>
                Enter Changes
            </Button>
        </form>
    );
};

interface AdminFormProps {
    events: { status: number; data: Event[] };
    people: { status: number; data: Person[] };
    projects: { status: number; data: Project[] };
}

const AdminForm: React.FC<AdminFormProps> = ({ events, people, projects }) => {
    const [currentEvents, setCurrentEvents] = useState<Event[]>(events.data);
    const [currentPeople, setCurrentPeople] = useState<Person[]>(people.data);
    const [currentProjects, setCurrentProjects] = useState<Project[]>(projects.data);

    const handleSave = () => {
        console.log("Save button clicked!");
        console.log("Current Events:", currentEvents);
        console.log("Current People:", currentPeople);
        console.log("Current Projects:", currentProjects);
    };

    return (
        <div>
            <Flex>
                <Box flex="1">
                    <h2>Events</h2>
                    <Form data={currentEvents} onDataUpdate={setCurrentEvents} />
                </Box>
                <Box flex="1">
                    <h2>People</h2>
                    <Form data={currentPeople} onDataUpdate={setCurrentPeople} />
                </Box>
                <Box flex="1">
                    <h2>Projects</h2>
                    <Form data={currentProjects} onDataUpdate={setCurrentProjects} />
                </Box>
            </Flex>
            <Button onClick={handleSave}>Save</Button>
        </div>
    );
};

export default AdminForm;
