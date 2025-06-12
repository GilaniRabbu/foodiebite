import Image from "next/image";

export default function About() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            {/* Decorative leaves */}
            <div className="absolute -top-4 -left-4 w-8 h-8 opacity-60">
              <div className="w-6 h-3 bg-green-400 rounded-full transform rotate-45"></div>
            </div>
            <div className="absolute top-8 -right-6 w-6 h-6 opacity-60">
              <div className="w-4 h-2 bg-green-500 rounded-full transform -rotate-12"></div>
            </div>
            <div className="absolute -bottom-6 left-8 w-7 h-7 opacity-60">
              <div className="w-5 h-2.5 bg-green-400 rounded-full transform rotate-12"></div>
            </div>
            <div className="absolute bottom-12 -right-8 w-5 h-5 opacity-60">
              <div className="w-3 h-1.5 bg-green-500 rounded-full transform -rotate-45"></div>
            </div>
            <div className="absolute top-1/2 -left-8 w-6 h-6 opacity-60">
              <div className="w-4 h-2 bg-green-400 rounded-full transform rotate-30"></div>
            </div>
            <div className="absolute top-1/4 right-4 w-4 h-4 opacity-60">
              <div className="w-3 h-1.5 bg-green-500 rounded-full transform rotate-60"></div>
            </div>

            {/* Main bowl image */}
            <div className="relative w-full max-w-md mx-auto">
              <div className="relative aspect-square rounded-full overflow-hidden bg-white shadow-2xl border-8 border-white">
                <Image
                  src="/images/healthy-bowl.png"
                  alt="Healthy colorful bowl with fresh ingredients"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Subtle shadow/glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-gray-100 opacity-30 pointer-events-none"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            {/* About Us Label */}
            <div className="inline-block">
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider bg-orange-50 px-4 py-2 rounded-full">
                About Us
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              We always provide quality food for you
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            {/* View Menu Button */}
            <div className="pt-4">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full  duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                View Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
