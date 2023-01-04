import { useCallback, useState } from "react";

type UpdaterFn<TState> = (currentState: TState) => TState;

type Result<TState> = [
  state: TState,
  wrappedSetState: (update: TState | UpdaterFn<TState>) => void
];

type Options<TState> = {
  serializer?: (value: TState) => string;
  deserializer?: (value: string) => TState;
};

export function useLocalStorage<TState>(
  key: string,
  initialValue: TState,
  options?: Options<TState>
): Result<TState> {
  const serializer = options?.serializer ?? JSON.stringify;
  const deserializer = options?.deserializer ?? JSON.parse;

  const [state, setState] = useState<TState>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      console.error(error);

      return initialValue;
    }
  });

  const wrappedSetState = useCallback(
    (update: any) => {
      try {
        setState((currentState) => {
          const nextState =
            typeof update === "function" ? update(currentState) : update;

          window.localStorage.setItem(key, serializer(nextState));
          return nextState;
        });
      } catch (error) {
        console.error(error);
      }
    },
    [key]
  );

  return [state, wrappedSetState];
}
