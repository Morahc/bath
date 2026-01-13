import LoginForm from "@/components/dashboard/login-form";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ControlPanel() {
  return (
    <div className="h-svh flex justify-center items-center">
      <LoginForm />
    </div>
  );
}
