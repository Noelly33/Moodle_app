import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

const baseTagsStyles = {
  body: { fontSize: 14, color: '#374151', lineHeight: 20 },
  p: { marginTop: 0, marginBottom: 8 },
  li: { marginBottom: 4 },
  h1: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  h2: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  h3: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  strong: { fontWeight: 'bold' },
  em: { fontStyle: 'italic' },
};

export default function HtmlContent({ html, horizontalPadding = 64, tagsStyles }) {
  const { width } = useWindowDimensions();
  if (!html) return null;

  return (
    <RenderHTML
      contentWidth={width - horizontalPadding}
      source={{ html }}
      tagsStyles={{ ...baseTagsStyles, ...tagsStyles }}
    />
  );
}
