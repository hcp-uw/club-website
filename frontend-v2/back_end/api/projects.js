import {
    ref,
    query,
    get,
    orderByChild,
    startAt,
    equalTo,
    set, 
    remove
} from "firebase/database";
import { database } from "../utils/index.js";
import { errObj, getData } from "../utils/utils.js";

/* ------------------- Projects Endpoints ------------------- */
// Returns all projects from database
export async function getProjects(test = "Projects") {
    let data = await getData(test);
    return Array.from(Object.values(data));
}

/*
 * Returns all projects in shortened form.
 * @returns a list of projects with only name, description, and project logo
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
    let values = Array.from(Object.values(data));
    let returnVals = [];
    values.forEach((val) => {
        returnVals.push({
            Name: val["Name"],
            Description: val["Description"],
            Image: val["Image"],
        });
    });
    return returnVals;
}

/**
 * Gets projects based on if they are active (currently working) or not. Default gets active projects
 * @param {boolean} active: Indicates getting active projects or inactive projects
 * @returns a list of projects with all details
 */
export async function getActiveProjects(active = true, test = "Projects") {
    let data;
    try {
        if (active) {
            // Querys based on the End_Date being empty
            let q = query(
                ref(database, test),
                orderByChild("End_Date"),
                equalTo(""),
            );
            let qRes = await get(q);
            data = qRes.val();
        } else {
            let q = query(
                ref(database, test),
                orderByChild("End_Date"),
                startAt("!"),
            );
            let qRes = await get(q);
            data = qRes.val();
        }
    } catch (err) {
        console.error(err);
        return errObj;
    }
    return data === null ? [] : Array.from(Object.values(data));
}

/**
 * @param {String} name Name of the project. Required to be exact match with the database.
 * @returns a singular project with all details
 */
export async function getProjectByName(name, test = "Projects") {
    if (name === undefined) {
        console.error("Missing 'name' parameter input");
        return errObj;
    }
    if (typeof name !== "string") {
        console.error("'Name' parameter input expected to be a string");
        return errObj;
    }
    let data;
    try {
        let q = query(ref(database, test), orderByChild("Name"), equalTo(name));
        let qRes = await get(q);
        data = qRes.val();
    } catch (err) {
        console.error(err);
        return errObj;
    }
    return data === null ? [] : Array.from(Object.values(data));
}

/**
 * Creates a new project and saves its information to the database.
 * @param {Object} project - The project information to be added to the database.
 * @returns {boolean} Returns true if the project creation is successful, otherwise false.
 */
export async function createNewProject(project, test = "Projects") {
    try {
      // check if required params provided
      const requiredFields = ["Category", "Completed", "Description", "End_Date", "Git_Link", "Image", "Members", "Name", "PM", "Start_Date"];
      for (const field of requiredFields) {
        if (!project[field]) {
          console.error(`Missing required parameter: ${field}`);
          return false;
        }
      }
  
      // get ref to project in database
      const projectRef = ref(database, `${test}/${project.Name}`);
  
      // check if project already exists
      const snapshot = await projectRef.get();
      if (snapshot.exists()) {
        console.error(`Project with name '${project.Name}' already exists in the database.`);
        return false;
      }
  
      // save project to database
      await set(projectRef, project);
  
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
