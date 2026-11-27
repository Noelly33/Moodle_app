import { View } from 'react-native';
import { Stack } from 'expo-router';
import ActivityList from '../components/ActivityList';
import { useMyActivities } from '../hooks/useActivities';
import { routes } from '@/shared/navigation/routes';
import { LoadingView, ErrorView, OfflineBanner } from '@/shared/components/ui/StateViews';

export default function HomeScreen() {
  const { activities, offline, loading, error, reload } = useMyActivities();

  const openActivity = activity => {
    if (activity.tipo === 'assign') routes.assignment(activity.courseId, activity.activityId, activity.nombre);
    else if (activity.tipo === 'forum') routes.forum(activity.courseId, activity.activityId, activity.nombre);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen options={{ headerTitle: 'Mis actividades' }} />
      <OfflineBanner visible={offline} />

      {loading && !activities.length ? (
        <LoadingView message="Cargando actividades..." />
      ) : error ? (
        <ErrorView message={error} onRetry={reload} />
      ) : (
        <ActivityList activities={activities} loading={loading} onRefresh={reload} onActivityPress={openActivity} />
      )}
    </View>
  );
}
