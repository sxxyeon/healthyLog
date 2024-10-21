import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

const DiaryProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resp = await axios.get(`${process.env.REACT_APP_JSON}/diary`, {
      cache: "no-store",
    });
    setData(resp.data);
    setIsLoading(false);
  };

  const onCreate = async (date, content, emotionId) => {
    const options = {
      date: new Date(date).getTime(),
      content: content,
      emotionId: emotionId,
    };
    await axios.post(`${process.env.REACT_APP_JSON}/diary`, options);
  };

  const onUpdate = async (id, date, content, emotionId) => {
    const options = {
      date: new Date(date).getTime(),
      content: content,
      emotionId: emotionId,
    };
    await axios.put(`${process.env.REACT_APP_JSON}/diary/${id}`, options);
  };

  const onDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_JSON}/diary/${id}`);
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onUpdate,
          onDelete,
        }}
      >
        {children}
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default DiaryProvider;
