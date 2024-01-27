import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../type';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
