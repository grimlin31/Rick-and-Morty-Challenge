const arrayToMap = (array, keyMap, keyValue) => {
    if (!(array instanceof Array) || !(keyValue instanceof Array)){
        throw Error('arrayToMap: array and keyValue attributes have to be an array')
    }
    else if (typeof(keyMap) !== 'string') throw Error('arrayToMap: keyMap attribute have to be a string')

    const map = {};
    const firstArray = array[0]

    if (typeof(firstArray) !== 'object' ||  (firstArray instanceof Array)) {
        throw Error('arrayToMap: array must be an object array')
    }
    else if(!firstArray[keyValue[0]]) throw Error('arrayToMap: keyValue does not exist in object')
    else if(!firstArray[keyMap]) throw Error('arrayToMap: keyMap does not exist in object')

    array.map((obj) => {
        map[obj[keyMap]] = obj[keyValue[0]];
    })
    return map;
}

export {
    arrayToMap
}