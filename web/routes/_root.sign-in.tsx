import { useActionForm } from "@gadgetinc/react";
import { Link, useLocation, useNavigate, useOutletContext } from "@remix-run/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { api } from "../api";
import { RootOutletContext } from "../root";

export default function Login() {
  const { gadgetConfig } = useOutletContext<RootOutletContext>();
  const navigate = useNavigate();
  const {
    submit,
    register,
    formState: { errors, isSubmitting },
  } = useActionForm(api.user.signIn, {
    onSuccess: () =>
      navigate(gadgetConfig.authentication!.redirectOnSuccessfulSignInPath!),
  });
  const { search } = useLocation();

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "rgb(254, 249, 225)", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "420px", backgroundColor: "rgb(254, 249, 225)" }}>
        <div style={{ marginTop: "2rem" }}>
          <Card style={{ padding: "2rem", backgroundColor: "rgb(229, 208, 172)", color: "rgb(254, 249, 225)" }}>
            <form onSubmit={submit}>
              <div style={{ marginBottom: "1.5rem" }}>
                <h1 style={{ color: "rgb(163, 29, 29)", fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1rem" }}>
                  Login
                </h1>
                <Button
                  variant="outline"
                  size="lg"
                  style={{ width: "100%", backgroundColor: "rgb(254, 249, 225)", color: "rgb(163, 29, 29)" }}
                  asChild
                >
                  <a href={`/auth/google/start${search}`}>
                    <img
                      style={{ marginRight: "0.5rem", height: "1rem", width: "1rem" }}
                      src="https://assets.gadget.dev/assets/default-app-assets/google.svg"
                      alt="Google logo"
                    />
                    Continue with Google
                  </a>
                </Button>
                <Separator />
                <div style={{ marginTop: "1.5rem" }}>
                  <div style={{color: "rgb(163, 29, 29)", marginBottom: "1rem" }}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      autoComplete="off"
                      {...register("email")}
                      style={errors?.user?.email?.message ? { borderColor: "red" } : undefined}
                    />
                    {errors?.user?.email?.message && (
                      <p style={{ fontSize: "0.875rem", color: "red" }}>
                        {errors.user.email.message}
                      </p>
                    )}
                  </div>
                  <div style={{color: "rgb(163, 29, 29)", marginBottom: "1rem" }}>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
                      {...register("password")}
                      style={errors?.user?.password?.message ? { borderColor: "red" } : undefined}
                    />
                    {errors?.user?.password?.message && (
                      <p style={{ fontSize: "0.875rem", color: "red" }}>
                        {errors.user.password.message}
                      </p>
                    )}
                  </div>
                  <Button
                    style={{ width: "100%", backgroundColor: "rgb(163, 29, 29)", color: "rgb(254, 249, 225)" }}
                    size="lg"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Continue with email
                  </Button>
                  {errors?.root?.message && (
                    <p style={{ fontSize: "0.875rem", color: "red", marginTop: "0.5rem" }}>
                      {errors.root.message}
                    </p>
                  )}
                  <p style={{ fontSize: "0.875rem", color: "gray", marginTop: "1rem" }}>
                    Forgot your password?{" "}
                    <Link
                      to="/forgot-password"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      Reset password
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </Card>
          <p style={{ fontSize: "0.875rem", color: "gray", textAlign: "center", marginTop: "1rem" }}>
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Get started →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
