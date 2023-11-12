import { useCallback, useMemo, useRef, useState } from "react";

const useFetchPrefixes = (prefix, configuration) => {
  const [isLoading, setIsLoading] = useState(false);
  const [prefixes, setPrefixes] = useState([]);
  const [indexHtml, setIndexHtml] = useState(null);

  const pendingRequests = useRef([]);

  const url = useMemo(
    () =>
      `https://${configuration.domain}.${configuration.s3Domain}.amazonaws.com/?list-type=2&prefix=${prefix}&delimiter=%2F`,
    [configuration, prefix]
  );

  const abortPrevRequests = useCallback(() => {
    if (pendingRequests.current.length > 0) {
      pendingRequests.current.forEach((abortController) =>
        abortController.abort()
      );
    }
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    const abortController = new AbortController();

    abortPrevRequests();

    pendingRequests.current.push(abortController);

    try {
      const response = await fetch(url, {
        signal: abortController.signal,
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Failed to fetch bucket date", response);
      }

      const xmlStringData = await response.text();
      const parser = new DOMParser();
      const xmlDocument = parser.parseFromString(xmlStringData, "text/xml");
      const prefixes = xmlDocument.getElementsByTagName("Prefix");
      const keys = xmlDocument.getElementsByTagName("Key");
      let objectWithIndexHtml = null;
      Array.from(keys).forEach((key) => {
        if (key.textContent.includes("index.html")) {
          objectWithIndexHtml = key;
        }
      });

      setIndexHtml(objectWithIndexHtml);
      setPrefixes(Array.from(prefixes));
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch bucket data: ", error);
      setIsLoading(false);
    }
  }, [abortPrevRequests, url]);

  return {
    fetchData,
    isLoading,
    prefixes,
    indexHtml,
  };
};

export default useFetchPrefixes;
