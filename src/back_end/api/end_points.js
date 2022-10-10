import { ref, query, get, orderByChild, startAt, endAt} from "firebase/database";
import { database } from "../utils/index.js";
import { getData } from "../utils/utils.js";

/* -------------------- Leads Endpoints --------------------- */
// Returns all club leads from database
export async function getLeads(test = "Club_Leads") {
  let data = await getData(test);
  return data;
}

/* -------------------- Events Endpoints -------------------- */
// Returns all events from database
export async function getAllEvents(test = "Events") {
  let data = await getData(test);
  return data;
}

/*
 * Returns upcoming events, or old events
 * @Param upcoming (boolean): Indicates getting upcoming events (true) or old events
 * @Param verbose (boolean): Indicates getting all details (true), or just event name
 * @return List of events
 *  If events are upcoming, returns all detail (array of object)
 *  If events are old, returns only names (array of strings)
 *  If an error occurs, will output error to console.
 */
export async function getEvents(upcoming, verbose, test = "Events") {
  let missingParamErrMsg = "missing parameters, please define two booleans"
  let typeErrMsg = "incorrect parameter type, expected boolean, got ";

  // Param checks
  if (upcoming == undefined || verbose == undefined) {
    console.error(missingParamErrMsg)
    return;
  }
  // Type checks
  if (typeof(upcoming) != "boolean") {
    console.error(typeErrMsg + typeof(upcoming));
    return;
  }
  if (typeof(verbose) != "boolean") {
    console.error(typeErrMsg + typeof(verbose));
    return;
  }

  // Getting date
  let todayStr = new Date().toISOString();   // YYYY-MM-DDTHH:MM:SS.sssz
  let today = todayStr.substring(0, todayStr.length - 5); // YYYY-MM-DDTHH:MM:SS

  // Creating query
  let qRes;
  let data;
  try {
    if (upcoming) {
        // Upcoming events
        let q = query(ref(database, test), orderByChild('Date'), startAt(today))
        qRes = await get(q);
    } else {
        // Old events
        let q = query(ref(database, test), orderByChild('Date'), endAt(today))
        qRes = await get(q);
    }
    data = qRes.val();
  } catch (err) {
    console.error(err);
    return;
  }

  // Checking return format
  if (verbose) {
      return data
  }
  return Object.keys(data);
}

/* ------------------- Projects Endpoints ------------------- */
// Returns all projects from database
export async function getProjects(test = "Projects") {
  let data = await getData(test);
  return data;
}