import { ref, query, get, orderByChild, startAt, endAt, limitToFirst, limitToLast, equalTo} from "firebase/database";
import { database } from "../utils/index.js";
import { errObj, getData } from "../utils/utils.js";

/* -------------------- Leads Endpoints --------------------- */
// Returns all club leads from database
export async function getLeads(test = "Club_Leads") {
  let data = await getData(test);
  return Array.from(Object.values(data));
}

/*
 * Returns all Active Club_Leads
 */
export async function getActiveLeads(test = "Club_Leads") {
  let qRes;
  let data;
  try {
    let q = query(ref(database, test), orderByChild('Active'), equalTo(true));
    qRes = await get(q);
    data = qRes.val();
  } catch (err) {
    console.error(err);
    return errObj;
  }
  return Array.from(Object.values(data));
}

/* -------------------- Events Endpoints -------------------- */
// Returns all events from database
export async function getAllEvents(test = "Events") {
  let data = await getData(test);
  return Array.from(Object.values(data));
}

/*
 * Returns upcoming events, or old events
 * @Param upcoming (boolean): Indicates getting upcoming events (true) or old events
 * @Param limit (integer): How many events to return, will return events closest to today's date
 *    Optional param: Default value 4
 * @return List of events, sorted in descending order
 */
export async function getEventsBasedOnTime(upcoming, limit = 4, test = "Events") {
  let missingParamErrMsg = "missing parameters, please define two booleans";
  let typeErrMsg = "incorrect parameter type, expected boolean, got ";

  // Param checks
  if (upcoming === undefined) {
    console.error(missingParamErrMsg);
    return errObj;
  }
  // Type checks
  if (typeof(upcoming) != "boolean") {
    console.error(typeErrMsg + typeof(upcoming));
    return errObj;
  }

  // Getting date
  let todayStr = new Date().toISOString();   // YYYY-MM-DDTHH:MM:SS.sssz
  let today = todayStr.substring(0, todayStr.length - 5); // YYYY-MM-DDTHH:MM:SS

  // Creating query
  let qRes;
  let data;
  try {
    let q;
    if (upcoming) {
        // Upcoming events
        q = query(ref(database, test), orderByChild('Date'), startAt(today), limitToFirst(limit))
    } else {
        // Old events
        q = query(ref(database, test), orderByChild('Date'), endAt(today), limitToLast(limit))
    }
    qRes = await get(q);
    data = qRes.val();
  } catch (err) {
    console.error(err);
    return errObj;
  }

  // Sorting and outputting the results
  let values = Array.from(Object.values(data));
  if (values.length > 1) {
    values.sort(function(a, b) {
      return new Date(a.Date) - new Date(b.Date);
    });
  };
  return values;
}

/* ------------------- Projects Endpoints ------------------- */
// Returns all projects from database
export async function getProjects(test = "Projects") {
  let data = await getData(test);
  return Array.from(Object.values(data));
}

/*
 * Returns all projects in shortened form.
 */
export async function getShortenedProject(test = "Projects") {
  let qRes;
  let data;
  try {
    let q = query(ref(database, test));
    qRes = await get(q);
    data = qRes.val();
  } catch (err) {
    console.error(err);
    return errObj;
  }
  let values = Array.from(Object.values(data))
  let returnVals = [];
  values.forEach((val) => {
    returnVals.push(
      {"Name": val['Name'],
      "Description": val['Description'],
      "Image": val['Image']
      })
  })
  return returnVals;
}

/*
 * Gets projects based on if they are active (currently working) or not. Default gets active projects
 * @Param active (boolean): Indicates getting active projects or inactive projects
 * @return a list of projects
 */
export async function getActiveProjects(active = true, test = "Projects") {
  let data;
  try {
    if (active) {
      // Querys based on the End_Date being empty
      let q = query(ref(database, test), orderByChild("End_Date"), equalTo(""));
      let qRes = await get(q);
      data = qRes.val();
    } else {
      let q = query(ref(database, test), orderByChild("End_Date"), startAt("!"));
      let qRes = await get(q);
      data = qRes.val();
    }
  } catch (err) {
    console.error(err);
    return errObj;
  }
  return data === undefined ? data : Array.from(Object.values(data));
}