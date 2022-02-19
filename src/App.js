import DiaryEditor from "./DiaryEditor";
import "./App.css";
import DiaryList from "./DiaryList";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const dummyList = [
    {
        id: 1,
        author: "김다윗",
        content: "하이 1",
        emotion: 5,
        created_date: new Date().getTime(),
    },
    {
        id: 2,
        author: "김다위",
        content: "하이 2",
        emotion: 3,
        created_date: new Date().getTime(),
    },
    {
        id: 3,
        author: "김대윗",
        content: "하이 3",
        emotion: 2,
        created_date: new Date().getTime(),
    },
    {
        id: 4,
        author: "김이윗",
        content: "하이 4",
        emotion: 1,
        created_date: new Date().getTime(),
    },
];

function App() {
    const [data, setData] = useState([]);

    const dataId = useRef(0);

    const getData = async () => {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/comments"
        ).then((res) => res.json());

        const initData = res.slice(0, 20).map((it) => {
            return {
                author: it.email,
                content: it.body,
                emotion: Math.floor(Math.random() * 5) + 1,
                created_date: new Date().getTime(),
                id: dataId.current++,
            };
        });
        setData(initData);
    };

    useEffect(() => {
        getData();
    }, []);

    const onCreate = useCallback((author, content, emotion) => {
        const created_date = new Date().getTime();
        const newItem = {
            author,
            content,
            emotion,
            created_date,
            id: dataId.current,
        };
        dataId.current += 1;
        setData([newItem, ...data]);
    }, []);

    const onRemove = useCallback((targetId) => {
        setData(data.filter((it) => it.id !== targetId));
    }, []);

    const onEdit = useCallback((targetId, newContent) => {
        setData((data) =>
            data.map((it) =>
                it.id === targetId ? { ...it, content: newContent } : it
            )
        );
    }, []);

    const getDiaryAnalysis = useMemo(() => {
        const goodCount = data.filter((it) => it.emotion >= 3).length;
        const badCount = data.length - goodCount;
        const goodRatio = Math.floor((goodCount / data.length) * 100);
        const realRatio = (goodCount / data.length) * 100;
        return { goodCount, badCount, goodRatio, realRatio };
    }, [data.length]);

    const { goodCount, badCount, goodRatio, realRatio } = getDiaryAnalysis;

    return (
        <div className="App">
            <DiaryEditor onCreate={onCreate} />
            <div>전체 일기 : {data.length}</div>
            <div>기분 좋은 일기 개수 : {goodCount}</div>
            <div>기분 나쁜 일기 개수 : {badCount}</div>
            <div>기분 좋은 일기 비율 : {goodRatio}</div>
            <div>realRatio : {realRatio}</div>
            <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
        </div>
    );
}

export default App;
