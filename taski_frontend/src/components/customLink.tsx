import { Link, type Path } from "react-router-dom";

export const CustomLink = ({
  link,
  children
}: {
  link: Partial<Path>;
  children: React.ReactNode
}) => {
  return (
    <Link
      to={link}
      className="bg-white flex gap-2 items-center text-purple-950 px-4 py-2 rounded-lg font-medium hover:bg-white/90 cursor-pointer"
    >
      {children}
    </Link>
  );
};
