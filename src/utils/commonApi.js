//随机颜色
const randomColor = () => {
  return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
}

const randomNum = (min, max) => {
  if (min > max) {
    [min, max] = [max, min]; // 交换 min 和 max 值，确保 min <= max
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//转换成年月日
const transtime = (millisecond) => {
  if (!millisecond) {
    return
  }
  let year = new Date(millisecond).getFullYear();
  let month = new Date(millisecond).getMonth() + 1;
  let date = new Date(millisecond).getDate()
  return year + '-' + month + '-' + date
}
//将歌曲列表歌曲时长转化成分秒
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

const transPlayCount = (arr, playCount) => {
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

//歌曲下载
const download = (src, filename) => {

  //将http改成https，因为前端部署后，https请求http下载时会出现报错和无法下载，但本地前端请求时却可以下载的问题。
  let httpssrc = src.replace(/^http:\/\//i, "https://");
  //  先下载完成后再弹出浏览器窗口2
  fetch(httpssrc).then(res => res.blob()).then(blob => {
    const a = document.createElement('a');
    document.body.appendChild(a)
    a.style.display = 'none'
    const url = window.URL.createObjectURL(blob);
    a.href = url;//下载地址
    a.download = `${filename}.mp3`;//下载文件名
    a.click();//模拟点击，自动下载
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url);
  });

}
//获取当前时间戳
const getTimestamp = () => {
  return new Date().getTime()
}
//生成(min,max)之间的随机整数（包含min,不包含max）
const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}
// Cookie Parser    将cookie解析
const cookieParser = (cookie) => {
  let parserData = {};
  (cookie || '').split(/;\s+|(?<!\s)\s+$/g).forEach((pair) => {
    let crack = pair.indexOf('=')
    if (crack < 1 || crack == pair.length - 1) return
    parserData[decodeURIComponent(pair.slice(0, crack)).trim()] = decodeURIComponent(
      pair.slice(crack + 1),
    ).trim()
  })
  return [parserData['HTTPOnly;MUSIC_U'], parserData['HTTPOnly;__csrf']]
  /* 
  // console.log(parserData)
  {
    Expires: "Sat, 17 Mar 2091 18:24:35 GMT"
    HTTPOnly;MUSIC_A_T: "1481119727062"
    HTTPOnly;MUSIC_R_T: "1481119757789"
    HTTPOnly;MUSIC_U: "6bf80db2682091e66db7c358940e6034f555d03d999284f42033476c98e45796993166e004087dd3e30340b48322c4fd7a82616b73ff591e0195ea446a99c0ab92386fc4f57b0915a0d2166338885bd7"
    HTTPOnly;__csrf: "a7ae33e29d089a9e30774e67bfd99367"
    MUSIC_A_T: "1481119727062"
    Max-Age: "2147483647"
    Path: "/api/clientlog"
  }
   */
  //6bf80db2682091e66db7c358940e6034f555d03d999284f42033476c98e45796993166e004087dd3e30340b48322c4fd7a82616b73ff591e0195ea446a99c0ab92386fc4f57b0915a0d2166338885bd7
}

//深冻结
const deepFreeze = (obj) => {
  // 获取所有属性
  var propNames = Object.getOwnPropertyNames(obj)

  // 遍历
  propNames.forEach(item => {
    var prop = obj[item]
    // 如果某个属性的属性值是对象，则递归调用
    if (prop instanceof Object && prop !== null) {
      deepFreeze(prop)
    }
  })
  // 冻结自身
  return Object.freeze(obj)
}


/**
 * 将 source 对象中的非空属性值复制到 destination 对象中。
 * @param {Object} source - 包含属性和对应值的源对象。
 * @param {Object} destination - 目标对象，用于接收复制后的非空属性值。
 */
const  copyNonEmptyValues = (source, destination)=> {
  for (const key in source) {
    const value = source[key];
    // 检查 value 是否为非空值（不为 null、undefined 和空字符串）。
    if (value !== null && value !== undefined && value !== '') {
      // 复制非空值到 destination 对象中的同名属性。
      destination[key] = value;
    }
  }
}



module.exports = {
  randomColor,
  randomNum,
  transtime,
  transMusicTime,
  transPlayCount,
  download,
  getTimestamp,
  randomRange,
  cookieParser,
  deepFreeze,
  copyNonEmptyValues,
}