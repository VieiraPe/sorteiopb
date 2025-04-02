import DashboardNavbar from "../../components/dashboard/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <DashboardNavbar />
      <main className="pt-20 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
