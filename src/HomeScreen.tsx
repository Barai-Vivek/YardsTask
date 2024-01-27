import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ADD_TEAM_MEMBER,
  ALL_EMPLOYEES,
  EMPLOYEES,
  FilteredEmployeesScreen,
  HierarchyScreen,
  TEAM,
  TeamFormScreen,
  EmployeeForm,
} from '.';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationRoutes, TabStackParamList} from './Route';
import {useNavigation} from '@react-navigation/native';
import {Images} from './assets';

const Stack = createNativeStackNavigator<TabStackParamList>();

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleAddTeamMember = () => {
    // Navigate to the EmployeeForm screen
    navigation.navigate(NavigationRoutes.ADD_TEAM_MEMBER as never);
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
          headerTitle: EMPLOYEES,
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={handleAddTeamMember}>
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
        name={NavigationRoutes.ADD_TEAM_MEMBER}
        component={EmployeeForm}
        options={{
          headerTitle: ADD_TEAM_MEMBER,
          headerTitleAlign: 'center',
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
    </Stack.Navigator>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  header: {
    backgroundColor: 'purple',
  },
});
