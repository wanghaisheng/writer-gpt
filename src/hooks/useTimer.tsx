import { useEffect, useState } from "react";

import { MAX_MINUTE, SECONDS } from "@constants/question";

const useTimer = () => {
  const [timeCounter, setTimeCounter] = useState<number>(() => MAX_MINUTE);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeCounter(prevState =>
        prevState !== 0 ? prevState - 1 : prevState
      );
    }, 1 * SECONDS);

    return () => clearInterval(timer);
  }, []);

  return timeCounter;
};

export default useTimer;
