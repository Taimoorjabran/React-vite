import React, { useState, useEffect } from "react";


export const debouncedSearch = (query: string, delay: number) => {
  const [data, setData] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setData(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    }
  }, [query, delay])

  return data;
};

export const throttled = (value: any, delay: number) => {
  const [data, setData] = useState('');
  const [lastRun, setlastRun] = useState(Date.now());

  useEffect(() => {
    const now = Date.now();
    const remaining = delay - (now - lastRun);
    if (remaining <= 0) {
      setData(value);
      setlastRun(now);
    } else {
      const handler = setTimeout(() => {
        setData(value);
        setlastRun(Date.now());
      }, remaining);
      return () => {
        clearTimeout(handler);
      }
    }
  }, [value, delay, lastRun])

  return data;
};


export const DebounceThrottle = () => {
  const [data, setData] = useState('');
  const [scroll, setScroll] = useState('');
  
  const throttledScroll = throttled(scroll, 2000)

  const deb = debouncedSearch(data, 2000);
  console.log(deb);
  console.log(scroll);

  useEffect(() => { 
    const handleScroll = () => {
      setScroll(window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ scroll]);
  return (
    <div style={{ height: '200vh', padding: '20px' }}>
      <input type='text' onChange={(e) => setData(e.target.value)} />
      <p>{deb}</p>
      <p>Scroll: {throttledScroll} </p>
    </div>
  )
};
