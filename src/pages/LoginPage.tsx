import AuthForm from "../features/auth/components/AuthForm";
import { useLogin } from "../features/auth/hooks/useLogin";

export default function LoginPage() {
  const { handleLogin, isLoading, error } = useLogin();
  async function onSubmit(values: { username: string; password: string }) {
    await handleLogin(values.username, values.password);
  }
  return (
    <div>
      {" "}
      <AuthForm
        title="Smart Stays, Simple Clicks."
        onSubmit={onSubmit}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
