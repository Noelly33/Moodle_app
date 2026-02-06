import { View, Pressable } from 'react-native'
import { useEffect, useMemo } from 'react'
import { Stack, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import ListActividad from '../../src/components/form/ListActividad'
import { useDrawer } from '../../src/context/DrawerContext'
import { useActivities } from '../../src/hooks/useActivities'
import { useAuth } from '../../src/context/authContext'

export default function Index() {
  const { openDrawer } = useDrawer()
  const { token, user } = useAuth()
  const courseIds = useMemo(() => [1, 2, 3], []) 
  
  const { activities, loading, error, refetch } = useActivities({ courseIds, token })

  const handleActivityPress = (activity) => {
    switch (activity?.tipo?.toLowerCase()) {
      case 'tarea':
        router.push({
          pathname: `/(app)/cursos/[courseId]/assign/[assignId]`,
          params: { 
            courseId: activity.courseId,
            assignId: activity.activityId,
            assignName: activity.nombre 
          }
        })
        break

      case 'foro':
        router.push({
          pathname: "/(app)/cursos/[courseId]/forum/[forumId]",
          params: {
            courseId: activity.courseId,
            forumId: activity.activityId,
            forumName: activity.nombre
          }
        })
        break

      default:
        console.log("Tipo no soportado:", activity?.tipo)
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Mis Actividades',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#2160C4' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'normal' },
          headerLeft: () => (
            <Pressable onPress={openDrawer} style={{ marginLeft: 16 }}>
              <Ionicons name="menu" size={28} color="#fff" />
            </Pressable>
          ),
        }}
      />

      <ListActividad
        actividades={activities}
        loading={loading}
        fetchActividades={refetch}
        onActivityPress={handleActivityPress}
      />
    </>
  )
}
