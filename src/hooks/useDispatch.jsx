import { useCallback } from 'react';
import { useError } from '../context/errorContecxt';
import { useloading } from '../context/loadingContext';

const useDispatch = (dispatch) => {
  const { errorDispatch } = useError();
  const { loadingDispatch } = useloading();

  const generateType = useCallback((type, loadingId) => {
    if (loadingId) {
      return `${type}_${loadingId}`;
    }
    return type;
  }, []);

  const loadDispatch = useCallback(({ type, payload, loadingId }) => {
    loadingDispatch({
      type: generateType(type, loadingId),
      payload,
    });
    errorDispatch({ type: generateType(type, loadingId) });
  }, [generateType]);

  const succecssDispatch = useCallback(
    ({ type, payload, loadingId }) => {
      dispatch({
        type: generateType(type, loadingId),
        payload,
      });
      loadingDispatch({
        type: generateType(type, loadingId),
      });
    },
    [generateType],
  );

  const errDispatch = useCallback(({ type, payload, loadingId }) => {
    loadingDispatch({ type: generateType(type, loadingId) });
    errorDispatch({
      type: generateType(type, loadingId),
      payload,
    });
  }, [generateType]);

  return {
    loadDispatch,
    succecssDispatch,
    errDispatch,
  };
};
export default useDispatch;
