// import axios from 'axios';
import * as api from '../back_end/api/end_points.js';

// For dummy endpoints
// const delay = ms => new Promise(
//     resolve => setTimeout(resolve, ms)
//   );

// Checks if a URL is valid
const isValidHttpUrl = (string) => {
    if (!string) {
        return false;
    }
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

const parseEvents = (data) => {
    var ret = data.map((obj) => {
        var res = {
            date: new Date(obj.Date),
            name: obj.Name,
            location: obj.Location,
            description: obj.Description,
            image: isValidHttpUrl(obj.Image) ? obj.Image : null,
        }
        return res;
    });
    return ret;
}

//             name: 'Project Name',
//             startDate: new Date('Wed, 27 July 2019 13:30:00'),
//             endDate: new Date('Wed, 27 July 2019 13:30:00'),
//             completed: false,
//             category: 'Website',
//             pm: 'student',
//             gitLink: 'github.com',
//             description: 'a new project that we started a while back ago. The goal of this project is to make a new sample of. We hope to gain stronger skills in frontend through increased web development skills.',
//             members: 'person 1, person 2',
//             image: "https://picsum.photos/200/300",

const parseProjects = (data) => {
    var ret = data.map((obj) => {
        var res = {
            name: obj.Name,
            startDate: new Date(obj.Start_Date),
            endDate: new Date(obj.End_Date),
            completed: obj.Completed,
            category: obj.Description,
            pm: obj.PM,
            gitLink: isValidHttpUrl(obj.Git_Link) ? obj.Git_Link : null,
            description: obj.Description,
            members: obj.Members,
            image: isValidHttpUrl(obj.Image) ? obj.Image : null,
        }
        return res;
    });
    return ret;
}

export const getFeaturedEvents = async (callback) => {
    var data = await api.getEventsBasedOnTime(true);
    if (data) {
        callback(parseEvents(data).slice(0, 3));
    } else {
        callback([]);
    }
}

export const getAllEvents = async (callback, upcoming) => {
    var data = await api.getEventsBasedOnTime(upcoming);
    if (data) {
        callback(parseEvents(data));
    } else {
        callback([]);
    }
}

const parsePeople = (data) => {
    var ret = data.map((obj) => {
        var res = {
            active: obj.active,
            year: obj.Class_Standing,
            dateJoined: new Date(obj.Date_Joined),
            dateLeft: new Date(obj.Date_Left),
            email: obj.Email,
            image: isValidHttpUrl(obj.Image) ? obj.Image : null,
            name: obj.Name,
            role: obj.Role,
            team: obj.Team
        }
        return res;
    });
    return ret;
}

export const getPeople = async (callback) => {
    var data = await api.getActiveLeads();
    if (data) {
        callback(parsePeople(data));
    } else {
        callback([]);
    }
}

export const getProjects = async (callback, active) => {
    var data = await api.getActiveProjects(active);
    if (data) {
        callback(parseProjects(data));
    } else {
        callback([]);
    }
}

