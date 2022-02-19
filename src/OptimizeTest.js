import React, { useEffect, useState } from "react";

// const Textview = React.memo(({ text }) => {
//     useEffect(() => {
//         console.log(`Update :: Text ${text}`);
//     });

//     return <div>{text}</div>;
// });

// const CountView = React.memo(({ count }) => {
//     useEffect(() => {
//         console.log(`Update :: count ${count}`);
//     }, [count]);
//     return <div>{count}</div>;
// });

// const OptimizeTest = () => {
//     const [count, setCount] = useState(1);
//     const [text, setText] = useState("");
//     return (
//         <div style={{ padding: 50 }}>
//             <div>
//                 <h2>count</h2>

//                 <CountView count={count} />
//                 <button onClick={() => setCount(count + 1)}>+</button>
//             </div>
//             <div>
//                 <h2>text</h2>
//                 <Textview text={text} />
//                 <input value={text} onChange={(e) => setText(e.target.value)} />
//             </div>
//         </div>
//     );
// };

const CounterA = React.memo(({ count }) => {
    useEffect(() => {
        console.log(`Counter A update - count : ${count}`);
    });

    return <div>{count}</div>;
});

const Counterb = ({ obj }) => {
    useEffect(() => {
        console.log(`Counter B update - Count : ${obj.count}`);
    });
    return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
    if (prevProps.obj.count === nextProps.obj.count) {
        return true;
    }
    return false;
};

const MemoizedCounterB = React.memo(Counterb, areEqual);

const OptimizeTest = () => {
    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count: 1,
    });
    return (
        <div style={{ padding: 50 }}>
            <div>
                <h2>Counter a</h2>
                <CounterA count={count} />
                <button onClick={() => setCount(count)}>a button</button>
            </div>
            <div>
                <h2>counter b</h2>
                <MemoizedCounterB obj={obj} />
                <button
                    onClick={() =>
                        setObj({
                            count: obj.count,
                        })
                    }
                >
                    b button
                </button>
            </div>
        </div>
    );
};

export default OptimizeTest;
