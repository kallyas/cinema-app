import React from "react";
import { Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { signIn } from "../../api/auth";
import useAuthStore from "../../store/useAuthStore";
import { getErrorMessage } from "../../lib/api";
import "./style.css";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

function Login() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const authMessage = useAuthStore((state) => state.authMessage);
  const setSession = useAuthStore((state) => state.setSession);
  const setAuthMessage = useAuthStore((state) => state.setAuthMessage);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      setSession({
        token: data.token,
        userData: data.userData,
        message: data.message,
      });
    },
    onError: (error) => {
      setAuthMessage(getErrorMessage(error, "Login failed."));
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/movies" replace />;
  }

  return (
    <div className="background-container pt-5">
      <div className="container">
        <h1 className="header">Login</h1>
        <form onSubmit={handleSubmit((values) => loginMutation.mutateAsync(values))}>
          <Input
            name="email"
            label="Email"
            type="email"
            error={errors.email?.message}
            iconClass="fas fa-envelope"
            placeholder="Please enter your email..."
            autoFocus
            {...register("email")}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            error={errors.password?.message}
            iconClass="fas fa-key"
            placeholder="Please enter your password..."
            {...register("password")}
          />
          {authMessage && <p className="text-white">{authMessage}</p>}
          <Button disabled={isSubmitting || loginMutation.isPending} type="submit" label="Login" />
        </form>
      </div>
    </div>
  );
}

export default Login;
