import { CustomLink } from "@/components/customLink";
import { GradientContainer } from "@/components/gradientContainer";
import { NavBar } from "@/components/navBar";
import { DiscIcon } from "lucide-react";

const Home = () => {
  const features = [
    { title: "Organize Tasks", description: "Effortlessly manage your tasks." },
    { title: "Track Progress", description: "Use intuitive dashboards." },
    { title: "Collaborate", description: "Manage projects in real-time." },
  ];

  return (
    <GradientContainer>
      <div className="max-w-300 flex flex-col items-center  w-full mx-auto  ">
        <NavBar />
        <header className="flex flex-col justify-center items-center gap-4 mt-20 w-full">
          <h1 className="text-5xl font-medium text-center">
            Welcome to <span className="text-6xl italic font-bold">Taski</span>
          </h1>
          <p className="text-md">Your productivity companion!</p>
        </header>
        <section className="flex flex-col items-center gap-4 mt-4">
          <p className="text-lg font-light">
            Ready to boost your productivity?
          </p>
          <CustomLink link={{ pathname: "/projects" }}>
            <DiscIcon className="h-5 w-5" />
            Get Started
          </CustomLink>
        </section>
        <section className="flex flex-col items-center gap-6 mt-10">
          <h2 className="text-3xl font-semibold">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/9 text-white p-6 rounded-lg shadow-xl "
              >
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </GradientContainer>
  );
};
export default Home;
