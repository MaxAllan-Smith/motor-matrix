import { ActionFunction, createCookieSessionStorage, json, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import { Layout } from "~/components/layout";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Set up session storage
const sessionSecret = process.env.SESSION_SECRET || "fallbackSecret";
const storage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  const formType = formData.get("formType");

  // Ensure email and password are not undefined
  if (typeof email !== 'string' || typeof password !== 'string') {
    return json({ error: "Email and password are required." }, { status: 400 });
  }

  if (formType === "signup") {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      // Ensure name is a string; it's okay for name to be an empty string if not provided
      const userName = typeof name === 'string' ? name : '';
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: userName,
        },
      });
      return redirect('/success');
    } catch (error) {
      return json({ error: "Email already exists" }, { status: 400 });
    }
  } else { // Assuming formType is "login"
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return json({ error: "Invalid email or password" }, { status: 400 });
    }

    const session = await storage.getSession();
    session.set("userId", user.id); // Adjust according to your user ID property

    return redirect('/dashboard', {
      headers: {
        "Set-Cookie": await storage.commitSession(session),
      },
    });
  }
};

export default function AuthForm() {
  const actionData = useActionData();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 bg-white rounded shadow-md w-3/12">
          <h2 className="mb-6 text-2xl font-bold text-center">
            {isSignUp ? "Sign Up" : "Log In"}
          </h2>
          <Form method="post">
            <input type="hidden" name="formType" value={isSignUp ? "signup" : "login"} />
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block mb-2">Name:</label>
                <input type="text" name="name" id="name" className="w-full p-2 mb-4 border rounded" />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block mb-2">Email:</label>
              <input type="email" name="email" id="email" className="w-full p-2 mb-4 border rounded" />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2">Password:</label>
              <input type="password" name="password" id="password" className="w-full p-2 mb-4 border rounded" />
            </div>
            <button type="submit" className="w-full p-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-700">
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </Form>
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-blue-500 hover:underline">
            {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </Layout>
  );
}
