import React, { useState, useMemo } from 'react';

const Usememo = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const expensiveCalculation = useMemo(() => {
    console.log('Qimmatli hisoblash bajarilmoqda');
    let total = 0;
    for (let i = 0; i < 1e6; i++) {
      total += count;
    }
    return total;
  }, [count]);

  return (
    <div>
        <h4>Bu misolda useMemo qimmatli hisoblash operatsiyasini faqatgina zarurat tug'ilganda qayta bajaradi.</h4>
      <h1>Count: {count}</h1>
      <h2>Expensive Result: {expensiveCalculation}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
      />
    </div>
  );
};

export default Usememo;
