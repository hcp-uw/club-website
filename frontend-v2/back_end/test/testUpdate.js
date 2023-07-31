import { updateEvent, createNewEvent, deleteEvent, getEventByName } from "../api/events.js";
import { updateLead, createNewLead, deleteLead, getLeadByName } from "../api/leads.js";
import { updateProject, createNewProject, deleteProject } from "../api/projects.js";
import { assert } from "chai";


describe("Testing updateEvent", () => {
  beforeEach(async () => {

    const event = {
      Attendees: 50,
      Date: "2023-08-01T16:00-07:00",
      Description: "Test event for updating",
      Image: "https://example.com/test-image.jpg",
      Location: "Test Location",
      Name: "Test Event",
      Sponsor: "Test Sponsor",
    };
    await createNewEvent(event, "Test/Events");
  });

  afterEach(async () => {

    await deleteEvent("Test Event", "Test/Events");
  });

  it("should update an existing event's 'Attendees' field and return true", async () => {
    const eventName = "Test Event";
    const key = "Attendees";
    const value = 75;

    const result = await updateEvent(eventName, key, value, "Test/Events");
    assert.isTrue(result, "Expected updateEvent to return true");


    const updatedEvent = await getEventByName(eventName, "Test/Events");
    assert.strictEqual(updatedEvent.Attendees, value, "Expected 'Attendees' field to be updated");
  });

  it("should update an existing event's 'Description' field and return true", async () => {
    const eventName = "Test Event";
    const key = "Description";
    const value = "Updated event description";

    const result = await updateEvent(eventName, key, value, "Test/Events");
    assert.isTrue(result, "Expected updateEvent to return true");


    const updatedEvent = await getEventByName(eventName, "Test/Events");
    assert.strictEqual(updatedEvent.Description, value, "Expected 'Description' field to be updated");
  });

  it("should return false when updating an event that does not exist", async () => {
    const eventName = "Nonexistent Event";
    const key = "Attendees";
    const value = 100;

    const result = await updateEvent(eventName, key, value, "Test/Events");
    assert.isFalse(result, "Expected updateEvent to return false");
  });

  it("should return false when invalid key is provided", async () => {
    const eventName = "Test Event";
    const key = "InvalidKey";
    const value = "Invalid Value";

    const result = await updateEvent(eventName, key, value, "Test/Events");
    assert.isFalse(result, "Expected updateEvent to return false");
  });

  it("should return false when required parameters are missing", async () => {

    const key = "Description";
    const value = "Updated event description";

    let result = await updateEvent(undefined, key, value, "Test/Events");
    assert.isFalse(result, "Expected updateEvent to return false");


    const eventName = "Test Event";
    result = await updateEvent(eventName, undefined, value, "Test/Events");
    assert.isFalse(result, "Expected updateEvent to return false");

    result = await updateEvent(eventName, key, undefined, "Test/Events");
    assert.isFalse(result, "Expected updateEvent to return false");
  });

  it("should return false when invalid value type is provided", async () => {
    const eventName = "Test Event";
    const key = "Attendees";
    const value = "Invalid Value Type"; 

    const result = await updateEvent(eventName, key, value, "Test/Events");
    assert.isFalse(result, "Expected updateEvent to return false");
  });

});


describe("Testing updateLead", () => {
  beforeEach(async () => {

    const lead = {
      Active: true,
      Class_Standing: "Junior",
      Date_Joined: "2023-08-01",
      Date_Left: "2023-12-31",
      Email: "test@example.com",
      Image: "https://example.com/test-image.jpg",
      Name: "Test Lead",
      Role: "President",
      Team: "Executive Board",
    };
    await createNewLead(lead, "Test/Club_Leads");
  });

  afterEach(async () => {

    await deleteLead("Test Lead", "Test/Club_Leads");
  });

  it("should update an existing lead's 'Active' field and return true", async () => {
    const leadName = "Test Lead";
    const key = "Active";
    const value = false;

    const result = await updateLead(leadName, key, value, "Test/Club_Leads");
    assert.isTrue(result, "Expected updateLead to return true");


    const updatedLead = await getLeadByName(leadName, "Test/Club_Leads");
    assert.strictEqual(updatedLead.Active, value, "Expected 'Active' field to be updated");
  });

  it("should update an existing lead's 'Date_Joined' field and return true", async () => {
    const leadName = "Test Lead";
    const key = "Date_Joined";
    const value = "2023-09-01";

    const result = await updateLead(leadName, key, value, "Test/Club_Leads");
    assert.isTrue(result, "Expected updateLead to return true");


    const updatedLead = await getLeadByName(leadName, "Test/Club_Leads");
    assert.strictEqual(updatedLead.Date_Joined, value, "Expected 'Date_Joined' field to be updated");
  });

  it("should return false when updating a lead that does not exist", async () => {
    const leadName = "Nonexistent Lead";
    const key = "Active";
    const value = true;

    const result = await updateLead(leadName, key, value, "Test/Club_Leads");
    assert.isFalse(result, "Expected updateLead to return false");
  });

  it("should return false when invalid key is provided", async () => {
    const leadName = "Test Lead";
    const key = "InvalidKey";
    const value = "Invalid Value";

    const result = await updateLead(leadName, key, value, "Test/Club_Leads");
    assert.isFalse(result, "Expected updateLead to return false");
  });

  it("should return false when required parameters are missing", async () => {

    const key = "Date_Joined";
    const value = "2023-09-01";

    let result = await updateLead(undefined, key, value, "Test/Club_Leads");
    assert.isFalse(result, "Expected updateLead to return false");


    const leadName = "Test Lead";
    result = await updateLead(leadName, undefined, value, "Test/Club_Leads");
    assert.isFalse(result, "Expected updateLead to return false");


    result = await updateLead(leadName, key, undefined, "Test/Club_Leads");
    assert.isFalse(result, "Expected updateLead to return false");
  });

  it("should return false when invalid value type is provided", async () => {
    const leadName = "Test Lead";
    const key = "Active";
    const value = "Invalid Value Type"; // should be a boolean

    const result = await updateLead(leadName, key, value, "Test/Club_Leads");
    assert.isFalse(result, "Expected updateLead to return false");
  });


});
