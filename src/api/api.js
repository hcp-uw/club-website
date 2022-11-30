// import axios from 'axios';
import { people } from './data';
import { projects } from './data';
import * as api from '../back_end/api/end_points.js';
import emailjs from '@emailjs/browser';

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
            name: obj.name,
            startDate: new Date(obj.Start_Date),
            endDate: new Date(obj.End_Date),
            completed: obj.Completed,
            category: obj.Description,
            pm: obj.PM,
            gitLink: obj.Git_Link,
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

export const getPeople = async (callback) => {
    await delay(3000);
    callback(people.data)
}

export const getProjects = async (callback) => {
    var data = await api.getProjects();
    if (data) {
        callback(parseProjects(data));
    } else {
        callback([]);
    }
}

export const sendEmail = async (name, notes) => {
    const templateParams = {
        to_name: "HCP Team",
        from_name: name,
        message: notes,
        reply_to: name,
    };
    console.log(name)

    emailjs.send('service_wetv0mh','template_cpwd3s8', templateParams, 'N-gkjHJLoKESLpaki')
        .then((response) => {
           console.log('SUCCESS!', response.status, response.text);
        }, (err) => {
           console.log('FAILED...', err);
    });    
}

