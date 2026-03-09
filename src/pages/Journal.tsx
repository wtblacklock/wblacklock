import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { posts } from "../data/posts";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function Journal() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const uniqueCategories = Array.from(new Set(posts.map((p) => p.category))).sort();
  const uniqueYears = Array.from(
    new Set(posts.map((p) => new Date(p.date).getFullYear()))
  ).sort((a, b) => b - a);

  const filteredPosts = posts.filter((post) => {
    const categoryMatch = categoryFilter === "All" || post.category === categoryFilter;
    const yearMatch = yearFilter === "All" || new Date(post.date).getFullYear().toString() === yearFilter;
    return categoryMatch && yearMatch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-16 md:space-y-24 pt-12"
    >
      <header className="max-w-7xl">
        <h1 className="text-[4.16rem] md:text-[8.88rem] font-serif font-extralight tracking-tighter text-black leading-[0.9] mb-12 md:mb-20">
          Journal
        </h1>
      </header>

      {/* Filter toggle button */}
      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/40 hover:text-black transition-colors focus:outline-none"
        >
          {showFilters ? "Hide filters" : "Show filters"}
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filter section - Two main columns with wrapped items */}
      {showFilters && (
        <div className="mb-8 pb-[80px] border-b border-black/10">
          <div className="grid grid-cols-2 gap-12 md:gap-16">
            {/* Left section - Categories */}
            <div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <button
                  onClick={() => setCategoryFilter("All")}
                  className={`text-left transition-colors duration-200 focus:outline-none ${
                    categoryFilter === "All" ? "text-black" : "text-black/30 hover:text-black/60"
                  }`}
                >
                  <p className="font-sans text-sm font-light leading-snug">All</p>
                </button>
                {uniqueCategories.map((category) => {
                  const isActive = categoryFilter === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setCategoryFilter(category)}
                      className={`text-left transition-colors duration-200 focus:outline-none ${
                        isActive ? "text-black" : "text-black/30 hover:text-black/60"
                      }`}
                    >
                      <p className="font-sans text-sm font-light leading-snug">
                        {category}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right section - Years */}
            <div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <button
                  onClick={() => setYearFilter("All")}
                  className={`text-left transition-colors duration-200 focus:outline-none ${
                    yearFilter === "All" ? "text-black" : "text-black/30 hover:text-black/60"
                  }`}
                >
                  <p className="font-sans text-sm font-light leading-snug">All</p>
                </button>
                {uniqueYears.map((year) => {
                  const isActive = yearFilter === year.toString();
                  return (
                    <button
                      key={year}
                      onClick={() => setYearFilter(year.toString())}
                      className={`text-left transition-colors duration-200 focus:outline-none ${
                        isActive ? "text-black" : "text-black/30 hover:text-black/60"
                      }`}
                    >
                      <p className="font-sans text-sm font-light leading-snug">
                        {year}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <motion.div layout className="flex flex-col border-t border-black/10 mt-[80px]">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              key={post.slug}
            >
              <Link
                to={`/journal/${post.slug}`}
                className="group flex items-start gap-6 md:gap-10 py-8 md:py-10 border-b border-black/10 hover:border-black/25 transition-colors focus:outline-none"
              >
                <span className="text-[0.68rem] font-mono text-black/30 w-6 shrink-0 select-none mt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl md:text-[2.22rem] font-serif font-extralight tracking-tighter text-black group-hover:text-black/40 transition-colors duration-300 leading-tight mb-3">
                    {post.title}
                  </h2>
                  <p className="text-base text-black/50 font-normal leading-snug max-w-2xl line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="hidden md:flex flex-col items-end gap-2 shrink-0 pt-1">
                  <span className="text-[0.68rem] font-bold tracking-widest uppercase text-black/35 group-hover:text-black/60 transition-colors duration-300">
                    {post.category}
                  </span>
                  <span className="text-[0.68rem] font-mono text-black/30">
                    {formatDate(post.date)}
                  </span>
                </div>

                <span className="text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all duration-300 shrink-0 text-base select-none mt-1">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
