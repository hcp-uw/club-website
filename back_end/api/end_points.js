// import { LocalPostOfficeRounded } from "@mui/icons-material";
import { ref, orderByChild,query,onValue, off} from "firebase/database";
import { database } from "../utils/index.js";

export function getOfficers() {
  let officers = [];
  const data = ref(database, 'Club_Leads');
    onValue(data, (snapshot) => {
      console.log([snapshot.val()]);
      officers.push([snapshot.val()]);
    })
  return officers;
}

export function getEvents() {
  let Events = [];
  const data = ref(database, 'Events') ;
    onValue(data, (snapshot) => {
      console.log([snapshot.val()]);
      Events.push([snapshot.val()]);
    })
  return Events;
}

export function getProjects() {
  let Projects = [];
  const data = ref(database, 'Projects');
    onValue(data, (snapshot) => {
      console.log([snapshot.val()]);
      Projects.push([snapshot.val()]);
    })
  return Projects;
}
