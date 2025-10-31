import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";

export default function RecipeFinder() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const abortRef = useRef(null);
  const debounceRef = useRef(null);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  async function fetchRecipes(searchTerm) {
    if (!searchTerm.trim()) {
      setRecipes([]);
      setError("");
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          searchTerm.trim()
        )}`,
        { signal: controller.signal }
      );

      if (!res.ok) throw new Error("Network error");
      const data = await res.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError("No results found. Try another keyword.");
      }
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error(err);
      setError("Unable to fetch recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!query) {
      setRecipes([]);
      setError("");
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchRecipes(query), 400);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  useEffect(() => {
    fetchRecipes("chicken");
  }, []);

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-orange-50 via-rose-50 to-rose-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <motion.header
        className="text-center pt-12 pb-8 relative"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">
          Recipe Finder 🍳
        </h1>
        <motion.p
          className="mt-3 text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Discover and cook delicious meals from around the world.
        </motion.p>

        {/* Theme Toggle */}
        <button
          onClick={() =>
            setTheme((prev) => (prev === "dark" ? "light" : "dark"))
          }
          aria-label="Toggle Dark Mode"
          className="absolute top-4 right-6 bg-white/40 dark:bg-gray-700/60 backdrop-blur-md rounded-full p-2 shadow-md hover:scale-105 transition"
        >
          {theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h1M3 12H2m15.364-6.364l.707.707M6.343 17.657l-.707.707m12.728 0l.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0112 21.75a9.75 9.75 0 010-19.5 9.718 9.718 0 019.752 6.748A7.5 7.5 0 0121.752 15z"
              />
            </svg>
          )}
        </button>
      </motion.header>

      {/* Search Bar */}
      <motion.section
        className="flex justify-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search recipes (e.g., pasta, curry, beef)..."
            aria-label="Search recipes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-full shadow-lg bg-white/60 dark:bg-gray-700/60 backdrop-blur-md border border-white/40 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-300 placeholder:text-gray-400 dark:placeholder:text-gray-300 transition"
          />
          {/* Search Icon */}
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          {/* Clear button */}
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition"
            >
              ×
            </button>
          )}
        </div>
      </motion.section>

      {/* Recipes */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-rose-400 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-rose-500 font-medium">Loading recipes...</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-rose-600 dark:text-rose-400 font-medium py-20">
            {error}
          </div>
        )}

        {!loading && !error && recipes.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400 py-20">
            Start typing above to explore new recipes!
          </p>
        )}

        <motion.div
          className={`grid gap-8 transition-all duration-500 ${
            recipes.length > 0
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "opacity-0"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {recipes.map((r) => (
            <RecipeCard
              key={r.idMeal}
              recipe={{
                title: r.strMeal,
                description: r.strArea || "Unknown Cuisine",
                image: r.strMealThumb,
              }}
              onSelect={() => setSelectedRecipe(r)}
            />
          ))}
        </motion.div>
      </section>

      {/* Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={{
            title: selectedRecipe.strMeal,
            image: selectedRecipe.strMealThumb,
            ingredients: Array.from({ length: 20 }, (_, i) => {
              const ing = selectedRecipe[`strIngredient${i + 1}`];
              const measure = selectedRecipe[`strMeasure${i + 1}`];
              return ing ? `${measure ? measure.trim() + " " : ""}${ing}` : null;
            }).filter(Boolean),
            steps: selectedRecipe.strInstructions
              ? selectedRecipe.strInstructions
                  .split(/\r?\n/)
                  .filter(Boolean)
              : [],
          }}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {/* Footer */}
      <motion.footer
        className="text-center text-sm text-gray-500 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        © {new Date().getFullYear()} Recipe Finder — Built with ❤️ using React &
        Tailwind
      </motion.footer>
    </main>
  );
}
