const axios = require('axios');
export const Service = {
    getRooms : async function get() {
        return await axios.get('/rooms');
    },

    createRoom : async function get() {
        return await axios.get('/rooms/create');
    },
}