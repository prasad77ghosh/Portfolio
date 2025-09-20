"use client"

import {motion} from "motion/react"

const Logo: React.FC = () => (
  <motion.div
    className="flex items-center"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 shadow-md">
      <span className="text-white font-bold text-sm sm:text-lg">PG</span>
    </div>
  </motion.div>
);


export default Logo;