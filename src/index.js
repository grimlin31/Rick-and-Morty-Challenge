import { originCharacterByEpisode } from "./businnes/question-b.business.js";
import { countCharInNameResource } from "./businnes/questiona-a.business.js";

const challengeFunction = async () => {

    const resultChallenge = []

    // Question A
    const timeStartQuestionA = Date.now();

    const resultQuestionA = await Promise.all([
        countCharInNameResource('location', { count: 0, char: 'l', page: 1 }),
        countCharInNameResource('episode', { count: 0, char: 'e', page: 1 }),
        countCharInNameResource('character', { count: 0, char: 'c', page: 1 }),
    ]).catch(e => console.log(e.message))

    console.log(resultQuestionA)

    const timeQuestionA = (Date.now() - timeStartQuestionA)/1000;
    const data = {
        exercise_name: "Char counter",
        time: `${Math.floor(timeQuestionA)}s ` + 
                `${Math.floor((timeQuestionA - Math.floor(timeQuestionA))*1000)}ms`,
        in_time: timeQuestionA < 3,
        results: resultQuestionA
    }
    resultChallenge.push(data)
/*
    // Question B
    const resultQuestionB = await originCharacterByEpisode({ page: 1, resultObj: [], mapCharacter: new Map()})
    console.log(resultQuestionB)
*/

    console.log(JSON.stringify(resultChallenge))
}

challengeFunction()
