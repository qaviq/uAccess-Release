import { useActionForm, useFindOne } from "@gadgetinc/react";
import { useOutletContext } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import { AuthOutletContext } from "./_auth";
import { api } from "../api";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { User, Settings, Mail, Lock } from "lucide-react";

const iconClass = "w-5 h-5 text-[#A31D1D]";

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
    </div>
  );
}

export default function() {
  const { user } = useOutletContext<AuthOutletContext>();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const hasName = user.firstName || user.lastName;
  const title = hasName ? `${user.firstName} ${user.lastName}` : user.email;
  const initials = hasName
    ? (user.firstName?.slice(0, 1) ?? "") + (user.lastName?.slice(0, 1) ?? "")
    : "";
  
  const [isPending] = useTransition();
  const [{ fetching }] = useFindOne(api.user, user.id);
  
  if (fetching || isPending) {
    return (
      <div className="container mx-auto p-6">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEF9E1] p-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-[#6D2323]">Your Profile</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-[#E5D0AC] border-none shadow-lg transition-all hover:shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-2 text-[#6D2323]">
                <User className={iconClass} />
                <h2 className="text-xl font-semibold">Personal Information</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24 ring-2 ring-[#A31D1D] ring-offset-2 transition-all hover:scale-105">
                  <AvatarImage src={user.profilePicture?.url} />
                  <AvatarFallback className="text-lg bg-[#A31D1D] text-[#FEF9E1]">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-[#6D2323]">{title}</h3>
                  <div className="flex items-center justify-center gap-2 text-[#6D2323] mt-2">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#A31D1D] hover:bg-[#6D2323] text-white transition-colors"
                >
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#E5D0AC] border-none shadow-lg transition-all hover:shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-2 text-[#6D2323]">
                <Settings className={iconClass} />
                <h2 className="text-xl font-semibold">Account Settings</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-[#6D2323]">Security</h3>
                  <Separator className="bg-[#A31D1D]/20" />
                  {!user.googleProfileId && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-[#6D2323]">
                        <Lock className="w-4 h-4" />
                        <span>Password</span>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setIsChangingPassword(true)}
                        className="border-[#A31D1D] text-[#A31D1D] hover:bg-[#A31D1D] hover:text-white transition-colors"
                      >
                        Change Password
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
         </div>
       </div>
       <EditProfileModal open={isEditing} onClose={() => setIsEditing(false)} />
       <ChangePasswordModal
        open={isChangingPassword}
        onClose={() => setIsChangingPassword(false)}
      />
    </div>
  );
}

const EditProfileModal = (props: { open: boolean; onClose: () => void; }) => {
  const { user } = useOutletContext<AuthOutletContext>();
  const { register, submit, formState: { isSubmitting } } = useActionForm(api.user.update, {
    defaultValues: user,
    onSuccess: props.onClose,
    send: ["firstName", "lastName"],
  });

  return (
    <Dialog open={props.open} onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit}>
          <div className="space-y-4">
            <div>
              <Label>First Name</Label>
              <Input 
                placeholder="First name" 
                {...register("firstName")}
                className="border-[#A31D1D]/20 focus-visible:ring-[#A31D1D]"
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input 
                placeholder="Last name" 
                {...register("lastName")}
                className="border-[#A31D1D]/20 focus-visible:ring-[#A31D1D]"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#A31D1D] hover:bg-[#6D2323] text-white transition-colors"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <Button variant="outline" onClick={props.onClose} className="w-full">Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ChangePasswordModal = (props: { open: boolean; onClose: () => void; }) => {
  const { user } = useOutletContext<AuthOutletContext>();
  const {
    register,
    submit,
    reset,
    formState: { errors, isSubmitting },
  } = useActionForm(api.user.changePassword, {
    defaultValues: user,
    onSuccess: props.onClose,
  });

  const onClose = () => {
    reset();
    props.onClose();
  };

  return (
    <Dialog open={props.open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit}>
          <div className="space-y-4">
            <div>
              <Label>Current Password</Label>
              <Input
                type="password"
                autoComplete="off"
                className="border-[#A31D1D]/20 focus-visible:ring-[#A31D1D]"
                {...register("currentPassword")}
                placeholder="Enter your current password"
                required
                aria-required="true"
              />
              {errors?.root?.message && (
                <p className="text-red-500 text-sm mt-1">{errors.root.message}</p>
              )}
            </div>
            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                autoComplete="off"
                className="border-[#A31D1D]/20 focus-visible:ring-[#A31D1D]"
                {...register("newPassword")}
                placeholder="Enter your new password"
                required
              />
              {errors?.user?.password?.message && (
                <p className="text-red-500 text-sm mt-1">
                  New password {errors.user.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#A31D1D] hover:bg-[#6D2323] text-white transition-colors"
            >
              {isSubmitting ? "Saving..." : "Update Password"}
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
               Cancel
             </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
