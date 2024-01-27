import React, {useState} from 'react';
import {View, Switch, Text, StyleSheet} from 'react-native';

interface ToggleProps {
  isEnabled: boolean;
  label: string;
  toggleSwitch: (param: boolean) => void;
}

const ToggleButton = ({isEnabled, label, toggleSwitch}: ToggleProps) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Switch
        trackColor={{false: '#767577', true: 'puple'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      {/* <Text>{isEnabled ? 'ON' : 'OFF'}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});

export {ToggleButton};
