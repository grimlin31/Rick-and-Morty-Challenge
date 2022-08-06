import { getFromApi } from "../requests.js";

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

export {
    originCharacterByEpisode
}