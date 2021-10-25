import { useContext, useCallback } from 'react'
import { Context } from '../context'

class GraphqlError extends Error {
  name = 'GraphqlError'
}

export function useHttp() {
  const { currentUser, setCurrentUser } = useContext(Context)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      if (currentUser.token) {
        headers['Authorization'] = `Bearer ${currentUser.token}`
      }

      const response = await fetch(url, { method, body, headers })
      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          setCurrentUser({})
          return
        }
        throw new Error(data.message || 'Internal error ')
      }

      return data
    } catch (e) {
      throw e
    }
  }, [currentUser, setCurrentUser])

  const graphql = useCallback(async (query, variables) => {
    const res = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify({
        query,
        variables
      })
    })
    const body = await res.json()

    if (body.errors) throw new GraphqlError(body.errors.map(e => e.message).join("\n"))

    return body.data
  }, [currentUser])

  return { request, graphql }
}
