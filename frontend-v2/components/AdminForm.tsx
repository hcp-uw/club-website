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

import * as ImageService from "../back_end/api/image.js"
import * as EventService from "../back_end/api/events.js"
import * as LeadService from "../back_end/api/leads.js"
import * as ProjectService from "../back_end/api/projects.js"

import { connectStorageEmulator } from "firebase/storage";



interface _Event {
    Date: Date;
    Name: string;
    Location: string;
    Sponsor: string | null;
    Attendees: number;
    Description: string;
    Image: string | null;
}

interface _Person {
    Name: string;
    id: number;
    Date_Joined: Date;
    Active: boolean;
    Class_Standing: string;
    Role: string;
    Email: string;
    Team: string;
    Date_Left: Date | null;
    Image: string;
}

interface _Project {
    Name: string;
    Start_Date: Date;
    End_Date: Date;
    Completed: boolean;
    Category: string;
    PM: string;
    Git_Link: string;
    Description: string;
    Members: string;
    Image: string;
}


interface ItemProps {
    item: any;
    index: number;
    handleInputChange: (index: number, key: string, value: any) => void;
}

const getInput = (key: any, val: any, index: any, handleInputChange: any, T: string) => {
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

    if (key === "Image") {

        const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];

            let upload;
            switch (T) {
                case "Event":
                    upload = ImageService.uploadEventImg;
                    break;
                case "Person":
                    upload = ImageService.uploadLeadsImg;
                    break;
                default:
                    throw new Error("No type");
            }

            if (file !== undefined && file instanceof File) {
                try {
                    const url = await upload(file.name, file)
                    console.log(key, url)
                    handleInputChange(index, key, url);
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        };

        return (
            <div>
                {<img src={val} alt="Uploaded" />}
                <Input
                    type="file"
                    id="Image"
                    name="Image"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ borderRadius: '4px', padding: '8px', border: '1px solid #ccc' }}
                />
            </div>
        );
    }


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
    const { item, index, handleInputChange, handleSave, T } = ItemProps;

    const [show, setShow] = useState(false);

    return show ? (
        <Box key={index} mb={4}>
            {Object.entries(item).map(([key, value]) => (
                <div>
                    <FormLabel htmlFor={key} style={{ fontWeight: 'bold' }}>
                        {key}
                    </FormLabel>
                    <Flex key={key}>

                        {getInput(key, value, index, handleInputChange, T)}
                        <Button onClick={() => {
                            if (key === "true" || key === "True")
                                value = true;
                            else if (key === "false" || key === "False")
                                value = false;

                            console.log(`handleSave(${item.Name.split(" ").join("_")}, ${key}, ${value}) 
                                returned  ${handleSave(item.Name.split(" ").join("_"), key, value)}`
                            );


                        }}>
                            Save
                        </Button>
                    </Flex>
                </div>
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
            <Flex onClick={() => setShow(true)} style={{ cursor: 'pointer' }}>
                {item.Name}
            </Flex>
        </Box>
    );
}


interface FormProps<T> {
    data: T[];
    onDataUpdate: any;
    handleSave: (name: string, k: string, v: any) => boolean;
    T: string
}

type FormField = {
    label: string;
    key: string;
    type: "text" | "textarea" | "datetime-local";
};

const Form: React.FC<FormProps<_Person | _Project | _Event>> = ({ data, onDataUpdate: any, handleSave, T }) => {
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
                    <Item
                        key={index}
                        item={item}
                        index={index}
                        handleInputChange={handleInputChange}
                        handleSave={handleSave}
                        T={T}
                    />
                ))}
            </form>
        </div>
    );
};



interface AdminFormProps {
    currentEvents: _Event[];
    currentPeople: _Person[];
    currentProjects: _Project[];
    setCurrentEvents: any;
    setCurrentPeople: any;
    setCurrentProjects: any;
    setReset: any;
}

const AdminForm: React.FC<AdminFormProps> = ({ currentEvents, currentPeople, currentProjects, setCurrentEvents, setCurrentPeople, setCurrentProjects, setReset }) => {

    const handleUndo = () => {
        setReset((prev: boolean) => !prev);
    };

    const getSaveFunc = (T: string) => {
        switch (T) {
            case "Event":
                return (name: string, k: string, v: any) =>
                    EventService.updateEvent(name, k, v)
            case "Person":
                return (name: string, k: string, v: any) =>
                    LeadService.updateLead(name, k, v)
            case "Project":
                return (name: string, k: string, v: any) =>
                    ProjectService.updateProject(name, k, v)

            default:
                console.log("error. no type");
                return (name: string, k: string, v: any) => false
        }
    }

    const headerStyle = { fontWeight: 'bold', fontSize: '30px' }

    const boxStyle = { /* border: '1px solid white', borderRadius: '20px',*/ padding: '15px', margin: '10px' }

    return (
        <div style={{ margin: '0 5% 0 5%' }}>
            <Flex>
                <Box flex="1" style={boxStyle}>
                    <h2 style={headerStyle}>Events</h2>
                    <Form data={currentEvents} onDataUpdate={setCurrentEvents} handleSave={getSaveFunc("Event")} T={"Event"} />
                </Box>
                <Box flex="1" style={boxStyle}>
                    <h2 style={headerStyle}>People</h2>
                    <Form data={currentPeople} onDataUpdate={setCurrentPeople} handleSave={getSaveFunc("Person")} T={"Person"} />
                </Box>
                <Box flex="1" style={boxStyle}>
                    <h2 style={headerStyle}>Projects</h2>
                    <Form data={currentProjects} onDataUpdate={setCurrentProjects} handleSave={getSaveFunc("Project")} T={"Project"} />
                </Box>
            </Flex>
            <Button onClick={handleUndo}>Reset</Button>
        </div>
    );
};

export default AdminForm;
