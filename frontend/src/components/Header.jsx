import { Link } from "react-router-dom";
import { RectangleEllipsis } from "lucide-react"; // You can use any icon library or image

function Header() {
  return (
    <header className="w-full bg-white/10 backdrop-blur-md text-white shadow-md fixed top-0 z-20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center relative">
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl font-semibold"
        >
          <RectangleEllipsis size={34} color="red" />
          <span className="text-2xl">Pass-Pilot</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
