// import axios from 'axios';
import { people } from './data';
import { projects } from './data';
import * as api from '../back_end/api/end_points.js';

// For dummy endpoints
const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

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

export const getPeople = async (callback) => {
    await delay(3000);
    callback(people.data)
}

export const getProjects = async (callback) => {
    await delay(3000);
    callback(projects.data)
}

