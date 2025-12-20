import { useAuth } from "@/auth/authContext";
import { GradientContainer } from "@/components/gradientContainer";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type loginFormDataType = {
  email: string;
  password: string;
};

export const Login = () => {
  const [show, setShow] = useState(false);
  const { login, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<loginFormDataType>();

  const onSubmit = async (data: loginFormDataType) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
    } catch (err: any) {
      setError("root", {
        message: err.message,
      });
    }
  };

  return (
    <GradientContainer>
      <div className="max-w-100 flex flex-col items-center justify-center w-full h-full mx-auto ">
        <h1 className="text-5xl font-normal text-center  leading-14">
          Login to your <span className=" italic font-bold">Taski</span> space
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-10 w-full max-w-md bg-white/9 backdrop-blur-lg  text-white font-light px-8 py-10  rounded-2xl shadow-xl"
        >
          <div className="flex flex-col">
            {errors.root && (
              <p className="text-red-400 mt-1">{errors.root.message}</p>
            )}
            <label className="font-medium mb-2">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="m@example.com"
              className={`px-4 py-2 rounded-lg focus:outline-none border  ${
                errors.email
                  ? "border-red-400"
                  : "border-white/50 focus:border-white"
              } `}
            />
            {errors.email && (
              <p className="text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center gap-2">
              <label className="font-medium mb-2">Password</label>
              {show ? (
                <EyeIcon
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setShow(false)}
                />
              ) : (
                <EyeClosedIcon
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setShow(true)}
                />
              )}
            </div>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type={show ? "text" : "password"}
              placeholder=""
              className={`px-4 py-2 rounded-lg focus:outline-none border  ${
                errors.password
                  ? "border-red-400"
                  : "border-white/50 focus:border-white"
              } `}
            />
            {errors.password && (
              <p className="text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-white text-purple-950 px-6 py-3 rounded-lg font-medium hover:bg-white/90 cursor-pointer"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </GradientContainer>
  );
};
