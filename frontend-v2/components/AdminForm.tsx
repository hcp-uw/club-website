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

import { 
    _Event, 
    _Person, 
    _Project, 
    eventTemplate, 
    personTemplate, 
    projectTemplate,
    Value
} from "../pages/admin";

import * as ImageService from "../back_end/api/image.js"
import * as EventService from "../back_end/api/events.js"
import * as LeadService from "../back_end/api/leads.js"
import * as ProjectService from "../back_end/api/projects.js"

import { connectStorageEmulator } from "firebase/storage";

type _Item = _Person | _Project | _Event;


const getInput = (key: string, val: Value, index: number, handleInputChange: Function, T: string) => {
    if (key.indexOf("Date") !== -1 && typeof val === "number")
        return (
            <Input
                type={"datetime-local"}
                id={key}
                name={key}
                value={val !== -1 && val !== null && val !== undefined
                    ? new Date(val * 1000).toISOString().slice(0, 16)
                    : ""}
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
                {<img src={typeof val === 'string' ? val : ""} alt="Uploaded" />}
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

    return typeof val === 'string' && val.length > 30
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


const parseValue = (key: string, value: Value) => {

    if (key.indexOf("Date") !== -1) {
        let convertedValue = value;

        console.log("parsing date", key, value)
        
        if (typeof value === "number" && !isNaN(value))
            return value

        else if (typeof value === 'number' && isNaN(value))
            convertedValue = -1
        
        else if (typeof value === 'string')
            try {
                convertedValue = new Date(value).getTime() / 1000;
            } catch (error) {
                console.log('error block', error)
                convertedValue = -1
            }

        return convertedValue
    } 
    
    return value;
}

interface ItemProps {
    item: _Item;
    index: number;
    handleInputChange: (index: number, key: string, value: Value) => void;
    handleSave: (name: string, k: string, v: Value) => Promise<boolean>;
    handleDelete: (name: string) => Promise<boolean>;
    T: string
}

const Item: React.FC<ItemProps> = (props: ItemProps) => {
    const { item, index, handleInputChange, handleSave, handleDelete, T } = props;

    const [show, setShow] = useState(false);

    

    return show ? (
        <Box key={index} mb={4}>
            {Object.entries(item)
                .map(([key, value], i) => ({key: key, value: parseValue(key, value)}))
                .map(({ key, value }, i) => (
                    // rome-ignore lint/suspicious/noArrayIndexKey: updates every time without saving ref to id anywhere
                    <div key={i}>
                        <FormLabel style={{ fontWeight: 'bold' }}>
                            {key}
                        </FormLabel>
                        <Flex>

                            {getInput(key, value, index, handleInputChange, T)}
                            <Button style={{ marginLeft: "10px" }}
                                onClick={() => {
                                    if (value === "true" || value === "True")
                                        value = true;
                                    else if (value === "false" || value === "False")
                                        value = false;


                                    handleSave(item.Name.split(" ").join("_"), key, value)
                                }}>
                                Save
                            </Button>
                        </Flex>
                    </div>
            ))}
            <Button
                type="button"
                style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    borderRadius: '4px',
                    margin: '15px 10px 20px 0',
                    padding: '10px 20px',
                    border: 'none',
                    cursor: 'pointer'
                }}
                onClick={() => {
                    console.log('deleting', item.Name.split(" ").join("_"))
                    handleDelete(item.Name).then(() => window.location.reload())
                }}
            >
                Delete
            </Button>
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


interface FormProps<_Item> {
    data: _Item[];
    handleSave: (name: string, k: string, v: Value) => Promise<boolean>;
    handleDelete: (name: string) => Promise<boolean>;
    T: string
}

type FormField = {
    label: string;
    key: string;
    type: "text" | "textarea" | "datetime-local";
};

const Form: React.FC<FormProps<_Person | _Project | _Event>> = ({ data, handleSave, handleDelete, T }) => {
    const [currentData, setCurrentData] = useState<_Item[]>(data);
    const [page, setPage] = useState(0);
    const pageSize = 5;

    useEffect(() => {
        setCurrentData(data);
    }, [data]);



    const handleInputChange = (index: number, key: string, value: Value) => {
        setCurrentData((prevData) => {
            const newData: _Item[] = [...prevData];
            newData[index][key] = value;
            return newData;
        });
    };


    return (
        <div>
            {[...Array(Math.ceil(currentData.length / pageSize))].map((_, i) => (
                <Button
                    // rome-ignore lint/suspicious/noArrayIndexKey: itll just rerender anyways...
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    style={{ all: 'unset', marginRight: '10px', cursor: 'pointer' }}
                >
                    {i + 1}
                </Button>
            ))}
            <form style={{ padding: '20px' }}>
                {currentData.map((item, index) => 
                (
                    <Item
                        // rome-ignore lint/suspicious/noArrayIndexKey: same as above
                        key={index}
                        item={item}
                        index={index}
                        handleInputChange={handleInputChange}
                        handleSave={handleSave}
                        handleDelete={handleDelete}
                        T={T}
                    />
                )).filter((_, i) => i >= page * pageSize && i < (page + 1) * pageSize)}
            </form>
        </div>
    );
};


interface NewItemProps {
    index: number;
    handleSave: (item: _Item) => Promise<boolean>;
    T: string
}

const NewItem: React.FC<NewItemProps> = (props: NewItemProps) => {
    const { index, handleSave, T } = props;

    let item: _Person | _Project | _Event;

    switch (T) {
        case "Event":
            item = eventTemplate;
            break;
        case "Person":
            item = personTemplate;
            break;
        case "Project":
            item = projectTemplate;
            break;
        default:
            throw new Error("No type");
    }


    const [currentData, setCurrentData] = useState<_Item>(item);

    const handleInputChange = (index: number, key: string, value: Value) => {
        setCurrentData((prevData: _Item) => {
            const newData = {...prevData};
            newData[key] = value;
            return newData;
        });
    };

    const [show, setShow] = useState(false);

    const transformData = (data: _Item) => {

        const newData: _Item = { ...data };
        
        for (const key in newData) {
            if (newData[key] === "" || newData[key] === undefined) 
                switch (typeof newData[key]) {
                    case "string":
                        newData[key] = "";
                        break;
                    case "number":
                        newData[key] = -1;
                        break;
                    case "boolean":
                        newData[key] = false;
                        break;
                    default:
                        break;
                }

            else if (key.indexOf("Date") !== -1) 
                newData[key] = parseValue(key, data[key]);

            else if (data[key] === "true" || data[key] === "True")
                newData[key] = true;
            
            else if (data[key] === "false" || data[key] === "False")
                newData[key] = false;
            // else if (key === "Name")
            //     newData[key] = data[key].split(" ").join("_");

        }

        return newData;
    }

    return show ? (
        <Box key={index} mb={4}>
            {Object.entries(currentData)
                .map(([key, value], i) => ({key: key, value: parseValue(key, value)}))
                .map(({ key, value }, i) => (
                    // rome-ignore lint/suspicious/noArrayIndexKey: will just rerender. never saved ref to id anywhere
                    <div key={i}>
                        <FormLabel style={{ fontWeight: 'bold' }}>
                            {key}
                        </FormLabel>
                        <Flex key={key}>

                            {getInput(key, value, 0, handleInputChange, T)}
                        </Flex>
                    </div>
            ))}
            <Button 
                style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    borderRadius: '4px',
                    margin: '15px 10px 20px 0',
                    padding: '10px 20px',
                    border: 'none',
                    cursor: 'pointer'
                }}
                onClick={() => {
                    handleSave(transformData(currentData))
                        .then((success: boolean) => {
                            if (success === false)
                                alert("Error saving item");
                            else
                                window.location.reload();
                        });
            }}>
                Save
            </Button>
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
            <Button onClick={() => setShow(true)} style={{ cursor: 'pointer' }}>
                +
            </Button>
        </Box>
    );
}


type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
interface AdminFormProps {
    currentEvents: _Event[];
    currentPeople: _Person[];
    currentProjects: _Project[];
    setCurrentEvents: Setter<_Event[]>;
    setCurrentPeople: Setter<_Person[]>;
    setCurrentProjects: Setter<_Project[]>;
    setReset: Setter<boolean>;
}



const AdminForm: React.FC<AdminFormProps> = ({ currentEvents, currentPeople, currentProjects, setCurrentEvents, setCurrentPeople, setCurrentProjects, setReset }) => {

    const handleUndo = () => {
        setReset((prev: boolean) => !prev);
    };

    const getSaveFunc = (T: "Event" | "Person" | "Project") => {
        switch (T) {
            case "Event":
                return (name: string, k: string, v: Value) =>
                    EventService.updateEvent(name, k, v)
            case "Person":
                return (name: string, k: string, v: Value) =>
                    LeadService.updateLead(name, k, v)
            case "Project":
                return (name: string, k: string, v: Value) =>
                    ProjectService.updateProject(name, k, v)
        }
    }

    const getCreateFunc = (T: "Event" | "Person" | "Project") => {

        switch (T) {
            case "Event":
                return (item: _Item) =>
                    EventService.createNewEvent(item)
            case "Person":
                return (item: _Item) =>
                    LeadService.createNewLead(item)
            case "Project":
                return (item: _Item) =>
                    ProjectService.createNewProject(item)
        }
    }

    const getDeleteFunc = (T: "Event" | "Person" | "Project") => {
        switch (T) {
            case "Event":
                return (name: string) =>
                    EventService.deleteEvent(name.split(" ").join("_"))
            case "Person":
                return (name: string) =>
                    LeadService.deleteLead(name.split(" ").join("_"))
            case "Project":
                return (name: string) =>
                    ProjectService.deleteProject(name.split(" ").join("_"))
        }
    }

    const headerStyle = { fontWeight: 'bold', fontSize: '30px' }

    const boxStyle = { /* border: '1px solid white', borderRadius: '20px',*/ padding: '15px', margin: '10px' }

    return (
        <div style={{ margin: '0 5% 0 5%' }}>
            <Flex>
                <Box flex="1" style={boxStyle}>
                    <h2 style={headerStyle}>Events</h2>
                    <NewItem 
                        index={0} 
                        handleSave={getCreateFunc("Event")} 
                        T={"Event"} 
                    />
                    <Form 
                        data={currentEvents} 
                        handleSave={getSaveFunc("Event")} 
                        T={"Event"} 
                        handleDelete={getDeleteFunc("Event")}
                    />
                    
                </Box>
                <Box flex="1" style={boxStyle}>
                    <h2 style={headerStyle}>People</h2>
                    <NewItem 
                        index={0} 
                        handleSave={getCreateFunc("Person")} 
                        T={"Person"} 
                    />
                    <Form 
                        data={currentPeople}  
                        handleSave={getSaveFunc("Person")} 
                        T={"Person"} 
                        handleDelete={getDeleteFunc("Person")}
                    />
                </Box>
                <Box flex="1" style={boxStyle}>
                    <h2 style={headerStyle}>Projects</h2>
                    <NewItem 
                        index={0}
                        handleSave={getCreateFunc("Project")} 
                        T={"Project"} 
                    />
                    <Form 
                        data={currentProjects} 
                        handleSave={getSaveFunc("Project")} 
                        T={"Project"} 
                        handleDelete={getDeleteFunc("Project")}
                    />
                </Box>
            </Flex>
            <Button onClick={handleUndo}>Reset</Button>
        </div>
    );
};

export default AdminForm;
