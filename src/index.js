import axios from "axios";
import { getFromApi } from "./requests.js";
import { countCharInString } from "./string.utils.js";

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

const originCharacterByEpisode = async (parameter) => {
    const { page, resultObj, mapCharacter } = {...parameter};
    const { results, info } = await getFromApi('episode', { page }).catch(e => {throw e})

    results.map(async (episode) => {
        const originLocations = []
        for( const urlChar of episode.characters) {
            const characterLocation = mapCharacter.get(urlChar)
            if (!characterLocation){
                const newChar = await (await axios.get(urlChar)).data;
                const newCharacLoc = newChar.origin.name
                mapCharacter.set(urlChar, newCharacLoc);
                originLocations.push(newCharacLoc)
                continue;
            }
            originLocations.push(characterLocation);
        };
        const locations = [...new Set(originLocations)]
       resultObj.push({
            name: episode.name,
            episode: episode.episode,
            locations,
            locationsAmount: originLocations.length,
        })
    })

    if ( !info?.next ) return resultObj

    return await originCharacterByEpisode({ page: page + 1, resultObj, mapCharacter });

}

const dateStart = Date.now();
Promise.all([
    countCharInNameResource('location', { count: 0, char: 'l', page: 1 }),
    countCharInNameResource('episode', { count: 0, char: 'e', page: 1 }),
    countCharInNameResource('character', { count: 0, char: 'c', page: 1 }),
]).then(results => {
    const time = (Date.now() - dateStart)/1000;
    const data = {
        exercise_name: "Char counter",
        time: `${Math.floor(time)}s ${Math.floor((time - Math.floor(time))*1000)}ms`,
        in_time: time < 3,
        results
    }
    console.log(data)

})
.catch(e => console.log(e.message))
originCharacterByEpisode({ page: 1, resultObj: [], mapCharacter: new Map() })

