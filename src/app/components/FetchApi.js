import { useState } from "react";

const useFetchApi = (url, method) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApi = async (from) => {
    setLoading(true);
    setError(null);

    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Only attach body for non-GET requests
      if (method !== "GET") {
        options.body = JSON.stringify({ from });
      }

      const response = await fetch(
        method === "GET" ? `${url}?from=${from}` : url,
        options
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchApi };
};

export default useFetchApi;
