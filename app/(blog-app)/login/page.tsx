import LoginForm from "@/components/ui/dashboard/login-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
};
export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex justify-center h-20 w-full items-end rounded-lg bg-pink-500 p-3 md:h-36  md:text-3xl text-white">
          Hello!
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
