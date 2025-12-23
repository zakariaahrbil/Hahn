import { useAuth } from "@/auth/authContext";
import { GradientContainer } from "@/components/gradientContainer";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft, EyeClosedIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

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
  const { isAuthenticated } = useAuth();
  const router = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      router("/projects");
    }
  }, []);



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
      <div className="max-w-100 flex flex-col items-center justify-center m-auto">
        <h1 className="text-5xl font-normal text-center  leading-14">
          Login to your <span className=" italic font-bold">Taski</span> space
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-10 w-full max-w-md bg-white/9 text-white font-light px-8 py-10  rounded-2xl shadow-xl"
        >
          <div className="flex flex-col">
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
              className={`px-4 py-2 rounded-lg focus:outline-none border ${
                errors.email || errors.root
                  ? "border-red-400"
                  : "border-white/50 focus:border-white"
              } bg-white/10 text-white `}
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
                errors.password || errors.root
                  ? "border-red-400"
                  : "border-white/50 focus:border-white"
              } bg-white/10 text-white`}
            />
            {errors.password && (
              <p className="text-red-400 mt-1">{errors.password.message}</p>
            )}
            {errors.root && (
              <p className="text-red-400 mt-1">{errors.root.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`flex justify-center items-center gap-2 bg-white text-purple-950 px-4 py-2 rounded-lg font-medium hover:bg-white/90 cursor-pointer 
                 disabled:bg-white/70`}
          >
            {isLoading ? (
              <>
                <Spinner className="size-4" />
                Login
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <Link
          to="/"
          className="inline-flex items-center gap-2  px-6 py-3 rounded-lg font-medium mt-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Home
        </Link>
      </div>
    </GradientContainer>
  );
};
