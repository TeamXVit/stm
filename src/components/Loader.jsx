import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onFinish }) => {
    const text = "Semmozhi Tamizh Mandram";
    const words = text.split(" ");
    let charIndex = 0;

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.1 },
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    const child = {
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        }),
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

                <motion.div className="flex flex-wrap justify-center gap-x-3 md:gap-x-4 max-w-4xl text-center px-4 overflow-hidden text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">
                    {words.map((word, wordIndex) => (
                        <div key={wordIndex} className="flex whitespace-nowrap">
                            {Array.from(word).map((letter, letterIndex) => {
                                const index = charIndex++;
                                return (
                                    <motion.span
                                        key={letterIndex}
                                        variants={child}
                                        custom={index}
                                    >
                                        {letter}
                                    </motion.span>
                                );
                            })}
                        </div>
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
