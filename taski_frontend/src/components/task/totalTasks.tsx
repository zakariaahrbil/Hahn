
export const TotalTasks = ({ total }: { total: number }) => {
  return (
    <div className=" flex flex-col justify-center items-center gap-2  bg-white/9 backdrop-blur-lg rounded-2xl px-12 py-4 shadow-xl ">
      <div className="bg-white/20 px-4 py-3 rounded-2xl">
        <span className="text-6xl font-semibold">{total}</span>
      </div>
      <div className="flex flex-col items-center text-white">
        <h2 className="text-md font-bold">Total Tasks</h2>
      </div>
    </div>
  );
};