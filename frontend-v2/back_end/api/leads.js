import { ref, query, get, orderByChild, equalTo } from "firebase/database";
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
    let q = query(ref(database, test), orderByChild("Active"), equalTo(true));
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
 * @returns {boolean} Returns true if the lead creation is successful, otherwise false.
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
      if (!lead[field]) {
        console.error(`Missing required parameter: ${field}`);
        return false;
      }
    }

    // get ref to lead in database
    const leadRef = ref(database, `${test}/${lead.Name}`);

    // check if lead already exists
    const snapshot = await leadRef.get();
    if (snapshot.exists()) {
      console.error(
        `Lead with name '${lead.Name}' already exists in the database.`
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
 * @returns {boolean} Returns true if the lead deletion is successful, otherwise false.
 */
export async function deleteClubLead(leadName, test = "Club_Leads") {
  try {
    // check if leadName is provided
    if (!leadName) {
      console.error("Missing required parameter: leadName");
      return false;
    }

    // get ref to lead in database
    const leadRef = ref(database, `${test}/${leadName}`);

    // check if lead exists
    const snapshot = await leadRef.get();
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
 * @returns {boolean} Returns true if the update is successful, otherwise false.
 */
export async function updateClubLead(leadName, key, value) {
  try {
    // check required parameters are provided
    if (!leadName || !key || value === undefined) {
      console.error("Missing required parameters: leadName, key, or value");
      return false;
    }

    // get reference to lead in database
    const leadRef = ref(database, `Club_Leads/${leadName}`);

    // check if lead exists
    const snapshot = await leadRef.get();
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
      Date_Joined: "string",
      Date_Left: "string",
      Email: "string",
      Image: "string",
      Name: "string",
      Role: "string",
      Team: "string",
    };

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
