import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {EmployeeNode} from './components';
import {useSelector} from 'react-redux';
import {selectEmployeeData} from '../redux/selector';

const EmployeesScreen = () => {
  const employeesData = useSelector(selectEmployeeData);

  return (
    <View style={styles.container}>
      <FlatList
        data={employeesData}
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
