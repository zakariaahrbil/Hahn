import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

export const useAsyncAction = (onSuccess?: () => void) => {
  const execute = async (
    action: () => Promise<void>,
    successMessage: string,
    errorMessage: string
  ) => {
    try {
      await action();
      onSuccess?.();
      toast(successMessage, {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#9c35fd",
          color: "white",
          borderRadius: "8px",
          border: "none",
          fontSize: "16px",
        },
        icon: <CheckCircle className="w-5 h-5" />,
      });
    } catch {
      toast(errorMessage, {
        duration: 4000,
        position: "top-center",
        style: {
          background: "red",
          color: "white",
          borderRadius: "8px",
          border: "none",
          fontSize: "16px",
        },
      });
    }
  };

  return { execute };
};
