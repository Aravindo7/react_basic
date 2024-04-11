import React, {useState} from 'react'

const State = () => {
     const [count, setCount] = useState(0);

     const incrementCount = () => {
       setCount(count + 1);
    };
    console.log("after increment ", State);
    return (
      <div>
        <h1>Count: {count}</h1>
        <button onClick={incrementCount}>Increment</button>
      </div>
    );
}

export default State;
