/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useMemo } from 'react';
import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';

export const useIsMounted = () => {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback(() => isMounted.current, [])
};

export function useActions(actions, deps) {
  const dispatch = useDispatch();

  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map(a => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    deps ? [dispatch, ...deps] : [dispatch],
  );
}
