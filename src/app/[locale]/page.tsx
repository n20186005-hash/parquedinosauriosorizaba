import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HistoryTimeline from '@/components/HistoryTimeline';
import ScienceSection from '@/components/ScienceSection';
import RouteSection from '@/components/RouteSection';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import WeatherSection from '@/components/WeatherSection';
import SeasonsSection from '@/components/SeasonsSection';
import TripPlanSection from '@/components/TripPlanSection';
import ServicesSection from '@/components/ServicesSection';
import ResponsibilitySection from '@/components/ResponsibilitySection';
import LandmarksSection from '@/components/LandmarksSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FaqSection from '@/components/FaqSection';
import MapEmbed from '@/components/MapEmbed';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';
import FaqJsonLd from '@/components/FaqJsonLd';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FaqJsonLd />
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HistoryTimeline />
        <ScienceSection />
        <RouteSection />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <WeatherSection />
        <SeasonsSection />
        <TripPlanSection />
        <ServicesSection />
        <ResponsibilitySection />
        <LandmarksSection />
        <Gallery />
        <Reviews />
        <FaqSection />
        <MapEmbed />
        <SourcesSection />
      </main>
      <Footer />
    </>
  );
}
