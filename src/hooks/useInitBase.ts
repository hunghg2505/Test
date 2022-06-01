import useInitSubject from './rxjs/useInitSubject';
import useInitSocketIO from './socket-io/useInitSocketIO';
import useInitDocument from './redux/document/useInitDocument';

export default function useInitBase() {
  useInitSubject();
  useInitSocketIO();
  useInitDocument();
}
