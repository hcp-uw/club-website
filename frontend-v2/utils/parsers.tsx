// Checks if a URL is valid
export const isValidHttpUrl = (input: string) => {
    if (!input) {
        return false;
    }
    let url: URL;
    try {
        url = new URL(input);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
};

export interface IProjectInfo {
    name: string;
    startDate: Date;
    endDate: Date;
    completed: boolean;
    category: string;
    pm: string;
    gitLink: string | null;
    description: string;
    members: string;
    image: string | null;
}

export const parseProjects = (data: any[]) => {
    const ret = data.map((obj: any) => {
        const res: IProjectInfo = {
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
        };
        return res;
    });
    return ret;
};

export interface IEventInfo {
    date: Date;
    name: string;
    location: string;
    description: string;
    image: string | null;
}

export const parseEvents = (data: any) => {
    const ret = data.map((obj: any) => {
        const res: IEventInfo = {
            date: new Date(obj.Date),
            name: obj.Name,
            location: obj.Location,
            description: obj.Description,
            image: isValidHttpUrl(obj.Image) ? obj.Image : null,
        };
        return res;
    });
    return ret;
};

export interface IPeopleInfo {
    active: string;
    year: string;
    dateJoined: Date;
    dateLeft: Date;
    email: string;
    image: string | null;
    name: string,
    role: string,
    team: string,
}

export const parsePeople = (data: any) => {
    const ret = data.map((obj: any) => {
        const res: IPeopleInfo = {
            active: obj.active,
            year: obj.Class_Standing,
            dateJoined: new Date(obj.Date_Joined),
            dateLeft: new Date(obj.Date_Left),
            email: obj.Email,
            image: isValidHttpUrl(obj.Image) ? obj.Image : null,
            name: obj.Name,
            role: obj.Role,
            team: obj.Team,
        };
        return res;
    });
    return ret;
};