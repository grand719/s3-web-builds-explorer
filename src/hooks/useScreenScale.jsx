import { useCallback, useEffect, useMemo, useState } from "react";

const baseWidth = 1440;
const baseHeight = 694;

const baseAspectRatio = baseWidth / baseHeight;

const getBaseSize = (width, height) => {
  if (width >= baseWidth && height >= baseHeight) {
    return { width, height, scale: 1 };
  }

  const aspectRatio = width / height;

  return aspectRatio > baseAspectRatio
    ? {
        width: baseHeight * aspectRatio,
        height: baseHeight,
        scale: height / baseHeight,
      }
    : {
        width: baseWidth,
        height: baseWidth / aspectRatio,
        scale: width / baseWidth,
      };
};

function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const updateScreenDimensions = useCallback(() => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateScreenDimensions);
    return () => {
      window.removeEventListener("resize", updateScreenDimensions);
    };
  }, [updateScreenDimensions]);

  return screenSize;
}

function useScreenScale() {
  const [screenDimensions, setScreenDimensions] =
    useState({
      height: baseHeight,
      width: baseWidth,
      scale: 1,
    });

  const screenSize = useScreenSize();

  const screenDimension = useMemo(
    () => getBaseSize(screenSize.width, screenSize.height),
    [screenSize]
  );

  useEffect(() => {
    setScreenDimensions({ ...screenDimension });
  }, [screenDimension, screenSize]);

  const screenDimensionsMapped = useMemo(
    () => ({
      width: screenDimensions.width,
      height: screenDimensions.height,
      scale: screenDimensions.scale,
    }),
    [screenDimensions]
  );

  return screenDimensionsMapped;
}

export default useScreenScale;
