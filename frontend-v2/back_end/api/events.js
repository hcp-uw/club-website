import {
    ref,
    query,
    get,
    set,
    orderByChild,
    startAt,
    endAt,
    limitToFirst,
    limitToLast,
} from "firebase/database";
import { database } from "../utils/index.js";
import { errObj, getData } from "../utils/utils.js";

/* -------------------- Events Endpoints -------------------- */
// Returns all events from database
export async function getAllEvents(test = "Events") {
    let data = await getData(test);
    return Array.from(Object.values(data));
}


/**
 * Creates a new event and saves it to the database.
 * @param {Object} event - The event object to be saved.
 * @param {number} event.attendees - Number of planned attendees. (Required)
 * @param {string} event.date - Date of the event in DateString format. (Required)
 * @param {string} event.description - Description of the event. (Required)
 * @param {string} event.imageURL - Hosted URL of the event's image. (Required)
 * @param {string} event.location - Location of the event. (Required)
 * @param {string} event.name - Name of the event, also serving as the "unique identifier". (Required)
 * @param {string} event.sponser - Name of the event's sponsor. (Required)
 * @returns {boolean} Returns true if the event creation is successful, otherwise false.
 */
export async function createNewEvent(event) {
    try {
      // check if all required parameters provided
      const requiredParams = ["attendees", "date", "description", "imageURL", "location", "name", "sponser"];
      for (const param of requiredParams) {
        if (!event.hasOwnProperty(param)) {
          console.error(`Missing required parameter: ${param}`);
          return false;
        }
      }
  
      // type checks
      if (typeof event.attendees !== "number") {
        console.error("Parameter 'attendees' must be of type 'number'");
        return false;
      }
  
      if (typeof event.date !== "string") {
        console.error("Parameter 'date' must be of type 'string'");
        return false;
      }
  
      if (typeof event.description !== "string") {
        console.error("Parameter 'description' must be of type 'string'");
        return false;
      }
  
      if (typeof event.imageURL !== "string") {
        console.error("Parameter 'imageURL' must be of type 'string'");
        return false;
      }
  
      if (typeof event.location !== "string") {
        console.error("Parameter 'location' must be of type 'string'");
        return false;
      }
  
      if (typeof event.name !== "string") {
        console.error("Parameter 'name' must be of type 'string'");
        return false;
      }
  
      if (typeof event.sponser !== "string") {
        console.error("Parameter 'sponser' must be of type 'string'");
        return false;
      }
  
      // save event to the database
      const eventRef = ref(database, "Events");
      await set(ref(database, "Events/" + event.name, event));
  
      // event created
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

/**
 * Returns upcoming events, or old events
 * @Param upcoming (boolean): Indicates getting upcoming events (true) or old events
 * @Param limit (integer): How many events to return, will return events closest to today's date
 *    Optional param: Default value 4
 * @return List of events, sorted in descending order
 */
export async function getEventsBasedOnTime(
    upcoming,
    limit = 4,
    test = "Events",
) {
    let missingParamErrMsg = "missing parameters, please define two booleans";
    let typeErrMsg = "incorrect parameter type, expected boolean, got ";

    // Param checks
    if (upcoming === undefined) {
        console.error(missingParamErrMsg);
        return errObj;
    }
    // Type checks
    if (typeof upcoming !== "boolean") {
        console.error(typeErrMsg + typeof upcoming);
        return errObj;
    }

    // Getting date
    let todayStr = new Date().toISOString(); // YYYY-MM-DDTHH:MM:SS.sssz
    let today = todayStr.substring(0, todayStr.length - 5); // YYYY-MM-DDTHH:MM:SS

    // Creating query
    let qRes;
    let data;
    try {
        let q;
        if (upcoming) {
            // Upcoming events
            q = query(
                ref(database, test),
                orderByChild("Date"),
                startAt(today),
                limitToFirst(limit),
            );
        } else {
            // Old events
            q = query(
                ref(database, test),
                orderByChild("Date"),
                endAt(today),
                limitToLast(limit),
            );
        }
        qRes = await get(q);
        data = qRes.val();
        if (data === null) {
            return [];
        }
    } catch (err) {
        console.error(err);
        return errObj;
    }

    // Sorting and outputting the results
    let values = Array.from(Object.values(data));
    if (values.length > 1) {
        values.sort(function (a, b) {
            return new Date(a.Date) - new Date(b.Date);
        });
    }
    return values;
}
