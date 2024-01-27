import React from 'react';
import {View, FlatList, StyleSheet, Button} from 'react-native';
import {selectEmployeeData} from '../redux/selector';
import {useNavigation} from '@react-navigation/native';
import {NavigationRoutes} from '..';
import {useAppSelector} from '../redux/hook/useAppSelector';
import {EmployeeComponent} from './components/EmployeeComponent';

const HierarchyScreen = () => {
  const employeesData = useAppSelector(selectEmployeeData);
  const navigation = useNavigation();

  const navigateToAllMembersScreen = () => {
    navigation.navigate(NavigationRoutes.FILTERED_EMPLOYEES as never);
  };

  return (
    <View style={styles.container}>
      <Button title="All Employees" onPress={navigateToAllMembersScreen} />

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
