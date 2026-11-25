import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">{children}</div>
    </div>
  );
}

export default Layout;
