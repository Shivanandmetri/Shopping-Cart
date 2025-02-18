import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';
import {
  initLoadingState,
  loadingReducer,
} from '../reducers/loadingReducers';

export const loadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, loadingDispatch] = useReducer(
    loadingReducer,
    initLoadingState,
  );

  const value = useMemo(
    () => ({ loading, loadingDispatch }),
    [loading],
  );

  return (
    <loadingContext.Provider value={value}>
      {children}
    </loadingContext.Provider>
  );
}

LoadingProvider.protoTypes = {
  children: PropTypes.node.isRequired,
};

export const useloading = () => useContext(loadingContext);
