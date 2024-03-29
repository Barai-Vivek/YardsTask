import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images} from '../assets';
import {selectEmployeeData, useAppSelector} from '../redux';
import {EmployeeComponent} from './components';

const FilteredEmployeesScreen = () => {
  const employeesData = useAppSelector(selectEmployeeData);

  const [searchText, setSearchText] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by Name, Email, Phone number..."
          onChangeText={value => setSearchText(value)}
          value={searchText}
        />
        {(searchText.length && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Image
              source={Images.icClear}
              tintColor={'grey'}
              style={{width: 24, height: 24, marginEnd: 8}}
            />
          </TouchableOpacity>
        )) ||
          null}
      </View>
      <FlatList
        data={employeesData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <EmployeeComponent
              employee={item}
              index={index}
              indexes={[index]}
              searchText={searchText}
              onlyEmployees={true}
            />
          );
        }}
        style={{marginTop: 12}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    padding: 8,
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export {FilteredEmployeesScreen};
