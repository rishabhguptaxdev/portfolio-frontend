import ContactMe from "@/components/ContactMe";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Introduction from "@/components/Introduction";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import WorkExperience from "@/components/WorkExperience";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <Skills/>
      <Projects/>
      <Introduction/>
      <Testimonials/>
      <WorkExperience/>
      <ContactMe/>
      <Footer/>
    </>
  );
}
