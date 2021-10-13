export const UPDATE = 'STAGES.UPDATE'

const InitialState = []

export default function reducer(state = InitialState, action) {
  switch (action.type) {
    case UPDATE:
      return action.payload
    default:
      return state
  }
}
