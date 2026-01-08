/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/base64-js/index.js":
/*!*********************************************!*\
  !*** ../../node_modules/base64-js/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "../../node_modules/buffer/index.js":
/*!******************************************!*\
  !*** ../../node_modules/buffer/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(/*! base64-js */ "../../node_modules/base64-js/index.js")
const ieee754 = __webpack_require__(/*! ieee754 */ "../../node_modules/ieee754/index.js")
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ "../../node_modules/events/events.js":
/*!*******************************************!*\
  !*** ../../node_modules/events/events.js ***!
  \*******************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "../../node_modules/he/he.js":
/*!***********************************!*\
  !*** ../../node_modules/he/he.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),

/***/ "../../node_modules/ieee754/index.js":
/*!*******************************************!*\
  !*** ../../node_modules/ieee754/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "../../node_modules/lodash/_DataView.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_DataView.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ "../../node_modules/lodash/_Hash.js":
/*!******************************************!*\
  !*** ../../node_modules/lodash/_Hash.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hashClear = __webpack_require__(/*! ./_hashClear */ "../../node_modules/lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "../../node_modules/lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "../../node_modules/lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "../../node_modules/lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "../../node_modules/lodash/_hashSet.js");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ "../../node_modules/lodash/_ListCache.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_ListCache.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "../../node_modules/lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "../../node_modules/lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "../../node_modules/lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "../../node_modules/lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "../../node_modules/lodash/_listCacheSet.js");

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ "../../node_modules/lodash/_Map.js":
/*!*****************************************!*\
  !*** ../../node_modules/lodash/_Map.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "../../node_modules/lodash/_MapCache.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_MapCache.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "../../node_modules/lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "../../node_modules/lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "../../node_modules/lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "../../node_modules/lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "../../node_modules/lodash/_mapCacheSet.js");

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ "../../node_modules/lodash/_Promise.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/_Promise.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ "../../node_modules/lodash/_Set.js":
/*!*****************************************!*\
  !*** ../../node_modules/lodash/_Set.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ "../../node_modules/lodash/_SetCache.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_SetCache.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MapCache = __webpack_require__(/*! ./_MapCache */ "../../node_modules/lodash/_MapCache.js"),
    setCacheAdd = __webpack_require__(/*! ./_setCacheAdd */ "../../node_modules/lodash/_setCacheAdd.js"),
    setCacheHas = __webpack_require__(/*! ./_setCacheHas */ "../../node_modules/lodash/_setCacheHas.js");

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),

/***/ "../../node_modules/lodash/_Stack.js":
/*!*******************************************!*\
  !*** ../../node_modules/lodash/_Stack.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(/*! ./_ListCache */ "../../node_modules/lodash/_ListCache.js"),
    stackClear = __webpack_require__(/*! ./_stackClear */ "../../node_modules/lodash/_stackClear.js"),
    stackDelete = __webpack_require__(/*! ./_stackDelete */ "../../node_modules/lodash/_stackDelete.js"),
    stackGet = __webpack_require__(/*! ./_stackGet */ "../../node_modules/lodash/_stackGet.js"),
    stackHas = __webpack_require__(/*! ./_stackHas */ "../../node_modules/lodash/_stackHas.js"),
    stackSet = __webpack_require__(/*! ./_stackSet */ "../../node_modules/lodash/_stackSet.js");

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ "../../node_modules/lodash/_Symbol.js":
/*!********************************************!*\
  !*** ../../node_modules/lodash/_Symbol.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "../../node_modules/lodash/_Uint8Array.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_Uint8Array.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ "../../node_modules/lodash/_WeakMap.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/_WeakMap.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ "../../node_modules/lodash/_arrayEach.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_arrayEach.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),

/***/ "../../node_modules/lodash/_arrayFilter.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_arrayFilter.js ***!
  \*************************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),

/***/ "../../node_modules/lodash/_arrayLikeKeys.js":
/*!***************************************************!*\
  !*** ../../node_modules/lodash/_arrayLikeKeys.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "../../node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "../../node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../../node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "../../node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "../../node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "../../node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ "../../node_modules/lodash/_arrayPush.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_arrayPush.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ "../../node_modules/lodash/_arraySome.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_arraySome.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),

/***/ "../../node_modules/lodash/_assignValue.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_assignValue.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "../../node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "../../node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),

/***/ "../../node_modules/lodash/_assocIndexOf.js":
/*!**************************************************!*\
  !*** ../../node_modules/lodash/_assocIndexOf.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eq = __webpack_require__(/*! ./eq */ "../../node_modules/lodash/eq.js");

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ "../../node_modules/lodash/_baseAssign.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_baseAssign.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../../node_modules/lodash/_copyObject.js"),
    keys = __webpack_require__(/*! ./keys */ "../../node_modules/lodash/keys.js");

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),

/***/ "../../node_modules/lodash/_baseAssignIn.js":
/*!**************************************************!*\
  !*** ../../node_modules/lodash/_baseAssignIn.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../../node_modules/lodash/_copyObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "../../node_modules/lodash/keysIn.js");

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),

/***/ "../../node_modules/lodash/_baseAssignValue.js":
/*!*****************************************************!*\
  !*** ../../node_modules/lodash/_baseAssignValue.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = __webpack_require__(/*! ./_defineProperty */ "../../node_modules/lodash/_defineProperty.js");

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),

/***/ "../../node_modules/lodash/_baseClone.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_baseClone.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(/*! ./_Stack */ "../../node_modules/lodash/_Stack.js"),
    arrayEach = __webpack_require__(/*! ./_arrayEach */ "../../node_modules/lodash/_arrayEach.js"),
    assignValue = __webpack_require__(/*! ./_assignValue */ "../../node_modules/lodash/_assignValue.js"),
    baseAssign = __webpack_require__(/*! ./_baseAssign */ "../../node_modules/lodash/_baseAssign.js"),
    baseAssignIn = __webpack_require__(/*! ./_baseAssignIn */ "../../node_modules/lodash/_baseAssignIn.js"),
    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ "../../node_modules/lodash/_cloneBuffer.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "../../node_modules/lodash/_copyArray.js"),
    copySymbols = __webpack_require__(/*! ./_copySymbols */ "../../node_modules/lodash/_copySymbols.js"),
    copySymbolsIn = __webpack_require__(/*! ./_copySymbolsIn */ "../../node_modules/lodash/_copySymbolsIn.js"),
    getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "../../node_modules/lodash/_getAllKeys.js"),
    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ "../../node_modules/lodash/_getAllKeysIn.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "../../node_modules/lodash/_getTag.js"),
    initCloneArray = __webpack_require__(/*! ./_initCloneArray */ "../../node_modules/lodash/_initCloneArray.js"),
    initCloneByTag = __webpack_require__(/*! ./_initCloneByTag */ "../../node_modules/lodash/_initCloneByTag.js"),
    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ "../../node_modules/lodash/_initCloneObject.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../../node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "../../node_modules/lodash/isBuffer.js"),
    isMap = __webpack_require__(/*! ./isMap */ "../../node_modules/lodash/isMap.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js"),
    isSet = __webpack_require__(/*! ./isSet */ "../../node_modules/lodash/isSet.js"),
    keys = __webpack_require__(/*! ./keys */ "../../node_modules/lodash/keys.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "../../node_modules/lodash/keysIn.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),

/***/ "../../node_modules/lodash/_baseCreate.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_baseCreate.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js");

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),

/***/ "../../node_modules/lodash/_baseGetAllKeys.js":
/*!****************************************************!*\
  !*** ../../node_modules/lodash/_baseGetAllKeys.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "../../node_modules/lodash/_arrayPush.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../../node_modules/lodash/isArray.js");

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),

/***/ "../../node_modules/lodash/_baseGetTag.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_baseGetTag.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "../../node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "../../node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsArguments.js":
/*!*****************************************************!*\
  !*** ../../node_modules/lodash/_baseIsArguments.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsEqual.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_baseIsEqual.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqualDeep = __webpack_require__(/*! ./_baseIsEqualDeep */ "../../node_modules/lodash/_baseIsEqualDeep.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsEqualDeep.js":
/*!*****************************************************!*\
  !*** ../../node_modules/lodash/_baseIsEqualDeep.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(/*! ./_Stack */ "../../node_modules/lodash/_Stack.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "../../node_modules/lodash/_equalArrays.js"),
    equalByTag = __webpack_require__(/*! ./_equalByTag */ "../../node_modules/lodash/_equalByTag.js"),
    equalObjects = __webpack_require__(/*! ./_equalObjects */ "../../node_modules/lodash/_equalObjects.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "../../node_modules/lodash/_getTag.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../../node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "../../node_modules/lodash/isBuffer.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "../../node_modules/lodash/isTypedArray.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsMap.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_baseIsMap.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getTag = __webpack_require__(/*! ./_getTag */ "../../node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

module.exports = baseIsMap;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsNative.js":
/*!**************************************************!*\
  !*** ../../node_modules/lodash/_baseIsNative.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "../../node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "../../node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "../../node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsSet.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_baseIsSet.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getTag = __webpack_require__(/*! ./_getTag */ "../../node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}

module.exports = baseIsSet;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsTypedArray.js":
/*!******************************************************!*\
  !*** ../../node_modules/lodash/_baseIsTypedArray.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "../../node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "../../node_modules/lodash/_baseKeys.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_baseKeys.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isPrototype = __webpack_require__(/*! ./_isPrototype */ "../../node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "../../node_modules/lodash/_nativeKeys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),

/***/ "../../node_modules/lodash/_baseKeysIn.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_baseKeysIn.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "../../node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "../../node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),

/***/ "../../node_modules/lodash/_baseTimes.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_baseTimes.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ "../../node_modules/lodash/_baseUnary.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_baseUnary.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "../../node_modules/lodash/_cacheHas.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_cacheHas.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),

/***/ "../../node_modules/lodash/_cloneArrayBuffer.js":
/*!******************************************************!*\
  !*** ../../node_modules/lodash/_cloneArrayBuffer.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "../../node_modules/lodash/_Uint8Array.js");

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),

/***/ "../../node_modules/lodash/_cloneBuffer.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_cloneBuffer.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;


/***/ }),

/***/ "../../node_modules/lodash/_cloneDataView.js":
/*!***************************************************!*\
  !*** ../../node_modules/lodash/_cloneDataView.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "../../node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ }),

/***/ "../../node_modules/lodash/_cloneRegExp.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_cloneRegExp.js ***!
  \*************************************************/
/***/ ((module) => {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ }),

/***/ "../../node_modules/lodash/_cloneSymbol.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_cloneSymbol.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js");

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ }),

/***/ "../../node_modules/lodash/_cloneTypedArray.js":
/*!*****************************************************!*\
  !*** ../../node_modules/lodash/_cloneTypedArray.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "../../node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),

/***/ "../../node_modules/lodash/_copyArray.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_copyArray.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),

/***/ "../../node_modules/lodash/_copyObject.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_copyObject.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assignValue = __webpack_require__(/*! ./_assignValue */ "../../node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "../../node_modules/lodash/_baseAssignValue.js");

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),

/***/ "../../node_modules/lodash/_copySymbols.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_copySymbols.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../../node_modules/lodash/_copyObject.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "../../node_modules/lodash/_getSymbols.js");

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),

/***/ "../../node_modules/lodash/_copySymbolsIn.js":
/*!***************************************************!*\
  !*** ../../node_modules/lodash/_copySymbolsIn.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../../node_modules/lodash/_copyObject.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "../../node_modules/lodash/_getSymbolsIn.js");

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),

/***/ "../../node_modules/lodash/_coreJsData.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_coreJsData.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "../../node_modules/lodash/_defineProperty.js":
/*!****************************************************!*\
  !*** ../../node_modules/lodash/_defineProperty.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ "../../node_modules/lodash/_equalArrays.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_equalArrays.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SetCache = __webpack_require__(/*! ./_SetCache */ "../../node_modules/lodash/_SetCache.js"),
    arraySome = __webpack_require__(/*! ./_arraySome */ "../../node_modules/lodash/_arraySome.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "../../node_modules/lodash/_cacheHas.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),

/***/ "../../node_modules/lodash/_equalByTag.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_equalByTag.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js"),
    Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "../../node_modules/lodash/_Uint8Array.js"),
    eq = __webpack_require__(/*! ./eq */ "../../node_modules/lodash/eq.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "../../node_modules/lodash/_equalArrays.js"),
    mapToArray = __webpack_require__(/*! ./_mapToArray */ "../../node_modules/lodash/_mapToArray.js"),
    setToArray = __webpack_require__(/*! ./_setToArray */ "../../node_modules/lodash/_setToArray.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),

/***/ "../../node_modules/lodash/_equalObjects.js":
/*!**************************************************!*\
  !*** ../../node_modules/lodash/_equalObjects.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "../../node_modules/lodash/_getAllKeys.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),

/***/ "../../node_modules/lodash/_freeGlobal.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_freeGlobal.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "../../node_modules/lodash/_getAllKeys.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_getAllKeys.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "../../node_modules/lodash/_baseGetAllKeys.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "../../node_modules/lodash/_getSymbols.js"),
    keys = __webpack_require__(/*! ./keys */ "../../node_modules/lodash/keys.js");

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),

/***/ "../../node_modules/lodash/_getAllKeysIn.js":
/*!**************************************************!*\
  !*** ../../node_modules/lodash/_getAllKeysIn.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "../../node_modules/lodash/_baseGetAllKeys.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "../../node_modules/lodash/_getSymbolsIn.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "../../node_modules/lodash/keysIn.js");

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ }),

/***/ "../../node_modules/lodash/_getMapData.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_getMapData.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isKeyable = __webpack_require__(/*! ./_isKeyable */ "../../node_modules/lodash/_isKeyable.js");

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ "../../node_modules/lodash/_getNative.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_getNative.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "../../node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "../../node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "../../node_modules/lodash/_getPrototype.js":
/*!**************************************************!*\
  !*** ../../node_modules/lodash/_getPrototype.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(/*! ./_overArg */ "../../node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),

/***/ "../../node_modules/lodash/_getRawTag.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_getRawTag.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "../../node_modules/lodash/_getSymbols.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_getSymbols.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ "../../node_modules/lodash/_arrayFilter.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "../../node_modules/lodash/stubArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),

/***/ "../../node_modules/lodash/_getSymbolsIn.js":
/*!**************************************************!*\
  !*** ../../node_modules/lodash/_getSymbolsIn.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "../../node_modules/lodash/_arrayPush.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "../../node_modules/lodash/_getPrototype.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "../../node_modules/lodash/_getSymbols.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "../../node_modules/lodash/stubArray.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ }),

/***/ "../../node_modules/lodash/_getTag.js":
/*!********************************************!*\
  !*** ../../node_modules/lodash/_getTag.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DataView = __webpack_require__(/*! ./_DataView */ "../../node_modules/lodash/_DataView.js"),
    Map = __webpack_require__(/*! ./_Map */ "../../node_modules/lodash/_Map.js"),
    Promise = __webpack_require__(/*! ./_Promise */ "../../node_modules/lodash/_Promise.js"),
    Set = __webpack_require__(/*! ./_Set */ "../../node_modules/lodash/_Set.js"),
    WeakMap = __webpack_require__(/*! ./_WeakMap */ "../../node_modules/lodash/_WeakMap.js"),
    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "../../node_modules/lodash/_toSource.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),

/***/ "../../node_modules/lodash/_getValue.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_getValue.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "../../node_modules/lodash/_hashClear.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_hashClear.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../../node_modules/lodash/_nativeCreate.js");

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ "../../node_modules/lodash/_hashDelete.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_hashDelete.js ***!
  \************************************************/
/***/ ((module) => {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ "../../node_modules/lodash/_hashGet.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/_hashGet.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../../node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ "../../node_modules/lodash/_hashHas.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/_hashHas.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../../node_modules/lodash/_nativeCreate.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ "../../node_modules/lodash/_hashSet.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/_hashSet.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../../node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ "../../node_modules/lodash/_initCloneArray.js":
/*!****************************************************!*\
  !*** ../../node_modules/lodash/_initCloneArray.js ***!
  \****************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),

/***/ "../../node_modules/lodash/_initCloneByTag.js":
/*!****************************************************!*\
  !*** ../../node_modules/lodash/_initCloneByTag.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "../../node_modules/lodash/_cloneArrayBuffer.js"),
    cloneDataView = __webpack_require__(/*! ./_cloneDataView */ "../../node_modules/lodash/_cloneDataView.js"),
    cloneRegExp = __webpack_require__(/*! ./_cloneRegExp */ "../../node_modules/lodash/_cloneRegExp.js"),
    cloneSymbol = __webpack_require__(/*! ./_cloneSymbol */ "../../node_modules/lodash/_cloneSymbol.js"),
    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ "../../node_modules/lodash/_cloneTypedArray.js");

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ }),

/***/ "../../node_modules/lodash/_initCloneObject.js":
/*!*****************************************************!*\
  !*** ../../node_modules/lodash/_initCloneObject.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseCreate = __webpack_require__(/*! ./_baseCreate */ "../../node_modules/lodash/_baseCreate.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "../../node_modules/lodash/_getPrototype.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "../../node_modules/lodash/_isPrototype.js");

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),

/***/ "../../node_modules/lodash/_isIndex.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/_isIndex.js ***!
  \*********************************************/
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ "../../node_modules/lodash/_isKeyable.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_isKeyable.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ "../../node_modules/lodash/_isMasked.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_isMasked.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "../../node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "../../node_modules/lodash/_isPrototype.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_isPrototype.js ***!
  \*************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "../../node_modules/lodash/_listCacheClear.js":
/*!****************************************************!*\
  !*** ../../node_modules/lodash/_listCacheClear.js ***!
  \****************************************************/
/***/ ((module) => {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ "../../node_modules/lodash/_listCacheDelete.js":
/*!*****************************************************!*\
  !*** ../../node_modules/lodash/_listCacheDelete.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../../node_modules/lodash/_assocIndexOf.js");

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ "../../node_modules/lodash/_listCacheGet.js":
/*!**************************************************!*\
  !*** ../../node_modules/lodash/_listCacheGet.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../../node_modules/lodash/_assocIndexOf.js");

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ "../../node_modules/lodash/_listCacheHas.js":
/*!**************************************************!*\
  !*** ../../node_modules/lodash/_listCacheHas.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../../node_modules/lodash/_assocIndexOf.js");

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ "../../node_modules/lodash/_listCacheSet.js":
/*!**************************************************!*\
  !*** ../../node_modules/lodash/_listCacheSet.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../../node_modules/lodash/_assocIndexOf.js");

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ "../../node_modules/lodash/_mapCacheClear.js":
/*!***************************************************!*\
  !*** ../../node_modules/lodash/_mapCacheClear.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Hash = __webpack_require__(/*! ./_Hash */ "../../node_modules/lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "../../node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "../../node_modules/lodash/_Map.js");

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ "../../node_modules/lodash/_mapCacheDelete.js":
/*!****************************************************!*\
  !*** ../../node_modules/lodash/_mapCacheDelete.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../../node_modules/lodash/_getMapData.js");

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ "../../node_modules/lodash/_mapCacheGet.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_mapCacheGet.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../../node_modules/lodash/_getMapData.js");

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ "../../node_modules/lodash/_mapCacheHas.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_mapCacheHas.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../../node_modules/lodash/_getMapData.js");

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ "../../node_modules/lodash/_mapCacheSet.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_mapCacheSet.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../../node_modules/lodash/_getMapData.js");

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ "../../node_modules/lodash/_mapToArray.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_mapToArray.js ***!
  \************************************************/
/***/ ((module) => {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),

/***/ "../../node_modules/lodash/_nativeCreate.js":
/*!**************************************************!*\
  !*** ../../node_modules/lodash/_nativeCreate.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ "../../node_modules/lodash/_nativeKeys.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_nativeKeys.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(/*! ./_overArg */ "../../node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "../../node_modules/lodash/_nativeKeysIn.js":
/*!**************************************************!*\
  !*** ../../node_modules/lodash/_nativeKeysIn.js ***!
  \**************************************************/
/***/ ((module) => {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),

/***/ "../../node_modules/lodash/_nodeUtil.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_nodeUtil.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;


/***/ }),

/***/ "../../node_modules/lodash/_objectToString.js":
/*!****************************************************!*\
  !*** ../../node_modules/lodash/_objectToString.js ***!
  \****************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "../../node_modules/lodash/_overArg.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/_overArg.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ "../../node_modules/lodash/_root.js":
/*!******************************************!*\
  !*** ../../node_modules/lodash/_root.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "../../node_modules/lodash/_setCacheAdd.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_setCacheAdd.js ***!
  \*************************************************/
/***/ ((module) => {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),

/***/ "../../node_modules/lodash/_setCacheHas.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_setCacheHas.js ***!
  \*************************************************/
/***/ ((module) => {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),

/***/ "../../node_modules/lodash/_setToArray.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_setToArray.js ***!
  \************************************************/
/***/ ((module) => {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),

/***/ "../../node_modules/lodash/_stackClear.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_stackClear.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(/*! ./_ListCache */ "../../node_modules/lodash/_ListCache.js");

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ "../../node_modules/lodash/_stackDelete.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_stackDelete.js ***!
  \*************************************************/
/***/ ((module) => {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ "../../node_modules/lodash/_stackGet.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_stackGet.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ "../../node_modules/lodash/_stackHas.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_stackHas.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ "../../node_modules/lodash/_stackSet.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_stackSet.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(/*! ./_ListCache */ "../../node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "../../node_modules/lodash/_Map.js"),
    MapCache = __webpack_require__(/*! ./_MapCache */ "../../node_modules/lodash/_MapCache.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ "../../node_modules/lodash/_toSource.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_toSource.js ***!
  \**********************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "../../node_modules/lodash/cloneDeep.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/cloneDeep.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseClone = __webpack_require__(/*! ./_baseClone */ "../../node_modules/lodash/_baseClone.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;


/***/ }),

/***/ "../../node_modules/lodash/eq.js":
/*!***************************************!*\
  !*** ../../node_modules/lodash/eq.js ***!
  \***************************************/
/***/ ((module) => {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ "../../node_modules/lodash/isArguments.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/isArguments.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "../../node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "../../node_modules/lodash/isArray.js":
/*!********************************************!*\
  !*** ../../node_modules/lodash/isArray.js ***!
  \********************************************/
/***/ ((module) => {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "../../node_modules/lodash/isArrayLike.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/isArrayLike.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "../../node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "../../node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "../../node_modules/lodash/isBuffer.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/isBuffer.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "../../node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;


/***/ }),

/***/ "../../node_modules/lodash/isEqual.js":
/*!********************************************!*\
  !*** ../../node_modules/lodash/isEqual.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ "../../node_modules/lodash/_baseIsEqual.js");

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;


/***/ }),

/***/ "../../node_modules/lodash/isFunction.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/isFunction.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "../../node_modules/lodash/isLength.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/isLength.js ***!
  \*********************************************/
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "../../node_modules/lodash/isMap.js":
/*!******************************************!*\
  !*** ../../node_modules/lodash/isMap.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsMap = __webpack_require__(/*! ./_baseIsMap */ "../../node_modules/lodash/_baseIsMap.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "../../node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "../../node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;


/***/ }),

/***/ "../../node_modules/lodash/isObject.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/isObject.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "../../node_modules/lodash/isObjectLike.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/isObjectLike.js ***!
  \*************************************************/
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "../../node_modules/lodash/isSet.js":
/*!******************************************!*\
  !*** ../../node_modules/lodash/isSet.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsSet = __webpack_require__(/*! ./_baseIsSet */ "../../node_modules/lodash/_baseIsSet.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "../../node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "../../node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;


/***/ }),

/***/ "../../node_modules/lodash/isTypedArray.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/isTypedArray.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "../../node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "../../node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "../../node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "../../node_modules/lodash/keys.js":
/*!*****************************************!*\
  !*** ../../node_modules/lodash/keys.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "../../node_modules/lodash/_arrayLikeKeys.js"),
    baseKeys = __webpack_require__(/*! ./_baseKeys */ "../../node_modules/lodash/_baseKeys.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "../../node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),

/***/ "../../node_modules/lodash/keysIn.js":
/*!*******************************************!*\
  !*** ../../node_modules/lodash/keysIn.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "../../node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "../../node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "../../node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),

/***/ "../../node_modules/lodash/stubArray.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/stubArray.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ "../../node_modules/lodash/stubFalse.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/stubFalse.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/index.js":
/*!*********************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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










/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/md5.js":
/*!*******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/md5.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/nil.js":
/*!*******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/nil.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('00000000-0000-0000-0000-000000000000');

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/parse.js":
/*!*********************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/parse.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/regex.js":
/*!*********************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/regex.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/rng.js":
/*!*******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/rng.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/sha1.js":
/*!********************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/sha1.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/stringify.js":
/*!*************************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/v1.js":
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/v1.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/v3.js":
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/v3.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "../../node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ "../../node_modules/uuid/dist/esm-browser/md5.js");


var v3 = (0,_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v3);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/v35.js":
/*!*******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/v35.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DNS: () => (/* binding */ DNS),
/* harmony export */   URL: () => (/* binding */ URL),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/v4.js":
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/v4.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/v5.js":
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/v5.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "../../node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ "../../node_modules/uuid/dist/esm-browser/sha1.js");


var v5 = (0,_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v5);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/validate.js":
/*!************************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/validate.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/version.js":
/*!***********************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/version.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./client/src/content/api.ts":
/*!***********************************!*\
  !*** ./client/src/content/api.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = init;
const core_web_1 = __webpack_require__(/*! @openfin/core-web */ "./node_modules/@openfin/core-web/out/api-client.cjs.js");
const settings_1 = __webpack_require__(/*! ../platform/settings/settings */ "./client/src/platform/settings/settings.ts");
/**
 * Initializes the OpenFin Web Broker connection.
 * @param inherit Should we inherit settings from the host (available in the OpenFin layout system) or use settings? Default is true.
 */
async function init(inherit = true) {
    // Set window.fin to the `fin` object.
    let options;
    if (window.fin === undefined) {
        if (!inherit) {
            const settings = await (0, settings_1.getSettings)();
            if (settings === undefined) {
                console.error("Unable to run the sample as we have been unable to load the web manifest and it's settings from the currently running html page. Please ensure that the web manifest is being served and that it contains the custom_settings section.");
                return;
            }
            options = {
                brokerUrl: settings.platform.interop.brokerUrl,
                interopConfig: {
                    providerId: settings.platform.interop.providerId,
                    currentContextGroup: settings.platform.interop.defaultContextGroup
                }
            };
        }
        // Specify an interopConfig with a specific provider ID and a context group to initialize the `fin.me.interop` client on connection.
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
        console.log("Finished initializing the fin API.");
        // Create and dispatch the finReady event
        const event = new CustomEvent("finReady");
        window.dispatchEvent(event);
    }
    if (window.fdc3 === undefined && window?.fin?.me.interop?.getFDC3Sync !== undefined) {
        window.fdc3 = fin.me.interop.getFDC3Sync("2.0");
        console.log("Finished initializing the fdc3 API.");
        // Create and dispatch the FDC3Ready event
        const event = new CustomEvent("fdc3Ready");
        window.dispatchEvent(event);
    }
}


/***/ }),

/***/ "./client/src/platform/settings/settings.ts":
/*!**************************************************!*\
  !*** ./client/src/platform/settings/settings.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSettings = getSettings;
exports.getDefaultLayout = getDefaultLayout;
exports.clearSettings = clearSettings;
exports.saveSettings = saveSettings;
/**
 * Fetches the settings for the application.
 * @returns The settings for the application.
 */
async function getSettings() {
    const savedSettings = await getSavedSettings();
    if (savedSettings) {
        return savedSettings;
    }
    const settings = await getManifestSettings();
    if (!Array.isArray(settings?.endpointProvider?.endpoints)) {
        console.error("Unable to run the example as settings are required and we fetch them from the link web manifest from the html page that is being served. It should exist in the customSettings section of the web manifest.");
        return;
    }
    const settingsEndpoint = settings.endpointProvider.endpoints.find((endpoint) => endpoint.id === "platform-settings");
    if (settingsEndpoint === undefined ||
        settingsEndpoint.type !== "fetch" ||
        settingsEndpoint.options.method !== "GET" ||
        settingsEndpoint.options.url === undefined) {
        console.error("Unable to run the example as settings are required and we fetch them from the endpoint defined with the id: 'platform-settings' in the manifest. It needs to be of type fetch, performing a GET and it must have a url defined.");
        return;
    }
    const platformSettings = await fetch(settingsEndpoint?.options.url);
    const settingsJson = (await platformSettings.json());
    return settingsJson;
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
/**
 * Clears any saved settings.
 * @returns The saved settings.
 */
async function clearSettings() {
    const settingsId = getSavedSettingsId();
    localStorage.removeItem(settingsId);
}
/**
 * Saves the settings.
 * @param settings The settings to save.
 */
async function saveSettings(settings) {
    const settingsId = getSavedSettingsId();
    localStorage.setItem(settingsId, JSON.stringify(settings));
}
/**
 * Retrieves saved settings from local storage.
 * @returns The saved settings.
 */
async function getSavedSettings() {
    const settingsId = getSavedSettingsId();
    const settings = localStorage.getItem(settingsId);
    if (settings !== null) {
        const resolvedSettings = JSON.parse(settings);
        if (!resolvedSettings?.platform?.cloudInterop?.connectParams?.authenticationType) {
            resolvedSettings.platform.cloudInterop.connectParams.authenticationType = "basic";
        }
        return resolvedSettings;
    }
}
/**
 * Get the Id used for saving and fetching settings from storage.
 * @returns The settings id.
 */
function getSavedSettingsId() {
    const urlParams = new URLSearchParams(window.location.search);
    const env = urlParams.get("env");
    const settingsKey = env ? `${env}-settings` : "settings";
    return settingsKey;
}


/***/ }),

/***/ "./node_modules/@openfin/core-web/out/api-client.cjs.js":
/*!**************************************************************!*\
  !*** ./node_modules/@openfin/core-web/out/api-client.cjs.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var e=__webpack_require__(/*! ./main-239035af.js */ "./node_modules/@openfin/core-web/out/main-239035af.js");__webpack_require__(/*! buffer/ */ "../../node_modules/buffer/index.js"),__webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/esm-browser/index.js"),__webpack_require__(/*! events */ "../../node_modules/events/events.js"),__webpack_require__(/*! lodash/cloneDeep */ "../../node_modules/lodash/cloneDeep.js"),__webpack_require__(/*! lodash/isEqual */ "../../node_modules/lodash/isEqual.js"),exports.connect=e.connect;


/***/ }),

/***/ "./node_modules/@openfin/core-web/out/main-239035af.js":
/*!*************************************************************!*\
  !*** ./node_modules/@openfin/core-web/out/main-239035af.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var e=__webpack_require__(/*! buffer/ */ "../../node_modules/buffer/index.js"),t=__webpack_require__(/*! events */ "../../node_modules/events/events.js"),n=__webpack_require__(/*! lodash/cloneDeep */ "../../node_modules/lodash/cloneDeep.js"),i=__webpack_require__(/*! lodash/isEqual */ "../../node_modules/lodash/isEqual.js"),r=__webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/esm-browser/index.js");const o=(e,t)=>`${t}<${btoa(JSON.stringify(e))}>`,s=(e,t)=>{try{return e.origin===t.origin}catch(e){return!1}},a=(e,t)=>{const n=new MutationObserver((n=>{let i=!1;n.forEach((e=>{"TITLE"!==e.target.parentNode?.nodeName&&"TITLE"!==e.target.nodeName?(e.removedNodes.forEach((e=>{"TITLE"!==e.nodeName&&"TITLE"!==e.parentNode?.nodeName||(i=!0)})),e.addedNodes.forEach((e=>{"TITLE"!==e.nodeName&&"TITLE"!==e.parentNode?.nodeName||(i=!0)}))):i=!0}));const r=e.querySelector("title")?.textContent??"";i&&t(r)}));return n.observe(e,{childList:!0,subtree:!0,characterData:!0}),n};var c,d,h="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:{},l={},u={},p={},w=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n},y=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)};Object.defineProperty(p,"__esModule",{value:!0}),p.Reply=p.EmitterBase=p.Base=void 0;class f{constructor(e){this.isNodeEnvironment=()=>"node"===this.wire.environment.type,this.isOpenFinEnvironment=()=>"openfin"===this.wire.environment.type,this.isBrowserEnvironment=()=>"other"===this.wire.environment.type,this.wire=e}get fin(){return this.wire.getFin()}get me(){return this.wire.me}}p.Base=f;p.EmitterBase=class extends f{constructor(e,t,...n){super(e),this.topic=t,c.set(this,void 0),d.set(this,void 0),this.eventNames=()=>this.hasEmitter()?this.getOrCreateEmitter().eventNames():[],this.emit=(e,t,...n)=>!!this.hasEmitter()&&this.getOrCreateEmitter().emit(e,t,...n),this.hasEmitter=()=>this.wire.eventAggregator.has(y(this,c,"f")),this.getOrCreateEmitter=()=>this.wire.eventAggregator.getOrCreate(y(this,c,"f")),this.listeners=e=>this.hasEmitter()?this.getOrCreateEmitter().listeners(e):[],this.listenerCount=e=>this.hasEmitter()?this.getOrCreateEmitter().listenerCount(e):0,this.registerEventListener=async(e,t={},n,i)=>{const r={...this.identity,timestamp:t.timestamp||Date.now(),topic:this.topic,type:e},o=this.getOrCreateEmitter();n(o);try{await this.wire.sendAction("subscribe-to-desktop-event",r)}catch(e){throw i(o),this.deleteEmitterIfNothingRegistered(o),e}},this.deregisterEventListener=async(e,t={})=>{if(this.hasEmitter()){const n={...this.identity,timestamp:t.timestamp||Date.now(),topic:this.topic,type:e};return await this.wire.sendAction("unsubscribe-to-desktop-event",n).catch((()=>null)),this.getOrCreateEmitter()}return Promise.resolve()},w(this,c,[t,...n],"f"),w(this,d,new WeakMap,"f")}async on(e,t,n){return await this.registerEventListener(e,n,(n=>{n.on(e,t)}),(n=>{n.removeListener(e,t)})),this}async addListener(e,t,n){return this.on(e,t,n)}async once(e,t,n){const i=()=>this.deregisterEventListener(e);return y(this,d,"f").set(t,i),await this.registerEventListener(e,n,(n=>{n.once(e,i),n.once(e,t)}),(n=>{n.removeListener(e,i),n.removeListener(e,t)})),this}async prependListener(e,t,n){return await this.registerEventListener(e,n,(n=>{n.prependListener(e,t)}),(n=>{n.removeListener(e,t)})),this}async prependOnceListener(e,t,n){const i=()=>this.deregisterEventListener(e);return y(this,d,"f").set(t,i),await this.registerEventListener(e,n,(n=>{n.prependOnceListener(e,t),n.once(e,i)}),(n=>{n.removeListener(e,t),n.removeListener(e,i)})),this}async removeListener(e,t,n){const i=await this.deregisterEventListener(e,n);if(i){i.removeListener(e,t);const n=y(this,d,"f").get(t);n&&i.removeListener(e,n),this.deleteEmitterIfNothingRegistered(i)}return this}async deregisterAllListeners(e){const t={...this.identity,type:e,topic:this.topic};if(this.hasEmitter()){const e=this.getOrCreateEmitter(),n=e.listenerCount(t.type),i=[];for(let e=0;e<n;e++)i.push(this.wire.sendAction("unsubscribe-to-desktop-event",t).catch((()=>null)));return await Promise.all(i),e}}async removeAllListeners(e){const t=async e=>{const t=await this.deregisterAllListeners(e);t&&(t.removeAllListeners(e),this.deleteEmitterIfNothingRegistered(t))};if(e)await t(e);else if(this.hasEmitter()){const e=this.getOrCreateEmitter().eventNames();await Promise.all(e.map(t))}return this}deleteEmitterIfNothingRegistered(e){0===e.eventNames().length&&this.wire.eventAggregator.delete(y(this,c,"f"))}},c=new WeakMap,d=new WeakMap;p.Reply=class{};var g={};Object.defineProperty(g,"__esModule",{value:!0});var m=g.RuntimeError=g.NotSupportedError=g.NotImplementedError=g.NoAckError=g.DuplicateCorrelationError=g.UnexpectedActionError=g.DisconnectedError=void 0;class v extends Error{constructor(e){super(`Expected websocket state OPEN but found ${e}`),this.readyState=e}}g.DisconnectedError=v;class C extends Error{}g.UnexpectedActionError=C;class b extends Error{}g.DuplicateCorrelationError=b;class I extends Error{}g.NoAckError=I;class E extends Error{}g.NotImplementedError=E;class x extends Error{}g.NotSupportedError=x;class A extends Error{constructor(e){const{message:t,name:n,stack:i,...r}=e;super(t),"cause"in e&&e.cause&&(this.cause=new A(e.cause)),this.name=n||"Error",this.stack=i??this.toString(),Object.keys(r).filter((e=>"cause"!==e)).forEach((e=>{this[e]=r[e]}))}}class P extends Error{static trimEndCallSites(e,t){const n=Error.stackTraceLimit,i=Error.prepareStackTrace;Error.prepareStackTrace=(e,t)=>t;const r="string"==typeof e.stack,o=(r?e.stack?.split("\n"):e.stack)??[];if(Error.prepareStackTrace=i,Error.stackTraceLimit=n,o.length){const n=[];for(const e of r?o:o.slice(1))if(n.push(e),t.test(e.toString()))break;e.stack=r?n.join("\n"):P.prepareStackTrace(e,n)}}static getCallSite(e=0){const t=Error.stackTraceLimit,n=e+1;Error.stackTraceLimit=t+n;const i=Error.prepareStackTrace;Error.prepareStackTrace=(e,t)=>t;const r=(new Error).stack?.slice(n)??[];return Error.prepareStackTrace=i,Error.stackTraceLimit=t,r}static prepareStackTrace(e,t){if("function"==typeof Error.prepareStackTrace)return Error.prepareStackTrace(e,t);let n=`${e.name||"Error"}: ${e.message||""}\n`;return n+=t.map((e=>`    at ${e}`)).join("\n"),n}constructor(e,t){const{reason:n,error:i}=e;super(n),this.name=this.constructor.name,i?.stack&&(this.cause=new A(i)),t&&(this.stack=P.prepareStackTrace(this,t))}}m=g.RuntimeError=P;var M={},_={},O={};Object.defineProperty(O,"__esModule",{value:!0}),O.validateIdentity=void 0,O.validateIdentity=function(e){let t;return"object"==typeof e&&"string"==typeof e.uuid||(t="Not a valid identity object"),t};var S={},R={},F={},j={},L={},k={},T={};Object.defineProperty(T,"__esModule",{value:!0}),T.handleDeprecatedWarnings=void 0;var $;T.handleDeprecatedWarnings=e=>{(e.contentNavigation?.whitelist||e.contentNavigation?.blacklist||e.contentRedirect?.whitelist||e.contentRedirect?.blacklist)&&console.warn("The properties 'whitelist' and 'blacklist' have been marked as deprecated and will be removed in a future version. Please use 'allowlist' and 'denylist'.")};var B={},G={};Object.defineProperty(G,"__esModule",{value:!0}),G.AsyncRetryableLazy=W=G.Lazy=void 0;var W=G.Lazy=class{constructor(e){this.producerFn=e}getValue(){return this.value||(this.value=this.producerFn()),this.value}};G.AsyncRetryableLazy=class{constructor(e){this.producerFn=e}async getValue(){return this.promise||(this.promise=this.producerFn().catch((e=>{throw delete this.promise,e}))),this.promise}};var N={};Object.defineProperty(N,"__esModule",{value:!0}),N.WebContents=void 0;const D=p;class H extends D.EmitterBase{constructor(e,t,n){super(e,n,t.uuid,t.name),this.identity=t,this.entityType=n}capturePage(e){return this.wire.sendAction("capture-page",{options:e,...this.identity}).then((({payload:e})=>e.data))}executeJavaScript(e){return this.wire.sendAction("execute-javascript-in-window",{...this.identity,code:e}).then((({payload:e})=>e.data))}getZoomLevel(){return this.wire.sendAction("get-zoom-level",this.identity).then((({payload:e})=>e.data))}setZoomLevel(e){return this.wire.sendAction("set-zoom-level",{...this.identity,level:e}).then((()=>{}))}navigate(e){return this.wire.sendAction("navigate-window",{...this.identity,url:e}).then((()=>{}))}navigateBack(){return this.wire.sendAction("navigate-window-back",{...this.identity}).then((()=>{}))}async navigateForward(){await this.wire.sendAction("navigate-window-forward",{...this.identity})}stopNavigation(){return this.wire.sendAction("stop-window-navigation",{...this.identity}).then((()=>{}))}reload(e=!1){return this.wire.sendAction("reload-window",{ignoreCache:e,...this.identity}).then((()=>{}))}print(e={}){return this.wire.sendAction("print",{...this.identity,options:e}).then((()=>{}))}findInPage(e,t){return this.wire.sendAction("find-in-page",{...this.identity,searchTerm:e,options:t}).then((({payload:e})=>e.data))}stopFindInPage(e){return this.wire.sendAction("stop-find-in-page",{...this.identity,action:e}).then((()=>{}))}getPrinters(){return this.wire.sendAction("get-printers",{...this.identity}).then((({payload:e})=>e.data))}async focus({emitSynthFocused:e}={emitSynthFocused:!0}){await this.wire.sendAction("focus-window",{emitSynthFocused:e,...this.identity})}async showDeveloperTools(){await this.wire.sendAction("show-developer-tools",this.identity)}async getProcessInfo(){const{payload:{data:e}}=await this.wire.sendAction("get-process-info",this.identity);return e}async getSharedWorkers(){return this.wire.sendAction("get-shared-workers",this.identity).then((({payload:e})=>e.data))}async inspectSharedWorker(){await this.wire.sendAction("inspect-shared-worker",{...this.identity})}async inspectSharedWorkerById(e){await this.wire.sendAction("inspect-shared-worker-by-id",{...this.identity,workerId:e})}async inspectServiceWorker(){await this.wire.sendAction("inspect-service-worker",{...this.identity})}async showPopupWindow(e){if(this.wire.sendAction(`${this.entityType}-show-popup-window`,this.identity).catch((()=>{})),e?.onPopupReady){const t=async({popupName:t})=>{try{const n=this.fin.Window.wrapSync({uuid:this.fin.me.uuid,name:t});await e.onPopupReady(n)}catch(e){throw new Error(`Something went wrong during onPopupReady execution: ${e}`)}};await this.once("popup-ready",t)}const{payload:t}=await this.wire.sendAction("try-create-popup-window",{options:{...e,hasResultCallback:!!e?.onPopupResult,hasReadyCallback:!!e?.onPopupReady},...this.identity}),{data:{willOpen:n,options:i}}=t;n&&await this.fin.Window.create(i.initialOptions);if(e?.onPopupResult){const t=async t=>{await e.onPopupResult((e=>{const{name:t,uuid:n,result:i,data:r}=e,o={identity:{name:t,uuid:n},result:i};return r&&(o.data=r),o})(t))},n=async()=>{await this.removeListener("popup-result",t)};await this.on("popup-result",t),await this.once("popup-teardown",n)}const{payload:r}=await this.wire.sendAction("show-popup-window",{options:i,...this.identity});return r.data}async getScreenCapturePermission(){return(await this.wire.sendAction("get-screen-capture-permissions",this.identity)).payload.data}}var V,U,z,K,J;function q(){return U||(U=1,function(e){var t=h&&h.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,r)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=h&&h.__exportStar||function(e,n){for(var i in e)"default"===i||Object.prototype.hasOwnProperty.call(n,i)||t(n,e,i)};Object.defineProperty(e,"__esModule",{value:!0}),n(function(){if($)return k;$=1,Object.defineProperty(k,"__esModule",{value:!0}),k.ViewModule=void 0;const e=p,t=O,n=q(),i=T;class r extends e.Base{async create(e){const{uuid:t}=this.wire.me;if(!e.name||"string"!=typeof e.name)throw new Error("Please provide a name property as a string in order to create a View.");return(0,i.handleDeprecatedWarnings)(e),this.wire.environment.childViews?await this.wire.environment.createChildContent({entityType:"view",options:{...e,uuid:t}}):await this.wire.sendAction("create-view",{...e,uuid:t}),this.wrapSync({uuid:t,name:e.name})}async wrap(e){this.wire.sendAction("view-wrap").catch((e=>{}));const i=(0,t.validateIdentity)(e);if(i)throw new Error(i);return new n.View(this.wire,e)}wrapSync(e){this.wire.sendAction("view-wrap-sync").catch((e=>{}));const i=(0,t.validateIdentity)(e);if(i)throw new Error(i);return new n.View(this.wire,e)}getCurrent(){if(this.wire.sendAction("view-get-current").catch((e=>{})),!this.wire.me.isView)throw new Error("You are not in a View context");const{uuid:e,name:t}=this.wire.me;return this.wrap({uuid:e,name:t})}getCurrentSync(){if(this.wire.sendAction("view-get-current-sync").catch((e=>{})),!this.wire.me.isView)throw new Error("You are not in a View context");const{uuid:e,name:t}=this.wire.me;return this.wrapSync({uuid:e,name:t})}}return k.ViewModule=r,k}(),e),n(function(){if(V)return B;var e;V=1,Object.defineProperty(B,"__esModule",{value:!0}),B.View=void 0;const t=g,n=G,i=N,r=ie();class o extends i.WebContents{constructor(i,o){super(i,o,"view"),this.identity=o,e.set(this,new n.Lazy((()=>this.fin.Platform.wrapSync(this.identity).getClient()))),this.attach=async e=>{await this.wire.sendAction("attach-view",{target:e,...this.identity})},this.destroy=async()=>{await this.wire.sendAction("destroy-view",{...this.identity})},this.show=async()=>{await this.wire.sendAction("show-view",{...this.identity})},this.showAt=async(e,t={})=>{await this.wire.sendAction("show-view-at",{bounds:e,...this.identity,options:t})},this.bringToFront=async()=>{await this.wire.sendAction("bring-view-to-front",{...this.identity})},this.hide=async()=>{await this.wire.sendAction("hide-view",{...this.identity})},this.setBounds=async e=>{await this.wire.sendAction("set-view-bounds",{bounds:e,...this.identity})},this.getBounds=async()=>(await this.wire.sendAction("get-view-bounds",{...this.identity})).payload.data,this.getInfo=async()=>(await this.wire.sendAction("get-view-info",{...this.identity})).payload.data,this.getParentLayout=async()=>(this.wire.sendAction("view-get-parent-layout").catch((()=>{})),this.fin.Platform.Layout.getLayoutByViewIdentity(this.identity)),this.getOptions=async()=>this.wire.sendAction("get-view-options",{...this.identity}).then((({payload:e})=>e.data)),this.updateOptions=async e=>this.wire.sendAction("update-view-options",{options:e,...this.identity}).then((()=>{})),this.getCurrentWindow=async()=>{const{payload:{data:e}}=await this.wire.sendAction("get-view-window",{...this.identity});return new r._Window(this.wire,e)},this.getCurrentStack=async()=>{this.wire.sendAction("view-get-current-stack").catch((()=>{}));try{return(await this.getParentLayout()).getStackByViewIdentity(this.identity)}catch(e){throw new t.RuntimeError({reason:"This view does not belong to a stack.",error:e})}},this.triggerBeforeUnload=async()=>(await this.wire.sendAction("trigger-before-unload",{...this.identity})).payload.data,this.bindToElement=async e=>{if(!e)throw new Error("Element not found.");return this.wire.environment.observeBounds(e,(async e=>this.setBounds(e)))}}async focus({emitSynthFocused:e}={emitSynthFocused:!0}){const t=await this.getCurrentWindow();await t.focusedWebViewWasChanged(),await super.focus({emitSynthFocused:e})}}return B.View=o,e=new WeakMap,B}(),e)}(L)),L}function Y(){if(z)return j;z=1,Object.defineProperty(j,"__esModule",{value:!0}),j.Application=void 0;const e=p,t=ie(),n=q();class i extends e.EmitterBase{constructor(e,n){super(e,"application",n.uuid),this.identity=n,this.window=new t._Window(this.wire,{uuid:this.identity.uuid,name:this.identity.uuid})}windowListFromIdentityList(e){const n=[];return e.forEach((e=>{n.push(new t._Window(this.wire,{uuid:e.uuid,name:e.name}))})),n}isRunning(){return this.wire.sendAction("is-application-running",this.identity).then((({payload:e})=>e.data))}async quit(e=!1){try{await this._close(e),await this.wire.sendAction("destroy-application",{force:e,...this.identity})}catch(e){if(!["Remote connection has closed","Could not locate the requested application"].some((t=>e.message.includes(t))))throw e}}async _close(e=!1){try{await this.wire.sendAction("close-application",{force:e,...this.identity})}catch(e){if(!e.message.includes("Remote connection has closed"))throw e}}close(e=!1){return console.warn("Deprecation Warning: Application.close is deprecated Please use Application.quit"),this.wire.sendAction("application-close",this.identity).catch((e=>{})),this._close(e)}getChildWindows(){return this.wire.sendAction("get-child-windows",this.identity).then((({payload:e})=>{const t=[];return e.data.forEach((e=>{t.push({uuid:this.identity.uuid,name:e})})),this.windowListFromIdentityList(t)}))}getManifest(){return this.wire.sendAction("get-application-manifest",this.identity).then((({payload:e})=>e.data))}getParentUuid(){return this.wire.sendAction("get-parent-application",this.identity).then((({payload:e})=>e.data))}getShortcuts(){return this.wire.sendAction("get-shortcuts",this.identity).then((({payload:e})=>e.data))}async getViews(){const{payload:e}=await this.wire.sendAction("application-get-views",this.identity);return e.data.map((e=>new n.View(this.wire,e)))}getZoomLevel(){return this.wire.sendAction("get-application-zoom-level",this.identity).then((({payload:e})=>e.data))}getWindow(){return this.wire.sendAction("application-get-window",this.identity).catch((e=>{})),Promise.resolve(this.window)}registerUser(e,t){return this.wire.sendAction("register-user",{userName:e,appName:t,...this.identity}).then((()=>{}))}removeTrayIcon(){return this.wire.sendAction("remove-tray-icon",this.identity).then((()=>{}))}restart(){return this.wire.sendAction("restart-application",this.identity).then((()=>{}))}run(){return console.warn("Deprecation Warning: Application.run is deprecated Please use fin.Application.start"),this.wire.sendAction("application-run",this.identity).catch((e=>{})),this._run()}_run(e={}){return this.wire.sendAction("run-application",{manifestUrl:this._manifestUrl,opts:e,...this.identity}).then((()=>{}))}scheduleRestart(){return this.wire.sendAction("relaunch-on-close",this.identity).then((()=>{}))}async sendApplicationLog(){const{payload:e}=await this.wire.sendAction("send-application-log",this.identity);return e.data}async setJumpList(e){await this.wire.sendAction("set-jump-list",{config:e,...this.identity})}setTrayIcon(e){return this.wire.sendAction("set-tray-icon",{enabledIcon:e,...this.identity}).then((()=>{}))}async setTrayIconToolTip(e){await this.wire.sendAction("set-tray-icon-tooltip",{...this.identity,toolTip:e})}setShortcuts(e){return this.wire.sendAction("set-shortcuts",{data:e,...this.identity}).then((()=>{}))}async setShortcutQueryParams(e){await this.wire.sendAction("set-shortcut-query-args",{data:e,...this.identity})}setZoomLevel(e){return this.wire.sendAction("set-application-zoom-level",{level:e,...this.identity}).then((()=>{}))}async setAppLogUsername(e){await this.wire.sendAction("set-app-log-username",{data:e,...this.identity})}getTrayIconInfo(){return this.wire.sendAction("get-tray-icon-info",this.identity).then((({payload:e})=>e.data))}hasTrayIcon(){return this.wire.sendAction("has-tray-icon",this.identity).then((({payload:e})=>e.data))}terminate(){return this.wire.sendAction("terminate-application",this.identity).then((()=>{}))}wait(){return this.wire.sendAction("wait-for-hung-application",this.identity).then((()=>{}))}getInfo(){return this.wire.sendAction("get-info",this.identity).then((({payload:e})=>e.data))}async getProcessInfo(){const{payload:{data:e}}=await this.wire.sendAction("application-get-process-info",this.identity);return e}async setFileDownloadLocation(e){const{name:t}=this.wire.me,n={uuid:this.identity.uuid,name:t};await this.wire.sendAction("set-file-download-location",{...n,downloadLocation:e})}async getFileDownloadLocation(){const{payload:{data:e}}=await this.wire.sendAction("get-file-download-location",this.identity);return e}async showTrayIconPopupMenu(e){const{name:t}=this.wire.me,n={uuid:this.identity.uuid,name:t},{payload:i}=await this.wire.sendAction("show-tray-icon-popup-menu",{...n,options:e});return i.data}async closeTrayIconPopupMenu(){const{name:e}=this.wire.me,t={uuid:this.identity.uuid,name:e};await this.wire.sendAction("close-tray-icon-popup-menu",{...t})}}return j.Application=i,j}function Z(){return J||(J=1,function(e){var t=h&&h.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,r)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=h&&h.__exportStar||function(e,n){for(var i in e)"default"===i||Object.prototype.hasOwnProperty.call(n,i)||t(n,e,i)};Object.defineProperty(e,"__esModule",{value:!0}),n(function(){if(K)return F;K=1,Object.defineProperty(F,"__esModule",{value:!0}),F.ApplicationModule=void 0;const e=p,t=O,n=Y();class i extends e.Base{async wrap(e){this.wire.sendAction("wrap-application").catch((e=>{}));const i=(0,t.validateIdentity)(e);if(i)throw new Error(i);return new n.Application(this.wire,e)}wrapSync(e){this.wire.sendAction("wrap-application-sync").catch((e=>{}));const i=(0,t.validateIdentity)(e);if(i)throw new Error(i);return new n.Application(this.wire,e)}async _create(e){return void 0===e.waitForPageLoad&&(e.waitForPageLoad=!1),void 0===e.autoShow&&void 0===e.isPlatformController&&(e.autoShow=!0),await this.wire.sendAction("create-application",e),this.wrap({uuid:e.uuid})}create(e){return console.warn("Deprecation Warning: fin.Application.create is deprecated. Please use fin.Application.start"),this.wire.sendAction("application-create").catch((e=>{})),this._create(e)}async start(e){this.wire.sendAction("start-application").catch((e=>{}));const t=await this._create(e);return await this.wire.sendAction("run-application",{uuid:e.uuid}),t}async startManyManifests(e,t){return this.wire.sendAction("run-applications",{applications:e,opts:t}).then((()=>{}))}getCurrent(){return this.wire.sendAction("get-current-application").catch((e=>{})),this.wrap({uuid:this.wire.me.uuid})}getCurrentSync(){return this.wire.sendAction("get-current-application-sync").catch((e=>{})),this.wrapSync({uuid:this.wire.me.uuid})}async startFromManifest(e,t){this.wire.sendAction("application-start-from-manifest").catch((e=>{}));const n=await this._createFromManifest(e);return await n._run(t),n}createFromManifest(e){return console.warn("Deprecation Warning: fin.Application.createFromManifest is deprecated. Please use fin.Application.startFromManifest"),this.wire.sendAction("application-create-from-manifest").catch((e=>{})),this._createFromManifest(e)}_createFromManifest(e){return this.wire.sendAction("get-application-manifest",{manifestUrl:e}).then((({payload:e})=>{const t=e.data.platform?e.data.platform.uuid:e.data.startup_app.uuid;return this.wrap({uuid:t})})).then((t=>(t._manifestUrl=e,t)))}}return F.ApplicationModule=i,F}(),e),n(Y(),e)}(R)),R}N.WebContents=H;var Q={};Object.defineProperty(Q,"__esModule",{value:!0}),Q.promisifySubscription=void 0;var X,ee,te;function ne(){if(X)return S;X=1,Object.defineProperty(S,"__esModule",{value:!0}),S._Window=void 0;const e=Z(),t=N,n=q(),i=T,r=Q;class o extends t.WebContents{constructor(e,t){super(e,t,"window")}async createWindow(e){this.wire.sendAction("window-create-window").catch((e=>{}));const t=await(0,r.promisifySubscription)(this,"fire-constructor-callback");void 0===e.waitForPageLoad&&(e.waitForPageLoad=!1),void 0===e.autoShow&&(e.autoShow=!0),(0,i.handleDeprecatedWarnings)(e);const n=this.wire.environment.createChildContent({entityType:"window",options:e}),[o]=await Promise.all([t.getValue(),n]);let s;const{success:a}=o,c=o.data,{message:d}=c;s=a?{httpResponseCode:c.httpResponseCode,apiInjected:c.apiInjected}:{message:c.message,networkErrorCode:c.networkErrorCode,stack:c.stack};const h={message:d,cbPayload:s,success:a};try{this.getWebWindow().fin.__internal_.openerSuccessCBCalled()}catch(e){}return h.success?this:Promise.reject(h)}getAllFrames(){return this.wire.sendAction("get-all-frames",this.identity).then((({payload:e})=>e.data))}activateAndFocus(e){return this.wire.sendAction("activate-window-and-focus",{winIdentity:this.identity,focusIdentity:e}).then((({payload:e})=>e.data))}getBounds(e){return this.wire.sendAction("get-window-bounds",{...this.identity,options:e}).then((({payload:e})=>e.data))}center(){return this.wire.sendAction("center-window",this.identity).then((()=>{}))}blur(){return this.wire.sendAction("blur-window",this.identity).then((()=>{}))}bringToFront(){return this.wire.sendAction("bring-window-to-front",this.identity).then((()=>{}))}animate(e,t){return this.wire.sendAction("animate-window",{transitions:e,options:t,...this.identity}).then((()=>{}))}hide(){return this.wire.sendAction("hide-window",this.identity).then((()=>{}))}close(e=!1){return this.wire.sendAction("close-window",{force:e,...this.identity}).then((()=>{Object.setPrototypeOf(this,null)}))}focusedWebViewWasChanged(){return this.wire.sendAction("focused-webview-changed",this.identity).then((()=>{}))}getNativeId(){return this.wire.sendAction("get-window-native-id",this.identity).then((({payload:e})=>e.data))}async getCurrentViews(){const{payload:e}=await this.wire.sendAction("window-get-views",this.identity);return e.data.map((e=>new n.View(this.wire,e)))}disableFrame(){return console.warn("Function is deprecated; use disableUserMovement instead."),this.wire.sendAction("disable-window-frame",this.identity).then((()=>{}))}disableUserMovement(){return this.wire.sendAction("disable-window-frame",this.identity).then((()=>{}))}enableFrame(){return console.warn("Function is deprecated; use enableUserMovement instead."),this.wire.sendAction("enable-window-frame",this.identity).then((()=>{}))}enableUserMovement(){return this.wire.sendAction("enable-window-frame",this.identity).then((()=>{}))}flash(){return this.wire.sendAction("flash-window",this.identity).then((()=>{}))}stopFlashing(){return this.wire.sendAction("stop-flash-window",this.identity).then((()=>{}))}getInfo(){return this.wire.sendAction("get-window-info",this.identity).then((({payload:e})=>e.data))}async getLayout(e){this.wire.sendAction("window-get-layout").catch((e=>{}));const t=await this.getOptions();if(!t.layout&&!t.layoutSnapshot)throw new Error("Window does not have a Layout");return this.fin.Platform.Layout.wrap(e??this.identity)}getOptions(){return this.wire.sendAction("get-window-options",this.identity).then((({payload:e})=>e.data))}getParentApplication(){return this.wire.sendAction("window-get-parent-application").catch((e=>{})),Promise.resolve(new e.Application(this.wire,this.identity))}getParentWindow(){return this.wire.sendAction("window-get-parent-window").catch((e=>{})),Promise.resolve(new e.Application(this.wire,this.identity)).then((e=>e.getWindow()))}async getSnapshot(e){const t={area:e,...this.identity};console.warn("Window.getSnapshot has been deprecated, please use Window.capturePage");return(await this.wire.sendAction("get-window-snapshot",t)).payload.data}getState(){return this.wire.sendAction("get-window-state",this.identity).then((({payload:e})=>e.data))}getWebWindow(){return this.wire.sendAction("window-get-web-window").catch((e=>{})),this.wire.environment.getWebWindow(this.identity)}isMainWindow(){return this.wire.sendAction("window-is-main-window").catch((e=>{})),this.me.uuid===this.me.name}isShowing(){return this.wire.sendAction("is-window-showing",this.identity).then((({payload:e})=>e.data))}maximize(){return this.wire.sendAction("maximize-window",this.identity).then((()=>{}))}minimize(){return this.wire.sendAction("minimize-window",this.identity).then((()=>{}))}moveBy(e,t,n){return this.wire.sendAction("move-window-by",{deltaLeft:e,deltaTop:t,positioningOptions:n,...this.identity}).then((()=>{}))}moveTo(e,t,n){return this.wire.sendAction("move-window",{left:e,top:t,positioningOptions:n,...this.identity}).then((()=>{}))}resizeBy(e,t,n,i){return this.wire.sendAction("resize-window-by",{deltaWidth:Math.floor(e),deltaHeight:Math.floor(t),anchor:n,positioningOptions:i,...this.identity}).then((()=>{}))}resizeTo(e,t,n,i){return this.wire.sendAction("resize-window",{width:Math.floor(e),height:Math.floor(t),anchor:n,positioningOptions:i,...this.identity}).then((()=>{}))}restore(){return this.wire.sendAction("restore-window",this.identity).then((()=>{}))}setAsForeground(){return this.wire.sendAction("set-foreground-window",this.identity).then((()=>{}))}setBounds(e,t){return this.wire.sendAction("set-window-bounds",{...e,...this.identity,positioningOptions:t}).then((()=>{}))}show(e=!1){return this.wire.sendAction("show-window",{force:e,...this.identity}).then((()=>{}))}showAt(e,t,n=!1){return this.wire.sendAction("show-at-window",{force:n,left:Math.floor(e),top:Math.floor(t),...this.identity}).then((()=>{}))}updateOptions(e){return"frame"in e&&console.warn("Deprecation Warning: Starting with version 45 it will not be possible to change the frame value after window has been created."),this.wire.sendAction("update-window-options",{options:e,...this.identity}).then((()=>{}))}authenticate(e,t){return this.wire.sendAction("window-authenticate",{userName:e,password:t,...this.identity}).then((()=>{}))}async showPopupMenu(e){const{payload:t}=await this.wire.sendAction("show-popup-menu",{options:e,...this.identity});return t.data}async closePopupMenu(){return this.wire.sendAction("close-popup-menu",{...this.identity}).then((()=>{}))}async dispatchPopupResult(e){this.wire.sendAction("window-dispatch-popup-result").catch((e=>{})),await this.wire.sendAction("dispatch-popup-result",{data:e,...this.identity})}async print(e={content:"self"}){switch(e.content){case void 0:case"self":return super.print(e);case"screenshot":return this.wire.sendAction("print-screenshot",this.identity).then((()=>{}));case"views":return this.wire.sendAction("print-views",{...this.identity,options:e}).then((()=>{}));default:return}}async showDownloadBubble(e){return this.wire.sendAction("show-download-bubble",{...this.identity,anchor:e}).then((()=>{}))}async updateDownloadBubbleAnchor(e){return this.wire.sendAction("update-download-bubble-anchor",{...this.identity,anchor:e}).then((()=>{}))}}return S._Window=o,S}function ie(){return te||(te=1,function(e){var t=h&&h.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,r)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=h&&h.__exportStar||function(e,n){for(var i in e)"default"===i||Object.prototype.hasOwnProperty.call(n,i)||t(n,e,i)};Object.defineProperty(e,"__esModule",{value:!0}),n(function(){if(ee)return _;ee=1,Object.defineProperty(_,"__esModule",{value:!0}),_._WindowModule=void 0;const e=p,t=O,n=ne();class i extends e.Base{async wrap(e){this.wire.sendAction("window-wrap").catch((e=>{}));const i=(0,t.validateIdentity)(e);if(i)throw new Error(i);return new n._Window(this.wire,e)}wrapSync(e){this.wire.sendAction("window-wrap-sync").catch((e=>{}));const i=(0,t.validateIdentity)(e);if(i)throw new Error(i);return new n._Window(this.wire,e)}create(e){return this.wire.sendAction("create-window").catch((e=>{})),new n._Window(this.wire,{uuid:this.me.uuid,name:e.name}).createWindow(e)}getCurrent(){if(this.wire.sendAction("get-current-window").catch((e=>{})),!this.wire.me.isWindow)throw new Error("You are not in a Window context");const{uuid:e,name:t}=this.wire.me;return this.wrap({uuid:e,name:t})}getCurrentSync(){if(this.wire.sendAction("get-current-window-sync").catch((e=>{})),!this.wire.me.isWindow)throw new Error("You are not in a Window context");const{uuid:e,name:t}=this.wire.me;return this.wrapSync({uuid:e,name:t})}}return _._WindowModule=i,_}(),e),n(ne(),e)}(M)),M}Q.promisifySubscription=async(e,t,n=(()=>!0),i)=>{let r,o,s;const a=new Promise(((e,t)=>{r=e,o=t})),c=e=>{n(e)&&(clearTimeout(s),r(e))};return await e.on(t,c),i&&(s=setTimeout((()=>o(new Error("event timed out"))),i)),a.finally((()=>{e.removeListener(t,c).catch((()=>null))})),{getValue:()=>a}},Object.defineProperty(u,"__esModule",{value:!0}),u.System=void 0;const re=p,oe=g,se=ie(),ae=t;class ce extends re.EmitterBase{constructor(e){super(e,"system")}sendExternalProcessRequest(e,t){return new Promise(((n,i)=>{const r="external-process-exited";let o,s,a,c;"function"==typeof t.listener&&(a=e=>{const n=e||{};s={topic:"exited",uuid:n.processUuid||"",exitCode:n.exitCode||0},o===e.processUuid&&(t.listener(s),c.removeListener(r,a))},this.wire.me.name||(this.wire.me.name=this.wire.me.uuid),c=new se._Window(this.wire,this.wire.me),c.on(r,a)),this.wire.sendAction(e,t).then((({payload:e})=>{o=e.data.uuid,n(e.data),s&&o===s.uuid&&(t.listener(s),c.removeListener(r,a))})).catch((e=>{c&&c.removeListener(r,a),i(e)}))}))}getVersion(){return this.wire.sendAction("get-version").then((({payload:e})=>e.data))}clearCache(e){return this.wire.sendAction("clear-cache",e).then((()=>{}))}deleteCacheOnExit(){return this.wire.sendAction("delete-cache-request").then((()=>{}))}exit(){return this.wire.sendAction("exit-desktop").then((()=>{}))}async fetchManifest(e){const{payload:{data:t}}=await this.wire.sendAction("fetch-manifest",{manifestUrl:e});return t}flushCookieStore(){return this.wire.sendAction("flush-cookie-store").then((()=>{}))}getAllWindows(){return this.wire.sendAction("get-all-windows").then((({payload:e})=>e.data))}getAllApplications(){return this.wire.sendAction("get-all-applications").then((({payload:e})=>e.data))}getCommandLineArguments(){return this.wire.sendAction("get-command-line-arguments").then((({payload:e})=>e.data))}async getCrashReporterState(){const{payload:{data:{diagnosticMode:e,isRunning:t}}}=await this.wire.sendAction("get-crash-reporter-state");return console.warn("diagnosticMode property is deprecated. It will be removed in a future version"),{diagnosticMode:e,diagnosticsMode:e,isRunning:t}}async startCrashReporter(e){const t=e,n={...t,diagnosticMode:t.diagnosticsMode||t.diagnosticMode},{payload:{data:{diagnosticMode:i,isRunning:r}}}=await this.wire.sendAction("start-crash-reporter",n);return{diagnosticMode:i,diagnosticsMode:i,isRunning:r}}getUniqueUserId(){return this.wire.sendAction("get-unique-user-id").then((({payload:e})=>e.data))}getEntityInfo(e,t){return this.wire.sendAction("get-entity-info",{uuid:e,name:t}).then((({payload:e})=>e.data))}getEnvironmentVariable(e){return this.wire.sendAction("get-environment-variable",{environmentVariables:e}).then((({payload:e})=>e.data))}getFocusedWindow(){return this.wire.sendAction("get-focused-window").then((({payload:e})=>e.data))}getFocusedContent(){return this.wire.sendAction("get-focused-content").then((({payload:e})=>e.data))}async isAppCertified(e){const{payload:{data:{certifiedInfo:t}}}=await this.wire.sendAction("is-app-certified",{manifestUrl:e});return t}getInstalledRuntimes(){return this.wire.sendAction("get-installed-runtimes").then((({payload:e})=>e.data.runtimes))}async getInstalledApps(){const{payload:{data:{installedApps:e}}}=await this.wire.sendAction("get-installed-apps");return e}getLog(e){return this.wire.sendAction("view-log",e).then((({payload:e})=>e.data))}getMachineId(){return this.wire.sendAction("get-machine-id").then((({payload:e})=>e.data))}getMinLogLevel(){return this.wire.sendAction("get-min-log-level").then((({payload:e})=>e.data))}getLogList(){return this.wire.sendAction("list-logs").then((({payload:e})=>e.data))}getMonitorInfo(){return this.wire.sendAction("get-monitor-info").then((({payload:e})=>e.data))}getMousePosition(){return this.wire.sendAction("get-mouse-position").then((({payload:e})=>e.data))}getProcessList(){return console.warn("System.getProcessList has been deprecated. Please consider using our new process APIs: Window.getProcessInfo, View.getProcessInfo, Application.getProcessInfo, System.getAllProcessInfo"),this.wire.sendAction("process-snapshot").then((({payload:e})=>e.data))}async getAllProcessInfo(){const{payload:{data:e}}=await this.wire.sendAction("get-all-process-info",this.identity);return e}getProxySettings(){return this.wire.sendAction("get-proxy-settings").then((({payload:e})=>e.data))}getRuntimeInfo(){return this.wire.sendAction("get-runtime-info").then((({payload:e})=>e.data))}getRvmInfo(){return this.wire.sendAction("get-rvm-info").then((({payload:e})=>e.data))}getHostSpecs(){return this.wire.sendAction("get-host-specs").then((({payload:e})=>e.data))}getOSInfo(){return this.wire.sendAction("get-os-info").then((({payload:e})=>e.data))}launchExternalProcess(e){return this.sendExternalProcessRequest("launch-external-process",e)}monitorExternalProcess(e){return this.sendExternalProcessRequest("monitor-external-process",e)}log(e,t,n){return this.wire.sendAction("write-to-log",{level:e,message:t,target:n??{}}).then((()=>{}))}openUrlWithBrowser(e){return this.wire.sendAction("open-url-with-browser",{url:e}).then((()=>{}))}async registerCustomProtocol(e){if("object"!=typeof e)throw new Error("Must provide an object with a `protocolName` property having a string value.");await this.wire.sendAction("register-custom-protocol",e)}async unregisterCustomProtocol(e){await this.wire.sendAction("unregister-custom-protocol",{protocolName:e})}async getCustomProtocolState(e){return this.wire.sendAction("get-custom-protocol-state",{protocolName:e}).then((({payload:e})=>e.data))}releaseExternalProcess(e){return this.wire.sendAction("release-external-process",{uuid:e}).then((()=>{}))}showDeveloperTools(e){return this.wire.sendAction("show-developer-tools",e).then((()=>{}))}terminateExternalProcess(e){return this.wire.sendAction("terminate-external-process",e).then((()=>{}))}updateProxySettings(e){return this.wire.sendAction("update-proxy",e).then((()=>{}))}async downloadAsset(e,t){const n=()=>{};let i=n,r=n;const o=new Promise(((e,t)=>{i=e,r=t}));if("openfin"!==this.wire.environment.type)throw new oe.NotSupportedError("downloadAsset only supported in an OpenFin Render process");const s=oe.RuntimeError.getCallSite(),a=this.wire.environment.getNextMessageId().toString(),c=`asset-download-progress-${a}`,d=`asset-download-error-${a}`,h=`asset-download-complete-${a}`,l=e=>{const n={downloadedBytes:e.downloadedBytes,totalBytes:e.totalBytes};t(n)},u=()=>{this.removeListener(c,l)};await Promise.all([this.on(c,l),this.once(d,(e=>{u();const{reason:t,err:n}=e;r(new oe.RuntimeError({reason:t,error:n},s))})),this.once(h,(()=>{u(),i()}))]);const p=Object.assign(e,{downloadId:a});return await this.wire.sendAction("download-asset",p).catch((e=>{throw u(),e})),o}downloadRuntime(e,t){const n=oe.RuntimeError.getCallSite();return new Promise(((i,r)=>{if("openfin"!==this.wire.environment.type)return void r(new oe.NotSupportedError("downloadRuntime only supported in an OpenFin Render process"));const o=this.wire.environment.getNextMessageId().toString(),s=`runtime-download-progress-${o}`,a=`runtime-download-error-${o}`,c=`runtime-download-complete-${o}`,d=e=>{const n={downloadedBytes:e.downloadedBytes,totalBytes:e.totalBytes};t(n)},h=()=>{this.removeListener(s,d)};this.on(s,d),this.once(a,(e=>{h();const{reason:t,err:i}=e;r(new oe.RuntimeError({reason:t,error:i},n))})),this.once(c,(()=>{h(),i()}));const l=Object.assign(e,{downloadId:o});this.wire.sendAction("download-runtime",l).catch((e=>{h(),r(e)}))}))}downloadPreloadScripts(e){return this.wire.sendAction("download-preload-scripts",{scripts:e}).then((({payload:e})=>e.data))}getAllExternalApplications(){return this.wire.sendAction("get-all-external-applications").then((({payload:e})=>e.data))}getAppAssetInfo(e){return this.wire.sendAction("get-app-asset-info",e).then((({payload:e})=>e.data))}getCookies(e){const t=this.wire.environment.getUrl(),n=Object.assign(e,{url:t});return this.wire.sendAction("get-cookies",n).then((({payload:e})=>e.data))}setMinLogLevel(e){return this.wire.sendAction("set-min-log-level",{level:e}).then((()=>{}))}resolveUuid(e){return this.wire.sendAction("resolve-uuid",{entityKey:e}).then((({payload:e})=>e.data))}executeOnRemote(e,t){return t.requestingIdentity=e,this.wire.ferryAction(t)}readRegistryValue(e,t,n){return this.wire.sendAction("read-registry-value",{rootKey:e,subkey:t,value:n}).then((({payload:e})=>e.data))}registerExternalConnection(e){return this.wire.sendAction("register-external-connection",{uuid:e}).then((({payload:e})=>e.data))}async getServiceConfiguration(e){if("string"!=typeof e.name)throw new Error("Must provide an object with a `name` property having a string value");const{name:t}=e;return this.wire.sendAction("get-service-configuration",{name:t}).then((({payload:e})=>e.data))}async getSystemAppConfig(e){if("string"!=typeof e)throw new Error("Must provide a string value for name of system app");return this.wire.sendAction("get-system-app-configuration",{name:e}).then((({payload:e})=>e.data))}async registerShutdownHandler(e){this.wire.sendAction("system-register-shutdown-handler").catch((e=>{}));const{uuid:t,name:n}=this.wire.me;this.on("system-shutdown",(i=>{e({proceed:()=>{this.wire.environment.raiseEvent("application/system-shutdown-handled",{uuid:t,name:n,topic:"application"})}})}))}runRvmHealthCheck(){return this.wire.sendAction("run-rvm-health-check").then((({payload:e})=>e.data))}async launchManifest(e,t={}){const{subscribe:n,...i}=t,r=i;if(n){const e=new ae.EventEmitter;n(e);const t="app-version-progress",i="runtime-status",o="app-version-complete",s="app-version-error",a=this.wire.environment.getNextMessageId().toString();r.appVersionId=a;const c=[o,t,i,s],d=e=>{const{appVersionId:t,topic:n,type:i,...r}=e;return{...r,type:c.find((e=>i.includes(e)))}},h=t=>{const n=d(t);e.emit(n.type,n)},l=()=>{this.removeListener(`${t}.${a}`,h),this.removeListener(`${i}.${a}`,h),this.removeListener(`${o}.${a}`,h),this.removeListener(`${s}.${a}`,h),this.removeListener(`${o}.${a}`,l),this.removeListener(`${s}.${a}`,l)};await Promise.all([this.on(`${t}.${a}`,h),this.on(`${i}.${a}`,h),this.once(`${o}.${a}`,h),this.once(`${s}.${a}`,h),this.once(`${o}.${a}`,l),this.once(`${s}.${a}`,l)])}return(await this.wire.sendAction("launch-manifest",{manifestUrl:e,opts:r})).payload.data.manifest}async queryPermissionForCurrentContext(e){const t={uuid:this.wire.me.uuid,name:this.wire.me.name};return(await this.wire.sendAction("query-permission-for-current-context",{apiName:e,identity:t})).payload.data}async enableNativeWindowIntegrationProvider(e){const{payload:t}=await this.wire.sendAction("enable-native-window-integration-provider",{permissions:e});return t.data}async registerUsage({data:e,type:t}){await this.wire.sendAction("register-usage",{data:e,type:t})}async getPrinters(){const{payload:e}=await this.wire.sendAction("system-get-printers");return e.data}async updateProcessLoggingOptions(e){await this.wire.sendAction("system-update-process-logging-options",{options:e})}async getDomainSettings(){const{payload:{data:e}}=await this.wire.sendAction("get-domain-settings");return e}async setDomainSettings(e){await this.wire.sendAction("set-domain-settings",{domainSettings:e})}async getCurrentDomainSettings(e){return(await this.wire.sendAction("get-current-domain-settings",{identity:e})).payload.data}async resolveDomainSettings(e){return(await this.wire.sendAction("resolve-domain-settings",{url:e})).payload.data}async refreshExtensions(){const{payload:e}=await this.wire.sendAction("refresh-extensions");return e.data}async getInstalledExtensions(){const{payload:e}=await this.wire.sendAction("get-installed-extensions");return e.data}async serveAsset(e){return(await this.wire.sendAction("serve-asset",{options:e})).payload.data}async getThemePreferences(){return(await this.wire.sendAction("get-theme-preferences")).payload.data}async setThemePreferences(e){return(await this.wire.sendAction("set-theme-preferences",{preferences:e})).payload.data}async launchLogUploader(e){return(await this.wire.sendAction("launch-log-uploader",{options:e})).payload.data}async setThemePalette(e){return(await this.wire.sendAction("set-theme-palette",{themePalette:e})).payload.data}async getThemePalette(){const{payload:e}=await this.wire.sendAction("get-theme-palette");return e.data}}u.System=ce;var de={},he={};Object.defineProperty(he,"__esModule",{value:!0}),he.RefCounter=void 0;he.RefCounter=class{constructor(){this.topicRefMap=new Map}incRefCount(e){const t=this.topicRefMap.get(e);let n;if(t){const i=t+1;n=i,this.topicRefMap.set(e,i)}else this.topicRefMap.set(e,1),n=1;return n}decRefCount(e){const t=this.topicRefMap.get(e);let n;if(t){const i=t-1;this.topicRefMap.set(e,i),n=i}else n=-1;return n}actOnFirst(e,t,n){return 1===this.incRefCount(e)?t():n()}actOnLast(e,t,n){return 0===this.decRefCount(e)?t():n()}};var le={},ue={},pe={};Object.defineProperty(pe,"__esModule",{value:!0}),pe.ChannelBase=pe.ProtectedItems=void 0;const we=g,ye=e=>async(t,n,i)=>{const r=await e(t,n,i);return void 0===r?n:r};pe.ProtectedItems=class{constructor(e,t){this.providerIdentity=e,this.close=t}};class fe{static defaultAction(e){throw new Error(`No action registered at target for ${e}`)}constructor(){this.subscriptions=new Map}async processAction(e,t,n){try{const i=this.subscriptions.get(e),r=i??((t,n)=>(this.defaultAction??fe.defaultAction)(e,t,n)),o=this.preAction?await this.preAction(e,t,n):t,s=await r(o,n);return this.postAction?await this.postAction(e,s,n):s}catch(t){if(we.RuntimeError.trimEndCallSites(t,/Channel.*processAction/),this.errorMiddleware)return this.errorMiddleware(e,t,n);throw t}}beforeAction(e){if(this.preAction)throw new Error("Already registered beforeAction middleware");this.preAction=ye(e)}onError(e){if(this.errorMiddleware)throw new Error("Already registered error middleware");this.errorMiddleware=e}afterAction(e){if(this.postAction)throw new Error("Already registered afterAction middleware");this.postAction=ye(e)}remove(e){this.subscriptions.delete(e)}setDefaultAction(e){if(this.defaultAction)throw new Error("default action can only be set once");this.defaultAction=e}register(e,t){if(this.subscriptions.has(e))throw new Error(`Subscription already registered for action: ${e}. Unsubscribe before adding new subscription`);return this.subscriptions.set(e,t),!0}}pe.ChannelBase=fe;var ge={};Object.defineProperty(ge,"__esModule",{value:!0}),ge.ChannelError=void 0;const me=g;class ve extends Error{constructor(e,t,n,i){super(e.message),this.action=t,this.dispatchPayload=n,this.name=this.constructor.name,"cause"in e&&e.cause instanceof Error&&(this.cause=e.cause),this.stack=me.RuntimeError.prepareStackTrace(this,i)}}ge.ChannelError=ve;var Ce,be,Ie,Ee=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)},xe=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n};Object.defineProperty(ue,"__esModule",{value:!0}),ue.ChannelClient=void 0;const Ae=g,Pe=pe,Me=ge,_e=new Map;class Oe extends Pe.ChannelBase{static closeChannelByEndpointId(e){const t=_e.get(e);t&&Ee(t,Ie,"f").call(t)}static handleProviderDisconnect(e){for(const t of _e.values())t.providerIdentity.channelId===e.channelId&&(t.disconnectListener(e),Ee(t,Ie,"f").call(t))}constructor(e,t,n){super(),Ce.set(this,void 0),be.set(this,void 0),this.processAction=(e,t,n)=>super.processAction(e,t,n),Ie.set(this,(()=>{_e.delete(this.endpointId),Ee(this,be,"f").close()})),xe(this,Ce,new Pe.ProtectedItems(e,t),"f"),this.disconnectListener=()=>{},this.endpointId=e.endpointId,xe(this,be,n,"f"),_e.set(this.endpointId,this),n.receive(this.processAction)}get providerIdentity(){return Ee(this,Ce,"f").providerIdentity}async dispatch(e,t){if(Ee(this,be,"f").isEndpointConnected(this.providerIdentity.channelId)){const n=Ae.RuntimeError.getCallSite();return Ee(this,be,"f").send(this.providerIdentity.channelId,e,t).catch((i=>{throw new Me.ChannelError(i,e,t,n)}))}throw new Error("The client you are trying to dispatch from is disconnected from the target provider.")}onDisconnection(e){this.disconnectListener=t=>{try{e(t)}catch(e){throw new Error(`Error while calling the onDisconnection callback: ${e.message}`)}finally{this.disconnectListener=()=>{}}}}async disconnect(){await this.sendDisconnectAction(),Ee(this,Ie,"f").call(this)}async sendDisconnectAction(){const e=Ee(this,Ce,"f");await e.close()}static async wireClose(e,t,n){const{channelName:i,uuid:r,name:o}=t;await e.sendAction("disconnect-from-channel",{channelName:i,uuid:r,name:o,endpointId:n})}}ue.ChannelClient=Oe,Ce=new WeakMap,be=new WeakMap,Ie=new WeakMap;var Se={},Re={};Object.defineProperty(Re,"__esModule",{value:!0}),Re.exhaustiveCheck=void 0,Re.exhaustiveCheck=function(e,t){throw new Error(`Unsupported value: ${e}${t?`\n Supported values are: ${t.join("")}`:""}`)};var Fe,je,Le,ke={},Te=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n},$e=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)};Object.defineProperty(ke,"__esModule",{value:!0}),ke.ClassicInfo=ke.ClassicStrategy=void 0;ke.ClassicStrategy=class{constructor(e,t,n,i){this.messageReceiver=t,this.endpointId=n,this.providerIdentity=i,Fe.set(this,void 0),je.set(this,new Map),Le.set(this,new Map),this.send=async(e,t,n)=>{const i=$e(this,je,"f").get(e);if(!i)throw new Error(`Could not locate routing info for endpoint ${e}`);const r={...i};r.isLocalEndpointId&&delete r.endpointId,delete r.isLocalEndpointId;const o=$e(this,Fe,"f").sendAction("send-channel-message",{...r,providerIdentity:this.providerIdentity,action:t,payload:n});$e(this,Le,"f").get(e)?.add(o);return(await o.catch((e=>{if("cause"in e)throw e;throw new Error(e.message)})).finally((()=>{$e(this,Le,"f").get(e)?.delete(o)}))).payload.data.result},this.close=async()=>{this.messageReceiver.removeEndpoint(this.providerIdentity.channelId,this.endpointId),[...$e(this,je,"f").keys()].forEach((e=>this.closeEndpoint(e))),Te(this,je,new Map,"f")},Te(this,Fe,e,"f")}onEndpointDisconnect(e,t){}receive(e){this.messageReceiver.addEndpoint(e,this.providerIdentity.channelId,this.endpointId)}async closeEndpoint(e){const t=$e(this,je,"f").get(e);$e(this,je,"f").delete(e);const n=$e(this,Le,"f").get(e);n?.forEach((n=>{const i=`Channel connection with identity uuid: ${t?.uuid} / name: ${t?.name} / endpointId: ${e} no longer connected.`;n.cancel(new Error(i))}))}isEndpointConnected(e){return $e(this,je,"f").has(e)}addEndpoint(e,t){$e(this,je,"f").set(e,t.endpointIdentity),$e(this,Le,"f").set(e,new Set)}isValidEndpointPayload(e){return"string"==typeof e?.endpointIdentity?.endpointId||"string"==typeof e?.endpointIdentity?.channelId}},Fe=new WeakMap,je=new WeakMap,Le=new WeakMap,ke.ClassicInfo={version:5,minimumVersion:0,type:"classic"};var Be={},Ge={},We={};Object.defineProperty(We,"__esModule",{value:!0}),We.errorToPOJO=void 0,We.errorToPOJO=function e(t){const n={stack:t.stack,name:t.name,message:t.message,toString:()=>t.stack||t.toString()};return"cause"in t&&(n.cause=e(t.cause)),n};var Ne,De,He=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)},Ve=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n};Object.defineProperty(Ge,"__esModule",{value:!0}),Ge.RTCEndpoint=void 0;const Ue=We;Ge.RTCEndpoint=class{static isValidEndpointPayload(e){const t=e=>"object"==typeof e&&null!==e;return t(e)&&t(e.endpointIdentity)&&t(e.rtc)&&"string"==typeof e.endpointIdentity.endpointId}constructor({rtc:e,endpointIdentity:t}){this.responseMap=new Map,Ne.set(this,null),De.set(this,void 0),this.connectionStateChangeHandler=e=>{"connected"!==this.rtc.rtcClient.connectionState&&(this.rtc.rtcClient.removeEventListener("connectionstatechange",this.connectionStateChangeHandler),this.close(),He(this,De,"f")&&He(this,De,"f").call(this))},this.send=async(e,t)=>{const n=`message-${Math.random()}`,i=new Promise(((e,t)=>{this.responseMap.set(n,{resolve:e,reject:t})}));return this.rtc.channels.request.send(JSON.stringify({action:e,payload:t,messageId:n})),i},this.close=()=>{this.responseMap.forEach((e=>e.reject("Connection has closed."))),this.responseMap=new Map,this.rtc.channels.request.close(),this.rtc.channels.response.close(),this.rtc.rtcClient.close()},this.rtc=e,this.endpointIdentity=t,this.rtc.channels.response.addEventListener("message",(e=>{let{data:t}=e;e.data instanceof ArrayBuffer&&(t=(new TextDecoder).decode(e.data));const{messageId:n,payload:i,success:r,error:o}=JSON.parse(t),{resolve:s,reject:a}=this.responseMap.get(n)??{};s&&a?(this.responseMap.delete(n),r?s(i):a(o)):(console.log("Could not find id in responseMap."),console.log(e))})),this.rtc.channels.request.addEventListener("message",(async e=>{let{data:n}=e;e.data instanceof ArrayBuffer&&(n=(new TextDecoder).decode(e.data));const{messageId:i,action:r,payload:o}=JSON.parse(n);if(He(this,Ne,"f"))try{const e=await He(this,Ne,"f").call(this,r,o,t);this.rtc.channels.response.send(JSON.stringify({messageId:i,payload:e,success:!0}))}catch(e){"open"===this.rtc.channels.response.readyState&&this.rtc.channels.response.send(JSON.stringify({messageId:i,error:(0,Ue.errorToPOJO)(e),success:!1}))}else"open"===this.rtc.channels.response.readyState&&this.rtc.channels.response.send(JSON.stringify({messageId:i,success:!1,error:"Connection not ready."}))})),this.rtc.rtcClient.addEventListener("connectionstatechange",this.connectionStateChangeHandler),Object.values(this.rtc.channels).forEach((e=>{e.onclose=e=>{[...this.responseMap.values()].forEach((e=>e.reject(new Error("RTCDataChannel closed unexpectedly, this is most commonly caused by message size. Note: RTC Channels have a message size limit of ~255kB.")))),this.close(),He(this,De,"f")&&He(this,De,"f").call(this)}}))}onDisconnect(e){if(He(this,De,"f"))throw new Error("RTCEndpoint disconnectListener cannot be set twice.");Ve(this,De,e,"f")}receive(e){if(He(this,Ne,"f"))throw new Error("You have already set a listener for this RTC Endpoint.");Ve(this,Ne,e,"f")}get connected(){return"connected"===this.rtc.rtcClient.connectionState}},Ne=new WeakMap,De=new WeakMap;var ze,Ke,Je,qe={},Ye=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)},Ze=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n};Object.defineProperty(qe,"__esModule",{value:!0}),qe.EndpointStrategy=void 0;qe.EndpointStrategy=class{constructor(e,t,n){this.EndpointType=e,this.StrategyName=n,ze.set(this,null),Ke.set(this,new Map),Je.set(this,!0),this.send=async(e,t,n)=>this.getEndpointById(e).send(t,n),this.close=async()=>{Ye(this,Je,"f")&&(Ye(this,Ke,"f").forEach((e=>e.close())),Ze(this,Ke,new Map,"f")),Ze(this,Je,!1,"f")},this.isValidEndpointPayload=t}onEndpointDisconnect(e,t){this.getEndpointById(e).onDisconnect(t)}receive(e){if(Ye(this,ze,"f"))throw new Error(`You have already set a listener for this ${this.StrategyName} Strategy`);Ze(this,ze,e,"f"),Ye(this,Ke,"f").forEach((e=>e.receive(Ye(this,ze,"f"))))}getEndpointById(e){const t=Ye(this,Ke,"f").get(e);if(!t)throw new Error(`Client with endpoint id ${e} is not connected`);return t}get connected(){return Ye(this,Je,"f")}isEndpointConnected(e){return Ye(this,Ke,"f").has(e)}addEndpoint(e,t){if(!Ye(this,Je,"f"))return void console.warn(`Adding endpoint to disconnected ${this.StrategyName} Strategy`);const n=new this.EndpointType(t);Ye(this,ze,"f")&&n.receive(Ye(this,ze,"f")),Ye(this,Ke,"f").set(e,n)}async closeEndpoint(e){Ye(this,Ke,"f").delete(e)}},ze=new WeakMap,Ke=new WeakMap,Je=new WeakMap,Object.defineProperty(Be,"__esModule",{value:!0}),Be.RTCInfo=Be.RTCStrategy=void 0;const Qe=Ge,Xe=qe;class et extends Xe.EndpointStrategy{constructor(){super(Qe.RTCEndpoint,Qe.RTCEndpoint.isValidEndpointPayload,"RTC")}}Be.RTCStrategy=et,Be.RTCInfo={version:2,minimumVersion:0,type:"rtc"};var tt={};Object.defineProperty(tt,"__esModule",{value:!0}),tt.RTCICEManager=void 0;const nt=p;class it extends nt.EmitterBase{constructor(e){super(e,"channel"),this.ensureChannelOpened=e=>new Promise(((t,n)=>{if("open"===e.readyState)t();else if("connecting"===e.readyState){const n=()=>{e.removeEventListener("open",n),t()};e.addEventListener("open",n)}else n(new Error("This Channel has already closed"))}))}static createDataChannelPromise(e,t){let n;const i=new Promise((e=>{n=e})),r=i=>{const o=()=>{i.channel.removeEventListener("open",o),n(i.channel)};i.channel.label===e&&(i.channel.addEventListener("open",o),t.removeEventListener("datachannel",r))};return t.addEventListener("datachannel",r),i}async listenForProviderIce(e,t){await this.on(this.createProviderEventName(e),t,{timestamp:Date.now()})}async raiseProviderIce(e,t){await this.wire.environment.raiseEvent(this.createRouteString(this.createProviderEventName(e)),t)}async listenForClientIce(e,t){await this.on(this.createClientEventName(e),t,{timestamp:Date.now()})}async raiseClientIce(e,t){await this.wire.environment.raiseEvent(this.createRouteString(this.createClientEventName(e)),t)}cleanupIceListeners(e){this.removeAllListeners(this.createClientEventName(e)),this.removeAllListeners(this.createProviderEventName(e))}createClientEventName(e){return`ice-client-${e}`}createProviderEventName(e){return`ice-provider-${e}`}createRouteString(e){return`channel/${e}`}createRtcPeer(){return this.wire.environment.getRtcPeer()}async startClientOffer(){const e=Math.random().toString(),t=this.createRtcPeer();t.addEventListener("icecandidate",(async t=>{t.candidate&&await this.raiseClientIce(e,{candidate:t.candidate?.toJSON()})})),await this.listenForProviderIce(e,(async e=>{await t.addIceCandidate(e.candidate)}));const n={request:t.createDataChannel("request"),response:t.createDataChannel("response")},i=await t.createOffer();await t.setLocalDescription(i);const r=Promise.all([n.request,n.response].map(this.ensureChannelOpened)).then((()=>{}));return{rtcClient:t,channels:n,offer:i,rtcConnectionId:e,channelsOpened:r}}async finishClientOffer(e,t,n){return await e.setRemoteDescription(t),await n,!0}async createProviderAnswer(e,t){const n=this.createRtcPeer(),i=it.createDataChannelPromise("request",n),r=it.createDataChannelPromise("response",n);n.addEventListener("icecandidate",(async t=>{t.candidate&&await this.raiseProviderIce(e,{candidate:t.candidate?.toJSON()})})),await this.listenForClientIce(e,(async e=>{await n.addIceCandidate(e.candidate)})),await n.setRemoteDescription(t);const o=await n.createAnswer();await n.setLocalDescription(o);const s=Promise.all([i,r]).then((([t,n])=>(this.cleanupIceListeners(e),{request:t,response:n})));return{rtcClient:n,answer:o,channels:s}}}tt.RTCICEManager=it;var rt={},ot={};function st(e){return[...e.split(".").reverse().entries()].reduce(((e,[t,n])=>e+ +n*1e4**t),0)}function at(e,t){return st(e)>=st(t)}function ct(e){return e.split("/")[0]}Object.defineProperty(ot,"__esModule",{value:!0}),ot.runtimeUuidMeetsMinimumRuntimeVersion=ot.parseRuntimeUuid=ot.meetsMinimumRuntimeVersion=void 0,ot.meetsMinimumRuntimeVersion=at,ot.parseRuntimeUuid=ct,ot.runtimeUuidMeetsMinimumRuntimeVersion=function(e,t){return at(ct(e),t)};var dt,ht,lt,ut,pt,wt=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)},yt=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n};Object.defineProperty(rt,"__esModule",{value:!0}),rt.ChannelProvider=void 0;const ft=g,gt=ot,mt=pe,vt=ge;class Ct extends mt.ChannelBase{get connections(){return[...wt(this,dt,"f")]}static handleClientDisconnection(e,t){if(t?.endpointId){const{uuid:n,name:i,endpointId:r,isLocalEndpointId:o}=t;wt(e,ut,"f").call(e,{uuid:n,name:i,endpointId:r,isLocalEndpointId:o})}else{e.connections.filter((e=>e.uuid===t.uuid&&e.name===t.name)).forEach(wt(e,ut,"f"))}e.disconnectListener(t)}static setProviderRemoval(e,t){Ct.removalMap.set(e,t)}constructor(e,t,n){super(),dt.set(this,void 0),ht.set(this,void 0),lt.set(this,void 0),ut.set(this,(e=>{const t=this.connections.filter((t=>t.endpointId!==e.endpointId));wt(this,lt,"f").closeEndpoint(e.endpointId),yt(this,dt,t,"f")})),this.processAction=async(e,t,n)=>(Ct.clientIsMultiRuntime(n)&&!(0,gt.runtimeUuidMeetsMinimumRuntimeVersion)(n.runtimeUuid,"18.87.56.0")?this.handleMultiRuntimeLegacyClient(n):this.checkForClientConnection(n),super.processAction(e,t,n)),pt.set(this,(()=>{wt(this,lt,"f").close();const e=Ct.removalMap.get(this);e&&e()})),yt(this,ht,new mt.ProtectedItems(e,t),"f"),this.connectListener=()=>{},this.disconnectListener=()=>{},yt(this,dt,[],"f"),yt(this,lt,n,"f"),n.receive(this.processAction)}dispatch(e,t,n){const i=e.endpointId??this.getEndpointIdForOpenFinId(e,t);if(i&&wt(this,lt,"f").isEndpointConnected(i)){const e=ft.RuntimeError.getCallSite();return wt(this,lt,"f").send(i,t,n).catch((i=>{throw new vt.ChannelError(i,t,n,e)}))}return Promise.reject(new Error(`Client connection with identity uuid: ${e.uuid} / name: ${e.name} / endpointId: ${i} no longer connected.`))}async processConnection(e,t){return wt(this,dt,"f").push(e),this.connectListener(e,t)}publish(e,t){return this.connections.map((n=>wt(this,lt,"f").send(n.endpointId,e,t)))}onConnection(e){this.connectListener=e}onDisconnection(e){this.disconnectListener=e}async destroy(){const e=wt(this,ht,"f");e.providerIdentity,yt(this,dt,[],"f"),await e.close(),wt(this,pt,"f").call(this)}async getAllClientInfo(){return this.connections.map((e=>{const{uuid:t,name:n,endpointId:i,entityType:r,connectionUrl:o}=e;return{uuid:t,name:n,endpointId:i,entityType:r,connectionUrl:o}}))}checkForClientConnection(e){if(!this.isClientConnected(e))throw new Error(`This action was sent from a client that is not connected to the provider.\n                    Client Identity: {uuid: ${e.uuid}, name: ${e.name}, endpointId: ${e.endpointId}}`)}isClientConnected(e){return Ct.clientIdentityIncludesEndpointId(e)?this.connections.some((t=>t.endpointId===e.endpointId&&t.uuid===e.uuid&&t.name===e.name)):this.isLegacyClientConnected(e)}isLegacyClientConnected(e){return this.connections.some((t=>t.uuid===e.uuid&&t.name===e.name))}handleMultiRuntimeLegacyClient(e){if(!this.isLegacyClientConnected(e))throw new Error(`This action was sent from a client that is not connected to the provider. Client Identity:\n                    {uuid: ${e.uuid}, name: ${e.name}, endpointId: ${e.endpointId}}`)}getEndpointIdForOpenFinId(e,t){const n=this.connections.filter((t=>t.name===e.name&&t.uuid===e.uuid));if(n.length>=2){const n=wt(this,ht,"f"),{uuid:i,name:r}=e,o=n?.providerIdentity.uuid,s=n?.providerIdentity.name;console.warn(`WARNING: Dispatch call may have unintended results. The "to" argument of your dispatch call is missing the\n                "endpointId" parameter. The identity you are dispatching to ({uuid: ${i}, name: ${r}})\n                has multiple channelClients for this channel. Your dispatched action: (${t}) from the provider:\n                ({uuid: ${o}, name: ${s}}) will only be processed by the most recently-created client.`)}return n.pop()?.endpointId}static clientIdentityIncludesEndpointId(e){return void 0!==e.endpointId}static clientIsMultiRuntime(e){return void 0!==e.runtimeUuid}static async wireClose(e,t){await e.sendAction("destroy-channel",{channelName:t})}}rt.ChannelProvider=Ct,dt=new WeakMap,ht=new WeakMap,lt=new WeakMap,ut=new WeakMap,pt=new WeakMap,Ct.removalMap=new WeakMap;var bt={};Object.defineProperty(bt,"__esModule",{value:!0}),bt.MessageReceiver=void 0;const It=ue,Et=p,xt=We;class At extends Et.Base{constructor(e){super(e),this.onmessage=e=>"process-channel-message"===e.action&&(this.processChannelMessage(e),!0),this.endpointMap=new Map,this.latestEndpointIdByChannelId=new Map,e.registerMessageHandler(this.onmessage.bind(this))}async processChannelMessage(e){const{senderIdentity:t,providerIdentity:n,action:i,ackToSender:r,payload:o,intendedTargetIdentity:s}=e.payload,a=s.channelId??s.endpointId??this.latestEndpointIdByChannelId.get(n.channelId),c=this.endpointMap.get(a);if(!c)return r.payload.success=!1,r.payload.reason=`Client connection with identity uuid: ${this.wire.me.uuid} / name: ${this.wire.me.name} / endpointId: ${a} no longer connected.`,r.payload.error=(0,xt.errorToPOJO)(new Error(r.payload.reason)),this.wire.sendRaw(r);try{const e=await c(i,o,t);return r.payload.payload=r.payload.payload||{},r.payload.payload.result=e,this.wire.sendRaw(r)}catch(e){return r.payload.success=!1,r.payload.reason=e.message,r.payload.error=(0,xt.errorToPOJO)(e),this.wire.sendRaw(r)}}addEndpoint(e,t,n){this.endpointMap.set(n,e),t!==n&&this.latestEndpointIdByChannelId.set(t,n)}removeEndpoint(e,t){this.endpointMap.delete(t),this.latestEndpointIdByChannelId.get(e)===t&&this.latestEndpointIdByChannelId.delete(e)}checkForPreviousClientConnection(e){const t=this.latestEndpointIdByChannelId.get(e);t&&(It.ChannelClient.closeChannelByEndpointId(t),console.warn("You have created a second connection to an older provider. First connection has been removed from the clientMap"),console.warn("If the provider calls publish(), you may receive multiple messages."))}}bt.MessageReceiver=At;var Pt={};Object.defineProperty(Pt,"__esModule",{value:!0}),Pt.ProtocolManager=void 0;Pt.ProtocolManager=class{constructor(e){this.ProtocolsInPreferenceOrder=e,this.DefaultClientProtocols=["classic"],this.DefaultProviderProtocols=["classic"],this.getClientProtocols=e=>{const t=e?this.ProtocolsInPreferenceOrder.filter((t=>e.includes(t))):this.DefaultClientProtocols;if(!t.length)throw new Error(`No valid protocols were passed in. Accepted values are: ${this.ProtocolsInPreferenceOrder.join(", ")}.`);return t},this.getProviderProtocols=e=>{const t=e?this.ProtocolsInPreferenceOrder.filter((t=>e.includes(t))):this.DefaultProviderProtocols;if(!t.length)throw new Error(`No valid protocols were passed in. Accepted values are: ${this.ProtocolsInPreferenceOrder.join(", ")}.`);return t},this.getCompatibleProtocols=(e,t)=>t.supportedProtocols.filter((t=>e.some((e=>e.type===t.type&&t.version>=e.minimumVersion&&e.version>=(t.minimumVersion??0))))).slice(0,t.maxProtocols)}};var Mt={};Object.defineProperty(Mt,"__esModule",{value:!0});class _t{static combine(e,t){return new _t(e,t)}constructor(e,t){this.primary=e,this.secondary=t}onEndpointDisconnect(e,t){this.primary.onEndpointDisconnect(e,(()=>{this.secondary.isEndpointConnected(e)||t()})),this.secondary.onEndpointDisconnect(e,(()=>{this.primary.isEndpointConnected(e)||t()}))}isValidEndpointPayload(e){return this.primary.isValidEndpointPayload(e)||this.secondary.isValidEndpointPayload(e)}async closeEndpoint(e){await this.primary.closeEndpoint(e),await this.secondary.closeEndpoint(e)}isEndpointConnected(e){return this.primary.isEndpointConnected(e)||this.secondary.isEndpointConnected(e)}async addEndpoint(e,t){this.primary.isValidEndpointPayload(t)&&await this.primary.addEndpoint(e,t),this.secondary.isValidEndpointPayload(t)&&await this.secondary.addEndpoint(e,t)}receive(e){this.primary.receive(e),this.secondary.receive(e)}send(e,t,n){return this.primary.isEndpointConnected(e)?this.primary.send(e,t,n):this.secondary.send(e,t,n)}async close(){await Promise.all([this.primary.close(),this.secondary.close()])}}Mt.default=_t;var Ot,St,Rt=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n},Ft=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)},jt=h&&h.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Se,"__esModule",{value:!0}),Se.ConnectionManager=void 0;const Lt=Re,kt=p,Tt=ke,$t=Be,Bt=tt,Gt=rt,Wt=bt,Nt=Pt,Dt=jt(Mt);class Ht extends kt.Base{static getProtocolOptionsFromStrings(e){return e.map((e=>{switch(e){case"rtc":return $t.RTCInfo;case"classic":return Tt.ClassicInfo;default:return(0,Lt.exhaustiveCheck)(e,["rtc","classic"])}}))}constructor(e){super(e),Ot.set(this,void 0),St.set(this,void 0),this.removeChannelFromProviderMap=e=>{this.providerMap.delete(e)},this.onmessage=e=>"process-channel-connection"===e.action&&(this.processChannelConnection(e),!0),this.providerMap=new Map,this.protocolManager=new Nt.ProtocolManager("node"===this.wire.environment.type?["classic"]:["rtc","classic"]),Rt(this,Ot,new Wt.MessageReceiver(e),"f"),Rt(this,St,new Bt.RTCICEManager(e),"f"),e.registerMessageHandler(this.onmessage.bind(this))}createProvider(e,t){const n=Object.assign(this.wire.environment.getDefaultChannelOptions().create,e||{}),i=this.protocolManager.getProviderProtocols(n?.protocols),r=i.map((e=>{switch(e){case"rtc":return new $t.RTCStrategy;case"classic":return new Tt.ClassicStrategy(this.wire,Ft(this,Ot,"f"),t.channelId,t);default:return(0,Lt.exhaustiveCheck)(e,["rtc","classic"])}}));let o;if(2===r.length){const[e,t]=r;o=Dt.default.combine(e,t)}else{if(1!==r.length)throw new Error("failed to combine strategies");[o]=r}const s=new Gt.ChannelProvider(t,(()=>Gt.ChannelProvider.wireClose(this.wire,t.channelName)),o),a=t.channelId;return this.providerMap.set(a,{provider:s,strategy:o,supportedProtocols:Ht.getProtocolOptionsFromStrings(i)}),Gt.ChannelProvider.setProviderRemoval(s,this.removeChannelFromProviderMap.bind(this)),s}async createClientOffer(e){const t=this.protocolManager.getClientProtocols(e?.protocols);let n;return{offer:{supportedProtocols:await Promise.all(t.map((async e=>{switch(e){case"rtc":{const{rtcClient:e,channels:t,offer:i,rtcConnectionId:r,channelsOpened:o}=await Ft(this,St,"f").startClientOffer();return n={rtcClient:e,channels:t,channelsOpened:o},{type:"rtc",version:$t.RTCInfo.version,payload:{offer:i,rtcConnectionId:r}}}case"classic":return{type:"classic",version:Tt.ClassicInfo.version};default:return(0,Lt.exhaustiveCheck)(e,["rtc","classic"])}}))),maxProtocols:2},rtc:n}}async createClientStrategy(e,t){t.endpointId||(t.endpointId=this.wire.environment.getNextMessageId(),Ft(this,Ot,"f").checkForPreviousClientConnection(t.channelId));const n=t.answer??{supportedProtocols:[{type:"classic",version:1}]},i=(await Promise.all(n.supportedProtocols.map((async n=>"rtc"===n.type&&e?(await Ft(this,St,"f").finishClientOffer(e.rtcClient,n.payload.answer,e.channelsOpened),new $t.RTCStrategy):"classic"===n.type?new Tt.ClassicStrategy(this.wire,Ft(this,Ot,"f"),t.endpointId,t):null)))).filter((e=>null!==e));let r;if(e&&!i.some((e=>e instanceof $t.RTCStrategy))&&e&&e.rtcClient.close(),i.length>=2)r=Dt.default.combine(i[0],i[1]);else{if(!i.length)throw new Error("No compatible protocols");[r]=i}const o={endpointIdentity:t,rtc:e};return r.addEndpoint(t.channelId,o),r}async processChannelConnection(e){const{clientIdentity:t,providerIdentity:n,ackToSender:i,payload:r,offer:o}=e.payload;t.endpointId?t.isLocalEndpointId=!1:(t.endpointId=this.wire.environment.getNextMessageId(),t.isLocalEndpointId=!0);const s=n.channelId,a=this.providerMap.get(s);if(!a)return i.payload.success=!1,i.payload.reason=`Channel "${n.channelName}" has been destroyed.`,this.wire.sendRaw(i);const{provider:c,strategy:d,supportedProtocols:h}=a;try{if(!(c instanceof Gt.ChannelProvider))throw Error("Cannot connect to a channel client");const e=o??{supportedProtocols:[{type:"classic",version:1}],maxProtocols:1},n=this.protocolManager.getCompatibleProtocols(h,e);if(!n.length)throw new Error("This provider does not support any of the offered protocols.");const s=await c.processConnection(t,r);i.payload.payload=i.payload.payload||{};let a={supportedProtocols:[],endpointPayloadPromise:Promise.resolve({endpointIdentity:t})};return a=await n.reduce((async(e,t)=>{const n=await e;if("rtc"===t.type){const{answer:e,rtcClient:i,channels:r}=await Ft(this,St,"f").createProviderAnswer(t.payload.rtcConnectionId,t.payload.offer);n.supportedProtocols.push({type:"rtc",version:$t.RTCInfo.version,payload:{answer:e}}),n.endpointPayloadPromise=n.endpointPayloadPromise.then((e=>r.then((t=>({...e,rtc:{rtcClient:i,channels:t}})))))}else n.supportedProtocols.push({type:"classic",version:Tt.ClassicInfo.version});return n}),Promise.resolve(a)),a.endpointPayloadPromise.then((e=>d.addEndpoint(t.endpointId,e))),i.payload.payload.result=s,i.payload.payload.answer=a,this.wire.sendRaw(i)}catch(e){return i.payload.success=!1,i.payload.reason=e.message,this.wire.sendRaw(i)}}}Se.ConnectionManager=Ht,Ot=new WeakMap,St=new WeakMap;var Vt,Ut,zt,Kt=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n},Jt=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)};Object.defineProperty(le,"__esModule",{value:!0}),le.Channel=void 0;const qt=t,Yt=G,Zt=p,Qt=ue,Xt=Se,en=rt;function tn(e){const t=Math.floor(e/10),n=Math.min(3e4,500*2**t);return new Promise((e=>{setTimeout((()=>{e(!1)}),n)}))}class nn extends Zt.EmitterBase{constructor(e){super(e,"channel"),Vt.set(this,void 0),Ut.set(this,new qt.EventEmitter),zt.set(this,new Yt.AsyncRetryableLazy((async()=>{await Promise.all([this.on("disconnected",(e=>{Qt.ChannelClient.handleProviderDisconnect(e)})),this.on("connected",((...e)=>{Jt(this,Ut,"f").emit("connected",...e)}))]).catch((()=>new Error("error setting up channel connection listeners")))}))),Kt(this,Vt,new Xt.ConnectionManager(e),"f")}async getAllChannels(){return this.wire.sendAction("get-all-channels").then((({payload:e})=>e.data))}async onChannelConnect(e){await this.on("connected",e)}async onChannelDisconnect(e){await this.on("disconnected",e)}async safeConnect(e,t,n){const i={count:0};do{let r=()=>{};const o=new Promise((t=>{r=n=>{e===n.channelName&&t(!0)},Jt(this,Ut,"f").on("connected",r)}));try{if(i.count>0){i.gotConnectedEvent=await Promise.race([tn(i.count),o]);const t=await this.wire.sendAction("connect-to-channel",{...n,retryInfo:i});return console.log(`Successfully connected to channelName: ${e}`),t.payload.data}const t=this.wire.sendAction("connect-to-channel",n);i.originalMessageId=t.messageId;return(await t).payload.data}catch(n){if(!n.message.includes("internal-nack"))throw n;t&&0===i.count&&console.warn(`No channel found for channelName: ${e}. Waiting for connection...`)}finally{i.count+=1,Jt(this,Ut,"f").removeListener("connected",r)}}while(t);throw new Error(`No channel found for channelName: ${e}.`)}async connect(e,t={}){if(await Jt(this,zt,"f").getValue(),!e||"string"!=typeof e)throw new Error("Please provide a channelName string to connect to a channel.");const n={wait:!0,...this.wire.environment.getDefaultChannelOptions().connect,...t},{offer:i,rtc:r}=await Jt(this,Vt,"f").createClientOffer(n);let o;(this.fin.me.isFrame||this.fin.me.isView||this.fin.me.isWindow)&&(o=(await this.fin.me.getInfo()).url);const s={channelName:e,...n,offer:i,connectionUrl:o},a=await this.safeConnect(e,n.wait,s),c=await Jt(this,Vt,"f").createClientStrategy(r,a),d=new Qt.ChannelClient(a,(()=>Qt.ChannelClient.wireClose(this.wire,a,a.endpointId)),c);return c.onEndpointDisconnect(a.channelId,(async()=>{try{await d.sendDisconnectAction()}catch(e){console.warn(`Something went wrong during disconnect for client with uuid: ${a.uuid} / name: ${a.name} / endpointId: ${a.endpointId}.`)}finally{Qt.ChannelClient.handleProviderDisconnect(a)}})),d}async create(e,t){if(!e)throw new Error("Please provide a channelName to create a channel");const{payload:{data:n}}=await this.wire.sendAction("create-channel",{channelName:e}),i=Jt(this,Vt,"f").createProvider(t,n);return this.on("client-disconnected",(t=>{t.channelName===e&&en.ChannelProvider.handleClientDisconnection(i,t)})),i}}le.Channel=nn,Vt=new WeakMap,Ut=new WeakMap,zt=new WeakMap,Object.defineProperty(de,"__esModule",{value:!0}),de.InterAppPayload=de.InterApplicationBus=void 0;const rn=t,on=p,sn=he,an=le,cn=O;class dn extends on.Base{constructor(e){super(e),this.events={subscriberAdded:"subscriber-added",subscriberRemoved:"subscriber-removed"},this.refCounter=new sn.RefCounter,this.Channel=new an.Channel(e),this.emitter=new rn.EventEmitter,e.registerMessageHandler(this.onmessage.bind(this)),this.on=this.emitter.on.bind(this.emitter),this.removeAllListeners=this.emitter.removeAllListeners.bind(this.emitter)}async publish(e,t){await this.wire.sendAction("publish-message",{topic:e,message:t,sourceWindowName:this.me.name})}async send(e,t,n){const i=(0,cn.validateIdentity)(e);if(i)throw new Error(i);await this.wire.sendAction("send-message",{destinationUuid:e.uuid,destinationWindowName:e.name,topic:t,message:n,sourceWindowName:this.me.name})}subscribe(e,t,n){const i=this.createSubscriptionKey(e.uuid,e.name||"*",t);return this.emitter.on(i,n),this.refCounter.actOnFirst(i,(async()=>{await this.wire.sendAction("subscribe",{sourceUuid:e.uuid,sourceWindowName:e.name||"*",topic:t,destinationWindowName:this.me.name})}),(()=>Promise.resolve()))}unsubscribe(e,t,n){const i=e.name||"*",r=this.createSubscriptionKey(e.uuid,i,t);return this.emitter.removeListener(r,n),this.refCounter.actOnLast(r,(async()=>{await this.wire.sendAction("unsubscribe",{sourceUuid:e.uuid,sourceWindowName:i,topic:t,destinationWindowName:this.me.name})}),(()=>new Promise((e=>e)).then((()=>{}))))}processMessage(e){const{payload:{message:t,sourceWindowName:n,sourceUuid:i,topic:r}}=e,o=[this.createSubscriptionKey(i,n,r),this.createSubscriptionKey(i,"*",r),this.createSubscriptionKey("*","*",r)],s={uuid:i,name:n};o.forEach((e=>{this.emitter.emit(e,t,s)}))}emitSubscriverEvent(e,t){const{payload:{targetName:n,uuid:i,topic:r}}=t,o={name:n,uuid:i,topic:r};this.emitter.emit(e,o)}createSubscriptionKey(e,t,n){const i=t||"*";if(!(e&&i&&n))throw new Error("Missing uuid, name, or topic string");return function(...e){return e.map((e=>Buffer.from(`${e}`).toString("base64"))).join("/")}(e,i,n)}onmessage(e){const{action:t}=e;switch(t){case"process-message":this.processMessage(e);break;case this.events.subscriberAdded:this.emitSubscriverEvent(this.events.subscriberAdded,e);break;case this.events.subscriberRemoved:this.emitSubscriverEvent(this.events.subscriberRemoved,e)}return!0}}de.InterApplicationBus=dn;de.InterAppPayload=class{};var hn={};Object.defineProperty(hn,"__esModule",{value:!0}),hn.Clipboard=void 0;const ln=p;class un extends ln.Base{async writeText(e){await this.wire.sendAction("clipboard-write-text",e)}async readText(e){const{payload:t}=await this.wire.sendAction("clipboard-read-text",{type:e});return t.data}async writeImage(e){await this.wire.sendAction("clipboard-write-image",e)}async readImage(e={format:"dataURL"}){const{payload:t}=await this.wire.sendAction("clipboard-read-image",e);return t.data}async writeHtml(e){await this.wire.sendAction("clipboard-write-html",e)}async readHtml(e){const{payload:t}=await this.wire.sendAction("clipboard-read-html",{type:e});return t.data}async writeRtf(e){await this.wire.sendAction("clipboard-write-rtf",e)}async readRtf(e){const{payload:t}=await this.wire.sendAction("clipboard-read-rtf",{type:e});return t.data}async write(e){await this.wire.sendAction("clipboard-write",e)}async getAvailableFormats(e){const{payload:t}=await this.wire.sendAction("clipboard-read-formats",{type:e});return t.data}}hn.Clipboard=un;var pn={},wn={},yn={};Object.defineProperty(yn,"__esModule",{value:!0}),yn.ExternalApplication=void 0;const fn=p;class gn extends fn.EmitterBase{constructor(e,t){super(e,"external-application",t.uuid),this.identity=t}getInfo(){return this.wire.sendAction("get-external-application-info",this.identity).then((({payload:e})=>e.data))}}yn.ExternalApplication=gn,Object.defineProperty(wn,"__esModule",{value:!0}),wn.ExternalApplicationModule=void 0;const mn=p,vn=yn;class Cn extends mn.Base{wrap(e){return this.wire.sendAction("external-application-wrap").catch((e=>{})),Promise.resolve(new vn.ExternalApplication(this.wire,{uuid:e}))}wrapSync(e){return this.wire.sendAction("external-application-wrap-sync").catch((e=>{})),new vn.ExternalApplication(this.wire,{uuid:e})}}wn.ExternalApplicationModule=Cn,function(e){var t=h&&h.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,r)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=h&&h.__exportStar||function(e,n){for(var i in e)"default"===i||Object.prototype.hasOwnProperty.call(n,i)||t(n,e,i)};Object.defineProperty(e,"__esModule",{value:!0}),n(wn,e),n(yn,e)}(pn);var bn={},In={},En={};Object.defineProperty(En,"__esModule",{value:!0}),En._Frame=void 0;const xn=p;class An extends xn.EmitterBase{constructor(e,t){super(e,"frame",t.uuid,t.name),this.identity=t}getInfo(){return this.wire.sendAction("get-frame-info",this.identity).then((({payload:e})=>e.data))}getParentWindow(){return this.wire.sendAction("get-parent-window",this.identity).then((({payload:e})=>e.data))}}En._Frame=An,Object.defineProperty(In,"__esModule",{value:!0}),In._FrameModule=void 0;const Pn=p,Mn=O,_n=En;class On extends Pn.Base{async wrap(e){this.wire.sendAction("frame-wrap").catch((e=>{}));const t=(0,Mn.validateIdentity)(e);if(t)throw new Error(t);return new _n._Frame(this.wire,e)}wrapSync(e){this.wire.sendAction("frame-wrap-sync").catch((e=>{}));const t=(0,Mn.validateIdentity)(e);if(t)throw new Error(t);return new _n._Frame(this.wire,e)}getCurrent(){return this.wire.sendAction("frame-get-current").catch((e=>{})),Promise.resolve(new _n._Frame(this.wire,this.wire.environment.getCurrentEntityIdentity()))}getCurrentSync(){return this.wire.sendAction("frame-get-current-sync").catch((e=>{})),new _n._Frame(this.wire,this.wire.environment.getCurrentEntityIdentity())}}In._FrameModule=On,function(e){var t=h&&h.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,r)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=h&&h.__exportStar||function(e,n){for(var i in e)"default"===i||Object.prototype.hasOwnProperty.call(n,i)||t(n,e,i)};Object.defineProperty(e,"__esModule",{value:!0}),n(In,e),n(En,e)}(bn);var Sn={};Object.defineProperty(Sn,"__esModule",{value:!0}),Sn.GlobalHotkey=void 0;const Rn=p;class Fn extends Rn.EmitterBase{constructor(e){super(e,"global-hotkey")}async register(e,t){await this.on(e,t),await this.wire.sendAction("global-hotkey-register",{hotkey:e})}async unregister(e){await this.removeAllListeners(e),await this.wire.sendAction("global-hotkey-unregister",{hotkey:e})}async unregisterAll(){await Promise.all(this.eventNames().filter((e=>!("registered"===e||"unregistered"===e))).map((e=>this.removeAllListeners(e)))),await this.wire.sendAction("global-hotkey-unregister-all",{})}async isRegistered(e){const{payload:{data:t}}=await this.wire.sendAction("global-hotkey-is-registered",{hotkey:e});return t}}Sn.GlobalHotkey=Fn;var jn,Ln,kn={},Tn={},$n={},Bn=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n},Gn=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)};Object.defineProperty($n,"__esModule",{value:!0}),$n.Platform=void 0;const Wn=p,Nn=O;class Dn extends Wn.EmitterBase{constructor(e,t,n=`custom-frame-${t.uuid}`){super(e,"application",t.uuid),jn.set(this,void 0),this.getClient=(e=this.identity)=>{if(e.uuid!==this.identity.uuid)return new Dn(this.wire,e).getClient();if(this.wire.sendAction("platform-get-client",this.identity).catch((e=>{})),!Dn.clientMap.has(Gn(this,jn,"f"))){const e=Gn(this,Ln,"f").call(this);Dn.clientMap.set(Gn(this,jn,"f"),e)}return Dn.clientMap.get(Gn(this,jn,"f"))},Ln.set(this,(async()=>{try{const e=await this._channel.connect(Gn(this,jn,"f"),{wait:!1});return e.onDisconnection((()=>{Dn.clientMap.delete(Gn(this,jn,"f"))})),e}catch(e){throw Dn.clientMap.delete(Gn(this,jn,"f")),new Error("The targeted Platform is not currently running. Listen for application-started event for the given Uuid.")}})),this.launchLegacyManifest=this.launchContentManifest;const i=(0,Nn.validateIdentity)(t);if(i)throw new Error(i);Bn(this,jn,n,"f"),this._channel=this.fin.InterApplicationBus.Channel,this.identity={uuid:t.uuid},this.Layout=this.fin.Platform.Layout,this.Application=this.fin.Application.wrapSync(this.identity)}async createView(e,t,n){this.wire.sendAction("platform-create-view",this.identity).catch((e=>{}));const i=await this.getClient(),r=await i.dispatch("create-view",{target:t,opts:e,targetView:n});if(!r||(0,Nn.validateIdentity)(r.identity))throw new Error(`When overwriting the createView call, please return an object that has a valid 'identity' property: ${JSON.stringify(r)}`);return this.fin.View.wrapSync(r.identity)}async createWindow(e){this.wire.sendAction("platform-create-window",this.identity).catch((e=>{}));const t=await this.getClient();e.reason||(e.reason="api-call");const n=await t.dispatch("create-view-container",e);if(!n||(0,Nn.validateIdentity)(n.identity))throw new Error(`When overwriting the createWindow call, please return an object that has a valid 'identity' property: ${JSON.stringify(n)}`);const{identity:i}=n,r=this.fin.Window.wrapSync(i);return r.name=i.name,r.uuid=i.uuid,r}async quit(){this.wire.sendAction("platform-quit",this.identity).catch((e=>{}));return(await this.getClient()).dispatch("quit")}async closeView(e){this.wire.sendAction("platform-close-view",this.identity).catch((e=>{}));const t=await this.getClient();await t.dispatch("close-view",{view:e})}async reparentView(e,t){console.warn("Platform.reparentView has been deprecated, please use Platform.createView"),this.wire.sendAction("platform-reparent-view",this.identity).catch((e=>{}));const n={...e,uuid:e.uuid??this.identity.uuid},i=await this.fin.View.wrap(n),r=await i.getOptions();return this.createView(r,t)}async getSnapshot(){this.wire.sendAction("platform-get-snapshot",this.identity).catch((e=>{}));return(await this.getClient()).dispatch("get-snapshot")}async getViewSnapshot(e){return(await this.getClient()).dispatch("get-view-snapshot",{viewIdentity:e})}async applySnapshot(e,t){this.wire.sendAction("platform-apply-snapshot",this.identity).catch((e=>{}));const n="Requested snapshot must be a valid Snapshot object, or a url or filepath to such an object.";let i;if("string"==typeof e)try{i=(await this._channel.wire.sendAction("get-application-manifest",{manifestUrl:e})).payload.data}catch(e){throw new Error(`${n}: ${e}`)}else i=e;if(!i.windows)throw new Error(n);const r=await this.getClient();return await r.dispatch("apply-snapshot",{snapshot:i,options:t}),this}async fetchManifest(e){return(await this.getClient()).dispatch("platform-fetch-manifest",{manifestUrl:e})}async launchContentManifest(e){this.wire.sendAction("platform-launch-content-manifest",this.identity).catch((()=>{}));const t=await this.getClient(),n=await this.fetchManifest(e);return t.dispatch("launch-into-platform",{manifest:n,manifestUrl:e}),this}async setWindowContext(e={},t){if(this.wire.sendAction("platform-set-window-context",this.identity).catch((e=>{})),!e)throw new Error("Please provide a serializable object or string to set the context.");const n=await this.getClient(),{entityType:i}=t?await this.fin.System.getEntityInfo(t.uuid,t.name):this.fin.me;await n.dispatch("set-window-context",{context:e,entityType:i,target:t||{uuid:this.fin.me.uuid,name:this.fin.me.name}})}async getWindowContext(e){this.wire.sendAction("platform-get-window-context",this.identity).catch((e=>{}));const t=await this.getClient(),{entityType:n}=e?await this.fin.System.getEntityInfo(e.uuid,e.name):this.fin.me;return t.dispatch("get-window-context",{target:e||{uuid:this.fin.me.uuid,name:this.fin.me.name},entityType:n})}async closeWindow(e,t={skipBeforeUnload:!1}){this.wire.sendAction("platform-close-window",this.identity).catch((e=>{}));return(await this.getClient()).dispatch("close-window",{windowId:e,options:t})}}$n.Platform=Dn,jn=new WeakMap,Ln=new WeakMap,Dn.clientMap=new Map;var Hn={},Vn={},Un={},zn={};function Kn(e){switch(e){case"columns":case"grid":case"rows":case"tabs":return!0;default:return!1}}Object.defineProperty(zn,"__esModule",{value:!0}),zn.overrideFromComposables=zn.isValidPresetType=void 0,zn.isValidPresetType=Kn,zn.overrideFromComposables=function(...e){return t=>e.reduceRight(((e,t)=>n=>t(e(n))),(e=>e))(t)},zn.default={isValidPresetType:Kn};var Jn={},qn={},Yn={};Object.defineProperty(Yn,"__esModule",{value:!0}),Yn.ApiConsumer=void 0;Yn.ApiConsumer=class{constructor(e){this.strategy=e,this.consume=async e=>(await this.strategy.getExposedFunctions(e)).reduce(((t,n)=>({...t,[n.key]:this.strategy.createFunction(n,e)})),{})}};var Zn={},Qn={};Object.defineProperty(Qn,"__esModule",{value:!0}),Qn.expose=Qn.getExposedProperties=void 0;const Xn=Symbol("exposedProperties");Qn.getExposedProperties=e=>e[Xn]||e.prototype[Xn]||[];Qn.expose=e=>(t,n,i)=>{t[Xn]=t[Xn]||[],t[Xn].push({key:n,descriptor:i,options:e})},Object.defineProperty(Zn,"__esModule",{value:!0}),Zn.ApiExposer=void 0;const ei=Qn;Zn.ApiExposer=class{constructor(e){this.strategy=e,this.exposeInstance=async(e,t)=>{const n=(0,ei.getExposedProperties)(e),i=await Promise.all(n.map((async({key:n,options:i})=>({key:n,options:await this.strategy.exposeFunction(e[n].bind(e),{key:n,options:i,meta:t})}))));await this.strategy.exposeMeta(t,i)}}};var ti={},ni={},ii={};Object.defineProperty(ii,"__esModule",{value:!0}),ii.ChannelsConsumer=void 0;ii.ChannelsConsumer=class{constructor(e){this.channel=e,this.getExposedFunctions=async e=>{const{id:t}=e,{props:n}=await this.channel.dispatch(`api-meta:${t}`);return n},this.createFunction=e=>(...t)=>{const{action:n}=e.options;return this.channel.dispatch(n,{args:t})}}};var ri={};Object.defineProperty(ri,"__esModule",{value:!0}),ri.ChannelsExposer=void 0;ri.ChannelsExposer=class{constructor(e){this.channelProviderOrClient=e,this.exposeFunction=async(e,t)=>{const{key:n,options:i,meta:r}=t,{id:o}=r,s=`${o}.${i?.action||n}`;return await this.channelProviderOrClient.register(s,(async({args:t})=>e(...t))),{action:s}},this.exposeMeta=async({id:e},t)=>{const n=`api-meta:${e}`;await this.channelProviderOrClient.register(n,(()=>({props:t})))}}},function(e){var t=h&&h.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,r)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=h&&h.__exportStar||function(e,n){for(var i in e)"default"===i||Object.prototype.hasOwnProperty.call(n,i)||t(n,e,i)};Object.defineProperty(e,"__esModule",{value:!0}),n(ii,e),n(ri,e)}(ni),function(e){var t=h&&h.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,r)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=h&&h.__exportStar||function(e,n){for(var i in e)"default"===i||Object.prototype.hasOwnProperty.call(n,i)||t(n,e,i)};Object.defineProperty(e,"__esModule",{value:!0}),n(ni,e)}(ti),function(e){var t=h&&h.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,r)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=h&&h.__exportStar||function(e,n){for(var i in e)"default"===i||Object.prototype.hasOwnProperty.call(n,i)||t(n,e,i)};Object.defineProperty(e,"__esModule",{value:!0}),n(Yn,e),n(Zn,e),n(ti,e),n(Qn,e)}(qn);var oi={};Object.defineProperty(oi,"__esModule",{value:!0}),oi.createRelayedDispatch=exports.relayChannelClientApi_1=oi.relayChannelClientApi=void 0;const si=["no longer connected","RTCDataChannel closed unexpectedly","The client you are trying to dispatch from is disconnected from the target provider"];exports.relayChannelClientApi_1=oi.relayChannelClientApi=async(e,t)=>{e.register(`relay:${t}`,(({action:t,target:n,payload:i})=>e.dispatch(n,t,i))),await Promise.resolve()};oi.createRelayedDispatch=(e,t,n,i)=>async(r,o)=>{try{return await e.dispatch(`relay:${n}`,{action:r,payload:o,target:t})}catch(e){if(s=e.message,si.some((e=>s.includes(e)))&&i)throw new Error(i);throw e}// removed by dead control flow
 var s; };var ai,ci,di,hi=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n},li=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)};Object.defineProperty(Jn,"__esModule",{value:!0}),Jn.ColumnOrRow=Jn.TabStack=Jn.LayoutNode=void 0;const ui=qn,pi=oi;class wi{constructor(e,t){ai.set(this,void 0),this.isRoot=()=>li(this,ai,"f").isRoot(this.entityId),this.exists=()=>li(this,ai,"f").exists(this.entityId),this.getParent=async()=>{const e=await li(this,ai,"f").getParent(this.entityId);if(e)return wi.getEntity(e,li(this,ai,"f"))},this.createAdjacentStack=async(e,t)=>{const n=await li(this,ai,"f").createAdjacentStack(this.entityId,e,t);return wi.getEntity({entityId:n,type:"stack"},li(this,ai,"f"))},this.getAdjacentStacks=async e=>(await li(this,ai,"f").getAdjacentStacks({targetId:this.entityId,edge:e})).map((e=>wi.getEntity({type:"stack",entityId:e.entityId},li(this,ai,"f")))),hi(this,ai,e,"f"),this.entityId=t}}Jn.LayoutNode=wi,ai=new WeakMap,wi.newLayoutEntitiesClient=async(e,t,n)=>{const i=(0,pi.createRelayedDispatch)(e,n,"layout-relay","You are trying to interact with a layout component on a window that does not exist or has been destroyed.");return new ui.ApiConsumer(new ui.ChannelsConsumer({dispatch:i})).consume({id:t})},wi.getEntity=(e,t)=>{const{entityId:n,type:i}=e;switch(i){case"column":case"row":return new fi(t,n,i);case"stack":return new yi(t,n);default:throw new Error(`Unrecognised Layout Entity encountered ('${JSON.stringify(e)})`)}};class yi extends wi{constructor(e,t){super(e,t),ci.set(this,void 0),this.type="stack",this.getViews=()=>li(this,ci,"f").getStackViews(this.entityId),this.addView=async(e,t={index:0})=>li(this,ci,"f").addViewToStack(this.entityId,e,t),this.removeView=async e=>{await li(this,ci,"f").removeViewFromStack(this.entityId,e)},this.setActiveView=async e=>{await li(this,ci,"f").setStackActiveView(this.entityId,e)},hi(this,ci,e,"f")}}Jn.TabStack=yi,ci=new WeakMap;class fi extends wi{constructor(e,t,n){super(e,t),di.set(this,void 0),this.getContent=async()=>(await li(this,di,"f").getContent(this.entityId)).map((e=>wi.getEntity(e,li(this,di,"f")))),hi(this,di,e,"f"),this.type=n}}Jn.ColumnOrRow=fi,di=new WeakMap;var gi={};Object.defineProperty(gi,"__esModule",{value:!0}),gi.DEFAULT_LAYOUT_KEY=gi.LAYOUT_CONTROLLER_ID=void 0,gi.LAYOUT_CONTROLLER_ID="layout-entities",gi.DEFAULT_LAYOUT_KEY="__default__";var mi,vi,Ci,bi=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)};Object.defineProperty(Un,"__esModule",{value:!0}),Un.Layout=void 0;const Ii=G,Ei=O,xi=p,Ai=zn,Pi=Jn,Mi=gi;class _i extends xi.Base{static getClient(e){return bi(e,vi,"f").getValue()}constructor(e,t){super(t),mi.add(this),vi.set(this,new Ii.Lazy((async()=>Pi.LayoutNode.newLayoutEntitiesClient(await this.platform.getClient(),Mi.LAYOUT_CONTROLLER_ID,this.identity)))),this.replace=async e=>{this.wire.sendAction("layout-replace").catch((e=>{}));const t=await this.platform.getClient();await t.dispatch("replace-layout",{target:this.identity,opts:{layout:e}})},this.replaceView=async(e,t)=>{this.wire.sendAction("layout-replace-view").catch((e=>{}));const n=await this.platform.getClient();await n.dispatch("replace-view",{target:this.identity,opts:{viewToReplace:e,newView:t}})},this.applyPreset=async e=>{this.wire.sendAction("layout-apply-preset").catch((e=>{}));const t=await this.platform.getClient(),{presetType:n}=e;if(!n||!(0,Ai.isValidPresetType)(n))throw new Error("Cannot apply preset layout, please include an applicable presetType property in the PresetLayoutOptions.");await t.dispatch("apply-preset-layout",{target:this.identity,opts:{presetType:n}})};const n=(0,Ei.validateIdentity)(e);if(n)throw new Error(n);this.identity=e,this.platform=this.fin.Platform.wrapSync({uuid:e.uuid}),e.uuid===this.fin.me.uuid&&e.name===this.fin.me.name&&(this.init=this.fin.Platform.Layout.init)}async getConfig(){this.wire.sendAction("layout-get-config").catch((e=>{}));return(await this.platform.getClient()).dispatch("get-frame-snapshot",{target:this.identity})}async getCurrentViews(){this.wire.sendAction("layout-get-views").catch((e=>{}));const e=await this.platform.getClient();return(await e.dispatch("get-layout-views",{target:this.identity})).map((e=>this.fin.View.wrapSync(e)))}async getRootItem(){this.wire.sendAction("layout-get-root-item").catch((()=>{}));const e=await bi(this,vi,"f").getValue(),t=await e.getRoot("layoutName"in this.identity?this.identity:void 0);return Pi.LayoutNode.getEntity(t,e)}async getStackByViewIdentity(e){this.wire.sendAction("layout-get-stack-by-view").catch((()=>{}));const t=await bi(this,vi,"f").getValue(),n=await t.getStackByView(e);if(!n)throw new Error(`No stack found for view: ${e.uuid}/${e.name}`);return Pi.LayoutNode.getEntity(n,t)}async addView(e,{location:t,targetView:n}={}){this.wire.sendAction("layout-add-view").catch((e=>{}));const{identity:i}=await bi(this,mi,"m",Ci).call(this,"layout-add-view",{viewOptions:e,location:t,targetView:n});return{identity:i}}async closeView(e){this.wire.sendAction("layout-close-view").catch((e=>{})),await bi(this,mi,"m",Ci).call(this,"layout-close-view",{viewIdentity:e})}}Un.Layout=_i,vi=new WeakMap,mi=new WeakSet,Ci=async function(e,t){return(await this.platform.getClient()).dispatch(e,{target:this.identity,opts:t})};var Oi,Si,Ri,Fi,ji,Li=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)},ki=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n};Object.defineProperty(Vn,"__esModule",{value:!0}),Vn.LayoutModule=void 0;const Ti=p,$i=Un,Bi=gi;class Gi extends Ti.Base{constructor(){super(...arguments),Oi.add(this),Si.set(this,!1),Ri.set(this,null),this.init=async(e={})=>{if(this.wire.sendAction("layout-init").catch((e=>{})),!this.wire.environment.layoutAllowedInContext(this.fin))throw new Error("Layout.init can only be called from a Window context.");if(Li(this,Si,"f"))throw new Error("Layout.init was already called, please use Layout.create to add additional layouts.");"openfin"===this.wire.environment.type&&await this.fin.Platform.getCurrentSync().getClient(),ki(this,Si,!0,"f"),ki(this,Ri,await this.wire.environment.initLayoutManager(this.fin,this.wire,e),"f"),await this.wire.environment.applyLayoutSnapshot(this.fin,Li(this,Ri,"f"),e);const t={name:this.fin.me.name,uuid:this.fin.me.uuid};if(!e.layoutManagerOverride){const e={layoutName:Bi.DEFAULT_LAYOUT_KEY,...t};return Li(this,Fi,"f").call(this,e)}return this.wrapSync(t)},Fi.set(this,(e=>{const t="[Layout] You are using a deprecated property `layoutManager` - it will throw if you access it starting in v37.",n=new Proxy({},{get(e,n){throw console.warn(`[Layout-mgr-proxy] accessing ${n.toString()}`),new Error(t)}}),i=Object.assign(this.wrapSync(e),{layoutManager:n});return new Proxy(i,{get(e,n){if("layoutManager"===n)throw console.warn(`[Layout-proxy] accessing ${n.toString()}`),new Error(t);return e[n]}})})),this.getCurrentLayoutManagerSync=()=>Li(this,Oi,"m",ji).call(this,"fin.Platform.Layout.getCurrentLayoutManagerSync()"),this.create=async e=>this.wire.environment.createLayout(Li(this,Oi,"m",ji).call(this,"fin.Platform.Layout.create()"),e),this.destroy=async e=>this.wire.environment.destroyLayout(Li(this,Oi,"m",ji).call(this,"fin.Platform.Layout.destroy()"),e)}async wrap(e){return this.wire.sendAction("layout-wrap").catch((e=>{})),new $i.Layout(e,this.wire)}wrapSync(e){return this.wire.sendAction("layout-wrap-sync").catch((e=>{})),new $i.Layout(e,this.wire)}async getCurrent(){if(this.wire.sendAction("layout-get-current").catch((e=>{})),"openfin"===this.wire.environment.type&&!this.fin.me.isWindow)throw new Error("You are not in a Window context.  Only Windows can have a Layout.");const{uuid:e,name:t}=this.fin.me;return this.wrap({uuid:e,name:t})}getCurrentSync(){if(this.wire.sendAction("layout-get-current-sync").catch((e=>{})),"openfin"===this.wire.environment.type&&!this.fin.me.isWindow)throw new Error("You are not in a Window context.  Only Windows can have a Layout.");const{uuid:e,name:t}=this.fin.me;return this.wrapSync({uuid:e,name:t})}async getLayoutByViewIdentity(e){this.wire.sendAction("layout-get-by-view-identity").catch((()=>{}));let t=await this.wire.environment.getViewWindowIdentity(this.fin,e);t.identity&&(t=t.identity);try{const n=this.wrapSync(t),i=await $i.Layout.getClient(n),r=await i.getLayoutIdentityForViewOrThrow(e);return this.wrapSync(r)}catch(n){if(!["No action registered at target for","getLayoutIdentityForViewOrThrow is not a function"].some((e=>n.message.includes(e))))throw n;if(t.uuid===t.name)throw new Error(`View identity ${JSON.stringify(e)} is not attached to any layout in provider window ${JSON.stringify(t)}.`);return this.wrapSync(t)}}}Vn.LayoutModule=Gi,Si=new WeakMap,Ri=new WeakMap,Fi=new WeakMap,Oi=new WeakSet,ji=function(e){if(!Li(this,Ri,"f"))throw new Error(`You must call init before using the API ${e}`);return Li(this,Ri,"f")},function(e){var t=h&&h.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,r)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=h&&h.__exportStar||function(e,n){for(var i in e)"default"===i||Object.prototype.hasOwnProperty.call(n,i)||t(n,e,i)};Object.defineProperty(e,"__esModule",{value:!0}),n(Vn,e),n(Un,e)}(Hn),Object.defineProperty(Tn,"__esModule",{value:!0}),Tn.PlatformModule=void 0;const Wi=p,Ni=$n,Di=Hn;class Hi extends Wi.Base{constructor(e,t){super(e),this._channel=t,this.Layout=new Di.LayoutModule(this.wire)}async init(e){if(!fin.__internal_.isPlatform||fin.me.name!==fin.me.uuid)throw new Error("fin.Platform.init should only be called from a custom platform provider running in the main window of the application.");return this.wire.environment.initPlatform(this.fin,e)}async wrap(e){return this.wire.sendAction("platform-wrap").catch((e=>{})),new Ni.Platform(this.wire,{uuid:e.uuid})}wrapSync(e){return this.wire.sendAction("platform-wrap-sync").catch((e=>{})),new Ni.Platform(this.wire,{uuid:e.uuid})}async getCurrent(){return this.wire.sendAction("platform-get-current").catch((e=>{})),this.wrap({uuid:this.wire.me.uuid})}getCurrentSync(){return this.wire.sendAction("platform-get-current-sync").catch((e=>{})),this.wrapSync({uuid:this.wire.me.uuid})}start(e){return this.wire.sendAction("platform-start").catch((e=>{})),new Promise((async(t,n)=>{try{const{uuid:n}=e,i=await this.fin.Application._create({...e,isPlatformController:!0});i.once("platform-api-ready",(()=>t(this.wrapSync({uuid:n})))),i._run({uuid:n})}catch(e){n(e)}}))}startFromManifest(e,t){return this.wire.sendAction("platform-start-from-manifest").catch((e=>{})),new Promise((async(n,i)=>{try{const i=await this.fin.Application._createFromManifest(e);i.once("platform-api-ready",(()=>n(this.wrapSync({uuid:i.identity.uuid})))),i._run(t)}catch(e){i(e)}}))}}Tn.PlatformModule=Hi,function(e){var t=h&&h.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,r)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=h&&h.__exportStar||function(e,n){for(var i in e)"default"===i||Object.prototype.hasOwnProperty.call(n,i)||t(n,e,i)};Object.defineProperty(e,"__esModule",{value:!0}),n(Tn,e),n($n,e)}(kn);var Vi={};!function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.getMe=e.getBaseMe=e.environmentUnsupportedMessage=void 0;const t=q(),n=bn,i=ie(),r=pn;function o(e,t,n){return{...{isView:"view"===e,isWindow:"window"===e,isFrame:"iframe"===e,isExternal:"external connection"===e},uuid:t,name:n,entityType:e}}e.environmentUnsupportedMessage="You are not running in OpenFin.",e.getBaseMe=o,e.getMe=function(s){const{uuid:a,name:c,entityType:d}=s.me,h={setContext(){throw new Error(e.environmentUnsupportedMessage)},addContextHandler(){throw new Error(e.environmentUnsupportedMessage)},getContextGroups(){throw new Error(e.environmentUnsupportedMessage)},joinContextGroup(){throw new Error(e.environmentUnsupportedMessage)},removeFromContextGroup(){throw new Error(e.environmentUnsupportedMessage)},getAllClientsInContextGroup(){throw new Error(e.environmentUnsupportedMessage)},getInfoForContextGroup(){throw new Error(e.environmentUnsupportedMessage)}},l="Interop API has not been instantiated. Either connection has failed or you have not declared interop in your config.",u={setContext(){throw new Error(l)},addContextHandler(){throw new Error(l)},getContextGroups(){throw new Error(l)},joinContextGroup(){throw new Error(l)},removeFromContextGroup(){throw new Error(l)},getAllClientsInContextGroup(){throw new Error(l)},getInfoForContextGroup(){throw new Error(l)}},p={eventNames:()=>{throw new Error(e.environmentUnsupportedMessage)},emit:()=>{throw new Error(e.environmentUnsupportedMessage)},listeners:()=>{throw new Error(e.environmentUnsupportedMessage)},listenerCount:()=>{throw new Error(e.environmentUnsupportedMessage)},on:()=>{throw new Error(e.environmentUnsupportedMessage)},addListener:()=>{throw new Error(e.environmentUnsupportedMessage)},once:()=>{throw new Error(e.environmentUnsupportedMessage)},prependListener:()=>{throw new Error(e.environmentUnsupportedMessage)},prependOnceListener:()=>{throw new Error(e.environmentUnsupportedMessage)},removeListener:()=>{throw new Error(e.environmentUnsupportedMessage)},removeAllListeners:()=>{throw new Error(e.environmentUnsupportedMessage)}};switch(d){case"view":return Object.assign(new t.View(s,{uuid:a,name:c}),o(d,a,c),{interop:u,isOpenFin:!0});case"window":return Object.assign(new i._Window(s,{uuid:a,name:c}),o(d,a,c),{interop:u,isOpenFin:!0});case"iframe":return Object.assign(new n._Frame(s,{uuid:a,name:c}),o(d,a,c),{interop:u,isOpenFin:!0});case"external connection":return Object.assign(new r.ExternalApplication(s,{uuid:a}),o(d,a,c),{interop:u,isOpenFin:!1});default:return{...o(d,a,c),...p,interop:h,isOpenFin:!1}}}}(Vi);var Ui={},zi={},Ki={};Object.defineProperty(Ki,"__esModule",{value:!0}),Ki.createWarningObject=Ki.createUnusableObject=void 0,Ki.createUnusableObject=function(e){const t=()=>{throw new Error(e)};return new Proxy({},{apply:t,construct:t,defineProperty:t,deleteProperty:t,get:t,getOwnPropertyDescriptor:t,getPrototypeOf:t,has:t,isExtensible:t,ownKeys:t,preventExtensions:t,set:t,setPrototypeOf:t})},Ki.createWarningObject=function(e,t){return new Proxy(t,{get:(...t)=>(console.warn(e),Reflect.get(...t)),set:(...t)=>(console.warn(e),Reflect.set(...t)),getOwnPropertyDescriptor:(...t)=>(console.warn(e),Reflect.getOwnPropertyDescriptor(...t)),ownKeys:(...t)=>(console.warn(e),Reflect.ownKeys(...t))})};var Ji={},qi={},Yi={};!function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.checkContextIntegrity=e.wrapIntentHandler=e.BROKER_ERRORS=e.generateOverrideWarning=e.generateOverrideError=e.wrapContextHandler=e.wrapInTryCatch=e.generateId=void 0;e.generateId=()=>`${Math.random()}${Date.now()}`;e.wrapInTryCatch=(e,t)=>(...n)=>{try{return e(...n)}catch(e){throw new Error((t||"")+e)}};e.wrapContextHandler=(e,t)=>async n=>{try{await e(n)}catch(e){throw console.error(`Error thrown by handler ${t} for context type ${n.type}: ${e}`),e}};e.generateOverrideError=(e,t)=>`You have tried to to use ${e} but ${t} has not been overridden in the Interop Broker. Please override this function. Refer to our documentation for more info.`;e.generateOverrideWarning=(e,t,n,i)=>{const{uuid:r,name:o}=n;return i?`Entity with identity: ${r}/${o} has called ${i} or ${e} but ${t} has not been overridden.`:`Entity with identity: ${r}/${o} has called ${e} but ${t} has not been overridden.`},e.BROKER_ERRORS={fireIntent:(0,e.generateOverrideError)("fireIntent","handleFiredIntent"),fireIntentForContext:(0,e.generateOverrideError)("fireIntentForContext","handleFiredIntentForContext"),getInfoForIntent:(0,e.generateOverrideError)("getInfoForIntent","handleInfoForIntent"),getInfoForIntentsByContext:(0,e.generateOverrideError)("getInfoForIntentsByContext","handleInfoForIntentsByContext"),joinSessionContextGroupWithJoinContextGroup:"The Context Group you have tried to join is a Session Context Group. Custom Context Groups can only be defined by the Interop Broker through code or manifest configuration. Please use joinSessionContextGroup.",fdc3Open:(0,e.generateOverrideError)("fdc3.open","fdc3HandleOpen"),fdc3FindInstances:(0,e.generateOverrideError)("fdc3.findInstances","fdc3HandleFindInstances"),fdc3GetAppMetadata:(0,e.generateOverrideError)("fdc3.getAppMetadata","fdc3HandleGetAppMetadata"),fdc3GetInfo:(0,e.generateOverrideError)("fdc3.getInfo","fdc3HandleGetInfo")};e.wrapIntentHandler=(e,t)=>async n=>{try{return e(n)}catch(e){throw console.error(`Error thrown by handler ${t}: ${e}`),e}};e.checkContextIntegrity=e=>e?"object"!=typeof e?{isValid:!1,reason:"Context must be an Object"}:e.type?{isValid:!0}:{isValid:!1,reason:"Context must have a type property"}:{isValid:!1,reason:"No context supplied"}}(Yi),Object.defineProperty(qi,"__esModule",{value:!0});const Zi=Yi;qi.default=class{constructor(e,t){this.provider=e,this.id=t,this.lastContext=void 0,this.contextGroupMap=new Map,this.clients=new Map,this.registerListeners()}registerListeners(){this.provider.register(`sessionContextGroup:getContext-${this.id}`,this.getCurrentContext.bind(this)),this.provider.register(`sessionContextGroup:setContext-${this.id}`,this.setContext.bind(this)),this.provider.register(`sessionContextGroup:handlerAdded-${this.id}`,this.handlerAdded.bind(this)),this.provider.register(`sessionContextGroup:handlerRemoved-${this.id}`,this.handlerRemoved.bind(this))}getCurrentContext(e){return e.type?this.contextGroupMap.get(e.type):this.lastContext}setContext(e,t){const{context:n}=e,i=(0,Zi.checkContextIntegrity)(n);if(!1===i.isValid)throw new Error(`Failed to set Context - bad Context. Reason: ${i.reason}. Context: ${JSON.stringify(n)}`);if(!this.getClientState(t))throw new Error(`Client with Identity: ${t.uuid} ${t.name} not in Session Client State Map`);this.contextGroupMap.set(n.type,n),this.lastContext=n;Array.from(this.clients.values()).forEach((e=>{e.contextHandlers.get(n.type)?.forEach((t=>{this.provider.dispatch(e.clientIdentity,t,n)})),e.globalHandler&&this.provider.dispatch(e.clientIdentity,e.globalHandler,n)}))}getClientState(e){return this.clients.get(e.endpointId)}async handlerAdded(e,t){const{handlerId:n,contextType:i}=e,r=this.getClientState(t);if(!r)throw new Error(`Client with Identity: ${t.uuid} ${t.name} not in Client State Map`);if(i){const e=r.contextHandlers.get(i)||[];r.contextHandlers.set(i,[...e,n]);const o=this.contextGroupMap.get(i);o&&await this.provider.dispatch(t,n,o)}else{r.globalHandler=n;const e=[...this.contextGroupMap.keys()].map((async e=>{const i=this.contextGroupMap.get(e);i&&await this.provider.dispatch(t,n,i)}));await Promise.all(e)}}handlerRemoved(e,t){const{handlerId:n}=e,i=this.clients.get(t.endpointId);i?(Array.from(i.contextHandlers).forEach((([,e])=>{const t=e.indexOf(n);t>-1&&e.splice(t,1)})),i.globalHandler===n&&(i.globalHandler=void 0)):console.warn(`Trying to remove a handler from a client that isn't mapped. handlerId: ${n}. clientIdentity: ${t}`)}registerNewClient(e){if(!this.clients.has(e.endpointId)){const t={contextHandlers:new Map,clientIdentity:e,globalHandler:void 0};this.clients.set(e.endpointId,t)}}onDisconnection(e){this.clients.delete(e.endpointId)}};var Qi={};Object.defineProperty(Qi,"__esModule",{value:!0}),Qi.PrivateChannelProvider=void 0;const Xi=Yi;class er{constructor(e,t,n){this.provider=e,this.id=t,this.clients=new Map,this.registerListeners(),this.contextByContextType=new Map,this.lastContext=void 0,this.provider.onConnection((e=>this.registerNewClient(e))),this.removePrivateChannelProvider=n,this.provider.onDisconnection((async e=>{const{endpointId:t}=e;this.clients.has(t)&&await this.handleClientDisconnecting(e),0===(await this.provider.getAllClientInfo()).length&&(this.provider.destroy(),this.removePrivateChannelProvider(this.id))}))}getClientState(e){return this.clients.get(e.endpointId)}registerListeners(){this.provider.register("broadcast",this.broadcast.bind(this)),this.provider.register("getCurrentContext",this.getCurrentContext.bind(this)),this.provider.register("contextHandlerAdded",this.contextHandlerAdded.bind(this)),this.provider.register("contextHandlerRemoved",this.contextHandlerRemoved.bind(this)),this.provider.register("nonStandardHandlerRemoved",this.nonStandardHandlerRemoved.bind(this)),this.provider.register("onAddContextHandlerAdded",this.onAddContextHandlerAdded.bind(this)),this.provider.register("onDisconnectHandlerAdded",this.onDisconnectHandlerAdded.bind(this)),this.provider.register("onUnsubscribeHandlerAdded",this.onUnsubscribeHandlerAdded.bind(this)),this.provider.register("clientDisconnecting",((e,t)=>{this.handleClientDisconnecting(t)}))}broadcast(e,t){const{context:n}=e;if(!this.getClientState(t))throw new Error(`Client with Identity: ${t.uuid} ${t.name}, tried to call broadcast, is not connected to this Private Channel`);const i=(0,Xi.checkContextIntegrity)(n);if(!1===i.isValid)throw new Error(`Failed to broadcast - bad Context. Reason: ${i.reason}. Context: ${JSON.stringify(n)}`);this.contextByContextType.set(n.type,n),this.lastContext=n,Array.from(this.clients.values()).forEach((e=>{const t=e.handlerIdsByContextTypes.get(n.type);t&&t.forEach((t=>{this.provider.dispatch(e.clientIdentity,t,n)})),e.globalHandler&&this.provider.dispatch(e.clientIdentity,e.globalHandler,n)}))}getCurrentContext(e,t){const{contextType:n}=e;if(!this.getClientState(t))throw new Error(`Client with Identity: ${t.uuid} ${t.name}, tried to call getCurrentContext, is not connected to this Private Channel`);if(void 0!==n){const e=this.contextByContextType.get(n);return e||null}return this.lastContext?this.lastContext:null}contextHandlerAdded(e,t){const{handlerId:n,contextType:i}=e,r=this.getClientState(t);if(!r)throw new Error(`Client with Identity: ${t.uuid} ${t.name}, tried to call addContextListener, is not connected to this Private Channel`);if(i){const e=r.handlerIdsByContextTypes.get(i)||[];r.handlerIdsByContextTypes.set(i,[...e,n])}else r.globalHandler=n;Array.from(this.clients.values()).forEach((e=>{e.clientIdentity.endpointId!==t.endpointId&&e.onAddContextListenerHandlerId&&this.provider.dispatch(e.clientIdentity,e.onAddContextListenerHandlerId,i)}))}async contextHandlerRemoved(e,t){const{handlerId:n}=e,i=this.getClientState(t);if(i){let e;if(i.globalHandler===n)i.globalHandler=void 0;else for(const[t,r]of i.handlerIdsByContextTypes){const i=r.indexOf(n);i>-1&&(r.splice(i,1),e=t)}const r=(await this.getConnectedClients()).map((async n=>{const{clientIdentity:i,clientIdentity:{endpointId:r},onUnsubscribeHandlerId:o}=n;r!==t.endpointId&&o&&await this.provider.dispatch(i,o,e)}));try{await Promise.all(r)}catch(e){throw console.error(`Problem when attempting to dispatch to onUnsubscribeHandlers. Error: ${e} Removing Client: ${n}. uuid: ${t.uuid}. name: ${t.name}. endpointId: ${t.endpointId}`),new Error(e)}}else console.warn(`Trying to remove a handler from a client that isn't mapped. handlerId: ${n}. uuid: ${t.uuid}. name: ${t.name}. endpointId: ${t.endpointId}.`)}nonStandardHandlerRemoved(e,t){const{handlerId:n}=e,i=this.getClientState(t);i?i.onDisconnectHandlerId===n?i.onDisconnectHandlerId=void 0:i.onAddContextListenerHandlerId===n?i.onAddContextListenerHandlerId=void 0:i.onUnsubscribeHandlerId===n&&(i.onUnsubscribeHandlerId=void 0):console.warn(`Trying to remove a handler from a client that isn't mapped. handlerId: ${n}. clientIdentity: ${t}`)}onAddContextHandlerAdded(e,t){const n=this.getClientState(t),{handlerId:i}=e;if(!n)throw new Error(`Client with Identity: ${t.uuid} ${t.name}, tried to call onAddContextListener, is not connected to this Private Channel`);n.onAddContextListenerHandlerId=i,Array.from(this.clients.values()).forEach((e=>{e.clientIdentity.endpointId!==t.endpointId&&Array.from(e.handlerIdsByContextTypes.keys()).forEach((e=>{this.provider.dispatch(t,i,e)}))}))}onDisconnectHandlerAdded(e,t){const n=this.getClientState(t),{handlerId:i}=e;if(!n)throw new Error(`Client with Identity: ${t.uuid} ${t.name}, tried to call onDisconnect, is not connected to this Private Channel`);n.onDisconnectHandlerId=i}onUnsubscribeHandlerAdded(e,t){const n=this.getClientState(t),{handlerId:i}=e;if(!n)throw new Error(`Client with Identity: ${t.uuid} ${t.name}, tried to call onUnsubscribe, is not connected to this Private Channel`);n.onUnsubscribeHandlerId=i}removeClient(e){const t=this.getClientState(e);if(!t)throw new Error(`Client with Identity: ${e.uuid} ${e.name}, tried to call disconnect, is not connected to this Private Channel`);t.handlerIdsByContextTypes.clear(),this.clients.delete(e.endpointId)}async fireOnDisconnectForOtherClients(e){const{endpointId:t}=e,n=(await this.getConnectedClients()).map((async e=>{const{clientIdentity:{endpointId:n},onDisconnectHandlerId:i}=e;n!==t&&i&&await this.provider.dispatch(e.clientIdentity,i)}));try{await Promise.all(n)}catch(t){throw console.error(`Problem when attempting to dispatch to onDisconnectHandlers. Error: ${t} Disconnecting Client: uuid: ${e.uuid}. name: ${e.name}. endpointId: ${e.endpointId}`),new Error(t)}}async unsubscribeAll(e){const{endpointId:t}=e,n=this.clients.get(t);if(n){const t=Array.from(n.handlerIdsByContextTypes.values()).flat(),i=n.globalHandler;if(t.length>0){const n=t.map((async t=>this.contextHandlerRemoved({handlerId:t},e)));try{await Promise.all(n)}catch(e){console.error(e.message)}}if(i)try{await this.contextHandlerRemoved({handlerId:i},e)}catch(e){console.error(e.message)}}}async handleClientDisconnecting(e){await this.unsubscribeAll(e),this.removeClient(e),await this.fireOnDisconnectForOtherClients(e)}registerNewClient(e){if(!this.clients.has(e.endpointId)){const t={clientIdentity:e,handlerIdsByContextTypes:new Map,globalHandler:void 0,onAddContextListenerHandlerId:void 0,onUnsubscribeHandlerId:void 0,onDisconnectHandlerId:void 0};this.clients.set(e.endpointId,t)}}async getConnectedClients(){const e=await this.provider.getAllClientInfo();return Array.from(this.clients.values()).filter((t=>{const{uuid:n,name:i}=t.clientIdentity;return e.some((e=>i===e.name&&n===e.uuid))}))}static init(e,t,n){return new er(e,t,n)}}Qi.PrivateChannelProvider=er;var tr,nr,ir,rr=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n},or=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)},sr=h&&h.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Ji,"__esModule",{value:!0}),Ji.InteropBroker=void 0;const ar=p,cr=sr(qi),dr=Yi,hr=sr(i),lr=Qi,ur=G,pr=[{id:"green",displayMetadata:{color:"#00CC88",name:"green"}},{id:"purple",displayMetadata:{color:"#8C61FF",name:"purple"}},{id:"orange",displayMetadata:{color:"#FF8C4C",name:"orange"}},{id:"red",displayMetadata:{color:"#FF5E60",name:"red"}},{id:"pink",displayMetadata:{color:"#FF8FB8",name:"pink"}},{id:"yellow",displayMetadata:{color:"#E9FF8F",name:"yellow"}}];class wr extends ar.Base{constructor(e,t,n){super(e),tr.set(this,void 0),nr.set(this,void 0),ir.set(this,void 0),this.getProvider=()=>or(this,ir,"f").getValue(),this.interopClients=new Map,this.contextGroupsById=new Map,rr(this,nr,n.contextGroups??[...pr],"f"),rr(this,tr,n.fdc3Info,"f"),n?.logging&&(this.logging=n.logging),this.intentClientMap=new Map,this.lastContextMap=new Map,this.sessionContextGroupMap=new Map,this.privateChannelProviderMap=new Map,rr(this,ir,new ur.Lazy(t),"f"),this.setContextGroupMap(),this.setupChannelProvider()}static createClosedConstructor(...e){return class extends wr{constructor(...t){if(t.length){const[n,i,r]=t;if(r&&"object"==typeof r&&!(0,hr.default)(r,e[2]))return console.warn("You have modified the parameters of the InteropOverride constructor. This behavior is deprecated and will be removed in a future version. You can modify these options in your manifest. Please consult our Interop docs for guidance on migrating to the new override scheme."),void super(e[0],e[1],r);console.warn("You are attempting to pass arguments to the InteropOverride constructor. This is not necessary, and these passed arguments will be ignored. You are likely using an older InteropBroker override scheme. Please consult our Interop docs for guidance on migrating to the new override scheme.")}super(...e)}}}setContext({context:e},t){this.wire.sendAction("interop-broker-set-context").catch((e=>{}));const n=this.getClientState(t);if(!n||!n.contextGroupId)throw n?new Error("You must join a context group before you can set context."):new Error(`Client with Identity: ${t.uuid} ${t.name} not in Client State Map`);{const{contextGroupId:t}=n;this.setContextForGroup({context:e},t)}}setContextForGroup({context:e},t){this.wire.sendAction("interop-broker-set-context-for-group").catch((e=>{}));const n=this.contextGroupsById.get(t);if(!n)throw new Error(`Unable to set context for context group that isn't in the context group mapping: ${t}.`);const i=wr.checkContextIntegrity(e);if(!1===i.isValid)throw new Error(`Failed to set Context - bad Context. Reason: ${i.reason}. Context: ${JSON.stringify(e)}`);const r=e.type;n.set(r,e),this.lastContextMap.set(t,r);Array.from(this.interopClients.values()).filter((e=>e.contextGroupId===t)).forEach((t=>{for(const[,n]of t.contextHandlers)wr.isContextTypeCompatible(r,n.contextType)&&this.invokeContextHandler(t.clientIdentity,n.handlerId,e)}))}getCurrentContext(e,t){this.wire.sendAction("interop-broker-get-current-context").catch((e=>{}));const n=this.getClientState(t);if(!n?.contextGroupId)throw new Error("You must be a member of a context group to call getCurrentContext");const{contextGroupId:i}=n,r=this.contextGroupsById.get(i),o=this.lastContextMap.get(i),s=e?.contextType??o;return r&&s?r.get(s):void 0}async joinContextGroup({contextGroupId:e,target:t},n){if(this.wire.sendAction("interop-broker-join-context-group").catch((e=>{})),this.sessionContextGroupMap.has(e))throw new Error(dr.BROKER_ERRORS.joinSessionContextGroupWithJoinContextGroup);if(t){wr.hasEndpointId(t)&&await this.addClientToContextGroup({contextGroupId:e},t);try{const n=this.channel.connections.filter((e=>e.uuid===t.uuid&&e.name===t.name));if(!n.length)throw new Error(`Given Identity ${t.uuid} ${t.name} is not connected to the Interop Broker.`);n.length>1&&console.warn(`More than one connection found for identity ${t.uuid} ${t.name}`);const i=[];for(const t of n)i.push(this.addClientToContextGroup({contextGroupId:e},t));await Promise.all(i)}catch(e){throw new Error(e)}}else await this.addClientToContextGroup({contextGroupId:e},n)}async addClientToContextGroup({contextGroupId:e},t){this.wire.sendAction("interop-broker-add-client-to-context-group").catch((e=>{}));const n=this.getClientState(t);if(!n)throw new Error(`Client with Identity: ${t.uuid} ${t.name} not in Client State Map`);if(!this.getContextGroups().find((t=>t.id===e)))throw new Error(`Attempting to join a context group that does not exist: ${e}. You may only join existing context groups.`);if(n.contextGroupId!==e){n.contextGroupId=e,await this.setCurrentContextGroupInClientOptions(t,e);const i=this.contextGroupsById.get(e);for(const[,e]of n.contextHandlers){const{contextType:n,handlerId:r}=e;if(void 0===n)i.forEach(((e,n)=>{this.invokeContextHandler(t,r,e)}));else if(i.has(n)){const e=i.get(n);e&&this.invokeContextHandler(t,r,e)}}}}async removeFromContextGroup({target:e},t){if(this.wire.sendAction("interop-broker-remove-from-context-group").catch((e=>{})),e){wr.hasEndpointId(e)&&await this.removeClientFromContextGroup(e);try{const t=this.channel.connections.filter((t=>t.uuid===e.uuid&&t.name===e.name));if(!t.length)throw new Error(`No connection found for given Identity ${e.uuid} ${e.name}`);t.length>1&&console.warn(`More than one connection found for identity ${e.uuid} ${e.name}`);const n=[];for(const e of t)n.push(this.removeClientFromContextGroup(e));await Promise.all(n)}catch(e){throw new Error(e)}}else await this.removeClientFromContextGroup(t)}async removeClientFromContextGroup(e){this.wire.sendAction("interop-broker-remove-client-from-context-group").catch((e=>{}));const t=this.getClientState(e);t&&(t.contextGroupId=void 0),await this.setCurrentContextGroupInClientOptions(e,null)}getContextGroups(){return this.wire.sendAction("interop-broker-get-context-groups").catch((e=>{})),or(this,nr,"f").map((e=>({...e})))}getInfoForContextGroup({contextGroupId:e}){return this.wire.sendAction("interop-broker-get-info-for-context-group").catch((e=>{})),this.getContextGroups().find((t=>t.id===e))}getAllClientsInContextGroup({contextGroupId:e}){this.wire.sendAction("interop-broker-get-all-clients-in-context-group").catch((e=>{}));return Array.from(this.interopClients.values()).filter((t=>t.contextGroupId===e)).map((e=>e.clientIdentity))}async handleFiredIntent(e,t){const n=(0,dr.generateOverrideWarning)("fdc3.raiseIntent","InteropBroker.handleFiredIntent",t,"interopClient.fireIntent");throw console.warn(n),new Error(dr.BROKER_ERRORS.fireIntent)}async setIntentTarget(e,t){this.wire.sendAction("interop-broker-set-intent-target").catch((e=>{}));const n=this.intentClientMap.get(t.name),i=`intent-handler-${e.name}`;if(n){const t=n.get(i);if(t){if(t.pendingIntents.push(e),t.clientIdentity&&t.isReady){const{clientIdentity:e,pendingIntents:n}=t;try{const r=n[n.length-1];await this.invokeIntentHandler(e,i,r),t.pendingIntents=[]}catch(n){console.error(`Error invoking intent handler for client ${e.uuid}/${e.name}/${e.endpointId}`),t.isReady=!1}}}else n.set(i,{isReady:!1,pendingIntents:[e]})}else{this.intentClientMap.set(t.name,new Map);const n=this.intentClientMap.get(t.name);n&&n.set(i,{isReady:!1,pendingIntents:[e]})}}async handleInfoForIntent(e,t){const n=(0,dr.generateOverrideWarning)("fdc3.findIntent","InteropBroker.handleInfoForIntent",t,"interopClient.getInfoForIntent");throw console.warn(n),new Error(dr.BROKER_ERRORS.getInfoForIntent)}async handleInfoForIntentsByContext(e,t){const n=(0,dr.generateOverrideWarning)("fdc3.findIntentsByContext","InteropBroker.handleInfoForIntentsByContext",t,"interopClient.getInfoForIntentsByContext");throw console.warn(n),new Error(dr.BROKER_ERRORS.getInfoForIntentsByContext)}async handleFiredIntentForContext(e,t){const n=(0,dr.generateOverrideWarning)("fdc3.raiseIntentForContext","InteropBroker.handleFiredIntentForContext",t,"interopClient.fireIntentForContext");throw console.warn(n),new Error(dr.BROKER_ERRORS.fireIntentForContext)}async clientDisconnected(e){}async fdc3HandleOpen({app:e,context:t},n){const i=(0,dr.generateOverrideWarning)("fdc3.open","InteropBroker.fdc3HandleOpen",n);throw console.warn(i),new Error(dr.BROKER_ERRORS.fdc3Open)}async fdc3HandleFindInstances(e,t){const n=(0,dr.generateOverrideWarning)("fdc3.open","InteropBroker.fdc3HandleFindInstances",t);throw console.warn(n),new Error(dr.BROKER_ERRORS.fdc3FindInstances)}async fdc3HandleGetAppMetadata(e,t){const n=(0,dr.generateOverrideWarning)("fdc3.getAppMetadata","InteropBroker.fdc3HandleGetAppMetadata",t);throw console.warn(n),new Error(dr.BROKER_ERRORS.fdc3GetAppMetadata)}async invokeContextHandler(e,t,n){const i=await this.getProvider();try{await i.dispatch(e,t,n)}catch(i){console.error(`Error invoking context handler ${t} for context type ${n.type} in client ${e.uuid}/${e.name}/${e.endpointId}`,i)}}async invokeIntentHandler(e,t,n){const i=await this.getProvider();await i.dispatch(e,t,n)}async fdc3HandleGetInfo(e,t){const{fdc3Version:n}=e;return{fdc3Version:n,...or(this,tr,"f"),optionalFeatures:{OriginatingAppMetadata:!1,UserChannelMembershipAPIs:!0},appMetadata:{appId:"",instanceId:""}}}async getAllClientInfo(){return(await this.getProvider()).getAllClientInfo()}decorateSnapshot(e){return{...e,interopSnapshotDetails:{contextGroupStates:this.getContextGroupStates()}}}applySnapshot(e,t){const n=e?.interopSnapshotDetails?.contextGroupStates;n&&(t?.closeExistingWindows||this.updateExistingClients(n),this.rehydrateContextGroupStates(n))}updateExistingClients(e){this.interopClients.forEach((t=>{const{clientIdentity:n,contextGroupId:i,contextHandlers:r}=t;if(i){const t=e[i];for(const[,e]of Object.entries(t))r.forEach((t=>{const{handlerId:i,contextType:r}=t;wr.isContextTypeCompatible(e.type,r)&&this.invokeContextHandler(n,i,e)}))}}))}getContextGroupStates(){return wr.toObject(this.contextGroupsById)}rehydrateContextGroupStates(e){const t=Object.entries(e);for(const[e,n]of t){const t=Object.entries(n);for(const[n,i]of t)if(this.contextGroupsById.has(e)){this.contextGroupsById.get(e).set(n,i)}else console.warn(`Attempting to set a context group that isn't in the context group mapping. Skipping context group rehydration for: ${e}`)}}contextHandlerRegistered({contextType:e,handlerId:t},n){const i={contextType:e,handlerId:t},r=this.getClientState(n);if(r?.contextHandlers.set(t,i),r&&r.contextGroupId){const{contextGroupId:i}=r,o=this.contextGroupsById.get(i);if(void 0===e)o.forEach(((e,i)=>{this.invokeContextHandler(n,t,e)}));else if(o.has(e)){const i=o.get(e);i&&this.invokeContextHandler(n,t,i)}}}async intentHandlerRegistered(e,t){const{handlerId:n}=e,i=this.intentClientMap.get(t.name),r=i?.get(n);if(i)if(r){const{pendingIntents:e}=r;r.clientIdentity=t,r.isReady=!0;try{if(e.length>0){const i=e[e.length-1];await this.invokeIntentHandler(t,n,i),r.pendingIntents=[]}}catch(e){console.error(`Error invoking intent handler: ${n} for client ${t.uuid}/${t.name}/${t.endpointId}`)}}else i.set(n,{isReady:!0,pendingIntents:[],clientIdentity:t});else{this.intentClientMap.set(t.name,new Map);const e=this.intentClientMap.get(t.name);e&&e.set(n,{isReady:!0,pendingIntents:[],clientIdentity:t})}}removeContextHandler({handlerId:e},t){const n=this.getClientState(t);n&&n.contextHandlers.delete(e)}handleJoinSessionContextGroup({sessionContextGroupId:e},t){try{if(!e)throw new Error("Failed to join session context group: must specify group id.");const n=this.sessionContextGroupMap.get(e);if(n)n.registerNewClient(t);else{const n=new cr.default(this.channel,e);n.registerNewClient(t),this.sessionContextGroupMap.set(e,n)}return{hasConflict:this.contextGroupsById.has(e)}}catch(e){throw new Error(e)}}getClientState(e){return this.interopClients.get(e.endpointId)}static toObject(e){const t=Object.fromEntries(e),n={};return Object.entries(t).forEach((([e,t])=>{const i=Object.fromEntries(t);n[e]=i})),n}static hasEndpointId(e){return void 0!==e.endpointId}static isContextTypeCompatible(e,t){return void 0===t||e===t}setContextGroupMap(){for(const e of this.getContextGroups())this.contextGroupsById.set(e.id,new Map)}async setCurrentContextGroupInClientOptions(e,t){try{const n=await this.fin.System.getEntityInfo(e.uuid,e.name);let i;"view"===n.entityType?i=await this.fin.View.wrap(e):"window"===n.entityType&&(i=await this.fin.Window.wrap(e)),i&&await i.updateOptions({interop:{currentContextGroup:t}})}catch(e){}}async setupChannelProvider(){try{const e=await this.getProvider();this.channel=e,this.wireChannel(e)}catch(e){throw new Error(`Error setting up Interop Broker Channel Provider: ${e}`)}}wireChannel(e){e.onConnection((async(e,t)=>{if(!await this.isConnectionAuthorized(e,t))throw new Error(`Connection not authorized for ${e.uuid}, ${e.name}`);if(!e.endpointId)throw new Error("Version too old to be compatible with Interop. Please upgrade your runtime to a more recent version.");const n={contextGroupId:void 0,contextHandlers:new Map,clientIdentity:e};t?.currentContextGroup&&this.contextGroupsById.has(t.currentContextGroup)&&(n.contextGroupId=t?.currentContextGroup),this.interopClients.set(e.endpointId,n)})),e.onDisconnection((e=>{this.interopClients.delete(e.endpointId);const t=this.intentClientMap.get(e.name);t&&e.uuid===this.fin.me.uuid&&t.forEach((e=>{e.isReady=!1})),this.sessionContextGroupMap.forEach((t=>{t.onDisconnection(e)})),this.clientDisconnected(e)})),e.beforeAction((async(e,t,n)=>{if(!await this.isActionAuthorized(e,t,n))throw new Error(`Action (${e}) not authorized for ${n.uuid}, ${n.name}`);this.logging?.beforeAction?.enabled&&console.log(e,t,n)})),e.afterAction(((e,t,n)=>{if(this.logging?.afterAction?.enabled){const i=t?[e,t,n]:[e,n];console.log(...i)}})),e.register("setContext",this.setContext.bind(this)),e.register("fireIntent",this.handleFiredIntent.bind(this)),e.register("getCurrentContext",this.getCurrentContext.bind(this)),e.register("getInfoForIntent",this.handleInfoForIntent.bind(this)),e.register("getInfoForIntentsByContext",this.handleInfoForIntentsByContext.bind(this)),e.register("fireIntentForContext",this.handleFiredIntentForContext.bind(this)),e.register("getContextGroups",this.getContextGroups.bind(this)),e.register("joinContextGroup",this.joinContextGroup.bind(this)),e.register("removeFromContextGroup",this.removeFromContextGroup.bind(this)),e.register("getAllClientsInContextGroup",this.getAllClientsInContextGroup.bind(this)),e.register("getInfoForContextGroup",this.getInfoForContextGroup.bind(this)),e.register("contextHandlerRegistered",this.contextHandlerRegistered.bind(this)),e.register("intentHandlerRegistered",this.intentHandlerRegistered.bind(this)),e.register("removeContextHandler",this.removeContextHandler.bind(this)),e.register("sessionContextGroup:createIfNeeded",this.handleJoinSessionContextGroup.bind(this)),e.register("fdc3Open",this.fdc3HandleOpen.bind(this)),e.register("fdc3v2FindIntentsByContext",this.handleInfoForIntentsByContext.bind(this)),e.register("fdc3FindInstances",this.fdc3HandleFindInstances.bind(this)),e.register("fdc3GetAppMetadata",this.fdc3HandleGetAppMetadata.bind(this)),e.register("fdc3v2GetInfo",(async(e,t)=>this.fdc3HandleGetInfo.bind(this)(e,t))),e.register("createPrivateChannelProvider",(async e=>{const{channelId:t}=e,n=await this.fin.InterApplicationBus.Channel.create(t),i=lr.PrivateChannelProvider.init(n,t,(e=>{this.privateChannelProviderMap.delete(e)}));this.privateChannelProviderMap.set(t,i)})),e.register("isIdUsedByPrivateChannel",(async e=>{const{channelId:t}=e;return this.privateChannelProviderMap.has(t)}))}isConnectionAuthorized(e,t){return this.wire.sendAction("interop-broker-is-connection-authorized").catch((e=>{})),Promise.resolve(!0)}isActionAuthorized(e,t,n){return this.wire.sendAction("interop-broker-is-action-authorized").catch((e=>{})),Promise.resolve(!0)}}Ji.InteropBroker=wr,tr=new WeakMap,nr=new WeakMap,ir=new WeakMap,wr.checkContextIntegrity=dr.checkContextIntegrity;var yr,fr={},gr={},mr=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n},vr=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)};Object.defineProperty(gr,"__esModule",{value:!0});const Cr=p,br=Yi;class Ir extends Cr.Base{constructor(e,t,n){super(e),yr.set(this,void 0),this.id=n,mr(this,yr,t,"f")}async setContext(e){this.wire.sendAction("interop-session-context-group-set-context").catch((e=>{}));return(await vr(this,yr,"f")).dispatch(`sessionContextGroup:setContext-${this.id}`,{sessionContextGroupId:this.id,context:e})}async getCurrentContext(e){this.wire.sendAction("interop-session-context-group-get-context").catch((e=>{}));return(await vr(this,yr,"f")).dispatch(`sessionContextGroup:getContext-${this.id}`,{sessionContextGroupId:this.id,type:e})}async addContextHandler(e,t){if(this.wire.sendAction("interop-session-context-group-add-handler").catch((e=>{})),"function"!=typeof e)throw new Error("Non-function argument passed to the first parameter 'handler'. Be aware that the argument order does not match the FDC3 standard.");const n=await vr(this,yr,"f");let i;return i=t?`sessionContextHandler:invoke-${this.id}-${t}-${(0,br.generateId)()}`:`sessionContextHandler:invoke-${this.id}`,n.register(i,(0,br.wrapContextHandler)(e,i)),await n.dispatch(`sessionContextGroup:handlerAdded-${this.id}`,{handlerId:i,contextType:t}),{unsubscribe:await this.createUnsubscribeCb(i)}}async createUnsubscribeCb(e){const t=await vr(this,yr,"f");return async()=>{t.remove(e),await t.dispatch(`sessionContextGroup:handlerRemoved-${this.id}`,{handlerId:e})}}getUserInstance(){return{id:this.id,setContext:(0,br.wrapInTryCatch)(this.setContext.bind(this),"Failed to set context: "),getCurrentContext:(0,br.wrapInTryCatch)(this.getCurrentContext.bind(this),"Failed to get context: "),addContextHandler:(0,br.wrapInTryCatch)(this.addContextHandler.bind(this),"Failed to add context handler: ")}}}gr.default=Ir,yr=new WeakMap;var Er,xr,Ar,Pr=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n},Mr=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)},_r=h&&h.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(fr,"__esModule",{value:!0}),fr.InteropClient=void 0;const Or=p,Sr=_r(gr),Rr=Yi;class Fr extends Or.Base{constructor(e,t,n){super(e),Er.set(this,void 0),xr.set(this,void 0),Ar.set(this,void 0),Pr(this,xr,new Map,"f"),Pr(this,Er,t,"f"),Pr(this,Ar,n,"f")}async setContext(e){this.wire.sendAction("interop-client-set-context").catch((e=>{}));return(await Mr(this,Er,"f")).dispatch("setContext",{context:e})}async addContextHandler(e,t){if(this.wire.sendAction("interop-client-add-context-handler").catch((e=>{})),"function"!=typeof e)throw new Error("Non-function argument passed to the first parameter 'handler'. Be aware that the argument order does not match the FDC3 standard.");const n=await Mr(this,Er,"f");let i;i=t?`invokeContextHandler-${t}-${(0,Rr.generateId)()}`:"invokeContextHandler";const r=(0,Rr.wrapContextHandler)(e,i);return n.register(i,r),await n.dispatch("contextHandlerRegistered",{handlerId:i,contextType:t}),{unsubscribe:async()=>{n.remove(i),await n.dispatch("removeContextHandler",{handlerId:i})}}}async getContextGroups(){this.wire.sendAction("interop-client-get-context-groups").catch((e=>{}));return(await Mr(this,Er,"f")).dispatch("getContextGroups")}async joinContextGroup(e,t){this.wire.sendAction("interop-client-join-context-group").catch((e=>{}));const n=await Mr(this,Er,"f");if(!e)throw new Error("No contextGroupId specified for joinContextGroup.");return n.dispatch("joinContextGroup",{contextGroupId:e,target:t})}async removeFromContextGroup(e){this.wire.sendAction("interop-client-remove-from-context-group").catch((e=>{}));return(await Mr(this,Er,"f")).dispatch("removeFromContextGroup",{target:e})}async getAllClientsInContextGroup(e){this.wire.sendAction("interop-client-get-all-clients-in-context-group").catch((e=>{}));const t=await Mr(this,Er,"f");if(!e)throw new Error("No contextGroupId specified for getAllClientsInContextGroup.");return t.dispatch("getAllClientsInContextGroup",{contextGroupId:e})}async getInfoForContextGroup(e){this.wire.sendAction("interop-client-get-info-for-context-group").catch((e=>{}));const t=await Mr(this,Er,"f");if(!e)throw new Error("No contextGroupId specified for getInfoForContextGroup.");return t.dispatch("getInfoForContextGroup",{contextGroupId:e})}async fireIntent(e){this.wire.sendAction("interop-client-fire-intent").catch((e=>{}));return(await Mr(this,Er,"f")).dispatch("fireIntent",e)}async registerIntentHandler(e,t,n){this.wire.sendAction("interop-client-register-intent-handler").catch((e=>{}));const i=await Mr(this,Er,"f"),r=`intent-handler-${t}`,o=(0,Rr.wrapIntentHandler)(e,r);try{await i.register(r,o),await i.dispatch("intentHandlerRegistered",{handlerId:r,...n})}catch(e){throw new Error("Unable to register intent handler")}return{unsubscribe:async()=>{i.remove(r)}}}async getCurrentContext(e){this.wire.sendAction("interop-client-get-current-context").catch((e=>{}));return(await Mr(this,Er,"f")).dispatch("getCurrentContext",{contextType:e})}async getInfoForIntent(e){this.wire.sendAction("interop-client-get-info-for-intent").catch((e=>{}));return(await Mr(this,Er,"f")).dispatch("getInfoForIntent",e)}async getInfoForIntentsByContext(e){this.wire.sendAction("interop-client-get-info-for-intents-by-context").catch((e=>{}));return(await Mr(this,Er,"f")).dispatch("getInfoForIntentsByContext",e)}async fireIntentForContext(e){this.wire.sendAction("interop-client-fire-intent-for-context").catch((e=>{}));return(await Mr(this,Er,"f")).dispatch("fireIntentForContext",e)}async joinSessionContextGroup(e){try{const t=Mr(this,xr,"f").get(e);if(t)return t.getUserInstance();const n=await Mr(this,Er,"f"),{hasConflict:i}=await n.dispatch("sessionContextGroup:createIfNeeded",{sessionContextGroupId:e});i&&console.warn(`A (non-session) context group with the name "${e}" already exists. If you are trying to join a Context Group, call joinContextGroup instead.`);const r=new Sr.default(this.wire,Mr(this,Er,"f"),e);return Mr(this,xr,"f").set(e,r),r.getUserInstance()}catch(t){throw console.error(`Error thrown trying to create Session Context Group with id "${e}": ${t}`),t}}async onDisconnection(e){this.wire.sendAction("interop-client-add-ondisconnection-listener").catch((e=>{}));return(await Mr(this,Er,"f")).onDisconnection((t=>{const{uuid:n}=t;e({type:"interop-broker",topic:"disconnected",brokerName:n})}))}getFDC3Sync(e){return Mr(this,Ar,"f").call(this,e,this,this.wire)}async getFDC3(e){return this.getFDC3Sync(e)}static async ferryFdc3Call(e,t,n){return(await Mr(e,Er,"f")).dispatch(t,n||null)}}fr.InteropClient=Fr,Er=new WeakMap,xr=new WeakMap,Ar=new WeakMap;var jr={};Object.defineProperty(jr,"__esModule",{value:!0}),jr.overrideCheck=jr.checkFDC32Overrides=jr.getDefaultViewFdc3VersionFromAppInfo=void 0;const Lr=Ji;function kr(e){return["fdc3HandleFindInstances","handleInfoForIntent","handleInfoForIntentsByContext","fdc3HandleGetAppMetadata","fdc3HandleGetInfo","fdc3HandleOpen","handleFiredIntent","handleFiredIntentForContext"].filter((t=>e[t]===Lr.InteropBroker.prototype[t]))}jr.getDefaultViewFdc3VersionFromAppInfo=function({manifest:e,initialOptions:t}){const n=e?.platform?.defaultViewOptions?.fdc3InteropApi??t.defaultViewOptions?.fdc3InteropApi;return["1.2","2.0"].includes(n??"")?n:void 0},jr.checkFDC32Overrides=kr,jr.overrideCheck=function(e,t){if(t&&"2.0"===t){const t=kr(e);t.length>0&&console.warn(`WARNING: FDC3 2.0 has been set as a default option for Views in this Platform, but the required InteropBroker APIs for FDC3 2.0 compliance have not all been overridden.\nThe following APIs need to be overridden:\n${t.join("\n")}`)}};var Tr={},$r={},Br={},Gr={},Wr={},Nr=h&&h.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,r)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),Dr=h&&h.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),Hr=h&&h.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&Nr(t,e,n);return Dr(t,e),t};Object.defineProperty(Wr,"__esModule",{value:!0}),Wr.PrivateChannelClient=void 0;const Vr=Hr(Yi);Wr.PrivateChannelClient=class{constructor(e,t){this.id=t,this.client=e,this.listeners=new Map}async broadcast(e){return this.client.dispatch("broadcast",{context:e})}async getCurrentContext(e){return this.client.dispatch("getCurrentContext",{contextType:e})}async addContextListener(e,t){if("function"!=typeof t)throw new Error("Non-function argument passed to the second parameter 'handler'. Be aware that the argument order does not match the FDC3 standard.");let n;n=e?`contextHandler:invoke-${this.id}-${e}-${Vr.generateId()}`:`contextHandler:invoke-${this.id}-${Vr.generateId()}`,this.client.register(n,Vr.wrapContextHandler(t,n));const i={unsubscribe:await this.createContextUnsubscribeCb(n)};return this.listeners.set(n,i),await this.client.dispatch("contextHandlerAdded",{handlerId:n,contextType:e}),i}createNonStandardUnsubscribeCb(e){return async()=>{this.client.remove(e),this.listeners.delete(e),await this.client.dispatch("nonStandardHandlerRemoved",{handlerId:e})}}createContextUnsubscribeCb(e){return async()=>{this.client.remove(e),this.listeners.delete(e),await this.client.dispatch("contextHandlerRemoved",{handlerId:e})}}onAddContextListener(e){const t=`onContextHandlerAdded:invoke-${this.id}-${Vr.generateId()}`;this.client.register(t,e);const n={unsubscribe:this.createNonStandardUnsubscribeCb(t)};return this.listeners.set(t,n),this.client.dispatch("onAddContextHandlerAdded",{handlerId:t}),n}onDisconnect(e){const t=`onDisconnect:invoke-${this.id}-${Vr.generateId()}`;this.client.register(t,e);const n={unsubscribe:this.createNonStandardUnsubscribeCb(t)};return this.listeners.set(t,n),this.client.dispatch("onDisconnectHandlerAdded",{handlerId:t}),n}onUnsubscribe(e){const t=`onUnsubscribe:invoke-${this.id}-${Vr.generateId()}`;this.client.register(t,e);const n={unsubscribe:this.createNonStandardUnsubscribeCb(t)};return this.listeners.set(t,n),this.client.dispatch("onUnsubscribeHandlerAdded",{handlerId:t}),n}async cleanUpAllSubs(){Array.from(this.listeners.keys()).forEach((e=>{this.client.remove(e),this.listeners.delete(e)}))}async disconnect(){try{await this.client.dispatch("clientDisconnecting"),await this.cleanUpAllSubs(),await this.client.disconnect()}catch(e){throw new Error(e.message)}}};var Ur={},zr={},Kr=h&&h.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(zr,"__esModule",{value:!0}),zr.createV1Channel=void 0;const Jr=Kr(i);zr.createV1Channel=e=>({id:e.id,type:"app",broadcast:e.setContext,getCurrentContext:async t=>{const n=await e.getCurrentContext(t);return void 0===n?null:n},addContextListener:(t,n)=>{let i,r;"function"==typeof t?(console.warn("addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)"),i=t):(i=n,"string"==typeof t&&(r=t));const o=(async()=>{let t=!0;const n=await e.getCurrentContext(r);return e.addContextHandler(((e,r)=>{if(!t||(t=!1,!(0,Jr.default)(n,e)))return i(e,r)}),r)})();return{...o,unsubscribe:()=>o.then((e=>e.unsubscribe()))}}}),Object.defineProperty(Ur,"__esModule",{value:!0}),Ur.createV2Channel=void 0;const qr=zr;Ur.createV2Channel=e=>{const t=(0,qr.createV1Channel)(e);return{...t,addContextListener:async(...e)=>t.addContextListener(...e)}},function(e){var t=h&&h.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.getIntentResolution=e.isChannel=e.isContext=e.connectPrivateChannel=e.buildPrivateChannelObject=e.ChannelError=e.ResultError=e.UnsupportedChannelApiError=e.getUnsupportedChannelApis=void 0;const n=Yi,r=Wr;t(i);const o=Ur;e.getUnsupportedChannelApis=e=>({addContextListener:()=>{throw new s("Channel.addContextListener",e)},broadcast:()=>{throw new s("Channel.broadcast",e)},getCurrentContext:()=>{throw new s("Channel.getCurrentContext",e)}});class s extends Error{constructor(e,t="System"){super(e),this.message=`Calling ${e} on an instance of a ${t} Channel returned by fdc3.get${t}Channels is not supported. If you would like to use a ${t} Channel, please use fdc3.joinChannel, fdc3.addContextListener, and fdc3.broadcast instead.`}}var a;e.UnsupportedChannelApiError=s,function(e){e.NoResultReturned="NoResultReturned",e.IntentHandlerRejected="IntentHandlerRejected"}(a=e.ResultError||(e.ResultError={})),function(e){e.NoChannelFound="NoChannelFound",e.AccessDenied="AccessDenied",e.CreationFailed="CreationFailed"}(e.ChannelError||(e.ChannelError={}));e.buildPrivateChannelObject=e=>{let t=!1;const n=()=>{if(t)throw new Error("Private Channel Client has been disconnected from the Private Channel")};return{id:e.id,type:"private",broadcast:async t=>(n(),e.broadcast(t)),getCurrentContext:async t=>(n(),e.getCurrentContext(t)),addContextListener:async(t,i)=>{n();let r=i,o=t;"function"==typeof t&&(console.warn("addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)"),r=t,o=null);return e.addContextListener(o,r)},onAddContextListener:t=>(n(),e.onAddContextListener(t)),disconnect:async()=>(n(),t=!0,e.disconnect()),onDisconnect:t=>(n(),e.onDisconnect(t)),onUnsubscribe:t=>(n(),e.onUnsubscribe(t))}};e.connectPrivateChannel=async t=>{try{const n=await fin.InterApplicationBus.Channel.connect(t),i=new r.PrivateChannelClient(n,t);return(0,e.buildPrivateChannelObject)(i)}catch(e){throw new Error(`Private Channel with id: ${t} doesn't exist`)}};e.isContext=e=>{if(e&&"object"==typeof e&&"type"in e){const{type:t}=e;return"string"==typeof t}return!1};e.isChannel=e=>{if(e&&"object"==typeof e&&"type"in e&&"id"in e){const{type:t,id:n}=e;return"string"==typeof t&&"string"==typeof n&&("app"===t||"private"===t)}return!1};e.getIntentResolution=async(t,i,r,s)=>{const c=(0,n.generateId)();let d=!1;const h=r?{target:r,intentResolutionResultId:c}:{intentResolutionResultId:c},l=s?{name:s,context:i,metadata:h}:{...i,metadata:h},u=new Promise(((e,n)=>{fin.InterApplicationBus.subscribe({uuid:"*"},c,(t=>{e(t)})).catch((()=>{"other"===t.wire.environment.type&&e(void 0),n(new Error("getResult is not supported in this environment"))}))}));u.then((()=>{d=!0})).catch((()=>{d=!0}));const p=async()=>{if(!d)return;let n=await u;if(d&&!n)return;if("object"!=typeof n)throw new Error(a.NoResultReturned);const{error:i}=n;if(i)throw new Error(a.IntentHandlerRejected);if((0,e.isChannel)(n)){const{id:i,type:r}=n;switch(r){case"private":n=await(0,e.connectPrivateChannel)(i);break;case"app":{const e=await t.joinSessionContextGroup(i);n=(0,o.createV2Channel)(e);break}}}else if(!(0,e.isContext)(n))throw new Error(a.NoResultReturned);return n},w=s?await t.fireIntent(l):await t.fireIntentForContext(l);return"object"!=typeof w?{source:{appId:"",instanceId:""},intent:"",version:"2.0",getResult:p}:{...w,getResult:p}}}(Gr);var Yr,Zr=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)},Qr=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n},Xr=h&&h.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Br,"__esModule",{value:!0}),Br.FDC3ModuleBase=void 0;const eo=Gr,to=Yi,no=fr,io=Xr(i);Br.FDC3ModuleBase=class{get client(){return Zr(this,Yr,"f").call(this)}get fin(){return this.wire.getFin()}constructor(e,t){this.wire=t,Yr.set(this,void 0),Qr(this,Yr,e,"f")}async broadcast(e){return this.wire.sendAction("fdc3-broadcast").catch((e=>{})),this.client.setContext(e)}async _open(e,t){this.wire.sendAction("fdc3-open").catch((e=>{}));try{return await no.InteropClient.ferryFdc3Call(this.client,"fdc3Open",{app:e,context:t})}catch(e){const t=e.message===to.BROKER_ERRORS.fdc3Open?"ResolverUnavailable":e.message;throw new Error(t)}}async _getChannels(){return(await this.client.getContextGroups()).map((e=>({...e,type:"system",...(0,eo.getUnsupportedChannelApis)()})))}async getOrCreateChannel(e,t){this.wire.sendAction("fdc3-get-or-create-channel").catch((e=>{}));if(await no.InteropClient.ferryFdc3Call(this.client,"isIdUsedByPrivateChannel",{channelId:e}))throw new Error(eo.ChannelError.AccessDenied);const n=(await this._getChannels()).find((t=>t.id===e));if(n)return{...n,type:"system",...(0,eo.getUnsupportedChannelApis)()};try{return t(await this.client.joinSessionContextGroup(e))}catch(e){throw console.error(e.message),new Error(eo.ChannelError.CreationFailed)}}async getSystemChannels(){return this.wire.sendAction("fdc3-get-system-channels").catch((e=>{})),this._getChannels()}async joinChannel(e){this.wire.sendAction("fdc3-join-channel").catch((e=>{}));try{return await this.client.joinContextGroup(e)}catch(e){if(e.message===to.BROKER_ERRORS.joinSessionContextGroupWithJoinContextGroup?console.error("The Channel you have tried to join is an App Channel. Custom Channels can only be defined by the Interop Broker through code or manifest configuration. Please use getOrCreateChannel."):console.error(e.message),e.message.startsWith("Attempting to join a context group that does not exist"))throw new Error(eo.ChannelError.NoChannelFound);throw new Error(eo.ChannelError.AccessDenied)}}async getCurrentChannel(){this.wire.sendAction("fdc3-get-current-channel").catch((e=>{}));const e=await this.getCurrentContextGroupInfo();return e?this.buildChannelObject(e):null}async leaveCurrentChannel(){return this.wire.sendAction("fdc3-leave-current-channel").catch((e=>{})),this.client.removeFromContextGroup()}async getCurrentContextGroupInfo(){const e=await this.client.getContextGroups(),t=e.map((async e=>this.client.getAllClientsInContextGroup(e.id))),n=(await Promise.all(t)).findIndex((e=>e.some((e=>{const{uuid:t,name:n}=e;return this.wire.me.uuid===t&&this.wire.me.name===n}))));return e[n]}async buildChannelObject(e){return{...e,type:"system",addContextListener:(...[e,t])=>{let n,i;"function"==typeof e?(console.warn("addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)"),n=e):(n=t,"string"==typeof e&&(i=e));const r=(async()=>{let e=!0;const t=await this.client.getCurrentContext(i);return this.client.addContextHandler(((i,r)=>{if(!e||(e=!1,!(0,io.default)(t,i)))return n(i,r)}),i)})();return{...r,unsubscribe:()=>r.then((e=>e.unsubscribe()))}},broadcast:this.broadcast.bind(this),getCurrentContext:async e=>{const t=await this.client.getCurrentContext(e);return void 0===t?null:t}}}},Yr=new WeakMap,Object.defineProperty($r,"__esModule",{value:!0}),$r.Fdc3Module=void 0;const ro=Yi,oo=Br,so=zr;class ao extends oo.FDC3ModuleBase{async open(e,t){await super._open(e,t)}addContextListener(e,t){let n;return this.wire.sendAction("fdc3-add-context-listener").catch((e=>{})),"function"==typeof e?(console.warn("addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)"),n=this.client.addContextHandler(e)):n=this.client.addContextHandler(t,null===e?void 0:e),{...n,unsubscribe:()=>n.then((e=>e.unsubscribe()))}}addIntentListener(e,t){this.wire.sendAction("fdc3-add-intent-listener").catch((e=>{}));const n=this.client.registerIntentHandler((e=>{const{context:n,metadata:i}=e,{metadata:r}=n,o=i?.intentResolutionResultId||r?.intentResolutionResultId;o&&this.fin.InterApplicationBus.publish(o,null).catch((()=>null)),t(e.context)}),e,{fdc3Version:"1.2"});return{...n,unsubscribe:()=>n.then((e=>e.unsubscribe()))}}async raiseIntent(e,t,n){this.wire.sendAction("fdc3-raise-intent").catch((e=>{}));const i=n?{name:e,context:t,metadata:{target:n}}:{name:e,context:t};try{return await this.client.fireIntent(i)}catch(e){const t=e.message===ro.BROKER_ERRORS.fireIntent?"ResolverUnavailable":e.message;throw new Error(t)}}async findIntent(e,t){this.wire.sendAction("fdc3-find-intent").catch((e=>{}));try{return await this.client.getInfoForIntent({name:e,context:t})}catch(e){const t=e.message===ro.BROKER_ERRORS.getInfoForIntent?"ResolverUnavailable":e.message;throw new Error(t)}}async findIntentsByContext(e){this.wire.sendAction("fdc3-find-intents-by-context").catch((e=>{}));try{return await this.client.getInfoForIntentsByContext(e)}catch(e){const t=e.message===ro.BROKER_ERRORS.getInfoForIntentsByContext?"ResolverUnavailable":e.message;throw new Error(t)}}async raiseIntentForContext(e,t){this.wire.sendAction("fdc3-raise-intent-for-context").catch((e=>{}));try{return await this.client.fireIntentForContext({...e,metadata:{target:t}})}catch(e){const t=e.message===ro.BROKER_ERRORS.fireIntentForContext?"ResolverUnavailable":e.message;throw new Error(t)}}async getOrCreateChannel(e){return super.getOrCreateChannel(e,so.createV1Channel)}getInfo(){this.wire.sendAction("fdc3-get-info").catch((e=>{}));return{providerVersion:this.wire.environment.getAdapterVersionSync(),provider:`openfin-${this.wire.me.uuid}`,fdc3Version:"1.2"}}}$r.Fdc3Module=ao;var co={};Object.defineProperty(co,"__esModule",{value:!0}),co.Fdc3Module2=void 0;const ho=Br,lo=Yi,uo=fr,po=Gr,wo=Wr,yo=Ur;class fo extends ho.FDC3ModuleBase{async open(e,t){return"string"==typeof e&&console.warn("Passing a string as the app parameter is deprecated, please use an AppIdentifier ({ appId: string; instanceId?: string })."),super._open(e,t)}async findInstances(e){this.wire.sendAction("fdc3-find-instances").catch((e=>{}));try{return await uo.InteropClient.ferryFdc3Call(this.client,"fdc3FindInstances",e)}catch(e){const t=e.message===lo.BROKER_ERRORS.fdc3FindInstances?"ResolverUnavailable":e.message;throw new Error(t)}}async getAppMetadata(e){this.wire.sendAction("fdc3-get-app-metadata").catch((e=>{}));try{return await uo.InteropClient.ferryFdc3Call(this.client,"fdc3GetAppMetadata",e)}catch(e){const t=e.message===lo.BROKER_ERRORS.fdc3GetAppMetadata?"ResolverUnavailable":e.message;throw new Error(t)}}async addContextListener(e,t){this.wire.sendAction("fdc3-add-context-listener").catch((e=>{}));const n=e=>t=>{const{contextMetadata:n,...i}=t,r=n?[{...i},n]:[t,null];e(...r)};let i=t,r=n(i);return"function"==typeof e?(console.warn("addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)"),i=e,r=n(i),this.client.addContextHandler(r)):this.client.addContextHandler(r,null===e?void 0:e)}async findIntent(e,t,n){this.wire.sendAction("fdc3-find-intent").catch((e=>{}));try{return await this.client.getInfoForIntent({name:e,context:t,metadata:{resultType:n}})}catch(e){const t=e.message===lo.BROKER_ERRORS.getInfoForIntent?"ResolverUnavailable":e.message;throw new Error(t)}}async findIntentsByContext(e,t){this.wire.sendAction("fdc3-find-intents-by-context").catch((e=>{}));const n=t?{context:e,metadata:{resultType:t}}:e;try{return await uo.InteropClient.ferryFdc3Call(this.client,"fdc3v2FindIntentsByContext",n)}catch(e){const t=e.message===lo.BROKER_ERRORS.getInfoForIntentsByContext?"ResolverUnavailable":e.message;throw new Error(t)}}async raiseIntent(e,t,n){this.wire.sendAction("fdc3-raise-intent").catch((e=>{}));try{return"string"==typeof n&&console.warn("Passing a string as the app parameter is deprecated, please use an AppIdentifier ({ appId: string; instanceId?: string })."),(0,po.getIntentResolution)(this.client,t,n,e)}catch(e){const t=e.message===lo.BROKER_ERRORS.fireIntent?"ResolverUnavailable":e.message;throw new Error(t)}}async raiseIntentForContext(e,t){this.wire.sendAction("fdc3-raise-intent-for-context").catch((e=>{}));try{return"string"==typeof t&&console.warn("Passing a string as the app parameter is deprecated, please use an AppIdentifier ({ appId: string; instanceId?: string })."),(0,po.getIntentResolution)(this.client,e,t)}catch(e){const t=e.message===lo.BROKER_ERRORS.fireIntent?"ResolverUnavailable":e.message;throw new Error(t)}}async addIntentListener(e,t){if(this.wire.sendAction("fdc3-add-intent-listener").catch((e=>{})),"string"!=typeof e)throw new Error("First argument must be an Intent name");return this.client.registerIntentHandler((async e=>{let n,i;const{context:r,metadata:o}=e,{contextMetadata:s,metadata:a,...c}=r,d=o?.intentResolutionResultId||a?.intentResolutionResultId;try{const e=a?{metadata:a,...c}:{...c};n=await t(e,s),i=n}catch(e){n=e,i={error:!0}}if(d&&this.fin.InterApplicationBus.publish(d,i).catch((()=>null)),n instanceof Error)throw new Error(n.message);return n}),e,{fdc3Version:"2.0"})}async getOrCreateChannel(e){return super.getOrCreateChannel(e,yo.createV2Channel)}async createPrivateChannel(){const e=(0,lo.generateId)();await uo.InteropClient.ferryFdc3Call(this.client,"createPrivateChannelProvider",{channelId:e});const t=await this.fin.InterApplicationBus.Channel.connect(e),n=new wo.PrivateChannelClient(t,e);return(0,po.buildPrivateChannelObject)(n)}async getUserChannels(){return(await this.client.getContextGroups()).map((e=>({...e,type:"user",...(0,po.getUnsupportedChannelApis)("User")})))}async getSystemChannels(){return console.warn("This API has been deprecated. Please use fdc3.getUserChannels instead."),super.getSystemChannels()}async joinUserChannel(e){return super.joinChannel(e)}async joinChannel(e){return console.warn("This API has been deprecated. Please use fdc3.joinUserChannel instead."),super.joinChannel(e)}async getCurrentChannel(){const e=await super.getCurrentChannel();return e?{...e,type:"user",broadcast:this.broadcast.bind(this)}:null}async getInfo(){return uo.InteropClient.ferryFdc3Call(this.client,"fdc3v2GetInfo",{fdc3Version:"2.0"})}}co.Fdc3Module2=fo,Object.defineProperty(Tr,"__esModule",{value:!0}),Tr.fdc3Factory=void 0;const go=$r,mo=co;Tr.fdc3Factory=(e,t,n)=>{switch(e){case"1.2":return new go.Fdc3Module((()=>t),n);case"2.0":return new mo.Fdc3Module2((()=>t),n);default:throw new Error(`Invalid FDC3 version provided: ${e}. Must be '1.2' or '2.0'`)}};var vo=h&&h.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(zi,"__esModule",{value:!0}),zi.InteropModule=void 0;const Co=vo(n),bo=Ki,Io=p,Eo=Ji,xo=fr,Ao=jr,Po=zn,Mo=Tr,_o=e=>new e,Oo="You have attempted to use or modify InteropBroker parameters, which is not allowed. You are likely using an older InteropBroker override scheme. Please consult our Interop docs for guidance on migrating to the new override scheme.";class So extends Io.Base{async init(e,t=_o){this.wire.sendAction("interop-init").catch((()=>{}));const n=await this.wire.environment.getInteropInfo(this.wire.getFin()),i=(0,bo.createUnusableObject)(Oo),r=(0,bo.createWarningObject)(Oo,(0,Co.default)(n)),o=async()=>{throw new Error(Oo)},s=Eo.InteropBroker.createClosedConstructor(this.wire,(()=>this.fin.InterApplicationBus.Channel.create(`interop-broker-${e}`)),n);let a;if(Array.isArray(t)){a=new((0,Po.overrideFromComposables)(...t)(s))(i,o,r)}else a=await t(s,i,o,r);return(0,Ao.overrideCheck)(a,n.fdc3Version),a}connectSync(e,t){return this.wire.sendAction("interop-connect-sync").catch((()=>{})),new xo.InteropClient(this.wire,this.wire.environment.whenReady().then((()=>this.fin.InterApplicationBus.Channel.connect(`interop-broker-${e}`,{payload:t}))),Mo.fdc3Factory)}}zi.InteropModule=So,function(e){var t=h&&h.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,r)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=h&&h.__exportStar||function(e,n){for(var i in e)"default"===i||Object.prototype.hasOwnProperty.call(n,i)||t(n,e,i)};Object.defineProperty(e,"__esModule",{value:!0}),n(zi,e),n(fr,e),n(Ji,e)}(Ui);var Ro={},Fo={},jo={},Lo={};Object.defineProperty(Lo,"__esModule",{value:!0}),Lo.getSnapshotSourceChannelName=void 0;Lo.getSnapshotSourceChannelName=e=>`snapshot-source-provider-${e.uuid}`;var ko,To,$o,Bo,Go,Wo=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n},No=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)};Object.defineProperty(jo,"__esModule",{value:!0}),jo.SnapshotSource=void 0;const Do=p,Ho=Lo,Vo=new Map;class Uo extends Do.Base{constructor(e,t){super(e),ko.set(this,void 0),To.set(this,(()=>(Vo.has(this.identity.uuid)||Vo.set(this.identity.uuid,{eventFired:null,clientPromise:null}),Vo.get(this.identity.uuid)))),$o.set(this,(()=>(No(this,To,"f").call(this).clientPromise||(No(this,To,"f").call(this).clientPromise=No(this,Bo,"f").call(this)),No(this,To,"f").call(this).clientPromise))),Bo.set(this,(async()=>{const e=(0,Ho.getSnapshotSourceChannelName)(this.identity);try{No(this,To,"f").call(this).eventFired||await No(this,Go,"f").call(this);const t=await this.fin.InterApplicationBus.Channel.connect(e,{wait:!1});return t.onDisconnection((()=>{No(this,To,"f").call(this).clientPromise=null,No(this,To,"f").call(this).eventFired=null})),t}catch(e){throw No(this,To,"f").call(this).clientPromise=null,new Error("The targeted SnapshotSource is not currently initialized. Await this object's ready() method.")}})),Go.set(this,(async()=>{const e=(0,Ho.getSnapshotSourceChannelName)(this.identity);let t,n;const i=new Promise(((e,i)=>{t=e,n=i}));No(this,To,"f").call(this).eventFired=i;const r=async i=>{try{i.channelName===e&&(t(),await this.fin.InterApplicationBus.Channel.removeListener("connected",r))}catch(e){n(e)}};await this.fin.InterApplicationBus.Channel.on("connected",r)})),Wo(this,ko,t,"f")}get identity(){return No(this,ko,"f")}async ready(){this.wire.sendAction("snapshot-source-ready").catch((e=>{}));try{await No(this,$o,"f").call(this)}catch(e){await No(this,To,"f").call(this).eventFired}}async getSnapshot(){this.wire.sendAction("snapshot-source-get-snapshot").catch((e=>{}));const e=await No(this,$o,"f").call(this),t=await e.dispatch("get-snapshot");return(await t).snapshot}async applySnapshot(e){this.wire.sendAction("snapshot-source-apply-snapshot").catch((e=>{}));return(await No(this,$o,"f").call(this)).dispatch("apply-snapshot",{snapshot:e})}}jo.SnapshotSource=Uo,ko=new WeakMap,To=new WeakMap,$o=new WeakMap,Bo=new WeakMap,Go=new WeakMap,Object.defineProperty(Fo,"__esModule",{value:!0}),Fo.SnapshotSourceModule=void 0;const zo=p,Ko=jo,Jo=Lo;class qo extends zo.Base{async init(e){if(this.wire.sendAction("snapshot-source-init").catch((e=>{})),"object"!=typeof e||"function"!=typeof e.getSnapshot||"function"!=typeof e.applySnapshot)throw new Error("you must pass in a valid SnapshotProvider");const t=await this.fin.InterApplicationBus.Channel.create((0,Jo.getSnapshotSourceChannelName)(this.fin.me));t.register("get-snapshot",(async()=>({snapshot:await e.getSnapshot()}))),t.register("apply-snapshot",(({snapshot:t})=>e.applySnapshot(t)))}wrapSync(e){return this.wire.sendAction("snapshot-source-wrap-sync").catch((e=>{})),new Ko.SnapshotSource(this.wire,e)}async wrap(e){return this.wire.sendAction("snapshot-source-wrap").catch((e=>{})),this.wrapSync(e)}}Fo.SnapshotSourceModule=qo,function(e){var t=h&&h.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,r)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=h&&h.__exportStar||function(e,n){for(var i in e)"default"===i||Object.prototype.hasOwnProperty.call(n,i)||t(n,e,i)};Object.defineProperty(e,"__esModule",{value:!0}),n(Fo,e),n(jo,e)}(Ro);var Yo,Zo,Qo,Xo,es={},ts={},ns={},is=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n},rs=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)};Object.defineProperty(ns,"__esModule",{value:!0}),ns.NotificationManagerInstance=void 0;const os=G;ns.NotificationManagerInstance=class{constructor(e,t){Yo.set(this,void 0),Zo.set(this,void 0),Qo.set(this,void 0),Xo.set(this,new os.Lazy((async()=>(await rs(this,Yo,"f").registerMessageHandler((e=>{if("notification-created"===e.action&&e.payload.managerId===rs(this,Qo,"f")){const{notificationId:t,properties:n,documentUrl:i,notificationIcon:r,badge:o,image:s}=e.payload;try{rs(this,Zo,"f")?.call(this,{properties:n,images:{image:s,icon:r,badge:o},url:i,notificationId:t})}catch(e){console.error("Failed to handle notification",e)}return!0}return!1})),!0)))),this.setNotificationHandler=async e=>{await rs(this,Xo,"f").getValue(),is(this,Zo,e,"f")},this.destroy=async()=>{await rs(this,Yo,"f").sendAction("destroy-notification-manager",{managerId:rs(this,Qo,"f")})},this.dispatch=async e=>{const{notificationId:t,type:n}=e;await rs(this,Yo,"f").sendAction("dispatch-notification-event",{notificationId:t,type:n})},is(this,Yo,e,"f"),is(this,Qo,t,"f")}},Yo=new WeakMap,Zo=new WeakMap,Qo=new WeakMap,Xo=new WeakMap,Object.defineProperty(ts,"__esModule",{value:!0}),ts.NotificationManagerModule=void 0;const ss=p,as=ns;class cs extends ss.Base{constructor(){super(...arguments),this.init=async()=>{const{payload:{data:{managerId:e}}}=await this.wire.sendAction("init-notification-manager");return new as.NotificationManagerInstance(this.wire,e)}}}ts.NotificationManagerModule=cs,function(e){var t=h&&h.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,r)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=h&&h.__exportStar||function(e,n){for(var i in e)"default"===i||Object.prototype.hasOwnProperty.call(n,i)||t(n,e,i)};Object.defineProperty(e,"__esModule",{value:!0}),n(ts,e),n(ns,e)}(es),Object.defineProperty(l,"__esModule",{value:!0});var ds=l.Fin=void 0;const hs=t,ls=u,us=ie(),ps=Z(),ws=de,ys=hn,fs=pn,gs=bn,ms=Sn,vs=q(),Cs=kn,bs=Vi,Is=Ui,Es=Ro,xs=es;class As extends hs.EventEmitter{constructor(e){super(),this.wire=e,this.System=new ls.System(e),this.Window=new us._WindowModule(e),this.Application=new ps.ApplicationModule(e),this.InterApplicationBus=new ws.InterApplicationBus(e),this.Clipboard=new ys.Clipboard(e),this.ExternalApplication=new fs.ExternalApplicationModule(e),this.Frame=new gs._FrameModule(e),this.GlobalHotkey=new ms.GlobalHotkey(e),this.Platform=new Cs.PlatformModule(e,this.InterApplicationBus.Channel),this.View=new vs.ViewModule(e),this.Interop=new Is.InteropModule(e),this.SnapshotSource=new Es.SnapshotSourceModule(e),this.NotificationManager=new xs.NotificationManagerModule(e),e.registerFin(this),this.me=(0,bs.getMe)(e),e.on("disconnected",(()=>{this.emit("disconnected")}))}}ds=l.Fin=As;var Ps={},Ms={};function _s(e){return"string"==typeof e.manifestUrl}function Os(e){return Rs(e)&&"string"==typeof e.address}function Ss(e){return Os(e)&&"string"==typeof e.token}function Rs(e){return"string"==typeof e.uuid}function Fs(e){return e.runtime&&"string"==typeof e.runtime.version}function js(e){return Rs(e)&&Fs(e)}Object.defineProperty(Ms,"__esModule",{value:!0}),Ms.isInternalConnectConfig=Ms.isPortDiscoveryConfig=Ms.isNewConnectConfig=Ms.isConfigWithReceiver=Ms.isRemoteConfig=Ms.isExistingConnectConfig=Ms.isExternalConfig=void 0,Ms.isExternalConfig=_s,Ms.isExistingConnectConfig=Os,Ms.isRemoteConfig=Ss,Ms.isConfigWithReceiver=function(e){return"object"==typeof e.receiver&&Ss({...e,address:""})},Ms.isNewConnectConfig=js,Ms.isPortDiscoveryConfig=function(e){return _s(e)&&Fs(e)||js(e)},Ms.isInternalConnectConfig=function(e){return Os(e)||js(e)};var Ls={},ks={};Object.defineProperty(ks,"__esModule",{value:!0}),ks.EmitterMap=void 0;const Ts=t;function $s(e){return Buffer.from(e).toString("base64")}ks.EmitterMap=class{constructor(){this.storage=new Map}hashKeys(e){return e.map($s).join("/")}getOrCreate(e){const t=this.hashKeys(e);return this.storage.has(t)||this.storage.set(t,new Ts.EventEmitter),this.storage.get(t)}has(e){return this.storage.has(this.hashKeys(e))}delete(e){const t=this.hashKeys(e);return this.storage.delete(t)}},Object.defineProperty(Ls,"__esModule",{value:!0});const Bs=ks;class Gs extends Bs.EmitterMap{constructor(){super(...arguments),this.dispatchEvent=e=>{if(function(e){return"process-desktop-event"===e.action}(e)){const{payload:t}=e,n=function(e){const{topic:t}=e;if("frame"===t||"window"===t||"view"===t){const{uuid:n,name:i}=e;return[t,n,i]}if("application"===t){const{uuid:n}=e;return[t,n]}return[t]}(t);if(this.has(n))return this.getOrCreate(n).emit(t.type,t),!0}return!1}}}Ls.default=Gs;var Ws,Ns,Ds=h&&h.__classPrivateFieldSet||function(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n},Hs=h&&h.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)},Vs=h&&h.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Ps,"__esModule",{value:!0});var Us=Ps.Transport=void 0;const zs=t,Ks=Ms,Js=g,qs=Vs(Ls),Ys=Vi,Zs=We;class Qs extends zs.EventEmitter{constructor(e,t,n){super(),this.wireListeners=new Map,this.topicRefMap=new Map,this.eventAggregator=new qs.default,this.messageHandlers=[this.eventAggregator.dispatchEvent],Ws.set(this,void 0),Ns.set(this,void 0),this.connectSync=()=>{Hs(this,Ws,"f").connectSync()},this.getPort=()=>Hs(this,Ws,"f").getPort(),Ds(this,Ws,e(this.onmessage.bind(this)),"f"),this.environment=t,this.sendRaw=Hs(this,Ws,"f").send.bind(Hs(this,Ws,"f")),this.registerMessageHandler(this.handleMessage.bind(this)),Hs(this,Ws,"f").on("disconnected",(()=>{for(const[,{handleNack:e}]of this.wireListeners)e({reason:"Remote connection has closed"});this.wireListeners.clear(),this.emit("disconnected")}));const{uuid:i,name:r}=n,o=this.environment.getCurrentEntityType();this.me=(0,Ys.getBaseMe)(o,i,r)}getFin(){if(!Hs(this,Ns,"f"))throw new Error("No Fin object registered for this transport");return Hs(this,Ns,"f")}registerFin(e){if(Hs(this,Ns,"f"))throw new Error("Fin object has already been registered for this transport");Ds(this,Ns,e,"f")}shutdown(){return Hs(this,Ws,"f").shutdown()}async connect(e){if((0,Ks.isConfigWithReceiver)(e))return await Hs(this,Ws,"f").connect(e.receiver),this.authorize(e);if((0,Ks.isRemoteConfig)(e))return this.connectRemote(e);if((0,Ks.isExistingConnectConfig)(e))return this.connectByPort(e);if((0,Ks.isNewConnectConfig)(e)){const t=await this.environment.retrievePort(e);return this.connectByPort({...e,address:`ws://localhost:${t}`})}}async connectRemote(e){return await Hs(this,Ws,"f").connect(new(this.environment.getWsConstructor())(e.address)),this.authorize(e)}async connectByPort(e){const{address:t,uuid:n}=e,i={...e,type:"file-token"},r=Hs(this,Ws,"f");await r.connect(new(this.environment.getWsConstructor())(e.address));const o=await this.sendAction("request-external-authorization",{uuid:n,type:"file-token"},!0);if("external-authorization-response"!==o.action)throw new Js.UnexpectedActionError(o.action);return await this.environment.writeToken(o.payload.file,o.payload.token),this.authorize(i)}async authorize(e){const t=await this.sendAction("request-authorization",e,!0);if("authorization-response"!==t.action)throw new Js.UnexpectedActionError(t.action);if(!0!==t.payload.success)throw new Js.RuntimeError(t.payload)}sendAction(e,t={},n=!1){let i=()=>{};const r=Js.RuntimeError.getCallSite(1),o=this.environment.getNextMessageId(),s=new Promise(((s,a)=>{i=a;const c={action:e,payload:t,messageId:o},d=Hs(this,Ws,"f");return this.addWireListener(o,s,(e=>this.nackHandler(e,a,r)),n),d.send(c).catch(a)}));return Object.assign(s,{cancel:i,messageId:o})}nackHandler(e,t,n){t("string"==typeof e?e:new Js.RuntimeError(e,n))}ferryAction(e){return new Promise(((t,n)=>{const i=this.environment.getNextMessageId();e.messageId=i;const r=e=>{t(e.payload)};return Hs(this,Ws,"f").send(e).then((()=>this.addWireListener(i,r,(e=>this.nackHandler(e,n)),!1))).catch(n)}))}registerMessageHandler(e){this.messageHandlers.push(e)}addWireListener(e,t,n,i){i?this.uncorrelatedListener=t:this.wireListeners.has(e)?n({reason:"Duplicate handler id",error:(0,Zs.errorToPOJO)(new Js.DuplicateCorrelationError(String(e)))}):this.wireListeners.set(e,{resolve:t,handleNack:n})}onmessage(e){for(const t of this.messageHandlers)t.call(null,e)}handleMessage(e){const t=e.correlationId||NaN;if("correlationId"in e){if(!this.wireListeners.has(t))return!1;{const{resolve:n,handleNack:i}=this.wireListeners.get(t);"ack"!==e.action?i({reason:"Did not receive ack action",error:(0,Zs.errorToPOJO)(new Js.NoAckError(e.action))}):"payload"in e?e.payload.success?n.call(null,e):i(e.payload):"string"==typeof e.reason?i(e):(console.warn("Received invalid response from core",e),i({reason:"invalid response shape",error:(0,Zs.errorToPOJO)(new Error("Invalid response shape"))})),this.wireListeners.delete(t)}}else this.uncorrelatedListener&&this.uncorrelatedListener.call(null,e),this.uncorrelatedListener=()=>{};return!0}}Us=Ps.Transport=Qs,Ws=new WeakMap,Ns=new WeakMap;const Xs=new Map([["debug",0],["info",1],["warn",2],["error",3],["none",4]]),ea=e=>"string"==typeof e?e:e instanceof Error?e.stack||e.message:JSON.stringify(e);class ta{static setGlobalLogLevel(e){ta.LOG_LEVEL=e??"error"}static setCustomLogger(e){ta.customLogger=e}constructor(...e){this.scopes=e}log(e,...t){const n=Xs.get(e)??3;if((Xs.get(ta.LOG_LEVEL)??3)<=n){const r=[`[${(new Date).toISOString()}]`,...(i=this.scopes,i.map((e=>`[${e}]`))),...t];if(ta.customLogger){const t=r.map(ea).join(" ");ta.customLogger[e](t)}else 1===n?console.log(...r):console[e](...r)}var i}warn(...e){this.log("warn",...e)}error(...e){this.log("error",...e)}info(...e){this.log("info",...e)}debug(...e){this.log("debug",...e)}static getLogger(...e){return new ta(...e)}getLogger(...e){return new ta(...this.scopes,...e)}}ta.LOG_LEVEL="error";const na=ta.getLogger("@openfin/core-web/client"),ia=na.getLogger("data-channel"),ra=e=>`data-channel-${e.me.uuid}`,oa=async(e,t)=>{const n=async n=>e.dispatch("page-title-updated",{data:{identity:t,title:n}}).catch((e=>{ia.warn("Failed to dispatch title change",e)}));document.title&&await n(document.title),a(document.head,n)};function sa(e,t){if(!function(e){return"string"==typeof e}(e))throw new Error(`Property ${t} has invalid type. Expected string, got ${typeof e}.`)}const aa="web-broker-ports-ready",ca=na.getLogger("get-web-interop-ports");function da(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)}function ha(e,t,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,n):r?r.value=n:t.set(e,n),n}var la,ua,pa;"function"==typeof SuppressedError&&SuppressedError;class wa extends t.EventEmitter{constructor(e,t){super(),la.set(this,void 0),ua.set(this,void 0),pa.set(this,!1),this.connectSync=()=>{da(this,pa,"f")||(da(this,ua,"f").addEventListener("message",(e=>{e.data?.topic?.startsWith("wire-message")&&e.data.message&&da(this,la,"f").call(this,{...JSON.parse(e.data.message),ports:e.ports})})),da(this,ua,"f").start())},this.connect=async()=>{this.connectSync()},this.send=e=>(da(this,ua,"f").postMessage({topic:"wire-message",message:JSON.stringify(e)}),Promise.resolve()),this.shutdown=async()=>{da(this,ua,"f").close()},ha(this,la,e,"f"),ha(this,ua,t,"f")}getPort(){return da(this,ua,"f")}}la=new WeakMap,ua=new WeakMap,pa=new WeakMap;var ya={},fa={};Object.defineProperty(fa,"__esModule",{value:!0}),fa.BaseEnvironment=void 0;const ga=jr;fa.BaseEnvironment=class{async getViewWindowIdentity(e,t){const{identity:n}=await e.View.wrapSync(t).getCurrentWindow();return n}async getInteropInfo(e){const t=await e.Application.getCurrentSync().getInfo().catch((()=>null)),n=t?.initialOptions?.interopBrokerConfiguration??{};return{fdc3Version:t?(0,ga.getDefaultViewFdc3VersionFromAppInfo)(t):void 0,...n,fdc3Info:{providerVersion:await e.System.getVersion(),provider:"OpenFin"}}}},Object.defineProperty(ya,"__esModule",{value:!0});var ma=ya.BrowserEnvironment=void 0;const va=fa;class Ca extends va.BaseEnvironment{constructor(){super(...arguments),this.type="other",this.getRandomId=()=>{const e=new Uint32Array(1);return window.crypto.getRandomValues(e)[0].toString(32)}}getAdapterVersionSync(){return""}observeBounds(e,t){throw new Error("Method not implemented.")}layoutAllowedInContext(e){return!1}initLayoutManager(e,t,n){throw new Error("Method not implemented.")}applyLayoutSnapshot(e,t,n){throw new Error("Method not implemented.")}createLayout(e,t){throw new Error("Method not implemented.")}destroyLayout(e,t){throw new Error("Method not implemented.")}resolveLayout(e,t){throw new Error("Method not implemented.")}initPlatform(...e){throw new Error("Method not implemented.")}writeToken(e,t){return Promise.resolve("")}retrievePort(e){throw new Error("Method not implemented.")}getNextMessageId(){return this.getRandomId()}createChildContent(e){throw new Error("Method not implemented.")}getWebWindow(e){throw new Error("Method not implemented.")}getCurrentEntityIdentity(){throw new Error("Method not implemented.")}getCurrentEntityType(){return"external connection"}raiseEvent(e,t){throw new Error("Method not implemented.")}getUrl(){return location.href}getDefaultChannelOptions(){return{create:{},connect:{}}}getRtcPeer(){return new RTCPeerConnection}getWsConstructor(){return WebSocket}whenReady(){return Promise.resolve()}}ma=ya.BrowserEnvironment=Ca;const ba=e=>"platform"in e&&void 0!==e.platform;var Ia,Ea;class xa extends ma{constructor(e){super(),this.connectConfig=e,Ia.set(this,void 0),Ea.set(this,new W((async()=>Promise.resolve().then((function(){return __webpack_require__(/*! ./main-ad8fc2d4.js */ "./node_modules/@openfin/core-web/out/main-ad8fc2d4.js")}))))),ba(e)&&this.validatePlatformOptions(e)}getAdapterVersionSync(){return"0.43.112"}validatePlatformOptions({platform:e}){if(!("layoutSnapshot"in e))throw new Error("Platform options are missing layoutSnapshot. Please provide a layoutSnapshot in the platform options.");if("windows"in e||"windows"in e.layoutSnapshot)throw new Error("It appears you tried to call connect() with a snapshot object from an OpenFin desktop environment. Note that connect() expects to be called with a platform property with this structure: { platform: { layoutSnapshot } }. To get a layoutSnapshot of the expected structure, use fin.Platform.Layout.getCurrentLayoutManagerSync().getLayoutSnapshot() in v34+ in your desktop environment.");const{layouts:t}=e.layoutSnapshot;Object.entries(t).map((([e,t])=>{if("object"!=typeof t||null===t)throw new Error(`Invalid layout detected: layoutSnapshot.layouts.${e} must be an object.`);if(!("content"in t))throw new Error(`Invalid layout detected: layoutSnapshot.layouts.${e} must contain a 'content' property.`)}))}async getInteropInfo(e){return{...{contextGroups:void 0,logging:{beforeAction:{enabled:!1},afterAction:{enabled:!1}}},fdc3Version:void 0,fdc3Info:{providerVersion:"0.43.112",provider:"OpenFin Web"}}}layoutAllowedInContext(e){return!0}async initLayoutManager(e,t,n){if(da(this,Ia,"f"))throw new Error("Layout already initialized.");if(!ba(this.connectConfig))throw new Error("Platform options are missing from connection config.");const{WebLayoutEntryPoint:i}=await da(this,Ea,"f").getValue();return ha(this,Ia,new i(this.connectConfig),"f"),await da(this,Ia,"f").initLayoutManager(e,t,n)}async applyLayoutSnapshot(e,t,n){da(this,Ia,"f")?.applyLayoutSnapshot(e,t,n)}async createLayout(e,t){return da(this,Ia,"f")?.createLayout(e,t)}async destroyLayout(e,t){return da(this,Ia,"f")?.destroyLayout(e,t)}async getViewWindowIdentity(e,t){return Promise.resolve({uuid:t.uuid,name:t.uuid})}}Ia=new WeakMap,Ea=new WeakMap;const Aa=()=>{const e=((e,t)=>{const n=new RegExp(`^${t}<(?<meta>.*)>$`).exec(e)?.groups?.meta;if(n)try{return JSON.parse(atob(n))}catch(e){throw new Error(`Failed to decode JSON from ${n}.`)}})(window.name,"of-frame");if(e)try{const{name:t,uuid:n,brokerUrl:i,providerId:r,contextGroup:o}=e;return sa(i,"brokerUrl"),sa(n,"uuid"),sa(t,"name"),{identity:{name:t,uuid:n},brokerUrl:i,interopConfig:{providerId:r,currentContextGroup:o},isOfView:!0}}catch(e){throw new Error(`Unexpected error occurred when inferring platform information: ${e.stack}`)}},Pa=()=>{const e=r.v4();return{uuid:e,name:e}},Ma=async e=>{if("enabled"===e.connectionInheritance){const t=await(async e=>{const t=Aa();if(t){const{validateOptions:n=(()=>!0)}=e,{identity:i,...r}=t;if(!await n(r))throw new Error("Parent options were rejected by validateOptions.");return t}})(e);if(t)return t}if(!e.options){const t="enabled"===e.connectionInheritance?"Broker URL was not specified nor provided by a platform container.":"Connection inheritance is disabled but no options were provided.";throw new Error(t)}return{...e.options,identity:Pa(),isOfView:!1}};exports.Logger=ta,exports.__classPrivateFieldGet=da,exports.__classPrivateFieldSet=ha,exports.apiExposer=qn,exports.clientLogger=na,exports.commonjsGlobal=h,exports.connect=async t=>{try{ta.setGlobalLogLevel(t.logLevel),ta.setCustomLogger(t.logger),na.info("Establishing connection",t);const{brokerUrl:n,identity:i,timeout:r,interopConfig:a,isOfView:c}=await Ma(t),{workerPort:d,iframeBrokerPort:h}=await(async(e,t,n)=>{const{origin:i}=new URL(e),r=document.createElement("IFRAME");let s;r.style.display="none";try{return await new Promise(((a,c)=>{const d=e=>{if(e.source===r.contentWindow&&e.data?.topic===`ack-${aa}`){if(e.origin!==i)c(new Error(`Broker redirected to unexpected origin ${e.origin}, expected ${i}.`));else if(e.data.success){const[t,n]=e.ports;a({iframeBrokerPort:t,workerPort:n})}else c(new m(e.data));window.removeEventListener("message",d),clearTimeout(s)}};window.addEventListener("message",d),ca.info(`Connecting to broker ${e}`),r.setAttribute("src",e),r.setAttribute("name",o(t,"of-broker")),document.body.appendChild(r),ca.info("Iframe loaded, awaiting init message from iframe"),n&&(s=setTimeout((()=>{window.removeEventListener("message",d),document.body.removeChild(r),c(new Error("Worker did not initialize in time"))}),n))}))}catch(e){throw new Error(`Failed to initialise Fin Web Client. ${e.message}`,{cause:e})}})(n,i,r);na.info("Successfully established connection to shared worker");const l={entityType:"external connection",...i};d.start(),h.start();const u=((t,n,i)=>{const r=new xa(t),o=new Us((e=>new wa(e,n)),r,i);return o.connectSync(),window.Buffer=e.Buffer,new ds(o)})(t,d,l);return c&&window.top&&!s(window,window.top)&&(e=>{const t={uuid:e.me.uuid,name:e.me.name};ia.debug("Data channel connecting..."),e.InterApplicationBus.Channel.connect(ra(e)).then((async e=>{ia.debug("Data channel connected"),await oa(e,t)})).catch((e=>{ia.warn("Failed to connect to data channel, some features may not work like title updates",e)}))})(u),a?.providerId&&(u.me.interop=u.Interop.connectSync(a.providerId),a?.currentContextGroup&&u.me.interop.joinContextGroup(a.currentContextGroup).catch((e=>{na.warn(`Error joining specified context group: ${a?.currentContextGroup}, continuing`,e)}))),{...u,me:{...u.me,identity:{uuid:u.me.uuid,name:u.me.name}}}}catch(e){throw new Error(`An error occured during web-interop connection: ${e.message}`)}},exports.decorators=Qn,exports.encodeOptions=o,exports.getDataChannelName=ra,exports.getTitleObserver=a,exports.isSameOrigin=s,exports.layout_constants=gi,exports.lazy=G,exports.makeKeyChecker=()=>e=>e;


/***/ }),

/***/ "./node_modules/@openfin/core-web/out/main-ad8fc2d4.js":
/*!*************************************************************!*\
  !*** ./node_modules/@openfin/core-web/out/main-ad8fc2d4.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var t=__webpack_require__(/*! ./main-239035af.js */ "./node_modules/@openfin/core-web/out/main-239035af.js"),e=__webpack_require__(/*! events */ "../../node_modules/events/events.js"),i=__webpack_require__(/*! he */ "../../node_modules/he/he.js"),n=__webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/esm-browser/index.js");function o(t){var e=Object.create(null);return t&&Object.keys(t).forEach((function(i){if("default"!==i){var n=Object.getOwnPropertyDescriptor(t,i);Object.defineProperty(e,i,n.get?n:{enumerable:!0,get:function(){return t[i]}})}})),e.default=t,Object.freeze(e)}__webpack_require__(/*! buffer/ */ "../../node_modules/buffer/index.js"),__webpack_require__(/*! lodash/cloneDeep */ "../../node_modules/lodash/cloneDeep.js"),__webpack_require__(/*! lodash/isEqual */ "../../node_modules/lodash/isEqual.js");var s=o(i),r={},a={};Object.defineProperty(a,"__esModule",{value:!0}),a.mapValuesAsync=a.mapEntriesAsync=void 0;const l=(t,[e,i])=>({...t,[e]:i});async function h(t,e){return(await Promise.all(e.map((async([e,i])=>[e,await t(i,e)])))).reduce(l,{})}a.mapEntriesAsync=h,a.mapValuesAsync=async function(t,e){let i;return i=e instanceof Map?[...e.entries()]:Object.entries(e),h(t,i)};var d={};Object.defineProperty(d,"__esModule",{value:!0}),d.dispatchLayoutEvent=void 0,d.dispatchLayoutEvent=function(t,e,i){if("openfin"===t.environment.type){const{uuid:n,name:o}=t.environment.getCurrentEntityIdentity(),s=`window/${e}/${n}-${o}`,r={layoutIdentity:{layoutName:i,uuid:n,name:o},topic:"window"};t.environment.raiseEvent(s,r)}};var c={};Object.defineProperty(c,"__esModule",{value:!0});var u=c.LayoutNotReadyError=g=c.mapLayoutContentItemsImmutableSync=c.mapLayoutContentItemsImmutable=m=c.isVisible=void 0;var m=c.isVisible=t=>(0!==t.offsetWidth||0!==t.offsetHeight)&&"hidden"!==window.getComputedStyle(t).visibility&&t.offsetTop>=0&&t.offsetLeft>=0&&t.offsetTop<=window.innerHeight&&t.offsetLeft<=window.innerWidth;const p=t=>"type"in t&&"component"===t.type;c.mapLayoutContentItemsImmutable=async function t(e,i){return p(i)?e(i):{...i,content:await Promise.all(i.content?.map((i=>t(e,i))))}};var g=c.mapLayoutContentItemsImmutableSync=function t(e,i){return p(i)?e(i):{...i,content:i.content?.map((i=>t(e,i)))}};class f extends Error{constructor(t){super(`Layout snapshot for ${t} could not be generated, layout ${t} is not ready or may be destroyed`),this.type=f.type}static isLayoutNotReadyError(t){return"object"==typeof t&&"type"in t&&t.type===f.type}}u=c.LayoutNotReadyError=f,f.type="LayoutSnapshotError";var v,_,y,C,w=t.commonjsGlobal&&t.commonjsGlobal.__classPrivateFieldSet||function(t,e,i,n,o){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?o.call(t,i):o?o.value=i:e.set(t,i),i},b=t.commonjsGlobal&&t.commonjsGlobal.__classPrivateFieldGet||function(t,e,i,n){if("a"===i&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?n:"a"===i?n.call(t):n?n.value:e.get(t)};Object.defineProperty(r,"__esModule",{value:!0});var I=r.DefaultLayoutManager=void 0;const S=a,E=d,x=c;class L{constructor(t){_.set(this,void 0),y.set(this,new Map),w(this,_,t,"f")}size(){return b(this,y,"f").size}async applyLayoutSnapshot({layouts:t}){if(Object.keys(t).length>1)throw new Error("[LayoutManager] Tried to call applyLayoutSnapshot with more than 1 layout. When implementing multiple layouts via overridden LayoutManager class, you must override and fully implement the applyLayoutSnapshot method without calling super.applyLayoutSnapshot().");const[[e,i]]=Object.entries(t);await L.createLayout(this,{layoutName:e,layout:i}),(0,E.dispatchLayoutEvent)(b(this,_,"f").getWire(),"layout-snapshot-applied",e)}async showLayout({layoutName:t}){}async getLayoutSnapshot(){return{layouts:(await Promise.all(Array.from(b(this,y,"f").entries()).map((async([t,e])=>{try{return{layoutName:t,snapshot:await e.getFrameSnapshot()}}catch(e){if(x.LayoutNotReadyError.isLayoutNotReadyError(e))return void console.info(`Layout ${t} ommited from snapshot`,e.message);throw e}})))).reduce(((t,e)=>e?{...t,[e.layoutName]:e.snapshot}:t),{})}}async removeLayout({layoutName:t}){}getLayoutIdentityForView(t){const e=[...b(this,y,"f").values()].find((e=>e.getCurrentViews().some((e=>e.name===t.name&&e.uuid===t.uuid))));return e?.identity??void 0}isLayoutVisible({layoutName:t}){return b(L,v,"m",C).call(L,this,t).isVisible()}resolveLayoutIdentity(t){if(t&&"layoutName"in t)return t;const e=[...b(this,y,"f").values()];if(1===e.length)return e[0].identity;const i=e.find((t=>t.isVisible()));return i?.identity??void 0}static async resolveLayout(t,e){const i=t.resolveLayoutIdentity(e);if(void 0===i||!("layoutName"in i))throw new Error("[layout-manager] resolveLayout: Could not resolve the layout identity. Make sure you include 'layoutName' in the identity object.");return b(L,v,"m",C).call(L,t,i.layoutName)}static async handleSharedView(t,e,i){await(0,S.mapValuesAsync)((async t=>{if(t.identity.layoutName!==e.layoutName){const e=t.getCurrentViews().find((t=>t.name===i.name));e&&await t.onViewDetached({viewIdentity:e,target:null}).catch(console.error)}}),b(t,y,"f"))}static async handleLastViewRemoved(t,e){await t.removeLayout(e),await b(t,_,"f").handleLastViewRemoved(t)}static async destroyLayout(t,{layoutName:e}){await b(L,v,"m",C).call(L,t,e).destroy(),b(t,y,"f").delete(e),(0,E.dispatchLayoutEvent)(b(t,_,"f").getWire(),"layout-destroyed",e)}static async createLayout(t,e){const{layoutName:i}=e;if(b(t,y,"f").has(i))throw new Error(`Layout name ${i} already exists`);await b(t,_,"f").createLayout(e,t),(0,E.dispatchLayoutEvent)(b(t,_,"f").getWire(),"layout-created",i)}static registerLayout(t,e,i){b(t,y,"f").set(e,i)}static getAllLayouts(t){return[...b(t,y,"f").values()]}static setInitialSnapshot(t,e){b(t,_,"f").setInitialSnapshot(e)}static createClosedConstructor(...t){return class extends L{constructor(){super(...t)}}}}I=r.DefaultLayoutManager=L,v=L,_=new WeakMap,y=new WeakMap,C=function(t,e){const i=b(t,y,"f").get(e);if(!i)throw new Error(`[layout-manager] getLayoutByName: Could not locate layout with name '${e}'`);return i};var z={},M={},P={};Object.defineProperty(P,"__esModule",{value:!0}),P.ReversibleMap=void 0;P.ReversibleMap=class{constructor(){this.valueToKey=new Map,this.keyToValue=new Map,this.setUnique=(t,e)=>{if(this.hasKey(t)||this.hasValue(e))throw new Error("Key or value already in the map.");this.keyToValue.set(t,e),this.valueToKey.set(e,t)},this.getKey=t=>{const e=this.valueToKey.get(t);if(!e)throw new Error("Value not found in the map.");return e},this.deleteKey=t=>{const e=this.getValue(t);return this.keyToValue.delete(t),this.valueToKey.delete(e),e},this.deleteValue=t=>{const e=this.getKey(t);return this.keyToValue.delete(e),this.valueToKey.delete(t),e},this.hasKey=t=>this.keyToValue.has(t),this.hasValue=t=>this.valueToKey.has(t)}getValue(t){const e=this.keyToValue.get(t);if(!e)throw new Error("Key not found in the map.");return e}},Object.defineProperty(M,"__esModule",{value:!0});var T=M.LayoutContentCache=void 0;const A=t.lazy,k=P;class D{constructor(){this.contentItemCache=new k.ReversibleMap,this.contentItemCacheId=0,this.createCacheKey=()=>{const t=`entity-${this.contentItemCacheId.toString()}`;return this.contentItemCacheId+=1,t},this.hasKey=t=>this.contentItemCache.hasKey(t),this.getItemOrUndefined=t=>{try{return this.getContentItemOrThrow(t)}catch(t){return}},this.getContentItemOrThrow=(t,e)=>{if(!this.contentItemCache.hasKey(t))throw new Error("Layout component has been destroyed or detached from the current layout.");const i=this.contentItemCache.getValue(t);if(e&&!e.includes(i.type))throw new Error(`Layout item is not the expected type. Expected ${e.join(", ")}, got ${i.type}.`);return i},this.getOrCreateEntityId=t=>{if(this.contentItemCache.hasValue(t))return this.contentItemCache.getKey(t);t.onDestroyed((()=>{this.contentItemCache.deleteValue(t)}));const e=this.createCacheKey();return this.contentItemCache.setUnique(e,t),e}}static getSingleInstance(){return D.singleton.getValue()}}T=M.LayoutContentCache=D,D.singleton=new A.Lazy((()=>new D));var R={},O={};!function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.getAdjacentStacks=t.doShareEdge=t.getAdjacentItem=void 0;t.getAdjacentItem=(e,i)=>{const{parent:n}=e;if(e.isRoot()||!n)return;const o=["top","bottom"].includes(i)?"column":"row",s=["top","left"].includes(i)?-1:1;if(n.type===o){const t=n.contentItems.indexOf(e)+s;if(t>=0&&t<n.contentItems.length)return n.contentItems[t]}return(0,t.getAdjacentItem)(n,i)};t.doShareEdge=(t,e,i)=>{const n=t.getBounds(),o=e.getBounds();if(!n||!o)return!1;if(["top","bottom"].includes(i)){return!(n.right<o.left||n.left>o.right)}return!(n.bottom<o.top||n.top>o.bottom)};t.getAdjacentStacks=(e,i)=>{const n=["top","bottom"].includes(i)?"row":"column",o=s=>"stack"===s.type?(0,t.doShareEdge)(e,s,i)?[s]:[]:"root"===s.type||"ground"===s.type?[]:s.type===n?s.contentItems.map((t=>o(t))).flat():s.type!==n?["top","right"].includes(i)?o(s.contentItems[s.contentItems.length-1]):o(s.contentItems[0]):[],s=(0,t.getAdjacentItem)(e,i);return s?o(s):[]}}(O);var B=t.commonjsGlobal&&t.commonjsGlobal.__decorate||function(t,e,i,n){var o,s=arguments.length,r=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(s<3?o(r):s>3?o(e,i,r):o(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r};Object.defineProperty(R,"__esModule",{value:!0}),R.LayoutEntitiesController=void 0;const U=t.decorators,V=O,W=r;class H{constructor(t,e,i){this.wire=t,this.layoutManager=e,this.layoutContentCache=i,this.analytics=t=>{this.wire.sendAction(`layout-controller-${t}`).catch((()=>{}))},this.getLayoutIdentityForViewOrThrow=async t=>{const e=this.layoutManager.getLayoutIdentityForView(t);if(!e)throw new Error(`View identity ${t.name} is not attached to any layouts.`);return e},this.getRoot=async t=>{this.analytics("get-root");const e=(await this.getLayout(t)).getRoot();return{type:e.type,entityId:this.layoutContentCache.getOrCreateEntityId(e)}},this.getStackByView=async t=>{this.analytics("get-stack-by-view");const e=await this.getLayoutIdentityForViewOrThrow(t),i=(await this.getLayout(e)).getStackByView(t);if("stack"===i?.type)return{entityId:this.layoutContentCache.getOrCreateEntityId(i),type:"stack"}},this.getStackViews=t=>{this.analytics("get-stack-views");return this.layoutContentCache.getContentItemOrThrow(t,["stack"]).contentItems.map((t=>({name:t.viewName,uuid:this.wire.me.uuid})))},this.isRoot=t=>{this.analytics("is-root");return this.layoutContentCache.getContentItemOrThrow(t).isRoot()},this.exists=t=>(this.analytics("exists"),this.layoutContentCache.hasKey(t)),this.addViewToStack=async(t,e,{index:i,displayState:n}={index:0,displayState:"focused"})=>{this.analytics("add-view-to-stack");const o=this.layoutContentCache.getContentItemOrThrow(t);if(i&&i>o.contentItems.length+1)throw new Error(`Index '${i}' out of range, please exclude the index or specify a number between 0 and ${o.contentItems.length}`);const s={id:t,index:i,displayState:n},{identity:r}=await o.layout.platformCreateView(e,{location:s});return r},this.findViewInStack=(t,e)=>t.contentItems.find((t=>t.viewName===e.name)),this.removeViewFromStack=async(t,e)=>{this.analytics("remove-view-from-stack");const i=this.layoutContentCache.getContentItemOrThrow(t,["stack"]),n=this.findViewInStack(i,e);if(!n)throw new Error(`Tried to remove a view ('${e.name}') which does not belong to the stack.`);await n.layout.platformCloseView(e)},this.createAdjacentStack=async(t,e,{position:i="right"}={})=>{if(this.analytics("create-adjacent-stack"),!Array.isArray(e)||0===e.length)throw new Error('The parameter "views" must be an array with at least 1 element.');if(!["top","bottom","left","right"].includes(i))throw new Error(`Invalid position '${i}' specified.`);const n=this.layoutContentCache.getContentItemOrThrow(t).createAdjacentStack({position:i}),o=this.layoutContentCache.getOrCreateEntityId(n);return await Promise.all(e.reverse().map((t=>this.addViewToStack(o,t)))),o},this.getAdjacentStacks=async({targetId:t,edge:e})=>{this.analytics("get-adjacent-stacks");const i=this.layoutContentCache.getContentItemOrThrow(t);return(0,V.getAdjacentStacks)(i,e).map((t=>({entityId:this.layoutContentCache.getOrCreateEntityId(t)})))},this.setStackActiveView=async(t,e)=>{this.analytics("set-stack-active-view");const i=this.layoutContentCache.getContentItemOrThrow(t,["stack"]),n=this.findViewInStack(i,e);if(!n)throw new Error(`Tried to set a view ('${e.name}') as active when it does not belong to the stack.`);i.setActiveContentItem(n,!0)}}async getLayout(t){const e=await W.DefaultLayoutManager.resolveLayout(this.layoutManager,t);if(!e)throw new Error(`Could not resolve target layout identity ${JSON.stringify(t)}`);return e}getContent(t){this.analytics("get-content");return this.layoutContentCache.getContentItemOrThrow(t,["column","row"]).contentItems.map((t=>({type:t.type,entityId:this.layoutContentCache.getOrCreateEntityId(t)})))}getParent(t){this.analytics("get-parent");const e=this.layoutContentCache.getContentItemOrThrow(t);if(!e.isRoot())return e.parent?.contentItems.includes(e)?{type:e.parent.type,entityId:this.layoutContentCache.getOrCreateEntityId(e.parent)}:void 0}}B([(0,U.expose)()],H.prototype,"getLayoutIdentityForViewOrThrow",void 0),B([(0,U.expose)()],H.prototype,"getRoot",void 0),B([(0,U.expose)()],H.prototype,"getStackByView",void 0),B([(0,U.expose)()],H.prototype,"getStackViews",void 0),B([(0,U.expose)()],H.prototype,"getContent",null),B([(0,U.expose)()],H.prototype,"getParent",null),B([(0,U.expose)()],H.prototype,"isRoot",void 0),B([(0,U.expose)()],H.prototype,"exists",void 0),B([(0,U.expose)()],H.prototype,"addViewToStack",void 0),B([(0,U.expose)()],H.prototype,"removeViewFromStack",void 0),B([(0,U.expose)()],H.prototype,"createAdjacentStack",void 0),B([(0,U.expose)()],H.prototype,"getAdjacentStacks",void 0),B([(0,U.expose)()],H.prototype,"setStackActiveView",void 0),R.LayoutEntitiesController=H,Object.defineProperty(z,"__esModule",{value:!0});var F=z.initLayoutEndpoints=void 0;const N=t.apiExposer,j=t.layout_constants,G=M,$=R,q=r;F=z.initLayoutEndpoints=async function(t,e){const i=t.getFin(),n=await i.Platform.getCurrentSync().getClient(),o=new N.ChannelsExposer(n);await new N.ApiExposer(o).exposeInstance(new $.LayoutEntitiesController(t,e,G.LayoutContentCache.getSingleInstance()),{id:j.LAYOUT_CONTROLLER_ID}),await async function(t,e){const i=t=>async i=>{const n=await q.DefaultLayoutManager.resolveLayout(e,i.target);if(!n)throw new Error(`Could not resolve the layout target from payload ${JSON.stringify(i)}`);return t(n,i)},n=(e,n)=>{t.register(e,i(n))},o=(t,e)=>{n(t,e)};n("replace-view",((t,e)=>t.replaceView(e))),n("replace-layout",((t,{layout:e})=>t.replaceLayout(e))),n("add-view",((t,e)=>t.insertView(e))),o("layout-add-view",((t,{viewOptions:e,location:i,targetView:n})=>t.platformCreateView(e,{location:i,targetView:n}))),n("close-view",((t,e)=>t.cleanupView(e.viewIdentity))),o("layout-close-view",((t,e)=>t.platformCloseView(e.viewIdentity))),n("apply-preset-layout",((t,e)=>t.applyPreset(e))),n("get-layout-views",(t=>t.getCurrentViews())),n("get-frame-snapshot",(t=>t.getFrameSnapshot())),n("is-visible",(t=>t.isVisible())),n("destroy",(t=>t.destroy())),t.register("get-layout-snapshot",(()=>e.getLayoutSnapshot()))}(n,e)};var Z={};Object.defineProperty(Z,"__esModule",{value:!0});var X=Z.BaseLayout=void 0;X=Z.BaseLayout=class{};var Y={};Object.defineProperty(Y,"__esModule",{value:!0});var K,J=Y.DOMEmitter=void 0;J=Y.DOMEmitter=class{constructor(t){this.container=t}dispatchLocalEvent(t,e){const i={...e,type:t,tabSelector:`tab-${e.name}`,containerSelector:`container-${e.name}`,topic:"openfin-DOM-event"};this.container.dispatchEvent(new CustomEvent(t,{detail:i}))}};class Q extends Error{constructor(t,e){super(e),this.type=t}}class tt extends Q{constructor(t,e){super("Configuration",t),this.node=e}}class et extends Q{constructor(t){super("PopoutBlocked",t)}}class it extends Q{constructor(t){super("API",t)}}class nt extends Q{constructor(t){super("Bind",t)}}class ot extends Error{constructor(t,e,i){super(`${t}: ${e}${void 0===i?"":": "+i}`)}}class st extends ot{constructor(t,e){super("Assert",t,e)}}class rt extends ot{constructor(t,e,i){super("UnreachableCase",t,`${e}${void 0===i?"":": "+i}`)}}class at extends ot{constructor(t,e){super("UnexpectedNull",t,e)}}class lt extends ot{constructor(t,e){super("UnexpectedUndefined",t,e)}}!function(t){let e=!1;const i={PopoutCannotBeCreatedWithGroundItemConfig:{id:0,default:"Popout cannot be created with ground ItemConfig"},PleaseRegisterAConstructorFunction:{id:1,default:"Please register a constructor function"},ComponentTypeNotRegisteredAndBindComponentEventHandlerNotAssigned:{id:2,default:"Component type not registered and BindComponentEvent handler not assigned"},ComponentIsAlreadyRegistered:{id:3,default:"Component is already registered"},ComponentIsNotVirtuable:{id:4,default:"Component is not virtuable. Requires rootHtmlElement field/getter"},VirtualComponentDoesNotHaveRootHtmlElement:{id:5,default:'Virtual component does not have getter "rootHtmlElement"'},ItemConfigIsNotTypeComponent:{id:6,default:"ItemConfig is not of type component"},InvalidNumberPartInSizeString:{id:7,default:"Invalid number part in size string"},UnknownUnitInSizeString:{id:8,default:"Unknown unit in size string"},UnsupportedUnitInSizeString:{id:9,default:"Unsupported unit in size string"}};t.idCount=Object.keys(i).length;const n=Object.values(i);t.checkInitialise=function(){if(!e)for(let e=0;e<t.idCount;e++){const t=n[e];if(t.id!==e)throw new st("INSI00110",`${e}: ${t.id}`);ht[e]=t.default}e=!0}}(K||(K={}));const ht=new Array(K.idCount);var dt,ct,ut,mt;!function(t){t.defaultComponentBaseZIndex="auto",t.defaultComponentDragZIndex="32",t.defaultComponentStackMaximisedZIndex="41"}(dt||(dt={})),function(t){t.width="width",t.height="height"}(ct||(ct={})),function(t){t.top="top",t.left="left",t.right="right",t.bottom="bottom"}(ut||(ut={})),function(t){t.base="base",t.drag="drag",t.stackMaximised="stackMaximised"}(mt||(mt={}));const pt={base:dt.defaultComponentBaseZIndex,drag:dt.defaultComponentDragZIndex,stackMaximised:dt.defaultComponentStackMaximisedZIndex};var gt,ft,vt,_t,yt,Ct,wt,bt,It,St,Et,xt,Lt,zt,Mt,Pt,Tt,At,kt,Dt,Rt,Ot;function Bt(t){return t.toString(10)+"px"}function Ut(t){const e=t.replace("px","");return parseFloat(e)}function Vt(t){return t>="0"&&t<="9"}function Wt(t,e){const i=Bt(e);t.style.width=i}function Ht(t,e){const i=Bt(e);t.style.height=i}function Ft(t){return{width:t.offsetWidth,height:t.offsetHeight}}function Nt(t,e){t.style.display=e?"":"none"}function jt(t,e){if(void 0!==e)for(const i in e)if(e.hasOwnProperty(i)){const n=e[i],o=t[i];t[i]=Gt(o,n)}return t}function Gt(t,e){if("object"!=typeof e)return e;if(Array.isArray(e)){const t=e.length,i=new Array(t);for(let n=0;n<t;n++){const t=e[n];i[n]=Gt({},t)}return i}if(null===e)return null;{const i=e;if(void 0===t)return jt({},i);if("object"!=typeof t)return jt({},i);if(Array.isArray(t))return jt({},i);if(null===t)return jt({},i);return jt(t,i)}}function $t(){return(1e15*Math.random()).toString(36).replace(".","")}function qt(t,e){const{numericPart:i,firstNonNumericCharPart:n}=function(t){const e=(t=t.trimStart()).length;if(0===e)return{numericPart:"",firstNonNumericCharPart:""};{let i=e,n=!1;for(let o=0;o<e;o++){const e=t[o];if(!Vt(e)){if("."!==e){i=o;break}if(n){i=o;break}n=!0}}return{numericPart:t.substring(0,i),firstNonNumericCharPart:t.substring(i).trim()}}}(t),o=Number.parseInt(i,10);if(isNaN(o))throw new tt(`${ht[7]}: ${t}`);{const i=_t.tryParse(n);if(void 0===i)throw new tt(`${ht[8]}: ${t}`);if(e.includes(i))return{size:o,sizeUnit:i};throw new tt(`${ht[9]}: ${t}`)}}function Zt(t,e){return t.toString(10)+_t.format(e)}function Xt(t,e){return void 0===t?void 0:t.toString(10)+_t.format(e)}!function(t){function e(t){return!Array.isArray(t)&&null!==t&&"object"==typeof t}t.isJson=function(t){return e(t)},t.isJsonObject=e}(gt||(gt={})),function(t){t.ground="ground",t.row="row",t.column="column",t.stack="stack",t.component="component"}(ft||(ft={})),function(t){t.none="none",t.always="always",t.onload="onload"}(vt||(vt={})),function(t){t.Pixel="px",t.Percent="%",t.Fractional="fr",t.Em="em"}(_t||(_t={})),function(t){t.tryParse=function(e){switch(e){case t.Pixel:return t.Pixel;case t.Percent:return t.Percent;case t.Fractional:return t.Fractional;case t.Em:return t.Em;default:return}},t.format=function(e){switch(e){case t.Pixel:return t.Pixel;case t.Percent:return t.Percent;case t.Fractional:return t.Fractional;case t.Em:return t.Em;default:throw new rt("SUEF44998",e)}}}(_t||(_t={})),function(t){const e=["settings","hasHeaders","constrainDragToContainer","selectionEnabled","dimensions","borderWidth","minItemHeight","minItemWidth","headerHeight","dragProxyWidth","dragProxyHeight","labels","close","maximise","minimise","popout","content","componentType","componentState","id","width","type","height","isClosable","title","popoutWholeStack","openPopouts","parentId","activeItemIndex","reorderEnabled","borderGrabWidth"],i=[!0,!1,"row","column","stack","component","close","maximise","minimise","open in new window"];function n(t,e){const i={};for(const n in t)if(t.hasOwnProperty(n)){let a;a=e?s(n):r(n);const l=t[n];i[a]=o(l,e)}return i}function o(t,e){return"object"==typeof t?null===t?null:Array.isArray(t)?function(t,e){const i=t.length,n=new Array(i);for(let s=0;s<i;s++){const i=t[s];n[s]=o(i,e)}return n}(t,e):n(t,e):e?function(t){if("string"==typeof t&&1===t.length)return"___"+t;const e=function(t){for(let e=0;e<i.length;e++)if(i[e]===t)return e;return-1}(t);return-1===e?t:e.toString(36)}(t):function(t){if("string"==typeof t&&1===t.length)return i[parseInt(t,36)];if("string"==typeof t&&"___"===t.substr(0,3))return t[3];return t}(t)}function s(t){if("string"==typeof t&&1===t.length)return"___"+t;const i=function(t){for(let i=0;i<e.length;i++)if(e[i]===t)return i;return-1}(t);return-1===i?t:i.toString(36)}function r(t){return 1===t.length?e[parseInt(t,36)]:"___"===t.substr(0,3)?t[3]:t}t.checkInitialise=function(){if(e.length>36)throw new Error("Too many keys in config minifier map")},t.translateObject=n}(yt||(yt={})),function(t){t.defaults={type:ft.ground,content:[],size:1,sizeUnit:_t.Fractional,minSize:void 0,minSizeUnit:_t.Pixel,id:"",isClosable:!0},t.createCopy=function(t,e){switch(t.type){case ft.ground:case ft.row:case ft.column:return St.createCopy(t,e);case ft.stack:return bt.createCopy(t,e);case ft.component:return It.createCopy(t);default:throw new rt("CICC91354",t.type,"Invalid Config Item type specified")}},t.createDefault=function(t){switch(t){case ft.ground:throw new st("CICCDR91562");case ft.row:case ft.column:return St.createDefault(t);case ft.stack:return bt.createDefault();case ft.component:return It.createDefault();default:throw new rt("CICCDD91563",t,"Invalid Config Item type specified")}},t.isComponentItem=function(t){return t.type===ft.component},t.isStackItem=function(t){return t.type===ft.stack},t.isGroundItem=function(t){return t.type===ft.ground}}(Ct||(Ct={})),function(t){t.defaultMaximised=!1,function(t){t.createCopy=function(t,e){return void 0===t?void 0:{show:null!=e?e:t.show,popout:t.popout,close:t.close,maximise:t.maximise,minimise:t.minimise,tabDropdown:t.tabDropdown}}}(t.Header||(t.Header={}))}(wt||(wt={})),function(t){function e(t){const e=t.length,i=new Array(e);for(let n=0;n<e;n++)i[n]=Ct.createCopy(t[n]);return i}t.defaultActiveItemIndex=0,t.createCopy=function(t,i){return{type:t.type,content:e(void 0!==i?i:t.content),size:t.size,sizeUnit:t.sizeUnit,minSize:t.minSize,minSizeUnit:t.minSizeUnit,id:t.id,maximised:t.maximised,isClosable:t.isClosable,activeItemIndex:t.activeItemIndex,header:wt.Header.createCopy(t.header)}},t.copyContent=e,t.createDefault=function(){return{type:ft.stack,content:[],size:Ct.defaults.size,sizeUnit:Ct.defaults.sizeUnit,minSize:Ct.defaults.minSize,minSizeUnit:Ct.defaults.minSizeUnit,id:Ct.defaults.id,maximised:wt.defaultMaximised,isClosable:Ct.defaults.isClosable,activeItemIndex:t.defaultActiveItemIndex,header:void 0}}}(bt||(bt={})),function(t){t.defaultReorderEnabled=!0,t.resolveComponentTypeName=function(t){const e=t.componentType;return"string"==typeof e?e:void 0},t.createCopy=function(t){return{type:t.type,content:[],size:t.size,sizeUnit:t.sizeUnit,minSize:t.minSize,minSizeUnit:t.minSizeUnit,id:t.id,maximised:t.maximised,isClosable:t.isClosable,reorderEnabled:t.reorderEnabled,title:t.title,header:wt.Header.createCopy(t.header),componentType:t.componentType,componentState:Gt(void 0,t.componentState)}},t.createDefault=function(e="",i,n=""){return{type:ft.component,content:[],size:Ct.defaults.size,sizeUnit:Ct.defaults.sizeUnit,minSize:Ct.defaults.minSize,minSizeUnit:Ct.defaults.minSizeUnit,id:Ct.defaults.id,maximised:wt.defaultMaximised,isClosable:Ct.defaults.isClosable,reorderEnabled:t.defaultReorderEnabled,title:n,header:void 0,componentType:e,componentState:i}},t.copyComponentType=function(t){return Gt({},t)}}(It||(It={})),function(t){function e(t){const e=t.length,i=new Array(e);for(let n=0;n<e;n++)i[n]=Ct.createCopy(t[n]);return i}t.isChildItemConfig=function(t){switch(t.type){case ft.row:case ft.column:case ft.stack:case ft.component:return!0;case ft.ground:return!1;default:throw new rt("CROCOSPCICIC13687",t.type)}},t.createCopy=function(t,i){return{type:t.type,content:e(void 0!==i?i:t.content),size:t.size,sizeUnit:t.sizeUnit,minSize:t.minSize,minSizeUnit:t.minSizeUnit,id:t.id,isClosable:t.isClosable}},t.copyContent=e,t.createDefault=function(t){return{type:t,content:[],size:Ct.defaults.size,sizeUnit:Ct.defaults.sizeUnit,minSize:Ct.defaults.minSize,minSizeUnit:Ct.defaults.minSizeUnit,id:Ct.defaults.id,isClosable:Ct.defaults.isClosable}}}(St||(St={})),function(t){t.createCopy=function(t){return Ct.createCopy(t)},t.isRootItemConfig=function(t){switch(t.type){case ft.row:case ft.column:case ft.stack:case ft.component:return!0;case ft.ground:return!1;default:throw new rt("CROCOSPCICIC13687",t.type)}}}(Et||(Et={})),function(t){t.create=function(t){const e=void 0===t?[]:[t];return{type:ft.ground,content:e,size:100,sizeUnit:_t.Percent,minSize:0,minSizeUnit:_t.Pixel,id:"",isClosable:!1,title:"",reorderEnabled:!1}}}(xt||(xt={})),function(t){var e,i;function n(t){return"parentId"in t}(e=t.Settings||(t.Settings={})).defaults={constrainDragToContainer:!0,reorderEnabled:!0,popoutWholeStack:!1,blockedPopoutsThrowError:!0,closePopoutsOnUnload:!0,responsiveMode:vt.none,tabOverlapAllowance:0,reorderOnTabMenuClick:!0,tabControlOffset:10,popInOnClose:!1,disableTabOverflowDropdown:!1,tabOverflowBehavior:"dropdown"},e.createCopy=function(t){return{constrainDragToContainer:t.constrainDragToContainer,reorderEnabled:t.reorderEnabled,popoutWholeStack:t.popoutWholeStack,blockedPopoutsThrowError:t.blockedPopoutsThrowError,closePopoutsOnUnload:t.closePopoutsOnUnload,responsiveMode:t.responsiveMode,tabOverlapAllowance:t.tabOverlapAllowance,reorderOnTabMenuClick:t.reorderOnTabMenuClick,tabControlOffset:t.tabControlOffset,popInOnClose:t.popInOnClose,disableTabOverflowDropdown:t.disableTabOverflowDropdown,tabOverflowBehavior:t.tabOverflowBehavior}},(i=t.Dimensions||(t.Dimensions={})).createCopy=function(t){return{borderWidth:t.borderWidth,borderGrabWidth:t.borderGrabWidth,defaultMinItemHeight:t.defaultMinItemHeight,defaultMinItemHeightUnit:t.defaultMinItemHeightUnit,defaultMinItemWidth:t.defaultMinItemWidth,defaultMinItemWidthUnit:t.defaultMinItemWidthUnit,headerHeight:t.headerHeight,dragProxyWidth:t.dragProxyWidth,dragProxyHeight:t.dragProxyHeight}},i.defaults={borderWidth:5,borderGrabWidth:5,defaultMinItemHeight:0,defaultMinItemHeightUnit:_t.Pixel,defaultMinItemWidth:10,defaultMinItemWidthUnit:_t.Pixel,headerHeight:20,dragProxyWidth:300,dragProxyHeight:200},function(t){t.createCopy=function(t){return{show:t.show,popout:t.popout,dock:t.dock,close:t.close,maximise:t.maximise,minimise:t.minimise,tabDropdown:t.tabDropdown}},t.defaults={show:ut.top,popout:"open in new window",dock:"dock",maximise:"maximise",minimise:"minimise",close:"close",tabDropdown:"additional tabs"}}(t.Header||(t.Header={})),t.isPopout=n,t.createDefault=function(){return{root:void 0,openPopouts:[],dimensions:t.Dimensions.defaults,settings:t.Settings.defaults,header:t.Header.defaults,resolved:!0}},t.createCopy=function(e){return n(e)?zt.createCopy(e):{root:void 0===e.root?void 0:Et.createCopy(e.root),openPopouts:t.copyOpenPopouts(e.openPopouts),settings:t.Settings.createCopy(e.settings),dimensions:t.Dimensions.createCopy(e.dimensions),header:t.Header.createCopy(e.header),resolved:e.resolved}},t.copyOpenPopouts=function(t){const e=t.length,i=new Array(e);for(let n=0;n<e;n++)i[n]=zt.createCopy(t[n]);return i},t.minifyConfig=function(t){return yt.translateObject(t,!0)},t.unminifyConfig=function(t){return yt.translateObject(t,!1)}}(Lt||(Lt={})),function(t){var e;(e=t.Window||(t.Window={})).createCopy=function(t){return{width:t.width,height:t.height,left:t.left,top:t.top}},e.defaults={width:null,height:null,left:null,top:null},t.createCopy=function(e){return{root:void 0===e.root?void 0:Et.createCopy(e.root),openPopouts:Lt.copyOpenPopouts(e.openPopouts),settings:Lt.Settings.createCopy(e.settings),dimensions:Lt.Dimensions.createCopy(e.dimensions),header:Lt.Header.createCopy(e.header),parentId:e.parentId,indexInParent:e.indexInParent,window:t.Window.createCopy(e.window),resolved:e.resolved}}}(zt||(zt={})),function(t){t.resolve=function(t,e){switch(t.type){case ft.ground:throw new tt("ItemConfig cannot specify type ground",JSON.stringify(t));case ft.row:case ft.column:return kt.resolve(t,e);case ft.stack:return Tt.resolve(t,e);case ft.component:return At.resolve(t,e);default:throw new rt("UCUICR55499",t.type)}},t.resolveContent=function(e){if(void 0===e)return[];{const i=e.length,n=new Array(i);for(let o=0;o<i;o++)n[o]=t.resolve(e[o],!1);return n}},t.resolveId=function(t){return void 0===t?Ct.defaults.id:Array.isArray(t)?0===t.length?Ct.defaults.id:t[0]:t},t.resolveSize=function(t,e,i,n){if(void 0!==t)return qt(t,[_t.Percent,_t.Fractional]);if(void 0!==e||void 0!==i){if(void 0!==e)return{size:e,sizeUnit:_t.Percent};if(void 0!==i)return{size:i,sizeUnit:_t.Percent};throw new lt("CRS33390")}return n?{size:50,sizeUnit:_t.Percent}:{size:Ct.defaults.size,sizeUnit:Ct.defaults.sizeUnit}},t.resolveMinSize=function(t,e,i){if(void 0!==t)return qt(t,[_t.Pixel]);{const t=void 0!==e;return t||void 0!==i?t?{size:e,sizeUnit:_t.Pixel}:{size:i,sizeUnit:_t.Pixel}:{size:Ct.defaults.minSize,sizeUnit:Ct.defaults.minSizeUnit}}},t.calculateSizeWidthHeightSpecificationType=function(t){return void 0!==t.size?1:void 0!==t.width||void 0!==t.height?2:0},t.isGround=function(t){return t.type===ft.ground},t.isRow=function(t){return t.type===ft.row},t.isColumn=function(t){return t.type===ft.column},t.isStack=function(t){return t.type===ft.stack},t.isComponent=function(t){return t.type===ft.component}}(Mt||(Mt={})),function(t){!function(t){t.resolve=function(t,e){var i;if(void 0!==t||void 0!==e){return{show:null!==(i=null==t?void 0:t.show)&&void 0!==i?i:void 0===e?void 0:!!e&&Lt.Header.defaults.show,popout:null==t?void 0:t.popout,maximise:null==t?void 0:t.maximise,close:null==t?void 0:t.close,minimise:null==t?void 0:t.minimise,tabDropdown:null==t?void 0:t.tabDropdown}}}}(t.Header||(t.Header={})),t.resolveIdAndMaximised=function(t){let e,i,n=t.id,o=!1;if(void 0===n)e=Ct.defaults.id;else if(Array.isArray(n)){const t=n.findIndex((t=>"__glMaximised"===t));t>0&&(o=!0,n=n.splice(t,1)),e=n.length>0?n[0]:Ct.defaults.id}else e=n;return i=void 0!==t.maximised?t.maximised:o,{id:e,maximised:i}}}(Pt||(Pt={})),function(t){function e(t){if(void 0===t)return[];{const e=t.length,i=new Array(e);for(let n=0;n<e;n++){const e=t[n],o=Mt.resolve(e,!1);if(!Ct.isComponentItem(o))throw new st("UCUSICRC91114",JSON.stringify(o));i[n]=o}return i}}function i(t){const e=t.length,i=new Array(e);for(let n=0;n<e;n++){const e=t[n];i[n]=At.fromResolved(e)}return i}t.resolve=function(t,i){var n,o;const{id:s,maximised:r}=Pt.resolveIdAndMaximised(t),{size:a,sizeUnit:l}=Mt.resolveSize(t.size,t.width,t.height,i),{size:h,sizeUnit:d}=Mt.resolveMinSize(t.minSize,t.minWidth,t.minHeight);return{type:ft.stack,content:e(t.content),size:a,sizeUnit:l,minSize:h,minSizeUnit:d,id:s,maximised:r,isClosable:null!==(n=t.isClosable)&&void 0!==n?n:Ct.defaults.isClosable,activeItemIndex:null!==(o=t.activeItemIndex)&&void 0!==o?o:bt.defaultActiveItemIndex,header:Pt.Header.resolve(t.header,t.hasHeaders)}},t.fromResolved=function(t){return{type:ft.stack,content:i(t.content),size:Zt(t.size,t.sizeUnit),minSize:Xt(t.minSize,t.minSizeUnit),id:t.id,maximised:t.maximised,isClosable:t.isClosable,activeItemIndex:t.activeItemIndex,header:wt.Header.createCopy(t.header)}}}(Tt||(Tt={})),function(t){t.resolve=function(e,i){var n,o,s;let r=e.componentType;if(void 0===r&&(r=e.componentName),void 0===r)throw new Error("ComponentItemConfig.componentType is undefined");{const{id:a,maximised:l}=Pt.resolveIdAndMaximised(e);let h;h=void 0===e.title||""===e.title?t.componentTypeToTitle(r):e.title;const{size:d,sizeUnit:c}=Mt.resolveSize(e.size,e.width,e.height,i),{size:u,sizeUnit:m}=Mt.resolveMinSize(e.minSize,e.minWidth,e.minHeight);return{type:e.type,content:[],size:d,sizeUnit:c,minSize:u,minSizeUnit:m,id:a,maximised:l,isClosable:null!==(n=e.isClosable)&&void 0!==n?n:Ct.defaults.isClosable,reorderEnabled:null!==(o=e.reorderEnabled)&&void 0!==o?o:It.defaultReorderEnabled,title:h,header:Pt.Header.resolve(e.header,e.hasHeaders),componentType:r,componentState:null!==(s=e.componentState)&&void 0!==s?s:{}}}},t.fromResolved=function(t){return{type:ft.component,size:Zt(t.size,t.sizeUnit),minSize:Xt(t.minSize,t.minSizeUnit),id:t.id,maximised:t.maximised,isClosable:t.isClosable,reorderEnabled:t.reorderEnabled,title:t.title,header:wt.Header.createCopy(t.header),componentType:t.componentType,componentState:Gt(void 0,t.componentState)}},t.componentTypeToTitle=function(t){switch(typeof t){case"string":return t;case"number":case"boolean":return t.toString();default:return""}}}(At||(At={})),function(t){function e(e){const i=e.length,n=new Array(i);for(let o=0;o<i;o++){const i=e[o],s=i.type;let r;switch(s){case ft.row:case ft.column:r=t.fromResolved(i);break;case ft.stack:r=Tt.fromResolved(i);break;case ft.component:r=At.fromResolved(i);break;default:throw new rt("ROCICFRC44797",s)}n[o]=r}return n}t.isChildItemConfig=function(t){switch(t.type){case ft.row:case ft.column:case ft.stack:case ft.component:return!0;case ft.ground:return!1;default:throw new rt("UROCOSPCICIC13687",t.type)}},t.resolve=function(e,i){var n;const{size:o,sizeUnit:s}=Mt.resolveSize(e.size,e.width,e.height,i),{size:r,sizeUnit:a}=Mt.resolveMinSize(e.minSize,e.minWidth,e.minHeight);return{type:e.type,content:t.resolveContent(e.content),size:o,sizeUnit:s,minSize:r,minSizeUnit:a,id:Mt.resolveId(e.id),isClosable:null!==(n=e.isClosable)&&void 0!==n?n:Ct.defaults.isClosable}},t.fromResolved=function(t){return{type:t.type,content:e(t.content),size:Zt(t.size,t.sizeUnit),minSize:Xt(t.minSize,t.minSizeUnit),id:t.id,isClosable:t.isClosable}},t.resolveContent=function(e){if(void 0===e)return[];{const i=e.length,n=new Array(i);let o,s=!1,r=!1;for(let o=0;o<i;o++){const i=e[o];if(!t.isChildItemConfig(i))throw new tt("ItemConfig is not Row, Column or Stack",i);if(!r){const t=Mt.calculateSizeWidthHeightSpecificationType(i);switch(t){case 0:break;case 2:s=!0;break;case 1:r=!0;break;default:throw new rt("ROCICRC87556",t)}}n[o]=i}o=!r&&!!s;const a=new Array(i);for(let t=0;t<i;t++){const e=n[t],i=Mt.resolve(e,o);if(!St.isChildItemConfig(i))throw new st("UROCOSPIC99512",JSON.stringify(i));a[t]=i}return a}}}(kt||(kt={})),function(t){t.isRootItemConfig=function(t){switch(t.type){case ft.row:case ft.column:case ft.stack:case ft.component:return!0;case ft.ground:return!1;default:throw new rt("URICIR23687",t.type)}},t.resolve=function(t){if(void 0!==t){const e=Mt.resolve(t,!1);if(Et.isRootItemConfig(e))return e;throw new tt("ItemConfig is not Row, Column or Stack",JSON.stringify(t))}},t.fromResolvedOrUndefined=function(t){if(void 0!==t){const e=t.type;switch(e){case ft.row:case ft.column:return kt.fromResolved(t);case ft.stack:return Tt.fromResolved(t);case ft.component:return At.fromResolved(t);default:throw new rt("RICFROU89921",e)}}}}(Dt||(Dt={})),function(t){var e;function i(t){return"parentId"in t||"indexInParent"in t||"window"in t}(t.Settings||(t.Settings={})).resolve=function(t){var e,i,n,o,s,r,a,l,h,d,c,u;return{constrainDragToContainer:null!==(e=null==t?void 0:t.constrainDragToContainer)&&void 0!==e?e:Lt.Settings.defaults.constrainDragToContainer,reorderEnabled:null!==(i=null==t?void 0:t.reorderEnabled)&&void 0!==i?i:Lt.Settings.defaults.reorderEnabled,popoutWholeStack:null!==(n=null==t?void 0:t.popoutWholeStack)&&void 0!==n?n:Lt.Settings.defaults.popoutWholeStack,blockedPopoutsThrowError:null!==(o=null==t?void 0:t.blockedPopoutsThrowError)&&void 0!==o?o:Lt.Settings.defaults.blockedPopoutsThrowError,closePopoutsOnUnload:null!==(s=null==t?void 0:t.closePopoutsOnUnload)&&void 0!==s?s:Lt.Settings.defaults.closePopoutsOnUnload,responsiveMode:null!==(r=null==t?void 0:t.responsiveMode)&&void 0!==r?r:Lt.Settings.defaults.responsiveMode,tabOverlapAllowance:null!==(a=null==t?void 0:t.tabOverlapAllowance)&&void 0!==a?a:Lt.Settings.defaults.tabOverlapAllowance,reorderOnTabMenuClick:null!==(l=null==t?void 0:t.reorderOnTabMenuClick)&&void 0!==l?l:Lt.Settings.defaults.reorderOnTabMenuClick,tabControlOffset:null!==(h=null==t?void 0:t.tabControlOffset)&&void 0!==h?h:Lt.Settings.defaults.tabControlOffset,popInOnClose:null!==(d=null==t?void 0:t.popInOnClose)&&void 0!==d?d:Lt.Settings.defaults.popInOnClose,disableTabOverflowDropdown:null!==(c=null==t?void 0:t.disableTabOverflowDropdown)&&void 0!==c?c:Lt.Settings.defaults.disableTabOverflowDropdown,tabOverflowBehavior:null!==(u=null==t?void 0:t.tabOverflowBehavior)&&void 0!==u?u:Lt.Settings.defaults.tabOverflowBehavior}},(e=t.Dimensions||(t.Dimensions={})).resolve=function(t){var i,n,o,s,r;const{size:a,sizeUnit:l}=e.resolveDefaultMinItemHeight(t),{size:h,sizeUnit:d}=e.resolveDefaultMinItemWidth(t);return{borderWidth:null!==(i=null==t?void 0:t.borderWidth)&&void 0!==i?i:Lt.Dimensions.defaults.borderWidth,borderGrabWidth:null!==(n=null==t?void 0:t.borderGrabWidth)&&void 0!==n?n:Lt.Dimensions.defaults.borderGrabWidth,defaultMinItemHeight:a,defaultMinItemHeightUnit:l,defaultMinItemWidth:h,defaultMinItemWidthUnit:d,headerHeight:null!==(o=null==t?void 0:t.headerHeight)&&void 0!==o?o:Lt.Dimensions.defaults.headerHeight,dragProxyWidth:null!==(s=null==t?void 0:t.dragProxyWidth)&&void 0!==s?s:Lt.Dimensions.defaults.dragProxyWidth,dragProxyHeight:null!==(r=null==t?void 0:t.dragProxyHeight)&&void 0!==r?r:Lt.Dimensions.defaults.dragProxyHeight}},e.fromResolved=function(t){return{borderWidth:t.borderWidth,borderGrabWidth:t.borderGrabWidth,defaultMinItemHeight:Zt(t.defaultMinItemHeight,t.defaultMinItemHeightUnit),defaultMinItemWidth:Zt(t.defaultMinItemWidth,t.defaultMinItemWidthUnit),headerHeight:t.headerHeight,dragProxyWidth:t.dragProxyWidth,dragProxyHeight:t.dragProxyHeight}},e.resolveDefaultMinItemHeight=function(t){const e=null==t?void 0:t.defaultMinItemHeight;return void 0===e?{size:Lt.Dimensions.defaults.defaultMinItemHeight,sizeUnit:Lt.Dimensions.defaults.defaultMinItemHeightUnit}:qt(e,[_t.Pixel])},e.resolveDefaultMinItemWidth=function(t){const e=null==t?void 0:t.defaultMinItemWidth;return void 0===e?{size:Lt.Dimensions.defaults.defaultMinItemWidth,sizeUnit:Lt.Dimensions.defaults.defaultMinItemWidthUnit}:qt(e,[_t.Pixel])},function(t){t.resolve=function(t,e,i){var n,o,s,r,a,l,h,d,c,u,m,p;let g;return g=void 0!==(null==t?void 0:t.show)?t.show:void 0!==e&&void 0!==e.hasHeaders?!!e.hasHeaders&&Lt.Header.defaults.show:Lt.Header.defaults.show,{show:g,popout:null!==(o=null!==(n=null==t?void 0:t.popout)&&void 0!==n?n:null==i?void 0:i.popout)&&void 0!==o?o:!1!==(null==e?void 0:e.showPopoutIcon)&&Lt.Header.defaults.popout,dock:null!==(r=null!==(s=null==t?void 0:t.popin)&&void 0!==s?s:null==i?void 0:i.popin)&&void 0!==r?r:Lt.Header.defaults.dock,maximise:null!==(l=null!==(a=null==t?void 0:t.maximise)&&void 0!==a?a:null==i?void 0:i.maximise)&&void 0!==l?l:!1!==(null==e?void 0:e.showMaximiseIcon)&&Lt.Header.defaults.maximise,close:null!==(d=null!==(h=null==t?void 0:t.close)&&void 0!==h?h:null==i?void 0:i.close)&&void 0!==d?d:!1!==(null==e?void 0:e.showCloseIcon)&&Lt.Header.defaults.close,minimise:null!==(u=null!==(c=null==t?void 0:t.minimise)&&void 0!==c?c:null==i?void 0:i.minimise)&&void 0!==u?u:Lt.Header.defaults.minimise,tabDropdown:null!==(p=null!==(m=null==t?void 0:t.tabDropdown)&&void 0!==m?m:null==i?void 0:i.tabDropdown)&&void 0!==p?p:Lt.Header.defaults.tabDropdown}}}(t.Header||(t.Header={})),t.isPopout=i,t.resolve=function(e){if(i(e))return Ot.resolve(e);{let i;i=void 0!==e.root?e.root:void 0!==e.content&&e.content.length>0?e.content[0]:void 0;return{resolved:!0,root:Dt.resolve(i),openPopouts:t.resolveOpenPopouts(e.openPopouts),dimensions:t.Dimensions.resolve(e.dimensions),settings:t.Settings.resolve(e.settings),header:t.Header.resolve(e.header,e.settings,e.labels)}}},t.fromResolved=function(e){return{root:Dt.fromResolvedOrUndefined(e.root),openPopouts:Ot.fromResolvedArray(e.openPopouts),settings:Lt.Settings.createCopy(e.settings),dimensions:t.Dimensions.fromResolved(e.dimensions),header:Lt.Header.createCopy(e.header)}},t.isResolved=function(t){const e=t;return void 0!==e.resolved&&!0===e.resolved},t.resolveOpenPopouts=function(t){if(void 0===t)return[];{const e=t.length,i=new Array(e);for(let n=0;n<e;n++)i[n]=Ot.resolve(t[n]);return i}}}(Rt||(Rt={})),function(t){var e;function i(e){const i=e.length,n=new Array(i);for(let o=0;o<i;o++){const i=e[o];n[o]=t.fromResolved(i)}return n}(e=t.Window||(t.Window={})).resolve=function(t,e){var i,n,o,s,r,a,l,h;let d;const c=zt.Window.defaults;return d=void 0!==t?{width:null!==(i=t.width)&&void 0!==i?i:c.width,height:null!==(n=t.height)&&void 0!==n?n:c.height,left:null!==(o=t.left)&&void 0!==o?o:c.left,top:null!==(s=t.top)&&void 0!==s?s:c.top}:{width:null!==(r=null==e?void 0:e.width)&&void 0!==r?r:c.width,height:null!==(a=null==e?void 0:e.height)&&void 0!==a?a:c.height,left:null!==(l=null==e?void 0:e.left)&&void 0!==l?l:c.left,top:null!==(h=null==e?void 0:e.top)&&void 0!==h?h:c.top},d},e.fromResolved=function(t){return{width:null===t.width?void 0:t.width,height:null===t.height?void 0:t.height,left:null===t.left?void 0:t.left,top:null===t.top?void 0:t.top}},t.resolve=function(e){var i,n;let o;return o=void 0!==e.root?e.root:void 0!==e.content&&e.content.length>0?e.content[0]:void 0,{root:Dt.resolve(o),openPopouts:Rt.resolveOpenPopouts(e.openPopouts),dimensions:Rt.Dimensions.resolve(e.dimensions),settings:Rt.Settings.resolve(e.settings),header:Rt.Header.resolve(e.header,e.settings,e.labels),parentId:null!==(i=e.parentId)&&void 0!==i?i:null,indexInParent:null!==(n=e.indexInParent)&&void 0!==n?n:null,window:t.Window.resolve(e.window,e.dimensions),resolved:!0}},t.fromResolved=function(e){return{root:Dt.fromResolvedOrUndefined(e.root),openPopouts:i(e.openPopouts),dimensions:Rt.Dimensions.fromResolved(e.dimensions),settings:Lt.Settings.createCopy(e.settings),header:Lt.Header.createCopy(e.header),parentId:e.parentId,indexInParent:e.indexInParent,window:t.Window.fromResolved(e.window)}},t.fromResolvedArray=i}(Ot||(Ot={}));class Yt{constructor(){this._allEventSubscriptions=[],this._subscriptionsMap=new Map,this.unbind=this.removeEventListener,this.trigger=this.emit}tryBubbleEvent(t,e){}emit(t,...e){let i=this._subscriptionsMap.get(t);if(void 0!==i){i=i.slice();for(let t=0;t<i.length;t++){(0,i[t])(...e)}}this.emitAllEvent(t,e),this.tryBubbleEvent(t,e)}emitUnknown(t,...e){let i=this._subscriptionsMap.get(t);if(void 0!==i){i=i.slice();for(let t=0;t<i.length;t++)i[t](...e)}this.emitAllEvent(t,e),this.tryBubbleEvent(t,e)}emitBaseBubblingEvent(t){const e=new Yt.BubblingEvent(t,this);this.emitUnknown(t,e)}emitUnknownBubblingEvent(t){const e=new Yt.BubblingEvent(t,this);this.emitUnknown(t,e)}removeEventListener(t,e){const i=e;this.removeUnknownEventListener(t,i)}off(t,e){this.removeEventListener(t,e)}addEventListener(t,e){const i=e;this.addUnknownEventListener(t,i)}on(t,e){this.addEventListener(t,e)}addUnknownEventListener(t,e){if(t===Yt.ALL_EVENT)this._allEventSubscriptions.push(e);else{let i=this._subscriptionsMap.get(t);void 0!==i?i.push(e):(i=[e],this._subscriptionsMap.set(t,i))}}removeUnknownEventListener(t,e){if(t===Yt.ALL_EVENT)this.removeSubscription(t,this._allEventSubscriptions,e);else{const i=this._subscriptionsMap.get(t);if(void 0===i)throw new Error("No subscribtions to unsubscribe for event "+t);this.removeSubscription(t,i,e)}}removeSubscription(t,e,i){const n=e.indexOf(i);if(n<0)throw new Error("Nothing to unbind for "+t);e.splice(n,1)}emitAllEvent(t,e){const i=this._allEventSubscriptions.length;if(i>0){const n=e.slice();n.unshift(t);const o=this._allEventSubscriptions.slice();for(let t=0;t<i;t++)o[t](...n)}}}!function(t){t.ALL_EVENT="__all",t.headerClickEventName="stackHeaderClick",t.headerTouchStartEventName="stackHeaderTouchStart";class e{constructor(t,e){this._name=t,this._target=e,this._isPropagationStopped=!1}get name(){return this._name}get target(){return this._target}get origin(){return this._target}get isPropagationStopped(){return this._isPropagationStopped}stopPropagation(){this._isPropagationStopped=!0}}t.BubblingEvent=e;t.ClickBubblingEvent=class extends e{constructor(t,e,i){super(t,e),this._mouseEvent=i}get mouseEvent(){return this._mouseEvent}};t.TouchStartBubblingEvent=class extends e{constructor(t,e,i){super(t,e),this._touchEvent=i}get touchEvent(){return this._touchEvent}}}(Yt||(Yt={}));class Kt extends Yt{constructor(t,e,i,n,o,s,r,a,l){super(),this._config=t,this._parent=e,this._layoutManager=i,this._element=n,this._updateItemConfigEvent=o,this._showEvent=s,this._hideEvent=r,this._focusEvent=a,this._blurEvent=l,this._stackMaximised=!1,this._width=0,this._height=0,this._visible=!0,this._isShownWithZeroDimensions=!0,this._componentType=t.componentType,this._isClosable=t.isClosable,this._initialState=t.componentState,this._state=this._initialState,this._boundComponent=this.layoutManager.bindComponent(this,t),this.updateElementPositionPropertyFromBoundComponent()}get width(){return this._width}get height(){return this._height}get parent(){return this._parent}get componentName(){return this._componentType}get componentType(){return this._componentType}get virtual(){return this._boundComponent.virtual}get component(){return this._boundComponent.component}get tab(){return this._tab}get title(){return this._parent.title}get layoutManager(){return this._layoutManager}get isHidden(){return!this._visible}get visible(){return this._visible}get state(){return this._state}get initialState(){return this._initialState}get element(){return this._element}destroy(){this.releaseComponent(),this.stateRequestEvent=void 0,this.emit("destroy")}getElement(){return this._element}hide(){this._hideEvent()}show(){this._showEvent()}focus(t=!1){this._focusEvent(t)}blur(t=!1){this._blurEvent(t)}setSize(t,e){let i=this._parent;if(i.isColumn||i.isRow||null===i.parent)throw new st("ICSSPRC","ComponentContainer cannot have RowColumn Parent");{let n;do{n=i,i=i.parent}while(null!==i&&!i.isColumn&&!i.isRow);if(null===i)return!1;{const o=i.isColumn?"height":"width",s=this[o];if(null===s)throw new at("ICSSCS11194");{const r=("height"===o?e:t)/(s*(1/(n.size/100)))*100,a=(n.size-r)/(i.contentItems.length-1);for(let t=0;t<i.contentItems.length;t++){const e=i.contentItems[t];e===n?e.size=r:e.size+=a}return i.updateSize(!1),!0}}}}close(){this._isClosable&&(this.emit("close"),this._parent.close())}replaceComponent(t){if(this.releaseComponent(),!Mt.isComponent(t))throw new Error("ReplaceComponent not passed a component ItemConfig");{const e=At.resolve(t,!1);if(this._initialState=e.componentState,this._state=this._initialState,this._componentType=e.componentType,this._updateItemConfigEvent(e),this._boundComponent=this.layoutManager.bindComponent(this,e),this.updateElementPositionPropertyFromBoundComponent(),this._boundComponent.virtual){if(void 0!==this.virtualVisibilityChangeRequiredEvent&&this.virtualVisibilityChangeRequiredEvent(this,this._visible),void 0!==this.virtualRectingRequiredEvent){this._layoutManager.fireBeforeVirtualRectingEvent(1);try{this.virtualRectingRequiredEvent(this,this._width,this._height)}finally{this._layoutManager.fireAfterVirtualRectingEvent()}}this.setBaseLogicalZIndex()}this.emit("stateChanged")}}getState(){return this._state}extendState(t){const e=jt(this._state,t);this.setState(e)}setState(t){this._state=t,this._parent.emitBaseBubblingEvent("stateChanged")}setTitle(t){this._parent.setTitle(t)}setTab(t){this._tab=t,this.emit("tab",t)}setVisibility(t){this._boundComponent.virtual&&void 0!==this.virtualVisibilityChangeRequiredEvent&&this.virtualVisibilityChangeRequiredEvent(this,t),t?this._visible?!this._isShownWithZeroDimensions||0===this._height&&0===this._width||(this._isShownWithZeroDimensions=!1,this.setSizeToNodeSize(this._width,this._height,!0),this.emitShow()):(this._visible=!0,0===this._height&&0===this._width?this._isShownWithZeroDimensions=!0:(this._isShownWithZeroDimensions=!1,this.setSizeToNodeSize(this._width,this._height,!0),this.emitShow())):this._visible&&(this._visible=!1,this._isShownWithZeroDimensions=!1,this.emitHide())}setBaseLogicalZIndex(){this.setLogicalZIndex(mt.base)}setLogicalZIndex(t){t!==this._logicalZIndex&&(this._logicalZIndex=t,this.notifyVirtualZIndexChangeRequired())}enterDragMode(t,e){this._width=t,this._height=e,Wt(this._element,t),Ht(this._element,e),this.setLogicalZIndex(mt.drag),this.drag()}exitDragMode(){this.setBaseLogicalZIndex()}enterStackMaximised(){this._stackMaximised=!0,this.setLogicalZIndex(mt.stackMaximised)}exitStackMaximised(){this.setBaseLogicalZIndex(),this._stackMaximised=!1}drag(){if(this._boundComponent.virtual&&void 0!==this.virtualRectingRequiredEvent){this._layoutManager.fireBeforeVirtualRectingEvent(1);try{this.virtualRectingRequiredEvent(this,this._width,this._height)}finally{this._layoutManager.fireAfterVirtualRectingEvent()}}}setSizeToNodeSize(t,e,i){(t!==this._width||e!==this._height||i)&&(this._width=t,this._height=e,Wt(this._element,t),Ht(this._element,e),this._boundComponent.virtual?this.addVirtualSizedContainerToLayoutManager():(this.emit("resize"),this.checkShownFromZeroDimensions()))}notifyVirtualRectingRequired(){void 0!==this.virtualRectingRequiredEvent&&(this.virtualRectingRequiredEvent(this,this._width,this._height),this.emit("resize"),this.checkShownFromZeroDimensions())}notifyVirtualZIndexChangeRequired(){if(void 0!==this.virtualZIndexChangeRequiredEvent){const t=this._logicalZIndex,e=pt[t];this.virtualZIndexChangeRequiredEvent(this,t,e)}}updateElementPositionPropertyFromBoundComponent(){this._boundComponent.virtual?this._element.style.position="static":this._element.style.position=""}addVirtualSizedContainerToLayoutManager(){this._layoutManager.beginVirtualSizedContainerAdding();try{this._layoutManager.addVirtualSizedContainer(this)}finally{this._layoutManager.endVirtualSizedContainerAdding()}}checkShownFromZeroDimensions(){!this._isShownWithZeroDimensions||0===this._height&&0===this._width||(this._isShownWithZeroDimensions=!1,this.emitShow())}emitShow(){this.emit("shown"),this.emit("show")}emitHide(){this.emit("hide")}releaseComponent(){this._stackMaximised&&this.exitStackMaximised(),this.emit("beforeComponentRelease",this._boundComponent.component),this.layoutManager.unbindComponent(this,this._boundComponent.virtual,this._boundComponent.component)}}class Jt extends Yt{constructor(t,e,i){super(),this._config=t,this._initialWindowSize=e,this._layoutManager=i,this._isInitialised=!1,this._popoutWindow=null,this.createWindow()}toConfig(){var t,e;if(!1===this._isInitialised)throw new Error("Can't create config, layout not yet initialised");const i=this.getGlInstance().saveLayout();let n,o;null===this._popoutWindow?(n=null,o=null):(n=null!==(t=this._popoutWindow.screenX)&&void 0!==t?t:this._popoutWindow.screenLeft,o=null!==(e=this._popoutWindow.screenY)&&void 0!==e?e:this._popoutWindow.screenTop);const s={width:this.getGlInstance().width,height:this.getGlInstance().height,left:n,top:o};return{root:i.root,openPopouts:i.openPopouts,settings:i.settings,dimensions:i.dimensions,header:i.header,window:s,parentId:this._config.parentId,indexInParent:this._config.indexInParent,resolved:!0}}getGlInstance(){if(null===this._popoutWindow)throw new at("BPGGI24693");return this._popoutWindow.__glInstance}getWindow(){if(null===this._popoutWindow)throw new at("BPGW087215");return this._popoutWindow}close(){if(this.getGlInstance())this.getGlInstance().closeWindow();else try{this.getWindow().close()}catch(t){}}popIn(){let t,e=this._config.indexInParent;if(!this._config.parentId)return;const i=jt({},this.getGlInstance().saveLayout()).root;if(void 0===i)throw new lt("BPPIR19998");const n=this._layoutManager.groundItem;if(void 0===n)throw new lt("BPPIG34972");t=n.getItemsByPopInParentId(this._config.parentId)[0],t||(t=n.contentItems.length>0?n.contentItems[0]:n,e=0);const o=this._layoutManager.createAndInitContentItem(i,t);t.addChild(o,e),this._layoutManager.layoutConfig.settings.popInOnClose?this._onClose():this.close()}createWindow(){const t=this.createUrl(),e=Math.floor(1e6*Math.random()).toString(36),i=this.serializeWindowFeatures({width:this._initialWindowSize.width,height:this._initialWindowSize.height,innerWidth:this._initialWindowSize.width,innerHeight:this._initialWindowSize.height,menubar:"no",toolbar:"no",location:"no",personalbar:"no",resizable:"yes",scrollbars:"no",status:"no"});if(this._popoutWindow=globalThis.open(t,e,i),this._popoutWindow)this._popoutWindow.addEventListener("load",(()=>this.positionWindow()),{passive:!0}),this._popoutWindow.addEventListener("beforeunload",(()=>{this._layoutManager.layoutConfig.settings.popInOnClose?this.popIn():this._onClose()}),{passive:!0}),this._checkReadyInterval=setInterval((()=>this.checkReady()),10);else if(!0===this._layoutManager.layoutConfig.settings.blockedPopoutsThrowError){throw new et("Popout blocked")}}checkReady(){if(null===this._popoutWindow)throw new at("BPCR01844");this._popoutWindow.__glInstance&&this._popoutWindow.__glInstance.isInitialised&&(this.onInitialised(),void 0!==this._checkReadyInterval&&(clearInterval(this._checkReadyInterval),this._checkReadyInterval=void 0))}serializeWindowFeatures(t){const e=[];for(const i in t)e.push(i+"="+t[i].toString());return e.join(",")}createUrl(){const t="gl-window-config-"+$t(),e=Lt.minifyConfig(this._config);try{localStorage.setItem(t,JSON.stringify(e))}catch(t){throw new Error("Error while writing to localStorage "+function(t){return t instanceof Error?t.message:"string"==typeof t?t:"Unknown Error"}(t))}const i=new URL(location.href);return i.searchParams.set("gl-window",t),i.toString()}positionWindow(){if(null===this._popoutWindow)throw new Error("BrowserPopout.positionWindow: null popoutWindow");this._popoutWindow.moveTo(this._initialWindowSize.left,this._initialWindowSize.top),this._popoutWindow.focus()}onInitialised(){this._isInitialised=!0,this.getGlInstance().on("popIn",(()=>this.popIn())),this.emit("initialised")}_onClose(){setTimeout((()=>this.emit("closed")),50)}}class Qt extends Yt{constructor(t,e,i,n){super(),this.layoutManager=t,this._parent=i,this._element=n,this._popInParentIds=[],this._type=e.type,this._id=e.id,this._isInitialised=!1,this.isGround=!1,this.isRow=!1,this.isColumn=!1,this.isStack=!1,this.isComponent=!1,this.size=e.size,this.sizeUnit=e.sizeUnit,this.minSize=e.minSize,this.minSizeUnit=e.minSizeUnit,this._isClosable=e.isClosable,this._pendingEventPropagations={},this._throttledEvents=["stateChanged"],this._contentItems=this.createContentItems(e.content)}get type(){return this._type}get id(){return this._id}set id(t){this._id=t}get popInParentIds(){return this._popInParentIds}get parent(){return this._parent}get contentItems(){return this._contentItems}get isClosable(){return this._isClosable}get element(){return this._element}get isInitialised(){return this._isInitialised}static isStack(t){return t.isStack}static isComponentItem(t){return t.isComponent}static isComponentParentableItem(t){return t.isStack||t.isGround}removeChild(t,e=!1){const i=this._contentItems.indexOf(t);if(-1===i)throw new Error("Can't remove child item. Unknown content item");if(e||this._contentItems[i].destroy(),this._contentItems.splice(i,1),this._contentItems.length>0)this.updateSize(!1);else if(!this.isGround&&!0===this._isClosable){if(null===this._parent)throw new at("CIUC00874");this._parent.removeChild(this)}}addChild(t,e,i){return null!=e||(e=this._contentItems.length),this._contentItems.splice(e,0,t),t.setParent(this),!0===this._isInitialised&&!1===t._isInitialised&&t.init(),e}replaceChild(t,e,i=!1){const n=this._contentItems.indexOf(t),o=t._element.parentNode;if(-1===n)throw new st("CIRCI23232","Can't replace child. oldChild is not child of this");if(null===o)throw new at("CIRCP23232");if(o.replaceChild(e._element,t._element),!0===i&&(t._parent=null,t.destroy()),this._contentItems[n]=e,e.setParent(this),e.size=t.size,e.sizeUnit=t.sizeUnit,e.minSize=t.minSize,e.minSizeUnit=t.minSizeUnit,null===e._parent)throw new at("CIRCNC45699");!0===e._parent._isInitialised&&!1===e._isInitialised&&e.init(),this.updateSize(!1)}remove(){if(null===this._parent)throw new at("CIR11110");this._parent.removeChild(this)}popout(){const t=$t(),e=this.layoutManager.createPopoutFromContentItem(this,void 0,t,void 0);return this.emitBaseBubblingEvent("stateChanged"),e}calculateConfigContent(){const t=this._contentItems,e=t.length,i=new Array(e);for(let n=0;n<e;n++){const e=t[n];i[n]=e.toConfig()}return i}highlightDropZone(t,e,i){const n=this.layoutManager.dropTargetIndicator;if(null===n)throw new at("ACIHDZ5593");n.highlightArea(i,1)}onDrop(t,e){this.addChild(t)}show(){this.layoutManager.beginSizeInvalidation();try{Nt(this._element,!0);for(let t=0;t<this._contentItems.length;t++)this._contentItems[t].show()}finally{this.layoutManager.endSizeInvalidation()}}destroy(){for(let t=0;t<this._contentItems.length;t++)this._contentItems[t].destroy();this._contentItems=[],this.emitBaseBubblingEvent("beforeItemDestroyed"),this._element.remove(),this.emitBaseBubblingEvent("itemDestroyed")}getElementArea(t){const e=(t=null!=t?t:this._element).getBoundingClientRect(),i=e.top+document.body.scrollTop,n=e.left+document.body.scrollLeft,o=e.width,s=e.height;return{x1:n,y1:i,x2:n+o,y2:i+s,surface:o*s,contentItem:this}}init(){this._isInitialised=!0,this.emitBaseBubblingEvent("itemCreated"),this.emitUnknownBubblingEvent(this.type+"Created")}setParent(t){this._parent=t}addPopInParentId(t){this.popInParentIds.includes(t)||this.popInParentIds.push(t)}initContentItems(){for(let t=0;t<this._contentItems.length;t++)this._contentItems[t].init()}hide(){this.layoutManager.beginSizeInvalidation();try{Nt(this._element,!1)}finally{this.layoutManager.endSizeInvalidation()}}updateContentItemsSize(t){for(let e=0;e<this._contentItems.length;e++)this._contentItems[e].updateSize(t)}createContentItems(t){const e=t.length,i=new Array(e);for(let e=0;e<t.length;e++)i[e]=this.layoutManager.createContentItem(t[e],this);return i}propagateEvent(t,e){if(1===e.length){const i=e[0];i instanceof Yt.BubblingEvent&&!1===i.isPropagationStopped&&!0===this._isInitialised&&(!1===this.isGround&&this._parent?this._parent.emitUnknown(t,i):this.scheduleEventPropagationToLayoutManager(t,i))}}tryBubbleEvent(t,e){if(1===e.length){const i=e[0];i instanceof Yt.BubblingEvent&&!1===i.isPropagationStopped&&!0===this._isInitialised&&(!1===this.isGround&&this._parent?this._parent.emitUnknown(t,i):this.scheduleEventPropagationToLayoutManager(t,i))}}scheduleEventPropagationToLayoutManager(t,e){-1===this._throttledEvents.indexOf(t)?this.layoutManager.emitUnknown(t,e):!0!==this._pendingEventPropagations[t]&&(this._pendingEventPropagations[t]=!0,globalThis.requestAnimationFrame((()=>this.propagateEventToLayoutManager(t,e))))}propagateEventToLayoutManager(t,e){this._pendingEventPropagations[t]=!1,this.layoutManager.emitUnknown(t,e)}}class te extends Qt{constructor(t,e,i){super(t,e,i,document.createElement("div")),this._parentItem=i,this._focused=!1,this.isComponent=!0,this._reorderEnabled=e.reorderEnabled,this.applyUpdatableConfig(e),this._initialWantMaximise=e.maximised;const n=document.createElement("div");n.classList.add("lm_content"),this.element.appendChild(n),this._container=new Kt(e,this,t,n,(t=>this.handleUpdateItemConfigEvent(t)),(()=>this.show()),(()=>this.hide()),(t=>this.focus(t)),(t=>this.blur(t)))}get componentName(){return this._container.componentType}get componentType(){return this._container.componentType}get reorderEnabled(){return this._reorderEnabled}get initialWantMaximise(){return this._initialWantMaximise}get component(){return this._container.component}get container(){return this._container}get parentItem(){return this._parentItem}get headerConfig(){return this._headerConfig}get title(){return this._title}get tab(){return this._tab}get focused(){return this._focused}destroy(){this._container.destroy(),super.destroy()}applyUpdatableConfig(t){this.setTitle(t.title),this._headerConfig=t.header}toConfig(){const t=this._container.stateRequestEvent,e=void 0===t?this._container.state:t();return{type:ft.component,content:[],size:this.size,sizeUnit:this.sizeUnit,minSize:this.minSize,minSizeUnit:this.minSizeUnit,id:this.id,maximised:!1,isClosable:this.isClosable,reorderEnabled:this._reorderEnabled,title:this._title,header:wt.Header.createCopy(this._headerConfig),componentType:It.copyComponentType(this.componentType),componentState:e}}close(){if(null===this.parent)throw new at("CIC68883");this.parent.removeChild(this,!1)}enterDragMode(t,e){Wt(this.element,t),Ht(this.element,e),this._container.enterDragMode(t,e)}exitDragMode(){this._container.exitDragMode()}enterStackMaximised(){this._container.enterStackMaximised()}exitStackMaximised(){this._container.exitStackMaximised()}drag(){this._container.drag()}updateSize(t){this.updateNodeSize(t)}init(){this.updateNodeSize(!1),super.init(),this._container.emit("open"),this.initContentItems()}setTitle(t){this._title=t,this.emit("titleChanged",t),this.emit("stateChanged")}setTab(t){this._tab=t,this.emit("tab",t),this._container.setTab(t)}hide(){super.hide(),this._container.setVisibility(!1)}show(){super.show(),this._container.setVisibility(!0)}focus(t=!1){this.parentItem.setActiveComponentItem(this,!0,t)}setFocused(t){this._focused=!0,this.tab.setFocused(),t||this.emitBaseBubblingEvent("focus")}blur(t=!1){this._focused&&this.layoutManager.setFocusedComponentItem(void 0,t)}setBlurred(t){this._focused=!1,this.tab.setBlurred(),t||this.emitBaseBubblingEvent("blur")}setParent(t){this._parentItem=t,super.setParent(t)}handleUpdateItemConfigEvent(t){this.applyUpdatableConfig(t)}updateNodeSize(t){if("none"!==this.element.style.display){const{width:e,height:i}=Ft(this.element);this._container.setSizeToNodeSize(e,i,t)}}}class ee extends Qt{constructor(){super(...arguments),this._focused=!1}get focused(){return this._focused}setFocusedValue(t){this._focused=t}}class ie extends Yt{constructor(t,e){super(),this._eElement=t,this._pointerTracking=!1,this._pointerDownEventListener=t=>this.onPointerDown(t),this._pointerMoveEventListener=t=>this.onPointerMove(t),this._pointerUpEventListener=t=>this.onPointerUp(t),this._timeout=void 0,this._allowableTargets=[t,...e],this._oDocument=document,this._eBody=document.body,this._nDelay=1800,this._nDistance=1,this._nX=0,this._nY=0,this._nOriginalX=0,this._nOriginalY=0,this._dragging=!1,this._eElement.addEventListener("pointerdown",this._pointerDownEventListener,{passive:!0})}destroy(){this.checkRemovePointerTrackingEventListeners(),this._eElement.removeEventListener("pointerdown",this._pointerDownEventListener)}cancelDrag(){this.processDragStop(void 0)}onPointerDown(t){if(this._allowableTargets.includes(t.target)&&t.isPrimary){const e=this.getPointerCoordinates(t);this.processPointerDown(e)}}processPointerDown(t){this._nOriginalX=t.x,this._nOriginalY=t.y,this._oDocument.addEventListener("pointermove",this._pointerMoveEventListener),this._oDocument.addEventListener("pointerup",this._pointerUpEventListener,{passive:!0}),this._pointerTracking=!0,this._timeout=setTimeout((()=>{try{this.startDrag()}catch(t){throw console.error(t),t}}),this._nDelay)}onPointerMove(t){this._pointerTracking&&(this.processDragMove(t),t.preventDefault())}processDragMove(t){this._nX=t.pageX-this._nOriginalX,this._nY=t.pageY-this._nOriginalY,this._lastPointerEvent=t,!1===this._dragging&&(Math.abs(this._nX)>this._nDistance||Math.abs(this._nY)>this._nDistance)&&this.startDrag(),this._dragging&&this.emit("drag",this._nX,this._nY,t)}onPointerUp(t){this.processDragStop(t)}processDragStop(t){var e;void 0!==this._timeout&&(clearTimeout(this._timeout),this._timeout=void 0),void 0!==this._dragEmitInterval&&(clearInterval(this._dragEmitInterval),this._dragEmitInterval=void 0),this.checkRemovePointerTrackingEventListeners(),!0===this._dragging&&(this._eBody.classList.remove("lm_dragging"),this._eElement.classList.remove("lm_dragging"),null===(e=this._oDocument.querySelector("iframe"))||void 0===e||e.style.setProperty("pointer-events",""),this._dragging=!1,this.emit("dragStop",t))}checkRemovePointerTrackingEventListeners(){this._pointerTracking&&(this._oDocument.removeEventListener("pointermove",this._pointerMoveEventListener),this._oDocument.removeEventListener("pointerup",this._pointerUpEventListener),this._pointerTracking=!1)}startDrag(){var t;void 0!==this._timeout&&(clearTimeout(this._timeout),this._timeout=void 0),this._dragging=!0,this._eBody.classList.add("lm_dragging"),this._eElement.classList.add("lm_dragging"),null===(t=this._oDocument.querySelector("iframe"))||void 0===t||t.style.setProperty("pointer-events","none"),this.emit("dragStart",this._nOriginalX,this._nOriginalY),this._dragEmitInterval=setInterval((()=>{this._dragging&&this._lastPointerEvent&&this.emit("drag",this._nX,this._nY,this._lastPointerEvent)}),16)}getPointerCoordinates(t){return{x:t.pageX,y:t.pageY}}}class ne{constructor(t,e,i){this._isVertical=t,this._size=e,this._grabSize=i<this._size?this._size:i,this._element=document.createElement("div"),this._element.classList.add("lm_splitter");const n=document.createElement("div");n.classList.add("lm_drag_handle");const o=this._grabSize-this._size,s=o/2;this._isVertical?(n.style.top=Bt(-s),n.style.height=Bt(this._size+o),this._element.classList.add("lm_vertical"),this._element.style.height=Bt(this._size)):(n.style.left=Bt(-s),n.style.width=Bt(this._size+o),this._element.classList.add("lm_horizontal"),this._element.style.width=Bt(this._size)),this._element.appendChild(n),this._dragListener=new ie(this._element,[n])}get element(){return this._element}destroy(){this._element.remove()}on(t,e){this._dragListener.on(t,e)}}class oe extends Qt{constructor(t,e,i,n){switch(super(e,i,n,oe.createElement(document,t)),this._rowOrColumnParent=n,this._splitter=[],this.isRow=!t,this.isColumn=t,this._childElementContainer=this.element,this._splitterSize=e.layoutConfig.dimensions.borderWidth,this._splitterGrabSize=e.layoutConfig.dimensions.borderGrabWidth,this._isColumn=t,this._dimension=t?"height":"width",this._splitterPosition=null,this._splitterMinPosition=null,this._splitterMaxPosition=null,i.type){case ft.row:case ft.column:this._configType=i.type;break;default:throw new st("ROCCCT00925")}}newComponent(t,e,i,n){const o={type:"component",componentType:t,componentState:e,title:i};return this.newItem(o,n)}addComponent(t,e,i,n){const o={type:"component",componentType:t,componentState:e,title:i};return this.addItem(o,n)}newItem(t,e){e=this.addItem(t,e);const i=this.contentItems[e];return Qt.isStack(i)&&Mt.isComponent(t)?i.contentItems[0]:i}addItem(t,e){this.layoutManager.checkMinimiseMaximisedStack();const i=Mt.resolve(t,!1),n=this.layoutManager.createAndInitContentItem(i,this);return this.addChild(n,e,!1)}addChild(t,e,i){if(void 0===e&&(e=this.contentItems.length),this.contentItems.length>0){const i=this.createSplitter(Math.max(0,e-1)).element;e>0?(this.contentItems[e-1].element.insertAdjacentElement("afterend",i),i.insertAdjacentElement("afterend",t.element)):(this.contentItems[0].element.insertAdjacentElement("beforebegin",i),i.insertAdjacentElement("beforebegin",t.element))}else this._childElementContainer.appendChild(t.element);super.addChild(t,e);const n=1/this.contentItems.length*100;if(!0===i)return this.emitBaseBubblingEvent("stateChanged"),e;for(let e=0;e<this.contentItems.length;e++){const i=this.contentItems[e];if(i===t)t.size=n;else{const t=i.size*=(100-n)/100;i.size=t}}return this.updateSize(!1),this.emitBaseBubblingEvent("stateChanged"),e}removeChild(t,e){const i=this.contentItems.indexOf(t),n=Math.max(i-1,0);if(-1===i)throw new Error("Can't remove child. ContentItem is not child of this Row or Column");if(this._splitter[n]&&(this._splitter[n].destroy(),this._splitter.splice(n,1)),super.removeChild(t,e),1===this.contentItems.length&&!0===this.isClosable){const t=this.contentItems[0];this.contentItems.length=0,this._rowOrColumnParent.replaceChild(this,t,!0)}else this.updateSize(!1),this.emitBaseBubblingEvent("stateChanged")}replaceChild(t,e){const i=t.size;super.replaceChild(t,e),e.size=i,this.updateSize(!1),this.emitBaseBubblingEvent("stateChanged")}updateSize(t){this.layoutManager.beginVirtualSizedContainerAdding();try{this.updateNodeSize(),this.updateContentItemsSize(t)}finally{this.layoutManager.endVirtualSizedContainerAdding()}}init(){if(!0!==this.isInitialised){this.updateNodeSize();for(let t=0;t<this.contentItems.length;t++)this._childElementContainer.appendChild(this.contentItems[t].element);super.init();for(let t=0;t<this.contentItems.length-1;t++)this.contentItems[t].element.insertAdjacentElement("afterend",this.createSplitter(t).element);this.initContentItems()}}toConfig(){return{type:this.type,content:this.calculateConfigContent(),size:this.size,sizeUnit:this.sizeUnit,minSize:this.minSize,minSizeUnit:this.minSizeUnit,id:this.id,isClosable:this.isClosable}}setParent(t){this._rowOrColumnParent=t,super.setParent(t)}updateNodeSize(){this.contentItems.length>0&&(this.calculateRelativeSizes(),this.setAbsoluteSizes()),this.emitBaseBubblingEvent("stateChanged"),this.emit("resize")}setAbsoluteSizes(){const t=this.calculateAbsoluteSizes();for(let e=0;e<this.contentItems.length;e++)t.additionalPixel-e>0&&t.itemSizes[e]++,this._isColumn?(Wt(this.contentItems[e].element,t.crossAxisSize),Ht(this.contentItems[e].element,t.itemSizes[e])):(Wt(this.contentItems[e].element,t.itemSizes[e]),Ht(this.contentItems[e].element,t.crossAxisSize))}calculateAbsoluteSizes(){const t=(this.contentItems.length-1)*this._splitterSize,{width:e,height:i}=Ft(this.element);let n,o;this._isColumn?(n=i-t,o=e):(n=e-t,o=i);let s=0;const r=[];for(let t=0;t<this.contentItems.length;t++){const e=this.contentItems[t];let i;if(e.sizeUnit!==_t.Percent)throw new st("ROCCAS6692");i=Math.floor(n*(e.size/100)),s+=i,r.push(i)}return{itemSizes:r,additionalPixel:Math.floor(n-s),totalSize:n,crossAxisSize:o}}calculateRelativeSizes(){let t=0;const e=[];let i=0;for(let n=0;n<this.contentItems.length;n++){const o=this.contentItems[n];switch(o.sizeUnit){case _t.Percent:t+=o.size;break;case _t.Fractional:e.push(o),i+=o.size;break;default:throw new st("ROCCRS49110",JSON.stringify(o))}}if(100!==Math.round(t))if(Math.round(t)<100&&e.length>0){const n=100-t;for(let t=0;t<e.length;t++){const o=e[t];o.size=n*(o.size/i),o.sizeUnit=_t.Percent}this.respectMinItemSize()}else{if(Math.round(t)>100&&e.length>0){for(let t=0;t<e.length;t++){const n=e[t];n.size=n.size/i*50,n.sizeUnit=_t.Percent}t+=50}for(let e=0;e<this.contentItems.length;e++){const i=this.contentItems[e];i.size=i.size/t*100}this.respectMinItemSize()}else this.respectMinItemSize()}respectMinItemSize(){const t=this.calculateContentItemMinSize(this);if(!(t<=0||this.contentItems.length<=1)){let e=0,i=0;const n=[],o=[],s=this.calculateAbsoluteSizes();for(let r=0;r<s.itemSizes.length;r++){const a=s.itemSizes[r];let l;a<t?(i+=t-a,l={size:t}):(e+=a-t,l={size:a},n.push(l)),o.push(l)}if(0===i||i>e)return;{const r=i/e;let a=i;for(let e=0;e<n.length;e++){const i=n[e],o=Math.round((i.size-t)*r);a-=o,i.size-=o}0!==a&&(o[o.length-1].size-=a);for(let t=0;t<this.contentItems.length;t++){this.contentItems[t].size=o[t].size/s.totalSize*100}}}}createSplitter(t){const e=new ne(this._isColumn,this._splitterSize,this._splitterGrabSize);return e.on("drag",((t,i)=>this.onSplitterDrag(e,t,i))),e.on("dragStop",(()=>this.onSplitterDragStop(e))),e.on("dragStart",(()=>this.onSplitterDragStart(e))),this._splitter.splice(t,0,e),e}getSplitItems(t){const e=this._splitter.indexOf(t);return{before:this.contentItems[e],after:this.contentItems[e+1]}}calculateContentItemMinSize(t){const e=t.minSize;if(void 0!==e){if(t.minSizeUnit===_t.Pixel)return e;throw new st("ROCGMD98831",JSON.stringify(t))}{const t=this.layoutManager.layoutConfig.dimensions;return this._isColumn?t.defaultMinItemHeight:t.defaultMinItemWidth}}calculateContentItemsTotalMinSize(t){let e=0;for(const i of t)e+=this.calculateContentItemMinSize(i);return e}onSplitterDragStart(t){const e=this.getSplitItems(t),i=Ut(e.before.element.style[this._dimension]),n=Ut(e.after.element.style[this._dimension]),o=this.calculateContentItemsTotalMinSize(e.before.contentItems),s=this.calculateContentItemsTotalMinSize(e.after.contentItems);this._splitterPosition=0,this._splitterMinPosition=-1*(i-o),this._splitterMaxPosition=n-s}onSplitterDrag(t,e,i){let n=this._isColumn?i:e;if(null===this._splitterMinPosition||null===this._splitterMaxPosition)throw new at("ROCOSD59226");n=Math.max(n,this._splitterMinPosition),n=Math.min(n,this._splitterMaxPosition),this._splitterPosition=n;const o=Bt(n);this._isColumn?t.element.style.top=o:t.element.style.left=o}onSplitterDragStop(t){if(null===this._splitterPosition)throw new at("ROCOSDS66932");{const e=this.getSplitItems(t),i=Ut(e.before.element.style[this._dimension]),n=Ut(e.after.element.style[this._dimension]),o=(this._splitterPosition+i)/(i+n),s=e.before.size+e.after.size;e.before.size=o*s,e.after.size=(1-o)*s,t.element.style.top=Bt(0),t.element.style.left=Bt(0),globalThis.requestAnimationFrame((()=>this.updateSize(!1)))}}}!function(t){t.getElementDimensionSize=function(t,e){return"width"===e?function(t){return t.offsetWidth}(t):function(t){return t.offsetHeight}(t)},t.setElementDimensionSize=function(t,e,i){return"width"===e?Wt(t,i):Ht(t,i)},t.createElement=function(t,e){const i=t.createElement("div");return i.classList.add("lm_item"),e?i.classList.add("lm_column"):i.classList.add("lm_row"),i}}(oe||(oe={}));class se extends ee{constructor(t,e,i){super(t,xt.create(e),null,se.createElement(document)),this.isGround=!0,this._childElementContainer=this.element,this._containerElement=i;let n=null;for(;;){const t=n?n.previousSibling:this._containerElement.lastChild;if(!(t instanceof Element&&t.classList.contains("lm_content")))break;n=t}this._containerElement.insertBefore(this.element,n)}init(){if(!0!==this.isInitialised){this.updateNodeSize();for(let t=0;t<this.contentItems.length;t++)this._childElementContainer.appendChild(this.contentItems[t].element);super.init(),this.initContentItems()}}loadRoot(t){if(this.clearRoot(),void 0!==t){const e=this.layoutManager.createAndInitContentItem(t,this);this.addChild(e,0)}}clearRoot(){const t=this.contentItems;switch(t.length){case 0:return;case 1:return void t[0].remove();default:throw new st("GILR07721")}}addItem(t,e){this.layoutManager.checkMinimiseMaximisedStack();const i=Mt.resolve(t,!1);let n;if(n=this.contentItems.length>0?this.contentItems[0]:this,n.isComponent)throw new Error("Cannot add item as child to ComponentItem");{const t=this.layoutManager.createAndInitContentItem(i,n);return e=n.addChild(t,e),n===this?-1:e}}loadComponentAsRoot(t){this.clearRoot();const e=Mt.resolve(t,!1);if(e.maximised)throw new Error("Root Component cannot be maximised");{const t=new te(this.layoutManager,e,this);t.init(),this.addChild(t,0)}}addChild(t,e){if(this.contentItems.length>0)throw new Error("Ground node can only have a single child");return this._childElementContainer.appendChild(t.element),e=super.addChild(t,e),this.updateSize(!1),this.emitBaseBubblingEvent("stateChanged"),e}calculateConfigContent(){const t=this.contentItems,e=t.length,i=new Array(e);for(let n=0;n<e;n++){const e=t[n].toConfig();if(!Et.isRootItemConfig(e))throw new st("RCCC66832");i[n]=e}return i}setSize(t,e){void 0===t||void 0===e?this.updateSize(!1):(Wt(this.element,t),Ht(this.element,e),this.contentItems.length>0&&(Wt(this.contentItems[0].element,t),Ht(this.contentItems[0].element,e)),this.updateContentItemsSize(!1))}updateSize(t){this.layoutManager.beginVirtualSizedContainerAdding();try{this.updateNodeSize(),this.updateContentItemsSize(t)}finally{this.layoutManager.endVirtualSizedContainerAdding()}}createSideAreas(){const t=se.Area.oppositeSides,e=new Array(Object.keys(t).length);let i=0;for(const n in t){const o=n,s=this.getElementArea();if(null===s)throw new at("RCSA77553");s.side=o,"2"===t[o][1]?s[o]=s[t[o]]-50:s[o]=s[t[o]]+50,s.surface=(s.x2-s.x1)*(s.y2-s.y1),e[i++]=s}return e}highlightDropZone(t,e,i){this.layoutManager.tabDropPlaceholder.remove(),super.highlightDropZone(t,e,i)}onDrop(t,e){if(t.isComponent){const e=bt.createDefault(),i=t;e.header=wt.Header.createCopy(i.headerConfig);const n=this.layoutManager.createAndInitContentItem(e,this);n.addChild(t),t=n}if(0===this.contentItems.length)this.addChild(t);else{if(t.type===ft.row||t.type===ft.column){const e=bt.createDefault(),i=this.layoutManager.createContentItem(e,this);i.addChild(t),t=i}const i="x"==e.side[0]?ft.row:ft.column,n="2"==e.side[1],o=this.contentItems[0];if(o instanceof oe&&o.type===i){const e=o.contentItems[n?0:o.contentItems.length-1];o.addChild(t,n?0:void 0,!0),e.size*=.5,t.size=e.size,t.sizeUnit=_t.Percent,o.updateSize(!1)}else{const e=Ct.createDefault(i),s=this.layoutManager.createContentItem(e,this);this.replaceChild(o,s),s.addChild(t,n?0:void 0,!0),s.addChild(o,n?void 0:0,!0),o.size=50,t.size=50,t.sizeUnit=_t.Percent,s.updateSize(!1)}}}dock(){throw new st("GID87731")}validateDocking(){throw new st("GIVD87732")}getAllContentItems(){const t=[this];return this.deepGetAllContentItems(this.contentItems,t),t}getConfigMaximisedItems(){const t=[];return this.deepFilterContentItems(this.contentItems,t,(t=>!(!Qt.isStack(t)||!t.initialWantMaximise)||!(!Qt.isComponentItem(t)||!t.initialWantMaximise))),t}getItemsByPopInParentId(t){const e=[];return this.deepFilterContentItems(this.contentItems,e,(e=>e.popInParentIds.includes(t))),e}toConfig(){throw new Error("Cannot generate GroundItem config")}setActiveComponentItem(t,e,i){}updateNodeSize(){const{width:t,height:e}=Ft(this._containerElement);Wt(this.element,t),Ht(this.element,e),this.contentItems.length>0&&(Wt(this.contentItems[0].element,t),Ht(this.contentItems[0].element,e))}deepGetAllContentItems(t,e){for(let i=0;i<t.length;i++){const n=t[i];e.push(n),this.deepGetAllContentItems(n.contentItems,e)}}deepFilterContentItems(t,e,i){for(let n=0;n<t.length;n++){const o=t[n];i(o)&&e.push(o),this.deepFilterContentItems(o.contentItems,e,i)}}}!function(t){(t.Area||(t.Area={})).oppositeSides={y2:"y1",x2:"x1",y1:"y2",x1:"x2"},t.createElement=function(t){const e=t.createElement("div");return e.classList.add("lm_goldenlayout"),e.classList.add("lm_item"),e.classList.add("lm_root"),e}}(se||(se={}));class re{constructor(t,e,i,n){this._header=t,this._pushEvent=n,this._clickEventListener=t=>this.onClick(t),this._touchStartEventListener=t=>this.onTouchStart(t),this._element=document.createElement("div"),this._element.classList.add(i),this._element.title=e,this._header.on("destroy",(()=>this.destroy())),this._element.addEventListener("click",this._clickEventListener,{passive:!0}),this._element.addEventListener("touchstart",this._touchStartEventListener,{passive:!0}),this._header.controlsContainerElement.appendChild(this._element)}get element(){return this._element}destroy(){var t;this._element.removeEventListener("click",this._clickEventListener),this._element.removeEventListener("touchstart",this._touchStartEventListener),null===(t=this._element.parentNode)||void 0===t||t.removeChild(this._element)}onClick(t){this._pushEvent(t)}onTouchStart(t){this._pushEvent(t)}}class ae{constructor(t,e,i,n,o){var s;this._layoutManager=t,this._componentItem=e,this._closeEvent=i,this._focusEvent=n,this._dragStartEvent=o,this._isActive=!1,this._tabClickListener=t=>this.onTabClickDown(t),this._tabTouchStartListener=t=>this.onTabTouchStart(t),this._closeClickListener=()=>this.onCloseClick(),this._closeTouchStartListener=()=>this.onCloseTouchStart(),this._dragStartListener=(t,e)=>this.onDragStart(t,e),this._contentItemDestroyListener=()=>this.onContentItemDestroy(),this._tabTitleChangedListener=t=>this.setTitle(t),this._element=document.createElement("div"),this._element.classList.add("lm_tab"),this._titleElement=document.createElement("span"),this._titleElement.classList.add("lm_title"),this._closeElement=document.createElement("div"),this._closeElement.classList.add("lm_close_tab"),this._element.appendChild(this._titleElement),this._element.appendChild(this._closeElement),e.isClosable?this._closeElement.style.display="":this._closeElement.style.display="none",this.setTitle(e.title),this._componentItem.on("titleChanged",this._tabTitleChangedListener);(null!==(s=e.reorderEnabled)&&void 0!==s?s:this._layoutManager.layoutConfig.settings.reorderEnabled)&&this.enableReorder(),this._element.addEventListener("click",this._tabClickListener,{passive:!0}),this._element.addEventListener("touchstart",this._tabTouchStartListener,{passive:!0}),this._componentItem.isClosable?(this._closeElement.addEventListener("click",this._closeClickListener,{passive:!0}),this._closeElement.addEventListener("touchstart",this._closeTouchStartListener,{passive:!0})):(this._closeElement.remove(),this._closeElement=void 0),this._componentItem.setTab(this),this._layoutManager.emit("tabCreated",this)}get isActive(){return this._isActive}get componentItem(){return this._componentItem}get contentItem(){return this._componentItem}get element(){return this._element}get titleElement(){return this._titleElement}get closeElement(){return this._closeElement}get reorderEnabled(){return void 0!==this._dragListener}set reorderEnabled(t){t!==this.reorderEnabled&&(t?this.enableReorder():this.disableReorder())}setTitle(t){this._titleElement.innerText=t,this._element.title=t}setActive(t){t!==this._isActive&&(this._isActive=t,t?(this._element.classList.add("lm_active"),this._element.scrollIntoView({behavior:"smooth"})):this._element.classList.remove("lm_active"))}destroy(){var t,e;this._closeEvent=void 0,this._focusEvent=void 0,this._dragStartEvent=void 0,this._element.removeEventListener("click",this._tabClickListener),this._element.removeEventListener("touchstart",this._tabTouchStartListener),null===(t=this._closeElement)||void 0===t||t.removeEventListener("click",this._closeClickListener),null===(e=this._closeElement)||void 0===e||e.removeEventListener("touchstart",this._closeTouchStartListener),this._componentItem.off("titleChanged",this._tabTitleChangedListener),this.reorderEnabled&&this.disableReorder(),this._element.remove()}setBlurred(){this._element.classList.remove("lm_focused"),this._titleElement.classList.remove("lm_focused")}setFocused(){this._element.classList.add("lm_focused"),this._titleElement.classList.add("lm_focused")}onDragStart(t,e){if(void 0===this._dragListener)throw new lt("TODSDLU10093");if(void 0===this._dragStartEvent)throw new lt("TODS23309");this._dragStartEvent(t,e,this._dragListener,this.componentItem)}onContentItemDestroy(){void 0!==this._dragListener&&(this._dragListener.destroy(),this._dragListener=void 0)}onTabClickDown(t){const e=t.target;e!==this._element&&e!==this._titleElement||(0===t.button?this.notifyFocus():1===t.button&&this._componentItem.isClosable&&this.notifyClose())}onTabTouchStart(t){t.target===this._element&&this.notifyFocus()}onCloseClick(){this.notifyClose()}onCloseTouchStart(){this.notifyClose()}notifyClose(){if(void 0===this._closeEvent)throw new lt("TNC15007");this._closeEvent(this._componentItem)}notifyFocus(){if(void 0===this._focusEvent)throw new lt("TNA15007");this._focusEvent(this._componentItem)}enableReorder(){this._dragListener=new ie(this._element,[this._titleElement]),this._dragListener.on("dragStart",this._dragStartListener),this._componentItem.on("destroy",this._contentItemDestroyListener)}disableReorder(){if(void 0===this._dragListener)throw new lt("TDR87745");this._componentItem.off("destroy",this._contentItemDestroyListener),this._dragListener.off("dragStart",this._dragStartListener),this._dragListener=void 0}}class le{constructor(t,e,i,n,o){this._layoutManager=t,this._componentRemoveEvent=e,this._componentFocusEvent=i,this._componentDragStartEvent=n,this._dropdownActiveChangedEvent=o,this._tabs=[],this._lastVisibleTabIndex=-1,this._dropdownActive=!1,this._element=document.createElement("section"),this._element.classList.add("lm_tabs"),"scroll"===this._layoutManager.layoutConfig.settings.tabOverflowBehavior&&this.element.addEventListener("wheel",(t=>{const{deltaX:e,deltaY:i}=t;Math.abs(i)>Math.abs(e)&&(this._element.scrollLeft+=i-e)}),{passive:!0}),this._dropdownElement=document.createElement("section"),this._dropdownElement.classList.add("lm_tabdropdown_list"),this._dropdownElement.style.display="none"}get tabs(){return this._tabs}get tabCount(){return this._tabs.length}get lastVisibleTabIndex(){return this._lastVisibleTabIndex}get element(){return this._element}get dropdownElement(){return this._dropdownElement}get dropdownActive(){return this._dropdownActive}destroy(){for(let t=0;t<this._tabs.length;t++)this._tabs[t].destroy()}createTab(t,e){for(let e=0;e<this._tabs.length;e++)if(this._tabs[e].componentItem===t)return;const i=new ae(this._layoutManager,t,(t=>this.handleTabCloseEvent(t)),(t=>this.handleTabFocusEvent(t)),((t,e,i,n)=>this.handleTabDragStartEvent(t,e,i,n)));void 0===e&&(e=this._tabs.length),this._tabs.splice(e,0,i),e<this._element.childNodes.length?this._element.insertBefore(i.element,this._element.childNodes[e]):this._element.appendChild(i.element)}removeTab(t){for(let e=0;e<this._tabs.length;e++)if(this._tabs[e].componentItem===t){return this._tabs[e].destroy(),this._tabs.splice(e,1),void("scroll"===this._layoutManager.layoutConfig.settings.tabOverflowBehavior&&this._kickScrollWrapperAnimation())}throw new Error("contentItem is not controlled by this header")}processActiveComponentChanged(t){let e=-1;for(let i=0;i<this._tabs.length;i++){const n=this._tabs[i].componentItem===t;this._tabs[i].setActive(n),n&&(e=i)}if(e<0)throw new st("HSACI56632");if(this._layoutManager.layoutConfig.settings.reorderOnTabMenuClick&&-1!==this._lastVisibleTabIndex&&e>this._lastVisibleTabIndex){const t=this._tabs[e];for(let t=e;t>0;t--)this._tabs[t]=this._tabs[t-1];this._tabs[0]=t}}updateTabSizes(t,e){let i=!1;this.tryUpdateTabSizes(i,t,e)||(i=!0,this.tryUpdateTabSizes(i,t,e)),i!==this._dropdownActive&&(this._dropdownActive=i,this._dropdownActiveChangedEvent())}tryUpdateTabSizes(t,e,i){if(this._tabs.length>0){if(void 0===i)throw new Error("non-empty tabs must have active component item");let n=0,o=!1;const s=this._layoutManager.layoutConfig.settings.tabOverlapAllowance,r=this._tabs.indexOf(i.tab),a=this._tabs[r];this._lastVisibleTabIndex=-1;for(let i=0;i<this._tabs.length;i++){const l=this._tabs[i].element;l.parentElement!==this._element&&this._element.appendChild(l);const h=Ut(getComputedStyle(a.element).marginRight);n+=l.offsetWidth+h;let d=0;if(r<=i)d=n;else{const t=Ut(getComputedStyle(a.element).marginRight);d=n+a.element.offsetWidth+t}if(d>e&&!this._layoutManager.layoutConfig.settings.disableTabOverflowDropdown){if(o)i===r&&(l.style.zIndex="auto",l.style.marginLeft="",l.parentElement!==this._element&&this._element.appendChild(l));else{let t;if(t=r>0&&r<=i?(d-e)/(i-1):(d-e)/i,t<s){for(let e=0;e<=i;e++){const n=e!==r&&0!==e?"-"+Bt(t):"";this._tabs[e].element.style.zIndex=Bt(i-e),this._tabs[e].element.style.marginLeft=n}this._lastVisibleTabIndex=i,l.parentElement!==this._element&&this._element.appendChild(l)}else o=!0}if(o&&i!==r){if(!t)return!1;l.style.zIndex="auto",l.style.marginLeft="",l.parentElement!==this._dropdownElement&&this._dropdownElement.appendChild(l)}}else this._lastVisibleTabIndex=i,l.style.zIndex="auto",l.style.marginLeft="",l.parentElement!==this._element&&this._element.appendChild(l)}}return!0}showAdditionalTabsDropdown(){this._dropdownElement.style.display=""}hideAdditionalTabsDropdown(){this._dropdownElement.style.display="none"}handleTabCloseEvent(t){this._componentRemoveEvent(t)}handleTabFocusEvent(t){this._componentFocusEvent(t)}handleTabDragStartEvent(t,e,i,n){this._componentDragStartEvent(t,e,i,n)}_kickScrollWrapperAnimation(){const t=this._element;t.style.animationPlayState="paused",t.offsetWidth,t.style.removeProperty("animation-play-state")}}class he extends Yt{constructor(t,e,i,n,o,s,r,a,l,h,d,c,u){if(super(),this._layoutManager=t,this._parent=e,this._configClosable=n,this._getActiveComponentItemEvent=o,this._popoutEvent=r,this._maximiseToggleEvent=a,this._clickEvent=l,this._touchStartEvent=h,this._componentRemoveEvent=d,this._componentFocusEvent=c,this._componentDragStartEvent=u,this._clickListener=t=>this.onClick(t),this._touchStartListener=t=>this.onTouchStart(t),this._rowColumnClosable=!0,this._closeButton=null,this._popoutButton=null,this._tabsContainer=new le(this._layoutManager,(t=>this.handleTabInitiatedComponentRemoveEvent(t)),(t=>this.handleTabInitiatedComponentFocusEvent(t)),((t,e,i,n)=>this.handleTabInitiatedDragStartEvent(t,e,i,n)),(()=>this.processTabDropdownActiveChanged())),this._show=i.show,this._popoutEnabled=i.popoutEnabled,this._popoutLabel=i.popoutLabel,this._maximiseEnabled=i.maximiseEnabled,this._maximiseLabel=i.maximiseLabel,this._minimiseEnabled=i.minimiseEnabled,this._minimiseLabel=i.minimiseLabel,this._closeEnabled=i.closeEnabled,this._closeLabel=i.closeLabel,this._tabDropdownEnabled=i.tabDropdownEnabled,this._tabDropdownLabel=i.tabDropdownLabel,this.setSide(i.side),this._canRemoveComponent=this._configClosable,this._element=document.createElement("section"),this._element.classList.add("lm_header"),this._controlsContainerElement=document.createElement("section"),this._controlsContainerElement.classList.add("lm_controls"),"scroll"===this._layoutManager.layoutConfig.settings.tabOverflowBehavior){const t=document.createElement("div");t.classList.add("lm_tabs_scroll_shadow"),t.appendChild(this._tabsContainer.element),this._element.appendChild(t)}else this._element.appendChild(this._tabsContainer.element);this._element.appendChild(this._controlsContainerElement),this._element.appendChild(this._tabsContainer.dropdownElement),this._element.addEventListener("click",this._clickListener,{passive:!0}),this._element.addEventListener("touchstart",this._touchStartListener,{passive:!0}),this._documentMouseUpListener=()=>this._tabsContainer.hideAdditionalTabsDropdown(),globalThis.document.addEventListener("mouseup",this._documentMouseUpListener,{passive:!0}),this._tabControlOffset=this._layoutManager.layoutConfig.settings.tabControlOffset,this._tabDropdownEnabled&&(this._tabDropdownButton=new re(this,this._tabDropdownLabel,"lm_tabdropdown",(()=>this._tabsContainer.showAdditionalTabsDropdown()))),this._popoutEnabled&&(this._popoutButton=new re(this,this._popoutLabel,"lm_popout",(()=>this.handleButtonPopoutEvent()))),this._maximiseEnabled&&(this._maximiseButton=new re(this,this._maximiseLabel,"lm_maximise",(t=>this.handleButtonMaximiseToggleEvent(t)))),this._configClosable&&(this._closeButton=new re(this,this._closeLabel,"lm_close",(()=>s()))),this.processTabDropdownActiveChanged()}get show(){return this._show}get side(){return this._side}get leftRightSided(){return this._leftRightSided}get layoutManager(){return this._layoutManager}get parent(){return this._parent}get tabs(){return this._tabsContainer.tabs}get lastVisibleTabIndex(){return this._tabsContainer.lastVisibleTabIndex}get element(){return this._element}get tabsContainerElement(){return this._tabsContainer.element}get controlsContainerElement(){return this._controlsContainerElement}destroy(){this.emit("destroy"),this._popoutEvent=void 0,this._maximiseToggleEvent=void 0,this._clickEvent=void 0,this._touchStartEvent=void 0,this._componentRemoveEvent=void 0,this._componentFocusEvent=void 0,this._componentDragStartEvent=void 0,this._tabsContainer.destroy(),globalThis.document.removeEventListener("mouseup",this._documentMouseUpListener),this._element.remove()}createTab(t,e){this._tabsContainer.createTab(t,e)}removeTab(t){this._tabsContainer.removeTab(t)}processActiveComponentChanged(t){this._tabsContainer.processActiveComponentChanged(t),this.updateTabSizes()}setSide(t){this._side=t,this._leftRightSided=[ut.right,ut.left].includes(this._side)}setRowColumnClosable(t){this._rowColumnClosable=t,this.updateClosability()}updateClosability(){let t;if(this._configClosable)if(this._rowColumnClosable){t=!0;const e=this.tabs.length;for(let i=0;i<e;i++){if(!this._tabsContainer.tabs[i].componentItem.isClosable){t=!1;break}}}else t=!1;else t=!1;null!==this._closeButton&&Nt(this._closeButton.element,t),null!==this._popoutButton&&Nt(this._popoutButton.element,t),this._canRemoveComponent=t||this._tabsContainer.tabCount>1}applyFocusedValue(t){t?this._element.classList.add("lm_focused"):this._element.classList.remove("lm_focused")}processMaximised(){if(void 0===this._maximiseButton)throw new lt("HPMAX16997");this._maximiseButton.element.setAttribute("title",this._minimiseLabel)}processMinimised(){if(void 0===this._maximiseButton)throw new lt("HPMIN16997");this._maximiseButton.element.setAttribute("title",this._maximiseLabel)}updateTabSizes(){if(this._tabsContainer.tabCount>0){const t=this._show?this._layoutManager.layoutConfig.dimensions.headerHeight:0;let e;this._leftRightSided?(this._element.style.height="",this._element.style.width=Bt(t)):(this._element.style.width="",this._element.style.height=Bt(t)),e=this._leftRightSided?this._element.offsetHeight-this._controlsContainerElement.offsetHeight-this._tabControlOffset:this._element.offsetWidth-this._controlsContainerElement.offsetWidth-this._tabControlOffset,this._tabsContainer.updateTabSizes(e,this._getActiveComponentItemEvent())}}handleTabInitiatedComponentRemoveEvent(t){if(this._canRemoveComponent){if(void 0===this._componentRemoveEvent)throw new lt("HHTCE22294");this._componentRemoveEvent(t)}}handleTabInitiatedComponentFocusEvent(t){if(void 0===this._componentFocusEvent)throw new lt("HHTAE22294");this._componentFocusEvent(t)}handleTabInitiatedDragStartEvent(t,e,i,n){if(this._canRemoveComponent){if(void 0===this._componentDragStartEvent)throw new lt("HHTDSE22294");this._componentDragStartEvent(t,e,i,n)}else i.cancelDrag()}processTabDropdownActiveChanged(){void 0!==this._tabDropdownButton&&Nt(this._tabDropdownButton.element,this._tabsContainer.dropdownActive)}handleButtonPopoutEvent(){if(this._layoutManager.layoutConfig.settings.popoutWholeStack){if(void 0===this._popoutEvent)throw new lt("HHBPOE17834");this._popoutEvent()}else{const t=this._getActiveComponentItemEvent();t&&t.popout()}}handleButtonMaximiseToggleEvent(t){if(void 0===this._maximiseToggleEvent)throw new lt("HHBMTE16834");this._maximiseToggleEvent()}onClick(t){t.target===this._element&&this.notifyClick(t)}onTouchStart(t){t.target===this._element&&this.notifyTouchStart(t)}notifyClick(t){if(void 0===this._clickEvent)throw new lt("HNHC46834");this._clickEvent(t)}notifyTouchStart(t){if(void 0===this._touchStartEvent)throw new lt("HNHTS46834");this._touchStartEvent(t)}}class de extends ee{constructor(t,e,i){var n,o,s,r,a,l,h,d,c,u,m,p,g,f,v,_,y,C,w;super(t,e,i,de.createElement(document)),this._headerSideChanged=!1,this._resizeListener=()=>this.handleResize(),this._maximisedListener=()=>this.handleMaximised(),this._minimisedListener=()=>this.handleMinimised(),this._headerConfig=e.header;const b=t.layoutConfig.header,I=e.content;let S;if(1!==I.length)S=void 0;else{S=I[0].header}this._initialWantMaximise=e.maximised,this._initialActiveItemIndex=null!==(n=e.activeItemIndex)&&void 0!==n?n:0;const E=null!==(r=null!==(s=null===(o=this._headerConfig)||void 0===o?void 0:o.show)&&void 0!==s?s:null==S?void 0:S.show)&&void 0!==r?r:b.show,x=null!==(h=null!==(l=null===(a=this._headerConfig)||void 0===a?void 0:a.popout)&&void 0!==l?l:null==S?void 0:S.popout)&&void 0!==h?h:b.popout,L=null!==(u=null!==(c=null===(d=this._headerConfig)||void 0===d?void 0:d.maximise)&&void 0!==c?c:null==S?void 0:S.maximise)&&void 0!==u?u:b.maximise,z=null!==(g=null!==(p=null===(m=this._headerConfig)||void 0===m?void 0:m.close)&&void 0!==p?p:null==S?void 0:S.close)&&void 0!==g?g:b.close,M=null!==(_=null!==(v=null===(f=this._headerConfig)||void 0===f?void 0:f.minimise)&&void 0!==v?v:null==S?void 0:S.minimise)&&void 0!==_?_:b.minimise,P=null!==(w=null!==(C=null===(y=this._headerConfig)||void 0===y?void 0:y.tabDropdown)&&void 0!==C?C:null==S?void 0:S.tabDropdown)&&void 0!==w?w:b.tabDropdown;this._maximisedEnabled=!1!==L;const T={show:!1!==E,side:!1===E?ut.top:E,popoutEnabled:!1!==x,popoutLabel:!1===x?"":x,maximiseEnabled:this._maximisedEnabled,maximiseLabel:!1===L?"":L,closeEnabled:!1!==z,closeLabel:!1===z?"":z,minimiseEnabled:!0,minimiseLabel:M,tabDropdownEnabled:!1!==P,tabDropdownLabel:!1===P?"":P};this._header=new he(t,this,T,e.isClosable&&!1!==z,(()=>this.getActiveComponentItem()),(()=>this.remove()),(()=>this.handlePopoutEvent()),(()=>this.toggleMaximise()),(t=>this.handleHeaderClickEvent(t)),(t=>this.handleHeaderTouchStartEvent(t)),(t=>this.handleHeaderComponentRemoveEvent(t)),(t=>this.handleHeaderComponentFocusEvent(t)),((t,e,i,n)=>this.handleHeaderComponentStartDragEvent(t,e,i,n))),this.isStack=!0,this._childElementContainer=document.createElement("section"),this._childElementContainer.classList.add("lm_items"),this.on("resize",this._resizeListener),this._maximisedEnabled&&(this.on("maximised",this._maximisedListener),this.on("minimised",this._minimisedListener)),this.element.appendChild(this._header.element),this.element.appendChild(this._childElementContainer),this.setupHeaderPosition(),this._header.updateClosability()}get childElementContainer(){return this._childElementContainer}get header(){return this._header}get headerShow(){return this._header.show}get headerSide(){return this._header.side}get headerLeftRightSided(){return this._header.leftRightSided}get contentAreaDimensions(){return this._contentAreaDimensions}get initialWantMaximise(){return this._initialWantMaximise}get isMaximised(){return this===this.layoutManager.maximisedStack}get stackParent(){if(!this.parent)throw new Error("Stack should always have a parent");return this.parent}updateSize(t){this.layoutManager.beginVirtualSizedContainerAdding();try{this.updateNodeSize(),this.updateContentItemsSize(t)}finally{this.layoutManager.endVirtualSizedContainerAdding()}}init(){if(!0===this.isInitialised)return;this.updateNodeSize();for(let t=0;t<this.contentItems.length;t++)this._childElementContainer.appendChild(this.contentItems[t].element);super.init();const t=this.contentItems,e=t.length;if(e>0){if(this._initialActiveItemIndex<0||this._initialActiveItemIndex>=e)throw new Error(`ActiveItemIndex out of range: ${this._initialActiveItemIndex} id: ${this.id}`);for(let i=0;i<e;i++){const e=t[i];if(!(e instanceof te))throw new Error(`Stack Content Item is not of type ComponentItem: ${i} id: ${this.id}`);this._header.createTab(e,i),e.hide(),e.container.setBaseLogicalZIndex()}this.setActiveComponentItem(t[this._initialActiveItemIndex],!1),this._header.updateTabSizes()}this._header.updateClosability(),this.initContentItems()}setActiveContentItem(t){if(!Qt.isComponentItem(t))throw new Error("Stack.setActiveContentItem: item is not a ComponentItem");this.setActiveComponentItem(t,!1)}setActiveComponentItem(t,e,i=!1){if(this._activeComponentItem!==t){if(-1===this.contentItems.indexOf(t))throw new Error("componentItem is not a child of this stack");this.layoutManager.beginSizeInvalidation();try{void 0!==this._activeComponentItem&&this._activeComponentItem.hide(),this._activeComponentItem=t,this._header.processActiveComponentChanged(t),t.show()}finally{this.layoutManager.endSizeInvalidation()}this.emit("activeContentItemChanged",t),this.layoutManager.emit("activeContentItemChanged",t),this.emitStateChangedEvent()}(this.focused||e)&&this.layoutManager.setFocusedComponentItem(t,i)}getActiveContentItem(){var t;return null!==(t=this.getActiveComponentItem())&&void 0!==t?t:null}getActiveComponentItem(){return this._activeComponentItem}focusActiveContentItem(){var t;null===(t=this._activeComponentItem)||void 0===t||t.focus()}setFocusedValue(t){this._header.applyFocusedValue(t),super.setFocusedValue(t)}setRowColumnClosable(t){this._header.setRowColumnClosable(t)}newComponent(t,e,i,n){const o={type:"component",componentType:t,componentState:e,title:i};return this.newItem(o,n)}addComponent(t,e,i,n){const o={type:"component",componentType:t,componentState:e,title:i};return this.addItem(o,n)}newItem(t,e){return e=this.addItem(t,e),this.contentItems[e]}addItem(t,e){this.layoutManager.checkMinimiseMaximisedStack();const i=Mt.resolve(t,!1),n=this.layoutManager.createAndInitContentItem(i,this);return this.addChild(n,e)}addChild(t,e,i=!1){if(void 0!==e&&e>this.contentItems.length)throw e-=1,new st("SAC99728");if(t instanceof te)return e=super.addChild(t,e),this._childElementContainer.appendChild(t.element),this._header.createTab(t,e),this.setActiveComponentItem(t,i),this._header.updateTabSizes(),this.updateSize(!1),t.container.setBaseLogicalZIndex(),this._header.updateClosability(),this.emitStateChangedEvent(),e;throw new st("SACC88532")}removeChild(t,e){const i=t,n=this.contentItems.indexOf(i),o=1===this.contentItems.length;if(this._activeComponentItem===i&&(i.focused&&i.blur(),!o)){const t=0===n?1:n-1;this.setActiveComponentItem(this.contentItems[t],!1)}this._header.removeTab(i),super.removeChild(i,e),o||this._header.updateClosability(),this.emitStateChangedEvent()}toggleMaximise(){this.isMaximised?this.minimise():this.maximise()}maximise(){if(!this.isMaximised){this.layoutManager.setMaximisedStack(this);const t=this.contentItems,e=t.length;for(let i=0;i<e;i++){const e=t[i];if(!(e instanceof te))throw new st("SMAXI87773");e.enterStackMaximised()}this.emitStateChangedEvent()}}minimise(){if(this.isMaximised){this.layoutManager.setMaximisedStack(void 0);const t=this.contentItems,e=t.length;for(let i=0;i<e;i++){const e=t[i];if(!(e instanceof te))throw new st("SMINI87773");e.exitStackMaximised()}this.emitStateChangedEvent()}}destroy(){var t;(null===(t=this._activeComponentItem)||void 0===t?void 0:t.focused)&&this._activeComponentItem.blur(),super.destroy(),this.off("resize",this._resizeListener),this._maximisedEnabled&&(this.off("maximised",this._maximisedListener),this.off("minimised",this._minimisedListener)),this._header.destroy()}toConfig(){let t;if(this._activeComponentItem&&(t=this.contentItems.indexOf(this._activeComponentItem),t<0))throw new Error("active component item not found in stack");if(this.contentItems.length>0&&void 0===t)throw new Error("expected non-empty stack to have an active component item");return{type:"stack",content:this.calculateConfigContent(),size:this.size,sizeUnit:this.sizeUnit,minSize:this.minSize,minSizeUnit:this.minSizeUnit,id:this.id,isClosable:this.isClosable,maximised:this.isMaximised,header:this.createHeaderConfig(),activeItemIndex:t}}onDrop(t,e){if("header"===this._dropSegment){if(this.resetHeaderDropZone(),void 0===this._dropIndex)throw new lt("SODDI68990");return void this.addChild(t,this._dropIndex)}if("body"===this._dropSegment)return void this.addChild(t,0,!0);const i="top"===this._dropSegment||"bottom"===this._dropSegment,n="left"===this._dropSegment||"right"===this._dropSegment,o="top"===this._dropSegment||"left"===this._dropSegment,s=i&&this.stackParent.isColumn||n&&this.stackParent.isRow;if(t.isComponent){const e=bt.createDefault();e.header=this.createHeaderConfig();const i=this.layoutManager.createAndInitContentItem(e,this);i.addChild(t),t=i}if(t.type===ft.row||t.type===ft.column){const e=bt.createDefault();e.header=this.createHeaderConfig();const i=this.layoutManager.createContentItem(e,this);i.addChild(t),t=i}if(s){const e=this.stackParent.contentItems.indexOf(this);this.stackParent.addChild(t,o?e:e+1,!0),this.size*=.5,t.size=this.size,t.sizeUnit=this.sizeUnit,this.stackParent.updateSize(!1)}else{const e=i?ft.column:ft.row,n=Ct.createDefault(e),s=this.layoutManager.createContentItem(n,this);this.stackParent.replaceChild(this,s),s.addChild(t,o?0:void 0,!0),s.addChild(this,o?void 0:0,!0),this.size=50,t.size=50,t.sizeUnit=_t.Percent,s.updateSize(!1)}}highlightDropZone(t,e){for(const i in this._contentAreaDimensions){const n=i,o=this._contentAreaDimensions[n].hoverArea;if(o.x1<t&&o.x2>t&&o.y1<e&&o.y2>e)return void("header"===n?(this._dropSegment="header",this.highlightHeaderDropZone(this._header.leftRightSided?e:t)):(this.resetHeaderDropZone(),this.highlightBodyDropZone(n)))}}getArea(){if("none"===this.element.style.display)return null;const t=super.getElementArea(this._header.element),e=super.getElementArea(this._childElementContainer);if(null===t||null===e)throw new at("SGAHC13086");const i=e.x2-e.x1,n=e.y2-e.y1;return this._contentAreaDimensions={header:{hoverArea:{x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2},highlightArea:{x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2}}},0===this.contentItems.length?(this._contentAreaDimensions.body={hoverArea:{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2},highlightArea:{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2}},super.getElementArea(this.element)):(this._contentAreaDimensions.left={hoverArea:{x1:e.x1,y1:e.y1,x2:e.x1+.25*i,y2:e.y2},highlightArea:{x1:e.x1,y1:e.y1,x2:e.x1+.5*i,y2:e.y2}},this._contentAreaDimensions.top={hoverArea:{x1:e.x1+.25*i,y1:e.y1,x2:e.x1+.75*i,y2:e.y1+.5*n},highlightArea:{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y1+.5*n}},this._contentAreaDimensions.right={hoverArea:{x1:e.x1+.75*i,y1:e.y1,x2:e.x2,y2:e.y2},highlightArea:{x1:e.x1+.5*i,y1:e.y1,x2:e.x2,y2:e.y2}},this._contentAreaDimensions.bottom={hoverArea:{x1:e.x1+.25*i,y1:e.y1+.5*n,x2:e.x1+.75*i,y2:e.y2},highlightArea:{x1:e.x1,y1:e.y1+.5*n,x2:e.x2,y2:e.y2}},super.getElementArea(this.element))}positionHeader(t){this._header.side!==t&&(this._header.setSide(t),this._headerSideChanged=!0,this.setupHeaderPosition())}updateNodeSize(){if("none"!==this.element.style.display){const t=Ft(this.element);if(this._header.show){t[this._header.leftRightSided?ct.width:ct.height]-=this.layoutManager.layoutConfig.dimensions.headerHeight}this._childElementContainer.style.width=Bt(t.width),this._childElementContainer.style.height=Bt(t.height);for(let e=0;e<this.contentItems.length;e++)this.contentItems[e].element.style.width=Bt(t.width),this.contentItems[e].element.style.height=Bt(t.height);this.emit("resize"),this.emitStateChangedEvent()}}highlightHeaderDropZone(t){var e;const i=this._header.lastVisibleTabIndex+1,n=this._header.tabsContainerElement.childNodes,o=new Array(i);let s=0,r=0;for(;r<i;){const t=n[s++];t!==this.layoutManager.tabDropPlaceholder&&(o[r++]=t)}if(null===this.layoutManager.dropTargetIndicator)throw new at("SHHDZDTI97110");if(0===i){const t=this._header.element.getBoundingClientRect();t.top,document.body.scrollTop,t.left,document.body.scrollLeft;t.height,t.height,this._dropIndex=0}else{if("scroll"===this.layoutManager.layoutConfig.settings.tabOverflowBehavior){const e=12,i=this._header.tabsContainerElement,n=i.getBoundingClientRect();t-n.left<e?i.scrollBy({left:-1}):n.right-t<e&&i.scrollBy({left:1})}let n,s,r,a=0,l=!1;do{r=o[a];const e=r.getBoundingClientRect(),i=e.top+document.body.scrollTop,h=e.left+document.body.scrollLeft;this._header.leftRightSided?(n=i,s=e.height):(n=h,s=e.width),t>=n&&t<n+s?l=!0:a++}while(a<i&&!l);if(!1===l&&t<n)return;t<n+s/2?(this._dropIndex=a,r.insertAdjacentElement("beforebegin",this.layoutManager.tabDropPlaceholder)):(this._dropIndex=Math.min(a+1,i),r.insertAdjacentElement("afterend",this.layoutManager.tabDropPlaceholder)),null===(e=this.layoutManager.dropTargetIndicator)||void 0===e||e.highlightElement(this.layoutManager.tabDropPlaceholder,0)}}resetHeaderDropZone(){this.layoutManager.tabDropPlaceholder.remove()}setupHeaderPosition(){Nt(this._header.element,this._header.show),this.element.classList.remove("lm_left","lm_right","lm_bottom"),this._header.leftRightSided&&this.element.classList.add("lm_"+this._header.side),this.updateSize(!1)}highlightBodyDropZone(t){if(void 0===this._contentAreaDimensions)throw new lt("SHBDZC82265");{const e=this._contentAreaDimensions[t].highlightArea,i=this.layoutManager.dropTargetIndicator;if(null===i)throw new at("SHBDZD96110");i.highlightArea(e,1),this._dropSegment=t}}handleResize(){
//! this._header.updateTabSizes()
"block"===getComputedStyle(this.layoutManager.container).display&&this._header.updateTabSizes()}handleMaximised(){this._header.processMaximised()}handleMinimised(){this._header.processMinimised()}handlePopoutEvent(){this.popout()}handleHeaderClickEvent(t){const e=Yt.headerClickEventName,i=new Yt.ClickBubblingEvent(e,this,t);this.emit(e,i)}handleHeaderTouchStartEvent(t){const e=Yt.headerTouchStartEventName,i=new Yt.TouchStartBubblingEvent(e,this,t);this.emit(e,i)}handleHeaderComponentRemoveEvent(t){this.removeChild(t,!1)}handleHeaderComponentFocusEvent(t){this.setActiveComponentItem(t,!0)}handleHeaderComponentStartDragEvent(t,e,i,n){!0===this.isMaximised&&this.toggleMaximise(),this.layoutManager.startComponentDrag(t,e,i,n,this)}createHeaderConfig(){if(this._headerSideChanged){const t=!!this._header.show&&this._header.side;let e=wt.Header.createCopy(this._headerConfig,t);return void 0===e&&(e={show:t,popout:void 0,maximise:void 0,close:void 0,minimise:void 0,tabDropdown:void 0}),e}return wt.Header.createCopy(this._headerConfig)}emitStateChangedEvent(){this.emitBaseBubblingEvent("stateChanged")}}!function(t){t.createElement=function(t){const e=t.createElement("div");return e.classList.add("lm_item"),e.classList.add("lm_stack"),e}}(de||(de={}));class ce extends Yt{constructor(t,e,i,n,o,s){if(super(),this._dragListener=i,this._layoutManager=n,this._componentItem=o,this._originalParent=s,this._area=null,this._lastValidArea=null,this._dragListener.on("drag",((t,e,i)=>this.onDrag(t,e,i))),this._dragListener.on("dragStop",(()=>this.onDrop())),this.createDragProxyElements(t,e),null===this._componentItem.parent)throw new at("DPC10097");this._componentItemFocused=this._componentItem.focused,this._componentItemFocused&&this._componentItem.blur(),this._componentItem.parent.removeChild(this._componentItem,!0),this.setDimensions(),document.body.appendChild(this._element),this.determineMinMaxXY(),this._layoutManager.calculateItemAreas(),this.setDropPosition(t,e)}get element(){return this._element}createDragProxyElements(t,e){this._element=document.createElement("div"),this._element.classList.add("lm_dragProxy");const i=document.createElement("div");i.classList.add("lm_header");const n=document.createElement("div");n.classList.add("lm_tabs");const o=document.createElement("div");o.classList.add("lm_tab");const s=document.createElement("span");s.classList.add("lm_title"),o.appendChild(s),n.appendChild(o),i.appendChild(n),this._proxyContainerElement=document.createElement("div"),this._proxyContainerElement.classList.add("lm_content"),this._element.appendChild(i),this._element.appendChild(this._proxyContainerElement),this._originalParent instanceof de&&this._originalParent.headerShow&&(this._sided=this._originalParent.headerLeftRightSided,this._element.classList.add("lm_"+this._originalParent.headerSide),[ut.right,ut.bottom].indexOf(this._originalParent.headerSide)>=0&&this._proxyContainerElement.insertAdjacentElement("afterend",i)),this._element.style.left=Bt(t),this._element.style.top=Bt(e),o.setAttribute("title",this._componentItem.title),s.insertAdjacentText("afterbegin",this._componentItem.title),this._proxyContainerElement.appendChild(this._componentItem.element)}determineMinMaxXY(){const t=this._layoutManager.groundItem;if(void 0===t)throw new lt("DPDMMXY73109");{const e=t.element.getBoundingClientRect();this._minX=e.left+document.body.scrollLeft,this._minY=e.top+document.body.scrollTop,this._maxX=this._minX+e.width,this._maxY=this._minY+e.height}}onDrag(t,e,i){const n=i.pageX,o=i.pageY;this.setDropPosition(n,o),this._componentItem.drag()}setDropPosition(t,e){this._layoutManager.layoutConfig.settings.constrainDragToContainer&&(t<=this._minX?t=Math.ceil(this._minX):t>=this._maxX&&(t=Math.floor(this._maxX)),e<=this._minY?e=Math.ceil(this._minY):e>=this._maxY&&(e=Math.floor(this._maxY))),this._element.style.left=Bt(t),this._element.style.top=Bt(e),this._area=this._layoutManager.getArea(t,e),null!==this._area&&(this._lastValidArea=this._area,this._area.contentItem.highlightDropZone(t,e,this._area))}onDrop(){const t=this._layoutManager.dropTargetIndicator;if(null===t)throw new at("DPOD30011");let e;if(t.hide(),this._componentItem.exitDragMode(),null!==this._area)e=this._componentItem,this._area.contentItem.onDrop(e,this._area);else if(null!==this._lastValidArea){e=this._componentItem;this._lastValidArea.contentItem.onDrop(e,this._lastValidArea)}else this._originalParent?(e=this._componentItem,this._originalParent.addChild(e)):this._componentItem.destroy();this._element.remove(),this._layoutManager.emit("itemDropped",this._componentItem),this._componentItemFocused&&void 0!==e&&e.focus()}setDimensions(){const t=this._layoutManager.layoutConfig.dimensions;if(void 0===t)throw new Error("DragProxy.setDimensions: dimensions undefined");let e=t.dragProxyWidth,i=t.dragProxyHeight;if(void 0===e||void 0===i)throw new Error("DragProxy.setDimensions: width and/or height undefined");const n=!1===this._layoutManager.layoutConfig.header.show?0:t.headerHeight;this._element.style.width=Bt(e),this._element.style.height=Bt(i),e-=this._sided?n:0,i-=this._sided?0:n,this._proxyContainerElement.style.width=Bt(e),this._proxyContainerElement.style.height=Bt(i),this._componentItem.enterDragMode(e,i),this._componentItem.show()}}class ue{constructor(t,e,i,n,o,s,r){this._layoutManager=t,this._element=e,this._extraAllowableChildTargets=i,this._componentTypeOrFtn=n,this._componentState=o,this._title=s,this._id=r,this._dragListener=null,this._dummyGroundContainer=document.createElement("div");const a=St.createDefault("row");this._dummyGroundContentItem=new se(this._layoutManager,a,this._dummyGroundContainer),this.createDragListener()}destroy(){this.removeDragListener()}createDragListener(){this.removeDragListener(),this._dragListener=new ie(this._element,this._extraAllowableChildTargets),this._dragListener.on("dragStart",((t,e)=>this.onDragStart(t,e))),this._dragListener.on("dragStop",(()=>this.onDragStop()))}onDragStart(t,e){var i;const n="component";let o;if("function"==typeof this._componentTypeOrFtn){const t=this._componentTypeOrFtn();o=ue.isDragSourceComponentItemConfig(t)?{type:n,componentState:t.state,componentType:t.type,title:null!==(i=t.title)&&void 0!==i?i:this._title}:t}else o={type:n,componentState:this._componentState,componentType:this._componentTypeOrFtn,title:this._title,id:this._id};const s=At.resolve(o,!1),r=new te(this._layoutManager,s,this._dummyGroundContentItem);if(this._dummyGroundContentItem.contentItems.push(r),null===this._dragListener)throw new at("DSODSD66746");{const i=new ce(t,e,this._dragListener,this._layoutManager,r,this._dummyGroundContentItem),n=this._layoutManager.transitionIndicator;if(null===n)throw new at("DSODST66746");n.transitionElements(this._element,i.element)}}onDragStop(){this.createDragListener()}removeDragListener(){null!==this._dragListener&&(this._dragListener.destroy(),this._dragListener=null)}}!function(t){t.isDragSourceComponentItemConfig=function(t){return!("componentType"in t)}}(ue||(ue={}));class me{constructor(){this.targetElement=null,this.observeInterval=null,this._element=document.createElement("div"),this._element.classList.add("lm_dropTargetIndicator");const t=document.createElement("div");t.classList.add("lm_inner"),this._element.appendChild(t),document.body.appendChild(this._element)}destroy(){this.clearHighlightedElement(),this._element.remove()}highlightArea(t,e){this.clearHighlightedElement(),this.highlightAreaInternal(t,e)}highlightAreaInternal(t,e){this._element.style.left=Bt(t.x1+e),this._element.style.top=Bt(t.y1+e),this._element.style.width=Bt(t.x2-t.x1-e),this._element.style.height=Bt(t.y2-t.y1-e),this._element.style.display="block"}highlightElement(t,e){if(this.targetElement===t)return;this.clearHighlightedElement(),this.targetElement=t;const i=t.getBoundingClientRect(),n={x1:i.left,y1:i.top,x2:i.right,y2:i.bottom};this.highlightAreaInternal(n,e),this.observeInterval=setInterval((()=>{const i=t.getBoundingClientRect(),n={x1:i.left,y1:i.top,x2:i.right,y2:i.bottom};this.highlightAreaInternal(n,e)}),16)}clearHighlightedElement(){this.observeInterval&&(clearInterval(this.observeInterval),this.observeInterval=null),this.targetElement=null}hide(){Nt(this._element,!1),this.clearHighlightedElement()}}class pe{constructor(){this._element=document.createElement("div"),this._element.classList.add("lm_transition_indicator"),document.body.appendChild(this._element),this._toElement=null,this._fromDimensions=null,this._totalAnimationDuration=200,this._animationStartTime=null}destroy(){this._element.remove()}transitionElements(t,e){}nextAnimationFrame(){}measure(t){const e=t.getBoundingClientRect();return{left:e.left,top:e.top,width:t.offsetWidth,height:t.offsetHeight}}}class ge extends Yt{constructor(t){super(),this._layoutManager=t,this._childEventListener=t=>this.onEventFromChild(t),globalThis.addEventListener(ge.ChildEventName,this._childEventListener,{passive:!0})}emit(t,...e){"userBroadcast"===t?this.emitUserBroadcast(...e):super.emit(t,...e)}emitUserBroadcast(...t){this.handleUserBroadcastEvent("userBroadcast",t)}destroy(){globalThis.removeEventListener(ge.ChildEventName,this._childEventListener)}handleUserBroadcastEvent(t,e){this._layoutManager.isSubWindow?this.propagateToParent(t,e):this.propagateToThisAndSubtree(t,e)}onEventFromChild(t){const e=t.detail;this.handleUserBroadcastEvent(e.eventName,e.args)}propagateToParent(t,e){const i={bubbles:!0,cancelable:!0,detail:{layoutManager:this._layoutManager,eventName:t,args:e}},n=new CustomEvent(ge.ChildEventName,i),o=globalThis.opener;if(null===o)throw new at("EHPTP15778");o.dispatchEvent(n)}propagateToThisAndSubtree(t,e){this.emitUnknown(t,...e);for(let i=0;i<this._layoutManager.openPopouts.length;i++){const n=this._layoutManager.openPopouts[i].getGlInstance();n&&n.eventHub.propagateToThisAndSubtree(t,e)}}}!function(t){t.ChildEventName="gl_child_event"}(ge||(ge={}));class fe extends Yt{constructor(t){super(),this.resizeWithContainerAutomatically=!1,this.resizeDebounceInterval=100,this.resizeDebounceExtendedWhenPossible=!0,this._isInitialised=!1,this._groundItem=void 0,this._openPopouts=[],this._dropTargetIndicator=null,this._transitionIndicator=null,this._itemAreas=[],this._maximisePlaceholder=fe.createMaximisePlaceElement(document),this._tabDropPlaceholder=fe.createTabDropPlaceholderElement(document),this._dragSources=[],this._updatingColumnsResponsive=!1,this._firstLoad=!0,this._eventHub=new ge(this),this._width=null,this._height=null,this._virtualSizedContainers=[],this._virtualSizedContainerAddingBeginCount=0,this._sizeInvalidationBeginCount=0,this._resizeObserver=new ResizeObserver((()=>this.handleContainerResize())),this._windowBeforeUnloadListener=()=>this.onBeforeUnload(),this._windowBeforeUnloadListening=!1,this._maximisedStackBeforeDestroyedListener=t=>this.cleanupBeforeMaximisedStackDestroyed(t),this.isSubWindow=t.isSubWindow,this._constructorOrSubWindowLayoutConfig=t.constructorOrSubWindowLayoutConfig,K.checkInitialise(),yt.checkInitialise(),void 0!==t.containerElement&&(this._containerElement=t.containerElement)}get container(){return this._containerElement}get isInitialised(){return this._isInitialised}get groundItem(){return this._groundItem}get root(){return this._groundItem}get openPopouts(){return this._openPopouts}get dropTargetIndicator(){return this._dropTargetIndicator}get transitionIndicator(){return this._transitionIndicator}get width(){return this._width}get height(){return this._height}get eventHub(){return this._eventHub}get rootItem(){if(void 0===this._groundItem)throw new Error("Cannot access rootItem before init");return 0===this._groundItem.contentItems.length?void 0:this._groundItem.contentItems[0]}get focusedComponentItem(){return this._focusedComponentItem}get tabDropPlaceholder(){return this._tabDropPlaceholder}get maximisedStack(){return this._maximisedStack}get deprecatedConstructor(){return!this.isSubWindow&&void 0!==this._constructorOrSubWindowLayoutConfig}destroy(){if(this._isInitialised){this._windowBeforeUnloadListening&&(globalThis.removeEventListener("beforeunload",this._windowBeforeUnloadListener),this._windowBeforeUnloadListening=!1),!0===this.layoutConfig.settings.closePopoutsOnUnload&&this.closeAllOpenPopouts(),this._resizeObserver.disconnect(),this.checkClearResizeTimeout(),void 0!==this._groundItem&&this._groundItem.destroy(),this._tabDropPlaceholder.remove(),null!==this._dropTargetIndicator&&this._dropTargetIndicator.destroy(),null!==this._transitionIndicator&&this._transitionIndicator.destroy(),this._eventHub.destroy();for(const t of this._dragSources)t.destroy();this._dragSources=[],this._isInitialised=!1}}minifyConfig(t){return Lt.minifyConfig(t)}unminifyConfig(t){return Lt.unminifyConfig(t)}init(){let t;if(this.setContainer(),this._dropTargetIndicator=new me,this._transitionIndicator=new pe,this.updateSizeFromContainer(),this.isSubWindow){if(void 0===this._constructorOrSubWindowLayoutConfig)throw new lt("LMIU07155");{const e=this._constructorOrSubWindowLayoutConfig.root;if(void 0===e)throw new st("LMIC07156");if(!Mt.isComponent(e))throw new st("LMIC07157");t=e;const i=Rt.resolve(this._constructorOrSubWindowLayoutConfig);this.layoutConfig=Object.assign(Object.assign({},i),{root:void 0})}}else void 0===this._constructorOrSubWindowLayoutConfig?this.layoutConfig=Lt.createDefault():this.layoutConfig=Rt.resolve(this._constructorOrSubWindowLayoutConfig);const e=this.layoutConfig;this._groundItem=new se(this,e.root,this._containerElement),this._groundItem.init(),this.checkLoadedLayoutMaximiseItem(),this._resizeObserver.observe(this._containerElement),this._isInitialised=!0,this.adjustColumnsResponsive(),this.emit("initialised"),void 0!==t&&this.loadComponentAsRoot(t)}loadLayout(t){if(!this.isInitialised)throw new Error("GoldenLayout: Need to call init() if LayoutConfig with defined root passed to constructor");if(void 0===this._groundItem)throw new lt("LMLL11119");this.createSubWindows(),this.layoutConfig=Rt.resolve(t),this._groundItem.loadRoot(this.layoutConfig.root),this.checkLoadedLayoutMaximiseItem(),this.adjustColumnsResponsive()}saveLayout(){if(!1===this._isInitialised)throw new Error("Can't create config, layout not yet initialised");if(void 0===this._groundItem)throw new lt("LMTC18244");{const t=this._groundItem.calculateConfigContent();let e;e=1!==t.length?void 0:t[0],this.reconcilePopoutWindows();const i=[];for(let t=0;t<this._openPopouts.length;t++)i.push(this._openPopouts[t].toConfig());return{root:e,openPopouts:i,settings:Lt.Settings.createCopy(this.layoutConfig.settings),dimensions:Lt.Dimensions.createCopy(this.layoutConfig.dimensions),header:Lt.Header.createCopy(this.layoutConfig.header),resolved:!0}}}clear(){if(void 0===this._groundItem)throw new lt("LMCL11129");this._groundItem.clearRoot()}toConfig(){return this.saveLayout()}newComponent(t,e,i){const n=this.newComponentAtLocation(t,e,i);if(void 0===n)throw new st("LMNC65588");return n}newComponentAtLocation(t,e,i,n){if(void 0===this._groundItem)throw new Error("Cannot add component before init");{const o=this.addComponentAtLocation(t,e,i,n);if(void 0===o)return;{const t=o.parentItem.contentItems[o.index];if(Qt.isComponentItem(t))return t;throw new st("LMNC992877533")}}}addComponent(t,e,i){const n=this.addComponentAtLocation(t,e,i);if(void 0===n)throw new st("LMAC99943");return n}addComponentAtLocation(t,e,i,n){const o={type:"component",componentType:t,componentState:e,title:i};return this.addItemAtLocation(o,n)}newItem(t){const e=this.newItemAtLocation(t);if(void 0===e)throw new st("LMNC65588");return e}newItemAtLocation(t,e){if(void 0===this._groundItem)throw new Error("Cannot add component before init");{const i=this.addItemAtLocation(t,e);if(void 0===i)return;return i.parentItem.contentItems[i.index]}}addItem(t){const e=this.addItemAtLocation(t);if(void 0===e)throw new st("LMAI99943");return e}addItemAtLocation(t,e){if(void 0===this._groundItem)throw new Error("Cannot add component before init");{void 0===e&&(e="component"===t.type?fe.defaultLocationSelectors:fe.defaultNonComponentSelectors);const i=this.findFirstLocation(e);if(void 0===i)return;{let e,n=i.parentItem;switch(n.type){case ft.ground:e=n.addItem(t,i.index),e>=0?n=this._groundItem.contentItems[0]:e=0;break;case ft.row:case ft.column:e=n.addItem(t,i.index);break;case ft.stack:if(Mt.isComponent(t)){e=n.addItem(t,i.index);break}throw Error(ht[6]);case ft.component:throw new st("LMAIALC87444602");default:throw new rt("LMAIALU98881733",n.type)}if(Mt.isComponent(t)){const t=n.contentItems[e];Qt.isStack(t)&&(n=t,e=0)}return i.parentItem=n,i.index=e,i}}}loadComponentAsRoot(t){if(void 0===this._groundItem)throw new Error("Cannot add item before init");this._groundItem.loadComponentAsRoot(t)}updateSize(t,e){this.setSize(t,e)}setSize(t,e){if(this._width=t,this._height=e,!0===this._isInitialised){if(void 0===this._groundItem)throw new lt("LMUS18881");if(this._groundItem.setSize(this._width,this._height),this._maximisedStack){const{width:t,height:e}=Ft(this._containerElement);Wt(this._maximisedStack.element,t),Ht(this._maximisedStack.element,e),this._maximisedStack.updateSize(!1)}this.adjustColumnsResponsive()}}beginSizeInvalidation(){this._sizeInvalidationBeginCount++}endSizeInvalidation(){0==--this._sizeInvalidationBeginCount&&this.updateSizeFromContainer()}updateSizeFromContainer(){const{width:t,height:e}=Ft(this._containerElement);this.setSize(t,e)}updateRootSize(t=!1){if(void 0===this._groundItem)throw new lt("LMURS28881");this._groundItem.updateSize(t)}createAndInitContentItem(t,e){const i=this.createContentItem(t,e);return i.init(),i}createContentItem(t,e){if("string"!=typeof t.type)throw new tt("Missing parameter 'type'",JSON.stringify(t));if(Ct.isComponentItem(t)&&!(e instanceof de)&&e&&!(!0===this.isSubWindow&&e instanceof se)){t={type:ft.stack,content:[t],size:t.size,sizeUnit:t.sizeUnit,minSize:t.minSize,minSizeUnit:t.minSizeUnit,id:t.id,maximised:t.maximised,isClosable:t.isClosable,activeItemIndex:0,header:void 0}}return this.createContentItemFromConfig(t,e)}findFirstComponentItemById(t){if(void 0===this._groundItem)throw new lt("LMFFCIBI82446");return this.findFirstContentItemTypeByIdRecursive(ft.component,t,this._groundItem)}createPopout(t,e,i,n){return t instanceof Qt?this.createPopoutFromContentItem(t,e,i,n):this.createPopoutFromItemConfig(t,e,i,n)}createPopoutFromContentItem(t,e,i,n){let o=t.parent,s=t;for(;null!==o&&1===o.contentItems.length&&!o.isGround;)s=o,o=o.parent;if(null===o)throw new at("LMCPFCI00834");{if(void 0===n&&(n=o.contentItems.indexOf(s)),null!==i&&o.addPopInParentId(i),void 0===e){const i=globalThis.screenX||globalThis.screenLeft,n=globalThis.screenY||globalThis.screenTop,o=t.element.offsetLeft,s=t.element.offsetTop,{width:r,height:a}=Ft(t.element);e={left:i+o,top:n+s,width:r,height:a}}const r=t.toConfig();if(t.remove(),Et.isRootItemConfig(r))return this.createPopoutFromItemConfig(r,e,i,n);throw new Error(`${ht[0]}`)}}beginVirtualSizedContainerAdding(){0==++this._virtualSizedContainerAddingBeginCount&&(this._virtualSizedContainers.length=0)}addVirtualSizedContainer(t){this._virtualSizedContainers.push(t)}endVirtualSizedContainerAdding(){if(0==--this._virtualSizedContainerAddingBeginCount){const t=this._virtualSizedContainers.length;if(t>0){this.fireBeforeVirtualRectingEvent(t);for(let e=0;e<t;e++){this._virtualSizedContainers[e].notifyVirtualRectingRequired()}this.fireAfterVirtualRectingEvent(),this._virtualSizedContainers.length=0}}}fireBeforeVirtualRectingEvent(t){void 0!==this.beforeVirtualRectingEvent&&this.beforeVirtualRectingEvent(t)}fireAfterVirtualRectingEvent(){void 0!==this.afterVirtualRectingEvent&&this.afterVirtualRectingEvent()}createPopoutFromItemConfig(t,e,i,n){const o=this.toConfig(),s={root:t,openPopouts:[],settings:o.settings,dimensions:o.dimensions,header:o.header,window:e,parentId:i,indexInParent:n,resolved:!0};return this.createPopoutFromPopoutLayoutConfig(s)}createPopoutFromPopoutLayoutConfig(t){var e,i,n,o;const s=t.window,r={left:null!==(e=s.left)&&void 0!==e?e:globalThis.screenX||globalThis.screenLeft+20,top:null!==(i=s.top)&&void 0!==i?i:globalThis.screenY||globalThis.screenTop+20,width:null!==(n=s.width)&&void 0!==n?n:500,height:null!==(o=s.height)&&void 0!==o?o:309},a=new Jt(t,r,this);return a.on("initialised",(()=>this.emit("windowOpened",a))),a.on("closed",(()=>this.reconcilePopoutWindows())),this._openPopouts.push(a),this.layoutConfig.settings.closePopoutsOnUnload&&!this._windowBeforeUnloadListening&&(globalThis.addEventListener("beforeunload",this._windowBeforeUnloadListener,{passive:!0}),this._windowBeforeUnloadListening=!0),a}closeAllOpenPopouts(){for(let t=0;t<this._openPopouts.length;t++)this._openPopouts[t].close();this._openPopouts.length=0,this._windowBeforeUnloadListening&&(globalThis.removeEventListener("beforeunload",this._windowBeforeUnloadListener),this._windowBeforeUnloadListening=!1)}newDragSource(t,e,i,n,o){const s=new ue(this,t,[],e,i,n,o);return this._dragSources.push(s),s}removeDragSource(t){!function(t,e){const i=e.indexOf(t);if(-1===i)throw new Error("Can't remove item from array. Item is not in the array");e.splice(i,1)}(t,this._dragSources),t.destroy()}startComponentDrag(t,e,i,n,o){new ce(t,e,i,this,n,o)}focusComponent(t,e=!1){t.focus(e)}clearComponentFocus(t=!1){this.setFocusedComponentItem(void 0,t)}setFocusedComponentItem(t,e=!1){if(t!==this._focusedComponentItem){let i;if(void 0===t||(i=t.parentItem),void 0!==this._focusedComponentItem){const t=this._focusedComponentItem;this._focusedComponentItem=void 0,t.setBlurred(e);const n=t.parentItem;i===n?i=void 0:n.setFocusedValue(!1)}void 0!==t&&(this._focusedComponentItem=t,t.setFocused(e),void 0!==i&&i.setFocusedValue(!0))}}createContentItemFromConfig(t,e){switch(t.type){case ft.ground:throw new st("LMCCIFC68871");case ft.row:return new oe(!1,this,t,e);case ft.column:return new oe(!0,this,t,e);case ft.stack:return new de(this,t,e);case ft.component:return new te(this,t,e);default:throw new rt("CCC913564",t.type,"Invalid Config Item type specified")}}setMaximisedStack(t){void 0===t?void 0!==this._maximisedStack&&this.processMinimiseMaximisedStack():t!==this._maximisedStack&&(void 0!==this._maximisedStack&&this.processMinimiseMaximisedStack(),this.processMaximiseStack(t))}checkMinimiseMaximisedStack(){void 0!==this._maximisedStack&&this._maximisedStack.minimise()}cleanupBeforeMaximisedStackDestroyed(t){null!==this._maximisedStack&&this._maximisedStack===t.target&&(this._maximisedStack.off("beforeItemDestroyed",this._maximisedStackBeforeDestroyedListener),this._maximisedStack=void 0)}closeWindow(){globalThis.setTimeout((()=>globalThis.close()),1)}getArea(t,e){let i=null,n=1/0;for(let o=0;o<this._itemAreas.length;o++){const s=this._itemAreas[o];t>=s.x1&&t<s.x2&&e>=s.y1&&e<s.y2&&n>s.surface&&(n=s.surface,i=s)}return i}calculateItemAreas(){const t=this.getAllContentItems(),e=this._groundItem;if(void 0===e)throw new lt("LMCIAR44365");if(1!==t.length){e.contentItems[0].isStack?this._itemAreas=[]:this._itemAreas=e.createSideAreas();for(let e=0;e<t.length;e++){const i=t[e];if(Qt.isStack(i)){const t=i.getArea();if(null===t)continue;{this._itemAreas.push(t);const e=i.contentAreaDimensions;if(void 0===e)throw new lt("LMCIASC45599");{const t=e.header.highlightArea,n=(t.x2-t.x1)*(t.y2-t.y1),o={x1:t.x1,x2:t.x2,y1:t.y1,y2:t.y2,contentItem:i,surface:n};this._itemAreas.push(o)}}}}}else{const t=e.getElementArea();if(null===t)throw new at("LMCIARA44365");this._itemAreas=[t]}}checkLoadedLayoutMaximiseItem(){if(void 0===this._groundItem)throw new lt("LMCLLMI43432");{const t=this._groundItem.getConfigMaximisedItems();if(t.length>0){let e=t[0];if(Qt.isComponentItem(e)){const t=e.parent;if(null===t)throw new at("LMXLLMI69999");e=t}if(!Qt.isStack(e))throw new st("LMCLLMI19993");e.maximise()}}}processMaximiseStack(t){if(this._maximisedStack=t,t.on("beforeItemDestroyed",this._maximisedStackBeforeDestroyedListener),t.element.classList.add("lm_maximised"),t.element.insertAdjacentElement("afterend",this._maximisePlaceholder),void 0===this._groundItem)throw new lt("LMMXI19993");{this._groundItem.element.prepend(t.element);const{width:e,height:i}=Ft(this._containerElement);Wt(t.element,e),Ht(t.element,i),t.updateSize(!0),t.focusActiveContentItem(),this._maximisedStack.emit("maximised"),this.emit("stateChanged")}}processMinimiseMaximisedStack(){if(void 0===this._maximisedStack)throw new st("LMMMS74422");{const t=this._maximisedStack;if(null===t.parent)throw new at("LMMI13668");t.element.classList.remove("lm_maximised"),this._maximisePlaceholder.insertAdjacentElement("afterend",t.element),this._maximisePlaceholder.remove(),this.updateRootSize(!0),this._maximisedStack=void 0,t.off("beforeItemDestroyed",this._maximisedStackBeforeDestroyedListener),t.emit("minimised"),this.emit("stateChanged")}}reconcilePopoutWindows(){const t=[];for(let e=0;e<this._openPopouts.length;e++)!1===this._openPopouts[e].getWindow().closed?t.push(this._openPopouts[e]):this.emit("windowClosed",this._openPopouts[e]);this._openPopouts.length!==t.length&&(this._openPopouts=t,this.emit("stateChanged"))}getAllContentItems(){if(void 0===this._groundItem)throw new lt("LMGACI13130");return this._groundItem.getAllContentItems()}createSubWindows(){for(let t=0;t<this.layoutConfig.openPopouts.length;t++){const e=this.layoutConfig.openPopouts[t];this.createPopoutFromPopoutLayoutConfig(e)}}handleContainerResize(){this.resizeWithContainerAutomatically&&this.processResizeWithDebounce()}processResizeWithDebounce(){this.resizeDebounceExtendedWhenPossible&&this.checkClearResizeTimeout(),void 0===this._resizeTimeoutId&&(this._resizeTimeoutId=setTimeout((()=>{this._resizeTimeoutId=void 0,this.beginSizeInvalidation(),this.endSizeInvalidation()}),this.resizeDebounceInterval))}checkClearResizeTimeout(){void 0!==this._resizeTimeoutId&&(clearTimeout(this._resizeTimeoutId),this._resizeTimeoutId=void 0)}setContainer(){var t;const e=document.body,i=null!==(t=this._containerElement)&&void 0!==t?t:e;if(i===e){this.resizeWithContainerAutomatically=!0;const t=document.documentElement;t.style.height="100%",t.style.margin="0",t.style.padding="0",t.style.overflow="clip",e.style.height="100%",e.style.margin="0",e.style.padding="0",e.style.overflow="clip"}this._containerElement=i}onBeforeUnload(){this.destroy()}adjustColumnsResponsive(){if(void 0===this._groundItem)throw new lt("LMACR20883");if(this._firstLoad=!1,this.useResponsiveLayout()&&!this._updatingColumnsResponsive&&this._groundItem.contentItems.length>0&&this._groundItem.contentItems[0].isRow){if(void 0===this._groundItem||null===this._width)throw new lt("LMACR77412");{const t=this._groundItem.contentItems[0].contentItems.length;if(t<=1)return;{const e=this.layoutConfig.dimensions.defaultMinItemWidth;if(t*e<=this._width)return;{this._updatingColumnsResponsive=!0;const i=t-Math.max(Math.floor(this._width/e),1),n=this._groundItem.contentItems[0],o=this.getAllStacks();if(0===o.length)throw new st("LMACRS77413");{const t=o[0];for(let e=0;e<i;e++){const e=n.contentItems[n.contentItems.length-1];this.addChildContentItemsToContainer(t,e)}this._updatingColumnsResponsive=!1}}}}}}useResponsiveLayout(){const t=this.layoutConfig.settings,e=t.responsiveMode===vt.always,i=t.responsiveMode===vt.onload&&this._firstLoad;return e||i}addChildContentItemsToContainer(t,e){const i=e.contentItems;if(e instanceof de)for(let n=0;n<i.length;n++){const o=i[n];e.removeChild(o,!0),t.addChild(o)}else for(let e=0;e<i.length;e++){const n=i[e];this.addChildContentItemsToContainer(t,n)}}getAllStacks(){if(void 0===this._groundItem)throw new lt("LMFASC52778");{const t=[];return this.findAllStacksRecursive(t,this._groundItem),t}}findFirstContentItemType(t){if(void 0===this._groundItem)throw new lt("LMFFCIT82446");return this.findFirstContentItemTypeRecursive(t,this._groundItem)}findFirstContentItemTypeRecursive(t,e){const i=e.contentItems,n=i.length;if(0!==n){for(let e=0;e<n;e++){const n=i[e];if(n.type===t)return n}for(let e=0;e<n;e++){const n=i[e],o=this.findFirstContentItemTypeRecursive(t,n);if(void 0!==o)return o}}}findFirstContentItemTypeByIdRecursive(t,e,i){const n=i.contentItems,o=n.length;if(0!==o){for(let i=0;i<o;i++){const o=n[i];if(o.type===t&&o.id===e)return o}for(let i=0;i<o;i++){const o=n[i],s=this.findFirstContentItemTypeByIdRecursive(t,e,o);if(void 0!==s)return s}}}findAllStacksRecursive(t,e){const i=e.contentItems;for(let e=0;e<i.length;e++){const n=i[e];n instanceof de?t.push(n):n.isComponent||this.findAllStacksRecursive(t,n)}}findFirstLocation(t){const e=t.length;for(let i=0;i<e;i++){const e=t[i],n=this.findLocation(e);if(void 0!==n)return n}}findLocation(t){const e=t.index;switch(t.typeId){case 0:if(void 0===this._focusedComponentItem)return;{const t=this._focusedComponentItem.parentItem,i=t.contentItems,n=i.length;if(void 0===e)return{parentItem:t,index:n};{const o=i.indexOf(this._focusedComponentItem)+e;return o<0||o>n?void 0:{parentItem:t,index:o}}}case 1:if(void 0===this._focusedComponentItem)return;{const t=this._focusedComponentItem.parentItem;return this.tryCreateLocationFromParentItem(t,e)}case 2:{const t=this.findFirstContentItemType(ft.stack);return void 0===t?void 0:this.tryCreateLocationFromParentItem(t,e)}case 3:{let t=this.findFirstContentItemType(ft.row);return void 0!==t?this.tryCreateLocationFromParentItem(t,e):(t=this.findFirstContentItemType(ft.column),void 0!==t?this.tryCreateLocationFromParentItem(t,e):void 0)}case 4:{const t=this.findFirstContentItemType(ft.row);return void 0===t?void 0:this.tryCreateLocationFromParentItem(t,e)}case 5:{const t=this.findFirstContentItemType(ft.column);return void 0===t?void 0:this.tryCreateLocationFromParentItem(t,e)}case 6:if(void 0===this._groundItem)throw new lt("LMFLRIF18244");return void 0!==this.rootItem?void 0:void 0===e||0===e?{parentItem:this._groundItem,index:0}:void 0;case 7:if(void 0===this._groundItem)throw new lt("LMFLF18244");{const t=this._groundItem.contentItems;if(0===t.length)return void 0===e||0===e?{parentItem:this._groundItem,index:0}:void 0;{const i=t[0];return this.tryCreateLocationFromParentItem(i,e)}}}}tryCreateLocationFromParentItem(t,e){const i=t.contentItems.length;return void 0===e?{parentItem:t,index:i}:e<0||e>i?void 0:{parentItem:t,index:e}}}!function(t){t.createMaximisePlaceElement=function(t){const e=t.createElement("div");return e.classList.add("lm_maximise_place"),e},t.createTabDropPlaceholderElement=function(t){const e=t.createElement("div");return e.classList.add("lm_drop_tab_placeholder"),e},t.defaultNonComponentSelectors=[{typeId:3,index:void 0},{typeId:7,index:void 0}],t.defaultLocationSelectors=[{typeId:1,index:void 0},{typeId:2,index:void 0},...t.defaultNonComponentSelectors],t.afterFocusedItemIfPossibleLocationSelectors=[{typeId:0,index:1},{typeId:2,index:void 0},{typeId:3,index:void 0},{typeId:7,index:void 0}]}(fe||(fe={}));class ve extends fe{constructor(t,e,i,n){if(super(ve.createLayoutManagerConstructorParameters(t,e)),this._bindComponentEventHanlderPassedInConstructor=!1,this._creationTimeoutPassed=!1,void 0!==e&&"function"==typeof e&&(this.bindComponentEvent=e,this._bindComponentEventHanlderPassedInConstructor=!0,void 0!==i&&(this.unbindComponentEvent=i)),!this._bindComponentEventHanlderPassedInConstructor&&this.isSubWindow){if(void 0===this._constructorOrSubWindowLayoutConfig)throw new lt("VLC98823");{const t=Rt.resolve(this._constructorOrSubWindowLayoutConfig);this.layoutConfig=Object.assign(Object.assign({},t),{root:void 0})}}!0!==n&&(this.deprecatedConstructor||this.init())}destroy(){this.bindComponentEvent=void 0,this.unbindComponentEvent=void 0,super.destroy()}init(){if(this._bindComponentEventHanlderPassedInConstructor||"loading"!==document.readyState&&null!==document.body){if(!this._bindComponentEventHanlderPassedInConstructor&&!0===this.isSubWindow&&!this._creationTimeoutPassed)return setTimeout((()=>this.init()),7),void(this._creationTimeoutPassed=!0);!0===this.isSubWindow&&(this._bindComponentEventHanlderPassedInConstructor||this.clearHtmlAndAdjustStylesForSubWindow(),window.__glInstance=this),super.init()}else document.addEventListener("DOMContentLoaded",(()=>this.init()),{passive:!0})}clearHtmlAndAdjustStylesForSubWindow(){const t=document.head,e=new Array(4);e[0]=document.querySelectorAll("body link"),e[1]=document.querySelectorAll("body style"),e[2]=document.querySelectorAll("template"),e[3]=document.querySelectorAll(".gl_keep");for(let i=0;i<e.length;i++){const n=e[i];for(let e=0;e<n.length;e++){const i=n[e];t.appendChild(i)}}const i=document.body;i.innerHTML="",i.style.visibility="visible",this.checkAddDefaultPopinButton(),document.body.offsetHeight}checkAddDefaultPopinButton(){if(this.layoutConfig.settings.popInOnClose)return!1;{const t=document.createElement("div");t.classList.add("lm_popin"),t.setAttribute("title",this.layoutConfig.header.dock);const e=document.createElement("div");e.classList.add("lm_icon");const i=document.createElement("div");return i.classList.add("lm_bg"),t.appendChild(e),t.appendChild(i),t.addEventListener("click",(()=>this.emit("popIn"))),document.body.appendChild(t),!0}}bindComponent(t,e){if(void 0!==this.bindComponentEvent){return this.bindComponentEvent(t,e)}if(void 0!==this.getComponentEvent)return{virtual:!1,component:this.getComponentEvent(t,e)};{const t=`${ht[2]}: ${JSON.stringify(e)}`;throw new nt(t)}}unbindComponent(t,e,i){if(void 0!==this.unbindComponentEvent)this.unbindComponentEvent(t);else if(!e&&void 0!==this.releaseComponentEvent){if(void 0===i)throw new lt("VCUCRCU333998");this.releaseComponentEvent(t,i)}}}!function(t){let e=!1;t.createLayoutManagerConstructorParameters=function(t,i){const n=e?null:new URL(document.location.href).searchParams.get("gl-window");e=!0;const o=null!==n;let s,r;if(null!==n){const e=localStorage.getItem(n);if(null===e)throw new Error("Null gl-window Config");localStorage.removeItem(n);const i=JSON.parse(e),o=Lt.unminifyConfig(i);r=Rt.fromResolved(o),t instanceof HTMLElement&&(s=t)}else void 0===t?r=void 0:t instanceof HTMLElement?(r=void 0,s=t):r=t,void 0===s&&i instanceof HTMLElement&&(s=i);return{constructorOrSubWindowLayoutConfig:r,isSubWindow:o,containerElement:s}}}(ve||(ve={}));class _e extends ve{constructor(t,e,i){super(t,e,i,!0),this._componentTypesMap=new Map,this._registeredComponentMap=new Map,this._virtuableComponentMap=new Map,this._containerVirtualRectingRequiredEventListener=(t,e,i)=>this.handleContainerVirtualRectingRequiredEvent(t,e,i),this._containerVirtualVisibilityChangeRequiredEventListener=(t,e)=>this.handleContainerVirtualVisibilityChangeRequiredEvent(t,e),this._containerVirtualZIndexChangeRequiredEventListener=(t,e,i)=>this.handleContainerVirtualZIndexChangeRequiredEvent(t,e,i),this.deprecatedConstructor||this.init()}registerComponent(t,e,i=!1){if("function"!=typeof e)throw new it("registerComponent() componentConstructorOrFactoryFtn parameter is not a function");if(e.hasOwnProperty("prototype")){const n=e;this.registerComponentConstructor(t,n,i)}else{const n=e;this.registerComponentFactoryFunction(t,n,i)}}registerComponentConstructor(t,e,i=!1){if("function"!=typeof e)throw new Error(ht[1]);if(void 0!==this._componentTypesMap.get(t))throw new nt(`${ht[3]}: ${t}`);this._componentTypesMap.set(t,{constructor:e,factoryFunction:void 0,virtual:i})}registerComponentFactoryFunction(t,e,i=!1){if("function"!=typeof e)throw new nt("Please register a constructor function");if(void 0!==this._componentTypesMap.get(t))throw new nt(`${ht[3]}: ${t}`);this._componentTypesMap.set(t,{constructor:void 0,factoryFunction:e,virtual:i})}registerComponentFunction(t){this.registerGetComponentConstructorCallback(t)}registerGetComponentConstructorCallback(t){if("function"!=typeof t)throw new Error("Please register a callback function");void 0!==this._getComponentConstructorFtn&&console.warn("Multiple component functions are being registered.  Only the final registered function will be used."),this._getComponentConstructorFtn=t}getRegisteredComponentTypeNames(){const t=this._componentTypesMap.keys();return Array.from(t)}getComponentInstantiator(t){let e;const i=It.resolveComponentTypeName(t);return void 0!==i&&(e=this._componentTypesMap.get(i)),void 0===e&&void 0!==this._getComponentConstructorFtn&&(e={constructor:this._getComponentConstructorFtn(t),factoryFunction:void 0,virtual:!1}),e}bindComponent(t,e){let i;const n=It.resolveComponentTypeName(e);let o;if(void 0!==n&&(i=this._componentTypesMap.get(n)),void 0===i&&void 0!==this._getComponentConstructorFtn&&(i={constructor:this._getComponentConstructorFtn(e),factoryFunction:void 0,virtual:!1}),void 0!==i){const s=i.virtual;let r,a;r=void 0===e.componentState?void 0:Gt({},e.componentState);const l=i.constructor;if(void 0!==l)a=new l(t,r,s);else{const e=i.factoryFunction;if(void 0===e)throw new st("LMBCFFU10008");a=e(t,r,s)}if(s){if(void 0===a)throw new lt("GLBCVCU988774");{const e=a,i=e.rootHtmlElement;if(void 0===i)throw new nt(`${ht[5]}: ${n}`);!function(t){const e="absolute";t.style.position!==e&&(t.style.position=e)}(i),this.container.appendChild(i),this._virtuableComponentMap.set(t,e),t.virtualRectingRequiredEvent=this._containerVirtualRectingRequiredEventListener,t.virtualVisibilityChangeRequiredEvent=this._containerVirtualVisibilityChangeRequiredEventListener,t.virtualZIndexChangeRequiredEvent=this._containerVirtualZIndexChangeRequiredEventListener}}this._registeredComponentMap.set(t,a),o={virtual:i.virtual,component:a}}else o=super.bindComponent(t,e);return o}unbindComponent(t,e,i){if(void 0===this._registeredComponentMap.get(t))super.unbindComponent(t,e,i);else{const e=this._virtuableComponentMap.get(t);if(void 0!==e){const i=e.rootHtmlElement;if(void 0===i)throw new st("GLUC77743",t.title);this.container.removeChild(i),this._virtuableComponentMap.delete(t)}}}fireBeforeVirtualRectingEvent(t){this._goldenLayoutBoundingClientRect=this.container.getBoundingClientRect(),super.fireBeforeVirtualRectingEvent(t)}handleContainerVirtualRectingRequiredEvent(t,e,i){const n=this._virtuableComponentMap.get(t);if(void 0===n)throw new lt("GLHCSCE55933");{const o=n.rootHtmlElement;if(void 0===o)throw new nt(ht[4]+" "+t.title);{const n=t.element.getBoundingClientRect(),s=n.left-this._goldenLayoutBoundingClientRect.left;o.style.left=Bt(s);const r=n.top-this._goldenLayoutBoundingClientRect.top;o.style.top=Bt(r),Wt(o,e),Ht(o,i)}}}handleContainerVirtualVisibilityChangeRequiredEvent(t,e){const i=this._virtuableComponentMap.get(t);if(void 0===i)throw new lt("GLHCVVCRE55934");{const n=i.rootHtmlElement;if(void 0===n)throw new nt(ht[4]+" "+t.title);Nt(n,e)}}handleContainerVirtualZIndexChangeRequiredEvent(t,e,i){const n=this._virtuableComponentMap.get(t);if(void 0===n)throw new lt("GLHCVZICRE55935");{const e=n.rootHtmlElement;if(void 0===e)throw new nt(ht[4]+" "+t.title);e.style.zIndex=i}}}const ye="initial_",Ce={show:"top",popout:!1,close:"close-tab-unused"},we={headerHeight:31},be={hasHeaders:!0,reorderEnabled:!0,showMaximiseIcon:!1},Ie={popoutWholeStack:!1,constrainDragToContainer:!1,constrainDragToHeaders:!1,preventDragout:!1,showPopoutIcon:!1,showCloseIcon:!1,blockedPopoutsThrowError:!0,closePopoutsOnUnload:!0,selectionEnabled:!1};var Se,Ee,xe,Le;class ze{constructor(e){Se.set(this,void 0),Ee.set(this,void 0),xe.set(this,void 0),Le.set(this,void 0),this.handleResize=t=>{t.forEach((t=>this.resizeElement(t.target)))},this.handleMutation=()=>{t.__classPrivateFieldGet(this,Le,"f").viewComponentsByContainerElement.forEach((t=>{this.resizeElement(t.container.element)}))},this.handleIntersection=t=>{t.forEach((t=>{t.isIntersecting&&this.handleMutation()}))},t.__classPrivateFieldSet(this,Le,e,"f"),t.__classPrivateFieldSet(this,Se,new ResizeObserver(this.handleResize),"f"),t.__classPrivateFieldSet(this,Ee,new MutationObserver(this.handleMutation),"f"),t.__classPrivateFieldSet(this,xe,new IntersectionObserver(this.handleIntersection,{root:null,rootMargin:"0px",threshold:Array.from({length:1001},((t,e)=>e/1e3))}),"f")}observeMutations(e){t.__classPrivateFieldGet(this,Ee,"f")?.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]})}destroy(){t.__classPrivateFieldGet(this,Se,"f").disconnect(),t.__classPrivateFieldGet(this,Ee,"f").disconnect(),t.__classPrivateFieldGet(this,xe,"f").disconnect()}observeContainer(e){t.__classPrivateFieldGet(this,Se,"f").observe(e)}unobserveContainer(e){t.__classPrivateFieldGet(this,Se,"f").unobserve(e)}observeIntersection(e){t.__classPrivateFieldGet(this,xe,"f").observe(e)}unobserveIntersection(e){t.__classPrivateFieldGet(this,xe,"f").unobserve(e)}resizeElement(e){const i=t.__classPrivateFieldGet(this,Le,"f").viewComponentsByContainerElement.get(e);i&&i.resize()}}Se=new WeakMap,Ee=new WeakMap,xe=new WeakMap,Le=new WeakMap;var Me={};Object.defineProperty(Me,"__esModule",{value:!0});var Pe=Me.BaseItem=void 0;class Te{constructor(t,e,i){this._item=t,this._layout=e,this._wrap=i}get raw(){return this._item}get layout(){return this._layout}get type(){return this._item.type}get contentItems(){return(this._item.contentItems??[]).map((t=>this._wrap(t)))}get parent(){const t=this._item.parent;return t?this._wrap(t):null}setActiveContentItem(t,e){if("stack"!==this.type)throw new Error(`Cannot call setActiveContentItem from a non-stack item: ${this.type}`);this._item.setActiveContentItem(t.raw,e)}static wrapInternal(t,e,i){const n=Te.wrapCache.get(e);if(n)return n;const o=new t(e,i,(e=>Te.wrapInternal(t,e,i)));return Te.wrapCache.set(e,o),o}}Pe=Me.BaseItem=Te,Te.wrapCache=new WeakMap;const Ae=t=>!!t&&"contentItems"in t&&(t.isRow||t.isColumn);class ke extends Pe{isRoot(){return!!this._item.parent?.isGround}getBounds(){return this._item.element.getBoundingClientRect()}get viewName(){if(this._item.isComponent){const{component:t}=this._item;return t.identity.name}throw new Error("View name not found")}onDestroyed(t){const e=({target:i})=>{i===this._item&&(t(),this._item.off("itemDestroyed",e))};this._item.on("itemDestroyed",e)}createAdjacentStack({position:t="right"}={}){const e=this.raw;if(e.parent){const i=["top","bottom"].includes(t)?"column":"row",n=["left","top"].includes(t)?1:0,o=Ae(e.parent)?e.parent:e.layoutManager,s=o,r=e.parent.contentItems.indexOf(e);e.parent.isGround&&e.parent.removeChild(e,!0);const a=o.newItem({type:i,content:[{type:"stack",content:[]}]},r);if(!a)throw new Error("createAdjacentStack: Failed to create new container");const l=a.contentItems[0];return a.addChild(this.raw,n),Ae(s)&&s.removeChild(e,!0),this._wrap(l)}throw new Error("Cannot create adjacent stack if no parent exists.")}setActiveContentItem(t,e=!0){if(!de.isStack(this._item))throw new Error(`Cannot call setActiveContentItem from a non-stack item: ${this.type}`);this._item.setActiveComponentItem(t.raw,!e)}static wrap(t,e){return Pe.wrapInternal(ke,t,e)}}const De=t.makeKeyChecker()(["newTabButtonUrl","preventSplitterResize","constrainDragToHeaders","preventDragIn","preventDragOut","disableTabOverflowDropdown"]);function Re(t=[],e){for(const i of t)"component"===i.type?Object.keys(e).forEach((t=>{t in i&&(i.componentState={[`${ye}${t}`]:i[t],...i.componentState}),i[t]=e[t]})):Re(i.content,e)}function Oe(t=[],e,i){for(const n of t)if("component"===n.type)Object.keys(e).forEach((t=>{if(`${ye}${t}`in n.componentState)return n[t]=n.componentState[`${ye}${t}`],void delete n.componentState[`${ye}${t}`];n[t]=e[t]}));else{if(n.size&&("row"===i||"column"===i)){n["row"===i?"width":"height"]=n.size?.includes(".")?parseFloat(n.size):parseInt(n.size)}Oe(n.content,e,n.type)}}function Be(t,e){if(t.root){t.root.content&&Oe([t.root],{componentName:"view",isClosable:!0});const e=t.root;t.content=[e],delete t.root}return e.settings&&De.forEach((i=>{i in e.settings&&!(i in t.settings)&&(t.settings[i]=e.settings[i])})),t}function Ue(t){return t&&"string"==typeof t?function(t){let e=t,i="",n=0;for(;e!==i&&n<10;)i=e,e=s.decode(e),n++;return n>=10?"Unknown Title":e}(t):t}const Ve=t=>{for(const e of t){if("component"===e.type&&"componentState"in e){const{componentState:t,...i}=e;"object"==typeof e.componentState&&(e.componentState={...e.componentState,...i})}if("stack"===e.type&&e.content&&"activeItemIndex"in e){const t=e.content.length-1;e.activeItemIndex>t&&(e.activeItemIndex=t>=0?t:0)}"content"in e&&Ve(e.content)}},We=e=>class extends e{constructor(){super(...arguments),this.#t=null}#t;#e(){const e=this.iframe;e&&e.contentDocument?.head&&e.contentWindow&&window.top&&t.isSameOrigin(e.contentWindow.window,window.top)&&(this.#t=t.getTitleObserver(e.contentDocument.head,(t=>this.dispatchEvent(new CustomEvent("page-title-updated",{detail:{title:t}})))),this.dispatchEvent(new CustomEvent("page-title-updated",{detail:{title:e.contentDocument.title}})))}#i(){this.#t&&(this.#t.disconnect(),this.#t=null)}get lastKnownUrl(){return this.iframe?.contentDocument?.location.href}connectedCallback(){if(!this.name||!this.uuid)throw new Error("<of-view> Name or uuid attribute missing");if(!this.src)throw new Error("<of-view> missing 'src' attribute.");if(!this.iframe){const e=document.createElement("iframe");e.addEventListener("load",(()=>{this.#e()})),e.addEventListener("unload",(()=>{this.#i()})),e.src=this.src,this.allow&&(e.allow=this.allow),e.style.height="100%",e.style.width="100%",e.style.border="none",this.forceFrameName?e.setAttribute("name",this.forceFrameName):e.setAttribute("name",t.encodeOptions({brokerUrl:this.brokerUrl,name:this.name,uuid:this.uuid,providerId:this.providerId,contextGroup:this.contextGroup},"of-frame")),e.setAttribute("id",this.name),this.appendChild(e)}}get iframe(){return this.querySelector(`iframe[id="${this.name}"]`)}get title(){return this.getAttribute("title")??this.iframe?.title??""}set title(t){this.setAttribute("title",t),this.iframe&&(this.iframe.title=t)}get brokerUrl(){return this.getAttribute("of-broker")}set brokerUrl(t){t&&this.setAttribute("of-broker",t)}get name(){return this.getAttribute("of-name")}set name(t){t&&this.setAttribute("of-name",t)}get forceFrameName(){return this.getAttribute("forceFrameName")}set forceFrameName(t){t&&this.setAttribute("forceFrameName",t)}get uuid(){return this.getAttribute("of-uuid")}set uuid(t){t&&this.setAttribute("of-uuid",t)}get src(){return this.getAttribute("src")}set src(t){t&&this.setAttribute("src",t)}get providerId(){return this.getAttribute("of-provider-id")}set providerId(t){t&&this.setAttribute("of-provider-id",t)}get contextGroup(){return this.getAttribute("of-context-group")}set contextGroup(t){t&&this.setAttribute("of-context-group",t)}get allow(){return this.getAttribute("allow")}set allow(t){t&&this.setAttribute("allow",t)}static get observedAttributes(){return["name"]}};class He{static create(t){const e=document.createElement("of-view");return Object.entries(t).forEach((([t,i])=>{e.setAttribute(t,i)})),e}}customElements.define("of-view",We(HTMLElement));const Fe=t.clientLogger.getLogger("view-component");class Ne{constructor(t,e,i,{brokerUrl:o,interopConfig:s},r){this.container=t,this.componentState=e,this.ofView=null,this.isMinimised=!1,this.isActive=()=>this.container.tab.element.className.includes("lm_active")??!1,this.isDragging=()=>this.container.tab.element?.className.includes("lm_dragging")??!1;const{url:a,web:l,interop:h,name:d}=e,c=d??`internal-generated-view-${n.v4()}`;if(this.identity={uuid:i,name:c},this.container.element.setAttribute("of-name",c),this.container.element.id=`container-${c}`,this.container.parent.id=c,this.state={...e},void 0===a)return void this.handleUrlMissing();this.state.url=a,"view"!==this.container.parent.title&&(this.state.title=this.container.parent.title);const u={"of-broker":o,"of-uuid":i,"of-name":c,src:a};l?.frameName&&(u.forceFrameName=l.frameName);const m=h?.currentContextGroup??s?.currentContextGroup;m&&(u["of-context-group"]=m),s?.providerId&&(u["of-provider-id"]=s?.providerId),e?.permissions?.webAPIs&&(u.allow=this.applyWebAPIs(e.permissions.webAPIs),Fe.debug(`Applying webAPIs: ${u.allow}`)),this.ofView=He.create(u),this.setTitle(this.state.title),this.ofView.addEventListener("page-title-updated",(({detail:t})=>{const e="options"===this.state.titlePriority?this.state.title:t.title;this.setTitle(e)})),r.appendChild(this.ofView),this.ofView.style.position="absolute"}applyWebAPIs(t){return t.reduce(((t,e)=>{const i=(t=>{switch(t){case"clipboard-read":return"clipboard-read";case"clipboard-sanitized-write":return"clipboard-write";default:return""}})(e);return i?`${t} ${i} *;`.trim():t}),"")}handleUrlMissing(){const t=document.createElement("div");t.setAttribute("style","padding: 20px");t.innerText="No URL provided",this.container.element.appendChild(t)}destroy(){this.ofView?.remove(),this.ofView=null}closeView(){this.container.close()}setTitle(t){const e=Ue("options"===this.state.titlePriority?this.state.title||this.identity.name:t||this.state.title||this.ofView?.lastKnownUrl||this.state.url);e&&(Fe.debug(`${this.identity.name} setting title to ${e}`),this.container.parent.setTitle(e),this.ofView&&(this.ofView.title=e))}setIsMinimised(t){this.isMinimised=t}toggleZIndex(t){this.ofView&&(this.ofView.style.zIndex=t?"99":"")}resize(){if(this.ofView){if(this.isDragging()||this.isMinimised)return void(this.ofView.style.display="none");const t=this.container.element.getBoundingClientRect();this.ofView.style.position="absolute",this.ofView.style.height=`${t.height}px`,this.ofView.style.width=`${t.width}px`,this.ofView.style.inset=`${t.top}px ${t.right}px ${t.bottom}px ${t.left}px`,this.ofView.style.display="block"}}}var je,Ge;const $e="newTabButton";class qe extends X{createTabButton(t){const e=document.createElement("div");return e.title="New Tab",e.className=$e,e.classList.add("addTabButton"),e.setAttribute("data-testid","add-new-tab"),e.addEventListener("click",(()=>{const e=this.layoutContentCache.getOrCreateEntityId(ke.wrap(t,this)),i=t.contentItems.length;this.platformCreateView({url:this.config.settings?.newTabButtonUrl},{location:{id:e,index:i}})})),e}ensurePlusButtonLast(t,e){let i=t.querySelector(`.${$e}`);i||(i=this.getNewTabButton(t,e)),i!==t.lastElementChild&&t.appendChild(i)}static overrideConfig(t){const e={...be,...t.settings,...Ie};return t.content&&Ve(t.content),e.reorderEnabled?Re(t.content,{isClosable:!0}):Re(t.content,{reorderEnabled:!1}),"scroll"===e?.tabOverflowBehavior&&(e.disableTabOverflowDropdown=!0),{dimensions:we,...t,settings:e,header:{...Ce,show:!1!==t.settings?.hasHeaders&&Ce.show}}}constructor(t,i,n,{options:o},s,r){super(),this.identity=t,this.container=i,this.initialConfig=n,this.layoutManager=s,this.platformProvider=r,je.add(this),this.viewComponentsByContainerElement=new Map,this.events=new e,this.layoutContentCache=T.getSingleInstance(),this.reparentingViews=new Set,this.goldenLayoutDestroyed=!1,this.tabsObservers=new WeakMap,this.getNewTabButton=(t,e)=>{let i=t.querySelector(`.${$e}`);return i||(i=this.createTabButton(e)),i},this.ensureNewTabButton=t=>{if(!this.config?.settings?.newTabButtonUrl||!this.config?.settings.hasHeaders)return;const e=t.header?.element.querySelector(".lm_tabs");if(e)if("scroll"!==this.config.settings?.tabOverflowBehavior){if(this.ensurePlusButtonLast(e,t),!this.tabsObservers.has(e)){const i=new MutationObserver((()=>this.ensurePlusButtonLast(e,t)));i.observe(e,{childList:!0}),this.tabsObservers.set(e,i),t.on("destroy",(()=>{i.disconnect(),this.tabsObservers.delete(e)}))}}else{let i=t.header?.element.querySelector(`.${$e}`);if(i)return;const n=this.createTabButton(t);e.parentElement?.insertAdjacentElement("afterend",n)}},this.addNewTabButtons=()=>{const t=e=>{e&&(de.isStack(e)&&this.ensureNewTabButton(e),e.contentItems&&e.contentItems.forEach(t))};t(this.layout.rootItem)},this.createViewComponent=(t,e)=>{I.handleSharedView(this.layoutManager,this.identity,e);const i=new Ne(t,e,this.identity.uuid,this.options,this.iframeContainer);return this.viewComponentsByContainerElement.set(t.element,i),this.resizeController.observeContainer(t.element),i},this.iframeContainer=document.createElement("div"),this.iframeContainer.id=`openfin-layout-iframe-container-${this.identity.layoutName}`,this.domEmitter=new J(i),this.layout=new _e(this.container),this.layout.resizeWithContainerAutomatically=!0,this.options=o,this.layout.registerComponent("view",this.createViewComponent),this.setupListeners(),r.registerEmitter(t.layoutName,this.events),this.resizeController=new ze(this);const a=qe.overrideConfig(n);this.layout.loadLayout(a),this.config=a,this.shadowContainer=document.createElement("div"),this.shadowContainer.id=`openfin-layout-shadow-container-${this.identity.layoutName}`,this.shadowContainer.attachShadow({mode:"open",delegatesFocus:!1}).appendChild(this.iframeContainer),this.container.appendChild(this.shadowContainer),this.resizeController.observeMutations(this.container),this.resizeController.observeIntersection(this.container),this.setupStyles(),this.addNewTabButtons()}getStackByView({name:t}){const e=this.layout.findFirstComponentItemById(t);if(e?.parent&&e?.parent?.isStack)return ke.wrap(e.parent,this)}getRoot(){return ke.wrap(this.layout.rootItem,this)}async platformCloseView(e){const i=t.__classPrivateFieldGet(this,je,"m",Ge).call(this,e.name);if(!i)throw new Error(`View with name: ${e.name} not found in layout.`);i.closeView()}async platformCreateView(t,{location:e,targetView:i}={}){if(i)throw new Error("TargetView not supported in web");const n={options:this.platformProvider.normalizeOptions(t),target:this.identity,location:e};return this.insertView(n)}setupStyles(){this.container.setAttribute("data-openfin-layout-name",this.identity.layoutName);const t=this.container.querySelector(".lm_goldenlayout");t?(t.setAttribute("data-layout-name",this.identity.layoutName),this.config.settings?.hasHeaders?t.setAttribute("data-settings-has-headers","true"):t.removeAttribute("data-settings-has-headers"),this.initialConfig.settings?.preventSplitterResize?t.setAttribute("data-settings-prevent-splitter-resize","true"):t.removeAttribute("data-settings-prevent-splitter-resize"),"scroll"===this.initialConfig.settings?.tabOverflowBehavior?t.setAttribute("data-settings-tab-overflow","scroll"):t.removeAttribute("data-settings-tab-overflow")):console.warn("Layout div not found cannot apply settings")}async insertView({options:t,location:e,targetView:i}){const n=e?this.layoutContentCache.getItemOrUndefined(e.id):void 0,o=i?this.layoutContentCache.getItemOrUndefined(i.name):void 0,s=n??o??ke.wrap(this.layout.rootItem,this);let r;if(de.isStack(s.raw))r=s.raw;else{if(!Ae(s.raw))throw new Error("Cannot add a view at the requested location");r=s.raw.newItem({type:"stack",content:[]})}const a=Math.min(r.contentItems.length,e?.index??r.contentItems.length);let l=this.layout.findFirstComponentItemById(t.name),h=r.getActiveComponentItem(),d=h?.focused;l?(l.parent&&l.parent.removeChild(l,!0),r.addChild(l,a)):l=r.newComponent("view",t,t.title??t.url??"Default Title",a);"background"===(e?.displayState??"focused")&&h&&r.setActiveComponentItem(h,!!d),this.ensureNewTabButton(r);const c=l.component.identity;return Promise.resolve({identity:c})}async replaceView({viewToReplace:t,newView:e}){const i=this.getStackByView(t);if(!i)throw new Error(`View with name: ${t.name} not found in layout.`);const n=i.contentItems.findIndex((e=>e.viewName===t.name));if(-1===n)throw new Error(`View with name: ${t.name} not found in layout.`);if(t.name!==e.name){const o=this.layoutContentCache.getOrCreateEntityId(i),{identity:s}=await this.platformCreateView(e,{location:{id:o,index:n}});return await this.platformCloseView(t),{identity:s}}throw new Error("Cannot replace a view with itself")}replaceLayout(t){throw new Error("Method not implemented.")}async cleanupView(t){}applyPreset(t){throw new Error("Method not implemented.")}getCurrentViews(){return[...this.viewComponentsByContainerElement.values()].map((t=>t.identity))}async getFrameSnapshot(){if(this.goldenLayoutDestroyed)throw new u(this.identity.layoutName);return Be(Rt.fromResolved(this.layout.toConfig()),this.config)}isVisible(){return m(this.container)}async onViewDetached({viewIdentity:t}){this.reparentingViews.add(t.name),this.platformCloseView(t)}async destroy(){this.platformProvider.unregisterEmitter(this.identity.layoutName),this.goldenLayoutDestroyed||(this.goldenLayoutDestroyed=!0,this.layout.destroy()),this.iframeContainer.remove(),this.resizeController.destroy(),this.viewComponentsByContainerElement.clear()}setupListeners(){this.container.addEventListener("pointerdown",(t=>{if(t.target instanceof HTMLElement){const e=t.target.classList;["lm_tab","lm_title","lm_splitter","lm_drag_handle"].some((t=>e.contains(t)))&&(this.handleDragStart(),2===t.button&&t.stopPropagation())}}),!0),document.addEventListener("pointerup",(()=>this.handleDragEnd()),!0),this.layout.on("tabCreated",(t=>{const e=t.componentItem.component;!1===e.componentState[`${ye}isClosable`]&&t.element.setAttribute("data-is-closable","false"),t.element.setAttribute("data-view-name",e.identity.name),t.element.id=`tab-${e.identity.name}`,this.domEmitter.dispatchLocalEvent("tab-created",e.identity)})),this.layout.on("itemCreated",(({target:t})=>{const e=t;if(Qt.isComponentItem(e)){const t=e.component;this.domEmitter.dispatchLocalEvent("container-created",t.identity)}de.isStack(e)&&(e.toggleMaximise=()=>this.toggleMaximise(e),this.ensureNewTabButton(e))})),this.layout.on("itemDestroyed",(t=>{const e=t.target;if(Qt.isComponentItem(e)){const t=e.component;this.removeViewComponent(t)}})),this.layout.on("itemDropped",(()=>{this.handleDragEnd()})),this.events.on("page-title-updated",(({data:{identity:e,title:i}})=>{this.identity.uuid===e.uuid&&t.__classPrivateFieldGet(this,je,"m",Ge).call(this,e.name)?.setTitle(i)}))}handleDragStart(){this.iframeContainer.style.pointerEvents="none"}handleDragEnd(){this.iframeContainer.style.pointerEvents=""}toggleMaximise(t){const e=(t,e)=>{const i=this.layout.findFirstComponentItemById(t.identity.name);return i&&i.parent&&i.parent.isStack&&i.parent.element===e},i=[...this.viewComponentsByContainerElement.values()].filter((i=>!e(i,t.element))),n=[...this.viewComponentsByContainerElement.values()].find((i=>i.isActive()&&e(i,t.element))),o=(t,e)=>{t&&t.toggleZIndex(e)},s=t=>{i.forEach((e=>{e&&e.setIsMinimised(t)}))};t.isMaximised?(t.minimise(),o(n,!1),s(!1)):(s(!0),t.maximise(),o(n,!0))}removeViewComponent(t){t.destroy(),this.viewComponentsByContainerElement.delete(t.container.element),this.resizeController.unobserveContainer(t.container.element),this.reparentingViews.has(t.identity.name)?this.reparentingViews.delete(t.identity.name):this.platformProvider.closeView(t.identity.name);0===this.getCurrentViews().length&&(this.goldenLayoutDestroyed||(this.goldenLayoutDestroyed=!0,I.handleLastViewRemoved(this.layoutManager,this.identity)))}}je=new WeakSet,Ge=function(t){return[...this.viewComponentsByContainerElement.values()].find((e=>e.identity.name===t))};class Ze{constructor(e,i,n,o){this.wire=e,this.connectConfig=i,this.provider=n,this.fallbackContainer=o,t.Logger.setGlobalLogLevel(i.logLevel)}async createLayout(t,e){if(!("container"in t)&&!this.fallbackContainer)throw new Error("Container property is not optional in web");const{layoutName:i}=t,n=t,o=this.provider.initLayoutViews(n),s=n.container??this.fallbackContainer,r={...this.wire.me,layoutName:i},a=new qe(r,s,o,this.connectConfig,e,this.provider);I.registerLayout(e,i,a),this.fallbackContainer=null}async getLayoutSnapshot(t){return t.getLayoutSnapshot()}async handleLastViewRemoved(t){}getWire(){return this.wire}}class Xe{static async init(e){const i=e.getFin().InterApplicationBus.Channel,n=await i.create(`custom-frame-${e.me.uuid}`);n.setDefaultAction((async(t,{target:e,opts:i},o)=>{const s=n.connections.find((t=>t.name===e.name));if(s)return n.dispatch(s,t,{...i,target:e});throw new Error(`Client with name ${e.name} not found`)})),await t.relayChannelClientApi_1(n,"layout-relay");const o=await i.create(t.getDataChannelName(e));return new Xe(e,o)}constructor(t,e){this.wire=t,this.dataChannelProvider=e,this.emitters=new Map,this.viewNames=new Set,e.register("page-title-updated",(t=>{[...this.emitters.values()].forEach((e=>{e.emit("page-title-updated",t)}))}))}registerEmitter(t,e){this.emitters.set(t,e)}unregisterEmitter(t){this.emitters.delete(t)}normalizeOptions(t,e="default"){const i=this.wire.me.uuid;let{name:o=`internal-generated-view-${n.v4()}`}=t;return o.match(/^internal-generated-view-/)&&this.viewNames.has(o)&&"duplicate"===e&&(o=`internal-generated-view-${n.v4()}`),this.viewNames.add(o),{...t,name:o,uuid:i}}closeView(t){this.viewNames.delete(t)}initLayoutViews({layout:t,multiInstanceViewBehavior:e}){return g((t=>{if("component"===t.type&&t.componentState){const i=this.normalizeOptions(t.componentState,e);return{...t,componentState:i}}return t}),t)}}var Ye;const Ke=t=>t;Ye=new WeakMap,exports.WebLayoutEntryPoint=class{constructor(e){Ye.set(this,void 0),this.initLayoutManager=async(e,i,{container:n,layoutManagerOverride:o})=>{const s=await Xe.init(i),r=o??Ke,a=new Ze(i,t.__classPrivateFieldGet(this,Ye,"f"),s,n),l=new(r(I.createClosedConstructor(a)));return await F(i,l),l},this.applyLayoutSnapshot=async(e,i,n)=>{await i.applyLayoutSnapshot(t.__classPrivateFieldGet(this,Ye,"f").platform.layoutSnapshot)},this.createLayout=async(t,e)=>I.createLayout(t,e),this.destroyLayout=async(t,e)=>I.destroyLayout(t,e),t.__classPrivateFieldSet(this,Ye,e,"f")}};


/***/ })

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
/*!************************************************!*\
  !*** ./client/src/content/fdc3-intent-view.ts ***!
  \************************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const api_1 = __webpack_require__(/*! ./api */ "./client/src/content/api.ts");
window.addEventListener("DOMContentLoaded", async () => {
    await (0, api_1.init)(true);
    await initializeDOM();
});
/**
 * Raise an intent using the fdc3 API.
 */
async function raiseIntent() {
    if (window.fin !== undefined) {
        const context = {
            type: "fdc3.contact",
            name: "Andy Young",
            id: {
                email: "andy.young@example.com"
            }
        };
        const intent = "ViewContact";
        const intentResolver = await window.fdc3.raiseIntent(intent, context);
        if (intentResolver !== undefined) {
            console.log("Intent resolver received:", intentResolver);
        }
    }
}
/**
 * Adds an fdc3 intent listener to the window.
 */
async function addIntentListener() {
    const intent = "ViewContact";
    if (window.fdc3) {
        await window.fdc3.addIntentListener(intent, (ctx, metadata) => {
            console.log(`Received Context For Intent: ${intent}`, ctx);
            console.log(`Received Metadata With Intent: ${intent}`, metadata);
            updateDOMElements(ctx);
        });
    }
    else {
        window.addEventListener("fdc3Ready", async () => {
            if (window.fdc3) {
                await window.fdc3.addIntentListener(intent, (ctx, metadata) => {
                    console.log(`Received Context For Intent: ${intent}`, ctx);
                    console.log(`Received Metadata With Intent: ${intent}`, metadata);
                    updateDOMElements(ctx);
                });
            }
        });
    }
}
/**
 * Updates the DOM elements with the provided context.
 * @param context The context to update the DOM elements with.
 */
function updateDOMElements(context) {
    const contextTypeSpan = document.querySelector("#contextType");
    const contextNameSpan = document.querySelector("#contextName");
    const contextBodyPre = document.querySelector("#contextBody");
    if (contextTypeSpan !== null && contextNameSpan !== null && contextBodyPre !== null) {
        contextTypeSpan.textContent = context.type;
        contextNameSpan.textContent = context.name ?? "No name provided.";
        contextBodyPre.textContent = JSON.stringify(context, null, 2);
    }
}
/**
 * Initialize the DOM elements.
 */
async function initializeDOM() {
    const raiseIntentButton = document.querySelector("#raiseIntent");
    if (raiseIntentButton !== null) {
        raiseIntentButton.addEventListener("click", async () => {
            await raiseIntent();
        });
    }
    await addIntentListener();
}

})();

/******/ })()
;
//# sourceMappingURL=fdc3-intent-view.bundle.js.map