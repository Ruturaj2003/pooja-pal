"use client";

import { trpc } from "@/trpc/client";

const TestComponent = () => {
  const greeting = trpc.hello.useQuery({
    text: "Ray",
  });
  if (!greeting.data) return <div>Loading...</div>;

  const testy = trpc.dotex.useQuery();
  console.log(testy);

  return (
    <div>
      {greeting.data.greeting}

      <ul className="bg-black text-white">
        {testy.data?.map((item) => (
          <h1 key={item.id}>{item.name}</h1>
        ))}
      </ul>
    </div>
  );
};

export default TestComponent;
