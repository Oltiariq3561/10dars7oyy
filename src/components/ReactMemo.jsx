import React, { useState } from 'react';

const ChildComponent = React.memo(({ count }) => {
  console.log('ChildComponent qayta render bo\'ldi!');
  return <p>Count: {count}</p>;
});

const Reactmemo = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
        <h4>Bu misolda React.memo komponent qayta render bo'lishini oldini oladi, agar uning propslari o'zgarmasa</h4>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
      />
      <ChildComponent count={count} />
    </div>
  );
};

export default Reactmemo;