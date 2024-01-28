import React from 'react';
import {View, FlatList, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationRoutes} from '..';
import {EmployeeComponent} from './components';
import {selectEmployeeData, useAppSelector} from '../redux';

const HierarchyScreen = () => {
  const employeesData = useAppSelector(selectEmployeeData);
  const navigation = useNavigation();

  const navigateToAllEmployeesScreen = () => {
    navigation.navigate(NavigationRoutes.FILTERED_EMPLOYEES as never);
  };

  return (
    <View style={styles.container}>
      <Button title="All Employees" onPress={navigateToAllEmployeesScreen} />

      <FlatList
        data={employeesData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <EmployeeComponent
              employee={item}
              index={index}
              indexes={[index]}
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
});

export {HierarchyScreen};
