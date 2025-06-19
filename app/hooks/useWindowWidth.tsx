import React from "react";

export function useWindowWidth() {
  const [width, setWidth] =React.useState<Number>(100);

  React.useEffect(() => {
    if (window) {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return width;
}
