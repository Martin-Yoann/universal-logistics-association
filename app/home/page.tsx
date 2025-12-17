import Banner from '../components/Banner';
import AboutSection from '../components/sections/AboutSection';
import ImpactSection from '../components/sections/ImpactSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Banner
        items={[
          {
            id: 1,
            title: "Redefining the Future of Warehousing and Logistics",
            description:
              "Global supply chains are evolving faster than ever. ULA empowers logistics and warehouse leaders with the standards, knowledge, and community needed to navigate change and improve operational excellence.",
            image: "/banner/banner.jpg",
            buttonText: "Learn More",
            buttonLink: "/about",
          },
        ]}
      />
      <AboutSection />
      <ImpactSection />
    </div>
  );
}
