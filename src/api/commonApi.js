//转换成年月日
const transtime =  (millisecond) => {
    if (!millisecond) {
        return
    }
    let year = new Date(millisecond).getFullYear();
    let month = new Date(millisecond).getMonth() + 1;
    let date = new Date(millisecond).getDate()
    return year + '-' + month + '-' + date
}
//将时长转化成分秒
const transMusicTime = (arr, dt) => {
    for (let i = 0; i < arr.length; i++) {
      let min = parseInt(arr[i][dt] / 1000 / 60);
      let sec = parseInt((arr[i][dt] / 1000) % 60);
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      arr[i][dt] = min + ":" + sec;
    }
  }

  //将播放量转换成亿万单位

  const transPlayCount = (arr,playCount) =>{
    for (let i = 0; i < arr.length; i++) {
        if (
          String(arr[i][playCount]).length > 5 &&
          String(arr[i][playCount]).length < 9
        ) {
          arr[i][playCount] =
            String(arr[i][playCount]).substr(
              0,
              String(arr[i][playCount]).length - 4
            ) + "万";
        } else if (String(arr[i][playCount]).length == 5) {
          arr[i][playCount] =
            String(arr[i][playCount]).substr(0, 1) +
            "." +
            String(arr[i][playCount]).substr(1, 2) +
            "万";
        } else if (String(arr[i][playCount]).length == 9) {
          arr[i][playCount] =
            String(arr[i][playCount]).substr(0, 1) +
            "." +
            String(arr[i][playCount]).substr(1, 2) +
            "亿";
        } else if (String(arr[i][playCount]).length > 9) {
          arr[i][playCount] =
            String(arr[i][playCount]).substr(
              0,
              String(arr[i][playCount]).length - 8
            ) + "亿";
        }
      }
  }








module.exports = {
    transtime,
    transMusicTime,
    transPlayCount,
}