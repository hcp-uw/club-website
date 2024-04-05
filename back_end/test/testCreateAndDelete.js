import { assert } from "chai";
import { createNewEvent, deleteEvent, getAllEvents } from "../api/events.js";
import { createNewLead, deleteLead, getLeads } from "../api/leads.js";
import {
    createNewProject,
    deleteProject,
    getProjects,
} from "../api/projects.js";

describe("Testing createNewEvent and deleteEvent", () => {
    afterEach(async () => {
        await deleteEvent("Test Event", "Test/Events");
        await deleteEvent("Existing Event", "Test/Events");
    });

    it("should create a new event and return true", async () => {
        const event = {
            Attendees: 69,
            Date: "2007-10-20T16:00-07:00",
            Description: "This is a dope event",
            Image: "blob",
            Location: "UW",
            Name: "Test Event",
            Sponsor: "Google",
        };

        const result = await createNewEvent(event, "Test/Events");
        assert.isTrue(result, "Expected createNewEvent to return true");
    });

    it("should return false when required parameters are missing", async () => {
        const event = {
            Attendees: 50,
            Date: "2023-08-01T16:00-07:00",
        };

        const result = await createNewEvent(event, "Test/Events");
        assert.isFalse(result, "Expected createNewEvent to return false");
    });

    it("should return false when 'Attendees' parameter is not a number", async () => {
        const event = {
            Attendees: "Not a number",
            Date: "2023-08-02T16:00-07:00",
            Description: "Another test event",
            ImageURL: "https://example.com/another-image.jpg",
            Location: "Another Location",
            Name: "Another Test Event",
            Sponser: "Another Test Sponser",
        };

        const result = await createNewEvent(event, "Test/Events");
        assert.isFalse(result, "Expected createNewEvent to return false");
    });

    it("should return false when an event with the same name already exists", async () => {
        const existingEvent = {
            Attendees: 30,
            Date: "2023-08-03T16:00-07:00",
            Description: "Existing event",
            ImageURL: "https://example.com/existing-image.jpg",
            Location: "Existing Location",
            Name: "Existing Event",
            Sponsor: "Existing Sponsor",
        };

        await createNewEvent(existingEvent, "Test/Events");

        const eventWithDuplicateName = {
            Attendees: 25,
            Date: "2023-08-04T16:00-07:00",
            Description: "New event with duplicate name",
            ImageURL: "https://example.com/duplicate-image.jpg",
            Location: "Duplicate Location",
            Name: "Existing Event",
            Sponsor: "Duplicate Sponsor",
        };

        const result = await createNewEvent(
            eventWithDuplicateName,
            "Test/Events",
        );
        assert.isFalse(result, "Expected createNewEvent to return false");
    });
});

describe("Testing createNewLead and DeleteLead", () => {
    afterEach(async () => {
        await deleteLead("Test_Lead", "Test/Club_Leads");
        await deleteLead("Existing Lead", "Test/Club_Leads");
    });

    it("should create a new lead and return true", async () => {
        const lead = {
            Active: true,
            Class_Standing: "Senior",
            Date_Joined: "2023-07-30",
            Date_Left: "2024-07-30",
            Email: "test@example.com",
            Image: "https://example.com/image.jpg",
            Name: "Test_Lead",
            Role: "President",
            Team: "Executive Committee",
        };

        const result = await createNewLead(lead, "Test/Club_Leads");
        assert.isTrue(result, "Expected createNewLead to return true");
    });

    it("should return false when required parameters are missing", async () => {
        const lead = {
            Active: true,
        };

        const result = await createNewLead(lead, "Test/Club_Leads");
        assert.isFalse(result, "Expected createNewLead to return false");
    });

    it("should return false when the lead already exists", async () => {
        const existingLead = {
            Active: true,
            Class_Standing: "Junior",
            Date_Joined: "2021-01-01",
            Date_Left: "2023-01-01",
            Email: "existing@example.com",
            Image: "https://example.com/existing.jpg",
            Name: "Existing Lead",
            Role: "Vice President",
            Team: "Executive Committee",
        };

        await createNewLead(existingLead, "Test/Club_Leads");

        const leadWithDuplicateName = {
            Active: true,
            Class_Standing: "Sophomore",
            Date_Joined: "2023-07-30",
            Date_Left: "2024-07-30",
            Email: "duplicate@example.com",
            Image: "https://example.com/duplicate.jpg",
            Name: "Existing Lead",
            Role: "Secretary",
            Team: "Executive Committee",
        };

        const result = await createNewLead(
            leadWithDuplicateName,
            "Test/Club_Leads",
        );
        assert.isFalse(result, "Expected createNewLead to return false");
    });
});

describe("Testing createNewProject and DeleteProject", () => {
    afterEach(async () => {
        await deleteProject("Test Project", "Test/Projects");
        await deleteProject("Existing Project", "Test/Projects");
    });

    it("should create a new project and return true", async () => {
        const project = {
            Category: "Web_Project",
            Completed: false,
            Description: "Test project description",
            End_Date: "",
            Git_Link: "https://github.com/testuser/testproject",
            Image: "https://example.com/image.jpg",
            Members: "Test User",
            Name: "Test Project",
            PM: "Test User",
            Start_Date: "2023-07-30",
        };

        const result = await createNewProject(project, "Test/Projects");
        assert.isTrue(result, "Expected createNewProject to return true");
    });

    it("should return false when required parameters are missing", async () => {
        const project = {
            Category: "Web_Project",
        };

        const result = await createNewProject(project, "Test/Projects");
        assert.isFalse(result, "Expected createNewProject to return false");
    });

    it("should return false when the project already exists", async () => {
        const existingProject = {
            Category: "Mobile_Project",
            Completed: true,
            Description: "Existing project description",
            End_Date: "2023-07-30",
            Git_Link: "https://github.com/existinguser/existingproject",
            Image: "https://example.com/existing.jpg",
            Members: "Existing User",
            Name: "Existing Project",
            PM: "Existing User",
            Start_Date: "2023-01-01",
        };

        await createNewProject(existingProject, "Test/Projects");

        const projectWithDuplicateName = {
            Category: "Web_Project",
            Completed: false,
            Description: "New project with duplicate name",
            End_Date: "",
            Git_Link: "https://github.com/testuser/duplicateproject",
            Image: "https://example.com/duplicate.jpg",
            Members: "Test User",
            Name: "Existing Project",
            PM: "Test User",
            Start_Date: "2023-07-30",
        };

        const result = await createNewProject(
            projectWithDuplicateName,
            "Test/Projects",
        );
        assert.isFalse(result, "Expected createNewProject to return false");
    });
});
