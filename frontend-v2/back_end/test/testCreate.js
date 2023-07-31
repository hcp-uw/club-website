import { getLeads, createNewLead, deleteLead } from "../api/leads.js";
import { getAllEvents, createNewEvent, deleteEvent } from "../api/events.js";
import { getProjects, createNewProject } from "../api/projects.js";
import { assert } from "chai";

describe("Testing createNewEvent", () => {
  afterEach(async () => {
    // Cleanup step: Delete the event created during testing
    await deleteEvent("Event5", "Test/Events");
  });

  it("should create a new event and return true", async () => {
    const event =  {
        Attendees: 69,
        Date: "2007-10-20T16:00-07:00",
        Description: "This is a dope event",
        Image: "blob",
        Location: "UW",
        Name: "Event5",
        Sponsor: "Google",
    };

    const result = await createNewEvent(event, "Test/Events");
    assert.isTrue(result, "Expected createNewEvent to return true");
  });

  it("should return false when required parameters are missing", async () => {
    const event = {
      Attendees: 50,
      Date: "2023-08-01T16:00-07:00",
      // Missing 'description', 'imageURL', 'location', 'name', 'sponser'
    };

    const result = await createNewEvent(event, "Test/Events");
    assert.isFalse(result, "Expected createNewEvent to return false");
  });

  it("should return false when 'Attendees' parameter is not a number", async () => {
    const event = {
      Attendees: "Not a number", // Invalid 'Attendees' type
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

});

describe("Testing createNewLead", () => {
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
        Name: "Existing Lead", // Same name as the existing lead
        Role: "Secretary",
        Team: "Executive Committee",
      };
  
      const result = await createNewLead(leadWithDuplicateName, "Test/Club_Leads");
      assert.isFalse(result, "Expected createNewLead to return false");
    });
  
  });
