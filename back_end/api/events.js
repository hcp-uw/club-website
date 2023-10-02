import {
    ref,
    query,
    get,
    set,
    remove,
    orderByChild,
    startAt,
    endAt,
    update,
    limitToFirst,
    limitToLast,
} from "firebase/database";
import { database } from "../utils/index.js";
import { errObj, getData } from "../utils/utils.js";

/* -------------------- Events Endpoints -------------------- */
// Returns all events from database
export async function getAllEvents(test = "Events") {
    const data = await getData(test);
    return Array.from(Object.values(data));
}

/**
 * Fetches an event from the database based on its name.
 * @param {string} eventName - The name of the event to be fetched.
 * @param {string} test - The name of the database root node (optional).
 * @returns {Object|null} Returns the event object if found, otherwise returns null.
 */
export async function getEventByName(eventName, test = "Events") {
    try {
        // Check if eventName is provided
        if (!eventName) {
            console.error("Missing required parameter: eventName");
            return null;
        }

        // Type check
        if (typeof eventName !== "string") {
            console.error("Parameter 'eventName' must be of type 'string'");
            return null;
        }

        // Get ref to event in database
        const eventRef = ref(database, `${test}/${eventName}`);

        // Get the event data
        const snapshot = await get(eventRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.error(
                `Event with name '${eventName}' not found in the database.`,
            );
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

/**
 * Creates a new event and saves it to the database.
 * @param {Object} event - The event object to be saved.
 * @returns {Promise<boolean>} Returns true if the event creation is successful, otherwise false.
 */
export async function createNewEvent(event, test = "Events") {
    try {
        // check if all required parameters provided
        const requiredParams = [
            "Attendees",
            "Date",
            "Description",
            "Image",
            "Location",
            "Name",
            "Sponsor",
        ];
        for (const param of requiredParams) {
            if (!event.hasOwnProperty(param)) {
                console.error(`Missing required parameter: ${param}`);
                return false;
            }
        }

        // type checks
        if (typeof event.Attendees !== "number") {
            console.error("Parameter 'Attendees' must be of type 'number'");
            return false;
        }

        if (typeof event.Date !== "number") {
            console.error("Parameter 'Date' must be of type 'number' (epoch)");
            return false;
        }

        if (typeof event.Description !== "string") {
            console.error("Parameter 'Description' must be of type 'string'");
            return false;
        }

        // if (typeof event.Image !== "string") {
        //   console.error("Parameter 'ImageURL' must be of type 'string'");
        //   return false;
        // }

        if (typeof event.Location !== "string") {
            console.error("Parameter 'Location' must be of type 'string'");
            return false;
        }

        if (typeof event.Name !== "string") {
            console.error("Parameter 'Name' must be of type 'string'");
            return false;
        }

        if (typeof event.Sponsor !== "string") {
            console.error("Parameter 'Sponsor' must be of type 'string'");
            return false;
        }

        const keyName = event.Name.split(" ").join("_");

        // get ref and snapshot of current event record (shouldn't exist)
        const eventRef = ref(database, `${test}/${keyName}`);
        const snapshot = await get(eventRef);

        // check if snapshot exists
        if (snapshot.exists()) {
            console.error(
                `Event with name '${keyName}' already exists in the database.`,
            );
            return false;
        }

        // save event to the database
        await set(eventRef, event);

        // event created
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Deletes an event from the database based on its event name.
 * @param {string} eventName - The name of the event to be deleted.
 * @returns {Promise<boolean>} Returns true if the event deletion is successful, otherwise false.
 */
export async function deleteEvent(eventName, test = "Events") {
    try {
        // check if eventName is provided
        if (!eventName) {
            console.error("Missing required parameter: eventName");
            return false;
        }

        // type check
        if (typeof eventName !== "string") {
            console.error("Parameter 'eventName' must be of type 'string'");
            return false;
        }

        // get ref to event in database

        const eventRef = ref(database, `${test}/${eventName}`);

        // check if event exists
        const snapshot = await get(eventRef);
        if (!snapshot.exists()) {
            console.error(
                `Event with name '${eventName}' not found in the database.`,
            );
            return false;
        }

        // delete event from the database
        await remove(eventRef);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Updates an event in the database based on the provided event name, key name, and value.
 * @param {string} eventName - The name of the event to be updated.
 * @param {string} key - The key name of the field to be updated.
 * @param {*} value - The new value to update the field with.
 * @returns {Promise<boolean>} Returns true if the event update is successful, otherwise false.
 */
export async function updateEvent(eventName, key, value, test = "Events") {
    try {
        // check if required parameters are provided
        if (!(eventName && key) || value === undefined) {
            console.error(
                "Missing required parameters: eventName, key, or value",
            );
            return false;
        }

        // get reference to event in the database
        const eventRef = ref(database, `${test}/${eventName}`);

        // check if event exists
        const snapshot = await get(eventRef);
        if (!snapshot.exists()) {
            console.error(
                `Event with name '${eventName}' not found in the database.`,
            );
            return false;
        }

        // check if provided key is valid
        const validKeys = [
            "Attendees",
            "Date",
            "Description",
            "Image",
            "Location",
            "Name",
            "Sponsor",
        ];

        if (!validKeys.includes(key)) {
            console.error(
                `Invalid key '${key}' provided. The valid keys are: ${validKeys.join(
                    ", ",
                )}`,
            );
            return false;
        }

        // type check for value
        const valueTypes = {
            Attendees: "number",
            Date: "number",
            Description: "string",
            Image: "string",
            Location: "string",
            Name: "string",
            Sponsor: "string",
        };

        // rome-ignore lint/suspicious/useValidTypeof: js be like:
        if (typeof value !== valueTypes[key]) {
            console.error(
                `Invalid value type provided for key '${key}'. Expected type: '${valueTypes[key]}'.`,
            );
            return false;
        }

        // update event in database
        const eventData = { [key]: value };
        await update(eventRef, eventData);

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Returns upcoming events, or old events
 * @Param upcoming (boolean): Indicates getting upcoming events (true) or old events
 * @Param limit (integer): How many events to return, will return events closest to today's Date
 *    Optional param: Default value 4
 * @return List of events, sorted in descending order
 */
export async function getEventsBasedOnTime(
    upcoming,
    limit = 4,
    test = "Events",
) {
    const missingParamErrMsg = "missing parameters, please define two booleans";
    const typeErrMsg = "incorrect parameter type, expected boolean, got ";

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

    // Getting todays's date in Epoch format

    const today = new Date().getTime() / 1000;

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

    const values = Array.from(Object.values(data));
    if (values.length > 1) {
        values.sort(function (a, b) {
            return new Date(a.Date) - new Date(b.Date);
        });
    }
    return values;
}
