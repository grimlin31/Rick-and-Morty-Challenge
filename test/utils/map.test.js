import * as mapUtils from '../../src/utils/map.utils.js'
import Mock from '../Mock.js'
import _ from 'lodash';

const resultSimpleObject = {
    "Rick Sanchez": "Male",
    "Morty Smith": "Male",
    "Summer Smith": "Female",
    "Beth Smith": "Female",
    "Jerry Smith": "Male",
}

const array = Mock.result;

const errAttArray = 'arrayToMap: array and keyValue attributes have to be an array'
const errKeyMap = 'arrayToMap: keyMap attribute have to be a string'
const errNotObjArr = 'arrayToMap: array must be an object array'
const errKeyValueInObj = 'arrayToMap: keyValue does not exist in object'
const errKeyMapInObj = 'arrayToMap: keyMap does not exist in object'

describe('Happy Path', () => { 
    test('Create a map with key name and value gender', () => { 
        const newMap = mapUtils.arrayToMap(array, 'name', ['gender']);
        expect(_.isEqual(newMap, resultSimpleObject)).toBe(true)
    })
 })

describe('First attribute is not an array', () => { 
    test('first attribute is a number, should return an error', () => {
        try{
            mapUtils.arrayToMap(1, 'name', ['gender'])
        } catch(e) {
            expect(e.message).toBe(errAttArray)
        }
     })
    test('first attribute is a string, should return an error', () => {
        try{
            mapUtils.arrayToMap('new message', 'name', ['gender'])
        } catch(e) {
            expect(e.message).toBe(errAttArray)
        }
    })
    test('first attribute is a object, should return an error', () => {
        try{
            mapUtils.arrayToMap({}, 'name', ['gender'])
        } catch(e) {
            expect(e.message).toBe(errAttArray)
        }
    })
 })

 describe('Second attribute is not a string', () => { 
    test('Attribute keyMap is a number, should return an error', () => {
        try{
            mapUtils.arrayToMap(array, 1, ['gender'])
        } catch(e) {
            expect(e.message).toBe(errKeyMap)
        }
     })
    test('Attribute keyMap is a array, should return an error', () => {
        try{
            mapUtils.arrayToMap(array, [], ['gender'])
        } catch(e) {
            expect(e.message).toBe(errKeyMap)
        }
    })
    test('Attribute keyMap is a object, should return an error', () => {
        try{
            mapUtils.arrayToMap(array, {}, ['gender'])
        } catch(e) {
            expect(e.message).toBe(errKeyMap)
        }
    })
 })

 describe('Attribute keyValue is not an array', () => { 
    test('Attribute keyMap is a number, should return an error', () => {
        try{
            mapUtils.arrayToMap(array, 'name', 1)
        } catch(e) {
            expect(e.message).toBe(errAttArray)
        }
     })
    test('Attribute keyMap is a string, should return an error', () => {
        try{
            mapUtils.arrayToMap(array, 'name', 'gender')
        } catch(e) {
            expect(e.message).toBe(errAttArray)
        }
    })
    test('Attribute keyMap is a object, should return an error', () => {
        try{
            mapUtils.arrayToMap(array, 'name', {})
        } catch(e) {
            expect(e.message).toBe(errAttArray)
        }
    })
 })

 describe('Array does not contain object', () => { 
    test('Attribute array is a number array', () => { 
        try {
            mapUtils.arrayToMap([1,2,3,4], 'name', ['gender'])
        } catch (e) {
            expect(e.message).toBe(errNotObjArr);
        }
     })
    test('Attribute array is a n-Dimention array', () => { 
        try {
            mapUtils.arrayToMap([[1,2,3,4], [1,2,3,4]], 'name', ['gender'])
        } catch (e) {
            expect(e.message).toBe(errNotObjArr);
        }
     })
    test('Attribute array is a string array', () => { 
    try {
        mapUtils.arrayToMap(['1','2','3','4'], 'name', ['gender'])
    } catch (e) {
        expect(e.message).toBe(errNotObjArr);
    }
    })
  })

 describe('Keys do not exist in object', () => { 
    test('Attribute keyValue does not exist in object', () => { 
        try {
            mapUtils.arrayToMap(array, 'name', ['hola'])
        } catch(e) {
            expect(e.message).toBe(errKeyValueInObj)
        }
     })

    test('Attribute keyValue does not exist in object', () => { 
        try {
            mapUtils.arrayToMap(array, 'hola', ['gender'])
        } catch(e) {
            expect(e.message).toBe(errKeyMapInObj)
        }
    })
  })
