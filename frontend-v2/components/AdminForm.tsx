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
    projectTemplate 
} from "../pages/admin";

import * as ImageService from "../back_end/api/image.js"
import * as EventService from "../back_end/api/events.js"
import * as LeadService from "../back_end/api/leads.js"
import * as ProjectService from "../back_end/api/projects.js"

import { connectStorageEmulator } from "firebase/storage";


type Value = Date | string | number | boolean

const getInput = (
        key: string, 
        val: Value, 
        index: number, 
        handleInputChange: { (index: number, key: string, value: Value): void; }, 
        T: string
    ) => 
    {
    
    if (key.indexOf("Date") !== -1 && (typeof val === "number" || val === ""))
        return (
            <Input
                type={"datetime-local"}
                id={key}
                name={key}
                value={val !== -1 && typeof val === "number" && !isNaN(val)
                    ? new Date(val * 1000).toISOString().slice(0, 16)
                    : ""
                }
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

    return val !== null && typeof val === 'string' && val.length > 30
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

interface ItemProps {
    // @rome-ignore
    item: any;
    index: number;
    handleInputChange: (index: number, key: string, value: Value) => void;
    handleSave: (name: string, k: string, v: Value) => boolean;
    handleDelete: (name: string) => boolean;
    T: "Person" | "Event" | "Project";
}

const Item: React.FC<ItemProps> = (props: ItemProps) => {
    const { item, index, handleInputChange, handleSave, handleDelete, T } = props;

    const [show, setShow] = useState(false);

    const parseValue = (key: string, value: Value): Value => {
        if (key.indexOf("Date") !== -1) {
            console.log("parsing date", key, value)
            if (typeof value === "number" && !isNaN(value))
                return value

            else if (typeof value === "string" && value !== "")
                try {
                    value = new Date(value).getTime() / 1000;
                } catch (error) {
                    console.log('error block', error)
                    value = -1
                }

            if (typeof value !== 'number' || isNaN(value))
                value = -1

            return value
        } else
            return value;
    }

    return show ? (
        <Box key={index} mb={4}>
            {Object
                .entries(item)
                .map(([key, value], i) => ({key: String(key), value: parseValue(key as string, value as Value)}))
                .map(({ key, value }, i) => (
                <div key={i}>
                    <FormLabel htmlFor={key} style={{ fontWeight: 'bold' }}>
                        {key}
                    </FormLabel>
                    <Flex key={key}>

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
                    console.log(handleDelete(item.Name.split(" ").join("_")))
                    window.location.reload();
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


interface FormProps<T> {
    data: T[];
    handleSave: (name: string, k: string, v: Value) => boolean;
    handleDelete: (name: string) => boolean;
    T: "Person" | "Event" | "Project";
}

type FormField = {
    label: string;
    key: string;
    type: "text" | "textarea" | "datetime-local";
};

const Form: React.FC<FormProps<_Person | _Project | _Event>> = ({ data, handleSave, handleDelete, T }) => {
    const [currentData, setCurrentData] = useState<any[]>(data);
    const [page, setPage] = useState(0);
    const pageSize = 5;

    useEffect(() => {
        setCurrentData(data);
    }, [data]);



    const handleInputChange = (index: number, key: string, value: any) => {
        setCurrentData((prevData) => {
            const newData = [...prevData];
            newData[index][key] = value;
            return newData;
        });
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
                        handleDelete={handleDelete}
                        T={T}
                    />
                ))}
            </form>
        </div>
    );
};




const NewItem: React.FC<any> = (ItemProps) => {
    const { index, handleSave, T } = ItemProps;

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


    const [currentData, setCurrentData] = useState<any>(item);

    const handleInputChange = (index: number, key: string, value: any) => {
        setCurrentData((prevData: any) => {
            const newData = {...prevData};
            newData[key] = value;
            return newData;
        });
    };

    const [show, setShow] = useState(false);

    const parseValue = (key: string, value: any) => {
        if (key.indexOf("Date") !== -1) {
            console.log("parsing date", key, value)
            if (typeof value === "number" && !isNaN(value))
                return value

            else
                try {
                    value = new Date(value).getTime() / 1000;
                } catch (error) {
                    console.log('error block', error)
                    value = -1
                }

            if (isNaN(value))
                value = -1
            return value
        } else
            return value;
    }

    const transformData = (data: any) => {

        const newData: any = { ...data };
        
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
            else if (key === "Name")
                newData[key] = data[key].split(" ").join("_");

        }

        return newData;
    }

    return show ? (
        <Box key={index} mb={4}>
            {Object.entries(currentData).map(([key, value], i) => ([key, parseValue(key, value)])).map(([key, value], i) => (
                <div key={i}>
                    <FormLabel htmlFor={key} style={{ fontWeight: 'bold' }}>
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
                    console.log(transformData(currentData))
                    handleSave(transformData(currentData))
                    window.location.reload();
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

const chain = (...fns: any[]) => (x: any) => fns.reduce((v, f) => f(v), x);


const AdminForm: React.FC<AdminFormProps> = (props: AdminFormProps) => {

    const { 
        currentEvents, 
        currentPeople, 
        currentProjects, 
        setCurrentEvents, 
        setCurrentPeople, 
        setCurrentProjects, 
        setReset 
    } = props;

    const handleUndo = () => {
        setReset((prev: boolean) => !prev);
      };
      
      const updatePageAfter = (fn: (a: any) => void) => (...args: any[]) => {
        fn(...args);
        handleUndo();
      };

      const getSaveFunc = (T: "Event" | "Person" | "Project") => {
        switch (T) {
          case "Event":
            return (name: string, k: string, v: Value) =>
              updatePageAfter(EventService.updateEvent(name, k, v));
          case "Person":
            return (name: string, k: string, v: Value) =>
              updatePageAfter(LeadService.updateLead(name, k, v));
          case "Project":
            return (name: string, k: string, v: Value) =>
              updatePageAfter(ProjectService.updateProject(name, k, v));
        }
      };
      
      const getCreateFunc = (T: "Event" | "Person" | "Project") => {
        switch (T) {
          case "Event":
            return (item: any) =>
              updatePageAfter(EventService.createNewEvent(item));
          case "Person":
            return (item: any) =>
              updatePageAfter(LeadService.createNewLead(item));
          case "Project":
            return (item: any) =>
              updatePageAfter(ProjectService.createNewProject(item));
        }
      };
      
      const getDeleteFunc = (T: "Event" | "Person" | "Project") => {
        let fn;
        switch (T) {
          case "Event":
            fn = (name: string) =>
              updatePageAfter(EventService.deleteEvent(name));
            break; // Add a break statement here
          case "Person":
            fn = (name: string) =>
              updatePageAfter(LeadService.deleteLead(name));
            break; // Add a break statement here
          case "Project":
            fn = (name: string) =>
              updatePageAfter(ProjectService.deleteProject(name));
            break; // Add a break statement here
        }
        return fn;
      };
      
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
