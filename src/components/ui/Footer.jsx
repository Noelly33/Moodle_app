import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Footer() {
    const insets = useSafeAreaInsets()
    return (
        <View style={{ paddingBottom: insets.bottom }} className="px-3 pt-3 bg-[#3b82f6] ">
            <Text className="text-center font-semibold text-white">
                © 2025-2026 DAM. Todos los derechos reservados.
            </Text>
        </View>
    )
}