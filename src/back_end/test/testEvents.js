import { getEventsBasedOnTime } from '../api/end_points.js';
import { assert } from 'chai';

describe( "Testing event endpionts", () => {
  it('Get upcoming events verbose', async() => {
    let get = await getEventsBasedOnTime(true, true, "Test/Events");
    let expected = [
      {
        key: 'EventFuture',
        value: {
          Attendees: 21,
          Date: '2192-10-20T16:00-07:00',
          Description: 'This is an event in the future',
          Image: 'blob',
          Location: 'UW?',
          Sponsor: 'Tettie'
        }
      }
    ]
    assert.deepEqual(get, expected);
  });

  it('Get upcoming events not verbose', async() => {
    let get = await getEventsBasedOnTime(true, false, "Test/Events");
    let expected = ["EventFuture"];
    assert.deepEqual(get, expected);
  });

  it('Get old events verbose', async() => {
    let get = await getEventsBasedOnTime(false, true, "Test/Events");
    let expected = [
      {
        key: 'Event1',
        value: {
          Attendees: 69,
          Date: '2007-10-20T16:00-07:00',
          Description: 'This is a dope event',
          Image: 'blob',
          Location: 'UW',
          Sponsor: 'Google'
        }
      }
    ];
    assert.deepEqual(get, expected);
  });

  it('Get old events not verbose', async() => {
    let get = await getEventsBasedOnTime(false, false, "Test/Events");
    let expected = ["Event1"];
    assert.deepEqual(get, expected);
  });
});