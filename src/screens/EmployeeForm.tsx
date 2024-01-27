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
  ADD_TEAM_MEMBER,
  EDIT_TEAM_MEMBER,
  ROLE,
  departments,
  generateUUID,
  roles,
} from '../Constants';
import {EmployeeData, initialEmployeeData} from './types';
import {EmployeeFormProps} from '..';
import {useNavigation} from '@react-navigation/native';
import {
  hierarchyActions,
  selectTeamData,
  selectTeamLeader,
  useAppDispatch,
  useAppSelector,
} from '../redux';
import {ToggleButton} from './components';

const EmployeeForm = ({route}: EmployeeFormProps) => {
  const employee = route.params?.employee;
  const index = route.params?.indexes;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const title =
    typeof index === 'undefined' ? ADD_TEAM_MEMBER : EDIT_TEAM_MEMBER;

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
  const [isEnabled, setIsEnabled] = useState(
    typeof index === 'undefined' ? true : false,
  );
  const [showError, setShowError] = useState(false);
  const [errMessage, setErrorMessage] = useState('');

  // Selector to get teams based on selected department
  const teamsForSelectedDepartment = useAppSelector(
    selectTeamData(selectedDepartment ?? ''),
  );

  const teamLeaderExists = useAppSelector(
    selectTeamLeader(selectedDepartment ?? '', selectedTeam ?? ''),
  );

  useEffect(() => {
    setShowError(false);
  }, [selectedTeam, selectedRole, selectedDepartment]);

  const handleInputChange = (field: keyof EmployeeData, value: string) => {
    setShowError(false);
    setEmployeeData(prevData => ({...prevData, [field]: value}));
  };

  const handleAddTeamMember = () => {
    setShowError(false);
    if (isFormValid()) {
      // Implement logic to add the team member
      if (typeof index === 'undefined') {
        if (teamLeaderExists && employeeData.role === ROLE.TEAM_LEADER) {
          setErrorMessage('Already team leader exists');
          setShowError(true);
        } else if (
          !teamLeaderExists &&
          employeeData.role === ROLE.TEAM_MEMBER
        ) {
          setErrorMessage('There should be alteast 1 Team Leader in team');
          setShowError(true);
        } else {
          employeeData.id = generateUUID();
          if (isEnabled) {
            dispatch(hierarchyActions.addEmployee(employeeData));
          }

          // Reset the form after adding the team member
          setEmployeeData(initialEmployeeData);
          setSelectedDepartment(null);
          setSelectedRole(null);
          setSelectedTeam(null);
        }
      } else {
        //you are editing some data
        dispatch(
          hierarchyActions.editEmployeeByIndex({
            employee: employeeData,
            indexes: index,
          }),
        );
        navigation.goBack();
      }
    } else {
      setShowError(true);
    }
  };

  const isFormValid = () => {
    if (isEnabled) {
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
        (selectedRole === 'TEAM LEADER' || selectedRole === 'TEAM MEMBER') &&
        !selectedTeam
      ) {
        setErrorMessage('Please select team.');
        return false;
      }
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
    return true;
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
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={value => handleInputChange('phoneNumber', value)}
          value={employeeData?.phoneNumber ?? ''}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={value => handleInputChange('email', value)}
          value={employeeData?.email ?? ''}
          keyboardType="email-address"
        />
        {typeof index === 'undefined' && (
          <ToggleButton
            label="Add the member to department?"
            isEnabled={isEnabled}
            toggleSwitch={() => setIsEnabled(previousState => !previousState)}
          />
        )}
        {isEnabled && (
          <>
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Department</Text>
              <ModalSelector
                data={departments.map(dep => ({key: dep, label: dep}))}
                initValue={selectedDepartment || 'Select Department'}
                disabled={typeof index !== 'undefined' ? true : false}
                onChange={option => {
                  setEmployeeData(prevData => ({
                    ...prevData,
                    department: option.key,
                    team: '',
                  }));
                  setSelectedDepartment(option.key);
                  if (typeof index === 'undefined') {
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
                <View style={styles.pickerContainer}>
                  <Text style={styles.label}>Role</Text>
                  <ModalSelector
                    data={roles.map(role => ({key: role, label: role}))}
                    initValue={selectedRole || 'Select Role'}
                    disabled={typeof index !== 'undefined' ? true : false}
                    onChange={option => {
                      setEmployeeData(prevData => ({
                        ...prevData,
                        role: option.key,
                      }));
                      setSelectedRole(option.key);
                      if (typeof index === 'undefined') {
                        setSelectedTeam(null); // Reset
                      }
                    }}
                    style={styles.modalSelector}
                    selectStyle={styles.modalSelectorSelect}
                  />
                </View>
                {(selectedRole === 'TEAM LEADER' ||
                  selectedRole === 'TEAM MEMBER') && (
                  <View style={styles.pickerContainer}>
                    <Text style={styles.label}>Team</Text>
                    <ModalSelector
                      data={(teamsForSelectedDepartment || []).map(team => ({
                        key: team,
                        label: team,
                      }))}
                      disabled={typeof index !== 'undefined' ? true : false}
                      initValue={selectedTeam || 'Select Team'}
                      onChange={option => {
                        setEmployeeData(prevData => ({
                          ...prevData,
                          team: option.key,
                        }));
                        setSelectedTeam(option.key);
                      }}
                      style={styles.modalSelector}
                      selectStyle={styles.modalSelectorSelect}
                    />
                  </View>
                )}
              </>
            )}
          </>
        )}
        {!isEnabled ||
        (isEnabled &&
          selectedDepartment &&
          selectedRole &&
          (selectedRole === ROLE.HEAD || selectedTeam)) ? (
          <>
            <Button title={title} onPress={handleAddTeamMember} />
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
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
});

export {EmployeeForm};
