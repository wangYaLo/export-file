/**
 * @author YaLo
 * @version 1.0.0
*/

/**
 * @function binary_to_blob 二进制字符串转换为Blob对象
 * @param { string } binaryString 传入一个二进制字符串
 * @param { string } mimetype 传入一个mimetype(文件类型) 例： "image/jpeg"
 * @returns { Bolb } 返回一个Blob实例
*/
function binary_to_blob(binaryString, mimetype = null) {
    if (arguments.length < 2) throw new Error('参数缺失');
    if (getFormat(binaryString) !== 'string') throw new Error('传入对象格式错误')
    let length = binaryString.length;
    let u8arr = new Uint8Array(length);
    while (length--) u8arr[n] = binaryString.charCodeAt(length);
    if (mime === null || undefined) throw new Error('没有传入mimeType')
    return new Blob([u8arr], {
        type: mimetype
    })
}

/**
 * @function arraybuffer_to_blob ArrayBuffer转为Blob实例对象
 * @param { ArrayBuffer } buffer 传入一个ArrayBuffer类型
 * @param { string } mimetype 传入一个mimetype(文件类型) 例： "image/jpeg"
 * @returns { Bolb } 返回一个Blob实例
*/
function arraybuffer_to_blob(buffer, mimetype = null) {
    let u8arr = new Uint8Array(buffer);
    return new Blob([u8arr], {
        type: mimetype
    })
}

/**
 * @function uint8array_to_blob Uint8Array转为Blob实例对象
 * @param { Uint8Array } u8arr 传入一个Uint8Array类型
 * @param { string } mimetype 传入一个mimetype(文件类型) 例： "image/jpeg"
 * @returns { Bolb } 返回一个Blob实例
*/
function uint8array_to_blob(u8arr, mimetype = null) {
    return new Blob([u8arr], {
        type: mimetype
    })
}

/**
 * @function base64_to_blob base64转为Blob实例对象
 * @param { string } base64str 传入一个base64格式的字符串数据
 * @param { string } mimetype 传入一个mimetype(文件类型) 例： "image/jpeg"
 * @returns { Bolb } 返回一个Blob实例
*/
function base64_to_blob(base64str, mimetype = null) {
    if (base64str.split(',').length === 2) {
        base64str = base64str.split(',')[1];
    }
    let binaryString = window.atob(base64str);
    return binary_to_blob(binaryString, mimetype);
}

/**
 * @function binary_to_arraybuffer binary字符串转为Blob实例对象
 * @param { string } binaryString 传入一个二年禁止字符串格式的字符串数据
 * @returns { arraybuffer } 返回一个Blob实例
*/
function binary_to_arraybuffer(binaryString) {
    let length = binaryString.length;
    let u8arr = new Uint8Array(length);
    while (length--) u8arr[length] = binaryString.charCodeAt(length);
    return u8arr.buffer;
}


/**
 * @function binary_to_base64 base64转为Blob实例对象
 * @param { string } binaryString 传入二进制字符串
 * @returns { string } 返回一个字符串
*/
function binary_to_base64(binaryString, mimetype = null) {
    let dataStr = '';
    if (mimetype) {
        dataStr = `data:${ mimetype };base64,`;
    }
    return dataStr + window.btoa(binaryString)
}

/**
 * @function binary_to_uint8array 将binary格式转换为uint8array格式
 * @param { string } binarystr 传入一个binary格式字符串 
 * @returns { Uint8Array } 返回一个uint8array
*/
function binary_to_uint8array(binaryString) {
    let length = binaryString.length;
    let u8arr = new Uint8Array(length);
    while (length--) u8arr[length] = binaryString.charCodeAt(length);
    return u8arr;
}

/**
 * @function uint8array_to_binary 将uint8array转为binary
 * @param { Uint8Array } u8arr
 * @param { string } mimetype
 * @returns { string } 
*/
function uint8array_to_binary(u8arr) {
    return window.atob(uint8array_to_base64(u8arr))
}

/**
 * @function uint8array_to_arraybuffer 将uint8array转为arraybuffer
 * @param { Uint8Array } u8arr
 * @returns { ArrayBuffer }
*/
function uint8array_to_arraybuffer(u8arr) {
    return u8arr.buffer
}

/**
 * @function base64_to_binary
 * @param { string } base64str
 * @returns { string }
*/
function base64_to_binary(base64str) {
    if (base64str.split(',').length === 2) {
        base64str = base64str.split(',')[1];
    }
    return window.atob(base64str);
}

/**
 * @function base64_to_arraybuffer
 * @param { string } base64str
 * @returns { ArrayBuffer }
*/
function base64_to_arraybuffer(base64str) {
    if (base64str.split(',').length === 2) {
        base64str = base64str.split(',')[1];
    }
    let binarystr = window.atob(base64str);
    let length = binarystr.length;
    let u8arr = new Uint8Array(length);
    while (length--) u8arr[length] = binarystr.charCodeAt(length);
    return u8arr.buffer;
}

/**
 * @function base64_to_uint8array
 * @param { string } base64str
 * @returns { Uint8Array }
*/
function base64_to_uint8array(base64str) {
    if (base64str.split(',').length === 2) {
        base64str = base64str.split(',')[1];
    }
    let binarystr = window.atob(base64str);
    let length = binarystr.length;
    let u8arr = new Uint8Array(length);
    while (length--) u8arr[length] = binarystr.charCodeAt(length);
    return u8arr;
}

/**
 * @function arraybuffer_to_uint8array
 * @param { ArrayBuffer } buffer
 * @returns { Uint8Array }
*/
function arraybuffer_to_uint8array(buffer) {
    let un8arr = new Uint8Array(buffer);
    return un8arr;
}

/**
 * @function arraybuffer_to_binary
 * @param { ArrayBuffer } buffer
 * @returns { string }
*/
function arraybuffer_to_binary(buffer) {
    let un8arr = new Uint8Array(buffer);
    return uint8array_to_binary(un8arr)
}

/**
 * @function arraybuffer_to_base64
 * @param { ArrayBuffer } buffer
 * @returns { string }
*/
function arraybuffer_to_base64(buffer, mimetype = null) {
    let un8arr = new Uint8Array(buffer);
    return uint8array_to_base64(un8arr, mimetype)
}

/**
 * @function uint8ArrayToBase64 ArrayBuffer转为Blob实例对象
 * @param { Uint8Array } uint8Array 传入一个ArrayBuffer类型
 * @param { string } mimetype 传入一个mimetype(文件类型) 例： "image/jpeg"
 * @returns { string } 返回一个字符串
*/
function uint8array_to_base64(uint8Array, mimetype) {
    let length = uint8Array.byteLength;
    let table = ['A','B','C','D','E','F','G','H',
    'I','J','K','L','M','N','O','P',
    'Q','R','S','T','U','V','W','X',
    'Y','Z','a','b','c','d','e','f',
    'g','h','i','j','k','l','m','n',
    'o','p','q','r','s','t','u','v',
    'w','x','y','z','0','1','2','3',
    '4','5','6','7','8','9','+','/'];
    let base64Str = "";
    for (var i = 0; length - i > 3; i += 3) {
        let num1 = uint8Array[i];
        let num2 = uint8Array[i + 1];
        let num3 = uint8Array[i + 2];
        base64Str += table[num1 >>> 2] + table[((num1 & 0b11) << 4) | (num2 >>> 4)]
        + table[((num2 & 0b1111) << 2) | (num3 >>> 6)]
        + table[num3 & 0b111111]
    }
    let lastByte = length - i;
    if (lastByte === 1) {
        var lastNum1 = uint8Array[i];
        base64Str += table[lastNum1 >>> 2] + table[((lastNum1 & 0b11) << 4)] + '=='
    } else if (lastByte === 2) {
        var lastNum1 = uint8Array[i];
        var lastNum2 = uint8Array[i + 1];
        base64Str += table[lastNum1 >>> 2]
        + table[((lastNum1 & 0b11) << 4) | (lastNum2 >>> 4)]
        + table[(lastNum2 & 0b1111) << 2]
        + '=';
    }
    if (mimetype) {
        base64Str += `data:${ mimetype };base64,`
    }
    return base64Str;
}
/**
 * @function blob_to_arraybuffer blob转为arraybuffer
 * @param { Blob } blob
 * @return { Promise<ArrayBuffer> }
*/
function blob_to_arraybuffer(blob) {
    return new Promise((resolve, reject) => {
        blob.arrayBuffer().then((buffer) => {
            resolve(buffer)
        }).catch(error => [
            reject(error)
        ])
    })
}

/**
 * @function blob_to_binary blob转为binary
 * @param { Blob } blob
 * @return { Promise<String> }
*/
function blob_to_binary(blob) {
    return new Promise((resolve, reject) => {
        blob_to_arraybuffer(blob).then(buffer => void resolve(arraybuffer_to_binary(buffer)))
        .catch(error => void reject(error))
    })
}

/**
 * @function blob_to_uint8array blob转为uint8array
 * @param { Blob } blob
 * @return { Promise<Uint8Array> }
*/
function blob_to_uint8array(blob) {
    return new Promise((resolve, reject) => {
        blob_to_arraybuffer(blob).then(buffer => void resolve(arraybuffer_to_uint8array(buffer)))
        .catch(error => void reject(error))
    })
}

/**
 * @function blob_to_base64 blob转为base64
 * @param { Blob } blob
 * @param { string } mimetype
 * @return { Promise<String> }
*/
function blob_to_base64(blob, mimetype = null) {
    return new Promise((resolve, reject) => {
        blob_to_arraybuffer(blob).then(buffer => void resolve(arraybuffer_to_base64(buffer, mimetype)))
        .catch(error => reject(error))
    })
}

/**
 * @function isBase64 判断字符串是否为ASC II
 * @param { string } str 类型为string的字符串
 * @returns { boolean } 返回一个布尔值
*/
function isBase64(str){
    let base64Pattern = "^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$";
    if (str.split(',').length === 2 && str.indexOf('data:')!=-1 && str.indexOf('base64')!=-1) {
        return str.split(',')[1].match(base64Pattern) === null ? false : true;
    } else {
        return str.match(base64Pattern) === null ? false : true;
    }
}

/**
 * @function getFormat 获取对象的数据格式
 * @param { any } target any类型的对象
 * @returns { string } 返回一个数据类型的字符串
*/
function getFormat(target) {
    if (target instanceof Blob) {uint8array
        return 'blob'
    } else if (target instanceof Uint8Array) {
        return 'uint8Array'
    } else if (target instanceof ArrayBuffer) {
        return 'arrayBuffer'
    } else if (typeof target === 'string') {
        if (isBase64(target)) return 'base64';
        return 'binaryString'
    } else {
        throw new Error('error')
    }
}

/**
 * 
*/
// module.exports = {
//     binary_to_blob,
//     arraybuffer_to_blob,
//     uint8array_to_blob,
//     base64_to_blob,
//     binary_to_arraybuffer,
//     binary_to_base64,
//     binary_to_uint8array,
//     uint8array_to_base64,
//     uint8array_to_binary,
//     uint8array_to_arraybuffer,
//     base64_to_arraybuffer,
//     base64_to_binary,
//     base64_to_uint8array,
//     arraybuffer_to_uint8array,
//     arraybuffer_to_binary,
//     arraybuffer_to_base64
// };

export default {
    binary_to_blob,
    arraybuffer_to_blob,
    uint8array_to_blob,
    base64_to_blob,
    binary_to_arraybuffer,
    binary_to_base64,
    binary_to_uint8array,
    uint8array_to_base64,
    uint8array_to_binary,
    uint8array_to_arraybuffer,
    base64_to_arraybuffer,
    base64_to_binary,
    base64_to_uint8array,
    arraybuffer_to_uint8array,
    arraybuffer_to_binary,
    arraybuffer_to_base64,
    blob_to_arraybuffer,
    blob_to_binary,
    blob_to_uint8array,
    blob_to_base64
}