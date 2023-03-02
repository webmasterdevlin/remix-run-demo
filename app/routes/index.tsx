import React from "react";

export default function Home() {
  const [count, setCount] = React.useState<number | null>(0);

  return (
    <>
      <div className="flex w-screen flex-row items-center justify-center">
        <h1>Remix Run</h1>
      </div>
      <div>
        <button className="btn" onClick={() => setCount((prev) => prev + 1)}>
          Click me
        </button>
        <div>
          <p>Count: {count}</p>
        </div>
      </div>
    </>
  );
}
