import { getFromApi } from "./requests.js";
import { countCharInString } from "./string.utils.js";

const countCharInNameResource = async (resource, parameter) => {
    var { counter, char, page } = {...parameter};
    const { results, info } = await getFromApi(resource, { page }).catch(e => console.error(e.message))

    results.map((result) => {
        counter += countCharInString(char, result);
    })   
    if ( !info?.next ) return counter
    return await countCharInNameResource(resource, { counter, char, page: page + 1 })
}


