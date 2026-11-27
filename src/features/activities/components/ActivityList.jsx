import { FlatList, RefreshControl } from 'react-native';
import ActivityCard from '@/shared/components/ui/ActivityCard';
import { EmptyView } from '@/shared/components/ui/StateViews';

export default function ActivityList({ activities, loading, onRefresh, onActivityPress }) {
  return (
    <FlatList
      data={activities}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8, flexGrow: 1 }}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
      ListEmptyComponent={
        loading ? null : <EmptyView message="No tienes actividades pendientes" icon="check-circle" />
      }
      renderItem={({ item }) => (
        <ActivityCard data={item} onPress={onActivityPress ? () => onActivityPress(item) : undefined} />
      )}
    />
  );
}
