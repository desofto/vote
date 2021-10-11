import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'

function App() {
  const store = createStore(reducers)

  return (
    <Provider store={store}>
    </Provider>
  )
}

export default App
