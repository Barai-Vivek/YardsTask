import React from 'react';
import {View, FlatList, StyleSheet, Button} from 'react-native';
import {NavigationRoutes} from '..';
import {EmployeeComponent} from './components';
import {
  hierarchyActions,
  selectEmployeeData,
  useAppDispatch,
  useAppNavigation,
  useAppSelector,
} from '../redux';

const HierarchyScreen = () => {
  const employeesData = useAppSelector(selectEmployeeData);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const navigateToAllEmployeesScreen = () => {
    navigation.navigate(NavigationRoutes.FILTERED_EMPLOYEES);
  };

  const resetAllData = () => {
    dispatch(hierarchyActions.resetAllData());
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Button title="All Employees" onPress={navigateToAllEmployeesScreen} />
        <Button title="Reset" onPress={resetAllData} />
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
