/* eslint-disable react/prop-types */

export default function Container(props) {
  return (
    <div className="w-3/4 min-h-3/4 border rounded-3xl self-center">
      {props.children}
    </div>
  );
}
