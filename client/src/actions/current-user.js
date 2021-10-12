import { UPDATE } from '../reducers/current-user'

function login(dispatch) {
  return async function (code) {
    const res = await fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: code })
    })

    const { token, id, full_name } = res.body

    dispatch({ type: UPDATE, payload: { token, id, fullName: full_name } })
  }
}

function logout(dispatch) {
  return async function () {
    dispatch({ type: UPDATE, payload: {} })
  }
}

export { login, logout }
