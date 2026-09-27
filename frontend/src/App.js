import { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import { setLenis } from "@/lib/scroll";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import MarqueeRibbon from "@/components/site/Marquee";
import Services from "@/components/site/Services";
import Industries from "@/components/site/Industries";
import Estimator from "@/components/site/Estimator";
import About from "@/components/site/About";
import Contact from "@/components/site/Contact";
import Faq from "@/components/site/Faq";
import Footer from "@/components/site/Footer";

function App() {
    useEffect(() => {
        const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
        setLenis(lenis);
        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            setLenis(null);
        };
    }, []);

    return (
        <div className="App noise-overlay">
            <Header />
            <main>
                <Hero />
                <MarqueeRibbon />
                <Services />
                <Industries />
                <Estimator />
                <About />
                <Contact />
                <Faq />
            </main>
            <Footer />
            <Toaster position="top-center" richColors theme="dark" />
        </div>
    );
}

export default App;
