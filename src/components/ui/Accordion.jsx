import { View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
export default function Accordion({ children, title, classSumary }) {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => { setIsOpen(!isOpen)}
  return (
    <>
      <View className={`${classSumary} flex flex-row items-center`}>
        <View className="w-[95%]">
          {title}
        </View>
        <View className="w-8">
          <AntDesign name={isOpen ? "up" : "down"} size={24} color="black" onPress={handleToggle} />
        </View>
      </View>
      {isOpen && children}
    </>
  )
}