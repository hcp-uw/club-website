import { LocalPostOfficeRounded } from "@mui/icons-material";
import { getDatabase, ref, onValue, orderByChild, orderByValue} from "firebase/database";
import { database } from "../utils";

function getOfficers() {
  const offiers = query(ref(database, 'Club_Leads'), orderByChild('Date_Joined'));
  console.log(offiers);
}

function getEvents() {
  const events = query(ref(database, 'Events'), orderByChild('Date'));
  console.log(events);
}

function getProjects() {
  const projects = query(ref(database, 'Projects'), orderByChild('Start_Date'))
  console.log(projects)
}