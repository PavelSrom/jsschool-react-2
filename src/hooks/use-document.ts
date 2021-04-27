import { useState } from 'react'
import { firestore } from '../firebase'

type ReturnType<T> = {
  loading: boolean
  error: boolean
  add: (values: Omit<T, 'id'>) => Promise<void>
  update: (
    id: Extract<T, 'id'> | string,
    newValues: Omit<T, 'id'>
  ) => Promise<void>
  remove: (id: Extract<T, 'id'> | string) => Promise<void>
}

export const useDocument = <T extends { id: string }>(
  collection: string
): ReturnType<T> => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const add = async (values: Omit<T, 'id'>): Promise<void> => {
    setLoading(true)

    try {
      await firestore.collection(collection).add(values)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const update = async (
    id: Extract<T, 'id'> | string,
    newValues: Omit<T, 'id'>
  ): Promise<void> => {
    setLoading(true)

    try {
      await firestore.collection(collection).doc(id).update(newValues)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: Extract<T, 'id'> | string): Promise<void> => {
    setLoading(true)

    try {
      await firestore.collection(collection).doc(id).delete()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, add, update, remove }
}
