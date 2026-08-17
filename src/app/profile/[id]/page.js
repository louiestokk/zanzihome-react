import React from "react";
import Profile from "../../../views/Profile";

export const metadata = {
  title: "User Profile | ZanziHome",
  description: "View and manage your active listings and saved properties on ZanziHome.",
  robots: "noindex, nofollow",
};

export default function ProfilePageRoute() {
  return <Profile />;
}
