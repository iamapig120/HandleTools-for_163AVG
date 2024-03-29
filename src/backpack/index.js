import { Data } from '../data'

/**
 * 标识用Key
 * @typedef {string} IndexKey
 **/

/**
 * 注册信息
 * @typedef {object} RegisteredItem
 * @property {IndexKey} key 物品唯一key
 * @property {object} obj 该物品的自定义信息
 **/

/**
 * 注册信息Map
 * @typedef {{[x: IndexKey]:RegisteredItem}} RegisteredItemMap
 **/

/**
 * 单个背包内物品信息
 * @typedef {object} InpackItem
 * @property {IndexKey} key 物品唯一key
 * @property {number} count 数量
 * @property {object} obj 该物品的自定义信息
 **/

/**
 * 子背包物品信息Map
 * @typedef {{[x: IndexKey]:InpackItem}} ChildBackpack
 **/

/**
 * 子背包信息Map
 * @typedef {{[x: IndexKey]:ChildBackpack}} ChildBackpackMap
 **/

/**
 * 总背包信息
 * @typedef {object} BackpackData
 * @property {RegisteredItemMap} registered 已注册Map
 * @property {ChildBackpackMap} backpack 子背包Map
 **/

class BackPack {
  constructor(arrName) {
    this._arrName = arrName
    /** @type {BackpackData} */
    this._data = Data.read(arrName)
    if (this._data == undefined) {
      this._data = {
        registered: {},
        backpack: {},
      }
    }
    this.____init()
  }
  ____save() {
    Data.save(this._arrName, this._data)
  }
  /** @returns {BackpackData} */
  ____data() {
    return this._dataProxy
  }
  ____init() {
    const registeredProxy = this._data.registered
    const backpackProxy = this._data.backpack
    this._dataProxy = {
      registered: new Proxy(registeredProxy, {
        get: (target, property, receiver) => {
          if (target[property]) {
            return {
              key: property,
              obj: Object.assign({}, target[property].obj),
            }
          } else {
            return undefined
          }
        },
        set: (target, property, newValue, receiver) => {
          if (target[property]) {
            throw new TypeError(
              `Item with key "${property}" has been registered.`
            )
          }
          const key = newValue.key
          if (key !== property) {
            throw new TypeError(
              `Item with key "${key}" is different to target "${property}".`
            )
          }
          const obj = newValue.obj
          target[property] = {
            obj: obj,
          }
          this.____save()
          return true
        },
      }),
      backpack: new Proxy(backpackProxy, {
        get: (target, property, receiver) => {
          if (!target[property]) {
            target[property] = {}
          }
          return new Proxy(target[property], {
            get: (target, property, receiver) => {
              if (!registeredProxy[property]) {
                throw new Error(
                  `Required key "${property}" has not been registered.`
                )
              }
              const obj = registeredProxy[property].obj
              let countNum = 0
              if (target[property]) {
                countNum = target[property].count
              }
              const backpackThis = this
              return {
                key: property,
                get count() {
                  return countNum
                },
                set count(newValue) {
                  if (!target[property]) {
                    target[property] = { count: 0 }
                  }
                  target[property].count = newValue
                  backpackThis.____save()
                  return true
                },
                obj: obj,
              }
            },
            set: () => {
              throw new Error('Single backpack info is not writable')
            },
          })
        },
        set: () => {
          throw new Error('Single backpack info is not writable')
        },
      }),
    }
  }

  /**
   * 注册一个物品到背包
   * @param {IndexKey} key 物品唯一key
   * @param {any} obj 物品自定义信息
   */
  registerItem(key, obj) {
    if (this.____data().registered[key]) {
      throw new TypeError(`Item with key "${key}" has been registered.`)
    }
    this.____data().registered[key] = {
      key: key,
      obj: obj,
    }
  }
  /** @return {RegisteredItemMap} */
  listAllRegisteredItems() {
    return Object.assign({}, this.____data().registered)
  }

  /**
   *
   * @param {IndexKey} key 物品唯一ID
   * @param {number} count 数量
   * @param {IndexKey} target 目标背包名
   */
  giveItem(key, count, target = '0') {
    this.____data().backpack[target][key].count += count
  }
  setItem(key, count, target = '0') {
    this.____data().backpack[target][key].count = count
  }
  removeItem(key, count, target = '0') {
    this.____data().backpack[target][key].count -= count
  }

  countItem(key, target = '0') {
    return this.____data().backpack[target][key].count
  }
  showItem(key, target = '0') {
    return this.____data().backpack[target][key]
  }
  showAllItems(target = '0') {
    return this.____data().backpack[target]
  }
  /**
   * 从特定数组载入数据，创建新背包
   * @param {string} arrName 数组名
   * @returns {BackPack}
   */
  static from(arrName) {
    return new BackPack(arrName)
  }
}

export { BackPack }
