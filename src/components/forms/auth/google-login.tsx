import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";

interface GoogleLoginProps {
  isLoading: boolean;
  isSubmitting: boolean;
  type: "register" | "login";
  setIsLoading: (isLoading: boolean) => void;
}

export function GoogleLogin({ isSubmitting, isLoading, type, setIsLoading }: GoogleLoginProps) {
  const handleGoogleLogin = useCallback(() => {
    setIsLoading(true);
    signIn("google");
  }, [setIsLoading]);

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleGoogleLogin}
      disabled={isSubmitting || isLoading}
    >
      {isLoading && <Loader className="me-3 animate-spin" />}

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="me-2 size-5">
        <path
          fill="#EA4335"
          d="M5.27 9.76A7.08 7.08 0 0 1 16.42 6.5L19.9 3A11.97 11.97 0 0 0 1.24 6.65z"
        />
        <path
          fill="#34A853"
          d="M16.04 18.01A7.4 7.4 0 0 1 12 19.1a7.08 7.08 0 0 1-6.72-4.82l-4.04 3.06A11.96 11.96 0 0 0 12 24a11.4 11.4 0 0 0 7.83-3z"
        />
        <path
          fill="#4A90E2"
          d="M19.83 21c2.2-2.05 3.62-5.1 3.62-9 0-.7-.1-1.47-.27-2.18H12v4.63h6.44a5.4 5.4 0 0 1-2.4 3.56l3.8 2.99Z"
        />
        <path
          fill="#FBBC05"
          d="M5.28 14.27a7.12 7.12 0 0 1-.01-4.5L1.24 6.64A11.9 11.9 0 0 0 0 12c0 1.92.44 3.73 1.24 5.33z"
        />
      </svg>

      {type === "register" ? "Registrarse con Google" : "Acceder con Google"}
    </Button>
  );
}
