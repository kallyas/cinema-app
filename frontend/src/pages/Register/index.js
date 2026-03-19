import React from "react";
import { Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { signUp } from "../../api/auth";
import useAuthStore from "../../store/useAuthStore";
import { getErrorMessage } from "../../lib/api";

const registerSchema = z
  .object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    passwordRepeat: z.string().min(1, "Please repeat your password."),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "The passwords do not match.",
    path: ["passwordRepeat"],
  });

function RegisterForm() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const authMessage = useAuthStore((state) => state.authMessage);
  const setSession = useAuthStore((state) => state.setSession);
  const setAuthMessage = useAuthStore((state) => state.setAuthMessage);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordRepeat: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ email, password }) => signUp({ email, password }),
    onSuccess: (data) => {
      setSession({
        token: data.token,
        userData: data.userData,
        message: data.message,
      });
    },
    onError: (error) => {
      setAuthMessage(getErrorMessage(error, "Registration failed."));
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/movies" replace />;
  }

  return (
    <div className="background-container pt-5">
      <div className="container">
        <h1 className="header">Register Form</h1>
        <form
          onSubmit={handleSubmit(({ email, password }) =>
            registerMutation.mutateAsync({ email, password })
          )}
        >
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
            label="Password"
            type="password"
            error={errors.password?.message}
            iconClass="fas fa-key"
            placeholder="Please enter your password..."
            {...register("password")}
          />
          <Input
            name="passwordRepeat"
            type="password"
            label="Repeat Password"
            error={errors.passwordRepeat?.message}
            iconClass="fas fa-key"
            placeholder="Repeat your password..."
            {...register("passwordRepeat")}
          />
          {authMessage && <p className="bg-info text-white">{authMessage}</p>}
          <Button
            type="submit"
            label="Sign Up"
            disabled={isSubmitting || registerMutation.isPending}
          />
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
