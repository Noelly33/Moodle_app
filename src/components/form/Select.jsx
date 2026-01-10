import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Select({ onChange, value, data, loading = false, search = true , placeholder ="Seleccione..." }) {

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="green"
            name="checkcircleo"
            size={20}
          />
        )}
      </View>
    );
  }

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      containerStyle={styles.containerStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search={search}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={loading ? "Cargando..." : placeholder}
      searchPlaceholder="Buscar..."
      value={value}
      onChange={onChange}
      disable={loading}
      flatListProps={{  
        keyboardShouldPersistTaps: 'handled',
      }}
      renderItem={renderItem}
    />
  );
};


const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  containerStyle: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  textItem: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500"
  },
  placeholderStyle: {
    fontSize: 16,
    padding: 10.2,
    color: "#d1d5db",
    fontWeight: "semibold",
  },
  selectedTextStyle: {
    fontSize: 14,
    padding: 12,
    fontWeight: "semibold"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontWeight: "500",
    borderRadius: 9
  },
});