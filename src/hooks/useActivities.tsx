import { useEffect, useState, useCallback } from 'react'
import { getActivitiesByCourses } from '../repository/activities.repository'
import { mapDbActivityToUi, getActivitiesByCoursesService } from '../service/activities'


export function useActivities({ courseIds, token }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadFromDb = useCallback(async () => {
    const stored = await getActivitiesByCourses(courseIds)
    setActivities(stored.map(mapDbActivityToUi))
  }, [courseIds])

  const syncActivities = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const dbActivities = await getActivitiesByCoursesService(
        courseIds,
        token
      )

      setActivities(dbActivities.map(mapDbActivityToUi))
    } catch (err) {
      console.error('Error cargando actividades:', err)
      setError(err.message)
      await loadFromDb() 
    } finally {
      setLoading(false)
    }
  }, [courseIds, token, loadFromDb])

  useEffect(() => {
    loadFromDb()
    syncActivities()
  }, [])

  return {
    activities,
    loading,
    error,
    refetch: syncActivities,
  }
}
