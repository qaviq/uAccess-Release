import { Link, useNavigate } from "@remix-run/react";
import { cn } from "@/lib/utils";
import { useSignOut, useAuth } from "@gadgetinc/react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import logo from "@/assets/uAccess_full_min.png";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const signOut = useSignOut();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#6D2323] bg-[#E5D0AC]/95 backdrop-blur supports-[backdrop-filter]:bg-[#A31D1D]">
      <div className="flex h-14 items-center justify-between">
        {/* Left Section - Logo */}
        <div className="flex items-center pl-4">
          <Link to="/">
            <img src={logo} alt="uAccess Logo" className="h-10 w-auto hover:opacity-80" />
          </Link>
        </div>

        {/* Center Section - Navigation */}
        <nav className="flex items-center justify-center gap-6">
          <Button variant="ghost" asChild>
            <Link to="/signed-in">
              Map
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/gyroscope">
              Gyroscope
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/about">
              About
            </Link>
          </Button>
        </nav>

        {/* Right Section - User Navigation */}
        <div className="w-40 flex justify-end pr-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      loading="eager"
                      src={user.googleImageUrl || undefined}
                      alt={user.email}
                    />
                    <AvatarFallback>
                      {user.firstName && user.lastName
                        ? `${user.firstName[0]}${user.lastName[0]}`
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#FEF9E1] border-2 border-[#E5D0AC]">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user.firstName && (
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                    )}
                    <p className="text-sm text-[#6D2323]">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="text-[#6D2323] hover:bg-[#E5D0AC]/10">
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#6D2323] hover:bg-[#E5D0AC]/10" onClick={async () => {
                  await signOut();
                  navigate("/");
                }}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              asChild
              className={cn(
                "text-[#6D2323]"
              )}
            >
              <Link to="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
