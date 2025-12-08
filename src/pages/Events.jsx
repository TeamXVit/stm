import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Image as ImageIcon } from 'lucide-react';
import { allEvents } from '../data';
const Events = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Event <span className="text-red-600">Gallery</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Relive the moments and explore our upcoming events.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allEvents.map((event, index) => (
                        <motion.a
                            key={event.id}
                            href={event.link || '#'}
                            target={event.link ? "_blank" : "_self"}
                            rel={event.link ? "noreferrer" : ""}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className={`block bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all ${!event.link ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Loading Placeholder */}
                                <img
                                    src={event.images[0]}
                                    alt={event.title}
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

                                {event.link && (
                                    <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <ExternalLink size={20} className="text-gray-900" />
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="flex items-center space-x-2 text-sm text-red-600 font-medium mb-3">
                                    <Calendar size={16} />
                                    <span>{event.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                                    {event.title}
                                </h3>
                                {event.images.length > 1 && (
                                    <div className="flex items-center space-x-1 text-xs text-gray-500 mt-3">
                                        <ImageIcon size={14} />
                                        <span>+{event.images.length - 1} more photos</span>
                                    </div>
                                )}
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Events;
