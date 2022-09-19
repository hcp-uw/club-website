// import axios from 'axios';

// 'const BASE_URL = 'https://random_url.com';
const OK = 200;

// For dummy endpoints
const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

const events = {
    status: OK,
    data: [
        {
            date: new Date('Wed, 27 July 2016 13:30:00'),
            name: 'Default Name',
            location: 'UW CSE2 271',
            sponsor: null,
            attendees: 100,
            description: "text text and a lot more text. Actually this might be too much random text. Imma go now. Ha im back. Imma go for real now. Got you again rofl. Ok im bored now, signing off. ** Mic drop ** ^-^",
            image: "https://picsum.photos/200/300",
        },
        {
            date: new Date('Wed, 27 July 2019 13:30:00'),
            name: 'Better Name',
            location: 'UW CSE2 271',
            sponsor: "DubHacks",
            attendees: 100,
            description: "This event is MEMBERS ONLY. Actually though, should we add another column in the table for these types of events? But here is much more text than last time and should overflow some stuff! text text and a lot more text. Actually this might be too much random text. Imma go now. Ha im back. Imma go for real now. Got you again rofl. Ok im bored now, signing off. ** Mic drop ** ^-^",
            image: null,
        },
        {
            date: new Date('Wed, 27 July 2019 13:30:00'),
            name: 'Workshop',
            location: 'UW Hub Building Room 12345',
            sponsor: null,
            attendees: 1000,
            description: "text text and a lot more text. A",
            image: "https://picsum.photos/200/300",
        }
    ],
};

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
    callback(events.data.slice(0, 0))
}