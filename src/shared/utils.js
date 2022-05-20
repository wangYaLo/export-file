exports.getType = function (input) {
    if (typeof input === 'string') return 'string';
    if (Object.prototype.toString.call(input) === "[object Array]") return 'array';
}
exports.logBox = function (value) {
    console.log("%c" + value, "color: blue; font-style: italic;padding: 2px;")
}