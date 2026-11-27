import { View, Text, Pressable } from 'react-native';
import Badge from './Badge';
import { stripHtml } from '@/shared/utils/html';
import { moduleColors } from '@/shared/theme/colors';

const TYPE_LABELS = { assign: 'Tarea', forum: 'Foro', resource: 'Recurso' };

export default function ActivityCard({ data, onPress }) {
  const type = data?.tipo?.toLowerCase();
  const badgeColor = moduleColors[type] || moduleColors.default;
  const label = TYPE_LABELS[type] || data?.tipo || 'Actividad';

  const content = (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
      }}
    >
      <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, backgroundColor: '#3B82F6' }} />

      <View style={{ padding: 16, paddingLeft: 22 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <Text style={{ flex: 1, marginRight: 8, fontSize: 16, fontWeight: 'bold', color: '#1F2937' }}>
            {data?.nombre}
          </Text>
          {data?.estado === 'pendiente' && <Badge color="red" size="sm">Pendiente</Badge>}
          {data?.estado === 'vencido' && <Badge color="gray" size="sm">Vencido</Badge>}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <View style={{ backgroundColor: badgeColor.bg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginRight: 8 }}>
            <Text style={{ color: badgeColor.text, fontWeight: '600', fontSize: 12 }}>{label.toUpperCase()}</Text>
          </View>
          {data?.fechaEntrega ? <Text style={{ color: '#3B82F6', fontSize: 13 }}>{data.fechaEntrega}</Text> : null}
        </View>

        {data?.curso ? (
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#374151', marginBottom: 4 }}>{data.curso}</Text>
        ) : null}

        <Text style={{ fontSize: 13, color: '#6B7280' }} numberOfLines={2}>
          {stripHtml(data?.descripcion) || 'Ver detalles de la actividad'}
        </Text>
      </View>
    </View>
  );

  return onPress ? <Pressable onPress={onPress}>{content}</Pressable> : content;
}
