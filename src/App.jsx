import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Events from './pages/Events';
import Team from './pages/Team';
import Loader from './components/Loader';

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3500); // 3.5 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
        <BrowserRouter>
            <AnimatePresence mode="wait">
                {loading ? (
                    <Loader key="loader" />
                ) : (
                    <Layout key="content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/events" element={<Events />} />
                            <Route path="/team" element={<Team />} />
                        </Routes>
                    </Layout>
                )}
            </AnimatePresence>
        </BrowserRouter>
    );
}

export default App;