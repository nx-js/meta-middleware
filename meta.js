'use strict'

const secret = {
  config: Symbol('meta config')
}

module.exports = function metaFactory (config) {
  function meta (elem) {
    config = elem[secret.config] = Object.assign({}, findParentConfig(elem), config)

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
  return meta
}

function findParentConfig (elem) {
  elem = elem.parentNode
  while (elem && elem[secret.config] === undefined) {
    elem = elem.parentNode
  }
  return elem ? elem[secret.config] : undefined
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
