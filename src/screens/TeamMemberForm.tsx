import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {departments, teams} from '../Constants';
import {EmployeeData, initialEmployeeData} from './types';
import {useDispatch} from 'react-redux';
import { addEmployee } from '../redux';

const TeamMemberForm = () => {
  const dispatch = useDispatch();

  const [employeeData, setEmployeeData] =
    useState<EmployeeData>(initialEmployeeData);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const handleInputChange = (field: keyof EmployeeData, value: string) => {
    setEmployeeData(prevData => ({...prevData, [field]: value}));
  };

  const handleAddTeamMember = () => {
    // Implement logic to add the team member
    console.log('Adding team member:', employeeData);
    dispatch(addEmployee(employeeData))
    console.log('Added team member:', employeeData);

    // Reset the form after adding the team member
    setEmployeeData(initialEmployeeData);
    setSelectedDepartment(null);
    setSelectedTeam(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Team Member</Text>
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
            setSelectedTeam(null); // Reset the team when changing the department
          }}
          style={styles.modalSelector}
          selectStyle={styles.modalSelectorSelect}
        />
      </View>
      {employeeData?.department && employeeData.department !== 'HR' && (
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Team</Text>
          <ModalSelector
            data={(teams[employeeData.department] || []).map(team => ({
              key: team,
              label: team,
            }))}
            initValue={selectedTeam || 'Select Team'}
            onChange={option => {
              handleInputChange('team', option.key);
              setSelectedTeam(option.key);
            }}
            style={styles.modalSelector}
            selectStyle={styles.modalSelectorSelect}
          />
        </View>
      )}
      <Button title="Add Team Member" onPress={handleAddTeamMember} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
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
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  pickerContainer: {
    marginBottom: 16,
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
});

export {TeamMemberForm};
