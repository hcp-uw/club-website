import axios from "axios";
import { database } from "../utils/index.js";
import { ref, query, get } from "firebase/database";

const orgName = "hcp-uw";
const HCP_ACCESS_TOKEN = process.env.NEXT_PUBLIC_HCP_ACCESS_TOKEN;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;

export async function exchangeAuth(auth) {
    try {
        const response = await axios.post(
            "https://github.com/login/oauth/access_token",
            null,
            {
                params: {
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    code: auth,
                },
                headers: {
                    Accept: "application/json",
                },
            },
        );

        const github_access_token = response.data.access_token;
        return github_access_token;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getGithubUser(token) {
    try {
        const response = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.login;
    } catch (err) {
        console.error(err);
    }
}

export async function checkMembership(username) {
    try {
        await axios.get(
            `https://api.github.com/orgs/hcp-uw/memberships/${username}`,
            {
                headers: {
                    Authorization: `Bearer ${HCP_ACCESS_TOKEN}`,
                },
            },
        );

        return true;
    } catch (err) {
        return false;
    }
}

export async function checkAdmin(auth) {
    if (auth == null) {
        return false;
    }

    let email = auth.email;
    let key = email.split("@")[0];
    let qRes;
    let data;
    try {
        let q = query(ref(database, "Update/Members"));
        qRes = await get(q);
        data = qRes.val();
        let member = data[key];

        if (member == null) {
            return false;
        }

        return member["Club_Lead"];
    } catch (err) {
        console.error(err);
    }
}
