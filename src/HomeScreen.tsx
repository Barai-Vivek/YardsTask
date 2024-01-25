import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import {EmployeesScreen, TeamMemberForm} from '.';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationRoutes, TabStackParamList} from './Route';

const Stack = createNativeStackNavigator<TabStackParamList>();

const HomeScreen = () => {
  const handleAddTeamMember = () => {
    // Navigate to the TeamMemberForm screen
    //props.navigation.navigate("ADD TEAM MEMBER");
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
        component={EmployeesScreen}
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
    </Stack.Navigator>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  header: {
    backgroundColor: 'purple',
  },
});
