const DATA_KEY_LIST = ['custom_data']
const VAR_LENGTH_LIMIT = 16384

/**
 * 从易次元读取数据
 * @returns {any}
 */
const read = () => {
  try {
    let datString = ''
    DATA_KEY_LIST.forEach((key) => {
      datString += ac.var[key]
    })
    return JSON.parse(datString)
  } catch (e) {
    throw e
  }
}

/**
 * 保存数据到易次元
 * @param {any} dat 要存储的变量
 */
const save = (dat) => {
  try {
    const str = JSON.stringify(dat)
    let index = 0
    while (str.length > 0) {
      if (index > DATA_KEY_LIST.length - 1) {
        throw new Error(`Data is to large for ${DATA_KEY_LIST.length} vars.`)
      }
      ac.var[DATA_KEY_LIST[index]] = str.substring(
        VAR_LENGTH_LIMIT * index,
        VAR_LENGTH_LIMIT * (index + 1)
      )
      index++
    }
  } catch (e) {
    throw e
  }
}

export default { read, save }
