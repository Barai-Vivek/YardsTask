import {useDispatch} from 'react-redux';
import {AppDispatch} from '../type';

export const useAppDispatch = () => useDispatch<AppDispatch>();
