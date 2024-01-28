import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackParamList} from '../../Route';
import {useNavigation} from '@react-navigation/native';

export const useAppNavigation = () =>
  useNavigation<StackNavigationProp<NavigationStackParamList>>();
