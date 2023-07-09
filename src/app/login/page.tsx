"use client";
import React from "react";
import { Input, Button } from "react-daisyui";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

import { useSession, signIn, signOut } from "next-auth/react";

const LoginPage = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="max-w-md w-full mx-auto p-6 border border-gray-400 rounded-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {session && <button onClick={() => signOut()}>Sign out</button>}
        <div className="space-y-4">
          <Button
            className=""
            fullWidth
            startIcon={<FcGoogle size={24} />}
            onClick={() => signIn("google")}
          >
            Sign in with Google
          </Button>
          <Button
            fullWidth
            startIcon={<BsGithub size={24} />}
            onClick={() => signIn("github")}
          >
            Sign in wiht GitHub
          </Button>
        </div>
        <div className="text-center">
          <span className="text-gray-600">or login with</span>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              className="w-full"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              className="w-full"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-600 text-white"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
