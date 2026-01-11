import { View } from 'react-native'
import { useEffect, useState } from 'react'
import { router, Stack } from 'expo-router'
import Button from '../../src/components/ui/Button'
import Label from '../../src/components/form/Label'
import ListActividad from '../../src/components/form/ListActividad'

// Datos de ejemplo
const datosEjemplo = [
  {
    id: 1,
    nombre: 'Tarea de Matemáticas',
    titulo: 'Tarea de Matemáticas',
    curso: 'Matemáticas Avanzadas',
    fechaEntrega: 'Lu, 11 Ene 2026',
    estado: 'pendiente',
    tipo: 'TAREA',
    descripcion: 'Resolver ejercicios del capítulo 3'
  },
  {
    id: 2,
    nombre: 'Informe de Laboratorio',
    titulo: 'Informe de Laboratorio',
    curso: 'Química Orgánica',
    fechaEntrega: 'Lu, 12 Ene 2026',
    estado: 'pendiente',
    tipo: 'INFORME',
    descripcion: 'Entregar reporte con conclusiones del experimento'
  },
  {
    id: 3,
    nombre: 'Cuestionario de Historia',
    titulo: 'Cuestionario de Historia',
    curso: 'Historia Universal',
    fechaEntrega: 'Mi, 14 Ene 2026',
    estado: 'pendiente',
    tipo: 'QUIZ',
    descripcion: 'Completar cuestionario sobre la Segunda Guerra Mundial'
  },
  {
    id: 4,
    nombre: 'Proyecto Final',
    titulo: 'Proyecto Final',
    curso: 'Programación Web',
    fechaEntrega: 'Ju, 8 Ene 2026 - Ju, 15 Ene 2026',
    estado: 'pendiente',
    tipo: 'PROY',
    descripcion: 'Desarrollar módulo de autenticación y documentar'
  }
]

export default function Index() {
  const [selectList, setSelectList] = useState(datosEjemplo)
  const [loading, setLoading] = useState(false)

  const fetchTareas = async () => {
    setLoading(true)
    setTimeout(() => {
      setSelectList(datosEjemplo)
      setLoading(false)
    }, 1500)
  }
  
  useEffect(() => {
    // fetchTareas()
  }, [])

  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Mis actividades' }} />
      <View className="bg-gray-50">
        <Label>Actividades pendientes y en progreso</Label>
      </View>
      <ListActividad actividades={selectList} loading={loading} fetchActividades={fetchTareas} />
    </>
  )
}