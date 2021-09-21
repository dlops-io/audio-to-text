import { BASE_API_URL } from "./Common";

const axios = require('axios');

const DataService = {
    Init: function () {
        // Any application initialization logic comes here
    },
    Audio2Text: async function (formData) {
        return await axios.post(BASE_API_URL + "/audio2text", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
}

export default DataService;