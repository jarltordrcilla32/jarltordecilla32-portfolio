import React, { useState, useEffect } from 'react';
import portfolio_photo from './assets/portfolio_photo.jpg';
import connectgreen_web from './assets/connectgreen_web.png';
import connectgreen_mobile from './assets/connectgreen_mobile.png';
import greenconnect_thumbnail from './assets/greenconnect_thumbnail.png';
import resume from './assets/resume.pdf';
import { Moon, Sun, Menu, X, Github, Linkedin, Facebook, Mail, Download, Grid3x3, List, Award, BookOpen, ChevronDown, Code2, Database, Wrench, Phone, Sparkles, SquareLibrary, ShieldCheck, ChevronLeft, ChevronRight, ExternalLink, Play, Pause, Circle } from 'lucide-react';

// Import Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Lora:wght@400;500;600&family=Space+Grotesk:wght@400;700&family=Fira+Code:wght@400;500&family=Outfit:wght@400;500;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// ============================================
// CUSTOMIZABLE DATA - EDIT THIS SECTION
// ============================================
const personalData = {
  name: "Jarl Wayne Dave Tordecilla",
  shortName: "Jarl Tordecilla", // For navbar
  tagline: "Full-Stack Developer | Flutter • MERN Stack | BSIT Student @ NU Manila",
  heroTitle: "BUILDING THE WEB OF YOUR DREAMS",
  heroSubtitle: "HI! THIS IS JARL TORDECILLA HERE! I'M A FULL-STACK DEVELOPER FROM QUEZON CITY AND A BSIT STUDENT AT NU MANILA",
  bio: "Determined to work with you to build the web solutions you need! A full-stack developer with a passion for building web applications that are fast, scalable, and easy to maintain. I am a quick learner and I am always looking for new challenges and opportunities to grow.",
  photo: portfolio_photo,
  email: "tordecillajarlwaynedave@gmail.com",
  phone: "+63-976-193-9646",
  resumeLink: resume,
  
  socials: {
    github: "https://github.com/jarltordrcilla32",
    linkedin: "https://www.linkedin.com/in/jarl-wayne-dave-tordecilla-2aa099305/",
    facebook: "https://www.facebook.com/jrltrdclla"
  },
  
  education: [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "National University - Manila",
      year: "2022 - Present"
    }
  ],
  
  interests: ["Web Development", "Software Development", "Mobile App Development", "AI Engineering"],
  
  skills: {
    languages: [
      { name: "JavaScript", level: 90 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "Java", level: 85 },
      { name: "Python", level: 80 },
      { name: "Dart", level: 85 },
      { name: "PHP", level: 75 },
      { name: "C++", level: 70 }
    ],
    frameworks: [
      { name: "React.js", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "Flutter", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "TailwindCSS", level: 95 },
      { name: "Unity", level: 65 }
    ],
    databases: [
      { name: "MongoDB", level: 85 }
    ],
    tools: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Android Studio", level: 80 },
      { name: "Figma", level: 85 }
    ]
  },
  
  projects: [
    {
      id: 1,
      title: "GreenConnect Web",
      description: "A full-stack web application where it is the homepage of the ConnectGreen system for guests to view the information about the community and for the admins to manage the community and the users.",
      thumbnail: connectgreen_web,
      technologies: ["React", "Node.js", "MongoDB", "TailwindCSS", "Express.js"],
      github: "#",
      demo: "https://connectgreenmrf.com/", // Add your live demo link here
      status: "Live"
    },
    {
      id: 2,
      title: "GreenConnect Mobile",
      description: "The mobile application of the ConnectGreen system for the community users to schedule a pick-up appointment for the admins to collect their food waste and to buy the fertilizers made from the food waste.",
      thumbnail: connectgreen_mobile,
      technologies: ["Flutter", "Dart", "MongoDB"],
      github: "#",
      demo: "#",
      status: "Live"
    },
    {
      id: 3,
      title: "GreenConnect",
      description: "A separate project but still based on the ConnectGreen system where it is an ecommerce platform for the users to buy the fertilizers made from the food waste and the admins to manage the products and the orders.",
      thumbnail: greenconnect_thumbnail,
      technologies: ["React", "Chart.js", "Node.js", "MongoDB", "TailwindCSS", "Express.js"],
      github: "https://github.com/jarltordrcilla32/ecommerce-web_jarl",
      demo: "https://greenconnect-ecommerce.vercel.app/",
      status: "Live"
    }
  ],
  
  certifications: [
    {
      id: 1,
      title: "Certified Fundamentals in Cybersecurity",
      issuer: "Fortinet",
      date: "June 14, 2025"
    }
  ],
  
  achievements: [
    {
      id: 1,
      title: "Dean's First Honors List",
      description: "Academic Excellence Award",
      date: "2025"
    }
  ]
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [autoPlayProgress, setAutoPlayProgress] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Magnetic button state
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  
  // 3D tilt state for cards
  const [tiltStyle, setTiltStyle] = useState({});
  
  // Flip card state for certifications
  const [flippedCards, setFlippedCards] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Carousel auto-play with progress
  useEffect(() => {
    if (!isAutoPlaying) return;

    const duration = 8000; // 8 seconds
    const interval = 50; // Update every 50ms for smooth progress bar
    const increment = (interval / duration) * 100;

    const progressTimer = setInterval(() => {
      setAutoPlayProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % personalData.projects.length);
      setAutoPlayProgress(0);
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(slideTimer);
    };
  }, [isAutoPlaying]);

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % personalData.projects.length);
    setAutoPlayProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + personalData.projects.length) % personalData.projects.length);
    setAutoPlayProgress(0);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlayProgress(0);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Magnetic button effect
  const handleMagneticMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagneticPos({ x: x * 0.3, y: y * 0.3 }); // 0.3 factor for subtle movement
  };

  const handleMagneticLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  // 3D tilt effect for cards
  const handleCardTilt = (e, cardId) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTiltStyle({
      [cardId]: {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.1s ease-out'
      }
    });
  };

  const handleCardTiltLeave = (cardId) => {
    setTiltStyle({
      [cardId]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.5s ease-out'
      }
    });
  };

  // Toggle flip card
  const toggleFlipCard = (cardId) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const navItems = ['hero', 'about', 'skills', 'projects', 'certifications', 'achievements', 'contact'];

  return (
    <>
      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(10px, -20px) scale(1.05); }
          50% { transform: translate(-15px, 10px) scale(0.95); }
          75% { transform: translate(20px, 15px) scale(1.02); }
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, 20px) rotate(3deg); }
          66% { transform: translate(25px, -15px) rotate(-3deg); }
        }
        
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes gentleBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: floatSlow 25s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-gentle-bob {
          animation: gentleBob 3s ease-in-out infinite;
        }
        
        .card-spotlight {
          position: relative;
          overflow: hidden;
        }
        
        .card-spotlight::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(255, 255, 255, 0.15),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        
        .card-spotlight:hover::before {
          opacity: 1;
        }
        
        @keyframes flipCard {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(180deg); }
        }
        
        @keyframes unlockBadge {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        .flip-card {
          perspective: 1000px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-float, .animate-float-slow, .animate-gentle-bob {
            animation: none;
          }
          .card-spotlight::before {
            display: none;
          }
          .flip-card-inner {
            transition: none;
          }
        }
        
        @media (max-width: 768px) {
          .card-spotlight::before {
            display: none;
          }
        }
        
        /* Skill Progress Ring - Glassmorphism (Apple-style) */
        .skill-tag-with-ring {
          position: relative;
        }
        
        .skill-progress-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 110px;
          height: 110px;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.4));
          z-index: 9999;
        }
        
        .skill-tag-with-ring:hover .skill-progress-ring {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        
        .skill-progress-ring circle {
          fill: none;
          stroke-width: 5;
          stroke-linecap: round;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
        
        /* Glassmorphism backdrop - Apple style */
        .skill-glass-backdrop {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          border-radius: 50%;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          background: rgba(255, 255, 255, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .skill-glass-backdrop-dark {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 4px 12px rgba(0, 0, 0, 0.4);
        }
        
        /* ==== NEW SKILL CARD EFFECTS ==== */
        
        /* 1. Animated Gradient Border */
        .skill-card-enhanced {
          position: relative;
          isolation: isolate;
        }
        
        .skill-card-enhanced::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 24px;
          padding: 2px;
          background: linear-gradient(
            45deg,
            transparent 0%,
            transparent 40%,
            var(--gradient-color-1) 50%,
            var(--gradient-color-2) 60%,
            transparent 100%
          );
          background-size: 300% 300%;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
          animation: gradientBorder 3s ease infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        
        .skill-card-enhanced:hover::before {
          opacity: 1;
        }
        
        @keyframes gradientBorder {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        /* 2. Blob Movement Animation */
        @keyframes blobFloat {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% { 
            transform: translate(30px, -30px) scale(1.1);
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% { 
            transform: translate(-20px, 20px) scale(0.9);
            border-radius: 70% 30% 50% 50% / 30% 40% 60% 70%;
          }
          75% { 
            transform: translate(40px, 10px) scale(1.05);
            border-radius: 40% 70% 40% 60% / 60% 50% 40% 50%;
          }
        }
        
        .blob-animated {
          animation: blobFloat 20s ease-in-out infinite;
          will-change: transform, border-radius;
        }
        
        /* 3. Icon Rotation on Hover */
        @keyframes iconSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .skill-card-enhanced:hover .icon-rotate {
          animation: iconSpin 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        /* 4. Staggered Tag Entrance */
        @keyframes tagFlyIn {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .tag-staggered {
          animation: tagFlyIn 0.5s ease-out backwards;
        }
        
        /* Additional: Floating particles effect */
        @keyframes particleFloat {
          0%, 100% { 
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% { 
            transform: translate(var(--particle-x, 20px), var(--particle-y, -30px));
            opacity: 0.7;
          }
        }
        
        /* Wave ripple effect on tag hover */
        @keyframes waveRipple {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        /* Responsive adjustments */
        @media (prefers-reduced-motion: reduce) {
          .skill-card-enhanced::before,
          .blob-animated,
          .icon-rotate,
          .tag-staggered {
            animation: none !important;
            transition: none !important;
          }
        }
        
        @media (max-width: 768px) {
          .skill-card-enhanced::before {
            display: none;
          }
        }
      `}</style>
      
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
      isDark 
        ? 'bg-slate-900 text-slate-100' 
        : 'bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 text-stone-900'
      }`} style={{ 
        fontFamily: isDark ? "'Fira Code', monospace" : "'Lora', serif",
        backgroundSize: isDark ? '100% 100%' : '400% 400%',
        animation: isDark ? 'none' : 'gradientShift 15s ease infinite'
      }}>
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <div 
          className={`h-full transition-all duration-300 ${
            isDark ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'
          }`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Navigation */}
      <nav className={`fixed top-4 left-4 right-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 z-50 ${
        isDark 
          ? 'bg-slate-800/90 backdrop-blur-md border border-slate-700' 
          : 'bg-white/90 backdrop-blur-md border border-stone-200 shadow-lg'
      } rounded-3xl md:rounded-full px-3 sm:px-6 py-2 sm:py-3 md:max-w-4xl md:w-full transition-colors duration-300`} style={{ fontFamily: "'Outfit', sans-serif" }}>
        <div className="flex justify-between items-center">
          <div className={`text-base sm:text-xl font-bold tracking-wide truncate ${isDark ? 'text-blue-400' : 'text-amber-700'}`}>
            {personalData.shortName}
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize tracking-wide transition-all relative text-sm lg:text-base ${
                  activeSection === item 
                    ? isDark ? 'text-blue-400 font-semibold' : 'text-amber-700 font-semibold'
                    : isDark ? 'text-slate-300 hover:text-blue-400' : 'text-stone-600 hover:text-amber-600'
                }`}
              >
                {item === 'hero' ? 'home' : item}
                {activeSection === item && (
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 rounded-full ${
                    isDark ? 'bg-blue-400' : 'bg-amber-600'
                  }`} />
                )}
              </button>
            ))}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full transition-all hover:scale-110 ${
                isDark 
                  ? 'hover:bg-slate-700 text-blue-400' 
                  : 'hover:bg-stone-100 text-amber-700'
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-1">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-1.5 sm:p-2 rounded-xl transition-all ${isDark ? 'text-blue-400 hover:bg-slate-700' : 'text-amber-700 hover:bg-stone-100'}`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-1.5 sm:p-2 rounded-xl transition-all ${isDark ? 'text-blue-400 hover:bg-slate-700' : 'text-amber-700 hover:bg-stone-100'}`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden mt-4 pt-4 border-t ${isDark ? 'border-slate-700' : 'border-stone-200'}`}>
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`block w-full text-left px-4 py-2 capitalize transition-colors rounded-lg ${
                  activeSection === item
                    ? isDark ? 'bg-slate-700 text-blue-400' : 'bg-stone-100 text-amber-700'
                    : isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-stone-100 text-stone-600'
                }`}
              >
                {item === 'hero' ? 'home' : item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className={`absolute top-8 right-8 p-3 rounded-full transition-all hover:scale-110 ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                : 'bg-white hover:bg-stone-100 text-stone-700'
            }`}
          >
            <X size={28} />
          </button>
          <div className="max-w-6xl max-h-[90vh] w-full">
            <img 
              src={lightboxImage.src} 
              alt={lightboxImage.title}
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className={`mt-6 text-center ${isDark ? 'text-white' : 'text-white'}`}>
              <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
                {lightboxImage.title}
              </h3>
              <p className="text-lg">{lightboxImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section 
        id="hero" 
        className={`min-h-screen flex items-center justify-center px-6 relative overflow-hidden transition-opacity duration-1000 ${
          visibleSections.has('hero') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Animated Background with Floating Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float ${
            isDark ? 'bg-blue-500' : 'bg-amber-400'
          }`} />
          <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float-slow ${
            isDark ? 'bg-cyan-500' : 'bg-orange-400'
          }`} />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 animate-float ${
            isDark ? 'bg-purple-500' : 'bg-rose-400'
          }`} style={{ animationDelay: '3s', animationDuration: '22s' }} />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className={`text-4xl sm:text-6xl md:text-8xl font-bold mb-6 tracking-wider animate-fade-in ${
            isDark 
              ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent' 
              : 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent'
          }`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
            {personalData.heroTitle}
          </h1>
          <p className={`text-lg sm:text-2xl md:text-3xl mb-12 px-4 ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
            {personalData.heroSubtitle}
          </p>
          <button
            onClick={() => scrollToSection('projects')}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className={`group inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-semibold tracking-wide transition-all hover:scale-105 shadow-2xl ${
              isDark 
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white' 
                : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white'
            }`} 
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              transform: `translate(${magneticPos.x}px, ${magneticPos.y}px)`
            }}
          >
            View My Work
            <ChevronDown className="group-hover:translate-y-1 transition-transform" size={24} />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className={`py-32 px-6 transition-opacity duration-1000 ${
          isDark ? 'bg-slate-800/30' : 'bg-gradient-to-br from-white via-stone-50 to-amber-50'
        } ${visibleSections.has('about') ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-16 sm:mb-24 tracking-wide ${isDark ? 'text-blue-400' : 'text-amber-700'} ${visibleSections.has('about') ? 'animate-slide-up' : 'opacity-0'}`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
            About Me
          </h2>
          
          {/* Photo */}
          <div className="flex justify-center mb-12 sm:mb-16">
            <div className="relative group">
              <div className={`absolute inset-0 rounded-full blur-3xl transition-all animate-pulse ${
                isDark ? 'bg-blue-500/40' : 'bg-amber-500/40'
              }`} style={{ animationDuration: '3s' }}></div>
              <img 
                src={personalData.photo} 
                alt={personalData.name}
                className="relative rounded-full shadow-2xl w-48 h-48 sm:w-64 sm:h-64 object-cover transition-transform hover:scale-105 duration-500 border-4 border-white/20"
              />
            </div>
          </div>

          {/* Name & Tagline */}
          <div className="mb-12 px-4">
            <h3 className={`text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
              {personalData.name}
            </h3>
            <p className={`text-xl sm:text-3xl mb-6 sm:mb-8 tracking-wide ${isDark ? 'text-slate-300' : 'text-stone-600'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
              {personalData.tagline}
            </p>
          </div>

          {/* Bio */}
          <p className={`text-lg sm:text-2xl leading-relaxed mb-12 sm:mb-16 max-w-3xl mx-auto px-4 ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
            {personalData.bio}
          </p>

          {/* Buttons & Socials */}
          <div className="flex flex-col items-center gap-6 sm:gap-8 px-4">
            <a
              href={personalData.resumeLink}
              download="Jarl-Wayne-Dave-Tordecilla_Resume.pdf"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className={`inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-semibold tracking-wide transition-all hover:scale-105 shadow-2xl ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white' 
                  : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white'
              }`} 
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                transform: `translate(${magneticPos.x}px, ${magneticPos.y}px)`
              }}
            >
              <Download size={22} />
              Download Resume
            </a>

            <div className="flex gap-4 sm:gap-6">
              {[
                { icon: Github, link: personalData.socials.github },
                { icon: Linkedin, link: personalData.socials.linkedin },
                { icon: Facebook, link: personalData.socials.facebook }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 sm:p-5 rounded-2xl transition-all hover:scale-110 animate-gentle-bob ${
                    isDark 
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700' 
                      : 'bg-white hover:bg-stone-50 text-stone-700 shadow-xl border border-stone-200'
                  }`}
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Part 2: Interactive 3D Tilt Cards */}
        <div className="max-w-7xl mx-auto mt-20 sm:mt-32">
          <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
            {/* Education Card */}
            <div 
              className={`card-spotlight p-12 rounded-3xl transition-all duration-300 cursor-default ${
                isDark ? 'bg-slate-800/70 border-2 border-slate-700 hover:shadow-2xl hover:shadow-blue-500/30' : 'bg-white border-2 border-stone-200 shadow-xl hover:shadow-2xl hover:shadow-amber-500/40'
              }`}
              onMouseMove={(e) => handleCardTilt(e, 'education')}
              onMouseLeave={() => handleCardTiltLeave('education')}
              style={{
                ...(tiltStyle['education'] || {}),
                willChange: 'transform'
              }}
            >
              {/* Floating Icon with Animation */}
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 animate-gentle-bob ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-900/50 to-cyan-900/30 border border-blue-700/30' 
                  : 'bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200'
              }`}>
                <BookOpen size={36} className={isDark ? 'text-blue-400' : 'text-amber-600'} />
              </div>
              
              {/* Dark Mode: Neon accent line */}
              {isDark && (
                <div className="w-16 h-1 mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
              )}
              
              <h4 className={`text-3xl font-bold mb-8 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-600'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                Education
              </h4>
              {personalData.education.map((edu, idx) => (
                <div key={idx} className="mb-6 relative">
                  <p className={`text-xl font-semibold mb-2 ${isDark ? 'text-slate-200' : 'text-stone-800'}`}>{edu.degree}</p>
                  <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                    {edu.school}
                  </p>
                  <p className={`text-lg ${isDark ? 'text-slate-500 font-mono' : 'text-stone-500'}`}>
                    {edu.year}
                  </p>
                </div>
              ))}
            </div>

            {/* Interests Card */}
            <div 
              className={`card-spotlight p-12 rounded-3xl transition-all duration-300 cursor-default ${
                isDark ? 'bg-slate-800/70 border-2 border-slate-700 hover:shadow-2xl hover:shadow-blue-500/30' : 'bg-white border-2 border-stone-200 shadow-xl hover:shadow-2xl hover:shadow-amber-500/40'
              }`}
              onMouseMove={(e) => handleCardTilt(e, 'interests')}
              onMouseLeave={() => handleCardTiltLeave('interests')}
              style={{
                ...(tiltStyle['interests'] || {}),
                willChange: 'transform'
              }}
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 animate-gentle-bob ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-900/50 to-cyan-900/30 border border-blue-700/30' 
                  : 'bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200'
              }`} style={{ animationDelay: '0.2s' }}>
                <Sparkles size={36} className={isDark ? 'text-blue-400' : 'text-amber-600'} />
              </div>
              
              {isDark && (
                <div className="w-16 h-1 mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
              )}
              
              <h4 className={`text-3xl font-bold mb-8 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-600'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                Interests
              </h4>
              <div className="flex flex-wrap gap-3">
                {personalData.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className={`px-5 py-3 rounded-xl text-base tracking-wide transition-all hover:scale-110 hover:-translate-y-1 ${
                      isDark 
                        ? 'bg-slate-900 text-blue-300 border border-slate-700 hover:bg-slate-800 hover:shadow-lg hover:shadow-blue-500/30' 
                        : 'bg-gradient-to-br from-amber-50 to-orange-50 text-amber-700 border border-amber-200 hover:shadow-lg hover:shadow-amber-500/30'
                    }`} 
                    style={{ 
                      fontFamily: "'Outfit', sans-serif",
                      transitionDelay: `${idx * 50}ms`
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div 
              className={`card-spotlight p-12 rounded-3xl transition-all duration-300 cursor-default ${
                isDark ? 'bg-slate-800/70 border-2 border-slate-700 hover:shadow-2xl hover:shadow-blue-500/30' : 'bg-white border-2 border-stone-200 shadow-xl hover:shadow-2xl hover:shadow-amber-500/40'
              }`}
              onMouseMove={(e) => handleCardTilt(e, 'contact')}
              onMouseLeave={() => handleCardTiltLeave('contact')}
              style={{
                ...(tiltStyle['contact'] || {}),
                willChange: 'transform'
              }}
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 animate-gentle-bob ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-900/50 to-cyan-900/30 border border-blue-700/30' 
                  : 'bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200'
              }`} style={{ animationDelay: '0.4s' }}>
                <Mail size={36} className={isDark ? 'text-blue-400' : 'text-amber-600'} />
              </div>
              
              {isDark && (
                <div className="w-16 h-1 mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
              )}
              
              <h4 className={`text-3xl font-bold mb-8 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-600'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                Contact
              </h4>
              <div className="space-y-4">
                <a 
                  href={`mailto:${personalData.email}`} 
                  className={`flex items-start gap-3 text-base hover:underline break-all group ${isDark ? 'text-slate-300' : 'text-stone-700'}`}
                >
                  <Mail size={20} className={`flex-shrink-0 mt-0.5 transition-transform group-hover:scale-110 ${isDark ? 'text-blue-400' : 'text-amber-600'}`} />
                  <span className="leading-tight">{personalData.email}</span>
                </a>
                <a 
                  href={`tel:${personalData.phone}`} 
                  className={`flex items-center gap-3 text-base hover:underline group ${isDark ? 'text-slate-300' : 'text-stone-700'}`}
                >
                  <Phone size={20} className={`flex-shrink-0 transition-transform group-hover:scale-110 ${isDark ? 'text-blue-400' : 'text-amber-600'}`} />
                  {personalData.phone}
                </a>
              </div>
              <p className={`mt-6 text-base leading-relaxed ${isDark ? 'text-slate-400 italic' : 'text-stone-600'}`}>
                Let's connect and create something amazing together!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - REDESIGNED BENTO GRID */}
      <section 
        id="skills" 
        className={`py-32 px-6 transition-opacity duration-1000 ${
          isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50'
        } ${visibleSections.has('skills') ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-16 sm:mb-24 text-center tracking-wide ${isDark ? 'text-blue-400' : 'text-amber-700'} ${visibleSections.has('skills') ? 'animate-slide-up' : 'opacity-0'}`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
            Skills & Technologies
          </h2>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Languages - Takes 2 columns, auto height */}
            <div 
              className={`skill-card-enhanced md:col-span-2 p-12 rounded-3xl transition-all duration-300 relative overflow-hidden ${
              isDark ? 'bg-slate-800 border border-slate-700 hover:shadow-2xl hover:shadow-blue-500/20' : 'bg-white border border-stone-200 shadow-2xl hover:shadow-2xl hover:shadow-amber-500/30'
              }`}
              style={{
                '--gradient-color-1': isDark ? '#3b82f6' : '#f59e0b',
                '--gradient-color-2': isDark ? '#06b6d4' : '#f97316',
                ...(tiltStyle['languages'] || {})
              }}
              onMouseMove={(e) => handleCardTilt(e, 'languages')}
              onMouseLeave={() => handleCardTiltLeave('languages')}
            >
              {/* Animated Background Blob */}
              <div className={`blob-animated absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 ${
                isDark ? 'bg-blue-500' : 'bg-amber-500'
              }`}></div>
              
              <div className="relative z-10">
                {/* Icon with Rotation */}
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8 ${
                  isDark ? 'bg-blue-900/40' : 'bg-amber-100'
                }`}>
                  <Code2 size={44} className={`icon-rotate ${isDark ? 'text-blue-400' : 'text-amber-600'}`} />
                </div>
                <h3 className={`text-4xl font-bold mb-10 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Languages
                </h3>
                {/* Staggered Tags */}
                <div className="flex flex-wrap gap-4">
                  {personalData.skills.languages.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`tag-staggered px-6 py-3 rounded-xl text-lg font-medium tracking-wide transition-all hover:scale-110 hover:-rotate-2 ${
                        isDark 
                          ? 'bg-blue-900/60 text-blue-200 border border-blue-700 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-500/50' 
                          : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 hover:shadow-lg hover:shadow-amber-500/50'
                      }`} 
                      style={{ 
                        fontFamily: "'Outfit', sans-serif",
                        animationDelay: `${idx * 0.1}s`
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Frameworks - Takes 2 columns, auto height */}
            <div 
              className={`skill-card-enhanced md:col-span-2 p-12 rounded-3xl transition-all duration-300 relative overflow-hidden ${
              isDark ? 'bg-slate-800 border border-slate-700 hover:shadow-2xl hover:shadow-blue-500/20' : 'bg-white border border-stone-200 shadow-2xl hover:shadow-2xl hover:shadow-amber-500/30'
              }`}
              style={{
                '--gradient-color-1': isDark ? '#06b6d4' : '#f97316',
                '--gradient-color-2': isDark ? '#8b5cf6' : '#f59e0b',
                ...(tiltStyle['frameworks'] || {})
              }}
              onMouseMove={(e) => handleCardTilt(e, 'frameworks')}
              onMouseLeave={() => handleCardTiltLeave('frameworks')}
            >
              {/* Animated Background Blob */}
              <div className={`blob-animated absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20 ${
                isDark ? 'bg-blue-500' : 'bg-amber-500'
              }`} style={{ animationDelay: '5s' }}></div>
              
              <div className="relative z-10">
                {/* Icon with Rotation */}
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8 ${
                  isDark ? 'bg-blue-900/40' : 'bg-amber-100'
                }`}>
                  <SquareLibrary size={44} className={`icon-rotate ${isDark ? 'text-blue-400' : 'text-amber-600'}`} />
                </div>
                <h3 className={`text-4xl font-bold mb-10 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Frameworks & Libraries
                </h3>
                {/* Staggered Tags */}
                <div className="flex flex-wrap gap-4">
                  {personalData.skills.frameworks.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`tag-staggered px-6 py-3 rounded-xl text-lg font-medium tracking-wide transition-all hover:scale-110 hover:rotate-2 ${
                        isDark 
                          ? 'bg-blue-900/60 text-blue-200 border border-blue-700 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-500/50' 
                          : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 hover:shadow-lg hover:shadow-amber-500/50'
                      }`} 
                      style={{ 
                        fontFamily: "'Outfit', sans-serif",
                        animationDelay: `${idx * 0.1}s`
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Databases - Takes 2 columns */}
            <div 
              className={`skill-card-enhanced md:col-span-2 p-10 rounded-3xl transition-all duration-300 relative overflow-hidden ${
              isDark ? 'bg-slate-800 border border-slate-700 hover:shadow-2xl hover:shadow-blue-500/20' : 'bg-white border border-stone-200 shadow-2xl hover:shadow-2xl hover:shadow-amber-500/30'
              }`}
              style={{
                '--gradient-color-1': isDark ? '#8b5cf6' : '#f59e0b',
                '--gradient-color-2': isDark ? '#ec4899' : '#ef4444',
                ...(tiltStyle['databases'] || {})
              }}
              onMouseMove={(e) => handleCardTilt(e, 'databases')}
              onMouseLeave={() => handleCardTiltLeave('databases')}
            >
              {/* Animated Background Blob */}
              <div className={`blob-animated absolute top-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-20 ${
                isDark ? 'bg-blue-500' : 'bg-amber-500'
              }`} style={{ animationDelay: '10s' }}></div>
              
              <div className="relative z-10">
                {/* Icon with Rotation */}
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${
                  isDark ? 'bg-blue-900/40' : 'bg-amber-100'
                }`}>
                  <Database size={36} className={`icon-rotate ${isDark ? 'text-blue-400' : 'text-amber-600'}`} />
                </div>
                <h3 className={`text-3xl font-bold mb-6 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Databases
                </h3>
                {/* Staggered Tags */}
                <div className="flex flex-wrap gap-3">
                  {personalData.skills.databases.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`tag-staggered px-5 py-2 rounded-xl text-base font-medium tracking-wide transition-all hover:scale-110 hover:-rotate-2 ${
                        isDark 
                          ? 'bg-blue-900/60 text-blue-200 border border-blue-700 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-500/50' 
                          : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 hover:shadow-lg hover:shadow-amber-500/50'
                      }`} 
                      style={{ 
                        fontFamily: "'Outfit', sans-serif",
                        animationDelay: `${idx * 0.1}s`
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools - Takes 2 columns */}
            <div 
              className={`skill-card-enhanced md:col-span-2 p-10 rounded-3xl transition-all duration-300 relative overflow-hidden ${
              isDark ? 'bg-slate-800 border border-slate-700 hover:shadow-2xl hover:shadow-blue-500/20' : 'bg-white border border-stone-200 shadow-2xl hover:shadow-2xl hover:shadow-amber-500/30'
              }`}
              style={{
                '--gradient-color-1': isDark ? '#10b981' : '#f97316',
                '--gradient-color-2': isDark ? '#3b82f6' : '#f59e0b',
                ...(tiltStyle['tools'] || {})
              }}
              onMouseMove={(e) => handleCardTilt(e, 'tools')}
              onMouseLeave={() => handleCardTiltLeave('tools')}
            >
              {/* Animated Background Blob */}
              <div className={`blob-animated absolute bottom-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 ${
                isDark ? 'bg-blue-500' : 'bg-amber-500'
              }`} style={{ animationDelay: '15s' }}></div>
              
              <div className="relative z-10">
                {/* Icon with Rotation */}
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${
                  isDark ? 'bg-blue-900/40' : 'bg-amber-100'
                }`}>
                  <Wrench size={36} className={`icon-rotate ${isDark ? 'text-blue-400' : 'text-amber-600'}`} />
                </div>
                <h3 className={`text-3xl font-bold mb-6 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Developer Tools
                </h3>
                {/* Staggered Tags */}
                <div className="flex flex-wrap gap-3">
                  {personalData.skills.tools.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`tag-staggered px-5 py-2 rounded-xl text-base font-medium tracking-wide transition-all hover:scale-110 hover:rotate-2 ${
                        isDark 
                          ? 'bg-blue-900/60 text-blue-200 border border-blue-700 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-500/50' 
                          : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 hover:shadow-lg hover:shadow-amber-500/50'
                      }`} 
                      style={{ 
                        fontFamily: "'Outfit', sans-serif",
                        animationDelay: `${idx * 0.1}s`
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Section - Carousel */}
      <section 
        id="projects" 
        className={`py-32 px-6 transition-opacity duration-1000 overflow-hidden ${
          isDark ? 'bg-slate-800/30' : 'bg-gradient-to-br from-white via-stone-50 to-amber-50'
        } ${visibleSections.has('projects') ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-12 sm:mb-16">
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide ${isDark ? 'text-blue-400' : 'text-amber-700'}`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
              Featured Projects
            </h2>
            
            {/* Auto-play toggle */}
              <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                isDark 
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' 
                  : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200'
              }`}
            >
              {isAutoPlaying ? <Pause size={18} /> : <Play size={18} />}
              <span className="text-sm font-medium">{isAutoPlaying ? 'Pause' : 'Play'}</span>
              </button>
          </div>

          {/* Carousel Container */}
          <div 
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Carousel Track with Peek Views */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {/* Previous Slide Peek (Hidden on mobile) */}
              <div className="hidden lg:block w-[15%] opacity-40 blur-[2px] transition-all duration-500">
                <div className={`rounded-2xl overflow-hidden border ${
                  isDark ? 'border-slate-700' : 'border-stone-200'
                }`}>
                  <img 
                    src={personalData.projects[(currentSlide - 1 + personalData.projects.length) % personalData.projects.length].thumbnail}
                    alt="Previous"
                    className="w-full h-48 object-cover"
                  />
            </div>
          </div>

              {/* Active Slide - Fixed Height Container */}
              <div className="w-full lg:w-[70%] relative min-h-[600px] md:min-h-[700px]">
            {personalData.projects.map((project, idx) => (
              <div
                key={project.id}
                    className={`absolute inset-0 transition-all duration-700 ${
                      idx === currentSlide 
                        ? 'opacity-100 scale-100 z-10' 
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    {/* Split Reveal Card */}
                    <div className={`group relative h-full rounded-3xl overflow-hidden transition-all duration-500 ${
                      isDark 
                        ? 'bg-slate-900 border-2 border-slate-700' 
                        : 'bg-white border-2 border-stone-200'
                    }`}>
                      {/* Animated Border Gradient */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                        isDark 
                          ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500' 
                          : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500'
                      } blur-xl`} />
                      
                      {/* Card Content */}
                      <div className={`relative h-full ${
                        isDark ? 'bg-slate-900' : 'bg-white'
                      } rounded-3xl m-[2px] overflow-hidden flex flex-col`}>
                        {/* Dark Mode: Terminal Header */}
                        {isDark && (
                          <div className="flex items-center gap-2 px-6 py-3 bg-slate-800 border-b border-slate-700">
                            <div className="flex gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-500" />
                              <div className="w-3 h-3 rounded-full bg-yellow-500" />
                              <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <span className="text-slate-400 text-sm font-mono ml-2">
                              PROJECT_{String(project.id).padStart(2, '0')}.tsx
                            </span>
                            {/* Status Badge */}
                            <span className={`ml-auto px-3 py-1 rounded-full text-xs font-mono ${
                              project.status === 'Live' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}>
                              ● {project.status}
                            </span>
                          </div>
                        )}

                        <div className="flex flex-col md:flex-row flex-1">
                          {/* Left: Image */}
                          <div className={`relative md:w-[45%] overflow-hidden ${
                            isDark ? 'bg-slate-800' : 'bg-gradient-to-br from-amber-50 to-orange-50'
                          }`}>
                            <div className="relative h-64 md:h-full flex items-center justify-center p-8">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                            
                            {/* Image Overlay on Hover */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                              isDark 
                                ? 'bg-gradient-to-t from-slate-900 via-transparent' 
                                : 'bg-gradient-to-t from-white via-transparent'
                            }`} />
                          </div>

                          {/* Right: Content */}
                          <div className="md:w-[55%] p-8 md:p-10 flex flex-col justify-center overflow-y-auto">
                            {/* Light Mode: Decorative Line */}
                            {!isDark && (
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-[2px] bg-gradient-to-r from-amber-500 to-orange-500" />
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  project.status === 'Live' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {project.status}
                                </span>
                              </div>
                            )}

                            {/* Project Number */}
                            <div className={`text-6xl sm:text-7xl font-bold mb-4 ${
                              isDark ? 'text-blue-500/20' : 'text-amber-500/20'
                            }`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
                              {String(project.id).padStart(2, '0')}
                            </div>

                            {/* Title */}
                            <h3 className={`text-3xl sm:text-4xl font-bold mb-4 tracking-wide ${
                              isDark ? 'text-blue-300' : 'text-amber-700'
                            }`} style={{ 
                              fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif"
                            }}>
                    {project.title}
                  </h3>

                            {/* Description */}
                            <p className={`mb-6 text-base sm:text-lg leading-relaxed ${
                              isDark ? 'text-slate-300 font-mono' : 'text-stone-700'
                            }`} style={{ 
                              fontFamily: isDark ? "'Fira Code', monospace" : "'Lora', serif"
                            }}>
                    {project.description}
                  </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                                  className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all hover:scale-105 ${
                          isDark 
                                      ? 'bg-blue-900/60 text-blue-200 border border-blue-700/50 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-500/30' 
                                      : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 hover:shadow-lg hover:shadow-amber-500/30'
                                  }`} 
                                  style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                        {tech}
                      </span>
                    ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3 mt-auto">
                              {/* GitHub Button - Only show if github link is valid */}
                              {project.github && project.github !== '#' && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-2 px-3 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
                                    isDark 
                                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:shadow-lg hover:shadow-blue-500/20' 
                                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 hover:shadow-lg'
                                  }`}
                                  style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                  <Github size={18} />
                                </a>
                              )}
                              
                              {/* Live Demo Button - Only show if demo link is valid */}
                              {project.demo && project.demo !== '#' && (
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-2 px-3 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
                                    isDark 
                                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-blue-500/50' 
                                      : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-amber-500/50'
                                  }`}
                                  style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                  <ExternalLink size={18} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                  </div>
                </div>
              </div>
            ))}
              </div>

              {/* Next Slide Peek (Hidden on mobile) */}
              <div className="hidden lg:block w-[15%] opacity-40 blur-[2px] transition-all duration-500">
                <div className={`rounded-2xl overflow-hidden border ${
                  isDark ? 'border-slate-700' : 'border-stone-200'
                }`}>
                  <img 
                    src={personalData.projects[(currentSlide + 1) % personalData.projects.length].thumbnail}
                    alt="Next"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-3 rounded-full transition-all hover:scale-110 z-10 ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700' 
                  : 'bg-white hover:bg-stone-50 text-amber-700 border border-stone-200 shadow-lg'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 rounded-full transition-all hover:scale-110 z-10 ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700' 
                  : 'bg-white hover:bg-stone-50 text-amber-700 border border-stone-200 shadow-lg'
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Progress Bar & Dots */}
          <div className="mt-8 space-y-4">
            {/* Auto-play Progress Bar */}
            {isAutoPlaying && (
              <div className={`h-1 rounded-full overflow-hidden ${
                isDark ? 'bg-slate-800' : 'bg-stone-200'
              }`}>
                <div 
                  className={`h-full transition-all duration-100 ${
                    isDark 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                      : 'bg-gradient-to-r from-amber-500 to-orange-500'
                  }`}
                  style={{ width: `${autoPlayProgress}%` }}
                />
              </div>
            )}

            {/* Dot Navigation */}
            <div className="flex justify-center gap-3">
              {personalData.projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all ${
                    idx === currentSlide 
                      ? isDark 
                        ? 'w-8 h-2 rounded-full bg-blue-500' 
                        : 'w-8 h-2 rounded-full bg-amber-600'
                      : isDark 
                        ? 'w-2 h-2 rounded-full bg-slate-700 hover:bg-slate-600' 
                        : 'w-2 h-2 rounded-full bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section - Flip Cards */}
      <section 
        id="certifications" 
        className={`py-32 px-6 transition-opacity duration-1000 ${
          isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50'
        } ${visibleSections.has('certifications') ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-bold mb-8 text-center tracking-wide ${isDark ? 'text-blue-400' : 'text-amber-700'} ${visibleSections.has('certifications') ? 'animate-slide-up' : 'opacity-0'}`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
            Certifications
          </h2>
          <p className={`text-center text-lg mb-20 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
            Click or tap to flip cards
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {personalData.certifications.map((cert, idx) => (
              <div
                key={cert.id}
                className={`flip-card h-80 cursor-pointer ${flippedCards.has(cert.id) ? 'flipped' : ''}`}
                onClick={() => toggleFlipCard(cert.id)}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="flip-card-inner">
                  {/* Front of Card - Badge */}
                  <div className={`flip-card-front rounded-3xl p-10 flex flex-col items-center justify-center border-2 ${
                    isDark 
                      ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-2xl shadow-blue-500/10' 
                      : 'bg-gradient-to-br from-white to-stone-50 border-stone-200 shadow-2xl shadow-amber-500/20'
                  }`}>
                    {/* Metallic Badge Effect */}
                    <div className={`relative w-32 h-32 rounded-full flex items-center justify-center mb-6 ${
                      isDark 
                        ? 'bg-gradient-to-br from-blue-900/50 via-cyan-900/30 to-blue-900/50 border-4 border-blue-700/50 shadow-lg shadow-blue-500/50' 
                        : 'bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100 border-4 border-amber-300 shadow-lg shadow-amber-500/50'
                    }`}>
                      {/* Shine effect */}
                      <div className={`absolute inset-0 rounded-full ${
                        isDark 
                          ? 'bg-gradient-to-tr from-transparent via-blue-400/20 to-transparent' 
                          : 'bg-gradient-to-tr from-transparent via-white/60 to-transparent'
                      }`} />
                      <ShieldCheck size={48} className={isDark ? 'text-blue-400 relative z-10' : 'text-amber-600 relative z-10'} />
                </div>
                    
                    <h3 className={`text-2xl font-bold text-center mb-3 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {cert.title}
                </h3>
                    
                    {/* Click indicator */}
                    <div className={`mt-auto text-sm ${isDark ? 'text-slate-500' : 'text-stone-500'}`}>
                      Click to see details →
                    </div>
                  </div>

                  {/* Back of Card - Details */}
                  <div className={`flip-card-back rounded-3xl p-10 flex flex-col justify-center border-2 ${
                    isDark 
                      ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700' 
                      : 'bg-gradient-to-br from-stone-50 to-white border-stone-200'
                  }`}>
                    {/* Decorative element */}
                    {isDark && (
                      <div className="w-full h-1 mb-6 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full" />
                    )}
                    {!isDark && (
                      <div className="w-full h-1 mb-6 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full" />
                    )}
                    
                    <h3 className={`text-2xl font-bold mb-6 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {cert.title}
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-amber-600'}`} />
                        <div>
                          <p className={`text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>Issuer</p>
                          <p className={`text-lg font-medium ${isDark ? 'text-slate-200' : 'text-stone-800'}`}>{cert.issuer}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-amber-600'}`} />
                        <div>
                          <p className={`text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>Date Earned</p>
                          <p className={`text-lg font-medium ${isDark ? 'text-slate-200 font-mono' : 'text-stone-800'}`}>{cert.date}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative element */}
                    {isDark && (
                      <div className="w-full h-1 mt-6 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full" />
                    )}
                    {!isDark && (
                      <div className="w-full h-1 mt-6 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full" />
                    )}
                    
                    <div className={`mt-auto text-center text-sm ${isDark ? 'text-slate-500' : 'text-stone-500'}`}>
                      ← Click to flip back
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section - Vertical Timeline */}
      <section 
        id="achievements" 
        className={`py-32 px-6 transition-opacity duration-1000 ${
          isDark ? 'bg-slate-800/30' : 'bg-gradient-to-br from-white via-stone-50 to-amber-50'
        } ${visibleSections.has('achievements') ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-bold mb-8 text-center tracking-wide ${isDark ? 'text-blue-400' : 'text-amber-700'} ${visibleSections.has('achievements') ? 'animate-slide-up' : 'opacity-0'}`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
            Achievements
          </h2>
          <p className={`text-center text-lg mb-20 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
            My journey of excellence
          </p>
          
          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical Line */}
            <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 ${
              isDark 
                ? 'bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500' 
                : 'bg-gradient-to-b from-amber-500 via-orange-500 to-amber-500'
            }`} />
            
            {/* Timeline Items */}
            {personalData.achievements.map((achievement, idx) => (
              <div
                key={achievement.id}
                className={`relative mb-16 last:mb-0 ${
                  idx % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                }`}
                style={{ 
                  transitionDelay: `${idx * 200}ms`,
                  opacity: visibleSections.has('achievements') ? 1 : 0,
                  transform: visibleSections.has('achievements') ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.6s ease-out'
                }}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 ${
                  isDark 
                    ? 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/50' 
                    : 'bg-white border-amber-600 shadow-lg shadow-amber-500/50'
                } z-10 animate-gentle-bob`} style={{ animationDelay: `${idx * 0.3}s` }}>
                  {/* Pulsing ring */}
                  <div className={`absolute inset-0 rounded-full animate-ping ${
                    isDark ? 'bg-blue-500' : 'bg-amber-600'
                  }`} style={{ animationDuration: '3s', animationDelay: `${idx * 0.5}s` }} />
                </div>

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 ${idx % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                  <div className={`p-8 rounded-2xl border-2 transition-all duration-500 hover:scale-105 ${
                    isDark 
                      ? 'bg-slate-900 border-slate-700 hover:shadow-2xl hover:shadow-blue-500/20' 
                      : 'bg-white border-stone-200 hover:shadow-2xl hover:shadow-amber-500/30'
                  }`}>
                    {/* Year Badge */}
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                      isDark 
                        ? 'bg-blue-900/50 text-blue-300 border border-blue-700' 
                        : 'bg-amber-100 text-amber-700 border border-amber-300'
                    }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {achievement.date}
                </div>
                    
                    {/* Trophy Icon */}
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 animate-gentle-bob ${
                      isDark 
                        ? 'bg-gradient-to-br from-blue-900/50 to-cyan-900/30 border border-blue-700/30' 
                        : 'bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200'
                    }`} style={{ animationDelay: `${idx * 0.2 + 0.5}s` }}>
                      <Award size={32} className={isDark ? 'text-blue-400' : 'text-amber-600'} />
                </div>
                    
                    {/* Title */}
                <h3 className={`text-2xl font-bold mb-3 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {achievement.title}
                </h3>
                    
                    {/* Description */}
                    <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
                  {achievement.description}
                </p>
                    
                    {/* Decorative line - Dark Mode */}
                    {isDark && (
                      <div className="w-20 h-1 mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                    )}
                    {!isDark && (
                      <div className="w-20 h-1 mt-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className={`py-32 px-6 transition-opacity duration-1000 ${
          isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50'
        } ${visibleSections.has('contact') ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-5xl md:text-6xl font-bold mb-10 tracking-wide ${isDark ? 'text-blue-400' : 'text-amber-700'}`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
            Get In Touch
          </h2>
          
          <p className={`text-2xl mb-16 max-w-2xl mx-auto px-4 ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>

          <div className={`inline-flex items-center gap-3 sm:gap-4 mb-12 px-4 sm:px-10 py-4 sm:py-6 rounded-2xl max-w-[90vw] sm:max-w-full ${
            isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white shadow-xl border border-stone-200'
          }`}>
            <Mail className={`flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-amber-600'}`} size={24} />
            <a 
              href={`mailto:${personalData.email}`} 
              className={`text-base sm:text-2xl hover:underline break-all leading-tight ${isDark ? 'text-slate-300' : 'text-stone-700'}`}
            >
              {personalData.email}
            </a>
          </div>

          <div className="flex justify-center gap-6 mb-16 px-4">
            {[
              { icon: Github, link: personalData.socials.github },
              { icon: Linkedin, link: personalData.socials.linkedin },
              { icon: Facebook, link: personalData.socials.facebook }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-6 rounded-2xl transition-all hover:scale-110 animate-gentle-bob ${
                  isDark 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700' 
                    : 'bg-white hover:bg-stone-50 text-stone-700 shadow-xl border border-stone-200'
                }`}
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <social.icon size={32} />
              </a>
            ))}
          </div>

          <div className={`pt-12 border-t ${isDark ? 'border-slate-800' : 'border-stone-200'} px-4`}>
            <p className={`text-base sm:text-lg ${isDark ? 'text-slate-500' : 'text-stone-500'}`}>
              © {new Date().getFullYear()} {personalData.name}. All rights reserved.
            </p>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {visibleSections.size > 1 && (
        <button
          onClick={() => scrollToSection('hero')}
          className={`fixed bottom-10 right-10 p-4 rounded-full shadow-2xl transition-all hover:scale-110 z-40 ${
            isDark 
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white' 
              : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white'
          }`}
          aria-label="Back to top"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </button>
      )}
    </div>
    </>
  );
}