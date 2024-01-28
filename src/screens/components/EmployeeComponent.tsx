import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {EMPLOYEE_COMPONENT_SCREEN, ROLE} from '../../Constants';
import {EmployeeData, EmployeeProps} from '../types';
import {NavigationRoutes} from '../../Route';
import {Images} from '../../assets';
import {
  hierarchyActions,
  selectAllowDeleteTeamMember,
  useAppDispatch,
  useAppNavigation,
  useAppSelector,
} from '../../redux';

const EmployeeComponent = ({
  employee,
  index,
  indexes,
  searchText = '',
  onlyEmployees = false,
}: EmployeeProps) => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  // Define the function to navigate to another screen with data
  const navigateToScreenWithData = (item: EmployeeData) => {
    if (item.role === ROLE.TEAM) {
      navigation.navigate(NavigationRoutes.TEAM_FORM, {
        employee: item,
        indexes: indexes,
        addTeam: false,
      });
    } else {
      navigation.navigate(NavigationRoutes.ADD_EMPLOYEE, {
        employee: item,
        indexes: indexes,
        addNewEmployee: false,
        fromScreen: EMPLOYEE_COMPONENT_SCREEN,
      });
    }
  };

  const navigateToAddNewEmployee = (item: EmployeeData) => {
    let newRole = ROLE.TEAM_MEMBER;
    let team = item.team;
    if (item.role === ROLE.TEAM) {
      newRole = ROLE.TEAM_LEADER;
      team = item.name;
    }

    const newEmployee: EmployeeData = {
      id: '',
      name: '',
      role: newRole,
      department: item.department,
      team: team,
      children: [],
    };

    navigation.navigate(NavigationRoutes.ADD_EMPLOYEE, {
      employee: newEmployee,
      indexes: indexes,
      addNewEmployee: true,
      fromScreen: EMPLOYEE_COMPONENT_SCREEN,
    });
  };

  const checkThisAllow =
    employee.role === ROLE.TEAM_MEMBER
      ? useAppSelector(
          selectAllowDeleteTeamMember(employee.department, employee.team),
        )
      : false;

  const deleteTeamMember = (item: EmployeeData, position: number[]) => {
    dispatch(
      hierarchyActions.deleteEmployeeByIndex({
        employee: item,
        indexes: position,
      }),
    );
  };

  const addTeam = (item: EmployeeData, position: number[]) => {
    // Create a new object based on the original item, so you don't mutate the original object
    const newTeam: EmployeeData = {
      name: '',
      id: '',
      department: item.department,
      role: ROLE.TEAM,
      children: [],
    };

    navigation.navigate(NavigationRoutes.TEAM_FORM, {
      employee: newTeam,
      indexes: indexes,
      addTeam: true,
    });
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
            {(employee.role !== ROLE.TEAM && (
              <>
                <Text style={styles.label}>{`Position: ${employee.role}`}</Text>
                <Text
                  style={
                    styles.label
                  }>{`Employee name: ${employee.name}`}</Text>
              </>
            )) || (
              <>
                <Text style={styles.boldLabel}>{ROLE.TEAM}</Text>
                <Text style={styles.label}>{employee.name}</Text>
              </>
            )}
          </View>
          {employee.role !== ROLE.CEO && (
            <View style={{flex: 1, justifyContent: 'space-between', margin: 6}}>
              <TouchableOpacity
                onPress={() => navigateToScreenWithData(employee)}>
                <Image
                  source={Images.icEdit}
                  tintColor={'black'}
                  style={styles.imageSize}
                />
              </TouchableOpacity>
              {(employee.role === ROLE.HEAD ||
                (employee.role === ROLE.TEAM &&
                  (employee.children ?? []).length === 0) ||
                employee.role === ROLE.TEAM_LEADER) && (
                <TouchableOpacity
                  onPress={() =>
                    employee.role === ROLE.HEAD
                      ? addTeam(employee, indexes)
                      : navigateToAddNewEmployee(employee)
                  }>
                  <Image
                    source={Images.icAdd}
                    tintColor={'black'}
                    style={styles.imageSize}
                  />
                </TouchableOpacity>
              )}
              {checkThisAllow && employee.role === ROLE.TEAM_MEMBER && (
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
  boldLabel: {
    fontSize: 18,
    borderColor: 'grey',
    padding: 6,
    fontWeight: 'bold',
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
