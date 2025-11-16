import React, { useState, useEffect } from 'react';
import portfolio_photo from './assets/portfolio_photo.jpg';
import connectgreen_web from './assets/connectgreen_web.png';
import connectgreen_mobile from './assets/connectgreen_mobile.png';
import greenconnect_thumbnail from './assets/greenconnect_thumbnail.png';
import resume from './assets/resume.pdf';
import { Moon, Sun, Menu, X, Github, Linkedin, Facebook, Mail, Download, Grid3x3, List, Award, BookOpen, ChevronDown, Code2, Database, Wrench, Phone, Sparkles, SquareLibrary, ShieldCheck } from 'lucide-react';

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
    languages: ["Java", "JavaScript", "HTML", "CSS", "Python", "PHP", "Dart", "C++"],
    frameworks: ["Flutter", "React.js", "Next.js", "Express.js", "Node.js", "TailwindCSS", "Unity"],
    databases: ["MongoDB"],
    tools: ["Git", "GitHub", "VS Code", "Android Studio", "Figma"]
  },
  
  projects: [
    {
      id: 1,
      title: "GreenConnect Web",
      description: "A full-stack web application where it is the homepage of the ConnectGreen system for guests to view the information about the community and for the admins to manage the community and the users.",
      thumbnail: connectgreen_web,
      technologies: ["React", "Node.js", "MongoDB", "TailwindCSS", "Express.js"]
    },
    {
      id: 2,
      title: "GreenConnect Mobile",
      description: "The mobile application of the ConnectGreen system for the community users to schedule a pick-up appointment for the admins to collect their food waste and to buy the fertilizers made from the food waste.",
      thumbnail: connectgreen_mobile,
      technologies: ["Flutter", "Dart", "MongoDB"]
    },
    {
      id: 3,
      title: "GreenConnect",
      description: "A separate project but still based on the ConnectGreen system where it is an ecommerce platform for the users to buy the fertilizers made from the food waste and the admins to manage the products and the orders.",
      thumbnail: greenconnect_thumbnail,
      technologies: ["React", "Chart.js", "Node.js", "MongoDB", "TailwindCSS", "Express.js"]
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

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navItems = ['hero', 'about', 'skills', 'projects', 'certifications', 'achievements', 'contact'];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark 
        ? 'bg-slate-900 text-slate-100' 
        : 'bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 text-stone-900'
    }`} style={{ fontFamily: isDark ? "'Fira Code', monospace" : "'Lora', serif" }}>
      
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
      <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isDark 
          ? 'bg-slate-800/90 backdrop-blur-md border border-slate-700' 
          : 'bg-white/90 backdrop-blur-md border border-stone-200 shadow-lg'
      } rounded-full px-6 py-3 max-w-4xl w-11/12`} style={{ fontFamily: "'Outfit', sans-serif" }}>
        <div className="flex justify-between items-center">
          <div className={`text-xl font-bold tracking-wide ${isDark ? 'text-blue-400' : 'text-amber-700'}`}>
            {personalData.shortName}
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize tracking-wide transition-all relative ${
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
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full ${isDark ? 'text-blue-400' : 'text-amber-700'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full ${isDark ? 'text-blue-400' : 'text-amber-700'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDark ? 'bg-blue-500' : 'bg-amber-400'
          }`} style={{ animationDuration: '4s' }} />
          <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDark ? 'bg-cyan-500' : 'bg-orange-400'
          }`} style={{ animationDuration: '6s', animationDelay: '1s' }} />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className={`text-6xl md:text-8xl font-bold mb-6 tracking-wider animate-fade-in ${
            isDark 
              ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent' 
              : 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent'
          }`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
            {personalData.heroTitle}
          </h1>
          <p className={`text-2xl md:text-3xl mb-12 ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
            {personalData.heroSubtitle}
          </p>
          <button
            onClick={() => scrollToSection('projects')}
            className={`group inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-semibold tracking-wide transition-all transform hover:scale-105 shadow-2xl ${
              isDark 
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white' 
                : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white'
            }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
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
          <h2 className={`text-5xl md:text-6xl font-bold mb-24 tracking-wide ${isDark ? 'text-blue-400' : 'text-amber-700'}`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
            About Me
          </h2>
          
          {/* Photo */}
          <div className="flex justify-center mb-16">
            <div className="relative group">
              <div className={`absolute inset-0 rounded-full blur-3xl transition-all animate-pulse ${
                isDark ? 'bg-blue-500/40' : 'bg-amber-500/40'
              }`} style={{ animationDuration: '3s' }}></div>
              <img 
                src={personalData.photo} 
                alt={personalData.name}
                className="relative rounded-full shadow-2xl w-64 h-64 object-cover transition-transform hover:scale-105 duration-500 border-4 border-white/20"
              />
            </div>
          </div>

          {/* Name & Tagline */}
          <div className="mb-12">
            <h3 className={`text-5xl md:text-6xl font-bold mb-6 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
              {personalData.name}
            </h3>
            <p className={`text-3xl mb-8 tracking-wide ${isDark ? 'text-slate-300' : 'text-stone-600'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
              {personalData.tagline}
            </p>
          </div>

          {/* Bio */}
          <p className={`text-2xl leading-relaxed mb-16 max-w-3xl mx-auto ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
            {personalData.bio}
          </p>

          {/* Buttons & Socials */}
          <div className="flex flex-col items-center gap-8">
            <a
              href={personalData.resumeLink}
              download="Jarl-Wayne-Dave-Tordecilla_Resume.pdf"
              className={`inline-flex items-center gap-3 px-12 py-5 rounded-2xl text-xl font-semibold tracking-wide transition-all transform hover:scale-105 shadow-2xl ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white' 
                  : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white'
              }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
              <Download size={26} />
              Download Resume
            </a>

            <div className="flex gap-6">
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
                  className={`p-5 rounded-2xl transition-all hover:scale-110 ${
                    isDark 
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700' 
                      : 'bg-white hover:bg-stone-50 text-stone-700 shadow-xl border border-stone-200'
                  }`}
                >
                  <social.icon size={28} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Part 2: Details Cards */}
        <div className="max-w-7xl mx-auto mt-32">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Education Card */}
            <div className={`p-12 rounded-3xl transition-all hover:scale-105 duration-300 ${
              isDark ? 'bg-slate-800/70 border border-slate-700 hover:shadow-2xl hover:shadow-blue-500/20' : 'bg-white border border-stone-200 shadow-xl hover:shadow-2xl hover:shadow-amber-500/30'
            }`}>
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 ${
                isDark ? 'bg-blue-900/30' : 'bg-amber-100'
              }`}>
                <BookOpen size={36} className={isDark ? 'text-blue-400' : 'text-amber-600'} />
              </div>
              <h4 className={`text-3xl font-bold mb-8 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-600'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                Education
              </h4>
              {personalData.education.map((edu, idx) => (
                <div key={idx} className="mb-6">
                  <p className="text-xl font-semibold mb-2">{edu.degree}</p>
                  <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                    {edu.school}
                  </p>
                  <p className={`text-lg ${isDark ? 'text-slate-500' : 'text-stone-500'}`}>
                    {edu.year}
                  </p>
                </div>
              ))}
            </div>

            {/* Interests Card */}
            <div className={`p-12 rounded-3xl transition-all hover:scale-105 duration-300 ${
              isDark ? 'bg-slate-800/70 border border-slate-700 hover:shadow-2xl hover:shadow-blue-500/20' : 'bg-white border border-stone-200 shadow-xl hover:shadow-2xl hover:shadow-amber-500/30'
            }`}>
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 ${
                isDark ? 'bg-blue-900/30' : 'bg-amber-100'
              }`}>
                <Sparkles size={36} className={isDark ? 'text-blue-400' : 'text-amber-600'} />
              </div>
              <h4 className={`text-3xl font-bold mb-8 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-600'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                Interests
              </h4>
              <div className="flex flex-wrap gap-3">
                {personalData.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className={`px-5 py-3 rounded-xl text-base tracking-wide transition-all hover:scale-105 ${
                      isDark 
                        ? 'bg-slate-900 text-blue-300 border border-slate-700' 
                        : 'bg-stone-50 text-amber-700 border border-stone-200'
                    }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className={`p-12 rounded-3xl transition-all hover:scale-105 duration-300 ${
              isDark ? 'bg-slate-800/70 border border-slate-700 hover:shadow-2xl hover:shadow-blue-500/20' : 'bg-white border border-stone-200 shadow-xl hover:shadow-2xl hover:shadow-amber-500/30'
            }`}>
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 ${
                isDark ? 'bg-blue-900/30' : 'bg-amber-100'
              }`}>
                <Mail size={36} className={isDark ? 'text-blue-400' : 'text-amber-600'} />
              </div>
              <h4 className={`text-3xl font-bold mb-8 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-600'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                Contact
              </h4>
              <div className="space-y-4">
                <a 
                  href={`mailto:${personalData.email}`} 
                  className={`flex items-start gap-3 text-base hover:underline break-all ${isDark ? 'text-slate-300' : 'text-stone-700'}`}
                >
                  <Mail size={20} className={`flex-shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-amber-600'}`} />
                  <span className="leading-tight">{personalData.email}</span>
                </a>
                <a 
                  href={`tel:${personalData.phone}`} 
                  className={`flex items-center gap-3 text-base hover:underline ${isDark ? 'text-slate-300' : 'text-stone-700'}`}
                >
                  <Phone size={20} className={`flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-amber-600'}`} />
                  {personalData.phone}
                </a>
              </div>
              <p className={`mt-6 text-base ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
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
          <h2 className={`text-5xl md:text-6xl font-bold mb-24 text-center tracking-wide ${isDark ? 'text-blue-400' : 'text-amber-700'}`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
            Skills & Technologies
          </h2>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Languages - Takes 2 columns, auto height */}
            <div className={`md:col-span-2 p-12 rounded-3xl transition-all hover:scale-[1.02] duration-300 relative overflow-hidden ${
              isDark ? 'bg-slate-800 border border-slate-700 hover:shadow-2xl hover:shadow-blue-500/20' : 'bg-white border border-stone-200 shadow-2xl hover:shadow-2xl hover:shadow-amber-500/30'
            }`}>
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 ${
                isDark ? 'bg-blue-500' : 'bg-amber-500'
              }`}></div>
              <div className="relative z-10">
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8 ${
                  isDark ? 'bg-blue-900/40' : 'bg-amber-100'
                }`}>
                  <Code2 size={44} className={isDark ? 'text-blue-400' : 'text-amber-600'} />
                </div>
                <h3 className={`text-4xl font-bold mb-10 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Languages
                </h3>
                <div className="flex flex-wrap gap-4">
                  {personalData.skills.languages.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-6 py-3 rounded-xl text-lg font-medium tracking-wide transition-all hover:scale-110 hover:-rotate-2 ${
                        isDark 
                          ? 'bg-blue-900/60 text-blue-200 border border-blue-700 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-500/50' 
                          : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 hover:shadow-lg hover:shadow-amber-500/50'
                      }`} 
                      style={{ fontFamily: "'Outfit', sans-serif", transitionDelay: `${idx * 50}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Frameworks - Takes 2 columns, auto height */}
            <div className={`md:col-span-2 p-12 rounded-3xl transition-all hover:scale-[1.02] duration-300 relative overflow-hidden ${
              isDark ? 'bg-slate-800 border border-slate-700 hover:shadow-2xl hover:shadow-blue-500/20' : 'bg-white border border-stone-200 shadow-2xl hover:shadow-2xl hover:shadow-amber-500/30'
            }`}>
              <div className={`absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20 ${
                isDark ? 'bg-blue-500' : 'bg-amber-500'
              }`}></div>
              <div className="relative z-10">
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8 ${
                  isDark ? 'bg-blue-900/40' : 'bg-amber-100'
                }`}>
                  <SquareLibrary size={44} className={isDark ? 'text-blue-400' : 'text-amber-600'} />
                </div>
                <h3 className={`text-4xl font-bold mb-10 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Frameworks & Libraries
                </h3>
                <div className="flex flex-wrap gap-4">
                  {personalData.skills.frameworks.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-6 py-3 rounded-xl text-lg font-medium tracking-wide transition-all hover:scale-110 hover:rotate-2 ${
                        isDark 
                          ? 'bg-blue-900/60 text-blue-200 border border-blue-700 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-500/50' 
                          : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 hover:shadow-lg hover:shadow-amber-500/50'
                      }`} 
                      style={{ fontFamily: "'Outfit', sans-serif", transitionDelay: `${idx * 50}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Databases - Takes 2 columns */}
            <div className={`md:col-span-2 p-10 rounded-3xl transition-all hover:scale-[1.02] duration-300 relative overflow-hidden ${
              isDark ? 'bg-slate-800 border border-slate-700 hover:shadow-2xl hover:shadow-blue-500/20' : 'bg-white border border-stone-200 shadow-2xl hover:shadow-2xl hover:shadow-amber-500/30'
            }`}>
              <div className={`absolute top-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-20 ${
                isDark ? 'bg-blue-500' : 'bg-amber-500'
              }`}></div>
              <div className="relative z-10">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${
                  isDark ? 'bg-blue-900/40' : 'bg-amber-100'
                }`}>
                  <Database size={36} className={isDark ? 'text-blue-400' : 'text-amber-600'} />
                </div>
                <h3 className={`text-3xl font-bold mb-6 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Databases
                </h3>
                <div className="flex flex-wrap gap-3">
                  {personalData.skills.databases.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-5 py-2 rounded-xl text-base font-medium tracking-wide transition-all hover:scale-110 ${
                        isDark 
                          ? 'bg-blue-900/60 text-blue-200 border border-blue-700 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-500/50' 
                          : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 hover:shadow-lg hover:shadow-amber-500/50'
                      }`} 
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools - Takes 2 columns */}
            <div className={`md:col-span-2 p-10 rounded-3xl transition-all hover:scale-[1.02] duration-300 relative overflow-hidden ${
              isDark ? 'bg-slate-800 border border-slate-700 hover:shadow-2xl hover:shadow-blue-500/20' : 'bg-white border border-stone-200 shadow-2xl hover:shadow-2xl hover:shadow-amber-500/30'
            }`}>
              <div className={`absolute bottom-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 ${
                isDark ? 'bg-blue-500' : 'bg-amber-500'
              }`}></div>
              <div className="relative z-10">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${
                  isDark ? 'bg-blue-900/40' : 'bg-amber-100'
                }`}>
                  <Wrench size={36} className={isDark ? 'text-blue-400' : 'text-amber-600'} />
                </div>
                <h3 className={`text-3xl font-bold mb-6 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Developer Tools
                </h3>
                <div className="flex flex-wrap gap-3">
                  {personalData.skills.tools.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-5 py-2 rounded-xl text-base font-medium tracking-wide transition-all hover:scale-110 ${
                        isDark 
                          ? 'bg-blue-900/60 text-blue-200 border border-blue-700 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-500/50' 
                          : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 hover:shadow-lg hover:shadow-amber-500/50'
                      }`} 
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className={`py-32 px-6 transition-opacity duration-1000 ${
          isDark ? 'bg-slate-800/30' : 'bg-gradient-to-br from-white via-stone-50 to-amber-50'
        } ${visibleSections.has('projects') ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-20">
            <h2 className={`text-5xl md:text-6xl font-bold tracking-wide ${isDark ? 'text-blue-400' : 'text-amber-700'}`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
              Projects
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'grid'
                    ? isDark ? 'bg-blue-600 text-white shadow-xl' : 'bg-amber-600 text-white shadow-xl'
                    : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Grid3x3 size={24} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'list'
                    ? isDark ? 'bg-blue-600 text-white shadow-xl' : 'bg-amber-600 text-white shadow-xl'
                    : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <List size={24} />
              </button>
            </div>
          </div>

          <div className={viewMode === 'grid' ? 'grid lg:grid-cols-2 gap-10' : 'space-y-10'}>
            {personalData.projects.map((project, idx) => (
              <div
                key={project.id}
                className={`group rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer ${
                  isDark 
                    ? 'bg-slate-900 hover:shadow-2xl hover:shadow-blue-500/20 border border-slate-800' 
                    : 'bg-white hover:shadow-2xl hover:shadow-amber-500/30 border border-stone-200'
                } ${viewMode === 'list' ? 'flex gap-8' : ''}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
                onClick={() => setLightboxImage({ src: project.thumbnail, title: project.title, description: project.description })}
              >
                <div className={`relative overflow-hidden flex items-center justify-center ${
                  viewMode === 'list' ? 'w-2/5' : 'h-80'
                } ${isDark ? 'bg-slate-800' : 'bg-amber-50'}`}>
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className={`p-10 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <h3 className={`text-3xl font-bold mb-4 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
                    {project.title}
                  </h3>
                  <p className={`mb-6 text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all hover:scale-105 ${
                          isDark 
                            ? 'bg-blue-900/50 text-blue-300 border border-blue-700' 
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section 
        id="certifications" 
        className={`py-32 px-6 transition-opacity duration-1000 ${
          isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50'
        } ${visibleSections.has('certifications') ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-bold mb-20 text-center tracking-wide ${isDark ? 'text-blue-400' : 'text-amber-700'}`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
            Certifications
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {personalData.certifications.map((cert, idx) => (
              <div
                key={cert.id}
                className={`p-10 rounded-3xl transition-all duration-500 hover:scale-105 border ${
                  isDark 
                    ? 'bg-slate-800 hover:shadow-2xl hover:shadow-blue-500/20 border-slate-700' 
                    : 'bg-white hover:shadow-2xl hover:shadow-amber-500/30 border-stone-200'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${
                  isDark ? 'bg-blue-900/30' : 'bg-amber-100'
                }`}>
                  <ShieldCheck size={36} className={isDark ? 'text-blue-400' : 'text-amber-600'} />
                </div>
                <h3 className={`text-2xl font-bold mb-3 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {cert.title}
                </h3>
                <p className={`text-lg mb-2 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                  {cert.issuer}
                </p>
                <p className={`text-lg ${isDark ? 'text-slate-500' : 'text-stone-500'}`}>
                  {cert.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section 
        id="achievements" 
        className={`py-32 px-6 transition-opacity duration-1000 ${
          isDark ? 'bg-slate-800/30' : 'bg-gradient-to-br from-white via-stone-50 to-amber-50'
        } ${visibleSections.has('achievements') ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-bold mb-20 text-center tracking-wide ${isDark ? 'text-blue-400' : 'text-amber-700'}`} style={{ fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Playfair Display', serif" }}>
            Achievements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {personalData.achievements.map((achievement, idx) => (
              <div
                key={achievement.id}
                className={`p-10 rounded-3xl transition-all duration-500 hover:scale-105 border ${
                  isDark 
                    ? 'bg-slate-900 hover:shadow-2xl hover:shadow-blue-500/20 border-slate-800' 
                    : 'bg-white hover:shadow-2xl hover:shadow-amber-500/30 border-stone-200'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="relative z-10">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 ${
                  isDark ? 'bg-blue-900/40' : 'bg-amber-100'
                }`}>
                  <Award size={44} className={isDark ? 'text-blue-400' : 'text-amber-600'} />
                </div>
                </div>
                <h3 className={`text-2xl font-bold mb-3 tracking-wide ${isDark ? 'text-blue-300' : 'text-amber-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {achievement.title}
                </h3>
                <p className={`mb-3 text-lg ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
                  {achievement.description}
                </p>
                <p className={`text-lg ${isDark ? 'text-slate-500' : 'text-stone-500'}`}>
                  {achievement.date}
                </p>
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
          
          <p className={`text-2xl mb-16 max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>

          <div className={`inline-flex items-center gap-4 mb-12 px-10 py-6 rounded-2xl ${
            isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white shadow-xl border border-stone-200'
          }`}>
            <Mail className={isDark ? 'text-blue-400' : 'text-amber-600'} size={28} />
            <a 
              href={`mailto:${personalData.email}`} 
              className={`text-2xl hover:underline ${isDark ? 'text-slate-300' : 'text-stone-700'}`}
            >
              {personalData.email}
            </a>
          </div>

          <div className="flex justify-center gap-6 mb-16">
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
                className={`p-6 rounded-2xl transition-all hover:scale-110 ${
                  isDark 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700' 
                    : 'bg-white hover:bg-stone-50 text-stone-700 shadow-xl border border-stone-200'
                }`}
              >
                <social.icon size={32} />
              </a>
            ))}
          </div>

          <div className={`pt-12 border-t ${isDark ? 'border-slate-800' : 'border-stone-200'}`}>
            <p className={`text-lg ${isDark ? 'text-slate-500' : 'text-stone-500'}`}>
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
  );
}