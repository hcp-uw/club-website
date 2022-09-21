// import axios from 'axios';
import { events } from './data';

// const BASE_URL = 'https://random_url.com';
// const OK = 200;

// For dummy endpoints
const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

export const getFeaturedEvents = async (callback) => {
    // await axios.get(BASE_URL + '/test').then(
    //     (res) => {
    //         if (res.status === OK && res.data) {
    //             return {
    //                 status: OK,
    //                 data: res.data.slice(0, 3),
    //             }
    //         } else {
    //             return {
    //                 status: OK,
    //                 data: [],
    //             }
    //         }
    //     }
    // );
    await delay(3000);
    callback(events.data.slice(0, 3))
}