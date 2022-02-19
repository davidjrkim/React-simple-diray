import React, { useState, useEffect } from "react";

// const testisme = () => {
//     const [count, setCount] = useState(0);
//     const [text, setText] = useState("");

//     useEffect(() => {
//         console.log("mount!");
//     }, []);

//     useEffect(() => {
//         console.log("update");
//     });

//     useEffect(() => {
//         console.log(`count is updated : ${count}`);
//         if (count > 5) {
//             alert("count가 5를 넘었습니다. 따라서 1로 초기화합니다.");
//             setCount(1);
//         }
//     }, [count]);

//     useEffect(() => {
//         console.log(`text is updated : ${text}`);
//     }, [text]);

//     return (
//         <div style={{ padding: 20 }}>
//             <div>
//                 {count}
//                 <button onClick={() => setCount(count + 1)}>+</button>
//             </div>
//             <div>
//                 <input value={text} onChange={(e) => setText(e.target.value)} />
//             </div>
//         </div>
//     );
// };

const UnmountTest = () => {
    useEffect(() => {
        console.log("mount");

        return () => {
            console.log("unmount");
        };
    }, []);

    return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
    const [isVisible, setIsvisble] = useState(false);
    const toggle = () => setIsvisble(!isVisible);

    return (
        <div style={{ padding: 20 }}>
            <button onClick={toggle}>ON/OFF</button>
            {isVisible && <UnmountTest />}
        </div>
    );
};

export default Lifecycle;
