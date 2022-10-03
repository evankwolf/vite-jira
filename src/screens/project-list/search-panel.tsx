// import { useState } from "react"

// const Example = () => {
//   const [name, setName] = useState('aha')

//   return (
//     <form action="">
//       <div className="panel-container">
//         { name }
//       </div>
//       <button onClick={() => setName('wdnmd')}>变更名字</button>
//     </form>
//   )
// }

import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// import React, { useState } from 'react';

// function Example() {
//   // 声明一个叫 “count” 的 state 变量。
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//     </div>
//   );
// }

export default Example