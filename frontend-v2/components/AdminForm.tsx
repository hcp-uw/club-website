import React, { useEffect, useRef, useState } from "react";
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
    Grid,
    Spacer
} from "@chakra-ui/react";

import * as EventService from "../back_end/api/events.js"
import * as LeadService from "../back_end/api/leads.js"
import * as ProjectService from "../back_end/api/projects.js"



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


interface ItemProps {
    item: any;
    index: number;
    handleInputChange: (index: number, key: string, value: any) => void;
}

const getInput = (key: any, val: any, index: any, handleInputChange: any) => {
    if (key.indexOf("Date") !== -1)
        return (
            <Input
                type={"datetime-local"}
                id={key}
                name={key}
                value={String(val)}
                onChange={(event) =>
                    handleInputChange(index, key, event.target.value)
                }
                style={{ borderRadius: '4px', padding: '8px', border: '1px solid #ccc' }}
            />
        );

    if (key === "Image") return (
        <Input
            type={"file"}
            id={key}
            name={key}
            accept="image/*"
            // value={String(val)}
            // onChange={(event) =>
            //     handleInputChange(index, key, event.target.value)
            // }
            style={{ borderRadius: '4px', padding: '8px', border: '1px solid #ccc' }}
        />
    );

    if (typeof val === "number") return (
        <Input
            type={"number"}
            id={key}
            name={key}
            value={String(val)}
            onChange={(event) =>
                handleInputChange(index, key, event.target.value)
            }
            style={{ borderRadius: '4px', padding: '8px', border: '1px solid #ccc' }}
        />
    );

    return val !== null && val.length > 30 
            ? (
                <Textarea
                    id={key}
                    name={key}
                    value={String(val)}
                    onChange={(event) =>
                        handleInputChange(index, key, event.target.value)
                    }
                    style={{ borderRadius: '4px', padding: '8px', border: '1px solid #ccc' }}
                />
            ) : (
                <Input
                    type={"text"}
                    id={key}
                    name={key}
                    value={String(val)}
                    onChange={(event) =>
                        handleInputChange(index, key, event.target.value)
                    }
                    style={{ borderRadius: '4px', padding: '8px', border: '1px solid #ccc' }}
                />
            )
};

const Item: React.FC<any> = (ItemProps) => {
    const { item, index, handleInputChange } = ItemProps;

    const [show, setShow] = useState(false);




    return show ? (
        <Box key={index} mb={4}>
            {Object.entries(item).map(([key, value]) => (
                <span key={key}>
                    <FormLabel htmlFor={key} style={{ fontWeight: 'bold' }}>
                        {key}
                    </FormLabel>
                    {getInput(key, value, index, handleInputChange)}
                </span>
            ))}
            <Button
                type="button"
                onClick={() => setShow(false)}
                style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    borderRadius: '4px',
                    margin: '15px 0 20px 0',
                    padding: '10px 20px',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Close
            </Button>
            <br />
        </Box>
    ) : (
        <Box key={index} mb={4}>
            <Flex>
                {item.name}
                <Spacer />
                <Button
                    type="button"
                    onClick={() => setShow(true)}
                    style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        borderRadius: '4px',
                        margin: '0% 0% 0% 30px',
                        padding: '10px 20px',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Edit
                </Button>
            </Flex>
        </Box>
    );
}


interface FormProps<T> {
    data: T[];
    onDataUpdate: any;
}

type FormField = {
    label: string;
    key: string;
    type: "text" | "textarea" | "datetime-local";
};

const Form: React.FC<FormProps<Person | Project | Event>> = ({ data, onDataUpdate: any }) => {
    const [currentData, setCurrentData] = useState<any[]>(data);
    const [page, setPage] = useState(0);
    const pageSize = 5;

    useEffect(() => {
        setCurrentData(data);
    }, [data]);

    console.log(data)
    console.log('currentData', currentData)

    const handleInputChange = (index: number, key: string, value: any) => {
        setCurrentData((prevData) => {
            const newData = [...prevData];
            newData[index][key] = value;
            return newData;
        });
    };

    const handleSubmit = () => {
        // onDataUpdate(currentData)
        console.log(currentData)
    };

    return (
        <div>
            {[...Array(Math.ceil(currentData.length / pageSize))].map((_, i) => (
                <Button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    style={{ all: 'unset', marginRight: '10px', cursor: 'pointer' }}
                >
                    {i + 1}
                </Button>
            ))}
            <form style={{ padding: '20px' }}>
                {currentData.slice(page * pageSize, page * pageSize + pageSize).map((item, index) => (
                    <Item key={index} item={item} index={index} handleInputChange={handleInputChange} />
                ))}
            </form>
        </div>
    );
};



interface AdminFormProps {
    currentEvents: Event[];
    currentPeople: Person[];
    currentProjects: Project[];
    setCurrentEvents: any;
    setCurrentPeople: any;
    setCurrentProjects: any;
    setReset: any;
}

const AdminForm: React.FC<AdminFormProps> = ({ currentEvents, currentPeople, currentProjects, setCurrentEvents, setCurrentPeople, setCurrentProjects, setReset }) => {


    const edits: React.MutableRefObject<{ [name: string]: Person | Project | Event }> = useRef({});

    const handleSave = () => {
        console.log("Save button clicked!");
        console.log("Current Events:", currentEvents);
        console.log("Current People:", currentPeople);
        console.log("Current Projects:", currentProjects);

        console.log("Edits:", edits.current);

        for (const [name, item] of Object.entries(edits.current)) {
            // if (item instanceof Event) {
            //     EventService.updateEvent(name, item);                need to handle case where item name 
            // } else if (item instanceof Person) {                     is changed as a delete and create
            //     LeadService.updateLead(item.id, item);
            // } else if (item instanceof Project) {
            //     ProjectService.updateProject(item.id, item);
            // } else {
            //     console.error(`Unknown item type ${name}`);
            // }
        }
    };

    const addEdit = (name: string, item: Event | Project | Person) => {
        edits.current[name] = item;
    }

    const handleUndo = () => {
        setReset((prev: boolean) => !prev);
    };

    const headerStyle = { fontWeight: 'bold', fontSize: '30px' }

    const boxStyle = { /* border: '1px solid white', borderRadius: '20px',*/ padding: '15px', margin: '10px' }

    return (
        <div style={{ margin: '0 5% 0 5%' }}>
            <Flex>
                <Box flex="1" style={boxStyle}>
                    <h2 style={headerStyle}>Events</h2>
                    <Form data={currentEvents} onDataUpdate={setCurrentEvents} />
                </Box>
                <Box flex="1" style={boxStyle}>
                    <h2 style={headerStyle}>People</h2>
                    <Form data={currentPeople} onDataUpdate={setCurrentPeople} />
                </Box>
                <Box flex="1" style={boxStyle}>
                    <h2 style={headerStyle}>Projects</h2>
                    <Form data={currentProjects} onDataUpdate={setCurrentProjects} />
                </Box>
            </Flex>
            <Button onClick={handleSave} style={{ marginRight: "50px" }}>Save</Button>
            <Button onClick={handleUndo}>Reset</Button>
        </div>
    );
};

export default AdminForm;
