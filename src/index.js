import { mapCharacterBy, originCharacterByEpisode } from "./businnes/question-b.business.js";
import { countCharInNameResource } from "./businnes/questiona-a.business.js";

import * as fs from 'fs';

const challengeFunction = async () => {

    console.info(`Info: Starting Rick and Morty Challenge`)
    console.info(`Info: Running question A ...`)

    const resultChallenge = []
    
    // Question A
    const timeStartQuestionA = Date.now();

    const resultQuestionA = await Promise.all([
        countCharInNameResource('location', { count: 0, char: 'l', page: 1 }),
        countCharInNameResource('episode', { count: 0, char: 'e', page: 1 }),
        countCharInNameResource('character', { count: 0, char: 'c', page: 1 }),
    ]).catch(e => console.log(e.message))

    const timeQuestionA = (Date.now() - timeStartQuestionA)/1000;
    const dataQuestionA = {
        exercise_name: "Char counter",
        time: `${Math.floor(timeQuestionA)}s ` + 
                `${Math.floor((timeQuestionA - Math.floor(timeQuestionA))*1000)}ms`,
        in_time: timeQuestionA < 3,
        results: resultQuestionA
    }
    resultChallenge.push(dataQuestionA)

    console.info(`Info: Question A is ready on ${timeQuestionA}s`)
    console.info(`Info: Running question B ...`)

    // Question B
    const timeStartQuestionB = Date.now();
    const mapChar = await mapCharacterBy({page: 0, mapParameter: {}})
    const resultQuestionB = await originCharacterByEpisode({ page: 1, resultObj: [], mapCharacter: mapChar})
    const timeQuestionB = (Date.now() - timeStartQuestionB)/1000;

    const dataQuestionB = {
        exercise_name: "Episode locations",
        time: `${Math.floor(timeQuestionB)}s ` + 
                `${Math.floor((timeQuestionB - Math.floor(timeQuestionB))*1000)}ms`,
        in_time: timeQuestionB < 3,
        results: resultQuestionB
    }

    resultChallenge.push(dataQuestionB)
    console.info(`Info: Question B is ready on ${timeQuestionB}s.`)

    fs.promises.writeFile('result.json', JSON.stringify(resultChallenge, null, 4))
    console.info(`Info: Result in result.json.`)
}

challengeFunction();
