// components/CardActividad.js
import { View, Text} from 'react-native';


const CardCurso = ({ data }) => {

    const borderColor = '#3B82F6';

    return (
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
                overflow: 'hidden'
            }}
        >
            <View style={{ 
                position: 'absolute', 
                left: 0, 
                top: 0, 
                bottom: 0, 
                width: 6,
                backgroundColor: borderColor
            }} />
            
            <View style={{ padding: 16, paddingLeft: 22 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F2937' }}>
                            {data?.nombre || data?.titulo}
                        </Text>
                    </View>
                    <View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <View style={{ 
                        backgroundColor: '#DBEAFE', 
                        paddingHorizontal: 8, 
                        paddingVertical: 4, 
                        borderRadius: 4,
                        marginRight: 8
                    }}>
                        <Text style={{ color: '#1E40AF', fontWeight: '600', fontSize: 12 }}>
                            {data?.tipo?.toUpperCase() || 'TAREA'}
                        </Text>
                    </View>
                    <Text style={{ color: '#3B82F6', fontSize: 13 }}>
                         {data?.fechaEntrega}
                    </Text>
                </View>
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#374151', marginBottom: 4 }}>
                    {data?.curso}
                </Text>

                <Text style={{ fontSize: 13, color: '#6B7280' }}>
                    {data?.descripcion || 'Ver detalles de la actividad'}
                </Text>
            </View>
        </View>
    );
};

export default CardCurso;
