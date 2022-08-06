import axios from "axios";
import { URL_RICK_AND_MORTY_API } from "./connection.config.js";

const getFromApi = async (api, params) => {
    const result = await axios.get(`${URL_RICK_AND_MORTY_API}/${api}`, {
        params
    })
    return result.data
}

const getByUrl = async (url) => {
    const result = await axios.get(url);
    return result.data
}

export {
    getFromApi,
    getByUrl
}
