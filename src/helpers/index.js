export const nextTick = function(callback) {
    setTimeout(callback, Math.floor(0));
}

export const objectMerge = function() {
    return Object.assign({}, ...arguments);
}

export const rand = function(begin, end) {
    return begin + Math.round(Math.random() * (end - begin));
}
