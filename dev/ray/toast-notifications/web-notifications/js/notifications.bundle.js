/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/es-toolkit/dist/_internal/DOMException.js"
/*!********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/_internal/DOMException.js ***!
  \********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const globalThis = __webpack_require__(/*! ./globalThis.js */ "../../node_modules/es-toolkit/dist/_internal/globalThis.js");

const DOMException = typeof globalThis.globalThis.DOMException !== 'undefined'
    ? globalThis.globalThis.DOMException
    : Error;

exports.DOMException = DOMException;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/_internal/compareValues.js"
/*!*********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/_internal/compareValues.js ***!
  \*********************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function compareValues(a, b, order) {
    if (a < b) {
        return order === 'asc' ? -1 : 1;
    }
    if (a > b) {
        return order === 'asc' ? 1 : -1;
    }
    return 0;
}

exports.compareValues = compareValues;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/_internal/globalThis.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/_internal/globalThis.js ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const globalThis_ = (typeof globalThis === 'object' && globalThis) ||
    (typeof window === 'object' && window) ||
    (typeof self === 'object' && self) ||
    (typeof __webpack_require__.g === 'object' && __webpack_require__.g) ||
    (function () {
        return this;
    })() ||
    Function('return this')();

exports.globalThis = globalThis_;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/_internal/isEqualsSameValueZero.js"
/*!*****************************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/_internal/isEqualsSameValueZero.js ***!
  \*****************************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isEqualsSameValueZero(value, other) {
    return value === other || (Number.isNaN(value) && Number.isNaN(other));
}

exports.isEqualsSameValueZero = isEqualsSameValueZero;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/_internal/isUnsafeProperty.js"
/*!************************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/_internal/isUnsafeProperty.js ***!
  \************************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isUnsafeProperty(key) {
    return key === '__proto__';
}

exports.isUnsafeProperty = isUnsafeProperty;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/at.js"
/*!******************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/at.js ***!
  \******************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function at(arr, indices) {
    const result = new Array(indices.length);
    const length = arr.length;
    for (let i = 0; i < indices.length; i++) {
        let index = indices[i];
        index = Number.isInteger(index) ? index : Math.trunc(index) || 0;
        if (index < 0) {
            index += length;
        }
        result[i] = arr[index];
    }
    return result;
}

exports.at = at;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/chunk.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/chunk.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function chunk(arr, size) {
    if (!Number.isInteger(size) || size <= 0) {
        throw new Error('Size must be an integer greater than zero.');
    }
    const chunkLength = Math.ceil(arr.length / size);
    const result = Array(chunkLength);
    for (let index = 0; index < chunkLength; index++) {
        const start = index * size;
        const end = start + size;
        result[index] = arr.slice(start, end);
    }
    return result;
}

exports.chunk = chunk;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/compact.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/compact.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function compact(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item) {
            result.push(item);
        }
    }
    return result;
}

exports.compact = compact;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/countBy.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/countBy.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function countBy(arr, mapper) {
    const result = {};
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const key = mapper(item, i, arr);
        result[key] = (result[key] ?? 0) + 1;
    }
    return result;
}

exports.countBy = countBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/difference.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/difference.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function difference(firstArr, secondArr) {
    const secondSet = new Set(secondArr);
    return firstArr.filter(item => !secondSet.has(item));
}

exports.difference = difference;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/differenceBy.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/differenceBy.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function differenceBy(firstArr, secondArr, mapper) {
    const mappedSecondSet = new Set(secondArr.map(item => mapper(item)));
    return firstArr.filter(item => {
        return !mappedSecondSet.has(mapper(item));
    });
}

exports.differenceBy = differenceBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/differenceWith.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/differenceWith.js ***!
  \******************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function differenceWith(firstArr, secondArr, areItemsEqual) {
    return firstArr.filter(firstItem => {
        return secondArr.every(secondItem => {
            return !areItemsEqual(firstItem, secondItem);
        });
    });
}

exports.differenceWith = differenceWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/drop.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/drop.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function drop(arr, itemsCount) {
    itemsCount = Math.max(itemsCount, 0);
    return arr.slice(itemsCount);
}

exports.drop = drop;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/dropRight.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/dropRight.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function dropRight(arr, itemsCount) {
    itemsCount = Math.min(-itemsCount, 0);
    if (itemsCount === 0) {
        return arr.slice();
    }
    return arr.slice(0, itemsCount);
}

exports.dropRight = dropRight;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/dropRightWhile.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/dropRightWhile.js ***!
  \******************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function dropRightWhile(arr, canContinueDropping) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (!canContinueDropping(arr[i], i, arr)) {
            return arr.slice(0, i + 1);
        }
    }
    return [];
}

exports.dropRightWhile = dropRightWhile;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/dropWhile.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/dropWhile.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function dropWhile(arr, canContinueDropping) {
    const dropEndIndex = arr.findIndex((item, index, arr) => !canContinueDropping(item, index, arr));
    if (dropEndIndex === -1) {
        return [];
    }
    return arr.slice(dropEndIndex);
}

exports.dropWhile = dropWhile;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/fill.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/fill.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function fill(array, value, start = 0, end = array.length) {
    const length = array.length;
    const finalStart = Math.max(start >= 0 ? start : length + start, 0);
    const finalEnd = Math.min(end >= 0 ? end : length + end, length);
    for (let i = finalStart; i < finalEnd; i++) {
        array[i] = value;
    }
    return array;
}

exports.fill = fill;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/filterAsync.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/filterAsync.js ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const limitAsync = __webpack_require__(/*! ./limitAsync.js */ "../../node_modules/es-toolkit/dist/array/limitAsync.js");

async function filterAsync(array, predicate, options) {
    if (options?.concurrency != null) {
        predicate = limitAsync.limitAsync(predicate, options.concurrency);
    }
    const results = await Promise.all(array.map(predicate));
    return array.filter((_, index) => results[index]);
}

exports.filterAsync = filterAsync;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/flatMap.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/flatMap.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const flatten = __webpack_require__(/*! ./flatten.js */ "../../node_modules/es-toolkit/dist/array/flatten.js");

function flatMap(arr, iteratee, depth = 1) {
    return flatten.flatten(arr.map((item, index) => iteratee(item, index, arr)), depth);
}

exports.flatMap = flatMap;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/flatMapAsync.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/flatMapAsync.js ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const flatten = __webpack_require__(/*! ./flatten.js */ "../../node_modules/es-toolkit/dist/array/flatten.js");
const limitAsync = __webpack_require__(/*! ./limitAsync.js */ "../../node_modules/es-toolkit/dist/array/limitAsync.js");

async function flatMapAsync(array, callback, options) {
    if (options?.concurrency != null) {
        callback = limitAsync.limitAsync(callback, options.concurrency);
    }
    const results = await Promise.all(array.map(callback));
    return flatten.flatten(results);
}

exports.flatMapAsync = flatMapAsync;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/flatMapDeep.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/flatMapDeep.js ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const flattenDeep = __webpack_require__(/*! ./flattenDeep.js */ "../../node_modules/es-toolkit/dist/array/flattenDeep.js");

function flatMapDeep(arr, iteratee) {
    return flattenDeep.flattenDeep(arr.map((item, index) => iteratee(item, index, arr)));
}

exports.flatMapDeep = flatMapDeep;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/flatten.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/flatten.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function flatten(arr, depth = 1) {
    const result = [];
    const flooredDepth = Math.floor(depth);
    const recursive = (arr, currentDepth) => {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (Array.isArray(item) && currentDepth < flooredDepth) {
                recursive(item, currentDepth + 1);
            }
            else {
                result.push(item);
            }
        }
    };
    recursive(arr, 0);
    return result;
}

exports.flatten = flatten;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/flattenDeep.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/flattenDeep.js ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const flatten = __webpack_require__(/*! ./flatten.js */ "../../node_modules/es-toolkit/dist/array/flatten.js");

function flattenDeep(arr) {
    return flatten.flatten(arr, Infinity);
}

exports.flattenDeep = flattenDeep;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/forEachAsync.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/forEachAsync.js ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const limitAsync = __webpack_require__(/*! ./limitAsync.js */ "../../node_modules/es-toolkit/dist/array/limitAsync.js");

async function forEachAsync(array, callback, options) {
    if (options?.concurrency != null) {
        callback = limitAsync.limitAsync(callback, options.concurrency);
    }
    await Promise.all(array.map(callback));
}

exports.forEachAsync = forEachAsync;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/forEachRight.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/forEachRight.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function forEachRight(arr, callback) {
    for (let i = arr.length - 1; i >= 0; i--) {
        const element = arr[i];
        callback(element, i, arr);
    }
}

exports.forEachRight = forEachRight;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/groupBy.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/groupBy.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function groupBy(arr, getKeyFromItem) {
    const result = {};
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const key = getKeyFromItem(item, i, arr);
        if (!Object.hasOwn(result, key)) {
            result[key] = [];
        }
        result[key].push(item);
    }
    return result;
}

exports.groupBy = groupBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/head.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/head.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function head(arr) {
    return arr[0];
}

exports.head = head;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/initial.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/initial.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function initial(arr) {
    return arr.slice(0, -1);
}

exports.initial = initial;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/intersection.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/intersection.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function intersection(firstArr, secondArr) {
    const secondSet = new Set(secondArr);
    return firstArr.filter(item => secondSet.has(item));
}

exports.intersection = intersection;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/intersectionBy.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/intersectionBy.js ***!
  \******************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function intersectionBy(firstArr, secondArr, mapper) {
    const result = [];
    const mappedSecondSet = new Set(secondArr.map(mapper));
    for (let i = 0; i < firstArr.length; i++) {
        const item = firstArr[i];
        const mappedItem = mapper(item);
        if (mappedSecondSet.has(mappedItem)) {
            result.push(item);
            mappedSecondSet.delete(mappedItem);
        }
    }
    return result;
}

exports.intersectionBy = intersectionBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/intersectionWith.js"
/*!********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/intersectionWith.js ***!
  \********************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function intersectionWith(firstArr, secondArr, areItemsEqual) {
    return firstArr.filter(firstItem => {
        return secondArr.some(secondItem => {
            return areItemsEqual(firstItem, secondItem);
        });
    });
}

exports.intersectionWith = intersectionWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/isSubset.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/isSubset.js ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const difference = __webpack_require__(/*! ./difference.js */ "../../node_modules/es-toolkit/dist/array/difference.js");

function isSubset(superset, subset) {
    return difference.difference(subset, superset).length === 0;
}

exports.isSubset = isSubset;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/isSubsetWith.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/isSubsetWith.js ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const differenceWith = __webpack_require__(/*! ./differenceWith.js */ "../../node_modules/es-toolkit/dist/array/differenceWith.js");

function isSubsetWith(superset, subset, areItemsEqual) {
    return differenceWith.differenceWith(subset, superset, areItemsEqual).length === 0;
}

exports.isSubsetWith = isSubsetWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/keyBy.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/keyBy.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function keyBy(arr, getKeyFromItem) {
    const result = {};
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const key = getKeyFromItem(item, i, arr);
        result[key] = item;
    }
    return result;
}

exports.keyBy = keyBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/last.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/last.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function last(arr) {
    return arr[arr.length - 1];
}

exports.last = last;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/limitAsync.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/limitAsync.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const semaphore = __webpack_require__(/*! ../promise/semaphore.js */ "../../node_modules/es-toolkit/dist/promise/semaphore.js");

function limitAsync(callback, concurrency) {
    const semaphore$1 = new semaphore.Semaphore(concurrency);
    return async function (...args) {
        try {
            await semaphore$1.acquire();
            return await callback.apply(this, args);
        }
        finally {
            semaphore$1.release();
        }
    };
}

exports.limitAsync = limitAsync;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/mapAsync.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/mapAsync.js ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const limitAsync = __webpack_require__(/*! ./limitAsync.js */ "../../node_modules/es-toolkit/dist/array/limitAsync.js");

function mapAsync(array, callback, options) {
    if (options?.concurrency != null) {
        callback = limitAsync.limitAsync(callback, options.concurrency);
    }
    return Promise.all(array.map(callback));
}

exports.mapAsync = mapAsync;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/maxBy.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/maxBy.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function maxBy(items, getValue) {
    if (items.length === 0) {
        return undefined;
    }
    let maxElement = items[0];
    let max = getValue(maxElement, 0, items);
    for (let i = 1; i < items.length; i++) {
        const element = items[i];
        const value = getValue(element, i, items);
        if (value > max) {
            max = value;
            maxElement = element;
        }
    }
    return maxElement;
}

exports.maxBy = maxBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/minBy.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/minBy.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function minBy(items, getValue) {
    if (items.length === 0) {
        return undefined;
    }
    let minElement = items[0];
    let min = getValue(minElement, 0, items);
    for (let i = 1; i < items.length; i++) {
        const element = items[i];
        const value = getValue(element, i, items);
        if (value < min) {
            min = value;
            minElement = element;
        }
    }
    return minElement;
}

exports.minBy = minBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/orderBy.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/orderBy.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const compareValues = __webpack_require__(/*! ../_internal/compareValues.js */ "../../node_modules/es-toolkit/dist/_internal/compareValues.js");

function orderBy(arr, criteria, orders) {
    return arr.slice().sort((a, b) => {
        const ordersLength = orders.length;
        for (let i = 0; i < criteria.length; i++) {
            const order = ordersLength > i ? orders[i] : orders[ordersLength - 1];
            const criterion = criteria[i];
            const criterionIsFunction = typeof criterion === 'function';
            const valueA = criterionIsFunction ? criterion(a) : a[criterion];
            const valueB = criterionIsFunction ? criterion(b) : b[criterion];
            const result = compareValues.compareValues(valueA, valueB, order);
            if (result !== 0) {
                return result;
            }
        }
        return 0;
    });
}

exports.orderBy = orderBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/partition.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/partition.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function partition(arr, isInTruthy) {
    const truthy = [];
    const falsy = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (isInTruthy(item, i, arr)) {
            truthy.push(item);
        }
        else {
            falsy.push(item);
        }
    }
    return [truthy, falsy];
}

exports.partition = partition;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/pull.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/pull.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function pull(arr, valuesToRemove) {
    const valuesSet = new Set(valuesToRemove);
    let resultIndex = 0;
    for (let i = 0; i < arr.length; i++) {
        if (valuesSet.has(arr[i])) {
            continue;
        }
        if (!Object.hasOwn(arr, i)) {
            delete arr[resultIndex++];
            continue;
        }
        arr[resultIndex++] = arr[i];
    }
    arr.length = resultIndex;
    return arr;
}

exports.pull = pull;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/pullAt.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/pullAt.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const at = __webpack_require__(/*! ./at.js */ "../../node_modules/es-toolkit/dist/array/at.js");

function pullAt(arr, indicesToRemove) {
    const removed = at.at(arr, indicesToRemove);
    const indices = new Set(indicesToRemove.slice().sort((x, y) => y - x));
    for (const index of indices) {
        arr.splice(index, 1);
    }
    return removed;
}

exports.pullAt = pullAt;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/reduceAsync.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/reduceAsync.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

async function reduceAsync(array, reducer, initialValue) {
    let startIndex = 0;
    if (initialValue == null) {
        initialValue = array[0];
        startIndex = 1;
    }
    let accumulator = initialValue;
    for (let i = startIndex; i < array.length; i++) {
        accumulator = await reducer(accumulator, array[i], i, array);
    }
    return accumulator;
}

exports.reduceAsync = reduceAsync;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/remove.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/remove.js ***!
  \**********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function remove(arr, shouldRemoveElement) {
    const originalArr = arr.slice();
    const removed = [];
    let resultIndex = 0;
    for (let i = 0; i < arr.length; i++) {
        if (shouldRemoveElement(arr[i], i, originalArr)) {
            removed.push(arr[i]);
            continue;
        }
        if (!Object.hasOwn(arr, i)) {
            delete arr[resultIndex++];
            continue;
        }
        arr[resultIndex++] = arr[i];
    }
    arr.length = resultIndex;
    return removed;
}

exports.remove = remove;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/sample.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/sample.js ***!
  \**********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function sample(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

exports.sample = sample;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/sampleSize.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/sampleSize.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const randomInt = __webpack_require__(/*! ../math/randomInt.js */ "../../node_modules/es-toolkit/dist/math/randomInt.js");

function sampleSize(array, size) {
    if (size > array.length) {
        throw new Error('Size must be less than or equal to the length of array.');
    }
    const result = new Array(size);
    const selected = new Set();
    for (let step = array.length - size, resultIndex = 0; step < array.length; step++, resultIndex++) {
        let index = randomInt.randomInt(0, step + 1);
        if (selected.has(index)) {
            index = step;
        }
        selected.add(index);
        result[resultIndex] = array[index];
    }
    return result;
}

exports.sampleSize = sampleSize;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/shuffle.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/shuffle.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function shuffle(arr) {
    const result = arr.slice();
    for (let i = result.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

exports.shuffle = shuffle;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/sortBy.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/sortBy.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const orderBy = __webpack_require__(/*! ./orderBy.js */ "../../node_modules/es-toolkit/dist/array/orderBy.js");

function sortBy(arr, criteria) {
    return orderBy.orderBy(arr, criteria, ['asc']);
}

exports.sortBy = sortBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/tail.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/tail.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function tail(arr) {
    return arr.slice(1);
}

exports.tail = tail;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/take.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/take.js ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const toInteger = __webpack_require__(/*! ../compat/util/toInteger.js */ "../../node_modules/es-toolkit/dist/compat/util/toInteger.js");

function take(arr, count, guard) {
    count = guard || count === undefined ? 1 : toInteger.toInteger(count);
    return arr.slice(0, count);
}

exports.take = take;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/takeRight.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/takeRight.js ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const toInteger = __webpack_require__(/*! ../compat/util/toInteger.js */ "../../node_modules/es-toolkit/dist/compat/util/toInteger.js");

function takeRight(arr, count, guard) {
    count = guard || count === undefined ? 1 : toInteger.toInteger(count);
    if (count <= 0 || arr.length === 0) {
        return [];
    }
    return arr.slice(-count);
}

exports.takeRight = takeRight;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/takeRightWhile.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/takeRightWhile.js ***!
  \******************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function takeRightWhile(arr, shouldContinueTaking) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (!shouldContinueTaking(arr[i], i, arr)) {
            return arr.slice(i + 1);
        }
    }
    return arr.slice();
}

exports.takeRightWhile = takeRightWhile;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/takeWhile.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/takeWhile.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function takeWhile(arr, shouldContinueTaking) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (!shouldContinueTaking(item, i, arr)) {
            break;
        }
        result.push(item);
    }
    return result;
}

exports.takeWhile = takeWhile;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/toFilled.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/toFilled.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function toFilled(arr, value, start = 0, end = arr.length) {
    const length = arr.length;
    const finalStart = Math.max(start >= 0 ? start : length + start, 0);
    const finalEnd = Math.min(end >= 0 ? end : length + end, length);
    const newArr = arr.slice();
    for (let i = finalStart; i < finalEnd; i++) {
        newArr[i] = value;
    }
    return newArr;
}

exports.toFilled = toFilled;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/union.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/union.js ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const uniq = __webpack_require__(/*! ./uniq.js */ "../../node_modules/es-toolkit/dist/array/uniq.js");

function union(arr1, arr2) {
    return uniq.uniq(arr1.concat(arr2));
}

exports.union = union;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/unionBy.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/unionBy.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const uniqBy = __webpack_require__(/*! ./uniqBy.js */ "../../node_modules/es-toolkit/dist/array/uniqBy.js");

function unionBy(arr1, arr2, mapper) {
    return uniqBy.uniqBy(arr1.concat(arr2), mapper);
}

exports.unionBy = unionBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/unionWith.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/unionWith.js ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const uniqWith = __webpack_require__(/*! ./uniqWith.js */ "../../node_modules/es-toolkit/dist/array/uniqWith.js");

function unionWith(arr1, arr2, areItemsEqual) {
    return uniqWith.uniqWith(arr1.concat(arr2), areItemsEqual);
}

exports.unionWith = unionWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/uniq.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/uniq.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function uniq(arr) {
    return [...new Set(arr)];
}

exports.uniq = uniq;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/uniqBy.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/uniqBy.js ***!
  \**********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function uniqBy(arr, mapper) {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const key = mapper(item, i, arr);
        if (!map.has(key)) {
            map.set(key, item);
        }
    }
    return Array.from(map.values());
}

exports.uniqBy = uniqBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/uniqWith.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/uniqWith.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function uniqWith(arr, areItemsEqual) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const isUniq = result.every(v => !areItemsEqual(v, item));
        if (isUniq) {
            result.push(item);
        }
    }
    return result;
}

exports.uniqWith = uniqWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/unzip.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/unzip.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function unzip(zipped) {
    let maxLen = 0;
    for (let i = 0; i < zipped.length; i++) {
        if (zipped[i].length > maxLen) {
            maxLen = zipped[i].length;
        }
    }
    const result = new Array(maxLen);
    for (let i = 0; i < maxLen; i++) {
        result[i] = new Array(zipped.length);
        for (let j = 0; j < zipped.length; j++) {
            result[i][j] = zipped[j][i];
        }
    }
    return result;
}

exports.unzip = unzip;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/unzipWith.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/unzipWith.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function unzipWith(target, iteratee) {
    const maxLength = Math.max(...target.map(innerArray => innerArray.length));
    const result = new Array(maxLength);
    for (let i = 0; i < maxLength; i++) {
        const group = new Array(target.length);
        for (let j = 0; j < target.length; j++) {
            group[j] = target[j][i];
        }
        result[i] = iteratee(...group);
    }
    return result;
}

exports.unzipWith = unzipWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/windowed.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/windowed.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function windowed(arr, size, step = 1, { partialWindows = false } = {}) {
    if (size <= 0 || !Number.isInteger(size)) {
        throw new Error('Size must be a positive integer.');
    }
    if (step <= 0 || !Number.isInteger(step)) {
        throw new Error('Step must be a positive integer.');
    }
    const result = [];
    const end = partialWindows ? arr.length : arr.length - size + 1;
    for (let i = 0; i < end; i += step) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

exports.windowed = windowed;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/without.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/without.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const difference = __webpack_require__(/*! ./difference.js */ "../../node_modules/es-toolkit/dist/array/difference.js");

function without(array, ...values) {
    return difference.difference(array, values);
}

exports.without = without;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/xor.js"
/*!*******************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/xor.js ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const difference = __webpack_require__(/*! ./difference.js */ "../../node_modules/es-toolkit/dist/array/difference.js");
const intersection = __webpack_require__(/*! ./intersection.js */ "../../node_modules/es-toolkit/dist/array/intersection.js");
const union = __webpack_require__(/*! ./union.js */ "../../node_modules/es-toolkit/dist/array/union.js");

function xor(arr1, arr2) {
    return difference.difference(union.union(arr1, arr2), intersection.intersection(arr1, arr2));
}

exports.xor = xor;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/xorBy.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/xorBy.js ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const differenceBy = __webpack_require__(/*! ./differenceBy.js */ "../../node_modules/es-toolkit/dist/array/differenceBy.js");
const intersectionBy = __webpack_require__(/*! ./intersectionBy.js */ "../../node_modules/es-toolkit/dist/array/intersectionBy.js");
const unionBy = __webpack_require__(/*! ./unionBy.js */ "../../node_modules/es-toolkit/dist/array/unionBy.js");

function xorBy(arr1, arr2, mapper) {
    const union = unionBy.unionBy(arr1, arr2, mapper);
    const intersection = intersectionBy.intersectionBy(arr1, arr2, mapper);
    return differenceBy.differenceBy(union, intersection, mapper);
}

exports.xorBy = xorBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/xorWith.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/xorWith.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const differenceWith = __webpack_require__(/*! ./differenceWith.js */ "../../node_modules/es-toolkit/dist/array/differenceWith.js");
const intersectionWith = __webpack_require__(/*! ./intersectionWith.js */ "../../node_modules/es-toolkit/dist/array/intersectionWith.js");
const unionWith = __webpack_require__(/*! ./unionWith.js */ "../../node_modules/es-toolkit/dist/array/unionWith.js");

function xorWith(arr1, arr2, areElementsEqual) {
    const union = unionWith.unionWith(arr1, arr2, areElementsEqual);
    const intersection = intersectionWith.intersectionWith(arr1, arr2, areElementsEqual);
    return differenceWith.differenceWith(union, intersection, areElementsEqual);
}

exports.xorWith = xorWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/zip.js"
/*!*******************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/zip.js ***!
  \*******************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function zip(...arrs) {
    let rowCount = 0;
    for (let i = 0; i < arrs.length; i++) {
        if (arrs[i].length > rowCount) {
            rowCount = arrs[i].length;
        }
    }
    const columnCount = arrs.length;
    const result = Array(rowCount);
    for (let i = 0; i < rowCount; ++i) {
        const row = Array(columnCount);
        for (let j = 0; j < columnCount; ++j) {
            row[j] = arrs[j][i];
        }
        result[i] = row;
    }
    return result;
}

exports.zip = zip;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/zipObject.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/zipObject.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function zipObject(keys, values) {
    const result = {};
    for (let i = 0; i < keys.length; i++) {
        result[keys[i]] = values[i];
    }
    return result;
}

exports.zipObject = zipObject;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/zipWith.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/zipWith.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function zipWith(arr1, ...rest) {
    const arrs = [arr1, ...rest.slice(0, -1)];
    const combine = rest[rest.length - 1];
    const maxIndex = Math.max(...arrs.map(arr => arr.length));
    const result = Array(maxIndex);
    for (let i = 0; i < maxIndex; i++) {
        const elements = arrs.map(arr => arr[i]);
        result[i] = combine(...elements, i);
    }
    return result;
}

exports.zipWith = zipWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/_internal/getSymbols.js"
/*!*************************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/_internal/getSymbols.js ***!
  \*************************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function getSymbols(object) {
    return Object.getOwnPropertySymbols(object).filter(symbol => Object.prototype.propertyIsEnumerable.call(object, symbol));
}

exports.getSymbols = getSymbols;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/_internal/getTag.js"
/*!*********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/_internal/getTag.js ***!
  \*********************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return Object.prototype.toString.call(value);
}

exports.getTag = getTag;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/_internal/tags.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/_internal/tags.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const numberTag = '[object Number]';
const booleanTag = '[object Boolean]';
const argumentsTag = '[object Arguments]';
const symbolTag = '[object Symbol]';
const dateTag = '[object Date]';
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const functionTag = '[object Function]';
const arrayBufferTag = '[object ArrayBuffer]';
const objectTag = '[object Object]';
const errorTag = '[object Error]';
const dataViewTag = '[object DataView]';
const uint8ArrayTag = '[object Uint8Array]';
const uint8ClampedArrayTag = '[object Uint8ClampedArray]';
const uint16ArrayTag = '[object Uint16Array]';
const uint32ArrayTag = '[object Uint32Array]';
const bigUint64ArrayTag = '[object BigUint64Array]';
const int8ArrayTag = '[object Int8Array]';
const int16ArrayTag = '[object Int16Array]';
const int32ArrayTag = '[object Int32Array]';
const bigInt64ArrayTag = '[object BigInt64Array]';
const float32ArrayTag = '[object Float32Array]';
const float64ArrayTag = '[object Float64Array]';

exports.argumentsTag = argumentsTag;
exports.arrayBufferTag = arrayBufferTag;
exports.arrayTag = arrayTag;
exports.bigInt64ArrayTag = bigInt64ArrayTag;
exports.bigUint64ArrayTag = bigUint64ArrayTag;
exports.booleanTag = booleanTag;
exports.dataViewTag = dataViewTag;
exports.dateTag = dateTag;
exports.errorTag = errorTag;
exports.float32ArrayTag = float32ArrayTag;
exports.float64ArrayTag = float64ArrayTag;
exports.functionTag = functionTag;
exports.int16ArrayTag = int16ArrayTag;
exports.int32ArrayTag = int32ArrayTag;
exports.int8ArrayTag = int8ArrayTag;
exports.mapTag = mapTag;
exports.numberTag = numberTag;
exports.objectTag = objectTag;
exports.regexpTag = regexpTag;
exports.setTag = setTag;
exports.stringTag = stringTag;
exports.symbolTag = symbolTag;
exports.uint16ArrayTag = uint16ArrayTag;
exports.uint32ArrayTag = uint32ArrayTag;
exports.uint8ArrayTag = uint8ArrayTag;
exports.uint8ClampedArrayTag = uint8ClampedArrayTag;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/predicate/isArray.js"
/*!**********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/predicate/isArray.js ***!
  \**********************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isArray(value) {
    return Array.isArray(value);
}

exports.isArray = isArray;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/predicate/isPlainObject.js"
/*!****************************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/predicate/isPlainObject.js ***!
  \****************************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isPlainObject(object) {
    if (typeof object !== 'object') {
        return false;
    }
    if (object == null) {
        return false;
    }
    if (Object.getPrototypeOf(object) === null) {
        return true;
    }
    if (Object.prototype.toString.call(object) !== '[object Object]') {
        const tag = object[Symbol.toStringTag];
        if (tag == null) {
            return false;
        }
        const isTagReadonly = !Object.getOwnPropertyDescriptor(object, Symbol.toStringTag)?.writable;
        if (isTagReadonly) {
            return false;
        }
        return object.toString() === `[object ${tag}]`;
    }
    let proto = object;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(object) === proto;
}

exports.isPlainObject = isPlainObject;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/predicate/isSymbol.js"
/*!***********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/predicate/isSymbol.js ***!
  \***********************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isSymbol(value) {
    return typeof value === 'symbol' || value instanceof Symbol;
}

exports.isSymbol = isSymbol;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/util/toFinite.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/util/toFinite.js ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const toNumber = __webpack_require__(/*! ./toNumber.js */ "../../node_modules/es-toolkit/dist/compat/util/toNumber.js");

function toFinite(value) {
    if (!value) {
        return value === 0 ? value : 0;
    }
    value = toNumber.toNumber(value);
    if (value === Infinity || value === -Infinity) {
        const sign = value < 0 ? -1 : 1;
        return sign * Number.MAX_VALUE;
    }
    return value === value ? value : 0;
}

exports.toFinite = toFinite;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/util/toInteger.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/util/toInteger.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const toFinite = __webpack_require__(/*! ./toFinite.js */ "../../node_modules/es-toolkit/dist/compat/util/toFinite.js");

function toInteger(value) {
    const finite = toFinite.toFinite(value);
    const remainder = finite % 1;
    return remainder ? finite - remainder : finite;
}

exports.toInteger = toInteger;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/util/toNumber.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/util/toNumber.js ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const isSymbol = __webpack_require__(/*! ../predicate/isSymbol.js */ "../../node_modules/es-toolkit/dist/compat/predicate/isSymbol.js");

function toNumber(value) {
    if (isSymbol.isSymbol(value)) {
        return NaN;
    }
    return Number(value);
}

exports.toNumber = toNumber;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/error/AbortError.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/error/AbortError.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const DOMException = __webpack_require__(/*! ../_internal/DOMException.js */ "../../node_modules/es-toolkit/dist/_internal/DOMException.js");

class AbortError extends DOMException.DOMException {
    constructor(message = 'The operation was aborted') {
        super(message);
    }
}

exports.AbortError = AbortError;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/error/TimeoutError.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/error/TimeoutError.js ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const DOMException = __webpack_require__(/*! ../_internal/DOMException.js */ "../../node_modules/es-toolkit/dist/_internal/DOMException.js");

class TimeoutError extends DOMException.DOMException {
    constructor(message = 'The operation was timed out') {
        super(message);
    }
}

exports.TimeoutError = TimeoutError;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/after.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/after.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function after(n, func) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error(`n must be a non-negative integer.`);
    }
    let counter = 0;
    return (...args) => {
        if (++counter >= n) {
            return func(...args);
        }
        return undefined;
    };
}

exports.after = after;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/ary.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/ary.js ***!
  \**********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function ary(func, n) {
    return function (...args) {
        return func.apply(this, args.slice(0, n));
    };
}

exports.ary = ary;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/asyncNoop.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/asyncNoop.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

async function asyncNoop() { }

exports.asyncNoop = asyncNoop;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/before.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/before.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function before(n, func) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error('n must be a non-negative integer.');
    }
    let counter = 0;
    return (...args) => {
        if (++counter < n) {
            return func(...args);
        }
        return undefined;
    };
}

exports.before = before;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/curry.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/curry.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function curry(func) {
    if (func.length === 0 || func.length === 1) {
        return func;
    }
    return function (arg) {
        return makeCurry(func, func.length, [arg]);
    };
}
function makeCurry(origin, argsLength, args) {
    if (args.length === argsLength) {
        return origin(...args);
    }
    else {
        const next = function (arg) {
            return makeCurry(origin, argsLength, [...args, arg]);
        };
        return next;
    }
}

exports.curry = curry;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/curryRight.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/curryRight.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function curryRight(func) {
    if (func.length === 0 || func.length === 1) {
        return func;
    }
    return function (arg) {
        return makeCurryRight(func, func.length, [arg]);
    };
}
function makeCurryRight(origin, argsLength, args) {
    if (args.length === argsLength) {
        return origin(...args);
    }
    else {
        const next = function (arg) {
            return makeCurryRight(origin, argsLength, [arg, ...args]);
        };
        return next;
    }
}

exports.curryRight = curryRight;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/debounce.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/debounce.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function debounce(func, debounceMs, { signal, edges } = {}) {
    let pendingThis = undefined;
    let pendingArgs = null;
    const leading = edges != null && edges.includes('leading');
    const trailing = edges == null || edges.includes('trailing');
    const invoke = () => {
        if (pendingArgs !== null) {
            func.apply(pendingThis, pendingArgs);
            pendingThis = undefined;
            pendingArgs = null;
        }
    };
    const onTimerEnd = () => {
        if (trailing) {
            invoke();
        }
        cancel();
    };
    let timeoutId = null;
    const schedule = () => {
        if (timeoutId != null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            timeoutId = null;
            onTimerEnd();
        }, debounceMs);
    };
    const cancelTimer = () => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    };
    const cancel = () => {
        cancelTimer();
        pendingThis = undefined;
        pendingArgs = null;
    };
    const flush = () => {
        invoke();
    };
    const debounced = function (...args) {
        if (signal?.aborted) {
            return;
        }
        pendingThis = this;
        pendingArgs = args;
        const isFirstCall = timeoutId == null;
        schedule();
        if (leading && isFirstCall) {
            invoke();
        }
    };
    debounced.schedule = schedule;
    debounced.cancel = cancel;
    debounced.flush = flush;
    signal?.addEventListener('abort', cancel, { once: true });
    return debounced;
}

exports.debounce = debounce;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/flow.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/flow.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function flow(...funcs) {
    return function (...args) {
        let result = funcs.length ? funcs[0].apply(this, args) : args[0];
        for (let i = 1; i < funcs.length; i++) {
            result = funcs[i].call(this, result);
        }
        return result;
    };
}

exports.flow = flow;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/flowRight.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/flowRight.js ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const flow = __webpack_require__(/*! ./flow.js */ "../../node_modules/es-toolkit/dist/function/flow.js");

function flowRight(...funcs) {
    return flow.flow(...funcs.reverse());
}

exports.flowRight = flowRight;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/identity.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/identity.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function identity(x) {
    return x;
}

exports.identity = identity;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/memoize.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/memoize.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function memoize(fn, options = {}) {
    const { cache = new Map(), getCacheKey } = options;
    const memoizedFn = function (arg) {
        const key = getCacheKey ? getCacheKey(arg) : arg;
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.call(this, arg);
        cache.set(key, result);
        return result;
    };
    memoizedFn.cache = cache;
    return memoizedFn;
}

exports.memoize = memoize;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/negate.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/negate.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function negate(func) {
    return ((...args) => !func(...args));
}

exports.negate = negate;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/noop.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/noop.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function noop() { }

exports.noop = noop;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/once.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/once.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function once(func) {
    let called = false;
    let cache;
    return function (...args) {
        if (!called) {
            called = true;
            cache = func(...args);
        }
        return cache;
    };
}

exports.once = once;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/partial.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/partial.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function partial(func, ...partialArgs) {
    return partialImpl(func, placeholderSymbol, ...partialArgs);
}
function partialImpl(func, placeholder, ...partialArgs) {
    const partialed = function (...providedArgs) {
        let providedArgsIndex = 0;
        const substitutedArgs = partialArgs
            .slice()
            .map(arg => (arg === placeholder ? providedArgs[providedArgsIndex++] : arg));
        const remainingArgs = providedArgs.slice(providedArgsIndex);
        return func.apply(this, substitutedArgs.concat(remainingArgs));
    };
    if (func.prototype) {
        partialed.prototype = Object.create(func.prototype);
    }
    return partialed;
}
const placeholderSymbol = Symbol('partial.placeholder');
partial.placeholder = placeholderSymbol;

exports.partial = partial;
exports.partialImpl = partialImpl;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/partialRight.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/partialRight.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function partialRight(func, ...partialArgs) {
    return partialRightImpl(func, placeholderSymbol, ...partialArgs);
}
function partialRightImpl(func, placeholder, ...partialArgs) {
    const partialedRight = function (...providedArgs) {
        const placeholderLength = partialArgs.filter(arg => arg === placeholder).length;
        const rangeLength = Math.max(providedArgs.length - placeholderLength, 0);
        const remainingArgs = providedArgs.slice(0, rangeLength);
        let providedArgsIndex = rangeLength;
        const substitutedArgs = partialArgs
            .slice()
            .map(arg => (arg === placeholder ? providedArgs[providedArgsIndex++] : arg));
        return func.apply(this, remainingArgs.concat(substitutedArgs));
    };
    if (func.prototype) {
        partialedRight.prototype = Object.create(func.prototype);
    }
    return partialedRight;
}
const placeholderSymbol = Symbol('partialRight.placeholder');
partialRight.placeholder = placeholderSymbol;

exports.partialRight = partialRight;
exports.partialRightImpl = partialRightImpl;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/rest.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/rest.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function rest(func, startIndex = func.length - 1) {
    return function (...args) {
        const rest = args.slice(startIndex);
        const params = args.slice(0, startIndex);
        while (params.length < startIndex) {
            params.push(undefined);
        }
        return func.apply(this, [...params, rest]);
    };
}

exports.rest = rest;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/retry.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/retry.js ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const delay = __webpack_require__(/*! ../promise/delay.js */ "../../node_modules/es-toolkit/dist/promise/delay.js");

const DEFAULT_DELAY = 0;
const DEFAULT_RETRIES = Number.POSITIVE_INFINITY;
const DEFAULT_SHOULD_RETRY = () => true;
async function retry(func, _options) {
    let delay$1;
    let retries;
    let signal;
    let shouldRetry;
    if (typeof _options === 'number') {
        delay$1 = DEFAULT_DELAY;
        retries = _options;
        signal = undefined;
        shouldRetry = DEFAULT_SHOULD_RETRY;
    }
    else {
        delay$1 = _options?.delay ?? DEFAULT_DELAY;
        retries = _options?.retries ?? DEFAULT_RETRIES;
        signal = _options?.signal;
        shouldRetry = _options?.shouldRetry ?? DEFAULT_SHOULD_RETRY;
    }
    let error;
    for (let attempts = 0; attempts <= retries; attempts++) {
        if (signal?.aborted) {
            throw error ?? new Error(`The retry operation was aborted due to an abort signal.`);
        }
        try {
            return await func();
        }
        catch (err) {
            error = err;
            if (!shouldRetry(err, attempts)) {
                throw err;
            }
            const currentDelay = typeof delay$1 === 'function' ? delay$1(attempts) : delay$1;
            await delay.delay(currentDelay);
        }
    }
    throw error;
}

exports.retry = retry;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/spread.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/spread.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function spread(func) {
    return function (argsArr) {
        return func.apply(this, argsArr);
    };
}

exports.spread = spread;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/throttle.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/throttle.js ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const debounce = __webpack_require__(/*! ./debounce.js */ "../../node_modules/es-toolkit/dist/function/debounce.js");

function throttle(func, throttleMs, { signal, edges = ['leading', 'trailing'] } = {}) {
    let pendingAt = null;
    const debounced = debounce.debounce(function (...args) {
        pendingAt = Date.now();
        func.apply(this, args);
    }, throttleMs, { signal, edges });
    const throttled = function (...args) {
        if (pendingAt == null) {
            pendingAt = Date.now();
        }
        if (Date.now() - pendingAt >= throttleMs) {
            pendingAt = Date.now();
            func.apply(this, args);
            debounced.cancel();
            debounced.schedule();
            return;
        }
        debounced.apply(this, args);
    };
    throttled.cancel = debounced.cancel;
    throttled.flush = debounced.flush;
    return throttled;
}

exports.throttle = throttle;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/unary.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/unary.js ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const ary = __webpack_require__(/*! ./ary.js */ "../../node_modules/es-toolkit/dist/function/ary.js");

function unary(func) {
    return ary.ary(func, 1);
}

exports.unary = unary;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/index.js"
/*!***************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/index.js ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const at = __webpack_require__(/*! ./array/at.js */ "../../node_modules/es-toolkit/dist/array/at.js");
const chunk = __webpack_require__(/*! ./array/chunk.js */ "../../node_modules/es-toolkit/dist/array/chunk.js");
const compact = __webpack_require__(/*! ./array/compact.js */ "../../node_modules/es-toolkit/dist/array/compact.js");
const countBy = __webpack_require__(/*! ./array/countBy.js */ "../../node_modules/es-toolkit/dist/array/countBy.js");
const difference = __webpack_require__(/*! ./array/difference.js */ "../../node_modules/es-toolkit/dist/array/difference.js");
const differenceBy = __webpack_require__(/*! ./array/differenceBy.js */ "../../node_modules/es-toolkit/dist/array/differenceBy.js");
const differenceWith = __webpack_require__(/*! ./array/differenceWith.js */ "../../node_modules/es-toolkit/dist/array/differenceWith.js");
const drop = __webpack_require__(/*! ./array/drop.js */ "../../node_modules/es-toolkit/dist/array/drop.js");
const dropRight = __webpack_require__(/*! ./array/dropRight.js */ "../../node_modules/es-toolkit/dist/array/dropRight.js");
const dropRightWhile = __webpack_require__(/*! ./array/dropRightWhile.js */ "../../node_modules/es-toolkit/dist/array/dropRightWhile.js");
const dropWhile = __webpack_require__(/*! ./array/dropWhile.js */ "../../node_modules/es-toolkit/dist/array/dropWhile.js");
const fill = __webpack_require__(/*! ./array/fill.js */ "../../node_modules/es-toolkit/dist/array/fill.js");
const filterAsync = __webpack_require__(/*! ./array/filterAsync.js */ "../../node_modules/es-toolkit/dist/array/filterAsync.js");
const flatMap = __webpack_require__(/*! ./array/flatMap.js */ "../../node_modules/es-toolkit/dist/array/flatMap.js");
const flatMapAsync = __webpack_require__(/*! ./array/flatMapAsync.js */ "../../node_modules/es-toolkit/dist/array/flatMapAsync.js");
const flatMapDeep = __webpack_require__(/*! ./array/flatMapDeep.js */ "../../node_modules/es-toolkit/dist/array/flatMapDeep.js");
const flatten = __webpack_require__(/*! ./array/flatten.js */ "../../node_modules/es-toolkit/dist/array/flatten.js");
const flattenDeep = __webpack_require__(/*! ./array/flattenDeep.js */ "../../node_modules/es-toolkit/dist/array/flattenDeep.js");
const forEachAsync = __webpack_require__(/*! ./array/forEachAsync.js */ "../../node_modules/es-toolkit/dist/array/forEachAsync.js");
const forEachRight = __webpack_require__(/*! ./array/forEachRight.js */ "../../node_modules/es-toolkit/dist/array/forEachRight.js");
const groupBy = __webpack_require__(/*! ./array/groupBy.js */ "../../node_modules/es-toolkit/dist/array/groupBy.js");
const head = __webpack_require__(/*! ./array/head.js */ "../../node_modules/es-toolkit/dist/array/head.js");
const initial = __webpack_require__(/*! ./array/initial.js */ "../../node_modules/es-toolkit/dist/array/initial.js");
const intersection = __webpack_require__(/*! ./array/intersection.js */ "../../node_modules/es-toolkit/dist/array/intersection.js");
const intersectionBy = __webpack_require__(/*! ./array/intersectionBy.js */ "../../node_modules/es-toolkit/dist/array/intersectionBy.js");
const intersectionWith = __webpack_require__(/*! ./array/intersectionWith.js */ "../../node_modules/es-toolkit/dist/array/intersectionWith.js");
const isSubset = __webpack_require__(/*! ./array/isSubset.js */ "../../node_modules/es-toolkit/dist/array/isSubset.js");
const isSubsetWith = __webpack_require__(/*! ./array/isSubsetWith.js */ "../../node_modules/es-toolkit/dist/array/isSubsetWith.js");
const keyBy = __webpack_require__(/*! ./array/keyBy.js */ "../../node_modules/es-toolkit/dist/array/keyBy.js");
const last = __webpack_require__(/*! ./array/last.js */ "../../node_modules/es-toolkit/dist/array/last.js");
const limitAsync = __webpack_require__(/*! ./array/limitAsync.js */ "../../node_modules/es-toolkit/dist/array/limitAsync.js");
const mapAsync = __webpack_require__(/*! ./array/mapAsync.js */ "../../node_modules/es-toolkit/dist/array/mapAsync.js");
const maxBy = __webpack_require__(/*! ./array/maxBy.js */ "../../node_modules/es-toolkit/dist/array/maxBy.js");
const minBy = __webpack_require__(/*! ./array/minBy.js */ "../../node_modules/es-toolkit/dist/array/minBy.js");
const orderBy = __webpack_require__(/*! ./array/orderBy.js */ "../../node_modules/es-toolkit/dist/array/orderBy.js");
const partition = __webpack_require__(/*! ./array/partition.js */ "../../node_modules/es-toolkit/dist/array/partition.js");
const pull = __webpack_require__(/*! ./array/pull.js */ "../../node_modules/es-toolkit/dist/array/pull.js");
const pullAt = __webpack_require__(/*! ./array/pullAt.js */ "../../node_modules/es-toolkit/dist/array/pullAt.js");
const reduceAsync = __webpack_require__(/*! ./array/reduceAsync.js */ "../../node_modules/es-toolkit/dist/array/reduceAsync.js");
const remove = __webpack_require__(/*! ./array/remove.js */ "../../node_modules/es-toolkit/dist/array/remove.js");
const sample = __webpack_require__(/*! ./array/sample.js */ "../../node_modules/es-toolkit/dist/array/sample.js");
const sampleSize = __webpack_require__(/*! ./array/sampleSize.js */ "../../node_modules/es-toolkit/dist/array/sampleSize.js");
const shuffle = __webpack_require__(/*! ./array/shuffle.js */ "../../node_modules/es-toolkit/dist/array/shuffle.js");
const sortBy = __webpack_require__(/*! ./array/sortBy.js */ "../../node_modules/es-toolkit/dist/array/sortBy.js");
const tail = __webpack_require__(/*! ./array/tail.js */ "../../node_modules/es-toolkit/dist/array/tail.js");
const take = __webpack_require__(/*! ./array/take.js */ "../../node_modules/es-toolkit/dist/array/take.js");
const takeRight = __webpack_require__(/*! ./array/takeRight.js */ "../../node_modules/es-toolkit/dist/array/takeRight.js");
const takeRightWhile = __webpack_require__(/*! ./array/takeRightWhile.js */ "../../node_modules/es-toolkit/dist/array/takeRightWhile.js");
const takeWhile = __webpack_require__(/*! ./array/takeWhile.js */ "../../node_modules/es-toolkit/dist/array/takeWhile.js");
const toFilled = __webpack_require__(/*! ./array/toFilled.js */ "../../node_modules/es-toolkit/dist/array/toFilled.js");
const union = __webpack_require__(/*! ./array/union.js */ "../../node_modules/es-toolkit/dist/array/union.js");
const unionBy = __webpack_require__(/*! ./array/unionBy.js */ "../../node_modules/es-toolkit/dist/array/unionBy.js");
const unionWith = __webpack_require__(/*! ./array/unionWith.js */ "../../node_modules/es-toolkit/dist/array/unionWith.js");
const uniq = __webpack_require__(/*! ./array/uniq.js */ "../../node_modules/es-toolkit/dist/array/uniq.js");
const uniqBy = __webpack_require__(/*! ./array/uniqBy.js */ "../../node_modules/es-toolkit/dist/array/uniqBy.js");
const uniqWith = __webpack_require__(/*! ./array/uniqWith.js */ "../../node_modules/es-toolkit/dist/array/uniqWith.js");
const unzip = __webpack_require__(/*! ./array/unzip.js */ "../../node_modules/es-toolkit/dist/array/unzip.js");
const unzipWith = __webpack_require__(/*! ./array/unzipWith.js */ "../../node_modules/es-toolkit/dist/array/unzipWith.js");
const windowed = __webpack_require__(/*! ./array/windowed.js */ "../../node_modules/es-toolkit/dist/array/windowed.js");
const without = __webpack_require__(/*! ./array/without.js */ "../../node_modules/es-toolkit/dist/array/without.js");
const xor = __webpack_require__(/*! ./array/xor.js */ "../../node_modules/es-toolkit/dist/array/xor.js");
const xorBy = __webpack_require__(/*! ./array/xorBy.js */ "../../node_modules/es-toolkit/dist/array/xorBy.js");
const xorWith = __webpack_require__(/*! ./array/xorWith.js */ "../../node_modules/es-toolkit/dist/array/xorWith.js");
const zip = __webpack_require__(/*! ./array/zip.js */ "../../node_modules/es-toolkit/dist/array/zip.js");
const zipObject = __webpack_require__(/*! ./array/zipObject.js */ "../../node_modules/es-toolkit/dist/array/zipObject.js");
const zipWith = __webpack_require__(/*! ./array/zipWith.js */ "../../node_modules/es-toolkit/dist/array/zipWith.js");
const AbortError = __webpack_require__(/*! ./error/AbortError.js */ "../../node_modules/es-toolkit/dist/error/AbortError.js");
const TimeoutError = __webpack_require__(/*! ./error/TimeoutError.js */ "../../node_modules/es-toolkit/dist/error/TimeoutError.js");
const after = __webpack_require__(/*! ./function/after.js */ "../../node_modules/es-toolkit/dist/function/after.js");
const ary = __webpack_require__(/*! ./function/ary.js */ "../../node_modules/es-toolkit/dist/function/ary.js");
const asyncNoop = __webpack_require__(/*! ./function/asyncNoop.js */ "../../node_modules/es-toolkit/dist/function/asyncNoop.js");
const before = __webpack_require__(/*! ./function/before.js */ "../../node_modules/es-toolkit/dist/function/before.js");
const curry = __webpack_require__(/*! ./function/curry.js */ "../../node_modules/es-toolkit/dist/function/curry.js");
const curryRight = __webpack_require__(/*! ./function/curryRight.js */ "../../node_modules/es-toolkit/dist/function/curryRight.js");
const debounce = __webpack_require__(/*! ./function/debounce.js */ "../../node_modules/es-toolkit/dist/function/debounce.js");
const flow = __webpack_require__(/*! ./function/flow.js */ "../../node_modules/es-toolkit/dist/function/flow.js");
const flowRight = __webpack_require__(/*! ./function/flowRight.js */ "../../node_modules/es-toolkit/dist/function/flowRight.js");
const identity = __webpack_require__(/*! ./function/identity.js */ "../../node_modules/es-toolkit/dist/function/identity.js");
const memoize = __webpack_require__(/*! ./function/memoize.js */ "../../node_modules/es-toolkit/dist/function/memoize.js");
const negate = __webpack_require__(/*! ./function/negate.js */ "../../node_modules/es-toolkit/dist/function/negate.js");
const noop = __webpack_require__(/*! ./function/noop.js */ "../../node_modules/es-toolkit/dist/function/noop.js");
const once = __webpack_require__(/*! ./function/once.js */ "../../node_modules/es-toolkit/dist/function/once.js");
const partial = __webpack_require__(/*! ./function/partial.js */ "../../node_modules/es-toolkit/dist/function/partial.js");
const partialRight = __webpack_require__(/*! ./function/partialRight.js */ "../../node_modules/es-toolkit/dist/function/partialRight.js");
const rest = __webpack_require__(/*! ./function/rest.js */ "../../node_modules/es-toolkit/dist/function/rest.js");
const retry = __webpack_require__(/*! ./function/retry.js */ "../../node_modules/es-toolkit/dist/function/retry.js");
const spread = __webpack_require__(/*! ./function/spread.js */ "../../node_modules/es-toolkit/dist/function/spread.js");
const throttle = __webpack_require__(/*! ./function/throttle.js */ "../../node_modules/es-toolkit/dist/function/throttle.js");
const unary = __webpack_require__(/*! ./function/unary.js */ "../../node_modules/es-toolkit/dist/function/unary.js");
const clamp = __webpack_require__(/*! ./math/clamp.js */ "../../node_modules/es-toolkit/dist/math/clamp.js");
const inRange = __webpack_require__(/*! ./math/inRange.js */ "../../node_modules/es-toolkit/dist/math/inRange.js");
const mean = __webpack_require__(/*! ./math/mean.js */ "../../node_modules/es-toolkit/dist/math/mean.js");
const meanBy = __webpack_require__(/*! ./math/meanBy.js */ "../../node_modules/es-toolkit/dist/math/meanBy.js");
const median = __webpack_require__(/*! ./math/median.js */ "../../node_modules/es-toolkit/dist/math/median.js");
const medianBy = __webpack_require__(/*! ./math/medianBy.js */ "../../node_modules/es-toolkit/dist/math/medianBy.js");
const random = __webpack_require__(/*! ./math/random.js */ "../../node_modules/es-toolkit/dist/math/random.js");
const randomInt = __webpack_require__(/*! ./math/randomInt.js */ "../../node_modules/es-toolkit/dist/math/randomInt.js");
const range = __webpack_require__(/*! ./math/range.js */ "../../node_modules/es-toolkit/dist/math/range.js");
const rangeRight = __webpack_require__(/*! ./math/rangeRight.js */ "../../node_modules/es-toolkit/dist/math/rangeRight.js");
const round = __webpack_require__(/*! ./math/round.js */ "../../node_modules/es-toolkit/dist/math/round.js");
const sum = __webpack_require__(/*! ./math/sum.js */ "../../node_modules/es-toolkit/dist/math/sum.js");
const sumBy = __webpack_require__(/*! ./math/sumBy.js */ "../../node_modules/es-toolkit/dist/math/sumBy.js");
const clone = __webpack_require__(/*! ./object/clone.js */ "../../node_modules/es-toolkit/dist/object/clone.js");
const cloneDeep = __webpack_require__(/*! ./object/cloneDeep.js */ "../../node_modules/es-toolkit/dist/object/cloneDeep.js");
const cloneDeepWith = __webpack_require__(/*! ./object/cloneDeepWith.js */ "../../node_modules/es-toolkit/dist/object/cloneDeepWith.js");
const findKey = __webpack_require__(/*! ./object/findKey.js */ "../../node_modules/es-toolkit/dist/object/findKey.js");
const flattenObject = __webpack_require__(/*! ./object/flattenObject.js */ "../../node_modules/es-toolkit/dist/object/flattenObject.js");
const invert = __webpack_require__(/*! ./object/invert.js */ "../../node_modules/es-toolkit/dist/object/invert.js");
const mapKeys = __webpack_require__(/*! ./object/mapKeys.js */ "../../node_modules/es-toolkit/dist/object/mapKeys.js");
const mapValues = __webpack_require__(/*! ./object/mapValues.js */ "../../node_modules/es-toolkit/dist/object/mapValues.js");
const merge = __webpack_require__(/*! ./object/merge.js */ "../../node_modules/es-toolkit/dist/object/merge.js");
const mergeWith = __webpack_require__(/*! ./object/mergeWith.js */ "../../node_modules/es-toolkit/dist/object/mergeWith.js");
const omit = __webpack_require__(/*! ./object/omit.js */ "../../node_modules/es-toolkit/dist/object/omit.js");
const omitBy = __webpack_require__(/*! ./object/omitBy.js */ "../../node_modules/es-toolkit/dist/object/omitBy.js");
const pick = __webpack_require__(/*! ./object/pick.js */ "../../node_modules/es-toolkit/dist/object/pick.js");
const pickBy = __webpack_require__(/*! ./object/pickBy.js */ "../../node_modules/es-toolkit/dist/object/pickBy.js");
const toCamelCaseKeys = __webpack_require__(/*! ./object/toCamelCaseKeys.js */ "../../node_modules/es-toolkit/dist/object/toCamelCaseKeys.js");
const toMerged = __webpack_require__(/*! ./object/toMerged.js */ "../../node_modules/es-toolkit/dist/object/toMerged.js");
const toSnakeCaseKeys = __webpack_require__(/*! ./object/toSnakeCaseKeys.js */ "../../node_modules/es-toolkit/dist/object/toSnakeCaseKeys.js");
const isArrayBuffer = __webpack_require__(/*! ./predicate/isArrayBuffer.js */ "../../node_modules/es-toolkit/dist/predicate/isArrayBuffer.js");
const isBlob = __webpack_require__(/*! ./predicate/isBlob.js */ "../../node_modules/es-toolkit/dist/predicate/isBlob.js");
const isBoolean = __webpack_require__(/*! ./predicate/isBoolean.js */ "../../node_modules/es-toolkit/dist/predicate/isBoolean.js");
const isBrowser = __webpack_require__(/*! ./predicate/isBrowser.js */ "../../node_modules/es-toolkit/dist/predicate/isBrowser.js");
const isBuffer = __webpack_require__(/*! ./predicate/isBuffer.js */ "../../node_modules/es-toolkit/dist/predicate/isBuffer.js");
const isDate = __webpack_require__(/*! ./predicate/isDate.js */ "../../node_modules/es-toolkit/dist/predicate/isDate.js");
const isEmptyObject = __webpack_require__(/*! ./predicate/isEmptyObject.js */ "../../node_modules/es-toolkit/dist/predicate/isEmptyObject.js");
const isEqual = __webpack_require__(/*! ./predicate/isEqual.js */ "../../node_modules/es-toolkit/dist/predicate/isEqual.js");
const isEqualWith = __webpack_require__(/*! ./predicate/isEqualWith.js */ "../../node_modules/es-toolkit/dist/predicate/isEqualWith.js");
const isError = __webpack_require__(/*! ./predicate/isError.js */ "../../node_modules/es-toolkit/dist/predicate/isError.js");
const isFile = __webpack_require__(/*! ./predicate/isFile.js */ "../../node_modules/es-toolkit/dist/predicate/isFile.js");
const isFunction = __webpack_require__(/*! ./predicate/isFunction.js */ "../../node_modules/es-toolkit/dist/predicate/isFunction.js");
const isJSON = __webpack_require__(/*! ./predicate/isJSON.js */ "../../node_modules/es-toolkit/dist/predicate/isJSON.js");
const isJSONValue = __webpack_require__(/*! ./predicate/isJSONValue.js */ "../../node_modules/es-toolkit/dist/predicate/isJSONValue.js");
const isLength = __webpack_require__(/*! ./predicate/isLength.js */ "../../node_modules/es-toolkit/dist/predicate/isLength.js");
const isMap = __webpack_require__(/*! ./predicate/isMap.js */ "../../node_modules/es-toolkit/dist/predicate/isMap.js");
const isNil = __webpack_require__(/*! ./predicate/isNil.js */ "../../node_modules/es-toolkit/dist/predicate/isNil.js");
const isNode = __webpack_require__(/*! ./predicate/isNode.js */ "../../node_modules/es-toolkit/dist/predicate/isNode.js");
const isNotNil = __webpack_require__(/*! ./predicate/isNotNil.js */ "../../node_modules/es-toolkit/dist/predicate/isNotNil.js");
const isNull = __webpack_require__(/*! ./predicate/isNull.js */ "../../node_modules/es-toolkit/dist/predicate/isNull.js");
const isNumber = __webpack_require__(/*! ./predicate/isNumber.js */ "../../node_modules/es-toolkit/dist/predicate/isNumber.js");
const isPlainObject = __webpack_require__(/*! ./predicate/isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");
const isPrimitive = __webpack_require__(/*! ./predicate/isPrimitive.js */ "../../node_modules/es-toolkit/dist/predicate/isPrimitive.js");
const isPromise = __webpack_require__(/*! ./predicate/isPromise.js */ "../../node_modules/es-toolkit/dist/predicate/isPromise.js");
const isRegExp = __webpack_require__(/*! ./predicate/isRegExp.js */ "../../node_modules/es-toolkit/dist/predicate/isRegExp.js");
const isSet = __webpack_require__(/*! ./predicate/isSet.js */ "../../node_modules/es-toolkit/dist/predicate/isSet.js");
const isString = __webpack_require__(/*! ./predicate/isString.js */ "../../node_modules/es-toolkit/dist/predicate/isString.js");
const isSymbol = __webpack_require__(/*! ./predicate/isSymbol.js */ "../../node_modules/es-toolkit/dist/predicate/isSymbol.js");
const isTypedArray = __webpack_require__(/*! ./predicate/isTypedArray.js */ "../../node_modules/es-toolkit/dist/predicate/isTypedArray.js");
const isUndefined = __webpack_require__(/*! ./predicate/isUndefined.js */ "../../node_modules/es-toolkit/dist/predicate/isUndefined.js");
const isWeakMap = __webpack_require__(/*! ./predicate/isWeakMap.js */ "../../node_modules/es-toolkit/dist/predicate/isWeakMap.js");
const isWeakSet = __webpack_require__(/*! ./predicate/isWeakSet.js */ "../../node_modules/es-toolkit/dist/predicate/isWeakSet.js");
const delay = __webpack_require__(/*! ./promise/delay.js */ "../../node_modules/es-toolkit/dist/promise/delay.js");
const mutex = __webpack_require__(/*! ./promise/mutex.js */ "../../node_modules/es-toolkit/dist/promise/mutex.js");
const semaphore = __webpack_require__(/*! ./promise/semaphore.js */ "../../node_modules/es-toolkit/dist/promise/semaphore.js");
const timeout = __webpack_require__(/*! ./promise/timeout.js */ "../../node_modules/es-toolkit/dist/promise/timeout.js");
const withTimeout = __webpack_require__(/*! ./promise/withTimeout.js */ "../../node_modules/es-toolkit/dist/promise/withTimeout.js");
const camelCase = __webpack_require__(/*! ./string/camelCase.js */ "../../node_modules/es-toolkit/dist/string/camelCase.js");
const capitalize = __webpack_require__(/*! ./string/capitalize.js */ "../../node_modules/es-toolkit/dist/string/capitalize.js");
const constantCase = __webpack_require__(/*! ./string/constantCase.js */ "../../node_modules/es-toolkit/dist/string/constantCase.js");
const deburr = __webpack_require__(/*! ./string/deburr.js */ "../../node_modules/es-toolkit/dist/string/deburr.js");
const escape = __webpack_require__(/*! ./string/escape.js */ "../../node_modules/es-toolkit/dist/string/escape.js");
const escapeRegExp = __webpack_require__(/*! ./string/escapeRegExp.js */ "../../node_modules/es-toolkit/dist/string/escapeRegExp.js");
const kebabCase = __webpack_require__(/*! ./string/kebabCase.js */ "../../node_modules/es-toolkit/dist/string/kebabCase.js");
const lowerCase = __webpack_require__(/*! ./string/lowerCase.js */ "../../node_modules/es-toolkit/dist/string/lowerCase.js");
const lowerFirst = __webpack_require__(/*! ./string/lowerFirst.js */ "../../node_modules/es-toolkit/dist/string/lowerFirst.js");
const pad = __webpack_require__(/*! ./string/pad.js */ "../../node_modules/es-toolkit/dist/string/pad.js");
const pascalCase = __webpack_require__(/*! ./string/pascalCase.js */ "../../node_modules/es-toolkit/dist/string/pascalCase.js");
const reverseString = __webpack_require__(/*! ./string/reverseString.js */ "../../node_modules/es-toolkit/dist/string/reverseString.js");
const snakeCase = __webpack_require__(/*! ./string/snakeCase.js */ "../../node_modules/es-toolkit/dist/string/snakeCase.js");
const startCase = __webpack_require__(/*! ./string/startCase.js */ "../../node_modules/es-toolkit/dist/string/startCase.js");
const trim = __webpack_require__(/*! ./string/trim.js */ "../../node_modules/es-toolkit/dist/string/trim.js");
const trimEnd = __webpack_require__(/*! ./string/trimEnd.js */ "../../node_modules/es-toolkit/dist/string/trimEnd.js");
const trimStart = __webpack_require__(/*! ./string/trimStart.js */ "../../node_modules/es-toolkit/dist/string/trimStart.js");
const unescape = __webpack_require__(/*! ./string/unescape.js */ "../../node_modules/es-toolkit/dist/string/unescape.js");
const upperCase = __webpack_require__(/*! ./string/upperCase.js */ "../../node_modules/es-toolkit/dist/string/upperCase.js");
const upperFirst = __webpack_require__(/*! ./string/upperFirst.js */ "../../node_modules/es-toolkit/dist/string/upperFirst.js");
const words = __webpack_require__(/*! ./string/words.js */ "../../node_modules/es-toolkit/dist/string/words.js");
const attempt = __webpack_require__(/*! ./util/attempt.js */ "../../node_modules/es-toolkit/dist/util/attempt.js");
const attemptAsync = __webpack_require__(/*! ./util/attemptAsync.js */ "../../node_modules/es-toolkit/dist/util/attemptAsync.js");
const invariant = __webpack_require__(/*! ./util/invariant.js */ "../../node_modules/es-toolkit/dist/util/invariant.js");



exports.at = at.at;
exports.chunk = chunk.chunk;
exports.compact = compact.compact;
exports.countBy = countBy.countBy;
exports.difference = difference.difference;
exports.differenceBy = differenceBy.differenceBy;
exports.differenceWith = differenceWith.differenceWith;
exports.drop = drop.drop;
exports.dropRight = dropRight.dropRight;
exports.dropRightWhile = dropRightWhile.dropRightWhile;
exports.dropWhile = dropWhile.dropWhile;
exports.fill = fill.fill;
exports.filterAsync = filterAsync.filterAsync;
exports.flatMap = flatMap.flatMap;
exports.flatMapAsync = flatMapAsync.flatMapAsync;
exports.flatMapDeep = flatMapDeep.flatMapDeep;
exports.flatten = flatten.flatten;
exports.flattenDeep = flattenDeep.flattenDeep;
exports.forEachAsync = forEachAsync.forEachAsync;
exports.forEachRight = forEachRight.forEachRight;
exports.groupBy = groupBy.groupBy;
exports.head = head.head;
exports.initial = initial.initial;
exports.intersection = intersection.intersection;
exports.intersectionBy = intersectionBy.intersectionBy;
exports.intersectionWith = intersectionWith.intersectionWith;
exports.isSubset = isSubset.isSubset;
exports.isSubsetWith = isSubsetWith.isSubsetWith;
exports.keyBy = keyBy.keyBy;
exports.last = last.last;
exports.limitAsync = limitAsync.limitAsync;
exports.mapAsync = mapAsync.mapAsync;
exports.maxBy = maxBy.maxBy;
exports.minBy = minBy.minBy;
exports.orderBy = orderBy.orderBy;
exports.partition = partition.partition;
exports.pull = pull.pull;
exports.pullAt = pullAt.pullAt;
exports.reduceAsync = reduceAsync.reduceAsync;
exports.remove = remove.remove;
exports.sample = sample.sample;
exports.sampleSize = sampleSize.sampleSize;
exports.shuffle = shuffle.shuffle;
exports.sortBy = sortBy.sortBy;
exports.tail = tail.tail;
exports.take = take.take;
exports.takeRight = takeRight.takeRight;
exports.takeRightWhile = takeRightWhile.takeRightWhile;
exports.takeWhile = takeWhile.takeWhile;
exports.toFilled = toFilled.toFilled;
exports.union = union.union;
exports.unionBy = unionBy.unionBy;
exports.unionWith = unionWith.unionWith;
exports.uniq = uniq.uniq;
exports.uniqBy = uniqBy.uniqBy;
exports.uniqWith = uniqWith.uniqWith;
exports.unzip = unzip.unzip;
exports.unzipWith = unzipWith.unzipWith;
exports.windowed = windowed.windowed;
exports.without = without.without;
exports.xor = xor.xor;
exports.xorBy = xorBy.xorBy;
exports.xorWith = xorWith.xorWith;
exports.zip = zip.zip;
exports.zipObject = zipObject.zipObject;
exports.zipWith = zipWith.zipWith;
exports.AbortError = AbortError.AbortError;
exports.TimeoutError = TimeoutError.TimeoutError;
exports.after = after.after;
exports.ary = ary.ary;
exports.asyncNoop = asyncNoop.asyncNoop;
exports.before = before.before;
exports.curry = curry.curry;
exports.curryRight = curryRight.curryRight;
exports.debounce = debounce.debounce;
exports.flow = flow.flow;
exports.flowRight = flowRight.flowRight;
exports.identity = identity.identity;
exports.memoize = memoize.memoize;
exports.negate = negate.negate;
exports.noop = noop.noop;
exports.once = once.once;
exports.partial = partial.partial;
exports.partialRight = partialRight.partialRight;
exports.rest = rest.rest;
exports.retry = retry.retry;
exports.spread = spread.spread;
exports.throttle = throttle.throttle;
exports.unary = unary.unary;
exports.clamp = clamp.clamp;
exports.inRange = inRange.inRange;
exports.mean = mean.mean;
exports.meanBy = meanBy.meanBy;
exports.median = median.median;
exports.medianBy = medianBy.medianBy;
exports.random = random.random;
exports.randomInt = randomInt.randomInt;
exports.range = range.range;
exports.rangeRight = rangeRight.rangeRight;
exports.round = round.round;
exports.sum = sum.sum;
exports.sumBy = sumBy.sumBy;
exports.clone = clone.clone;
exports.cloneDeep = cloneDeep.cloneDeep;
exports.cloneDeepWith = cloneDeepWith.cloneDeepWith;
exports.findKey = findKey.findKey;
exports.flattenObject = flattenObject.flattenObject;
exports.invert = invert.invert;
exports.mapKeys = mapKeys.mapKeys;
exports.mapValues = mapValues.mapValues;
exports.merge = merge.merge;
exports.mergeWith = mergeWith.mergeWith;
exports.omit = omit.omit;
exports.omitBy = omitBy.omitBy;
exports.pick = pick.pick;
exports.pickBy = pickBy.pickBy;
exports.toCamelCaseKeys = toCamelCaseKeys.toCamelCaseKeys;
exports.toMerged = toMerged.toMerged;
exports.toSnakeCaseKeys = toSnakeCaseKeys.toSnakeCaseKeys;
exports.isArrayBuffer = isArrayBuffer.isArrayBuffer;
exports.isBlob = isBlob.isBlob;
exports.isBoolean = isBoolean.isBoolean;
exports.isBrowser = isBrowser.isBrowser;
exports.isBuffer = isBuffer.isBuffer;
exports.isDate = isDate.isDate;
exports.isEmptyObject = isEmptyObject.isEmptyObject;
exports.isEqual = isEqual.isEqual;
exports.isEqualWith = isEqualWith.isEqualWith;
exports.isError = isError.isError;
exports.isFile = isFile.isFile;
exports.isFunction = isFunction.isFunction;
exports.isJSON = isJSON.isJSON;
exports.isJSONArray = isJSONValue.isJSONArray;
exports.isJSONObject = isJSONValue.isJSONObject;
exports.isJSONValue = isJSONValue.isJSONValue;
exports.isLength = isLength.isLength;
exports.isMap = isMap.isMap;
exports.isNil = isNil.isNil;
exports.isNode = isNode.isNode;
exports.isNotNil = isNotNil.isNotNil;
exports.isNull = isNull.isNull;
exports.isNumber = isNumber.isNumber;
exports.isPlainObject = isPlainObject.isPlainObject;
exports.isPrimitive = isPrimitive.isPrimitive;
exports.isPromise = isPromise.isPromise;
exports.isRegExp = isRegExp.isRegExp;
exports.isSet = isSet.isSet;
exports.isString = isString.isString;
exports.isSymbol = isSymbol.isSymbol;
exports.isTypedArray = isTypedArray.isTypedArray;
exports.isUndefined = isUndefined.isUndefined;
exports.isWeakMap = isWeakMap.isWeakMap;
exports.isWeakSet = isWeakSet.isWeakSet;
exports.delay = delay.delay;
exports.Mutex = mutex.Mutex;
exports.Semaphore = semaphore.Semaphore;
exports.timeout = timeout.timeout;
exports.withTimeout = withTimeout.withTimeout;
exports.camelCase = camelCase.camelCase;
exports.capitalize = capitalize.capitalize;
exports.constantCase = constantCase.constantCase;
exports.deburr = deburr.deburr;
exports.escape = escape.escape;
exports.escapeRegExp = escapeRegExp.escapeRegExp;
exports.kebabCase = kebabCase.kebabCase;
exports.lowerCase = lowerCase.lowerCase;
exports.lowerFirst = lowerFirst.lowerFirst;
exports.pad = pad.pad;
exports.pascalCase = pascalCase.pascalCase;
exports.reverseString = reverseString.reverseString;
exports.snakeCase = snakeCase.snakeCase;
exports.startCase = startCase.startCase;
exports.trim = trim.trim;
exports.trimEnd = trimEnd.trimEnd;
exports.trimStart = trimStart.trimStart;
exports.unescape = unescape.unescape;
exports.upperCase = upperCase.upperCase;
exports.upperFirst = upperFirst.upperFirst;
exports.words = words.words;
exports.attempt = attempt.attempt;
exports.attemptAsync = attemptAsync.attemptAsync;
exports.assert = invariant.invariant;
exports.invariant = invariant.invariant;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/clamp.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/clamp.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function clamp(value, bound1, bound2) {
    if (bound2 == null) {
        return Math.min(value, bound1);
    }
    return Math.min(Math.max(value, bound1), bound2);
}

exports.clamp = clamp;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/inRange.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/inRange.js ***!
  \**********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function inRange(value, minimum, maximum) {
    if (maximum == null) {
        maximum = minimum;
        minimum = 0;
    }
    if (minimum >= maximum) {
        throw new Error('The maximum value must be greater than the minimum value.');
    }
    return minimum <= value && value < maximum;
}

exports.inRange = inRange;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/mean.js"
/*!*******************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/mean.js ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const sum = __webpack_require__(/*! ./sum.js */ "../../node_modules/es-toolkit/dist/math/sum.js");

function mean(nums) {
    return sum.sum(nums) / nums.length;
}

exports.mean = mean;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/meanBy.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/meanBy.js ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const sumBy = __webpack_require__(/*! ./sumBy.js */ "../../node_modules/es-toolkit/dist/math/sumBy.js");

function meanBy(items, getValue) {
    return sumBy.sumBy(items, item => getValue(item)) / items.length;
}

exports.meanBy = meanBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/median.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/median.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function median(nums) {
    if (nums.length === 0) {
        return NaN;
    }
    const sorted = nums.slice().sort((a, b) => a - b);
    const middleIndex = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[middleIndex - 1] + sorted[middleIndex]) / 2;
    }
    else {
        return sorted[middleIndex];
    }
}

exports.median = median;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/medianBy.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/medianBy.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const median = __webpack_require__(/*! ./median.js */ "../../node_modules/es-toolkit/dist/math/median.js");

function medianBy(items, getValue) {
    const nums = items.map(x => getValue(x));
    return median.median(nums);
}

exports.medianBy = medianBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/random.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/random.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function random(minimum, maximum) {
    if (maximum == null) {
        maximum = minimum;
        minimum = 0;
    }
    if (minimum >= maximum) {
        throw new Error('Invalid input: The maximum value must be greater than the minimum value.');
    }
    return Math.random() * (maximum - minimum) + minimum;
}

exports.random = random;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/randomInt.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/randomInt.js ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const random = __webpack_require__(/*! ./random.js */ "../../node_modules/es-toolkit/dist/math/random.js");

function randomInt(minimum, maximum) {
    return Math.floor(random.random(minimum, maximum));
}

exports.randomInt = randomInt;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/range.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/range.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function range(start, end, step = 1) {
    if (end == null) {
        end = start;
        start = 0;
    }
    if (!Number.isInteger(step) || step === 0) {
        throw new Error(`The step value must be a non-zero integer.`);
    }
    const length = Math.max(Math.ceil((end - start) / step), 0);
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
        result[i] = start + i * step;
    }
    return result;
}

exports.range = range;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/rangeRight.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/rangeRight.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function rangeRight(start, end, step = 1) {
    if (end == null) {
        end = start;
        start = 0;
    }
    if (!Number.isInteger(step) || step === 0) {
        throw new Error(`The step value must be a non-zero integer.`);
    }
    const length = Math.max(Math.ceil((end - start) / step), 0);
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
        result[i] = start + (length - i - 1) * step;
    }
    return result;
}

exports.rangeRight = rangeRight;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/round.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/round.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function round(value, precision = 0) {
    if (!Number.isInteger(precision)) {
        throw new Error('Precision must be an integer.');
    }
    const multiplier = Math.pow(10, precision);
    return Math.round(value * multiplier) / multiplier;
}

exports.round = round;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/sum.js"
/*!******************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/sum.js ***!
  \******************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function sum(nums) {
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
}

exports.sum = sum;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/sumBy.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/sumBy.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function sumBy(items, getValue) {
    let result = 0;
    for (let i = 0; i < items.length; i++) {
        result += getValue(items[i], i);
    }
    return result;
}

exports.sumBy = sumBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/clone.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/clone.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const isPrimitive = __webpack_require__(/*! ../predicate/isPrimitive.js */ "../../node_modules/es-toolkit/dist/predicate/isPrimitive.js");
const isTypedArray = __webpack_require__(/*! ../predicate/isTypedArray.js */ "../../node_modules/es-toolkit/dist/predicate/isTypedArray.js");

function clone(obj) {
    if (isPrimitive.isPrimitive(obj)) {
        return obj;
    }
    if (Array.isArray(obj) ||
        isTypedArray.isTypedArray(obj) ||
        obj instanceof ArrayBuffer ||
        (typeof SharedArrayBuffer !== 'undefined' && obj instanceof SharedArrayBuffer)) {
        return obj.slice(0);
    }
    const prototype = Object.getPrototypeOf(obj);
    if (prototype == null) {
        return Object.assign(Object.create(prototype), obj);
    }
    const Constructor = prototype.constructor;
    if (obj instanceof Date || obj instanceof Map || obj instanceof Set) {
        return new Constructor(obj);
    }
    if (obj instanceof RegExp) {
        const newRegExp = new Constructor(obj);
        newRegExp.lastIndex = obj.lastIndex;
        return newRegExp;
    }
    if (obj instanceof DataView) {
        return new Constructor(obj.buffer.slice(0));
    }
    if (obj instanceof Error) {
        let newError;
        if (obj instanceof AggregateError) {
            newError = new Constructor(obj.errors, obj.message, { cause: obj.cause });
        }
        else {
            newError = new Constructor(obj.message, { cause: obj.cause });
        }
        newError.stack = obj.stack;
        Object.assign(newError, obj);
        return newError;
    }
    if (typeof File !== 'undefined' && obj instanceof File) {
        const newFile = new Constructor([obj], obj.name, { type: obj.type, lastModified: obj.lastModified });
        return newFile;
    }
    if (typeof obj === 'object') {
        const newObject = Object.create(prototype);
        return Object.assign(newObject, obj);
    }
    return obj;
}

exports.clone = clone;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/cloneDeep.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/cloneDeep.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const cloneDeepWith = __webpack_require__(/*! ./cloneDeepWith.js */ "../../node_modules/es-toolkit/dist/object/cloneDeepWith.js");

function cloneDeep(obj) {
    return cloneDeepWith.cloneDeepWithImpl(obj, undefined, obj, new Map(), undefined);
}

exports.cloneDeep = cloneDeep;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/cloneDeepWith.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/cloneDeepWith.js ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const getSymbols = __webpack_require__(/*! ../compat/_internal/getSymbols.js */ "../../node_modules/es-toolkit/dist/compat/_internal/getSymbols.js");
const getTag = __webpack_require__(/*! ../compat/_internal/getTag.js */ "../../node_modules/es-toolkit/dist/compat/_internal/getTag.js");
const tags = __webpack_require__(/*! ../compat/_internal/tags.js */ "../../node_modules/es-toolkit/dist/compat/_internal/tags.js");
const isBuffer = __webpack_require__(/*! ../predicate/isBuffer.js */ "../../node_modules/es-toolkit/dist/predicate/isBuffer.js");
const isPrimitive = __webpack_require__(/*! ../predicate/isPrimitive.js */ "../../node_modules/es-toolkit/dist/predicate/isPrimitive.js");
const isTypedArray = __webpack_require__(/*! ../predicate/isTypedArray.js */ "../../node_modules/es-toolkit/dist/predicate/isTypedArray.js");

function cloneDeepWith(obj, cloneValue) {
    return cloneDeepWithImpl(obj, undefined, obj, new Map(), cloneValue);
}
function cloneDeepWithImpl(valueToClone, keyToClone, objectToClone, stack = new Map(), cloneValue = undefined) {
    const cloned = cloneValue?.(valueToClone, keyToClone, objectToClone, stack);
    if (cloned !== undefined) {
        return cloned;
    }
    if (isPrimitive.isPrimitive(valueToClone)) {
        return valueToClone;
    }
    if (stack.has(valueToClone)) {
        return stack.get(valueToClone);
    }
    if (Array.isArray(valueToClone)) {
        const result = new Array(valueToClone.length);
        stack.set(valueToClone, result);
        for (let i = 0; i < valueToClone.length; i++) {
            result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue);
        }
        if (Object.hasOwn(valueToClone, 'index')) {
            result.index = valueToClone.index;
        }
        if (Object.hasOwn(valueToClone, 'input')) {
            result.input = valueToClone.input;
        }
        return result;
    }
    if (valueToClone instanceof Date) {
        return new Date(valueToClone.getTime());
    }
    if (valueToClone instanceof RegExp) {
        const result = new RegExp(valueToClone.source, valueToClone.flags);
        result.lastIndex = valueToClone.lastIndex;
        return result;
    }
    if (valueToClone instanceof Map) {
        const result = new Map();
        stack.set(valueToClone, result);
        for (const [key, value] of valueToClone) {
            result.set(key, cloneDeepWithImpl(value, key, objectToClone, stack, cloneValue));
        }
        return result;
    }
    if (valueToClone instanceof Set) {
        const result = new Set();
        stack.set(valueToClone, result);
        for (const value of valueToClone) {
            result.add(cloneDeepWithImpl(value, undefined, objectToClone, stack, cloneValue));
        }
        return result;
    }
    if (isBuffer.isBuffer(valueToClone)) {
        return valueToClone.subarray();
    }
    if (isTypedArray.isTypedArray(valueToClone)) {
        const result = new (Object.getPrototypeOf(valueToClone).constructor)(valueToClone.length);
        stack.set(valueToClone, result);
        for (let i = 0; i < valueToClone.length; i++) {
            result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue);
        }
        return result;
    }
    if (valueToClone instanceof ArrayBuffer ||
        (typeof SharedArrayBuffer !== 'undefined' && valueToClone instanceof SharedArrayBuffer)) {
        return valueToClone.slice(0);
    }
    if (valueToClone instanceof DataView) {
        const result = new DataView(valueToClone.buffer.slice(0), valueToClone.byteOffset, valueToClone.byteLength);
        stack.set(valueToClone, result);
        copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
        return result;
    }
    if (typeof File !== 'undefined' && valueToClone instanceof File) {
        const result = new File([valueToClone], valueToClone.name, {
            type: valueToClone.type,
        });
        stack.set(valueToClone, result);
        copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
        return result;
    }
    if (typeof Blob !== 'undefined' && valueToClone instanceof Blob) {
        const result = new Blob([valueToClone], { type: valueToClone.type });
        stack.set(valueToClone, result);
        copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
        return result;
    }
    if (valueToClone instanceof Error) {
        const result = structuredClone(valueToClone);
        stack.set(valueToClone, result);
        result.message = valueToClone.message;
        result.name = valueToClone.name;
        result.stack = valueToClone.stack;
        result.cause = valueToClone.cause;
        result.constructor = valueToClone.constructor;
        copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
        return result;
    }
    if (valueToClone instanceof Boolean) {
        const result = new Boolean(valueToClone.valueOf());
        stack.set(valueToClone, result);
        copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
        return result;
    }
    if (valueToClone instanceof Number) {
        const result = new Number(valueToClone.valueOf());
        stack.set(valueToClone, result);
        copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
        return result;
    }
    if (valueToClone instanceof String) {
        const result = new String(valueToClone.valueOf());
        stack.set(valueToClone, result);
        copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
        return result;
    }
    if (typeof valueToClone === 'object' && isCloneableObject(valueToClone)) {
        const result = Object.create(Object.getPrototypeOf(valueToClone));
        stack.set(valueToClone, result);
        copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
        return result;
    }
    return valueToClone;
}
function copyProperties(target, source, objectToClone = target, stack, cloneValue) {
    const keys = [...Object.keys(source), ...getSymbols.getSymbols(source)];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const descriptor = Object.getOwnPropertyDescriptor(target, key);
        if (descriptor == null || descriptor.writable) {
            target[key] = cloneDeepWithImpl(source[key], key, objectToClone, stack, cloneValue);
        }
    }
}
function isCloneableObject(object) {
    switch (getTag.getTag(object)) {
        case tags.argumentsTag:
        case tags.arrayTag:
        case tags.arrayBufferTag:
        case tags.dataViewTag:
        case tags.booleanTag:
        case tags.dateTag:
        case tags.float32ArrayTag:
        case tags.float64ArrayTag:
        case tags.int8ArrayTag:
        case tags.int16ArrayTag:
        case tags.int32ArrayTag:
        case tags.mapTag:
        case tags.numberTag:
        case tags.objectTag:
        case tags.regexpTag:
        case tags.setTag:
        case tags.stringTag:
        case tags.symbolTag:
        case tags.uint8ArrayTag:
        case tags.uint8ClampedArrayTag:
        case tags.uint16ArrayTag:
        case tags.uint32ArrayTag: {
            return true;
        }
        default: {
            return false;
        }
    }
}

exports.cloneDeepWith = cloneDeepWith;
exports.cloneDeepWithImpl = cloneDeepWithImpl;
exports.copyProperties = copyProperties;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/findKey.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/findKey.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function findKey(obj, predicate) {
    const keys = Object.keys(obj);
    return keys.find(key => predicate(obj[key], key, obj));
}

exports.findKey = findKey;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/flattenObject.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/flattenObject.js ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const isPlainObject = __webpack_require__(/*! ../predicate/isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");

function flattenObject(object, { delimiter = '.' } = {}) {
    return flattenObjectImpl(object, '', delimiter);
}
function flattenObjectImpl(object, prefix, delimiter) {
    const result = {};
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = object[key];
        const prefixedKey = prefix ? `${prefix}${delimiter}${key}` : key;
        if (isPlainObject.isPlainObject(value) && Object.keys(value).length > 0) {
            Object.assign(result, flattenObjectImpl(value, prefixedKey, delimiter));
            continue;
        }
        if (Array.isArray(value) && value.length > 0) {
            Object.assign(result, flattenObjectImpl(value, prefixedKey, delimiter));
            continue;
        }
        result[prefixedKey] = value;
    }
    return result;
}

exports.flattenObject = flattenObject;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/invert.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/invert.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function invert(obj) {
    const result = {};
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = obj[key];
        result[value] = key;
    }
    return result;
}

exports.invert = invert;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/mapKeys.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/mapKeys.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function mapKeys(object, getNewKey) {
    const result = {};
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = object[key];
        result[getNewKey(value, key, object)] = value;
    }
    return result;
}

exports.mapKeys = mapKeys;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/mapValues.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/mapValues.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function mapValues(object, getNewValue) {
    const result = {};
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = object[key];
        result[key] = getNewValue(value, key, object);
    }
    return result;
}

exports.mapValues = mapValues;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/merge.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/merge.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const isUnsafeProperty = __webpack_require__(/*! ../_internal/isUnsafeProperty.js */ "../../node_modules/es-toolkit/dist/_internal/isUnsafeProperty.js");
const isPlainObject = __webpack_require__(/*! ../predicate/isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");

function merge(target, source) {
    const sourceKeys = Object.keys(source);
    for (let i = 0; i < sourceKeys.length; i++) {
        const key = sourceKeys[i];
        if (isUnsafeProperty.isUnsafeProperty(key)) {
            continue;
        }
        const sourceValue = source[key];
        const targetValue = target[key];
        if (isMergeableValue(sourceValue) && isMergeableValue(targetValue)) {
            target[key] = merge(targetValue, sourceValue);
        }
        else if (Array.isArray(sourceValue)) {
            target[key] = merge([], sourceValue);
        }
        else if (isPlainObject.isPlainObject(sourceValue)) {
            target[key] = merge({}, sourceValue);
        }
        else if (targetValue === undefined || sourceValue !== undefined) {
            target[key] = sourceValue;
        }
    }
    return target;
}
function isMergeableValue(value) {
    return isPlainObject.isPlainObject(value) || Array.isArray(value);
}

exports.merge = merge;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/mergeWith.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/mergeWith.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const isUnsafeProperty = __webpack_require__(/*! ../_internal/isUnsafeProperty.js */ "../../node_modules/es-toolkit/dist/_internal/isUnsafeProperty.js");
const isPlainObject = __webpack_require__(/*! ../predicate/isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");

function mergeWith(target, source, merge) {
    const sourceKeys = Object.keys(source);
    for (let i = 0; i < sourceKeys.length; i++) {
        const key = sourceKeys[i];
        if (isUnsafeProperty.isUnsafeProperty(key)) {
            continue;
        }
        const sourceValue = source[key];
        const targetValue = target[key];
        const merged = merge(targetValue, sourceValue, key, target, source);
        if (merged !== undefined) {
            target[key] = merged;
        }
        else if (Array.isArray(sourceValue)) {
            if (Array.isArray(targetValue)) {
                target[key] = mergeWith(targetValue, sourceValue, merge);
            }
            else {
                target[key] = mergeWith([], sourceValue, merge);
            }
        }
        else if (isPlainObject.isPlainObject(sourceValue)) {
            if (isPlainObject.isPlainObject(targetValue)) {
                target[key] = mergeWith(targetValue, sourceValue, merge);
            }
            else {
                target[key] = mergeWith({}, sourceValue, merge);
            }
        }
        else if (targetValue === undefined || sourceValue !== undefined) {
            target[key] = sourceValue;
        }
    }
    return target;
}

exports.mergeWith = mergeWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/omit.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/omit.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function omit(obj, keys) {
    const result = { ...obj };
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        delete result[key];
    }
    return result;
}

exports.omit = omit;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/omitBy.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/omitBy.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function omitBy(obj, shouldOmit) {
    const result = {};
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = obj[key];
        if (!shouldOmit(value, key)) {
            result[key] = value;
        }
    }
    return result;
}

exports.omitBy = omitBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/pick.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/pick.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function pick(obj, keys) {
    const result = {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (Object.hasOwn(obj, key)) {
            result[key] = obj[key];
        }
    }
    return result;
}

exports.pick = pick;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/pickBy.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/pickBy.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function pickBy(obj, shouldPick) {
    const result = {};
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = obj[key];
        if (shouldPick(value, key)) {
            result[key] = value;
        }
    }
    return result;
}

exports.pickBy = pickBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/toCamelCaseKeys.js"
/*!********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/toCamelCaseKeys.js ***!
  \********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const isArray = __webpack_require__(/*! ../compat/predicate/isArray.js */ "../../node_modules/es-toolkit/dist/compat/predicate/isArray.js");
const isPlainObject = __webpack_require__(/*! ../predicate/isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");
const camelCase = __webpack_require__(/*! ../string/camelCase.js */ "../../node_modules/es-toolkit/dist/string/camelCase.js");

function toCamelCaseKeys(obj) {
    if (isArray.isArray(obj)) {
        return obj.map(item => toCamelCaseKeys(item));
    }
    if (isPlainObject.isPlainObject(obj)) {
        const result = {};
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const camelKey = camelCase.camelCase(key);
            const convertedValue = toCamelCaseKeys(obj[key]);
            result[camelKey] = convertedValue;
        }
        return result;
    }
    return obj;
}

exports.toCamelCaseKeys = toCamelCaseKeys;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/toMerged.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/toMerged.js ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const clone = __webpack_require__(/*! ./clone.js */ "../../node_modules/es-toolkit/dist/object/clone.js");
const mergeWith = __webpack_require__(/*! ./mergeWith.js */ "../../node_modules/es-toolkit/dist/object/mergeWith.js");
const isPlainObject = __webpack_require__(/*! ../predicate/isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");

function toMerged(target, source) {
    return mergeWith.mergeWith(clone.clone(target), source, function mergeRecursively(targetValue, sourceValue) {
        if (Array.isArray(sourceValue)) {
            if (Array.isArray(targetValue)) {
                return mergeWith.mergeWith(clone.clone(targetValue), sourceValue, mergeRecursively);
            }
            else {
                return mergeWith.mergeWith([], sourceValue, mergeRecursively);
            }
        }
        else if (isPlainObject.isPlainObject(sourceValue)) {
            if (isPlainObject.isPlainObject(targetValue)) {
                return mergeWith.mergeWith(clone.clone(targetValue), sourceValue, mergeRecursively);
            }
            else {
                return mergeWith.mergeWith({}, sourceValue, mergeRecursively);
            }
        }
    });
}

exports.toMerged = toMerged;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/toSnakeCaseKeys.js"
/*!********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/toSnakeCaseKeys.js ***!
  \********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const isArray = __webpack_require__(/*! ../compat/predicate/isArray.js */ "../../node_modules/es-toolkit/dist/compat/predicate/isArray.js");
const isPlainObject = __webpack_require__(/*! ../compat/predicate/isPlainObject.js */ "../../node_modules/es-toolkit/dist/compat/predicate/isPlainObject.js");
const snakeCase = __webpack_require__(/*! ../string/snakeCase.js */ "../../node_modules/es-toolkit/dist/string/snakeCase.js");

function toSnakeCaseKeys(obj) {
    if (isArray.isArray(obj)) {
        return obj.map(item => toSnakeCaseKeys(item));
    }
    if (isPlainObject.isPlainObject(obj)) {
        const result = {};
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const snakeKey = snakeCase.snakeCase(key);
            const convertedValue = toSnakeCaseKeys(obj[key]);
            result[snakeKey] = convertedValue;
        }
        return result;
    }
    return obj;
}

exports.toSnakeCaseKeys = toSnakeCaseKeys;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isArrayBuffer.js"
/*!*********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isArrayBuffer.js ***!
  \*********************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isArrayBuffer(value) {
    return value instanceof ArrayBuffer;
}

exports.isArrayBuffer = isArrayBuffer;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isBlob.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isBlob.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isBlob(x) {
    if (typeof Blob === 'undefined') {
        return false;
    }
    return x instanceof Blob;
}

exports.isBlob = isBlob;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isBoolean.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isBoolean.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isBoolean(x) {
    return typeof x === 'boolean';
}

exports.isBoolean = isBoolean;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isBrowser.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isBrowser.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isBrowser() {
    return typeof window !== 'undefined' && window?.document != null;
}

exports.isBrowser = isBrowser;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isBuffer.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isBuffer.js ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const globalThis = __webpack_require__(/*! ../_internal/globalThis.js */ "../../node_modules/es-toolkit/dist/_internal/globalThis.js");

function isBuffer(x) {
    return typeof globalThis.globalThis.Buffer !== 'undefined' && globalThis.globalThis.Buffer.isBuffer(x);
}

exports.isBuffer = isBuffer;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isDate.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isDate.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isDate(value) {
    return value instanceof Date;
}

exports.isDate = isDate;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isEmptyObject.js"
/*!*********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isEmptyObject.js ***!
  \*********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const isPlainObject = __webpack_require__(/*! ./isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");

function isEmptyObject(value) {
    return isPlainObject.isPlainObject(value) && Object.keys(value).length === 0;
}

exports.isEmptyObject = isEmptyObject;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isEqual.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isEqual.js ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const isEqualWith = __webpack_require__(/*! ./isEqualWith.js */ "../../node_modules/es-toolkit/dist/predicate/isEqualWith.js");
const noop = __webpack_require__(/*! ../function/noop.js */ "../../node_modules/es-toolkit/dist/function/noop.js");

function isEqual(a, b) {
    return isEqualWith.isEqualWith(a, b, noop.noop);
}

exports.isEqual = isEqual;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isEqualWith.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isEqualWith.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const isBuffer = __webpack_require__(/*! ./isBuffer.js */ "../../node_modules/es-toolkit/dist/predicate/isBuffer.js");
const isPlainObject = __webpack_require__(/*! ./isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");
const getSymbols = __webpack_require__(/*! ../compat/_internal/getSymbols.js */ "../../node_modules/es-toolkit/dist/compat/_internal/getSymbols.js");
const getTag = __webpack_require__(/*! ../compat/_internal/getTag.js */ "../../node_modules/es-toolkit/dist/compat/_internal/getTag.js");
const tags = __webpack_require__(/*! ../compat/_internal/tags.js */ "../../node_modules/es-toolkit/dist/compat/_internal/tags.js");
const isEqualsSameValueZero = __webpack_require__(/*! ../_internal/isEqualsSameValueZero.js */ "../../node_modules/es-toolkit/dist/_internal/isEqualsSameValueZero.js");

function isEqualWith(a, b, areValuesEqual) {
    return isEqualWithImpl(a, b, undefined, undefined, undefined, undefined, areValuesEqual);
}
function isEqualWithImpl(a, b, property, aParent, bParent, stack, areValuesEqual) {
    const result = areValuesEqual(a, b, property, aParent, bParent, stack);
    if (result !== undefined) {
        return result;
    }
    if (typeof a === typeof b) {
        switch (typeof a) {
            case 'bigint':
            case 'string':
            case 'boolean':
            case 'symbol':
            case 'undefined': {
                return a === b;
            }
            case 'number': {
                return a === b || Object.is(a, b);
            }
            case 'function': {
                return a === b;
            }
            case 'object': {
                return areObjectsEqual(a, b, stack, areValuesEqual);
            }
        }
    }
    return areObjectsEqual(a, b, stack, areValuesEqual);
}
function areObjectsEqual(a, b, stack, areValuesEqual) {
    if (Object.is(a, b)) {
        return true;
    }
    let aTag = getTag.getTag(a);
    let bTag = getTag.getTag(b);
    if (aTag === tags.argumentsTag) {
        aTag = tags.objectTag;
    }
    if (bTag === tags.argumentsTag) {
        bTag = tags.objectTag;
    }
    if (aTag !== bTag) {
        return false;
    }
    switch (aTag) {
        case tags.stringTag:
            return a.toString() === b.toString();
        case tags.numberTag: {
            const x = a.valueOf();
            const y = b.valueOf();
            return isEqualsSameValueZero.isEqualsSameValueZero(x, y);
        }
        case tags.booleanTag:
        case tags.dateTag:
        case tags.symbolTag:
            return Object.is(a.valueOf(), b.valueOf());
        case tags.regexpTag: {
            return a.source === b.source && a.flags === b.flags;
        }
        case tags.functionTag: {
            return a === b;
        }
    }
    stack = stack ?? new Map();
    const aStack = stack.get(a);
    const bStack = stack.get(b);
    if (aStack != null && bStack != null) {
        return aStack === b;
    }
    stack.set(a, b);
    stack.set(b, a);
    try {
        switch (aTag) {
            case tags.mapTag: {
                if (a.size !== b.size) {
                    return false;
                }
                for (const [key, value] of a.entries()) {
                    if (!b.has(key) || !isEqualWithImpl(value, b.get(key), key, a, b, stack, areValuesEqual)) {
                        return false;
                    }
                }
                return true;
            }
            case tags.setTag: {
                if (a.size !== b.size) {
                    return false;
                }
                const aValues = Array.from(a.values());
                const bValues = Array.from(b.values());
                for (let i = 0; i < aValues.length; i++) {
                    const aValue = aValues[i];
                    const index = bValues.findIndex(bValue => {
                        return isEqualWithImpl(aValue, bValue, undefined, a, b, stack, areValuesEqual);
                    });
                    if (index === -1) {
                        return false;
                    }
                    bValues.splice(index, 1);
                }
                return true;
            }
            case tags.arrayTag:
            case tags.uint8ArrayTag:
            case tags.uint8ClampedArrayTag:
            case tags.uint16ArrayTag:
            case tags.uint32ArrayTag:
            case tags.bigUint64ArrayTag:
            case tags.int8ArrayTag:
            case tags.int16ArrayTag:
            case tags.int32ArrayTag:
            case tags.bigInt64ArrayTag:
            case tags.float32ArrayTag:
            case tags.float64ArrayTag: {
                if (isBuffer.isBuffer(a) !== isBuffer.isBuffer(b)) {
                    return false;
                }
                if (a.length !== b.length) {
                    return false;
                }
                for (let i = 0; i < a.length; i++) {
                    if (!isEqualWithImpl(a[i], b[i], i, a, b, stack, areValuesEqual)) {
                        return false;
                    }
                }
                return true;
            }
            case tags.arrayBufferTag: {
                if (a.byteLength !== b.byteLength) {
                    return false;
                }
                return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
            }
            case tags.dataViewTag: {
                if (a.byteLength !== b.byteLength || a.byteOffset !== b.byteOffset) {
                    return false;
                }
                return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
            }
            case tags.errorTag: {
                return a.name === b.name && a.message === b.message;
            }
            case tags.objectTag: {
                const areEqualInstances = areObjectsEqual(a.constructor, b.constructor, stack, areValuesEqual) ||
                    (isPlainObject.isPlainObject(a) && isPlainObject.isPlainObject(b));
                if (!areEqualInstances) {
                    return false;
                }
                const aKeys = [...Object.keys(a), ...getSymbols.getSymbols(a)];
                const bKeys = [...Object.keys(b), ...getSymbols.getSymbols(b)];
                if (aKeys.length !== bKeys.length) {
                    return false;
                }
                for (let i = 0; i < aKeys.length; i++) {
                    const propKey = aKeys[i];
                    const aProp = a[propKey];
                    if (!Object.hasOwn(b, propKey)) {
                        return false;
                    }
                    const bProp = b[propKey];
                    if (!isEqualWithImpl(aProp, bProp, propKey, a, b, stack, areValuesEqual)) {
                        return false;
                    }
                }
                return true;
            }
            default: {
                return false;
            }
        }
    }
    finally {
        stack.delete(a);
        stack.delete(b);
    }
}

exports.isEqualWith = isEqualWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isError.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isError.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isError(value) {
    return value instanceof Error;
}

exports.isError = isError;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isFile.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isFile.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const isBlob = __webpack_require__(/*! ./isBlob.js */ "../../node_modules/es-toolkit/dist/predicate/isBlob.js");

function isFile(x) {
    if (typeof File === 'undefined') {
        return false;
    }
    return isBlob.isBlob(x) && x instanceof File;
}

exports.isFile = isFile;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isFunction.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isFunction.js ***!
  \******************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isFunction(value) {
    return typeof value === 'function';
}

exports.isFunction = isFunction;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isJSON.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isJSON.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isJSON(value) {
    if (typeof value !== 'string') {
        return false;
    }
    try {
        JSON.parse(value);
        return true;
    }
    catch {
        return false;
    }
}

exports.isJSON = isJSON;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isJSONValue.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isJSONValue.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const isPlainObject = __webpack_require__(/*! ./isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");

function isJSONValue(value) {
    switch (typeof value) {
        case 'object': {
            return value === null || isJSONArray(value) || isJSONObject(value);
        }
        case 'string':
        case 'number':
        case 'boolean': {
            return true;
        }
        default: {
            return false;
        }
    }
}
function isJSONArray(value) {
    if (!Array.isArray(value)) {
        return false;
    }
    return value.every(item => isJSONValue(item));
}
function isJSONObject(obj) {
    if (!isPlainObject.isPlainObject(obj)) {
        return false;
    }
    const keys = Reflect.ownKeys(obj);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = obj[key];
        if (typeof key !== 'string') {
            return false;
        }
        if (!isJSONValue(value)) {
            return false;
        }
    }
    return true;
}

exports.isJSONArray = isJSONArray;
exports.isJSONObject = isJSONObject;
exports.isJSONValue = isJSONValue;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isLength.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isLength.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isLength(value) {
    return Number.isSafeInteger(value) && value >= 0;
}

exports.isLength = isLength;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isMap.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isMap.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isMap(value) {
    return value instanceof Map;
}

exports.isMap = isMap;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isNil.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isNil.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isNil(x) {
    return x == null;
}

exports.isNil = isNil;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isNode.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isNode.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isNode() {
    return typeof process !== 'undefined' && process?.versions?.node != null;
}

exports.isNode = isNode;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isNotNil.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isNotNil.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isNotNil(x) {
    return x != null;
}

exports.isNotNil = isNotNil;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isNull.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isNull.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isNull(x) {
    return x === null;
}

exports.isNull = isNull;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isNumber.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isNumber.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isNumber(x) {
    return typeof x === 'number' || x instanceof Number;
}

exports.isNumber = isNumber;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js"
/*!*********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isPlainObject.js ***!
  \*********************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isPlainObject(value) {
    if (!value || typeof value !== 'object') {
        return false;
    }
    const proto = Object.getPrototypeOf(value);
    const hasObjectPrototype = proto === null ||
        proto === Object.prototype ||
        Object.getPrototypeOf(proto) === null;
    if (!hasObjectPrototype) {
        return false;
    }
    return Object.prototype.toString.call(value) === '[object Object]';
}

exports.isPlainObject = isPlainObject;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isPrimitive.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isPrimitive.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isPrimitive(value) {
    return value == null || (typeof value !== 'object' && typeof value !== 'function');
}

exports.isPrimitive = isPrimitive;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isPromise.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isPromise.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isPromise(value) {
    return value instanceof Promise;
}

exports.isPromise = isPromise;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isRegExp.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isRegExp.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isRegExp(value) {
    return value instanceof RegExp;
}

exports.isRegExp = isRegExp;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isSet.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isSet.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isSet(value) {
    return value instanceof Set;
}

exports.isSet = isSet;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isString.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isString.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isString(value) {
    return typeof value === 'string';
}

exports.isString = isString;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isSymbol.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isSymbol.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isSymbol(value) {
    return typeof value === 'symbol';
}

exports.isSymbol = isSymbol;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isTypedArray.js"
/*!********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isTypedArray.js ***!
  \********************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isTypedArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

exports.isTypedArray = isTypedArray;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isUndefined.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isUndefined.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isUndefined(x) {
    return x === undefined;
}

exports.isUndefined = isUndefined;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isWeakMap.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isWeakMap.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isWeakMap(value) {
    return value instanceof WeakMap;
}

exports.isWeakMap = isWeakMap;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isWeakSet.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isWeakSet.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isWeakSet(value) {
    return value instanceof WeakSet;
}

exports.isWeakSet = isWeakSet;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/promise/delay.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/promise/delay.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const AbortError = __webpack_require__(/*! ../error/AbortError.js */ "../../node_modules/es-toolkit/dist/error/AbortError.js");

function delay(ms, { signal } = {}) {
    return new Promise((resolve, reject) => {
        const abortError = () => {
            reject(new AbortError.AbortError());
        };
        const abortHandler = () => {
            clearTimeout(timeoutId);
            abortError();
        };
        if (signal?.aborted) {
            return abortError();
        }
        const timeoutId = setTimeout(() => {
            signal?.removeEventListener('abort', abortHandler);
            resolve();
        }, ms);
        signal?.addEventListener('abort', abortHandler, { once: true });
    });
}

exports.delay = delay;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/promise/mutex.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/promise/mutex.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const semaphore = __webpack_require__(/*! ./semaphore.js */ "../../node_modules/es-toolkit/dist/promise/semaphore.js");

class Mutex {
    semaphore = new semaphore.Semaphore(1);
    get isLocked() {
        return this.semaphore.available === 0;
    }
    async acquire() {
        return this.semaphore.acquire();
    }
    release() {
        this.semaphore.release();
    }
}

exports.Mutex = Mutex;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/promise/semaphore.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/promise/semaphore.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

class Semaphore {
    capacity;
    available;
    deferredTasks = [];
    constructor(capacity) {
        this.capacity = capacity;
        this.available = capacity;
    }
    async acquire() {
        if (this.available > 0) {
            this.available--;
            return;
        }
        return new Promise(resolve => {
            this.deferredTasks.push(resolve);
        });
    }
    release() {
        const deferredTask = this.deferredTasks.shift();
        if (deferredTask != null) {
            deferredTask();
            return;
        }
        if (this.available < this.capacity) {
            this.available++;
        }
    }
}

exports.Semaphore = Semaphore;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/promise/timeout.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/promise/timeout.js ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const delay = __webpack_require__(/*! ./delay.js */ "../../node_modules/es-toolkit/dist/promise/delay.js");
const TimeoutError = __webpack_require__(/*! ../error/TimeoutError.js */ "../../node_modules/es-toolkit/dist/error/TimeoutError.js");

async function timeout(ms) {
    await delay.delay(ms);
    throw new TimeoutError.TimeoutError();
}

exports.timeout = timeout;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/promise/withTimeout.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/promise/withTimeout.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const timeout = __webpack_require__(/*! ./timeout.js */ "../../node_modules/es-toolkit/dist/promise/timeout.js");

async function withTimeout(run, ms) {
    return Promise.race([run(), timeout.timeout(ms)]);
}

exports.withTimeout = withTimeout;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/camelCase.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/camelCase.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const capitalize = __webpack_require__(/*! ./capitalize.js */ "../../node_modules/es-toolkit/dist/string/capitalize.js");
const words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");

function camelCase(str) {
    const words$1 = words.words(str);
    if (words$1.length === 0) {
        return '';
    }
    const [first, ...rest] = words$1;
    return `${first.toLowerCase()}${rest.map(word => capitalize.capitalize(word)).join('')}`;
}

exports.camelCase = camelCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/capitalize.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/capitalize.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function capitalize(str) {
    return (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase());
}

exports.capitalize = capitalize;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/constantCase.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/constantCase.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");

function constantCase(str) {
    const words$1 = words.words(str);
    return words$1.map(word => word.toUpperCase()).join('_');
}

exports.constantCase = constantCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/deburr.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/deburr.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const deburrMap = new Map([
    ['Æ', 'Ae'],
    ['Ð', 'D'],
    ['Ø', 'O'],
    ['Þ', 'Th'],
    ['ß', 'ss'],
    ['æ', 'ae'],
    ['ð', 'd'],
    ['ø', 'o'],
    ['þ', 'th'],
    ['Đ', 'D'],
    ['đ', 'd'],
    ['Ħ', 'H'],
    ['ħ', 'h'],
    ['ı', 'i'],
    ['Ĳ', 'IJ'],
    ['ĳ', 'ij'],
    ['ĸ', 'k'],
    ['Ŀ', 'L'],
    ['ŀ', 'l'],
    ['Ł', 'L'],
    ['ł', 'l'],
    ['ŉ', "'n"],
    ['Ŋ', 'N'],
    ['ŋ', 'n'],
    ['Œ', 'Oe'],
    ['œ', 'oe'],
    ['Ŧ', 'T'],
    ['ŧ', 't'],
    ['ſ', 's'],
]);
function deburr(str) {
    str = str.normalize('NFD');
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if ((char >= '\u0300' && char <= '\u036f') || (char >= '\ufe20' && char <= '\ufe23')) {
            continue;
        }
        result += deburrMap.get(char) ?? char;
    }
    return result;
}

exports.deburr = deburr;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/escape.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/escape.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};
function escape(str) {
    return str.replace(/[&<>"']/g, match => htmlEscapes[match]);
}

exports.escape = escape;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/escapeRegExp.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/escapeRegExp.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function escapeRegExp(str) {
    return str.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}

exports.escapeRegExp = escapeRegExp;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/kebabCase.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/kebabCase.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");

function kebabCase(str) {
    const words$1 = words.words(str);
    return words$1.map(word => word.toLowerCase()).join('-');
}

exports.kebabCase = kebabCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/lowerCase.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/lowerCase.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");

function lowerCase(str) {
    const words$1 = words.words(str);
    return words$1.map(word => word.toLowerCase()).join(' ');
}

exports.lowerCase = lowerCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/lowerFirst.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/lowerFirst.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function lowerFirst(str) {
    return str.substring(0, 1).toLowerCase() + str.substring(1);
}

exports.lowerFirst = lowerFirst;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/pad.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/pad.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function pad(str, length, chars = ' ') {
    return str.padStart(Math.floor((length - str.length) / 2) + str.length, chars).padEnd(length, chars);
}

exports.pad = pad;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/pascalCase.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/pascalCase.js ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const capitalize = __webpack_require__(/*! ./capitalize.js */ "../../node_modules/es-toolkit/dist/string/capitalize.js");
const words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");

function pascalCase(str) {
    const words$1 = words.words(str);
    return words$1.map(word => capitalize.capitalize(word)).join('');
}

exports.pascalCase = pascalCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/reverseString.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/reverseString.js ***!
  \******************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function reverseString(value) {
    return [...value].reverse().join('');
}

exports.reverseString = reverseString;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/snakeCase.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/snakeCase.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");

function snakeCase(str) {
    const words$1 = words.words(str);
    return words$1.map(word => word.toLowerCase()).join('_');
}

exports.snakeCase = snakeCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/startCase.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/startCase.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");

function startCase(str) {
    const words$1 = words.words(str.trim());
    let result = '';
    for (let i = 0; i < words$1.length; i++) {
        const word = words$1[i];
        if (result) {
            result += ' ';
        }
        result += word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    return result;
}

exports.startCase = startCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/trim.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/trim.js ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const trimEnd = __webpack_require__(/*! ./trimEnd.js */ "../../node_modules/es-toolkit/dist/string/trimEnd.js");
const trimStart = __webpack_require__(/*! ./trimStart.js */ "../../node_modules/es-toolkit/dist/string/trimStart.js");

function trim(str, chars) {
    if (chars === undefined) {
        return str.trim();
    }
    return trimStart.trimStart(trimEnd.trimEnd(str, chars), chars);
}

exports.trim = trim;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/trimEnd.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/trimEnd.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function trimEnd(str, chars) {
    if (chars === undefined) {
        return str.trimEnd();
    }
    let endIndex = str.length;
    switch (typeof chars) {
        case 'string': {
            if (chars.length !== 1) {
                throw new Error(`The 'chars' parameter should be a single character string.`);
            }
            while (endIndex > 0 && str[endIndex - 1] === chars) {
                endIndex--;
            }
            break;
        }
        case 'object': {
            while (endIndex > 0 && chars.includes(str[endIndex - 1])) {
                endIndex--;
            }
        }
    }
    return str.substring(0, endIndex);
}

exports.trimEnd = trimEnd;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/trimStart.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/trimStart.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function trimStart(str, chars) {
    if (chars === undefined) {
        return str.trimStart();
    }
    let startIndex = 0;
    switch (typeof chars) {
        case 'string': {
            while (startIndex < str.length && str[startIndex] === chars) {
                startIndex++;
            }
            break;
        }
        case 'object': {
            while (startIndex < str.length && chars.includes(str[startIndex])) {
                startIndex++;
            }
        }
    }
    return str.substring(startIndex);
}

exports.trimStart = trimStart;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/unescape.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/unescape.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
};
function unescape(str) {
    return str.replace(/&(?:amp|lt|gt|quot|#(0+)?39);/g, match => htmlUnescapes[match] || "'");
}

exports.unescape = unescape;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/upperCase.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/upperCase.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");

function upperCase(str) {
    const words$1 = words.words(str);
    let result = '';
    for (let i = 0; i < words$1.length; i++) {
        result += words$1[i].toUpperCase();
        if (i < words$1.length - 1) {
            result += ' ';
        }
    }
    return result;
}

exports.upperCase = upperCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/upperFirst.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/upperFirst.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function upperFirst(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
}

exports.upperFirst = upperFirst;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/words.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/words.js ***!
  \**********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const CASE_SPLIT_PATTERN = /\p{Lu}?\p{Ll}+|[0-9]+|\p{Lu}+(?!\p{Ll})|\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{L}+/gu;
function words(str) {
    return Array.from(str.match(CASE_SPLIT_PATTERN) ?? []);
}

exports.CASE_SPLIT_PATTERN = CASE_SPLIT_PATTERN;
exports.words = words;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/util/attempt.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/util/attempt.js ***!
  \**********************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function attempt(func) {
    try {
        return [null, func()];
    }
    catch (error) {
        return [error, null];
    }
}

exports.attempt = attempt;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/util/attemptAsync.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/util/attemptAsync.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

async function attemptAsync(func) {
    try {
        const result = await func();
        return [null, result];
    }
    catch (error) {
        return [error, null];
    }
}

exports.attemptAsync = attemptAsync;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/util/invariant.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/util/invariant.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function invariant(condition, message) {
    if (condition) {
        return;
    }
    if (typeof message === 'string') {
        throw new Error(message);
    }
    throw message;
}

exports.invariant = invariant;


/***/ },

/***/ "../../node_modules/events/events.js"
/*!*******************************************!*\
  !*** ../../node_modules/events/events.js ***!
  \*******************************************/
(module) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ },

/***/ "../../node_modules/he/he.js"
/*!***********************************!*\
  !*** ../../node_modules/he/he.js ***!
  \***********************************/
(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/he v1.2.0 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports =  true && exports;

	// Detect free variable `module`.
	var freeModule =  true && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`.
	var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	// All astral symbols.
	var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	// All ASCII symbols (not just printable ASCII) except those listed in the
	// first column of the overrides table.
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
	var regexAsciiWhitelist = /[\x01-\x7F]/g;
	// All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
	// code points listed in the first column of the overrides table on
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.
	var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;

	var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
	var encodeMap = {'\xAD':'shy','\u200C':'zwnj','\u200D':'zwj','\u200E':'lrm','\u2063':'ic','\u2062':'it','\u2061':'af','\u200F':'rlm','\u200B':'ZeroWidthSpace','\u2060':'NoBreak','\u0311':'DownBreve','\u20DB':'tdot','\u20DC':'DotDot','\t':'Tab','\n':'NewLine','\u2008':'puncsp','\u205F':'MediumSpace','\u2009':'thinsp','\u200A':'hairsp','\u2004':'emsp13','\u2002':'ensp','\u2005':'emsp14','\u2003':'emsp','\u2007':'numsp','\xA0':'nbsp','\u205F\u200A':'ThickSpace','\u203E':'oline','_':'lowbar','\u2010':'dash','\u2013':'ndash','\u2014':'mdash','\u2015':'horbar',',':'comma',';':'semi','\u204F':'bsemi',':':'colon','\u2A74':'Colone','!':'excl','\xA1':'iexcl','?':'quest','\xBF':'iquest','.':'period','\u2025':'nldr','\u2026':'mldr','\xB7':'middot','\'':'apos','\u2018':'lsquo','\u2019':'rsquo','\u201A':'sbquo','\u2039':'lsaquo','\u203A':'rsaquo','"':'quot','\u201C':'ldquo','\u201D':'rdquo','\u201E':'bdquo','\xAB':'laquo','\xBB':'raquo','(':'lpar',')':'rpar','[':'lsqb',']':'rsqb','{':'lcub','}':'rcub','\u2308':'lceil','\u2309':'rceil','\u230A':'lfloor','\u230B':'rfloor','\u2985':'lopar','\u2986':'ropar','\u298B':'lbrke','\u298C':'rbrke','\u298D':'lbrkslu','\u298E':'rbrksld','\u298F':'lbrksld','\u2990':'rbrkslu','\u2991':'langd','\u2992':'rangd','\u2993':'lparlt','\u2994':'rpargt','\u2995':'gtlPar','\u2996':'ltrPar','\u27E6':'lobrk','\u27E7':'robrk','\u27E8':'lang','\u27E9':'rang','\u27EA':'Lang','\u27EB':'Rang','\u27EC':'loang','\u27ED':'roang','\u2772':'lbbrk','\u2773':'rbbrk','\u2016':'Vert','\xA7':'sect','\xB6':'para','@':'commat','*':'ast','/':'sol','undefined':null,'&':'amp','#':'num','%':'percnt','\u2030':'permil','\u2031':'pertenk','\u2020':'dagger','\u2021':'Dagger','\u2022':'bull','\u2043':'hybull','\u2032':'prime','\u2033':'Prime','\u2034':'tprime','\u2057':'qprime','\u2035':'bprime','\u2041':'caret','`':'grave','\xB4':'acute','\u02DC':'tilde','^':'Hat','\xAF':'macr','\u02D8':'breve','\u02D9':'dot','\xA8':'die','\u02DA':'ring','\u02DD':'dblac','\xB8':'cedil','\u02DB':'ogon','\u02C6':'circ','\u02C7':'caron','\xB0':'deg','\xA9':'copy','\xAE':'reg','\u2117':'copysr','\u2118':'wp','\u211E':'rx','\u2127':'mho','\u2129':'iiota','\u2190':'larr','\u219A':'nlarr','\u2192':'rarr','\u219B':'nrarr','\u2191':'uarr','\u2193':'darr','\u2194':'harr','\u21AE':'nharr','\u2195':'varr','\u2196':'nwarr','\u2197':'nearr','\u2198':'searr','\u2199':'swarr','\u219D':'rarrw','\u219D\u0338':'nrarrw','\u219E':'Larr','\u219F':'Uarr','\u21A0':'Rarr','\u21A1':'Darr','\u21A2':'larrtl','\u21A3':'rarrtl','\u21A4':'mapstoleft','\u21A5':'mapstoup','\u21A6':'map','\u21A7':'mapstodown','\u21A9':'larrhk','\u21AA':'rarrhk','\u21AB':'larrlp','\u21AC':'rarrlp','\u21AD':'harrw','\u21B0':'lsh','\u21B1':'rsh','\u21B2':'ldsh','\u21B3':'rdsh','\u21B5':'crarr','\u21B6':'cularr','\u21B7':'curarr','\u21BA':'olarr','\u21BB':'orarr','\u21BC':'lharu','\u21BD':'lhard','\u21BE':'uharr','\u21BF':'uharl','\u21C0':'rharu','\u21C1':'rhard','\u21C2':'dharr','\u21C3':'dharl','\u21C4':'rlarr','\u21C5':'udarr','\u21C6':'lrarr','\u21C7':'llarr','\u21C8':'uuarr','\u21C9':'rrarr','\u21CA':'ddarr','\u21CB':'lrhar','\u21CC':'rlhar','\u21D0':'lArr','\u21CD':'nlArr','\u21D1':'uArr','\u21D2':'rArr','\u21CF':'nrArr','\u21D3':'dArr','\u21D4':'iff','\u21CE':'nhArr','\u21D5':'vArr','\u21D6':'nwArr','\u21D7':'neArr','\u21D8':'seArr','\u21D9':'swArr','\u21DA':'lAarr','\u21DB':'rAarr','\u21DD':'zigrarr','\u21E4':'larrb','\u21E5':'rarrb','\u21F5':'duarr','\u21FD':'loarr','\u21FE':'roarr','\u21FF':'hoarr','\u2200':'forall','\u2201':'comp','\u2202':'part','\u2202\u0338':'npart','\u2203':'exist','\u2204':'nexist','\u2205':'empty','\u2207':'Del','\u2208':'in','\u2209':'notin','\u220B':'ni','\u220C':'notni','\u03F6':'bepsi','\u220F':'prod','\u2210':'coprod','\u2211':'sum','+':'plus','\xB1':'pm','\xF7':'div','\xD7':'times','<':'lt','\u226E':'nlt','<\u20D2':'nvlt','=':'equals','\u2260':'ne','=\u20E5':'bne','\u2A75':'Equal','>':'gt','\u226F':'ngt','>\u20D2':'nvgt','\xAC':'not','|':'vert','\xA6':'brvbar','\u2212':'minus','\u2213':'mp','\u2214':'plusdo','\u2044':'frasl','\u2216':'setmn','\u2217':'lowast','\u2218':'compfn','\u221A':'Sqrt','\u221D':'prop','\u221E':'infin','\u221F':'angrt','\u2220':'ang','\u2220\u20D2':'nang','\u2221':'angmsd','\u2222':'angsph','\u2223':'mid','\u2224':'nmid','\u2225':'par','\u2226':'npar','\u2227':'and','\u2228':'or','\u2229':'cap','\u2229\uFE00':'caps','\u222A':'cup','\u222A\uFE00':'cups','\u222B':'int','\u222C':'Int','\u222D':'tint','\u2A0C':'qint','\u222E':'oint','\u222F':'Conint','\u2230':'Cconint','\u2231':'cwint','\u2232':'cwconint','\u2233':'awconint','\u2234':'there4','\u2235':'becaus','\u2236':'ratio','\u2237':'Colon','\u2238':'minusd','\u223A':'mDDot','\u223B':'homtht','\u223C':'sim','\u2241':'nsim','\u223C\u20D2':'nvsim','\u223D':'bsim','\u223D\u0331':'race','\u223E':'ac','\u223E\u0333':'acE','\u223F':'acd','\u2240':'wr','\u2242':'esim','\u2242\u0338':'nesim','\u2243':'sime','\u2244':'nsime','\u2245':'cong','\u2247':'ncong','\u2246':'simne','\u2248':'ap','\u2249':'nap','\u224A':'ape','\u224B':'apid','\u224B\u0338':'napid','\u224C':'bcong','\u224D':'CupCap','\u226D':'NotCupCap','\u224D\u20D2':'nvap','\u224E':'bump','\u224E\u0338':'nbump','\u224F':'bumpe','\u224F\u0338':'nbumpe','\u2250':'doteq','\u2250\u0338':'nedot','\u2251':'eDot','\u2252':'efDot','\u2253':'erDot','\u2254':'colone','\u2255':'ecolon','\u2256':'ecir','\u2257':'cire','\u2259':'wedgeq','\u225A':'veeeq','\u225C':'trie','\u225F':'equest','\u2261':'equiv','\u2262':'nequiv','\u2261\u20E5':'bnequiv','\u2264':'le','\u2270':'nle','\u2264\u20D2':'nvle','\u2265':'ge','\u2271':'nge','\u2265\u20D2':'nvge','\u2266':'lE','\u2266\u0338':'nlE','\u2267':'gE','\u2267\u0338':'ngE','\u2268\uFE00':'lvnE','\u2268':'lnE','\u2269':'gnE','\u2269\uFE00':'gvnE','\u226A':'ll','\u226A\u0338':'nLtv','\u226A\u20D2':'nLt','\u226B':'gg','\u226B\u0338':'nGtv','\u226B\u20D2':'nGt','\u226C':'twixt','\u2272':'lsim','\u2274':'nlsim','\u2273':'gsim','\u2275':'ngsim','\u2276':'lg','\u2278':'ntlg','\u2277':'gl','\u2279':'ntgl','\u227A':'pr','\u2280':'npr','\u227B':'sc','\u2281':'nsc','\u227C':'prcue','\u22E0':'nprcue','\u227D':'sccue','\u22E1':'nsccue','\u227E':'prsim','\u227F':'scsim','\u227F\u0338':'NotSucceedsTilde','\u2282':'sub','\u2284':'nsub','\u2282\u20D2':'vnsub','\u2283':'sup','\u2285':'nsup','\u2283\u20D2':'vnsup','\u2286':'sube','\u2288':'nsube','\u2287':'supe','\u2289':'nsupe','\u228A\uFE00':'vsubne','\u228A':'subne','\u228B\uFE00':'vsupne','\u228B':'supne','\u228D':'cupdot','\u228E':'uplus','\u228F':'sqsub','\u228F\u0338':'NotSquareSubset','\u2290':'sqsup','\u2290\u0338':'NotSquareSuperset','\u2291':'sqsube','\u22E2':'nsqsube','\u2292':'sqsupe','\u22E3':'nsqsupe','\u2293':'sqcap','\u2293\uFE00':'sqcaps','\u2294':'sqcup','\u2294\uFE00':'sqcups','\u2295':'oplus','\u2296':'ominus','\u2297':'otimes','\u2298':'osol','\u2299':'odot','\u229A':'ocir','\u229B':'oast','\u229D':'odash','\u229E':'plusb','\u229F':'minusb','\u22A0':'timesb','\u22A1':'sdotb','\u22A2':'vdash','\u22AC':'nvdash','\u22A3':'dashv','\u22A4':'top','\u22A5':'bot','\u22A7':'models','\u22A8':'vDash','\u22AD':'nvDash','\u22A9':'Vdash','\u22AE':'nVdash','\u22AA':'Vvdash','\u22AB':'VDash','\u22AF':'nVDash','\u22B0':'prurel','\u22B2':'vltri','\u22EA':'nltri','\u22B3':'vrtri','\u22EB':'nrtri','\u22B4':'ltrie','\u22EC':'nltrie','\u22B4\u20D2':'nvltrie','\u22B5':'rtrie','\u22ED':'nrtrie','\u22B5\u20D2':'nvrtrie','\u22B6':'origof','\u22B7':'imof','\u22B8':'mumap','\u22B9':'hercon','\u22BA':'intcal','\u22BB':'veebar','\u22BD':'barvee','\u22BE':'angrtvb','\u22BF':'lrtri','\u22C0':'Wedge','\u22C1':'Vee','\u22C2':'xcap','\u22C3':'xcup','\u22C4':'diam','\u22C5':'sdot','\u22C6':'Star','\u22C7':'divonx','\u22C8':'bowtie','\u22C9':'ltimes','\u22CA':'rtimes','\u22CB':'lthree','\u22CC':'rthree','\u22CD':'bsime','\u22CE':'cuvee','\u22CF':'cuwed','\u22D0':'Sub','\u22D1':'Sup','\u22D2':'Cap','\u22D3':'Cup','\u22D4':'fork','\u22D5':'epar','\u22D6':'ltdot','\u22D7':'gtdot','\u22D8':'Ll','\u22D8\u0338':'nLl','\u22D9':'Gg','\u22D9\u0338':'nGg','\u22DA\uFE00':'lesg','\u22DA':'leg','\u22DB':'gel','\u22DB\uFE00':'gesl','\u22DE':'cuepr','\u22DF':'cuesc','\u22E6':'lnsim','\u22E7':'gnsim','\u22E8':'prnsim','\u22E9':'scnsim','\u22EE':'vellip','\u22EF':'ctdot','\u22F0':'utdot','\u22F1':'dtdot','\u22F2':'disin','\u22F3':'isinsv','\u22F4':'isins','\u22F5':'isindot','\u22F5\u0338':'notindot','\u22F6':'notinvc','\u22F7':'notinvb','\u22F9':'isinE','\u22F9\u0338':'notinE','\u22FA':'nisd','\u22FB':'xnis','\u22FC':'nis','\u22FD':'notnivc','\u22FE':'notnivb','\u2305':'barwed','\u2306':'Barwed','\u230C':'drcrop','\u230D':'dlcrop','\u230E':'urcrop','\u230F':'ulcrop','\u2310':'bnot','\u2312':'profline','\u2313':'profsurf','\u2315':'telrec','\u2316':'target','\u231C':'ulcorn','\u231D':'urcorn','\u231E':'dlcorn','\u231F':'drcorn','\u2322':'frown','\u2323':'smile','\u232D':'cylcty','\u232E':'profalar','\u2336':'topbot','\u233D':'ovbar','\u233F':'solbar','\u237C':'angzarr','\u23B0':'lmoust','\u23B1':'rmoust','\u23B4':'tbrk','\u23B5':'bbrk','\u23B6':'bbrktbrk','\u23DC':'OverParenthesis','\u23DD':'UnderParenthesis','\u23DE':'OverBrace','\u23DF':'UnderBrace','\u23E2':'trpezium','\u23E7':'elinters','\u2423':'blank','\u2500':'boxh','\u2502':'boxv','\u250C':'boxdr','\u2510':'boxdl','\u2514':'boxur','\u2518':'boxul','\u251C':'boxvr','\u2524':'boxvl','\u252C':'boxhd','\u2534':'boxhu','\u253C':'boxvh','\u2550':'boxH','\u2551':'boxV','\u2552':'boxdR','\u2553':'boxDr','\u2554':'boxDR','\u2555':'boxdL','\u2556':'boxDl','\u2557':'boxDL','\u2558':'boxuR','\u2559':'boxUr','\u255A':'boxUR','\u255B':'boxuL','\u255C':'boxUl','\u255D':'boxUL','\u255E':'boxvR','\u255F':'boxVr','\u2560':'boxVR','\u2561':'boxvL','\u2562':'boxVl','\u2563':'boxVL','\u2564':'boxHd','\u2565':'boxhD','\u2566':'boxHD','\u2567':'boxHu','\u2568':'boxhU','\u2569':'boxHU','\u256A':'boxvH','\u256B':'boxVh','\u256C':'boxVH','\u2580':'uhblk','\u2584':'lhblk','\u2588':'block','\u2591':'blk14','\u2592':'blk12','\u2593':'blk34','\u25A1':'squ','\u25AA':'squf','\u25AB':'EmptyVerySmallSquare','\u25AD':'rect','\u25AE':'marker','\u25B1':'fltns','\u25B3':'xutri','\u25B4':'utrif','\u25B5':'utri','\u25B8':'rtrif','\u25B9':'rtri','\u25BD':'xdtri','\u25BE':'dtrif','\u25BF':'dtri','\u25C2':'ltrif','\u25C3':'ltri','\u25CA':'loz','\u25CB':'cir','\u25EC':'tridot','\u25EF':'xcirc','\u25F8':'ultri','\u25F9':'urtri','\u25FA':'lltri','\u25FB':'EmptySmallSquare','\u25FC':'FilledSmallSquare','\u2605':'starf','\u2606':'star','\u260E':'phone','\u2640':'female','\u2642':'male','\u2660':'spades','\u2663':'clubs','\u2665':'hearts','\u2666':'diams','\u266A':'sung','\u2713':'check','\u2717':'cross','\u2720':'malt','\u2736':'sext','\u2758':'VerticalSeparator','\u27C8':'bsolhsub','\u27C9':'suphsol','\u27F5':'xlarr','\u27F6':'xrarr','\u27F7':'xharr','\u27F8':'xlArr','\u27F9':'xrArr','\u27FA':'xhArr','\u27FC':'xmap','\u27FF':'dzigrarr','\u2902':'nvlArr','\u2903':'nvrArr','\u2904':'nvHarr','\u2905':'Map','\u290C':'lbarr','\u290D':'rbarr','\u290E':'lBarr','\u290F':'rBarr','\u2910':'RBarr','\u2911':'DDotrahd','\u2912':'UpArrowBar','\u2913':'DownArrowBar','\u2916':'Rarrtl','\u2919':'latail','\u291A':'ratail','\u291B':'lAtail','\u291C':'rAtail','\u291D':'larrfs','\u291E':'rarrfs','\u291F':'larrbfs','\u2920':'rarrbfs','\u2923':'nwarhk','\u2924':'nearhk','\u2925':'searhk','\u2926':'swarhk','\u2927':'nwnear','\u2928':'toea','\u2929':'tosa','\u292A':'swnwar','\u2933':'rarrc','\u2933\u0338':'nrarrc','\u2935':'cudarrr','\u2936':'ldca','\u2937':'rdca','\u2938':'cudarrl','\u2939':'larrpl','\u293C':'curarrm','\u293D':'cularrp','\u2945':'rarrpl','\u2948':'harrcir','\u2949':'Uarrocir','\u294A':'lurdshar','\u294B':'ldrushar','\u294E':'LeftRightVector','\u294F':'RightUpDownVector','\u2950':'DownLeftRightVector','\u2951':'LeftUpDownVector','\u2952':'LeftVectorBar','\u2953':'RightVectorBar','\u2954':'RightUpVectorBar','\u2955':'RightDownVectorBar','\u2956':'DownLeftVectorBar','\u2957':'DownRightVectorBar','\u2958':'LeftUpVectorBar','\u2959':'LeftDownVectorBar','\u295A':'LeftTeeVector','\u295B':'RightTeeVector','\u295C':'RightUpTeeVector','\u295D':'RightDownTeeVector','\u295E':'DownLeftTeeVector','\u295F':'DownRightTeeVector','\u2960':'LeftUpTeeVector','\u2961':'LeftDownTeeVector','\u2962':'lHar','\u2963':'uHar','\u2964':'rHar','\u2965':'dHar','\u2966':'luruhar','\u2967':'ldrdhar','\u2968':'ruluhar','\u2969':'rdldhar','\u296A':'lharul','\u296B':'llhard','\u296C':'rharul','\u296D':'lrhard','\u296E':'udhar','\u296F':'duhar','\u2970':'RoundImplies','\u2971':'erarr','\u2972':'simrarr','\u2973':'larrsim','\u2974':'rarrsim','\u2975':'rarrap','\u2976':'ltlarr','\u2978':'gtrarr','\u2979':'subrarr','\u297B':'suplarr','\u297C':'lfisht','\u297D':'rfisht','\u297E':'ufisht','\u297F':'dfisht','\u299A':'vzigzag','\u299C':'vangrt','\u299D':'angrtvbd','\u29A4':'ange','\u29A5':'range','\u29A6':'dwangle','\u29A7':'uwangle','\u29A8':'angmsdaa','\u29A9':'angmsdab','\u29AA':'angmsdac','\u29AB':'angmsdad','\u29AC':'angmsdae','\u29AD':'angmsdaf','\u29AE':'angmsdag','\u29AF':'angmsdah','\u29B0':'bemptyv','\u29B1':'demptyv','\u29B2':'cemptyv','\u29B3':'raemptyv','\u29B4':'laemptyv','\u29B5':'ohbar','\u29B6':'omid','\u29B7':'opar','\u29B9':'operp','\u29BB':'olcross','\u29BC':'odsold','\u29BE':'olcir','\u29BF':'ofcir','\u29C0':'olt','\u29C1':'ogt','\u29C2':'cirscir','\u29C3':'cirE','\u29C4':'solb','\u29C5':'bsolb','\u29C9':'boxbox','\u29CD':'trisb','\u29CE':'rtriltri','\u29CF':'LeftTriangleBar','\u29CF\u0338':'NotLeftTriangleBar','\u29D0':'RightTriangleBar','\u29D0\u0338':'NotRightTriangleBar','\u29DC':'iinfin','\u29DD':'infintie','\u29DE':'nvinfin','\u29E3':'eparsl','\u29E4':'smeparsl','\u29E5':'eqvparsl','\u29EB':'lozf','\u29F4':'RuleDelayed','\u29F6':'dsol','\u2A00':'xodot','\u2A01':'xoplus','\u2A02':'xotime','\u2A04':'xuplus','\u2A06':'xsqcup','\u2A0D':'fpartint','\u2A10':'cirfnint','\u2A11':'awint','\u2A12':'rppolint','\u2A13':'scpolint','\u2A14':'npolint','\u2A15':'pointint','\u2A16':'quatint','\u2A17':'intlarhk','\u2A22':'pluscir','\u2A23':'plusacir','\u2A24':'simplus','\u2A25':'plusdu','\u2A26':'plussim','\u2A27':'plustwo','\u2A29':'mcomma','\u2A2A':'minusdu','\u2A2D':'loplus','\u2A2E':'roplus','\u2A2F':'Cross','\u2A30':'timesd','\u2A31':'timesbar','\u2A33':'smashp','\u2A34':'lotimes','\u2A35':'rotimes','\u2A36':'otimesas','\u2A37':'Otimes','\u2A38':'odiv','\u2A39':'triplus','\u2A3A':'triminus','\u2A3B':'tritime','\u2A3C':'iprod','\u2A3F':'amalg','\u2A40':'capdot','\u2A42':'ncup','\u2A43':'ncap','\u2A44':'capand','\u2A45':'cupor','\u2A46':'cupcap','\u2A47':'capcup','\u2A48':'cupbrcap','\u2A49':'capbrcup','\u2A4A':'cupcup','\u2A4B':'capcap','\u2A4C':'ccups','\u2A4D':'ccaps','\u2A50':'ccupssm','\u2A53':'And','\u2A54':'Or','\u2A55':'andand','\u2A56':'oror','\u2A57':'orslope','\u2A58':'andslope','\u2A5A':'andv','\u2A5B':'orv','\u2A5C':'andd','\u2A5D':'ord','\u2A5F':'wedbar','\u2A66':'sdote','\u2A6A':'simdot','\u2A6D':'congdot','\u2A6D\u0338':'ncongdot','\u2A6E':'easter','\u2A6F':'apacir','\u2A70':'apE','\u2A70\u0338':'napE','\u2A71':'eplus','\u2A72':'pluse','\u2A73':'Esim','\u2A77':'eDDot','\u2A78':'equivDD','\u2A79':'ltcir','\u2A7A':'gtcir','\u2A7B':'ltquest','\u2A7C':'gtquest','\u2A7D':'les','\u2A7D\u0338':'nles','\u2A7E':'ges','\u2A7E\u0338':'nges','\u2A7F':'lesdot','\u2A80':'gesdot','\u2A81':'lesdoto','\u2A82':'gesdoto','\u2A83':'lesdotor','\u2A84':'gesdotol','\u2A85':'lap','\u2A86':'gap','\u2A87':'lne','\u2A88':'gne','\u2A89':'lnap','\u2A8A':'gnap','\u2A8B':'lEg','\u2A8C':'gEl','\u2A8D':'lsime','\u2A8E':'gsime','\u2A8F':'lsimg','\u2A90':'gsiml','\u2A91':'lgE','\u2A92':'glE','\u2A93':'lesges','\u2A94':'gesles','\u2A95':'els','\u2A96':'egs','\u2A97':'elsdot','\u2A98':'egsdot','\u2A99':'el','\u2A9A':'eg','\u2A9D':'siml','\u2A9E':'simg','\u2A9F':'simlE','\u2AA0':'simgE','\u2AA1':'LessLess','\u2AA1\u0338':'NotNestedLessLess','\u2AA2':'GreaterGreater','\u2AA2\u0338':'NotNestedGreaterGreater','\u2AA4':'glj','\u2AA5':'gla','\u2AA6':'ltcc','\u2AA7':'gtcc','\u2AA8':'lescc','\u2AA9':'gescc','\u2AAA':'smt','\u2AAB':'lat','\u2AAC':'smte','\u2AAC\uFE00':'smtes','\u2AAD':'late','\u2AAD\uFE00':'lates','\u2AAE':'bumpE','\u2AAF':'pre','\u2AAF\u0338':'npre','\u2AB0':'sce','\u2AB0\u0338':'nsce','\u2AB3':'prE','\u2AB4':'scE','\u2AB5':'prnE','\u2AB6':'scnE','\u2AB7':'prap','\u2AB8':'scap','\u2AB9':'prnap','\u2ABA':'scnap','\u2ABB':'Pr','\u2ABC':'Sc','\u2ABD':'subdot','\u2ABE':'supdot','\u2ABF':'subplus','\u2AC0':'supplus','\u2AC1':'submult','\u2AC2':'supmult','\u2AC3':'subedot','\u2AC4':'supedot','\u2AC5':'subE','\u2AC5\u0338':'nsubE','\u2AC6':'supE','\u2AC6\u0338':'nsupE','\u2AC7':'subsim','\u2AC8':'supsim','\u2ACB\uFE00':'vsubnE','\u2ACB':'subnE','\u2ACC\uFE00':'vsupnE','\u2ACC':'supnE','\u2ACF':'csub','\u2AD0':'csup','\u2AD1':'csube','\u2AD2':'csupe','\u2AD3':'subsup','\u2AD4':'supsub','\u2AD5':'subsub','\u2AD6':'supsup','\u2AD7':'suphsub','\u2AD8':'supdsub','\u2AD9':'forkv','\u2ADA':'topfork','\u2ADB':'mlcp','\u2AE4':'Dashv','\u2AE6':'Vdashl','\u2AE7':'Barv','\u2AE8':'vBar','\u2AE9':'vBarv','\u2AEB':'Vbar','\u2AEC':'Not','\u2AED':'bNot','\u2AEE':'rnmid','\u2AEF':'cirmid','\u2AF0':'midcir','\u2AF1':'topcir','\u2AF2':'nhpar','\u2AF3':'parsim','\u2AFD':'parsl','\u2AFD\u20E5':'nparsl','\u266D':'flat','\u266E':'natur','\u266F':'sharp','\xA4':'curren','\xA2':'cent','$':'dollar','\xA3':'pound','\xA5':'yen','\u20AC':'euro','\xB9':'sup1','\xBD':'half','\u2153':'frac13','\xBC':'frac14','\u2155':'frac15','\u2159':'frac16','\u215B':'frac18','\xB2':'sup2','\u2154':'frac23','\u2156':'frac25','\xB3':'sup3','\xBE':'frac34','\u2157':'frac35','\u215C':'frac38','\u2158':'frac45','\u215A':'frac56','\u215D':'frac58','\u215E':'frac78','\uD835\uDCB6':'ascr','\uD835\uDD52':'aopf','\uD835\uDD1E':'afr','\uD835\uDD38':'Aopf','\uD835\uDD04':'Afr','\uD835\uDC9C':'Ascr','\xAA':'ordf','\xE1':'aacute','\xC1':'Aacute','\xE0':'agrave','\xC0':'Agrave','\u0103':'abreve','\u0102':'Abreve','\xE2':'acirc','\xC2':'Acirc','\xE5':'aring','\xC5':'angst','\xE4':'auml','\xC4':'Auml','\xE3':'atilde','\xC3':'Atilde','\u0105':'aogon','\u0104':'Aogon','\u0101':'amacr','\u0100':'Amacr','\xE6':'aelig','\xC6':'AElig','\uD835\uDCB7':'bscr','\uD835\uDD53':'bopf','\uD835\uDD1F':'bfr','\uD835\uDD39':'Bopf','\u212C':'Bscr','\uD835\uDD05':'Bfr','\uD835\uDD20':'cfr','\uD835\uDCB8':'cscr','\uD835\uDD54':'copf','\u212D':'Cfr','\uD835\uDC9E':'Cscr','\u2102':'Copf','\u0107':'cacute','\u0106':'Cacute','\u0109':'ccirc','\u0108':'Ccirc','\u010D':'ccaron','\u010C':'Ccaron','\u010B':'cdot','\u010A':'Cdot','\xE7':'ccedil','\xC7':'Ccedil','\u2105':'incare','\uD835\uDD21':'dfr','\u2146':'dd','\uD835\uDD55':'dopf','\uD835\uDCB9':'dscr','\uD835\uDC9F':'Dscr','\uD835\uDD07':'Dfr','\u2145':'DD','\uD835\uDD3B':'Dopf','\u010F':'dcaron','\u010E':'Dcaron','\u0111':'dstrok','\u0110':'Dstrok','\xF0':'eth','\xD0':'ETH','\u2147':'ee','\u212F':'escr','\uD835\uDD22':'efr','\uD835\uDD56':'eopf','\u2130':'Escr','\uD835\uDD08':'Efr','\uD835\uDD3C':'Eopf','\xE9':'eacute','\xC9':'Eacute','\xE8':'egrave','\xC8':'Egrave','\xEA':'ecirc','\xCA':'Ecirc','\u011B':'ecaron','\u011A':'Ecaron','\xEB':'euml','\xCB':'Euml','\u0117':'edot','\u0116':'Edot','\u0119':'eogon','\u0118':'Eogon','\u0113':'emacr','\u0112':'Emacr','\uD835\uDD23':'ffr','\uD835\uDD57':'fopf','\uD835\uDCBB':'fscr','\uD835\uDD09':'Ffr','\uD835\uDD3D':'Fopf','\u2131':'Fscr','\uFB00':'fflig','\uFB03':'ffilig','\uFB04':'ffllig','\uFB01':'filig','fj':'fjlig','\uFB02':'fllig','\u0192':'fnof','\u210A':'gscr','\uD835\uDD58':'gopf','\uD835\uDD24':'gfr','\uD835\uDCA2':'Gscr','\uD835\uDD3E':'Gopf','\uD835\uDD0A':'Gfr','\u01F5':'gacute','\u011F':'gbreve','\u011E':'Gbreve','\u011D':'gcirc','\u011C':'Gcirc','\u0121':'gdot','\u0120':'Gdot','\u0122':'Gcedil','\uD835\uDD25':'hfr','\u210E':'planckh','\uD835\uDCBD':'hscr','\uD835\uDD59':'hopf','\u210B':'Hscr','\u210C':'Hfr','\u210D':'Hopf','\u0125':'hcirc','\u0124':'Hcirc','\u210F':'hbar','\u0127':'hstrok','\u0126':'Hstrok','\uD835\uDD5A':'iopf','\uD835\uDD26':'ifr','\uD835\uDCBE':'iscr','\u2148':'ii','\uD835\uDD40':'Iopf','\u2110':'Iscr','\u2111':'Im','\xED':'iacute','\xCD':'Iacute','\xEC':'igrave','\xCC':'Igrave','\xEE':'icirc','\xCE':'Icirc','\xEF':'iuml','\xCF':'Iuml','\u0129':'itilde','\u0128':'Itilde','\u0130':'Idot','\u012F':'iogon','\u012E':'Iogon','\u012B':'imacr','\u012A':'Imacr','\u0133':'ijlig','\u0132':'IJlig','\u0131':'imath','\uD835\uDCBF':'jscr','\uD835\uDD5B':'jopf','\uD835\uDD27':'jfr','\uD835\uDCA5':'Jscr','\uD835\uDD0D':'Jfr','\uD835\uDD41':'Jopf','\u0135':'jcirc','\u0134':'Jcirc','\u0237':'jmath','\uD835\uDD5C':'kopf','\uD835\uDCC0':'kscr','\uD835\uDD28':'kfr','\uD835\uDCA6':'Kscr','\uD835\uDD42':'Kopf','\uD835\uDD0E':'Kfr','\u0137':'kcedil','\u0136':'Kcedil','\uD835\uDD29':'lfr','\uD835\uDCC1':'lscr','\u2113':'ell','\uD835\uDD5D':'lopf','\u2112':'Lscr','\uD835\uDD0F':'Lfr','\uD835\uDD43':'Lopf','\u013A':'lacute','\u0139':'Lacute','\u013E':'lcaron','\u013D':'Lcaron','\u013C':'lcedil','\u013B':'Lcedil','\u0142':'lstrok','\u0141':'Lstrok','\u0140':'lmidot','\u013F':'Lmidot','\uD835\uDD2A':'mfr','\uD835\uDD5E':'mopf','\uD835\uDCC2':'mscr','\uD835\uDD10':'Mfr','\uD835\uDD44':'Mopf','\u2133':'Mscr','\uD835\uDD2B':'nfr','\uD835\uDD5F':'nopf','\uD835\uDCC3':'nscr','\u2115':'Nopf','\uD835\uDCA9':'Nscr','\uD835\uDD11':'Nfr','\u0144':'nacute','\u0143':'Nacute','\u0148':'ncaron','\u0147':'Ncaron','\xF1':'ntilde','\xD1':'Ntilde','\u0146':'ncedil','\u0145':'Ncedil','\u2116':'numero','\u014B':'eng','\u014A':'ENG','\uD835\uDD60':'oopf','\uD835\uDD2C':'ofr','\u2134':'oscr','\uD835\uDCAA':'Oscr','\uD835\uDD12':'Ofr','\uD835\uDD46':'Oopf','\xBA':'ordm','\xF3':'oacute','\xD3':'Oacute','\xF2':'ograve','\xD2':'Ograve','\xF4':'ocirc','\xD4':'Ocirc','\xF6':'ouml','\xD6':'Ouml','\u0151':'odblac','\u0150':'Odblac','\xF5':'otilde','\xD5':'Otilde','\xF8':'oslash','\xD8':'Oslash','\u014D':'omacr','\u014C':'Omacr','\u0153':'oelig','\u0152':'OElig','\uD835\uDD2D':'pfr','\uD835\uDCC5':'pscr','\uD835\uDD61':'popf','\u2119':'Popf','\uD835\uDD13':'Pfr','\uD835\uDCAB':'Pscr','\uD835\uDD62':'qopf','\uD835\uDD2E':'qfr','\uD835\uDCC6':'qscr','\uD835\uDCAC':'Qscr','\uD835\uDD14':'Qfr','\u211A':'Qopf','\u0138':'kgreen','\uD835\uDD2F':'rfr','\uD835\uDD63':'ropf','\uD835\uDCC7':'rscr','\u211B':'Rscr','\u211C':'Re','\u211D':'Ropf','\u0155':'racute','\u0154':'Racute','\u0159':'rcaron','\u0158':'Rcaron','\u0157':'rcedil','\u0156':'Rcedil','\uD835\uDD64':'sopf','\uD835\uDCC8':'sscr','\uD835\uDD30':'sfr','\uD835\uDD4A':'Sopf','\uD835\uDD16':'Sfr','\uD835\uDCAE':'Sscr','\u24C8':'oS','\u015B':'sacute','\u015A':'Sacute','\u015D':'scirc','\u015C':'Scirc','\u0161':'scaron','\u0160':'Scaron','\u015F':'scedil','\u015E':'Scedil','\xDF':'szlig','\uD835\uDD31':'tfr','\uD835\uDCC9':'tscr','\uD835\uDD65':'topf','\uD835\uDCAF':'Tscr','\uD835\uDD17':'Tfr','\uD835\uDD4B':'Topf','\u0165':'tcaron','\u0164':'Tcaron','\u0163':'tcedil','\u0162':'Tcedil','\u2122':'trade','\u0167':'tstrok','\u0166':'Tstrok','\uD835\uDCCA':'uscr','\uD835\uDD66':'uopf','\uD835\uDD32':'ufr','\uD835\uDD4C':'Uopf','\uD835\uDD18':'Ufr','\uD835\uDCB0':'Uscr','\xFA':'uacute','\xDA':'Uacute','\xF9':'ugrave','\xD9':'Ugrave','\u016D':'ubreve','\u016C':'Ubreve','\xFB':'ucirc','\xDB':'Ucirc','\u016F':'uring','\u016E':'Uring','\xFC':'uuml','\xDC':'Uuml','\u0171':'udblac','\u0170':'Udblac','\u0169':'utilde','\u0168':'Utilde','\u0173':'uogon','\u0172':'Uogon','\u016B':'umacr','\u016A':'Umacr','\uD835\uDD33':'vfr','\uD835\uDD67':'vopf','\uD835\uDCCB':'vscr','\uD835\uDD19':'Vfr','\uD835\uDD4D':'Vopf','\uD835\uDCB1':'Vscr','\uD835\uDD68':'wopf','\uD835\uDCCC':'wscr','\uD835\uDD34':'wfr','\uD835\uDCB2':'Wscr','\uD835\uDD4E':'Wopf','\uD835\uDD1A':'Wfr','\u0175':'wcirc','\u0174':'Wcirc','\uD835\uDD35':'xfr','\uD835\uDCCD':'xscr','\uD835\uDD69':'xopf','\uD835\uDD4F':'Xopf','\uD835\uDD1B':'Xfr','\uD835\uDCB3':'Xscr','\uD835\uDD36':'yfr','\uD835\uDCCE':'yscr','\uD835\uDD6A':'yopf','\uD835\uDCB4':'Yscr','\uD835\uDD1C':'Yfr','\uD835\uDD50':'Yopf','\xFD':'yacute','\xDD':'Yacute','\u0177':'ycirc','\u0176':'Ycirc','\xFF':'yuml','\u0178':'Yuml','\uD835\uDCCF':'zscr','\uD835\uDD37':'zfr','\uD835\uDD6B':'zopf','\u2128':'Zfr','\u2124':'Zopf','\uD835\uDCB5':'Zscr','\u017A':'zacute','\u0179':'Zacute','\u017E':'zcaron','\u017D':'Zcaron','\u017C':'zdot','\u017B':'Zdot','\u01B5':'imped','\xFE':'thorn','\xDE':'THORN','\u0149':'napos','\u03B1':'alpha','\u0391':'Alpha','\u03B2':'beta','\u0392':'Beta','\u03B3':'gamma','\u0393':'Gamma','\u03B4':'delta','\u0394':'Delta','\u03B5':'epsi','\u03F5':'epsiv','\u0395':'Epsilon','\u03DD':'gammad','\u03DC':'Gammad','\u03B6':'zeta','\u0396':'Zeta','\u03B7':'eta','\u0397':'Eta','\u03B8':'theta','\u03D1':'thetav','\u0398':'Theta','\u03B9':'iota','\u0399':'Iota','\u03BA':'kappa','\u03F0':'kappav','\u039A':'Kappa','\u03BB':'lambda','\u039B':'Lambda','\u03BC':'mu','\xB5':'micro','\u039C':'Mu','\u03BD':'nu','\u039D':'Nu','\u03BE':'xi','\u039E':'Xi','\u03BF':'omicron','\u039F':'Omicron','\u03C0':'pi','\u03D6':'piv','\u03A0':'Pi','\u03C1':'rho','\u03F1':'rhov','\u03A1':'Rho','\u03C3':'sigma','\u03A3':'Sigma','\u03C2':'sigmaf','\u03C4':'tau','\u03A4':'Tau','\u03C5':'upsi','\u03A5':'Upsilon','\u03D2':'Upsi','\u03C6':'phi','\u03D5':'phiv','\u03A6':'Phi','\u03C7':'chi','\u03A7':'Chi','\u03C8':'psi','\u03A8':'Psi','\u03C9':'omega','\u03A9':'ohm','\u0430':'acy','\u0410':'Acy','\u0431':'bcy','\u0411':'Bcy','\u0432':'vcy','\u0412':'Vcy','\u0433':'gcy','\u0413':'Gcy','\u0453':'gjcy','\u0403':'GJcy','\u0434':'dcy','\u0414':'Dcy','\u0452':'djcy','\u0402':'DJcy','\u0435':'iecy','\u0415':'IEcy','\u0451':'iocy','\u0401':'IOcy','\u0454':'jukcy','\u0404':'Jukcy','\u0436':'zhcy','\u0416':'ZHcy','\u0437':'zcy','\u0417':'Zcy','\u0455':'dscy','\u0405':'DScy','\u0438':'icy','\u0418':'Icy','\u0456':'iukcy','\u0406':'Iukcy','\u0457':'yicy','\u0407':'YIcy','\u0439':'jcy','\u0419':'Jcy','\u0458':'jsercy','\u0408':'Jsercy','\u043A':'kcy','\u041A':'Kcy','\u045C':'kjcy','\u040C':'KJcy','\u043B':'lcy','\u041B':'Lcy','\u0459':'ljcy','\u0409':'LJcy','\u043C':'mcy','\u041C':'Mcy','\u043D':'ncy','\u041D':'Ncy','\u045A':'njcy','\u040A':'NJcy','\u043E':'ocy','\u041E':'Ocy','\u043F':'pcy','\u041F':'Pcy','\u0440':'rcy','\u0420':'Rcy','\u0441':'scy','\u0421':'Scy','\u0442':'tcy','\u0422':'Tcy','\u045B':'tshcy','\u040B':'TSHcy','\u0443':'ucy','\u0423':'Ucy','\u045E':'ubrcy','\u040E':'Ubrcy','\u0444':'fcy','\u0424':'Fcy','\u0445':'khcy','\u0425':'KHcy','\u0446':'tscy','\u0426':'TScy','\u0447':'chcy','\u0427':'CHcy','\u045F':'dzcy','\u040F':'DZcy','\u0448':'shcy','\u0428':'SHcy','\u0449':'shchcy','\u0429':'SHCHcy','\u044A':'hardcy','\u042A':'HARDcy','\u044B':'ycy','\u042B':'Ycy','\u044C':'softcy','\u042C':'SOFTcy','\u044D':'ecy','\u042D':'Ecy','\u044E':'yucy','\u042E':'YUcy','\u044F':'yacy','\u042F':'YAcy','\u2135':'aleph','\u2136':'beth','\u2137':'gimel','\u2138':'daleth'};

	var regexEscape = /["&'<>`]/g;
	var escapeMap = {
		'"': '&quot;',
		'&': '&amp;',
		'\'': '&#x27;',
		'<': '&lt;',
		// See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
		// following is not strictly necessary unless it’s part of a tag or an
		// unquoted attribute value. We’re only escaping it to support those
		// situations, and for XML support.
		'>': '&gt;',
		// In Internet Explorer ≤ 8, the backtick character can be used
		// to break out of (un)quoted attribute values or HTML comments.
		// See http://html5sec.org/#102, http://html5sec.org/#108, and
		// http://html5sec.org/#133.
		'`': '&#x60;'
	};

	var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
	var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
	var decodeMap = {'aacute':'\xE1','Aacute':'\xC1','abreve':'\u0103','Abreve':'\u0102','ac':'\u223E','acd':'\u223F','acE':'\u223E\u0333','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','acy':'\u0430','Acy':'\u0410','aelig':'\xE6','AElig':'\xC6','af':'\u2061','afr':'\uD835\uDD1E','Afr':'\uD835\uDD04','agrave':'\xE0','Agrave':'\xC0','alefsym':'\u2135','aleph':'\u2135','alpha':'\u03B1','Alpha':'\u0391','amacr':'\u0101','Amacr':'\u0100','amalg':'\u2A3F','amp':'&','AMP':'&','and':'\u2227','And':'\u2A53','andand':'\u2A55','andd':'\u2A5C','andslope':'\u2A58','andv':'\u2A5A','ang':'\u2220','ange':'\u29A4','angle':'\u2220','angmsd':'\u2221','angmsdaa':'\u29A8','angmsdab':'\u29A9','angmsdac':'\u29AA','angmsdad':'\u29AB','angmsdae':'\u29AC','angmsdaf':'\u29AD','angmsdag':'\u29AE','angmsdah':'\u29AF','angrt':'\u221F','angrtvb':'\u22BE','angrtvbd':'\u299D','angsph':'\u2222','angst':'\xC5','angzarr':'\u237C','aogon':'\u0105','Aogon':'\u0104','aopf':'\uD835\uDD52','Aopf':'\uD835\uDD38','ap':'\u2248','apacir':'\u2A6F','ape':'\u224A','apE':'\u2A70','apid':'\u224B','apos':'\'','ApplyFunction':'\u2061','approx':'\u2248','approxeq':'\u224A','aring':'\xE5','Aring':'\xC5','ascr':'\uD835\uDCB6','Ascr':'\uD835\uDC9C','Assign':'\u2254','ast':'*','asymp':'\u2248','asympeq':'\u224D','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','awconint':'\u2233','awint':'\u2A11','backcong':'\u224C','backepsilon':'\u03F6','backprime':'\u2035','backsim':'\u223D','backsimeq':'\u22CD','Backslash':'\u2216','Barv':'\u2AE7','barvee':'\u22BD','barwed':'\u2305','Barwed':'\u2306','barwedge':'\u2305','bbrk':'\u23B5','bbrktbrk':'\u23B6','bcong':'\u224C','bcy':'\u0431','Bcy':'\u0411','bdquo':'\u201E','becaus':'\u2235','because':'\u2235','Because':'\u2235','bemptyv':'\u29B0','bepsi':'\u03F6','bernou':'\u212C','Bernoullis':'\u212C','beta':'\u03B2','Beta':'\u0392','beth':'\u2136','between':'\u226C','bfr':'\uD835\uDD1F','Bfr':'\uD835\uDD05','bigcap':'\u22C2','bigcirc':'\u25EF','bigcup':'\u22C3','bigodot':'\u2A00','bigoplus':'\u2A01','bigotimes':'\u2A02','bigsqcup':'\u2A06','bigstar':'\u2605','bigtriangledown':'\u25BD','bigtriangleup':'\u25B3','biguplus':'\u2A04','bigvee':'\u22C1','bigwedge':'\u22C0','bkarow':'\u290D','blacklozenge':'\u29EB','blacksquare':'\u25AA','blacktriangle':'\u25B4','blacktriangledown':'\u25BE','blacktriangleleft':'\u25C2','blacktriangleright':'\u25B8','blank':'\u2423','blk12':'\u2592','blk14':'\u2591','blk34':'\u2593','block':'\u2588','bne':'=\u20E5','bnequiv':'\u2261\u20E5','bnot':'\u2310','bNot':'\u2AED','bopf':'\uD835\uDD53','Bopf':'\uD835\uDD39','bot':'\u22A5','bottom':'\u22A5','bowtie':'\u22C8','boxbox':'\u29C9','boxdl':'\u2510','boxdL':'\u2555','boxDl':'\u2556','boxDL':'\u2557','boxdr':'\u250C','boxdR':'\u2552','boxDr':'\u2553','boxDR':'\u2554','boxh':'\u2500','boxH':'\u2550','boxhd':'\u252C','boxhD':'\u2565','boxHd':'\u2564','boxHD':'\u2566','boxhu':'\u2534','boxhU':'\u2568','boxHu':'\u2567','boxHU':'\u2569','boxminus':'\u229F','boxplus':'\u229E','boxtimes':'\u22A0','boxul':'\u2518','boxuL':'\u255B','boxUl':'\u255C','boxUL':'\u255D','boxur':'\u2514','boxuR':'\u2558','boxUr':'\u2559','boxUR':'\u255A','boxv':'\u2502','boxV':'\u2551','boxvh':'\u253C','boxvH':'\u256A','boxVh':'\u256B','boxVH':'\u256C','boxvl':'\u2524','boxvL':'\u2561','boxVl':'\u2562','boxVL':'\u2563','boxvr':'\u251C','boxvR':'\u255E','boxVr':'\u255F','boxVR':'\u2560','bprime':'\u2035','breve':'\u02D8','Breve':'\u02D8','brvbar':'\xA6','bscr':'\uD835\uDCB7','Bscr':'\u212C','bsemi':'\u204F','bsim':'\u223D','bsime':'\u22CD','bsol':'\\','bsolb':'\u29C5','bsolhsub':'\u27C8','bull':'\u2022','bullet':'\u2022','bump':'\u224E','bumpe':'\u224F','bumpE':'\u2AAE','bumpeq':'\u224F','Bumpeq':'\u224E','cacute':'\u0107','Cacute':'\u0106','cap':'\u2229','Cap':'\u22D2','capand':'\u2A44','capbrcup':'\u2A49','capcap':'\u2A4B','capcup':'\u2A47','capdot':'\u2A40','CapitalDifferentialD':'\u2145','caps':'\u2229\uFE00','caret':'\u2041','caron':'\u02C7','Cayleys':'\u212D','ccaps':'\u2A4D','ccaron':'\u010D','Ccaron':'\u010C','ccedil':'\xE7','Ccedil':'\xC7','ccirc':'\u0109','Ccirc':'\u0108','Cconint':'\u2230','ccups':'\u2A4C','ccupssm':'\u2A50','cdot':'\u010B','Cdot':'\u010A','cedil':'\xB8','Cedilla':'\xB8','cemptyv':'\u29B2','cent':'\xA2','centerdot':'\xB7','CenterDot':'\xB7','cfr':'\uD835\uDD20','Cfr':'\u212D','chcy':'\u0447','CHcy':'\u0427','check':'\u2713','checkmark':'\u2713','chi':'\u03C7','Chi':'\u03A7','cir':'\u25CB','circ':'\u02C6','circeq':'\u2257','circlearrowleft':'\u21BA','circlearrowright':'\u21BB','circledast':'\u229B','circledcirc':'\u229A','circleddash':'\u229D','CircleDot':'\u2299','circledR':'\xAE','circledS':'\u24C8','CircleMinus':'\u2296','CirclePlus':'\u2295','CircleTimes':'\u2297','cire':'\u2257','cirE':'\u29C3','cirfnint':'\u2A10','cirmid':'\u2AEF','cirscir':'\u29C2','ClockwiseContourIntegral':'\u2232','CloseCurlyDoubleQuote':'\u201D','CloseCurlyQuote':'\u2019','clubs':'\u2663','clubsuit':'\u2663','colon':':','Colon':'\u2237','colone':'\u2254','Colone':'\u2A74','coloneq':'\u2254','comma':',','commat':'@','comp':'\u2201','compfn':'\u2218','complement':'\u2201','complexes':'\u2102','cong':'\u2245','congdot':'\u2A6D','Congruent':'\u2261','conint':'\u222E','Conint':'\u222F','ContourIntegral':'\u222E','copf':'\uD835\uDD54','Copf':'\u2102','coprod':'\u2210','Coproduct':'\u2210','copy':'\xA9','COPY':'\xA9','copysr':'\u2117','CounterClockwiseContourIntegral':'\u2233','crarr':'\u21B5','cross':'\u2717','Cross':'\u2A2F','cscr':'\uD835\uDCB8','Cscr':'\uD835\uDC9E','csub':'\u2ACF','csube':'\u2AD1','csup':'\u2AD0','csupe':'\u2AD2','ctdot':'\u22EF','cudarrl':'\u2938','cudarrr':'\u2935','cuepr':'\u22DE','cuesc':'\u22DF','cularr':'\u21B6','cularrp':'\u293D','cup':'\u222A','Cup':'\u22D3','cupbrcap':'\u2A48','cupcap':'\u2A46','CupCap':'\u224D','cupcup':'\u2A4A','cupdot':'\u228D','cupor':'\u2A45','cups':'\u222A\uFE00','curarr':'\u21B7','curarrm':'\u293C','curlyeqprec':'\u22DE','curlyeqsucc':'\u22DF','curlyvee':'\u22CE','curlywedge':'\u22CF','curren':'\xA4','curvearrowleft':'\u21B6','curvearrowright':'\u21B7','cuvee':'\u22CE','cuwed':'\u22CF','cwconint':'\u2232','cwint':'\u2231','cylcty':'\u232D','dagger':'\u2020','Dagger':'\u2021','daleth':'\u2138','darr':'\u2193','dArr':'\u21D3','Darr':'\u21A1','dash':'\u2010','dashv':'\u22A3','Dashv':'\u2AE4','dbkarow':'\u290F','dblac':'\u02DD','dcaron':'\u010F','Dcaron':'\u010E','dcy':'\u0434','Dcy':'\u0414','dd':'\u2146','DD':'\u2145','ddagger':'\u2021','ddarr':'\u21CA','DDotrahd':'\u2911','ddotseq':'\u2A77','deg':'\xB0','Del':'\u2207','delta':'\u03B4','Delta':'\u0394','demptyv':'\u29B1','dfisht':'\u297F','dfr':'\uD835\uDD21','Dfr':'\uD835\uDD07','dHar':'\u2965','dharl':'\u21C3','dharr':'\u21C2','DiacriticalAcute':'\xB4','DiacriticalDot':'\u02D9','DiacriticalDoubleAcute':'\u02DD','DiacriticalGrave':'`','DiacriticalTilde':'\u02DC','diam':'\u22C4','diamond':'\u22C4','Diamond':'\u22C4','diamondsuit':'\u2666','diams':'\u2666','die':'\xA8','DifferentialD':'\u2146','digamma':'\u03DD','disin':'\u22F2','div':'\xF7','divide':'\xF7','divideontimes':'\u22C7','divonx':'\u22C7','djcy':'\u0452','DJcy':'\u0402','dlcorn':'\u231E','dlcrop':'\u230D','dollar':'$','dopf':'\uD835\uDD55','Dopf':'\uD835\uDD3B','dot':'\u02D9','Dot':'\xA8','DotDot':'\u20DC','doteq':'\u2250','doteqdot':'\u2251','DotEqual':'\u2250','dotminus':'\u2238','dotplus':'\u2214','dotsquare':'\u22A1','doublebarwedge':'\u2306','DoubleContourIntegral':'\u222F','DoubleDot':'\xA8','DoubleDownArrow':'\u21D3','DoubleLeftArrow':'\u21D0','DoubleLeftRightArrow':'\u21D4','DoubleLeftTee':'\u2AE4','DoubleLongLeftArrow':'\u27F8','DoubleLongLeftRightArrow':'\u27FA','DoubleLongRightArrow':'\u27F9','DoubleRightArrow':'\u21D2','DoubleRightTee':'\u22A8','DoubleUpArrow':'\u21D1','DoubleUpDownArrow':'\u21D5','DoubleVerticalBar':'\u2225','downarrow':'\u2193','Downarrow':'\u21D3','DownArrow':'\u2193','DownArrowBar':'\u2913','DownArrowUpArrow':'\u21F5','DownBreve':'\u0311','downdownarrows':'\u21CA','downharpoonleft':'\u21C3','downharpoonright':'\u21C2','DownLeftRightVector':'\u2950','DownLeftTeeVector':'\u295E','DownLeftVector':'\u21BD','DownLeftVectorBar':'\u2956','DownRightTeeVector':'\u295F','DownRightVector':'\u21C1','DownRightVectorBar':'\u2957','DownTee':'\u22A4','DownTeeArrow':'\u21A7','drbkarow':'\u2910','drcorn':'\u231F','drcrop':'\u230C','dscr':'\uD835\uDCB9','Dscr':'\uD835\uDC9F','dscy':'\u0455','DScy':'\u0405','dsol':'\u29F6','dstrok':'\u0111','Dstrok':'\u0110','dtdot':'\u22F1','dtri':'\u25BF','dtrif':'\u25BE','duarr':'\u21F5','duhar':'\u296F','dwangle':'\u29A6','dzcy':'\u045F','DZcy':'\u040F','dzigrarr':'\u27FF','eacute':'\xE9','Eacute':'\xC9','easter':'\u2A6E','ecaron':'\u011B','Ecaron':'\u011A','ecir':'\u2256','ecirc':'\xEA','Ecirc':'\xCA','ecolon':'\u2255','ecy':'\u044D','Ecy':'\u042D','eDDot':'\u2A77','edot':'\u0117','eDot':'\u2251','Edot':'\u0116','ee':'\u2147','efDot':'\u2252','efr':'\uD835\uDD22','Efr':'\uD835\uDD08','eg':'\u2A9A','egrave':'\xE8','Egrave':'\xC8','egs':'\u2A96','egsdot':'\u2A98','el':'\u2A99','Element':'\u2208','elinters':'\u23E7','ell':'\u2113','els':'\u2A95','elsdot':'\u2A97','emacr':'\u0113','Emacr':'\u0112','empty':'\u2205','emptyset':'\u2205','EmptySmallSquare':'\u25FB','emptyv':'\u2205','EmptyVerySmallSquare':'\u25AB','emsp':'\u2003','emsp13':'\u2004','emsp14':'\u2005','eng':'\u014B','ENG':'\u014A','ensp':'\u2002','eogon':'\u0119','Eogon':'\u0118','eopf':'\uD835\uDD56','Eopf':'\uD835\uDD3C','epar':'\u22D5','eparsl':'\u29E3','eplus':'\u2A71','epsi':'\u03B5','epsilon':'\u03B5','Epsilon':'\u0395','epsiv':'\u03F5','eqcirc':'\u2256','eqcolon':'\u2255','eqsim':'\u2242','eqslantgtr':'\u2A96','eqslantless':'\u2A95','Equal':'\u2A75','equals':'=','EqualTilde':'\u2242','equest':'\u225F','Equilibrium':'\u21CC','equiv':'\u2261','equivDD':'\u2A78','eqvparsl':'\u29E5','erarr':'\u2971','erDot':'\u2253','escr':'\u212F','Escr':'\u2130','esdot':'\u2250','esim':'\u2242','Esim':'\u2A73','eta':'\u03B7','Eta':'\u0397','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','euro':'\u20AC','excl':'!','exist':'\u2203','Exists':'\u2203','expectation':'\u2130','exponentiale':'\u2147','ExponentialE':'\u2147','fallingdotseq':'\u2252','fcy':'\u0444','Fcy':'\u0424','female':'\u2640','ffilig':'\uFB03','fflig':'\uFB00','ffllig':'\uFB04','ffr':'\uD835\uDD23','Ffr':'\uD835\uDD09','filig':'\uFB01','FilledSmallSquare':'\u25FC','FilledVerySmallSquare':'\u25AA','fjlig':'fj','flat':'\u266D','fllig':'\uFB02','fltns':'\u25B1','fnof':'\u0192','fopf':'\uD835\uDD57','Fopf':'\uD835\uDD3D','forall':'\u2200','ForAll':'\u2200','fork':'\u22D4','forkv':'\u2AD9','Fouriertrf':'\u2131','fpartint':'\u2A0D','frac12':'\xBD','frac13':'\u2153','frac14':'\xBC','frac15':'\u2155','frac16':'\u2159','frac18':'\u215B','frac23':'\u2154','frac25':'\u2156','frac34':'\xBE','frac35':'\u2157','frac38':'\u215C','frac45':'\u2158','frac56':'\u215A','frac58':'\u215D','frac78':'\u215E','frasl':'\u2044','frown':'\u2322','fscr':'\uD835\uDCBB','Fscr':'\u2131','gacute':'\u01F5','gamma':'\u03B3','Gamma':'\u0393','gammad':'\u03DD','Gammad':'\u03DC','gap':'\u2A86','gbreve':'\u011F','Gbreve':'\u011E','Gcedil':'\u0122','gcirc':'\u011D','Gcirc':'\u011C','gcy':'\u0433','Gcy':'\u0413','gdot':'\u0121','Gdot':'\u0120','ge':'\u2265','gE':'\u2267','gel':'\u22DB','gEl':'\u2A8C','geq':'\u2265','geqq':'\u2267','geqslant':'\u2A7E','ges':'\u2A7E','gescc':'\u2AA9','gesdot':'\u2A80','gesdoto':'\u2A82','gesdotol':'\u2A84','gesl':'\u22DB\uFE00','gesles':'\u2A94','gfr':'\uD835\uDD24','Gfr':'\uD835\uDD0A','gg':'\u226B','Gg':'\u22D9','ggg':'\u22D9','gimel':'\u2137','gjcy':'\u0453','GJcy':'\u0403','gl':'\u2277','gla':'\u2AA5','glE':'\u2A92','glj':'\u2AA4','gnap':'\u2A8A','gnapprox':'\u2A8A','gne':'\u2A88','gnE':'\u2269','gneq':'\u2A88','gneqq':'\u2269','gnsim':'\u22E7','gopf':'\uD835\uDD58','Gopf':'\uD835\uDD3E','grave':'`','GreaterEqual':'\u2265','GreaterEqualLess':'\u22DB','GreaterFullEqual':'\u2267','GreaterGreater':'\u2AA2','GreaterLess':'\u2277','GreaterSlantEqual':'\u2A7E','GreaterTilde':'\u2273','gscr':'\u210A','Gscr':'\uD835\uDCA2','gsim':'\u2273','gsime':'\u2A8E','gsiml':'\u2A90','gt':'>','Gt':'\u226B','GT':'>','gtcc':'\u2AA7','gtcir':'\u2A7A','gtdot':'\u22D7','gtlPar':'\u2995','gtquest':'\u2A7C','gtrapprox':'\u2A86','gtrarr':'\u2978','gtrdot':'\u22D7','gtreqless':'\u22DB','gtreqqless':'\u2A8C','gtrless':'\u2277','gtrsim':'\u2273','gvertneqq':'\u2269\uFE00','gvnE':'\u2269\uFE00','Hacek':'\u02C7','hairsp':'\u200A','half':'\xBD','hamilt':'\u210B','hardcy':'\u044A','HARDcy':'\u042A','harr':'\u2194','hArr':'\u21D4','harrcir':'\u2948','harrw':'\u21AD','Hat':'^','hbar':'\u210F','hcirc':'\u0125','Hcirc':'\u0124','hearts':'\u2665','heartsuit':'\u2665','hellip':'\u2026','hercon':'\u22B9','hfr':'\uD835\uDD25','Hfr':'\u210C','HilbertSpace':'\u210B','hksearow':'\u2925','hkswarow':'\u2926','hoarr':'\u21FF','homtht':'\u223B','hookleftarrow':'\u21A9','hookrightarrow':'\u21AA','hopf':'\uD835\uDD59','Hopf':'\u210D','horbar':'\u2015','HorizontalLine':'\u2500','hscr':'\uD835\uDCBD','Hscr':'\u210B','hslash':'\u210F','hstrok':'\u0127','Hstrok':'\u0126','HumpDownHump':'\u224E','HumpEqual':'\u224F','hybull':'\u2043','hyphen':'\u2010','iacute':'\xED','Iacute':'\xCD','ic':'\u2063','icirc':'\xEE','Icirc':'\xCE','icy':'\u0438','Icy':'\u0418','Idot':'\u0130','iecy':'\u0435','IEcy':'\u0415','iexcl':'\xA1','iff':'\u21D4','ifr':'\uD835\uDD26','Ifr':'\u2111','igrave':'\xEC','Igrave':'\xCC','ii':'\u2148','iiiint':'\u2A0C','iiint':'\u222D','iinfin':'\u29DC','iiota':'\u2129','ijlig':'\u0133','IJlig':'\u0132','Im':'\u2111','imacr':'\u012B','Imacr':'\u012A','image':'\u2111','ImaginaryI':'\u2148','imagline':'\u2110','imagpart':'\u2111','imath':'\u0131','imof':'\u22B7','imped':'\u01B5','Implies':'\u21D2','in':'\u2208','incare':'\u2105','infin':'\u221E','infintie':'\u29DD','inodot':'\u0131','int':'\u222B','Int':'\u222C','intcal':'\u22BA','integers':'\u2124','Integral':'\u222B','intercal':'\u22BA','Intersection':'\u22C2','intlarhk':'\u2A17','intprod':'\u2A3C','InvisibleComma':'\u2063','InvisibleTimes':'\u2062','iocy':'\u0451','IOcy':'\u0401','iogon':'\u012F','Iogon':'\u012E','iopf':'\uD835\uDD5A','Iopf':'\uD835\uDD40','iota':'\u03B9','Iota':'\u0399','iprod':'\u2A3C','iquest':'\xBF','iscr':'\uD835\uDCBE','Iscr':'\u2110','isin':'\u2208','isindot':'\u22F5','isinE':'\u22F9','isins':'\u22F4','isinsv':'\u22F3','isinv':'\u2208','it':'\u2062','itilde':'\u0129','Itilde':'\u0128','iukcy':'\u0456','Iukcy':'\u0406','iuml':'\xEF','Iuml':'\xCF','jcirc':'\u0135','Jcirc':'\u0134','jcy':'\u0439','Jcy':'\u0419','jfr':'\uD835\uDD27','Jfr':'\uD835\uDD0D','jmath':'\u0237','jopf':'\uD835\uDD5B','Jopf':'\uD835\uDD41','jscr':'\uD835\uDCBF','Jscr':'\uD835\uDCA5','jsercy':'\u0458','Jsercy':'\u0408','jukcy':'\u0454','Jukcy':'\u0404','kappa':'\u03BA','Kappa':'\u039A','kappav':'\u03F0','kcedil':'\u0137','Kcedil':'\u0136','kcy':'\u043A','Kcy':'\u041A','kfr':'\uD835\uDD28','Kfr':'\uD835\uDD0E','kgreen':'\u0138','khcy':'\u0445','KHcy':'\u0425','kjcy':'\u045C','KJcy':'\u040C','kopf':'\uD835\uDD5C','Kopf':'\uD835\uDD42','kscr':'\uD835\uDCC0','Kscr':'\uD835\uDCA6','lAarr':'\u21DA','lacute':'\u013A','Lacute':'\u0139','laemptyv':'\u29B4','lagran':'\u2112','lambda':'\u03BB','Lambda':'\u039B','lang':'\u27E8','Lang':'\u27EA','langd':'\u2991','langle':'\u27E8','lap':'\u2A85','Laplacetrf':'\u2112','laquo':'\xAB','larr':'\u2190','lArr':'\u21D0','Larr':'\u219E','larrb':'\u21E4','larrbfs':'\u291F','larrfs':'\u291D','larrhk':'\u21A9','larrlp':'\u21AB','larrpl':'\u2939','larrsim':'\u2973','larrtl':'\u21A2','lat':'\u2AAB','latail':'\u2919','lAtail':'\u291B','late':'\u2AAD','lates':'\u2AAD\uFE00','lbarr':'\u290C','lBarr':'\u290E','lbbrk':'\u2772','lbrace':'{','lbrack':'[','lbrke':'\u298B','lbrksld':'\u298F','lbrkslu':'\u298D','lcaron':'\u013E','Lcaron':'\u013D','lcedil':'\u013C','Lcedil':'\u013B','lceil':'\u2308','lcub':'{','lcy':'\u043B','Lcy':'\u041B','ldca':'\u2936','ldquo':'\u201C','ldquor':'\u201E','ldrdhar':'\u2967','ldrushar':'\u294B','ldsh':'\u21B2','le':'\u2264','lE':'\u2266','LeftAngleBracket':'\u27E8','leftarrow':'\u2190','Leftarrow':'\u21D0','LeftArrow':'\u2190','LeftArrowBar':'\u21E4','LeftArrowRightArrow':'\u21C6','leftarrowtail':'\u21A2','LeftCeiling':'\u2308','LeftDoubleBracket':'\u27E6','LeftDownTeeVector':'\u2961','LeftDownVector':'\u21C3','LeftDownVectorBar':'\u2959','LeftFloor':'\u230A','leftharpoondown':'\u21BD','leftharpoonup':'\u21BC','leftleftarrows':'\u21C7','leftrightarrow':'\u2194','Leftrightarrow':'\u21D4','LeftRightArrow':'\u2194','leftrightarrows':'\u21C6','leftrightharpoons':'\u21CB','leftrightsquigarrow':'\u21AD','LeftRightVector':'\u294E','LeftTee':'\u22A3','LeftTeeArrow':'\u21A4','LeftTeeVector':'\u295A','leftthreetimes':'\u22CB','LeftTriangle':'\u22B2','LeftTriangleBar':'\u29CF','LeftTriangleEqual':'\u22B4','LeftUpDownVector':'\u2951','LeftUpTeeVector':'\u2960','LeftUpVector':'\u21BF','LeftUpVectorBar':'\u2958','LeftVector':'\u21BC','LeftVectorBar':'\u2952','leg':'\u22DA','lEg':'\u2A8B','leq':'\u2264','leqq':'\u2266','leqslant':'\u2A7D','les':'\u2A7D','lescc':'\u2AA8','lesdot':'\u2A7F','lesdoto':'\u2A81','lesdotor':'\u2A83','lesg':'\u22DA\uFE00','lesges':'\u2A93','lessapprox':'\u2A85','lessdot':'\u22D6','lesseqgtr':'\u22DA','lesseqqgtr':'\u2A8B','LessEqualGreater':'\u22DA','LessFullEqual':'\u2266','LessGreater':'\u2276','lessgtr':'\u2276','LessLess':'\u2AA1','lesssim':'\u2272','LessSlantEqual':'\u2A7D','LessTilde':'\u2272','lfisht':'\u297C','lfloor':'\u230A','lfr':'\uD835\uDD29','Lfr':'\uD835\uDD0F','lg':'\u2276','lgE':'\u2A91','lHar':'\u2962','lhard':'\u21BD','lharu':'\u21BC','lharul':'\u296A','lhblk':'\u2584','ljcy':'\u0459','LJcy':'\u0409','ll':'\u226A','Ll':'\u22D8','llarr':'\u21C7','llcorner':'\u231E','Lleftarrow':'\u21DA','llhard':'\u296B','lltri':'\u25FA','lmidot':'\u0140','Lmidot':'\u013F','lmoust':'\u23B0','lmoustache':'\u23B0','lnap':'\u2A89','lnapprox':'\u2A89','lne':'\u2A87','lnE':'\u2268','lneq':'\u2A87','lneqq':'\u2268','lnsim':'\u22E6','loang':'\u27EC','loarr':'\u21FD','lobrk':'\u27E6','longleftarrow':'\u27F5','Longleftarrow':'\u27F8','LongLeftArrow':'\u27F5','longleftrightarrow':'\u27F7','Longleftrightarrow':'\u27FA','LongLeftRightArrow':'\u27F7','longmapsto':'\u27FC','longrightarrow':'\u27F6','Longrightarrow':'\u27F9','LongRightArrow':'\u27F6','looparrowleft':'\u21AB','looparrowright':'\u21AC','lopar':'\u2985','lopf':'\uD835\uDD5D','Lopf':'\uD835\uDD43','loplus':'\u2A2D','lotimes':'\u2A34','lowast':'\u2217','lowbar':'_','LowerLeftArrow':'\u2199','LowerRightArrow':'\u2198','loz':'\u25CA','lozenge':'\u25CA','lozf':'\u29EB','lpar':'(','lparlt':'\u2993','lrarr':'\u21C6','lrcorner':'\u231F','lrhar':'\u21CB','lrhard':'\u296D','lrm':'\u200E','lrtri':'\u22BF','lsaquo':'\u2039','lscr':'\uD835\uDCC1','Lscr':'\u2112','lsh':'\u21B0','Lsh':'\u21B0','lsim':'\u2272','lsime':'\u2A8D','lsimg':'\u2A8F','lsqb':'[','lsquo':'\u2018','lsquor':'\u201A','lstrok':'\u0142','Lstrok':'\u0141','lt':'<','Lt':'\u226A','LT':'<','ltcc':'\u2AA6','ltcir':'\u2A79','ltdot':'\u22D6','lthree':'\u22CB','ltimes':'\u22C9','ltlarr':'\u2976','ltquest':'\u2A7B','ltri':'\u25C3','ltrie':'\u22B4','ltrif':'\u25C2','ltrPar':'\u2996','lurdshar':'\u294A','luruhar':'\u2966','lvertneqq':'\u2268\uFE00','lvnE':'\u2268\uFE00','macr':'\xAF','male':'\u2642','malt':'\u2720','maltese':'\u2720','map':'\u21A6','Map':'\u2905','mapsto':'\u21A6','mapstodown':'\u21A7','mapstoleft':'\u21A4','mapstoup':'\u21A5','marker':'\u25AE','mcomma':'\u2A29','mcy':'\u043C','Mcy':'\u041C','mdash':'\u2014','mDDot':'\u223A','measuredangle':'\u2221','MediumSpace':'\u205F','Mellintrf':'\u2133','mfr':'\uD835\uDD2A','Mfr':'\uD835\uDD10','mho':'\u2127','micro':'\xB5','mid':'\u2223','midast':'*','midcir':'\u2AF0','middot':'\xB7','minus':'\u2212','minusb':'\u229F','minusd':'\u2238','minusdu':'\u2A2A','MinusPlus':'\u2213','mlcp':'\u2ADB','mldr':'\u2026','mnplus':'\u2213','models':'\u22A7','mopf':'\uD835\uDD5E','Mopf':'\uD835\uDD44','mp':'\u2213','mscr':'\uD835\uDCC2','Mscr':'\u2133','mstpos':'\u223E','mu':'\u03BC','Mu':'\u039C','multimap':'\u22B8','mumap':'\u22B8','nabla':'\u2207','nacute':'\u0144','Nacute':'\u0143','nang':'\u2220\u20D2','nap':'\u2249','napE':'\u2A70\u0338','napid':'\u224B\u0338','napos':'\u0149','napprox':'\u2249','natur':'\u266E','natural':'\u266E','naturals':'\u2115','nbsp':'\xA0','nbump':'\u224E\u0338','nbumpe':'\u224F\u0338','ncap':'\u2A43','ncaron':'\u0148','Ncaron':'\u0147','ncedil':'\u0146','Ncedil':'\u0145','ncong':'\u2247','ncongdot':'\u2A6D\u0338','ncup':'\u2A42','ncy':'\u043D','Ncy':'\u041D','ndash':'\u2013','ne':'\u2260','nearhk':'\u2924','nearr':'\u2197','neArr':'\u21D7','nearrow':'\u2197','nedot':'\u2250\u0338','NegativeMediumSpace':'\u200B','NegativeThickSpace':'\u200B','NegativeThinSpace':'\u200B','NegativeVeryThinSpace':'\u200B','nequiv':'\u2262','nesear':'\u2928','nesim':'\u2242\u0338','NestedGreaterGreater':'\u226B','NestedLessLess':'\u226A','NewLine':'\n','nexist':'\u2204','nexists':'\u2204','nfr':'\uD835\uDD2B','Nfr':'\uD835\uDD11','nge':'\u2271','ngE':'\u2267\u0338','ngeq':'\u2271','ngeqq':'\u2267\u0338','ngeqslant':'\u2A7E\u0338','nges':'\u2A7E\u0338','nGg':'\u22D9\u0338','ngsim':'\u2275','ngt':'\u226F','nGt':'\u226B\u20D2','ngtr':'\u226F','nGtv':'\u226B\u0338','nharr':'\u21AE','nhArr':'\u21CE','nhpar':'\u2AF2','ni':'\u220B','nis':'\u22FC','nisd':'\u22FA','niv':'\u220B','njcy':'\u045A','NJcy':'\u040A','nlarr':'\u219A','nlArr':'\u21CD','nldr':'\u2025','nle':'\u2270','nlE':'\u2266\u0338','nleftarrow':'\u219A','nLeftarrow':'\u21CD','nleftrightarrow':'\u21AE','nLeftrightarrow':'\u21CE','nleq':'\u2270','nleqq':'\u2266\u0338','nleqslant':'\u2A7D\u0338','nles':'\u2A7D\u0338','nless':'\u226E','nLl':'\u22D8\u0338','nlsim':'\u2274','nlt':'\u226E','nLt':'\u226A\u20D2','nltri':'\u22EA','nltrie':'\u22EC','nLtv':'\u226A\u0338','nmid':'\u2224','NoBreak':'\u2060','NonBreakingSpace':'\xA0','nopf':'\uD835\uDD5F','Nopf':'\u2115','not':'\xAC','Not':'\u2AEC','NotCongruent':'\u2262','NotCupCap':'\u226D','NotDoubleVerticalBar':'\u2226','NotElement':'\u2209','NotEqual':'\u2260','NotEqualTilde':'\u2242\u0338','NotExists':'\u2204','NotGreater':'\u226F','NotGreaterEqual':'\u2271','NotGreaterFullEqual':'\u2267\u0338','NotGreaterGreater':'\u226B\u0338','NotGreaterLess':'\u2279','NotGreaterSlantEqual':'\u2A7E\u0338','NotGreaterTilde':'\u2275','NotHumpDownHump':'\u224E\u0338','NotHumpEqual':'\u224F\u0338','notin':'\u2209','notindot':'\u22F5\u0338','notinE':'\u22F9\u0338','notinva':'\u2209','notinvb':'\u22F7','notinvc':'\u22F6','NotLeftTriangle':'\u22EA','NotLeftTriangleBar':'\u29CF\u0338','NotLeftTriangleEqual':'\u22EC','NotLess':'\u226E','NotLessEqual':'\u2270','NotLessGreater':'\u2278','NotLessLess':'\u226A\u0338','NotLessSlantEqual':'\u2A7D\u0338','NotLessTilde':'\u2274','NotNestedGreaterGreater':'\u2AA2\u0338','NotNestedLessLess':'\u2AA1\u0338','notni':'\u220C','notniva':'\u220C','notnivb':'\u22FE','notnivc':'\u22FD','NotPrecedes':'\u2280','NotPrecedesEqual':'\u2AAF\u0338','NotPrecedesSlantEqual':'\u22E0','NotReverseElement':'\u220C','NotRightTriangle':'\u22EB','NotRightTriangleBar':'\u29D0\u0338','NotRightTriangleEqual':'\u22ED','NotSquareSubset':'\u228F\u0338','NotSquareSubsetEqual':'\u22E2','NotSquareSuperset':'\u2290\u0338','NotSquareSupersetEqual':'\u22E3','NotSubset':'\u2282\u20D2','NotSubsetEqual':'\u2288','NotSucceeds':'\u2281','NotSucceedsEqual':'\u2AB0\u0338','NotSucceedsSlantEqual':'\u22E1','NotSucceedsTilde':'\u227F\u0338','NotSuperset':'\u2283\u20D2','NotSupersetEqual':'\u2289','NotTilde':'\u2241','NotTildeEqual':'\u2244','NotTildeFullEqual':'\u2247','NotTildeTilde':'\u2249','NotVerticalBar':'\u2224','npar':'\u2226','nparallel':'\u2226','nparsl':'\u2AFD\u20E5','npart':'\u2202\u0338','npolint':'\u2A14','npr':'\u2280','nprcue':'\u22E0','npre':'\u2AAF\u0338','nprec':'\u2280','npreceq':'\u2AAF\u0338','nrarr':'\u219B','nrArr':'\u21CF','nrarrc':'\u2933\u0338','nrarrw':'\u219D\u0338','nrightarrow':'\u219B','nRightarrow':'\u21CF','nrtri':'\u22EB','nrtrie':'\u22ED','nsc':'\u2281','nsccue':'\u22E1','nsce':'\u2AB0\u0338','nscr':'\uD835\uDCC3','Nscr':'\uD835\uDCA9','nshortmid':'\u2224','nshortparallel':'\u2226','nsim':'\u2241','nsime':'\u2244','nsimeq':'\u2244','nsmid':'\u2224','nspar':'\u2226','nsqsube':'\u22E2','nsqsupe':'\u22E3','nsub':'\u2284','nsube':'\u2288','nsubE':'\u2AC5\u0338','nsubset':'\u2282\u20D2','nsubseteq':'\u2288','nsubseteqq':'\u2AC5\u0338','nsucc':'\u2281','nsucceq':'\u2AB0\u0338','nsup':'\u2285','nsupe':'\u2289','nsupE':'\u2AC6\u0338','nsupset':'\u2283\u20D2','nsupseteq':'\u2289','nsupseteqq':'\u2AC6\u0338','ntgl':'\u2279','ntilde':'\xF1','Ntilde':'\xD1','ntlg':'\u2278','ntriangleleft':'\u22EA','ntrianglelefteq':'\u22EC','ntriangleright':'\u22EB','ntrianglerighteq':'\u22ED','nu':'\u03BD','Nu':'\u039D','num':'#','numero':'\u2116','numsp':'\u2007','nvap':'\u224D\u20D2','nvdash':'\u22AC','nvDash':'\u22AD','nVdash':'\u22AE','nVDash':'\u22AF','nvge':'\u2265\u20D2','nvgt':'>\u20D2','nvHarr':'\u2904','nvinfin':'\u29DE','nvlArr':'\u2902','nvle':'\u2264\u20D2','nvlt':'<\u20D2','nvltrie':'\u22B4\u20D2','nvrArr':'\u2903','nvrtrie':'\u22B5\u20D2','nvsim':'\u223C\u20D2','nwarhk':'\u2923','nwarr':'\u2196','nwArr':'\u21D6','nwarrow':'\u2196','nwnear':'\u2927','oacute':'\xF3','Oacute':'\xD3','oast':'\u229B','ocir':'\u229A','ocirc':'\xF4','Ocirc':'\xD4','ocy':'\u043E','Ocy':'\u041E','odash':'\u229D','odblac':'\u0151','Odblac':'\u0150','odiv':'\u2A38','odot':'\u2299','odsold':'\u29BC','oelig':'\u0153','OElig':'\u0152','ofcir':'\u29BF','ofr':'\uD835\uDD2C','Ofr':'\uD835\uDD12','ogon':'\u02DB','ograve':'\xF2','Ograve':'\xD2','ogt':'\u29C1','ohbar':'\u29B5','ohm':'\u03A9','oint':'\u222E','olarr':'\u21BA','olcir':'\u29BE','olcross':'\u29BB','oline':'\u203E','olt':'\u29C0','omacr':'\u014D','Omacr':'\u014C','omega':'\u03C9','Omega':'\u03A9','omicron':'\u03BF','Omicron':'\u039F','omid':'\u29B6','ominus':'\u2296','oopf':'\uD835\uDD60','Oopf':'\uD835\uDD46','opar':'\u29B7','OpenCurlyDoubleQuote':'\u201C','OpenCurlyQuote':'\u2018','operp':'\u29B9','oplus':'\u2295','or':'\u2228','Or':'\u2A54','orarr':'\u21BB','ord':'\u2A5D','order':'\u2134','orderof':'\u2134','ordf':'\xAA','ordm':'\xBA','origof':'\u22B6','oror':'\u2A56','orslope':'\u2A57','orv':'\u2A5B','oS':'\u24C8','oscr':'\u2134','Oscr':'\uD835\uDCAA','oslash':'\xF8','Oslash':'\xD8','osol':'\u2298','otilde':'\xF5','Otilde':'\xD5','otimes':'\u2297','Otimes':'\u2A37','otimesas':'\u2A36','ouml':'\xF6','Ouml':'\xD6','ovbar':'\u233D','OverBar':'\u203E','OverBrace':'\u23DE','OverBracket':'\u23B4','OverParenthesis':'\u23DC','par':'\u2225','para':'\xB6','parallel':'\u2225','parsim':'\u2AF3','parsl':'\u2AFD','part':'\u2202','PartialD':'\u2202','pcy':'\u043F','Pcy':'\u041F','percnt':'%','period':'.','permil':'\u2030','perp':'\u22A5','pertenk':'\u2031','pfr':'\uD835\uDD2D','Pfr':'\uD835\uDD13','phi':'\u03C6','Phi':'\u03A6','phiv':'\u03D5','phmmat':'\u2133','phone':'\u260E','pi':'\u03C0','Pi':'\u03A0','pitchfork':'\u22D4','piv':'\u03D6','planck':'\u210F','planckh':'\u210E','plankv':'\u210F','plus':'+','plusacir':'\u2A23','plusb':'\u229E','pluscir':'\u2A22','plusdo':'\u2214','plusdu':'\u2A25','pluse':'\u2A72','PlusMinus':'\xB1','plusmn':'\xB1','plussim':'\u2A26','plustwo':'\u2A27','pm':'\xB1','Poincareplane':'\u210C','pointint':'\u2A15','popf':'\uD835\uDD61','Popf':'\u2119','pound':'\xA3','pr':'\u227A','Pr':'\u2ABB','prap':'\u2AB7','prcue':'\u227C','pre':'\u2AAF','prE':'\u2AB3','prec':'\u227A','precapprox':'\u2AB7','preccurlyeq':'\u227C','Precedes':'\u227A','PrecedesEqual':'\u2AAF','PrecedesSlantEqual':'\u227C','PrecedesTilde':'\u227E','preceq':'\u2AAF','precnapprox':'\u2AB9','precneqq':'\u2AB5','precnsim':'\u22E8','precsim':'\u227E','prime':'\u2032','Prime':'\u2033','primes':'\u2119','prnap':'\u2AB9','prnE':'\u2AB5','prnsim':'\u22E8','prod':'\u220F','Product':'\u220F','profalar':'\u232E','profline':'\u2312','profsurf':'\u2313','prop':'\u221D','Proportion':'\u2237','Proportional':'\u221D','propto':'\u221D','prsim':'\u227E','prurel':'\u22B0','pscr':'\uD835\uDCC5','Pscr':'\uD835\uDCAB','psi':'\u03C8','Psi':'\u03A8','puncsp':'\u2008','qfr':'\uD835\uDD2E','Qfr':'\uD835\uDD14','qint':'\u2A0C','qopf':'\uD835\uDD62','Qopf':'\u211A','qprime':'\u2057','qscr':'\uD835\uDCC6','Qscr':'\uD835\uDCAC','quaternions':'\u210D','quatint':'\u2A16','quest':'?','questeq':'\u225F','quot':'"','QUOT':'"','rAarr':'\u21DB','race':'\u223D\u0331','racute':'\u0155','Racute':'\u0154','radic':'\u221A','raemptyv':'\u29B3','rang':'\u27E9','Rang':'\u27EB','rangd':'\u2992','range':'\u29A5','rangle':'\u27E9','raquo':'\xBB','rarr':'\u2192','rArr':'\u21D2','Rarr':'\u21A0','rarrap':'\u2975','rarrb':'\u21E5','rarrbfs':'\u2920','rarrc':'\u2933','rarrfs':'\u291E','rarrhk':'\u21AA','rarrlp':'\u21AC','rarrpl':'\u2945','rarrsim':'\u2974','rarrtl':'\u21A3','Rarrtl':'\u2916','rarrw':'\u219D','ratail':'\u291A','rAtail':'\u291C','ratio':'\u2236','rationals':'\u211A','rbarr':'\u290D','rBarr':'\u290F','RBarr':'\u2910','rbbrk':'\u2773','rbrace':'}','rbrack':']','rbrke':'\u298C','rbrksld':'\u298E','rbrkslu':'\u2990','rcaron':'\u0159','Rcaron':'\u0158','rcedil':'\u0157','Rcedil':'\u0156','rceil':'\u2309','rcub':'}','rcy':'\u0440','Rcy':'\u0420','rdca':'\u2937','rdldhar':'\u2969','rdquo':'\u201D','rdquor':'\u201D','rdsh':'\u21B3','Re':'\u211C','real':'\u211C','realine':'\u211B','realpart':'\u211C','reals':'\u211D','rect':'\u25AD','reg':'\xAE','REG':'\xAE','ReverseElement':'\u220B','ReverseEquilibrium':'\u21CB','ReverseUpEquilibrium':'\u296F','rfisht':'\u297D','rfloor':'\u230B','rfr':'\uD835\uDD2F','Rfr':'\u211C','rHar':'\u2964','rhard':'\u21C1','rharu':'\u21C0','rharul':'\u296C','rho':'\u03C1','Rho':'\u03A1','rhov':'\u03F1','RightAngleBracket':'\u27E9','rightarrow':'\u2192','Rightarrow':'\u21D2','RightArrow':'\u2192','RightArrowBar':'\u21E5','RightArrowLeftArrow':'\u21C4','rightarrowtail':'\u21A3','RightCeiling':'\u2309','RightDoubleBracket':'\u27E7','RightDownTeeVector':'\u295D','RightDownVector':'\u21C2','RightDownVectorBar':'\u2955','RightFloor':'\u230B','rightharpoondown':'\u21C1','rightharpoonup':'\u21C0','rightleftarrows':'\u21C4','rightleftharpoons':'\u21CC','rightrightarrows':'\u21C9','rightsquigarrow':'\u219D','RightTee':'\u22A2','RightTeeArrow':'\u21A6','RightTeeVector':'\u295B','rightthreetimes':'\u22CC','RightTriangle':'\u22B3','RightTriangleBar':'\u29D0','RightTriangleEqual':'\u22B5','RightUpDownVector':'\u294F','RightUpTeeVector':'\u295C','RightUpVector':'\u21BE','RightUpVectorBar':'\u2954','RightVector':'\u21C0','RightVectorBar':'\u2953','ring':'\u02DA','risingdotseq':'\u2253','rlarr':'\u21C4','rlhar':'\u21CC','rlm':'\u200F','rmoust':'\u23B1','rmoustache':'\u23B1','rnmid':'\u2AEE','roang':'\u27ED','roarr':'\u21FE','robrk':'\u27E7','ropar':'\u2986','ropf':'\uD835\uDD63','Ropf':'\u211D','roplus':'\u2A2E','rotimes':'\u2A35','RoundImplies':'\u2970','rpar':')','rpargt':'\u2994','rppolint':'\u2A12','rrarr':'\u21C9','Rrightarrow':'\u21DB','rsaquo':'\u203A','rscr':'\uD835\uDCC7','Rscr':'\u211B','rsh':'\u21B1','Rsh':'\u21B1','rsqb':']','rsquo':'\u2019','rsquor':'\u2019','rthree':'\u22CC','rtimes':'\u22CA','rtri':'\u25B9','rtrie':'\u22B5','rtrif':'\u25B8','rtriltri':'\u29CE','RuleDelayed':'\u29F4','ruluhar':'\u2968','rx':'\u211E','sacute':'\u015B','Sacute':'\u015A','sbquo':'\u201A','sc':'\u227B','Sc':'\u2ABC','scap':'\u2AB8','scaron':'\u0161','Scaron':'\u0160','sccue':'\u227D','sce':'\u2AB0','scE':'\u2AB4','scedil':'\u015F','Scedil':'\u015E','scirc':'\u015D','Scirc':'\u015C','scnap':'\u2ABA','scnE':'\u2AB6','scnsim':'\u22E9','scpolint':'\u2A13','scsim':'\u227F','scy':'\u0441','Scy':'\u0421','sdot':'\u22C5','sdotb':'\u22A1','sdote':'\u2A66','searhk':'\u2925','searr':'\u2198','seArr':'\u21D8','searrow':'\u2198','sect':'\xA7','semi':';','seswar':'\u2929','setminus':'\u2216','setmn':'\u2216','sext':'\u2736','sfr':'\uD835\uDD30','Sfr':'\uD835\uDD16','sfrown':'\u2322','sharp':'\u266F','shchcy':'\u0449','SHCHcy':'\u0429','shcy':'\u0448','SHcy':'\u0428','ShortDownArrow':'\u2193','ShortLeftArrow':'\u2190','shortmid':'\u2223','shortparallel':'\u2225','ShortRightArrow':'\u2192','ShortUpArrow':'\u2191','shy':'\xAD','sigma':'\u03C3','Sigma':'\u03A3','sigmaf':'\u03C2','sigmav':'\u03C2','sim':'\u223C','simdot':'\u2A6A','sime':'\u2243','simeq':'\u2243','simg':'\u2A9E','simgE':'\u2AA0','siml':'\u2A9D','simlE':'\u2A9F','simne':'\u2246','simplus':'\u2A24','simrarr':'\u2972','slarr':'\u2190','SmallCircle':'\u2218','smallsetminus':'\u2216','smashp':'\u2A33','smeparsl':'\u29E4','smid':'\u2223','smile':'\u2323','smt':'\u2AAA','smte':'\u2AAC','smtes':'\u2AAC\uFE00','softcy':'\u044C','SOFTcy':'\u042C','sol':'/','solb':'\u29C4','solbar':'\u233F','sopf':'\uD835\uDD64','Sopf':'\uD835\uDD4A','spades':'\u2660','spadesuit':'\u2660','spar':'\u2225','sqcap':'\u2293','sqcaps':'\u2293\uFE00','sqcup':'\u2294','sqcups':'\u2294\uFE00','Sqrt':'\u221A','sqsub':'\u228F','sqsube':'\u2291','sqsubset':'\u228F','sqsubseteq':'\u2291','sqsup':'\u2290','sqsupe':'\u2292','sqsupset':'\u2290','sqsupseteq':'\u2292','squ':'\u25A1','square':'\u25A1','Square':'\u25A1','SquareIntersection':'\u2293','SquareSubset':'\u228F','SquareSubsetEqual':'\u2291','SquareSuperset':'\u2290','SquareSupersetEqual':'\u2292','SquareUnion':'\u2294','squarf':'\u25AA','squf':'\u25AA','srarr':'\u2192','sscr':'\uD835\uDCC8','Sscr':'\uD835\uDCAE','ssetmn':'\u2216','ssmile':'\u2323','sstarf':'\u22C6','star':'\u2606','Star':'\u22C6','starf':'\u2605','straightepsilon':'\u03F5','straightphi':'\u03D5','strns':'\xAF','sub':'\u2282','Sub':'\u22D0','subdot':'\u2ABD','sube':'\u2286','subE':'\u2AC5','subedot':'\u2AC3','submult':'\u2AC1','subne':'\u228A','subnE':'\u2ACB','subplus':'\u2ABF','subrarr':'\u2979','subset':'\u2282','Subset':'\u22D0','subseteq':'\u2286','subseteqq':'\u2AC5','SubsetEqual':'\u2286','subsetneq':'\u228A','subsetneqq':'\u2ACB','subsim':'\u2AC7','subsub':'\u2AD5','subsup':'\u2AD3','succ':'\u227B','succapprox':'\u2AB8','succcurlyeq':'\u227D','Succeeds':'\u227B','SucceedsEqual':'\u2AB0','SucceedsSlantEqual':'\u227D','SucceedsTilde':'\u227F','succeq':'\u2AB0','succnapprox':'\u2ABA','succneqq':'\u2AB6','succnsim':'\u22E9','succsim':'\u227F','SuchThat':'\u220B','sum':'\u2211','Sum':'\u2211','sung':'\u266A','sup':'\u2283','Sup':'\u22D1','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','supdot':'\u2ABE','supdsub':'\u2AD8','supe':'\u2287','supE':'\u2AC6','supedot':'\u2AC4','Superset':'\u2283','SupersetEqual':'\u2287','suphsol':'\u27C9','suphsub':'\u2AD7','suplarr':'\u297B','supmult':'\u2AC2','supne':'\u228B','supnE':'\u2ACC','supplus':'\u2AC0','supset':'\u2283','Supset':'\u22D1','supseteq':'\u2287','supseteqq':'\u2AC6','supsetneq':'\u228B','supsetneqq':'\u2ACC','supsim':'\u2AC8','supsub':'\u2AD4','supsup':'\u2AD6','swarhk':'\u2926','swarr':'\u2199','swArr':'\u21D9','swarrow':'\u2199','swnwar':'\u292A','szlig':'\xDF','Tab':'\t','target':'\u2316','tau':'\u03C4','Tau':'\u03A4','tbrk':'\u23B4','tcaron':'\u0165','Tcaron':'\u0164','tcedil':'\u0163','Tcedil':'\u0162','tcy':'\u0442','Tcy':'\u0422','tdot':'\u20DB','telrec':'\u2315','tfr':'\uD835\uDD31','Tfr':'\uD835\uDD17','there4':'\u2234','therefore':'\u2234','Therefore':'\u2234','theta':'\u03B8','Theta':'\u0398','thetasym':'\u03D1','thetav':'\u03D1','thickapprox':'\u2248','thicksim':'\u223C','ThickSpace':'\u205F\u200A','thinsp':'\u2009','ThinSpace':'\u2009','thkap':'\u2248','thksim':'\u223C','thorn':'\xFE','THORN':'\xDE','tilde':'\u02DC','Tilde':'\u223C','TildeEqual':'\u2243','TildeFullEqual':'\u2245','TildeTilde':'\u2248','times':'\xD7','timesb':'\u22A0','timesbar':'\u2A31','timesd':'\u2A30','tint':'\u222D','toea':'\u2928','top':'\u22A4','topbot':'\u2336','topcir':'\u2AF1','topf':'\uD835\uDD65','Topf':'\uD835\uDD4B','topfork':'\u2ADA','tosa':'\u2929','tprime':'\u2034','trade':'\u2122','TRADE':'\u2122','triangle':'\u25B5','triangledown':'\u25BF','triangleleft':'\u25C3','trianglelefteq':'\u22B4','triangleq':'\u225C','triangleright':'\u25B9','trianglerighteq':'\u22B5','tridot':'\u25EC','trie':'\u225C','triminus':'\u2A3A','TripleDot':'\u20DB','triplus':'\u2A39','trisb':'\u29CD','tritime':'\u2A3B','trpezium':'\u23E2','tscr':'\uD835\uDCC9','Tscr':'\uD835\uDCAF','tscy':'\u0446','TScy':'\u0426','tshcy':'\u045B','TSHcy':'\u040B','tstrok':'\u0167','Tstrok':'\u0166','twixt':'\u226C','twoheadleftarrow':'\u219E','twoheadrightarrow':'\u21A0','uacute':'\xFA','Uacute':'\xDA','uarr':'\u2191','uArr':'\u21D1','Uarr':'\u219F','Uarrocir':'\u2949','ubrcy':'\u045E','Ubrcy':'\u040E','ubreve':'\u016D','Ubreve':'\u016C','ucirc':'\xFB','Ucirc':'\xDB','ucy':'\u0443','Ucy':'\u0423','udarr':'\u21C5','udblac':'\u0171','Udblac':'\u0170','udhar':'\u296E','ufisht':'\u297E','ufr':'\uD835\uDD32','Ufr':'\uD835\uDD18','ugrave':'\xF9','Ugrave':'\xD9','uHar':'\u2963','uharl':'\u21BF','uharr':'\u21BE','uhblk':'\u2580','ulcorn':'\u231C','ulcorner':'\u231C','ulcrop':'\u230F','ultri':'\u25F8','umacr':'\u016B','Umacr':'\u016A','uml':'\xA8','UnderBar':'_','UnderBrace':'\u23DF','UnderBracket':'\u23B5','UnderParenthesis':'\u23DD','Union':'\u22C3','UnionPlus':'\u228E','uogon':'\u0173','Uogon':'\u0172','uopf':'\uD835\uDD66','Uopf':'\uD835\uDD4C','uparrow':'\u2191','Uparrow':'\u21D1','UpArrow':'\u2191','UpArrowBar':'\u2912','UpArrowDownArrow':'\u21C5','updownarrow':'\u2195','Updownarrow':'\u21D5','UpDownArrow':'\u2195','UpEquilibrium':'\u296E','upharpoonleft':'\u21BF','upharpoonright':'\u21BE','uplus':'\u228E','UpperLeftArrow':'\u2196','UpperRightArrow':'\u2197','upsi':'\u03C5','Upsi':'\u03D2','upsih':'\u03D2','upsilon':'\u03C5','Upsilon':'\u03A5','UpTee':'\u22A5','UpTeeArrow':'\u21A5','upuparrows':'\u21C8','urcorn':'\u231D','urcorner':'\u231D','urcrop':'\u230E','uring':'\u016F','Uring':'\u016E','urtri':'\u25F9','uscr':'\uD835\uDCCA','Uscr':'\uD835\uDCB0','utdot':'\u22F0','utilde':'\u0169','Utilde':'\u0168','utri':'\u25B5','utrif':'\u25B4','uuarr':'\u21C8','uuml':'\xFC','Uuml':'\xDC','uwangle':'\u29A7','vangrt':'\u299C','varepsilon':'\u03F5','varkappa':'\u03F0','varnothing':'\u2205','varphi':'\u03D5','varpi':'\u03D6','varpropto':'\u221D','varr':'\u2195','vArr':'\u21D5','varrho':'\u03F1','varsigma':'\u03C2','varsubsetneq':'\u228A\uFE00','varsubsetneqq':'\u2ACB\uFE00','varsupsetneq':'\u228B\uFE00','varsupsetneqq':'\u2ACC\uFE00','vartheta':'\u03D1','vartriangleleft':'\u22B2','vartriangleright':'\u22B3','vBar':'\u2AE8','Vbar':'\u2AEB','vBarv':'\u2AE9','vcy':'\u0432','Vcy':'\u0412','vdash':'\u22A2','vDash':'\u22A8','Vdash':'\u22A9','VDash':'\u22AB','Vdashl':'\u2AE6','vee':'\u2228','Vee':'\u22C1','veebar':'\u22BB','veeeq':'\u225A','vellip':'\u22EE','verbar':'|','Verbar':'\u2016','vert':'|','Vert':'\u2016','VerticalBar':'\u2223','VerticalLine':'|','VerticalSeparator':'\u2758','VerticalTilde':'\u2240','VeryThinSpace':'\u200A','vfr':'\uD835\uDD33','Vfr':'\uD835\uDD19','vltri':'\u22B2','vnsub':'\u2282\u20D2','vnsup':'\u2283\u20D2','vopf':'\uD835\uDD67','Vopf':'\uD835\uDD4D','vprop':'\u221D','vrtri':'\u22B3','vscr':'\uD835\uDCCB','Vscr':'\uD835\uDCB1','vsubne':'\u228A\uFE00','vsubnE':'\u2ACB\uFE00','vsupne':'\u228B\uFE00','vsupnE':'\u2ACC\uFE00','Vvdash':'\u22AA','vzigzag':'\u299A','wcirc':'\u0175','Wcirc':'\u0174','wedbar':'\u2A5F','wedge':'\u2227','Wedge':'\u22C0','wedgeq':'\u2259','weierp':'\u2118','wfr':'\uD835\uDD34','Wfr':'\uD835\uDD1A','wopf':'\uD835\uDD68','Wopf':'\uD835\uDD4E','wp':'\u2118','wr':'\u2240','wreath':'\u2240','wscr':'\uD835\uDCCC','Wscr':'\uD835\uDCB2','xcap':'\u22C2','xcirc':'\u25EF','xcup':'\u22C3','xdtri':'\u25BD','xfr':'\uD835\uDD35','Xfr':'\uD835\uDD1B','xharr':'\u27F7','xhArr':'\u27FA','xi':'\u03BE','Xi':'\u039E','xlarr':'\u27F5','xlArr':'\u27F8','xmap':'\u27FC','xnis':'\u22FB','xodot':'\u2A00','xopf':'\uD835\uDD69','Xopf':'\uD835\uDD4F','xoplus':'\u2A01','xotime':'\u2A02','xrarr':'\u27F6','xrArr':'\u27F9','xscr':'\uD835\uDCCD','Xscr':'\uD835\uDCB3','xsqcup':'\u2A06','xuplus':'\u2A04','xutri':'\u25B3','xvee':'\u22C1','xwedge':'\u22C0','yacute':'\xFD','Yacute':'\xDD','yacy':'\u044F','YAcy':'\u042F','ycirc':'\u0177','Ycirc':'\u0176','ycy':'\u044B','Ycy':'\u042B','yen':'\xA5','yfr':'\uD835\uDD36','Yfr':'\uD835\uDD1C','yicy':'\u0457','YIcy':'\u0407','yopf':'\uD835\uDD6A','Yopf':'\uD835\uDD50','yscr':'\uD835\uDCCE','Yscr':'\uD835\uDCB4','yucy':'\u044E','YUcy':'\u042E','yuml':'\xFF','Yuml':'\u0178','zacute':'\u017A','Zacute':'\u0179','zcaron':'\u017E','Zcaron':'\u017D','zcy':'\u0437','Zcy':'\u0417','zdot':'\u017C','Zdot':'\u017B','zeetrf':'\u2128','ZeroWidthSpace':'\u200B','zeta':'\u03B6','Zeta':'\u0396','zfr':'\uD835\uDD37','Zfr':'\u2128','zhcy':'\u0436','ZHcy':'\u0416','zigrarr':'\u21DD','zopf':'\uD835\uDD6B','Zopf':'\u2124','zscr':'\uD835\uDCCF','Zscr':'\uD835\uDCB5','zwj':'\u200D','zwnj':'\u200C'};
	var decodeMapLegacy = {'aacute':'\xE1','Aacute':'\xC1','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','aelig':'\xE6','AElig':'\xC6','agrave':'\xE0','Agrave':'\xC0','amp':'&','AMP':'&','aring':'\xE5','Aring':'\xC5','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','brvbar':'\xA6','ccedil':'\xE7','Ccedil':'\xC7','cedil':'\xB8','cent':'\xA2','copy':'\xA9','COPY':'\xA9','curren':'\xA4','deg':'\xB0','divide':'\xF7','eacute':'\xE9','Eacute':'\xC9','ecirc':'\xEA','Ecirc':'\xCA','egrave':'\xE8','Egrave':'\xC8','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','frac12':'\xBD','frac14':'\xBC','frac34':'\xBE','gt':'>','GT':'>','iacute':'\xED','Iacute':'\xCD','icirc':'\xEE','Icirc':'\xCE','iexcl':'\xA1','igrave':'\xEC','Igrave':'\xCC','iquest':'\xBF','iuml':'\xEF','Iuml':'\xCF','laquo':'\xAB','lt':'<','LT':'<','macr':'\xAF','micro':'\xB5','middot':'\xB7','nbsp':'\xA0','not':'\xAC','ntilde':'\xF1','Ntilde':'\xD1','oacute':'\xF3','Oacute':'\xD3','ocirc':'\xF4','Ocirc':'\xD4','ograve':'\xF2','Ograve':'\xD2','ordf':'\xAA','ordm':'\xBA','oslash':'\xF8','Oslash':'\xD8','otilde':'\xF5','Otilde':'\xD5','ouml':'\xF6','Ouml':'\xD6','para':'\xB6','plusmn':'\xB1','pound':'\xA3','quot':'"','QUOT':'"','raquo':'\xBB','reg':'\xAE','REG':'\xAE','sect':'\xA7','shy':'\xAD','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','szlig':'\xDF','thorn':'\xFE','THORN':'\xDE','times':'\xD7','uacute':'\xFA','Uacute':'\xDA','ucirc':'\xFB','Ucirc':'\xDB','ugrave':'\xF9','Ugrave':'\xD9','uml':'\xA8','uuml':'\xFC','Uuml':'\xDC','yacute':'\xFD','Yacute':'\xDD','yen':'\xA5','yuml':'\xFF'};
	var decodeMapNumeric = {'0':'\uFFFD','128':'\u20AC','130':'\u201A','131':'\u0192','132':'\u201E','133':'\u2026','134':'\u2020','135':'\u2021','136':'\u02C6','137':'\u2030','138':'\u0160','139':'\u2039','140':'\u0152','142':'\u017D','145':'\u2018','146':'\u2019','147':'\u201C','148':'\u201D','149':'\u2022','150':'\u2013','151':'\u2014','152':'\u02DC','153':'\u2122','154':'\u0161','155':'\u203A','156':'\u0153','158':'\u017E','159':'\u0178'};
	var invalidReferenceCodePoints = [1,2,3,4,5,6,7,8,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,64976,64977,64978,64979,64980,64981,64982,64983,64984,64985,64986,64987,64988,64989,64990,64991,64992,64993,64994,64995,64996,64997,64998,64999,65000,65001,65002,65003,65004,65005,65006,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111];

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var has = function(object, propertyName) {
		return hasOwnProperty.call(object, propertyName);
	};

	var contains = function(array, value) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			if (array[index] == value) {
				return true;
			}
		}
		return false;
	};

	var merge = function(options, defaults) {
		if (!options) {
			return defaults;
		}
		var result = {};
		var key;
		for (key in defaults) {
			// A `hasOwnProperty` check is not needed here, since only recognized
			// option names are used anyway. Any others are ignored.
			result[key] = has(options, key) ? options[key] : defaults[key];
		}
		return result;
	};

	// Modified version of `ucs2encode`; see https://mths.be/punycode.
	var codePointToSymbol = function(codePoint, strict) {
		var output = '';
		if ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {
			// See issue #4:
			// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
			// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
			// REPLACEMENT CHARACTER.”
			if (strict) {
				parseError('character reference outside the permissible Unicode range');
			}
			return '\uFFFD';
		}
		if (has(decodeMapNumeric, codePoint)) {
			if (strict) {
				parseError('disallowed character reference');
			}
			return decodeMapNumeric[codePoint];
		}
		if (strict && contains(invalidReferenceCodePoints, codePoint)) {
			parseError('disallowed character reference');
		}
		if (codePoint > 0xFFFF) {
			codePoint -= 0x10000;
			output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
			codePoint = 0xDC00 | codePoint & 0x3FF;
		}
		output += stringFromCharCode(codePoint);
		return output;
	};

	var hexEscape = function(codePoint) {
		return '&#x' + codePoint.toString(16).toUpperCase() + ';';
	};

	var decEscape = function(codePoint) {
		return '&#' + codePoint + ';';
	};

	var parseError = function(message) {
		throw Error('Parse error: ' + message);
	};

	/*--------------------------------------------------------------------------*/

	var encode = function(string, options) {
		options = merge(options, encode.options);
		var strict = options.strict;
		if (strict && regexInvalidRawCodePoint.test(string)) {
			parseError('forbidden code point');
		}
		var encodeEverything = options.encodeEverything;
		var useNamedReferences = options.useNamedReferences;
		var allowUnsafeSymbols = options.allowUnsafeSymbols;
		var escapeCodePoint = options.decimal ? decEscape : hexEscape;

		var escapeBmpSymbol = function(symbol) {
			return escapeCodePoint(symbol.charCodeAt(0));
		};

		if (encodeEverything) {
			// Encode ASCII symbols.
			string = string.replace(regexAsciiWhitelist, function(symbol) {
				// Use named references if requested & possible.
				if (useNamedReferences && has(encodeMap, symbol)) {
					return '&' + encodeMap[symbol] + ';';
				}
				return escapeBmpSymbol(symbol);
			});
			// Shorten a few escapes that represent two symbols, of which at least one
			// is within the ASCII range.
			if (useNamedReferences) {
				string = string
					.replace(/&gt;\u20D2/g, '&nvgt;')
					.replace(/&lt;\u20D2/g, '&nvlt;')
					.replace(/&#x66;&#x6A;/g, '&fjlig;');
			}
			// Encode non-ASCII symbols.
			if (useNamedReferences) {
				// Encode non-ASCII symbols that can be replaced with a named reference.
				string = string.replace(regexEncodeNonAscii, function(string) {
					// Note: there is no need to check `has(encodeMap, string)` here.
					return '&' + encodeMap[string] + ';';
				});
			}
			// Note: any remaining non-ASCII symbols are handled outside of the `if`.
		} else if (useNamedReferences) {
			// Apply named character references.
			// Encode `<>"'&` using named character references.
			if (!allowUnsafeSymbols) {
				string = string.replace(regexEscape, function(string) {
					return '&' + encodeMap[string] + ';'; // no need to check `has()` here
				});
			}
			// Shorten escapes that represent two symbols, of which at least one is
			// `<>"'&`.
			string = string
				.replace(/&gt;\u20D2/g, '&nvgt;')
				.replace(/&lt;\u20D2/g, '&nvlt;');
			// Encode non-ASCII symbols that can be replaced with a named reference.
			string = string.replace(regexEncodeNonAscii, function(string) {
				// Note: there is no need to check `has(encodeMap, string)` here.
				return '&' + encodeMap[string] + ';';
			});
		} else if (!allowUnsafeSymbols) {
			// Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
			// using named character references.
			string = string.replace(regexEscape, escapeBmpSymbol);
		}
		return string
			// Encode astral symbols.
			.replace(regexAstralSymbols, function($0) {
				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				var high = $0.charCodeAt(0);
				var low = $0.charCodeAt(1);
				var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
				return escapeCodePoint(codePoint);
			})
			// Encode any remaining BMP symbols that are not printable ASCII symbols
			// using a hexadecimal escape.
			.replace(regexBmpWhitelist, escapeBmpSymbol);
	};
	// Expose default options (so they can be overridden globally).
	encode.options = {
		'allowUnsafeSymbols': false,
		'encodeEverything': false,
		'strict': false,
		'useNamedReferences': false,
		'decimal' : false
	};

	var decode = function(html, options) {
		options = merge(options, decode.options);
		var strict = options.strict;
		if (strict && regexInvalidEntity.test(html)) {
			parseError('malformed character reference');
		}
		return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
			var codePoint;
			var semicolon;
			var decDigits;
			var hexDigits;
			var reference;
			var next;

			if ($1) {
				reference = $1;
				// Note: there is no need to check `has(decodeMap, reference)`.
				return decodeMap[reference];
			}

			if ($2) {
				// Decode named character references without trailing `;`, e.g. `&amp`.
				// This is only a parse error if it gets converted to `&`, or if it is
				// followed by `=` in an attribute context.
				reference = $2;
				next = $3;
				if (next && options.isAttributeValue) {
					if (strict && next == '=') {
						parseError('`&` did not start a character reference');
					}
					return $0;
				} else {
					if (strict) {
						parseError(
							'named character reference was not terminated by a semicolon'
						);
					}
					// Note: there is no need to check `has(decodeMapLegacy, reference)`.
					return decodeMapLegacy[reference] + (next || '');
				}
			}

			if ($4) {
				// Decode decimal escapes, e.g. `&#119558;`.
				decDigits = $4;
				semicolon = $5;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(decDigits, 10);
				return codePointToSymbol(codePoint, strict);
			}

			if ($6) {
				// Decode hexadecimal escapes, e.g. `&#x1D306;`.
				hexDigits = $6;
				semicolon = $7;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(hexDigits, 16);
				return codePointToSymbol(codePoint, strict);
			}

			// If we’re still here, `if ($7)` is implied; it’s an ambiguous
			// ampersand for sure. https://mths.be/notes/ambiguous-ampersands
			if (strict) {
				parseError(
					'named character reference was not terminated by a semicolon'
				);
			}
			return $0;
		});
	};
	// Expose default options (so they can be overridden globally).
	decode.options = {
		'isAttributeValue': false,
		'strict': false
	};

	var escape = function(string) {
		return string.replace(regexEscape, function($0) {
			// Note: there is no need to check `has(escapeMap, $0)` here.
			return escapeMap[$0];
		});
	};

	/*--------------------------------------------------------------------------*/

	var he = {
		'version': '1.2.0',
		'encode': encode,
		'decode': decode,
		'escape': escape,
		'unescape': decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return he;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else // removed by dead control flow
{ var key; }

}(this));


/***/ },

/***/ "./client/src/platform/api.ts"
/*!************************************!*\
  !*** ./client/src/platform/api.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = init;
exports.getNotificationsClient = getNotificationsClient;
const core_web_1 = __webpack_require__(/*! @openfin/core-web */ "./node_modules/@openfin/core-web/out/api-client.cjs.js");
const web_notifications_client_1 = __webpack_require__(/*! @openfin/web-notifications-client */ "./node_modules/@openfin/web-notifications-client/dist/client/index.js");
const settings_1 = __webpack_require__(/*! ./settings */ "./client/src/platform/settings.ts");
const CLIENT_ID = "web-notifications-main";
const CLIENT_TITLE = "Web Notifications";
/**
 * Singleton wrapper around @openfin/web-notifications-client.
 */
class NotificationsClient {
    constructor() {
        this._connected = false;
        this._connecting = false;
    }
    /**
     * Returns the shared notifications client instance.
     * @returns NotificationsClient singleton.
     */
    static getInstance() {
        NotificationsClient._instance ??= new NotificationsClient();
        return NotificationsClient._instance;
    }
    /**
     * Connect this page as a notifications producer.
     * @param finContext OpenFin context.
     * @param serviceId Notification center service identifier.
     */
    async connect(finContext, serviceId) {
        if (this._connected || this._connecting) {
            return;
        }
        this._connecting = true;
        try {
            await (0, web_notifications_client_1.connectToNotifications)({
                environment: "web",
                finContext,
                serviceId,
                id: CLIENT_ID,
                title: CLIENT_TITLE,
                icon: "./common/images/here.png"
            });
            this._connected = true;
        }
        catch (error) {
            console.error("Unable to connect notification client.", error);
        }
        finally {
            this._connecting = false;
        }
    }
    /**
     * Creates a notification.
     * @param options Notification payload.
     * @returns The created notification record.
     */
    async create(options) {
        this.requireConnected();
        return (0, web_notifications_client_1.create)(options);
    }
    /**
     * Returns every notification this client has created that is still in the Notification Center.
     * @returns Array of notifications.
     */
    async getAll() {
        this.requireConnected();
        return (0, web_notifications_client_1.getAll)();
    }
    /**
     * Removes a single notification by id.
     * @param id Notification id.
     * @returns True if the notification was removed.
     */
    async clear(id) {
        this.requireConnected();
        return (0, web_notifications_client_1.clear)(id);
    }
    /**
     * Removes every notification this client has created.
     * @returns Count of notifications removed.
     */
    async clearAll() {
        this.requireConnected();
        return (0, web_notifications_client_1.clearAll)();
    }
    /**
     * Number of notifications currently in the Notification Center (across all sources).
     * @returns Notification count.
     */
    async getCount() {
        this.requireConnected();
        return (0, web_notifications_client_1.getNotificationsCount)();
    }
    /**
     * Toggle Notification Center visibility through the SDK's RPC channel. The provider
     * is expected to subscribe to addVisibilityListener and update its host chrome from
     * there, so this is fire-and-forget from the producer's perspective.
     */
    async toggleCenter() {
        this.requireConnected();
        await (0, web_notifications_client_1.toggleNotificationCenter)();
    }
    /**
     * Subscribe to a notification lifecycle event.
     * @param type Event name.
     * @param listener Listener that receives the typed event payload.
     */
    async on(type, listener) {
        this.requireConnected();
        // The SDK exposes a discriminated-union overload set; cast through unknown so we
        // can dispatch any of the supported event names from one wrapper.
        await web_notifications_client_1.addEventListener(type, listener);
    }
    /**
     * Throws if the client hasn't connected yet. Producer-side calls all require a live broker channel.
     * @throws {Error} Thrown when the notifications client is not connected.
     */
    requireConnected() {
        if (!this._connected) {
            throw new Error("Notifications client is not connected.");
        }
    }
}
NotificationsClient._instance = null;
/**
 * Initializes the OpenFin Web Broker connection.
 * @param inherit Should we inherit settings from the host (available in the OpenFin layout system) or use settings? Default is true.
 */
async function init(inherit = false) {
    let options;
    let settings = await (0, settings_1.getSettings)();
    if (settings === undefined) {
        console.error("Unable to initialize API because the web manifest custom_settings could not be loaded.");
        return;
    }
    if (window.fin === undefined) {
        if (!inherit) {
            options = {
                brokerUrl: settings.platform.interop.brokerUrl,
                interopConfig: {
                    providerId: settings.platform.interop.providerId,
                    currentContextGroup: settings.platform.interop.defaultContextGroup
                }
            };
        }
        if (options) {
            window.fin = await (0, core_web_1.connect)({
                options
            });
        }
        else {
            window.fin = await (0, core_web_1.connect)({
                connectionInheritance: "enabled"
            });
        }
    }
    if (window.fdc3 === undefined && window?.fin?.me.interop?.getFDC3Sync !== undefined) {
        window.fdc3 = fin.me.interop.getFDC3Sync("2.0");
    }
    settings = settings ?? (await (0, settings_1.getSettings)());
    if (settings === undefined || window.fin === undefined) {
        return;
    }
    const notificationsClient = NotificationsClient.getInstance();
    await notificationsClient.connect(window.fin, settings.platform.notificationServiceId);
}
/**
 * Returns the connected notifications client.
 * @returns NotificationsClient singleton.
 */
function getNotificationsClient() {
    return NotificationsClient.getInstance();
}


/***/ },

/***/ "./client/src/platform/settings.ts"
/*!*****************************************!*\
  !*** ./client/src/platform/settings.ts ***!
  \*****************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSettings = getSettings;
exports.getDefaultLayout = getDefaultLayout;
exports.getSecondLayout = getSecondLayout;
/**
 * Fetches the settings for the application.
 * @returns The settings for the application.
 */
async function getSettings() {
    const settings = await getManifestSettings();
    if (settings === undefined) {
        console.error("Unable to run the example as settings are required and we fetch them from the link web manifest from the html page that is being served. It should exist in the customSettings section of the web manifest.");
    }
    return settings;
}
/**
 * Returns a default layout from the settings if provided.
 * @returns The default layout from the settings.
 */
async function getDefaultLayout() {
    const settings = await getSettings();
    if (settings?.platform?.layout?.defaultLayout === undefined) {
        console.error("Unable to run the example as without a layout being defined. Please ensure that settings have been provided in the web manifest.");
        return;
    }
    if (typeof settings.platform.layout.defaultLayout === "string") {
        const layoutResponse = await fetch(settings.platform.layout.defaultLayout);
        const layoutJson = (await layoutResponse.json());
        return layoutJson;
    }
    return settings.platform.layout.defaultLayout;
}
/**
 * Returns a default layout from the settings if provided.
 * @returns The default layout from the settings.
 */
async function getSecondLayout() {
    const settings = await getSettings();
    if (settings?.platform?.layout?.secondLayout === undefined) {
        console.error("Unable to run the example as without a layout being defined. Please ensure that settings have been provided in the web manifest.");
        return;
    }
    if (typeof settings.platform.layout.secondLayout === "string") {
        const layoutResponse = await fetch(settings.platform.layout.secondLayout);
        const layoutJson = (await layoutResponse.json());
        return layoutJson;
    }
    return settings.platform.layout.secondLayout;
}
/**
 * Returns the settings from the manifest file.
 * @returns customSettings for this example
 */
async function getManifestSettings() {
    // Get the manifest link
    const link = document.querySelector('link[rel="manifest"]');
    if (link !== null) {
        const manifestResponse = await fetch(link.href);
        const manifestJson = (await manifestResponse.json());
        return manifestJson.custom_settings;
    }
}


/***/ },

/***/ "../../node_modules/uuid/dist/esm-browser/index.js"
/*!*********************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/index.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NIL: () => (/* reexport safe */ _nil_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   parse: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   stringify: () => (/* reexport safe */ _stringify_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   v1: () => (/* reexport safe */ _v1_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   v3: () => (/* reexport safe */ _v3_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   v4: () => (/* reexport safe */ _v4_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   v5: () => (/* reexport safe */ _v5_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   validate: () => (/* reexport safe */ _validate_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   version: () => (/* reexport safe */ _version_js__WEBPACK_IMPORTED_MODULE_5__["default"])
/* harmony export */ });
/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v1.js */ "../../node_modules/uuid/dist/esm-browser/v1.js");
/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3.js */ "../../node_modules/uuid/dist/esm-browser/v3.js");
/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v4.js */ "../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v5.js */ "../../node_modules/uuid/dist/esm-browser/v5.js");
/* harmony import */ var _nil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nil.js */ "../../node_modules/uuid/dist/esm-browser/nil.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./version.js */ "../../node_modules/uuid/dist/esm-browser/version.js");
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validate.js */ "../../node_modules/uuid/dist/esm-browser/validate.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/esm-browser/stringify.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./parse.js */ "../../node_modules/uuid/dist/esm-browser/parse.js");










/***/ },

/***/ "../../node_modules/uuid/dist/esm-browser/md5.js"
/*!*******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/md5.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';

  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));

  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (md5);

/***/ },

/***/ "../../node_modules/uuid/dist/esm-browser/nil.js"
/*!*******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/nil.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('00000000-0000-0000-0000-000000000000');

/***/ },

/***/ "../../node_modules/uuid/dist/esm-browser/parse.js"
/*!*********************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/parse.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "../../node_modules/uuid/dist/esm-browser/validate.js");


function parse(uuid) {
  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }

  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parse);

/***/ },

/***/ "../../node_modules/uuid/dist/esm-browser/regex.js"
/*!*********************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/regex.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ },

/***/ "../../node_modules/uuid/dist/esm-browser/rng.js"
/*!*******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/rng.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ },

/***/ "../../node_modules/uuid/dist/esm-browser/sha1.js"
/*!********************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/sha1.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sha1);

/***/ },

/***/ "../../node_modules/uuid/dist/esm-browser/stringify.js"
/*!*************************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "../../node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ },

/***/ "../../node_modules/uuid/dist/esm-browser/v1.js"
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/v1.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "../../node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/esm-browser/stringify.js");

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v1);

/***/ },

/***/ "../../node_modules/uuid/dist/esm-browser/v3.js"
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/v3.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "../../node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ "../../node_modules/uuid/dist/esm-browser/md5.js");


var v3 = (0,_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v3);

/***/ },

/***/ "../../node_modules/uuid/dist/esm-browser/v35.js"
/*!*******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/v35.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DNS: () => (/* binding */ DNS),
/* harmony export */   URL: () => (/* binding */ URL),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Object.defineProperty(__WEBPACK_DEFAULT_EXPORT__, "name", { value: "default", configurable: true });
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/esm-browser/stringify.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "../../node_modules/uuid/dist/esm-browser/parse.js");



function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0,_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"])(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ },

/***/ "../../node_modules/uuid/dist/esm-browser/v4.js"
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/v4.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "../../node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ },

/***/ "../../node_modules/uuid/dist/esm-browser/v5.js"
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/v5.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "../../node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ "../../node_modules/uuid/dist/esm-browser/sha1.js");


var v5 = (0,_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v5);

/***/ },

/***/ "../../node_modules/uuid/dist/esm-browser/validate.js"
/*!************************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/validate.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "../../node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ },

/***/ "../../node_modules/uuid/dist/esm-browser/version.js"
/*!***********************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/version.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "../../node_modules/uuid/dist/esm-browser/validate.js");


function version(uuid) {
  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (version);

/***/ },

/***/ "./node_modules/@openfin/core-web/out/api-client.cjs.js"
/*!**************************************************************!*\
  !*** ./node_modules/@openfin/core-web/out/api-client.cjs.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var e=__webpack_require__(/*! ./main-0ca8f4a4.js */ "./node_modules/@openfin/core-web/out/main-0ca8f4a4.js");__webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/esm-browser/index.js"),__webpack_require__(/*! events */ "../../node_modules/events/events.js"),__webpack_require__(/*! es-toolkit */ "../../node_modules/es-toolkit/dist/index.js"),exports.connect=e.connect;


/***/ },

/***/ "./node_modules/@openfin/core-web/out/main-0ca8f4a4.js"
/*!*************************************************************!*\
  !*** ./node_modules/@openfin/core-web/out/main-0ca8f4a4.js ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var t=__webpack_require__(/*! events */ "../../node_modules/events/events.js"),e=__webpack_require__(/*! es-toolkit */ "../../node_modules/es-toolkit/dist/index.js"),n=__webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/esm-browser/index.js");const i=(t,e)=>`${e}<${btoa(JSON.stringify(t))}>`,r=(t,e)=>{try{return t.origin===e.origin}catch(t){return!1}},s=(t,e)=>{const n=new MutationObserver(n=>{let i=!1;n.forEach(t=>{"TITLE"!==t.target.parentNode?.nodeName&&"TITLE"!==t.target.nodeName?(t.removedNodes.forEach(t=>{"TITLE"!==t.nodeName&&"TITLE"!==t.parentNode?.nodeName||(i=!0)}),t.addedNodes.forEach(t=>{"TITLE"!==t.nodeName&&"TITLE"!==t.parentNode?.nodeName||(i=!0)})):i=!0});const r=t.querySelector("title")?.textContent??"";i&&e(r)});return n.observe(t,{childList:!0,subtree:!0,characterData:!0}),n};var o,a,c=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},d=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class h{constructor(t){this.isNodeEnvironment=()=>"node"===this.wire.environment.type,this.isOpenFinEnvironment=()=>"openfin"===this.wire.environment.type,this.isBrowserEnvironment=()=>"other"===this.wire.environment.type,this.wire=t}get fin(){return this.wire.getFin()}get me(){return this.wire.me}}class l extends h{constructor(t,e,...n){super(t),this.topic=e,o.set(this,void 0),a.set(this,void 0),this.eventNames=()=>this.hasEmitter()?this.getOrCreateEmitter().eventNames():[],this.emit=(t,e,...n)=>!!this.hasEmitter()&&this.getOrCreateEmitter().emit(t,e,...n),this.hasEmitter=()=>this.wire.eventAggregator.has(d(this,o,"f")),this.getOrCreateEmitter=()=>this.wire.eventAggregator.getOrCreate(d(this,o,"f")),this.listeners=t=>this.hasEmitter()?this.getOrCreateEmitter().listeners(t):[],this.listenerCount=t=>this.hasEmitter()?this.getOrCreateEmitter().listenerCount(t):0,this.registerEventListener=async(t,e={},n,i)=>{const r={...this.identity,timestamp:e.timestamp||Date.now(),topic:this.topic,type:t},s=this.getOrCreateEmitter();n(s);try{await this.wire.sendAction("subscribe-to-desktop-event",r)}catch(t){throw i(s),this.deleteEmitterIfNothingRegistered(s),t}},this.deregisterEventListener=async(t,e={})=>{if(this.hasEmitter()){const n={...this.identity,timestamp:e.timestamp||Date.now(),topic:this.topic,type:t};return await this.wire.sendAction("unsubscribe-to-desktop-event",n).catch(()=>null),this.getOrCreateEmitter()}return Promise.resolve()},c(this,o,[e,...n],"f"),c(this,a,new WeakMap,"f")}async on(t,e,n){return await this.registerEventListener(t,n,n=>{n.on(t,e)},n=>{n.removeListener(t,e)}),this}async addListener(t,e,n){return this.on(t,e,n)}async once(t,e,n){const i=()=>this.deregisterEventListener(t);return d(this,a,"f").set(e,i),await this.registerEventListener(t,n,n=>{n.once(t,i),n.once(t,e)},n=>{n.removeListener(t,i),n.removeListener(t,e)}),this}async prependListener(t,e,n){return await this.registerEventListener(t,n,n=>{n.prependListener(t,e)},n=>{n.removeListener(t,e)}),this}async prependOnceListener(t,e,n){const i=()=>this.deregisterEventListener(t);return d(this,a,"f").set(e,i),await this.registerEventListener(t,n,n=>{n.prependOnceListener(t,e),n.once(t,i)},n=>{n.removeListener(t,e),n.removeListener(t,i)}),this}async removeListener(t,e,n){const i=await this.deregisterEventListener(t,n);if(i){i.removeListener(t,e);const n=d(this,a,"f").get(e);n&&i.removeListener(t,n),this.deleteEmitterIfNothingRegistered(i)}return this}async deregisterAllListeners(t){const e={...this.identity,type:t,topic:this.topic};if(this.hasEmitter()){const t=this.getOrCreateEmitter(),n=t.listenerCount(e.type),i=[];for(let t=0;t<n;t++)i.push(this.wire.sendAction("unsubscribe-to-desktop-event",e).catch(()=>null));return await Promise.all(i),t}}async removeAllListeners(t){const e=async t=>{const e=await this.deregisterAllListeners(t);e&&(e.removeAllListeners(t),this.deleteEmitterIfNothingRegistered(e))};if(t)await e(t);else if(this.hasEmitter()){const t=this.getOrCreateEmitter().eventNames();await Promise.all(t.map(e))}return this}deleteEmitterIfNothingRegistered(t){0===t.eventNames().length&&this.wire.eventAggregator.delete(d(this,o,"f"))}}o=new WeakMap,a=new WeakMap;class p extends Error{}class u extends Error{}class w extends Error{}class y extends Error{}class f extends Error{constructor(t){const{message:e,name:n,stack:i,...r}=t;super(e),"cause"in t&&t.cause&&(this.cause=new f(t.cause)),this.name=n||"Error",this.stack=i??this.toString(),Object.keys(r).filter(t=>"cause"!==t).forEach(t=>{this[t]=r[t]})}}class g extends Error{static trimEndCallSites(t,e){const n=Error.stackTraceLimit,i=Error.prepareStackTrace;Error.prepareStackTrace=(t,e)=>e;const r="string"==typeof t.stack,s=(r?t.stack?.split("\n"):t.stack)??[];if(Error.prepareStackTrace=i,Error.stackTraceLimit=n,s.length){const n=[];for(const t of r?s:s.slice(1))if(n.push(t),e.test(t.toString()))break;t.stack=r?n.join("\n"):g.prepareStackTrace(t,n)}}static getCallSite(t=0){const e=Error.stackTraceLimit,n=t+1;Error.stackTraceLimit=e+n;const i=Error.prepareStackTrace;Error.prepareStackTrace=(t,e)=>e;const r=(new Error).stack?.slice(n)??[];return Error.prepareStackTrace=i,Error.stackTraceLimit=e,r}static prepareStackTrace(t,e){if("function"==typeof Error.prepareStackTrace)return Error.prepareStackTrace(t,e);let n=`${t.name||"Error"}: ${t.message||""}\n`;return n+=e.map(t=>`    at ${t}`).join("\n"),n}constructor(t,e){const{reason:n,error:i}=t;super(n),this.name=this.constructor.name,i?.stack&&(this.cause=new f(i)),e&&(this.stack=g.prepareStackTrace(this,e))}}function m(t){let e;return"object"==typeof t&&"string"==typeof t.uuid||(e="Not a valid identity object"),e}const v=t=>{(t.contentNavigation?.whitelist||t.contentNavigation?.blacklist||t.contentRedirect?.whitelist||t.contentRedirect?.blacklist)&&console.warn("The properties 'whitelist' and 'blacklist' have been marked as deprecated and will be removed in a future version. Please use 'allowlist' and 'denylist'.")};class C extends h{async create(t){const{uuid:e}=this.wire.me;if(!t.name||"string"!=typeof t.name)throw new Error("Please provide a name property as a string in order to create a View.");return v(t),this.wire.environment.childViews?await this.wire.environment.createChildContent({entityType:"view",options:{...t,uuid:e}}):await this.wire.sendAction("create-view",{...t,uuid:e}),this.wrapSync({uuid:e,name:t.name})}async wrap(t){this.wire.recordAnalytic("view-wrap");const e=m(t);if(e)throw new Error(e);return new E(this.wire,t)}wrapSync(t){this.wire.recordAnalytic("view-wrap-sync");const e=m(t);if(e)throw new Error(e);return new E(this.wire,t)}getCurrent(){if(this.wire.recordAnalytic("view-get-current"),!this.wire.me.isView)throw new Error("You are not in a View context");const{uuid:t,name:e}=this.wire.me;return this.wrap({uuid:t,name:e})}getCurrentSync(){if(this.wire.recordAnalytic("view-get-current-sync"),!this.wire.me.isView)throw new Error("You are not in a View context");const{uuid:t,name:e}=this.wire.me;return this.wrapSync({uuid:t,name:e})}}class I{constructor(t){this.producerFn=t}getValue(){return this.value||(this.value=this.producerFn()),this.value}}class x{constructor(t){this.producerFn=t}async getValue(){return this.promise||(this.promise=this.producerFn().catch(t=>{throw delete this.promise,t})),this.promise}}class b extends l{constructor(t,e,n){super(t,n,e.uuid,e.name),this.identity=e,this.entityType=n}capturePage(t){return this.wire.sendAction("capture-page",{options:t,...this.identity}).then(({payload:t})=>t.data)}executeJavaScript(t){return this.wire.sendAction("execute-javascript-in-window",{...this.identity,code:t}).then(({payload:t})=>t.data)}getZoomLevel(){return this.wire.sendAction("get-zoom-level",this.identity).then(({payload:t})=>t.data)}setZoomLevel(t){return this.wire.sendAction("set-zoom-level",{...this.identity,level:t}).then(()=>{})}navigate(t){return this.wire.sendAction("navigate-window",{...this.identity,url:t}).then(()=>{})}navigateBack(){return this.wire.sendAction("navigate-window-back",{...this.identity}).then(()=>{})}async navigateForward(){await this.wire.sendAction("navigate-window-forward",{...this.identity})}stopNavigation(){return this.wire.sendAction("stop-window-navigation",{...this.identity}).then(()=>{})}reload(t=!1){return this.wire.sendAction("reload-window",{ignoreCache:t,...this.identity}).then(()=>{})}print(t={}){return this.wire.sendAction("print",{...this.identity,options:t}).then(()=>{})}findInPage(t,e){return this.wire.sendAction("find-in-page",{...this.identity,searchTerm:t,options:e}).then(({payload:t})=>t.data)}stopFindInPage(t){return this.wire.sendAction("stop-find-in-page",{...this.identity,action:t}).then(()=>{})}getPrinters(){return this.wire.sendAction("get-printers",{...this.identity}).then(({payload:t})=>t.data)}async focus({emitSynthFocused:t}={emitSynthFocused:!0}){await this.wire.sendAction("focus-window",{emitSynthFocused:t,...this.identity})}async showDeveloperTools(){await this.wire.sendAction("show-developer-tools",this.identity)}async getProcessInfo(){const{payload:{data:t}}=await this.wire.sendAction("get-process-info",this.identity);return t}async getSharedWorkers(){return this.wire.sendAction("get-shared-workers",this.identity).then(({payload:t})=>t.data)}async inspectSharedWorker(){await this.wire.sendAction("inspect-shared-worker",{...this.identity})}async inspectSharedWorkerById(t){await this.wire.sendAction("inspect-shared-worker-by-id",{...this.identity,workerId:t})}async inspectServiceWorker(){await this.wire.sendAction("inspect-service-worker",{...this.identity})}async showPopupWindow(t){if(this.wire.recordAnalytic(`${this.entityType}-show-popup-window`),t?.onPopupReady){const e=async({popupName:e})=>{try{const n=this.fin.Window.wrapSync({uuid:this.fin.me.uuid,name:e});await t.onPopupReady(n)}catch(t){throw new Error(`Something went wrong during onPopupReady execution: ${t}`)}};await this.once("popup-ready",e)}const{payload:e}=await this.wire.sendAction("try-create-popup-window",{options:{...t,hasResultCallback:!!t?.onPopupResult,hasReadyCallback:!!t?.onPopupReady},...this.identity}),{data:{willOpen:n,options:i}}=e;n&&await this.fin.Window.create(i.initialOptions);if(t?.onPopupResult){const e=async e=>{await t.onPopupResult((t=>{const{name:e,uuid:n,result:i,data:r}=t,s={identity:{name:e,uuid:n},result:i};return r&&(s.data=r),s})(e))},n=async()=>{await this.removeListener("popup-result",e)};await this.on("popup-result",e),await this.once("popup-teardown",n)}const{payload:r}=await this.wire.sendAction("show-popup-window",{options:i,...this.identity});return r.data}async getScreenCapturePermission(){return(await this.wire.sendAction("get-screen-capture-permissions",this.identity)).payload.data}}var A;class E extends b{constructor(t,e){super(t,e,"view"),this.identity=e,A.set(this,new I(()=>this.fin.Platform.wrapSync(this.identity).getClient())),this.attach=async t=>{await this.wire.sendAction("attach-view",{target:t,...this.identity})},this.destroy=async()=>{await this.wire.sendAction("destroy-view",{...this.identity})},this.show=async()=>{await this.wire.sendAction("show-view",{...this.identity})},this.showAt=async(t,e={})=>{await this.wire.sendAction("show-view-at",{bounds:t,...this.identity,options:e})},this.bringToFront=async()=>{await this.wire.sendAction("bring-view-to-front",{...this.identity})},this.hide=async()=>{await this.wire.sendAction("hide-view",{...this.identity})},this.setBounds=async t=>{await this.wire.sendAction("set-view-bounds",{bounds:t,...this.identity})},this.getBounds=async()=>(await this.wire.sendAction("get-view-bounds",{...this.identity})).payload.data,this.getInfo=async()=>(await this.wire.sendAction("get-view-info",{...this.identity})).payload.data,this.getParentLayout=async()=>(this.wire.recordAnalytic("view-get-parent-layout"),this.fin.Platform.Layout.getLayoutByViewIdentity(this.identity)),this.getOptions=async()=>this.wire.sendAction("get-view-options",{...this.identity}).then(({payload:t})=>t.data),this.updateOptions=async t=>this.wire.sendAction("update-view-options",{options:t,...this.identity}).then(()=>{}),this.getCurrentWindow=async()=>{const{payload:{data:t}}=await this.wire.sendAction("get-view-window",{...this.identity});return new S(this.wire,t)},this.getCurrentStack=async()=>{this.wire.recordAnalytic("view-get-current-stack");try{return(await this.getParentLayout()).getStackByViewIdentity(this.identity)}catch(t){throw new g({reason:"This view does not belong to a stack.",error:t})}},this.triggerBeforeUnload=async()=>(await this.wire.sendAction("trigger-before-unload",{...this.identity})).payload.data,this.bindToElement=async t=>{if(!t)throw new Error("Element not found.");return this.wire.environment.observeBounds(t,async t=>this.setBounds(t))}}async focus({emitSynthFocused:t}={emitSynthFocused:!0}){const e=await this.getCurrentWindow();await e.focusedWebViewWasChanged(),await super.focus({emitSynthFocused:t})}}A=new WeakMap;class P extends l{constructor(t,e){super(t,"application",e.uuid),this.identity=e,this.window=new S(this.wire,{uuid:this.identity.uuid,name:this.identity.uuid})}windowListFromIdentityList(t){const e=[];return t.forEach(t=>{e.push(new S(this.wire,{uuid:t.uuid,name:t.name}))}),e}isRunning(){return this.wire.sendAction("is-application-running",this.identity).then(({payload:t})=>t.data)}async quit(t=!1){try{await this._close(t),await this.wire.sendAction("destroy-application",{force:t,...this.identity})}catch(t){if(!["Remote connection has closed","Could not locate the requested application"].some(e=>t.message.includes(e)))throw t}}async _close(t=!1){try{await this.wire.sendAction("close-application",{force:t,...this.identity})}catch(t){if(!t.message.includes("Remote connection has closed"))throw t}}close(t=!1){return console.warn("Deprecation Warning: Application.close is deprecated Please use Application.quit"),this.wire.recordAnalytic("application-close"),this._close(t)}getChildWindows(){return this.wire.sendAction("get-child-windows",this.identity).then(({payload:t})=>{const e=[];return t.data.forEach(t=>{e.push({uuid:this.identity.uuid,name:t})}),this.windowListFromIdentityList(e)})}getManifest(){return this.wire.sendAction("get-application-manifest",this.identity).then(({payload:t})=>t.data)}getParentUuid(){return this.wire.sendAction("get-parent-application",this.identity).then(({payload:t})=>t.data)}getShortcuts(){return this.wire.sendAction("get-shortcuts",this.identity).then(({payload:t})=>t.data)}async getViews(){const{payload:t}=await this.wire.sendAction("application-get-views",this.identity);return t.data.map(t=>new E(this.wire,t))}getZoomLevel(){return this.wire.sendAction("get-application-zoom-level",this.identity).then(({payload:t})=>t.data)}getWindow(){return this.wire.recordAnalytic("application-get-window"),Promise.resolve(this.window)}registerUser(t,e){return this.wire.sendAction("register-user",{userName:t,appName:e,...this.identity}).then(()=>{})}removeTrayIcon(){return this.wire.sendAction("remove-tray-icon",this.identity).then(()=>{})}restart(){return this.wire.sendAction("restart-application",this.identity).then(()=>{})}run(){return console.warn("Deprecation Warning: Application.run is deprecated Please use fin.Application.start"),this.wire.recordAnalytic("application-run"),this._run()}_run(t={}){return this.wire.sendAction("run-application",{manifestUrl:this._manifestUrl,opts:t,...this.identity}).then(()=>{})}scheduleRestart(){return this.wire.sendAction("relaunch-on-close",this.identity).then(()=>{})}async sendApplicationLog(){const{payload:t}=await this.wire.sendAction("send-application-log",this.identity);return t.data}async setJumpList(t){await this.wire.sendAction("set-jump-list",{config:t,...this.identity})}setTrayIcon(t){return this.wire.sendAction("set-tray-icon",{enabledIcon:t,...this.identity}).then(()=>{})}async setTrayIconToolTip(t){await this.wire.sendAction("set-tray-icon-tooltip",{...this.identity,toolTip:t})}setShortcuts(t){return this.wire.sendAction("set-shortcuts",{data:t,...this.identity}).then(()=>{})}async setShortcutQueryParams(t){await this.wire.sendAction("set-shortcut-query-args",{data:t,...this.identity})}setZoomLevel(t){return this.wire.sendAction("set-application-zoom-level",{level:t,...this.identity}).then(()=>{})}async setAppLogUsername(t){await this.wire.sendAction("set-app-log-username",{data:t,...this.identity})}getTrayIconInfo(){return this.wire.sendAction("get-tray-icon-info",this.identity).then(({payload:t})=>t.data)}hasTrayIcon(){return this.wire.sendAction("has-tray-icon",this.identity).then(({payload:t})=>t.data)}terminate(){return this.wire.sendAction("terminate-application",this.identity).then(()=>{})}wait(){return this.wire.sendAction("wait-for-hung-application",this.identity).then(()=>{})}getInfo(){return this.wire.sendAction("get-info",this.identity).then(({payload:t})=>t.data)}async getProcessInfo(){const{payload:{data:t}}=await this.wire.sendAction("application-get-process-info",this.identity);return t}async setFileDownloadLocation(t){const{name:e}=this.wire.me,n={uuid:this.identity.uuid,name:e};await this.wire.sendAction("set-file-download-location",{...n,downloadLocation:t})}async getFileDownloadLocation(){const{payload:{data:t}}=await this.wire.sendAction("get-file-download-location",this.identity);return t}async showTrayIconPopupMenu(t){const{name:e}=this.wire.me,n={uuid:this.identity.uuid,name:e},{payload:i}=await this.wire.sendAction("show-tray-icon-popup-menu",{...n,options:t});return i.data}async closeTrayIconPopupMenu(){const{name:t}=this.wire.me,e={uuid:this.identity.uuid,name:t};await this.wire.sendAction("close-tray-icon-popup-menu",{...e})}}class M extends h{async wrap(t){this.wire.recordAnalytic("wrap-application");const e=m(t);if(e)throw new Error(e);return new P(this.wire,t)}wrapSync(t){this.wire.recordAnalytic("wrap-application-sync");const e=m(t);if(e)throw new Error(e);return new P(this.wire,t)}async _create(t){return void 0===t.waitForPageLoad&&(t.waitForPageLoad=!1),void 0===t.autoShow&&void 0===t.isPlatformController&&(t.autoShow=!0),await this.wire.sendAction("create-application",t),this.wrap({uuid:t.uuid})}create(t){return console.warn("Deprecation Warning: fin.Application.create is deprecated. Please use fin.Application.start"),this.wire.recordAnalytic("application-create"),this._create(t)}async start(t){this.wire.recordAnalytic("start-application");const e=await this._create(t);return await this.wire.sendAction("run-application",{uuid:t.uuid}),e}async startManyManifests(t,e){return this.wire.sendAction("run-applications",{applications:t,opts:e}).then(()=>{})}getCurrent(){return this.wire.recordAnalytic("get-current-application"),this.wrap({uuid:this.wire.me.uuid})}getCurrentSync(){return this.wire.recordAnalytic("get-current-application-sync"),this.wrapSync({uuid:this.wire.me.uuid})}async startFromManifest(t,e){this.wire.recordAnalytic("application-start-from-manifest");const n=await this._createFromManifest(t);return await n._run(e),n}createFromManifest(t){return console.warn("Deprecation Warning: fin.Application.createFromManifest is deprecated. Please use fin.Application.startFromManifest"),this.wire.recordAnalytic("application-create-from-manifest"),this._createFromManifest(t)}_createFromManifest(t){return this.wire.sendAction("get-application-manifest",{manifestUrl:t}).then(({payload:t})=>{const e=t.data.platform?t.data.platform.uuid:t.data.startup_app.uuid;return this.wrap({uuid:e})}).then(e=>(e._manifestUrl=t,e))}}class S extends b{constructor(t,e){super(t,e,"window")}async createWindow(t){this.wire.recordAnalytic("window-create-window");const e=await(async(t,e,n=()=>!0,i)=>{let r,s,o;const a=new Promise((t,e)=>{r=t,s=e}),c=t=>{n(t)&&(clearTimeout(o),r(t))};return await t.on(e,c),i&&(o=setTimeout(()=>s(new Error("event timed out")),i)),a.finally(()=>{t.removeListener(e,c).catch(()=>null)}),{getValue:()=>a}})(this,"fire-constructor-callback");void 0===t.waitForPageLoad&&(t.waitForPageLoad=!1),void 0===t.autoShow&&(t.autoShow=!0),v(t);const n=this.wire.environment.createChildContent({entityType:"window",options:t}),[i]=await Promise.all([e.getValue(),n]);let r;const{success:s}=i,o=i.data,{message:a}=o;r=s?{httpResponseCode:o.httpResponseCode,apiInjected:o.apiInjected}:{message:o.message,networkErrorCode:o.networkErrorCode,stack:o.stack};const c={message:a,cbPayload:r,success:s};try{this.getWebWindow().fin.__internal_.openerSuccessCBCalled()}catch(t){}return c.success?this:Promise.reject(c)}getAllFrames(){return this.wire.sendAction("get-all-frames",this.identity).then(({payload:t})=>t.data)}activateAndFocus(t){return this.wire.sendAction("activate-window-and-focus",{winIdentity:this.identity,focusIdentity:t}).then(({payload:t})=>t.data)}getBounds(t){return this.wire.sendAction("get-window-bounds",{...this.identity,options:t}).then(({payload:t})=>t.data)}center(){return this.wire.sendAction("center-window",this.identity).then(()=>{})}blur(){return this.wire.sendAction("blur-window",this.identity).then(()=>{})}bringToFront(){return this.wire.sendAction("bring-window-to-front",this.identity).then(()=>{})}animate(t,e){return this.wire.sendAction("animate-window",{transitions:t,options:e,...this.identity}).then(()=>{})}hide(){return this.wire.sendAction("hide-window",this.identity).then(()=>{})}close(t=!1){return this.wire.sendAction("close-window",{force:t,...this.identity}).then(()=>{Object.setPrototypeOf(this,null)})}focusedWebViewWasChanged(){return this.wire.sendAction("focused-webview-changed",this.identity).then(()=>{})}getNativeId(){return this.wire.sendAction("get-window-native-id",this.identity).then(({payload:t})=>t.data)}async getCurrentViews(){const{payload:t}=await this.wire.sendAction("window-get-views",this.identity);return t.data.map(t=>new E(this.wire,t))}disableFrame(){return console.warn("Function is deprecated; use disableUserMovement instead."),this.wire.sendAction("disable-window-frame",this.identity).then(()=>{})}disableUserMovement(){return this.wire.sendAction("disable-window-frame",this.identity).then(()=>{})}enableFrame(){return console.warn("Function is deprecated; use enableUserMovement instead."),this.wire.sendAction("enable-window-frame",this.identity).then(()=>{})}enableUserMovement(){return this.wire.sendAction("enable-window-frame",this.identity).then(()=>{})}flash(){return this.wire.sendAction("flash-window",this.identity).then(()=>{})}stopFlashing(){return this.wire.sendAction("stop-flash-window",this.identity).then(()=>{})}getInfo(){return this.wire.sendAction("get-window-info",this.identity).then(({payload:t})=>t.data)}async getLayout(t){this.wire.recordAnalytic("window-get-layout");const e=await this.getOptions();if(!e.layout&&!e.layoutSnapshot)throw new Error("Window does not have a Layout");return this.fin.Platform.Layout.wrap(t??this.identity)}getOptions(){return this.wire.sendAction("get-window-options",this.identity).then(({payload:t})=>t.data)}getParentApplication(){return this.wire.recordAnalytic("window-get-parent-application"),Promise.resolve(new P(this.wire,this.identity))}getParentWindow(){return this.wire.recordAnalytic("window-get-parent-window"),Promise.resolve(new P(this.wire,this.identity)).then(t=>t.getWindow())}async getSnapshot(t){const e={area:t,...this.identity};console.warn("Window.getSnapshot has been deprecated, please use Window.capturePage");return(await this.wire.sendAction("get-window-snapshot",e)).payload.data}getState(){return this.wire.sendAction("get-window-state",this.identity).then(({payload:t})=>t.data)}getWebWindow(){return this.wire.recordAnalytic("window-get-web-window"),this.wire.environment.getWebWindow(this.identity)}isMainWindow(){return this.wire.recordAnalytic("window-is-main-window"),this.me.uuid===this.me.name}isShowing(){return this.wire.sendAction("is-window-showing",this.identity).then(({payload:t})=>t.data)}maximize(){return this.wire.sendAction("maximize-window",this.identity).then(()=>{})}minimize(){return this.wire.sendAction("minimize-window",this.identity).then(()=>{})}moveBy(t,e,n){return this.wire.sendAction("move-window-by",{deltaLeft:t,deltaTop:e,positioningOptions:n,...this.identity}).then(()=>{})}moveTo(t,e,n){return this.wire.sendAction("move-window",{left:t,top:e,positioningOptions:n,...this.identity}).then(()=>{})}resizeBy(t,e,n,i){return this.wire.sendAction("resize-window-by",{deltaWidth:Math.floor(t),deltaHeight:Math.floor(e),anchor:n,positioningOptions:i,...this.identity}).then(()=>{})}resizeTo(t,e,n,i){return this.wire.sendAction("resize-window",{width:Math.floor(t),height:Math.floor(e),anchor:n,positioningOptions:i,...this.identity}).then(()=>{})}restore(){return this.wire.sendAction("restore-window",this.identity).then(()=>{})}setAsForeground(){return this.wire.sendAction("set-foreground-window",this.identity).then(()=>{})}setBounds(t,e){return this.wire.sendAction("set-window-bounds",{...t,...this.identity,positioningOptions:e}).then(()=>{})}show(t=!1){return this.wire.sendAction("show-window",{force:t,...this.identity}).then(()=>{})}showAt(t,e,n=!1){return this.wire.sendAction("show-at-window",{force:n,left:Math.floor(t),top:Math.floor(e),...this.identity}).then(()=>{})}updateOptions(t){return"frame"in t&&console.warn("Deprecation Warning: Starting with version 45 it will not be possible to change the frame value after window has been created."),this.wire.sendAction("update-window-options",{options:t,...this.identity}).then(()=>{})}authenticate(t,e){return this.wire.sendAction("window-authenticate",{userName:t,password:e,...this.identity}).then(()=>{})}async showPopupMenu(t){const{payload:e}=await this.wire.sendAction("show-popup-menu",{options:t,...this.identity});return e.data}async closePopupMenu(){return this.wire.sendAction("close-popup-menu",{...this.identity}).then(()=>{})}async dispatchPopupResult(t){this.wire.recordAnalytic("window-dispatch-popup-result"),await this.wire.sendAction("dispatch-popup-result",{data:t,...this.identity})}async print(t={content:"self"}){switch(t.content){case void 0:case"self":return super.print(t);case"screenshot":return this.wire.sendAction("print-screenshot",this.identity).then(()=>{});case"views":return this.wire.sendAction("print-views",{...this.identity,options:t}).then(()=>{});default:return}}async showDownloadBubble(t){return this.wire.sendAction("show-download-bubble",{...this.identity,anchor:t}).then(()=>{})}async updateDownloadBubbleAnchor(t){return this.wire.sendAction("update-download-bubble-anchor",{...this.identity,anchor:t}).then(()=>{})}}class k extends h{async wrap(t){this.wire.recordAnalytic("window-wrap");const e=m(t);if(e)throw new Error(e);return new S(this.wire,t)}wrapSync(t){this.wire.recordAnalytic("window-wrap-sync");const e=m(t);if(e)throw new Error(e);return new S(this.wire,t)}create(t){this.wire.recordAnalytic("create-window");return new S(this.wire,{uuid:this.me.uuid,name:t.name}).createWindow(t)}getCurrent(){if(this.wire.recordAnalytic("get-current-window"),!this.wire.me.isWindow)throw new Error("You are not in a Window context");const{uuid:t,name:e}=this.wire.me;return this.wrap({uuid:t,name:e})}getCurrentSync(){if(this.wire.recordAnalytic("get-current-window-sync"),!this.wire.me.isWindow)throw new Error("You are not in a Window context");const{uuid:t,name:e}=this.wire.me;return this.wrapSync({uuid:t,name:e})}}class L extends h{async getCategories(){const{payload:t}=await this.wire.sendAction("content-tracing-get-categories");return t.data}async startRecording(t){await this.wire.sendAction("content-tracing-start-recording",{options:t})}async stopRecording(){const{payload:t}=await this.wire.sendAction("content-tracing-stop-recording");return t.data}async getTraceBufferUsage(){const{payload:t}=await this.wire.sendAction("content-tracing-get-trace-buffer-usage");return t.data}}class T extends l{constructor(t){super(t,"system"),this.ContentTracing=new L(t)}sendExternalProcessRequest(t,e){return new Promise((n,i)=>{const r="external-process-exited";let s,o,a,c;"function"==typeof e.listener&&(a=t=>{const n=t||{};o={topic:"exited",uuid:n.processUuid||"",exitCode:n.exitCode||0},s===t.processUuid&&(e.listener(o),c.removeListener(r,a))},this.wire.me.name||(this.wire.me.name=this.wire.me.uuid),c=new S(this.wire,this.wire.me),c.on(r,a)),this.wire.sendAction(t,e).then(({payload:t})=>{s=t.data.uuid,n(t.data),o&&s===o.uuid&&(e.listener(o),c.removeListener(r,a))}).catch(t=>{c&&c.removeListener(r,a),i(t)})})}getVersion(){return this.wire.sendAction("get-version").then(({payload:t})=>t.data)}clearCache(t){return this.wire.sendAction("clear-cache",t).then(()=>{})}clearHTTPCache(){return this.wire.sendAction("clear-http-cache").then(()=>{})}clearCacheData(t){return this.wire.sendAction("clear-cache-data",t||{}).then(()=>{})}deleteCacheOnExit(){return this.wire.sendAction("delete-cache-request").then(()=>{})}exit(){return this.wire.sendAction("exit-desktop").then(()=>{})}async fetchManifest(t){const{payload:{data:e}}=await this.wire.sendAction("fetch-manifest",{manifestUrl:t});return e}flushCookieStore(){return this.wire.sendAction("flush-cookie-store").then(()=>{})}getAllWindows(){return this.wire.sendAction("get-all-windows").then(({payload:t})=>t.data)}getAllApplications(){return this.wire.sendAction("get-all-applications").then(({payload:t})=>t.data)}getCommandLineArguments(){return this.wire.sendAction("get-command-line-arguments").then(({payload:t})=>t.data)}async getCrashReporterState(){const{payload:{data:{diagnosticMode:t,isRunning:e}}}=await this.wire.sendAction("get-crash-reporter-state");return console.warn("diagnosticMode property is deprecated. It will be removed in a future version"),{diagnosticMode:t,diagnosticsMode:t,isRunning:e}}async startCrashReporter(t){const e=t,n={...e,diagnosticMode:e.diagnosticsMode||e.diagnosticMode},{payload:{data:{diagnosticMode:i,isRunning:r}}}=await this.wire.sendAction("start-crash-reporter",n);return{diagnosticMode:i,diagnosticsMode:i,isRunning:r}}getUniqueUserId(){return this.wire.sendAction("get-unique-user-id").then(({payload:t})=>t.data)}getEntityInfo(t,e){return this.wire.sendAction("get-entity-info",{uuid:t,name:e}).then(({payload:t})=>t.data)}getEnvironmentVariable(t){return this.wire.sendAction("get-environment-variable",{environmentVariables:t}).then(({payload:t})=>t.data)}getFocusedWindow(){return this.wire.sendAction("get-focused-window").then(({payload:t})=>t.data)}getFocusedContent(){return this.wire.sendAction("get-focused-content").then(({payload:t})=>t.data)}async isAppCertified(t){const{payload:{data:{certifiedInfo:e}}}=await this.wire.sendAction("is-app-certified",{manifestUrl:t});return e}getInstalledRuntimes(){return this.wire.sendAction("get-installed-runtimes").then(({payload:t})=>t.data.runtimes)}async getInstalledApps(){const{payload:{data:{installedApps:t}}}=await this.wire.sendAction("get-installed-apps");return t}getLog(t){return this.wire.sendAction("view-log",t).then(({payload:t})=>t.data)}getMachineId(){return this.wire.sendAction("get-machine-id").then(({payload:t})=>t.data)}getMinLogLevel(){return this.wire.sendAction("get-min-log-level").then(({payload:t})=>t.data)}getLogList(){return this.wire.sendAction("list-logs").then(({payload:t})=>t.data)}getMonitorInfo(){return this.wire.sendAction("get-monitor-info").then(({payload:t})=>t.data)}getMousePosition(){return this.wire.sendAction("get-mouse-position").then(({payload:t})=>t.data)}getProcessList(){return console.warn("System.getProcessList has been deprecated. Please consider using our new process APIs: Window.getProcessInfo, View.getProcessInfo, Application.getProcessInfo, System.getAllProcessInfo"),this.wire.sendAction("process-snapshot").then(({payload:t})=>t.data)}async getAllProcessInfo(){const{payload:{data:t}}=await this.wire.sendAction("get-all-process-info",this.identity);return t}getProxySettings(){return this.wire.sendAction("get-proxy-settings").then(({payload:t})=>t.data)}getRuntimeInfo(){return this.wire.sendAction("get-runtime-info").then(({payload:t})=>t.data)}getRvmInfo(){return this.wire.sendAction("get-rvm-info").then(({payload:t})=>t.data)}getHostSpecs(){return this.wire.sendAction("get-host-specs").then(({payload:t})=>t.data)}getOSInfo(){return this.wire.sendAction("get-os-info").then(({payload:t})=>t.data)}launchExternalProcess(t){return this.sendExternalProcessRequest("launch-external-process",t)}monitorExternalProcess(t){return this.sendExternalProcessRequest("monitor-external-process",t)}log(t,e,n){return this.wire.sendAction("write-to-log",{level:t,message:e,target:n??{}}).then(()=>{})}openUrlWithBrowser(t){return this.wire.sendAction("open-url-with-browser",{url:t}).then(()=>{})}async registerCustomProtocol(t){if("object"!=typeof t)throw new Error("Must provide an object with a `protocolName` property having a string value.");await this.wire.sendAction("register-custom-protocol",t)}async unregisterCustomProtocol(t){await this.wire.sendAction("unregister-custom-protocol",{protocolName:t})}async getCustomProtocolState(t){return this.wire.sendAction("get-custom-protocol-state",{protocolName:t}).then(({payload:t})=>t.data)}releaseExternalProcess(t){return this.wire.sendAction("release-external-process",{uuid:t}).then(()=>{})}showDeveloperTools(t){return this.wire.sendAction("show-developer-tools",t).then(()=>{})}terminateExternalProcess(t){return this.wire.sendAction("terminate-external-process",t).then(()=>{})}updateProxySettings(t){return this.wire.sendAction("update-proxy",t).then(()=>{})}async downloadAsset(t,e){const n=()=>{};let i=n,r=n;const s=new Promise((t,e)=>{i=t,r=e});if("openfin"!==this.wire.environment.type)throw new y("downloadAsset only supported in an OpenFin Render process");const o=g.getCallSite(),a=this.wire.environment.getNextMessageId().toString(),c=`asset-download-progress-${a}`,d=`asset-download-error-${a}`,h=`asset-download-complete-${a}`,l=t=>{const n={downloadedBytes:t.downloadedBytes,totalBytes:t.totalBytes};e(n)},p=()=>{this.removeListener(c,l)};await Promise.all([this.on(c,l),this.once(d,t=>{p();const{reason:e,err:n}=t;r(new g({reason:e,error:n},o))}),this.once(h,()=>{p(),i()})]);const u=Object.assign(t,{downloadId:a});return await this.wire.sendAction("download-asset",u).catch(t=>{throw p(),t}),s}downloadRuntime(t,e){const n=g.getCallSite();return new Promise((i,r)=>{if("openfin"!==this.wire.environment.type)return void r(new y("downloadRuntime only supported in an OpenFin Render process"));const s=this.wire.environment.getNextMessageId().toString(),o=`runtime-download-progress-${s}`,a=`runtime-download-error-${s}`,c=`runtime-download-complete-${s}`,d=t=>{const n={downloadedBytes:t.downloadedBytes,totalBytes:t.totalBytes};e(n)},h=()=>{this.removeListener(o,d)};this.on(o,d),this.once(a,t=>{h();const{reason:e,err:i}=t;r(new g({reason:e,error:i},n))}),this.once(c,()=>{h(),i()});const l=Object.assign(t,{downloadId:s});this.wire.sendAction("download-runtime",l).catch(t=>{h(),r(t)})})}downloadPreloadScripts(t){return this.wire.sendAction("download-preload-scripts",{scripts:t}).then(({payload:t})=>t.data)}getAllExternalApplications(){return this.wire.sendAction("get-all-external-applications").then(({payload:t})=>t.data)}getAppAssetInfo(t){return this.wire.sendAction("get-app-asset-info",t).then(({payload:t})=>t.data)}getCookies(t){const e=this.wire.environment.getUrl(),n=Object.assign(t,{url:e});return this.wire.sendAction("get-cookies",n).then(({payload:t})=>t.data)}setMinLogLevel(t){return this.wire.sendAction("set-min-log-level",{level:t}).then(()=>{})}resolveUuid(t){return this.wire.sendAction("resolve-uuid",{entityKey:t}).then(({payload:t})=>t.data)}executeOnRemote(t,e){return e.requestingIdentity=t,this.wire.ferryAction(e)}readRegistryValue(t,e,n){return this.wire.sendAction("read-registry-value",{rootKey:t,subkey:e,value:n}).then(({payload:t})=>t.data)}registerExternalConnection(t){return this.wire.sendAction("register-external-connection",{uuid:t}).then(({payload:t})=>t.data)}async getServiceConfiguration(t){if("string"!=typeof t.name)throw new Error("Must provide an object with a `name` property having a string value");const{name:e}=t;return this.wire.sendAction("get-service-configuration",{name:e}).then(({payload:t})=>t.data)}async getSystemAppConfig(t){if("string"!=typeof t)throw new Error("Must provide a string value for name of system app");return this.wire.sendAction("get-system-app-configuration",{name:t}).then(({payload:t})=>t.data)}async registerShutdownHandler(t){this.wire.recordAnalytic("system-register-shutdown-handler");const{uuid:e,name:n}=this.wire.me;this.on("system-shutdown",i=>{t({proceed:()=>{this.wire.environment.raiseEvent("application/system-shutdown-handled",{uuid:e,name:n,topic:"application"})}})})}runRvmHealthCheck(){return this.wire.sendAction("run-rvm-health-check").then(({payload:t})=>t.data)}async launchManifest(e,n={}){const{subscribe:i,...r}=n,s=r;if(i){const e=new t.EventEmitter;i(e);const n="app-version-progress",r="runtime-status",o="app-version-complete",a="app-version-error",c=this.wire.environment.getNextMessageId().toString();s.appVersionId=c;const d=[o,n,r,a],h=t=>{const{appVersionId:e,topic:n,type:i,...r}=t;return{...r,type:d.find(t=>i.includes(t))}},l=t=>{const n=h(t);e.emit(n.type,n)},p=()=>{this.removeListener(`${n}.${c}`,l),this.removeListener(`${r}.${c}`,l),this.removeListener(`${o}.${c}`,l),this.removeListener(`${a}.${c}`,l),this.removeListener(`${o}.${c}`,p),this.removeListener(`${a}.${c}`,p)};await Promise.all([this.on(`${n}.${c}`,l),this.on(`${r}.${c}`,l),this.once(`${o}.${c}`,l),this.once(`${a}.${c}`,l),this.once(`${o}.${c}`,p),this.once(`${a}.${c}`,p)])}return(await this.wire.sendAction("launch-manifest",{manifestUrl:e,opts:s})).payload.data.manifest}async queryPermissionForCurrentContext(t){const e={uuid:this.wire.me.uuid,name:this.wire.me.name};return(await this.wire.sendAction("query-permission-for-current-context",{apiName:t,identity:e})).payload.data}async enableNativeWindowIntegrationProvider(t){const{payload:e}=await this.wire.sendAction("enable-native-window-integration-provider",{permissions:t});return e.data}async registerUsage({data:t,type:e}){await this.wire.sendAction("register-usage",{data:t,type:e})}async getPrinters(){const{payload:t}=await this.wire.sendAction("system-get-printers");return t.data}async updateProcessLoggingOptions(t){await this.wire.sendAction("system-update-process-logging-options",{options:t})}async getDomainSettings(){const{payload:{data:t}}=await this.wire.sendAction("get-domain-settings");return t}async setDomainSettings(t){await this.wire.sendAction("set-domain-settings",{domainSettings:t})}async getCurrentDomainSettings(t){return(await this.wire.sendAction("get-current-domain-settings",{identity:t})).payload.data}async resolveDomainSettings(t){return(await this.wire.sendAction("resolve-domain-settings",{url:t})).payload.data}async refreshExtensions(){const{payload:t}=await this.wire.sendAction("refresh-extensions");return t.data}async getInstalledExtensions(){const{payload:t}=await this.wire.sendAction("get-installed-extensions");return t.data}async serveAsset(t){return(await this.wire.sendAction("serve-asset",{options:t})).payload.data}async getThemePreferences(){return(await this.wire.sendAction("get-theme-preferences")).payload.data}async setThemePreferences(t){return(await this.wire.sendAction("set-theme-preferences",{preferences:t})).payload.data}async launchLogUploader(t){return(await this.wire.sendAction("launch-log-uploader",{options:t})).payload.data}async setThemePalette(t){return(await this.wire.sendAction("set-theme-palette",{themePalette:t})).payload.data}async getThemePalette(){const{payload:t}=await this.wire.sendAction("get-theme-palette");return t.data}}class ${constructor(){this.topicRefMap=new Map}incRefCount(t){const e=this.topicRefMap.get(t);let n;if(e){const i=e+1;n=i,this.topicRefMap.set(t,i)}else this.topicRefMap.set(t,1),n=1;return n}decRefCount(t){const e=this.topicRefMap.get(t);let n;if(e){const i=e-1;this.topicRefMap.set(t,i),n=i}else n=-1;return n}actOnFirst(t,e,n){return 1===this.incRefCount(t)?e():n()}actOnLast(t,e,n){return 0===this.decRefCount(t)?e():n()}}const F=t=>async(e,n,i)=>{const r=await t(e,n,i);return void 0===r?n:r};class R{constructor(t,e){this.providerIdentity=t,this.close=e}}class G{static defaultAction(t){throw new Error(`No action registered at target for ${t}`)}constructor(){this.subscriptions=new Map}async processAction(t,e,n){try{const i=this.subscriptions.get(t),r=i??((e,n)=>(this.defaultAction??G.defaultAction)(t,e,n)),s=this.preAction?await this.preAction(t,e,n):e,o=await r(s,n);return this.postAction?await this.postAction(t,o,n):o}catch(e){if(g.trimEndCallSites(e,/Channel.*processAction/),this.errorMiddleware)return this.errorMiddleware(t,e,n);throw e}}beforeAction(t){if(this.preAction)throw new Error("Already registered beforeAction middleware");this.preAction=F(t)}onError(t){if(this.errorMiddleware)throw new Error("Already registered error middleware");this.errorMiddleware=t}afterAction(t){if(this.postAction)throw new Error("Already registered afterAction middleware");this.postAction=F(t)}remove(t){this.subscriptions.delete(t)}setDefaultAction(t){if(this.defaultAction)throw new Error("default action can only be set once");this.defaultAction=t}register(t,e){if(this.subscriptions.has(t))throw new Error(`Subscription already registered for action: ${t}. Unsubscribe before adding new subscription`);return this.subscriptions.set(t,e),!0}}let O=class extends Error{constructor(t,e,n,i){super(t.message),this.action=e,this.dispatchPayload=n,this.name=this.constructor.name,"cause"in t&&t.cause instanceof Error&&(this.cause=t.cause),this.stack=g.prepareStackTrace(this,i)}};var W,j,H,N=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)},B=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n};const D=new Map;class V extends G{static closeChannelByEndpointId(t){const e=D.get(t);e&&N(e,H,"f").call(e)}static handleProviderDisconnect(t){for(const e of D.values())e.providerIdentity.channelId===t.channelId&&(e.disconnectListener(t),N(e,H,"f").call(e))}constructor(t,e,n){super(),W.set(this,void 0),j.set(this,void 0),this.processAction=(t,e,n)=>super.processAction(t,e,n),H.set(this,()=>{D.delete(this.endpointId),N(this,j,"f").close()}),B(this,W,new R(t,e),"f"),this.disconnectListener=()=>{},this.endpointId=t.endpointId,B(this,j,n,"f"),D.set(this.endpointId,this),n.receive(this.processAction)}get providerIdentity(){return N(this,W,"f").providerIdentity}async dispatch(t,e){if(N(this,j,"f").isEndpointConnected(this.providerIdentity.channelId)){const n=g.getCallSite();return N(this,j,"f").send(this.providerIdentity.channelId,t,e).catch(i=>{throw new O(i,t,e,n)})}throw new Error("The client you are trying to dispatch from is disconnected from the target provider.")}onDisconnection(t){this.disconnectListener=e=>{try{t(e)}catch(t){throw new Error(`Error while calling the onDisconnection callback: ${t.message}`)}finally{this.disconnectListener=()=>{}}}}async disconnect(){await this.sendDisconnectAction(),N(this,H,"f").call(this)}async sendDisconnectAction(){const t=N(this,W,"f");await t.close()}static async wireClose(t,e,n){const{channelName:i,uuid:r,name:s}=e;await t.sendAction("disconnect-from-channel",{channelName:i,uuid:r,name:s,endpointId:n})}}function U(t,e){throw new Error(`Unsupported value: ${t}${e?`\n Supported values are: ${e.join("")}`:""}`)}W=new WeakMap,j=new WeakMap,H=new WeakMap;var _,q,z,J=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},Y=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class K{constructor(t,e,n,i){this.messageReceiver=e,this.endpointId=n,this.providerIdentity=i,_.set(this,void 0),q.set(this,new Map),z.set(this,new Map),this.send=async(t,e,n)=>{const i=Y(this,q,"f").get(t);if(!i)throw new Error(`Could not locate routing info for endpoint ${t}`);const r={...i};r.isLocalEndpointId&&delete r.endpointId,delete r.isLocalEndpointId;const s=Y(this,_,"f").sendAction("send-channel-message",{...r,providerIdentity:this.providerIdentity,action:e,payload:n});Y(this,z,"f").get(t)?.add(s);return(await s.catch(t=>{if("cause"in t)throw t;throw new Error(t.message)}).finally(()=>{Y(this,z,"f").get(t)?.delete(s)})).payload.data.result},this.close=async()=>{this.messageReceiver.removeEndpoint(this.providerIdentity.channelId,this.endpointId),[...Y(this,q,"f").keys()].forEach(t=>this.closeEndpoint(t)),J(this,q,new Map,"f")},J(this,_,t,"f")}onEndpointDisconnect(t,e){}receive(t){this.messageReceiver.addEndpoint(t,this.providerIdentity.channelId,this.endpointId)}async closeEndpoint(t){const e=Y(this,q,"f").get(t);Y(this,q,"f").delete(t);const n=Y(this,z,"f").get(t);n?.forEach(n=>{const i=`Channel connection with identity uuid: ${e?.uuid} / name: ${e?.name} / endpointId: ${t} no longer connected.`;n.cancel(new Error(i))})}isEndpointConnected(t){return Y(this,q,"f").has(t)}addEndpoint(t,e){Y(this,q,"f").set(t,e.endpointIdentity),Y(this,z,"f").set(t,new Set)}isValidEndpointPayload(t){return"string"==typeof t?.endpointIdentity?.endpointId||"string"==typeof t?.endpointIdentity?.channelId}}_=new WeakMap,q=new WeakMap,z=new WeakMap;const Z={version:5,minimumVersion:0,type:"classic"};function Q(t){const e={stack:t.stack,name:t.name,message:t.message,toString:()=>t.stack||t.toString()};return"cause"in t&&(e.cause=Q(t.cause)),e}var X,tt,et=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)},nt=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n};class it{static isValidEndpointPayload(t){const e=t=>"object"==typeof t&&null!==t;return e(t)&&e(t.endpointIdentity)&&e(t.rtc)&&"string"==typeof t.endpointIdentity.endpointId}constructor({rtc:t,endpointIdentity:e}){this.responseMap=new Map,X.set(this,null),tt.set(this,void 0),this.connectionStateChangeHandler=t=>{"connected"!==this.rtc.rtcClient.connectionState&&(this.rtc.rtcClient.removeEventListener("connectionstatechange",this.connectionStateChangeHandler),this.close(),et(this,tt,"f")&&et(this,tt,"f").call(this))},this.send=async(t,e)=>{const n=`message-${Math.random()}`,i=new Promise((t,e)=>{this.responseMap.set(n,{resolve:t,reject:e})});return this.rtc.channels.request.send(JSON.stringify({action:t,payload:e,messageId:n})),i},this.close=()=>{this.responseMap.forEach(t=>t.reject("Connection has closed.")),this.responseMap=new Map,this.rtc.channels.request.close(),this.rtc.channels.response.close(),this.rtc.rtcClient.close()},this.rtc=t,this.endpointIdentity=e,this.rtc.channels.response.addEventListener("message",t=>{let{data:e}=t;t.data instanceof ArrayBuffer&&(e=(new TextDecoder).decode(t.data));const{messageId:n,payload:i,success:r,error:s}=JSON.parse(e),{resolve:o,reject:a}=this.responseMap.get(n)??{};o&&a?(this.responseMap.delete(n),r?o(i):a(s)):(console.log("Could not find id in responseMap."),console.log(t))}),this.rtc.channels.request.addEventListener("message",async t=>{let{data:n}=t;t.data instanceof ArrayBuffer&&(n=(new TextDecoder).decode(t.data));const{messageId:i,action:r,payload:s}=JSON.parse(n);if(et(this,X,"f"))try{const t=await et(this,X,"f").call(this,r,s,e);this.rtc.channels.response.send(JSON.stringify({messageId:i,payload:t,success:!0}))}catch(t){"open"===this.rtc.channels.response.readyState&&this.rtc.channels.response.send(JSON.stringify({messageId:i,error:Q(t),success:!1}))}else"open"===this.rtc.channels.response.readyState&&this.rtc.channels.response.send(JSON.stringify({messageId:i,success:!1,error:"Connection not ready."}))}),this.rtc.rtcClient.addEventListener("connectionstatechange",this.connectionStateChangeHandler),Object.values(this.rtc.channels).forEach(t=>{t.onclose=t=>{[...this.responseMap.values()].forEach(t=>t.reject(new Error("RTCDataChannel closed unexpectedly, this is most commonly caused by message size. Note: RTC Channels have a message size limit of ~255kB."))),this.close(),et(this,tt,"f")&&et(this,tt,"f").call(this)}})}onDisconnect(t){if(et(this,tt,"f"))throw new Error("RTCEndpoint disconnectListener cannot be set twice.");nt(this,tt,t,"f")}receive(t){if(et(this,X,"f"))throw new Error("You have already set a listener for this RTC Endpoint.");nt(this,X,t,"f")}get connected(){return"connected"===this.rtc.rtcClient.connectionState}}X=new WeakMap,tt=new WeakMap;var rt,st,ot,at=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)},ct=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n};class dt{constructor(t,e,n){this.EndpointType=t,this.StrategyName=n,rt.set(this,null),st.set(this,new Map),ot.set(this,!0),this.send=async(t,e,n)=>this.getEndpointById(t).send(e,n),this.close=async()=>{at(this,ot,"f")&&(at(this,st,"f").forEach(t=>t.close()),ct(this,st,new Map,"f")),ct(this,ot,!1,"f")},this.isValidEndpointPayload=e}onEndpointDisconnect(t,e){this.getEndpointById(t).onDisconnect(e)}receive(t){if(at(this,rt,"f"))throw new Error(`You have already set a listener for this ${this.StrategyName} Strategy`);ct(this,rt,t,"f"),at(this,st,"f").forEach(t=>t.receive(at(this,rt,"f")))}getEndpointById(t){const e=at(this,st,"f").get(t);if(!e)throw new Error(`Client with endpoint id ${t} is not connected`);return e}get connected(){return at(this,ot,"f")}isEndpointConnected(t){return at(this,st,"f").has(t)}addEndpoint(t,e){if(!at(this,ot,"f"))return void console.warn(`Adding endpoint to disconnected ${this.StrategyName} Strategy`);const n=new this.EndpointType(e);at(this,rt,"f")&&n.receive(at(this,rt,"f")),at(this,st,"f").set(t,n)}async closeEndpoint(t){at(this,st,"f").delete(t)}}rt=new WeakMap,st=new WeakMap,ot=new WeakMap;class ht extends dt{constructor(){super(it,it.isValidEndpointPayload,"RTC")}}const lt={version:2,minimumVersion:0,type:"rtc"};class pt extends l{constructor(t){super(t,"channel"),this.ensureChannelOpened=t=>new Promise((e,n)=>{if("open"===t.readyState)e();else if("connecting"===t.readyState){const n=()=>{t.removeEventListener("open",n),e()};t.addEventListener("open",n)}else n(new Error("This Channel has already closed"))})}static createDataChannelPromise(t,e){let n;const i=new Promise(t=>{n=t}),r=i=>{const s=()=>{i.channel.removeEventListener("open",s),n(i.channel)};i.channel.label===t&&(i.channel.addEventListener("open",s),e.removeEventListener("datachannel",r))};return e.addEventListener("datachannel",r),i}async listenForProviderIce(t,e){await this.on(this.createProviderEventName(t),e,{timestamp:Date.now()})}async raiseProviderIce(t,e){await this.wire.environment.raiseEvent(this.createRouteString(this.createProviderEventName(t)),e)}async listenForClientIce(t,e){await this.on(this.createClientEventName(t),e,{timestamp:Date.now()})}async raiseClientIce(t,e){await this.wire.environment.raiseEvent(this.createRouteString(this.createClientEventName(t)),e)}cleanupIceListeners(t){this.removeAllListeners(this.createClientEventName(t)),this.removeAllListeners(this.createProviderEventName(t))}createClientEventName(t){return`ice-client-${t}`}createProviderEventName(t){return`ice-provider-${t}`}createRouteString(t){return`channel/${t}`}createRtcPeer(){return this.wire.environment.getRtcPeer()}async startClientOffer(){const t=Math.random().toString(),e=this.createRtcPeer();e.addEventListener("icecandidate",async e=>{e.candidate&&await this.raiseClientIce(t,{candidate:e.candidate?.toJSON()})}),await this.listenForProviderIce(t,async t=>{await e.addIceCandidate(t.candidate)});const n={request:e.createDataChannel("request"),response:e.createDataChannel("response")},i=await e.createOffer();await e.setLocalDescription(i);const r=Promise.all([n.request,n.response].map(this.ensureChannelOpened)).then(()=>{});return{rtcClient:e,channels:n,offer:i,rtcConnectionId:t,channelsOpened:r}}async finishClientOffer(t,e,n){return await t.setRemoteDescription(e),await n,!0}async createProviderAnswer(t,e){const n=this.createRtcPeer(),i=pt.createDataChannelPromise("request",n),r=pt.createDataChannelPromise("response",n);n.addEventListener("icecandidate",async e=>{e.candidate&&await this.raiseProviderIce(t,{candidate:e.candidate?.toJSON()})}),await this.listenForClientIce(t,async t=>{await n.addIceCandidate(t.candidate)}),await n.setRemoteDescription(e);const s=await n.createAnswer();await n.setLocalDescription(s);const o=Promise.all([i,r]).then(([e,n])=>(this.cleanupIceListeners(t),{request:e,response:n}));return{rtcClient:n,answer:s,channels:o}}}function ut(t){return[...t.split(".").reverse().entries()].reduce((t,[e,n])=>t+ +n*1e4**e,0)}function wt(t,e){const n=function(t){return t.split("/")[0]}(t);return function(t,e){return ut(t)>=ut(e)}(n,e)}var yt,ft,gt,mt,vt,Ct=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)},It=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n};class xt extends G{get connections(){return[...Ct(this,yt,"f")]}static handleClientDisconnection(t,e){if(e?.endpointId){const{uuid:n,name:i,endpointId:r,isLocalEndpointId:s}=e;Ct(t,mt,"f").call(t,{uuid:n,name:i,endpointId:r,isLocalEndpointId:s})}else{t.connections.filter(t=>t.uuid===e.uuid&&t.name===e.name).forEach(Ct(t,mt,"f"))}t.disconnectListener(e)}static setProviderRemoval(t,e){xt.removalMap.set(t,e)}constructor(t,e,n){super(),yt.set(this,void 0),ft.set(this,void 0),gt.set(this,void 0),mt.set(this,t=>{const e=this.connections.filter(e=>e.endpointId!==t.endpointId);Ct(this,gt,"f").closeEndpoint(t.endpointId),It(this,yt,e,"f")}),this.processAction=async(t,e,n)=>(xt.clientIsMultiRuntime(n)&&!wt(n.runtimeUuid,"18.87.56.0")?this.handleMultiRuntimeLegacyClient(n):this.checkForClientConnection(n),super.processAction(t,e,n)),vt.set(this,()=>{Ct(this,gt,"f").close();const t=xt.removalMap.get(this);t&&t()}),It(this,ft,new R(t,e),"f"),this.connectListener=()=>{},this.disconnectListener=()=>{},It(this,yt,[],"f"),It(this,gt,n,"f"),n.receive(this.processAction)}dispatch(t,e,n){const i=t.endpointId??this.getEndpointIdForOpenFinId(t,e);if(i&&Ct(this,gt,"f").isEndpointConnected(i)){const t=g.getCallSite();return Ct(this,gt,"f").send(i,e,n).catch(i=>{throw new O(i,e,n,t)})}return Promise.reject(new Error(`Client connection with identity uuid: ${t.uuid} / name: ${t.name} / endpointId: ${i} no longer connected.`))}async processConnection(t,e){return Ct(this,yt,"f").push(t),this.connectListener(t,e)}publish(t,e){return this.connections.map(n=>Ct(this,gt,"f").send(n.endpointId,t,e))}onConnection(t){this.connectListener=t}onDisconnection(t){this.disconnectListener=t}async destroy(){const t=Ct(this,ft,"f");t.providerIdentity,It(this,yt,[],"f"),await t.close(),Ct(this,vt,"f").call(this)}async getAllClientInfo(){return this.connections.map(t=>{const{uuid:e,name:n,endpointId:i,entityType:r,connectionUrl:s}=t;return{uuid:e,name:n,endpointId:i,entityType:r,connectionUrl:s}})}checkForClientConnection(t){if(!this.isClientConnected(t))throw new Error(`This action was sent from a client that is not connected to the provider.\n                    Client Identity: {uuid: ${t.uuid}, name: ${t.name}, endpointId: ${t.endpointId}}`)}isClientConnected(t){return xt.clientIdentityIncludesEndpointId(t)?this.connections.some(e=>e.endpointId===t.endpointId&&e.uuid===t.uuid&&e.name===t.name):this.isLegacyClientConnected(t)}isLegacyClientConnected(t){return this.connections.some(e=>e.uuid===t.uuid&&e.name===t.name)}handleMultiRuntimeLegacyClient(t){if(!this.isLegacyClientConnected(t))throw new Error(`This action was sent from a client that is not connected to the provider. Client Identity:\n                    {uuid: ${t.uuid}, name: ${t.name}, endpointId: ${t.endpointId}}`)}getEndpointIdForOpenFinId(t,e){const n=this.connections.filter(e=>e.name===t.name&&e.uuid===t.uuid);if(n.length>=2){const n=Ct(this,ft,"f"),{uuid:i,name:r}=t,s=n?.providerIdentity.uuid,o=n?.providerIdentity.name;console.warn(`WARNING: Dispatch call may have unintended results. The "to" argument of your dispatch call is missing the\n                "endpointId" parameter. The identity you are dispatching to ({uuid: ${i}, name: ${r}})\n                has multiple channelClients for this channel. Your dispatched action: (${e}) from the provider:\n                ({uuid: ${s}, name: ${o}}) will only be processed by the most recently-created client.`)}return n.pop()?.endpointId}static clientIdentityIncludesEndpointId(t){return void 0!==t.endpointId}static clientIsMultiRuntime(t){return void 0!==t.runtimeUuid}static async wireClose(t,e){await t.sendAction("destroy-channel",{channelName:e})}}yt=new WeakMap,ft=new WeakMap,gt=new WeakMap,mt=new WeakMap,vt=new WeakMap,xt.removalMap=new WeakMap;class bt extends h{constructor(t){super(t),this.onmessage=t=>"process-channel-message"===t.action&&(this.processChannelMessage(t),!0),this.endpointMap=new Map,this.latestEndpointIdByChannelId=new Map,t.registerMessageHandler(this.onmessage.bind(this))}async processChannelMessage(t){const{senderIdentity:e,providerIdentity:n,action:i,ackToSender:r,payload:s,intendedTargetIdentity:o}=t.payload,a=o.channelId??o.endpointId??this.latestEndpointIdByChannelId.get(n.channelId),c=this.endpointMap.get(a);if(!c)return r.payload.success=!1,r.payload.reason=`Client connection with identity uuid: ${this.wire.me.uuid} / name: ${this.wire.me.name} / endpointId: ${a} no longer connected.`,r.payload.error=Q(new Error(r.payload.reason)),this.wire.sendRaw(r);try{const t=await c(i,s,e);return r.payload.payload=r.payload.payload||{},r.payload.payload.result=t,this.wire.sendRaw(r)}catch(t){return r.payload.success=!1,r.payload.reason=t.message,r.payload.error=Q(t),this.wire.sendRaw(r)}}addEndpoint(t,e,n){this.endpointMap.set(n,t),e!==n&&this.latestEndpointIdByChannelId.set(e,n)}removeEndpoint(t,e){this.endpointMap.delete(e),this.latestEndpointIdByChannelId.get(t)===e&&this.latestEndpointIdByChannelId.delete(t)}checkForPreviousClientConnection(t){const e=this.latestEndpointIdByChannelId.get(t);e&&(V.closeChannelByEndpointId(e),console.warn("You have created a second connection to an older provider. First connection has been removed from the clientMap"),console.warn("If the provider calls publish(), you may receive multiple messages."))}}class At{constructor(t){this.ProtocolsInPreferenceOrder=t,this.DefaultClientProtocols=["classic"],this.DefaultProviderProtocols=["classic"],this.getClientProtocols=t=>{const e=t?this.ProtocolsInPreferenceOrder.filter(e=>t.includes(e)):this.DefaultClientProtocols;if(!e.length)throw new Error(`No valid protocols were passed in. Accepted values are: ${this.ProtocolsInPreferenceOrder.join(", ")}.`);return e},this.getProviderProtocols=t=>{const e=t?this.ProtocolsInPreferenceOrder.filter(e=>t.includes(e)):this.DefaultProviderProtocols;if(!e.length)throw new Error(`No valid protocols were passed in. Accepted values are: ${this.ProtocolsInPreferenceOrder.join(", ")}.`);return e},this.getCompatibleProtocols=(t,e)=>e.supportedProtocols.filter(e=>t.some(t=>t.type===e.type&&e.version>=t.minimumVersion&&t.version>=(e.minimumVersion??0))).slice(0,e.maxProtocols)}}class Et{static combine(t,e){return new Et(t,e)}constructor(t,e){this.primary=t,this.secondary=e}onEndpointDisconnect(t,e){this.primary.onEndpointDisconnect(t,()=>{this.secondary.isEndpointConnected(t)||e()}),this.secondary.onEndpointDisconnect(t,()=>{this.primary.isEndpointConnected(t)||e()})}isValidEndpointPayload(t){return this.primary.isValidEndpointPayload(t)||this.secondary.isValidEndpointPayload(t)}async closeEndpoint(t){await this.primary.closeEndpoint(t),await this.secondary.closeEndpoint(t)}isEndpointConnected(t){return this.primary.isEndpointConnected(t)||this.secondary.isEndpointConnected(t)}async addEndpoint(t,e){this.primary.isValidEndpointPayload(e)&&await this.primary.addEndpoint(t,e),this.secondary.isValidEndpointPayload(e)&&await this.secondary.addEndpoint(t,e)}receive(t){this.primary.receive(t),this.secondary.receive(t)}send(t,e,n){return this.primary.isEndpointConnected(t)?this.primary.send(t,e,n):this.secondary.send(t,e,n)}async close(){await Promise.all([this.primary.close(),this.secondary.close()])}}var Pt,Mt,St=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},kt=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class Lt extends h{static getProtocolOptionsFromStrings(t){return t.map(t=>{switch(t){case"rtc":return lt;case"classic":return Z;default:return U(t,["rtc","classic"])}})}constructor(t){super(t),Pt.set(this,void 0),Mt.set(this,void 0),this.removeChannelFromProviderMap=t=>{this.providerMap.delete(t)},this.onmessage=t=>"process-channel-connection"===t.action&&(this.processChannelConnection(t),!0),this.providerMap=new Map,this.protocolManager=new At("node"===this.wire.environment.type?["classic"]:["rtc","classic"]),St(this,Pt,new bt(t),"f"),St(this,Mt,new pt(t),"f"),t.registerMessageHandler(this.onmessage.bind(this))}createProvider(t,e){const n=Object.assign(this.wire.environment.getDefaultChannelOptions().create,t||{}),i=this.protocolManager.getProviderProtocols(n?.protocols),r=i.map(t=>{switch(t){case"rtc":return new ht;case"classic":return new K(this.wire,kt(this,Pt,"f"),e.channelId,e);default:return U(t,["rtc","classic"])}});let s;if(2===r.length){const[t,e]=r;s=Et.combine(t,e)}else{if(1!==r.length)throw new Error("failed to combine strategies");[s]=r}const o=new xt(e,()=>xt.wireClose(this.wire,e.channelName),s),a=e.channelId;return this.providerMap.set(a,{provider:o,strategy:s,supportedProtocols:Lt.getProtocolOptionsFromStrings(i)}),xt.setProviderRemoval(o,this.removeChannelFromProviderMap.bind(this)),o}async createClientOffer(t){const e=this.protocolManager.getClientProtocols(t?.protocols);let n;return{offer:{supportedProtocols:await Promise.all(e.map(async t=>{switch(t){case"rtc":{const{rtcClient:t,channels:e,offer:i,rtcConnectionId:r,channelsOpened:s}=await kt(this,Mt,"f").startClientOffer();return n={rtcClient:t,channels:e,channelsOpened:s},{type:"rtc",version:lt.version,payload:{offer:i,rtcConnectionId:r}}}case"classic":return{type:"classic",version:Z.version};default:return U(t,["rtc","classic"])}})),maxProtocols:2},rtc:n}}async createClientStrategy(t,e){e.endpointId||(e.endpointId=this.wire.environment.getNextMessageId(),kt(this,Pt,"f").checkForPreviousClientConnection(e.channelId));const n=e.answer??{supportedProtocols:[{type:"classic",version:1}]},i=(await Promise.all(n.supportedProtocols.map(async n=>"rtc"===n.type&&t?(await kt(this,Mt,"f").finishClientOffer(t.rtcClient,n.payload.answer,t.channelsOpened),new ht):"classic"===n.type?new K(this.wire,kt(this,Pt,"f"),e.endpointId,e):null))).filter(t=>null!==t);let r;if(t&&!i.some(t=>t instanceof ht)&&t&&t.rtcClient.close(),i.length>=2)r=Et.combine(i[0],i[1]);else{if(!i.length)throw new Error("No compatible protocols");[r]=i}const s={endpointIdentity:e,rtc:t};return r.addEndpoint(e.channelId,s),r}async processChannelConnection(t){const{clientIdentity:e,providerIdentity:n,ackToSender:i,payload:r,offer:s}=t.payload;e.endpointId?e.isLocalEndpointId=!1:(e.endpointId=this.wire.environment.getNextMessageId(),e.isLocalEndpointId=!0);const o=n.channelId,a=this.providerMap.get(o);if(!a)return i.payload.success=!1,i.payload.reason=`Channel "${n.channelName}" has been destroyed.`,this.wire.sendRaw(i);const{provider:c,strategy:d,supportedProtocols:h}=a;try{if(!(c instanceof xt))throw Error("Cannot connect to a channel client");const t=s??{supportedProtocols:[{type:"classic",version:1}],maxProtocols:1},n=this.protocolManager.getCompatibleProtocols(h,t);if(!n.length)throw new Error("This provider does not support any of the offered protocols.");const o=await c.processConnection(e,r);i.payload.payload=i.payload.payload||{};let a={supportedProtocols:[],endpointPayloadPromise:Promise.resolve({endpointIdentity:e})};return a=await n.reduce(async(t,e)=>{const n=await t;if("rtc"===e.type){const{answer:t,rtcClient:i,channels:r}=await kt(this,Mt,"f").createProviderAnswer(e.payload.rtcConnectionId,e.payload.offer);n.supportedProtocols.push({type:"rtc",version:lt.version,payload:{answer:t}}),n.endpointPayloadPromise=n.endpointPayloadPromise.then(t=>r.then(e=>({...t,rtc:{rtcClient:i,channels:e}})))}else n.supportedProtocols.push({type:"classic",version:Z.version});return n},Promise.resolve(a)),a.endpointPayloadPromise.then(t=>d.addEndpoint(e.endpointId,t)),i.payload.payload.result=o,i.payload.payload.answer=a,this.wire.sendRaw(i)}catch(t){return i.payload.success=!1,i.payload.reason=t.message,this.wire.sendRaw(i)}}}Pt=new WeakMap,Mt=new WeakMap;var Tt,$t,Ft,Rt=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},Gt=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};function Ot(t){const e=Math.floor(t/10),n=Math.min(3e4,500*2**e);return new Promise(t=>{setTimeout(()=>{t(!1)},n)})}class Wt extends l{constructor(e){super(e,"channel"),Tt.set(this,void 0),$t.set(this,new t.EventEmitter),Ft.set(this,new x(async()=>{await Promise.all([this.on("disconnected",t=>{V.handleProviderDisconnect(t)}),this.on("connected",(...t)=>{Gt(this,$t,"f").emit("connected",...t)})]).catch(()=>new Error("error setting up channel connection listeners"))})),Rt(this,Tt,new Lt(e),"f")}async getAllChannels(){return this.wire.sendAction("get-all-channels").then(({payload:t})=>t.data)}async onChannelConnect(t){await this.on("connected",t)}async onChannelDisconnect(t){await this.on("disconnected",t)}async safeConnect(t,e,n){const i={count:0};do{let r=()=>{};const s=new Promise(e=>{r=n=>{t===n.channelName&&e(!0)},Gt(this,$t,"f").on("connected",r)});try{if(i.count>0){i.gotConnectedEvent=await Promise.race([Ot(i.count),s]);const e=await this.wire.sendAction("connect-to-channel",{...n,retryInfo:i});return console.log(`Successfully connected to channelName: ${t}`),e.payload.data}const e=this.wire.sendAction("connect-to-channel",n);i.originalMessageId=e.messageId;return(await e).payload.data}catch(n){if(!n.message.includes("internal-nack"))throw n;e&&0===i.count&&console.warn(`No channel found for channelName: ${t}. Waiting for connection...`)}finally{i.count+=1,Gt(this,$t,"f").removeListener("connected",r)}}while(e);throw new Error(`No channel found for channelName: ${t}.`)}async connect(t,e={}){if(await Gt(this,Ft,"f").getValue(),!t||"string"!=typeof t)throw new Error("Please provide a channelName string to connect to a channel.");const n={wait:!0,...this.wire.environment.getDefaultChannelOptions().connect,...e},{offer:i,rtc:r}=await Gt(this,Tt,"f").createClientOffer(n);let s;(this.fin.me.isFrame||this.fin.me.isView||this.fin.me.isWindow)&&(s=(await this.fin.me.getInfo()).url);const o={channelName:t,...n,offer:i,connectionUrl:s},a=await this.safeConnect(t,n.wait,o),c=await Gt(this,Tt,"f").createClientStrategy(r,a),d=new V(a,()=>V.wireClose(this.wire,a,a.endpointId),c);return c.onEndpointDisconnect(a.channelId,async()=>{try{await d.sendDisconnectAction()}catch(t){console.warn(`Something went wrong during disconnect for client with uuid: ${a.uuid} / name: ${a.name} / endpointId: ${a.endpointId}.`)}finally{V.handleProviderDisconnect(a)}}),d}async create(t,e){if(!t)throw new Error("Please provide a channelName to create a channel");const{payload:{data:n}}=await this.wire.sendAction("create-channel",{channelName:t}),i=Gt(this,Tt,"f").createProvider(e,n);return this.on("client-disconnected",e=>{e.channelName===t&&xt.handleClientDisconnection(i,e)}),i}}Tt=new WeakMap,$t=new WeakMap,Ft=new WeakMap;class jt extends h{constructor(e){super(e),this.events={subscriberAdded:"subscriber-added",subscriberRemoved:"subscriber-removed"},this.refCounter=new $,this.Channel=new Wt(e),this.emitter=new t.EventEmitter,e.registerMessageHandler(this.onmessage.bind(this)),this.on=this.emitter.on.bind(this.emitter),this.removeAllListeners=this.emitter.removeAllListeners.bind(this.emitter)}async publish(t,e){await this.wire.sendAction("publish-message",{topic:t,message:e,sourceWindowName:this.me.name})}async send(t,e,n){const i=m(t);if(i)throw new Error(i);await this.wire.sendAction("send-message",{destinationUuid:t.uuid,destinationWindowName:t.name,topic:e,message:n,sourceWindowName:this.me.name})}subscribe(t,e,n){const i=this.createSubscriptionKey(t.uuid,t.name||"*",e);return this.emitter.on(i,n),this.refCounter.actOnFirst(i,async()=>{await this.wire.sendAction("subscribe",{sourceUuid:t.uuid,sourceWindowName:t.name||"*",topic:e,destinationWindowName:this.me.name})},()=>Promise.resolve())}unsubscribe(t,e,n){const i=t.name||"*",r=this.createSubscriptionKey(t.uuid,i,e);return this.emitter.removeListener(r,n),this.refCounter.actOnLast(r,async()=>{await this.wire.sendAction("unsubscribe",{sourceUuid:t.uuid,sourceWindowName:i,topic:e,destinationWindowName:this.me.name})},()=>new Promise(t=>t).then(()=>{}))}processMessage(t){const{payload:{message:e,sourceWindowName:n,sourceUuid:i,topic:r}}=t,s=[this.createSubscriptionKey(i,n,r),this.createSubscriptionKey(i,"*",r),this.createSubscriptionKey("*","*",r)],o={uuid:i,name:n};s.forEach(t=>{this.emitter.emit(t,e,o)})}emitSubscriverEvent(t,e){const{payload:{targetName:n,uuid:i,topic:r}}=e,s={name:n,uuid:i,topic:r};this.emitter.emit(t,s)}createSubscriptionKey(t,e,n){const i=e||"*";if(!(t&&i&&n))throw new Error("Missing uuid, name, or topic string");return function(...t){return t.map(t=>btoa(t)).join("/")}(t,i,n)}onmessage(t){const{action:e}=t;switch(e){case"process-message":this.processMessage(t);break;case this.events.subscriberAdded:this.emitSubscriverEvent(this.events.subscriberAdded,t);break;case this.events.subscriberRemoved:this.emitSubscriverEvent(this.events.subscriberRemoved,t)}return!0}}class Ht extends h{async writeText(t){await this.wire.sendAction("clipboard-write-text",t)}async readText(t){const{payload:e}=await this.wire.sendAction("clipboard-read-text",{type:t});return e.data}async writeImage(t){await this.wire.sendAction("clipboard-write-image",t)}async readImage(t={format:"dataURL"}){const{payload:e}=await this.wire.sendAction("clipboard-read-image",t);return e.data}async writeHtml(t){await this.wire.sendAction("clipboard-write-html",t)}async readHtml(t){const{payload:e}=await this.wire.sendAction("clipboard-read-html",{type:t});return e.data}async writeRtf(t){await this.wire.sendAction("clipboard-write-rtf",t)}async readRtf(t){const{payload:e}=await this.wire.sendAction("clipboard-read-rtf",{type:t});return e.data}async write(t){await this.wire.sendAction("clipboard-write",t)}async getAvailableFormats(t){const{payload:e}=await this.wire.sendAction("clipboard-read-formats",{type:t});return e.data}}class Nt extends l{constructor(t,e){super(t,"external-application",e.uuid),this.identity=e}getInfo(){return this.wire.sendAction("get-external-application-info",this.identity).then(({payload:t})=>t.data)}}class Bt extends h{wrap(t){return this.wire.recordAnalytic("external-application-wrap"),Promise.resolve(new Nt(this.wire,{uuid:t}))}wrapSync(t){return this.wire.recordAnalytic("external-application-wrap-sync"),new Nt(this.wire,{uuid:t})}}class Dt extends l{constructor(t,e){super(t,"frame",e.uuid,e.name),this.identity=e}getInfo(){return this.wire.sendAction("get-frame-info",this.identity).then(({payload:t})=>t.data)}getParentWindow(){return this.wire.sendAction("get-parent-window",this.identity).then(({payload:t})=>t.data)}}class Vt extends h{async wrap(t){this.wire.recordAnalytic("frame-wrap");const e=m(t);if(e)throw new Error(e);return new Dt(this.wire,t)}wrapSync(t){this.wire.recordAnalytic("frame-wrap-sync");const e=m(t);if(e)throw new Error(e);return new Dt(this.wire,t)}getCurrent(){return this.wire.recordAnalytic("frame-get-current"),Promise.resolve(new Dt(this.wire,this.wire.environment.getCurrentEntityIdentity()))}getCurrentSync(){return this.wire.recordAnalytic("frame-get-current-sync"),new Dt(this.wire,this.wire.environment.getCurrentEntityIdentity())}}class Ut extends l{constructor(t){super(t,"global-hotkey")}async register(t,e){await this.on(t,e),await this.wire.sendAction("global-hotkey-register",{hotkey:t})}async unregister(t){await this.removeAllListeners(t),await this.wire.sendAction("global-hotkey-unregister",{hotkey:t})}async unregisterAll(){await Promise.all(this.eventNames().filter(t=>!("registered"===t||"unregistered"===t)).map(t=>this.removeAllListeners(t))),await this.wire.sendAction("global-hotkey-unregister-all",{})}async isRegistered(t){const{payload:{data:e}}=await this.wire.sendAction("global-hotkey-is-registered",{hotkey:t});return e}}var _t,qt,zt=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},Jt=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class Yt extends l{constructor(t,e,n=`custom-frame-${e.uuid}`){super(t,"application",e.uuid),_t.set(this,void 0),this.getClient=(t=this.identity)=>{if(t.uuid!==this.identity.uuid)return new Yt(this.wire,t).getClient();if(this.wire.sendAction("platform-get-client",this.identity).catch(t=>{}),!Yt.clientMap.has(Jt(this,_t,"f"))){const t=Jt(this,qt,"f").call(this);Yt.clientMap.set(Jt(this,_t,"f"),t)}return Yt.clientMap.get(Jt(this,_t,"f"))},qt.set(this,async()=>{try{const t=await this._channel.connect(Jt(this,_t,"f"),{wait:!1});return t.onDisconnection(()=>{Yt.clientMap.delete(Jt(this,_t,"f"))}),t}catch(t){throw Yt.clientMap.delete(Jt(this,_t,"f")),new Error("The targeted Platform is not currently running. Listen for application-started event for the given Uuid.")}}),this.launchLegacyManifest=this.launchContentManifest;const i=m(e);if(i)throw new Error(i);zt(this,_t,n,"f"),this._channel=this.fin.InterApplicationBus.Channel,this.identity={uuid:e.uuid},this.Layout=this.fin.Platform.Layout,this.Application=this.fin.Application.wrapSync(this.identity)}async createView(t,e,n){this.wire.sendAction("platform-create-view",this.identity).catch(t=>{});const i=await this.getClient(),r=await i.dispatch("create-view",{target:e,opts:t,targetView:n});if(!r||m(r.identity))throw new Error(`When overwriting the createView call, please return an object that has a valid 'identity' property: ${JSON.stringify(r)}`);return this.fin.View.wrapSync(r.identity)}async createWindow(t){this.wire.sendAction("platform-create-window",this.identity).catch(t=>{});const e=await this.getClient();t.reason||(t.reason="api-call");const n=await e.dispatch("create-view-container",t);if(!n||m(n.identity))throw new Error(`When overwriting the createWindow call, please return an object that has a valid 'identity' property: ${JSON.stringify(n)}`);const{identity:i}=n,r=this.fin.Window.wrapSync(i);return r.name=i.name,r.uuid=i.uuid,r}async quit(){this.wire.sendAction("platform-quit",this.identity).catch(t=>{});return(await this.getClient()).dispatch("quit")}async closeView(t){this.wire.sendAction("platform-close-view",this.identity).catch(t=>{});const e=await this.getClient();await e.dispatch("close-view",{view:t})}async reparentView(t,e){console.warn("Platform.reparentView has been deprecated, please use Platform.createView"),this.wire.sendAction("platform-reparent-view",this.identity).catch(t=>{});const n={...t,uuid:t.uuid??this.identity.uuid},i=await this.fin.View.wrap(n),r=await i.getOptions();return this.createView(r,e)}async getSnapshot(){this.wire.sendAction("platform-get-snapshot",this.identity).catch(t=>{});return(await this.getClient()).dispatch("get-snapshot")}async getViewSnapshot(t){return(await this.getClient()).dispatch("get-view-snapshot",{viewIdentity:t})}async applySnapshot(t,e){this.wire.sendAction("platform-apply-snapshot",this.identity).catch(t=>{});const n="Requested snapshot must be a valid Snapshot object, or a url or filepath to such an object.";let i;if("string"==typeof t)try{i=(await this._channel.wire.sendAction("get-application-manifest",{manifestUrl:t})).payload.data}catch(t){throw new Error(`${n}: ${t}`)}else i=t;if(!i.windows)throw new Error(n);const r=await this.getClient();return await r.dispatch("apply-snapshot",{snapshot:i,options:e}),this}async fetchManifest(t){return(await this.getClient()).dispatch("platform-fetch-manifest",{manifestUrl:t})}async launchContentManifest(t){this.wire.sendAction("platform-launch-content-manifest",this.identity).catch(()=>{});const e=await this.getClient(),n=await this.fetchManifest(t);return e.dispatch("launch-into-platform",{manifest:n,manifestUrl:t}),this}async setWindowContext(t={},e){if(this.wire.sendAction("platform-set-window-context",this.identity).catch(t=>{}),!t)throw new Error("Please provide a serializable object or string to set the context.");const n=await this.getClient(),{entityType:i}=e?await this.fin.System.getEntityInfo(e.uuid,e.name):this.fin.me;await n.dispatch("set-window-context",{context:t,entityType:i,target:e||{uuid:this.fin.me.uuid,name:this.fin.me.name}})}async getWindowContext(t){this.wire.sendAction("platform-get-window-context",this.identity).catch(t=>{});const e=await this.getClient(),{entityType:n}=t?await this.fin.System.getEntityInfo(t.uuid,t.name):this.fin.me;return e.dispatch("get-window-context",{target:t||{uuid:this.fin.me.uuid,name:this.fin.me.name},entityType:n})}async closeWindow(t,e={skipBeforeUnload:!1}){this.wire.sendAction("platform-close-window",this.identity).catch(t=>{});return(await this.getClient()).dispatch("close-window",{windowId:t,options:e})}}_t=new WeakMap,qt=new WeakMap,Yt.clientMap=new Map;class Kt{constructor(t){this.strategy=t,this.consume=async t=>(await this.strategy.getExposedFunctions(t)).reduce((e,n)=>({...e,[n.key]:this.strategy.createFunction(n,t)}),{})}}class Zt{constructor(t){this.channel=t,this.getExposedFunctions=async t=>{const{id:e}=t,{props:n}=await this.channel.dispatch(`api-meta:${e}`);return n},this.createFunction=t=>(...e)=>{const{action:n}=t.options;return this.channel.dispatch(n,{args:e})}}}const Qt=["no longer connected","RTCDataChannel closed unexpectedly","The client you are trying to dispatch from is disconnected from the target provider"],Xt=(t,e,n,i)=>async(r,s)=>{try{return await t.dispatch(`relay:${n}`,{action:r,payload:s,target:e})}catch(t){if(o=t.message,Qt.some(t=>o.includes(t))&&i)throw new Error(i);throw t}// removed by dead control flow
 var o; };var te,ee,ne,ie=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},re=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class se{constructor(t,e){te.set(this,void 0),this.isRoot=()=>re(this,te,"f").isRoot(this.entityId),this.exists=()=>re(this,te,"f").exists(this.entityId),this.getParent=async()=>{const t=await re(this,te,"f").getParent(this.entityId);if(t)return se.getEntity(t,re(this,te,"f"))},this.createAdjacentStack=async(t,e)=>{const n=await re(this,te,"f").createAdjacentStack(this.entityId,t,e);return se.getEntity({entityId:n,type:"stack"},re(this,te,"f"))},this.getAdjacentStacks=async t=>(await re(this,te,"f").getAdjacentStacks({targetId:this.entityId,edge:t})).map(t=>se.getEntity({type:"stack",entityId:t.entityId},re(this,te,"f"))),ie(this,te,t,"f"),this.entityId=e}}te=new WeakMap,se.newLayoutEntitiesClient=async(t,e,n)=>{const i=Xt(t,n,"layout-relay","You are trying to interact with a layout component on a window that does not exist or has been destroyed.");return new Kt(new Zt({dispatch:i})).consume({id:e})},se.getEntity=(t,e)=>{const{entityId:n,type:i}=t;switch(i){case"column":case"row":return new ae(e,n,i);case"stack":return new oe(e,n);default:throw new Error(`Unrecognised Layout Entity encountered ('${JSON.stringify(t)})`)}};class oe extends se{constructor(t,e){super(t,e),ee.set(this,void 0),this.type="stack",this.getViews=()=>re(this,ee,"f").getStackViews(this.entityId),this.addView=async(t,e={index:0})=>re(this,ee,"f").addViewToStack(this.entityId,t,e),this.removeView=async t=>{await re(this,ee,"f").removeViewFromStack(this.entityId,t)},this.setActiveView=async t=>{await re(this,ee,"f").setStackActiveView(this.entityId,t)},ie(this,ee,t,"f")}}ee=new WeakMap;class ae extends se{constructor(t,e,n){super(t,e),ne.set(this,void 0),this.getContent=async()=>(await re(this,ne,"f").getContent(this.entityId)).map(t=>se.getEntity(t,re(this,ne,"f"))),ie(this,ne,t,"f"),this.type=n}}ne=new WeakMap;const ce="layout-entities";var de,he,le,pe=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class ue extends h{static getClient(t){return pe(t,he,"f").getValue()}constructor(t,e){super(e),de.add(this),he.set(this,new I(async()=>se.newLayoutEntitiesClient(await this.platform.getClient(),ce,this.identity))),this.replace=async t=>{this.wire.sendAction("layout-replace").catch(t=>{});const e=await this.platform.getClient();await e.dispatch("replace-layout",{target:this.identity,opts:{layout:t}})},this.replaceView=async(t,e)=>{this.wire.sendAction("layout-replace-view").catch(t=>{});const n=await this.platform.getClient();await n.dispatch("replace-view",{target:this.identity,opts:{viewToReplace:t,newView:e}})},this.applyPreset=async t=>{this.wire.sendAction("layout-apply-preset").catch(t=>{});const e=await this.platform.getClient(),{presetType:n}=t;if(!n||!function(t){switch(t){case"columns":case"grid":case"rows":case"tabs":return!0;default:return!1}}(n))throw new Error("Cannot apply preset layout, please include an applicable presetType property in the PresetLayoutOptions.");await e.dispatch("apply-preset-layout",{target:this.identity,opts:{presetType:n}})};const n=m(t);if(n)throw new Error(n);this.identity=t,this.platform=this.fin.Platform.wrapSync({uuid:t.uuid}),t.uuid===this.fin.me.uuid&&t.name===this.fin.me.name&&(this.init=this.fin.Platform.Layout.init)}async getConfig(){this.wire.sendAction("layout-get-config").catch(t=>{});return(await this.platform.getClient()).dispatch("get-frame-snapshot",{target:this.identity})}async getCurrentViews(){this.wire.sendAction("layout-get-views").catch(t=>{});const t=await this.platform.getClient();return(await t.dispatch("get-layout-views",{target:this.identity})).map(t=>this.fin.View.wrapSync(t))}async getRootItem(){this.wire.sendAction("layout-get-root-item").catch(()=>{});const t=await pe(this,he,"f").getValue(),e=await t.getRoot("layoutName"in this.identity?this.identity:void 0);return se.getEntity(e,t)}async getStackByViewIdentity(t){this.wire.sendAction("layout-get-stack-by-view").catch(()=>{});const e=await pe(this,he,"f").getValue(),n=await e.getStackByView(t);if(!n)throw new Error(`No stack found for view: ${t.uuid}/${t.name}`);return se.getEntity(n,e)}async addView(t,{location:e,targetView:n}={}){this.wire.sendAction("layout-add-view").catch(t=>{});const{identity:i}=await pe(this,de,"m",le).call(this,"layout-add-view",{viewOptions:t,location:e,targetView:n});return{identity:i}}async closeView(t){this.wire.sendAction("layout-close-view").catch(t=>{}),await pe(this,de,"m",le).call(this,"layout-close-view",{viewIdentity:t})}}he=new WeakMap,de=new WeakSet,le=async function(t,e){return(await this.platform.getClient()).dispatch(t,{target:this.identity,opts:e})};var we,ye,fe,ge,me,ve=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)},Ce=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n};class Ie extends h{constructor(){super(...arguments),we.add(this),ye.set(this,!1),fe.set(this,null),this.init=async(t={})=>{if(this.wire.recordAnalytic("layout-init"),!this.wire.environment.layoutAllowedInContext(this.fin))throw new Error("Layout.init can only be called from a Window context.");if(ve(this,ye,"f"))throw new Error("Layout.init was already called, please use Layout.create to add additional layouts.");"openfin"===this.wire.environment.type&&await this.fin.Platform.getCurrentSync().getClient(),Ce(this,ye,!0,"f"),Ce(this,fe,await this.wire.environment.initLayoutManager(this.fin,this.wire,t),"f"),await this.wire.environment.applyLayoutSnapshot(this.fin,ve(this,fe,"f"),t);const e={name:this.fin.me.name,uuid:this.fin.me.uuid};if(!t.layoutManagerOverride){const t={layoutName:"__default__",...e};return ve(this,ge,"f").call(this,t)}return this.wrapSync(e)},ge.set(this,t=>{const e="[Layout] You are using a deprecated property `layoutManager` - it will throw if you access it starting in v37.",n=new Proxy({},{get(t,n){throw console.warn(`[Layout-mgr-proxy] accessing ${n.toString()}`),new Error(e)}}),i=Object.assign(this.wrapSync(t),{layoutManager:n});return new Proxy(i,{get(t,n){if("layoutManager"===n)throw console.warn(`[Layout-proxy] accessing ${n.toString()}`),new Error(e);return t[n]}})}),this.getCurrentLayoutManagerSync=()=>ve(this,we,"m",me).call(this,"fin.Platform.Layout.getCurrentLayoutManagerSync()"),this.create=async t=>this.wire.environment.createLayout(ve(this,we,"m",me).call(this,"fin.Platform.Layout.create()"),t),this.destroy=async t=>this.wire.environment.destroyLayout(ve(this,we,"m",me).call(this,"fin.Platform.Layout.destroy()"),t)}async wrap(t){return this.wire.recordAnalytic("layout-wrap"),new ue(t,this.wire)}wrapSync(t){return this.wire.recordAnalytic("layout-wrap-sync"),new ue(t,this.wire)}async getCurrent(){if(this.wire.recordAnalytic("layout-get-current"),"openfin"===this.wire.environment.type&&!this.fin.me.isWindow)throw new Error("You are not in a Window context.  Only Windows can have a Layout.");const{uuid:t,name:e}=this.fin.me;return this.wrap({uuid:t,name:e})}getCurrentSync(){if(this.wire.recordAnalytic("layout-get-current-sync"),"openfin"===this.wire.environment.type&&!this.fin.me.isWindow)throw new Error("You are not in a Window context.  Only Windows can have a Layout.");const{uuid:t,name:e}=this.fin.me;return this.wrapSync({uuid:t,name:e})}async getLayoutByViewIdentity(t){this.wire.recordAnalytic("layout-get-by-view-identity");let e=await this.wire.environment.getViewWindowIdentity(this.fin,t);e.identity&&(e=e.identity);try{const n=this.wrapSync(e),i=await ue.getClient(n),r=await i.getLayoutIdentityForViewOrThrow(t);return this.wrapSync(r)}catch(n){if(!["No action registered at target for","getLayoutIdentityForViewOrThrow is not a function"].some(t=>n.message.includes(t)))throw n;if(e.uuid===e.name)throw new Error(`View identity ${JSON.stringify(t)} is not attached to any layout in provider window ${JSON.stringify(e)}.`);return this.wrapSync(e)}}}ye=new WeakMap,fe=new WeakMap,ge=new WeakMap,we=new WeakSet,me=function(t){if(!ve(this,fe,"f"))throw new Error(`You must call init before using the API ${t}`);return ve(this,fe,"f")};class xe extends h{constructor(t,e){super(t),this._channel=e,this.Layout=new Ie(this.wire)}async init(t){if(!fin.__internal_.isPlatform||fin.me.name!==fin.me.uuid)throw new Error("fin.Platform.init should only be called from a custom platform provider running in the main window of the application.");return this.wire.environment.initPlatform(this.fin,t)}async wrap(t){return this.wire.recordAnalytic("platform-wrap"),new Yt(this.wire,{uuid:t.uuid})}wrapSync(t){return this.wire.recordAnalytic("platform-wrap-sync"),new Yt(this.wire,{uuid:t.uuid})}async getCurrent(){return this.wire.recordAnalytic("platform-get-current"),this.wrap({uuid:this.wire.me.uuid})}getCurrentSync(){return this.wire.recordAnalytic("platform-get-current-sync"),this.wrapSync({uuid:this.wire.me.uuid})}start(t){return this.wire.recordAnalytic("platform-start"),new Promise(async(e,n)=>{try{const{uuid:n}=t,i=await this.fin.Application._create({...t,isPlatformController:!0});i.once("platform-api-ready",()=>e(this.wrapSync({uuid:n}))),i._run({uuid:n})}catch(t){n(t)}})}startFromManifest(t,e){return this.wire.recordAnalytic("platform-start-from-manifest"),new Promise(async(n,i)=>{try{const i=await this.fin.Application._createFromManifest(t);i.once("platform-api-ready",()=>n(this.wrapSync({uuid:i.identity.uuid}))),i._run(e)}catch(t){i(t)}})}}const be="You are not running in OpenFin.";function Ae(t,e,n){return{...{isView:"view"===t,isWindow:"window"===t,isFrame:"iframe"===t,isExternal:"external connection"===t},uuid:e,name:n,entityType:t}}const Ee=()=>`${Math.random()}${Date.now()}`,Pe=(t,e)=>(...n)=>{try{return t(...n)}catch(t){throw new Error((e||"")+t)}},Me=(t,e)=>async n=>{try{await t(n)}catch(t){throw console.error(`Error thrown by handler ${e} for context type ${n.type}: ${t}`),t}},Se=(t,e)=>`You have tried to to use ${t} but ${e} has not been overridden in the Interop Broker. Please override this function. Refer to our documentation for more info.`,ke=(t,e,n,i)=>{const{uuid:r,name:s}=n;return i?`Entity with identity: ${r}/${s} has called ${i} or ${t} but ${e} has not been overridden.`:`Entity with identity: ${r}/${s} has called ${t} but ${e} has not been overridden.`},Le={fireIntent:Se("fireIntent","handleFiredIntent"),fireIntentForContext:Se("fireIntentForContext","handleFiredIntentForContext"),getInfoForIntent:Se("getInfoForIntent","handleInfoForIntent"),getInfoForIntentsByContext:Se("getInfoForIntentsByContext","handleInfoForIntentsByContext"),joinSessionContextGroupWithJoinContextGroup:"The Context Group you have tried to join is a Session Context Group. Custom Context Groups can only be defined by the Interop Broker through code or manifest configuration. Please use joinSessionContextGroup.",fdc3Open:Se("fdc3.open","fdc3HandleOpen"),fdc3FindInstances:Se("fdc3.findInstances","fdc3HandleFindInstances"),fdc3GetAppMetadata:Se("fdc3.getAppMetadata","fdc3HandleGetAppMetadata"),fdc3GetInfo:Se("fdc3.getInfo","fdc3HandleGetInfo")},Te=t=>t?"object"!=typeof t?{isValid:!1,reason:"Context must be an Object"}:t.type?{isValid:!0}:{isValid:!1,reason:"Context must have a type property"}:{isValid:!1,reason:"No context supplied"};class $e{constructor(t,e){this.provider=t,this.id=e,this.lastContext=void 0,this.contextGroupMap=new Map,this.clients=new Map,this.registerListeners()}registerListeners(){this.provider.register(`sessionContextGroup:getContext-${this.id}`,this.getCurrentContext.bind(this)),this.provider.register(`sessionContextGroup:setContext-${this.id}`,this.setContext.bind(this)),this.provider.register(`sessionContextGroup:handlerAdded-${this.id}`,this.handlerAdded.bind(this)),this.provider.register(`sessionContextGroup:handlerRemoved-${this.id}`,this.handlerRemoved.bind(this))}getCurrentContext(t){return t.type?this.contextGroupMap.get(t.type):this.lastContext}setContext(t,e){const{context:n}=t,i=Te(n);if(!1===i.isValid)throw new Error(`Failed to set Context - bad Context. Reason: ${i.reason}. Context: ${JSON.stringify(n)}`);if(!this.getClientState(e))throw new Error(`Client with Identity: ${e.uuid} ${e.name} not in Session Client State Map`);this.contextGroupMap.set(n.type,n),this.lastContext=n;Array.from(this.clients.values()).forEach(t=>{t.contextHandlers.get(n.type)?.forEach(e=>{this.provider.dispatch(t.clientIdentity,e,n)}),t.globalHandler&&this.provider.dispatch(t.clientIdentity,t.globalHandler,n)})}getClientState(t){return this.clients.get(t.endpointId)}async handlerAdded(t,e){const{handlerId:n,contextType:i}=t,r=this.getClientState(e);if(!r)throw new Error(`Client with Identity: ${e.uuid} ${e.name} not in Client State Map`);if(i){const t=r.contextHandlers.get(i)||[];r.contextHandlers.set(i,[...t,n]);const s=this.contextGroupMap.get(i);s&&await this.provider.dispatch(e,n,s)}else{r.globalHandler=n;const t=[...this.contextGroupMap.keys()].map(async t=>{const i=this.contextGroupMap.get(t);i&&await this.provider.dispatch(e,n,i)});await Promise.all(t)}}handlerRemoved(t,e){const{handlerId:n}=t,i=this.clients.get(e.endpointId);i?(Array.from(i.contextHandlers).forEach(([,t])=>{const e=t.indexOf(n);e>-1&&t.splice(e,1)}),i.globalHandler===n&&(i.globalHandler=void 0)):console.warn(`Trying to remove a handler from a client that isn't mapped. handlerId: ${n}. clientIdentity: ${e}`)}registerNewClient(t){if(!this.clients.has(t.endpointId)){const e={contextHandlers:new Map,clientIdentity:t,globalHandler:void 0};this.clients.set(t.endpointId,e)}}onDisconnection(t){this.clients.delete(t.endpointId)}}class Fe{constructor(t,e,n){this.provider=t,this.id=e,this.clients=new Map,this.registerListeners(),this.contextByContextType=new Map,this.lastContext=void 0,this.provider.onConnection(t=>this.registerNewClient(t)),this.removePrivateChannelProvider=n,this.provider.onDisconnection(async t=>{const{endpointId:e}=t;this.clients.has(e)&&await this.handleClientDisconnecting(t),0===(await this.provider.getAllClientInfo()).length&&(this.provider.destroy(),this.removePrivateChannelProvider(this.id))})}getClientState(t){return this.clients.get(t.endpointId)}registerListeners(){this.provider.register("broadcast",this.broadcast.bind(this)),this.provider.register("getCurrentContext",this.getCurrentContext.bind(this)),this.provider.register("contextHandlerAdded",this.contextHandlerAdded.bind(this)),this.provider.register("contextHandlerRemoved",this.contextHandlerRemoved.bind(this)),this.provider.register("nonStandardHandlerRemoved",this.nonStandardHandlerRemoved.bind(this)),this.provider.register("onAddContextHandlerAdded",this.onAddContextHandlerAdded.bind(this)),this.provider.register("onDisconnectHandlerAdded",this.onDisconnectHandlerAdded.bind(this)),this.provider.register("onUnsubscribeHandlerAdded",this.onUnsubscribeHandlerAdded.bind(this)),this.provider.register("clientDisconnecting",(t,e)=>{this.handleClientDisconnecting(e)})}broadcast(t,e){const{context:n}=t;if(!this.getClientState(e))throw new Error(`Client with Identity: ${e.uuid} ${e.name}, tried to call broadcast, is not connected to this Private Channel`);const i=Te(n);if(!1===i.isValid)throw new Error(`Failed to broadcast - bad Context. Reason: ${i.reason}. Context: ${JSON.stringify(n)}`);this.contextByContextType.set(n.type,n),this.lastContext=n,Array.from(this.clients.values()).forEach(t=>{const e=t.handlerIdsByContextTypes.get(n.type);e&&e.forEach(e=>{this.provider.dispatch(t.clientIdentity,e,n)}),t.globalHandler&&this.provider.dispatch(t.clientIdentity,t.globalHandler,n)})}getCurrentContext(t,e){const{contextType:n}=t;if(!this.getClientState(e))throw new Error(`Client with Identity: ${e.uuid} ${e.name}, tried to call getCurrentContext, is not connected to this Private Channel`);if(void 0!==n){const t=this.contextByContextType.get(n);return t||null}return this.lastContext?this.lastContext:null}contextHandlerAdded(t,e){const{handlerId:n,contextType:i}=t,r=this.getClientState(e);if(!r)throw new Error(`Client with Identity: ${e.uuid} ${e.name}, tried to call addContextListener, is not connected to this Private Channel`);if(i){const t=r.handlerIdsByContextTypes.get(i)||[];r.handlerIdsByContextTypes.set(i,[...t,n])}else r.globalHandler=n;Array.from(this.clients.values()).forEach(t=>{t.clientIdentity.endpointId!==e.endpointId&&t.onAddContextListenerHandlerId&&this.provider.dispatch(t.clientIdentity,t.onAddContextListenerHandlerId,i)})}async contextHandlerRemoved(t,e){const{handlerId:n}=t,i=this.getClientState(e);if(i){let t;if(i.globalHandler===n)i.globalHandler=void 0;else for(const[e,r]of i.handlerIdsByContextTypes){const i=r.indexOf(n);i>-1&&(r.splice(i,1),t=e)}const r=(await this.getConnectedClients()).map(async n=>{const{clientIdentity:i,clientIdentity:{endpointId:r},onUnsubscribeHandlerId:s}=n;r!==e.endpointId&&s&&await this.provider.dispatch(i,s,t)});try{await Promise.all(r)}catch(t){throw console.error(`Problem when attempting to dispatch to onUnsubscribeHandlers. Error: ${t} Removing Client: ${n}. uuid: ${e.uuid}. name: ${e.name}. endpointId: ${e.endpointId}`),new Error(t)}}else console.warn(`Trying to remove a handler from a client that isn't mapped. handlerId: ${n}. uuid: ${e.uuid}. name: ${e.name}. endpointId: ${e.endpointId}.`)}nonStandardHandlerRemoved(t,e){const{handlerId:n}=t,i=this.getClientState(e);i?i.onDisconnectHandlerId===n?i.onDisconnectHandlerId=void 0:i.onAddContextListenerHandlerId===n?i.onAddContextListenerHandlerId=void 0:i.onUnsubscribeHandlerId===n&&(i.onUnsubscribeHandlerId=void 0):console.warn(`Trying to remove a handler from a client that isn't mapped. handlerId: ${n}. clientIdentity: ${e}`)}onAddContextHandlerAdded(t,e){const n=this.getClientState(e),{handlerId:i}=t;if(!n)throw new Error(`Client with Identity: ${e.uuid} ${e.name}, tried to call onAddContextListener, is not connected to this Private Channel`);n.onAddContextListenerHandlerId=i,Array.from(this.clients.values()).forEach(t=>{t.clientIdentity.endpointId!==e.endpointId&&Array.from(t.handlerIdsByContextTypes.keys()).forEach(t=>{this.provider.dispatch(e,i,t)})})}onDisconnectHandlerAdded(t,e){const n=this.getClientState(e),{handlerId:i}=t;if(!n)throw new Error(`Client with Identity: ${e.uuid} ${e.name}, tried to call onDisconnect, is not connected to this Private Channel`);n.onDisconnectHandlerId=i}onUnsubscribeHandlerAdded(t,e){const n=this.getClientState(e),{handlerId:i}=t;if(!n)throw new Error(`Client with Identity: ${e.uuid} ${e.name}, tried to call onUnsubscribe, is not connected to this Private Channel`);n.onUnsubscribeHandlerId=i}removeClient(t){const e=this.getClientState(t);if(!e)throw new Error(`Client with Identity: ${t.uuid} ${t.name}, tried to call disconnect, is not connected to this Private Channel`);e.handlerIdsByContextTypes.clear(),this.clients.delete(t.endpointId)}async fireOnDisconnectForOtherClients(t){const{endpointId:e}=t,n=(await this.getConnectedClients()).map(async t=>{const{clientIdentity:{endpointId:n},onDisconnectHandlerId:i}=t;n!==e&&i&&await this.provider.dispatch(t.clientIdentity,i)});try{await Promise.all(n)}catch(e){throw console.error(`Problem when attempting to dispatch to onDisconnectHandlers. Error: ${e} Disconnecting Client: uuid: ${t.uuid}. name: ${t.name}. endpointId: ${t.endpointId}`),new Error(e)}}async unsubscribeAll(t){const{endpointId:e}=t,n=this.clients.get(e);if(n){const e=Array.from(n.handlerIdsByContextTypes.values()).flat(),i=n.globalHandler;if(e.length>0){const n=e.map(async e=>this.contextHandlerRemoved({handlerId:e},t));try{await Promise.all(n)}catch(t){console.error(t.message)}}if(i)try{await this.contextHandlerRemoved({handlerId:i},t)}catch(t){console.error(t.message)}}}async handleClientDisconnecting(t){await this.unsubscribeAll(t),this.removeClient(t),await this.fireOnDisconnectForOtherClients(t)}registerNewClient(t){if(!this.clients.has(t.endpointId)){const e={clientIdentity:t,handlerIdsByContextTypes:new Map,globalHandler:void 0,onAddContextListenerHandlerId:void 0,onUnsubscribeHandlerId:void 0,onDisconnectHandlerId:void 0};this.clients.set(t.endpointId,e)}}async getConnectedClients(){const t=await this.provider.getAllClientInfo();return Array.from(this.clients.values()).filter(e=>{const{uuid:n,name:i}=e.clientIdentity;return t.some(t=>i===t.name&&n===t.uuid)})}static init(t,e,n){return new Fe(t,e,n)}}var Re,Ge,Oe,We=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},je=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};const He=[{id:"green",displayMetadata:{color:"#00CC88",name:"green"}},{id:"purple",displayMetadata:{color:"#8C61FF",name:"purple"}},{id:"orange",displayMetadata:{color:"#FF8C4C",name:"orange"}},{id:"red",displayMetadata:{color:"#FF5E60",name:"red"}},{id:"pink",displayMetadata:{color:"#FF8FB8",name:"pink"}},{id:"yellow",displayMetadata:{color:"#E9FF8F",name:"yellow"}}];class Ne extends h{constructor(t,e,n){super(t),Re.set(this,void 0),Ge.set(this,void 0),Oe.set(this,void 0),this.getProvider=()=>je(this,Oe,"f").getValue(),this.interopClients=new Map,this.contextGroupsById=new Map,We(this,Ge,n.contextGroups??[...He],"f"),We(this,Re,n.fdc3Info,"f"),n?.logging&&(this.logging=n.logging),this.intentClientMap=new Map,this.lastContextMap=new Map,this.sessionContextGroupMap=new Map,this.privateChannelProviderMap=new Map,We(this,Oe,new I(e),"f"),this.setContextGroupMap(),this.setupChannelProvider()}static createClosedConstructor(...t){return class extends Ne{constructor(...n){if(n.length){const[i,r,s]=n;if(s&&"object"==typeof s&&!e.isEqual(s,t[2]))return console.warn("You have modified the parameters of the InteropOverride constructor. This behavior is deprecated and will be removed in a future version. You can modify these options in your manifest. Please consult our Interop docs for guidance on migrating to the new override scheme."),void super(t[0],t[1],s);console.warn("You are attempting to pass arguments to the InteropOverride constructor. This is not necessary, and these passed arguments will be ignored. You are likely using an older InteropBroker override scheme. Please consult our Interop docs for guidance on migrating to the new override scheme.")}super(...t)}}}setContext({context:t},e){this.wire.sendAction("interop-broker-set-context").catch(t=>{});const n=this.getClientState(e);if(!n||!n.contextGroupId)throw n?new Error("You must join a context group before you can set context."):new Error(`Client with Identity: ${e.uuid} ${e.name} not in Client State Map`);{const{contextGroupId:e}=n;this.setContextForGroup({context:t},e)}}setContextForGroup({context:t},e){this.wire.sendAction("interop-broker-set-context-for-group").catch(t=>{});const n=this.contextGroupsById.get(e);if(!n)throw new Error(`Unable to set context for context group that isn't in the context group mapping: ${e}.`);const i=Ne.checkContextIntegrity(t);if(!1===i.isValid)throw new Error(`Failed to set Context - bad Context. Reason: ${i.reason}. Context: ${JSON.stringify(t)}`);const r=t.type;n.set(r,t),this.lastContextMap.set(e,r);Array.from(this.interopClients.values()).filter(t=>t.contextGroupId===e).forEach(e=>{for(const[,n]of e.contextHandlers)Ne.isContextTypeCompatible(r,n.contextType)&&this.invokeContextHandler(e.clientIdentity,n.handlerId,t)})}getCurrentContext(t,e){this.wire.sendAction("interop-broker-get-current-context").catch(t=>{});const n=this.getClientState(e);if(!n?.contextGroupId)throw new Error("You must be a member of a context group to call getCurrentContext");const{contextGroupId:i}=n,r=this.contextGroupsById.get(i),s=this.lastContextMap.get(i),o=t?.contextType??s;return r&&o?r.get(o):void 0}async joinContextGroup({contextGroupId:t,target:e},n){if(this.wire.sendAction("interop-broker-join-context-group").catch(t=>{}),this.sessionContextGroupMap.has(t))throw new Error(Le.joinSessionContextGroupWithJoinContextGroup);if(e){Ne.hasEndpointId(e)&&await this.addClientToContextGroup({contextGroupId:t},e);try{const n=this.channel.connections.filter(t=>t.uuid===e.uuid&&t.name===e.name);if(!n.length)throw new Error(`Given Identity ${e.uuid} ${e.name} is not connected to the Interop Broker.`);n.length>1&&console.warn(`More than one connection found for identity ${e.uuid} ${e.name}`);const i=[];for(const e of n)i.push(this.addClientToContextGroup({contextGroupId:t},e));await Promise.all(i)}catch(t){throw new Error(t)}}else await this.addClientToContextGroup({contextGroupId:t},n)}async addClientToContextGroup({contextGroupId:t},e){this.wire.sendAction("interop-broker-add-client-to-context-group").catch(t=>{});const n=this.getClientState(e);if(!n)throw new Error(`Client with Identity: ${e.uuid} ${e.name} not in Client State Map`);if(!this.getContextGroups().find(e=>e.id===t))throw new Error(`Attempting to join a context group that does not exist: ${t}. You may only join existing context groups.`);const i=n.contextGroupId;if(i!==t){n.contextGroupId=t,await this.setCurrentContextGroupInClientOptions(e,t);const r=this.contextGroupsById.get(t);for(const[,t]of n.contextHandlers){const{contextType:n,handlerId:i}=t;if(void 0===n)r.forEach((t,n)=>{this.invokeContextHandler(e,i,t)});else if(r.has(n)){const t=r.get(n);t&&this.invokeContextHandler(e,i,t)}}Promise.allSettled(this.channel.publish("client-changed-context-group",{identity:e,contextGroupId:t,previousContextGroupId:i||null}))}}async removeFromContextGroup({target:t},e){if(this.wire.sendAction("interop-broker-remove-from-context-group").catch(t=>{}),t){Ne.hasEndpointId(t)&&await this.removeClientFromContextGroup(t);try{const e=this.channel.connections.filter(e=>e.uuid===t.uuid&&e.name===t.name);if(!e.length)throw new Error(`No connection found for given Identity ${t.uuid} ${t.name}`);e.length>1&&console.warn(`More than one connection found for identity ${t.uuid} ${t.name}`);const n=[];for(const t of e)n.push(this.removeClientFromContextGroup(t));await Promise.all(n)}catch(t){throw new Error(t)}}else await this.removeClientFromContextGroup(e)}async removeClientFromContextGroup(t){this.wire.sendAction("interop-broker-remove-client-from-context-group").catch(t=>{});const e=this.getClientState(t),n=e?.contextGroupId;e&&(e.contextGroupId=void 0),await this.setCurrentContextGroupInClientOptions(t,null),Promise.allSettled(this.channel.publish("client-changed-context-group",{identity:t,contextGroupId:null,previousContextGroupId:n||null}))}getContextGroups(){return this.wire.sendAction("interop-broker-get-context-groups").catch(t=>{}),je(this,Ge,"f").map(t=>({...t}))}getInfoForContextGroup({contextGroupId:t}){return this.wire.sendAction("interop-broker-get-info-for-context-group").catch(t=>{}),this.getContextGroups().find(e=>e.id===t)}getAllClientsInContextGroup({contextGroupId:t}){this.wire.sendAction("interop-broker-get-all-clients-in-context-group").catch(t=>{});return Array.from(this.interopClients.values()).filter(e=>e.contextGroupId===t).map(t=>t.clientIdentity)}async handleFiredIntent(t,e){const n=ke("fdc3.raiseIntent","InteropBroker.handleFiredIntent",e,"interopClient.fireIntent");throw console.warn(n),new Error(Le.fireIntent)}async setIntentTarget(t,e){this.wire.sendAction("interop-broker-set-intent-target").catch(t=>{});const n=this.intentClientMap.get(e.name),i=`intent-handler-${t.name}`;if(n){const e=n.get(i);if(e){if(e.pendingIntents.push(t),e.clientIdentity&&e.isReady){const{clientIdentity:t,pendingIntents:n}=e;try{const r=n[n.length-1];await this.invokeIntentHandler(t,i,r),e.pendingIntents=[]}catch(n){console.error(`Error invoking intent handler for client ${t.uuid}/${t.name}/${t.endpointId}`),e.isReady=!1}}}else n.set(i,{isReady:!1,pendingIntents:[t]})}else{this.intentClientMap.set(e.name,new Map);const n=this.intentClientMap.get(e.name);n&&n.set(i,{isReady:!1,pendingIntents:[t]})}}async handleInfoForIntent(t,e){const n=ke("fdc3.findIntent","InteropBroker.handleInfoForIntent",e,"interopClient.getInfoForIntent");throw console.warn(n),new Error(Le.getInfoForIntent)}async handleInfoForIntentsByContext(t,e){const n=ke("fdc3.findIntentsByContext","InteropBroker.handleInfoForIntentsByContext",e,"interopClient.getInfoForIntentsByContext");throw console.warn(n),new Error(Le.getInfoForIntentsByContext)}async handleFiredIntentForContext(t,e){const n=ke("fdc3.raiseIntentForContext","InteropBroker.handleFiredIntentForContext",e,"interopClient.fireIntentForContext");throw console.warn(n),new Error(Le.fireIntentForContext)}async clientDisconnected(t){}async fdc3HandleOpen({app:t,context:e},n){const i=ke("fdc3.open","InteropBroker.fdc3HandleOpen",n);throw console.warn(i),new Error(Le.fdc3Open)}async fdc3HandleFindInstances(t,e){const n=ke("fdc3.open","InteropBroker.fdc3HandleFindInstances",e);throw console.warn(n),new Error(Le.fdc3FindInstances)}async fdc3HandleGetAppMetadata(t,e){const n=ke("fdc3.getAppMetadata","InteropBroker.fdc3HandleGetAppMetadata",e);throw console.warn(n),new Error(Le.fdc3GetAppMetadata)}async invokeContextHandler(t,e,n){const i=await this.getProvider();try{await i.dispatch(t,e,n)}catch(i){console.error(`Error invoking context handler ${e} for context type ${n.type} in client ${t.uuid}/${t.name}/${t.endpointId}`,i)}}async invokeIntentHandler(t,e,n){const i=await this.getProvider();await i.dispatch(t,e,n)}async fdc3HandleGetInfo(t,e){const{fdc3Version:n}=t;return{fdc3Version:n,...je(this,Re,"f"),optionalFeatures:{OriginatingAppMetadata:!1,UserChannelMembershipAPIs:!0},appMetadata:{appId:"",instanceId:""}}}async getAllClientInfo(){return(await this.getProvider()).getAllClientInfo()}decorateSnapshot(t){return{...t,interopSnapshotDetails:{contextGroupStates:this.getContextGroupStates()}}}applySnapshot(t,e){const n=t?.interopSnapshotDetails?.contextGroupStates;n&&(e?.closeExistingWindows||this.updateExistingClients(n),this.rehydrateContextGroupStates(n))}updateExistingClients(t){this.interopClients.forEach(e=>{const{clientIdentity:n,contextGroupId:i,contextHandlers:r}=e;if(i){const e=t[i];for(const[,t]of Object.entries(e))r.forEach(e=>{const{handlerId:i,contextType:r}=e;Ne.isContextTypeCompatible(t.type,r)&&this.invokeContextHandler(n,i,t)})}})}getContextGroupStates(){return Ne.toObject(this.contextGroupsById)}rehydrateContextGroupStates(t){const e=Object.entries(t);for(const[t,n]of e){const e=Object.entries(n);for(const[n,i]of e)if(this.contextGroupsById.has(t)){this.contextGroupsById.get(t).set(n,i)}else console.warn(`Attempting to set a context group that isn't in the context group mapping. Skipping context group rehydration for: ${t}`)}}contextHandlerRegistered({contextType:t,handlerId:e},n){const i={contextType:t,handlerId:e},r=this.getClientState(n);if(r?.contextHandlers.set(e,i),r&&r.contextGroupId){const{contextGroupId:i}=r,s=this.contextGroupsById.get(i);if(void 0===t)s.forEach((t,i)=>{this.invokeContextHandler(n,e,t)});else if(s.has(t)){const i=s.get(t);i&&this.invokeContextHandler(n,e,i)}}}async intentHandlerRegistered(t,e){const{handlerId:n}=t,i=this.intentClientMap.get(e.name),r=i?.get(n);if(i)if(r){const{pendingIntents:t}=r;r.clientIdentity=e,r.isReady=!0;try{if(t.length>0){const i=t[t.length-1];await this.invokeIntentHandler(e,n,i),r.pendingIntents=[]}}catch(t){console.error(`Error invoking intent handler: ${n} for client ${e.uuid}/${e.name}/${e.endpointId}`)}}else i.set(n,{isReady:!0,pendingIntents:[],clientIdentity:e});else{this.intentClientMap.set(e.name,new Map);const t=this.intentClientMap.get(e.name);t&&t.set(n,{isReady:!0,pendingIntents:[],clientIdentity:e})}}removeContextHandler({handlerId:t},e){const n=this.getClientState(e);n&&n.contextHandlers.delete(t)}handleJoinSessionContextGroup({sessionContextGroupId:t},e){try{if(!t)throw new Error("Failed to join session context group: must specify group id.");const n=this.sessionContextGroupMap.get(t);if(n)n.registerNewClient(e);else{const n=new $e(this.channel,t);n.registerNewClient(e),this.sessionContextGroupMap.set(t,n)}return{hasConflict:this.contextGroupsById.has(t)}}catch(t){throw new Error(t)}}getClientState(t){return this.interopClients.get(t.endpointId)}static toObject(t){const e=Object.fromEntries(t),n={};return Object.entries(e).forEach(([t,e])=>{const i=Object.fromEntries(e);n[t]=i}),n}static hasEndpointId(t){return void 0!==t.endpointId}static isContextTypeCompatible(t,e){return void 0===e||t===e}setContextGroupMap(){for(const t of this.getContextGroups())this.contextGroupsById.set(t.id,new Map)}async setCurrentContextGroupInClientOptions(t,e){try{const n=await this.fin.System.getEntityInfo(t.uuid,t.name);let i;"view"===n.entityType?i=await this.fin.View.wrap(t):"window"===n.entityType&&(i=await this.fin.Window.wrap(t)),i&&await i.updateOptions({interop:{currentContextGroup:e}})}catch(t){}}async setupChannelProvider(){try{const t=await this.getProvider();this.channel=t,this.wireChannel(t)}catch(t){throw new Error(`Error setting up Interop Broker Channel Provider: ${t}`)}}wireChannel(t){t.onConnection(async(t,e)=>{if(!await this.isConnectionAuthorized(t,e))throw new Error(`Connection not authorized for ${t.uuid}, ${t.name}`);if(!t.endpointId)throw new Error("Version too old to be compatible with Interop. Please upgrade your runtime to a more recent version.");const n={contextGroupId:void 0,contextHandlers:new Map,clientIdentity:t};e?.currentContextGroup&&this.contextGroupsById.has(e.currentContextGroup)&&(n.contextGroupId=e?.currentContextGroup),this.interopClients.set(t.endpointId,n)}),t.onDisconnection(t=>{this.interopClients.delete(t.endpointId);const e=this.intentClientMap.get(t.name);e&&t.uuid===this.fin.me.uuid&&e.forEach(t=>{t.isReady=!1}),this.sessionContextGroupMap.forEach(e=>{e.onDisconnection(t)}),this.clientDisconnected(t)}),t.beforeAction(async(t,e,n)=>{if(!await this.isActionAuthorized(t,e,n))throw new Error(`Action (${t}) not authorized for ${n.uuid}, ${n.name}`);this.logging?.beforeAction?.enabled&&console.log(t,e,n)}),t.afterAction((t,e,n)=>{if(this.logging?.afterAction?.enabled){const i=e?[t,e,n]:[t,n];console.log(...i)}}),t.register("setContext",this.setContext.bind(this)),t.register("fireIntent",this.handleFiredIntent.bind(this)),t.register("getCurrentContext",this.getCurrentContext.bind(this)),t.register("getInfoForIntent",this.handleInfoForIntent.bind(this)),t.register("getInfoForIntentsByContext",this.handleInfoForIntentsByContext.bind(this)),t.register("fireIntentForContext",this.handleFiredIntentForContext.bind(this)),t.register("getContextGroups",this.getContextGroups.bind(this)),t.register("joinContextGroup",this.joinContextGroup.bind(this)),t.register("removeFromContextGroup",this.removeFromContextGroup.bind(this)),t.register("getAllClientsInContextGroup",this.getAllClientsInContextGroup.bind(this)),t.register("getInfoForContextGroup",this.getInfoForContextGroup.bind(this)),t.register("contextHandlerRegistered",this.contextHandlerRegistered.bind(this)),t.register("intentHandlerRegistered",this.intentHandlerRegistered.bind(this)),t.register("removeContextHandler",this.removeContextHandler.bind(this)),t.register("sessionContextGroup:createIfNeeded",this.handleJoinSessionContextGroup.bind(this)),t.register("fdc3Open",this.fdc3HandleOpen.bind(this)),t.register("fdc3v2FindIntentsByContext",this.handleInfoForIntentsByContext.bind(this)),t.register("fdc3FindInstances",this.fdc3HandleFindInstances.bind(this)),t.register("fdc3GetAppMetadata",this.fdc3HandleGetAppMetadata.bind(this)),t.register("fdc3v2GetInfo",async(t,e)=>this.fdc3HandleGetInfo.bind(this)(t,e)),t.register("createPrivateChannelProvider",async t=>{const{channelId:e}=t,n=await this.fin.InterApplicationBus.Channel.create(e),i=Fe.init(n,e,t=>{this.privateChannelProviderMap.delete(t)});this.privateChannelProviderMap.set(e,i)}),t.register("isIdUsedByPrivateChannel",async t=>{const{channelId:e}=t;return this.privateChannelProviderMap.has(e)})}isConnectionAuthorized(t,e){return this.wire.sendAction("interop-broker-is-connection-authorized").catch(t=>{}),Promise.resolve(!0)}isActionAuthorized(t,e,n){return this.wire.sendAction("interop-broker-is-action-authorized").catch(t=>{}),Promise.resolve(!0)}}Re=new WeakMap,Ge=new WeakMap,Oe=new WeakMap,Ne.checkContextIntegrity=Te;var Be,De=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},Ve=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class Ue extends h{constructor(t,e,n){super(t),Be.set(this,void 0),this.id=n,De(this,Be,e,"f")}async setContext(t){this.wire.sendAction("interop-session-context-group-set-context").catch(t=>{});return(await Ve(this,Be,"f")).dispatch(`sessionContextGroup:setContext-${this.id}`,{sessionContextGroupId:this.id,context:t})}async getCurrentContext(t){this.wire.sendAction("interop-session-context-group-get-context").catch(t=>{});return(await Ve(this,Be,"f")).dispatch(`sessionContextGroup:getContext-${this.id}`,{sessionContextGroupId:this.id,type:t})}async addContextHandler(t,e){if(this.wire.sendAction("interop-session-context-group-add-handler").catch(t=>{}),"function"!=typeof t)throw new Error("Non-function argument passed to the first parameter 'handler'. Be aware that the argument order does not match the FDC3 standard.");const n=await Ve(this,Be,"f");let i;return i=e?`sessionContextHandler:invoke-${this.id}-${e}-${Ee()}`:`sessionContextHandler:invoke-${this.id}`,n.register(i,Me(t,i)),await n.dispatch(`sessionContextGroup:handlerAdded-${this.id}`,{handlerId:i,contextType:e}),{unsubscribe:await this.createUnsubscribeCb(i)}}async createUnsubscribeCb(t){const e=await Ve(this,Be,"f");return async()=>{e.remove(t),await e.dispatch(`sessionContextGroup:handlerRemoved-${this.id}`,{handlerId:t})}}getUserInstance(){return{id:this.id,setContext:Pe(this.setContext.bind(this),"Failed to set context: "),getCurrentContext:Pe(this.getCurrentContext.bind(this),"Failed to get context: "),addContextHandler:Pe(this.addContextHandler.bind(this),"Failed to add context handler: ")}}}Be=new WeakMap;var _e,qe,ze,Je,Ye,Ke,Ze,Qe,Xe=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},tn=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class en{constructor(t){qe.set(this,void 0),ze.set(this,!1),Ye.set(this,async()=>{const t=await tn(this,qe,"f");let e=tn(en,_e,"f",Je).get(t);return e||(e={},tn(en,_e,"f",Je).set(t,e)),e}),Ke.set(this,t=>{const e=[];let n;const i=t=>{e.forEach(e=>e(t))};return{callbacks:e,dispose:async n=>{const i=e.indexOf(n);if(i>=0&&(e.splice(i,1),0===e.length)){(await tn(this,qe,"f")).remove(t)}},waitForRegistration:async()=>{n||(n=(async()=>{const e=await tn(this,qe,"f");await e.register(t,i)})()),await n}}}),Ze.set(this,async t=>(await tn(this,Ye,"f").call(this))[t]),Qe.set(this,async t=>{const e=await tn(this,Ye,"f").call(this);return await tn(this,Ze,"f").call(this,t)||(e[t]=tn(this,Ke,"f").call(this,t)),e[t]}),this.addListener=async(t,e)=>{const n=await tn(this,Qe,"f").call(this,t);n.callbacks.push(e),await n.waitForRegistration()},this.removeListener=async(t,e)=>{if(!tn(this,ze,"f"))return;if(await tn(this,Ze,"f").call(this,t)){const n=await tn(this,Qe,"f").call(this,t);await n.dispose(e)}},Xe(this,qe,t,"f"),Promise.resolve(t).then(()=>{Xe(this,ze,!0,"f")}).catch(()=>{console.warn("Channel Connection error occurred in channel client. Channel-events registrations will fail.")})}}_e=en,qe=new WeakMap,ze=new WeakMap,Ye=new WeakMap,Ke=new WeakMap,Ze=new WeakMap,Qe=new WeakMap,Je={value:new WeakMap};var nn,rn,sn,on,an=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},cn=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class dn extends h{constructor(t,e,n){super(t),nn.set(this,void 0),rn.set(this,void 0),sn.set(this,void 0),on.set(this,void 0),this.addListener=async(t,e)=>{try{await cn(this,on,"f").addListener(t,e)}catch(e){throw new Error(`An unexpected error occurred when adding a listener to the event ${t}. \n${e.stack}.`)}},this.removeListener=async(t,e)=>{try{await cn(this,on,"f").removeListener(t,e)}catch(e){throw new Error(`An unexpected error occurred when removing a listener for the event ${t}. \n${e.stack}.`)}},an(this,rn,new Map,"f"),an(this,nn,e,"f"),an(this,sn,n,"f"),an(this,on,new en(e),"f")}async setContext(t){this.wire.sendAction("interop-client-set-context").catch(t=>{});return(await cn(this,nn,"f")).dispatch("setContext",{context:t})}async addContextHandler(t,e){if(this.wire.sendAction("interop-client-add-context-handler").catch(t=>{}),"function"!=typeof t)throw new Error("Non-function argument passed to the first parameter 'handler'. Be aware that the argument order does not match the FDC3 standard.");const n=await cn(this,nn,"f");let i;i=e?`invokeContextHandler-${e}-${Ee()}`:"invokeContextHandler";const r=Me(t,i);return n.register(i,r),await n.dispatch("contextHandlerRegistered",{handlerId:i,contextType:e}),{unsubscribe:async()=>{n.remove(i),await n.dispatch("removeContextHandler",{handlerId:i})}}}async getContextGroups(){this.wire.sendAction("interop-client-get-context-groups").catch(t=>{});return(await cn(this,nn,"f")).dispatch("getContextGroups")}async joinContextGroup(t,e){this.wire.sendAction("interop-client-join-context-group").catch(t=>{});const n=await cn(this,nn,"f");if(!t)throw new Error("No contextGroupId specified for joinContextGroup.");return n.dispatch("joinContextGroup",{contextGroupId:t,target:e})}async removeFromContextGroup(t){this.wire.sendAction("interop-client-remove-from-context-group").catch(t=>{});return(await cn(this,nn,"f")).dispatch("removeFromContextGroup",{target:t})}async getAllClientsInContextGroup(t){this.wire.sendAction("interop-client-get-all-clients-in-context-group").catch(t=>{});const e=await cn(this,nn,"f");if(!t)throw new Error("No contextGroupId specified for getAllClientsInContextGroup.");return e.dispatch("getAllClientsInContextGroup",{contextGroupId:t})}async getInfoForContextGroup(t){this.wire.sendAction("interop-client-get-info-for-context-group").catch(t=>{});const e=await cn(this,nn,"f");if(!t)throw new Error("No contextGroupId specified for getInfoForContextGroup.");return e.dispatch("getInfoForContextGroup",{contextGroupId:t})}async fireIntent(t){this.wire.sendAction("interop-client-fire-intent").catch(t=>{});return(await cn(this,nn,"f")).dispatch("fireIntent",t)}async registerIntentHandler(t,e,n){this.wire.sendAction("interop-client-register-intent-handler").catch(t=>{});const i=await cn(this,nn,"f"),r=`intent-handler-${e}`,s=((t,e)=>async n=>{try{return t(n)}catch(t){throw console.error(`Error thrown by handler ${e}: ${t}`),t}})(t,r);try{await i.register(r,s),await i.dispatch("intentHandlerRegistered",{handlerId:r,...n})}catch(t){throw new Error("Unable to register intent handler")}return{unsubscribe:async()=>{i.remove(r)}}}async getCurrentContext(t){this.wire.sendAction("interop-client-get-current-context").catch(t=>{});return(await cn(this,nn,"f")).dispatch("getCurrentContext",{contextType:t})}async getInfoForIntent(t){this.wire.sendAction("interop-client-get-info-for-intent").catch(t=>{});return(await cn(this,nn,"f")).dispatch("getInfoForIntent",t)}async getInfoForIntentsByContext(t){this.wire.sendAction("interop-client-get-info-for-intents-by-context").catch(t=>{});return(await cn(this,nn,"f")).dispatch("getInfoForIntentsByContext",t)}async fireIntentForContext(t){this.wire.sendAction("interop-client-fire-intent-for-context").catch(t=>{});return(await cn(this,nn,"f")).dispatch("fireIntentForContext",t)}async joinSessionContextGroup(t){try{const e=cn(this,rn,"f").get(t);if(e)return e.getUserInstance();const n=await cn(this,nn,"f"),{hasConflict:i}=await n.dispatch("sessionContextGroup:createIfNeeded",{sessionContextGroupId:t});i&&console.warn(`A (non-session) context group with the name "${t}" already exists. If you are trying to join a Context Group, call joinContextGroup instead.`);const r=new Ue(this.wire,cn(this,nn,"f"),t);return cn(this,rn,"f").set(t,r),r.getUserInstance()}catch(e){throw console.error(`Error thrown trying to create Session Context Group with id "${t}": ${e}`),e}}async onDisconnection(t){this.wire.sendAction("interop-client-add-ondisconnection-listener").catch(t=>{});return(await cn(this,nn,"f")).onDisconnection(e=>{const{uuid:n}=e;t({type:"interop-broker",topic:"disconnected",brokerName:n})})}getFDC3Sync(t){return cn(this,sn,"f").call(this,t,this,this.wire)}async getFDC3(t){return this.getFDC3Sync(t)}static async ferryFdc3Call(t,e,n){return(await cn(t,nn,"f")).dispatch(e,n||null)}}function hn(t,e){if(e&&"2.0"===e){const e=function(t){return["fdc3HandleFindInstances","handleInfoForIntent","handleInfoForIntentsByContext","fdc3HandleGetAppMetadata","fdc3HandleGetInfo","fdc3HandleOpen","handleFiredIntent","handleFiredIntentForContext"].filter(e=>t[e]===Ne.prototype[e])}(t);e.length>0&&console.warn(`WARNING: FDC3 2.0 has been set as a default option for Views in this Platform, but the required InteropBroker APIs for FDC3 2.0 compliance have not all been overridden.\nThe following APIs need to be overridden:\n${e.join("\n")}`)}}nn=new WeakMap,rn=new WeakMap,sn=new WeakMap,on=new WeakMap;class ln{constructor(t,e){this.id=e,this.client=t,this.listeners=new Map}async broadcast(t){return this.client.dispatch("broadcast",{context:t})}async getCurrentContext(t){return this.client.dispatch("getCurrentContext",{contextType:t})}async addContextListener(t,e){if("function"!=typeof e)throw new Error("Non-function argument passed to the second parameter 'handler'. Be aware that the argument order does not match the FDC3 standard.");let n;n=t?`contextHandler:invoke-${this.id}-${t}-${Ee()}`:`contextHandler:invoke-${this.id}-${Ee()}`,this.client.register(n,Me(e,n));const i={unsubscribe:await this.createContextUnsubscribeCb(n)};return this.listeners.set(n,i),await this.client.dispatch("contextHandlerAdded",{handlerId:n,contextType:t}),i}createNonStandardUnsubscribeCb(t){return async()=>{this.client.remove(t),this.listeners.delete(t),await this.client.dispatch("nonStandardHandlerRemoved",{handlerId:t})}}createContextUnsubscribeCb(t){return async()=>{this.client.remove(t),this.listeners.delete(t),await this.client.dispatch("contextHandlerRemoved",{handlerId:t})}}onAddContextListener(t){const e=`onContextHandlerAdded:invoke-${this.id}-${Ee()}`;this.client.register(e,t);const n={unsubscribe:this.createNonStandardUnsubscribeCb(e)};return this.listeners.set(e,n),this.client.dispatch("onAddContextHandlerAdded",{handlerId:e}),n}onDisconnect(t){const e=`onDisconnect:invoke-${this.id}-${Ee()}`;this.client.register(e,t);const n={unsubscribe:this.createNonStandardUnsubscribeCb(e)};return this.listeners.set(e,n),this.client.dispatch("onDisconnectHandlerAdded",{handlerId:e}),n}onUnsubscribe(t){const e=`onUnsubscribe:invoke-${this.id}-${Ee()}`;this.client.register(e,t);const n={unsubscribe:this.createNonStandardUnsubscribeCb(e)};return this.listeners.set(e,n),this.client.dispatch("onUnsubscribeHandlerAdded",{handlerId:e}),n}async cleanUpAllSubs(){Array.from(this.listeners.keys()).forEach(t=>{this.client.remove(t),this.listeners.delete(t)})}async disconnect(){try{await this.client.dispatch("clientDisconnecting"),await this.cleanUpAllSubs(),await this.client.disconnect()}catch(t){throw new Error(t.message)}}}const pn=t=>({id:t.id,type:"app",broadcast:t.setContext,getCurrentContext:async e=>{const n=await t.getCurrentContext(e);return void 0===n?null:n},addContextListener:(n,i)=>{let r,s;"function"==typeof n?(console.warn("addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)"),r=n):(r=i,"string"==typeof n&&(s=n));const o=(async()=>{let n=!0;const i=await t.getCurrentContext(s);return t.addContextHandler((t,s)=>{if(!n||(n=!1,!e.isEqual(i,t)))return r(t,s)},s)})();return{...o,unsubscribe:()=>o.then(t=>t.unsubscribe())}}}),un=t=>{const e=pn(t);return{...e,addContextListener:async(...t)=>e.addContextListener(...t)}},wn=t=>({addContextListener:()=>{throw new yn("Channel.addContextListener",t)},broadcast:()=>{throw new yn("Channel.broadcast",t)},getCurrentContext:()=>{throw new yn("Channel.getCurrentContext",t)}});class yn extends Error{constructor(t,e="System"){super(t),this.message=`Calling ${t} on an instance of a ${e} Channel returned by fdc3.get${e}Channels is not supported. If you would like to use a ${e} Channel, please use fdc3.joinChannel, fdc3.addContextListener, and fdc3.broadcast instead.`}}var fn,gn;!function(t){t.NoResultReturned="NoResultReturned",t.IntentHandlerRejected="IntentHandlerRejected"}(fn||(fn={})),function(t){t.NoChannelFound="NoChannelFound",t.AccessDenied="AccessDenied",t.CreationFailed="CreationFailed"}(gn||(gn={}));const mn=t=>{let e=!1;const n=()=>{if(e)throw new Error("Private Channel Client has been disconnected from the Private Channel")};return{id:t.id,type:"private",broadcast:async e=>(n(),t.broadcast(e)),getCurrentContext:async e=>(n(),t.getCurrentContext(e)),addContextListener:async(e,i)=>{n();let r=i,s=e;"function"==typeof e&&(console.warn("addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)"),r=e,s=null);return t.addContextListener(s,r)},onAddContextListener:e=>(n(),t.onAddContextListener(e)),disconnect:async()=>(n(),e=!0,t.disconnect()),onDisconnect:e=>(n(),t.onDisconnect(e)),onUnsubscribe:e=>(n(),t.onUnsubscribe(e))}},vn=async(t,e,n,i)=>{const r=Ee(),s=n?{target:n,intentResolutionResultId:r}:{intentResolutionResultId:r},o=i?{name:i,context:e,metadata:s}:{...e,metadata:s},a=new Promise((e,n)=>{fin.InterApplicationBus.subscribe({uuid:"*"},r,t=>{e(t)}).catch(()=>{"other"===t.wire.environment.type&&e(void 0),n(new Error("getResult is not supported in this environment"))})}),c=async()=>{let e=await a;if(null==e)return;if("object"!=typeof e)throw new Error(fn.NoResultReturned);const{error:n}=e;if(n)throw new Error(fn.IntentHandlerRejected);if((t=>{if(t&&"object"==typeof t&&"type"in t&&"id"in t){const{type:e,id:n}=t;return"string"==typeof e&&"string"==typeof n&&("app"===e||"private"===e)}return!1})(e)){const{id:n,type:i}=e;switch(i){case"private":e=await(async t=>{try{const e=await fin.InterApplicationBus.Channel.connect(t),n=new ln(e,t);return mn(n)}catch(e){throw new Error(`Private Channel with id: ${t} doesn't exist`)}})(n);break;case"app":{const i=await t.joinSessionContextGroup(n);e=un(i);break}}}else if(!(t=>{if(t&&"object"==typeof t&&"type"in t){const{type:e}=t;return"string"==typeof e}return!1})(e))throw new Error(fn.NoResultReturned);return e},d=i?await t.fireIntent(o):await t.fireIntentForContext(o);return"object"!=typeof d?{source:{appId:"",instanceId:""},intent:"",version:"2.0",getResult:c}:{...d,getResult:c}};var Cn,In=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)},xn=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n};class bn{get client(){return In(this,Cn,"f").call(this)}get fin(){return this.wire.getFin()}constructor(t,e){this.wire=e,Cn.set(this,void 0),xn(this,Cn,t,"f")}async broadcast(t){return this.wire.recordAnalytic("fdc3-broadcast"),this.client.setContext(t)}async _open(t,e){this.wire.recordAnalytic("fdc3-open");try{return await dn.ferryFdc3Call(this.client,"fdc3Open",{app:t,context:e})}catch(t){const e=t.message===Le.fdc3Open?"ResolverUnavailable":t.message;throw new Error(e)}}async _getChannels(){return(await this.client.getContextGroups()).map(t=>({...t,type:"system",...wn()}))}async getOrCreateChannel(t,e){this.wire.recordAnalytic("fdc3-get-or-create-channel");if(await dn.ferryFdc3Call(this.client,"isIdUsedByPrivateChannel",{channelId:t}))throw new Error(gn.AccessDenied);const n=(await this._getChannels()).find(e=>e.id===t);if(n)return{...n,type:"system",...wn()};try{return e(await this.client.joinSessionContextGroup(t))}catch(t){throw console.error(t.message),new Error(gn.CreationFailed)}}async getSystemChannels(){return this.wire.recordAnalytic("fdc3-get-system-channels"),this._getChannels()}async joinChannel(t){this.wire.recordAnalytic("fdc3-join-channel");try{return await this.client.joinContextGroup(t)}catch(t){if(t.message===Le.joinSessionContextGroupWithJoinContextGroup?console.error("The Channel you have tried to join is an App Channel. Custom Channels can only be defined by the Interop Broker through code or manifest configuration. Please use getOrCreateChannel."):console.error(t.message),t.message.startsWith("Attempting to join a context group that does not exist"))throw new Error(gn.NoChannelFound);throw new Error(gn.AccessDenied)}}async getCurrentChannel(){this.wire.recordAnalytic("fdc3-get-current-channel");const t=await this.getCurrentContextGroupInfo();return t?this.buildChannelObject(t):null}async leaveCurrentChannel(){return this.wire.recordAnalytic("fdc3-leave-current-channel"),this.client.removeFromContextGroup()}async getCurrentContextGroupInfo(){const t=await this.client.getContextGroups(),e=t.map(async t=>this.client.getAllClientsInContextGroup(t.id)),n=(await Promise.all(e)).findIndex(t=>t.some(t=>{const{uuid:e,name:n}=t;return this.wire.me.uuid===e&&this.wire.me.name===n}));return t[n]}async buildChannelObject(t){return{...t,type:"system",addContextListener:(...[t,n])=>{let i,r;"function"==typeof t?(console.warn("addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)"),i=t):(i=n,"string"==typeof t&&(r=t));const s=(async()=>{let t=!0;const n=await this.client.getCurrentContext(r);return this.client.addContextHandler((r,s)=>{if(!t||(t=!1,!e.isEqual(n,r)))return i(r,s)},r)})();return{...s,unsubscribe:()=>s.then(t=>t.unsubscribe())}},broadcast:this.broadcast.bind(this),getCurrentContext:async t=>{const e=await this.client.getCurrentContext(t);return void 0===e?null:e}}}}Cn=new WeakMap;class An extends bn{async open(t,e){await super._open(t,e)}addContextListener(t,e){let n;return this.wire.recordAnalytic("fdc3-add-context-listener"),"function"==typeof t?(console.warn("addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)"),n=this.client.addContextHandler(t)):n=this.client.addContextHandler(e,null===t?void 0:t),{...n,unsubscribe:()=>n.then(t=>t.unsubscribe())}}addIntentListener(t,e){this.wire.recordAnalytic("fdc3-add-intent-listener");const n=this.client.registerIntentHandler(t=>{const{context:n,metadata:i}=t,{metadata:r}=n,s=i?.intentResolutionResultId||r?.intentResolutionResultId;s&&this.fin.InterApplicationBus.publish(s,null).catch(()=>null),e(t.context)},t,{fdc3Version:"1.2"});return{...n,unsubscribe:()=>n.then(t=>t.unsubscribe())}}async raiseIntent(t,e,n){this.wire.recordAnalytic("fdc3-raise-intent");const i=n?{name:t,context:e,metadata:{target:n}}:{name:t,context:e};try{return await this.client.fireIntent(i)}catch(t){const e=t.message===Le.fireIntent?"ResolverUnavailable":t.message;throw new Error(e)}}async findIntent(t,e){this.wire.recordAnalytic("fdc3-find-intent");try{return await this.client.getInfoForIntent({name:t,context:e})}catch(t){const e=t.message===Le.getInfoForIntent?"ResolverUnavailable":t.message;throw new Error(e)}}async findIntentsByContext(t){this.wire.recordAnalytic("fdc3-find-intents-by-context");try{return await this.client.getInfoForIntentsByContext(t)}catch(t){const e=t.message===Le.getInfoForIntentsByContext?"ResolverUnavailable":t.message;throw new Error(e)}}async raiseIntentForContext(t,e){this.wire.recordAnalytic("fdc3-raise-intent-for-context");try{return await this.client.fireIntentForContext({...t,metadata:{target:e}})}catch(t){const e=t.message===Le.fireIntentForContext?"ResolverUnavailable":t.message;throw new Error(e)}}async getOrCreateChannel(t){return super.getOrCreateChannel(t,pn)}getInfo(){this.wire.recordAnalytic("fdc3-get-info");return{providerVersion:this.wire.environment.getAdapterVersionSync(),provider:`openfin-${this.wire.me.uuid}`,fdc3Version:"1.2"}}}class En extends bn{async open(t,e){return"string"==typeof t&&console.warn("Passing a string as the app parameter is deprecated, please use an AppIdentifier ({ appId: string; instanceId?: string })."),super._open(t,e)}async findInstances(t){this.wire.recordAnalytic("fdc3-find-instances");try{return await dn.ferryFdc3Call(this.client,"fdc3FindInstances",t)}catch(t){const e=t.message===Le.fdc3FindInstances?"ResolverUnavailable":t.message;throw new Error(e)}}async getAppMetadata(t){this.wire.recordAnalytic("fdc3-get-app-metadata");try{return await dn.ferryFdc3Call(this.client,"fdc3GetAppMetadata",t)}catch(t){const e=t.message===Le.fdc3GetAppMetadata?"ResolverUnavailable":t.message;throw new Error(e)}}async addContextListener(t,e){this.wire.recordAnalytic("fdc3-add-context-listener");const n=t=>e=>{const{contextMetadata:n,...i}=e,r=n?[{...i},n]:[e,null];t(...r)};let i=e,r=n(i);return"function"==typeof t?(console.warn("addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)"),i=t,r=n(i),this.client.addContextHandler(r)):this.client.addContextHandler(r,null===t?void 0:t)}async findIntent(t,e,n){this.wire.recordAnalytic("fdc3-find-intent");try{return await this.client.getInfoForIntent({name:t,context:e,metadata:{resultType:n}})}catch(t){const e=t.message===Le.getInfoForIntent?"ResolverUnavailable":t.message;throw new Error(e)}}async findIntentsByContext(t,e){this.wire.recordAnalytic("fdc3-find-intents-by-context");const n=e?{context:t,metadata:{resultType:e}}:t;try{return await dn.ferryFdc3Call(this.client,"fdc3v2FindIntentsByContext",n)}catch(t){const e=t.message===Le.getInfoForIntentsByContext?"ResolverUnavailable":t.message;throw new Error(e)}}async raiseIntent(t,e,n){this.wire.recordAnalytic("fdc3-raise-intent");try{return"string"==typeof n&&console.warn("Passing a string as the app parameter is deprecated, please use an AppIdentifier ({ appId: string; instanceId?: string })."),vn(this.client,e,n,t)}catch(t){const e=t.message===Le.fireIntent?"ResolverUnavailable":t.message;throw new Error(e)}}async raiseIntentForContext(t,e){this.wire.recordAnalytic("fdc3-raise-intent-for-context");try{return"string"==typeof e&&console.warn("Passing a string as the app parameter is deprecated, please use an AppIdentifier ({ appId: string; instanceId?: string })."),vn(this.client,t,e)}catch(t){const e=t.message===Le.fireIntent?"ResolverUnavailable":t.message;throw new Error(e)}}async addIntentListener(t,e){if(this.wire.recordAnalytic("fdc3-add-intent-listener"),"string"!=typeof t)throw new Error("First argument must be an Intent name");return this.client.registerIntentHandler(async t=>{let n,i;const{context:r,metadata:s}=t,{contextMetadata:o,metadata:a,...c}=r,d=s?.intentResolutionResultId||a?.intentResolutionResultId;try{const t=a?{metadata:a,...c}:{...c};n=await e(t,o),i=n}catch(t){n=t,i={error:!0}}if(d&&this.fin.InterApplicationBus.publish(d,i).catch(()=>null),n instanceof Error)throw new Error(n.message);return n},t,{fdc3Version:"2.0"})}async getOrCreateChannel(t){return super.getOrCreateChannel(t,un)}async createPrivateChannel(){const t=Ee();await dn.ferryFdc3Call(this.client,"createPrivateChannelProvider",{channelId:t});const e=await this.fin.InterApplicationBus.Channel.connect(t),n=new ln(e,t);return mn(n)}async getUserChannels(){return(await this.client.getContextGroups()).map(t=>({...t,type:"user",...wn("User")}))}async getSystemChannels(){return console.warn("This API has been deprecated. Please use fdc3.getUserChannels instead."),super.getSystemChannels()}async joinUserChannel(t){return super.joinChannel(t)}async joinChannel(t){return console.warn("This API has been deprecated. Please use fdc3.joinUserChannel instead."),super.joinChannel(t)}async getCurrentChannel(){const t=await super.getCurrentChannel();return t?{...t,type:"user",broadcast:this.broadcast.bind(this)}:null}async getInfo(){return dn.ferryFdc3Call(this.client,"fdc3v2GetInfo",{fdc3Version:"2.0"})}}const Pn=(t,e,n)=>{switch(t){case"1.2":return new An(()=>e,n);case"2.0":return new En(()=>e,n);default:throw new Error(`Invalid FDC3 version provided: ${t}. Must be '1.2' or '2.0'`)}},Mn=t=>new t,Sn="You have attempted to use or modify InteropBroker parameters, which is not allowed. You are likely using an older InteropBroker override scheme. Please consult our Interop docs for guidance on migrating to the new override scheme.";class kn extends h{async init(t,e=Mn){this.wire.recordAnalytic("interop-init");const n=await this.wire.environment.getInteropInfo(this.wire.getFin()),i=function(t){const e=()=>{throw new Error(t)};return new Proxy({},{apply:e,construct:e,defineProperty:e,deleteProperty:e,get:e,getOwnPropertyDescriptor:e,getPrototypeOf:e,has:e,isExtensible:e,ownKeys:e,preventExtensions:e,set:e,setPrototypeOf:e})}(Sn),r=(s=Sn,o=structuredClone(n),new Proxy(o,{get:(...t)=>(console.warn(s),Reflect.get(...t)),set:(...t)=>(console.warn(s),Reflect.set(...t)),getOwnPropertyDescriptor:(...t)=>(console.warn(s),Reflect.getOwnPropertyDescriptor(...t)),ownKeys:(...t)=>(console.warn(s),Reflect.ownKeys(...t))}));var s,o;const a=async()=>{throw new Error(Sn)},c=Ne.createClosedConstructor(this.wire,()=>this.fin.InterApplicationBus.Channel.create(`interop-broker-${t}`),n);let d;if(Array.isArray(e)){d=new(function(...t){return e=>t.reduceRight((t,e)=>n=>e(t(n)),t=>t)(e)}(...e)(c))(i,a,r)}else d=await e(c,i,a,r);return hn(d,n.fdc3Version),d}connectSync(t,e){return this.wire.recordAnalytic("interop-connect-sync"),new dn(this.wire,this.wire.environment.whenReady().then(()=>this.fin.InterApplicationBus.Channel.connect(`interop-broker-${t}`,{payload:e})),Pn)}}const Ln=t=>`snapshot-source-provider-${t.uuid}`;var Tn,$n,Fn,Rn,Gn,On=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},Wn=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};const jn=new Map;class Hn extends h{constructor(t,e){super(t),Tn.set(this,void 0),$n.set(this,()=>(jn.has(this.identity.uuid)||jn.set(this.identity.uuid,{eventFired:null,clientPromise:null}),jn.get(this.identity.uuid))),Fn.set(this,()=>(Wn(this,$n,"f").call(this).clientPromise||(Wn(this,$n,"f").call(this).clientPromise=Wn(this,Rn,"f").call(this)),Wn(this,$n,"f").call(this).clientPromise)),Rn.set(this,async()=>{const t=Ln(this.identity);try{Wn(this,$n,"f").call(this).eventFired||await Wn(this,Gn,"f").call(this);const e=await this.fin.InterApplicationBus.Channel.connect(t,{wait:!1});return e.onDisconnection(()=>{Wn(this,$n,"f").call(this).clientPromise=null,Wn(this,$n,"f").call(this).eventFired=null}),e}catch(t){throw Wn(this,$n,"f").call(this).clientPromise=null,new Error("The targeted SnapshotSource is not currently initialized. Await this object's ready() method.")}}),Gn.set(this,async()=>{const t=Ln(this.identity);let e,n;const i=new Promise((t,i)=>{e=t,n=i});Wn(this,$n,"f").call(this).eventFired=i;const r=async i=>{try{i.channelName===t&&(e(),await this.fin.InterApplicationBus.Channel.removeListener("connected",r))}catch(t){n(t)}};await this.fin.InterApplicationBus.Channel.on("connected",r)}),On(this,Tn,e,"f")}get identity(){return Wn(this,Tn,"f")}async ready(){this.wire.recordAnalytic("snapshot-source-ready");try{await Wn(this,Fn,"f").call(this)}catch(t){await Wn(this,$n,"f").call(this).eventFired}}async getSnapshot(){this.wire.recordAnalytic("snapshot-source-get-snapshot");const t=await Wn(this,Fn,"f").call(this),e=await t.dispatch("get-snapshot");return(await e).snapshot}async applySnapshot(t){this.wire.recordAnalytic("snapshot-source-apply-snapshot");return(await Wn(this,Fn,"f").call(this)).dispatch("apply-snapshot",{snapshot:t})}}Tn=new WeakMap,$n=new WeakMap,Fn=new WeakMap,Rn=new WeakMap,Gn=new WeakMap;class Nn extends h{async init(t){if(this.wire.recordAnalytic("snapshot-source-init"),"object"!=typeof t||"function"!=typeof t.getSnapshot||"function"!=typeof t.applySnapshot)throw new Error("you must pass in a valid SnapshotProvider");const e=await this.fin.InterApplicationBus.Channel.create(Ln(this.fin.me));e.register("get-snapshot",async()=>({snapshot:await t.getSnapshot()})),e.register("apply-snapshot",({snapshot:e})=>t.applySnapshot(e))}wrapSync(t){return this.wire.recordAnalytic("snapshot-source-wrap-sync"),new Hn(this.wire,t)}async wrap(t){return this.wire.recordAnalytic("snapshot-source-wrap"),this.wrapSync(t)}}var Bn,Dn,Vn,Un,_n=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},qn=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class zn{constructor(t,e){Bn.set(this,void 0),Dn.set(this,void 0),Vn.set(this,void 0),Un.set(this,new I(async()=>(await qn(this,Bn,"f").registerMessageHandler(t=>{if("notification-created"===t.action&&t.payload.managerId===qn(this,Vn,"f")){const{notificationId:e,properties:n,documentUrl:i,notificationIcon:r,badge:s,image:o}=t.payload;try{qn(this,Dn,"f")?.call(this,{properties:n,images:{image:o,icon:r,badge:s},url:i,notificationId:e})}catch(t){console.error("Failed to handle notification",t)}return!0}return!1}),!0))),this.setNotificationHandler=async t=>{await qn(this,Un,"f").getValue(),_n(this,Dn,t,"f")},this.destroy=async()=>{await qn(this,Bn,"f").sendAction("destroy-notification-manager",{managerId:qn(this,Vn,"f")})},this.dispatch=async t=>{const{notificationId:e,type:n}=t;await qn(this,Bn,"f").sendAction("dispatch-notification-event",{notificationId:e,type:n})},_n(this,Bn,t,"f"),_n(this,Vn,e,"f")}}Bn=new WeakMap,Dn=new WeakMap,Vn=new WeakMap,Un=new WeakMap;class Jn extends h{constructor(){super(...arguments),this.init=async()=>{const{payload:{data:{managerId:t}}}=await this.wire.sendAction("init-notification-manager");return new zn(this.wire,t)}}}class Yn extends t.EventEmitter{constructor(t){super(),this.wire=t,this.System=new T(t),this.Window=new k(t),this.Application=new M(t),this.InterApplicationBus=new jt(t),this.Clipboard=new Ht(t),this.ExternalApplication=new Bt(t),this.Frame=new Vt(t),this.GlobalHotkey=new Ut(t),this.Platform=new xe(t,this.InterApplicationBus.Channel),this.View=new C(t),this.Interop=new kn(t),this.SnapshotSource=new Nn(t),this.NotificationManager=new Jn(t),t.registerFin(this),this.me=function(t){const{uuid:e,name:n,entityType:i}=t.me,r={setContext(){throw new Error(be)},addContextHandler(){throw new Error(be)},getContextGroups(){throw new Error(be)},joinContextGroup(){throw new Error(be)},removeFromContextGroup(){throw new Error(be)},getAllClientsInContextGroup(){throw new Error(be)},getInfoForContextGroup(){throw new Error(be)}},s="Interop API has not been instantiated. Either connection has failed or you have not declared interop in your config.",o={setContext(){throw new Error(s)},addContextHandler(){throw new Error(s)},getContextGroups(){throw new Error(s)},joinContextGroup(){throw new Error(s)},removeFromContextGroup(){throw new Error(s)},getAllClientsInContextGroup(){throw new Error(s)},getInfoForContextGroup(){throw new Error(s)}},a={eventNames:()=>{throw new Error(be)},emit:()=>{throw new Error(be)},listeners:()=>{throw new Error(be)},listenerCount:()=>{throw new Error(be)},on:()=>{throw new Error(be)},addListener:()=>{throw new Error(be)},once:()=>{throw new Error(be)},prependListener:()=>{throw new Error(be)},prependOnceListener:()=>{throw new Error(be)},removeListener:()=>{throw new Error(be)},removeAllListeners:()=>{throw new Error(be)}};switch(i){case"view":return Object.assign(new E(t,{uuid:e,name:n}),Ae(i,e,n),{interop:o,isOpenFin:!0});case"window":return Object.assign(new S(t,{uuid:e,name:n}),Ae(i,e,n),{interop:o,isOpenFin:!0});case"iframe":return Object.assign(new Dt(t,{uuid:e,name:n}),Ae(i,e,n),{interop:o,isOpenFin:!0});case"external connection":return Object.assign(new Nt(t,{uuid:e}),Ae(i,e,n),{interop:o,isOpenFin:!1});default:return{...Ae(i,e,n),...a,interop:r,isOpenFin:!1}}}(t),t.on("disconnected",()=>{this.emit("disconnected")})}}function Kn(t){return Qn(t)&&"string"==typeof t.address}function Zn(t){return Kn(t)&&"string"==typeof t.token}function Qn(t){return"string"==typeof t.uuid}class Xn{constructor(){this.storage=new Map}hashKeys(t){return t.map(ti).join("/")}getOrCreate(e){const n=this.hashKeys(e);return this.storage.has(n)||this.storage.set(n,new t.EventEmitter),this.storage.get(n)}has(t){return this.storage.has(this.hashKeys(t))}delete(t){const e=this.hashKeys(t);return this.storage.delete(e)}}function ti(t){return btoa(t)}class ei extends Xn{constructor(){super(...arguments),this.dispatchEvent=t=>{if(function(t){return"process-desktop-event"===t.action}(t)){const{payload:e}=t,n=function(t){const{topic:e}=t;if("frame"===e||"window"===e||"view"===e){const{uuid:n,name:i}=t;return[e,n,i]}if("application"===e){const{uuid:n}=t;return[e,n]}return[e]}(e);if(this.has(n))return this.getOrCreate(n).emit(e.type,e),!0}return!1}}}var ni,ii,ri,si,oi,ai,ci,di=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},hi=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class li extends t.EventEmitter{constructor(t,e,n){super(),ni.add(this),this.wireListeners=new Map,this.topicRefMap=new Map,this.eventAggregator=new ei,this.messageHandlers=[this.eventAggregator.dispatchEvent],ii.set(this,void 0),ri.set(this,!0),si.set(this,new Map),oi.set(this,void 0),ai.set(this,void 0),this.connectSync=()=>{hi(this,ii,"f").connectSync()},this.getPort=()=>hi(this,ii,"f").getPort(),di(this,ii,t(this.onmessage.bind(this)),"f"),this.environment=e,di(this,ri,!1!==n.apiDiagnostics,"f"),this.sendRaw=hi(this,ii,"f").send.bind(hi(this,ii,"f")),this.registerMessageHandler(this.handleMessage.bind(this)),hi(this,ii,"f").on("disconnected",()=>{for(const[,{handleNack:t}]of this.wireListeners)t({reason:"Remote connection has closed"});this.wireListeners.clear(),clearTimeout(hi(this,oi,"f")),di(this,oi,void 0,"f"),hi(this,si,"f").clear(),this.emit("disconnected")});const{uuid:i,name:r}=n,s=this.environment.getCurrentEntityType();this.me=Ae(s,i,r)}getFin(){if(!hi(this,ai,"f"))throw new Error("No Fin object registered for this transport");return hi(this,ai,"f")}registerFin(t){if(hi(this,ai,"f"))throw new Error("Fin object has already been registered for this transport");di(this,ai,t,"f")}recordAnalytic(t){if(hi(this,ri,"f")&&(hi(this,si,"f").set(t,(hi(this,si,"f").get(t)??0)+1),void 0===hi(this,oi,"f"))){const t=setTimeout(()=>hi(this,ni,"m",ci).call(this),3e4);"object"==typeof t&&null!==t&&t.unref?.(),di(this,oi,t,"f")}}shutdown(){return hi(this,ii,"f").shutdown()}async connect(t){if(function(t){return"object"==typeof t.receiver&&Zn({...t,address:""})}(t))return await hi(this,ii,"f").connect(t.receiver),this.authorize(t);if(Zn(t))return this.connectRemote(t);if(Kn(t))return this.connectByPort(t);if(function(t){return Qn(t)&&function(t){return t.runtime&&"string"==typeof t.runtime.version}(t)}(t)){const e=await this.environment.retrievePort(t);return this.connectByPort({...t,address:`ws://localhost:${e}`})}}async connectRemote(t){return await hi(this,ii,"f").connect(new(this.environment.getWsConstructor())(t.address)),this.authorize(t)}async connectByPort(t){const{address:e,uuid:n}=t,i={...t,type:"file-token"},r=hi(this,ii,"f");await r.connect(new(this.environment.getWsConstructor())(t.address));const s=await this.sendAction("request-external-authorization",{uuid:n,type:"file-token"},!0);if("external-authorization-response"!==s.action)throw new p(s.action);return await this.environment.writeToken(s.payload.file,s.payload.token),this.authorize(i)}async authorize(t){const e=await this.sendAction("request-authorization",t,!0);if("authorization-response"!==e.action)throw new p(e.action);if(!0!==e.payload.success)throw new g(e.payload)}sendAction(t,e={},n=!1){let i=()=>{};const r=g.getCallSite(1),s=this.environment.getNextMessageId(),o=new Promise((o,a)=>{i=a;const c={action:t,payload:e,messageId:s},d=hi(this,ii,"f");return this.addWireListener(s,o,t=>this.nackHandler(t,a,r),n),d.send(c).catch(a)});return Object.assign(o,{cancel:i,messageId:s})}nackHandler(t,e,n){e("string"==typeof t?t:new g(t,n))}ferryAction(t){return new Promise((e,n)=>{const i=this.environment.getNextMessageId();t.messageId=i;const r=t=>{e(t.payload)};return hi(this,ii,"f").send(t).then(()=>this.addWireListener(i,r,t=>this.nackHandler(t,n),!1)).catch(n)})}registerMessageHandler(t){this.messageHandlers.push(t)}addWireListener(t,e,n,i){i?this.uncorrelatedListener=e:this.wireListeners.has(t)?n({reason:"Duplicate handler id",error:Q(new u(String(t)))}):this.wireListeners.set(t,{resolve:e,handleNack:n})}onmessage(t){for(const e of this.messageHandlers)e.call(null,t)}handleMessage(t){const e=t.correlationId||NaN;if("correlationId"in t){if(!this.wireListeners.has(e))return!1;{const{resolve:n,handleNack:i}=this.wireListeners.get(e);"ack"!==t.action?i({reason:"Did not receive ack action",error:Q(new w(t.action))}):"payload"in t?t.payload.success?n.call(null,t):i(t.payload):"string"==typeof t.reason?i(t):(console.warn("Received invalid response from core",t),i({reason:"invalid response shape",error:Q(new Error("Invalid response shape"))})),this.wireListeners.delete(e)}}else this.uncorrelatedListener&&this.uncorrelatedListener.call(null,t),this.uncorrelatedListener=()=>{};return!0}}ii=new WeakMap,ri=new WeakMap,si=new WeakMap,oi=new WeakMap,ai=new WeakMap,ni=new WeakSet,ci=function(){if(di(this,oi,void 0,"f"),0===hi(this,si,"f").size)return;const t=Object.fromEntries(hi(this,si,"f"));hi(this,si,"f").clear(),this.sendAction("send-analytics-batch",{counts:t}).catch(()=>{})};const pi=new Map([["debug",0],["info",1],["warn",2],["error",3],["none",4]]),ui=t=>"string"==typeof t?t:t instanceof Error?t.stack||t.message:JSON.stringify(t);class wi{static setGlobalLogLevel(t){wi.LOG_LEVEL=t??"error"}static setCustomLogger(t){wi.customLogger=t}constructor(...t){this.scopes=t}log(t,...e){const n=pi.get(t)??3;if((pi.get(wi.LOG_LEVEL)??3)<=n){const r=[`[${(new Date).toISOString()}]`,...(i=this.scopes,i.map(t=>`[${t}]`)),...e];if(wi.customLogger){const e=r.map(ui).join(" ");wi.customLogger[t](e)}else 1===n?console.log(...r):console[t](...r)}var i}warn(...t){this.log("warn",...t)}error(...t){this.log("error",...t)}info(...t){this.log("info",...t)}debug(...t){this.log("debug",...t)}static getLogger(...t){return new wi(...t)}getLogger(...t){return new wi(...this.scopes,...t)}}wi.LOG_LEVEL="error";const yi=wi.getLogger("@openfin/core-web/client"),fi=yi.getLogger("data-channel"),gi=t=>`data-channel-${t.me.uuid}`,mi=async(t,e)=>{const n=async n=>t.dispatch("page-title-updated",{data:{identity:e,title:n}}).catch(t=>{fi.warn("Failed to dispatch title change",t)});document.title&&await n(document.title),s(document.head,n)};function vi(t,e){if(!function(t){return"string"==typeof t}(t))throw new Error(`Property ${e} has invalid type. Expected string, got ${typeof t}.`)}const Ci="web-broker-ports-ready",Ii=yi.getLogger("get-web-interop-ports");function xi(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)}function bi(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n}var Ai,Ei,Pi;"function"==typeof SuppressedError&&SuppressedError;class Mi extends t.EventEmitter{constructor(t,e){super(),Ai.set(this,void 0),Ei.set(this,void 0),Pi.set(this,!1),this.connectSync=()=>{xi(this,Pi,"f")||(xi(this,Ei,"f").addEventListener("message",t=>{t.data?.topic?.startsWith("wire-message")&&t.data.message&&xi(this,Ai,"f").call(this,{...JSON.parse(t.data.message),ports:t.ports})}),xi(this,Ei,"f").start())},this.connect=async()=>{this.connectSync()},this.send=t=>(xi(this,Ei,"f").postMessage({topic:"wire-message",message:JSON.stringify(t)}),Promise.resolve()),this.shutdown=async()=>{xi(this,Ei,"f").close()},bi(this,Ai,t,"f"),bi(this,Ei,e,"f")}getPort(){return xi(this,Ei,"f")}}Ai=new WeakMap,Ei=new WeakMap,Pi=new WeakMap;class Si{async getViewWindowIdentity(t,e){const{identity:n}=await t.View.wrapSync(e).getCurrentWindow();return n}async getInteropInfo(t){const e=await t.Application.getCurrentSync().getInfo().catch(()=>null),n=e?.initialOptions?.interopBrokerConfiguration??{};return{fdc3Version:e?function({manifest:t,initialOptions:e}){const n=t?.platform?.defaultViewOptions?.fdc3InteropApi??e.defaultViewOptions?.fdc3InteropApi;return["1.2","2.0"].includes(n??"")?n:void 0}(e):void 0,...n,fdc3Info:{providerVersion:await t.System.getVersion(),provider:"OpenFin"}}}}class ki extends Si{constructor(){super(...arguments),this.type="other",this.getRandomId=()=>{const t=new Uint32Array(1);return window.crypto.getRandomValues(t)[0].toString(32)}}getAdapterVersionSync(){return""}observeBounds(t,e){throw new Error("Method not implemented.")}layoutAllowedInContext(t){return!1}initLayoutManager(t,e,n){throw new Error("Method not implemented.")}applyLayoutSnapshot(t,e,n){throw new Error("Method not implemented.")}createLayout(t,e){throw new Error("Method not implemented.")}destroyLayout(t,e){throw new Error("Method not implemented.")}resolveLayout(t,e){throw new Error("Method not implemented.")}initPlatform(...t){throw new Error("Method not implemented.")}writeToken(t,e){return Promise.resolve("")}retrievePort(t){throw new Error("Method not implemented.")}getNextMessageId(){return this.getRandomId()}createChildContent(t){throw new Error("Method not implemented.")}getWebWindow(t){throw new Error("Method not implemented.")}getCurrentEntityIdentity(){throw new Error("Method not implemented.")}getCurrentEntityType(){return"external connection"}raiseEvent(t,e){throw new Error("Method not implemented.")}getUrl(){return location.href}getDefaultChannelOptions(){return{create:{},connect:{}}}getRtcPeer(){return new RTCPeerConnection}getWsConstructor(){return WebSocket}whenReady(){return Promise.resolve()}}const Li=t=>"platform"in t&&void 0!==t.platform;var Ti,$i;class Fi extends ki{constructor(t){super(),this.connectConfig=t,Ti.set(this,void 0),$i.set(this,new I(async()=>Promise.resolve().then(function(){return __webpack_require__(/*! ./main-4a3f580e.js */ "./node_modules/@openfin/core-web/out/main-4a3f580e.js")}))),Li(t)&&this.validatePlatformOptions(t)}getAdapterVersionSync(){return"0.44.110"}validatePlatformOptions({platform:t}){if(!("layoutSnapshot"in t))throw new Error("Platform options are missing layoutSnapshot. Please provide a layoutSnapshot in the platform options.");if("windows"in t||"windows"in t.layoutSnapshot)throw new Error("It appears you tried to call connect() with a snapshot object from an OpenFin desktop environment. Note that connect() expects to be called with a platform property with this structure: { platform: { layoutSnapshot } }. To get a layoutSnapshot of the expected structure, use fin.Platform.Layout.getCurrentLayoutManagerSync().getLayoutSnapshot() in v34+ in your desktop environment.");const{layouts:e}=t.layoutSnapshot;Object.entries(e).map(([t,e])=>{if("object"!=typeof e||null===e)throw new Error(`Invalid layout detected: layoutSnapshot.layouts.${t} must be an object.`);if(!("content"in e))throw new Error(`Invalid layout detected: layoutSnapshot.layouts.${t} must contain a 'content' property.`)})}async getInteropInfo(t){return{...{contextGroups:void 0,logging:{beforeAction:{enabled:!1},afterAction:{enabled:!1}}},fdc3Version:void 0,fdc3Info:{providerVersion:"0.44.110",provider:"OpenFin Web"}}}layoutAllowedInContext(t){return!0}async initLayoutManager(t,e,n){if(xi(this,Ti,"f"))throw new Error("Layout already initialized.");if(!Li(this.connectConfig))throw new Error("Platform options are missing from connection config.");const{WebLayoutEntryPoint:i}=await xi(this,$i,"f").getValue();return bi(this,Ti,new i(this.connectConfig),"f"),await xi(this,Ti,"f").initLayoutManager(t,e,n)}async applyLayoutSnapshot(t,e,n){xi(this,Ti,"f")?.applyLayoutSnapshot(t,e,n)}async createLayout(t,e){return xi(this,Ti,"f")?.createLayout(t,e)}async destroyLayout(t,e){return xi(this,Ti,"f")?.destroyLayout(t,e)}async getViewWindowIdentity(t,e){return Promise.resolve({uuid:e.uuid,name:e.uuid})}}Ti=new WeakMap,$i=new WeakMap;const Ri=()=>{const t=((t,e)=>{const n=new RegExp(`^${e}<(?<meta>.*)>$`).exec(t)?.groups?.meta;if(n)try{return JSON.parse(atob(n))}catch(t){throw new Error(`Failed to decode JSON from ${n}.`)}})(window.name,"of-frame");if(t)try{const{name:e,uuid:n,brokerUrl:i,providerId:r,contextGroup:s}=t;return vi(i,"brokerUrl"),vi(n,"uuid"),vi(e,"name"),{identity:{name:e,uuid:n},brokerUrl:i,interopConfig:{providerId:r,currentContextGroup:s},isOfView:!0}}catch(t){throw new Error(`Unexpected error occurred when inferring platform information: ${t.stack}`)}},Gi=()=>{const t=n.v4();return{uuid:t,name:t}},Oi=async t=>{if("enabled"===t.connectionInheritance){const e=await(async t=>{const e=Ri();if(e){const{validateOptions:n=()=>!0}=t,{identity:i,...r}=e;if(!await n(r))throw new Error("Parent options were rejected by validateOptions.");return e}})(t);if(e)return e}if(!t.options){const e="enabled"===t.connectionInheritance?"Broker URL was not specified nor provided by a platform container.":"Connection inheritance is disabled but no options were provided.";throw new Error(e)}return{...t.options,identity:Gi(),isOfView:!1}};exports.LAYOUT_CONTROLLER_ID=ce,exports.Lazy=I,exports.Logger=wi,exports.__classPrivateFieldGet=xi,exports.__classPrivateFieldSet=bi,exports.clientLogger=yi,exports.connect=async t=>{try{wi.setGlobalLogLevel(t.logLevel),wi.setCustomLogger(t.logger),yi.info("Establishing connection",t);const{brokerUrl:e,identity:n,timeout:s,interopConfig:o,isOfView:a}=await Oi(t),{workerPort:c,iframeBrokerPort:d}=await(async(t,e,n)=>{const{origin:r}=new URL(t),s=document.createElement("IFRAME");let o;s.style.display="none";try{return await new Promise((a,c)=>{const d=t=>{if(t.source===s.contentWindow&&t.data?.topic===`ack-${Ci}`){if(t.origin!==r)c(new Error(`Broker redirected to unexpected origin ${t.origin}, expected ${r}.`));else if(t.data.success){const[e,n]=t.ports;a({iframeBrokerPort:e,workerPort:n})}else c(new g(t.data));window.removeEventListener("message",d),clearTimeout(o)}};window.addEventListener("message",d),Ii.info(`Connecting to broker ${t}`),s.setAttribute("src",t),s.setAttribute("name",i(e,"of-broker")),document.body.appendChild(s),Ii.info("Iframe loaded, awaiting init message from iframe"),n&&(o=setTimeout(()=>{window.removeEventListener("message",d),document.body.removeChild(s),c(new Error("Worker did not initialize in time"))},n))})}catch(t){throw new Error(`Failed to initialise Fin Web Client. ${t.message}`,{cause:t})}})(e,n,s);yi.info("Successfully established connection to shared worker");const h={entityType:"external connection",...n};c.start(),d.start();const l=((t,e,n)=>{const i=new Fi(t),r=new li(t=>new Mi(t,e),i,n);return r.connectSync(),new Yn(r)})(t,c,h);return a&&window.top&&!r(window,window.top)&&(t=>{const e={uuid:t.me.uuid,name:t.me.name};fi.debug("Data channel connecting..."),t.InterApplicationBus.Channel.connect(gi(t)).then(async t=>{fi.debug("Data channel connected"),await mi(t,e)}).catch(t=>{fi.warn("Failed to connect to data channel, some features may not work like title updates",t)})})(l),o?.providerId&&(l.me.interop=l.Interop.connectSync(o.providerId),o?.currentContextGroup&&l.me.interop.joinContextGroup(o.currentContextGroup).catch(t=>{yi.warn(`Error joining specified context group: ${o?.currentContextGroup}, continuing`,t)})),{...l,me:{...l.me,identity:{uuid:l.me.uuid,name:l.me.name}}}}catch(t){throw new Error(`An error occured during web-interop connection: ${t.message}`)}},exports.encodeOptions=i,exports.getDataChannelName=gi,exports.getTitleObserver=s,exports.isSameOrigin=r,exports.makeKeyChecker=()=>t=>t,exports.relayChannelClientApi=async(t,e)=>{t.register(`relay:${e}`,({action:e,target:n,payload:i})=>t.dispatch(n,e,i)),await Promise.resolve()};


/***/ },

/***/ "./node_modules/@openfin/core-web/out/main-4a3f580e.js"
/*!*************************************************************!*\
  !*** ./node_modules/@openfin/core-web/out/main-4a3f580e.js ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var t=__webpack_require__(/*! ./main-0ca8f4a4.js */ "./node_modules/@openfin/core-web/out/main-0ca8f4a4.js"),e=__webpack_require__(/*! events */ "../../node_modules/events/events.js"),i=__webpack_require__(/*! he */ "../../node_modules/he/he.js"),n=__webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/esm-browser/index.js");function o(t){var e=Object.create(null);return t&&Object.keys(t).forEach(function(i){if("default"!==i){var n=Object.getOwnPropertyDescriptor(t,i);Object.defineProperty(e,i,n.get?n:{enumerable:!0,get:function(){return t[i]}})}}),e.default=t,Object.freeze(e)}__webpack_require__(/*! es-toolkit */ "../../node_modules/es-toolkit/dist/index.js");var s=o(i);const r=Symbol("exposedProperties"),a=t=>(e,i,n)=>{e[r]=e[r]||[],e[r].push({key:i,descriptor:n,options:t})};class l{constructor(t){this.strategy=t,this.exposeInstance=async(t,e)=>{const i=(n=t)[r]||n.prototype[r]||[];var n;const o=await Promise.all(i.map(async({key:i,options:n})=>({key:i,options:await this.strategy.exposeFunction(t[i].bind(t),{key:i,options:n,meta:e})})));await this.strategy.exposeMeta(e,o)}}}class h{constructor(t){this.channelProviderOrClient=t,this.exposeFunction=async(t,e)=>{const{key:i,options:n,meta:o}=e,{id:s}=o,r=`${s}.${n?.action||i}`;return await this.channelProviderOrClient.register(r,async({args:e})=>t(...e)),{action:r}},this.exposeMeta=async({id:t},e)=>{const i=`api-meta:${t}`;await this.channelProviderOrClient.register(i,()=>({props:e}))}}}const d=(t,[e,i])=>({...t,[e]:i});async function c(t,e){let i;return i=e instanceof Map?[...e.entries()]:Object.entries(e),async function(t,e){return(await Promise.all(e.map(async([e,i])=>[e,await t(i,e)]))).reduce(d,{})}(t,i)}function u(t,e,i){if("openfin"===t.environment.type){const{uuid:n,name:o}=t.environment.getCurrentEntityIdentity(),s=`window/${e}/${n}-${o}`,r={layoutIdentity:{layoutName:i,uuid:n,name:o},topic:"window"};t.environment.raiseEvent(s,r)}}function m(t,e){return(t=>"type"in t&&"component"===t.type)(e)?t(e):{...e,content:e.content?.map(e=>m(t,e))}}class p extends Error{constructor(t){super(`Layout snapshot for ${t} could not be generated, layout ${t} is not ready or may be destroyed`),this.type=p.type}static isLayoutNotReadyError(t){return"object"==typeof t&&"type"in t&&t.type===p.type}}p.type="LayoutSnapshotError";var g,f,v,_,y=function(t,e,i,n,o){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?o.call(t,i):o?o.value=i:e.set(t,i),i},w=function(t,e,i,n){if("a"===i&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?n:"a"===i?n.call(t):n?n.value:e.get(t)};class C{constructor(t){f.set(this,void 0),v.set(this,new Map),y(this,f,t,"f")}size(){return w(this,v,"f").size}async applyLayoutSnapshot({layouts:t}){if(Object.keys(t).length>1)throw new Error("[LayoutManager] Tried to call applyLayoutSnapshot with more than 1 layout. When implementing multiple layouts via overridden LayoutManager class, you must override and fully implement the applyLayoutSnapshot method without calling super.applyLayoutSnapshot().");const[[e,i]]=Object.entries(t);await C.createLayout(this,{layoutName:e,layout:i}),u(w(this,f,"f").getWire(),"layout-snapshot-applied",e)}async showLayout({layoutName:t}){}async getLayoutSnapshot(){return{layouts:(await Promise.all(Array.from(w(this,v,"f").entries()).map(async([t,e])=>{try{return{layoutName:t,snapshot:await e.getFrameSnapshot()}}catch(e){if(p.isLayoutNotReadyError(e))return void console.info(`Layout ${t} ommited from snapshot`,e.message);throw e}}))).reduce((t,e)=>e?{...t,[e.layoutName]:e.snapshot}:t,{})}}async removeLayout({layoutName:t}){}getLayoutIdentityForView(t){const e=[...w(this,v,"f").values()].find(e=>e.getCurrentViews().some(e=>e.name===t.name&&e.uuid===t.uuid));return e?.identity??void 0}isLayoutVisible({layoutName:t}){return w(C,g,"m",_).call(C,this,t).isVisible()}resolveLayoutIdentity(t){if(t&&"layoutName"in t)return t;const e=[...w(this,v,"f").values()];if(1===e.length)return e[0].identity;const i=e.find(t=>t.isVisible());return i?.identity??void 0}static async resolveLayout(t,e){const i=t.resolveLayoutIdentity(e);if(void 0===i||!("layoutName"in i))throw new Error("[layout-manager] resolveLayout: Could not resolve the layout identity. Make sure you include 'layoutName' in the identity object.");return w(C,g,"m",_).call(C,t,i.layoutName)}static async handleSharedView(t,e,i){await c(async t=>{if(t.identity.layoutName!==e.layoutName){const e=t.getCurrentViews().find(t=>t.name===i.name);e&&await t.onViewDetached({viewIdentity:e,target:null}).catch(console.error)}},w(t,v,"f"))}static async handleLastViewRemoved(t,e){await t.removeLayout(e),await w(t,f,"f").handleLastViewRemoved(t)}static async destroyLayout(t,{layoutName:e}){await w(C,g,"m",_).call(C,t,e).destroy(),w(t,v,"f").delete(e),u(w(t,f,"f").getWire(),"layout-destroyed",e)}static async createLayout(t,e){const{layoutName:i}=e;if(w(t,v,"f").has(i))throw new Error(`Layout name ${i} already exists`);await w(t,f,"f").createLayout(e,t),u(w(t,f,"f").getWire(),"layout-created",i)}static registerLayout(t,e,i){w(t,v,"f").set(e,i)}static getAllLayouts(t){return[...w(t,v,"f").values()]}static setInitialSnapshot(t,e){w(t,f,"f").setInitialSnapshot(e)}static createClosedConstructor(...t){return class extends C{constructor(){super(...t)}}}}g=C,f=new WeakMap,v=new WeakMap,_=function(t,e){const i=w(t,v,"f").get(e);if(!i)throw new Error(`[layout-manager] getLayoutByName: Could not locate layout with name '${e}'`);return i};class I{constructor(){this.valueToKey=new Map,this.keyToValue=new Map,this.setUnique=(t,e)=>{if(this.hasKey(t)||this.hasValue(e))throw new Error("Key or value already in the map.");this.keyToValue.set(t,e),this.valueToKey.set(e,t)},this.getKey=t=>{const e=this.valueToKey.get(t);if(!e)throw new Error("Value not found in the map.");return e},this.deleteKey=t=>{const e=this.getValue(t);return this.keyToValue.delete(t),this.valueToKey.delete(e),e},this.deleteValue=t=>{const e=this.getKey(t);return this.keyToValue.delete(e),this.valueToKey.delete(t),e},this.hasKey=t=>this.keyToValue.has(t),this.hasValue=t=>this.valueToKey.has(t)}getValue(t){const e=this.keyToValue.get(t);if(!e)throw new Error("Key not found in the map.");return e}}class b{constructor(){this.contentItemCache=new I,this.contentItemCacheId=0,this.createCacheKey=()=>{const t=`entity-${this.contentItemCacheId.toString()}`;return this.contentItemCacheId+=1,t},this.hasKey=t=>this.contentItemCache.hasKey(t),this.getItemOrUndefined=t=>{try{return this.getContentItemOrThrow(t)}catch(t){return}},this.getContentItemOrThrow=(t,e)=>{if(!this.contentItemCache.hasKey(t))throw new Error("Layout component has been destroyed or detached from the current layout.");const i=this.contentItemCache.getValue(t);if(e&&!e.includes(i.type))throw new Error(`Layout item is not the expected type. Expected ${e.join(", ")}, got ${i.type}.`);return i},this.getOrCreateEntityId=t=>{if(this.contentItemCache.hasValue(t))return this.contentItemCache.getKey(t);t.onDestroyed(()=>{this.contentItemCache.deleteValue(t)});const e=this.createCacheKey();return this.contentItemCache.setUnique(e,t),e}}static getSingleInstance(){return b.singleton.getValue()}}b.singleton=new t.Lazy(()=>new b);const S=(t,e)=>{const{parent:i}=t;if(t.isRoot()||!i)return;const n=["top","bottom"].includes(e)?"column":"row",o=["top","left"].includes(e)?-1:1;if(i.type===n){const e=i.contentItems.indexOf(t)+o;if(e>=0&&e<i.contentItems.length)return i.contentItems[e]}return S(i,e)};var E,x=function(t,e,i,n){var o,s=arguments.length,r=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(s<3?o(r):s>3?o(e,i,r):o(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r};class L{constructor(t,e,i){this.wire=t,this.layoutManager=e,this.layoutContentCache=i,this.analytics=t=>{this.wire.sendAction(`layout-controller-${t}`).catch(()=>{})},this.getLayoutIdentityForViewOrThrow=async t=>{const e=this.layoutManager.getLayoutIdentityForView(t);if(!e)throw new Error(`View identity ${t.name} is not attached to any layouts.`);return e},this.getRoot=async t=>{this.analytics("get-root");const e=(await this.getLayout(t)).getRoot();return{type:e.type,entityId:this.layoutContentCache.getOrCreateEntityId(e)}},this.getStackByView=async t=>{this.analytics("get-stack-by-view");const e=await this.getLayoutIdentityForViewOrThrow(t),i=(await this.getLayout(e)).getStackByView(t);if("stack"===i?.type)return{entityId:this.layoutContentCache.getOrCreateEntityId(i),type:"stack"}},this.getStackViews=t=>{this.analytics("get-stack-views");return this.layoutContentCache.getContentItemOrThrow(t,["stack"]).contentItems.map(t=>({name:t.viewName,uuid:this.wire.me.uuid}))},this.isRoot=t=>{this.analytics("is-root");return this.layoutContentCache.getContentItemOrThrow(t).isRoot()},this.exists=t=>(this.analytics("exists"),this.layoutContentCache.hasKey(t)),this.addViewToStack=async(t,e,{index:i,displayState:n}={index:0,displayState:"focused"})=>{this.analytics("add-view-to-stack");const o=this.layoutContentCache.getContentItemOrThrow(t);if(i&&i>o.contentItems.length+1)throw new Error(`Index '${i}' out of range, please exclude the index or specify a number between 0 and ${o.contentItems.length}`);const s={id:t,index:i,displayState:n},{identity:r}=await o.layout.platformCreateView(e,{location:s});return r},this.findViewInStack=(t,e)=>t.contentItems.find(t=>t.viewName===e.name),this.removeViewFromStack=async(t,e)=>{this.analytics("remove-view-from-stack");const i=this.layoutContentCache.getContentItemOrThrow(t,["stack"]),n=this.findViewInStack(i,e);if(!n)throw new Error(`Tried to remove a view ('${e.name}') which does not belong to the stack.`);await n.layout.platformCloseView(e)},this.createAdjacentStack=async(t,e,{position:i="right"}={})=>{if(this.analytics("create-adjacent-stack"),!Array.isArray(e)||0===e.length)throw new Error('The parameter "views" must be an array with at least 1 element.');if(!["top","bottom","left","right"].includes(i))throw new Error(`Invalid position '${i}' specified.`);const n=this.layoutContentCache.getContentItemOrThrow(t).createAdjacentStack({position:i}),o=this.layoutContentCache.getOrCreateEntityId(n);return await Promise.all(e.reverse().map(t=>this.addViewToStack(o,t))),o},this.getAdjacentStacks=async({targetId:t,edge:e})=>{this.analytics("get-adjacent-stacks");return((t,e)=>{const i=["top","bottom"].includes(e)?"row":"column",n=o=>"stack"===o.type?((t,e,i)=>{const n=t.getBounds(),o=e.getBounds();return!(!n||!o)&&(["top","bottom"].includes(i)?!(n.right<o.left||n.left>o.right):!(n.bottom<o.top||n.top>o.bottom))})(t,o,e)?[o]:[]:"root"===o.type||"ground"===o.type?[]:o.type===i?o.contentItems.map(t=>n(t)).flat():o.type!==i?["top","right"].includes(e)?n(o.contentItems[o.contentItems.length-1]):n(o.contentItems[0]):[],o=S(t,e);return o?n(o):[]})(this.layoutContentCache.getContentItemOrThrow(t),e).map(t=>({entityId:this.layoutContentCache.getOrCreateEntityId(t)}))},this.setStackActiveView=async(t,e)=>{this.analytics("set-stack-active-view");const i=this.layoutContentCache.getContentItemOrThrow(t,["stack"]),n=this.findViewInStack(i,e);if(!n)throw new Error(`Tried to set a view ('${e.name}') as active when it does not belong to the stack.`);i.setActiveContentItem(n,!0)}}async getLayout(t){const e=await C.resolveLayout(this.layoutManager,t);if(!e)throw new Error(`Could not resolve target layout identity ${JSON.stringify(t)}`);return e}getContent(t){this.analytics("get-content");return this.layoutContentCache.getContentItemOrThrow(t,["column","row"]).contentItems.map(t=>({type:t.type,entityId:this.layoutContentCache.getOrCreateEntityId(t)}))}getParent(t){this.analytics("get-parent");const e=this.layoutContentCache.getContentItemOrThrow(t);if(!e.isRoot())return e.parent?.contentItems.includes(e)?{type:e.parent.type,entityId:this.layoutContentCache.getOrCreateEntityId(e.parent)}:void 0}}async function z(e,i){const n=e.getFin(),o=await n.Platform.getCurrentSync().getClient(),s=new h(o);await new l(s).exposeInstance(new L(e,i,b.getSingleInstance()),{id:t.LAYOUT_CONTROLLER_ID}),await async function(t,e){const i=t=>async i=>{const n=await C.resolveLayout(e,i.target);if(!n)throw new Error(`Could not resolve the layout target from payload ${JSON.stringify(i)}`);return t(n,i)},n=(e,n)=>{t.register(e,i(n))},o=(t,e)=>{n(t,e)};n("replace-view",(t,e)=>t.replaceView(e)),n("replace-layout",(t,{layout:e})=>t.replaceLayout(e)),n("add-view",(t,e)=>t.insertView(e)),o("layout-add-view",(t,{viewOptions:e,location:i,targetView:n})=>t.platformCreateView(e,{location:i,targetView:n})),n("close-view",(t,e)=>t.cleanupView(e.viewIdentity)),o("layout-close-view",(t,e)=>t.platformCloseView(e.viewIdentity)),n("apply-preset-layout",(t,e)=>t.applyPreset(e)),n("get-layout-views",t=>t.getCurrentViews()),n("get-frame-snapshot",t=>t.getFrameSnapshot()),n("is-visible",t=>t.isVisible()),n("destroy",t=>t.destroy()),t.register("get-layout-snapshot",()=>e.getLayoutSnapshot())}(o,i)}x([a()],L.prototype,"getLayoutIdentityForViewOrThrow",void 0),x([a()],L.prototype,"getRoot",void 0),x([a()],L.prototype,"getStackByView",void 0),x([a()],L.prototype,"getStackViews",void 0),x([a()],L.prototype,"getContent",null),x([a()],L.prototype,"getParent",null),x([a()],L.prototype,"isRoot",void 0),x([a()],L.prototype,"exists",void 0),x([a()],L.prototype,"addViewToStack",void 0),x([a()],L.prototype,"removeViewFromStack",void 0),x([a()],L.prototype,"createAdjacentStack",void 0),x([a()],L.prototype,"getAdjacentStacks",void 0),x([a()],L.prototype,"setStackActiveView",void 0);class M{}class P{constructor(t){this.container=t}dispatchLocalEvent(t,e){const i={...e,type:t,tabSelector:`tab-${e.name}`,containerSelector:`container-${e.name}`,topic:"openfin-DOM-event"};this.container.dispatchEvent(new CustomEvent(t,{detail:i}))}}class T extends Error{constructor(t,e){super(e),this.type=t}}class A extends T{constructor(t,e){super("Configuration",t),this.node=e}}class k extends T{constructor(t){super("PopoutBlocked",t)}}class D extends T{constructor(t){super("API",t)}}class R extends T{constructor(t){super("Bind",t)}}class O extends Error{constructor(t,e,i){super(`${t}: ${e}${void 0===i?"":": "+i}`)}}class B extends O{constructor(t,e){super("Assert",t,e)}}class U extends O{constructor(t,e,i){super("UnreachableCase",t,`${e}${void 0===i?"":": "+i}`)}}class V extends O{constructor(t,e){super("UnexpectedNull",t,e)}}class W extends O{constructor(t,e){super("UnexpectedUndefined",t,e)}}!function(t){let e=!1;const i={PopoutCannotBeCreatedWithGroundItemConfig:{id:0,default:"Popout cannot be created with ground ItemConfig"},PleaseRegisterAConstructorFunction:{id:1,default:"Please register a constructor function"},ComponentTypeNotRegisteredAndBindComponentEventHandlerNotAssigned:{id:2,default:"Component type not registered and BindComponentEvent handler not assigned"},ComponentIsAlreadyRegistered:{id:3,default:"Component is already registered"},ComponentIsNotVirtuable:{id:4,default:"Component is not virtuable. Requires rootHtmlElement field/getter"},VirtualComponentDoesNotHaveRootHtmlElement:{id:5,default:'Virtual component does not have getter "rootHtmlElement"'},ItemConfigIsNotTypeComponent:{id:6,default:"ItemConfig is not of type component"},InvalidNumberPartInSizeString:{id:7,default:"Invalid number part in size string"},UnknownUnitInSizeString:{id:8,default:"Unknown unit in size string"},UnsupportedUnitInSizeString:{id:9,default:"Unsupported unit in size string"}};t.idCount=Object.keys(i).length;const n=Object.values(i);t.checkInitialise=function(){if(!e)for(let e=0;e<t.idCount;e++){const t=n[e];if(t.id!==e)throw new B("INSI00110",`${e}: ${t.id}`);H[e]=t.default}e=!0}}(E||(E={}));const H=new Array(E.idCount);var F,N,$,G;!function(t){t.defaultComponentBaseZIndex="auto",t.defaultComponentDragZIndex="32",t.defaultComponentStackMaximisedZIndex="41"}(F||(F={})),function(t){t.width="width",t.height="height"}(N||(N={})),function(t){t.top="top",t.left="left",t.right="right",t.bottom="bottom"}($||($={})),function(t){t.base="base",t.drag="drag",t.stackMaximised="stackMaximised"}(G||(G={}));const j={base:F.defaultComponentBaseZIndex,drag:F.defaultComponentDragZIndex,stackMaximised:F.defaultComponentStackMaximisedZIndex};var Z,q,X,Y,K,J,Q,tt,et,it,nt,ot,st,rt,at,lt,ht,dt,ct,ut,mt,pt;function gt(t){return t.toString(10)+"px"}function ft(t){const e=t.replace("px","");return parseFloat(e)}function vt(t){return t>="0"&&t<="9"}function _t(t,e){const i=gt(e);t.style.width=i}function yt(t,e){const i=gt(e);t.style.height=i}function wt(t){return{width:t.offsetWidth,height:t.offsetHeight}}function Ct(t,e){t.style.display=e?"":"none"}function It(t,e){if(void 0!==e)for(const i in e)if(e.hasOwnProperty(i)){const n=e[i],o=t[i];t[i]=bt(o,n)}return t}function bt(t,e){if("object"!=typeof e)return e;if(Array.isArray(e)){const t=e.length,i=new Array(t);for(let n=0;n<t;n++){const t=e[n];i[n]=bt({},t)}return i}if(null===e)return null;{const i=e;if(void 0===t)return It({},i);if("object"!=typeof t)return It({},i);if(Array.isArray(t))return It({},i);if(null===t)return It({},i);return It(t,i)}}function St(){return(1e15*Math.random()).toString(36).replace(".","")}function Et(t,e){const{numericPart:i,firstNonNumericCharPart:n}=function(t){const e=(t=t.trimStart()).length;if(0===e)return{numericPart:"",firstNonNumericCharPart:""};{let i=e,n=!1;for(let o=0;o<e;o++){const e=t[o];if(!vt(e)){if("."!==e){i=o;break}if(n){i=o;break}n=!0}}return{numericPart:t.substring(0,i),firstNonNumericCharPart:t.substring(i).trim()}}}(t),o=Number.parseInt(i,10);if(isNaN(o))throw new A(`${H[7]}: ${t}`);{const i=Y.tryParse(n);if(void 0===i)throw new A(`${H[8]}: ${t}`);if(e.includes(i))return{size:o,sizeUnit:i};throw new A(`${H[9]}: ${t}`)}}function xt(t,e){return t.toString(10)+Y.format(e)}function Lt(t,e){return void 0===t?void 0:t.toString(10)+Y.format(e)}!function(t){function e(t){return!Array.isArray(t)&&null!==t&&"object"==typeof t}t.isJson=function(t){return e(t)},t.isJsonObject=e}(Z||(Z={})),function(t){t.ground="ground",t.row="row",t.column="column",t.stack="stack",t.component="component"}(q||(q={})),function(t){t.none="none",t.always="always",t.onload="onload"}(X||(X={})),function(t){t.Pixel="px",t.Percent="%",t.Fractional="fr",t.Em="em"}(Y||(Y={})),function(t){t.tryParse=function(e){switch(e){case t.Pixel:return t.Pixel;case t.Percent:return t.Percent;case t.Fractional:return t.Fractional;case t.Em:return t.Em;default:return}},t.format=function(e){switch(e){case t.Pixel:return t.Pixel;case t.Percent:return t.Percent;case t.Fractional:return t.Fractional;case t.Em:return t.Em;default:throw new U("SUEF44998",e)}}}(Y||(Y={})),function(t){const e=["settings","hasHeaders","constrainDragToContainer","selectionEnabled","dimensions","borderWidth","minItemHeight","minItemWidth","headerHeight","dragProxyWidth","dragProxyHeight","labels","close","maximise","minimise","popout","content","componentType","componentState","id","width","type","height","isClosable","title","popoutWholeStack","openPopouts","parentId","activeItemIndex","reorderEnabled","borderGrabWidth"],i=[!0,!1,"row","column","stack","component","close","maximise","minimise","open in new window"];function n(t,e){const i={};for(const n in t)if(t.hasOwnProperty(n)){let a;a=e?s(n):r(n);const l=t[n];i[a]=o(l,e)}return i}function o(t,e){return"object"==typeof t?null===t?null:Array.isArray(t)?function(t,e){const i=t.length,n=new Array(i);for(let s=0;s<i;s++){const i=t[s];n[s]=o(i,e)}return n}(t,e):n(t,e):e?function(t){if("string"==typeof t&&1===t.length)return"___"+t;const e=function(t){for(let e=0;e<i.length;e++)if(i[e]===t)return e;return-1}(t);return-1===e?t:e.toString(36)}(t):function(t){if("string"==typeof t&&1===t.length)return i[parseInt(t,36)];if("string"==typeof t&&"___"===t.substr(0,3))return t[3];return t}(t)}function s(t){if("string"==typeof t&&1===t.length)return"___"+t;const i=function(t){for(let i=0;i<e.length;i++)if(e[i]===t)return i;return-1}(t);return-1===i?t:i.toString(36)}function r(t){return 1===t.length?e[parseInt(t,36)]:"___"===t.substr(0,3)?t[3]:t}t.checkInitialise=function(){if(e.length>36)throw new Error("Too many keys in config minifier map")},t.translateObject=n}(K||(K={})),function(t){t.defaults={type:q.ground,content:[],size:1,sizeUnit:Y.Fractional,minSize:void 0,minSizeUnit:Y.Pixel,id:"",isClosable:!0},t.createCopy=function(t,e){switch(t.type){case q.ground:case q.row:case q.column:return it.createCopy(t,e);case q.stack:return tt.createCopy(t,e);case q.component:return et.createCopy(t);default:throw new U("CICC91354",t.type,"Invalid Config Item type specified")}},t.createDefault=function(t){switch(t){case q.ground:throw new B("CICCDR91562");case q.row:case q.column:return it.createDefault(t);case q.stack:return tt.createDefault();case q.component:return et.createDefault();default:throw new U("CICCDD91563",t,"Invalid Config Item type specified")}},t.isComponentItem=function(t){return t.type===q.component},t.isStackItem=function(t){return t.type===q.stack},t.isGroundItem=function(t){return t.type===q.ground}}(J||(J={})),function(t){t.defaultMaximised=!1,function(t){t.createCopy=function(t,e){return void 0===t?void 0:{show:null!=e?e:t.show,popout:t.popout,close:t.close,maximise:t.maximise,minimise:t.minimise,tabDropdown:t.tabDropdown}}}(t.Header||(t.Header={}))}(Q||(Q={})),function(t){function e(t){const e=t.length,i=new Array(e);for(let n=0;n<e;n++)i[n]=J.createCopy(t[n]);return i}t.defaultActiveItemIndex=0,t.createCopy=function(t,i){return{type:t.type,content:e(void 0!==i?i:t.content),size:t.size,sizeUnit:t.sizeUnit,minSize:t.minSize,minSizeUnit:t.minSizeUnit,id:t.id,maximised:t.maximised,isClosable:t.isClosable,activeItemIndex:t.activeItemIndex,header:Q.Header.createCopy(t.header)}},t.copyContent=e,t.createDefault=function(){return{type:q.stack,content:[],size:J.defaults.size,sizeUnit:J.defaults.sizeUnit,minSize:J.defaults.minSize,minSizeUnit:J.defaults.minSizeUnit,id:J.defaults.id,maximised:Q.defaultMaximised,isClosable:J.defaults.isClosable,activeItemIndex:t.defaultActiveItemIndex,header:void 0}}}(tt||(tt={})),function(t){t.defaultReorderEnabled=!0,t.resolveComponentTypeName=function(t){const e=t.componentType;return"string"==typeof e?e:void 0},t.createCopy=function(t){return{type:t.type,content:[],size:t.size,sizeUnit:t.sizeUnit,minSize:t.minSize,minSizeUnit:t.minSizeUnit,id:t.id,maximised:t.maximised,isClosable:t.isClosable,reorderEnabled:t.reorderEnabled,title:t.title,header:Q.Header.createCopy(t.header),componentType:t.componentType,componentState:bt(void 0,t.componentState)}},t.createDefault=function(e="",i,n=""){return{type:q.component,content:[],size:J.defaults.size,sizeUnit:J.defaults.sizeUnit,minSize:J.defaults.minSize,minSizeUnit:J.defaults.minSizeUnit,id:J.defaults.id,maximised:Q.defaultMaximised,isClosable:J.defaults.isClosable,reorderEnabled:t.defaultReorderEnabled,title:n,header:void 0,componentType:e,componentState:i}},t.copyComponentType=function(t){return bt({},t)}}(et||(et={})),function(t){function e(t){const e=t.length,i=new Array(e);for(let n=0;n<e;n++)i[n]=J.createCopy(t[n]);return i}t.isChildItemConfig=function(t){switch(t.type){case q.row:case q.column:case q.stack:case q.component:return!0;case q.ground:return!1;default:throw new U("CROCOSPCICIC13687",t.type)}},t.createCopy=function(t,i){return{type:t.type,content:e(void 0!==i?i:t.content),size:t.size,sizeUnit:t.sizeUnit,minSize:t.minSize,minSizeUnit:t.minSizeUnit,id:t.id,isClosable:t.isClosable}},t.copyContent=e,t.createDefault=function(t){return{type:t,content:[],size:J.defaults.size,sizeUnit:J.defaults.sizeUnit,minSize:J.defaults.minSize,minSizeUnit:J.defaults.minSizeUnit,id:J.defaults.id,isClosable:J.defaults.isClosable}}}(it||(it={})),function(t){t.createCopy=function(t){return J.createCopy(t)},t.isRootItemConfig=function(t){switch(t.type){case q.row:case q.column:case q.stack:case q.component:return!0;case q.ground:return!1;default:throw new U("CROCOSPCICIC13687",t.type)}}}(nt||(nt={})),function(t){t.create=function(t){const e=void 0===t?[]:[t];return{type:q.ground,content:e,size:100,sizeUnit:Y.Percent,minSize:0,minSizeUnit:Y.Pixel,id:"",isClosable:!1,title:"",reorderEnabled:!1}}}(ot||(ot={})),function(t){var e,i;function n(t){return"parentId"in t}(e=t.Settings||(t.Settings={})).defaults={constrainDragToContainer:!0,reorderEnabled:!0,popoutWholeStack:!1,blockedPopoutsThrowError:!0,closePopoutsOnUnload:!0,responsiveMode:X.none,tabOverlapAllowance:0,reorderOnTabMenuClick:!0,tabControlOffset:10,popInOnClose:!1,disableTabOverflowDropdown:!1,tabOverflowBehavior:"dropdown"},e.createCopy=function(t){return{constrainDragToContainer:t.constrainDragToContainer,reorderEnabled:t.reorderEnabled,popoutWholeStack:t.popoutWholeStack,blockedPopoutsThrowError:t.blockedPopoutsThrowError,closePopoutsOnUnload:t.closePopoutsOnUnload,responsiveMode:t.responsiveMode,tabOverlapAllowance:t.tabOverlapAllowance,reorderOnTabMenuClick:t.reorderOnTabMenuClick,tabControlOffset:t.tabControlOffset,popInOnClose:t.popInOnClose,disableTabOverflowDropdown:t.disableTabOverflowDropdown,tabOverflowBehavior:t.tabOverflowBehavior}},(i=t.Dimensions||(t.Dimensions={})).createCopy=function(t){return{borderWidth:t.borderWidth,borderGrabWidth:t.borderGrabWidth,defaultMinItemHeight:t.defaultMinItemHeight,defaultMinItemHeightUnit:t.defaultMinItemHeightUnit,defaultMinItemWidth:t.defaultMinItemWidth,defaultMinItemWidthUnit:t.defaultMinItemWidthUnit,headerHeight:t.headerHeight,dragProxyWidth:t.dragProxyWidth,dragProxyHeight:t.dragProxyHeight}},i.defaults={borderWidth:5,borderGrabWidth:5,defaultMinItemHeight:0,defaultMinItemHeightUnit:Y.Pixel,defaultMinItemWidth:10,defaultMinItemWidthUnit:Y.Pixel,headerHeight:20,dragProxyWidth:300,dragProxyHeight:200},function(t){t.createCopy=function(t){return{show:t.show,popout:t.popout,dock:t.dock,close:t.close,maximise:t.maximise,minimise:t.minimise,tabDropdown:t.tabDropdown}},t.defaults={show:$.top,popout:"open in new window",dock:"dock",maximise:"maximise",minimise:"minimise",close:"close",tabDropdown:"additional tabs"}}(t.Header||(t.Header={})),t.isPopout=n,t.createDefault=function(){return{root:void 0,openPopouts:[],dimensions:t.Dimensions.defaults,settings:t.Settings.defaults,header:t.Header.defaults,resolved:!0}},t.createCopy=function(e){return n(e)?rt.createCopy(e):{root:void 0===e.root?void 0:nt.createCopy(e.root),openPopouts:t.copyOpenPopouts(e.openPopouts),settings:t.Settings.createCopy(e.settings),dimensions:t.Dimensions.createCopy(e.dimensions),header:t.Header.createCopy(e.header),resolved:e.resolved}},t.copyOpenPopouts=function(t){const e=t.length,i=new Array(e);for(let n=0;n<e;n++)i[n]=rt.createCopy(t[n]);return i},t.minifyConfig=function(t){return K.translateObject(t,!0)},t.unminifyConfig=function(t){return K.translateObject(t,!1)}}(st||(st={})),function(t){var e;(e=t.Window||(t.Window={})).createCopy=function(t){return{width:t.width,height:t.height,left:t.left,top:t.top}},e.defaults={width:null,height:null,left:null,top:null},t.createCopy=function(e){return{root:void 0===e.root?void 0:nt.createCopy(e.root),openPopouts:st.copyOpenPopouts(e.openPopouts),settings:st.Settings.createCopy(e.settings),dimensions:st.Dimensions.createCopy(e.dimensions),header:st.Header.createCopy(e.header),parentId:e.parentId,indexInParent:e.indexInParent,window:t.Window.createCopy(e.window),resolved:e.resolved}}}(rt||(rt={})),function(t){t.resolve=function(t,e){switch(t.type){case q.ground:throw new A("ItemConfig cannot specify type ground",JSON.stringify(t));case q.row:case q.column:return ct.resolve(t,e);case q.stack:return ht.resolve(t,e);case q.component:return dt.resolve(t,e);default:throw new U("UCUICR55499",t.type)}},t.resolveContent=function(e){if(void 0===e)return[];{const i=e.length,n=new Array(i);for(let o=0;o<i;o++)n[o]=t.resolve(e[o],!1);return n}},t.resolveId=function(t){return void 0===t?J.defaults.id:Array.isArray(t)?0===t.length?J.defaults.id:t[0]:t},t.resolveSize=function(t,e,i,n){if(void 0!==t)return Et(t,[Y.Percent,Y.Fractional]);if(void 0!==e||void 0!==i){if(void 0!==e)return{size:e,sizeUnit:Y.Percent};if(void 0!==i)return{size:i,sizeUnit:Y.Percent};throw new W("CRS33390")}return n?{size:50,sizeUnit:Y.Percent}:{size:J.defaults.size,sizeUnit:J.defaults.sizeUnit}},t.resolveMinSize=function(t,e,i){if(void 0!==t)return Et(t,[Y.Pixel]);{const t=void 0!==e;return t||void 0!==i?t?{size:e,sizeUnit:Y.Pixel}:{size:i,sizeUnit:Y.Pixel}:{size:J.defaults.minSize,sizeUnit:J.defaults.minSizeUnit}}},t.calculateSizeWidthHeightSpecificationType=function(t){return void 0!==t.size?1:void 0!==t.width||void 0!==t.height?2:0},t.isGround=function(t){return t.type===q.ground},t.isRow=function(t){return t.type===q.row},t.isColumn=function(t){return t.type===q.column},t.isStack=function(t){return t.type===q.stack},t.isComponent=function(t){return t.type===q.component}}(at||(at={})),function(t){!function(t){t.resolve=function(t,e){var i;if(void 0!==t||void 0!==e){return{show:null!==(i=null==t?void 0:t.show)&&void 0!==i?i:void 0===e?void 0:!!e&&st.Header.defaults.show,popout:null==t?void 0:t.popout,maximise:null==t?void 0:t.maximise,close:null==t?void 0:t.close,minimise:null==t?void 0:t.minimise,tabDropdown:null==t?void 0:t.tabDropdown}}}}(t.Header||(t.Header={})),t.resolveIdAndMaximised=function(t){let e,i,n=t.id,o=!1;if(void 0===n)e=J.defaults.id;else if(Array.isArray(n)){const t=n.findIndex(t=>"__glMaximised"===t);t>0&&(o=!0,n=n.splice(t,1)),e=n.length>0?n[0]:J.defaults.id}else e=n;return i=void 0!==t.maximised?t.maximised:o,{id:e,maximised:i}}}(lt||(lt={})),function(t){function e(t){if(void 0===t)return[];{const e=t.length,i=new Array(e);for(let n=0;n<e;n++){const e=t[n],o=at.resolve(e,!1);if(!J.isComponentItem(o))throw new B("UCUSICRC91114",JSON.stringify(o));i[n]=o}return i}}function i(t){const e=t.length,i=new Array(e);for(let n=0;n<e;n++){const e=t[n];i[n]=dt.fromResolved(e)}return i}t.resolve=function(t,i){var n,o;const{id:s,maximised:r}=lt.resolveIdAndMaximised(t),{size:a,sizeUnit:l}=at.resolveSize(t.size,t.width,t.height,i),{size:h,sizeUnit:d}=at.resolveMinSize(t.minSize,t.minWidth,t.minHeight);return{type:q.stack,content:e(t.content),size:a,sizeUnit:l,minSize:h,minSizeUnit:d,id:s,maximised:r,isClosable:null!==(n=t.isClosable)&&void 0!==n?n:J.defaults.isClosable,activeItemIndex:null!==(o=t.activeItemIndex)&&void 0!==o?o:tt.defaultActiveItemIndex,header:lt.Header.resolve(t.header,t.hasHeaders)}},t.fromResolved=function(t){return{type:q.stack,content:i(t.content),size:xt(t.size,t.sizeUnit),minSize:Lt(t.minSize,t.minSizeUnit),id:t.id,maximised:t.maximised,isClosable:t.isClosable,activeItemIndex:t.activeItemIndex,header:Q.Header.createCopy(t.header)}}}(ht||(ht={})),function(t){t.resolve=function(e,i){var n,o,s;let r=e.componentType;if(void 0===r&&(r=e.componentName),void 0===r)throw new Error("ComponentItemConfig.componentType is undefined");{const{id:a,maximised:l}=lt.resolveIdAndMaximised(e);let h;h=void 0===e.title||""===e.title?t.componentTypeToTitle(r):e.title;const{size:d,sizeUnit:c}=at.resolveSize(e.size,e.width,e.height,i),{size:u,sizeUnit:m}=at.resolveMinSize(e.minSize,e.minWidth,e.minHeight);return{type:e.type,content:[],size:d,sizeUnit:c,minSize:u,minSizeUnit:m,id:a,maximised:l,isClosable:null!==(n=e.isClosable)&&void 0!==n?n:J.defaults.isClosable,reorderEnabled:null!==(o=e.reorderEnabled)&&void 0!==o?o:et.defaultReorderEnabled,title:h,header:lt.Header.resolve(e.header,e.hasHeaders),componentType:r,componentState:null!==(s=e.componentState)&&void 0!==s?s:{}}}},t.fromResolved=function(t){return{type:q.component,size:xt(t.size,t.sizeUnit),minSize:Lt(t.minSize,t.minSizeUnit),id:t.id,maximised:t.maximised,isClosable:t.isClosable,reorderEnabled:t.reorderEnabled,title:t.title,header:Q.Header.createCopy(t.header),componentType:t.componentType,componentState:bt(void 0,t.componentState)}},t.componentTypeToTitle=function(t){switch(typeof t){case"string":return t;case"number":case"boolean":return t.toString();default:return""}}}(dt||(dt={})),function(t){function e(e){const i=e.length,n=new Array(i);for(let o=0;o<i;o++){const i=e[o],s=i.type;let r;switch(s){case q.row:case q.column:r=t.fromResolved(i);break;case q.stack:r=ht.fromResolved(i);break;case q.component:r=dt.fromResolved(i);break;default:throw new U("ROCICFRC44797",s)}n[o]=r}return n}t.isChildItemConfig=function(t){switch(t.type){case q.row:case q.column:case q.stack:case q.component:return!0;case q.ground:return!1;default:throw new U("UROCOSPCICIC13687",t.type)}},t.resolve=function(e,i){var n;const{size:o,sizeUnit:s}=at.resolveSize(e.size,e.width,e.height,i),{size:r,sizeUnit:a}=at.resolveMinSize(e.minSize,e.minWidth,e.minHeight);return{type:e.type,content:t.resolveContent(e.content),size:o,sizeUnit:s,minSize:r,minSizeUnit:a,id:at.resolveId(e.id),isClosable:null!==(n=e.isClosable)&&void 0!==n?n:J.defaults.isClosable}},t.fromResolved=function(t){return{type:t.type,content:e(t.content),size:xt(t.size,t.sizeUnit),minSize:Lt(t.minSize,t.minSizeUnit),id:t.id,isClosable:t.isClosable}},t.resolveContent=function(e){if(void 0===e)return[];{const i=e.length,n=new Array(i);let o,s=!1,r=!1;for(let o=0;o<i;o++){const i=e[o];if(!t.isChildItemConfig(i))throw new A("ItemConfig is not Row, Column or Stack",i);if(!r){const t=at.calculateSizeWidthHeightSpecificationType(i);switch(t){case 0:break;case 2:s=!0;break;case 1:r=!0;break;default:throw new U("ROCICRC87556",t)}}n[o]=i}o=!r&&!!s;const a=new Array(i);for(let t=0;t<i;t++){const e=n[t],i=at.resolve(e,o);if(!it.isChildItemConfig(i))throw new B("UROCOSPIC99512",JSON.stringify(i));a[t]=i}return a}}}(ct||(ct={})),function(t){t.isRootItemConfig=function(t){switch(t.type){case q.row:case q.column:case q.stack:case q.component:return!0;case q.ground:return!1;default:throw new U("URICIR23687",t.type)}},t.resolve=function(t){if(void 0!==t){const e=at.resolve(t,!1);if(nt.isRootItemConfig(e))return e;throw new A("ItemConfig is not Row, Column or Stack",JSON.stringify(t))}},t.fromResolvedOrUndefined=function(t){if(void 0!==t){const e=t.type;switch(e){case q.row:case q.column:return ct.fromResolved(t);case q.stack:return ht.fromResolved(t);case q.component:return dt.fromResolved(t);default:throw new U("RICFROU89921",e)}}}}(ut||(ut={})),function(t){var e;function i(t){return"parentId"in t||"indexInParent"in t||"window"in t}(t.Settings||(t.Settings={})).resolve=function(t){var e,i,n,o,s,r,a,l,h,d,c,u;return{constrainDragToContainer:null!==(e=null==t?void 0:t.constrainDragToContainer)&&void 0!==e?e:st.Settings.defaults.constrainDragToContainer,reorderEnabled:null!==(i=null==t?void 0:t.reorderEnabled)&&void 0!==i?i:st.Settings.defaults.reorderEnabled,popoutWholeStack:null!==(n=null==t?void 0:t.popoutWholeStack)&&void 0!==n?n:st.Settings.defaults.popoutWholeStack,blockedPopoutsThrowError:null!==(o=null==t?void 0:t.blockedPopoutsThrowError)&&void 0!==o?o:st.Settings.defaults.blockedPopoutsThrowError,closePopoutsOnUnload:null!==(s=null==t?void 0:t.closePopoutsOnUnload)&&void 0!==s?s:st.Settings.defaults.closePopoutsOnUnload,responsiveMode:null!==(r=null==t?void 0:t.responsiveMode)&&void 0!==r?r:st.Settings.defaults.responsiveMode,tabOverlapAllowance:null!==(a=null==t?void 0:t.tabOverlapAllowance)&&void 0!==a?a:st.Settings.defaults.tabOverlapAllowance,reorderOnTabMenuClick:null!==(l=null==t?void 0:t.reorderOnTabMenuClick)&&void 0!==l?l:st.Settings.defaults.reorderOnTabMenuClick,tabControlOffset:null!==(h=null==t?void 0:t.tabControlOffset)&&void 0!==h?h:st.Settings.defaults.tabControlOffset,popInOnClose:null!==(d=null==t?void 0:t.popInOnClose)&&void 0!==d?d:st.Settings.defaults.popInOnClose,disableTabOverflowDropdown:null!==(c=null==t?void 0:t.disableTabOverflowDropdown)&&void 0!==c?c:st.Settings.defaults.disableTabOverflowDropdown,tabOverflowBehavior:null!==(u=null==t?void 0:t.tabOverflowBehavior)&&void 0!==u?u:st.Settings.defaults.tabOverflowBehavior}},(e=t.Dimensions||(t.Dimensions={})).resolve=function(t){var i,n,o,s,r;const{size:a,sizeUnit:l}=e.resolveDefaultMinItemHeight(t),{size:h,sizeUnit:d}=e.resolveDefaultMinItemWidth(t);return{borderWidth:null!==(i=null==t?void 0:t.borderWidth)&&void 0!==i?i:st.Dimensions.defaults.borderWidth,borderGrabWidth:null!==(n=null==t?void 0:t.borderGrabWidth)&&void 0!==n?n:st.Dimensions.defaults.borderGrabWidth,defaultMinItemHeight:a,defaultMinItemHeightUnit:l,defaultMinItemWidth:h,defaultMinItemWidthUnit:d,headerHeight:null!==(o=null==t?void 0:t.headerHeight)&&void 0!==o?o:st.Dimensions.defaults.headerHeight,dragProxyWidth:null!==(s=null==t?void 0:t.dragProxyWidth)&&void 0!==s?s:st.Dimensions.defaults.dragProxyWidth,dragProxyHeight:null!==(r=null==t?void 0:t.dragProxyHeight)&&void 0!==r?r:st.Dimensions.defaults.dragProxyHeight}},e.fromResolved=function(t){return{borderWidth:t.borderWidth,borderGrabWidth:t.borderGrabWidth,defaultMinItemHeight:xt(t.defaultMinItemHeight,t.defaultMinItemHeightUnit),defaultMinItemWidth:xt(t.defaultMinItemWidth,t.defaultMinItemWidthUnit),headerHeight:t.headerHeight,dragProxyWidth:t.dragProxyWidth,dragProxyHeight:t.dragProxyHeight}},e.resolveDefaultMinItemHeight=function(t){const e=null==t?void 0:t.defaultMinItemHeight;return void 0===e?{size:st.Dimensions.defaults.defaultMinItemHeight,sizeUnit:st.Dimensions.defaults.defaultMinItemHeightUnit}:Et(e,[Y.Pixel])},e.resolveDefaultMinItemWidth=function(t){const e=null==t?void 0:t.defaultMinItemWidth;return void 0===e?{size:st.Dimensions.defaults.defaultMinItemWidth,sizeUnit:st.Dimensions.defaults.defaultMinItemWidthUnit}:Et(e,[Y.Pixel])},function(t){t.resolve=function(t,e,i){var n,o,s,r,a,l,h,d,c,u,m,p;let g;return g=void 0!==(null==t?void 0:t.show)?t.show:void 0!==e&&void 0!==e.hasHeaders?!!e.hasHeaders&&st.Header.defaults.show:st.Header.defaults.show,{show:g,popout:null!==(o=null!==(n=null==t?void 0:t.popout)&&void 0!==n?n:null==i?void 0:i.popout)&&void 0!==o?o:!1!==(null==e?void 0:e.showPopoutIcon)&&st.Header.defaults.popout,dock:null!==(r=null!==(s=null==t?void 0:t.popin)&&void 0!==s?s:null==i?void 0:i.popin)&&void 0!==r?r:st.Header.defaults.dock,maximise:null!==(l=null!==(a=null==t?void 0:t.maximise)&&void 0!==a?a:null==i?void 0:i.maximise)&&void 0!==l?l:!1!==(null==e?void 0:e.showMaximiseIcon)&&st.Header.defaults.maximise,close:null!==(d=null!==(h=null==t?void 0:t.close)&&void 0!==h?h:null==i?void 0:i.close)&&void 0!==d?d:!1!==(null==e?void 0:e.showCloseIcon)&&st.Header.defaults.close,minimise:null!==(u=null!==(c=null==t?void 0:t.minimise)&&void 0!==c?c:null==i?void 0:i.minimise)&&void 0!==u?u:st.Header.defaults.minimise,tabDropdown:null!==(p=null!==(m=null==t?void 0:t.tabDropdown)&&void 0!==m?m:null==i?void 0:i.tabDropdown)&&void 0!==p?p:st.Header.defaults.tabDropdown}}}(t.Header||(t.Header={})),t.isPopout=i,t.resolve=function(e){if(i(e))return pt.resolve(e);{let i;i=void 0!==e.root?e.root:void 0!==e.content&&e.content.length>0?e.content[0]:void 0;return{resolved:!0,root:ut.resolve(i),openPopouts:t.resolveOpenPopouts(e.openPopouts),dimensions:t.Dimensions.resolve(e.dimensions),settings:t.Settings.resolve(e.settings),header:t.Header.resolve(e.header,e.settings,e.labels)}}},t.fromResolved=function(e){return{root:ut.fromResolvedOrUndefined(e.root),openPopouts:pt.fromResolvedArray(e.openPopouts),settings:st.Settings.createCopy(e.settings),dimensions:t.Dimensions.fromResolved(e.dimensions),header:st.Header.createCopy(e.header)}},t.isResolved=function(t){const e=t;return void 0!==e.resolved&&!0===e.resolved},t.resolveOpenPopouts=function(t){if(void 0===t)return[];{const e=t.length,i=new Array(e);for(let n=0;n<e;n++)i[n]=pt.resolve(t[n]);return i}}}(mt||(mt={})),function(t){var e;function i(e){const i=e.length,n=new Array(i);for(let o=0;o<i;o++){const i=e[o];n[o]=t.fromResolved(i)}return n}(e=t.Window||(t.Window={})).resolve=function(t,e){var i,n,o,s,r,a,l,h;let d;const c=rt.Window.defaults;return d=void 0!==t?{width:null!==(i=t.width)&&void 0!==i?i:c.width,height:null!==(n=t.height)&&void 0!==n?n:c.height,left:null!==(o=t.left)&&void 0!==o?o:c.left,top:null!==(s=t.top)&&void 0!==s?s:c.top}:{width:null!==(r=null==e?void 0:e.width)&&void 0!==r?r:c.width,height:null!==(a=null==e?void 0:e.height)&&void 0!==a?a:c.height,left:null!==(l=null==e?void 0:e.left)&&void 0!==l?l:c.left,top:null!==(h=null==e?void 0:e.top)&&void 0!==h?h:c.top},d},e.fromResolved=function(t){return{width:null===t.width?void 0:t.width,height:null===t.height?void 0:t.height,left:null===t.left?void 0:t.left,top:null===t.top?void 0:t.top}},t.resolve=function(e){var i,n;let o;return o=void 0!==e.root?e.root:void 0!==e.content&&e.content.length>0?e.content[0]:void 0,{root:ut.resolve(o),openPopouts:mt.resolveOpenPopouts(e.openPopouts),dimensions:mt.Dimensions.resolve(e.dimensions),settings:mt.Settings.resolve(e.settings),header:mt.Header.resolve(e.header,e.settings,e.labels),parentId:null!==(i=e.parentId)&&void 0!==i?i:null,indexInParent:null!==(n=e.indexInParent)&&void 0!==n?n:null,window:t.Window.resolve(e.window,e.dimensions),resolved:!0}},t.fromResolved=function(e){return{root:ut.fromResolvedOrUndefined(e.root),openPopouts:i(e.openPopouts),dimensions:mt.Dimensions.fromResolved(e.dimensions),settings:st.Settings.createCopy(e.settings),header:st.Header.createCopy(e.header),parentId:e.parentId,indexInParent:e.indexInParent,window:t.Window.fromResolved(e.window)}},t.fromResolvedArray=i}(pt||(pt={}));class zt{constructor(){this._allEventSubscriptions=[],this._subscriptionsMap=new Map,this.unbind=this.removeEventListener,this.trigger=this.emit}tryBubbleEvent(t,e){}emit(t,...e){let i=this._subscriptionsMap.get(t);if(void 0!==i){i=i.slice();for(let t=0;t<i.length;t++){(0,i[t])(...e)}}this.emitAllEvent(t,e),this.tryBubbleEvent(t,e)}emitUnknown(t,...e){let i=this._subscriptionsMap.get(t);if(void 0!==i){i=i.slice();for(let t=0;t<i.length;t++)i[t](...e)}this.emitAllEvent(t,e),this.tryBubbleEvent(t,e)}emitBaseBubblingEvent(t){const e=new zt.BubblingEvent(t,this);this.emitUnknown(t,e)}emitUnknownBubblingEvent(t){const e=new zt.BubblingEvent(t,this);this.emitUnknown(t,e)}removeEventListener(t,e){const i=e;this.removeUnknownEventListener(t,i)}off(t,e){this.removeEventListener(t,e)}addEventListener(t,e){const i=e;this.addUnknownEventListener(t,i)}on(t,e){this.addEventListener(t,e)}addUnknownEventListener(t,e){if(t===zt.ALL_EVENT)this._allEventSubscriptions.push(e);else{let i=this._subscriptionsMap.get(t);void 0!==i?i.push(e):(i=[e],this._subscriptionsMap.set(t,i))}}removeUnknownEventListener(t,e){if(t===zt.ALL_EVENT)this.removeSubscription(t,this._allEventSubscriptions,e);else{const i=this._subscriptionsMap.get(t);if(void 0===i)throw new Error("No subscribtions to unsubscribe for event "+t);this.removeSubscription(t,i,e)}}removeSubscription(t,e,i){const n=e.indexOf(i);if(n<0)throw new Error("Nothing to unbind for "+t);e.splice(n,1)}emitAllEvent(t,e){const i=this._allEventSubscriptions.length;if(i>0){const n=e.slice();n.unshift(t);const o=this._allEventSubscriptions.slice();for(let t=0;t<i;t++)o[t](...n)}}}!function(t){t.ALL_EVENT="__all",t.headerClickEventName="stackHeaderClick",t.headerTouchStartEventName="stackHeaderTouchStart";class e{get name(){return this._name}get target(){return this._target}get origin(){return this._target}get isPropagationStopped(){return this._isPropagationStopped}constructor(t,e){this._name=t,this._target=e,this._isPropagationStopped=!1}stopPropagation(){this._isPropagationStopped=!0}}t.BubblingEvent=e;t.ClickBubblingEvent=class extends e{get mouseEvent(){return this._mouseEvent}constructor(t,e,i){super(t,e),this._mouseEvent=i}};t.TouchStartBubblingEvent=class extends e{get touchEvent(){return this._touchEvent}constructor(t,e,i){super(t,e),this._touchEvent=i}}}(zt||(zt={}));class Mt extends zt{get width(){return this._width}get height(){return this._height}get parent(){return this._parent}get componentName(){return this._componentType}get componentType(){return this._componentType}get virtual(){return this._boundComponent.virtual}get component(){return this._boundComponent.component}get tab(){return this._tab}get title(){return this._parent.title}get layoutManager(){return this._layoutManager}get isHidden(){return!this._visible}get visible(){return this._visible}get state(){return this._state}get initialState(){return this._initialState}get element(){return this._element}constructor(t,e,i,n,o,s,r,a,l){super(),this._config=t,this._parent=e,this._layoutManager=i,this._element=n,this._updateItemConfigEvent=o,this._showEvent=s,this._hideEvent=r,this._focusEvent=a,this._blurEvent=l,this._stackMaximised=!1,this._width=0,this._height=0,this._visible=!0,this._isShownWithZeroDimensions=!0,this._componentType=t.componentType,this._isClosable=t.isClosable,this._initialState=t.componentState,this._state=this._initialState,this._boundComponent=this.layoutManager.bindComponent(this,t),this.updateElementPositionPropertyFromBoundComponent()}destroy(){this.releaseComponent(),this.stateRequestEvent=void 0,this.emit("destroy")}getElement(){return this._element}hide(){this._hideEvent()}show(){this._showEvent()}focus(t=!1){this._focusEvent(t)}blur(t=!1){this._blurEvent(t)}setSize(t,e){let i=this._parent;if(i.isColumn||i.isRow||null===i.parent)throw new B("ICSSPRC","ComponentContainer cannot have RowColumn Parent");{let n;do{n=i,i=i.parent}while(null!==i&&!i.isColumn&&!i.isRow);if(null===i)return!1;{const o=i.isColumn?"height":"width",s=this[o];if(null===s)throw new V("ICSSCS11194");{const r=("height"===o?e:t)/(s*(1/(n.size/100)))*100,a=(n.size-r)/(i.contentItems.length-1);for(let t=0;t<i.contentItems.length;t++){const e=i.contentItems[t];e===n?e.size=r:e.size+=a}return i.updateSize(!1),!0}}}}close(){this._isClosable&&(this.emit("close"),this._parent.close())}replaceComponent(t){if(this.releaseComponent(),!at.isComponent(t))throw new Error("ReplaceComponent not passed a component ItemConfig");{const e=dt.resolve(t,!1);if(this._initialState=e.componentState,this._state=this._initialState,this._componentType=e.componentType,this._updateItemConfigEvent(e),this._boundComponent=this.layoutManager.bindComponent(this,e),this.updateElementPositionPropertyFromBoundComponent(),this._boundComponent.virtual){if(void 0!==this.virtualVisibilityChangeRequiredEvent&&this.virtualVisibilityChangeRequiredEvent(this,this._visible),void 0!==this.virtualRectingRequiredEvent){this._layoutManager.fireBeforeVirtualRectingEvent(1);try{this.virtualRectingRequiredEvent(this,this._width,this._height)}finally{this._layoutManager.fireAfterVirtualRectingEvent()}}this.setBaseLogicalZIndex()}this.emit("stateChanged")}}getState(){return this._state}extendState(t){const e=It(this._state,t);this.setState(e)}setState(t){this._state=t,this._parent.emitBaseBubblingEvent("stateChanged")}setTitle(t){this._parent.setTitle(t)}setTab(t){this._tab=t,this.emit("tab",t)}setVisibility(t){this._boundComponent.virtual&&void 0!==this.virtualVisibilityChangeRequiredEvent&&this.virtualVisibilityChangeRequiredEvent(this,t),t?this._visible?!this._isShownWithZeroDimensions||0===this._height&&0===this._width||(this._isShownWithZeroDimensions=!1,this.setSizeToNodeSize(this._width,this._height,!0),this.emitShow()):(this._visible=!0,0===this._height&&0===this._width?this._isShownWithZeroDimensions=!0:(this._isShownWithZeroDimensions=!1,this.setSizeToNodeSize(this._width,this._height,!0),this.emitShow())):this._visible&&(this._visible=!1,this._isShownWithZeroDimensions=!1,this.emitHide())}setBaseLogicalZIndex(){this.setLogicalZIndex(G.base)}setLogicalZIndex(t){t!==this._logicalZIndex&&(this._logicalZIndex=t,this.notifyVirtualZIndexChangeRequired())}enterDragMode(t,e){this._width=t,this._height=e,_t(this._element,t),yt(this._element,e),this.setLogicalZIndex(G.drag),this.drag()}exitDragMode(){this.setBaseLogicalZIndex()}enterStackMaximised(){this._stackMaximised=!0,this.setLogicalZIndex(G.stackMaximised)}exitStackMaximised(){this.setBaseLogicalZIndex(),this._stackMaximised=!1}drag(){if(this._boundComponent.virtual&&void 0!==this.virtualRectingRequiredEvent){this._layoutManager.fireBeforeVirtualRectingEvent(1);try{this.virtualRectingRequiredEvent(this,this._width,this._height)}finally{this._layoutManager.fireAfterVirtualRectingEvent()}}}setSizeToNodeSize(t,e,i){(t!==this._width||e!==this._height||i)&&(this._width=t,this._height=e,_t(this._element,t),yt(this._element,e),this._boundComponent.virtual?this.addVirtualSizedContainerToLayoutManager():(this.emit("resize"),this.checkShownFromZeroDimensions()))}notifyVirtualRectingRequired(){void 0!==this.virtualRectingRequiredEvent&&(this.virtualRectingRequiredEvent(this,this._width,this._height),this.emit("resize"),this.checkShownFromZeroDimensions())}notifyVirtualZIndexChangeRequired(){if(void 0!==this.virtualZIndexChangeRequiredEvent){const t=this._logicalZIndex,e=j[t];this.virtualZIndexChangeRequiredEvent(this,t,e)}}updateElementPositionPropertyFromBoundComponent(){this._boundComponent.virtual?this._element.style.position="static":this._element.style.position=""}addVirtualSizedContainerToLayoutManager(){this._layoutManager.beginVirtualSizedContainerAdding();try{this._layoutManager.addVirtualSizedContainer(this)}finally{this._layoutManager.endVirtualSizedContainerAdding()}}checkShownFromZeroDimensions(){!this._isShownWithZeroDimensions||0===this._height&&0===this._width||(this._isShownWithZeroDimensions=!1,this.emitShow())}emitShow(){this.emit("shown"),this.emit("show")}emitHide(){this.emit("hide")}releaseComponent(){this._stackMaximised&&this.exitStackMaximised(),this.emit("beforeComponentRelease",this._boundComponent.component),this.layoutManager.unbindComponent(this,this._boundComponent.virtual,this._boundComponent.component)}}class Pt extends zt{constructor(t,e,i){super(),this._config=t,this._initialWindowSize=e,this._layoutManager=i,this._isInitialised=!1,this._popoutWindow=null,this.createWindow()}toConfig(){var t,e;if(!1===this._isInitialised)throw new Error("Can't create config, layout not yet initialised");const i=this.getGlInstance().saveLayout();let n,o;null===this._popoutWindow?(n=null,o=null):(n=null!==(t=this._popoutWindow.screenX)&&void 0!==t?t:this._popoutWindow.screenLeft,o=null!==(e=this._popoutWindow.screenY)&&void 0!==e?e:this._popoutWindow.screenTop);const s={width:this.getGlInstance().width,height:this.getGlInstance().height,left:n,top:o};return{root:i.root,openPopouts:i.openPopouts,settings:i.settings,dimensions:i.dimensions,header:i.header,window:s,parentId:this._config.parentId,indexInParent:this._config.indexInParent,resolved:!0}}getGlInstance(){if(null===this._popoutWindow)throw new V("BPGGI24693");return this._popoutWindow.__glInstance}getWindow(){if(null===this._popoutWindow)throw new V("BPGW087215");return this._popoutWindow}close(){if(this.getGlInstance())this.getGlInstance().closeWindow();else try{this.getWindow().close()}catch(t){}}popIn(){let t,e=this._config.indexInParent;if(!this._config.parentId)return;const i=It({},this.getGlInstance().saveLayout()).root;if(void 0===i)throw new W("BPPIR19998");const n=this._layoutManager.groundItem;if(void 0===n)throw new W("BPPIG34972");t=n.getItemsByPopInParentId(this._config.parentId)[0],t||(t=n.contentItems.length>0?n.contentItems[0]:n,e=0);const o=this._layoutManager.createAndInitContentItem(i,t);t.addChild(o,e),this._layoutManager.layoutConfig.settings.popInOnClose?this._onClose():this.close()}createWindow(){const t=this.createUrl(),e=Math.floor(1e6*Math.random()).toString(36),i=this.serializeWindowFeatures({width:this._initialWindowSize.width,height:this._initialWindowSize.height,innerWidth:this._initialWindowSize.width,innerHeight:this._initialWindowSize.height,menubar:"no",toolbar:"no",location:"no",personalbar:"no",resizable:"yes",scrollbars:"no",status:"no"});if(this._popoutWindow=globalThis.open(t,e,i),this._popoutWindow)this._popoutWindow.addEventListener("load",()=>this.positionWindow(),{passive:!0}),this._popoutWindow.addEventListener("beforeunload",()=>{this._layoutManager.layoutConfig.settings.popInOnClose?this.popIn():this._onClose()},{passive:!0}),this._checkReadyInterval=setInterval(()=>this.checkReady(),10);else if(!0===this._layoutManager.layoutConfig.settings.blockedPopoutsThrowError){throw new k("Popout blocked")}}checkReady(){if(null===this._popoutWindow)throw new V("BPCR01844");this._popoutWindow.__glInstance&&this._popoutWindow.__glInstance.isInitialised&&(this.onInitialised(),void 0!==this._checkReadyInterval&&(clearInterval(this._checkReadyInterval),this._checkReadyInterval=void 0))}serializeWindowFeatures(t){const e=[];for(const i in t)e.push(i+"="+t[i].toString());return e.join(",")}createUrl(){const t="gl-window-config-"+St(),e=st.minifyConfig(this._config);try{localStorage.setItem(t,JSON.stringify(e))}catch(t){throw new Error("Error while writing to localStorage "+function(t){return t instanceof Error?t.message:"string"==typeof t?t:"Unknown Error"}(t))}const i=new URL(location.href);return i.searchParams.set("gl-window",t),i.toString()}positionWindow(){if(null===this._popoutWindow)throw new Error("BrowserPopout.positionWindow: null popoutWindow");this._popoutWindow.moveTo(this._initialWindowSize.left,this._initialWindowSize.top),this._popoutWindow.focus()}onInitialised(){this._isInitialised=!0,this.getGlInstance().on("popIn",()=>this.popIn()),this.emit("initialised")}_onClose(){setTimeout(()=>this.emit("closed"),50)}}class Tt extends zt{get type(){return this._type}get id(){return this._id}set id(t){this._id=t}get popInParentIds(){return this._popInParentIds}get parent(){return this._parent}get contentItems(){return this._contentItems}get isClosable(){return this._isClosable}get element(){return this._element}get isInitialised(){return this._isInitialised}static isStack(t){return t.isStack}static isComponentItem(t){return t.isComponent}static isComponentParentableItem(t){return t.isStack||t.isGround}constructor(t,e,i,n){super(),this.layoutManager=t,this._parent=i,this._element=n,this._popInParentIds=[],this._type=e.type,this._id=e.id,this._isInitialised=!1,this.isGround=!1,this.isRow=!1,this.isColumn=!1,this.isStack=!1,this.isComponent=!1,this.size=e.size,this.sizeUnit=e.sizeUnit,this.minSize=e.minSize,this.minSizeUnit=e.minSizeUnit,this._isClosable=e.isClosable,this._pendingEventPropagations={},this._throttledEvents=["stateChanged"],this._contentItems=this.createContentItems(e.content)}removeChild(t,e=!1){const i=this._contentItems.indexOf(t);if(-1===i)throw new Error("Can't remove child item. Unknown content item");if(e||this._contentItems[i].destroy(),this._contentItems.splice(i,1),this._contentItems.length>0)this.updateSize(!1);else if(!this.isGround&&!0===this._isClosable){if(null===this._parent)throw new V("CIUC00874");this._parent.removeChild(this)}}addChild(t,e,i){return null!=e||(e=this._contentItems.length),this._contentItems.splice(e,0,t),t.setParent(this),!0===this._isInitialised&&!1===t._isInitialised&&t.init(),e}replaceChild(t,e,i=!1){const n=this._contentItems.indexOf(t),o=t._element.parentNode;if(-1===n)throw new B("CIRCI23232","Can't replace child. oldChild is not child of this");if(null===o)throw new V("CIRCP23232");if(o.replaceChild(e._element,t._element),!0===i&&(t._parent=null,t.destroy()),this._contentItems[n]=e,e.setParent(this),e.size=t.size,e.sizeUnit=t.sizeUnit,e.minSize=t.minSize,e.minSizeUnit=t.minSizeUnit,null===e._parent)throw new V("CIRCNC45699");!0===e._parent._isInitialised&&!1===e._isInitialised&&e.init(),this.updateSize(!1)}remove(){if(null===this._parent)throw new V("CIR11110");this._parent.removeChild(this)}popout(){const t=St(),e=this.layoutManager.createPopoutFromContentItem(this,void 0,t,void 0);return this.emitBaseBubblingEvent("stateChanged"),e}calculateConfigContent(){const t=this._contentItems,e=t.length,i=new Array(e);for(let n=0;n<e;n++){const e=t[n];i[n]=e.toConfig()}return i}highlightDropZone(t,e,i){const n=this.layoutManager.dropTargetIndicator;if(null===n)throw new V("ACIHDZ5593");n.highlightArea(i,1)}onDrop(t,e){this.addChild(t)}show(){this.layoutManager.beginSizeInvalidation();try{Ct(this._element,!0);for(let t=0;t<this._contentItems.length;t++)this._contentItems[t].show()}finally{this.layoutManager.endSizeInvalidation()}}destroy(){for(let t=0;t<this._contentItems.length;t++)this._contentItems[t].destroy();this._contentItems=[],this.emitBaseBubblingEvent("beforeItemDestroyed"),this._element.remove(),this.emitBaseBubblingEvent("itemDestroyed")}getElementArea(t){const e=(t=null!=t?t:this._element).getBoundingClientRect(),i=e.top+document.body.scrollTop,n=e.left+document.body.scrollLeft,o=e.width,s=e.height;return{x1:n,y1:i,x2:n+o,y2:i+s,surface:o*s,contentItem:this}}init(){this._isInitialised=!0,this.emitBaseBubblingEvent("itemCreated"),this.emitUnknownBubblingEvent(this.type+"Created")}setParent(t){this._parent=t}addPopInParentId(t){this.popInParentIds.includes(t)||this.popInParentIds.push(t)}initContentItems(){for(let t=0;t<this._contentItems.length;t++)this._contentItems[t].init()}hide(){this.layoutManager.beginSizeInvalidation();try{Ct(this._element,!1)}finally{this.layoutManager.endSizeInvalidation()}}updateContentItemsSize(t){for(let e=0;e<this._contentItems.length;e++)this._contentItems[e].updateSize(t)}createContentItems(t){const e=t.length,i=new Array(e);for(let e=0;e<t.length;e++)i[e]=this.layoutManager.createContentItem(t[e],this);return i}propagateEvent(t,e){if(1===e.length){const i=e[0];i instanceof zt.BubblingEvent&&!1===i.isPropagationStopped&&!0===this._isInitialised&&(!1===this.isGround&&this._parent?this._parent.emitUnknown(t,i):this.scheduleEventPropagationToLayoutManager(t,i))}}tryBubbleEvent(t,e){if(1===e.length){const i=e[0];i instanceof zt.BubblingEvent&&!1===i.isPropagationStopped&&!0===this._isInitialised&&(!1===this.isGround&&this._parent?this._parent.emitUnknown(t,i):this.scheduleEventPropagationToLayoutManager(t,i))}}scheduleEventPropagationToLayoutManager(t,e){-1===this._throttledEvents.indexOf(t)?this.layoutManager.emitUnknown(t,e):!0!==this._pendingEventPropagations[t]&&(this._pendingEventPropagations[t]=!0,globalThis.requestAnimationFrame(()=>this.propagateEventToLayoutManager(t,e)))}propagateEventToLayoutManager(t,e){this._pendingEventPropagations[t]=!1,this.layoutManager.emitUnknown(t,e)}}class At extends Tt{get componentName(){return this._container.componentType}get componentType(){return this._container.componentType}get reorderEnabled(){return this._reorderEnabled}get initialWantMaximise(){return this._initialWantMaximise}get component(){return this._container.component}get container(){return this._container}get parentItem(){return this._parentItem}get headerConfig(){return this._headerConfig}get title(){return this._title}get tab(){return this._tab}get focused(){return this._focused}constructor(t,e,i){super(t,e,i,document.createElement("div")),this._parentItem=i,this._focused=!1,this.isComponent=!0,this._reorderEnabled=e.reorderEnabled,this.applyUpdatableConfig(e),this._initialWantMaximise=e.maximised;const n=document.createElement("div");n.classList.add("lm_content"),this.element.appendChild(n),this._container=new Mt(e,this,t,n,t=>this.handleUpdateItemConfigEvent(t),()=>this.show(),()=>this.hide(),t=>this.focus(t),t=>this.blur(t))}destroy(){this._container.destroy(),super.destroy()}applyUpdatableConfig(t){this.setTitle(t.title),this._headerConfig=t.header}toConfig(){const t=this._container.stateRequestEvent,e=void 0===t?this._container.state:t();return{type:q.component,content:[],size:this.size,sizeUnit:this.sizeUnit,minSize:this.minSize,minSizeUnit:this.minSizeUnit,id:this.id,maximised:!1,isClosable:this.isClosable,reorderEnabled:this._reorderEnabled,title:this._title,header:Q.Header.createCopy(this._headerConfig),componentType:et.copyComponentType(this.componentType),componentState:e}}close(){if(null===this.parent)throw new V("CIC68883");this.parent.removeChild(this,!1)}enterDragMode(t,e){_t(this.element,t),yt(this.element,e),this._container.enterDragMode(t,e)}exitDragMode(){this._container.exitDragMode()}enterStackMaximised(){this._container.enterStackMaximised()}exitStackMaximised(){this._container.exitStackMaximised()}drag(){this._container.drag()}updateSize(t){this.updateNodeSize(t)}init(){this.updateNodeSize(!1),super.init(),this._container.emit("open"),this.initContentItems()}setTitle(t){this._title=t,this.emit("titleChanged",t),this.emit("stateChanged")}setTab(t){this._tab=t,this.emit("tab",t),this._container.setTab(t)}hide(){super.hide(),this._container.setVisibility(!1)}show(){super.show(),this._container.setVisibility(!0)}focus(t=!1){this.parentItem.setActiveComponentItem(this,!0,t)}setFocused(t){this._focused=!0,this.tab.setFocused(),t||this.emitBaseBubblingEvent("focus")}blur(t=!1){this._focused&&this.layoutManager.setFocusedComponentItem(void 0,t)}setBlurred(t){this._focused=!1,this.tab.setBlurred(),t||this.emitBaseBubblingEvent("blur")}setParent(t){this._parentItem=t,super.setParent(t)}handleUpdateItemConfigEvent(t){this.applyUpdatableConfig(t)}updateNodeSize(t){if("none"!==this.element.style.display){const{width:e,height:i}=wt(this.element);this._container.setSizeToNodeSize(e,i,t)}}}class kt extends Tt{constructor(){super(...arguments),this._focused=!1}get focused(){return this._focused}setFocusedValue(t){this._focused=t}}class Dt extends zt{constructor(t,e){super(),this._eElement=t,this._pointerTracking=!1,this._pointerDownEventListener=t=>this.onPointerDown(t),this._pointerMoveEventListener=t=>this.onPointerMove(t),this._pointerUpEventListener=t=>this.onPointerUp(t),this._timeout=void 0,this._allowableTargets=[t,...e],this._oDocument=document,this._eBody=document.body,this._nDelay=1800,this._nDistance=1,this._nX=0,this._nY=0,this._nOriginalX=0,this._nOriginalY=0,this._dragging=!1,this._eElement.addEventListener("pointerdown",this._pointerDownEventListener,{passive:!0})}destroy(){this.checkRemovePointerTrackingEventListeners(),this._eElement.removeEventListener("pointerdown",this._pointerDownEventListener)}cancelDrag(){this.processDragStop(void 0)}onPointerDown(t){if(this._allowableTargets.includes(t.target)&&t.isPrimary){const e=this.getPointerCoordinates(t);this.processPointerDown(e)}}processPointerDown(t){this._nOriginalX=t.x,this._nOriginalY=t.y,this._oDocument.addEventListener("pointermove",this._pointerMoveEventListener),this._oDocument.addEventListener("pointerup",this._pointerUpEventListener,{passive:!0}),this._pointerTracking=!0,this._timeout=setTimeout(()=>{try{this.startDrag()}catch(t){throw console.error(t),t}},this._nDelay)}onPointerMove(t){this._pointerTracking&&(this.processDragMove(t),t.preventDefault())}processDragMove(t){this._nX=t.pageX-this._nOriginalX,this._nY=t.pageY-this._nOriginalY,this._lastPointerEvent=t,!1===this._dragging&&(Math.abs(this._nX)>this._nDistance||Math.abs(this._nY)>this._nDistance)&&this.startDrag(),this._dragging&&this.emit("drag",this._nX,this._nY,t)}onPointerUp(t){this.processDragStop(t)}processDragStop(t){var e;void 0!==this._timeout&&(clearTimeout(this._timeout),this._timeout=void 0),void 0!==this._dragEmitInterval&&(clearInterval(this._dragEmitInterval),this._dragEmitInterval=void 0),this.checkRemovePointerTrackingEventListeners(),!0===this._dragging&&(this._eBody.classList.remove("lm_dragging"),this._eElement.classList.remove("lm_dragging"),null===(e=this._oDocument.querySelector("iframe"))||void 0===e||e.style.setProperty("pointer-events",""),this._dragging=!1,this.emit("dragStop",t))}checkRemovePointerTrackingEventListeners(){this._pointerTracking&&(this._oDocument.removeEventListener("pointermove",this._pointerMoveEventListener),this._oDocument.removeEventListener("pointerup",this._pointerUpEventListener),this._pointerTracking=!1)}startDrag(){var t;void 0!==this._timeout&&(clearTimeout(this._timeout),this._timeout=void 0),this._dragging=!0,this._eBody.classList.add("lm_dragging"),this._eElement.classList.add("lm_dragging"),null===(t=this._oDocument.querySelector("iframe"))||void 0===t||t.style.setProperty("pointer-events","none"),this.emit("dragStart",this._nOriginalX,this._nOriginalY),this._dragEmitInterval=setInterval(()=>{this._dragging&&this._lastPointerEvent&&this.emit("drag",this._nX,this._nY,this._lastPointerEvent)},16)}getPointerCoordinates(t){return{x:t.pageX,y:t.pageY}}}class Rt{get element(){return this._element}constructor(t,e,i){this._isVertical=t,this._size=e,this._grabSize=i<this._size?this._size:i,this._element=document.createElement("div"),this._element.classList.add("lm_splitter");const n=document.createElement("div");n.classList.add("lm_drag_handle");const o=this._grabSize-this._size,s=o/2;this._isVertical?(n.style.top=gt(-s),n.style.height=gt(this._size+o),this._element.classList.add("lm_vertical"),this._element.style.height=gt(this._size)):(n.style.left=gt(-s),n.style.width=gt(this._size+o),this._element.classList.add("lm_horizontal"),this._element.style.width=gt(this._size)),this._element.appendChild(n),this._dragListener=new Dt(this._element,[n])}destroy(){this._element.remove()}on(t,e){this._dragListener.on(t,e)}}class Ot extends Tt{constructor(t,e,i,n){switch(super(e,i,n,Ot.createElement(document,t)),this._rowOrColumnParent=n,this._splitter=[],this.isRow=!t,this.isColumn=t,this._childElementContainer=this.element,this._splitterSize=e.layoutConfig.dimensions.borderWidth,this._splitterGrabSize=e.layoutConfig.dimensions.borderGrabWidth,this._isColumn=t,this._dimension=t?"height":"width",this._splitterPosition=null,this._splitterMinPosition=null,this._splitterMaxPosition=null,i.type){case q.row:case q.column:this._configType=i.type;break;default:throw new B("ROCCCT00925")}}newComponent(t,e,i,n){const o={type:"component",componentType:t,componentState:e,title:i};return this.newItem(o,n)}addComponent(t,e,i,n){const o={type:"component",componentType:t,componentState:e,title:i};return this.addItem(o,n)}newItem(t,e){e=this.addItem(t,e);const i=this.contentItems[e];return Tt.isStack(i)&&at.isComponent(t)?i.contentItems[0]:i}addItem(t,e){this.layoutManager.checkMinimiseMaximisedStack();const i=at.resolve(t,!1),n=this.layoutManager.createAndInitContentItem(i,this);return this.addChild(n,e,!1)}addChild(t,e,i){if(void 0===e&&(e=this.contentItems.length),this.contentItems.length>0){const i=this.createSplitter(Math.max(0,e-1)).element;e>0?(this.contentItems[e-1].element.insertAdjacentElement("afterend",i),i.insertAdjacentElement("afterend",t.element)):(this.contentItems[0].element.insertAdjacentElement("beforebegin",i),i.insertAdjacentElement("beforebegin",t.element))}else this._childElementContainer.appendChild(t.element);super.addChild(t,e);const n=1/this.contentItems.length*100;if(!0===i)return this.emitBaseBubblingEvent("stateChanged"),e;for(let e=0;e<this.contentItems.length;e++){const i=this.contentItems[e];if(i===t)t.size=n;else{const t=i.size*=(100-n)/100;i.size=t}}return this.updateSize(!1),this.emitBaseBubblingEvent("stateChanged"),e}removeChild(t,e){const i=this.contentItems.indexOf(t),n=Math.max(i-1,0);if(-1===i)throw new Error("Can't remove child. ContentItem is not child of this Row or Column");if(this._splitter[n]&&(this._splitter[n].destroy(),this._splitter.splice(n,1)),super.removeChild(t,e),1===this.contentItems.length&&!0===this.isClosable){const t=this.contentItems[0];this.contentItems.length=0,this._rowOrColumnParent.replaceChild(this,t,!0)}else this.updateSize(!1),this.emitBaseBubblingEvent("stateChanged")}replaceChild(t,e){const i=t.size;super.replaceChild(t,e),e.size=i,this.updateSize(!1),this.emitBaseBubblingEvent("stateChanged")}updateSize(t){this.layoutManager.beginVirtualSizedContainerAdding();try{this.updateNodeSize(),this.updateContentItemsSize(t)}finally{this.layoutManager.endVirtualSizedContainerAdding()}}init(){if(!0!==this.isInitialised){this.updateNodeSize();for(let t=0;t<this.contentItems.length;t++)this._childElementContainer.appendChild(this.contentItems[t].element);super.init();for(let t=0;t<this.contentItems.length-1;t++)this.contentItems[t].element.insertAdjacentElement("afterend",this.createSplitter(t).element);this.initContentItems()}}toConfig(){return{type:this.type,content:this.calculateConfigContent(),size:this.size,sizeUnit:this.sizeUnit,minSize:this.minSize,minSizeUnit:this.minSizeUnit,id:this.id,isClosable:this.isClosable}}setParent(t){this._rowOrColumnParent=t,super.setParent(t)}updateNodeSize(){this.contentItems.length>0&&(this.calculateRelativeSizes(),this.setAbsoluteSizes()),this.emitBaseBubblingEvent("stateChanged"),this.emit("resize")}setAbsoluteSizes(){const t=this.calculateAbsoluteSizes();for(let e=0;e<this.contentItems.length;e++)t.additionalPixel-e>0&&t.itemSizes[e]++,this._isColumn?(_t(this.contentItems[e].element,t.crossAxisSize),yt(this.contentItems[e].element,t.itemSizes[e])):(_t(this.contentItems[e].element,t.itemSizes[e]),yt(this.contentItems[e].element,t.crossAxisSize))}calculateAbsoluteSizes(){const t=(this.contentItems.length-1)*this._splitterSize,{width:e,height:i}=wt(this.element);let n,o;this._isColumn?(n=i-t,o=e):(n=e-t,o=i);let s=0;const r=[];for(let t=0;t<this.contentItems.length;t++){const e=this.contentItems[t];let i;if(e.sizeUnit!==Y.Percent)throw new B("ROCCAS6692");i=Math.floor(n*(e.size/100)),s+=i,r.push(i)}return{itemSizes:r,additionalPixel:Math.floor(n-s),totalSize:n,crossAxisSize:o}}calculateRelativeSizes(){let t=0;const e=[];let i=0;for(let n=0;n<this.contentItems.length;n++){const o=this.contentItems[n];switch(o.sizeUnit){case Y.Percent:t+=o.size;break;case Y.Fractional:e.push(o),i+=o.size;break;default:throw new B("ROCCRS49110",JSON.stringify(o))}}if(100!==Math.round(t)){if(Math.round(t)<100&&e.length>0){const n=100-t;for(let t=0;t<e.length;t++){const o=e[t];o.size=n*(o.size/i),o.sizeUnit=Y.Percent}return void this.respectMinItemSize()}if(Math.round(t)>100&&e.length>0){for(let t=0;t<e.length;t++){const n=e[t];n.size=n.size/i*50,n.sizeUnit=Y.Percent}t+=50}for(let e=0;e<this.contentItems.length;e++){const i=this.contentItems[e];i.size=i.size/t*100}this.respectMinItemSize()}else this.respectMinItemSize()}respectMinItemSize(){const t=this.calculateContentItemMinSize(this);if(!(t<=0||this.contentItems.length<=1)){let e=0,i=0;const n=[],o=[],s=this.calculateAbsoluteSizes();for(let r=0;r<s.itemSizes.length;r++){const a=s.itemSizes[r];let l;a<t?(i+=t-a,l={size:t}):(e+=a-t,l={size:a},n.push(l)),o.push(l)}if(0===i||i>e)return;{const r=i/e;let a=i;for(let e=0;e<n.length;e++){const i=n[e],o=Math.round((i.size-t)*r);a-=o,i.size-=o}0!==a&&(o[o.length-1].size-=a);for(let t=0;t<this.contentItems.length;t++){this.contentItems[t].size=o[t].size/s.totalSize*100}}}}createSplitter(t){const e=new Rt(this._isColumn,this._splitterSize,this._splitterGrabSize);return e.on("drag",(t,i)=>this.onSplitterDrag(e,t,i)),e.on("dragStop",()=>this.onSplitterDragStop(e)),e.on("dragStart",()=>this.onSplitterDragStart(e)),this._splitter.splice(t,0,e),e}getSplitItems(t){const e=this._splitter.indexOf(t);return{before:this.contentItems[e],after:this.contentItems[e+1]}}calculateContentItemMinSize(t){const e=t.minSize;if(void 0!==e){if(t.minSizeUnit===Y.Pixel)return e;throw new B("ROCGMD98831",JSON.stringify(t))}{const t=this.layoutManager.layoutConfig.dimensions;return this._isColumn?t.defaultMinItemHeight:t.defaultMinItemWidth}}calculateContentItemsTotalMinSize(t){let e=0;for(const i of t)e+=this.calculateContentItemMinSize(i);return e}onSplitterDragStart(t){const e=this.getSplitItems(t),i=ft(e.before.element.style[this._dimension]),n=ft(e.after.element.style[this._dimension]),o=this.calculateContentItemsTotalMinSize(e.before.contentItems),s=this.calculateContentItemsTotalMinSize(e.after.contentItems);this._splitterPosition=0,this._splitterMinPosition=-1*(i-o),this._splitterMaxPosition=n-s}onSplitterDrag(t,e,i){let n=this._isColumn?i:e;if(null===this._splitterMinPosition||null===this._splitterMaxPosition)throw new V("ROCOSD59226");n=Math.max(n,this._splitterMinPosition),n=Math.min(n,this._splitterMaxPosition),this._splitterPosition=n;const o=gt(n);this._isColumn?t.element.style.top=o:t.element.style.left=o}onSplitterDragStop(t){if(null===this._splitterPosition)throw new V("ROCOSDS66932");{const e=this.getSplitItems(t),i=ft(e.before.element.style[this._dimension]),n=ft(e.after.element.style[this._dimension]),o=(this._splitterPosition+i)/(i+n),s=e.before.size+e.after.size;e.before.size=o*s,e.after.size=(1-o)*s,t.element.style.top=gt(0),t.element.style.left=gt(0),globalThis.requestAnimationFrame(()=>this.updateSize(!1))}}}!function(t){t.getElementDimensionSize=function(t,e){return"width"===e?function(t){return t.offsetWidth}(t):function(t){return t.offsetHeight}(t)},t.setElementDimensionSize=function(t,e,i){return"width"===e?_t(t,i):yt(t,i)},t.createElement=function(t,e){const i=t.createElement("div");return i.classList.add("lm_item"),e?i.classList.add("lm_column"):i.classList.add("lm_row"),i}}(Ot||(Ot={}));class Bt extends kt{constructor(t,e,i){super(t,ot.create(e),null,Bt.createElement(document)),this.isGround=!0,this._childElementContainer=this.element,this._containerElement=i;let n=null;for(;;){const t=n?n.previousSibling:this._containerElement.lastChild;if(!(t instanceof Element&&t.classList.contains("lm_content")))break;n=t}this._containerElement.insertBefore(this.element,n)}init(){if(!0!==this.isInitialised){this.updateNodeSize();for(let t=0;t<this.contentItems.length;t++)this._childElementContainer.appendChild(this.contentItems[t].element);super.init(),this.initContentItems()}}loadRoot(t){if(this.clearRoot(),void 0!==t){const e=this.layoutManager.createAndInitContentItem(t,this);this.addChild(e,0)}}clearRoot(){const t=this.contentItems;switch(t.length){case 0:return;case 1:return void t[0].remove();default:throw new B("GILR07721")}}addItem(t,e){this.layoutManager.checkMinimiseMaximisedStack();const i=at.resolve(t,!1);let n;if(n=this.contentItems.length>0?this.contentItems[0]:this,n.isComponent)throw new Error("Cannot add item as child to ComponentItem");{const t=this.layoutManager.createAndInitContentItem(i,n);return e=n.addChild(t,e),n===this?-1:e}}loadComponentAsRoot(t){this.clearRoot();const e=at.resolve(t,!1);if(e.maximised)throw new Error("Root Component cannot be maximised");{const t=new At(this.layoutManager,e,this);t.init(),this.addChild(t,0)}}addChild(t,e){if(this.contentItems.length>0)throw new Error("Ground node can only have a single child");return this._childElementContainer.appendChild(t.element),e=super.addChild(t,e),this.updateSize(!1),this.emitBaseBubblingEvent("stateChanged"),e}calculateConfigContent(){const t=this.contentItems,e=t.length,i=new Array(e);for(let n=0;n<e;n++){const e=t[n].toConfig();if(!nt.isRootItemConfig(e))throw new B("RCCC66832");i[n]=e}return i}setSize(t,e){void 0===t||void 0===e?this.updateSize(!1):(_t(this.element,t),yt(this.element,e),this.contentItems.length>0&&(_t(this.contentItems[0].element,t),yt(this.contentItems[0].element,e)),this.updateContentItemsSize(!1))}updateSize(t){this.layoutManager.beginVirtualSizedContainerAdding();try{this.updateNodeSize(),this.updateContentItemsSize(t)}finally{this.layoutManager.endVirtualSizedContainerAdding()}}createSideAreas(){const t=Bt.Area.oppositeSides,e=new Array(Object.keys(t).length);let i=0;for(const n in t){const o=n,s=this.getElementArea();if(null===s)throw new V("RCSA77553");s.side=o,"2"===t[o][1]?s[o]=s[t[o]]-50:s[o]=s[t[o]]+50,s.surface=(s.x2-s.x1)*(s.y2-s.y1),e[i++]=s}return e}highlightDropZone(t,e,i){this.layoutManager.tabDropPlaceholder.remove(),super.highlightDropZone(t,e,i)}onDrop(t,e){if(t.isComponent){const e=tt.createDefault(),i=t;e.header=Q.Header.createCopy(i.headerConfig);const n=this.layoutManager.createAndInitContentItem(e,this);n.addChild(t),t=n}if(0===this.contentItems.length)this.addChild(t);else{if(t.type===q.row||t.type===q.column){const e=tt.createDefault(),i=this.layoutManager.createContentItem(e,this);i.addChild(t),t=i}const i="x"==e.side[0]?q.row:q.column,n="2"==e.side[1],o=this.contentItems[0];if(o instanceof Ot&&o.type===i){const e=o.contentItems[n?0:o.contentItems.length-1];o.addChild(t,n?0:void 0,!0),e.size*=.5,t.size=e.size,t.sizeUnit=Y.Percent,o.updateSize(!1)}else{const e=J.createDefault(i),s=this.layoutManager.createContentItem(e,this);this.replaceChild(o,s),s.addChild(t,n?0:void 0,!0),s.addChild(o,n?void 0:0,!0),o.size=50,t.size=50,t.sizeUnit=Y.Percent,s.updateSize(!1)}}}dock(){throw new B("GID87731")}validateDocking(){throw new B("GIVD87732")}getAllContentItems(){const t=[this];return this.deepGetAllContentItems(this.contentItems,t),t}getConfigMaximisedItems(){const t=[];return this.deepFilterContentItems(this.contentItems,t,t=>!(!Tt.isStack(t)||!t.initialWantMaximise)||!(!Tt.isComponentItem(t)||!t.initialWantMaximise)),t}getItemsByPopInParentId(t){const e=[];return this.deepFilterContentItems(this.contentItems,e,e=>e.popInParentIds.includes(t)),e}toConfig(){throw new Error("Cannot generate GroundItem config")}setActiveComponentItem(t,e,i){}updateNodeSize(){const{width:t,height:e}=wt(this._containerElement);_t(this.element,t),yt(this.element,e),this.contentItems.length>0&&(_t(this.contentItems[0].element,t),yt(this.contentItems[0].element,e))}deepGetAllContentItems(t,e){for(let i=0;i<t.length;i++){const n=t[i];e.push(n),this.deepGetAllContentItems(n.contentItems,e)}}deepFilterContentItems(t,e,i){for(let n=0;n<t.length;n++){const o=t[n];i(o)&&e.push(o),this.deepFilterContentItems(o.contentItems,e,i)}}}!function(t){(t.Area||(t.Area={})).oppositeSides={y2:"y1",x2:"x1",y1:"y2",x1:"x2"},t.createElement=function(t){const e=t.createElement("div");return e.classList.add("lm_goldenlayout"),e.classList.add("lm_item"),e.classList.add("lm_root"),e}}(Bt||(Bt={}));class Ut{get element(){return this._element}constructor(t,e,i,n){this._header=t,this._pushEvent=n,this._clickEventListener=t=>this.onClick(t),this._touchStartEventListener=t=>this.onTouchStart(t),this._element=document.createElement("div"),this._element.classList.add(i),this._element.title=e,this._header.on("destroy",()=>this.destroy()),this._element.addEventListener("click",this._clickEventListener,{passive:!0}),this._element.addEventListener("touchstart",this._touchStartEventListener,{passive:!0}),this._header.controlsContainerElement.appendChild(this._element)}destroy(){var t;this._element.removeEventListener("click",this._clickEventListener),this._element.removeEventListener("touchstart",this._touchStartEventListener),null===(t=this._element.parentNode)||void 0===t||t.removeChild(this._element)}onClick(t){this._pushEvent(t)}onTouchStart(t){this._pushEvent(t)}}class Vt{get isActive(){return this._isActive}get componentItem(){return this._componentItem}get contentItem(){return this._componentItem}get element(){return this._element}get titleElement(){return this._titleElement}get closeElement(){return this._closeElement}get reorderEnabled(){return void 0!==this._dragListener}set reorderEnabled(t){t!==this.reorderEnabled&&(t?this.enableReorder():this.disableReorder())}constructor(t,e,i,n,o){var s;this._layoutManager=t,this._componentItem=e,this._closeEvent=i,this._focusEvent=n,this._dragStartEvent=o,this._isActive=!1,this._tabClickListener=t=>this.onTabClickDown(t),this._tabTouchStartListener=t=>this.onTabTouchStart(t),this._closeClickListener=()=>this.onCloseClick(),this._closeTouchStartListener=()=>this.onCloseTouchStart(),this._dragStartListener=(t,e)=>this.onDragStart(t,e),this._contentItemDestroyListener=()=>this.onContentItemDestroy(),this._tabTitleChangedListener=t=>this.setTitle(t),this._element=document.createElement("div"),this._element.classList.add("lm_tab"),this._titleElement=document.createElement("span"),this._titleElement.classList.add("lm_title"),this._closeElement=document.createElement("div"),this._closeElement.classList.add("lm_close_tab"),this._element.appendChild(this._titleElement),this._element.appendChild(this._closeElement),e.isClosable?this._closeElement.style.display="":this._closeElement.style.display="none",this.setTitle(e.title),this._componentItem.on("titleChanged",this._tabTitleChangedListener);(null!==(s=e.reorderEnabled)&&void 0!==s?s:this._layoutManager.layoutConfig.settings.reorderEnabled)&&this.enableReorder(),this._element.addEventListener("click",this._tabClickListener,{passive:!0}),this._element.addEventListener("touchstart",this._tabTouchStartListener,{passive:!0}),this._componentItem.isClosable?(this._closeElement.addEventListener("click",this._closeClickListener,{passive:!0}),this._closeElement.addEventListener("touchstart",this._closeTouchStartListener,{passive:!0})):(this._closeElement.remove(),this._closeElement=void 0),this._componentItem.setTab(this),this._layoutManager.emit("tabCreated",this)}setTitle(t){this._titleElement.innerText=t,this._element.title=t}setActive(t){t!==this._isActive&&(this._isActive=t,t?(this._element.classList.add("lm_active"),this._element.scrollIntoView({behavior:"smooth"})):this._element.classList.remove("lm_active"))}destroy(){var t,e;this._closeEvent=void 0,this._focusEvent=void 0,this._dragStartEvent=void 0,this._element.removeEventListener("click",this._tabClickListener),this._element.removeEventListener("touchstart",this._tabTouchStartListener),null===(t=this._closeElement)||void 0===t||t.removeEventListener("click",this._closeClickListener),null===(e=this._closeElement)||void 0===e||e.removeEventListener("touchstart",this._closeTouchStartListener),this._componentItem.off("titleChanged",this._tabTitleChangedListener),this.reorderEnabled&&this.disableReorder(),this._element.remove()}setBlurred(){this._element.classList.remove("lm_focused"),this._titleElement.classList.remove("lm_focused")}setFocused(){this._element.classList.add("lm_focused"),this._titleElement.classList.add("lm_focused")}onDragStart(t,e){if(void 0===this._dragListener)throw new W("TODSDLU10093");if(void 0===this._dragStartEvent)throw new W("TODS23309");this._dragStartEvent(t,e,this._dragListener,this.componentItem)}onContentItemDestroy(){void 0!==this._dragListener&&(this._dragListener.destroy(),this._dragListener=void 0)}onTabClickDown(t){const e=t.target;e!==this._element&&e!==this._titleElement||(0===t.button?this.notifyFocus():1===t.button&&this._componentItem.isClosable&&this.notifyClose())}onTabTouchStart(t){t.target===this._element&&this.notifyFocus()}onCloseClick(){this.notifyClose()}onCloseTouchStart(){this.notifyClose()}notifyClose(){if(void 0===this._closeEvent)throw new W("TNC15007");this._closeEvent(this._componentItem)}notifyFocus(){if(void 0===this._focusEvent)throw new W("TNA15007");this._focusEvent(this._componentItem)}enableReorder(){this._dragListener=new Dt(this._element,[this._titleElement]),this._dragListener.on("dragStart",this._dragStartListener),this._componentItem.on("destroy",this._contentItemDestroyListener)}disableReorder(){if(void 0===this._dragListener)throw new W("TDR87745");this._componentItem.off("destroy",this._contentItemDestroyListener),this._dragListener.off("dragStart",this._dragStartListener),this._dragListener=void 0}}class Wt{get tabs(){return this._tabs}get tabCount(){return this._tabs.length}get lastVisibleTabIndex(){return this._lastVisibleTabIndex}get element(){return this._element}get dropdownElement(){return this._dropdownElement}get dropdownActive(){return this._dropdownActive}constructor(t,e,i,n,o){this._layoutManager=t,this._componentRemoveEvent=e,this._componentFocusEvent=i,this._componentDragStartEvent=n,this._dropdownActiveChangedEvent=o,this._tabs=[],this._lastVisibleTabIndex=-1,this._dropdownActive=!1,this._element=document.createElement("section"),this._element.classList.add("lm_tabs"),"scroll"===this._layoutManager.layoutConfig.settings.tabOverflowBehavior&&this.element.addEventListener("wheel",t=>{const{deltaX:e,deltaY:i}=t;Math.abs(i)>Math.abs(e)&&(this._element.scrollLeft+=i-e)},{passive:!0}),this._dropdownElement=document.createElement("section"),this._dropdownElement.classList.add("lm_tabdropdown_list"),this._dropdownElement.style.display="none"}destroy(){for(let t=0;t<this._tabs.length;t++)this._tabs[t].destroy()}createTab(t,e){for(let e=0;e<this._tabs.length;e++)if(this._tabs[e].componentItem===t)return;const i=new Vt(this._layoutManager,t,t=>this.handleTabCloseEvent(t),t=>this.handleTabFocusEvent(t),(t,e,i,n)=>this.handleTabDragStartEvent(t,e,i,n));void 0===e&&(e=this._tabs.length),this._tabs.splice(e,0,i),e<this._element.childNodes.length?this._element.insertBefore(i.element,this._element.childNodes[e]):this._element.appendChild(i.element)}removeTab(t){for(let e=0;e<this._tabs.length;e++)if(this._tabs[e].componentItem===t){return this._tabs[e].destroy(),this._tabs.splice(e,1),void("scroll"===this._layoutManager.layoutConfig.settings.tabOverflowBehavior&&this._kickScrollWrapperAnimation())}throw new Error("contentItem is not controlled by this header")}processActiveComponentChanged(t){let e=-1;for(let i=0;i<this._tabs.length;i++){const n=this._tabs[i].componentItem===t;this._tabs[i].setActive(n),n&&(e=i)}if(e<0)throw new B("HSACI56632");if(this._layoutManager.layoutConfig.settings.reorderOnTabMenuClick&&-1!==this._lastVisibleTabIndex&&e>this._lastVisibleTabIndex){const t=this._tabs[e];for(let t=e;t>0;t--)this._tabs[t]=this._tabs[t-1];this._tabs[0]=t}}updateTabSizes(t,e){let i=!1;this.tryUpdateTabSizes(i,t,e)||(i=!0,this.tryUpdateTabSizes(i,t,e)),i!==this._dropdownActive&&(this._dropdownActive=i,this._dropdownActiveChangedEvent())}tryUpdateTabSizes(t,e,i){if(this._tabs.length>0){if(void 0===i)throw new Error("non-empty tabs must have active component item");let n=0,o=!1;const s=this._layoutManager.layoutConfig.settings.tabOverlapAllowance,r=this._tabs.indexOf(i.tab),a=this._tabs[r];this._lastVisibleTabIndex=-1;for(let i=0;i<this._tabs.length;i++){const l=this._tabs[i].element;l.parentElement!==this._element&&this._element.appendChild(l);const h=ft(getComputedStyle(a.element).marginRight);n+=l.offsetWidth+h;let d=0;if(r<=i)d=n;else{const t=ft(getComputedStyle(a.element).marginRight);d=n+a.element.offsetWidth+t}if(d>e&&!this._layoutManager.layoutConfig.settings.disableTabOverflowDropdown){if(o)i===r&&(l.style.zIndex="auto",l.style.marginLeft="",l.parentElement!==this._element&&this._element.appendChild(l));else{let t;if(t=r>0&&r<=i?(d-e)/(i-1):(d-e)/i,t<s){for(let e=0;e<=i;e++){const n=e!==r&&0!==e?"-"+gt(t):"";this._tabs[e].element.style.zIndex=gt(i-e),this._tabs[e].element.style.marginLeft=n}this._lastVisibleTabIndex=i,l.parentElement!==this._element&&this._element.appendChild(l)}else o=!0}if(o&&i!==r){if(!t)return!1;l.style.zIndex="auto",l.style.marginLeft="",l.parentElement!==this._dropdownElement&&this._dropdownElement.appendChild(l)}}else this._lastVisibleTabIndex=i,l.style.zIndex="auto",l.style.marginLeft="",l.parentElement!==this._element&&this._element.appendChild(l)}}return!0}showAdditionalTabsDropdown(){this._dropdownElement.style.display=""}hideAdditionalTabsDropdown(){this._dropdownElement.style.display="none"}handleTabCloseEvent(t){this._componentRemoveEvent(t)}handleTabFocusEvent(t){this._componentFocusEvent(t)}handleTabDragStartEvent(t,e,i,n){this._componentDragStartEvent(t,e,i,n)}_kickScrollWrapperAnimation(){const t=this._element;t.style.animationPlayState="paused",t.offsetWidth,t.style.removeProperty("animation-play-state")}}class Ht extends zt{get show(){return this._show}get side(){return this._side}get leftRightSided(){return this._leftRightSided}get layoutManager(){return this._layoutManager}get parent(){return this._parent}get tabs(){return this._tabsContainer.tabs}get lastVisibleTabIndex(){return this._tabsContainer.lastVisibleTabIndex}get element(){return this._element}get tabsContainerElement(){return this._tabsContainer.element}get controlsContainerElement(){return this._controlsContainerElement}constructor(t,e,i,n,o,s,r,a,l,h,d,c,u){if(super(),this._layoutManager=t,this._parent=e,this._configClosable=n,this._getActiveComponentItemEvent=o,this._popoutEvent=r,this._maximiseToggleEvent=a,this._clickEvent=l,this._touchStartEvent=h,this._componentRemoveEvent=d,this._componentFocusEvent=c,this._componentDragStartEvent=u,this._clickListener=t=>this.onClick(t),this._touchStartListener=t=>this.onTouchStart(t),this._rowColumnClosable=!0,this._closeButton=null,this._popoutButton=null,this._tabsContainer=new Wt(this._layoutManager,t=>this.handleTabInitiatedComponentRemoveEvent(t),t=>this.handleTabInitiatedComponentFocusEvent(t),(t,e,i,n)=>this.handleTabInitiatedDragStartEvent(t,e,i,n),()=>this.processTabDropdownActiveChanged()),this._show=i.show,this._popoutEnabled=i.popoutEnabled,this._popoutLabel=i.popoutLabel,this._maximiseEnabled=i.maximiseEnabled,this._maximiseLabel=i.maximiseLabel,this._minimiseEnabled=i.minimiseEnabled,this._minimiseLabel=i.minimiseLabel,this._closeEnabled=i.closeEnabled,this._closeLabel=i.closeLabel,this._tabDropdownEnabled=i.tabDropdownEnabled,this._tabDropdownLabel=i.tabDropdownLabel,this.setSide(i.side),this._canRemoveComponent=this._configClosable,this._element=document.createElement("section"),this._element.classList.add("lm_header"),this._controlsContainerElement=document.createElement("section"),this._controlsContainerElement.classList.add("lm_controls"),"scroll"===this._layoutManager.layoutConfig.settings.tabOverflowBehavior){const t=document.createElement("div");t.classList.add("lm_tabs_scroll_shadow"),t.appendChild(this._tabsContainer.element),this._element.appendChild(t)}else this._element.appendChild(this._tabsContainer.element);this._element.appendChild(this._controlsContainerElement),this._element.appendChild(this._tabsContainer.dropdownElement),this._element.addEventListener("click",this._clickListener,{passive:!0}),this._element.addEventListener("touchstart",this._touchStartListener,{passive:!0}),this._documentMouseUpListener=()=>this._tabsContainer.hideAdditionalTabsDropdown(),globalThis.document.addEventListener("mouseup",this._documentMouseUpListener,{passive:!0}),this._tabControlOffset=this._layoutManager.layoutConfig.settings.tabControlOffset,this._tabDropdownEnabled&&(this._tabDropdownButton=new Ut(this,this._tabDropdownLabel,"lm_tabdropdown",()=>this._tabsContainer.showAdditionalTabsDropdown())),this._popoutEnabled&&(this._popoutButton=new Ut(this,this._popoutLabel,"lm_popout",()=>this.handleButtonPopoutEvent())),this._maximiseEnabled&&(this._maximiseButton=new Ut(this,this._maximiseLabel,"lm_maximise",t=>this.handleButtonMaximiseToggleEvent(t))),this._configClosable&&(this._closeButton=new Ut(this,this._closeLabel,"lm_close",()=>s())),this.processTabDropdownActiveChanged()}destroy(){this.emit("destroy"),this._popoutEvent=void 0,this._maximiseToggleEvent=void 0,this._clickEvent=void 0,this._touchStartEvent=void 0,this._componentRemoveEvent=void 0,this._componentFocusEvent=void 0,this._componentDragStartEvent=void 0,this._tabsContainer.destroy(),globalThis.document.removeEventListener("mouseup",this._documentMouseUpListener),this._element.remove()}createTab(t,e){this._tabsContainer.createTab(t,e)}removeTab(t){this._tabsContainer.removeTab(t)}processActiveComponentChanged(t){this._tabsContainer.processActiveComponentChanged(t),this.updateTabSizes()}setSide(t){this._side=t,this._leftRightSided=[$.right,$.left].includes(this._side)}setRowColumnClosable(t){this._rowColumnClosable=t,this.updateClosability()}updateClosability(){let t;if(this._configClosable)if(this._rowColumnClosable){t=!0;const e=this.tabs.length;for(let i=0;i<e;i++){if(!this._tabsContainer.tabs[i].componentItem.isClosable){t=!1;break}}}else t=!1;else t=!1;null!==this._closeButton&&Ct(this._closeButton.element,t),null!==this._popoutButton&&Ct(this._popoutButton.element,t),this._canRemoveComponent=t||this._tabsContainer.tabCount>1}applyFocusedValue(t){t?this._element.classList.add("lm_focused"):this._element.classList.remove("lm_focused")}processMaximised(){if(void 0===this._maximiseButton)throw new W("HPMAX16997");this._maximiseButton.element.setAttribute("title",this._minimiseLabel)}processMinimised(){if(void 0===this._maximiseButton)throw new W("HPMIN16997");this._maximiseButton.element.setAttribute("title",this._maximiseLabel)}updateTabSizes(){if(this._tabsContainer.tabCount>0){const t=this._show?this._layoutManager.layoutConfig.dimensions.headerHeight:0;let e;this._leftRightSided?(this._element.style.height="",this._element.style.width=gt(t)):(this._element.style.width="",this._element.style.height=gt(t)),e=this._leftRightSided?this._element.offsetHeight-this._controlsContainerElement.offsetHeight-this._tabControlOffset:this._element.offsetWidth-this._controlsContainerElement.offsetWidth-this._tabControlOffset,this._tabsContainer.updateTabSizes(e,this._getActiveComponentItemEvent())}}handleTabInitiatedComponentRemoveEvent(t){if(this._canRemoveComponent){if(void 0===this._componentRemoveEvent)throw new W("HHTCE22294");this._componentRemoveEvent(t)}}handleTabInitiatedComponentFocusEvent(t){if(void 0===this._componentFocusEvent)throw new W("HHTAE22294");this._componentFocusEvent(t)}handleTabInitiatedDragStartEvent(t,e,i,n){if(this._canRemoveComponent){if(void 0===this._componentDragStartEvent)throw new W("HHTDSE22294");this._componentDragStartEvent(t,e,i,n)}else i.cancelDrag()}processTabDropdownActiveChanged(){void 0!==this._tabDropdownButton&&Ct(this._tabDropdownButton.element,this._tabsContainer.dropdownActive)}handleButtonPopoutEvent(){if(this._layoutManager.layoutConfig.settings.popoutWholeStack){if(void 0===this._popoutEvent)throw new W("HHBPOE17834");this._popoutEvent()}else{const t=this._getActiveComponentItemEvent();t&&t.popout()}}handleButtonMaximiseToggleEvent(t){if(void 0===this._maximiseToggleEvent)throw new W("HHBMTE16834");this._maximiseToggleEvent()}onClick(t){t.target===this._element&&this.notifyClick(t)}onTouchStart(t){t.target===this._element&&this.notifyTouchStart(t)}notifyClick(t){if(void 0===this._clickEvent)throw new W("HNHC46834");this._clickEvent(t)}notifyTouchStart(t){if(void 0===this._touchStartEvent)throw new W("HNHTS46834");this._touchStartEvent(t)}}class Ft extends kt{get childElementContainer(){return this._childElementContainer}get header(){return this._header}get headerShow(){return this._header.show}get headerSide(){return this._header.side}get headerLeftRightSided(){return this._header.leftRightSided}get contentAreaDimensions(){return this._contentAreaDimensions}get initialWantMaximise(){return this._initialWantMaximise}get isMaximised(){return this===this.layoutManager.maximisedStack}get stackParent(){if(!this.parent)throw new Error("Stack should always have a parent");return this.parent}constructor(t,e,i){var n,o,s,r,a,l,h,d,c,u,m,p,g,f,v,_,y,w,C;super(t,e,i,Ft.createElement(document)),this._headerSideChanged=!1,this._resizeListener=()=>this.handleResize(),this._maximisedListener=()=>this.handleMaximised(),this._minimisedListener=()=>this.handleMinimised(),this._headerConfig=e.header;const I=t.layoutConfig.header,b=e.content;let S;if(1!==b.length)S=void 0;else{S=b[0].header}this._initialWantMaximise=e.maximised,this._initialActiveItemIndex=null!==(n=e.activeItemIndex)&&void 0!==n?n:0;const E=null!==(r=null!==(s=null===(o=this._headerConfig)||void 0===o?void 0:o.show)&&void 0!==s?s:null==S?void 0:S.show)&&void 0!==r?r:I.show,x=null!==(h=null!==(l=null===(a=this._headerConfig)||void 0===a?void 0:a.popout)&&void 0!==l?l:null==S?void 0:S.popout)&&void 0!==h?h:I.popout,L=null!==(u=null!==(c=null===(d=this._headerConfig)||void 0===d?void 0:d.maximise)&&void 0!==c?c:null==S?void 0:S.maximise)&&void 0!==u?u:I.maximise,z=null!==(g=null!==(p=null===(m=this._headerConfig)||void 0===m?void 0:m.close)&&void 0!==p?p:null==S?void 0:S.close)&&void 0!==g?g:I.close,M=null!==(_=null!==(v=null===(f=this._headerConfig)||void 0===f?void 0:f.minimise)&&void 0!==v?v:null==S?void 0:S.minimise)&&void 0!==_?_:I.minimise,P=null!==(C=null!==(w=null===(y=this._headerConfig)||void 0===y?void 0:y.tabDropdown)&&void 0!==w?w:null==S?void 0:S.tabDropdown)&&void 0!==C?C:I.tabDropdown;this._maximisedEnabled=!1!==L;const T={show:!1!==E,side:!1===E?$.top:E,popoutEnabled:!1!==x,popoutLabel:!1===x?"":x,maximiseEnabled:this._maximisedEnabled,maximiseLabel:!1===L?"":L,closeEnabled:!1!==z,closeLabel:!1===z?"":z,minimiseEnabled:!0,minimiseLabel:M,tabDropdownEnabled:!1!==P,tabDropdownLabel:!1===P?"":P};this._header=new Ht(t,this,T,e.isClosable&&!1!==z,()=>this.getActiveComponentItem(),()=>this.remove(),()=>this.handlePopoutEvent(),()=>this.toggleMaximise(),t=>this.handleHeaderClickEvent(t),t=>this.handleHeaderTouchStartEvent(t),t=>this.handleHeaderComponentRemoveEvent(t),t=>this.handleHeaderComponentFocusEvent(t),(t,e,i,n)=>this.handleHeaderComponentStartDragEvent(t,e,i,n)),this.isStack=!0,this._childElementContainer=document.createElement("section"),this._childElementContainer.classList.add("lm_items"),this.on("resize",this._resizeListener),this._maximisedEnabled&&(this.on("maximised",this._maximisedListener),this.on("minimised",this._minimisedListener)),this.element.appendChild(this._header.element),this.element.appendChild(this._childElementContainer),this.setupHeaderPosition(),this._header.updateClosability()}updateSize(t){this.layoutManager.beginVirtualSizedContainerAdding();try{this.updateNodeSize(),this.updateContentItemsSize(t)}finally{this.layoutManager.endVirtualSizedContainerAdding()}}init(){if(!0===this.isInitialised)return;this.updateNodeSize();for(let t=0;t<this.contentItems.length;t++)this._childElementContainer.appendChild(this.contentItems[t].element);super.init();const t=this.contentItems,e=t.length;if(e>0){if(this._initialActiveItemIndex<0||this._initialActiveItemIndex>=e)throw new Error(`ActiveItemIndex out of range: ${this._initialActiveItemIndex} id: ${this.id}`);for(let i=0;i<e;i++){const e=t[i];if(!(e instanceof At))throw new Error(`Stack Content Item is not of type ComponentItem: ${i} id: ${this.id}`);this._header.createTab(e,i),e.hide(),e.container.setBaseLogicalZIndex()}this.setActiveComponentItem(t[this._initialActiveItemIndex],!1),this._header.updateTabSizes()}this._header.updateClosability(),this.initContentItems()}setActiveContentItem(t){if(!Tt.isComponentItem(t))throw new Error("Stack.setActiveContentItem: item is not a ComponentItem");this.setActiveComponentItem(t,!1)}setActiveComponentItem(t,e,i=!1){if(this._activeComponentItem!==t){if(-1===this.contentItems.indexOf(t))throw new Error("componentItem is not a child of this stack");this.layoutManager.beginSizeInvalidation();try{void 0!==this._activeComponentItem&&this._activeComponentItem.hide(),this._activeComponentItem=t,this._header.processActiveComponentChanged(t),t.show()}finally{this.layoutManager.endSizeInvalidation()}this.emit("activeContentItemChanged",t),this.layoutManager.emit("activeContentItemChanged",t),this.emitStateChangedEvent()}(this.focused||e)&&this.layoutManager.setFocusedComponentItem(t,i)}getActiveContentItem(){var t;return null!==(t=this.getActiveComponentItem())&&void 0!==t?t:null}getActiveComponentItem(){return this._activeComponentItem}focusActiveContentItem(){var t;null===(t=this._activeComponentItem)||void 0===t||t.focus()}setFocusedValue(t){this._header.applyFocusedValue(t),super.setFocusedValue(t)}setRowColumnClosable(t){this._header.setRowColumnClosable(t)}newComponent(t,e,i,n){const o={type:"component",componentType:t,componentState:e,title:i};return this.newItem(o,n)}addComponent(t,e,i,n){const o={type:"component",componentType:t,componentState:e,title:i};return this.addItem(o,n)}newItem(t,e){return e=this.addItem(t,e),this.contentItems[e]}addItem(t,e){this.layoutManager.checkMinimiseMaximisedStack();const i=at.resolve(t,!1),n=this.layoutManager.createAndInitContentItem(i,this);return this.addChild(n,e)}addChild(t,e,i=!1){if(void 0!==e&&e>this.contentItems.length)throw e-=1,new B("SAC99728");if(t instanceof At)return e=super.addChild(t,e),this._childElementContainer.appendChild(t.element),this._header.createTab(t,e),this.setActiveComponentItem(t,i),this._header.updateTabSizes(),this.updateSize(!1),t.container.setBaseLogicalZIndex(),this._header.updateClosability(),this.emitStateChangedEvent(),e;throw new B("SACC88532")}removeChild(t,e){const i=t,n=this.contentItems.indexOf(i),o=1===this.contentItems.length;if(this._activeComponentItem===i&&(i.focused&&i.blur(),!o)){const t=0===n?1:n-1;this.setActiveComponentItem(this.contentItems[t],!1)}this._header.removeTab(i),super.removeChild(i,e),o||this._header.updateClosability(),this.emitStateChangedEvent()}toggleMaximise(){this.isMaximised?this.minimise():this.maximise()}maximise(){if(!this.isMaximised){this.layoutManager.setMaximisedStack(this);const t=this.contentItems,e=t.length;for(let i=0;i<e;i++){const e=t[i];if(!(e instanceof At))throw new B("SMAXI87773");e.enterStackMaximised()}this.emitStateChangedEvent()}}minimise(){if(this.isMaximised){this.layoutManager.setMaximisedStack(void 0);const t=this.contentItems,e=t.length;for(let i=0;i<e;i++){const e=t[i];if(!(e instanceof At))throw new B("SMINI87773");e.exitStackMaximised()}this.emitStateChangedEvent()}}destroy(){var t;(null===(t=this._activeComponentItem)||void 0===t?void 0:t.focused)&&this._activeComponentItem.blur(),super.destroy(),this.off("resize",this._resizeListener),this._maximisedEnabled&&(this.off("maximised",this._maximisedListener),this.off("minimised",this._minimisedListener)),this._header.destroy()}toConfig(){let t;if(this._activeComponentItem&&(t=this.contentItems.indexOf(this._activeComponentItem),t<0))throw new Error("active component item not found in stack");if(this.contentItems.length>0&&void 0===t)throw new Error("expected non-empty stack to have an active component item");return{type:"stack",content:this.calculateConfigContent(),size:this.size,sizeUnit:this.sizeUnit,minSize:this.minSize,minSizeUnit:this.minSizeUnit,id:this.id,isClosable:this.isClosable,maximised:this.isMaximised,header:this.createHeaderConfig(),activeItemIndex:t}}onDrop(t,e){if("header"===this._dropSegment){if(this.resetHeaderDropZone(),void 0===this._dropIndex)throw new W("SODDI68990");return void this.addChild(t,this._dropIndex)}if("body"===this._dropSegment)return void this.addChild(t,0,!0);const i="top"===this._dropSegment||"bottom"===this._dropSegment,n="left"===this._dropSegment||"right"===this._dropSegment,o="top"===this._dropSegment||"left"===this._dropSegment,s=i&&this.stackParent.isColumn||n&&this.stackParent.isRow;if(t.isComponent){const e=tt.createDefault();e.header=this.createHeaderConfig();const i=this.layoutManager.createAndInitContentItem(e,this);i.addChild(t),t=i}if(t.type===q.row||t.type===q.column){const e=tt.createDefault();e.header=this.createHeaderConfig();const i=this.layoutManager.createContentItem(e,this);i.addChild(t),t=i}if(s){const e=this.stackParent.contentItems.indexOf(this);this.stackParent.addChild(t,o?e:e+1,!0),this.size*=.5,t.size=this.size,t.sizeUnit=this.sizeUnit,this.stackParent.updateSize(!1)}else{const e=i?q.column:q.row,n=J.createDefault(e),s=this.layoutManager.createContentItem(n,this);this.stackParent.replaceChild(this,s),s.addChild(t,o?0:void 0,!0),s.addChild(this,o?void 0:0,!0),this.size=50,t.size=50,t.sizeUnit=Y.Percent,s.updateSize(!1)}}highlightDropZone(t,e){for(const i in this._contentAreaDimensions){const n=i,o=this._contentAreaDimensions[n].hoverArea;if(o.x1<t&&o.x2>t&&o.y1<e&&o.y2>e)return void("header"===n?(this._dropSegment="header",this.highlightHeaderDropZone(this._header.leftRightSided?e:t)):(this.resetHeaderDropZone(),this.highlightBodyDropZone(n)))}}getArea(){if("none"===this.element.style.display)return null;const t=super.getElementArea(this._header.element),e=super.getElementArea(this._childElementContainer);if(null===t||null===e)throw new V("SGAHC13086");const i=e.x2-e.x1,n=e.y2-e.y1;return this._contentAreaDimensions={header:{hoverArea:{x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2},highlightArea:{x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2}}},0===this.contentItems.length?(this._contentAreaDimensions.body={hoverArea:{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2},highlightArea:{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2}},super.getElementArea(this.element)):(this._contentAreaDimensions.left={hoverArea:{x1:e.x1,y1:e.y1,x2:e.x1+.25*i,y2:e.y2},highlightArea:{x1:e.x1,y1:e.y1,x2:e.x1+.5*i,y2:e.y2}},this._contentAreaDimensions.top={hoverArea:{x1:e.x1+.25*i,y1:e.y1,x2:e.x1+.75*i,y2:e.y1+.5*n},highlightArea:{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y1+.5*n}},this._contentAreaDimensions.right={hoverArea:{x1:e.x1+.75*i,y1:e.y1,x2:e.x2,y2:e.y2},highlightArea:{x1:e.x1+.5*i,y1:e.y1,x2:e.x2,y2:e.y2}},this._contentAreaDimensions.bottom={hoverArea:{x1:e.x1+.25*i,y1:e.y1+.5*n,x2:e.x1+.75*i,y2:e.y2},highlightArea:{x1:e.x1,y1:e.y1+.5*n,x2:e.x2,y2:e.y2}},super.getElementArea(this.element))}positionHeader(t){this._header.side!==t&&(this._header.setSide(t),this._headerSideChanged=!0,this.setupHeaderPosition())}updateNodeSize(){if("none"!==this.element.style.display){const t=wt(this.element);if(this._header.show){t[this._header.leftRightSided?N.width:N.height]-=this.layoutManager.layoutConfig.dimensions.headerHeight}this._childElementContainer.style.width=gt(t.width),this._childElementContainer.style.height=gt(t.height);for(let e=0;e<this.contentItems.length;e++)this.contentItems[e].element.style.width=gt(t.width),this.contentItems[e].element.style.height=gt(t.height);this.emit("resize"),this.emitStateChangedEvent()}}highlightHeaderDropZone(t){var e;const i=this._header.lastVisibleTabIndex+1,n=this._header.tabsContainerElement.childNodes,o=new Array(i);let s=0,r=0;for(;r<i;){const t=n[s++];t!==this.layoutManager.tabDropPlaceholder&&(o[r++]=t)}if(null===this.layoutManager.dropTargetIndicator)throw new V("SHHDZDTI97110");if(0===i){const t=this._header.element.getBoundingClientRect();t.top,document.body.scrollTop,t.left,document.body.scrollLeft;t.height,t.height,this._dropIndex=0}else{if("scroll"===this.layoutManager.layoutConfig.settings.tabOverflowBehavior){const e=12,i=this._header.tabsContainerElement,n=i.getBoundingClientRect();t-n.left<e?i.scrollBy({left:-1}):n.right-t<e&&i.scrollBy({left:1})}let n,s,r,a=0,l=!1;do{r=o[a];const e=r.getBoundingClientRect(),i=e.top+document.body.scrollTop,h=e.left+document.body.scrollLeft;this._header.leftRightSided?(n=i,s=e.height):(n=h,s=e.width),t>=n&&t<n+s?l=!0:a++}while(a<i&&!l);if(!1===l&&t<n)return;t<n+s/2?(this._dropIndex=a,r.insertAdjacentElement("beforebegin",this.layoutManager.tabDropPlaceholder)):(this._dropIndex=Math.min(a+1,i),r.insertAdjacentElement("afterend",this.layoutManager.tabDropPlaceholder)),null===(e=this.layoutManager.dropTargetIndicator)||void 0===e||e.highlightElement(this.layoutManager.tabDropPlaceholder,0)}}resetHeaderDropZone(){this.layoutManager.tabDropPlaceholder.remove()}setupHeaderPosition(){Ct(this._header.element,this._header.show),this.element.classList.remove("lm_left","lm_right","lm_bottom"),this._header.leftRightSided&&this.element.classList.add("lm_"+this._header.side),this.updateSize(!1)}highlightBodyDropZone(t){if(void 0===this._contentAreaDimensions)throw new W("SHBDZC82265");{const e=this._contentAreaDimensions[t].highlightArea,i=this.layoutManager.dropTargetIndicator;if(null===i)throw new V("SHBDZD96110");i.highlightArea(e,1),this._dropSegment=t}}handleResize(){
//! this._header.updateTabSizes()
"block"===getComputedStyle(this.layoutManager.container).display&&this._header.updateTabSizes()}handleMaximised(){this._header.processMaximised()}handleMinimised(){this._header.processMinimised()}handlePopoutEvent(){this.popout()}handleHeaderClickEvent(t){const e=zt.headerClickEventName,i=new zt.ClickBubblingEvent(e,this,t);this.emit(e,i)}handleHeaderTouchStartEvent(t){const e=zt.headerTouchStartEventName,i=new zt.TouchStartBubblingEvent(e,this,t);this.emit(e,i)}handleHeaderComponentRemoveEvent(t){this.removeChild(t,!1)}handleHeaderComponentFocusEvent(t){this.setActiveComponentItem(t,!0)}handleHeaderComponentStartDragEvent(t,e,i,n){!0===this.isMaximised&&this.toggleMaximise(),this.layoutManager.startComponentDrag(t,e,i,n,this)}createHeaderConfig(){if(this._headerSideChanged){const t=!!this._header.show&&this._header.side;let e=Q.Header.createCopy(this._headerConfig,t);return void 0===e&&(e={show:t,popout:void 0,maximise:void 0,close:void 0,minimise:void 0,tabDropdown:void 0}),e}return Q.Header.createCopy(this._headerConfig)}emitStateChangedEvent(){this.emitBaseBubblingEvent("stateChanged")}}!function(t){t.createElement=function(t){const e=t.createElement("div");return e.classList.add("lm_item"),e.classList.add("lm_stack"),e}}(Ft||(Ft={}));class Nt extends zt{get element(){return this._element}constructor(t,e,i,n,o,s){if(super(),this._dragListener=i,this._layoutManager=n,this._componentItem=o,this._originalParent=s,this._area=null,this._lastValidArea=null,this._dragListener.on("drag",(t,e,i)=>this.onDrag(t,e,i)),this._dragListener.on("dragStop",()=>this.onDrop()),this.createDragProxyElements(t,e),null===this._componentItem.parent)throw new V("DPC10097");this._componentItemFocused=this._componentItem.focused,this._componentItemFocused&&this._componentItem.blur(),this._componentItem.parent.removeChild(this._componentItem,!0),this.setDimensions(),document.body.appendChild(this._element),this.determineMinMaxXY(),this._layoutManager.calculateItemAreas(),this.setDropPosition(t,e)}createDragProxyElements(t,e){this._element=document.createElement("div"),this._element.classList.add("lm_dragProxy");const i=document.createElement("div");i.classList.add("lm_header");const n=document.createElement("div");n.classList.add("lm_tabs");const o=document.createElement("div");o.classList.add("lm_tab");const s=document.createElement("span");s.classList.add("lm_title"),o.appendChild(s),n.appendChild(o),i.appendChild(n),this._proxyContainerElement=document.createElement("div"),this._proxyContainerElement.classList.add("lm_content"),this._element.appendChild(i),this._element.appendChild(this._proxyContainerElement),this._originalParent instanceof Ft&&this._originalParent.headerShow&&(this._sided=this._originalParent.headerLeftRightSided,this._element.classList.add("lm_"+this._originalParent.headerSide),[$.right,$.bottom].indexOf(this._originalParent.headerSide)>=0&&this._proxyContainerElement.insertAdjacentElement("afterend",i)),this._element.style.left=gt(t),this._element.style.top=gt(e),o.setAttribute("title",this._componentItem.title),s.insertAdjacentText("afterbegin",this._componentItem.title),this._proxyContainerElement.appendChild(this._componentItem.element)}determineMinMaxXY(){const t=this._layoutManager.groundItem;if(void 0===t)throw new W("DPDMMXY73109");{const e=t.element.getBoundingClientRect();this._minX=e.left+document.body.scrollLeft,this._minY=e.top+document.body.scrollTop,this._maxX=this._minX+e.width,this._maxY=this._minY+e.height}}onDrag(t,e,i){const n=i.pageX,o=i.pageY;this.setDropPosition(n,o),this._componentItem.drag()}setDropPosition(t,e){this._layoutManager.layoutConfig.settings.constrainDragToContainer&&(t<=this._minX?t=Math.ceil(this._minX):t>=this._maxX&&(t=Math.floor(this._maxX)),e<=this._minY?e=Math.ceil(this._minY):e>=this._maxY&&(e=Math.floor(this._maxY))),this._element.style.left=gt(t),this._element.style.top=gt(e),this._area=this._layoutManager.getArea(t,e),null!==this._area&&(this._lastValidArea=this._area,this._area.contentItem.highlightDropZone(t,e,this._area))}onDrop(){const t=this._layoutManager.dropTargetIndicator;if(null===t)throw new V("DPOD30011");let e;if(t.hide(),this._componentItem.exitDragMode(),null!==this._area)e=this._componentItem,this._area.contentItem.onDrop(e,this._area);else if(null!==this._lastValidArea){e=this._componentItem;this._lastValidArea.contentItem.onDrop(e,this._lastValidArea)}else this._originalParent?(e=this._componentItem,this._originalParent.addChild(e)):this._componentItem.destroy();this._element.remove(),this._layoutManager.emit("itemDropped",this._componentItem),this._componentItemFocused&&void 0!==e&&e.focus()}setDimensions(){const t=this._layoutManager.layoutConfig.dimensions;if(void 0===t)throw new Error("DragProxy.setDimensions: dimensions undefined");let e=t.dragProxyWidth,i=t.dragProxyHeight;if(void 0===e||void 0===i)throw new Error("DragProxy.setDimensions: width and/or height undefined");const n=!1===this._layoutManager.layoutConfig.header.show?0:t.headerHeight;this._element.style.width=gt(e),this._element.style.height=gt(i),e-=this._sided?n:0,i-=this._sided?0:n,this._proxyContainerElement.style.width=gt(e),this._proxyContainerElement.style.height=gt(i),this._componentItem.enterDragMode(e,i),this._componentItem.show()}}class $t{constructor(t,e,i,n,o,s,r){this._layoutManager=t,this._element=e,this._extraAllowableChildTargets=i,this._componentTypeOrFtn=n,this._componentState=o,this._title=s,this._id=r,this._dragListener=null,this._dummyGroundContainer=document.createElement("div");const a=it.createDefault("row");this._dummyGroundContentItem=new Bt(this._layoutManager,a,this._dummyGroundContainer),this.createDragListener()}destroy(){this.removeDragListener()}createDragListener(){this.removeDragListener(),this._dragListener=new Dt(this._element,this._extraAllowableChildTargets),this._dragListener.on("dragStart",(t,e)=>this.onDragStart(t,e)),this._dragListener.on("dragStop",()=>this.onDragStop())}onDragStart(t,e){var i;const n="component";let o;if("function"==typeof this._componentTypeOrFtn){const t=this._componentTypeOrFtn();o=$t.isDragSourceComponentItemConfig(t)?{type:n,componentState:t.state,componentType:t.type,title:null!==(i=t.title)&&void 0!==i?i:this._title}:t}else o={type:n,componentState:this._componentState,componentType:this._componentTypeOrFtn,title:this._title,id:this._id};const s=dt.resolve(o,!1),r=new At(this._layoutManager,s,this._dummyGroundContentItem);if(this._dummyGroundContentItem.contentItems.push(r),null===this._dragListener)throw new V("DSODSD66746");{const i=new Nt(t,e,this._dragListener,this._layoutManager,r,this._dummyGroundContentItem),n=this._layoutManager.transitionIndicator;if(null===n)throw new V("DSODST66746");n.transitionElements(this._element,i.element)}}onDragStop(){this.createDragListener()}removeDragListener(){null!==this._dragListener&&(this._dragListener.destroy(),this._dragListener=null)}}!function(t){t.isDragSourceComponentItemConfig=function(t){return!("componentType"in t)}}($t||($t={}));class Gt{constructor(){this.targetElement=null,this.observeInterval=null,this._element=document.createElement("div"),this._element.classList.add("lm_dropTargetIndicator");const t=document.createElement("div");t.classList.add("lm_inner"),this._element.appendChild(t),document.body.appendChild(this._element)}destroy(){this.clearHighlightedElement(),this._element.remove()}highlightArea(t,e){this.clearHighlightedElement(),this.highlightAreaInternal(t,e)}highlightAreaInternal(t,e){this._element.style.left=gt(t.x1+e),this._element.style.top=gt(t.y1+e),this._element.style.width=gt(t.x2-t.x1-e),this._element.style.height=gt(t.y2-t.y1-e),this._element.style.display="block"}highlightElement(t,e){if(this.targetElement===t)return;this.clearHighlightedElement(),this.targetElement=t;const i=t.getBoundingClientRect(),n={x1:i.left,y1:i.top,x2:i.right,y2:i.bottom};this.highlightAreaInternal(n,e),this.observeInterval=setInterval(()=>{const i=t.getBoundingClientRect(),n={x1:i.left,y1:i.top,x2:i.right,y2:i.bottom};this.highlightAreaInternal(n,e)},16)}clearHighlightedElement(){this.observeInterval&&(clearInterval(this.observeInterval),this.observeInterval=null),this.targetElement=null}hide(){Ct(this._element,!1),this.clearHighlightedElement()}}class jt{constructor(){this._element=document.createElement("div"),this._element.classList.add("lm_transition_indicator"),document.body.appendChild(this._element),this._toElement=null,this._fromDimensions=null,this._totalAnimationDuration=200,this._animationStartTime=null}destroy(){this._element.remove()}transitionElements(t,e){}nextAnimationFrame(){}measure(t){const e=t.getBoundingClientRect();return{left:e.left,top:e.top,width:t.offsetWidth,height:t.offsetHeight}}}class Zt extends zt{constructor(t){super(),this._layoutManager=t,this._childEventListener=t=>this.onEventFromChild(t),globalThis.addEventListener(Zt.ChildEventName,this._childEventListener,{passive:!0})}emit(t,...e){"userBroadcast"===t?this.emitUserBroadcast(...e):super.emit(t,...e)}emitUserBroadcast(...t){this.handleUserBroadcastEvent("userBroadcast",t)}destroy(){globalThis.removeEventListener(Zt.ChildEventName,this._childEventListener)}handleUserBroadcastEvent(t,e){this._layoutManager.isSubWindow?this.propagateToParent(t,e):this.propagateToThisAndSubtree(t,e)}onEventFromChild(t){const e=t.detail;this.handleUserBroadcastEvent(e.eventName,e.args)}propagateToParent(t,e){const i={bubbles:!0,cancelable:!0,detail:{layoutManager:this._layoutManager,eventName:t,args:e}},n=new CustomEvent(Zt.ChildEventName,i),o=globalThis.opener;if(null===o)throw new V("EHPTP15778");o.dispatchEvent(n)}propagateToThisAndSubtree(t,e){this.emitUnknown(t,...e);for(let i=0;i<this._layoutManager.openPopouts.length;i++){const n=this._layoutManager.openPopouts[i].getGlInstance();n&&n.eventHub.propagateToThisAndSubtree(t,e)}}}!function(t){t.ChildEventName="gl_child_event"}(Zt||(Zt={}));class qt extends zt{get container(){return this._containerElement}get isInitialised(){return this._isInitialised}get groundItem(){return this._groundItem}get root(){return this._groundItem}get openPopouts(){return this._openPopouts}get dropTargetIndicator(){return this._dropTargetIndicator}get transitionIndicator(){return this._transitionIndicator}get width(){return this._width}get height(){return this._height}get eventHub(){return this._eventHub}get rootItem(){if(void 0===this._groundItem)throw new Error("Cannot access rootItem before init");return 0===this._groundItem.contentItems.length?void 0:this._groundItem.contentItems[0]}get focusedComponentItem(){return this._focusedComponentItem}get tabDropPlaceholder(){return this._tabDropPlaceholder}get maximisedStack(){return this._maximisedStack}get deprecatedConstructor(){return!this.isSubWindow&&void 0!==this._constructorOrSubWindowLayoutConfig}constructor(t){super(),this.resizeWithContainerAutomatically=!1,this.resizeDebounceInterval=100,this.resizeDebounceExtendedWhenPossible=!0,this._isInitialised=!1,this._groundItem=void 0,this._openPopouts=[],this._dropTargetIndicator=null,this._transitionIndicator=null,this._itemAreas=[],this._maximisePlaceholder=qt.createMaximisePlaceElement(document),this._tabDropPlaceholder=qt.createTabDropPlaceholderElement(document),this._dragSources=[],this._updatingColumnsResponsive=!1,this._firstLoad=!0,this._eventHub=new Zt(this),this._width=null,this._height=null,this._virtualSizedContainers=[],this._virtualSizedContainerAddingBeginCount=0,this._sizeInvalidationBeginCount=0,this._resizeObserver=new ResizeObserver(()=>this.handleContainerResize()),this._windowBeforeUnloadListener=()=>this.onBeforeUnload(),this._windowBeforeUnloadListening=!1,this._maximisedStackBeforeDestroyedListener=t=>this.cleanupBeforeMaximisedStackDestroyed(t),this.isSubWindow=t.isSubWindow,this._constructorOrSubWindowLayoutConfig=t.constructorOrSubWindowLayoutConfig,E.checkInitialise(),K.checkInitialise(),void 0!==t.containerElement&&(this._containerElement=t.containerElement)}destroy(){if(this._isInitialised){this._windowBeforeUnloadListening&&(globalThis.removeEventListener("beforeunload",this._windowBeforeUnloadListener),this._windowBeforeUnloadListening=!1),!0===this.layoutConfig.settings.closePopoutsOnUnload&&this.closeAllOpenPopouts(),this._resizeObserver.disconnect(),this.checkClearResizeTimeout(),void 0!==this._groundItem&&this._groundItem.destroy(),this._tabDropPlaceholder.remove(),null!==this._dropTargetIndicator&&this._dropTargetIndicator.destroy(),null!==this._transitionIndicator&&this._transitionIndicator.destroy(),this._eventHub.destroy();for(const t of this._dragSources)t.destroy();this._dragSources=[],this._isInitialised=!1}}minifyConfig(t){return st.minifyConfig(t)}unminifyConfig(t){return st.unminifyConfig(t)}init(){let t;if(this.setContainer(),this._dropTargetIndicator=new Gt,this._transitionIndicator=new jt,this.updateSizeFromContainer(),this.isSubWindow){if(void 0===this._constructorOrSubWindowLayoutConfig)throw new W("LMIU07155");{const e=this._constructorOrSubWindowLayoutConfig.root;if(void 0===e)throw new B("LMIC07156");if(!at.isComponent(e))throw new B("LMIC07157");t=e;const i=mt.resolve(this._constructorOrSubWindowLayoutConfig);this.layoutConfig=Object.assign(Object.assign({},i),{root:void 0})}}else void 0===this._constructorOrSubWindowLayoutConfig?this.layoutConfig=st.createDefault():this.layoutConfig=mt.resolve(this._constructorOrSubWindowLayoutConfig);const e=this.layoutConfig;this._groundItem=new Bt(this,e.root,this._containerElement),this._groundItem.init(),this.checkLoadedLayoutMaximiseItem(),this._resizeObserver.observe(this._containerElement),this._isInitialised=!0,this.adjustColumnsResponsive(),this.emit("initialised"),void 0!==t&&this.loadComponentAsRoot(t)}loadLayout(t){if(!this.isInitialised)throw new Error("GoldenLayout: Need to call init() if LayoutConfig with defined root passed to constructor");if(void 0===this._groundItem)throw new W("LMLL11119");this.createSubWindows(),this.layoutConfig=mt.resolve(t),this._groundItem.loadRoot(this.layoutConfig.root),this.checkLoadedLayoutMaximiseItem(),this.adjustColumnsResponsive()}saveLayout(){if(!1===this._isInitialised)throw new Error("Can't create config, layout not yet initialised");if(void 0===this._groundItem)throw new W("LMTC18244");{const t=this._groundItem.calculateConfigContent();let e;e=1!==t.length?void 0:t[0],this.reconcilePopoutWindows();const i=[];for(let t=0;t<this._openPopouts.length;t++)i.push(this._openPopouts[t].toConfig());return{root:e,openPopouts:i,settings:st.Settings.createCopy(this.layoutConfig.settings),dimensions:st.Dimensions.createCopy(this.layoutConfig.dimensions),header:st.Header.createCopy(this.layoutConfig.header),resolved:!0}}}clear(){if(void 0===this._groundItem)throw new W("LMCL11129");this._groundItem.clearRoot()}toConfig(){return this.saveLayout()}newComponent(t,e,i){const n=this.newComponentAtLocation(t,e,i);if(void 0===n)throw new B("LMNC65588");return n}newComponentAtLocation(t,e,i,n){if(void 0===this._groundItem)throw new Error("Cannot add component before init");{const o=this.addComponentAtLocation(t,e,i,n);if(void 0===o)return;{const t=o.parentItem.contentItems[o.index];if(Tt.isComponentItem(t))return t;throw new B("LMNC992877533")}}}addComponent(t,e,i){const n=this.addComponentAtLocation(t,e,i);if(void 0===n)throw new B("LMAC99943");return n}addComponentAtLocation(t,e,i,n){const o={type:"component",componentType:t,componentState:e,title:i};return this.addItemAtLocation(o,n)}newItem(t){const e=this.newItemAtLocation(t);if(void 0===e)throw new B("LMNC65588");return e}newItemAtLocation(t,e){if(void 0===this._groundItem)throw new Error("Cannot add component before init");{const i=this.addItemAtLocation(t,e);if(void 0===i)return;return i.parentItem.contentItems[i.index]}}addItem(t){const e=this.addItemAtLocation(t);if(void 0===e)throw new B("LMAI99943");return e}addItemAtLocation(t,e){if(void 0===this._groundItem)throw new Error("Cannot add component before init");{void 0===e&&(e="component"===t.type?qt.defaultLocationSelectors:qt.defaultNonComponentSelectors);const i=this.findFirstLocation(e);if(void 0===i)return;{let e,n=i.parentItem;switch(n.type){case q.ground:e=n.addItem(t,i.index),e>=0?n=this._groundItem.contentItems[0]:e=0;break;case q.row:case q.column:e=n.addItem(t,i.index);break;case q.stack:if(at.isComponent(t)){e=n.addItem(t,i.index);break}throw Error(H[6]);case q.component:throw new B("LMAIALC87444602");default:throw new U("LMAIALU98881733",n.type)}if(at.isComponent(t)){const t=n.contentItems[e];Tt.isStack(t)&&(n=t,e=0)}return i.parentItem=n,i.index=e,i}}}loadComponentAsRoot(t){if(void 0===this._groundItem)throw new Error("Cannot add item before init");this._groundItem.loadComponentAsRoot(t)}updateSize(t,e){this.setSize(t,e)}setSize(t,e){if(this._width=t,this._height=e,!0===this._isInitialised){if(void 0===this._groundItem)throw new W("LMUS18881");if(this._groundItem.setSize(this._width,this._height),this._maximisedStack){const{width:t,height:e}=wt(this._containerElement);_t(this._maximisedStack.element,t),yt(this._maximisedStack.element,e),this._maximisedStack.updateSize(!1)}this.adjustColumnsResponsive()}}beginSizeInvalidation(){this._sizeInvalidationBeginCount++}endSizeInvalidation(){0===--this._sizeInvalidationBeginCount&&this.updateSizeFromContainer()}updateSizeFromContainer(){const{width:t,height:e}=wt(this._containerElement);this.setSize(t,e)}updateRootSize(t=!1){if(void 0===this._groundItem)throw new W("LMURS28881");this._groundItem.updateSize(t)}createAndInitContentItem(t,e){const i=this.createContentItem(t,e);return i.init(),i}createContentItem(t,e){if("string"!=typeof t.type)throw new A("Missing parameter 'type'",JSON.stringify(t));if(J.isComponentItem(t)&&!(e instanceof Ft)&&e&&!(!0===this.isSubWindow&&e instanceof Bt)){t={type:q.stack,content:[t],size:t.size,sizeUnit:t.sizeUnit,minSize:t.minSize,minSizeUnit:t.minSizeUnit,id:t.id,maximised:t.maximised,isClosable:t.isClosable,activeItemIndex:0,header:void 0}}return this.createContentItemFromConfig(t,e)}findFirstComponentItemById(t){if(void 0===this._groundItem)throw new W("LMFFCIBI82446");return this.findFirstContentItemTypeByIdRecursive(q.component,t,this._groundItem)}createPopout(t,e,i,n){return t instanceof Tt?this.createPopoutFromContentItem(t,e,i,n):this.createPopoutFromItemConfig(t,e,i,n)}createPopoutFromContentItem(t,e,i,n){let o=t.parent,s=t;for(;null!==o&&1===o.contentItems.length&&!o.isGround;)s=o,o=o.parent;if(null===o)throw new V("LMCPFCI00834");{if(void 0===n&&(n=o.contentItems.indexOf(s)),null!==i&&o.addPopInParentId(i),void 0===e){const i=globalThis.screenX||globalThis.screenLeft,n=globalThis.screenY||globalThis.screenTop,o=t.element.offsetLeft,s=t.element.offsetTop,{width:r,height:a}=wt(t.element);e={left:i+o,top:n+s,width:r,height:a}}const r=t.toConfig();if(t.remove(),nt.isRootItemConfig(r))return this.createPopoutFromItemConfig(r,e,i,n);throw new Error(`${H[0]}`)}}beginVirtualSizedContainerAdding(){0===++this._virtualSizedContainerAddingBeginCount&&(this._virtualSizedContainers.length=0)}addVirtualSizedContainer(t){this._virtualSizedContainers.push(t)}endVirtualSizedContainerAdding(){if(0===--this._virtualSizedContainerAddingBeginCount){const t=this._virtualSizedContainers.length;if(t>0){this.fireBeforeVirtualRectingEvent(t);for(let e=0;e<t;e++){this._virtualSizedContainers[e].notifyVirtualRectingRequired()}this.fireAfterVirtualRectingEvent(),this._virtualSizedContainers.length=0}}}fireBeforeVirtualRectingEvent(t){void 0!==this.beforeVirtualRectingEvent&&this.beforeVirtualRectingEvent(t)}fireAfterVirtualRectingEvent(){void 0!==this.afterVirtualRectingEvent&&this.afterVirtualRectingEvent()}createPopoutFromItemConfig(t,e,i,n){const o=this.toConfig(),s={root:t,openPopouts:[],settings:o.settings,dimensions:o.dimensions,header:o.header,window:e,parentId:i,indexInParent:n,resolved:!0};return this.createPopoutFromPopoutLayoutConfig(s)}createPopoutFromPopoutLayoutConfig(t){var e,i,n,o;const s=t.window,r={left:null!==(e=s.left)&&void 0!==e?e:globalThis.screenX||globalThis.screenLeft+20,top:null!==(i=s.top)&&void 0!==i?i:globalThis.screenY||globalThis.screenTop+20,width:null!==(n=s.width)&&void 0!==n?n:500,height:null!==(o=s.height)&&void 0!==o?o:309},a=new Pt(t,r,this);return a.on("initialised",()=>this.emit("windowOpened",a)),a.on("closed",()=>this.reconcilePopoutWindows()),this._openPopouts.push(a),this.layoutConfig.settings.closePopoutsOnUnload&&!this._windowBeforeUnloadListening&&(globalThis.addEventListener("beforeunload",this._windowBeforeUnloadListener,{passive:!0}),this._windowBeforeUnloadListening=!0),a}closeAllOpenPopouts(){for(let t=0;t<this._openPopouts.length;t++)this._openPopouts[t].close();this._openPopouts.length=0,this._windowBeforeUnloadListening&&(globalThis.removeEventListener("beforeunload",this._windowBeforeUnloadListener),this._windowBeforeUnloadListening=!1)}newDragSource(t,e,i,n,o){const s=new $t(this,t,[],e,i,n,o);return this._dragSources.push(s),s}removeDragSource(t){!function(t,e){const i=e.indexOf(t);if(-1===i)throw new Error("Can't remove item from array. Item is not in the array");e.splice(i,1)}(t,this._dragSources),t.destroy()}startComponentDrag(t,e,i,n,o){new Nt(t,e,i,this,n,o)}focusComponent(t,e=!1){t.focus(e)}clearComponentFocus(t=!1){this.setFocusedComponentItem(void 0,t)}setFocusedComponentItem(t,e=!1){if(t!==this._focusedComponentItem){let i;if(void 0===t||(i=t.parentItem),void 0!==this._focusedComponentItem){const t=this._focusedComponentItem;this._focusedComponentItem=void 0,t.setBlurred(e);const n=t.parentItem;i===n?i=void 0:n.setFocusedValue(!1)}void 0!==t&&(this._focusedComponentItem=t,t.setFocused(e),void 0!==i&&i.setFocusedValue(!0))}}createContentItemFromConfig(t,e){switch(t.type){case q.ground:throw new B("LMCCIFC68871");case q.row:return new Ot(!1,this,t,e);case q.column:return new Ot(!0,this,t,e);case q.stack:return new Ft(this,t,e);case q.component:return new At(this,t,e);default:throw new U("CCC913564",t.type,"Invalid Config Item type specified")}}setMaximisedStack(t){void 0===t?void 0!==this._maximisedStack&&this.processMinimiseMaximisedStack():t!==this._maximisedStack&&(void 0!==this._maximisedStack&&this.processMinimiseMaximisedStack(),this.processMaximiseStack(t))}checkMinimiseMaximisedStack(){void 0!==this._maximisedStack&&this._maximisedStack.minimise()}cleanupBeforeMaximisedStackDestroyed(t){null!==this._maximisedStack&&this._maximisedStack===t.target&&(this._maximisedStack.off("beforeItemDestroyed",this._maximisedStackBeforeDestroyedListener),this._maximisedStack=void 0)}closeWindow(){globalThis.setTimeout(()=>globalThis.close(),1)}getArea(t,e){let i=null,n=1/0;for(let o=0;o<this._itemAreas.length;o++){const s=this._itemAreas[o];t>=s.x1&&t<s.x2&&e>=s.y1&&e<s.y2&&n>s.surface&&(n=s.surface,i=s)}return i}calculateItemAreas(){const t=this.getAllContentItems(),e=this._groundItem;if(void 0===e)throw new W("LMCIAR44365");if(1===t.length){const t=e.getElementArea();if(null===t)throw new V("LMCIARA44365");return void(this._itemAreas=[t])}e.contentItems[0].isStack?this._itemAreas=[]:this._itemAreas=e.createSideAreas();for(let e=0;e<t.length;e++){const i=t[e];if(Tt.isStack(i)){const t=i.getArea();if(null===t)continue;{this._itemAreas.push(t);const e=i.contentAreaDimensions;if(void 0===e)throw new W("LMCIASC45599");{const t=e.header.highlightArea,n=(t.x2-t.x1)*(t.y2-t.y1),o={x1:t.x1,x2:t.x2,y1:t.y1,y2:t.y2,contentItem:i,surface:n};this._itemAreas.push(o)}}}}}checkLoadedLayoutMaximiseItem(){if(void 0===this._groundItem)throw new W("LMCLLMI43432");{const t=this._groundItem.getConfigMaximisedItems();if(t.length>0){let e=t[0];if(Tt.isComponentItem(e)){const t=e.parent;if(null===t)throw new V("LMXLLMI69999");e=t}if(!Tt.isStack(e))throw new B("LMCLLMI19993");e.maximise()}}}processMaximiseStack(t){if(this._maximisedStack=t,t.on("beforeItemDestroyed",this._maximisedStackBeforeDestroyedListener),t.element.classList.add("lm_maximised"),t.element.insertAdjacentElement("afterend",this._maximisePlaceholder),void 0===this._groundItem)throw new W("LMMXI19993");{this._groundItem.element.prepend(t.element);const{width:e,height:i}=wt(this._containerElement);_t(t.element,e),yt(t.element,i),t.updateSize(!0),t.focusActiveContentItem(),this._maximisedStack.emit("maximised"),this.emit("stateChanged")}}processMinimiseMaximisedStack(){if(void 0===this._maximisedStack)throw new B("LMMMS74422");{const t=this._maximisedStack;if(null===t.parent)throw new V("LMMI13668");t.element.classList.remove("lm_maximised"),this._maximisePlaceholder.insertAdjacentElement("afterend",t.element),this._maximisePlaceholder.remove(),this.updateRootSize(!0),this._maximisedStack=void 0,t.off("beforeItemDestroyed",this._maximisedStackBeforeDestroyedListener),t.emit("minimised"),this.emit("stateChanged")}}reconcilePopoutWindows(){const t=[];for(let e=0;e<this._openPopouts.length;e++)!1===this._openPopouts[e].getWindow().closed?t.push(this._openPopouts[e]):this.emit("windowClosed",this._openPopouts[e]);this._openPopouts.length!==t.length&&(this._openPopouts=t,this.emit("stateChanged"))}getAllContentItems(){if(void 0===this._groundItem)throw new W("LMGACI13130");return this._groundItem.getAllContentItems()}createSubWindows(){for(let t=0;t<this.layoutConfig.openPopouts.length;t++){const e=this.layoutConfig.openPopouts[t];this.createPopoutFromPopoutLayoutConfig(e)}}handleContainerResize(){this.resizeWithContainerAutomatically&&this.processResizeWithDebounce()}processResizeWithDebounce(){this.resizeDebounceExtendedWhenPossible&&this.checkClearResizeTimeout(),void 0===this._resizeTimeoutId&&(this._resizeTimeoutId=setTimeout(()=>{this._resizeTimeoutId=void 0,this.beginSizeInvalidation(),this.endSizeInvalidation()},this.resizeDebounceInterval))}checkClearResizeTimeout(){void 0!==this._resizeTimeoutId&&(clearTimeout(this._resizeTimeoutId),this._resizeTimeoutId=void 0)}setContainer(){var t;const e=document.body,i=null!==(t=this._containerElement)&&void 0!==t?t:e;if(i===e){this.resizeWithContainerAutomatically=!0;const t=document.documentElement;t.style.height="100%",t.style.margin="0",t.style.padding="0",t.style.overflow="clip",e.style.height="100%",e.style.margin="0",e.style.padding="0",e.style.overflow="clip"}this._containerElement=i}onBeforeUnload(){this.destroy()}adjustColumnsResponsive(){if(void 0===this._groundItem)throw new W("LMACR20883");if(this._firstLoad=!1,this.useResponsiveLayout()&&!this._updatingColumnsResponsive&&this._groundItem.contentItems.length>0&&this._groundItem.contentItems[0].isRow){if(void 0===this._groundItem||null===this._width)throw new W("LMACR77412");{const t=this._groundItem.contentItems[0].contentItems.length;if(t<=1)return;{const e=this.layoutConfig.dimensions.defaultMinItemWidth;if(t*e<=this._width)return;{this._updatingColumnsResponsive=!0;const i=t-Math.max(Math.floor(this._width/e),1),n=this._groundItem.contentItems[0],o=this.getAllStacks();if(0===o.length)throw new B("LMACRS77413");{const t=o[0];for(let e=0;e<i;e++){const e=n.contentItems[n.contentItems.length-1];this.addChildContentItemsToContainer(t,e)}this._updatingColumnsResponsive=!1}}}}}}useResponsiveLayout(){const t=this.layoutConfig.settings,e=t.responsiveMode===X.always,i=t.responsiveMode===X.onload&&this._firstLoad;return e||i}addChildContentItemsToContainer(t,e){const i=e.contentItems;if(e instanceof Ft)for(let n=0;n<i.length;n++){const o=i[n];e.removeChild(o,!0),t.addChild(o)}else for(let e=0;e<i.length;e++){const n=i[e];this.addChildContentItemsToContainer(t,n)}}getAllStacks(){if(void 0===this._groundItem)throw new W("LMFASC52778");{const t=[];return this.findAllStacksRecursive(t,this._groundItem),t}}findFirstContentItemType(t){if(void 0===this._groundItem)throw new W("LMFFCIT82446");return this.findFirstContentItemTypeRecursive(t,this._groundItem)}findFirstContentItemTypeRecursive(t,e){const i=e.contentItems,n=i.length;if(0!==n){for(let e=0;e<n;e++){const n=i[e];if(n.type===t)return n}for(let e=0;e<n;e++){const n=i[e],o=this.findFirstContentItemTypeRecursive(t,n);if(void 0!==o)return o}}}findFirstContentItemTypeByIdRecursive(t,e,i){const n=i.contentItems,o=n.length;if(0!==o){for(let i=0;i<o;i++){const o=n[i];if(o.type===t&&o.id===e)return o}for(let i=0;i<o;i++){const o=n[i],s=this.findFirstContentItemTypeByIdRecursive(t,e,o);if(void 0!==s)return s}}}findAllStacksRecursive(t,e){const i=e.contentItems;for(let e=0;e<i.length;e++){const n=i[e];n instanceof Ft?t.push(n):n.isComponent||this.findAllStacksRecursive(t,n)}}findFirstLocation(t){const e=t.length;for(let i=0;i<e;i++){const e=t[i],n=this.findLocation(e);if(void 0!==n)return n}}findLocation(t){const e=t.index;switch(t.typeId){case 0:if(void 0===this._focusedComponentItem)return;{const t=this._focusedComponentItem.parentItem,i=t.contentItems,n=i.length;if(void 0===e)return{parentItem:t,index:n};{const o=i.indexOf(this._focusedComponentItem)+e;return o<0||o>n?void 0:{parentItem:t,index:o}}}case 1:if(void 0===this._focusedComponentItem)return;{const t=this._focusedComponentItem.parentItem;return this.tryCreateLocationFromParentItem(t,e)}case 2:{const t=this.findFirstContentItemType(q.stack);return void 0===t?void 0:this.tryCreateLocationFromParentItem(t,e)}case 3:{let t=this.findFirstContentItemType(q.row);return void 0!==t?this.tryCreateLocationFromParentItem(t,e):(t=this.findFirstContentItemType(q.column),void 0!==t?this.tryCreateLocationFromParentItem(t,e):void 0)}case 4:{const t=this.findFirstContentItemType(q.row);return void 0===t?void 0:this.tryCreateLocationFromParentItem(t,e)}case 5:{const t=this.findFirstContentItemType(q.column);return void 0===t?void 0:this.tryCreateLocationFromParentItem(t,e)}case 6:if(void 0===this._groundItem)throw new W("LMFLRIF18244");return void 0!==this.rootItem?void 0:void 0===e||0===e?{parentItem:this._groundItem,index:0}:void 0;case 7:if(void 0===this._groundItem)throw new W("LMFLF18244");{const t=this._groundItem.contentItems;if(0===t.length)return void 0===e||0===e?{parentItem:this._groundItem,index:0}:void 0;{const i=t[0];return this.tryCreateLocationFromParentItem(i,e)}}}}tryCreateLocationFromParentItem(t,e){const i=t.contentItems.length;return void 0===e?{parentItem:t,index:i}:e<0||e>i?void 0:{parentItem:t,index:e}}}!function(t){t.createMaximisePlaceElement=function(t){const e=t.createElement("div");return e.classList.add("lm_maximise_place"),e},t.createTabDropPlaceholderElement=function(t){const e=t.createElement("div");return e.classList.add("lm_drop_tab_placeholder"),e},t.defaultNonComponentSelectors=[{typeId:3,index:void 0},{typeId:7,index:void 0}],t.defaultLocationSelectors=[{typeId:1,index:void 0},{typeId:2,index:void 0},...t.defaultNonComponentSelectors],t.afterFocusedItemIfPossibleLocationSelectors=[{typeId:0,index:1},{typeId:2,index:void 0},{typeId:3,index:void 0},{typeId:7,index:void 0}]}(qt||(qt={}));class Xt extends qt{constructor(t,e,i,n){if(super(Xt.createLayoutManagerConstructorParameters(t,e)),this._bindComponentEventHanlderPassedInConstructor=!1,this._creationTimeoutPassed=!1,void 0!==e&&"function"==typeof e&&(this.bindComponentEvent=e,this._bindComponentEventHanlderPassedInConstructor=!0,void 0!==i&&(this.unbindComponentEvent=i)),!this._bindComponentEventHanlderPassedInConstructor&&this.isSubWindow){if(void 0===this._constructorOrSubWindowLayoutConfig)throw new W("VLC98823");{const t=mt.resolve(this._constructorOrSubWindowLayoutConfig);this.layoutConfig=Object.assign(Object.assign({},t),{root:void 0})}}!0!==n&&(this.deprecatedConstructor||this.init())}destroy(){this.bindComponentEvent=void 0,this.unbindComponentEvent=void 0,super.destroy()}init(){if(this._bindComponentEventHanlderPassedInConstructor||"loading"!==document.readyState&&null!==document.body){if(!this._bindComponentEventHanlderPassedInConstructor&&!0===this.isSubWindow&&!this._creationTimeoutPassed)return setTimeout(()=>this.init(),7),void(this._creationTimeoutPassed=!0);!0===this.isSubWindow&&(this._bindComponentEventHanlderPassedInConstructor||this.clearHtmlAndAdjustStylesForSubWindow(),window.__glInstance=this),super.init()}else document.addEventListener("DOMContentLoaded",()=>this.init(),{passive:!0})}clearHtmlAndAdjustStylesForSubWindow(){const t=document.head,e=new Array(4);e[0]=document.querySelectorAll("body link"),e[1]=document.querySelectorAll("body style"),e[2]=document.querySelectorAll("template"),e[3]=document.querySelectorAll(".gl_keep");for(let i=0;i<e.length;i++){const n=e[i];for(let e=0;e<n.length;e++){const i=n[e];t.appendChild(i)}}const i=document.body;i.innerHTML="",i.style.visibility="visible",this.checkAddDefaultPopinButton(),document.body.offsetHeight}checkAddDefaultPopinButton(){if(this.layoutConfig.settings.popInOnClose)return!1;{const t=document.createElement("div");t.classList.add("lm_popin"),t.setAttribute("title",this.layoutConfig.header.dock);const e=document.createElement("div");e.classList.add("lm_icon");const i=document.createElement("div");return i.classList.add("lm_bg"),t.appendChild(e),t.appendChild(i),t.addEventListener("click",()=>this.emit("popIn")),document.body.appendChild(t),!0}}bindComponent(t,e){if(void 0!==this.bindComponentEvent){return this.bindComponentEvent(t,e)}if(void 0!==this.getComponentEvent)return{virtual:!1,component:this.getComponentEvent(t,e)};{const t=`${H[2]}: ${JSON.stringify(e)}`;throw new R(t)}}unbindComponent(t,e,i){if(void 0!==this.unbindComponentEvent)this.unbindComponentEvent(t);else if(!e&&void 0!==this.releaseComponentEvent){if(void 0===i)throw new W("VCUCRCU333998");this.releaseComponentEvent(t,i)}}}!function(t){let e=!1;t.createLayoutManagerConstructorParameters=function(t,i){const n=e?null:new URL(document.location.href).searchParams.get("gl-window");e=!0;const o=null!==n;let s,r;if(null!==n){const e=localStorage.getItem(n);if(null===e)throw new Error("Null gl-window Config");localStorage.removeItem(n);const i=JSON.parse(e),o=st.unminifyConfig(i);r=mt.fromResolved(o),t instanceof HTMLElement&&(s=t)}else void 0===t?r=void 0:t instanceof HTMLElement?(r=void 0,s=t):r=t,void 0===s&&i instanceof HTMLElement&&(s=i);return{constructorOrSubWindowLayoutConfig:r,isSubWindow:o,containerElement:s}}}(Xt||(Xt={}));class Yt extends Xt{constructor(t,e,i){super(t,e,i,!0),this._componentTypesMap=new Map,this._registeredComponentMap=new Map,this._virtuableComponentMap=new Map,this._containerVirtualRectingRequiredEventListener=(t,e,i)=>this.handleContainerVirtualRectingRequiredEvent(t,e,i),this._containerVirtualVisibilityChangeRequiredEventListener=(t,e)=>this.handleContainerVirtualVisibilityChangeRequiredEvent(t,e),this._containerVirtualZIndexChangeRequiredEventListener=(t,e,i)=>this.handleContainerVirtualZIndexChangeRequiredEvent(t,e,i),this.deprecatedConstructor||this.init()}registerComponent(t,e,i=!1){if("function"!=typeof e)throw new D("registerComponent() componentConstructorOrFactoryFtn parameter is not a function");if(e.hasOwnProperty("prototype")){const n=e;this.registerComponentConstructor(t,n,i)}else{const n=e;this.registerComponentFactoryFunction(t,n,i)}}registerComponentConstructor(t,e,i=!1){if("function"!=typeof e)throw new Error(H[1]);if(void 0!==this._componentTypesMap.get(t))throw new R(`${H[3]}: ${t}`);this._componentTypesMap.set(t,{constructor:e,factoryFunction:void 0,virtual:i})}registerComponentFactoryFunction(t,e,i=!1){if("function"!=typeof e)throw new R("Please register a constructor function");if(void 0!==this._componentTypesMap.get(t))throw new R(`${H[3]}: ${t}`);this._componentTypesMap.set(t,{constructor:void 0,factoryFunction:e,virtual:i})}registerComponentFunction(t){this.registerGetComponentConstructorCallback(t)}registerGetComponentConstructorCallback(t){if("function"!=typeof t)throw new Error("Please register a callback function");void 0!==this._getComponentConstructorFtn&&console.warn("Multiple component functions are being registered.  Only the final registered function will be used."),this._getComponentConstructorFtn=t}getRegisteredComponentTypeNames(){const t=this._componentTypesMap.keys();return Array.from(t)}getComponentInstantiator(t){let e;const i=et.resolveComponentTypeName(t);return void 0!==i&&(e=this._componentTypesMap.get(i)),void 0===e&&void 0!==this._getComponentConstructorFtn&&(e={constructor:this._getComponentConstructorFtn(t),factoryFunction:void 0,virtual:!1}),e}bindComponent(t,e){let i;const n=et.resolveComponentTypeName(e);let o;if(void 0!==n&&(i=this._componentTypesMap.get(n)),void 0===i&&void 0!==this._getComponentConstructorFtn&&(i={constructor:this._getComponentConstructorFtn(e),factoryFunction:void 0,virtual:!1}),void 0!==i){const s=i.virtual;let r,a;r=void 0===e.componentState?void 0:bt({},e.componentState);const l=i.constructor;if(void 0!==l)a=new l(t,r,s);else{const e=i.factoryFunction;if(void 0===e)throw new B("LMBCFFU10008");a=e(t,r,s)}if(s){if(void 0===a)throw new W("GLBCVCU988774");{const e=a,i=e.rootHtmlElement;if(void 0===i)throw new R(`${H[5]}: ${n}`);!function(t){const e="absolute";t.style.position!==e&&(t.style.position=e)}(i),this.container.appendChild(i),this._virtuableComponentMap.set(t,e),t.virtualRectingRequiredEvent=this._containerVirtualRectingRequiredEventListener,t.virtualVisibilityChangeRequiredEvent=this._containerVirtualVisibilityChangeRequiredEventListener,t.virtualZIndexChangeRequiredEvent=this._containerVirtualZIndexChangeRequiredEventListener}}this._registeredComponentMap.set(t,a),o={virtual:i.virtual,component:a}}else o=super.bindComponent(t,e);return o}unbindComponent(t,e,i){if(void 0===this._registeredComponentMap.get(t))super.unbindComponent(t,e,i);else{const e=this._virtuableComponentMap.get(t);if(void 0!==e){const i=e.rootHtmlElement;if(void 0===i)throw new B("GLUC77743",t.title);this.container.removeChild(i),this._virtuableComponentMap.delete(t)}}}fireBeforeVirtualRectingEvent(t){this._goldenLayoutBoundingClientRect=this.container.getBoundingClientRect(),super.fireBeforeVirtualRectingEvent(t)}handleContainerVirtualRectingRequiredEvent(t,e,i){const n=this._virtuableComponentMap.get(t);if(void 0===n)throw new W("GLHCSCE55933");{const o=n.rootHtmlElement;if(void 0===o)throw new R(H[4]+" "+t.title);{const n=t.element.getBoundingClientRect(),s=n.left-this._goldenLayoutBoundingClientRect.left;o.style.left=gt(s);const r=n.top-this._goldenLayoutBoundingClientRect.top;o.style.top=gt(r),_t(o,e),yt(o,i)}}}handleContainerVirtualVisibilityChangeRequiredEvent(t,e){const i=this._virtuableComponentMap.get(t);if(void 0===i)throw new W("GLHCVVCRE55934");{const n=i.rootHtmlElement;if(void 0===n)throw new R(H[4]+" "+t.title);Ct(n,e)}}handleContainerVirtualZIndexChangeRequiredEvent(t,e,i){const n=this._virtuableComponentMap.get(t);if(void 0===n)throw new W("GLHCVZICRE55935");{const e=n.rootHtmlElement;if(void 0===e)throw new R(H[4]+" "+t.title);e.style.zIndex=i}}}const Kt="initial_",Jt={show:"top",popout:!1,close:"close-tab-unused"},Qt={headerHeight:31},te={hasHeaders:!0,reorderEnabled:!0,showMaximiseIcon:!1},ee={popoutWholeStack:!1,constrainDragToContainer:!1,constrainDragToHeaders:!1,preventDragout:!1,showPopoutIcon:!1,showCloseIcon:!1,blockedPopoutsThrowError:!0,closePopoutsOnUnload:!0,selectionEnabled:!1};var ie,ne,oe,se;class re{constructor(e){ie.set(this,void 0),ne.set(this,void 0),oe.set(this,void 0),se.set(this,void 0),this.handleResize=t=>{t.forEach(t=>this.resizeElement(t.target))},this.handleMutation=()=>{t.__classPrivateFieldGet(this,se,"f").viewComponentsByContainerElement.forEach(t=>{this.resizeElement(t.container.element)})},this.handleIntersection=t=>{t.forEach(t=>{t.isIntersecting&&this.handleMutation()})},t.__classPrivateFieldSet(this,se,e,"f"),t.__classPrivateFieldSet(this,ie,new ResizeObserver(this.handleResize),"f"),t.__classPrivateFieldSet(this,ne,new MutationObserver(this.handleMutation),"f"),t.__classPrivateFieldSet(this,oe,new IntersectionObserver(this.handleIntersection,{root:null,rootMargin:"0px",threshold:Array.from({length:1001},(t,e)=>e/1e3)}),"f")}observeMutations(e){t.__classPrivateFieldGet(this,ne,"f")?.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]})}destroy(){t.__classPrivateFieldGet(this,ie,"f").disconnect(),t.__classPrivateFieldGet(this,ne,"f").disconnect(),t.__classPrivateFieldGet(this,oe,"f").disconnect()}observeContainer(e){t.__classPrivateFieldGet(this,ie,"f").observe(e)}unobserveContainer(e){t.__classPrivateFieldGet(this,ie,"f").unobserve(e)}observeIntersection(e){t.__classPrivateFieldGet(this,oe,"f").observe(e)}unobserveIntersection(e){t.__classPrivateFieldGet(this,oe,"f").unobserve(e)}resizeElement(e){const i=t.__classPrivateFieldGet(this,se,"f").viewComponentsByContainerElement.get(e);i&&i.resize()}}ie=new WeakMap,ne=new WeakMap,oe=new WeakMap,se=new WeakMap;class ae{constructor(t,e,i){this._item=t,this._layout=e,this._wrap=i}get raw(){return this._item}get layout(){return this._layout}get type(){return this._item.type}get contentItems(){return(this._item.contentItems??[]).map(t=>this._wrap(t))}get parent(){const t=this._item.parent;return t?this._wrap(t):null}setActiveContentItem(t,e){if("stack"!==this.type)throw new Error(`Cannot call setActiveContentItem from a non-stack item: ${this.type}`);this._item.setActiveContentItem(t.raw,e)}static wrapInternal(t,e,i){const n=ae.wrapCache.get(e);if(n)return n;const o=new t(e,i,e=>ae.wrapInternal(t,e,i));return ae.wrapCache.set(e,o),o}}ae.wrapCache=new WeakMap;const le=t=>!!t&&"contentItems"in t&&(t.isRow||t.isColumn);class he extends ae{isRoot(){return!!this._item.parent?.isGround}getBounds(){return this._item.element.getBoundingClientRect()}get viewName(){if(this._item.isComponent){const{component:t}=this._item;return t.identity.name}throw new Error("View name not found")}onDestroyed(t){const e=({target:i})=>{i===this._item&&(t(),this._item.off("itemDestroyed",e))};this._item.on("itemDestroyed",e)}createAdjacentStack({position:t="right"}={}){const e=this.raw;if(e.parent){const i=["top","bottom"].includes(t)?"column":"row",n=["left","top"].includes(t)?1:0,o=le(e.parent)?e.parent:e.layoutManager,s=o,r=e.parent.contentItems.indexOf(e);e.parent.isGround&&e.parent.removeChild(e,!0);const a=o.newItem({type:i,content:[{type:"stack",content:[]}]},r);if(!a)throw new Error("createAdjacentStack: Failed to create new container");const l=a.contentItems[0];return a.addChild(this.raw,n),le(s)&&s.removeChild(e,!0),this._wrap(l)}throw new Error("Cannot create adjacent stack if no parent exists.")}setActiveContentItem(t,e=!0){if(!Ft.isStack(this._item))throw new Error(`Cannot call setActiveContentItem from a non-stack item: ${this.type}`);this._item.setActiveComponentItem(t.raw,!e)}static wrap(t,e){return ae.wrapInternal(he,t,e)}}const de=t.makeKeyChecker()(["newTabButtonUrl","preventSplitterResize","constrainDragToHeaders","preventDragIn","preventDragOut","disableTabOverflowDropdown"]);function ce(t=[],e){for(const i of t)"component"===i.type?Object.keys(e).forEach(t=>{t in i&&(i.componentState={[`${Kt}${t}`]:i[t],...i.componentState}),i[t]=e[t]}):ce(i.content,e)}function ue(t=[],e,i){for(const n of t)if("component"===n.type)Object.keys(e).forEach(t=>{if(`${Kt}${t}`in n.componentState)return n[t]=n.componentState[`${Kt}${t}`],void delete n.componentState[`${Kt}${t}`];n[t]=e[t]});else{if(n.size&&("row"===i||"column"===i)){n["row"===i?"width":"height"]=n.size?.includes(".")?parseFloat(n.size):parseInt(n.size)}ue(n.content,e,n.type)}}function me(t,e){if(t.root){t.root.content&&ue([t.root],{componentName:"view",isClosable:!0});const e=t.root;t.content=[e],delete t.root}return e.settings&&de.forEach(i=>{i in e.settings&&!(i in t.settings)&&(t.settings[i]=e.settings[i])}),t}function pe(t){return t&&"string"==typeof t?function(t){let e=t,i="",n=0;for(;e!==i&&n<10;)i=e,e=s.decode(e),n++;return n>=10?"Unknown Title":e}(t):t}const ge=t=>{for(const e of t){if("component"===e.type&&"componentState"in e){const{componentState:t,...i}=e;"object"==typeof e.componentState&&(e.componentState={...e.componentState,...i})}if("stack"===e.type&&e.content&&"activeItemIndex"in e){const t=e.content.length-1;e.activeItemIndex>t&&(e.activeItemIndex=t>=0?t:0)}"content"in e&&ge(e.content)}},fe=e=>class extends e{constructor(){super(...arguments),this.#t=null}#t;#e(){const e=this.iframe;e&&e.contentDocument?.head&&e.contentWindow&&window.top&&t.isSameOrigin(e.contentWindow.window,window.top)&&(this.#t=t.getTitleObserver(e.contentDocument.head,t=>this.dispatchEvent(new CustomEvent("page-title-updated",{detail:{title:t}}))),this.dispatchEvent(new CustomEvent("page-title-updated",{detail:{title:e.contentDocument.title}})))}#i(){this.#t&&(this.#t.disconnect(),this.#t=null)}get lastKnownUrl(){return this.iframe?.contentDocument?.location.href}connectedCallback(){if(!this.name||!this.uuid)throw new Error("<of-view> Name or uuid attribute missing");if(!this.src)throw new Error("<of-view> missing 'src' attribute.");if(!this.iframe){const e=document.createElement("iframe");e.addEventListener("load",()=>{this.#e()}),e.addEventListener("unload",()=>{this.#i()}),e.src=this.src,this.allow&&(e.allow=this.allow),e.style.height="100%",e.style.width="100%",e.style.border="none",this.forceFrameName?e.setAttribute("name",this.forceFrameName):e.setAttribute("name",t.encodeOptions({brokerUrl:this.brokerUrl,name:this.name,uuid:this.uuid,providerId:this.providerId,contextGroup:this.contextGroup},"of-frame")),e.setAttribute("id",this.name),this.appendChild(e)}}get iframe(){return this.querySelector(`iframe[id="${this.name}"]`)}get title(){return this.getAttribute("title")??this.iframe?.title??""}set title(t){this.setAttribute("title",t),this.iframe&&(this.iframe.title=t)}get brokerUrl(){return this.getAttribute("of-broker")}set brokerUrl(t){t&&this.setAttribute("of-broker",t)}get name(){return this.getAttribute("of-name")}set name(t){t&&this.setAttribute("of-name",t)}get forceFrameName(){return this.getAttribute("forceFrameName")}set forceFrameName(t){t&&this.setAttribute("forceFrameName",t)}get uuid(){return this.getAttribute("of-uuid")}set uuid(t){t&&this.setAttribute("of-uuid",t)}get src(){return this.getAttribute("src")}set src(t){t&&this.setAttribute("src",t)}get providerId(){return this.getAttribute("of-provider-id")}set providerId(t){t&&this.setAttribute("of-provider-id",t)}get contextGroup(){return this.getAttribute("of-context-group")}set contextGroup(t){t&&this.setAttribute("of-context-group",t)}get allow(){return this.getAttribute("allow")}set allow(t){t&&this.setAttribute("allow",t)}static get observedAttributes(){return["name"]}};class ve{static create(t){const e=document.createElement("of-view");return Object.entries(t).forEach(([t,i])=>{e.setAttribute(t,i)}),e}}customElements.define("of-view",fe(HTMLElement));const _e=t.clientLogger.getLogger("view-component");class ye{constructor(t,e,i,{brokerUrl:o,interopConfig:s},r){this.container=t,this.componentState=e,this.ofView=null,this.isMinimised=!1,this.isActive=()=>this.container.tab.element.className.includes("lm_active")??!1,this.isDragging=()=>this.container.tab.element?.className.includes("lm_dragging")??!1;const{url:a,web:l,interop:h,name:d}=e,c=d??`internal-generated-view-${n.v4()}`;if(this.identity={uuid:i,name:c},this.container.element.setAttribute("of-name",c),this.container.element.id=`container-${c}`,this.container.parent.id=c,this.state={...e},void 0===a)return void this.handleUrlMissing();this.state.url=a,"view"!==this.container.parent.title&&(this.state.title=this.container.parent.title);const u={"of-broker":o,"of-uuid":i,"of-name":c,src:a};l?.frameName&&(u.forceFrameName=l.frameName);const m=h?.currentContextGroup??s?.currentContextGroup;m&&(u["of-context-group"]=m),s?.providerId&&(u["of-provider-id"]=s?.providerId),e?.permissions?.webAPIs&&(u.allow=this.applyWebAPIs(e.permissions.webAPIs),_e.debug(`Applying webAPIs: ${u.allow}`)),this.ofView=ve.create(u),this.setTitle(this.state.title),this.ofView.addEventListener("page-title-updated",({detail:t})=>{const e="options"===this.state.titlePriority?this.state.title:t.title;this.setTitle(e)}),r.appendChild(this.ofView),this.ofView.style.position="absolute"}applyWebAPIs(t){return t.reduce((t,e)=>{const i=(t=>{switch(t){case"clipboard-read":return"clipboard-read";case"clipboard-sanitized-write":return"clipboard-write";default:return""}})(e);return i?`${t} ${i} *;`.trim():t},"")}handleUrlMissing(){const t=document.createElement("div");t.setAttribute("style","padding: 20px");t.innerText="No URL provided",this.container.element.appendChild(t)}destroy(){this.ofView?.remove(),this.ofView=null}closeView(){this.container.close()}setTitle(t){const e=pe("options"===this.state.titlePriority?this.state.title||this.identity.name:t||this.state.title||this.ofView?.lastKnownUrl||this.state.url);e&&(_e.debug(`${this.identity.name} setting title to ${e}`),this.container.parent.setTitle(e),this.ofView&&(this.ofView.title=e))}setIsMinimised(t){this.isMinimised=t}toggleZIndex(t){this.ofView&&(this.ofView.style.zIndex=t?"99":"")}resize(){if(this.ofView){if(this.isDragging()||this.isMinimised)return void(this.ofView.style.display="none");const t=this.container.element.getBoundingClientRect();this.ofView.style.position="absolute",this.ofView.style.height=`${t.height}px`,this.ofView.style.width=`${t.width}px`,this.ofView.style.inset=`${t.top}px ${t.right}px ${t.bottom}px ${t.left}px`,this.ofView.style.display="block"}}}var we,Ce;const Ie="newTabButton";class be extends M{createTabButton(t){const e=document.createElement("div");return e.title="New Tab",e.className=Ie,e.classList.add("addTabButton"),e.setAttribute("data-testid","add-new-tab"),e.addEventListener("click",()=>{const e=this.layoutContentCache.getOrCreateEntityId(he.wrap(t,this)),i=t.contentItems.length;this.platformCreateView({url:this.config.settings?.newTabButtonUrl},{location:{id:e,index:i}})}),e}ensurePlusButtonLast(t,e){let i=t.querySelector(`.${Ie}`);i||(i=this.getNewTabButton(t,e)),i!==t.lastElementChild&&t.appendChild(i)}static overrideConfig(t){const e={...te,...t.settings,...ee};return t.content&&ge(t.content),e.reorderEnabled?ce(t.content,{isClosable:!0}):ce(t.content,{reorderEnabled:!1}),"scroll"===e?.tabOverflowBehavior&&(e.disableTabOverflowDropdown=!0),{dimensions:Qt,...t,settings:e,header:{...Jt,show:!1!==t.settings?.hasHeaders&&Jt.show}}}constructor(t,i,n,{options:o},s,r){super(),this.identity=t,this.container=i,this.initialConfig=n,this.layoutManager=s,this.platformProvider=r,we.add(this),this.viewComponentsByContainerElement=new Map,this.events=new e,this.layoutContentCache=b.getSingleInstance(),this.reparentingViews=new Set,this.goldenLayoutDestroyed=!1,this.tabsObservers=new WeakMap,this.getNewTabButton=(t,e)=>{let i=t.querySelector(`.${Ie}`);return i||(i=this.createTabButton(e)),i},this.ensureNewTabButton=t=>{if(!this.config?.settings?.newTabButtonUrl||!this.config?.settings.hasHeaders)return;const e=t.header?.element.querySelector(".lm_tabs");if(e){if("scroll"===this.config.settings?.tabOverflowBehavior){let i=t.header?.element.querySelector(`.${Ie}`);if(i)return;const n=this.createTabButton(t);return void e.parentElement?.insertAdjacentElement("afterend",n)}if(this.ensurePlusButtonLast(e,t),!this.tabsObservers.has(e)){const i=new MutationObserver(()=>this.ensurePlusButtonLast(e,t));i.observe(e,{childList:!0}),this.tabsObservers.set(e,i),t.on("destroy",()=>{i.disconnect(),this.tabsObservers.delete(e)})}}},this.addNewTabButtons=()=>{const t=e=>{e&&(Ft.isStack(e)&&this.ensureNewTabButton(e),e.contentItems&&e.contentItems.forEach(t))};t(this.layout.rootItem)},this.createViewComponent=(t,e)=>{C.handleSharedView(this.layoutManager,this.identity,e);const i=new ye(t,e,this.identity.uuid,this.options,this.iframeContainer);return this.viewComponentsByContainerElement.set(t.element,i),this.resizeController.observeContainer(t.element),i},this.iframeContainer=document.createElement("div"),this.iframeContainer.id=`openfin-layout-iframe-container-${this.identity.layoutName}`,this.domEmitter=new P(i),this.layout=new Yt(this.container),this.layout.resizeWithContainerAutomatically=!0,this.options=o,this.layout.registerComponent("view",this.createViewComponent),this.setupListeners(),r.registerEmitter(t.layoutName,this.events),this.resizeController=new re(this);const a=be.overrideConfig(n);this.layout.loadLayout(a),this.config=a,this.shadowContainer=document.createElement("div"),this.shadowContainer.id=`openfin-layout-shadow-container-${this.identity.layoutName}`,this.shadowContainer.attachShadow({mode:"open",delegatesFocus:!1}).appendChild(this.iframeContainer),this.container.appendChild(this.shadowContainer),this.resizeController.observeMutations(this.container),this.resizeController.observeIntersection(this.container),this.setupStyles(),this.addNewTabButtons()}getStackByView({name:t}){const e=this.layout.findFirstComponentItemById(t);if(e?.parent&&e?.parent?.isStack)return he.wrap(e.parent,this)}getRoot(){return he.wrap(this.layout.rootItem,this)}async platformCloseView(e){const i=t.__classPrivateFieldGet(this,we,"m",Ce).call(this,e.name);if(!i)throw new Error(`View with name: ${e.name} not found in layout.`);i.closeView()}async platformCreateView(t,{location:e,targetView:i}={}){if(i)throw new Error("TargetView not supported in web");const n={options:this.platformProvider.normalizeOptions(t),target:this.identity,location:e};return this.insertView(n)}setupStyles(){this.container.setAttribute("data-openfin-layout-name",this.identity.layoutName);const t=this.container.querySelector(".lm_goldenlayout");t?(t.setAttribute("data-layout-name",this.identity.layoutName),this.config.settings?.hasHeaders?t.setAttribute("data-settings-has-headers","true"):t.removeAttribute("data-settings-has-headers"),this.initialConfig.settings?.preventSplitterResize?t.setAttribute("data-settings-prevent-splitter-resize","true"):t.removeAttribute("data-settings-prevent-splitter-resize"),"scroll"===this.initialConfig.settings?.tabOverflowBehavior?t.setAttribute("data-settings-tab-overflow","scroll"):t.removeAttribute("data-settings-tab-overflow")):console.warn("Layout div not found cannot apply settings")}async insertView({options:t,location:e,targetView:i}){const n=e?this.layoutContentCache.getItemOrUndefined(e.id):void 0,o=i?this.layoutContentCache.getItemOrUndefined(i.name):void 0,s=n??o??he.wrap(this.layout.rootItem,this);let r;if(Ft.isStack(s.raw))r=s.raw;else{if(!le(s.raw))throw new Error("Cannot add a view at the requested location");r=s.raw.newItem({type:"stack",content:[]})}const a=Math.min(r.contentItems.length,e?.index??r.contentItems.length);let l=this.layout.findFirstComponentItemById(t.name),h=r.getActiveComponentItem(),d=h?.focused;l?(l.parent&&l.parent.removeChild(l,!0),r.addChild(l,a)):l=r.newComponent("view",t,t.title??t.url??"Default Title",a);"background"===(e?.displayState??"focused")&&h&&r.setActiveComponentItem(h,!!d),this.ensureNewTabButton(r);const c=l.component.identity;return Promise.resolve({identity:c})}async replaceView({viewToReplace:t,newView:e}){const i=this.getStackByView(t);if(!i)throw new Error(`View with name: ${t.name} not found in layout.`);const n=i.contentItems.findIndex(e=>e.viewName===t.name);if(-1===n)throw new Error(`View with name: ${t.name} not found in layout.`);if(t.name!==e.name){const o=this.layoutContentCache.getOrCreateEntityId(i),{identity:s}=await this.platformCreateView(e,{location:{id:o,index:n}});return await this.platformCloseView(t),{identity:s}}throw new Error("Cannot replace a view with itself")}replaceLayout(t){throw new Error("Method not implemented.")}async cleanupView(t){}applyPreset(t){throw new Error("Method not implemented.")}getCurrentViews(){return[...this.viewComponentsByContainerElement.values()].map(t=>t.identity)}async getFrameSnapshot(){if(this.goldenLayoutDestroyed)throw new p(this.identity.layoutName);return me(mt.fromResolved(this.layout.toConfig()),this.config)}isVisible(){return(0!==(t=this.container).offsetWidth||0!==t.offsetHeight)&&"hidden"!==window.getComputedStyle(t).visibility&&t.offsetTop>=0&&t.offsetLeft>=0&&t.offsetTop<=window.innerHeight&&t.offsetLeft<=window.innerWidth;// removed by dead control flow
 var t; }async onViewDetached({viewIdentity:t}){this.reparentingViews.add(t.name),this.platformCloseView(t)}async destroy(){this.platformProvider.unregisterEmitter(this.identity.layoutName),this.goldenLayoutDestroyed||(this.goldenLayoutDestroyed=!0,this.layout.destroy()),this.iframeContainer.remove(),this.resizeController.destroy(),this.viewComponentsByContainerElement.clear()}setupListeners(){this.container.addEventListener("pointerdown",t=>{if(t.target instanceof HTMLElement){const e=t.target.classList;["lm_tab","lm_title","lm_splitter","lm_drag_handle"].some(t=>e.contains(t))&&(this.handleDragStart(),2===t.button&&t.stopPropagation())}},!0),document.addEventListener("pointerup",()=>this.handleDragEnd(),!0),this.layout.on("tabCreated",t=>{const e=t.componentItem.component;!1===e.componentState[`${Kt}isClosable`]&&t.element.setAttribute("data-is-closable","false"),t.element.setAttribute("data-view-name",e.identity.name),t.element.id=`tab-${e.identity.name}`,this.domEmitter.dispatchLocalEvent("tab-created",e.identity)}),this.layout.on("itemCreated",({target:t})=>{const e=t;if(Tt.isComponentItem(e)){const t=e.component;this.domEmitter.dispatchLocalEvent("container-created",t.identity)}Ft.isStack(e)&&(e.toggleMaximise=()=>this.toggleMaximise(e),this.ensureNewTabButton(e))}),this.layout.on("itemDestroyed",t=>{const e=t.target;if(Tt.isComponentItem(e)){const t=e.component;this.removeViewComponent(t)}}),this.layout.on("itemDropped",()=>{this.handleDragEnd()}),this.events.on("page-title-updated",({data:{identity:e,title:i}})=>{this.identity.uuid===e.uuid&&t.__classPrivateFieldGet(this,we,"m",Ce).call(this,e.name)?.setTitle(i)})}handleDragStart(){this.iframeContainer.style.pointerEvents="none"}handleDragEnd(){this.iframeContainer.style.pointerEvents=""}toggleMaximise(t){const e=(t,e)=>{const i=this.layout.findFirstComponentItemById(t.identity.name);return i&&i.parent&&i.parent.isStack&&i.parent.element===e},i=[...this.viewComponentsByContainerElement.values()].filter(i=>!e(i,t.element)),n=[...this.viewComponentsByContainerElement.values()].find(i=>i.isActive()&&e(i,t.element)),o=(t,e)=>{t&&t.toggleZIndex(e)},s=t=>{i.forEach(e=>{e&&e.setIsMinimised(t)})};t.isMaximised?(t.minimise(),o(n,!1),s(!1)):(s(!0),t.maximise(),o(n,!0))}removeViewComponent(t){t.destroy(),this.viewComponentsByContainerElement.delete(t.container.element),this.resizeController.unobserveContainer(t.container.element),this.reparentingViews.has(t.identity.name)?this.reparentingViews.delete(t.identity.name):this.platformProvider.closeView(t.identity.name);0===this.getCurrentViews().length&&(this.goldenLayoutDestroyed||(this.goldenLayoutDestroyed=!0,C.handleLastViewRemoved(this.layoutManager,this.identity)))}}we=new WeakSet,Ce=function(t){return[...this.viewComponentsByContainerElement.values()].find(e=>e.identity.name===t)};class Se{constructor(e,i,n,o){this.wire=e,this.connectConfig=i,this.provider=n,this.fallbackContainer=o,t.Logger.setGlobalLogLevel(i.logLevel)}async createLayout(t,e){if(!("container"in t)&&!this.fallbackContainer)throw new Error("Container property is not optional in web");const{layoutName:i}=t,n=t,o=this.provider.initLayoutViews(n),s=n.container??this.fallbackContainer,r={...this.wire.me,layoutName:i},a=new be(r,s,o,this.connectConfig,e,this.provider);C.registerLayout(e,i,a),this.fallbackContainer=null}async getLayoutSnapshot(t){return t.getLayoutSnapshot()}async handleLastViewRemoved(t){}getWire(){return this.wire}}class Ee{static async init(e){const i=e.getFin().InterApplicationBus.Channel,n=await i.create(`custom-frame-${e.me.uuid}`);n.setDefaultAction(async(t,{target:e,opts:i},o)=>{const s=n.connections.find(t=>t.name===e.name);if(s)return n.dispatch(s,t,{...i,target:e});throw new Error(`Client with name ${e.name} not found`)}),await t.relayChannelClientApi(n,"layout-relay");const o=await i.create(t.getDataChannelName(e));return new Ee(e,o)}constructor(t,e){this.wire=t,this.dataChannelProvider=e,this.emitters=new Map,this.viewNames=new Set,e.register("page-title-updated",t=>{[...this.emitters.values()].forEach(e=>{e.emit("page-title-updated",t)})})}registerEmitter(t,e){this.emitters.set(t,e)}unregisterEmitter(t){this.emitters.delete(t)}normalizeOptions(t,e="default"){const i=this.wire.me.uuid;let{name:o=`internal-generated-view-${n.v4()}`}=t;return o.match(/^internal-generated-view-/)&&this.viewNames.has(o)&&"duplicate"===e&&(o=`internal-generated-view-${n.v4()}`),this.viewNames.add(o),{...t,name:o,uuid:i}}closeView(t){this.viewNames.delete(t)}initLayoutViews({layout:t,multiInstanceViewBehavior:e}){return m(t=>{if("component"===t.type&&t.componentState){const i=this.normalizeOptions(t.componentState,e);return{...t,componentState:i}}return t},t)}}var xe;const Le=t=>t;xe=new WeakMap,exports.WebLayoutEntryPoint=class{constructor(e){xe.set(this,void 0),this.initLayoutManager=async(e,i,{container:n,layoutManagerOverride:o})=>{const s=await Ee.init(i),r=o??Le,a=new Se(i,t.__classPrivateFieldGet(this,xe,"f"),s,n),l=new(r(C.createClosedConstructor(a)));return await z(i,l),l},this.applyLayoutSnapshot=async(e,i,n)=>{await i.applyLayoutSnapshot(t.__classPrivateFieldGet(this,xe,"f").platform.layoutSnapshot)},this.createLayout=async(t,e)=>C.createLayout(t,e),this.destroyLayout=async(t,e)=>C.destroyLayout(t,e),t.__classPrivateFieldSet(this,xe,e,"f")}};


/***/ },

/***/ "./node_modules/@openfin/web-notifications-client/dist/client/index.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@openfin/web-notifications-client/dist/client/index.js ***!
  \*****************************************************************************/
(module) {

!function(e,t){ true?module.exports=t():0}(this,(()=>(()=>{"use strict";var e={7(e){var t,n="object"==typeof Reflect?Reflect:null,i=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var o=Number.isNaN||function(e){return e!=e};function r(){r.init.call(this)}e.exports=r,e.exports.once=function(e,t){return new Promise((function(n,i){function o(n){e.removeListener(t,r),i(n)}function r(){"function"==typeof e.removeListener&&e.removeListener("error",o),n([].slice.call(arguments))}h(e,t,r,{once:!0}),"error"!==t&&function(e,t){"function"==typeof e.on&&h(e,"error",t,{once:!0})}(e,o)}))},r.EventEmitter=r,r.prototype._events=void 0,r.prototype._eventsCount=0,r.prototype._maxListeners=void 0;var a=10;function s(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function c(e){return void 0===e._maxListeners?r.defaultMaxListeners:e._maxListeners}function l(e,t,n,i){var o,r,a,l;if(s(n),void 0===(r=e._events)?(r=e._events=Object.create(null),e._eventsCount=0):(void 0!==r.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),r=e._events),a=r[t]),void 0===a)a=r[t]=n,++e._eventsCount;else if("function"==typeof a?a=r[t]=i?[n,a]:[a,n]:i?a.unshift(n):a.push(n),(o=c(e))>0&&a.length>o&&!a.warned){a.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+a.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=a.length,l=u,console&&console.warn&&console.warn(l)}return e}function u(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function d(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=u.bind(i);return o.listener=n,i.wrapFn=o,o}function f(e,t,n){var i=e._events;if(void 0===i)return[];var o=i[t];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(o):v(o,o.length)}function p(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function v(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function h(e,t,n,i){if("function"==typeof e.on)i.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function o(r){i.once&&e.removeEventListener(t,o),n(r)}))}}Object.defineProperty(r,"defaultMaxListeners",{enumerable:!0,get:function(){return a},set:function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");a=e}}),r.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},r.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},r.prototype.getMaxListeners=function(){return c(this)},r.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var o="error"===e,r=this._events;if(void 0!==r)o=o&&void 0===r.error;else if(!o)return!1;if(o){var a;if(t.length>0&&(a=t[0]),a instanceof Error)throw a;var s=new Error("Unhandled error."+(a?" ("+a.message+")":""));throw s.context=a,s}var c=r[e];if(void 0===c)return!1;if("function"==typeof c)i(c,this,t);else{var l=c.length,u=v(c,l);for(n=0;n<l;++n)i(u[n],this,t)}return!0},r.prototype.addListener=function(e,t){return l(this,e,t,!1)},r.prototype.on=r.prototype.addListener,r.prototype.prependListener=function(e,t){return l(this,e,t,!0)},r.prototype.once=function(e,t){return s(t),this.on(e,d(this,e,t)),this},r.prototype.prependOnceListener=function(e,t){return s(t),this.prependListener(e,d(this,e,t)),this},r.prototype.removeListener=function(e,t){var n,i,o,r,a;if(s(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(o=-1,r=n.length-1;r>=0;r--)if(n[r]===t||n[r].listener===t){a=n[r].listener,o=r;break}if(o<0)return this;0===o?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,o),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,a||t)}return this},r.prototype.off=r.prototype.removeListener,r.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var o,r=Object.keys(n);for(i=0;i<r.length;++i)"removeListener"!==(o=r[i])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},r.prototype.listeners=function(e){return f(this,e,!0)},r.prototype.rawListeners=function(e){return f(this,e,!1)},r.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):p.call(e,t)},r.prototype.listenerCount=p,r.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}},89(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.DeferredPromise=class{constructor(){const e=new Promise(((e,t)=>{this._resolve=e,this._reject=t}));this._promise=e}get promise(){return this._promise}get resolve(){return this._resolve}get reject(){return this._reject}}},777(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});const i=n(89);async function o(e,t){let n=0;for(const i of e)await t(i,n,e),n++}async function r(e,t){await Promise.all(e.map(t))}function a(e,t,n){const o=new i.DeferredPromise,r=e.add(((...e)=>{t(...e)&&(r.remove(),o.resolve())}));return n&&n.catch((e=>{r.remove(),o.reject(e)})),s(o.promise)}function s(e){return e.catch((()=>{})),e}t.serialForEach=o,t.serialMap=async function(e,t){const n=[];return await o(e,(async(e,i,o)=>{n.push(await t(e,i,o))})),n},t.serialFilter=async function(e,t){const n=[];return await o(e,(async(e,i,o)=>{await t(e,i,o)&&n.push(e)})),n},t.parallelForEach=r,t.parallelMap=async function(e,t){const n=[];return await r(e,(async(e,i,o)=>{n[i]=await t(e,i,o)})),n},t.parallelFilter=async function(e,t){const n=[];return await r(e,(async(e,i,o)=>{n[i]=await t(e,i,o)})),e.filter(((e,t)=>n[t]))},t.withStrictTimeout=function(e,t,n){const i=new Promise(((t,i)=>setTimeout((()=>i(new Error(n))),e)));return s(Promise.race([i,t]))},t.withTimeout=function(e,t){const n=new Promise((t=>setTimeout((()=>t([!0,void 0])),e))),i=t.then((e=>[!1,e]));return Promise.race([n,i])},t.untilTrue=function(e,t,n){return t()?Promise.resolve():a(e,t,n)},t.untilSignal=a,t.allowReject=s},785(e,t,n){function i(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),i(n(777)),i(n(89))},471(e,t,n){var i=this&&this.__rest||function(e,t){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(n[i[o]]=e[i[o]])}return n};Object.defineProperty(t,"__esModule",{value:!0}),t.getEventRouter=t.eventEmitter=t.EventRouter=void 0;const o=n(7),r=n(902),a=n(349);class s{constructor(e){this._emitterProviders={},this._deserializers={},this._defaultEmitter=e}registerEmitterProvider(e,t){this._emitterProviders[e]=t}registerDeserializer(e,t){this._deserializers[e]=t}dispatchEvent(e){const{type:t,target:n}=e,o=i(e,["type","target"]);let s;if(!n)throw new Error("Invalid event, no target specified");if("default"===n)s=this._defaultEmitter;else{if(!this._emitterProviders[n.type])throw new Error(`Invalid target, no provider registered for '${n.type}'`);s=this._emitterProviders[n.type](n.id)}const c=Object.assign({type:t},o),l=this._deserializers[t];l?s.emit(t,l(c)):"notification-form-submitted"===t?function(e,t){let n=!1;e.preventDefault=()=>n=!0,t.emit("notification-form-submitted",e),n||(0,r.tryServiceDispatch)(a.APITopic.SET_FORM_STATUS_OPTIONS,{formStatus:"submitted",_notificationId:e.notification.id})}(c,s):s.emit(t,c)}}let c;t.EventRouter=s,t.eventEmitter=new o.EventEmitter,t.getEventRouter=function(){return c||(c=new s(t.eventEmitter)),c}},158(e,t){var n;Object.defineProperty(t,"__esModule",{value:!0}),t.ActionBodyClickType=t.ActionNoopType=t.ActionTrigger=void 0,(n=t.ActionTrigger||(t.ActionTrigger={})).CONTROL="control",n.SELECT="select",n.CLOSE="close",n.EXPIRE="expire",n.PROGRAMMATIC="programmatic",(t.ActionNoopType||(t.ActionNoopType={})).EVENT_DISMISS="event_dismiss",(t.ActionBodyClickType||(t.ActionBodyClickType={})).DISMISS_EVENT="dismiss_event"},793(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.getChannelClient=t.clearAwaitedChannelClient=t.initAwaitedChannelClient=t.ServiceConfig=void 0;const i=n(349),o=n(36),r=n(329);t.ServiceConfig={serviceChannel:i.SERVICE_CHANNEL,serviceUuid:i.SERVICE_IDENTITY.uuid,routingEnabled:!1};const a=async({wait:e})=>{await o.Log.info(`Connecting to Notifications (${t.ServiceConfig.serviceChannel})...`);const n=await r.finContext.InterApplicationBus.Channel.connect(t.ServiceConfig.serviceChannel,{wait:e,payload:{version:"2.14.0-alpha-4623"}});return await o.Log.info(`Successfully connected to Notifications (${t.ServiceConfig.serviceChannel}).`),n};let s,c;t.initAwaitedChannelClient=()=>s?{channelClientPromise:s,isInit:!1}:(s=a({wait:!0}),s.catch((e=>(0,t.clearAwaitedChannelClient)())),{channelClientPromise:s,isInit:!0}),t.clearAwaitedChannelClient=()=>{s=null},t.getChannelClient=async()=>s||(async()=>{if(!c){try{c=await a({wait:!1}),c.setDefaultAction((()=>!1))}catch(e){throw await o.Log.error('Could not find channel provider. Did you call "notifications.register()"?'),e}c.onDisconnection((()=>{c=null}))}return c})()},329(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.setFinContext=t.finContext=void 0,t.setFinContext=e=>{t.finContext=e}},578(e,t){Object.defineProperty(t,"__esModule",{value:!0})},610(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.defaultValidateEnvironment=t.defaultDispatch=void 0;const i=n(793),o=n(329);t.defaultDispatch=async function(e,t){return(await(0,i.getChannelClient)()).dispatch(e,t)},t.defaultValidateEnvironment=function(){if(void 0===o.finContext)throw new Error("fin is not defined. The openfin-notifications module is only intended for use in an OpenFin application.")}},902(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.setDispatchMethod=t.tryServiceDispatch=void 0,t.tryServiceDispatch=async(e,t)=>{throw new Error("Environment is not initialized..")},t.setDispatchMethod=e=>{t.tryServiceDispatch=e}},919(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.validateExternalProviderInfo=void 0,t.validateExternalProviderInfo=function(e){if(!e.id)throw new Error("id must be a non-zero length and must be a unique identifier of the provider.");if(!e.title)throw new Error("title must be a non-zero length.");if(!e.serviceId)throw new Error("serviceId must be a non-zero length and must match the service id of the Web Notification Center instance.")}},637(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.FieldType=void 0,t.FieldType={string:"string",number:"number",boolean:"boolean",date:"date",checkboxGroup:"checkboxGroup",radioGroup:"radioGroup",time:"time"}},2(e,t,n){var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||i(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(637),t),o(n(155),t)},155(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.WidgetType=t.TimeWidgetType=t.DateWidgetType=t.RadioGroupWidgetType=t.CheckboxGroupWidgetType=t.BooleanWidgetType=t.NumberWidgetType=t.StringWidgetType=void 0,t.StringWidgetType={Text:"Text",Dropdown:"Dropdown"},t.NumberWidgetType={Number:"Number"},t.BooleanWidgetType={Toggle:"Toggle",Checkbox:"Checkbox"},t.CheckboxGroupWidgetType={CheckboxGroup:"CheckboxGroup"},t.RadioGroupWidgetType={RadioGroup:"RadioGroup"},t.DateWidgetType={Date:"Date"},t.TimeWidgetType={Time:"Time"},t.WidgetType=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},t.StringWidgetType),t.NumberWidgetType),t.BooleanWidgetType),t.CheckboxGroupWidgetType),t.RadioGroupWidgetType),t.DateWidgetType),t.TimeWidgetType)},403(e,t){var n,i;Object.defineProperty(t,"__esModule",{value:!0}),t.IndicatorColor=t.IndicatorType=void 0,(i=t.IndicatorType||(t.IndicatorType={})).FAILURE="failure",i.WARNING="warning",i.SUCCESS="success",(n=t.IndicatorColor||(t.IndicatorColor={})).RED="red",n.GREEN="green",n.YELLOW="yellow",n.BLUE="blue",n.PURPLE="purple",n.GRAY="gray",n.ORANGE="orange",n.MAGENTA="magenta",n.TEAL="teal"},349(e,t){var n;Object.defineProperty(t,"__esModule",{value:!0}),t.eventTypes=t.APITopic=t.getChannelName=t.SERVICE_CHANNEL=t.SERVICE_IDENTITY=void 0,t.SERVICE_IDENTITY={uuid:"notifications-service",name:"notifications-service"},t.SERVICE_CHANNEL="of-notifications-service-v1",t.getChannelName=e=>e===t.SERVICE_IDENTITY.uuid?t.SERVICE_CHANNEL:`${e}-${t.SERVICE_CHANNEL}`,(n=t.APITopic||(t.APITopic={})).CREATE_NOTIFICATION="create-notification",n.UPDATE_NOTIFICATION="update-notification",n.CLEAR_NOTIFICATION="clear-notification",n.SET_REMINDER="set-reminder",n.CANCEL_REMINDER="cancel-reminder",n.GET_APP_NOTIFICATIONS="fetch-app-notifications",n.CLEAR_APP_NOTIFICATIONS="clear-app-notifications",n.TOGGLE_NOTIFICATION_CENTER="toggle-notification-center",n.ADD_EVENT_LISTENER="add-event-listener",n.REMOVE_EVENT_LISTENER="remove-event-listener",n.GET_PROVIDER_STATUS="get-provider-status",n.GET_NOTIFICATIONS_COUNT="get-notifications-count",n.SHOW_NOTIFICATION_CENTER="show-notification-center",n.HIDE_NOTIFICATION_CENTER="hide-notification-center",n.REGISTER_PLATFORM="register-notifications-platform",n.DEREGISTER_PLATFORM="deregister-notifications-platform",n.SET_FORM_STATUS_OPTIONS="set-form-status-options",n.SET_FORM_VALIDATION_ERRORS="set-form-validation-errors",n.GET_USER_SETTINGS_STATUS="get-user-settings-status",n.SET_DEFAULT_PLATFORM_SHORTCUT="set-default-platform-shortcut",n.SET_NOTIFICATION_SECURITY_RULE="set-notification-security-rule",t.eventTypes=["notification-created","notification-closed","notification-action","notification-form-submitted","notification-form-values-changed","notifications-count-changed","notification-sound-toggled","notification-reminder-created","notification-reminder-removed","notification-toast-dismissed"]},36(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.Log=void 0;const i=n(329);class o{static async error(e){try{const t=o.getPrefixedMessage(e);console.error(t),await i.finContext.System.log("error",t)}catch(e){o.handleError(e,"Failed to log error")}}static async warn(e){try{const t=o.getPrefixedMessage(e);console.warn(t),await i.finContext.System.log("warning",t)}catch(e){o.handleError(e,"Failed to log warning")}}static async info(e){try{const t=o.getPrefixedMessage(e);console.info(t),await i.finContext.System.log("info",t)}catch(e){o.handleError(e,"Failed to log info")}}static getPrefixedMessage(e){return`${o.LOG_PREFIX} ${e}`}static handleError(e,t){e instanceof Error?console.error(`${t} - ${e.name}: ${e.message}`):console.error(`${t} - ${JSON.stringify(e)}`)}}t.Log=o,o.LOG_PREFIX="[@openfin/notifications]"},405(e,t,n){var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return o(t,e),t},a=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||i(t,e,n)},s=this&&this.__rest||function(e,t){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(n[i[o]]=e[i[o]])}return n};Object.defineProperty(t,"__esModule",{value:!0}),t.setAllowedOrigins=t.getUserSettingStatus=t.UserSettings=t.getNotificationsCount=t.hide=t.show=t.setDefaultPlatformShortcut=t.toggleNotificationCenter=t.clearAll=t.getAll=t.cancelReminder=t.setReminder=t.clear=t.update=t.create=t.removeEventListener=t.addEventListener=t.VERSION=t.NotificationIndicatorType=t.IndicatorColor=t.NotificationIndicatorWithCustomColor=t.NotificationIndicator=t.NotificationOptions=t.provider=t.actions=void 0;const c=n(158),l=n(902),u=n(349),d=n(471),f=r(n(217));t.provider=f;const p=n(855),v=n(403);Object.defineProperty(t,"NotificationIndicator",{enumerable:!0,get:function(){return v.NotificationIndicator}}),Object.defineProperty(t,"NotificationIndicatorWithCustomColor",{enumerable:!0,get:function(){return v.NotificationIndicatorWithCustomColor}}),Object.defineProperty(t,"NotificationIndicatorType",{enumerable:!0,get:function(){return v.IndicatorType}}),Object.defineProperty(t,"IndicatorColor",{enumerable:!0,get:function(){return v.IndicatorColor}});const h=n(965);Object.defineProperty(t,"NotificationOptions",{enumerable:!0,get:function(){return h.NotificationOptions}});const g=r(n(158));t.actions=g,a(n(158),t),a(n(578),t),a(n(93),t),a(n(2),t),a(n(520),t),a(n(96),t),a(n(470),t),t.VERSION="2.14.0-alpha-4623";const m=(0,d.getEventRouter)();function y(e){const{notification:t}=e;return Object.assign(Object.assign({},e),{notification:Object.assign(Object.assign({},t),{date:new Date(t.date),expires:null!==t.expires?new Date(t.expires):null})})}m.registerDeserializer("notification-created",(e=>y(e))),m.registerDeserializer("notification-toast-dismissed",(e=>y(e))),m.registerDeserializer("notification-closed",(e=>y(e))),m.registerDeserializer("notification-action",(e=>{var t;const n=y(e),{controlSource:i,controlIndex:o}=n,r=s(n,["controlSource","controlIndex"]);return e.trigger===c.ActionTrigger.CONTROL?Object.assign(Object.assign({},r),{control:null===(t=e.notification[i])||void 0===t?void 0:t[o]}):r})),m.registerDeserializer("notifications-count-changed",(e=>e)),m.registerDeserializer("notification-reminder-created",(e=>{const t=y(e),{reminderDate:n}=t,i=s(t,["reminderDate"]);return Object.assign(Object.assign({},i),{reminderDate:new Date(n)})})),m.registerDeserializer("notification-reminder-removed",(e=>y(e))),m.registerDeserializer("notification-sound-toggled",(e=>e)),t.addEventListener=async function(e,t){(0,p.validateEnvironment)(),e=(0,p.sanitizeEventType)(e),t=(0,p.sanitizeFunction)(t);const n=d.eventEmitter.listenerCount(e);"notification-form-submitted"===e&&(t=function(e){return t=>{const n=t.notification.id;t.setFormStatus=e=>(0,l.tryServiceDispatch)(u.APITopic.SET_FORM_STATUS_OPTIONS,Object.assign(Object.assign({},e),{_notificationId:n})),e(t)}}(t)),"notification-form-values-changed"===e&&(t=function(e){return t=>{t.setErrors=e=>(0,l.tryServiceDispatch)(u.APITopic.SET_FORM_VALIDATION_ERRORS,{errors:e,notificationId:t.notification.id}),e(t)}}(t)),d.eventEmitter.addListener(e,t),0===n&&1===d.eventEmitter.listenerCount(e)&&await(0,l.tryServiceDispatch)(u.APITopic.ADD_EVENT_LISTENER,e)},t.removeEventListener=async function(e,t){(0,p.validateEnvironment)(),e=(0,p.sanitizeEventType)(e),t=(0,p.sanitizeFunction)(t),1===d.eventEmitter.listenerCount(e)&&d.eventEmitter.listeners(e)[0]===t&&await(0,l.tryServiceDispatch)(u.APITopic.REMOVE_EVENT_LISTENER,e),d.eventEmitter.removeListener(e,t)},t.create=async function(e,t){if("object"!=typeof e||null===e)throw new Error("Invalid argument passed to create: argument must be an object and must not be null");if(void 0!==e.date&&!(e.date instanceof Date))throw new Error('Invalid argument passed to create: "date" must be a valid Date object');if(void 0!==e.expires&&null!==e.expires&&!(e.expires instanceof Date))throw new Error('Invalid argument passed to create: "expires" must be null or a valid Date object');if(t&&t.reminderDate){if(!1===e.allowReminder)throw new Error('You must not specify a reminder date for a notification with "allowReminder" option set to false.');if(!(t.reminderDate instanceof Date))throw new Error('Invalid argument passed to reminder Options: "date" must a valid Date object');if(e.expires&&e.expires.getTime()<t.reminderDate.getTime())throw new Error("Expiration date must not be earlier than reminder date.")}void 0!==e.category&&null!==e.category||(e.category="default");const n=await(0,l.tryServiceDispatch)(u.APITopic.CREATE_NOTIFICATION,Object.assign(Object.assign({},e),{date:e.date&&e.date.getTime(),expires:e.expires&&e.expires.getTime(),reminder:(null==t?void 0:t.reminderDate)&&t.reminderDate.getTime()}));return Object.assign(Object.assign({},n),{date:new Date(n.date),expires:null!==n.expires?new Date(n.expires):null})},t.update=async function(e){if("object"!=typeof e||null===e)throw new Error("Invalid argument passed to create: argument must be an object and must not be null");if(!e.id)throw new Error('Invalid argument passed to create: "id" must be Id of previously created Notification');const t=await(0,l.tryServiceDispatch)(u.APITopic.UPDATE_NOTIFICATION,Object.assign({},e));return Object.assign({},t)},t.clear=async function(e){return(0,l.tryServiceDispatch)(u.APITopic.CLEAR_NOTIFICATION,{id:e})},t.setReminder=async function(e,t){if(!(t instanceof Date))throw new Error('Invalid argument passed to setReminder: "reminderDate" must a valid Date object');if(t.getTime()<Date.now())throw new Error('Invalid argument passed to setReminder: "reminderDate" was set to a Date in the past, must be a Date in the future.');const n=await(0,l.tryServiceDispatch)(u.APITopic.SET_REMINDER,{id:e,reminder:t.getTime()});return n?console.log(`[Client::setReminder] Reminder set for notification: ${e}`):console.log(`[Client::setReminder] Notification not found for id: ${e}`),n},t.cancelReminder=async function(e){const t=await(0,l.tryServiceDispatch)(u.APITopic.CANCEL_REMINDER,{id:e});return t?console.log(`[Client::cancelReminder] Reminder canceled for notification: ${e}`):console.log(`[Client::cancelReminder] Notification not found for id: ${e}`),t},t.getAll=async function(){return(await(0,l.tryServiceDispatch)(u.APITopic.GET_APP_NOTIFICATIONS,void 0)).map((e=>Object.assign(Object.assign({},e),{indicator:e.indicator||null,date:new Date(e.date),expires:null!==e.expires?new Date(e.expires):null})))},t.clearAll=async function(){return(0,l.tryServiceDispatch)(u.APITopic.CLEAR_APP_NOTIFICATIONS,void 0)},t.toggleNotificationCenter=async function(){return(0,l.tryServiceDispatch)(u.APITopic.TOGGLE_NOTIFICATION_CENTER,void 0)},t.setDefaultPlatformShortcut=function(e){return(0,l.tryServiceDispatch)(u.APITopic.SET_DEFAULT_PLATFORM_SHORTCUT,e)},t.show=async function(e){return(0,l.tryServiceDispatch)(u.APITopic.SHOW_NOTIFICATION_CENTER,e)},t.hide=async function(){return(0,l.tryServiceDispatch)(u.APITopic.HIDE_NOTIFICATION_CENTER,void 0)},t.getNotificationsCount=async function(){return(0,l.tryServiceDispatch)(u.APITopic.GET_NOTIFICATIONS_COUNT,void 0)},(t.UserSettings||(t.UserSettings={})).SOUND_ENABLED="soundEnabled",t.getUserSettingStatus=async function(e){return(0,l.tryServiceDispatch)(u.APITopic.GET_USER_SETTINGS_STATUS,e)},t.setAllowedOrigins=async e=>(0,l.tryServiceDispatch)(u.APITopic.SET_NOTIFICATION_SECURITY_RULE,{allowedOrigins:e})},217(e,t,n){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.isConnectedToAtLeast=t.getStatus=void 0;const o=i(n(667)),r=n(785),a=n(902),s=n(349);function c(){return(0,r.withStrictTimeout)(500,(0,a.tryServiceDispatch)(s.APITopic.GET_PROVIDER_STATUS,void 0),"").catch((()=>({connected:!1,version:null,templateAPIVersion:null})))}t.getStatus=c,t.isConnectedToAtLeast=async function(e){const t=await c();if(t.connected&&null!==t.version){const n=(0,o.default)(t.version,e);if(0===n||1===n)return!0}return!1}},797(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.register=t.ChannelClientHandlers=void 0;const i=n(349),o=n(471),r=n(36),a=n(793),s=n(217),c=n(329);class l{}t.ChannelClientHandlers=l,l.handleDefaultAction=()=>!1,l.handleEventAction=e=>{(0,o.getEventRouter)().dispatchEvent(e)},l.handleWarnAction=async e=>{await r.Log.warn(e)},l.handleDisconnection=async()=>{(0,a.getChannelClient)()&&(await r.Log.warn("Disconnected from Notifications. Reconnecting..."),(0,a.clearAwaitedChannelClient)(),await f(),await p())};let u=null;t.register=async e=>{if(null==e?void 0:e.externalProviderConfig)throw new Error("It appears you are attempting to use an external provider configuration with the desktop client. This usually suggests that the Client API package version in use is deprecated.");if(u)return u;try{return u=d(e),await u}finally{u=null}};const d=async e=>{const t=e;if(null==t?void 0:t.routingOptions){const e=t.routingOptions.routerChannelName;if(!e)throw new Error("When a router config is provided, the router channel name must also be provided and cannot be an empty string.");r.Log.info(`Connecting to router channel: ${e}`),a.ServiceConfig.serviceChannel=e,a.ServiceConfig.routingEnabled=!0}else if(null==t?void 0:t.customManifest){const e=t.customManifest;if(r.Log.info(`Connecting to private instance: ${e.manifestUuid} at ${e.manifestUrl}`),!e.manifestUrl)throw new Error("When a custom manifest config is provided, the manifest url must be provided and cannot be an empty string.");if(!e.manifestUuid)throw new Error("When a custom manifest config is provided, the manifest UUID must be provided and cannot be an empty string.");a.ServiceConfig.serviceChannel=`${e.manifestUuid}-${i.SERVICE_CHANNEL}`,a.ServiceConfig.serviceUuid=e.manifestUuid,a.ServiceConfig.serviceManifestUrl=e.manifestUrl,await f()}else a.ServiceConfig.serviceChannel=i.SERVICE_CHANNEL,await f();return await p(),{clientAPIVersion:"2.14.0-alpha-4623",notificationsVersion:(await(0,s.getStatus)()).version||"unknown"}},f=async()=>{if(!a.ServiceConfig.routingEnabled)try{const e=a.ServiceConfig.serviceManifestUrl,t=window.navigator.userAgent.toLowerCase().includes("windows"),n=e||"fins://system-apps/notification-center";t?(await r.Log.info("Launching Notifications via fin.System.launchManifest..."),await c.finContext.System.launchManifest(n,{noUi:!0})):(await r.Log.info("Launching Notifications via fin.System.openUrlWithBrowser..."),await c.finContext.System.openUrlWithBrowser(n))}catch(e){throw e instanceof Error?await r.Log.error(`Failed to launch Notifications - ${e.name}: ${e.message}`):await r.Log.error(`Failed to launch Notifications - ${JSON.stringify(e)}`),e}},p=async()=>{try{const{channelClientPromise:e,isInit:t}=(0,a.initAwaitedChannelClient)(),n=await e;t&&(n.setDefaultAction(l.handleDefaultAction),n.register("event",l.handleEventAction),n.register("WARN",l.handleWarnAction),n.onDisconnection(l.handleDisconnection),!a.ServiceConfig.routingEnabled)&&c.finContext.Application.wrapSync({uuid:a.ServiceConfig.serviceUuid}).once("closed",l.handleDisconnection)}catch(e){throw e instanceof Error?await r.Log.error(`Failed to connect to Notifications - ${e.name}: ${e.message}`):await r.Log.error(`Failed to connect to Notifications - ${JSON.stringify(e)}`),e}}},520(e,t){Object.defineProperty(t,"__esModule",{value:!0})},93(e,t){Object.defineProperty(t,"__esModule",{value:!0})},96(e,t){Object.defineProperty(t,"__esModule",{value:!0})},134(e,t){Object.defineProperty(t,"__esModule",{value:!0})},468(e,t){Object.defineProperty(t,"__esModule",{value:!0})},470(e,t,n){var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||i(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(134),t),o(n(468),t),o(n(965),t),o(n(929),t)},965(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.TemplateFragmentNames=t.PresentationTemplateFragmentNames=t.ContainerTemplateFragmentNames=t.TemplateNames=void 0,t.TemplateNames={markdown:"markdown",list:"list",custom:"custom"},t.ContainerTemplateFragmentNames={container:"container"},t.PresentationTemplateFragmentNames={text:"text",image:"image",list:"list",actionableText:"actionableText"},t.TemplateFragmentNames=Object.assign(Object.assign({},t.ContainerTemplateFragmentNames),t.PresentationTemplateFragmentNames)},929(e,t){Object.defineProperty(t,"__esModule",{value:!0})},855(e,t){function n(e,t){let n;try{n=JSON.stringify(e)}catch(e){n=t}return n}Object.defineProperty(t,"__esModule",{value:!0}),t.setValidationMethod=t.validateEnvironment=t.safeStringify=t.sanitizeEventType=t.sanitizeFunction=void 0,t.sanitizeFunction=function(e){if("function"!=typeof e)throw new Error(`Invalid argument passed: ${n(e,"The provided value")} is not a valid function`);return e},t.sanitizeEventType=function(e){if("notification-action"===e||"notification-created"===e||"notification-toast-dismissed"===e||"notification-closed"===e||"notifications-count-changed"===e||"notification-form-submitted"===e||"notification-reminder-created"===e||"notification-reminder-removed"===e||"notification-form-values-changed"===e||"notification-sound-toggled"===e)return e;throw new Error(`Invalid argument passed: ${n(e,"The provided event type")} is not a valid Notifications event type`)},t.safeStringify=n,t.validateEnvironment=()=>{throw new Error("fin is not defined. The notifications module is only intended for use in an OpenFin application.")},t.setValidationMethod=e=>{t.validateEnvironment=e}},683(e,t,n){var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||i(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),t.connectToNotifications=void 0;const r=n(902),a=n(855),s=n(471),c=n(797),l=n(217),u=n(329),d=n(610),f=n(919);let p;o(n(405),t);const v=async(e,t)=>{if(!p)throw new Error("Not connected to the notification center. Did you call connectToNotifications()?.");return p.dispatch(e,t)};t.connectToNotifications=async function e(t){if(!t)throw new Error("Provider config must be provided.");if(!t.finContext)throw new Error("fin context must be provided.");if("desktop"===t.environment){if(!t.finContext.me.isOpenFin)throw new Error("You must be in Here environment when you provide a desktop config.");return(0,u.setFinContext)(t.finContext),(0,a.setValidationMethod)(d.defaultValidateEnvironment),(0,r.setDispatchMethod)(d.defaultDispatch),(0,c.register)(t)}{(0,f.validateExternalProviderInfo)(t),(0,a.setValidationMethod)((()=>{})),(0,r.setDispatchMethod)(v);const n={id:t.id,title:t.title,icon:t.icon};console.log("Connecting to the Notification Center..."),p=await t.finContext.InterApplicationBus.Channel.connect(t.serviceId,{wait:!0,payload:{version:"2.14.0-alpha-4623",providerInfo:n}}),console.log("Connected to the Notification Center.");const i=(0,s.getEventRouter)();return p.setDefaultAction((()=>!1)),p.register("WARN",(e=>console.warn(e))),p.register("event",(e=>{i.dispatchEvent(e)})),p.onDisconnection((()=>{console.warn("Disconnected from the Notification Center"),p=null,setTimeout((()=>{console.log("Attempting to reconnect to the Notification Center"),e(t)}),300)})),{clientAPIVersion:"2.14.0-alpha-4623",notificationsVersion:(await(0,l.getStatus)()).version||"unknown"}}}},667(e){e.exports=void 0}},t={};return function n(i){var o=t[i];if(void 0!==o)return o.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}(683)})()));

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!*********************************************!*\
  !*** ./client/src/content/notifications.ts ***!
  \*********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const api_1 = __webpack_require__(/*! ../platform/api */ "./client/src/platform/api.ts");
const MAX_LOG_ENTRIES = 50;
/**
 * Sets status text for user feedback.
 * @param message Status message.
 * @param kind Status kind.
 */
function setStatus(message, kind = "info") {
    const statusElement = document.querySelector("#status");
    if (statusElement === null) {
        return;
    }
    statusElement.textContent = message;
    statusElement.classList.remove("status-info", "status-error", "status-success");
    statusElement.classList.add(`status-${kind}`);
}
/**
 * Renders the running notification count badge.
 * @param count Current count.
 */
function setCount(count) {
    const countElement = document.querySelector("#notificationCount");
    if (countElement !== null) {
        countElement.textContent = String(count);
    }
}
/**
 * Appends an entry to the event log, trimming history past MAX_LOG_ENTRIES.
 * @param kind Log category, drives the row colour.
 * @param message Pre-formatted message text.
 */
function logEvent(kind, message) {
    const logElement = document.querySelector("#eventLog");
    if (logElement === null) {
        return;
    }
    const entry = document.createElement("div");
    entry.className = `log-entry log-${kind}`;
    const time = document.createElement("span");
    time.className = "log-time";
    time.textContent = new Date().toLocaleTimeString();
    const label = document.createElement("span");
    label.className = "log-kind";
    label.textContent = kind;
    const text = document.createElement("span");
    text.className = "log-message";
    text.textContent = message;
    entry.append(time, label, text);
    logElement.prepend(entry);
    while (logElement.childElementCount > MAX_LOG_ENTRIES) {
        logElement.lastElementChild?.remove();
    }
}
/**
 * Reads the create-notification form into a typed value object.
 * @returns Current form values, or null if any required field is missing.
 */
function readForm() {
    const titleInput = document.querySelector("#nTitle");
    const bodyInput = document.querySelector("#nBody");
    const toastInput = document.querySelector("#nToast");
    const priorityInput = document.querySelector("#nPriority");
    const buttonsInput = document.querySelector("#nIncludeButtons");
    if (titleInput === null ||
        bodyInput === null ||
        toastInput === null ||
        priorityInput === null ||
        buttonsInput === null) {
        return null;
    }
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    if (title === "" || body === "") {
        setStatus("Title and body are required.", "error");
        return null;
    }
    return {
        title,
        body,
        toast: toastInput.value ?? "transient",
        priority: Number.parseInt(priorityInput.value, 10) || 1,
        includeButtons: buttonsInput.checked
    };
}
/**
 * Builds a markdown-template notification payload from the form values.
 * Buttons carry an application-defined `onClick` payload so the action handler can
 * tell which button fired without inspecting DOM state.
 * @param values Form values from readForm().
 * @returns A NotificationOptions ready for create().
 */
function buildNotification(values) {
    const buttons = values.includeButtons
        ? [
            {
                title: "Approve",
                onClick: { task: "approve", source: "demo" }
            },
            {
                title: "Dismiss",
                onClick: { task: "dismiss", source: "demo" }
            }
        ]
        : undefined;
    const notification = {
        template: "markdown",
        title: values.title,
        body: values.body,
        toast: values.toast,
        priority: values.priority
    };
    if (buttons !== undefined) {
        notification.buttons = buttons;
    }
    return notification;
}
/**
 * Starts an async task from a synchronous DOM callback.
 * @param task Task to run.
 */
function runAsyncTask(task) {
    task().catch((error) => {
        console.error("Unexpected async handler failure.", error);
    });
}
/**
 * Subscribes to a notification event and reports non-fatal subscription failures.
 * @param client Notifications client singleton.
 * @param type Event type to subscribe to.
 * @param handler Event handler.
 */
async function subscribeToNotificationEvent(client, type, handler) {
    try {
        await client.on(type, handler);
    }
    catch (error) {
        console.error(`Unable to subscribe to ${type}.`, error);
    }
}
/**
 * Creates a notification from the current form values.
 */
async function handleCreateClick() {
    const values = readForm();
    if (values === null) {
        return;
    }
    try {
        const payload = buildNotification(values);
        await (0, api_1.getNotificationsClient)().create(payload);
        setStatus(`Created ${values.toast} notification "${values.title}".`, "success");
    }
    catch (error) {
        setStatus(error instanceof Error ? error.message : "Unable to create notification.", "error");
    }
}
/**
 * Clears all notifications owned by this client.
 */
async function handleClearAllClick() {
    try {
        const count = await (0, api_1.getNotificationsClient)().clearAll();
        setStatus(`Cleared ${count} notification(s) from this client.`, "success");
        logEvent("info", `clearAll() removed ${count} notification(s).`);
    }
    catch (error) {
        setStatus(error instanceof Error ? error.message : "Unable to clear notifications.", "error");
    }
}
/**
 * Reads all notifications and writes a short summary into the log.
 */
async function handleGetAllClick() {
    try {
        const notifications = await (0, api_1.getNotificationsClient)().getAll();
        const titles = notifications.map((notification) => notification.title).join(", ");
        const summary = notifications.length === 0 ? "(none)" : titles;
        setStatus(`getAll() returned ${notifications.length} notification(s).`, "info");
        logEvent("info", `getAll(): ${summary}`);
    }
    catch (error) {
        setStatus(error instanceof Error ? error.message : "Unable to list notifications.", "error");
    }
}
/**
 * Toggles the Notification Center.
 */
async function handleToggleCenterClick() {
    try {
        await (0, api_1.getNotificationsClient)().toggleCenter();
        setStatus("Toggled Notification Center.", "info");
    }
    catch (error) {
        setStatus(error instanceof Error ? error.message : "Unable to toggle Notification Center.", "error");
    }
}
/**
 * Subscribes to every notification lifecycle event and renders them into the log.
 * Failures during subscription are non-fatal — the rest of the demo still works.
 */
async function bindEventLog() {
    const client = (0, api_1.getNotificationsClient)();
    await subscribeToNotificationEvent(client, "notification-created", (event) => {
        logEvent("create", `${event.notification.title} (id=${event.notification.id.slice(0, 8)}…)`);
    });
    await subscribeToNotificationEvent(client, "notification-action", (event) => {
        const buttonTitle = event.control && event.control.type === "button" ? event.control.title : "(non-button)";
        const result = typeof event.result === "object" ? JSON.stringify(event.result) : String(event.result);
        logEvent("action", `${event.trigger} on "${buttonTitle}" → ${result}`);
    });
    await subscribeToNotificationEvent(client, "notification-closed", (event) => {
        logEvent("closed", `${event.notification.title} (id=${event.notification.id.slice(0, 8)}…)`);
    });
    await subscribeToNotificationEvent(client, "notification-toast-dismissed", (event) => {
        logEvent("toast-dismissed", `${event.notification.title} (id=${event.notification.id.slice(0, 8)}…)`);
    });
    await subscribeToNotificationEvent(client, "notifications-count-changed", (event) => {
        setCount(event.count);
        logEvent("count", `Notification center holds ${event.count} item(s).`);
    });
}
/**
 * Wires up every form button and the log controls. Pure DOM glue — all async work
 * funnels through the singleton client and surfaces success/failure on #status.
 */
function bindControls() {
    const createButton = document.querySelector("#btnCreate");
    const clearAllButton = document.querySelector("#btnClearAll");
    const getAllButton = document.querySelector("#btnGetAll");
    const toggleCenterButton = document.querySelector("#btnToggleCenter");
    const clearLogButton = document.querySelector("#btnClearLog");
    createButton?.addEventListener("click", () => {
        runAsyncTask(handleCreateClick);
    });
    clearAllButton?.addEventListener("click", () => {
        runAsyncTask(handleClearAllClick);
    });
    getAllButton?.addEventListener("click", () => {
        runAsyncTask(handleGetAllClick);
    });
    toggleCenterButton?.addEventListener("click", () => {
        runAsyncTask(handleToggleCenterClick);
    });
    clearLogButton?.addEventListener("click", () => {
        const logElement = document.querySelector("#eventLog");
        if (logElement !== null) {
            logElement.textContent = "";
        }
    });
}
window.addEventListener("DOMContentLoaded", async () => {
    try {
        await (0, api_1.init)();
        setStatus("Connected to notifications client. Notification Center is visible by default.", "success");
    }
    catch (error) {
        setStatus(error instanceof Error ? error.message : "Unable to initialize notifications client.", "error");
        return;
    }
    bindControls();
    try {
        const initialCount = await (0, api_1.getNotificationsClient)().getCount();
        setCount(initialCount);
    }
    catch (error) {
        console.warn("Unable to read initial notification count.", error);
    }
    await bindEventLog();
});

})();

/******/ })()
;
//# sourceMappingURL=notifications.bundle.js.map