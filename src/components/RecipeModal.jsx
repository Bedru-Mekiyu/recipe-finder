import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RecipeModal({ recipe, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-3xl shadow-2xl max-w-5xl w-full h-[80vh] overflow-hidden flex flex-col sm:flex-row transition-colors duration-300"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-4 text-3xl text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition z-20"
          >
            ×
          </button>

          {/* Left: Image */}
          <div className="sm:w-1/2 h-56 sm:h-full overflow-hidden">
            <motion.img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
            />
          </div>

          {/* Right: Content */}
          <div className="sm:w-1/2 p-6 overflow-y-auto text-gray-800 dark:text-gray-200">
            <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
              {recipe.title}
            </h2>

            {/* Ingredients */}
            <div className="mb-5">
              <h3 className="text-xl font-semibold mb-2 text-rose-500">
                🧂 Ingredients
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                {recipe.ingredients.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-rose-500">
                👨‍🍳 Instructions
              </h3>
              <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                {recipe.steps.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    {step}
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
