import * as auth from "@/back_end/api/auth.js";
import * as events from "@/back_end/api/events.js";
// import axios from 'axios';
import * as leads from "@/back_end/api/leads.js";
import * as projects from "@/back_end/api/projects.js";
import emailjs from "@emailjs/browser";
import { parseEvents, parsePeople, parseProjects } from "./parsers";

// For dummy endpoints
// const delay = ms => new Promise(
//     resolve => setTimeout(resolve, ms)
//   );

export const getMembersForGithubTeams = async (callback) => {
    const data = await github.getMembersForTeams();
    if (data) {
        callback(data);
    } else {
        callback([]);
    }
}


export const getAllGithubMembers = async (callback) => {
    const data = await github.getMembers();
    if (data) {
        callback(data);
    } else {
        callback([]);
    }
}

export const getAllGithubTeams = async (callback) => {
    const data = await github.getTeams();
    if (data) {
        callback(data);
    } else {
        callback([]);
    }
}

export const getFeaturedEvents = async (callback) => {
    const data = await events.getEventsBasedOnTime(true);
    if (data) {
        callback(parseEvents(data).slice(0, 3));
    } else {
        callback([]);
    }
};

export const getAllEvents = async (callback, upcoming) => {
    const data = await events.getEventsBasedOnTime(upcoming);
    if (data) {
        callback(parseEvents(data));
    } else {
        callback([]);
    }
};

export const getPeople = async (callback) => {
    const data = await leads.getActiveLeads();
    if (data) {
        callback(parsePeople(data));
    } else {
        callback([]);
    }
};

export const getProjects = async (callback, active) => {
    const data = await projects.getActiveProjects(active);
    if (data) {
        callback(parseProjects(data));
    } else {
        callback([]);
    }
};

export const getAllProjects = async (callback) => {
    const data = await projects.getProjects();
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
    const github_access_token = await auth.exchangeAuth(user);
    if (github_access_token) {
        return github_access_token;
    } else {
        return "";
    }
};

export const getGithubUser = async (token) => {
    const username = await auth.getGithubUser(token);

    if (username) {
        return username;
    } else {
        return "";
    }
};

export const checkMembership = async (username) => {
    const member = await auth.checkMembership(username);
    return member;
};

export const checkAdmin = async (authObject) => {
    const isAdmin = await auth.checkAdmin(authObject);
    return isAdmin;
};
