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

    const body = await res.json()

    const { token, id, full_name, is_admin } = body

    dispatch({ type: UPDATE, payload: { token, id, fullName: full_name, isAdmin: is_admin } })
  }
}

function logout(dispatch) {
  return async function () {
    dispatch({ type: UPDATE, payload: {} })
  }
}

function checkStatus(dispatch) {
  return async function (code) {
    if (code !== 401) {
      return true
    }
    logout(dispatch)()
  }
}

export { login, logout, checkStatus }
