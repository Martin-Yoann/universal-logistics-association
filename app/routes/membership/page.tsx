export default function MembershipPage() {
  return (
    <div className="container mx-auto px-4 py-50">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-10 text-gray-900">
        Membership in the Universe Logistics Association
      </h1>

      {/* Intro Text */}
      <section className="mb-14">
        <p className="text-lg leading-relaxed text-gray-700 max-w-4xl">
          Membership in ULA is highly selective and reserved for organizations that
          demonstrate exceptional professionalism, operational integrity, and a
          commitment to advancing the logistics, warehousing and supply chain
          industries. Companies may be invited to join or may submit an application
          for evaluation. Each application undergoes a structured multi-stage review,
          ensuring that all members uphold the values and standards of the
          association.
        </p>
      </section>

      {/* What Members Gain */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">What Members Gain</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Card 1 */}
          <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold mb-3">
              A Highly Curated Network of Industry Leaders
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Members join a community of top warehouse operators, logistics providers, 
              supply chain innovators and strategic partners who represent excellence 
              in their respective fields.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold mb-3">Exclusive Insights & Knowledge</h3>
            <p className="text-gray-700 leading-relaxed">
              Access to members-only reports, market intelligence, regulatory analysis,
              benchmarking data, and operational frameworks not available to the public.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold mb-3">Strategic Collaboration</h3>
            <p className="text-gray-700 leading-relaxed">
              Participate in private roundtables, closed-door discussions, high-level 
              workshops, and professional forums focused on solving industry challenges 
              through shared expertise.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold mb-3">Operational & Regulatory Support</h3>
            <p className="text-gray-700 leading-relaxed">
              Guidance on warehouse optimization, safety compliance, automation, 
              sustainability, fleet management, and regional logistics requirements.
            </p>
          </div>

          {/* Card 5 - Full width */}
          <div className="md:col-span-2 p-6 bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold mb-3">Influence on Industry Direction</h3>
            <p className="text-gray-700 leading-relaxed">
              Members play an active role in shaping emerging standards, sustainability
              initiatives, digital transformation frameworks and best practices that will 
              define the future of global logistics.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Pathway */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Membership Pathway</h2>

        <div className="relative border-l-4 border-blue-600 pl-8 space-y-10">
          {/* Step 1 */}
          <div>
            <h3 className="text-xl font-semibold text-blue-600">1. Invitation or Application Submission</h3>
            <p className="text-gray-700 leading-relaxed mt-2">
              Organizations may apply directly or be nominated by existing members. 
              Initial screening ensures alignment with ULA’s standards.
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <h3 className="text-xl font-semibold text-blue-600">2. Evaluation and Board Review</h3>
            <p className="text-gray-700 leading-relaxed mt-2">
              The Board assesses operational capabilities, compliance history,
              industry contribution and organizational reputation.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <h3 className="text-xl font-semibold text-blue-600">3. Formal Invitation to Join</h3>
            <p className="text-gray-700 leading-relaxed mt-2">
              Approved organizations receive an official invitation from the 
              Association Board to become a recognized member.
            </p>
          </div>

          {/* Step 4 */}
          <div>
            <h3 className="text-xl font-semibold text-blue-600">4. Onboarding & Access to Member Resources</h3>
            <p className="text-gray-700 leading-relaxed mt-2">
              Newly accepted members gain full access to ULA's resources, events, 
              knowledge centers and collaboration networks.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <div className="mt-16 text-center">
        <button className="px-10 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 transition">
        Begin Application Review Process
        </button>
      </div> */}
    </div>
  );
}
