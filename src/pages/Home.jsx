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
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-red-500' : 'bg-white/50 hover:bg-white/80'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const AboutSection = () => {
    return (
        <section className="relative py-28 overflow-hidden bg-white">
            {/* Creative Background Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 pointer-events-none opacity-5">
                <span className="text-[40rem] font-black font-serif text-gray-900 leading-none select-none">
                    ழ
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div className="order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h2 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 tracking-tighter leading-[0.9]">
                                ART OF <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                                    TAMIL
                                </span>
                            </h2>

                            <div className="prose prose-lg text-gray-600 space-y-6 mb-10">
                                <p className="text-xl leading-relaxed text-gray-800 font-medium border-l-4 border-red-500 pl-6">
                                    {siteConfig.description}
                                </p>
                                <p>
                                    STM stands as a beacon where the ancient grace of Tamil literature meets the pulse of modern creativity. We are more than a club; we are a movement to reclaim our heritage.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/team"
                                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-bold tracking-wide overflow-hidden transition-all hover:bg-gray-800"
                                >
                                    <span className="relative z-10 flex items-center space-x-2">
                                        <span>MEET THE CREATORS</span>
                                        <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image / Creative Visual */}
                    <div className="order-1 lg:order-2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            {/* Decorative Blob/Shape */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-b from-orange-100 to-red-50 rounded-full blur-3xl opacity-60 -z-10" />

                            <div className="relative z-10">

                                {/* Floating Badge */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block"
                                >
                                    <p className="font-serif italic text-lg text-gray-800">
                                        " யாதும் ஊரே <br /> யாவரும் கேளிர் "
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2 font-bold tracking-wider uppercase">
                                        - Kaniyan Pungundranar
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ContactSection = () => {
    return (
        <section className="relative py-20 overflow-hidden bg-white/50">
            {/* Background Texture - Scaled down */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5">
                <span className="text-[20rem] md:text-[30rem] font-black font-serif text-gray-900 leading-none select-none">
                    த
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                {/* Top Content - Centered & Compact */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none text-gray-900"
                    >
                        GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">TOUCH</span>
                    </motion.h2>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 font-medium leading-relaxed"
                    >
                        Have an idea? Want to collaborate? Reach out to us.
                        <br />
                        <span className="font-bold text-gray-800">Join the most vibrant cultural club.</span>
                    </motion.p>
                </div>

                {/* Bottom Row - Contact Handles */}
                <div className="grid md:grid-cols-3 gap-8 border-t border-gray-200 pt-12">
                    {/* Email Item */}
                    <motion.a
                        href={`mailto:${siteConfig.contact.email}`}
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="group flex flex-col items-center text-center cursor-pointer"
                    >
                        <span className="text-xs font-bold text-red-500 tracking-widest uppercase mb-3">Email</span>
                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 group-hover:text-red-600 transition-colors break-all">
                            {siteConfig.contact.email}
                        </h3>
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-red-500">
                            <ArrowRight size={24} className="-rotate-45" />
                        </div>
                    </motion.a>

                    {/* Location Item */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="group flex flex-col items-center text-center cursor-default"
                    >
                        <span className="text-xs font-bold text-orange-500 tracking-widest uppercase mb-3">Visit</span>
                        <h3 className="text-2xl md:text-3xl font-black text-gray-900">
                            {siteConfig.acronym} Office
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 font-medium uppercase tracking-wide">
                            {siteConfig.university}
                        </p>
                    </motion.div>

                    {/* Social Item */}
                    <motion.a
                        href={siteConfig.contact.instagram}
                        target="_blank"
                        rel="noreferrer"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="group flex flex-col items-center text-center cursor-pointer"
                    >
                        <span className="text-xs font-bold text-pink-500 tracking-widest uppercase mb-3">Social</span>
                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 group-hover:text-pink-600 transition-colors">
                            @stm_vitap
                        </h3>
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-pink-500">
                            <ArrowRight size={24} className="-rotate-45" />
                        </div>
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

const Home = () => {
    return (
        <div className="min-h-screen">
            <AboutSection />
            <HeroCarousel />
            <ContactSection />
        </div>
    );
};

export default Home;
