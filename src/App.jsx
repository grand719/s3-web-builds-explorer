import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

import useFetchPrefixes from "./hooks/useFetchPrefixes";
import Prefix from "./Prefix";
import PathHistory from "./PathHistory";
import Container from "./Container";
import ScreenWrapper from "./ScreenWrapper";
import FileRedirect from "./FileRedirect";
import Title from "./Title";

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [configuration, setConfiguration] = useState(undefined);

  useLayoutEffect(() => {
    fetch("/assets/configuration.json")
      .then((response) => response.json())
      .then((data) => {
        setConfiguration(data);
      })
      .catch((error) => {
        console.log("Failed to fetch configuration, error: ", error);
      });
  }, []);

  const { isLoading, fetchData, prefixes, indexHtml } = useFetchPrefixes(
    currentHash.substring(1),
    configuration
  );

  const getName = (name) => {
    const splitName = name.split("/");
    if (splitName.length > 2) {
      return splitName[splitName.length - 2];
    } else {
      return splitName[0];
    }
  };

  const onHashChange = useCallback(() => {
    setCurrentHash(window.location.hash);
  }, []);

  useEffect(() => {
    fetchData();

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [fetchData, onHashChange]);

  return !configuration ? (
    <ScreenWrapper>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-400/30 flex justify-center items-center">
        <HashLoader color="#7E22CE" loading={true} size={50} />
      </div>
    </ScreenWrapper>
  ) : (
    <ScreenWrapper>
      <Container>
        <Title>{configuration.domain}</Title>
        <PathHistory currentHashPath={currentHash} />
        <div className="m-2">
          {prefixes.map((prefix, index) => {
            return (
              <Prefix
                key={index}
                prefixName={prefix.textContent}
                name={index === 0 ? "" : getName(prefix.textContent)}
              />
            );
          })}
          {indexHtml && (
            <FileRedirect
              link={
                "https://" +
                configuration.buildPrefix +
                "." +
                configuration.buildDomain +
                "/" +
                indexHtml.getElementsByTagName("Key")[0].textContent
              }
              name="index.html"
              date={
                indexHtml.getElementsByTagName("LastModified")[0].textContent
              }
            />
          )}
        </div>
      </Container>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-400/30 flex justify-center items-center">
          <HashLoader color="#7E22CE" loading={isLoading} size={50} />
        </div>
      )}
    </ScreenWrapper>
  );
}

export default App;
