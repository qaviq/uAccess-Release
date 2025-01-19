import { useSignOut } from "@gadgetinc/react";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header1";
 
import { type RootOutletContext } from "../root";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { session, gadgetConfig } = context;

  const userId = session?.get("user");
  const user = userId ? await context.api.user.findOne(userId) : undefined;

  if (!user) {
    return redirect(gadgetConfig.authentication!.signInPath);
  }

  return json({
    user,
  });
};

export type AuthOutletContext = RootOutletContext & {
  user: any;
};

 
 
export default function Auth() {
  const { user } = useLoaderData<typeof loader>();

  const rootOutletContext = useOutletContext<RootOutletContext>();

  return (
 
    <div className="min-h-screen flex relative">
      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet context={{ ...rootOutletContext, user } as AuthOutletContext} />
          <Toaster /> 
        </main>
      </div>
    </div>
  );
}
