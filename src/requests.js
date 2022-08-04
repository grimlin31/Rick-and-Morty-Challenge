import axios from "axios";
import { URL_RICK_AND_MORTY_API } from "./config.js";

const getFromApi = async (api, params) => {
    const result = await axios.get(`${URL_RICK_AND_MORTY_API}/${api}`, {
        params
    })
    return result.data
}

export {
    getFromApi,
}
