import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onFinish }) => {
    const text = "Semmozhi Tamizh Mandram";
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.04 * i },
        }),
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-900 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={container}
        >
            <div className="relative">
                {/* Background Decorative Element */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0.1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600 rounded-full blur-[100px]"
                />

                <motion.div className="flex overflow-hidden text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">
                    {letters.map((letter, index) => (
                        <motion.span
                            variants={child}
                            key={index}
                            className={letter === " " ? "mr-4" : ""}
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                    className="h-1 bg-gradient-to-r from-red-600 to-orange-500 mt-4 rounded-full"
                />
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 text-gray-400 font-medium tracking-[0.2em] uppercase text-xs"
            >
                ESTD 2024 • VIT-AP UNIVERSITY
            </motion.p>
        </motion.div>
    );
};

export default Loader;
