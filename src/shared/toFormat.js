
class Untie {
  //参数1  传入的对象或者数组  参数2 是否查看类型  参数三不需要传
  /**
   * @param { {[key]} | any[]}obj
   * @param { boolean }lookType
   * @param { number }index
   */
  constructor(obj, lookType = true, index = null) {
    if (index) {
      this.index = index
    }
    if (this.isOfType(obj) === 'object') {
      this.Value += `{\n`;
      for (const key in obj) {
        if (this.isOfType((obj)[key]) === 'object') {
          new Untie((obj)[key], lookType, this.index + 1).getString((res) => {
            for (let i = 0; i < this.index; i++) {
              this.Value += '  '
            }
            console.log(key);
            this.Value = this.Value + key + ':' + res
          })
        } else if (this.isOfType((obj)[key]) === 'array') {
          console.log(key);
          new Untie((obj)[key], lookType, this.index + 1).getString((res) => {
            for (let i = 0; i < this.index; i++) {
              this.Value += '  '
            }
            this.Value = this.Value + key + ':' + res
          })
        } else if (this.isOfType((obj)[key]) === 'string') {
          for (let i = 0; i < this.index; i++) {
            this.Value += '  '
          }
          if (lookType) {
            console.log(key);
            this.Value = this.Value + `${ key }: string\n`
          } else {
            this.Value = this.Value + `${ key }: ${ (obj)[key] }\n`
          }
        } else if (this.isOfType((obj)[key]) === 'number') {
          for (let i = 0; i < this.index; i++) {
            this.Value += '  '
          }
          if (lookType) {
            this.Value = this.Value + `${ key }: number\n`
          } else {
            this.Value = this.Value + `${ key }: ${ (obj)[key] }\n`
          }
        } else if (this.isOfType((obj)[key]) === 'boolean') {
          for (let i = 0; i < this.index; i++) {
            this.Value += '  '
          }
          if (lookType) {
            this.Value = this.Value + `${ key }: boolean\n`
          } else {
            this.Value = this.Value + `${ key }: ${ (obj)[key] }\n`
          }
        }
      }
      for (let i = 0; i < this.index - 1; i++) {
        this.Value += '  '
      }
      this.Value += '}\n'
      this.status = 'success'
    } else if (this.isOfType(obj) === 'array') {
      this.Value += `[\n`;
      obj.forEach((item) => {
        if (this.isOfType(item) === 'string') {
          for (let i = 0; i < this.index; i++) {
            this.Value += '  '
          }
          this.Value = this.Value + "'" + item + "'" + ',\n'
        } else if (this.isOfType(item) === 'number') {
          for (let i = 0; i < this.index; i++) {
            this.Value += '  '
          }
          this.Value = this.Value + item + ',\n'
        } else if (this.isOfType(item) === 'boolean') {
          for (let i = 0; i < this.index; i++) {
            this.Value += '  '
          }
          if (item) {
            this.Value = this.Value + 'true' + ',\n'
          } else {
            this.Value = this.Value + 'false' + ',\n'
          }
        } else if (this.isOfType(item) === 'object') {
          new Untie(item, lookType, this.index + 1).getString((res) => {
            for (let i = 0; i < this.index; i++) {
              this.Value += '  '
            }
            this.Value = this.Value + res
          })
        } else if (this.isOfType(item) === 'array') {
          new Untie(item, lookType, this.index + 1).getString((res) => {
            for (let i = 0; i < this.index; i++) {
              this.Value += '  '
            }
            this.Value = this.Value + res
          })
        }
      })
      for (let i = 0; i < this.index - 1; i++) {
        this.Value += '  '
      }
      this.Value += ']\n'
      this.status = 'success'
    }
  }
  //obj: { [x] } | any[];
  status = 'pending';
  Value = '';
  index = 1;
  getString(func) {
     if (this.status !== 'pending') {
       func(this.Value)
     }
  }
  isOfType(obj) {
    const type = Object.create(null);//创建没有原型的对象
    //  检查null类型
    type.null = (x) => x === null;
    //  检查undefined类型
    type.undefined = (x) => x === undefined;
    //  检查是否为undefined和null类型
    type.nil = (x) => type.null(x) || type.undefined(x);
    //检查字符串和字符串的文字类型。例如：'s', "s", `str`, new String()
    type.string = (x) => !type.nil(x) && (typeof x === 'string' || x instanceof String);
    // 检查数字或者数字文字类型。例如：12, 30.5, new Number()不包括NaN 和 Infinity
    type.number = (x) => !type.nil(x) &&
    (
      (!isNaN(x) && isFinite(x) &&
      typeof x === 'number'
      ) || x instanceof Number);
    // 布尔类型检查 例如：true, false, new Boolean()
    type.boolean = (x) => !type.nil(x) && (typeof x === 'boolean' || x instanceof Boolean);
    // 检查数组类型
    type.array = (x) => !type.nil(x) && Array.isArray(x);
    // 对象类型检查 例如： {}, new Object(), Object.create(null)
    type.object = (x) => ({}).toString.call(x) === '[object Object]';
    // 检查提供的类型实例，参数一为实例对象，参数二为类型
    type.type = (x, X) => !type.nil(x) && x instanceof X;
    // 检查变量是否为Set类的实例
    type.set = (x) => type.type(x, Set);
    // 检查变量是否为Map类的实例
    type.map = (x) => type.type(x, Map);
    // 检查变量是否为Date类的实例
    type.date = (x) => type.type(x, Date);
    let str = ''
    for (const key in type) {
      if (key !== 'type') {
        if (type[key](obj)) {
          str = key
        }
      }
    }
    return str
  }
}
/**
   * @param { {[key]} | any[]}obj
   * @param { boolean }lookType
   * @param { number }index
   */
let toFormat = function (obj, lookType = false, index = null) {
  return new Untie(obj, lookType, index).Value
}
export default toFormat
