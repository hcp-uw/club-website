import { LocalPostOfficeRounded } from "@mui/icons-material";
import { getDatabase, ref, onValue, orderByChild, orderByValue} from "firebase/database";

const db = getDatabase();

function getOffiers() {
  const offiers = query(ref(db, 'Club_Leads'), orderByChild('Date_Joined'));
  print(offiers);
}

function getEvents() {
  const events = query(ref(db, 'Events'), orderByChild('Date'));
  print(events);
}

function getProjects() {
  const projects = query(ref(db, 'Projects'), orderByChild('Start_Date'))
  print(projects)
}