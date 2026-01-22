import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Mail, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === '/';
    const isTransparent = isHome && !isScrolled;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Event Gallery', path: '/events' },
        { name: 'Team', path: '/team' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isTransparent
                ? 'bg-transparent py-4'
                : 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-0'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                            {siteConfig.acronym}
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative px-3 py-2 text-sm font-medium transition-colors ${isActive(link.path)
                                    ? 'text-red-600'
                                    : isTransparent
                                        ? 'text-gray-200 hover:text-white'
                                        : 'text-gray-700 hover:text-red-500'
                                    }`}
                            >
                                {link.name}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 transition-colors ${isTransparent ? 'text-white hover:text-gray-200' : 'text-gray-700 hover:text-red-600'
                                }`}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-xl"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-3 rounded-md text-base font-medium ${isActive(link.path)
                                        ? 'bg-red-50 text-red-600'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-auto pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                            {siteConfig.name}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            {siteConfig.description}
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-100">Contact Us</h4>
                        <div className="space-y-3">
                            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                                <Mail size={16} className="shrink-0" />
                                <span className="text-xs sm:text-base break-words">{siteConfig.contact.email}</span>
                            </a>
                            <div className="flex items-start space-x-3 text-gray-400">
                                <MapPin size={18} className="mt-1 shrink-0" />
                                <span>{siteConfig.contact.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-100">Follow Us</h4>
                        <a
                            href={siteConfig.contact.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all transform hover:-translate-y-1"
                        >
                            <Instagram size={20} />
                            <span className="font-medium">Instagram</span>
                        </a>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const Layout = ({ children }) => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Navbar />
            {/* If home, remove top padding so content goes behind transparent nav */}
            <main className={`flex-grow ${isHome ? 'pt-0' : 'pt-16'}`}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
