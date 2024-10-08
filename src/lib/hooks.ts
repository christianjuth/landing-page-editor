import * as React from 'react';

export function useFetch({ 
  url 
}: {
  url: string;
}) {
  const [signal, setSignal] = React.useState(0);

  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const abortController = new AbortController();
    let locked = false;

    setLoading(true);

    fetch(url, {
      signal: abortController.signal
    })
      .then(res => res.json())
      .then(data => {
        if (locked) return;
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        if (locked) return;
        setError(error);
        setLoading(false);
      });

    return () => {
      locked = true;
      abortController.abort();
    }
  }, [url, signal]);

  return {
    data,
    loading,
    error,
    refresh: () => setSignal(signal + 1)
  }
}
