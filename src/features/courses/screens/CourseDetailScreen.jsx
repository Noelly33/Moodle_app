import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import Accordion from '@/shared/components/ui/Accordion';
import ActivityCard from '@/shared/components/ui/ActivityCard';
import HtmlContent from '@/shared/components/ui/HtmlContent';
import { LoadingView, ErrorView, EmptyView, OfflineBanner } from '@/shared/components/ui/StateViews';
import { openModule } from '@/shared/navigation/routes';
import CourseInfoCard from '../components/CourseInfoCard';
import { useCourseContent } from '../hooks/useCourses';

const NAVIGABLE_TYPES = ['assign', 'forum', 'resource'];

function SectionContent({ courseId, section }) {
  const modules = section.modules.filter(m => NAVIGABLE_TYPES.includes(m.type));

  return (
    <View>
      {section.summary ? (
        <View style={{ marginBottom: 16 }}>
          <HtmlContent html={section.summary} horizontalPadding={104} tagsStyles={{ body: { fontSize: 13 } }} />
        </View>
      ) : null}

      {modules.length ? (
        modules.map(module => (
          <ActivityCard
            key={module.id}
            data={{ nombre: module.name, tipo: module.type, descripcion: module.description || 'Ver detalles' }}
            onPress={() => openModule(courseId, module)}
          />
        ))
      ) : (
        <Text className="text-gray-500 text-sm text-center py-4">Sin actividades en esta unidad</Text>
      )}
    </View>
  );
}

export default function CourseDetailScreen() {
  const { courseId, courseName } = useLocalSearchParams();
  const { sections, offline, loading, error, reload } = useCourseContent(Number(courseId));

  const header = <Stack.Screen options={{ headerTitle: courseName || 'Detalle del curso' }} />;

  if (loading && !sections.length) return <>{header}<LoadingView /></>;
  if (error) return <>{header}<ErrorView message={error} onRetry={reload} /></>;
  if (!sections.length) return <>{header}<EmptyView message="No hay contenido disponible para este curso" /></>;

  const general = sections.find(s => s.title?.toLowerCase() === 'general');
  const units = sections.filter(s => s !== general);

  const accordionItems = units.map((section, index) => ({
    title: (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Feather name="book" size={18} color="#111827" style={{ marginRight: 8 }} />
        <Text>{section.title || `Unidad ${index + 1}`}</Text>
      </View>
    ),
    content: <SectionContent courseId={courseId} section={section} />,
  }));

  return (
    <>
      {header}
      <ScrollView
        className="bg-white"
        contentContainerStyle={{ padding: 16 }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={reload} />}
      >
        <OfflineBanner visible={offline} />

        <CourseInfoCard description={general?.summary || 'Sin descripción disponible'} isHtml={!!general?.summary} />

        {general ? <SectionContent courseId={courseId} section={{ ...general, summary: '' }} /> : null}

        {accordionItems.length ? (
          <Accordion items={accordionItems} />
        ) : (
          <Text className="text-center text-gray-500 mt-8">No hay unidades disponibles</Text>
        )}
      </ScrollView>
    </>
  );
}
