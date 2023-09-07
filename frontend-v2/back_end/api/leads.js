import {
  ref,
  query,
  get,
  orderByChild,
  equalTo,
  set,
  remove,
  update,
} from "firebase/database";
import { database } from "../utils/index.js";
import { errObj, getData } from "../utils/utils.js";

/* -------------------- Leads Endpoints --------------------- */
// Returns all club leads from database
export async function getLeads(test = "Club_Leads") {
  const data = await getData(test);
  return Array.from(Object.values(data));
}

/*
 * Returns all Active Club_Leads
 */
export async function getActiveLeads(test = "Club_Leads") {
  let qRes;
  let data;
  try {
    const q = query(ref(database, test), orderByChild("Active"), equalTo(true));
    qRes = await get(q);
    data = qRes.val();
  } catch (err) {
    console.error(err);
    return errObj;
  }
  return Array.from(Object.values(data));

}

/**
 * Creates a new club lead and saves their information to the database.
 * @param {Object} lead - The lead information to be added to the database.
 * @returns {Promise<boolean>} Returns true if the lead creation is successful, otherwise false.
 */
export async function createNewLead(lead, test = "Club_Leads") {
  try {
    // check if required parameters provided
    const requiredFields = [
      "Active",
      "Class_Standing",
      "Date_Joined",
      "Date_Left",
      "Email",
      "Image",
      "Name",
      "Role",
      "Team",
    ];
    for (const field of requiredFields) {
      // rome-ignore lint/suspicious/noPrototypeBuiltins: sometimes you gotta do what you gotta do
      if (!lead.hasOwnProperty(field)) {
        console.error(`Missing required parameter: ${field}`);
        return false;
      }
    }

    const keyName = lead.Name.split(" ").join("_");

    // get ref to lead in database
    const leadRef = ref(database, `${test}/${keyName}`);

    // check if lead already exists
    const snapshot = await get(leadRef);
    if (snapshot.exists()) {
      console.error(
        `Lead with name '${keyName}' already exists in the database.`
      );
      return false;
    }

    // Save the lead information to the database
    await set(leadRef, lead);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * Deletes a club lead from the database based on their name.
 * @param {string} leadName - The name of the club lead to be deleted.
 * @returns {Promise<boolean>} Returns true if the lead deletion is successful, otherwise false.
 */
export async function deleteLead(leadName, test = "Club_Leads") {
  try {
    // check if leadName is provided
    if (!leadName) {
      console.error("Missing required parameter: leadName");
      return false;
    }

    // get ref to lead in database
    const leadRef = ref(database, `${test}/${leadName}`);

    // check if lead exists
    const snapshot = await get(leadRef);
    if (!snapshot.exists()) {
      console.error(`Lead with name '${leadName}' not found in the database.`);
      return false;
    }

    // delete lead from database
    await remove(leadRef);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * Updates a club lead's information in the database based on their name, key name, and new value.
 * @param {string} leadName - The name of the club lead to be updated.
 * @param {string} key - The key name of the field to be updated.
 * @param {*} value - The new value to update the field with.
 * @returns {Promise<boolean>} Returns true if the update is successful, otherwise false.
 */
export async function updateLead(leadName, key, value, test = "Club_Leads") {
  console.log(leadName, key, value);
  try {
    // check required parameters are provided
    if (!leadName || !key || value === undefined) {
      console.error("Missing required parameters: leadName, key, or value");
      return false;
    }

    // get reference to lead in database
    const leadRef = ref(database, `${test}/${leadName}`);

    // check if lead exists
    const snapshot = await get(leadRef);
    if (!snapshot.exists()) {
      console.error(`Lead with name '${leadName}' not found in the database.`);
      return false;
    }

    // check if provided key is valid
    const validKeys = [
      "Active",
      "Class_Standing",
      "Date_Joined",
      "Date_Left",
      "Email",
      "Image",
      "Name",
      "Role",
      "Team",
    ];
    if (!validKeys.includes(key)) {
      console.error(
        `Invalid key '${key}' provided. The valid keys are: ${validKeys.join(
          ", "
        )}`
      );
      return false;
    }

    // type check for value
    const valueTypes = {
      Active: "boolean",
      Class_Standing: "string",
      Date_Joined: "number",
      Date_Left: "number",
      Email: "string",
      Image: "string",
      Name: "string",
      Role: "string",
      Team: "string",
    };

    // rome-ignore lint/suspicious/useValidTypeof: dont make me explain myself
    if (typeof value !== valueTypes[key]) {
      console.error(
        `Invalid value type provided for key '${key}'. Expected type: '${valueTypes[key]}'.`
      );
      return false;
    }

    // update lead in database
    const leadData = { [key]: value };
    await update(leadRef, leadData);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * Fetches a club lead from the database based on their name.
 * @param {string} leadName - The name of the club lead to be fetched.
 * @param {string} test - The name of the database root node (optional).
 * @returns {Object|null} Returns the club lead object if found, otherwise returns null.
 */
export async function getLeadByName(leadName, test = "Club_Leads") {
  try {
    // check if leadName is provided
    if (!leadName) {
      console.error("Missing required parameter: leadName");
      return null;
    }

    // type check
    if (typeof leadName !== "string") {
      console.error("Parameter 'leadName' must be of type 'string'");
      return null;
    }

    // get ref to lead in database
    const leadRef = ref(database, `${test}/${leadName}`);

    // get lead data
    const snapshot = await get(leadRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.error(
        `Club lead with name '${leadName}' not found in the database.`
      );
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }

}
