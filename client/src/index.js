import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { Provider } from 'react-redux'

import App from './App'
import store from './store'
import context from './context'

function Main() {
  context(useState({}))

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
)
