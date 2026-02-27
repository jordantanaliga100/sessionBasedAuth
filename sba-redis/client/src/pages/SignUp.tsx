import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering user...", formData);
    alert("Check console for form data! Simulation lang muna.");
  };

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle className="text-xl">Create your account</CardTitle>
        <CardDescription className="font-thin">
          Enter your details below to register your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* ✨ Added ID to form */}
        <form id="signup-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              {/* ✨ Fixed htmlFor */}
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="user123"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </CardContent>
      {/* ✨ Moved Buttons inside Footer for layout consistency */}
      <CardFooter className="flex flex-col gap-2">
        {/* ✨ Added form attribute to button */}
        <Button type="submit" form="signup-form" className="w-full">
          Register
        </Button>
        <Button variant="outline" className="w-full">
          Signup with Google
        </Button>
      </CardFooter>
      <CardAction className="flex m-auto w-auto gap-0.5 items-center">
        <CardContent className="text-muted-foreground text-sm">
          Already have an account?
        </CardContent>
        <Link to="/a">
          <Button variant="link">Sign In</Button>
        </Link>
      </CardAction>
    </Card>
  );
}
