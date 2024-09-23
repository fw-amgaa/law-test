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
import { Spinner } from "@/components/spinner";

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = async () => {
    setLoading(true);
    const response = await login({ phone, password });

    if (response?.error) {
      toast({
        title: "Error",
        variant: "destructive",
      });

      setLoading(false);

      return;
    }

    router.refresh();
    router.push("/");
  };

  return (
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
            onChange={(e) => setPhone(e.target.value)}
            placeholder="username"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={loading} onClick={onClickLogin} className="w-full">
          {loading ? <Spinner /> : "Sign in"}
        </Button>
      </CardFooter>
    </Card>
  );
}
