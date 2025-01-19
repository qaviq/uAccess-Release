import { useOutletContext, Link } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RootOutletContext } from "../root";

export default function () {
  const { gadgetConfig } = useOutletContext<RootOutletContext>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(254,249,225)] text-[rgb(109,35,35)]">
      <style>{`
        html, body {
          background-color: rgb(254, 249, 225);
          margin: 0;
          padding: 0;
        }
      `}</style>
      <Card className="p-8 bg-[rgb(229,208,172)] text-[rgb(109,35,35)] shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            uAccess
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base text-center">
            The ultimate tool for discovering, reviewing, and getting assistance with accessibility.{" "}

          </p>
          <div className="space-y-4">
            <p className="text-center">
              Create an account for free, login, or preview the accessibility map.
            </p>
            

          </div>
          <Button
            variant="default"
            size="lg"
            className="w-full bg-[rgb(163,29,29)] text-[rgb(254,249,225)] hover:bg-[rgb(109,35,35)]"
            asChild
          >
            <Link to="/sign-up">Sign up</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full border-[rgb(163,29,29)] bg-[rgb(163,29,29)] text-[rgb(254,249,225)] hover:bg-[rgb(109,35,35)]"
            asChild
          >
            <Link to="/sign-in">Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
