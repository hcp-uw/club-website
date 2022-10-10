import { getEvents } from '../api/end_points.js';
import {assert} from 'chai';

describe( "Testing event endpionts", () => {
    it('Get upcoming events verbose', async() => {
        let get = await getEvents(true, true, "Test/Events");
        console.log(get)
    })
});