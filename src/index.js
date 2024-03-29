import { Data } from './data'
import { FakeWindow } from './window'
import { BackPack } from './backpack'

const testBackPackWrite = () => {
  const bp = BackPack.from('backpack')

  bp.registerItem('1', { name: '蒸羊羔' })
  bp.registerItem('2', { name: '蒸熊掌' })
  bp.registerItem('3', { name: '蒸鹿尾儿' })
  bp.registerItem('4', { name: '烧花鸭' })
  bp.registerItem('5', { name: '烧雏鸡' })
  bp.registerItem('6', { name: '烧子鹅' })
  bp.registerItem('7', { name: '卤猪' })
  bp.registerItem('8', { name: '卤鸭' })
  bp.registerItem('9', { name: '酱鸡' })
  bp.registerItem('10', { name: '腊肉' })
  bp.registerItem('11', { name: '松花' })
  bp.registerItem('12', { name: '小肚儿' })

  bp.giveItem('1', 5)
  bp.giveItem('2', 6)

  console.log(bp.countItem('1'))
  console.log(bp.countItem('2'))
  console.log(bp.countItem('3'))

  console.log(bp.showAllItems())

  console.log(bp.showItem('1'))
  console.log(bp.showItem('5'))

  console.log(bp.listAllRegisteredItems())
  console.log(bp._data)
}

const testBackPackRead = () => {
  const bp = BackPack.from('backpack')

  console.log(bp.countItem('1'))
  console.log(bp.countItem('2'))
  console.log(bp.countItem('3'))

  console.log(bp.showAllItems())

  console.log(bp.showItem('1'))
  console.log(bp.showItem('5'))

  console.log(bp.listAllRegisteredItems())
  console.log(bp._data)

}

export {
  Data as data,
  FakeWindow as window,
  BackPack as backpack,
  testBackPackWrite as test0,
  testBackPackRead as test1,
}
