export const UPDATE = 'CURRENT-USER.UPDATE'

const InitialState = JSON.parse(localStorage.getItem('currentUser')) || {}

export default function reducer(state = InitialState, action) {
  switch (action.type) {
    case UPDATE:
      localStorage.setItem('currentUser', JSON.stringify(action.payload))
      return action.payload
    default:
      return state
  }
}
