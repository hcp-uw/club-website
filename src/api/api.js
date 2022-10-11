// import axios from 'axios';
import { people } from './data';
import { getAllEvents } from '../back_end/api/end_points.js';

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
    var ret = Object.keys(data).map((key) => {
        var res = {
            date: new Date(data[key].Date),
            name: String(key).replaceAll('_', ' '),
            location: data[key].Location,
            description: data[key].Description,
            image: isValidHttpUrl(data[key].Image) ? data[key].Image : null,
        }
        return res;
    });
    return ret;
}

export const getFeaturedEvents = async (callback) => {
    var data = await getAllEvents();
    if (data) {
        callback(parseEvents(data).slice(0, 3));
    } else {
        callback([]);
    }
}

export const getAllEvents = async (callback) => {
    var data = await getAllEvents();
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
