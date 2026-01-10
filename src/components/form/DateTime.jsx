import React, { useState } from 'react';
import { Text, Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTime = () => {
   const [valor, setValor] = useState(new Date());
   const [show, setShow] = useState(false);

   const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || new Date();
      setShow(Platform.OS === 'ios');
      setValor(currentDate);
   };


   const showDatepicker = () => setShow(true);


   return (
      <>
         <Pressable onPress={showDatepicker} className="bg-gray-50 border border-gray-300 rounded-lg w-full px-2.5 py-5 dark:bg-gray-700 dark:border-gray-600">
            <Text className="dark:text-white text text-gray-900 text-sm">{valor}</Text>
         </Pressable>
         {
            show && (
               <DateTimePicker
                  testID="dateTimePicker"
                  value={valor}
                  locale="es-ES"
                  mode={'date'}
                  is24Hour={true}
                  display="inline"
                  onChange={onChange}
                  maximumDate={new Date()}

               />
            )
         }

      </>

   );
};

export default DateTime;