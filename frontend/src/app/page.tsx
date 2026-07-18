import HeroSection from '@/components/HeroSection';
import TrustedBy from '@/components/TrustedBy';
import ServicesOverview from '@/components/ServicesOverview';
import WhyChoose from '@/components/WhyChoose';
import AIFeatures from '@/components/AIFeatures';
import EmbeddedPredictor from '@/components/EmbeddedPredictor';
import MentorSection from '@/components/MentorSection';
import CoursesSection from '@/components/CoursesSection';
import Testimonials from '@/components/Testimonials';
import BlogPreview from '@/components/BlogPreview';
import CareerCTA from '@/components/CareerCTA';
import ContactCTA from '@/components/ContactCTA';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustedBy />
      <ServicesOverview />
      <WhyChoose />
      <AIFeatures />
      <EmbeddedPredictor />
      <CoursesSection />
      <MentorSection />
      <Testimonials />
      <BlogPreview />
      <CareerCTA />
      <ContactCTA />
    </main>
  );
}
