import Accordion from "../../components/Accordion";
import WorldMap from "../..//components/WorldMap";
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-50">
      <div className="relative w-full py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-3xl mb-14">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl"></div>

        <div className="relative container mx-auto px-6 max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            About the Universe Logistics Association
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            A global alliance committed to advancing logistics, warehousing,
            supply-chain innovation and operational excellence.
          </p>
        </div>
      </div>

      <Accordion
        items={[
          {
            title: "Our Story",
            content: (
              <>
                <p className="mb-4">
                  Founded in 2025, the Universe Logistics Association (ULA)
                  emerged from the increasing complexity of the global supply
                  chain. Companies face capacity shortages, labor challenges,
                  cost pressures and rising expectations for speed and
                  reliability.
                </p>
                <p className="mb-4">
                  Industry leaders recognized the need for a new kind of
                  alliance—one focused on knowledge sharing, innovation and
                  raising operational standards through collaboration.
                </p>
                <p>
                  From this vision, ULA was created to shape the future of
                  global logistics and empower the organizations keeping goods
                  moving.
                </p>
              </>
            ),
          },

          {
            title: "Our Network",
            content: (
              <>
                <p className="mb-4">
                  ULA is built on the expertise of warehouse operators,
                  logistics providers, supply chain strategists, transportation
                  partners and innovators worldwide.
                </p>
                <p>
                  Together, we form a powerful network committed to improving
                  efficiency, transparency and resilience across the logistics
                  and warehousing sectors.
                </p>
              </>
            ),
          },

          {
            title: "Our Mission",
            content: (
              <>
                <p className="mb-4">
                  Our mission is to empower logistics organizations through
                  insight, collaboration and forward-thinking strategies.
                </p>
                <p>
                  We strengthen the industry by supporting the people and
                  companies responsible for global movement of goods.
                </p>
              </>
            ),
          },

          {
            title: "Our Values",
            content: (
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Collaboration</strong> — Progress through unity.
                </li>
                <li>
                  <strong>Innovation</strong> — Supporting the technologies that
                  move us forward.
                </li>
                <li>
                  <strong>Integrity</strong> — Transparency and accountability
                  in every action.
                </li>
                <li>
                  <strong>Knowledge Sharing</strong> — Insights that elevate the
                  whole industry.
                </li>
                <li>
                  <strong>Global Perspective</strong> — Logistics is worldwide;
                  so are we.
                </li>
              </ul>
            ),
          },

          {
            title: "Our Vision",
            content: (
              <p>
                ULA aims to become the most trusted global logistics alliance,
                setting new standards in warehousing, transportation and
                supply-chain collaboration through a connected, future-ready
                global community.
              </p>
            ),
          },
        ]}
      />
      <section className="my-12 p-8 bg-gray-50 rounded-2xl">
        <h2 className="text-3xl font-bold mb-6">Mission & Vision</h2>

        {/* Mission */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Mission</h3>
          <p className="text-lg leading-relaxed text-gray-700">
            ULA exists to elevate the global logistics and warehousing
            profession by promoting professional growth, operational excellence
            and strategic collaboration. We provide members with access to
            knowledge, resources and a high-standard professional community.
          </p>
        </div>

        {/* Vision */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Vision</h3>
          <p className="text-lg leading-relaxed text-gray-700">
            To build a global logistics ecosystem defined by efficiency,
            resilience, innovation and trusted partnerships across the supply
            chain.
          </p>
        </div>

        {/* Values */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Values</h3>
          <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
            <li>Professional integrity</li>
            <li>Operational excellence</li>
            <li>Shared learning</li>
            <li>Innovation and forward thinking</li>
            <li>Industry-wide collaboration</li>
          </ul>
        </div>
      </section>

      <WorldMap />
    </div>
  );
}
