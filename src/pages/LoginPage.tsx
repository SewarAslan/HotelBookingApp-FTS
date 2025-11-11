import AuthForm from "../features/auth/components/AuthForm";
import { useAuthActions } from "../features/auth/hooks/useAuthActions";

export default function LoginPage() {
  const { handleLogin, loading, error } = useAuthActions();

  async function onSubmit(values: { username: string; password: string }) {
    await handleLogin(values.username, values.password);
  }
  return (
    <>
      <AuthForm
        title="Smart Stays, Simple Clicks."
        onSubmit={onSubmit}
        isLoading={loading}
        error={error}
      />
    </>
  );
}
