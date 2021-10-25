let _currentUser
let _setCurrentUser

export default function init([currentUser, setCurrentUser]) {
  _currentUser = currentUser
  _setCurrentUser = setCurrentUser
}

export { _currentUser as currentUser, _setCurrentUser as setCurrentUser }
