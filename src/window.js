var globalThis = (function () {
  var gbthis
  Object.prototype.__defineGetter__('__magic__', function () {
    return this
  })
  __magic__.globalThis = __magic__
  gbthis = __magic__.globalThis
  delete Object.prototype.__magic__
  return gbthis
})()

var __fakeGlobalThis = (() => {
  const __tryGetObject = (name) => {
    if (globalThis && globalThis[name]) {
      return globalThis[name]
    }
    if (eval) {
      return (0, eval)(`window["${name}"]`)
    }
    console.log('Failed.', name)
    return null
  }
  return new Proxy(
    {},
    {
      get: (target, prop, receiver) => {
        return __tryGetObject(prop)
      },
    }
  )
})()

export {__fakeGlobalThis as FakeWindow}