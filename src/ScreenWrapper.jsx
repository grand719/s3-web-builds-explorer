/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import {memo, useMemo} from 'react';

import useScreenScale from './hooks/useScreenScale';

const ScreenWrapper = memo(({ children }) => {
    const { width, height, scale } = useScreenScale();
    const containerStyle = useMemo(
      () => ({
        position: "absolute",
        width,
        height,
        minHeight: height,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }),
      [height, scale, width]
    );
    return (
      <div
        style={containerStyle}
        className="flex grow flex-col w-full min-h-full overflow-x-hidden justify-center items-center"
      >
        {children}
      </div>
    );
  });

  export default ScreenWrapper;