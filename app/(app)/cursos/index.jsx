import { View, Text, Pressable } from "react-native";
import { router} from "expo-router";

export default function Cursos() {
return(
        <View>
            <Text>Cursos Index</Text>
            <Pressable className="bg-blue-950 py-2 px-4 rounded-lg" onPress={() => router.push("/cursos/create")}>
                <Text className="text-white text-center">Crear Curso</Text>
            </Pressable>
            <Pressable className="bg-blue-950 py-2 px-4 rounded-lg mt-4" onPress={() => router.push("/cursos/1")}>
                <Text className="text-white text-center">Editar Curso</Text>
            </Pressable>
        </View>
);
}