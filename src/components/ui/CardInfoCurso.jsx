import { View, Text, useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";

export default function CardInfoCurso({ title, description, isHtml = false }) {
  const { width } = useWindowDimensions();

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
      {title && (
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 }}>
          {title}
        </Text>
      )}
      {description && (
        isHtml ? (
          <RenderHTML
            contentWidth={width - 64}
            source={{ html: description }}
            tagsStyles={{
              body: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
              p: { marginBottom: 8 },
              h1: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
              h2: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
              h3: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
              strong: { fontWeight: 'bold' },
              em: { fontStyle: 'italic' },
            }}
          />
        ) : (
          <Text style={{ fontSize: 14, color: '#4B5563', lineHeight: 20 }}>
            {description}
          </Text>
        )
      )}
    </View>
  );
}
