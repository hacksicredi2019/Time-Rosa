import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="bg-gray-200 p-2 min-h-screen flex flex-col">
      <div className="max-w-2xl mx-auto flex flex-col flex-1">
        <Header />
        {children}
      </div>
    </div>
  );
}
