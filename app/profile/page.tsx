"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div
        className="flex justify-center items-center min-h-screen 
        bg-white dark:bg-[#140d05] transition-colors"
      >
        <span className="text-gray-700 dark:text-amber-400 animate-pulse">
          Loading your profile...
        </span>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4
        bg-white dark:bg-[#140d05] transition-colors"
      >
        <Card
          className="w-full max-w-md text-center shadow-xl 
          border border-gray-200 dark:border-amber-700/40
          bg-white dark:bg-[#1c1208]"
        >
          <CardHeader>
            <CardTitle
              className="text-2xl font-serif 
              text-gray-900 dark:text-amber-400"
            >
              Access Required
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Please sign in to view your LegalEase profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              asChild
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-20 transition-colors
      bg-gradient-to-br 
      from-white via-gray-50 to-white
      dark:from-[#140d05] dark:via-[#1a1208] dark:to-[#140d05]"
    >
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1
            className="text-3xl sm:text-4xl font-serif font-bold 
            text-gray-900 dark:text-amber-400"
          >
            Your Legal Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Manage your account and explore AI-powered legal insights tailored
            to the Indian justice system.
          </p>
        </div>

        {/* Profile Card */}
        <Card
          className="shadow-2xl backdrop-blur-sm
          border border-gray-200 dark:border-amber-700/40
          bg-white/80 dark:bg-[#1c1208]/80"
        >
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle
                className="text-xl font-semibold
                text-gray-900 dark:text-amber-400"
              >
                Account Details
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Your registered information on LegalEase.
              </CardDescription>
            </div>

            <UserButton afterSignOutUrl="/" />
          </CardHeader>

          <CardContent className="space-y-6 text-sm sm:text-base">
            <div
              className="flex justify-between border-b 
              border-gray-200 dark:border-amber-800/40 pb-3"
            >
              <span className="font-medium text-gray-600 dark:text-gray-400">
                Full Name
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {user.fullName || "-"}
              </span>
            </div>

            <div
              className="flex justify-between border-b 
              border-gray-200 dark:border-amber-800/40 pb-3"
            >
              <span className="font-medium text-gray-600 dark:text-gray-400">
                Email
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {user.primaryEmailAddress?.emailAddress || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-400">
                Member Since
              </span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            className="border-amber-600 text-amber-600 
              hover:bg-amber-50 
              dark:hover:bg-amber-900/20"
          >
            <Link href="/">Explore Legal Tools</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
