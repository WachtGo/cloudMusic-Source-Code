export const transtime = function (millisecond) {
    if (!millisecond) {
        return
    }
    let year = new Date(millisecond).getFullYear();
    let month = new Date(millisecond).getMonth() + 1;
    let date = new Date(millisecond).getDate()
    return year + '-' + month + '-' + date
}
