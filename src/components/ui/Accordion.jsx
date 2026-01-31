// import { View } from 'react-native'
// import React, { useState } from 'react'
// import AntDesign from '@expo/vector-icons/AntDesign';
// export default function Accordion({ children, title, classSumary }) {
//   const [isOpen, setIsOpen] = useState(false)
//   const handleToggle = () => { setIsOpen(!isOpen)}
//   return (
//     <>
//       <View className={`${classSumary} flex flex-row items-center`}>
//         <View className="w-[95%]">
//           {title}
//         </View>
//         <View className="w-8">
//           <AntDesign name={isOpen ? "up" : "down"} size={24} color="black" onPress={handleToggle} />
//         </View>
//       </View>
//       {isOpen && children}
//     </>
//   )
// }

import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <View className="border border-gray-300 rounded-xl mb-4 overflow-hidden bg-white">
      <Pressable
        onPress={() => setOpen(!open)}
        className="flex-row justify-between items-center px-5 py-4"
      >
        <Text className="text-base font-semibold text-gray-900">
          {title}
        </Text>

        <AntDesign
          name={open ? "up" : "down"}
          size={16}
          color="#111827"
        />
      </Pressable>

      {open && (
        <View className="border-t border-gray-200 px-5 py-4">
          {children}
        </View>
      )}
    </View>
  );
}

export default function Accordion({ items = [] }) {
  return (
    <View>
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </View>
  );
}
