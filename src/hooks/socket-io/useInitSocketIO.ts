import { useEffect, useRef } from 'react';
import { Subscription } from 'rxjs';
import SocketIOClient, { Socket } from 'socket.io-client';
// import { RootState } from 'store/root-store';

export const socketIOClient = (accessToken?: string) =>
  SocketIOClient(process.env.REACT_APP_URL_WS || '', {
    transports: ['websocket'],
    auth: {
      Authorization: `Bearer ${accessToken}`
    },
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5
  });

function useInitSocketIO() {
  const refSub = useRef<Subscription>();

  const ioClient = useRef<Socket>();

  useEffect(() => {
    const disconnect = () => {
      if (refSub.current) {
        refSub.current.unsubscribe();
      }
      if (ioClient.current) {
        ioClient.current.disconnect();
      }
    };
    const connect = async () => {
      disconnect();
    };
    connect();
    return disconnect;
  }, []);
}

export default useInitSocketIO;
