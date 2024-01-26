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
import {ROLE, departments, roles} from '../Constants';
import {EmployeeData, initialEmployeeData} from './types';
import {useDispatch, useSelector} from 'react-redux';
import {selectTeamData, selectTeamLeader} from '../redux/selector';
import {teamMemberActions} from '../redux';

const TeamMemberForm = () => {
  const dispatch = useDispatch();

  const [employeeData, setEmployeeData] =
    useState<EmployeeData>(initialEmployeeData);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const [showError, setShowError] = useState(false);
  const [errMessage, setErrorMessage] = useState('');

  // Selector to get teams based on selected department
  const teamsForSelectedDepartment = useSelector(
    selectTeamData(selectedDepartment ?? ''),
  );

  const teamLeaderExists = useSelector(
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
      console.log('Adding team member:', employeeData);
      if (teamLeaderExists && employeeData.role === ROLE.TEAM_LEADER) {
        setErrorMessage('Already team leader exists');
        setShowError(true);
      } else if (!teamLeaderExists && employeeData.role === ROLE.TEAM_MEMBER) {
        setErrorMessage('There should be alteast 1 Team Leader in team');
        setShowError(true);
      } else {
        dispatch(teamMemberActions.addTeamMember(employeeData));
        console.log('Added team member:', employeeData);

        // Reset the form after adding the team member
        setEmployeeData(initialEmployeeData);
        setSelectedDepartment(null);
        setSelectedRole(null);
        setSelectedTeam(null);
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
      (selectedRole === 'TEAM LEADER' || selectedRole === 'TEAM MEMBER') &&
      !selectedTeam
    ) {
      setErrorMessage('Please select team.');
      return false;
    }

    // Check if name, employee ID, phone number, and email are filled
    if (
      !employeeData.name ||
      !employeeData.id ||
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
        <Text style={styles.heading}>Add Team Member</Text>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Department</Text>
          <ModalSelector
            data={departments.map(dep => ({key: dep, label: dep}))}
            initValue={selectedDepartment || 'Select Department'}
            onChange={option => {
              setEmployeeData(prevData => ({
                ...prevData,
                department: option.key,
                team: '',
              }));
              setSelectedDepartment(option.key);
              setSelectedRole(null); // Reset
              setSelectedTeam(null); // Reset
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
                onChange={option => {
                  setEmployeeData(prevData => ({
                    ...prevData,
                    role: option.key,
                  }));
                  setSelectedRole(option.key);
                  setSelectedTeam(null); // Reset
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
        {selectedDepartment &&
          selectedRole &&
          (selectedRole === ROLE.HEAD || selectedTeam) && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={value => handleInputChange('name', value)}
                value={employeeData?.name ?? ''}
              />
              <TextInput
                style={styles.input}
                placeholder="Employee ID"
                onChangeText={value => handleInputChange('id', value)}
                value={employeeData?.id ?? ''}
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
              <Button title="Add Team Member" onPress={handleAddTeamMember} />
            </>
          )}
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

export {TeamMemberForm};
