import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {
  ROLE,
  generateUUID,
  departments,
  roles,
  TeamProps,
  ADD_TEAM,
  EDIT_TEAM,
} from '..';
import {EmployeeData, initialEmployeeData} from './types';
import {hierarchyActions, useAppDispatch} from '../redux';

const TeamFormScreen = ({route}: TeamProps) => {
  const employee = route.params?.employee;
  const index = route.params?.indexes;
  const addTeam = route.params?.addTeam;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  console.log({index});

  const title = addTeam ? ADD_TEAM : EDIT_TEAM;

  const [employeeData, setEmployeeData] = useState<EmployeeData>(
    employee ?? initialEmployeeData,
  );
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    employee?.department ?? null,
  );
  const selectedRole = ROLE.TEAM;
  // const [selectedTeam, setSelectedTeam] = useState<string | null>(
  //   employee?.team ?? null,
  // );

  const [showError, setShowError] = useState(false);
  const [errMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setShowError(false);
  }, [selectedRole, selectedDepartment]);

  const handleInputChange = (field: keyof EmployeeData, value: string) => {
    setShowError(false);
    setEmployeeData(prevData => ({...prevData, [field]: value}));
  };

  const handleAddTeamMember = () => {
    setShowError(false);
    if (isFormValid()) {
      // Implement logic to add the team
      if (addTeam) {
        employeeData.id = generateUUID();
        dispatch(
          hierarchyActions.addTeam({
            employee: employeeData,
            indexes: index,
          }),
        );
      } else {
        //you are editing some data
        dispatch(
          hierarchyActions.editEmployeeByIndex({
            employee: employeeData,
            indexes: index,
          }),
        );
      }
      navigation.goBack();
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

    // Check if name,phone number, and email are filled
    if (!employeeData.name) {
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
                }}
                style={styles.modalSelector}
                selectStyle={styles.modalSelectorSelect}
              />
            </View>
          </>
        )}
        {selectedDepartment && selectedRole ? (
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

export {TeamFormScreen};
