import Image from "next/image";
import ContainerWrapper from "@/components/common/ContainerWrapper";

export default function About() {
  return (
    <section className="bg-white py-20">
      <ContainerWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image Section */}
          <div className="relative w-full max-w-md mx-auto">
            <div className="aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white bg-white">
              <Image
                src="/menu-img-3.jpg"
                alt="Healthy colorful bowl with fresh ingredients"
                className="object-cover"
                fill
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            {/* About Us Label */}
            <div className="inline-block">
              <span className="text-sm font-semibold uppercase tracking-wider px-4 py-2 rounded-full text-orange-500 bg-orange-100">
                About Us
              </span>
            </div>
            {/* Main Heading */}
            <h2 className="text-4xl font-bold leading-tight max-w-md text-gray-900">
              We always provide quality food for you
            </h2>
            {/* Description Paragraphs */}
            <div className="space-y-4">
              <p className="leading-relaxed max-w-xl text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="leading-relaxed max-w-xl text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            {/* View Menu Button */}
            <div className="pt-4">
              <button className="px-8 py-4 font-semibold rounded-full shadow transition-all duration-200 text-white bg-green-500 hover:bg-green-600">
                View Menu
              </button>
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </section>
  );
}
