"use client";

import SmallWithLogoLeft from "./Homepage/Footer";
import CallToActionWithIllustration from "./Homepage/Hero";
import WithAction from "./Homepage/Navbar";
import StatsGridWithImage from "./Homepage/Section";


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
