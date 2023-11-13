import { useCallback, useMemo } from "react";
import moment from "moment";

/* eslint-disable react/prop-types */
const FileRedirect = (props) => {
  const onPressHandler = useCallback(() => {
    window.open(props.link, "_blank");
  }, [props.link]);

  const date = useMemo(() => {
    const data = moment(props.date);
    return data.format("DD.MM.YYYY HH:mm");
  }, [props.date]);

  return (
    <div
      onClick={onPressHandler}
      className="flex grow flex-row  text-lg flex-nowrap justify-between cursor-pointer hover:text-gray-600 text-gray-400 transition-all duration-150 mx-2"
    >
      <p href={props.link}>{props.name}</p>
      <p>{date}</p>
    </div>
  );
};

export default FileRedirect;
