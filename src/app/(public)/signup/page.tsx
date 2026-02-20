import { AuthLayout } from "@/components/auth/auth-layout";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Run your restaurant from anywhere"
      subtitle="Create your account to launch and manage operations."
    >
      <SignupForm />
    </AuthLayout>
  );
}
