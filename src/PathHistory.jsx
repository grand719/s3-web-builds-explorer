/* eslint-disable react/prop-types */
import {useMemo} from 'react'
import Prefix from './Prefix';

export default function PathHistory({currentHashPath}) {
  const historyLinks = useMemo(() => {
    const currentPaths = currentHashPath.substring(1).split("/");

    return currentPaths.reduce((accumulator, path, index) => {
      if (path) {
        const pathLink = currentPaths.slice(0, index + 1);
        accumulator.push({
          name: path,
          prefixName: pathLink.join("/") + "/",
        });
      }
      return accumulator;
    }, []);
  },[currentHashPath])

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
    }}
    className='m-2'
    >
      <Prefix pathPrefix prefixName="" name="Home"/>
      {historyLinks.map((link, index) => <Prefix key={index} pathPrefix prefixName={link.prefixName} name={link.name}/>)}
    </div>
  )
}
