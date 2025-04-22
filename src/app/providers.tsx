'use client'

import { useEffect } from 'react'
import { Provider } from 'react-redux'
import makeStore from '@/redux/store'

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const store = makeStore()

  useEffect(() => {
    console.log('[Redux] Store initialized in client:', store)
    return () => {
      console.log('[Redux] Store cleanup')
    }
  }, [store])

  return <Provider store={store}>{children}</Provider>
}