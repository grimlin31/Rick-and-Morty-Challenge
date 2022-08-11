import { getFromApi } from "../requests.js";
import { arrayToMap } from "../utils/map.utils.js";

const mapCharacterBy = async (parameter) => {
    let { page, mapParameter} = {...parameter};

    const { results, info } = await getFromApi('character', { page }).catch(e => {throw e});

    const mapCharacter = arrayToMap(results, 'url', [ 'origin' ]);

    if (!info.next) return {...mapParameter, ...mapCharacter};

    return await mapCharacterBy({
        page: page + 1,
        mapParameter: {...mapParameter, ...mapCharacter}
    })

}

const originCharacterByEpisode = async (parameter) => {
    const { page, resultObj, mapCharacter } = {...parameter};

    const { results, info } = await getFromApi('episode', { page }).catch(e => {throw e})

    for (const episode of results) {
        const originLocations = episode.characters.map((urlChar) => {
            return mapCharacter[urlChar].name
        });

        const locations = [...new Set(originLocations)]
        resultObj.push({
            name: episode.name,
            episode: episode.episode,
            locations,
            locationsAmount: originLocations.length,
        })
    }

    if ( !info?.next ) return resultObj

    return await originCharacterByEpisode({ page: page + 1, resultObj, mapCharacter });

}

export {
    originCharacterByEpisode,
    mapCharacterBy
}