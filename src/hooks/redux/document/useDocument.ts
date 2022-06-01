import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'utils/redux-store';
import { changeDocument } from './reducer';

function useDocument() {
  const document = useSelector((state: RootState) => state.document);
  const dispatch = useDispatch();

  const setTitle = (title: string) => {
    if (title && document.title !== title) {
      const action = changeDocument({ title });
      dispatch(action);
    }
  };
  return { document, setTitle };
}

export default useDocument;
