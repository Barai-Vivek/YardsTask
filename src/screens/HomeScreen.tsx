import React from 'react';
import {
  ADD_EMPLOYEE,
  ALL_EMPLOYEES,
  HIERARCHY,
  FilteredEmployeesScreen,
  HierarchyScreen,
  TEAM,
  TeamFormScreen,
  EmployeeFormScreen,
  HOME_SCREEN,
} from '..';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationRoutes, NavigationStackParamList} from '../Route';
import {Images} from '../assets';
import {createStackNavigator} from '@react-navigation/stack';
import {useAppNavigation} from '../redux';

const Stack = createStackNavigator<NavigationStackParamList>();

const HomeScreen = () => {
  const navigation = useAppNavigation();

  const handleAddEmployee = () => {
    // Navigate to the EmployeeForm screen
    navigation.navigate(NavigationRoutes.ADD_EMPLOYEE, {
      employee: undefined,
      indexes: undefined,
      addNewEmployee: true,
      fromScreen: HOME_SCREEN,
    });
  };

  return (
    <Stack.Navigator
      initialRouteName={NavigationRoutes.EMPLOYEES}
      screenOptions={{
        headerStyle: style.header,
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name={NavigationRoutes.EMPLOYEES}
        component={HierarchyScreen}
        options={{
          headerTitle: HIERARCHY,
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={handleAddEmployee}>
              <Image
                source={Images.icAdd}
                tintColor={'white'}
                style={{width: 30, height: 30, marginRight: 10}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={NavigationRoutes.FILTERED_EMPLOYEES}
        component={FilteredEmployeesScreen}
        options={{
          headerTitle: ALL_EMPLOYEES,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={NavigationRoutes.TEAM_FORM}
        component={TeamFormScreen}
        options={{
          headerTitle: TEAM,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={NavigationRoutes.ADD_EMPLOYEE}
        component={EmployeeFormScreen}
        options={{
          headerTitle: ADD_EMPLOYEE,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  header: {
    backgroundColor: 'purple',
  },
});
