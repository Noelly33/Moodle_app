import { View, Text } from 'react-native'

export default function Bagde({color = "primary", children, size = "base"}) {

const textSize = {
    sm: "text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full text-center truncate",
    base: "text-sm font-semibold me-2 px-2.5 py-0.5 rounded-full text-center truncate",
    lg: "text-base font-semibold me-2 px-2.5 py-0.5 rounded-full text-center truncate",
    xl: "text-lg font-semibold me-2 px-2.5 py-0.5 rounded-full text-center truncate",
    "2xl": "text-2xl font-semibold me-2 px-2.5 py-0.5 rounded-full text-center truncate",
    "3xl": "text-3xl font-semibold me-2 px-2.5 py-0.5 rounded-full text-center truncate",
    "4xl": "text-4xl font-semibold me-2 px-2.5 py-0.5 rounded-full text-center truncate",
    "5xl": "text-5xl font-semibold me-2 px-2.5 py-0.5 rounded-full text-center truncate",
    "6xl": "text-6xl font-semibold me-2 px-2.5 py-0.5 rounded-full text-center truncate",
    "7xl": "text-7xl font-semibold me-2 px-2.5 py-0.5 rounded-full text-center truncate",
    "8xl": "text-8xl font-semibold me-2 px-2.5 py-0.5 rounded-full text-center truncate",
    "9xl": "text-9xl font-semibold me-2 px-2.5 py-0.5 rounded-full text-center truncate",
}

const stylesDefect = "text-sm font-semibold me-2 px-2.5 py-0.5 rounded-full text-center truncate"

const styles = {
   primary: "bg-blue-100 text-blue-800 ",
   gray: "bg-gray-100 text-gray-800 ",
   red: "bg-red-100 text-red-800 ",
   green: "bg-green-100 text-green-800 ",
   yellow: "bg-yellow-100 text-yellow-800 ",
   indigo : "bg-indigo-100 text-indigo-800 ",
   purple: "bg-purple-100 text-purple-800 ",
   pink: "bg-pink-100 text-pink-800 ",
}

  return (
    <Text className={`${textSize[size]} ${stylesDefect} ${styles[color]}`}>
        {children}
    </Text>
  )
}