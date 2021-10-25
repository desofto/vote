import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { Provider } from 'react-redux'

import App from './App'
import store from './store'
import { Context, useCurrentUser } from './context'

function Main() {
  const ctx = useCurrentUser()
  return (
    <Context.Provider value={ctx}>
      <Provider store={store}>
        <App />
      </Provider>
    </Context.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
)
