import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale} from '../../Constants';
import {TeamMemberDetails, TeamMemberProp} from '../types';
import {useNavigation} from '@react-navigation/native';
import {NavigationRoutes} from '../../Route';

const Member = ({member, index}: TeamMemberProp) => {
  const navigation = useNavigation();

  // Define the function to navigate to another screen with data
  const navigateToScreenWithData = (
    item: TeamMemberDetails,
    position: number,
  ) => {
    navigation.navigate(NavigationRoutes.ADD_TEAM_MEMBER, {
      employee: item,
      index: position,
    });
  };

  return (
    <View style={index === 0 ? styles.nodeTop : styles.node}>
      <TouchableOpacity
        onPress={() => navigateToScreenWithData(member, index)}
        disabled={true}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{`Position: ${
            member.role || 'Un assigned'
          }`}</Text>
          <Text style={styles.label}>{`Employee name: ${member.name}`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export {Member};

const styles = StyleSheet.create({
  nodeTop: {
    marginTop: 8,
    marginBottom: 8,
  },
  node: {
    marginBottom: 8,
  },
  labelContainer: {
    borderWidth: 1,
    borderRadius: moderateScale(4),
    padding: moderateScale(6),
  },
  label: {
    fontSize: 18,
    borderColor: 'grey',
    padding: moderateScale(6),
  },
  children: {
    marginLeft: 16,
  },
});
