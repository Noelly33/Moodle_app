

import { TextInput, View, Pressable, Text } from 'react-native'
import { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';

export default function Input({ secure = false, placeholder, onChangeText, value = "", error = "", keyboardType, disabled = false }) {
  const [show, setShow] = useState(secure)
  const stylesDefect = {
    defect: `border border-gray-300 text-gray-900 text-base rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 w-full p-3.5 `,
    error: `bg-red-50 border border-red-300 text-red-900 text-base rounded-lg 
        focus:ring-red-500 focus:border-red-500 w-full p-3.5`
  }

  return (
    <>
      <View className="w-full">
        <TextInput 
          readOnly={disabled} 
          keyboardType={keyboardType ?? null} 
          error={error} 
          value={value} 
          onChangeText={onChangeText} 
          secureTextEntry={show} 
          className={`${error === "" ? stylesDefect.defect : stylesDefect.error} pr-6 ${disabled ? "bg-gray-100 text-gray-400/80" : "bg-white"}`}
          placeholder={placeholder}
          multiline={false}
          numberOfLines={1}
          style={{ height: 45 }}
        />
        {
          secure && (
            <Pressable onPress={() => setShow(!show)} className="absolute right-0 top-0 h-full flex items-center justify-center px-2">
              {
                !show ?
                  <Feather name="eye" size={20} color={"#9CA3AF"} />
                  : <Feather name="eye-off" size={20} color="#9CA3AF" />
              }
            </Pressable>
          )
        }
      </View >
      {
        error !== "" && <Text className='text-red-500 text-sm font-bold'>{error}</Text>
      }
    </>
  )
}