// @ts-ignore
import { getAllEvents } from "@/back_end/api/events";
// @ts-ignore
import { getLeads } from "@/back_end/api/leads";
// @ts-ignore
import { getProjects } from "@/back_end/api/projects";
// @ts-ignore
import AdminForm from "@/components/AdminForm";
import { type SetStateAction, useEffect, useState } from "react";

// all dates handled as epoch time!!!

// epoch -> Date: new Date(epoch * 1000)
// epoch -> datetime-local: new Date(epoch * 1000).toISOString().slice(0, 16)
// Date -> epoch: Date.getTime() / 1000

export type Value = string | number | boolean | Date;
export interface _Event extends Record<string, Value> {
    Date: number;
    Name: string;
    Location: string;
    Sponsor: string;
    Attendees: number;
    Description: string;
    Image: string;
}

export interface _Person extends Record<string, Value> {
    Name: string;
    id: number;
    Date_Joined: number;
    Active: boolean;
    Class_Standing: string;
    Role: string;
    Email: string;
    Team: string;
    Date_Left: number;
    Image: string;
}

export interface _Project extends Record<string, Value> {
    Name: string;
    Start_Date: number;
    End_Date: number;
    Completed: boolean;
    Category: string;
    PM: string;
    Git_Link: string;
    Description: string;
    Members: string;
    Image: string;
}

export const personTemplate: _Person = {
    Name: "",
    id: -1,
    // epoch time
    Date_Joined: new Date(Date.now()).getTime() / 1000,
    Active: false,
    Class_Standing: "",
    Role: "",
    Email: "",
    Team: "",
    Date_Left: -1,
    Image: "",
};

export const eventTemplate: _Event = {
    Name: "",
    Date: new Date(Date.now()).getTime() / 1000,
    Description: "",
    Image: "",
    Location: "",
    Attendees: 0,
    Sponsor: "",
};

export const projectTemplate: _Project = {
    Name: "",
    Start_Date: new Date(Date.now()).getTime() / 1000,
    End_Date: new Date(Date.now()).getTime() / 1000,
    Completed: false,
    Category: "",
    PM: "",
    Git_Link: "",
    Description: "",
    Members: "",
    Image: "",
};

export default function Admin() {
    const [currentEvents, setCurrentEvents] = useState<_Event[]>([]);
    const [currentPeople, setCurrentPeople] = useState<_Person[]>([]);
    const [currentProjects, setCurrentProjects] = useState<_Project[]>([]);
    const [reset, setReset] = useState<boolean>(false);

    useEffect(() => {
        getAllEvents().then((res: SetStateAction<_Event[]>) => {
            setCurrentEvents(res);
        });

        getLeads().then((res: SetStateAction<_Person[]>) => {
            setCurrentPeople(res);
        });

        getProjects().then((res: SetStateAction<_Project[]>) => {
            setCurrentProjects(res);
        });
    }, [reset]);

    return (
        <div style={{ color: "white" }}>
            <h1>Admin</h1>
            <AdminForm
                currentEvents={currentEvents}
                currentPeople={currentPeople}
                currentProjects={currentProjects}
                setCurrentEvents={setCurrentEvents}
                setCurrentPeople={setCurrentPeople}
                setCurrentProjects={setCurrentProjects}
                setReset={setReset}
            />
        </div>
    );
}
