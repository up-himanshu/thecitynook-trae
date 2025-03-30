"use client";

import Description from "./Description";
import Features from "./Features";

const About = () => {
  return (
    <section
      id="property-features"
      className="h-full p-6 bg-white dark:bg-primary rounded-lg shadow-sm"
      itemScope
      itemType="https://schema.org/Product"
    >
      <h2
        className="text-2xl font-semibold mb-6 dark:text-white"
        itemProp="name"
      >
        About The Space
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Description Section */}
        <Description />

        {/* Features Section */}
        <Features />
      </div>
    </section>
  );
};

export default About;
