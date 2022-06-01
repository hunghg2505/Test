import { changeDocument } from './reducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

function useInitDocument() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(changeDocument({ isNotFound: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
}

export default useInitDocument;
