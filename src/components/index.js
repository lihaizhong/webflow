import WvHeader from './WvHeader'
import WvFooter from './WvFooter'

const WEB_COMPONENTS = { WvHeader, WvFooter }

function generateCustomElementName(name) {
  if (typeof name === 'string') {
    const elementName = name.replace(/[A-Z]/g, $0 => {
      return `-${$0.toLowerCase()}`
    })

    if (elementName.charAt(0) === '-') {
      return elementName.substring(1)
    } else {
      return elementName
    }
  } else {
    throw new Error('component name必须是一个字符串')
  }
}

function createCustomElements(components) {
  let names = []
  Object.keys(components).forEach(name => {
    const component = components[name]
    name = generateCustomElementName(name)
    names.push(name)
    window.customElements.define(name, component)
  })

  const promises = names.map(name => window.customElements.whenDefined(name))
  Promise.all(promises)
    .then(() => console.info('WEB COMPONENT 组件加载完成'))
    .catch(error => {
      throw error
    })
}

createCustomElements(WEB_COMPONENTS)
