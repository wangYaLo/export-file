/**
 * author: YaLo
*/


const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
const MYPROMISESTATE = '[[MypromiseState]]';
const MYPROMISEVALUE = '[[MypromiseReult]]';
let Mypromise = (function () {
    function Mypromise(fn) {
        Object.defineProperty(this, MYPROMISESTATE, {
            value: PENDING,
            enumerable: false,
            writable: true
        })
        Object.defineProperty(this, MYPROMISEVALUE, {
            value: undefined,
            enumerable: false,
            writable: true
        })
        Object.defineProperty(this, 'onFulfilledList', {
            value: [],
            enumerable: false,
            writable: true
        })
        Object.defineProperty(this, 'onRejectedList', {
            value: [],
            enumerable: false,
            writable: true
        })
        if (typeof fn === 'function') {
            fn(Mypromise.resolve.bind(this), Mypromise.reject.bind(this))
        } else {
            throw new Error('这不是一个函数')
        }
    }
    Object.defineProperty(Mypromise.prototype, 'catch', {
        value: function (errfn) {
            if (this[MYPROMISESTATE] === REJECTED) {
                let errValue = errfn(this[MYPROMISEVALUE])
                if (errValue !== undefined) {
                    return new Mypromise((resolve, reject) => {
                        reject(errValue)
                    })
                }
            } else if (this[MYPROMISESTATE] === PENDING) {
                if (typeof errfn === 'function') this.onRejectedList.push(errfn);
                return this
            }
        },   
        enumerable: false,
        writable: true
    })
    Object.defineProperty(Mypromise.prototype, 'then', {
        value: function (fn, errfn) {
            if (this[MYPROMISESTATE] === FULFILLED) {
                let getValue = fn(this[MYPROMISEVALUE])
                if (getValue !== undefined) {
                    if (getValue.then !== undefined) return getValue
                    return new Mypromise((resolve, reject) => {
                        resolve(getValue)
                    })
                } else {
                    return new Mypromise((resolve, reject) => {
                        resolve()
                    })
                }
            } else if (this[MYPROMISESTATE] === REJECTED) {
                if (errfn !== undefined) {
                    errfn(this[MYPROMISEVALUE])
                } else {
                    return new Mypromise((resolve, reject) => {
                        reject(this[MYPROMISEVALUE])
                    })
                }
            } else if (this[MYPROMISESTATE] === PENDING) {
                if (typeof fn === 'function') this.onFulfilledList .push(fn);
                if (typeof errfn === 'function') this.onRejectedList .push(errfn);
                return this
            }
        },   
        enumerable: false,
        writable: true
    })
    Object.defineProperty(Mypromise.prototype, 'finally', {
        value: function (fn) {
            if (this[MYPROMISESTATE] !== PENDING) {
                fn()
            }
        },   
        enumerable: false,
        writable: true
    })
    Object.defineProperty(Mypromise, 'resolve', {
        value: function (value) {
            if (this instanceof Mypromise) {
                if (this[MYPROMISESTATE] === PENDING) {
                    this[MYPROMISESTATE] = FULFILLED;
                    this[MYPROMISEVALUE] = value;
                    if (this.onFulfilledList.length !== 0) this.onFulfilledList.forEach(fn => fn(value))
                    return this
                }
            } else {
                return new Mypromise(resolve => void resolve(value))
            }
            
        },
        enumerable: false,
        writable: true
    })
    Object.defineProperty(Mypromise, 'reject', {
        value: function (value) {
            if (this instanceof Mypromise) {
                if (this[MYPROMISESTATE] === PENDING) {
                    this[MYPROMISESTATE] = REJECTED;
                    this[MYPROMISEVALUE] = value;
                    if (this.onRejectedList.length !== 0) this.onRejectedList.forEach(errfn => errfn(value))
                    return this
                }
            } else {
                return new Mypromise((resolve, reject) => {
                    reject(value)
                })
            }
            
        },
        enumerable: false,
        writable: true
    })
    Object.defineProperty(Mypromise, 'all', {
        value: function (value) {
            if (!Array.isArray(value)) throw new Error('is not a Array')
            let mypromiseData = [];
            let mypromiseArr = Array.from(value);
            let index = 0;
            return new Mypromise((resolve, reject) => {
                for (let i in mypromiseArr) {
                    mypromiseArr[i].then(res => {
                        mypromiseData[i] = res;
                        if (++index === mypromiseArr.length) resolve(mypromiseData)
                    }).catch(err => {
                        reject(err)
                    })
                }
            })
        },
        enumerable: false,
        writable: true
    })
    Object.defineProperty(Mypromise, 'race', {
        value: function (value) {
            if (!Array.isArray(value)) throw new Error('is not a Array')
            let mypromiseData = [];
            let mypromiseArr = Array.from(value);
            let index = 0;
            return new Mypromise((resolve, reject) => {
                for (let i in mypromiseArr) {
                    mypromiseArr[i].then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                }
            })
        },
        enumerable: false,
        writable: true
    })
    Object.defineProperty(Mypromise.prototype, Symbol.toStringTag, {
        value: 'Mypromise',   
        enumerable: false,
        writable: true
    })
    return Mypromise
})()
