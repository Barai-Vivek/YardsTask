import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {employeeData} from '../Constants';
import {EmployeeNode} from './components';

const EmployeesScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={employeeData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <EmployeeNode node={item} index={index} />
        )}
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

export {EmployeesScreen};
