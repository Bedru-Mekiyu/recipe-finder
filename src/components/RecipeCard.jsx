import React from "react";
import { motion } from "framer-motion";

export default function RecipeCard({ recipe, onSelect }) {
  return (
    <motion.div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-2xl overflow-hidden cursor-pointer transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
    >
      {/* Image */}
      <div className="w-full h-44 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-rose-500 transition">
          {recipe.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          {recipe.description}
        </p>
      </div>
    </motion.div>
  );
}
