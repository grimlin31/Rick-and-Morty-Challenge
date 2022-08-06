import { getFromApi } from "../requests.js";
import { countCharInString } from "../utils/string.utils.js";

const countCharInNameResource = async (resource, parameter) => {
    var { count, char, page } = {...parameter};
    const { results, info } = await getFromApi(resource, { page }).catch(e => {throw e})

    results.map((result) => {
        count += countCharInString(char, result.name);
    })
    if ( !info?.next ) return {
        char,
        count,
        resource
    }
    return await countCharInNameResource(resource, { count, char, page: page + 1 })
}

export {
    countCharInNameResource
}