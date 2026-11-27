import { View, Text } from 'react-native';
import HtmlContent from '@/shared/components/ui/HtmlContent';

export default function CourseInfoCard({ title, description, isHtml = false }) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      {title ? (
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 }}>{title}</Text>
      ) : null}

      {description ? (
        isHtml ? (
          <HtmlContent html={description} />
        ) : (
          <Text style={{ fontSize: 14, color: '#4B5563', lineHeight: 20 }}>{description}</Text>
        )
      ) : null}
    </View>
  );
}
