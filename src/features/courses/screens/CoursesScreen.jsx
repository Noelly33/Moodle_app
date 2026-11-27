import { FlatList, Pressable, RefreshControl } from 'react-native';
import CourseCard from '../components/CourseCard';
import { useCourses } from '../hooks/useCourses';
import { routes } from '@/shared/navigation/routes';
import { LoadingView, ErrorView, EmptyView, OfflineBanner } from '@/shared/components/ui/StateViews';

export default function CoursesScreen() {
  const { courses, offline, loading, error, reload } = useCourses();

  if (loading && !courses.length) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={reload} />;

  return (
    <>
      <OfflineBanner visible={offline} />
      <FlatList
        data={courses}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={reload} />}
        ListEmptyComponent={<EmptyView message="No estás matriculado en ningún curso" icon="book" />}
        renderItem={({ item }) => (
          <Pressable onPress={() => routes.course(item.id, item.name)}>
            <CourseCard
              data={{
                nombre: item.name,
                tipo: 'Curso',
                curso: item.shortname,
                descripcion: `Docente: ${item.teacher || 'Sin asignar'}`,
              }}
            />
          </Pressable>
        )}
      />
    </>
  );
}
