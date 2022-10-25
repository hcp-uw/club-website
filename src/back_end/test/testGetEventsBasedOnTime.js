import { getEventsBasedOnTime } from '../api/end_points.js';
import { assert } from 'chai';

describe( "Testing event endpoints", () => {
  it('Get upcoming events', async() => {
    let get = await getEventsBasedOnTime(true, 4, "Test/Events");
    let expected = [
      {
        Attendees: 21,
        Date: '2192-10-20T16:00-07:00',
        Description: 'This is an event in the future',
        Image: 'blob',
        Location: 'UW?',
        Name: 'EventFuture',
        Sponsor: 'Tettie'
      }
    ]
    assert.deepEqual(get, expected);
  });

  it('Get old events', async() => {
    let get = await getEventsBasedOnTime(false, 2, "Test/Events");
    let expected = [
      {
        Attendees: 69,
        Date: '2007-10-20T16:00-07:00',
        Description: 'This is a dope event',
        Image: 'blob',
        Location: 'UW',
        Name: "Event1",
        Sponsor: 'Google'
      },
      {
        Attendees: 24,
        Date: '2008-10-20T16:00-07:00',
        Description: 'Social event',
        Image: 'blob',
        Location: 'UW',
        Name: "Event2",
        Sponsor: 'Kasey'
      }
    ];
    assert.deepEqual(get, expected);
  });

  it('Get old events with limit', async() => {
    let get = await getEventsBasedOnTime(false, 1, "Test/Events");
    let expected = [
      {
        Attendees: 24,
        Date: '2008-10-20T16:00-07:00',
        Description: 'Social event',
        Image: 'blob',
        Location: 'UW',
        Name: "Event2",
        Sponsor: 'Kasey'
      }
    ];
    assert.deepEqual(get, expected);
  });
});