import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Mail, ArrowRight } from 'lucide-react';
import { heroEvents, siteConfig } from '../data';
import { Link } from 'react-router-dom';
const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroEvents.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % heroEvents.length);
    };
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + heroEvents.length) % heroEvents.length);
    };
    return (
        <div className="relative h-[600px] w-full overflow-hidden bg-gray-900">
            <AnimatePresence initial={false} custom={1}>
                <motion.div
                    key={currentIndex}
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    className="absolute inset-0 w-full h-full"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${heroEvents[currentIndex].image})` }}
                    >
                        <div className="absolute inset-0 bg-black/60" />
                    </div>
                    <div className="relative h-full flex items-center justify-center text-center px-4">
                        <div className="max-w-4xl mx-auto space-y-6">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center space-x-2 bg-red-600/90 text-white px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm"
                            >
                                <Calendar size={16} />
                                <span>{heroEvents[currentIndex].date}</span>
                            </motion.div>

                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-6xl font-bold text-white tracking-tight"
                            >
                                {heroEvents[currentIndex].title}
                            </motion.h1>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
                            >
                                {heroEvents[currentIndex].description}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors z-10"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors z-10"
            >
                <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {heroEvents.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-red-500' : 'bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
const AboutSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            About <span className="text-red-600">{siteConfig.acronym}</span>
                        </h2>
                        <div className="prose prose-lg text-gray-600 space-y-4">
                            <p>
                                {siteConfig.description}
                            </p>
                            <p>
                                Founded with the vision to nurture the love for Tamil among students,
                                STM stands as a beacon of cultural expression. We organize workshops,
                                literary meets, and grand festivals that bring together the entire university community.
                            </p>
                            <p>
                                Our mission is to bridge tradition with modernity, creating a platform
                                where every student can explore their linguistic and cultural identity.
                            </p>
                        </div>
                        <div className="mt-8">
                            <Link to="/team" className="inline-flex items-center space-x-2 text-red-600 font-semibold hover:text-red-700 transition-colors">
                                <span>Meet Our Team</span>
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-tr from-red-600 to-orange-400 rounded-2xl opacity-20 blur-xl"></div>
                        <img
                            src="https://images.unsplash.com/photo-1531263060782-b024de9b9793?q=80&w=1000&auto=format&fit=crop"
                            alt="Club Activities"
                            className="relative rounded-2xl shadow-xl w-full object-cover h-[400px]"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
const ContactSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                    <p className="text-gray-600 text-lg">
                        Have questions or want to collaborate? We'd love to hear from you.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <motion.a
                        href={`mailto:${siteConfig.contact.email}`}
                        whileHover={{ y: -5 }}
                        className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all text-center group"
                    >
                        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                            <Mail size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
                        <p className="text-gray-600">{siteConfig.contact.email}</p>
                    </motion.a>
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all text-center group"
                    >
                        <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                            <MapPin size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Us</h3>
                        <p className="text-gray-600">{siteConfig.contact.location}</p>
                    </motion.div>

                    <motion.a
                        href={siteConfig.contact.instagram}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ y: -5 }}
                        className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all text-center group"
                    >
                        <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                            <span className="text-2xl font-bold">IG</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Follow Us</h3>
                        <p className="text-gray-600">@stm_vitap</p>
                    </motion.a>
                </div>
            </div>
        </section>
    );
};
const Home = () => {
    return (
        <div className="min-h-screen">
            <HeroCarousel />
            <AboutSection />
            <ContactSection />
        </div>
    );
};
export default Home;
