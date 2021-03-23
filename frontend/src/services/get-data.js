import { useEffect, useState } from "react";

const GetData = (url)=> {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        fetch(url, { signal: abortCont.signal })
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            setData(data);
            setLoading(false);
        })
        .catch((err) => {
            setErr(err.message);
        });
            
        return () => abortCont.abort();
    }, [url]);

    return {data, loading, err};
}

export default GetData;