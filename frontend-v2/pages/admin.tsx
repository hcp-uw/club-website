
import { useEffect, useState } from "react";
import AdminForm from "../components/AdminForm";
import { getAllEvents } from "back_end/api/events";
// import { events, people, projects } from '../utils/data';
import { getLeads } from "back_end/api/leads";
import { getProjects } from "back_end/api/projects";
import { set } from 'firebase/database';

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


export default function Admin() {
  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
  const [currentPeople, setCurrentPeople] = useState<Person[]>([]);
  const [currentProjects, setCurrentProjects] = useState<Project[]>([]);
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