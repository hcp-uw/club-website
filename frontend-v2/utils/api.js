// import axios from 'axios';
import * as leads from "@/back_end/api/leads.js";
import * as events from "@/back_end/api/events.js";
import * as projects from "@/back_end/api/projects.js";
import * as auth from "@/back_end/api/auth.js";
import emailjs from "@emailjs/browser";
import { parseEvents, parsePeople, parseProjects } from './parsers';

// For dummy endpoints
// const delay = ms => new Promise(
//     resolve => setTimeout(resolve, ms)
//   );

export const getFeaturedEvents = async (callback) => {
    var data = await events.getEventsBasedOnTime(true);
    if (data) {
        callback(parseEvents(data).slice(0, 3));
    } else {
        callback([]);
    }
};

export const getAllEvents = async (callback, upcoming) => {
    var data = await events.getEventsBasedOnTime(upcoming);
    if (data) {
        callback(parseEvents(data));
    } else {
        callback([]);
    }
};

export const getPeople = async (callback) => {
    var data = await leads.getActiveLeads();
    if (data) {
        callback(parsePeople(data));
    } else {
        callback([]);
    }
};

export const getProjects = async (callback, active) => {
    var data = await projects.getActiveProjects(active);
    if (data) {
        callback(parseProjects(data));
    } else {
        callback([]);
    }
};

export const getAllProjects = async (callback) => {
    var data = await projects.getProjects();
    if (data) {
        callback(parseProjects(data));
    } else {
        callback([]);
    }
};

export const sendEmail = async (name, email, notes) => {
    const templateParams = {
        to_name: "HCP Team",
        from_name: name,
        message: notes,
        reply_to: email,
    };
    console.log(name);

    emailjs
        .send(
            "service_wetv0mh",
            "template_cpwd3s8",
            templateParams,
            "N-gkjHJLoKESLpaki",
        )
        .then(
            (response) => {
                console.log("SUCCESS!", response.status, response.text);
            },
            (err) => {
                console.log("FAILED...", err);
            },
        );
};

export const exchangeAuth = async (user) => {
    var github_access_token = await auth.exchangeAuth(user);
    if (github_access_token) {
        return github_access_token;
    } else {
        return "";
    }
}

export const getGithubUser = async (token) => {
    var username = await auth.getGithubUser(token);

    if (username) {
        return username;
    } else {
        return "";
    }
};

export const checkMembership = async (username) => {
    var member = await auth.checkMembership(username);
    return member;
};

export const checkAdmin = async (authObject) => {
    var isAdmin = await auth.checkAdmin(authObject);
    return isAdmin;
}

