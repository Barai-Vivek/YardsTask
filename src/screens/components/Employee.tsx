import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ROLE, moderateScale} from '../../Constants';
import {EmployeeData, EmployeeProps} from '../types';
import {useNavigation} from '@react-navigation/native';
import {NavigationRoutes} from '../../Route';
import {useAppDispatch} from '../../redux/hook/useAppDispatch';
import {hierarchyActions} from '../../redux/hierachyRedux/hierarchySlice';

const Employee = ({employee, index, indexes}: EmployeeProps) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  console.log({indexes});

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

  return (
    <View style={index === 0 ? styles.nodeTop : styles.node}>
      <View
        style={[
          styles.labelContainer,
          {flexDirection: 'row', justifyContent: 'space-between'},
        ]}>
        <View style={{width: '90%'}}>
          <Text style={styles.label}>{`Position: ${employee.role}`}</Text>
          <Text style={styles.label}>
            {`Employee name: ${employee.name}`} {index}
          </Text>
        </View>
        {employee.role !== ROLE.CEO && (
          <View style={{flex: 1, justifyContent: 'space-between', margin: 6}}>
            <TouchableOpacity
              onPress={() => navigateToScreenWithData(employee, index)}>
              <Image
                source={require('../../assets/images/ic_edit.png')}
                tintColor={'black'}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>
            {employee.role === ROLE.TEAM_MEMBER && (
              <TouchableOpacity
                onPress={() => deleteTeamMember(employee, indexes)}>
                <Image
                  source={require('../../assets/images/ic_delete.png')}
                  tintColor={'black'}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {employee.children && (
        <View style={styles.children}>
          <FlatList
            data={employee.children}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index: curentIndex}) => {
              const newIndexes = [...indexes, curentIndex];
              return (
                <Employee
                  employee={item}
                  index={curentIndex}
                  indexes={newIndexes}
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

export {Employee};

const styles = StyleSheet.create({
  nodeTop: {
    marginTop: 8,
    marginBottom: 8,
  },
  node: {
    marginBottom: 8,
  },
  labelContainer: {
    borderWidth: 1,
    borderRadius: moderateScale(4),
    padding: moderateScale(6),
  },
  label: {
    fontSize: 18,
    borderColor: 'grey',
    padding: moderateScale(6),
  },
  children: {
    marginLeft: 16,
  },
});
