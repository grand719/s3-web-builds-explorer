import { useCallback } from "react";

/* eslint-disable react/prop-types */
const Prefix = (props) => {
  const onPrefixClickHandler = useCallback(() => {
    window.location.hash = "#" + props.prefixName;
  }, [props.prefixName]);

  return (
    <div
      className={`flex flex-row text-${
        props.pathPrefix ? "xl" : "lg"
      } text-gray-400 flex-nowrap cursor-pointer ${
        props.pathPrefix && "font-bold"
      }`}
    >
      <a
        className="block hover:text-gray-600 transition-all duration-150 mx-2"
        onClick={onPrefixClickHandler}
      >
        {props.pathPrefix ? props.name : props.name + " /"}
      </a>
      {props.pathPrefix && <p>/</p>}
    </div>
  );
};
export default Prefix;
