import { FlatList, View, Text } from 'react-native'
import { RefreshControl } from 'react-native'
import CardActividad from '../ui/CardActividad'

export default function ListActividad({actividades, loading, fetchActividades}) {
    
    return (
        <View className="flex-1 bg-gray-50">
            {actividades && actividades.length > 0 ? (
                <FlatList
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchActividades} />}
                    data={actividades}
                    renderItem={({item}) => <CardActividad data={item} />}
                    keyExtractor={(item) => item.id?.toString()}
                    contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8 }}
                />
            ) : (
                <View className="flex-1 items-center justify-center">
                    <Text className="text-gray-600 text-center">
                        {loading ? 'Cargando actividades...' : 'No hay actividades disponibles'}
                    </Text>
                </View>
            )}
        </View>
    )
}