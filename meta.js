'use strict'

const dom = require('@nx-js/dom-util')
const secret = {
  config: Symbol('meta config')
}

module.exports = function metaFactory (config) {
  function meta (elem) {
    const parentConfig = dom.findAncestorProp(elem, secret.config)
    config = elem[secret.config] = Object.assign({}, parentConfig, config)

    if (config.title) {
      document.title = config.title
    }
    if (config.description) {
      setMetaTag('description', config.description)
    }
    if (config.author) {
      setMetaTag('author', config.author)
    }
    if (config.keywords) {
      setMetaTag('keywords', config.keywords)
    }
    if (config.robots) {
      setMetaTag('robots', config.robots)
    }
    if (config.analytics) {
      if (typeof ga !== 'function') {
        throw new Error('There is no global ga (Google analytics) function.')
      }
      ga('set', 'page', config.analytics)
      ga('send', 'pageview')
    }
  }
  meta.$name = 'meta'
  meta.$type = ['component']
  return meta
}

function setMetaTag (name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}
