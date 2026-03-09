import { motion } from "motion/react";

export function Services() {
  const categories = [
    {
      title: "Design",
      items: [
        "Product design",
        "UX and interface design",
        "Campaign and marketing design",
        "Art direction",
        "Design systems",
        "Print and collateral",
      ],
    },
    {
      title: "Build",
      items: [
        "AI-assisted websites",
        "Landing pages and product launches",
        "Rapid website builds",
        "Interactive experiences",
        "Digital campaigns",
        "Creative web projects",
      ],
    },
    {
      title: "Systems",
      items: [
        "Design thinking",
        "Creative workflows",
        "AI-supported creative pipelines",
        "Content and campaign frameworks",
        "Design operations",
        "Automation and tooling",
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-24"
    >
      <section className="max-w-5xl">
        <h1 className="text-[4.16rem] md:text-[8.88rem] font-serif font-extralight tracking-tighter text-black leading-[0.9] mb-8">
          What I Do
        </h1>
        <p className="text-2xl md:text-4xl text-black/60 leading-snug max-w-3xl font-light tracking-tight">
          A focused set of services designed to help teams build better products, brands, and systems.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col">
            <h2 className="text-5xl md:text-6xl font-sans tracking-tight text-black mb-8">
              {category.title}
            </h2>
            <ul className="flex flex-col border-t border-black">
              {category.items.map((item, i) => (
                <li 
                  key={i} 
                  className="py-5 text-xl font-sans text-black border-b border-black"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </motion.div>
  );
}
