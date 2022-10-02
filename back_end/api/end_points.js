// import { LocalPostOfficeRounded } from "@mui/icons-material";
import { ref, get} from "firebase/database";
import { database } from "../utils/index.js";

// Returns all Officer Data
export async function getOfficers() {
  const query = await ref(database, 'Club_Leads') ;
  const qResult = await get(query);
  const data = qResult.val();
  return data;
}

// Returns all Events Data
export async function getEvents() {
  const query = await ref(database, 'Events') ;
  const qResult = await get(query);
  const data = qResult.val();
  return data;
}

// Returns all Projects Data
export async function getProjects() {
  const query = await ref(database, 'Projects') ;
  const qResult = await get(query);
  const data = qResult.val();
  return data;
}
