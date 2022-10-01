// import { LocalPostOfficeRounded } from "@mui/icons-material";
import { ref, orderByChild } from "firebase/database";
import { database } from "../utils";

export function getOfficers() {
  const officers = query(ref(database, 'Club_Leads'), orderByChild('Date_Joined'));
  return officers;
}

export function getEvents() {
  const events = query(ref(database, 'Events'), orderByChild('Date'));
  return events;
}

export function getProjects() {
  const projects = query(ref(database, 'Projects'), orderByChild('Start_Date'))
  return projects;
}

