import { motion } from 'framer-motion';
import { teamMembers } from '../data';
import { User, Linkedin, Twitter } from 'lucide-react';
const Team = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Meet the <span className="text-red-600">Team</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        The passionate individuals behind every successful event.
                    </p>
                </motion.div>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
                >
                    {teamMembers.map((member) => (
                        <motion.div
                            key={member.id}
                            variants={item}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden w-full max-w-sm group"
                        >
                            <div className="relative h-80 overflow-hidden bg-gray-200">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                                        {member.name}
                                    </h3>
                                    <p className="text-red-400 font-medium text-lg drop-shadow-md">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
export default Team;
