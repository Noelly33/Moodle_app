import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetRoles } from '../services/roles'

export const useRoles = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [dataSelect, setDataSelect] = useState([])

  const getRoles = async () => {
    const res = await GetRoles()
    setLoading(false)
    if (res?.status === "success") {
      setData(res?.data)
      setDataSelect(res?.data)
    }
  }

  useEffect(() => {
    getRoles()
  }, [])

  return {
    dataSelect,
    loading,
    data
  }
}