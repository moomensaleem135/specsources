'use client';

import * as React from 'react';

export const useTypingEffect = (
  textToType: string,
  interKeyStrokeDurationMs: number,
  setNewMessage: React.Dispatch<React.SetStateAction<string>>,
  setNewMessageTimestamp: React.Dispatch<React.SetStateAction<string>>
) => {
  // states
  const [currentPosition, setCurrentPosition] = React.useState(0);

  const currentPositionRef = React.useRef(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPosition((value) => value + 1);
      currentPositionRef.current += 1;

      if (currentPositionRef.current > textToType.length) {
        clearInterval(intervalId);
        // Typing effect completed, setNewMessage to null
        if (setNewMessage) {
          setNewMessage('');
          setNewMessageTimestamp('');
        }
      }
    }, interKeyStrokeDurationMs);

    return () => {
      clearInterval(intervalId);
      currentPositionRef.current = 0;
      setCurrentPosition(0);
    };
  }, [
    interKeyStrokeDurationMs,
    textToType,
    setNewMessage,
    setNewMessageTimestamp,
  ]);

  return textToType.substring(0, currentPosition);
};
