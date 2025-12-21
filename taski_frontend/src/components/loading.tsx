import { Spinner } from "./ui/spinner"

export const Loading = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-2 bg-linear-to-tl from-[#9c35fd] via-[#29004f]  to-[#10001f]  text-white px-4">
      <Spinner className="size-14 text-white/90"></Spinner>
    </div>
  );
}
