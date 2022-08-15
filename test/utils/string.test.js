import *  as stringUtils from '../../src/utils/string.utils.js'

describe('Happy Path', () => { 
    test('The phrase \'Hello, How are you ?\' has two \'e\'', () => { 
        expect(stringUtils.countCharInString('e', 'Hello, How are you ?')).toBe(2)
    })
    test('The phrase \'My weight is 130 kg\' has one 3', () => { 
        expect(stringUtils.countCharInString('3', 'My weight is 130 kg')).toBe(1)
    })
    test('The phrase \'My weight is 130 kg\' does not have \'a\'', () => { 
        expect(stringUtils.countCharInString('a', 'My weight is 130 kg')).toBe(0)
    })
 })

 describe('When pass wrong attribute to the function, it should return -1', () => { 
    // number
    test('char: number, phrase: string', () => { 
        expect(stringUtils.countCharInString(1, 'Hello, How are you ?')).toBe(-1)
     })
  
    test('char: string, phrase: number', () => {
        expect(stringUtils.countCharInString('e', 1234123213)).toBe(-1)
    })
  
    test('char: number, phrase: number', () => { 
        expect(stringUtils.countCharInString(1, 12312312)).toBe(-1)
    })

    //Array

    test('char: Array, phrase: string', () => { 
        expect(stringUtils.countCharInString([], 'Hello, How are you ?')).toBe(-1)
     })
  
    test('char: string, phrase: Array', () => {
        expect(stringUtils.countCharInString('e', [])).toBe(-1)
    })
  
    test('char: Array, phrase: Array', () => { 
        expect(stringUtils.countCharInString([], [12312312])).toBe(-1)
    })

    // Object

    test('char: Object, phrase: string', () => { 
        expect(stringUtils.countCharInString({}, 'Hello, How are you ?')).toBe(-1)
     })
  
    test('char: string, phrase: Object', () => {
        expect(stringUtils.countCharInString('e', {})).toBe(-1)
    })
  
    test('char: Object, phrase: Object', () => { 
        expect(stringUtils.countCharInString({}, {x: [12312312]})).toBe(-1)
    })
})
