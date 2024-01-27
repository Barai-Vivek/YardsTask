import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ROLE} from '../../Constants';
import {EmployeeData, EmployeeProps} from '../types';
import {useNavigation} from '@react-navigation/native';
import {NavigationRoutes} from '../../Route';
import {Images} from '../../assets';
import {hierarchyActions, useAppDispatch} from '../../redux';

const EmployeeComponent = ({
  employee,
  index,
  indexes,
  searchText = '',
  onlyEmployees = false,
}: EmployeeProps) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // Define the function to navigate to another screen with data
  const navigateToScreenWithData = (item: EmployeeData, position: number) => {
    if (item.role === ROLE.TEAM) {
      navigation.navigate(NavigationRoutes.TEAM_FORM, {
        employee: item,
        indexes: indexes,
      });
    } else {
      navigation.navigate(NavigationRoutes.ADD_TEAM_MEMBER, {
        employee: item,
        indexes: indexes,
      });
    }
  };

  // Define the function to navigate to another screen with data
  const deleteTeamMember = (item: EmployeeData, position: number[]) => {
    dispatch(
      hierarchyActions.deleteEmployeeByIndex({
        employee: item,
        indexes: position,
      }),
    );
  };

  // Function to filter employees based on search query
  const filteredEmployees = (): boolean => {
    if (onlyEmployees) {
      if (
        employee.role !== ROLE.TEAM &&
        (employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
          (employee.phoneNumber &&
            employee.phoneNumber
              .toLowerCase()
              .includes(searchText.toLowerCase())) ||
          (employee.email &&
            employee.email.toLowerCase().includes(searchText.toLowerCase())))
      ) {
        return true;
      }

      return false;
    } else {
      return true;
    }
  };

  return (
    <View
      style={
        onlyEmployees ? null : index === 0 ? styles.topView : styles.childView
      }>
      {filteredEmployees() && (
        <View
          style={[
            styles.labelContainer,
            onlyEmployees ? {marginBottom: 16} : null,
          ]}>
          <View style={{width: '90%'}}>
            <Text style={styles.label}>{`Position: ${employee.role}`}</Text>
            <Text
              style={styles.label}>{`Employee name: ${employee.name}`}</Text>
          </View>
          {employee.role !== ROLE.CEO && (
            <View style={{flex: 1, justifyContent: 'space-between', margin: 6}}>
              <TouchableOpacity
                onPress={() => navigateToScreenWithData(employee, index)}>
                <Image
                  source={Images.icEdit}
                  tintColor={'black'}
                  style={styles.imageSize}
                />
              </TouchableOpacity>
              {employee.role === ROLE.TEAM_MEMBER && (
                <TouchableOpacity
                  onPress={() => deleteTeamMember(employee, indexes)}>
                  <Image
                    source={Images.icDelete}
                    tintColor={'black'}
                    style={styles.imageSize}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      )}

      {employee.children && (
        <View style={onlyEmployees ? styles.filteredChildren : styles.children}>
          <FlatList
            data={employee.children}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index: curentIndex}) => {
              const newIndexes = [...indexes, curentIndex];
              return (
                <EmployeeComponent
                  employee={item}
                  index={curentIndex}
                  indexes={newIndexes}
                  searchText={searchText}
                  onlyEmployees={onlyEmployees}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export {EmployeeComponent};

const styles = StyleSheet.create({
  topView: {
    marginTop: 8,
    marginBottom: 8,
  },
  childView: {
    marginBottom: 8,
  },
  labelContainer: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    borderColor: 'grey',
    padding: 6,
  },
  children: {
    marginLeft: 16,
  },
  filteredChildren: {
    marginLeft: 0,
  },
  imageSize: {width: 24, height: 24},
});
