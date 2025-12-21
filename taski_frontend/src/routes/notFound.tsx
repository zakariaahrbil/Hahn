import { Link, useNavigate } from "react-router-dom";
import { GradientContainer } from "@/components/gradientContainer";
import { HomeIcon, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <GradientContainer>
      <div className="max-w-300 flex flex-col items-center justify-center w-full h-full m-auto pt-8">
        <div className="text-center text-white">
          <div className="text-9xl mb-4">404</div>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-lg mb-8 text-white/70">
            The page you're looking for doesn't exist.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/projects")}
              className="inline-flex items-center gap-2 cursor-pointer bg-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Go to Projects
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white text-purple-950 px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              <HomeIcon className="w-5 h-5" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </GradientContainer>
  );
};

export default NotFound;
