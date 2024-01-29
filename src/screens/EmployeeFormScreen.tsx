import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  EMPLOYEE_COMPONENT_SCREEN,
  ROLE,
  TEAM_FORM_SCREEN,
  departments,
  generateUUID,
  roles,
} from '../Constants';
import {
  EmployeeData,
  UpdateEmployee,
  initialEmployeeData,
  validateEmail,
} from './types';
import {EmployeeFormProps} from '..';
import {
  hierarchyActions,
  selectTeamData,
  selectTeamLeader,
  useAppDispatch,
  useAppSelector,
} from '../redux';

const EmployeeFormScreen = ({route, navigation}: EmployeeFormProps) => {
  const employee = route.params?.employee;
  const index = route.params?.indexes;
  const addNewEmployee = route.params?.addNewEmployee;
  const fromScreen = route.params?.fromScreen;
  const teamData = route.params?.teamData;

  const dispatch = useAppDispatch();

  const title = addNewEmployee ? ADD_EMPLOYEE : EDIT_EMPLOYEE;

  const [employeeData, setEmployeeData] = useState<EmployeeData>(
    employee ?? initialEmployeeData,
  );
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    employee?.department ?? null,
  );
  const [selectedRole, setSelectedRole] = useState<string | null>(
    employee?.role ?? null,
  );
  const [selectedTeam, setSelectedTeam] = useState<string | null>(
    employee?.team ?? null,
  );
  const [showError, setShowError] = useState(false);
  const [errMessage, setErrorMessage] = useState('');

  const [editTeamIndex, setEditTeamIndex] = useState<number[]>([]);
  const [newTeamLeader, setNewTeamLeader] = useState<any>(null);
  const [newTeamLeaderIndexes, setNewTeamLeaderIndexes] = useState<number[]>(
    [],
  );

  // Selector to get teams based on selected department
  const teamsForSelectedDepartment =
    fromScreen === TEAM_FORM_SCREEN
      ? [teamData!.name]
      : useAppSelector(selectTeamData(selectedDepartment ?? ''));

  const teamLeaderExists = useAppSelector(
    selectTeamLeader(selectedDepartment ?? '', selectedTeam ?? ''),
  );

  useEffect(() => {
    if (
      selectedDepartment &&
      fromScreen !== TEAM_FORM_SCREEN &&
      teamsForSelectedDepartment?.length === 0
    ) {
      setErrorMessage(`There is no teams in ${selectedDepartment}`);
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [selectedTeam, selectedRole, selectedDepartment]);

  const handleInputChange = (field: keyof EmployeeData, value: string) => {
    setShowError(false);
    setEmployeeData(prevData => ({...prevData, [field]: value}));
  };

  const handleAddTeamAndEmployee = async () => {
    //Add Team at index
    await dispatch(
      hierarchyActions.addTeam({
        employee: teamData!,
        indexes: index,
      }),
    );

    //Add Team leader at index
    await dispatch(
      hierarchyActions.addEmployeeByIndex({
        employee: newTeamLeader,
        indexes: newTeamLeaderIndexes,
      }),
    );

    const newTeamMemberIndex = [...(newTeamLeaderIndexes ?? []), 0];
    await dispatch(
      hierarchyActions.addEmployeeByIndex({
        employee: employeeData,
        indexes: newTeamMemberIndex,
      }),
    );

    navigation.pop(2);
  };

  const handleAddEmployee = () => {
    setShowError(false);
    if (isFormValid()) {
      // Implement logic to add the team member
      if (addNewEmployee) {
        if (teamLeaderExists && employeeData.role === ROLE.TEAM_LEADER) {
          setErrorMessage('Already team leader exists');
          setShowError(true);
        } else if (
          !teamLeaderExists &&
          fromScreen !== TEAM_FORM_SCREEN &&
          employeeData.role === ROLE.TEAM_MEMBER
        ) {
          setErrorMessage('There should be alteast 1 Team Leader in team');
          setShowError(true);
        } else {
          employeeData.id = generateUUID();
          if (fromScreen === TEAM_FORM_SCREEN) {
            if (!newTeamLeader) {
              const newTeamLeaderIndex = [...(index ?? []), 0];
              employeeData.children = [];
              setNewTeamLeaderIndexes(newTeamLeaderIndex ?? []);
              setNewTeamLeader(employeeData);

              // Reset the form after adding the team member
              const newEmployee: EmployeeData = {
                id: '',
                name: '',
                role: ROLE.TEAM_MEMBER,
                department: employeeData.department,
                team: employeeData.team,
                children: [],
              };
              setEmployeeData(newEmployee);
              setSelectedDepartment(employeeData.department ?? '');
              setSelectedRole(ROLE.TEAM_MEMBER);
              setSelectedTeam(employeeData.team ?? '');
            } else if (newTeamLeader && teamData) {
              handleAddTeamAndEmployee();
            }
          } else if (fromScreen === EMPLOYEE_COMPONENT_SCREEN) {
            dispatch(
              hierarchyActions.addEmployeeByIndex({
                employee: employeeData,
                indexes: index,
              }),
            );
            navigation.goBack();
          } else {
            dispatch(hierarchyActions.addEmployee(employeeData));

            // Reset the form after adding the team member
            setEmployeeData(initialEmployeeData);
            setSelectedDepartment(null);
            setSelectedRole(null);
            setSelectedTeam(null);
          }
        }
      } else {
        //you are editing some data
        //Team member has changed the team
        const updatedData: UpdateEmployee = {
          employee: employeeData,
          indexes: index,
        };
        if (editTeamIndex.length > 0) {
          updatedData.indexes = editTeamIndex;
          if (index && index.length == 5) {
            updatedData.oldTeamIndex = index[2];
            updatedData.teamMemberOldIndex = index[4];
          }
        }

        dispatch(hierarchyActions.editEmployeeByIndex(updatedData));
        navigation.goBack();
      }
    } else {
      setShowError(true);
    }
  };

  const isFormValid = () => {
    // Check if department is selected
    if (!selectedDepartment) {
      setErrorMessage('Please select department.');
      return false;
    }

    // Check if role is selected
    if (!selectedRole) {
      setErrorMessage('Please select role.');
      return false;
    }

    // Check if team is selected (if applicable based on the selected role)
    if (
      (selectedRole === ROLE.TEAM_LEADER ||
        selectedRole === ROLE.TEAM_MEMBER) &&
      !selectedTeam
    ) {
      setErrorMessage('Please select team.');
      return false;
    }

    // Check if name,phone number, and email are filled
    if (
      !employeeData.name ||
      !employeeData.phoneNumber ||
      !employeeData.email
    ) {
      setErrorMessage('Please fill out all required fields correctly.');
      return false;
    }

    if (employeeData.email && !validateEmail(employeeData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const disableModalSelector = () => {
    return (
      !addNewEmployee ||
      fromScreen === EMPLOYEE_COMPONENT_SCREEN ||
      fromScreen === TEAM_FORM_SCREEN
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {showError && <Text style={styles.errorTxt}>{errMessage}</Text>}
        <Text style={styles.heading}>{title}</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={value => handleInputChange('name', value)}
          value={employeeData?.name ?? ''}
          placeholderTextColor="gray"
          cursorColor={'gray'}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={value => handleInputChange('phoneNumber', value)}
          value={employeeData?.phoneNumber ?? ''}
          keyboardType="phone-pad"
          placeholderTextColor="gray"
          cursorColor={'gray'}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={value => handleInputChange('email', value)}
          value={employeeData?.email ?? ''}
          keyboardType="email-address"
          placeholderTextColor="gray"
          cursorColor={'gray'}
        />
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Department</Text>
          <ModalSelector
            data={departments.map(dep => ({key: dep, label: dep}))}
            initValue={selectedDepartment || 'Select Department'}
            disabled={disableModalSelector()}
            initValueTextStyle={styles.modalSelectorSelectedLabel}
            onChange={option => {
              setEmployeeData(prevData => ({
                ...prevData,
                department: option.key,
                team: '',
              }));
              setSelectedDepartment(option.key);
              if (addNewEmployee) {
                setSelectedRole(null); // Reset
                setSelectedTeam(null); // Reset
              }
            }}
            style={styles.modalSelector}
            selectStyle={styles.modalSelectorSelect}
          />
        </View>
        {selectedDepartment && (
          <>
            {teamsForSelectedDepartment &&
              teamsForSelectedDepartment.length > 0 &&
              selectedRole !== ROLE.HEAD &&
              selectedRole !== ROLE.CEO &&
              selectedRole !== ROLE.TEAM && (
                <View style={styles.pickerContainer}>
                  <Text style={styles.label}>Team</Text>
                  <ModalSelector
                    data={(teamsForSelectedDepartment || []).map(
                      (team: string, index: number) => ({
                        key: team,
                        label: team,
                        keyIndex: index,
                      }),
                    )}
                    disabled={
                      fromScreen === TEAM_FORM_SCREEN ||
                      (fromScreen === EMPLOYEE_COMPONENT_SCREEN &&
                        employee?.role !== ROLE.TEAM_MEMBER)
                    }
                    initValue={selectedTeam || 'Select Team'}
                    onChange={option => {
                      if (index && index.length >= 3) {
                        let changedIndex = [...index];
                        changedIndex?.splice(2, 1, option.keyIndex);
                        setEditTeamIndex(changedIndex);
                      }
                      setEmployeeData(prevData => ({
                        ...prevData,
                        team: option.key,
                      }));
                      setSelectedTeam(option.key);
                      if (addNewEmployee && !disableModalSelector()) {
                        setSelectedRole(null); // Reset
                      }
                    }}
                    initValueTextStyle={styles.modalSelectorSelectedLabel}
                    style={styles.modalSelector}
                    selectStyle={styles.modalSelectorSelect}
                  />
                </View>
              )}

            {selectedTeam &&
              selectedRole !== ROLE.HEAD &&
              selectedRole !== ROLE.CEO &&
              selectedRole !== ROLE.TEAM && (
                <View style={styles.pickerContainer}>
                  <Text style={styles.label}>Role</Text>
                  <ModalSelector
                    data={roles.map(role => ({key: role, label: role}))}
                    initValue={selectedRole || 'Select Role'}
                    disabled={disableModalSelector()}
                    onChange={option => {
                      setEmployeeData(prevData => ({
                        ...prevData,
                        role: option.key,
                      }));
                      setSelectedRole(option.key);
                    }}
                    initValueTextStyle={styles.modalSelectorSelectedLabel}
                    style={styles.modalSelector}
                    selectStyle={styles.modalSelectorSelect}
                  />
                </View>
              )}
          </>
        )}

        {selectedDepartment &&
        selectedRole &&
        (selectedRole === ROLE.HEAD || selectedTeam) ? (
          <>
            <Button title={title} onPress={handleAddEmployee} />
          </>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    color: 'black',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: 'gray',
  },
  pickerContainer: {
    marginBottom: 12,
  },
  modalSelector: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    padding: 1,
    borderColor: 'gray',
  },
  modalSelectorSelect: {
    borderColor: 'transparent',
  },
  errorTxt: {
    fontSize: 16,
    marginBottom: 16,
    color: 'red',
    textAlign: 'left',
  },
  modalSelectorSelectedLabel: {
    color: 'black',
  },
});

export {EmployeeFormScreen};
