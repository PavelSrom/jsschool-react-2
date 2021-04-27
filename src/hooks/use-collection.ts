import { useState, useEffect } from 'react'
import { firestore } from '../firebase'

type ReturnType<T> = {
  data: T | undefined
  isError: boolean | string
}

export const useCollection = <T>(collection: string): ReturnType<T> => {
  const [returnValue, setReturnValue] = useState<ReturnType<T>>({
    data: undefined,
    isError: false,
  })

  useEffect(() => {
    const unsubscribe = firestore.collection(collection).onSnapshot(
      snapshot => {
        const data: any = []

        snapshot.docs.forEach(doc => data.push({ ...doc.data(), id: doc.id }))

        setReturnValue(prev => ({ ...prev, data }))
      },
      err => {
        setReturnValue(prev => ({ ...prev, isError: err.message }))
      }
    )

    return () => {
      unsubscribe()
    }
  }, [collection])

  return returnValue
}
