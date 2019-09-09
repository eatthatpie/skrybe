export const rand = function(begin, end) {
    return begin + Math.round(Math.random() * (end - begin));
}