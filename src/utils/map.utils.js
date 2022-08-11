const arrayToMap = (array, keyMap, keyValue) => {
    const map = {};
    const firstArray = array[0]
    if(!firstArray[keyValue[0]]) return map;
    array.map((obj) => {
        map[obj[keyMap]] = obj[keyValue[0]];
    })
    return map;
}

export {
    arrayToMap
}