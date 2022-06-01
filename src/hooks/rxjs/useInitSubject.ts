import { useEffect } from 'react';
import { Subject } from 'rxjs';

export enum SubjectType {}

export type EventSubscribe = { type: string; data: any };
export const subject = new Subject();

export default function useInitSubject() {
  useEffect(() => {
    const subscribe = subject.subscribe();
    return () => subscribe.unsubscribe();
  }, []);
}
