"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./action";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  return (
    <form
      action={async (e) => {
        setLoading(true);
        const response = await login(e);

        setLoading(false);

        if (response?.error) {
          toast({
            title: "Error",
            variant: "destructive",
          });
          return;
        }

        router.refresh();
        router.push("/");
      }}
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Phone</Label>
            <Input
              id="phone"
              type="phone"
              name="phone"
              placeholder="username"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" name="password" required />
          </div>

          <p className="text-sm text-gray-400">
            Note: Please refresh the page after login. Sorry for the
            inconvenience
          </p>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            {loading ? "Loading..." : "Sign in"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
