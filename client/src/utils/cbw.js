import { useCallback, useState } from 'react'

export default function useCallbackWrapper(fn) {
  const [invoke] = useState({ callback: fn })
  invoke.callback = fn

  return useCallback(() => {
    invoke.callback()
  }, [invoke])
}
