import store from 'store'

class GraphqlError extends Error {
  name = 'GraphqlError'
}

export default async function graphql(query, variables) {
  const state = store.getState()

  const res = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${state.currentUser.token}`,
    },
    body: JSON.stringify({
      query,
      variables
    })
  })
  const body = await res.json()

  if (body.errors) throw new GraphqlError(body.errors.map(e => e.message).join("\n"))

  return body.data
}
