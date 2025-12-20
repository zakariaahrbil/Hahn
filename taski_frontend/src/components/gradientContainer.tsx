

export const GradientContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen w-full flex flex-col bg-linear-to-tl from-[#9c35fd] via-[#29004f]  to-[#10001f]  text-white px-4">
      {children}
    </main>
  );
};
