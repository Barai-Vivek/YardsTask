import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HierarchyScreen, TeamMemberForm} from '.';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationRoutes, TabStackParamList} from './Route';
import {useNavigation} from '@react-navigation/native';
import {AllMembersScreen} from './screens/AllMembersScreen';
import {FilteredEmployeesScreen} from './screens/FilteredEmployeesScreen';
import {TeamFormScreen} from './screens/TeamFormScreen';

const Stack = createNativeStackNavigator<TabStackParamList>();

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleAddTeamMember = () => {
    // Navigate to the TeamMemberForm screen
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
          headerTitle: 'Employees',
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={handleAddTeamMember}>
              <Image
                source={require('./assets/images/ic_add.png')}
                tintColor={'white'}
                style={{width: 30, height: 30, marginRight: 10}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={NavigationRoutes.ADD_TEAM_MEMBER}
        component={TeamMemberForm}
        options={{
          headerTitle: 'Add Team Member',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={NavigationRoutes.FILTERED_EMPLOYEES}
        component={FilteredEmployeesScreen}
        options={{
          headerTitle: 'All Employees',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={NavigationRoutes.TEAM_FORM}
        component={TeamFormScreen}
        options={{
          headerTitle: 'Team',
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
