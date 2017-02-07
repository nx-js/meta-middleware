# The meta middleware

The `meta` middleware is responsible for handling page metadata and analytics.

- name: meta
- direct middleware dependencies: none
- all middleware dependencies: none
- type: component middleware
- [docs](http://nx-framework.com/docs/middlewares/meta)

## Installation

`npm install @nx-js/meta-middleware`

## Usage

```js
const component = require('@nx-js/core')
const meta = require('@nx-js/meta-middleware')

component()
  .use(meta({
    title: 'Home page',
    description: 'The home page of my project, which is ...',
    author: 'Me',
    keywords: ['home', 'page'],
    robots: 'nofollow',
    analytics: '/home'
  }))
  .register('page-comp')
```

```html
<page-comp></page-comp>
```
