import { createContext, useState } from 'react'

export const Context = createContext()

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState({})

  return { currentUser, setCurrentUser }
}
