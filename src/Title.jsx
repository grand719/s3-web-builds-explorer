/* eslint-disable react/prop-types */

function Title(props) {
  return (
    <div className='text-4xl text-white font-bold bg-purple-700 w-full rounded-t-3xl p-2'>{props.children}</div>
  )
}

export default Title