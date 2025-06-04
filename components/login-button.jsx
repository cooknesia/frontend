"use client";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { signInGoogle } from "@/lib/api/api";
import { useAuth } from "@/context/auth-context";

export default function LoginButton() {
  const { login } = useAuth();

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}
    >
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            const response = await signInGoogle(credentialResponse.credential);
            if (response.status === "success") {
              login(response.token, response.data);
            } else {
              console.error("Login failed:", response.message);
            }
          } catch (err) {
            console.error("Login error:", err);
          }
        }}
        onError={() => {
          console.error("Google login failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}
