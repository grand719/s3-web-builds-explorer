/* eslint-disable react/prop-types */
const FileRedirect = (props) => {

  return (
    <div className={`flex flex-row text-"lg" text-gray-400 flex-nowrap cursor-pointer`}>
      <a className="block hover:text-gray-600 transition-all duration-150 mx-2" href={props.link} target="_blank" rel="noreferrer">
        {props.name}
      </a>
    </div>
  )
}

export default FileRedirect