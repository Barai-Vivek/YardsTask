import React from 'react';
import {EmployeeNodeProps} from './types';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {moderateScale} from '../../Constants';

const EmployeeNode = ({node, index}: EmployeeNodeProps) => {
  return (
    <View style={index === 0 ? styles.nodeTop : styles.node}>
      <Text style={styles.label}>
        {node.position}: {node.name}
      </Text>
      {node.children && (
        <View style={styles.children}>
          <FlatList
            data={node.children}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <EmployeeNode node={item} index={index} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export {EmployeeNode};

const styles = StyleSheet.create({
  nodeTop: {
    marginTop: 8,
    marginBottom: 8,
  },
  node: {
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: moderateScale(4),
    padding: moderateScale(6),
  },
  children: {
    marginLeft: 16,
  },
});
