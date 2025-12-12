export default function SummitBanner() {
  return (
    <section className="w-full bg-gradient-to-r from-blue-300 to-blue-500 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* 标题 */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Supply Chain Summit 2026
        </h1>

        {/* 副标题 */}
        <p className="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10">
          Shaping the Future of Global Logistics & Intelligent Supply Networks
        </p>

        {/* 日期与地点 */}
        <p className="text-md md:text-xl text-blue-100 mb-10">
          October 15, 2026 · Global Virtual Conference
        </p>

        {/* CTA 按钮 */}
        {/* <div>
          <a
            href="/register"
            className="
              inline-block px-8 py-4
              bg-white text-blue-600 font-semibold
              rounded-xl shadow-lg hover:shadow-xl
              hover:bg-blue-50 transition-all duration-300
            "
          >
            Register Now
          </a>
        </div> */}

      </div>
    </section>
  );
}
