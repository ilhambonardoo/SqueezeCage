import { useEffect, useState } from "react";

export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timeOut);
  }, []);
  return mounted;
}
