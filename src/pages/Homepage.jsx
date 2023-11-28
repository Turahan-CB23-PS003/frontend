"use client";

import SmallWithLogoLeft from "../components/Homepage/Footer";
import CallToActionWithIllustration from "../components/Homepage/Hero";
import WithAction from "../components/Homepage/Navbar";
import StatsGridWithImage from "../components/Homepage/Section";

export default function HomePage() {
  return (
    <>
      <WithAction />
      <CallToActionWithIllustration />
      <StatsGridWithImage />
      <SmallWithLogoLeft />
    </>
  );
}
