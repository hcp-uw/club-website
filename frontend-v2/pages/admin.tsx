
import { useEffect, useState } from "react";
import AdminForm from "../components/AdminForm";
import { getAllEvents } from "back_end/api/events";
// import { events, people, projects } from '../utils/data';
import { getLeads } from "back_end/api/leads";
import { getProjects } from "back_end/api/projects";
import { set } from 'firebase/database';

export interface _Event {
  Date: Date;
  Name: string;
  Location: string;
  Sponsor: string | null;
  Attendees: number;
  Description: string;
  Image: string | null;
}

export interface _Person {
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

export interface _Project {
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

export const personTemplate: _Person = { 
  Name: "",
  id: -1,
  Date_Joined: new Date(Date.now()),
  Active: false,
  Class_Standing: "",
  Role: "",
  Email: "",
  Team: "",
  Date_Left: null,
  Image: ""
}

export const eventTemplate: _Event = {
  Name: "",
  Date: new Date(Date.now()),
  Description: "",
  Image: "",
  Location: "",
  Attendees: 0,
  Sponsor: ""
}

export const projectTemplate: _Project = {
  Name: "",
  Start_Date: new Date(Date.now()),
  End_Date: new Date(Date.now()),
  Completed: false,
  Category: "",
  PM: "",
  Git_Link: "",
  Description: "",
  Members: "",
  Image: ""
}



export default function Admin() {
  const [currentEvents, setCurrentEvents] = useState<_Event[]>([]);
  const [currentPeople, setCurrentPeople] = useState<_Person[]>([]);
  const [currentProjects, setCurrentProjects] = useState<_Project[]>([]);
  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    getAllEvents().then((res) => {
      setCurrentEvents(res);
    });

    getLeads().then((res) => {
      setCurrentPeople(res);
    });

    getProjects().then((res) => {
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