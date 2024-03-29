const VAR_LENGTH_LIMIT = 16384

/**
 * 从易次元指定数组读取数据
 * @param {string[]} arrName 要读取的数组名
 * @returns {any}
 */
const read = (arrName) => {
  try {
    let datString = ''
    ac.arr[arrName].forEach((item) => {
      datString += item
    })
    // if(datString.length == 0){
    //   datString = '{}'
    // }
    return JSON.parse(datString)
  } catch (e) {
    // throw e
    return undefined
  }
}

/**
 * 保存数据到易次元指定数组
 * @param {string[]} arrName 要读取的数组名
 * @param {any} dat 要存储的对象
 */
const save = (arrName, dat) => {
  try {
    const str = JSON.stringify(dat)
    let index = 0
    while (str.length > index * VAR_LENGTH_LIMIT) {
      if (str.length / VAR_LENGTH_LIMIT > ac.arr[arrName].length) {
        throw new Error(`Data is too large for ${arrName} array.`)
      }
      ac.arr[arrName][index] = str.substring(
        VAR_LENGTH_LIMIT * index,
        VAR_LENGTH_LIMIT * (index + 1)
      )
      index++
    }
  } catch (e) {
    throw e
  }
}

export const Data = { read, save, load: read }
