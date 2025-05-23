
export function meta({}: any) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Task Manager!</h1>
      <p className="text-gray-600">This is your dashboard. Select a board to begin.</p>
    </div>
  );
}

export default Home;