import './app.global.css'

import * as React from 'react'

import { AppContainer } from 'react-hot-loader'
import Routes from './containers/Routes'
import { render } from 'react-dom'

render(
  <AppContainer>
    <Routes/>
  </AppContainer>
  ,
  document.getElementById('root')
)

if ((module as any).hot) {
  (module as any).hot.accept('./containers/Routes', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Routes').default
    render(
      <AppContainer>
        <NextRoot/>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
