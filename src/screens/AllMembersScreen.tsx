import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {selectMembersData} from '../redux/selector';
import {Member} from './components/Member';
import {useAppSelector} from '../redux/hook/useAppSelector';

const AllMembersScreen = () => {
  const membersData = useAppSelector(selectMembersData);

  console.log({membersData});

  return (
    <View style={styles.container}>
      <FlatList
        data={membersData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          return <Member member={item} index={index} />;
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export {AllMembersScreen};
