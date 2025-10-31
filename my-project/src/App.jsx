import React, { useState, useEffect, useRef } from 'react';
// === API Base URL ===
const API_BASE_URL = "https://reactorx-backend.onrender.com/api";
const PLACEHOLDER_IMAGE_URL = "https://placehold.co/100x100/333333/FFFFFF?text=NO+IMG";




const heroSlides = [ 
    { 
        
        image: "https://assets2.razerzone.com/images/pnx.assets/618b28dc15c2c5c01bb6fd0e5e5d6f27/razer-huntsman-v3-pro-tenkeyless-8khz-esports-green-edition-desktop.webp" 
    },
    { 
        label: "NEW PHANTOM WHITE", 
        title: "UNVEIL YOUR SETUP", 
        subtitle: "Discover the new clean and minimalist aesthetic.", 
        image: "https://assets2.razerzone.com/images/pnx.assets/82f952078684fd373e3f76c1812ea57a/razer-phantom-white-unveiled_desktop-1920x700.webp" 
    },
    
    
    { 
        label: "GAMING FEST", 
        title: "Upgrade Your Setup", 
        subtitle: "Top deals on gaming keyboards, mice, and more!", 
        image: "https://assets2.razerzone.com/images/pnx.assets/a5a5d2ac040463a315a7bc96f733dc97/complete-your-setup-white-hero-desktop-v3.webp" 
    } 
];
const pastOrders = [ 
];
const markers = [
    { id: 42, top: '60%', left: '30%' }, // Existing marker
    { id: 15, top: '30%', left: '60%' }, // Existing marker
    { id: 11,  top: '50%', left: '78%' }, // Existing marker
    { id: 1,  top: '42%', left: '90%' }, // Existing marker
    { id: 23,  top: '50%', left: '65%' }  // <--- NEW MARKER FOR THE KEYBOARD
];

const BluetoothIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"></polyline>
    </svg>
);

const WirelessIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12.55S9 9 12 9s7 3.55 7 3.55"></path>
        <path d="M2.5 9S6.5 5 12 5s9.5 4 9.5 4"></path>
        <path d="M17.5 16S13.5 19 12 19s-5.5-3-5.5-3"></path>
        <path d="M12 14c.0 0 0 0 0 0"></path>
    </svg>
);

const WiredIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 19c-1.5 0-3-1.5-3-3V8c0-1.5 1.5-3 3-3h12c1.5 0 3 1.5 3 3v8c0 1.5-1.5 3-3 3H6z"></path>
        <line x1="10" y1="9" x2="14" y2="9"></line>
        <line x1="10" y1="15" x2="14" y2="15"></line>
        <line x1="12" y1="5" x2="12" y2="9"></line>
        <line x1="12" y1="15" x2="12" y2="19"></line>
    </svg>
);

// === EXISTING SVG ICON COMPONENTS (Consolidated from previous responses) ===
const SensorIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="5" width="14" height="14" rx="2" ry="2"></rect>
        <line x1="9" y1="3" x2="9" y2="5"></line>
        <line x1="15" y1="3" x2="15" y2="5"></line>
        <line x1="9" y1="19" x2="9" y2="21"></line>
        <line x1="15" y1="19" x2="15" y2="21"></line>
        <line x1="3" y1="9" x2="5" y2="9"></line>
        <line x1="3" y1="15" x2="5" y2="15"></line>
        <line x1="19" y1="9" x2="21" y2="9"></line>
        <line x1="19" y1="15" x2="21" y2="15"></line>
    </svg>
);
// Add this near your icon imports
const ArrowUturnLeftIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
    </svg>
);

const useNavigate = () => { return (route) => console.log(`Navigating to ${route}`) };
const useParams = () => { return { productId: 1 } };

const OpticalSwitchIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11.5v-3a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 8.5v3"></path>
        <path d="M4 12.5v3a2.5 2.5 0 0 0 2.5 2.5h11a2.5 2.5 0 0 0 2.5-2.5v-3"></path>
        <path d="M8 12h8v-1H8v1z"></path>
    </svg>
);

const SoftwareSupportIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"></path>
        <path d="M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0"></path>
        <path d="M12 8l.01 0"></path><path d="M12 16l.01 0"></path>
        <path d="M16 12l.01 0"></path><path d="M8 12l.01 0"></path>
    </svg>
);

const TriModeIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55S9 9 12 9s7 3.55 7 3.55"></path>
        <path d="M2.5 9S6.5 5 12 5s9.5 4 9.5 4"></path>
        <circle cx="12" cy="12.5" r="1.5" fill="currentColor" stroke="none"></circle>
    </svg>
);

const ChevronIcon = ({ isOpen, className = "" }) => (
    <svg className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-white' : 'text-gray-400'} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
);

const BellIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);

const LockIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const DatabaseIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
);

const TrashIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);

const WhatsAppIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 3.181 1.442 6.066 3.708 8.077L4 22l2.002-.638A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm3.393 12.597c-.097.165-.67.43-.88.514-.23.1-.497.147-.76.046a1.45 1.45 0 01-.655-.453c-.302-.35-.785-1.127-1.1-1.398-.323-.27-1.258-.65-1.638-.85-.4-.21-1.32-.82-.67-.718.52.078 1.13.117 1.34.195.21.078.365.176.5.385.13.21.22.385.35.594.13.21.28.43.41.53.13.1.28.147.46.046.18-.1.6-.22.75-.385.15-.165.26-.43.3-.64.04-.21.04-.385.04-.594s-.11-.32-.23-.52c-.12-.2-.27-.47-.41-.65-.15-.17-.3-.29-.44-.45-.14-.16-.3-.32-.15-.52.15-.2.43-.4.6-.53.18-.13.36-.2.53-.2.17 0 .34.058.46.165.12.1.34.42.49.85.15.43.5 1.25.54 1.3.04.05.04.29-.08.48zm-2.032 1.43c-2.45 1.39-4.71-1.34-4.71-1.34s-2.26-2.73-1.62-4.12c.64-1.39 2.53-1.26 2.53-1.26s-.29-.98-.67-1.1c-.38-.12-1.33.15-2.08 1.54-.75 1.39-.75 3.19-.75 3.19s-.14.28 0 .42c.14.14.28-.2.28-.2s2.26-1.38 3.55-1.38c1.29 0 2.22 1.44 2.22 1.44s-.65.23-.74.33c-.1.1-.1.21-.1.35s.2.22.42.14c.22-.08.5-.18.67-.28.17-.1.28-.23.42-.42.14-.18.25-.42.25-.42s-.3-1.12-.59-1.23c-.3-.1-2.18-.08-2.6.28-.42.36-.93 1.1-.93 1.1s-1.07.9-.75 1.77c.32.86 1.4 1.34 1.4 1.34s.15-.14.3-.23c.15-.1.25-.17.38-.28.12-.1.2-.1.3-.1c.12-.01.2-.01.3.01.1.02.2.06.2.06s.1.1.25.17c.15.07.28.16.4.28.12.1.2.22.2.34.0.12-.08.2-.18.27-.1.08-.22.1-.34.1zm.55-.49c-.2-.1-.5-.22-.72-.34-.22-.12-.47-.2-.72-.25-.25-.05-.5.0-.72.1-.2.1-.45.28-.5.44-.05.15-.1.32-.1.52.0.2.05.37.1.52.05.15.2.3.4.45.2.15.5.3.72.35.25.05.5.0.72-.1.2-.1.45-.28.5-.44.05-.15.1-.32.1-.52.0-.2-.05-.37-.1-.52-.05-.15-.2-.3-.4-.45zM12 2a10 10 0 100 20 10 10 0 000-20z"/>
    </svg>
);

const CubeIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
        <line x1="7" y1="12" x2="7" y2="16"></line>
        <line x1="17" y1="12" x2="17" y2="16"></line>
    </svg>
);

const WarrantyIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
);

const ReturnIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="12 20 12 10"></polyline>
        <path d="M18.5 4.5a2.5 2.5 0 0 1 0 5L12 16l-6.5-6.5a2.5 2.5 0 0 1 0-5L12 12l6.5-6.5z"></path>
    </svg>
);

const ShippingIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 12h-4l-3-7L7 12H2"></path>
        <path d="M5 12h14v10H5z"></path>
    </svg>
);

const EMIIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
);

const SearchIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

// CartIcon has specific logic, className needs careful placement
const CartIcon = ({ itemCount = 0, className = "" }) => (
    <div className={`relative ${className}`}>
        {/* Removed hardcoded text-gray-600 dark:text-gray-300 */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-white text-xs font-bold">{itemCount}</span>
        )}
    </div>
);

const ProfileIcon = ({ className = "" }) => (
    // Removed hardcoded text-gray-600 dark:text-gray-300
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 ${className}`}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const StarIcon = ({ className = "" }) => ( // className was already handled correctly here
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
    </svg>
);

const RightArrowIcon = ({ className = "" }) => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
    </svg>
);

const LeftArrowIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const PlayIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
        <path d="M8 5v14l11-7z"></path>
    </svg>
);

const PauseIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
    </svg>
);

const ChevronLeftIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m15 18-6-6 6-6"/>
    </svg>
);

const ChevronRightIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m9 18 6-6-6-6"/>
    </svg>
);

const CheckCircleIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

const PlusIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const MinusIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const CloseIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const ShareIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
);

const ShieldCheckIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
);

const BoxIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
);

const TruckIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="1" y="3" width="15" height="13"></rect>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
        <circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
);

const CreditCardIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
);

const VideoIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 text-white ${className}`}>
        <path d="m22 8-6 4 6 4V8Z"/>
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
    </svg>
);

const TKLIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="14" width="56" height="36" rx="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 20h4v4h-4zM16 20h4v4h-4zM22 20h4v4h-4zM28 20h4v4h-4zM34 20h4v4h-4zM40 20h4v4h-4zM46 20h4v4h-4zM52 20h4v4h-4zM10 26h4v4h-4zM16 26h4v4h-4zM22 26h4v4h-4zM28 26h4v4h-4zM34 26h20v4H34zM10 32h6v4h-6zM18 32h28v4H18zM10 38h8v4h-8zM20 38h24v4H20zM46 38h10v4H46z" fill="currentColor" opacity="0.1"/>
        <path d="M10 20h4M16 20h4M22 20h4M28 20h4M34 20h4M40 20h4M46 20h4M52 20h4M10 26h4M16 26h4M22 26h4M28 26h4M34 26h20M10 32h6M18 32h28M10 38h8M20 38h24M46 38h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const VolumeKnobIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.1"/>
        <path d="M12 8v5l3.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const SwitchIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" opacity="0.1"/>
        <path d="M12 8v8m-3-4h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const RGBIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" fill="currentColor" opacity="0.1"/>
        <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" stroke="currentColor" strokeWidth="2"/>
        <path d="M15.5 15.5c-1.33-1.33-2.17-2.17-3.5-3.5m-3.5-3.5c1.33 1.33 2.17 2.17 3.5 3.5m0 0c-1.33 1.33-2.17 2.17-3.5 3.5m3.5-3.5c1.33-1.33 2.17-2.17 3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
const SoftwareIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1"/>
        <path d="M10 14.5c.5-1 1.5-1.5 3-1.5s2.5.5 3 1.5M9 11.5c.5.5 1.5 1 3 1s2.5-.5 3-1M15 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
const HotSwapIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" fill="currentColor" opacity="0.1"/>
        <path d="M10 16l-4-4 4-4"/><path d="M6 12h11a3 3 0 000-6h-3"/><path d="M14 8l4 4-4 4"/><path d="M18 12H7a3 3 0 000 6h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const BatteryIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1"/>
        <path d="M20 10h1.5a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H20M7 10v4M10 10v4M13 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
const ConnectivityIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1"/>
        <path d="M9.5 8l5 8m-5 0l5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14.5 14a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM9.5 14a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="currentColor" strokeWidth="2"/>
    </svg>
);
const LightweightIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.14 19.14a2.5 2.5 0 0 1-3.52 0l-6-6a2.5 2.5 0 0 1 0-3.52l6-6a2.5 2.5 0 0 1 3.52 0l.38.38a2.5 2.5 0 0 1 0 3.52l-4.12 4.12a.5.5 0 0 0 0 .7l4.12 4.12a2.5 2.5 0 0 1 0 3.52l-.38.38z"></path>
    </svg>
);
const DPIIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
    </svg>
);
const ButtonsIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
        <path d="M12 2v10"></path>
    </svg>
);
const DualConnectivityIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2custom/svg">
        <path d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1"/>
        <path d="M7 10C7 8.5 9 8 10 9M7 14C7 15.5 9 16 10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 12C10 13 8 13.5 7 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 16L19 13L16 10L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.5 13.5L17.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
const DoNotDisturbIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1"/>
        <path d="M8 8.5V15.5M12 7V17M16 8.5V15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="6.5" y1="6.5" x2="17.5" y2="17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
const MicIcon = ({ className = "" }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
);


// === UPDATED FEATURE ICON MAP ===
// This map uses the updated icon components that accept className
const featureIconMap = {
    TKLIcon, VolumeKnobIcon, SwitchIcon, RGBIcon, SoftwareIcon, HotSwapIcon, BatteryIcon, ConnectivityIcon, LightweightIcon, DPIIcon, ButtonsIcon, DualConnectivityIcon, DoNotDisturbIcon, MicIcon,
    BluetoothIcon, WirelessIcon, WiredIcon, SensorIcon, OpticalSwitchIcon, SoftwareSupportIcon, TriModeIcon,
    BellIcon, LockIcon, DatabaseIcon, TrashIcon, WhatsAppIcon, CubeIcon, WarrantyIcon, ReturnIcon, ShippingIcon, EMIIcon, SearchIcon, CartIcon, ProfileIcon, StarIcon, RightArrowIcon, LeftArrowIcon, PlayIcon, PauseIcon, ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon, PlusIcon, MinusIcon, CloseIcon, ShareIcon, ShieldCheckIcon, BoxIcon, TruckIcon, CreditCardIcon, VideoIcon, ChevronIcon
};

// === (The rest of your code: AnimatedStat, ProductFeatureBanner, ProductDetailsPage, App, etc.) ===
// ...
// === REPLACE your existing AnimatedStat function with this: ===
// Add this component before the App function
// This section is CORRECT and already provides the rainbow animation you requested.
const AnimatedLoginButton = ({ children, isLoading, disabled, onClick }) => {
    // Defines the CSS animation for the rainbow gradient shift
    const rainbowGradient = 'linear-gradient(90deg, #c084fc, #ff007f, #00ffff, #ff007f, #c084fc)';
    
    return (
        <>
            <style>{/* ... CSS for gradient-shift and .animated-login-button-rainbow ... */}</style>
            <button 
                type="submit" 
                onClick={onClick}
                disabled={disabled || isLoading}
                className="
                    w-full h-14 rounded-xl font-bold text-lg text-white
                    shadow-lg hover:shadow-xl
                    transition-all duration-300 transform hover:scale-[1.02]
                    disabled:opacity-50 disabled:hover:scale-100 
                    animated-login-button-rainbow // <=== THIS APPLIES THE RAINBOW
                "
            >
                {isLoading ? children.replace('Login', 'Logging in...').replace('Register', 'Registering...') : children}
            </button>
        </>
    );
};
const AnimatedStat = ({ targetValue, label, unit = '', duration = 1500, initialDelay = 300, valueColor = "text-violet-600 dark:text-violet-400" }) => { // <-- Added valueColor prop with default
    const [currentValue, setCurrentValue] = useState(0);
    const observerRef = useRef(null);
    const isCounting = useRef(false);

    useEffect(() => {
        const numericValue = parseInt(targetValue.toString().replace(/[^0-9]/g, ''));
        if (isNaN(numericValue)) {
            setCurrentValue(targetValue + unit);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isCounting.current) {
                    isCounting.current = true;
                    setTimeout(() => {
                        const startTime = Date.now();
                        const step = () => {
                            const elapsed = Date.now() - startTime;
                            const progress = Math.min(1, elapsed / duration);
                            const current = Math.floor(progress * numericValue);

                            if (progress < 1) {
                                setCurrentValue(current.toLocaleString() + unit); // Format during animation
                                requestAnimationFrame(step);
                            } else {
                                setCurrentValue(numericValue.toLocaleString() + unit); // Final formatted value
                            }
                        };
                        requestAnimationFrame(step);
                    }, initialDelay);
                }
            },
            { threshold: 0.5 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
            isCounting.current = false; // Reset counting state on unmount or re-render
        };
    }, [targetValue, unit, duration, initialDelay]); // Rerun effect if target changes

     return (
        <div ref={observerRef} className="flex flex-col items-center justify-center space-y-2">
            {/* Apply the valueColor class here */}
            <p className={`text-4xl md:text-5xl lg:text-6xl font-extrabold ${valueColor}`}>
                {currentValue}
            </p>
            <p className="text-gray-600 dark:text-gray-200 text-sm md:text-base">{label}</p>
        </div>
    );
};
// === CORRECTED ProductFeatureBanner (Rainbow Text for Title) ===
const ProductFeatureBanner = ({ media, title, subtitle, customBanner, productName }) => {
    // Determine the media source and type
    let mediaSource = customBanner?.src
        || media?.find(m => m.type === 'image')?.src
        || media?.find(m => m.type === 'video')?.src;
    let mediaType = customBanner?.type
                    || (media?.find(m => m.type === 'video')?.src === mediaSource ? 'video' : 'image');

    if (!mediaSource) return null;

    const displayTitle = customBanner?.title || title || productName || "Product Feature";
    const displaySubtitle = customBanner?.subtitle || subtitle;

    const isVideoUrl = (url) => /\.(mp4|webm|ogg|mov)$/i.test(url || '');
    const isVideo = mediaType === 'video' || isVideoUrl(mediaSource);

    const theme = getBrandTheme(productName || '');
    const glowClass = theme.glowClass.replace('hover:', '');
    
    // Define UNIQUE name for the Rainbow Animation and Class
    const rainbowClass = `animated-gradient-text-banner-${React.useId()}`;
    const rainbowGradient = 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000)';

    return (
        <>
            {/* 🌟 CRITICAL: Dynamic CSS for the RAINBOW text animation 🌟 */}
            <style>{`
                @keyframes banner-rainbow-shift {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 100% 50%; }
                }
                .${rainbowClass} {
                    background: ${rainbowGradient};
                    background-size: 300% 300%;
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: banner-rainbow-shift 8s linear infinite; 
                }
            `}</style>

            <div className="my-16 p-1"> {/* Padding for glow */}
                <div
                    className={`relative w-full aspect-[20/6] lg:aspect-[21/6] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-start
                                 bg-black transition-all duration-300 ease-in-out hover:-translate-y-1 ${glowClass}`}
                >
                    {/* Conditional Rendering for Video or Image */}
                    {isVideo ? (
                        <video
                            key={mediaSource}
                            src={mediaSource}
                            autoPlay loop muted playsInline
                            className="absolute inset-0 w-full h-full object-cover z-0"
                            onError={(e) => console.error("Video failed to load:", mediaSource, e)}
                        />
                    ) : (
                        <img
                            key={mediaSource}
                            src={mediaSource}
                            alt={displayTitle || "Feature Banner"}
                            className="absolute inset-0 w-full h-full object-cover z-0"
                            onError={(e) => console.error("Image failed to load:", mediaSource, e)}
                        />
                    )}

                    {/* Dark Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>

                    {/* Text Overlay Section */}
                    <div className="relative z-20 p-8 md:p-16 max-w-xl lg:max-w-2xl">
                        {/* Title with new UNIQUE RAINBOW animation class */}
                        <h1 className={`text-3xl md:text-5xl font-extrabold mb-3 leading-tight ${rainbowClass}`}>
                            {displayTitle}
                        </h1>
                        {/* Subtitle remains standard white/gray */}
                        {displaySubtitle && (
                            <p className="text-lg md:text-xl text-gray-200 dark:text-gray-300">
                                {displaySubtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
// --- Also update StackedFeatureBanners to pass the type ---
const StackedFeatureBanners = ({ banners = [] }) => {
    if (banners.length === 0) return null;

    return (
        <>
            {banners.map((item, index) => {
                const mediaSource = item.src;
                if (!mediaSource) return null;

                const bannerProps = {
                    media: [],
                    title: item.title,
                    subtitle: item.subtitle,
                    // --- PASS TYPE HERE ---
                    customBanner: { src: mediaSource, title: item.title, subtitle: item.subtitle, type: item.type }
                };

                return <ProductFeatureBanner key={index} {...bannerProps} />;
            })}
        </>
    );
};
// Replace your existing HorizontalGallerySection function with this:
const HorizontalGallerySection = ({ galleryItems = [], onNavigate }) => {
    if (!galleryItems || galleryItems.length === 0) return null;

    // Helper to check if the URL looks like a video link
    const isVideoUrl = (url) => {
        return /\.(mp4|webm|ogg|mov)$/i.test(url);
    };

    return (
        <div className="my-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
                Complete Your Setup
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {galleryItems.map((item, index) => {
                    
                    // 🌟 CRITICAL FIX: The primary source is whatever has a URL (video or image)
                    const mediaSource = item.video || item.image;
                    if (!mediaSource) return null;

                    // Determine the true type based on the URL extension
                    const isVideo = isVideoUrl(mediaSource);

                    // Choose the fallback image if a video is used and we need a thumbnail
                    const thumbSource = item.image || item.video; 

                    return (
                        <div 
                            key={index} 
                            onClick={() => alert(`Navigating to ${item.title}`)} 
                            className="group bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-violet-700/30"
                        >
                            <div className="aspect-square overflow-hidden rounded-lg mb-4 relative">
                                
                                {isVideo ? (
                                    <video
                                        // Use the video URL
                                        src={mediaSource}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <img 
                                        // Use the image URL
                                        src={mediaSource} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                                
                                {/* Add a play indicator for videos (optional, for aesthetics) */}
                                {isVideo && (
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayIcon className="w-10 h-10 text-white" />
                                    </div>
                                )}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                                {item.title}
                            </h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
// === REPLACE this helper function ===
const getBrandTheme = (productName) => {
    // 🌟 Safety Check: Default to empty string if productName is falsy
    const name = productName ? productName.toLowerCase() : '';

    // Razer Theme (Green)
    if (name.includes('razer')) {
        return {
            name: 'razer',
            glowClass: 'hover:shadow-green-700/50 dark:hover:shadow-green-400/30',
            borderClass: 'border-green-500',
            hoverBorderClass: 'hover:border-green-500',
            accentText: 'text-green-500', // Adjusted brightness slightly
            darkAccentText: 'dark:text-green-400',
            valueText: 'text-green-600 dark:text-green-400',
            iconColor: 'text-green-600 dark:text-green-400',
            sectionBg: 'bg-green-50 dark:bg-green-900/20', // Adjusted background
            tableHeader: 'text-green-700 dark:text-green-400 border-green-300 dark:border-green-700', // Adjusted border
            animatedGradient: 'linear-gradient(to right, #4ade80, #10b981, #059669, #047857, #065f46, #4ade80)',
            darkAnimatedGradient: 'linear-gradient(to right, #86efac, #34d399, #10b981, #059669, #065f46, #86efac)',
        };
    }
    // Samsung Theme (Blue)
    if (name.includes('samsung')) {
        return {
            name: 'samsung',
            glowClass: 'hover:shadow-blue-700/50 dark:hover:shadow-blue-400/30',
            borderClass: 'border-blue-500',
            hoverBorderClass: 'hover:border-blue-500',
            accentText: 'text-blue-500', // Adjusted brightness slightly
            darkAccentText: 'dark:text-blue-400',
            valueText: 'text-blue-600 dark:text-blue-400',
            iconColor: 'text-blue-600 dark:text-blue-400',
            sectionBg: 'bg-blue-50 dark:bg-blue-900/20', // Adjusted background
            tableHeader: 'text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700', // Adjusted border
            animatedGradient: 'linear-gradient(to right, #60a5fa, #3b82f6, #2563eb, #1d4ed8, #1e40af, #60a5fa)',
            darkAnimatedGradient: 'linear-gradient(to right, #93c5fd, #60a5fa, #3b82f6, #2563eb, #1d4ed8, #93c5fd)',
        };
    }
    // Default/Kreo Theme (Violet/Purple)
    return {
        name: 'kreo',
        glowClass: 'hover:shadow-violet-700/50 dark:hover:shadow-violet-400/30',
        borderClass: 'border-violet-500',
        hoverBorderClass: 'hover:border-violet-500',
        accentText: 'text-violet-500', // Adjusted brightness slightly
        darkAccentText: 'dark:text-violet-400',
        valueText: 'text-violet-600 dark:text-violet-400',
        iconColor: 'text-violet-600 dark:text-violet-400',
        sectionBg: 'bg-violet-50 dark:bg-violet-900/20', // Adjusted background
        tableHeader: 'text-violet-700 dark:text-violet-400 border-violet-300 dark:border-violet-700', // Adjusted border
        animatedGradient: 'linear-gradient(to right, #c084fc, #a78bfa, #8b5cf6, #7c3aed, #6d28d9, #c084fc)',
        darkAnimatedGradient: 'linear-gradient(to right, #d8b4fe, #c4b5fd, #a78bfa, #8b5cf6, #7c3aed, #d8b4fe)',
    };
};
// (You can place this right after getProductThemeColor)

const getProductCardGlowClass = (productName) => {
    const name = productName.toLowerCase();
    
    if (name.includes('razer')) {
        // Green glow for Razer
        return 'hover:shadow-green-700/50 hover:dark:shadow-green-400/30';
    }
    if (name.includes('samsung')) {
        // Blue glow for Samsung
        return 'hover:shadow-blue-700/50 hover:dark:shadow-blue-400/30';
    }
    
    // Default purple/violet glow for Kreo and all other brands
    return 'hover:shadow-violet-700/50 hover:dark:shadow-violet-400/30';
};
// --- UPDATED COMPONENT: ProductStatBar (Container) ---
// === REPLACE your existing ProductStatBar function with this: ===
const ProductStatBar = ({ product, theme }) => { // <-- Added theme prop
    const stats = product.featureStats;
    if (!stats || stats.length === 0) return null;

    // Use default theme if none provided
    const currentTheme = theme || getBrandTheme('');

    return (
        // Use theme's section background
        <div className={`my-16 py-12 ${currentTheme.sectionBg} rounded-2xl`}>
            <div className="container mx-auto grid grid-cols-3 gap-4 text-center">
                {stats.map((stat, index) => (
                    <AnimatedStat
                        key={index}
                        targetValue={stat.value}
                        label={stat.label}
                        unit={stat.unit || ''} // Ensure unit is passed, default to empty string
                        initialDelay={index * 200}
                        valueColor={currentTheme.valueText} // <-- Pass theme value color
                    />
                ))}
            </div>
        </div>
    );
};
// === CORRECTED FeatureScroller (Lines 524-577) ===
const FeatureScroller = ({ features = [], theme, animationSpeed = '25s' }) => {
    if (!features || features.length === 0) return null;

    const currentTheme = theme || getBrandTheme('');
    // Use React.useId() for a unique class name
    const scrollClassName = `feature-scroll-animation-${React.useId()}`;

    const scrollingContent = (
        <div className="flex items-center space-x-10">
            {features.map((feature, index) => (
                <React.Fragment key={index}>
                    <p className="flex items-center text-3xl md:text-5xl font-extrabold whitespace-nowrap">
                        <span className="text-gray-900 dark:text-white">
                            {feature.label}
                        </span>
                        <span className={`ml-4 ${currentTheme.accentText} ${currentTheme.darkAccentText}`}>
                            {feature.highlight}
                        </span>
                    </p>
                    {(index < features.length) && (
                           <span className="text-3xl md:text-5xl text-gray-400 dark:text-gray-600">•</span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <>
            {/* Inject the dynamic CSS for the animation */}
            <style>{`
                @keyframes ${scrollClassName}-kf {
                    /* CRITICAL: Translate X must cover the distance of one copy of the content */
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); } 
                }
                .${scrollClassName} > div {
                    /* Ensure the animated element takes up enough space to scroll */
                    flex-shrink: 0;
                    min-width: fit-content;
                }
                .${scrollClassName} {
                    animation: ${scrollClassName}-kf ${animationSpeed} linear infinite;
                    /* CRITICAL FIX: Use flex and force width to 200% to guarantee repetition */
                    display: flex;
                    width: 200%; 
                }
            `}</style>
            
            <div className={`py-8 overflow-hidden ${currentTheme.sectionBg} border-y border-gray-700`}>
                <div className={`${scrollClassName}`}>
                    {/* Repeat content twice inside the animated wrapper */}
                    <div className="flex items-center space-x-10">
                        {/* First Copy */}
                        {scrollingContent.props.children} 
                    </div>
                    <div className="flex items-center space-x-10">
                         {/* Second Copy (Starts off-screen) */}
                        {scrollingContent.props.children}
                    </div>
                </div>
            </div>
        </>
    );
};
const ProductGallery = ({ media }) => {
    if (!media || media.length === 0) return null;

    const [activeIndex, setActiveIndex] = useState(0);
    
    const currentMedia = media[activeIndex];
    if (!currentMedia) {
        return (
            <div className="flex-1 min-h-[300px] bg-gray-800 rounded-lg p-4 text-white flex items-center justify-center">
                Error: Media not found.
            </div>
        );
    }

    const nextMedia = () => {
        setActiveIndex(prevIndex => (prevIndex === media.length - 1 ? 0 : prevIndex + 1));
    };

    const prevMedia = () => {
        setActiveIndex(prevIndex => (prevIndex === 0 ? media.length - 1 : prevIndex - 1));
    };

    return (
        <div className="flex gap-4">
            {/* Thumbnails (w-20 fixed width) - unchanged for brevity */}
            <div className="flex md:flex-col gap-3 justify-start overflow-auto scrollbar-hide max-h-[500px] pr-2">
                {media.map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => setActiveIndex(index)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-lg cursor-pointer border-2 transition-all duration-200 ${activeIndex === index ? 'border-violet-500' : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'}`} 
                    >
                        <img 
                            src={item.type === 'video' ? media.find(m => m.type === 'image')?.src || item.src : item.src} 
                            alt={`Thumbnail ${index + 1}`} 
                            className="w-full h-full object-cover rounded-md" 
                        />
                        {/* Placeholder for PlayIcon */}
                        {item.type === 'video' && <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-md"><svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg></div>}
                    </div>
                ))}
            </div>
            
            {/* Main Product Image Display */}
            {/* FIX 1: This outer container is flex-1 (takes all remaining space) and centers its content */}
            <div className="flex-1 relative group max-h-[500px] overflow-hidden flex items-center justify-center"> 
                
                {/* 🌟 CRITICAL FIX: The background div uses 'max-w-full' but no 'w-full' or 'h-full'.
                       It shrinks to the exact bounding box of the scaled image inside it. */}
                <div className="max-w-full bg-violet-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    
                    {currentMedia.type === 'video' ? (
                        <video 
                            key={currentMedia.src} 
                            src={currentMedia.src} 
                            autoPlay muted loop playsInline 
                            // FIX 2: Max dimensions are on the media, forcing it to scale down proportionally
                            className="max-w-full max-h-[500px] object-contain rounded-lg" 
                        />
                    ) : (
                        <img 
                            key={currentMedia.src} 
                            src={currentMedia.src} 
                            alt="Main product" 
                            // FIX 2: Max dimensions are on the media, forcing it to scale down proportionally
                            className="max-w-full max-h-[500px] object-contain rounded-lg" 
                        />
                    )}
                </div>

                {/* Navigation buttons (omitted for brevity) */}
                <button 
                    onClick={prevMedia} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/50 dark:bg-black/50 p-2 rounded-full text-gray-800 dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white/80 dark:hover:bg-black/80"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button 
                    onClick={nextMedia} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/50 dark:bg-black/50 p-2 rounded-full text-gray-800 dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white/80 dark:hover:bg-black/80"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
        </div>
    );
};
const Countdown = () => {
    // 🌟 FIX 2: Updated target date to be 48 hours from now for a reliable demo timer.
    const targetDate = useRef(new Date(Date.now() + 48 * 60 * 60 * 1000));

    const calculateTimeLeft = () => {
        const difference = +targetDate.current - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center gap-2 font-mono font-bold text-gray-800 dark:text-white">
            <span className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md">{String(timeLeft.hours || 0).padStart(2, '0')}</span> :
            <span className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md">{String(timeLeft.minutes || 0).padStart(2, '0')}</span> :
            <span className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md">{String(timeLeft.seconds || 0).padStart(2, '0')}</span>
        </div>
    );
};



const ProductInfo = ({ product, onAddToCart, onNavigate, selectedSwitch, setSelectedSwitch, selectedColor, setSelectedColor, theme, handleDirectBuy }) => {
    // Note: The signature now correctly receives 'handleDirectBuy' as a prop.

    const [quantity, setQuantity] = useState(1);
    
    // 1. Regular add to cart handler (calls App's handler via prop)
    const handleAddtoCartLogic = () => { 
        // Calls the 'onAddToCart' prop (which is App.jsx's handleAddtoCart)
        onAddToCart(product, quantity); 
    };

    // 2. Direct Buy Handler: This button calls the handleDirectBuy PROP passed from the App.
    const handleBuyNowClick = () => { 
        if (typeof handleDirectBuy === 'function') {
            // 🚨 CRITICAL: Calls the direct purchase flow
            handleDirectBuy(product, quantity); 
        } else {
            // Fallback if prop passing is still misconfigured
            console.error("handleDirectBuy function is missing or misconfigured in App component.");
            alert("Cannot proceed to direct checkout. Configuration error.");
        }
    };
    
    // Get theme for styling
    const currentTheme = theme || getBrandTheme(product.name);
    const displayPrice = product.price;

    return (
        <div>
            <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{product.name}</h1>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"><ShareIcon className="w-5 h-5"/></button>
            </div>
            
            {/* Rating and Reviews */}
            <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />)}
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold">{product.rating}</span>
                <span className="text-gray-400 text-sm">({product.reviewCount || 0} reviews)</span>
            </div>
            
            {/* Price Information */}
            <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{displayPrice}</span>
                <span className="text-xl text-gray-400 line-through ml-3">MRP ₹{product.mrp}</span>
                <span className="ml-4 text-sm font-bold bg-green-100 text-green-600 px-2 py-1 rounded dark:bg-green-900/50 dark:text-green-400">{product.discountPercentage}% OFF</span>
            </div>

            {/* Status Tags */}
            {product.statusTags && (<div className="mt-6 flex items-center gap-2 flex-wrap">{product.statusTags.map(tag => (<span key={tag} className="border border-violet-300 bg-violet-50 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full dark:bg-violet-900/50 dark:border-violet-700 dark:text-violet-300">{tag}</span>))}</div>)}
            {product.soldCount && <p className="mt-4 text-sm text-red-500 font-semibold">🔥 {product.soldCount} sold</p>}
            
            {/* Switch Options (If applicable) */}
            {(product.switchOptions || product.switches) && (
                <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Switch Type: <span className="text-gray-800 dark:text-white font-bold">{selectedSwitch}</span></p>
                    <div className="flex gap-2 flex-wrap">
                        {(product.switchOptions || product.switches).map(s => (
                            <button 
                                key={s.name || s} 
                                onClick={() => setSelectedSwitch(s.name || s)} 
                                className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-colors ${selectedSwitch === (s.name || s) ? 'bg-gray-800 border-gray-800 text-white dark:bg-white dark:text-black dark:border-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'}`}
                            >
                                {s.name || s}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Color Options (If applicable) */}
            {product.colors && product.colors.length > 0 && (
                <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Color: <span className="text-gray-800 dark:text-white font-bold">{selectedColor?.name}</span></p>
                    <div className="flex gap-2 flex-wrap">
                        {product.colors.map(c => (
                            <button 
                                key={c.name} 
                                onClick={() => setSelectedColor(c)} 
                                className={`w-12 h-12 p-1 rounded-full border-2 transition-all ${selectedColor?.name === c.name ? `border-${currentTheme.name}-500` : 'border-transparent'}`}
                            >
                                <img src={c.image} alt={c.name} className="w-full h-full object-cover rounded-full"/>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-8 flex gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-lg"><MinusIcon/></button>
                    <span className="px-4 font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="p-3 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg"><PlusIcon/></button>
                </div>
                
                {/* 🚨 ADD TO CART BUTTON 🚨 */}
                <button
                    onClick={handleAddtoCartLogic} // <-- FIXED: Calls local handler which calls the prop.
                    className="w-full py-3 rounded-lg text-lg font-semibold transition-colors duration-200 
                            bg-gray-800 hover:bg-gray-700 text-white dark:bg-gray-800 dark:hover:bg-gray-700" 
                >
                    Add to Cart
                </button>
            </div>
            
            {/* BUY NOW BUTTON (Vibrant Violet) */}
            <button 
                onClick={handleBuyNowClick} 
                className="w-full mt-4 bg-violet-600 text-white font-bold py-4 rounded-lg hover:bg-violet-700 transition-colors"
            >
                Buy Now
            </button>
            
            <div className="mt-6 p-4 bg-cyan-100/50 dark:bg-cyan-900/20 rounded-xl flex items-center justify-between">
                <div>
                    <p className="font-semibold text-cyan-800 dark:text-cyan-300">Limited Time Offer ends in:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Assured Free Gift for Every purchase above ₹2,500</p>
                </div>
                <Countdown />
            </div>
        </div>
    );
};
const NewTrustBadges = () => (
    <div className="my-8 py-6 bg-gray-100 dark:bg-gray-900/50 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center gap-2"><ShieldCheckIcon className="w-8 h-8 text-violet-600 dark:text-violet-500"/><p className="text-sm font-semibold text-gray-600 dark:text-gray-300">400 Days Warranty</p></div>
            <div className="flex flex-col items-center gap-2"><BoxIcon className="w-8 h-8 text-violet-600 dark:text-violet-500"/><p className="text-sm font-semibold text-gray-600 dark:text-gray-300">7 Days Return</p></div>
            <div className="flex flex-col items-center gap-2"><TruckIcon className="w-8 h-8 text-violet-600 dark:text-violet-500"/><p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Free Shipping</p></div>
            <div className="flex flex-col items-center gap-2"><CreditCardIcon className="w-8 h-8 text-violet-600 dark:text-violet-500"/><p className="text-sm font-semibold text-gray-600 dark:text-gray-300">No Cost EMIs</p></div>
        </div>
    </div>
);

// === REPLACE your existing FeatureIconGrid function with this: ===
const FeatureIconGrid = ({ features = [], theme }) => { // <-- Added theme prop
    if (!features || features.length === 0) return null;

    // Use default theme if none provided (optional, for safety)
    const currentTheme = theme || getBrandTheme('');

    return (
        // Use theme's section background
        <div className={`my-16 py-12 ${currentTheme.sectionBg} rounded-2xl`}>
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 gap-y-12 text-center">
                {features.map(feature => {
                    const Icon = featureIconMap[feature.icon];
                    return (
                        <div key={feature.name} className="flex flex-col items-center gap-3">
                            {/* Pass the theme icon color class to the Icon */}
                            {Icon && <Icon className={currentTheme.iconColor} />}
                            <p className="font-semibold text-gray-700 dark:text-gray-300">{feature.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const SwitchAudioPlayer = ({ audioSrc }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const togglePlay = (e) => {
        e.stopPropagation();
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
            audio.currentTime = 0;
        } else {
            document.querySelectorAll('audio').forEach(a => a.pause());
            audio.play();
        }
    };
    useEffect(() => {
        const audioEl = audioRef.current;
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        audioEl.addEventListener('play', handlePlay);
        audioEl.addEventListener('pause', handlePause);
        audioEl.addEventListener('ended', handlePause);
        return () => {
            audioEl.removeEventListener('play', handlePlay);
            audioEl.removeEventListener('pause', handlePause);
            audioEl.removeEventListener('ended', handlePause);
        };
    }, []);
    return (
        <div className="flex items-center gap-4 mt-4">
            <audio ref={audioRef} src={audioSrc} preload="auto"></audio>
            <button onClick={togglePlay} className="flex-shrink-0 p-3 bg-violet-600/80 rounded-full text-white hover:bg-violet-500 transition-colors">
                {isPlaying ? <PauseIcon className="w-6 h-6"/> : <PlayIcon className="w-6 h-6"/>}
            </button>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
    );
};

const SwitchSelector = ({ switches = [], selected, onSelect }) => {
    if (!switches || switches.length === 0) return null;
    return (
        <div className="my-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Choose Your Switch</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {switches.map(s => (
                    <div key={s.name} onClick={() => onSelect(s.name)} className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${selected === s.name ? 'border-violet-500 bg-violet-500/10 shadow-lg' : 'border-gray-200 dark:border-gray-800 hover:border-violet-400 dark:hover:border-violet-600'}`}>
                        <div className="flex items-start gap-6">
                            <img src={s.image} alt={s.name} className="w-20 h-20 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{s.name}</h3>
                                <p className="text-sm font-semibold text-violet-600 dark:text-violet-400">{s.type} | Operating Force: {s.force}</p>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">{s.description}</p>
                            </div>
                        </div>
                        <SwitchAudioPlayer audioSrc={s.audioSrc} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const VideoBanner = ({ video }) => {
    if (!video) return null;
    return (
        <div className="my-16 rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center text-center p-8 bg-gray-900">
            <video src={video.src} autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover opacity-40"></video>
            <div className="relative z-10">
                <h2 className="text-5xl font-black text-white">{video.title}</h2>
                <p className="text-lg text-white/80 mt-2">{video.subtitle}</p>
            </div>
        </div>
    )
};

// === REPLACE your existing GalleryBanners function with this: ===
const GalleryBanners = ({ banners = [], theme }) => { // <-- Added theme prop
    if (!banners || banners.length === 0) return null;

    // Use default theme if none provided
    const currentTheme = theme || getBrandTheme('');

    return (
        <div className="my-16 grid md:grid-cols-2 gap-6">
            {banners.map(banner => (
                <div key={banner.title}
                     className={`relative aspect-video rounded-2xl overflow-hidden group border-2 border-transparent transition-all duration-300 ${currentTheme.hoverBorderClass}`} // Added theme hover border
                >
                    <img src={banner.image} alt={banner.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                        {/* Apply theme accent color to title */}
                        <h3 className={`text-2xl font-bold ${currentTheme.accentText} ${currentTheme.darkAccentText} mb-1`}>{banner.title}</h3>
                        <p className="text-white/80">{banner.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// === REPLACE the FeatureSection component AGAIN with this enhanced version ===
// === CORRECTED FeatureSection (Lines 3031-3162) ===
const FeatureSection = ({ section, theme }) => { // <-- Added theme prop
    // Use unique ID for style injection (guaranteed to be unique per render)
    const uniqueStyleId = React.useId();
    const uniqueClass = `animated-gradient-text-feature-${uniqueStyleId}`;
    const currentTheme = theme || getBrandTheme('');

    // --- Text Column JSX ---
    const TextColumn = () => (
        <div className="w-full flex flex-col justify-center items-center text-center space-y-4 p-8 lg:px-12">
            {/* Apply the UNIQUE class here */}
            <h2 className={`text-4xl font-black text-gray-800 dark:text-white mb-4 ${uniqueClass}`}>
                {section.title}
            </h2>

             {/* Description logic (unchanged) */}
            {section.subtitle && (
                 <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">
                     {section.subtitle}
                 </p>
            )}
             {section.description && (
                 <div className="max-w-2xl">
                     {section.description.includes('\n-') ? (
                         <>
                             <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                 {section.description.split('\n-')[0]}
                             </p>
                             <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 text-left mt-4">
                                 {section.description.split('\n-').slice(1).map((item, idx) => (
                                     <li key={idx}>{item.trim()}</li>
                                 ))}
                             </ul>
                         </>
                     ) : (
                         <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                              {section.description}
                         </p>
                     )}
                 </div>
             )}
        </div>
    );

     // --- Media Column JSX (Unchanged for brevity) ---
     const MediaColumn = () => (
         <div className="w-full flex flex-col items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
             {section.showIconBar && (
                 <div className="flex space-x-4 mb-6 p-2 bg-gray-800/50 rounded-full shadow-lg border border-gray-700">
                     <div className="flex items-center space-x-2 text-gray-300 px-3 py-1"><BluetoothIcon className="w-5 h-5" /> <span className="font-medium text-sm">Bluetooth</span></div>
                     <div className="border-l border-gray-600 h-6"></div>
                     <div className="flex items-center space-x-2 text-gray-300 px-3 py-1"><WirelessIcon className="w-5 h-5" /> <span className="font-medium text-sm">Wireless</span></div>
                     <div className="border-l border-gray-600 h-6"></div>
                     <div className="flex items-center space-x-2 text-gray-300 px-3 py-1"><WiredIcon className="w-5 h-5" /> <span className="font-medium text-sm">Wired</span></div>
                 </div>
             )}
             <div className="w-full max-w-6xl mx-auto rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-lg aspect-video">
                 {section.video ? (
                     <video key={section.video} src={section.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                 ) : section.image ? (
                     <img key={section.image} src={section.image} alt={section.title} className="w-full h-full object-cover" />
                 ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-500">No media</div>
                 )}
             </div>
         </div>
     );

    return (
        <>
            {/* 🌟 CRITICAL FIX: Using a unique class name tied to the component's render instance */}
            <style>{`
                @keyframes text-gradient-animation-feature-${uniqueStyleId} {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .${uniqueClass} {
                    background: ${currentTheme.animatedGradient}; /* Light mode gradient */
                    background-size: 300% auto;
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: text-gradient-animation-feature-${uniqueStyleId} 12s ease-in-out infinite;
                }
                .dark .${uniqueClass} {
                     background: ${currentTheme.darkAnimatedGradient}; /* Dark mode gradient */
                     background-size: 300% auto;
                     background-clip: text;
                     -webkit-background-clip: text;
                     -webkit-text-fill-color: transparent;
                     animation: text-gradient-animation-feature-${uniqueStyleId} 12s ease-in-out infinite;
                }
            `}</style>

             <div className="my-20 flex flex-col items-center">
                 <TextColumn />
                 <MediaColumn />
             </div>
        </>
    );
};
// === NEW InlineFeatureBanner Component ===
const InlineFeatureBanner = ({ title, subtitle, imageUrl }) => {
    // This component assumes Text Left (40%), Image Right (60%) as per your screenshot
    return (
        <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden my-12 shadow-sm">
            {/* Text Column (40% width on medium screens and up) */}
            <div className="w-full md:w-2/5 p-8 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                    {title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>
            </div>
            {/* Image Column (60% width on medium screens and up) */}
            <div className="w-full md:w-3/5 h-64 md:h-96">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-200 dark:bg-gray-700">No image available</div>
                )}
            </div>
        </div>
    );
};

// === REPLACE your existing SpecsTableV2 function with this: ===
const SpecsTableV2 = ({ specs = {}, theme }) => { // <-- Added theme prop
    const specCategories = Object.entries(specs);
    if (!specCategories.length) return null;

     // Use default theme if none provided
    const currentTheme = theme || getBrandTheme('');

    return (
         // Use theme's section background
        <div className={`my-16 p-8 md:p-12 rounded-2xl ${currentTheme.sectionBg}`}>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">Technical Specifications</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-12 gap-y-8">
                {specCategories.map(([category, details]) => (
                    <div key={category}>
                        {/* Apply theme table header classes */}
                        <h3 className={`text-xl font-bold mb-4 border-b-2 pb-2 ${currentTheme.tableHeader}`}>
                            {category}
                        </h3>
                        <div className="space-y-3">
                            {details.map(spec => (
                                <div key={spec.key} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">{spec.key}</span>
                                    <span className="font-semibold text-gray-800 dark:text-white text-right">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
const StatsBanner = ({ stats = [] }) => {
    if (!stats || stats.length === 0) return null;
    return (<div className="bg-violet-100 dark:bg-violet-900/20 py-12 my-12 rounded-2xl"><div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">{stats.map(stat => (<div key={stat.label}><p className="text-5xl font-bold text-violet-600 dark:text-violet-400">{stat.value}</p><p className="text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p></div>))}</div></div>);
};

const ProductDetailsPage = ({ product, onNavigate, onAddToCart, handleDirectBuy }) => {
    
    // Safety check - If product is null/undefined after fetch attempt
    if (!product || typeof product !== 'object' || !product.id) {
        return (
            <div className="page container mx-auto p-8 text-center text-gray-900 dark:text-white">
                Error loading product details or product not found.
            </div>
        );
    }

    // --- Hooks for component state (SAFE) ---
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    
    // Calculate Theme based on product name
    const theme = getBrandTheme(product.name);

    // State Management for selections (Keep existing)
    const [selectedSwitch, setSelectedSwitch] = useState(product.switchOptions?.[0]?.name || product.switches?.[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);

    // Update selections if the product prop changes (e.g., navigating from one product to another)
    useEffect(() => {
        setSelectedSwitch(product.switchOptions?.[0]?.name || product.switches?.[0]);
        setSelectedColor(product.colors?.[0]);
        window.scrollTo(0, 0); // Scroll to top when product changes
    }, [product]);

    // --- Handler Functions ---
    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };

    const handleAddToCartClick = () => {
        // Calls the handler function defined in App.jsx
        onAddToCart(product, quantity);
        alert(`${quantity} x ${product.name} added to cart!`);
    };

    const handleBuyNowClick = () => { 
        // Calls the direct purchase flow defined in App.jsx
        if (typeof handleDirectBuy === 'function') {
            handleDirectBuy(product, quantity); 
        } else {
            console.error("handleDirectBuy function is missing.");
            alert("Cannot proceed to direct checkout. Configuration error.");
        }
    };
    
    // --- PREPARE BANNERS (FIX: Define allHeroBanners here inside the component) ---
    const allHeroBanners = [];
    if (product.heroVideo && product.heroVideo.src) {
        const heroVideoData = product.heroVideo || {};
        allHeroBanners.push({
            src: heroVideoData.src,
            title: heroVideoData.title || product.name,
            subtitle: heroVideoData.subtitle || product.info,
            type: 'video' });
    }
    if (product.featureBannerImage && product.featureBannerImage.src) {
        const bannerImageData = product.featureBannerImage || {};
        if (!allHeroBanners.length || bannerImageData.src !== allHeroBanners[0]?.src) {
            const isBannerVideo = /\.(mp4|webm|ogg|mov)$/i.test(bannerImageData.src || '');
            allHeroBanners.push({
                src: bannerImageData.src,
                title: bannerImageData.title || product.name,
                subtitle: bannerImageData.subtitle || product.info,
                type: isBannerVideo ? 'video' : 'image'});
        }
    }
    const productDescription = product.info;

    // --- Dynamic Data Retrieval (uses fetched product) ---
    const DISPLAY_PRICE = parsePrice(product.price);
    const DISPLAY_MRP = parsePrice(product.mrp);


    // --- Render the Component ---
    return (
        <div className="bg-white dark:bg-[#121212] animate-fadeInUp">

            {/* 1. Top Section: Product Gallery & Main Info */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-[40%_60%] lg:grid-cols-[40%_60%] gap-12">
                    {/* Pass potentially null/undefined media safely */}
                    <ProductGallery media={product.media || []} />
                    <ProductInfo
                        product={product} // Pass the fetched product details
                        onAddToCart={handleAddToCartClick} // FIX: Changed to local handler name or use the prop directly
                        onNavigate={onNavigate}
                        selectedSwitch={selectedSwitch}
                        setSelectedSwitch={setSelectedSwitch}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        theme={theme}
                        handleDirectBuy={handleBuyNowClick} // Calls the local handler
                    />
                </div>
                <NewTrustBadges />
            </div>

            {/* 2. Stacked Hero Banners (Now correctly defined locally) */}
            <StackedFeatureBanners banners={allHeroBanners} productName={product.name} />

            {/* 3. Product Description Section */}
            {productDescription && (
                <div className="max-w-4xl mx-auto my-12 text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">{product.name}</h2>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {productDescription}
                    </p>
                </div>
            )}

            {/* 4. Scrolling Feature Highlights - Pass theme */}
            {product.featureBannerText && product.featureBannerText.length > 0 && (
                <FeatureScroller
                    features={product.featureBannerText}
                    theme={theme}
                />
            )}

            {/* 5. Animated Statistics Bar - Pass theme */}
            <ProductStatBar product={product} theme={theme} />

            {/* --- Container for remaining sections --- */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* 6. Grid of Feature Icons - Pass theme */}
                <FeatureIconGrid features={product.featureIconGrid || []} theme={theme} />

                {/* 7. Switch Selector */}
                <SwitchSelector
                    switches={product.switchOptions || []} // Use switchOptions if available
                    selected={selectedSwitch}
                    onSelect={setSelectedSwitch}
                />

                {/* 9. DETAILED FEATURE SECTIONS - Pass theme */}
                {product.featureSections?.map((section, index) => {
                    if (section.layout === 'inlineBanner') {
                        return (
                            <InlineFeatureBanner
                                key={section.title || `feature-inline-${index}`}
                                title={section.title}
                                subtitle={section.description}
                                imageUrl={section.image || section.video} // Check DTO fields
                            />
                        );
                    } else {
                        return (
                            <FeatureSection
                                key={section.title || `feature-split-${index}`}
                                section={section}
                                theme={theme}
                            />
                        );
                    }
                })}

                {/* 11. Gallery Banners - Pass theme */}
                <GalleryBanners banners={product.galleryBanners || []} theme={theme} />

                {/* 12. Horizontal "Complete Your Setup" Gallery */}
                <HorizontalGallerySection
                    galleryItems={product.optionalProductGallery || []}
                    onNavigate={onNavigate}
                />

                {/* 13. Technical Specifications Table - Pass theme */}
                <SpecsTableV2 specs={product.specsV2 || {}} theme={theme} />

            </div> {/* End container */}
        </div> // End main page container
    );
};
// ===================================
// === PAGE COMPONENTS ===
// ===================================
const AccordionItem = ({ question, answer, isOpen, toggleAccordion }) => {
    return (
        <div className="border-b border-gray-800">
            <button
                className="flex justify-between items-center w-full p-6 text-left focus:outline-none transition duration-300 bg-gray-900 hover:bg-gray-800"
                onClick={toggleAccordion}
                aria-expanded={isOpen}
            >
                <span className={`text-lg font-medium ${isOpen ? 'text-white' : 'text-gray-300'}`}>
                    {question}
                </span>
                <ChevronIcon isOpen={isOpen} />
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 p-6' : 'max-h-0 opacity-0'}`}
                style={{ 
                    // Ensures smooth transition even with large content by setting max-height limit
                    maxHeight: isOpen ? '1000px' : '0' 
                }}
            >
                <p className="text-gray-400 leading-relaxed pt-0">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const faqData = [
    {
        id: 1,
        question: "How do I track my order?",
        answer: "You can track your order status by visiting the 'Track Order' link in the footer (or main navigation). Simply enter your order number and the email address used for the purchase. You will receive real-time updates from our shipping partners."
    },
    {
        id: 2,
        question: "What is your return and exchange policy?",
        answer: "We offer a 30-day window for returns and exchanges from the date of delivery. Items must be unused, in their original packaging, and include proof of purchase. Please initiate the process via our 'Returns & Exchanges' page for a smooth experience."
    },
    {
        id: 3,
        question: "What is the warranty period for your products?",
        answer: "Most of our products come with a standard one-year limited warranty covering manufacturing defects. Specific warranty details for each product can be found on its respective product page and on our dedicated 'Warranty' policy page."
    },
    {
        id: 4,
        question: "Do you offer international shipping?",
        answer: "Yes, we ship globally! International shipping rates and delivery times vary based on the destination country and selected service. All customs duties and import taxes are the responsibility of the customer."
    },
    {
        id: 5,
        question: "How can I contact B2B Sales for bulk orders?",
        answer: "For bulk or B2B inquiries, please visit our 'B2B Orders' page where you can fill out a dedicated form. A member of our enterprise sales team will reach out to you within 24 hours to discuss volume pricing and custom solutions."
    },
    {
        id: 6,
        question: "Where can I find product documentation and software downloads?",
        answer: "All drivers, firmware updates, and detailed user manuals are available for free download on our 'Downloads' page. We highly recommend checking this page for the latest software versions."
    }
];


const FAQPage = () => {
    const [openId, setOpenId] = useState(null);

    const toggleAccordion = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-gray-400 text-xl">
                        Find quick answers to the most common questions about our products and services.
                    </p>
                </header>

                <div className="rounded-xl shadow-2xl overflow-hidden bg-gray-900 border border-gray-800">
                    {faqData.map((item) => (
                        <AccordionItem
                            key={item.id}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openId === item.id}
                            toggleAccordion={() => toggleAccordion(item.id)}
                        />
                    ))}
                </div>

                <div className="mt-12 text-center p-6 bg-gray-800 rounded-lg">
                    <h3 className="text-2xl font-semibold text-white mb-3">
                        Still have questions?
                    </h3>
                    <p className="text-gray-400 mb-4">
                        If you can't find the answer you're looking for, feel free to contact our customer support team.
                    </p>
                    {/* Placeholder for a contact button */}
                    <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md shadow-indigo-500/50">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

const ErgonomicGripSection = ({ grips = [] }) => {
    if (!grips || grips.length === 0) return null;
    return (
        <div className="my-16 text-center">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Suits every hand size and grip</h2>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1 mb-8">Ergonomic Design</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {grips.map(grip => (
                    <div key={grip.name}>
                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-inner">
                            <img src={grip.image} alt={grip.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="font-semibold mt-4 text-gray-700 dark:text-gray-300">{grip.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ===================================
// === PAGE COMPONENTS ===
// ===================================
// === REPLACE your existing HomePage component (around line 1289) with this fixed version ===
// === REPLACE your existing HomePage component with this fixed version ===
const HomePage = ({
    onNavigate,
    detailedProducts, // This is your 'allProducts' list (summaries)
    categories,      // This is the list of categories with slugs as IDs
    allProductsCategory, // This is the "All products" object
    heroSlides,
    onAddToCart,
    bannerKey,
}) => {

    // Safety checks for props
    const safeDetailedProducts = Array.isArray(detailedProducts) ? detailedProducts : [];
    const safeCategories = Array.isArray(categories) ? categories.filter(c => c.id !== 'all') : [];
    const safeAllProductsCategory = allProductsCategory || { id: "all", name: "All Products", count: 0, image: '...' };

    // --- CRITICAL CHECK: ONLY FIND FEATURED PRODUCT IF DATA EXISTS ---
    const featuredChair = safeDetailedProducts.find((p) => p.id === 14);

    // ✅ NEW SAFEGUARD: If no products loaded yet, show a loading spinner/message.
    if (safeDetailedProducts.length === 0) {
        return (
            <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Loading Products...</h1>
                <p className="text-gray-600 dark:text-gray-300">Please wait while we fetch the latest gear.</p>
            </section>
        );
    }
    
    // --- If products exist, render the full content ---
    return (
        <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-black">
            {/* 1. Hero Slider */}
            <HeroSlider slides={heroSlides} onNavigate={onNavigate} />

            {/* 2. Scrollable Category Nav (Uses safeCategories) */}
            <div className="my-16">
                <ScrollableCategoryNav
                    onNavigate={onNavigate}
                    categories={safeCategories} 
                    allProductsCategory={safeAllProductsCategory}
                />
            </div>

            {/* 3. Featured Product (Only renders if found) */}
            {featuredChair && (
                <>
                    <TypingBanner
                        key={`featured-${bannerKey}`}
                        text="FEATURED PRODUCT"
                    />
                    <FeaturedProductCarousel
                        productId={featuredChair.id}
                        onNavigate={onNavigate}
                        onAddToCart={onAddToCart}
                    />
                </>
            )}

            {/* 4. Big Deals Slider */}
            <BigDealsSlider products={safeDetailedProducts} onNavigate={onNavigate} bannerKey={bannerKey} />

            {/* 5. Shop The Setup */} 
            <ShopTheSetup
                onNavigate={onNavigate}
                products={safeDetailedProducts}
                markers={markers}
            />

            {/* 6. DYNAMIC CATEGORY SECTIONS */}
            {safeCategories.map(
                (categoryInfo) => { 
                    const categorySlug = categoryInfo.id; 
                    const productsForCategory = safeDetailedProducts.filter(
                        (p) => p.categorySlug === categorySlug
                    );
                    
                    if (productsForCategory.length === 0) {
                        return null; 
                    }

                    return (
                        <React.Fragment key={categorySlug}>
                            <TypingBanner
                                key={`${categorySlug}-${bannerKey}`} 
                                text={categoryInfo.name.toUpperCase()} 
                            />

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                                {productsForCategory.slice(0, 4).map(product => ( 
                                    <ProductCard
                                        key={product.id}
                                        product={product} 
                                        onNavigate={onNavigate}
                                    />
                                ))}
                            </div>
                        </React.Fragment>
                    );
                }
            )}
            
            {/* 7. IMAGE COMPARE SLIDER */}
            <TypingBanner
                key={`hive-setup-${bannerKey}`} 
                text="ENHANCE YOUR SETUP WITH HIVE"
            />
            
            <div className="my-20 w-full">
                <ImageCompareSlider />
            </div>

        </section>
    );
};
// ===============================================
// 4. PROFILE PAGE (WITH TAB FIX)
// ===============================================
// This component should be named FullProfilePage to match the App.js router

const FullProfilePage = ({ currentUser, onLogout, onNavigate, orderHistory, initialTab = 'info' }) => {
    
    // FIX: Calculate safety variables here to prevent crashes
    const totalOrders = orderHistory ? orderHistory.length : 0;
    const completedOrders = orderHistory ? orderHistory.filter(o => o.status === 'Delivered').length : 0;
    
    const [activeTab, setActiveTab] = useState(initialTab); 
    
    useEffect(() => { setActiveTab(initialTab); }, [initialTab]);
    
    if (!currentUser) { return null; } // Should be caught by App.js router, but included for safety

    const handleTabChange = (tabName) => { setActiveTab(tabName); };

    const ProfileSidebar = () => (
        <div className="md:w-1/4">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
                <div className="flex items-center flex-col mb-6">
                    <img src={`https://api.dicebear.com/8.x/initials/svg?seed=${currentUser.name}`} className="w-24 h-24 rounded-full mb-4 object-cover bg-gray-700" alt="User avatar" />
                    <h3 className="text-2xl font-bold text-white">{currentUser.name}</h3>
                    <p className="text-gray-400">{currentUser.email}</p>
                </div>
                <nav className="space-y-2">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('info'); }} className={`profile-nav-link flex items-center p-3 rounded-xl ${activeTab === 'info' ? 'bg-violet-900/50 text-violet-400 font-bold' : 'text-gray-200 hover:bg-gray-700'}`}>Profile Overview</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('settings'); }} className={`profile-nav-link flex items-center p-3 rounded-xl ${activeTab === 'settings' ? 'bg-violet-900/50 text-violet-400 font-bold' : 'text-gray-200 hover:bg-gray-700'}`}>Settings</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('orders'); }} className={`profile-nav-link flex items-center p-3 rounded-xl ${activeTab === 'orders' ? 'bg-violet-900/50 text-violet-400 font-bold' : 'text-gray-200 hover:bg-gray-700'}`}>Order History</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="flex items-center p-3 rounded-xl hover:bg-red-900/20 text-red-500 transition-colors">Logout</a>
                </nav>
            </div>
        </div>
    );

    const ProfileContent = () => {
        switch (activeTab) {
            case 'orders': return <OrderHistoryPage orders={orderHistory} onNavigate={onNavigate} />;
            case 'settings': return <SettingsPage />; // Assuming SettingsPage is defined
            case 'info': 
            default: return (
                <div className="profile-page bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
                    <h2 className="text-3xl font-bold mb-6 text-white">Account Dashboard</h2>
                    
                    {/* 1. Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 bg-gray-700 rounded-lg text-center">
                            <p className="text-4xl font-bold text-violet-400">{totalOrders}</p>
                            <p className="text-gray-400 mt-1">Total Orders</p>
                        </div>
                        <div className="p-4 bg-gray-700 rounded-lg text-center">
                            <p className="text-4xl font-bold text-green-400">{completedOrders}</p>
                            <p className="text-gray-400 mt-1">Delivered</p>
                        </div>
                    </div>

                    {/* 2. Last Order Status */}
                    <div className="bg-gray-700 p-4 rounded-xl mb-8">
                        <p className="font-semibold text-white mb-2">Last Order Status:</p>
                        {totalOrders > 0 && orderHistory[0] ? (
                            <div className="flex justify-between items-center text-sm">
                                <p className="text-gray-300">{orderHistory[0].id}</p>
                                <span className={`font-bold ${orderHistory[0].status === 'Delivered' ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {orderHistory[0].status}
                                </span>
                            </div>
                        ) : (
                            <p className="text-gray-400">No recent orders found. Place your first order!</p>
                        )}
                    </div>


                    {/* 3. Call to Action Buttons */}
                    <div className="space-y-4">
                        <button
                            onClick={() => handleTabChange('orders')}
                            className="w-full bg-violet-600 text-white font-bold py-3 rounded-lg hover:bg-violet-700 transition-colors"
                        >
                            View Order History
                        </button>
                    </div>

                    <button onClick={onLogout} className="mt-8 font-semibold text-red-400 py-2 px-5 border border-red-400/50 rounded-lg hover:bg-red-500/20 hover:text-red-300 transition-colors duration-200">Logout</button>
                </div>
            );
        }
    };

    return (
        <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <ProfileSidebar />
                <div className="md:w-3/4"><ProfileContent /></div>
            </div>
        </section>
    );
};
const CategoryPage = ({ onNavigate, pageData, detailedProducts, categories, allProductsCategory }) => {
    // Receive products and categories from App component
    const { categoryId } = pageData; // categoryId here is the SLUG (e.g., 'keyboard')

    // Use the passed-in props
    const safeDetailedProducts = Array.isArray(detailedProducts) ? detailedProducts : [];
    const safeCategories = Array.isArray(categories) ? categories : [];
    const safeAllProductsCategory = allProductsCategory || { id: 'all', name: 'All Products', count: 0 };

    let productsToDisplay = [];
    let categoryName = "";
    // Combine fetched categories with the 'All' category info
    const allCategoryInfo = [...safeCategories, safeAllProductsCategory];

    if (categoryId === 'all') {
        productsToDisplay = safeDetailedProducts; 
        categoryName = "All Products";
    } else if (categoryId === 'audio-video') {
        // Filter products using the separate slugs from products.json
        productsToDisplay = safeDetailedProducts.filter(p => 
            p.categorySlug === 'audio' || 
            p.categorySlug === 'camera' || 
            p.categorySlug === 'lighting' 
        );
        categoryName = "Audio, Video & Lights"; 
        const audioVideoCat = safeCategories.find(c => c.id === categoryId); 
        if(audioVideoCat) categoryName = audioVideoCat.name;
    } else {
        const category = allCategoryInfo.find(c => c.id === categoryId); // Find by frontend ID (slug)
        if (category) {
            // Filter based on categorySlug (e.g., 'keyboard') from fetched summaries
            productsToDisplay = safeDetailedProducts.filter(p => p.categorySlug === categoryId);
            categoryName = category.name;
        }
    }

    // *** FINAL SAFEGUARD FIX: If the name is missing but products exist, generate a name from the slug ***
    if (!categoryName && productsToDisplay.length > 0) {
        // Fallback: Capitalize the slug to display a friendly name (e.g., 'keyboard' -> 'Keyboard')
        categoryName = categoryId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()); 
    }
    
    // If no categoryName could be found AND no products match (actual error state)
    if (!categoryName && productsToDisplay.length === 0) { 
        return <div className="page container mx-auto p-8 text-center text-gray-900 dark:text-white">Category '{categoryId}' not found.</div>;
    }


    return (
        <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">{categoryName}</h1>
             {productsToDisplay.length === 0 ? (
                 <p className="text-gray-600 dark:text-gray-300">No products found in this category yet.</p>
             ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Render ProductCard with product summaries */}
                    {productsToDisplay.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product} // Pass the summary DTO directly
                            onNavigate={onNavigate}
                        />
                    ))}
                </div>
             )}
        </section>
    );
};
// === REPLACE your existing AuthPage component (around line 4344) with this: ===
const AuthPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || (!isLogin && !name)) {
            setError("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        setError(null);

        const url = isLogin 
            ? `${API_BASE_URL}/auth/login` 
            : `${API_BASE_URL}/auth/register`;
            
        const payload = isLogin 
            ? { email, password } 
            : { email, password, name };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                credentials: 'include' 
            });
            
            const contentType = response.headers.get("content-type");
            const isJson = contentType && contentType.includes("application/json");

            if (!response.ok) {
                let errorData;
                if (isJson) {
                    errorData = await response.json();
                    const message = errorData.message || (errorData.errors ? Object.values(errorData.errors)[0] : 'Authentication failed.');
                    throw new Error(message);
                } else {
                    const plainTextError = await response.text();
                    console.error("Non-JSON Server Error:", plainTextError);
                    if (response.status === 401) throw new Error("Invalid email or password.");
                    throw new Error('Unexpected server error. The server returned a non-standard response.');
                }
            }

            const data = isJson ? await response.json() : {}; 
            
            if (isLogin) {
                onLogin(data); // Expects { token, user }
            } else {
                alert("Registration successful! Please log in.");
                setIsLogin(true);
                setPassword(''); 
            }

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page min-h-screen flex items-center justify-center p-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=2070&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="w-full max-w-md">
                <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700">
                    <h2 className="text-4xl font-bold text-center text-white mb-8">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full h-14 px-6 rounded-xl border-2 border-transparent bg-gray-800/80 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all text-lg" disabled={isLoading} />
                        )}
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full h-14 px-6 rounded-xl border-2 border-transparent bg-gray-800/80 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all text-lg" disabled={isLoading} />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full h-14 px-6 rounded-xl border-2 border-transparent bg-gray-800/80 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all text-lg" disabled={isLoading} />
                        
                        {isLogin && <a href="#" className="block text-right text-primary hover:underline">Forgot Password?</a>}

                        {error && (
                            <p className="text-red-400 text-sm text-center bg-red-900/50 p-3 rounded-lg">{error}</p>
                        )}
                        
                        {/* 🚨 REPLACED BUTTON WITH ANIMATED COMPONENT 🚨 */}
                        <AnimatedLoginButton
                            isLoading={isLoading}
                            onClick={handleSubmit} // The form handles submission, but this acts as the visual trigger
                        >
                            {isLogin ? 'Login' : 'Register'}
                        </AnimatedLoginButton>
                        
                    </form>
                    <p className="text-center text-gray-300 mt-8">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); setError(null); }} className="font-bold text-primary hover:underline">
                            {isLogin ? 'Sign up' : 'Log in'}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
// === REPLACE your existing BigDealsSlider component with this FIXED version ===
const BigDealsSlider = ({ products, onNavigate, bannerKey }) => { // Note: Added bannerKey prop
    // --- HOOKS AT THE TOP (FIXES CRASH) ---
    const scrollContainer = useRef(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true); // Assume scrollable initially
    const [autoSlide, setAutoSlide] = useState(true); // State for auto-sliding feature

    // --- Filter products (Logic runs *after* hooks) ---
    const validDeals = products.filter(p => p.primaryMedia && p.price).slice(0, 5); // Take up to 5 valid deals

    // --- Auto-slide hook (Runs unconditionally) ---
    useEffect(() => {
      if (!autoSlide || validDeals.length === 0 || !scrollContainer.current) {
          return;
      }

      const interval = setInterval(() => {
          const container = scrollContainer.current;
          if (container) {
              // Check if scrolled to the end, if so, scroll back to start
              if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) { 
                  container.scrollTo({ left: 0, behavior: 'smooth' });
              } else {
                  container.scrollBy({ left: 300, behavior: 'smooth' }); // Scroll right
              }
          }
      }, 4000); // Auto-slide interval (4 seconds)

      return () => clearInterval(interval); 
    }, [autoSlide, validDeals]); 

    // --- Function to check scroll position (Logic runs *after* hooks) ---
    const checkScroll = () => {
      if (scrollContainer.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
          setShowLeftButton(scrollLeft > 50); // Show left if scrolled more than 50px
          setShowRightButton(scrollLeft < scrollWidth - clientWidth - 50); // Show right if not near the end
      }
    };

    // --- useEffect for checking scroll position (Runs unconditionally) ---
    useEffect(() => {
        const container = scrollContainer.current;
        if (container) {
            let scrollTimeout;
            const handleScroll = () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(checkScroll, 150);
            };

            container.addEventListener('scroll', handleScroll);
            checkScroll(); 
            const resizeObserver = new ResizeObserver(checkScroll);
            resizeObserver.observe(container);

            const initialCheckTimeout = setTimeout(checkScroll, 300);

            return () => { // Cleanup listeners
                clearTimeout(scrollTimeout);
                clearTimeout(initialCheckTimeout);
                container.removeEventListener('scroll', handleScroll);
                resizeObserver.unobserve(container);
            };
        }
    }, [validDeals]); 

    // --- Conditional Return *AFTER* Hooks ---
    if (!validDeals || validDeals.length === 0) {
      return (
            <div className="my-12">
                <section className="py-12 bg-black text-white rounded-2xl">
                    <div className="container mx-auto px-6">
                        {/* Static Placeholder if no deals */}
                        <h2 className="text-3xl font-bold mb-6">🔥 Big Deals</h2> 
                        <p className="text-gray-400 text-center py-8">No deals available at the moment.</p>
                    </div>
                </section>
            </div>
      );
    }

    const scroll = (direction) => {
        setAutoSlide(false); // Stop auto-slide on manual interaction
        if (scrollContainer.current) {
            const scrollAmount = 300; 
            scrollContainer.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="my-12">
            <section className="py-12 bg-black text-white rounded-2xl">
                <div className="container mx-auto px-6">
                    {/* 🚨 REPLACED STATIC H2 WITH ANIMATED TYPING BANNER 🚨 */}
                    <TypingBanner
                      key={`big-deals-${bannerKey}`} // Ensure the banner animates when the page loads
                      text="🔥 BIG DEALS"
                    />

                    {/* Relative container for positioning scroll buttons */}
                    <div className="relative group">
                        {/* Outer container to hide the scrollbar visually */}
                        <div className="overflow-hidden">
                            {/* Inner scrolling container */}
                            <div
                                ref={scrollContainer}
                                className="flex space-x-6 justify-start flex-nowrap pb-4 -mb-4 overflow-x-auto scrollbar-hide scroll-smooth" // scrollbar-hide hides scrollbar
                            >
                                {validDeals.map(product => (
                                    // Render a card for each valid deal
                                    <BigDealsCard key={product.id} product={product} onNavigate={onNavigate} />
                                ))}
                                {/* Add a small invisible element at the end to ensure the last item can scroll fully into view */}
                                <div className="flex-shrink-0 w-px h-px"></div>
                            </div>
                        </div>

                        {/* Left Scroll Button - Conditionally Rendered */}
                        {showLeftButton && (
                            <button
                                onClick={() => scroll('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label="Scroll left"
                            >
                                <ChevronLeftIcon className="w-6 h-6" />
                            </button>
                        )}

                        {/* Right Scroll Button - Conditionally Rendered */}
                        {showRightButton && (
                            <button
                                onClick={() => scroll('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label="Scroll right"
                            >
                                <ChevronRightIcon className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};
const parsePrice = (priceString) => {
    if (typeof priceString === 'string') {
        // Removes commas and converts to float
        const numericValue = parseFloat(priceString.replace(/,/g, ''));
        return isNaN(numericValue) ? 0 : numericValue;
    }
    return typeof priceString === 'number' ? priceString : 0;
};
// === REPLACE your existing FeaturedProductCarousel component ===
const FeaturedProductCarousel = ({ productId, onNavigate, onAddToCart }) => {
    // --- NEW: State for fetched product details ---
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- NEW: Fetch full product details when the component mounts or productId changes ---
    useEffect(() => {
        const fetchDetails = async () => {
            if (!productId) {
                setError("No product ID provided to FeaturedProductCarousel.");
                setIsLoading(false);
                setProduct(null);
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/products/${productId}`);
                if (!response.ok) {
                    if (response.status === 404) throw new Error(`Featured product (ID: ${productId}) not found.`);
                    throw new Error(`Failed to fetch featured product details.`);
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                console.error("Error fetching featured product:", err);
                setError(err.message);
                setProduct(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [productId]); // Re-fetch if productId changes

    // --- State for Installation Type (remains the same) ---
    const [installationType, setInstallationType] = useState('without');
    const [isHovered, setIsHovered] = useState(false);

    // --- Loading and Error States ---
    if (isLoading) {
        return <div className="max-w-4xl mx-auto py-8 text-center text-white">Loading Featured Product...</div>;
    }
    if (error) {
         return <div className="max-w-4xl mx-auto py-8 text-center text-red-500">Error: {error}</div>;
    }
    // --- Safety check if product fetch failed or returned null ---
     if (!product || !product.media || product.media.length === 0) {
         return (
             <div className="max-w-4xl mx-auto py-8 text-center text-white">
                 Featured product data or media sources are missing after fetch.
             </div>
         );
     }

    // --- Media Source Logic (uses fetched product) ---
    const mainImageSrc = product.media?.find(m => m.type === 'image')?.src;
    const videoSrc = product.media?.find(m => m.type === 'video')?.src;
    const mediaToDisplay = videoSrc || mainImageSrc;
    const isVideo = !!videoSrc;

    // --- Dynamic Data Retrieval (uses fetched product) ---
    const DISPLAY_PRICE = parsePrice(product.price);
    const DISPLAY_MRP = parsePrice(product.mrp);
    const DISPLAY_DISCOUNT_PERCENTAGE = product.discountPercentage || 0;
    const INSTALLATION_FEE = 1000;
    const effectivePrice = installationType === 'without' ? DISPLAY_PRICE : DISPLAY_PRICE + INSTALLATION_FEE;
    const effectivePriceEmi = Math.floor(effectivePrice / 12);
    const isSoldOut = product.isSoldOut; // Assuming backend DTO might have this

    // --- Handlers (remain the same, use fetched product) ---
    // Pass the full fetched product object to the details page
    const handleNavigateToDetails = () => onNavigate('product-details', product); 
    const handleBuyNow = () => onNavigate('address'); // Navigate to address page

    // --- Get Theme based on fetched product ---
     const theme = getBrandTheme(product.name);
     const dynamicGlowClass = theme.glowClass.replace('hover:', ''); // Get base glow

    return (
        <div className="max-w-4xl mx-auto py-8"
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
        >
            {/* Apply dynamic glow based on fetched product's theme */}
            <div className={`relative z-0 mx-4 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ease-in-out border
                ${isHovered ? dynamicGlowClass + ' ' + theme.borderClass : 'shadow-none border-gray-200 dark:border-gray-700'}
            `}>
                <div className="flex flex-col lg:flex-row bg-white dark:bg-[#121212]">

                    {/* LEFT (MEDIA) Section */}
                    <div
                        className="flex-shrink-0 w-full lg:w-1/2 relative flex justify-center items-center min-h-[400px] lg:min-h-[500px] rounded-l-xl overflow-hidden"
                        // Use a neutral or theme-based subtle background
                        style={{ background: theme.sectionBg || '#E6E0F8' }}
                    >
                        {/* Discount Sticker */}
                        <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-md z-10">
                            {DISPLAY_DISCOUNT_PERCENTAGE}% OFF
                        </div>

                        <div className="relative w-full h-full flex items-center justify-center">
                            {isVideo ? (
                                <video
                                    key={mediaToDisplay}
                                    src={mediaToDisplay}
                                    autoPlay muted loop playsInline
                                    className="w-full h-full object-cover"
                                    onError={(e) => console.error("Featured video failed:", mediaToDisplay)}
                                />
                            ) : (
                                <img
                                    src={mainImageSrc}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                     onError={(e) => { e.target.onerror = null; e.target.src='placeholder.jpg'}}
                                />
                            )}
                             {isVideo && (
                                 <div className="absolute bottom-4 left-4 p-2 bg-black/60 rounded-lg text-white text-sm flex items-center space-x-2">
                                     <VideoIcon className="w-4 h-4" />
                                     <span>Playing Video Clip</span>
                                 </div>
                             )}
                        </div>
                    </div>

                    {/* RIGHT (INFO) Section */}
                    <div className="flex-shrink-0 w-full lg:w-1/2 p-6 bg-gray-900 dark:bg-gray-800 text-gray-900 dark:text-white lg:border-l lg:border-gray-200 dark:lg:border-gray-700 flex flex-col justify-between">
                         <div>
                            <h2 className="text-xl font-semibold mb-2 text-white">{product.name}</h2>
                             {/* Price, MRP, Discount, EMI */}
                             <div className="flex items-center justify-between">
                                 <div className="flex flex-col">
                                     {/* Use theme accent color for price */}
                                     <span className={`text-3xl font-bold ${theme.accentText} ${theme.darkAccentText}`}>
                                         ₹{effectivePrice.toLocaleString('en-IN')}
                                     </span>
                                     <div className="flex items-center gap-3 mt-1">
                                         <span className="text-sm text-gray-400 line-through">MRP ₹{DISPLAY_MRP.toLocaleString('en-IN')}</span>
                                     </div>
                                 </div>
                                 <div className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-md self-start mt-1">
                                     {DISPLAY_DISCOUNT_PERCENTAGE}% OFF
                                 </div>
                             </div>
                              {/* Cashback/EMI Strip */}
                             <div className={`bg-${theme.name}-600/10 p-2 my-3 rounded-lg text-sm text-${theme.name}-400 font-semibold border border-${theme.name}-600/30`}>
                                 <span className={`bg-${theme.name}-600 text-white px-1 py-0.5 rounded-sm text-xs font-bold mr-1`}>NEW</span>
                                  Flat 10% cashback up to ₹250
                              </div>
                             {/* EMI Info */}
                            <div className="flex items-center justify-between text-sm mb-4">
                                <p className="text-gray-400 mr-2">
                                    Or Pay ₹{effectivePriceEmi.toLocaleString('en-IN')} now & rest later at 0% EMI on
                                    {/* Use theme accent color here too */}
                                    <span className={`font-bold ${theme.accentText} ${theme.darkAccentText}`}> kfbo. PayLater</span>
                                </p>
                                <button
                                    className="text-xs bg-violet-600 text-white font-medium px-3 py-1.5 rounded-lg shadow-md hover:bg-violet-700 transition-colors flex-shrink-0"
                                    onClick={() => onNavigate('emi-options')} // Assuming an EMI page route
                                >
                                    BUY ON EMI
                                </button>
                            </div>
                        </div>

                        {/* Installation Options */}
                        <div className="mt-4">
                            <p className="text-sm font-semibold text-gray-300 mb-2">Installation Support: <span className="font-normal">{installationType === 'without' ? 'Without Installation Support' : `With Installation Support (+₹${INSTALLATION_FEE.toLocaleString()})`}</span></p>
                            <div className="flex gap-4 text-sm">
                                <button
                                    onClick={() => setInstallationType('without')}
                                    className={`flex-1 px-4 py-2 border rounded-md transition-colors text-xs font-semibold ${
                                        installationType === 'without'
                                        ? 'bg-gray-700 border-white text-white shadow-sm'
                                        : 'border-gray-600 text-gray-400 hover:border-gray-500'
                                    }`}
                                >
                                    Without Installation
                                </button>
                                <button
                                    onClick={() => setInstallationType('with')}
                                     className={`flex-1 px-4 py-2 border rounded-md transition-colors text-xs font-semibold ${
                                        installationType === 'with'
                                        ? 'bg-gray-700 border-white text-white shadow-sm'
                                        : 'border-gray-600 text-gray-400 hover:border-gray-500'
                                    }`}
                                >
                                    With Installation
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 pt-8">
                            <button
                                onClick={handleNavigateToDetails}
                                className={`text-white font-semibold py-3 rounded-lg transition-all text-base ${
                                    isSoldOut
                                    ? 'bg-gray-700 cursor-not-allowed'
                                    : 'bg-gray-700 hover:bg-gray-600 shadow-md'
                                }`}
                                disabled={isSoldOut}
                            >
                                {isSoldOut ? 'SOLD OUT' : 'View Product Details'}
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="bg-white text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-200 transition-all text-base shadow-md"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
// === UPDATED CartPage (Added Animation to Checkout Button) ===
const CartPage = ({ cart: backendCart = [], onUpdateQuantity, onRemove, onNavigate }) => {
    const [localCart, setLocalCart] = useState([]);

    // --- Load from localStorage or sync with backendCart prop ---
    useEffect(() => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        // Prioritize backend data if it exists, otherwise use local storage
        if (backendCart && backendCart.length > 0) {
          setLocalCart(backendCart);
        } else if (storedCart.length > 0) {
          setLocalCart(storedCart);
        } else {
          setLocalCart([]);
        }
      } catch (err) {
        console.warn("⚠️ Could not read localStorage cart:", err);
        setLocalCart(backendCart);
      }
    }, [backendCart]);

    // --- Sync helper to update localStorage + UI instantly ---
    const updateLocalCart = (updatedCart) => {
      setLocalCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // --- Quantity Change Handler ---
    const handleQuantityChange = (productId, newQty) => {
      const updatedCart = localCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      );
      updateLocalCart(updatedCart);

      if (newQty < 1) {
        onRemove(productId); 
      } else {
        onUpdateQuantity(productId, newQty); 
      }
    };

    // --- Remove Item Handler ---
    const handleRemove = (productId) => {
      const updatedCart = localCart.filter((item) => item.product.id !== productId);
      updateLocalCart(updatedCart);
      onRemove(productId);
    };

    // --- Subtotal ---
    const subtotal = localCart.reduce((sum, item) => {
      const price = parseFloat(item?.product?.price || 0);
      return sum + price * item.quantity;
    }, 0);

    if (localCart.length === 0) {
      return (
        <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Looks like you haven't added anything yet. Let's find something for you!
            </p>
            <button
              onClick={() => onNavigate("home")}
              className="bg-primary text-white font-bold py-4 px-12 rounded-xl text-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-transform"
            >
              Continue Shopping
            </button>
          </div>
        </section>
      );
    }

    return (
      <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Your Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-4">
            {localCart.map((item) => {
              if (!item || !item.product) {
                console.error("🧩 Invalid cart item:", item);
                return null;
              }

              const product = item.product;
              const itemPrice = parseFloat(product.price || 0);
              const itemTotal = itemPrice * item.quantity;
              const imageSrc = product.media?.[0]?.src || PLACEHOLDER_IMAGE_URL;

              return (
                <div
                  key={product.id}
                  className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 gap-4"
                >
                  <img
                    src={imageSrc}
                    alt={product.name || "Product"}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = PLACEHOLDER_IMAGE_URL;
                    }}
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {product.name || "Unnamed Product"}
                    </h3>
                    <p className="text-primary font-semibold">₹{itemPrice.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Minus */}
                    <button
                      onClick={() => handleQuantityChange(product.id, item.quantity - 1)}
                      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="font-bold w-8 text-center">{item.quantity}</span>
                    {/* Plus */}
                    <button
                      onClick={() => handleQuantityChange(product.id, item.quantity + 1)}
                      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="w-24 text-right">
                    <p className="font-bold text-lg text-gray-900 dark:text-white">
                      ₹{itemTotal.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="p-2 text-gray-500 hover:text-red-500 dark:hover:text-red-400"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-fit border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Order Summary
              </h2>
              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span> <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span> <strong className="text-green-500">FREE</strong>
                </div>
                <div className="border-t pt-4 mt-4 flex justify-between text-xl font-bold text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span className="text-primary">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate("address", { subtotal })} 
                // 🚀 ADDED ANIMATION CLASSES HERE
                className="w-full mt-6 bg-primary text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02] active:scale-95"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    );
};

// ===============================================
// 2. SETTINGS PAGE
// ===============================================

const SettingToggle = ({ label, description, isEnabled, setIsEnabled }) => (
    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-xl">
        <div><label className="text-lg font-semibold text-white cursor-pointer">{label}</label><p className="text-sm text-gray-400 mt-1">{description}</p></div>
        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-4">
            <input type="checkbox" checked={isEnabled} onChange={() => setIsEnabled(!isEnabled)} className="sr-only peer"/>
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
        </label>
    </div>
);
const SettingAction = ({ label, description, actionText, onClick, buttonClasses }) => (
    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-xl">
        <div><p className="text-lg font-semibold text-white">{label}</p>{description && <p className="text-sm text-gray-400 mt-1">{description}</p>}</div>
        <button
            onClick={onClick}
            className={`font-semibold text-sm py-2 px-4 rounded-lg ml-4 transition-colors duration-200 border border-gray-600 hover:bg-gray-600 ${buttonClasses || 'text-violet-400 border-violet-400 hover:bg-violet-600/20'}`}
        >
            {actionText}
        </button>
    </div>
);


const SettingsPage = () => {
    const [isPushEnabled, setIsPushEnabled] = useState(true);
    const [isEmailEnabled, setIsEmailEnabled] = useState(false);
    const [isMFAEnabled, setIsMFAEnabled] = useState(false);
    
    return (
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 space-y-8">
            <h2 className="text-3xl font-bold text-white">App Settings</h2>

            {/* Notifications Section */}
            <div className="space-y-4">
                <div className="flex items-center space-x-3 text-violet-400 font-semibold border-b border-gray-700 pb-2">
                    <BellIcon />
                    <h3 className="text-xl">Notifications</h3>
                </div>
                <SettingToggle label="Enable Push Notifications" description="Receive alerts for sales, order status updates, and major events." isEnabled={isPushEnabled} setIsEnabled={setIsPushEnabled}/>
                <SettingToggle label="Marketing Emails" description="Receive weekly newsletters and personalized product recommendations." isEnabled={isEmailEnabled} setIsEnabled={setIsEmailEnabled}/>
            </div>

            {/* Security Section */}
            <div className="space-y-4">
                <div className="flex items-center space-x-3 text-violet-400 font-semibold border-b border-gray-700 pb-2">
                    <LockIcon />
                    <h3 className="text-xl">Account Security</h3>
                </div>
                <SettingToggle label="Two-Factor Authentication (2FA)" description="Require a code in addition to your password for login." isEnabled={isMFAEnabled} setIsEnabled={setIsMFAEnabled}/>
                <SettingAction label="Change Password" actionText="Update" onClick={() => alert("Redirecting to password change form.")}/>
            </div>

            {/* Data & Privacy Section */}
            <div className="space-y-4">
                <div className="flex items-center space-x-3 text-violet-400 font-semibold border-b border-gray-700 pb-2">
                    <DatabaseIcon />
                    <h3 className="text-xl">Data Management</h3>
                </div>
                <SettingAction label="Clear Local Cache" description="Removes temporary files and logged product searches." actionText="Clear (5MB)" onClick={() => alert("Cache cleared!")} buttonClasses="text-orange-400 border-orange-400 hover:bg-orange-600/20"/>
                <SettingAction label="Download User Data" description="Receive a copy of all data associated with your account." actionText="Request" onClick={() => alert("Data request submitted.")}/>
            </div>
        </div>
    );
};
// === REPLACE YOUR AddressPage COMPONENT WITH THIS ===
// === REPLACE YOUR AddressPage COMPONENT WITH THIS CORRECTED VERSION ===
const AddressPage = ({ onNavigate }) => {
    // Add state for form fields
    const [shippingName, setShippingName] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingCity, setShippingCity] = useState('');
    const [shippingState, setShippingState] = useState('');
    const [shippingZipCode, setShippingZipCode] = useState('');
    const [shippingPhone, setShippingPhone] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmitAddress = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const addressData = {
            shippingName,
            shippingAddress,
            shippingCity,
            shippingState, // Make sure your backend AddressDTO has all these fields
            shippingZipCode,
            shippingPhone
        };
        
        // Basic validation
        if (Object.values(addressData).some(field => field === '')) {
            setError("All fields are required.");
            setIsLoading(false);
            return;
        }

        try {
            // Get token directly from storage for this call
            const token = localStorage.getItem('authToken');
            if (!token) {
                // This case should be caught by handleNavigate, but it's a good safeguard
                throw new Error("You are not logged in.");
            }

            // Call the new backend endpoint to save address to session
            const response = await fetch(`${API_BASE_URL}/address`, { // Note: /api/address
                method: 'POST',
                headers: getAuthHeadersWithToken(token), // Use the new helper
                body: JSON.stringify(addressData),
                credentials: 'include' // CRITICAL for session
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText || "Failed to save address.");
            }

            // SUCCESS! Now navigate to payment
            console.log("Address saved to session, navigating to payment.");
            onNavigate('payment'); // This will now correctly pass the subtotal

        } catch (err) {
            console.error("Failed to save address:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">Shipping Address</h1>
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                
                <form className="space-y-6" onSubmit={handleSubmitAddress}>
                    <input 
                        type="text" placeholder="Full Name" 
                        value={shippingName} onChange={(e) => setShippingName(e.target.value)}
                        className="w-full h-14 px-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all text-lg" 
                    />
                    <input 
                        type="text" placeholder="Address" 
                        value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full h-14 px-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all text-lg" 
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input 
                            type="text" placeholder="City" 
                            value={shippingCity} onChange={(e) => setShippingCity(e.target.value)}
                            className="w-full h-14 px-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all text-lg" 
                        />
                        <input 
                            type="text" placeholder="State" 
                            value={shippingState} onChange={(e) => setShippingState(e.target.value)}
                            className="w-full h-14 px-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all text-lg" 
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input 
                            type="text" placeholder="ZIP Code" 
                            value={shippingZipCode} onChange={(e) => setShippingZipCode(e.target.value)}
                            className="w-full h-14 px-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all text-lg" 
                        />
                        <input 
                            type="tel" placeholder="Phone Number" 
                            value={shippingPhone} onChange={(e) => setShippingPhone(e.target.value)}
                            className="w-full h-14 px-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all text-lg" 
                        />
                    </div>
                    
                    {error && (
                            <p className="text-red-400 text-sm text-center">{error}</p>
                    )}

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        // 🚨 PRIMARY PURPLE STYLING 🚨
                        className="w-full bg-violet-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:bg-violet-700 hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50"
                    >
                        {isLoading ? "Saving..." : "Continue to Payment"}
                    </button>
                </form>
            </div>
        </section>
    );
};
// === REPLACE YOUR PaymentPage COMPONENT WITH THIS (Lines 4558 - 4633 of App.jsx) ===
const PaymentPage = ({ onNavigate, pageData, handleConfirmOrder }) => {
    // Note: Removed Razorpay imports and script
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); 
    // Use the corrected subtotal from the pageData
    const subtotal = parsePrice(pageData?.subtotal || '0'); 
    const [selectedMethod, setSelectedMethod] = useState('SIMULATED'); // New state for selection

    // This local handler calls the main App-level function
    const handleFinalizeOrder = async () => {
        if (selectedMethod === 'COD' && subtotal > 50000) {
            setError("COD is limited to orders below ₹50,000.");
            return;
        }
        setIsLoading(true);
        setError(null);
        // Call the general order creation function, as the details (COD/Online) aren't stored
        // on the order summary DTO anyway. The key part is that the order is created.
        await handleConfirmOrder(); 
        setIsLoading(false);
    };

    return (
        <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">Checkout</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Order Summary Section */}
                <div className="lg:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-fit border border-gray-200 dark:border-gray-700 order-last lg:order-first">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                        {/* Use subtotal variable */}
                        <div className="flex justify-between"><span>Subtotal</span> <strong>₹{subtotal.toLocaleString('en-IN')}</strong></div>
                        <div className="flex justify-between"><span>Shipping</span> <strong className="text-green-500">FREE</strong></div>
                        <div className="border-t pt-4 mt-4 flex justify-between text-xl font-bold text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
                            <span>Total</span>
                            <span className="text-primary">₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Method Selection Section */}
                <div className="lg:w-2/3 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Select Payment Method</h2>
                    
                    {error && (
                        <p className="text-red-400 text-sm text-center bg-red-900/50 p-3 rounded-lg mb-4">{error}</p>
                    )}

                    <div className="space-y-4">
                        {/* 1. SIMULATED ONLINE */}
                        <div onClick={() => setSelectedMethod('SIMULATED')} className={`border dark:border-gray-700 p-4 rounded-xl ring-2 cursor-pointer ${selectedMethod === 'SIMULATED' ? 'ring-primary border-primary' : ''}`}>
                            <label className="font-bold text-lg flex items-center text-gray-800 dark:text-white cursor-pointer">
                                <input type="radio" name="payment" className="mr-3 text-primary focus:ring-primary" checked={selectedMethod === 'SIMULATED'} readOnly /> 
                                 Online Payment
                            </label>
                        </div>
                        
                        {/* 2. CASH ON DELIVERY (COD) */}
                        <div onClick={() => setSelectedMethod('COD')} className={`border dark:border-gray-700 p-4 rounded-xl ring-2 cursor-pointer ${selectedMethod === 'COD' ? 'ring-primary border-primary' : ''} ${subtotal > 50000 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <label className="font-bold text-lg flex items-center text-gray-800 dark:text-white cursor-pointer">
                                <input type="radio" name="payment" className="mr-3 text-primary focus:ring-primary" checked={selectedMethod === 'COD'} readOnly /> 
                                Cash On Delivery (COD)
                            </label>
                            {subtotal > 50000 && <p className="text-sm text-red-500 mt-2 ml-7">COD is not available for orders over ₹50,000.</p>}
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleFinalizeOrder} // <-- Calls the check and finalize logic
                        disabled={isLoading || (selectedMethod === 'COD' && subtotal > 50000)}
                        className="w-full mt-8 bg-green-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:bg-green-700 hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
                    >
                        {isLoading ? 'Processing Order...' : `Complete Order (₹${subtotal.toLocaleString('en-IN')})`}
                    </button>
                </div>
            </div>
        </section>
    );
};
// === REPLACE your existing TrackOrderPage component with this ===
const TrackOrderPage = ({ onNavigate }) => { 
    // State now tracks the specific tracking ID
    const [trackingId, setTrackingId] = useState(''); // Changed to trackingId
    const [emailOrPhone, setEmailOrPhone] = useState(''); 
    const [trackedOrder, setTrackedOrder] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Inside your App.jsx, find this function:

const handleTrackOrder = async (trackingId) => {
    // Check for required items
    if (!authToken || !trackingId) {
        console.error("Missing token or tracking ID.");
        return; 
    }

    try {
        // ✅ CRITICAL FIX: Use the secure endpoint /checkout/track?trackingId=...
        const orderResponse = await fetch(`${API_BASE_URL}/checkout/track?trackingId=${trackingId}`, {
            method: 'GET',
            headers: getAuthHeaders(), // MUST contain 'Authorization: Bearer <token>'
            credentials: 'include'
        });

        if (orderResponse.status === 403) {
            // This means the order belongs to a different user, or the token is bad.
            throw new Error("You are not authorized to view this order. Check tracking ID.");
        }
        if (!orderResponse.ok) {
            const errorText = await orderResponse.text();
            throw new Error('Failed to track order: ' + errorText);
        }

        const orderData = await orderResponse.json();
        // ... success logic
        console.log("Order tracked successfully:", orderData);

    } catch (err) {
        console.error("Tracking error:", err);
        // ... error handling
    }
};


    
    // (TrackingProgressBar component logic remains unchanged)
    const getProgressStep = (status) => {
        // ... (implementation remains the same)
        switch (status?.toUpperCase()) {
            case 'PROCESSING': return 1;
            case 'SHIPPED': return 2;
            case 'IN TRANSIT': return 3; 
            case 'DELIVERED': return 4;
            default: return 0;
        }
    };
    const TrackingProgressBar = ({ currentStatus }) => {
        const steps = ['Processing', 'Shipped', 'In Transit', 'Delivered'];
        const currentStepIndex = getProgressStep(currentStatus); 

        return (
            <div className="w-full mt-4">
                <div className="flex justify-between items-center relative mb-2 px-1">
                    {steps.map((step, index) => (
                        <div key={step} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                            index + 1 <= currentStepIndex ? 'bg-primary border-primary text-white' : 'bg-gray-600 border-gray-500 text-gray-300'
                          }`}>
                            {index + 1 < currentStepIndex ? '✓' : index + 1}
                        </div>
                    ))}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-600 transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-0 h-1 bg-primary transform -translate-y-1/2" style={{ width: `${((currentStepIndex -1) / (steps.length - 1)) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 px-1">
                    {steps.map(step => <span key={step}>{step}</span>)}
                </div>
            </div>
        );
    };

    return (
        <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">Track Your Order</h1>

            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <form onSubmit={handleTrackOrder} className="flex flex-col md:flex-row items-end gap-4 mb-8">
                    <div className="flex-grow w-full">
                        <label htmlFor="trackingId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tracking ID</label>
                        <input 
                            type="text" 
                            id="trackingId" 
                            value={trackingId} 
                            onChange={e => setTrackingId(e.target.value)} 
                            placeholder="e.g., TRK-A9B7C4" 
                            className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-primary" 
                            disabled={isLoading} 
                        />
                    </div>
                    <div className="flex-grow w-full">
                        <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email / Phone</label>
                        <input type="text" id="emailOrPhone" value={emailOrPhone} onChange={e => setEmailOrPhone(e.target.value)} placeholder="Email or Phone used for the order" className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-primary" disabled={isLoading} />
                    </div>
                    <button type="submit" className="w-full md:w-auto bg-primary text-white font-bold py-3 px-8 rounded-xl h-12 hover:bg-primary/90 active:scale-95 transition-transform disabled:opacity-50" disabled={isLoading}>
                        {isLoading ? 'Tracking...' : 'Track Order'}
                    </button>
                </form>

                {/* Display Loading or Error */}
                 {isLoading && <p className="text-center text-gray-400">Loading tracking details...</p>}
                 {error && <p className="text-center text-red-400 bg-red-900/30 p-3 rounded-md">{error}</p>}


                {/* Display Tracking Details */}
                {trackedOrder && !isLoading && !error && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div>
                                <h3 className="font-semibold text-gray-500 dark:text-gray-400">Order ID</h3>
                                <p className="text-xl font-bold text-gray-800 dark:text-white">{trackedOrder.id}</p>
                            </div>
                                {/* 🌟 NEW: DISPLAY TRACKING ID IN SUMMARY 🌟 */}
                                <div>
                                <h3 className="font-semibold text-gray-500 dark:text-gray-400">Tracking ID</h3>
                                <p className="text-xl font-bold text-primary">{trackedOrder.trackingId}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-500 dark:text-gray-400">Items</h3>
                                <div className="flex -space-x-4 mt-1">
                                    {/* Map over items from the fetched OrderSummaryDTO */}
                                    {trackedOrder.items.map(item => (
                                        <img key={item.productId}
                                             src={item.image || 'placeholder.jpg'} // Use image from OrderItemDTO
                                             alt={item.name}
                                             className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                                             title={item.name}
                                             onError={(e) => { e.target.onerror = null; e.target.src='placeholder.jpg'}}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Progress Bar */}
                         <TrackingProgressBar currentStatus={trackedOrder.status} />
                    </div>
                )}
            </div>
        </section>
    );
};
const WarrantyPage = () => {
    return (
        <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto prose dark:prose-invert">
                <h1>Warranty Policy</h1>
                <p>Details about the warranty guidelines, claim process, and exclusions...</p>
            </div>
        </section>
    );
};
// ===============================================
// 3. ORDER HISTORY PAGE
// ===============================================

// === REPLACE your existing OrderHistoryPage component with this ===
// === REPLACE your existing OrderHistoryPage component with this ===
// === REPLACE your existing OrderHistoryPage component with this ===
const OrderHistoryPage = ({ orders }) => ( // Accepts the orders array (OrderSummaryDTO[])
    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 space-y-8">
        <h2 className="text-3xl font-bold text-white border-b border-gray-700 pb-4">Order History ({orders.length})</h2>

        {orders.length === 0 ? (
            <p className="text-gray-400">You haven't placed any orders yet. Log in and buy something to see it appear here!</p>
        ) : (
            <div className="space-y-6">
                {orders.map((order) => ( // order is an OrderSummaryDTO
                    <div key={order.id} className="bg-gray-700 p-5 rounded-xl border border-gray-600">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-600 pb-3 mb-3 gap-2">
                            <div>
                                <p className="text-lg font-semibold text-white">Order #{order.id}</p> {/* Use order.id (which is orderNumber) */}
                                {/* 🌟 NEW: DISPLAY TRACKING ID HERE 🌟 */}
                                {order.trackingId && <p className="text-sm text-violet-300 mt-1">Tracking ID: <span className='font-mono font-bold'>{order.trackingId}</span></p>} 
                                <p className="text-sm text-gray-400">Placed on: {order.date}</p>
                            </div>
                            <div className="text-left sm:text-right">
                                <p className="text-xl font-bold text-violet-400">₹{order.total}</p> 
                                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                                    order.status === 'DELIVERED' ? 'bg-green-600/30 text-green-400' :
                                    order.status === 'SHIPPED' ? 'bg-blue-600/30 text-blue-400' :
                                    'bg-yellow-600/30 text-yellow-400' 
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        {/* Product List with Images */}
                        <div className="space-y-3">
                            {/* Map through order.items which is List<OrderItemDTO> */}
                            {order.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center space-x-4">
                                    <img
                                        src={item.image || 'placeholder.jpg'} // Use image from OrderItemDTO
                                        alt={item.name}
                                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-800 border border-gray-600"
                                        onError={(e) => { e.target.onerror = null; e.target.src='placeholder.jpg'}}
                                    />
                                    <div className="flex-grow">
                                        <p className="text-gray-200 font-medium">{item.name}</p>
                                        {/* item.price is BigDecimal, convert to number/string */}
                                        <p className="text-sm text-gray-400">Qty: {item.quantity} | Price: ₹{Number(item.price).toLocaleString('en-IN')}</p>
                                    </div>
                                    {/* Optional: Add "View Product" button */}
                                    {/* <button onClick={() => onNavigate('product-details', { id: item.productId })} className="...">View</button> */}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);
const ReturnsPage = () => {
    return (
        <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-gray-800/50 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Return Order</h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="orderId" className="sr-only">Order ID</label>
                            <input type="text" id="orderId" placeholder="Enter Order ID" className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-primary"/>
                        </div>
                        <div>
                            <label htmlFor="mobileNo" className="sr-only">Mobile No / Email</label>
                            <input type="text" id="mobileNo" placeholder="Enter Mobile No or Email" className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-primary"/>
                        </div>
                        <button type="submit" className="w-full bg-gray-800 dark:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-black dark:hover:bg-gray-500 transition-colors">
                            Submit
                        </button>
                    </form>
                </div>
                <div className="bg-primary/10 dark:bg-primary/20 p-8 md:p-12 text-center flex flex-col justify-center rounded-r-2xl h-full">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white">HASSLE-FREE</h1>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Returns & Exchanges</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Changed your mind? No worries! Return or exchange your items <strong className="text-primary">within 7 days</strong> for a smooth, stress-free experience.
                    </p>
                </div>
            </div>
        </section>
    );
};
const ContactUsPage = ({ onNavigate }) => {
    return (
        <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white dark:bg-gray-800/50 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center flex flex-col items-center">
                        <WhatsAppIcon className="w-12 h-12 text-green-500 mb-4" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Contact on WhatsApp</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Mon - Fri, 10:00 AM to 6:00 PM</p>
                        <a href="https://wa.me/919611507877" target="_blank" rel="noopener noreferrer" className="mt-6 w-full max-w-xs bg-black dark:bg-white text-white dark:text-black font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity">
                            Need Help?
                        </a>
                    </div>
                    <div className="bg-white dark:bg-gray-800/50 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center flex flex-col items-center">
                        <CubeIcon className="w-12 h-12 text-primary mb-4" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Where is my order?</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Click below to track it in real-time.</p>
                        <button onClick={() => onNavigate('track-order')} className="mt-6 w-full max-w-xs bg-black dark:bg-white text-white dark:text-black font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity">
                            Track Your Order
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
const RefundPolicyPage = () => (
    <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
            <h1>Refund Policy</h1>
            <p>Last updated: October 15, 2025</p>
            <h2>Returns</h2>
            <p>We have a 7-day return policy, which means you have 7 days after receiving your item to request a return...</p>
            <h2>Refunds</h2>
            <p>We will notify you once we’ve received and inspected your return, and let you know if the refund was approved...</p>
        </div>
    </section>
);

const PrivacyPolicyPage = () => (
    <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
            <h1>Privacy Policy</h1>
            <p>Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you...</p>
        </div>
    </section>
);

const TermsOfServicePage = () => (
    <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
            <h1>Terms of Service</h1>
            <p>By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms...</p>
        </div>
    </section>
);
const ShippingPolicyPage = () => (
    <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto prose dark:prose-invert prose-h1:text-4xl prose-h2:text-2xl">
            <h1>Shipping Policy</h1>
            <p>Last updated: October 15, 2025</p>

            <h2>Order Processing</h2>
            <p>All orders are processed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>

            <h2>Shipping Rates & Delivery Estimates</h2>
            <p>We offer free standard shipping on all orders across India. We do not charge any shipping fees.</p>
            <ul>
                <li><strong>Metro Cities:</strong> 2-4 business days</li>
                <li><strong>Rest of India:</strong> 4-7 business days</li>
            </ul>
            <p>Please note that delivery times are estimates and may vary depending on your location and unforeseen logistics delays.</p>
            
            <h2>Order Tracking</h2>
            <p>Once your order has shipped, you will receive an email from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.</p>
        </div>
    </section>
);
const Footer = ({ onNavigate }) => (
    <footer className="bg-black text-white">
        {/* Top Section: Quick Links, Socials, and Contact Info */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                
                {/* 1. Quick Links Column */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-300">Quick Links</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                        
                        <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('faq'); }} className="hover:text-white transition duration-200">FAQs</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('track-order'); }} className="hover:text-white transition duration-200">Track Order</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('returns'); }} className="hover:text-white transition duration-200">Returns & Exchanges</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('warranty'); }} className="hover:text-white transition duration-200">Warranty</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="hover:text-white transition duration-200">Contact Us</a></li>

                    </ul>
                </div>

                {/* 2. Socials Column */}
                <div className="col-span-1">
                    <h3 className="text-lg font-semibold mb-4 text-gray-300">Socials</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                        {/* Note: I'm using external links for socials, but you can update the URLs */}
                        <li><a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">X</a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">Instagram</a></li>
                        <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">Youtube</a></li>
                        <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">Discord</a></li>
                    </ul>
                </div>

                {/* 3. Reach out to us: Column */}
                <div className="col-span-2 md:col-span-1 pt-8 md:pt-0">
                    <h3 className="text-lg font-semibold mb-4 text-gray-300">Reach out to us:</h3>
                    <div className="space-y-2 text-sm text-gray-400">
                        {/* Contact details are non-clickable plain text/links */}
                        <p className="font-medium text-white">+91 8368027842</p>
                        <a href="mailto:help@kreo-tech.com" className="hover:text-white transition duration-200 underline">help@ReactorX.com</a>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom Copyright and Policy Bar */}
        <div className="border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                <p className="mb-2 md:mb-0">
                    © 2025 ReactorX | All Brands Pvt Ltd.
                </p>
                <div className="flex flex-wrap justify-center gap-x-4">
                    {/* Retaining common required policy links */}
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('privacy-policy'); }} className="hover:text-white">Privacy policy</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('terms-of-service'); }} className="hover:text-white">Terms of service</a>
                </div>
            </div>
        </div>
    </footer>
);


    


// ===================================
// === REUSABLE COMPONENTS ===
// ===================================
const TypingBanner = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, 50); // Typing speed

      return () => clearTimeout(timer);
    }
  }, [charIndex, text]);

  return (
    // NOTE: Using the original Tailwind classes you provided
    <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500 py-8 px-4 text-center select-none min-h-[5rem]">
      {displayText}
    </div>
  );
};

const HeroSlider = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const timeoutRef = useRef(null);

    const resetTimeout = () => { if (timeoutRef.current) { clearTimeout(timeoutRef.current); } };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1)), 5000);
        return () => resetTimeout();
    }, [currentSlide, slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    return (
        // Added rounded-2xl and overflow-hidden for the curve
        <div id="diwali-sale" className="relative rounded-2xl overflow-hidden mb-12 h-96 md:h-[500px]">
            <div className="w-full h-full">
                {slides.map((slide, index) => (
                    <div 
                        key={index} 
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        
                        {/* 🌟 FIX 1: Use w-full h-full and object-cover for background media */}
                        <img 
                            src={slide.image} 
                            alt={slide.title} 
                            className="absolute w-full h-full object-cover" 
                        />
                        
                        {/* 🌟 FIX 2: Ensure the text overlay uses a transparent background 
                                     if you want the image visible, OR lower the opacity. */}
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
                            <h2 className="text-sm font-bold uppercase text-red-300 mb-2 tracking-widest">{slide.label}</h2>
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase">{slide.title}</h1>
                            <p className="text-lg md:text-xl text-white/90">{slide.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Navigation Buttons and Dots (unchanged) */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/50 p-2 rounded-full hover:bg-white transition-colors"><ChevronLeftIcon className="w-8 h-8 text-black"/></button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/50 p-2 rounded-full hover:bg-white transition-colors"><ChevronRightIcon className="w-8 h-8 text-black"/></button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {slides.map((_, index) => ( <div key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full cursor-pointer transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`} /> ))}
            </div>
        </div>
    );
};

// === (Around line 1000 in the original file) ===

// === (Around line 1000 in the original file) ===

// === REPLACE your GlobalStyles component with this one ===
const GlobalStyles = () => (
    <style>{`
        /* * === CONSOLIDATED SCROLLBAR-HIDE ===
         * Hides scrollbars for all major browsers.
         */
        .scrollbar-hide {
            /* Firefox */
            scrollbar-width: none;
            /* IE and Edge */
            -ms-overflow-style: none;
        }

        /* Chrome, Safari and Opera (webkit browsers) */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }

        /* General Dark Mode Styling */
        .dark {
            background-color: #000;
            color: #d1d5db; /* gray-300 */
        }
        body { /* Ensure body background is also black in dark mode */
            background-color: #000;
        }

        /* Tooltip style for Shop The Setup dots */
        .dot-pulse:hover::after {
            content: attr(title);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            background: #1f2937; /* Dark background */
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            margin-bottom: 10px;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s;
        }
    `}</style>
);
// === REPLACE your existing Navbar component with this fixed version ===
const Navbar = ({ onNavigate, cartItemCount, onSearchClick }) => {
    // === LIKELY CORRECT SLUGS FOR THE BACKEND (Based on products.json) ===
    const navLinks1 = [
        { name: 'Keyboards', page: 'category', data: { categoryId: 'keyboard' } },
        { name: 'Mouse and Mousepads', page: 'category', data: { categoryId: 'mouse' } }, 
        { name: 'Ergo Chairs', page: 'category', data: { categoryId: 'chair' } },
        { name: 'Controllers', page: 'category', data: { categoryId: 'controller' } },
        { name: 'Monitor', page: 'category', data: { categoryId: 'monitor' } },
    ];
    const navLinks2 = [
        // Composite category ID for the Audio/Video/Lights page
        { name: 'Audio Video and Lights', page: 'category', data: { categoryId: 'audio-video' } }, 
        { name: 'Contact Us', page: 'contact' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="#" onClick={(e) => {e.preventDefault(); onNavigate('home');}} className="text-3xl font-black text-black dark:text-white cursor-pointer">ReactorX</a>
                    <div className="hidden md:flex items-center space-x-6 font-semibold text-gray-800 dark:text-gray-300">
                        {navLinks1.map(link => ( 
                            <a key={link.name} 
                               href="#" 
                               onClick={(e) => {e.preventDefault(); onNavigate(link.page, link.data)}} 
                               className="hover:text-black dark:hover:text-white text-sm">
                                {link.name}
                            </a> 
                        ))}
                    </div>
                    <div className="flex items-center space-x-6">
                        <button onClick={onSearchClick} className="text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white"><SearchIcon /></button>
                        <button onClick={() => onNavigate('profile')} className="text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white"><ProfileIcon /></button>
                        <button onClick={() => onNavigate('cart')} className="text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white"><CartIcon itemCount={cartItemCount} /></button>
                    </div>
                </div>
                <div className="hidden md:flex items-center justify-center h-12 space-x-6 font-semibold text-gray-800 dark:text-gray-300">
                    {navLinks2.map(link => ( 
                        <a key={link.name} 
                           href="#" 
                           onClick={(e) => {e.preventDefault(); onNavigate(link.page, link.data)}} 
                           className="hover:text-black dark:hover:text-white text-sm">
                            {link.name}
                        </a> 
                    ))}
                </div>
            </div>
        </nav>
    );
};
const HomeCategoryCard = ({ category, onNavigate }) => (
    <div 
        onClick={() => onNavigate(category.id === 'all' ? 'all-products' : 'category', { categoryId: category.id })}
        // 🌟 MODIFIED: Increased fixed width and added glow effect
        className="group flex-shrink-0 w-72 cursor-pointer bg-gray-900 rounded-lg overflow-hidden transition-all duration-300 ease-in-out 
                   hover:shadow-2xl hover:shadow-violet-700/50 hover:dark:shadow-violet-400/30 hover:-translate-y-1"
    >
        <div className="relative bg-[#544b6c] aspect-square w-full overflow-hidden">
            <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
        </div>
        <div className="p-4 bg-gray-900">
            <h3 className="font-semibold text-gray-200 truncate">{category.name}</h3>
            <div className="flex items-center text-sm text-gray-400 mt-1">
                <span>{category.count} Products</span>
                <RightArrowIcon className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </div>
    </div>
);
// === REPLACE your existing ProductCard component with this fixed version ===
// === REPLACE your existing ProductCard component with this fixed version ===
const ProductCard = ({ product, onNavigate }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // ✅ FIX 1: Use the global PLACEHOLDER_IMAGE_URL constant
    const imageSrc = product.primaryMedia?.src || PLACEHOLDER_IMAGE_URL; 
    const videoSrc = product.primaryMedia?.type === 'video' ? product.primaryMedia.src : null;
    const glowClass = getProductCardGlowClass(product.name);

    return (
        <div 
            className={`
                rounded-xl overflow-hidden group relative cursor-pointer 
                bg-white dark:bg-gray-800 
                transition-all duration-300 ease-in-out 
                hover:shadow-2xl hover:-translate-y-1
                ${glowClass}
            `} 
            onClick={() => onNavigate('product-details', { id: product.id })}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative rounded-t-xl bg-violet-100 dark:bg-violet-900/50 aspect-square w-full overflow-hidden">
                
                {/* Static Image (Base layer) */}
                <img 
                    src={imageSrc} 
                    alt={product.name} 
                    // Conditionally set opacity: 0 on hover if a video exists
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 
                                 ${isHovered && videoSrc ? 'opacity-0' : 'opacity-100 group-hover:scale-110'}`} 
                    // ✅ FIX 2: Use PLACEHOLDER_IMAGE_URL in onError fallback
                    onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMAGE_URL; }} 
                />

                {/* Video Layer (Renders if source exists, visibility controlled by opacity) */}
                {videoSrc && (
                    <video 
                        key={videoSrc} // Forces reload when product changes
                        src={videoSrc} 
                        autoPlay muted loop playsInline // ESSENTIAL playback flags
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 
                                     ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
                        onError={(e) => { console.warn("Video failed, switching to image."); e.target.style.opacity = 0; }}
                    />
                )}
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-900">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 truncate mt-1">{product.name}</h3>
                <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">₹{product.price}</p>
                    <p className="text-sm text-gray-400 line-through">MRP ₹{product.mrp}</p>
                </div>
            </div>
        </div>
    );
};
const BigDealsCard = ({ product, onNavigate }) => {
    const [isHovered, setIsHovered] = useState(false);

    const imageSrc = product.primaryMedia?.src || 'https://via.placeholder.com/300';
    const videoSrc = product.primaryMedia?.type === 'video' ? product.primaryMedia.src : null;
    const isSoldOut = product.isSoldOut || false;

    const glowClass = getProductCardGlowClass(product.name);

    return (
        <div
            onClick={() => onNavigate('product-details', { id: product.id })}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                flex-shrink-0 w-56 md:w-72 rounded-xl overflow-hidden group relative cursor-pointer
                bg-white dark:bg-gray-800 
                transition-all duration-300 ease-in-out
                hover:shadow-2xl hover:-translate-y-1
                ${isSoldOut ? 'opacity-60' : ''}
                ${glowClass} 
            `} 
        >
            {isSoldOut && (
                <div className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center rounded-xl">
                    <span className="text-white text-lg font-bold uppercase tracking-widest">Sold Out</span>
                </div>
            )}

            <div className="relative rounded-t-xl bg-violet-100 dark:bg-violet-900/50 aspect-square w-full overflow-hidden">
                {/* ... (Discount and Rating Tags - UNCHANGED) ... */}

                {/* 🚨 FINAL VIDEO/IMAGE RENDERING LOGIC FIX 🚨 */}
                {/* Static Image (Base layer) */}
                <img 
                    src={imageSrc} 
                    alt={product.name} 
                    // Conditionally set opacity: 0 on hover if a video exists
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 
                                ${isHovered && videoSrc ? 'opacity-0' : 'opacity-100 group-hover:scale-110'}`} 
                    onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/300'}}
                />

                {/* Video Layer (Renders if source exists, visibility controlled by opacity) */}
                {videoSrc && (
                    <video 
                        key={videoSrc} // Forces reload when product changes
                        src={videoSrc} 
                        autoPlay muted loop playsInline // ESSENTIAL playback flags
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 
                                    ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
                        onError={(e) => { console.warn("Video failed, switching to image."); e.target.style.opacity = 0; }}
                    />
                )}
            </div>

            <div className="p-4 bg-white dark:bg-gray-900">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 truncate mt-1">{product.name}</h3>
                <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">₹{product.price}</p>
                    <p className="text-sm text-gray-400 line-through">MRP ₹{product.mrp}</p>
                </div>
            </div>
        </div>
    );
};
const SearchModal = ({ isOpen, onClose, products, onNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const searchRef = useRef(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                const lowerCaseTerm = searchTerm.toLowerCase();
                const filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(lowerCaseTerm)
                );
                setResults(filteredProducts);
            } else {
                setResults([]);
            }
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, products]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                searchRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose}></div>
            <div className={`relative w-full max-w-md bg-white dark:bg-black text-gray-900 dark:text-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 id="modal-title" className="text-xl font-bold">Search</h2>
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                            <CloseIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            ref={searchRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for keyboards, mice, etc..."
                            className="w-full h-12 px-4 pr-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </div>
                <div className="overflow-y-auto h-[calc(100%-120px)] px-6">
                    {searchTerm && results.length > 0 && (
                        <ul className="space-y-4">
                            {results.map(product => (
                                <li key={product.id} onClick={() => { onNavigate('product-details', { id: product.id }); onClose(); }} className="flex items-center gap-4 p-2 -mx-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer">
                                    
                                    {/* --- THIS IS THE FIX --- */}
                                    <img 
                                        src={product.primaryMedia?.src || 'https://via.placeholder.com/100'} 
                                        alt={product.name} 
                                        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/100'}}
                                    />
                                    {/* --- END OF FIX --- */}
                                    
                                    <div>
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-sm text-primary font-bold">₹{product.price}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {searchTerm && results.length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-gray-500 dark:text-gray-400">No products found for "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
const ScrollingBanner = ({ isHomePage }) => {
    // Allows the banner to render on all pages if needed, but keeps the conditional check
    if (!isHomePage) {
        return null;
    }

    const animationSpeed = '40s'; 
    
    // Define the content once (to duplicate in the JSX)
    const scrollingContent = (
        <div className="flex items-center gap-10 whitespace-nowrap px-4">
            {/* 1. Free Shipping and Returns (Hollow Text) */}
            <p className="text-5xl lg:text-7xl font-extrabold lowercase tracking-widest text-hollow">
                Free Shipping and Returns
            </p>
            <span className="text-4xl lg:text-6xl font-black text-gray-300 dark:text-gray-600">
                &bull;
            </span>
            
            {/* 2. Easy Returns (Hollow Text) */}
            <p className="text-5xl lg:text-7xl font-extrabold lowercase tracking-widest text-hollow">
                Easy Returns
            </p>
            <span className="text-4xl lg:text-6xl font-black text-gray-300 dark:text-gray-600">
                &bull;
            </span>
            
            {/* 3. Best Prices Guaranteed (Hollow Text) */}
            <p className="text-5xl lg:text-7xl font-extrabold lowercase tracking-widest text-hollow">
                Best Prices Guaranteed
            </p>
            <span className="text-4xl lg:text-6xl font-black text-gray-300 dark:text-gray-600">
                &bull;
            </span>
        </div>
    );

    return (
        <>
            <style>{`
                /* 1. Animation Keyframes */
                @keyframes scroll {
                    /* Start at 0, end at -50% to repeat the duplicated content */
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); } 
                }
                
                /* Applying the animation */
                .scroll-animation {
                    animation: scroll ${animationSpeed} linear infinite;
                    /* CRITICAL: Must use flex to ensure content is side-by-side */
                    display: flex; 
                    /* Set min-width to 200% to force the scroll to repeat smoothly */
                    min-width: 200%;
                }

                /* 2. Hollow Text Styling */
                .text-hollow {
                    -webkit-text-stroke-width: 1px;
                    -webkit-text-stroke-color: #000;
                    color: transparent; 
                }

                /* 3. Dark Mode Adjustments for Hollow Text */
                .dark .text-hollow {
                    -webkit-text-stroke-color: #fff;
                }
            `}</style>
            
            {/* Outer container: Hides overflow */}
            <div className="bg-white dark:bg-gray-900 py-4 overflow-hidden border-t border-b border-gray-200 dark:border-gray-700">
                
                {/* Inner container: Applies animation and displays content twice */}
                <div className="scroll-animation">
                    
                    {/* First block (0% to 50% scroll) */}
                    {scrollingContent}
                    
                    {/* Second block (50% to 100% scroll) */}
                    {scrollingContent}
                    
                </div>
            </div>
        </>
    );
};
// === REPLACE your existing ImageCompareSlider component with this: ===
const ImageCompareSlider = ({
    // These are the default images from the screenshot you provided
    leftImage = "https://kreo-tech.com/cdn/shop/files/KREOHIVE65WHITEPDP-OWNMATERIALS.1409.png?v=1759946885&width=1000",
    rightImage = "https://kreo-tech.com/cdn/shop/files/KREOHIVE65WHITEPDP-OWNMATERIALS.1376.png?v=1759936526&width=1000"
}) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    // --- Core Drag/Move Logic ---
    const handleMove = (clientX) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate position (in pixels) within the slider, clamped between 0 and width
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        // Convert pixel position to a percentage (0 to 100)
        const percent = (x / rect.width) * 100;
        
        setSliderPosition(percent);
    };

    const handleDragStart = (e) => {
        e.preventDefault(); // Prevents text/image selection
        setIsDragging(true);
        // Determine clientX based on event type (mouse or touch)
        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        handleMove(clientX); // Initialize position
    };
    
    // --- Global Event Listener Setup (CRITICAL for smoothness) ---
    useEffect(() => {
        if (!isDragging) return;

        const onDragMove = (e) => {
            // Use touch data if available, otherwise mouse data
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            handleMove(clientX);
        };

        const onDragEnd = () => setIsDragging(false);

        // Attach listeners globally (to the window) for smooth drag outside component boundaries
        window.addEventListener('mousemove', onDragMove);
        window.addEventListener('mouseup', onDragEnd);
        window.addEventListener('touchmove', onDragMove);
        window.addEventListener('touchend', onDragEnd);

        return () => {
            // Cleanup: remove listeners when dragging stops or component unmounts
            window.removeEventListener('mousemove', onDragMove);
            window.removeEventListener('mouseup', onDragEnd);
            window.removeEventListener('touchmove', onDragMove);
            window.removeEventListener('touchend', onDragEnd);
        };
    }, [isDragging]); // Only re-run when dragging state changes


    return (
        <div 
            ref={containerRef} 
            // Allow clicking anywhere to jump the slider
            onClick={(e) => handleMove(e.clientX)}
            // Use mouse down/touch start to initiate dragging
            onTouchStart={handleDragStart} 
            className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none bg-gray-900"
        >
            {/* Background Image: Right side (Black/Darker) */}
            <img 
                src={rightImage} 
                alt="All Black" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
            />
            
            {/* Foreground Image: Left side (White/Lighter) */}
            <div 
                className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" 
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }} 
            >
                <img 
                    src={leftImage} 
                    alt="All White" 
                    className="absolute inset-0 w-full h-full object-cover" 
                />
            </div>
            
            {/* Slider Handle (Attach drag start to the handle for precise interaction) */}
            <div 
                className="absolute top-0 bottom-0 w-1 bg-white z-10 cursor-ew-resize" 
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                onMouseDown={handleDragStart} // Mouse drag start
            >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-2xl pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-black">
                        <line x1="8" y1="6" x2="8" y2="18"></line>
                        <line x1="16" y1="6" x2="16" y2="18"></line>
                    </svg>
                </div>
            </div>
            {/* Labels */}
            <span className="absolute bottom-4 left-4 text-3xl font-bold px-4 py-2 rounded-lg pointer-events-none bg-white text-black select-none">All White</span>
            <span className="absolute bottom-4 right-4 text-3xl font-bold px-4 py-2 rounded-lg pointer-events-none bg-black/80 text-white select-none">All Black</span>
        </div>
    );
};

// === REPLACE your existing ShopTheSetup component ===
const ShopTheSetup = ({ onNavigate, products = [], markers = [] }) => { // Accept products and markers as props
    
    // Default to first marker ID, or null if markers is empty
    const [activeProductId, setActiveProductId] = useState(markers[0]?.id || null); 

    // --- Find the active product from the PASSED products (summaries) list ---
    const activeProduct = activeProductId ? products.find(p => p.id === activeProductId) : null;

    // --- Safety Check ---
    if (!products || products.length === 0) {
        console.warn("ShopTheSetup: No products array provided.");
        return null; // Don't render if no products
    }
     if (!markers || markers.length === 0) {
        console.warn("ShopTheSetup: No markers array provided.");
        // Don't render if no markers
         return null;
    }

    return (
        <div className="my-12">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">Shop The Setup</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div id="shop-the-setup-image-container" className="lg:col-span-2 relative">
                    {/* Background Image */}
                    <img src="https://kreo-tech.com/cdn/shop/files/Shopthelook2.png?v=1758110768&width=1800" className="rounded-2xl w-full h-full object-cover" alt="Gaming Setup"/>

                    {/* Pulse Animation CSS */}
                    <style>{`
                        @keyframes pulse-fade {
                            0% { transform: scale(0.6); opacity: 1; }
                            50% { transform: scale(1.0); opacity: 0.5; }
                            100% { transform: scale(0.6); opacity: 1; }
                        }
                        .dot-pulse {
                            animation: pulse-fade 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
                        }
                    `}</style>

                    {/* Animated Markers */}
                    {markers.map(marker => {
                        // Find product info from summaries for the marker title (tooltip)
                         const markerProduct = products.find(p => p.id === marker.id);
                        return (
                             <button
                                key={marker.id}
                                onClick={() => setActiveProductId(marker.id)}
                                title={markerProduct?.name || `Product ID: ${marker.id}`} // Tooltip uses product name
                                className={`dot-pulse absolute w-10 h-10 rounded-full z-10 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110
                                    ${activeProductId === marker.id ? 'ring-4 ring-offset-4 ring-offset-black ring-violet-500' : ''}
                                `}
                                style={{ top: marker.top, left: marker.left }}
                            >
                                <span
                                    className={`w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-xl border-2 border-primary
                                        ${activeProductId === marker.id ? 'scale-150 bg-violet-600 border-white' : 'scale-100 bg-white border-violet-600'}
                                    `}
                                ></span>
                            </button>
                        );
                    })}
                </div>

                {/* Active Product Display */}
                {activeProduct ? ( // Check if activeProduct was found
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700/50 shadow-lg">
                        <div className="aspect-square w-full overflow-hidden mb-4 rounded-md">
                            {/* Use primaryMedia from the summary */}
                            <img
                                src={activeProduct.primaryMedia?.src || 'placeholder.jpg'}
                                alt={activeProduct.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src='placeholder.jpg'}}
                            />
                        </div>
                        <h3 className="font-semibold text-gray-800 dark:text-white text-xl">{activeProduct.name}</h3>
                        <div className="flex items-baseline gap-2 mt-1">
                            {/* Display summary prices (which are strings) */}
                            <p className="text-2xl font-bold text-black dark:text-white">₹{activeProduct.price}</p>
                            <p className="text-md text-gray-500 dark:text-gray-400 line-through">MRP ₹{activeProduct.mrp}</p>
                        </div>
                        {/* Navigate with ID only */}
                        <button onClick={() => onNavigate('product-details', { id: activeProduct.id })} className="w-full mt-4 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors hover:scale-105 active:scale-95 transition-transform">
                            View Product
                        </button>
                    </div>
                ) : (
                     // Optional: Display a placeholder if no product is selected or found
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700/50 shadow-lg flex items-center justify-center min-h-[300px]">
                        <p className="text-gray-500 dark:text-gray-400">Select an item on the setup.</p>
                    </div>
                 )}
            </div>
        </div>
    );
};
const ScrollableCategoryNav = ({ onNavigate, categories, allProductsCategory }) => {
    const scrollContainer = useRef(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true); // Assume scrollable initially

    // Safe data guards
    // The "All Products" category needs to be dynamically added here.
    const safeCategories = Array.isArray(categories) ? categories : [];
    const safeAllProducts = allProductsCategory && allProductsCategory.id ? allProductsCategory : { id: 'all', name: 'All Products', count: 0 };
    
    // Filter out the composite 'audio-video' category from the main scroll list 
    // to avoid redundancy, then add 'All Products' at the end.
    const displayCategories = safeCategories
        .filter(cat => cat.id !== 'audio-video')
        .concat(safeAllProducts); 

    // Function to handle scrolling
    const scroll = (direction) => {
        if (scrollContainer.current) {
            const scrollAmount = 300; // Adjust scroll distance as needed
            scrollContainer.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    // Function to check scroll position and toggle buttons
    const checkScroll = () => {
        if (scrollContainer.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
            setShowLeftButton(scrollLeft > 50); // Show left if scrolled more than 50px
            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 50); // Show right if not near the end
        }
    };

    // Add scroll event listener to update button visibility
    useEffect(() => {
        const container = scrollContainer.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            checkScroll();
            const timeoutId = setTimeout(checkScroll, 500);
            return () => {
                container.removeEventListener('scroll', checkScroll);
                clearTimeout(timeoutId);
            };
        }
    }, [displayCategories]); // Re-check if categories change

    if (displayCategories.length === 0) return null;

    return (
        // Added relative positioning for the buttons
        <div className="relative group">
            {/* Outer container with overflow: hidden */}
            <div className="overflow-hidden">
                {/* Inner scrolling container */}
                <div
                    ref={scrollContainer}
                    className="flex space-x-6 pb-4 -mb-4 overflow-x-auto scrollbar-hide flex-nowrap"
                    // Check scroll on initial load or resize potentially
                    onLoad={checkScroll}
                >
                    {/* Iterate over the combined list of fetched and "All Products" categories */}
                    {displayCategories.map(category => (
                        <HomeCategoryCard
                            key={category.id}
                            category={category}
                            onNavigate={onNavigate}
                        />
                    ))}
                    <div className="flex-shrink-0 w-px h-px"></div>
                </div>
            </div>

            {/* Left Scroll Button - Conditionally Rendered */}
            {showLeftButton && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Scroll left"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
            )}

            {/* Right Scroll Button - Conditionally Rendered */}
            {showRightButton && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Scroll right"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};
// === 2. ADD THIS ENTIRE COMPONENT before App() ===
// === REPLACE YOUR OrderConfirmedPage COMPONENT WITH THIS ===
// === REPLACE YOUR OrderConfirmedPage COMPONENT WITH THIS ===
const OrderConfirmedPage = ({ onNavigate, pageData }) => { // <== ADD pageData PROP
    const trackingId = pageData?.trackingId; 

    return (
        <section className="page container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Order Confirmed!</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Thank you for your purchase. Your order is being processed.</p>
                
                {/* 🌟 NEW: DISPLAY TRACKING ID 🌟 */}
                {trackingId && (
                    <div className="mb-8 p-4 bg-violet-100 dark:bg-violet-900/30 rounded-lg border border-violet-500/50">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Tracking ID</p>
                        <p className="text-2xl font-extrabold text-violet-600 dark:text-violet-400 select-all">{trackingId}</p>
                    </div>
                )}
                
                <button
                    onClick={() => onNavigate('home')}
                    className="bg-primary text-white font-bold py-3 px-8 rounded-xl text-lg hover:bg-primary/90 transition-transform"
                >
                    Continue Shopping
                </button>
                <button
                    onClick={() => onNavigate('profile', { initialTab: 'orders' })} 
                    className="mt-4 w-full text-primary font-semibold py-3 px-8 rounded-xl border border-primary hover:bg-primary/10 transition-colors"
                >
                    View Order History
                </button>
            </div>
        </section>
    );
};
const getAuthHeadersWithToken = (token) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};
// === ADD THIS FUNCTION (OUTSIDE App) ===
function useScript(src) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [src]);
}

export default function App() {
    // 1. STATE & HOOKS (MUST be first)
    const [page, setPage] = useState('home');
    const [pageData, setPageData] = useState({});

    // Fetched data state
    const [allProducts, setAllProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [productDetailsCache, setProductDetailsCache] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Auth State ---
    const [cart, setCart] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken')); 
    // State to hold tracked order data when using TrackOrderPage
    const [trackedOrder, setTrackedOrder] = useState(null);
    // ========================

    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [bannerKey, setBannerKey] = useState(Date.now());


    // === 2. CORE UTILITY HANDLERS (DEFINED IMMEDIATELY AFTER STATE) ===

    const getAuthHeaders = () => {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'X-User-Email': currentUser ? currentUser.email : '' 
        };
    };

    // --- Navigation/Logout Handlers ---

    const handleNavigate = async (newPage, data = {}) => {
        console.log(`Navigating to: ${newPage}, Data:`, data);
        window.scrollTo(0, 0);
        if (isSearchModalOpen) setIsSearchModalOpen(false);
        setBannerKey(Date.now());

        const protectedRoutes = ['profile', 'address', 'payment', 'order-confirmed', 'cart'];
        if (protectedRoutes.includes(newPage) && !authToken) {
            console.log("Navigation blocked: User not authenticated. Redirecting to login.");
            alert("Please log in to continue.");
            setPage('login');
            setPageData({});
            return;
        }

        if (newPage === 'product-details' && data?.id) {
            const productId = data.id;
            if (productDetailsCache[productId]) {
                setPageData(productDetailsCache[productId]);
                setPage(newPage);
            } else {
                const details = await fetchProductDetails(productId);
                if (details) {
                    setPageData(details);
                    setPage(newPage);
                } else {
                    setError(`Could not load details for product ID ${productId}.`);
                }
            }
        } else if (newPage === 'category' || newPage === 'all-products'){
            if (allCategories.length === 0 && !isLoading) await fetchCategories();
            const finalCategoryId = data?.categoryId || 'all';
            setPageData({ categoryId: finalCategoryId });
            setPage('category');
        } else if (newPage === 'profile' && data?.initialTab) {
            setPageData({ initialTab: data.initialTab });
            setPage(newPage);
        } 
        else if (newPage === 'payment') {
            const subtotalValue = data?.subtotal || cart.reduce((sum, item) => sum + parsePrice(item.product.price) * item.quantity, 0).toFixed(2);
            setPageData({ subtotal: subtotalValue });
            setPage(newPage);
        }
        else {
            setPage(newPage);
            setPageData(data);
        }
    };
    
    const handleLogout = () => {
        console.log("🔒 Logging out");
        setAuthToken(null); 
        setCurrentUser(null);
        setCart([]);
        setOrderHistory([]);
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        setProductDetailsCache({}); 
        handleNavigate('home'); 
    };
    
    // --- Data Fetchers ---
    
    const fetchCategories = async () => {
        try {
            const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
            if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
            const categoriesData = await categoriesResponse.json();

            const formattedCategories = (categoriesData || []).map(cat => ({
                id: cat.slug,
                name: cat.name,
                count: cat.count,
                image: cat.imageUrl
            }));
            setAllCategories(formattedCategories);
            return formattedCategories;
        } catch (err) {
            console.error("Error fetching categories:", err);
            return [];
        }
    };
    
    const fetchProductDetails = async (productId) => {
        if (productDetailsCache[productId]) {
            return productDetailsCache[productId];
        }
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/products/${productId}`);
            if (!response.ok) {
                if (response.status === 404) throw new Error(`Product with ID ${productId} not found`);
                throw new Error(`Failed to fetch product details for ID ${productId}`);
            }
            const data = await response.json();
            setProductDetailsCache(prev => ({ ...prev, [productId]: data }));
            return data;
        } catch (err) {
            console.error(err);
            setError(err.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };
    
    const fetchOrderHistory = async () => {
        if (!authToken || !currentUser) return;
        try {
            const ordersResponse = await fetch(`${API_BASE_URL}/checkout/orders`, { 
                headers: getAuthHeaders(),
                credentials: 'include'
            });

            if (!ordersResponse.ok) {
                if (ordersResponse.status === 404) { setOrderHistory([]); console.warn("No orders found for user."); return; }
                throw new Error('Failed to fetch order history');
            }
            const ordersData = await ordersResponse.json();
            setOrderHistory(ordersData || []); 
        } catch (err) {
            console.error("Error fetching order history:", err);
            if (String(err).includes("401") || String(err).includes("403")) { handleLogout(); }
        }
    };


    
   const fetchCart = async () => {
    if (!authToken || !currentUser) { setCart([]); return false; }
    try {
        const userEmail = currentUser.email;
        const response = await fetch(`${API_BASE_URL}/cart?email=${userEmail}`, {
            method: 'GET',
            headers: getAuthHeaders(),
            credentials: 'include'
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) { handleLogout(); } 
            else { console.error("Failed to fetch cart:", response.status); }
            setCart([]);
            return false;
        }

        const cartData = await response.json(); 
        
        // CRITICAL FIX: Mapping logic updated for DTO (CartItemDTO) structure
        setCart((cartData || [])
            .filter(dto => dto && dto.productId) // Filter out corrupted DTOs
            .map(dto => {
            
            // The image is now fetched directly from the DTO's productImage field
            const imageSrc = (dto.productImage) 
                            ? dto.productImage 
                            : PLACEHOLDER_IMAGE_URL; 

            return {
                product: {
                    id: dto.productId, 
                    name: dto.productName,
                    price: dto.productPrice,
                    media: [{ type: 'image', src: imageSrc }] 
                },
                quantity: dto.quantity,
                id: dto.productId
            };
        }));
        
        localStorage.removeItem("cart"); 
        console.log("🔄 Cart refetched successfully.");
        return true;

    } catch (err) {
        console.error("Error fetching cart: " + err); 
        if (String(err).includes("401") || String(err).includes("403")) { handleLogout(); }
        setCart([]);
        return false;
    }
};
    const handleAddtoCart = async (product, quantity = 1) => {
    if (!authToken) {
        handleNavigate('login');
        return false;
    }
    const productId = product?.id || product?.product?.id;
    if (!productId) {
        console.error("handleAddtoCart: Product ID is missing.");
        alert("Could not add item to cart: Product data missing.");
        return false;
    }

    try {
        // FIX: Send POST request to the 'add' endpoint with ID and quantity
        const response = await fetch(`${API_BASE_URL}/cart/add?productId=${productId}&quantity=${quantity}`, {
            method: 'POST',
            headers: getAuthHeaders(),
            credentials: 'include'
        });

        if (response.status === 401 || response.status === 403) {
            // 🚨 CRITICAL FIX: Token is bad. Force logout/re-login.
            alert("Session expired or unauthorized. Please log in again.");
            handleLogout();
            return false;
        }

        if (!response.ok) {
            // General server error (includes other 4xx/5xx codes)
            throw new Error(`Failed to add item to cart: ${response.status}`);
        }
        
        // Success logic
        const success = await fetchCart();
        console.log("Item added to cart successfully.");
        return success;

    } catch (error) {
        console.error('Error adding item to cart:', error);
        alert(`Could not add item to cart: ${error.message}`);
        return false;
    }
};
    
// 🌟 FIX 1: Quantity Update Handler uses handleAddtoCart 🌟
const handleUpdateQuantity = async (productId, requestedQuantity) => {
    if (!authToken || !currentUser) { handleNavigate('login'); return; }

    // Use handleAddtoCart (which correctly refreshes cart state)
    const mockProduct = { id: productId }; 
    await handleAddtoCart(mockProduct, requestedQuantity);
};

// 🌟 FIX 2: Delete Item Handler sends DELETE request
const handleRemoveFromCart = async (productId) => {
    if (!authToken || !currentUser) { handleNavigate('login'); return; }

    try {
        // Correct endpoint structure: DELETE /api/cart/{productId}
        const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
            method: 'DELETE', 
            headers: getAuthHeaders(),
            credentials: 'include'
        });

        if (response.status === 401 || response.status === 403) {
            alert("Session expired or unauthorized. Please log in again.");
            handleLogout();
            return;
        }
        if (!response.ok) {
            throw new Error(`Failed to remove item: ${response.status}`);
        }
        
        console.log(`Item ${productId} removed successfully.`);
        await fetchCart(); // Refresh cart to update UI
    } catch (error) {
        console.error('Error removing item:', error);
        alert(`Could not remove item: ${error.message}`);
    }
};


    const handleConfirmOrder = async () => {
    if (!authToken || !currentUser || cart.length === 0) {
        alert("Please log in and add items to your cart first.");
        handleNavigate('login');
        return;
    }

    setIsLoading(true);

    try {
        // 🎯 FIXED: Removed the insecure userId parameter from the URL.
        const response = await fetch(`${API_BASE_URL}/checkout`, { 
            method: 'POST',
            headers: getAuthHeaders(), 
            credentials: 'include'
        });

        const responseBodyText = await response.text();

        if (!response.ok) {
            let errorMsg = responseBodyText || `Order creation failed: ${response.status} ${response.statusText}`;
            if (response.status === 400) { alert(`Order Failed: ${errorMsg}`); }
            else { alert(`Order Failed: An unknown error occurred.`); }
            handleNavigate('cart');
            return;
        }

        // --- SUCCESS! Extract Tracking ID from the response text ---
        const trackingIdMatch = responseBodyText.match(/Tracking ID: (RX-\d{4}-\d+)/i);
        const trackingId = trackingIdMatch ? trackingIdMatch[1] : null;

        // alert(responseBodyText); // Commented out to prevent double alert from backend response

        // 1. Clear local states (syncs the cleared DB cart)
        localStorage.removeItem("cart");
        setCart([]);

        // 2. Refresh history and navigate to confirmation
        await fetchOrderHistory(); 
        handleNavigate('order-confirmed', { trackingId });

    } catch (err) {
        console.error("💥 Order creation error:", err);
        alert(`A network error occurred during order creation.`);
    } finally {
        setIsLoading(false);
    }
};

    

const handleDirectBuy = async (productSummaryOrDetails, quantity = 1) => {
    if (!authToken) {
        alert("Please log in to purchase an item.");
        handleNavigate('login');
        return;
    }

    const productId = productSummaryOrDetails?.id;
    if (!productId) {
        console.error("handleDirectBuy called without a valid product ID.");
        alert("Could not start direct purchase: Invalid product data.");
        return;
    }

    // 1. Add item to cart
    const success = await handleAddtoCart(productSummaryOrDetails, quantity); 
    
    if (success) {
        // 2. Navigate immediately to the address page, skipping cart view
        console.log("Direct buy: Added to cart, navigating to address.");
        handleNavigate('address'); // 🚨 FIXED: Navigate to address, not payment
    }
};

const handleTrackOrderSubmit = async (e) => { // Renamed local handler to avoid conflict
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const currentTrackingId = e.target.trackingId.value; // Assuming form has input named trackingId

    if (!authToken || !currentTrackingId) {
        setError("Please ensure you are logged in and provide a Tracking ID.");
        setIsLoading(false);
        return;
    }
    
    try {
        // ✅ CRITICAL FIX: Use the secure endpoint /checkout/track?trackingId=...
        const orderResponse = await fetch(`${API_BASE_URL}/checkout/track?trackingId=${currentTrackingId}`, {
            method: 'GET',
            headers: getAuthHeaders(), // MUST contain 'Authorization: Bearer <token>'
            credentials: 'include'
        });

        if (orderResponse.status === 403) {
            throw new Error("You are not authorized to view this order. Check tracking ID.");
        }
        if (!orderResponse.ok) {
            const errorText = await orderResponse.text();
            throw new Error('Failed to track order: ' + errorText);
        }

        const orderData = await orderResponse.json();
        setPageData(prev => ({ ...prev, trackedOrder: orderData })); // Update state in App to reflect tracked order
        console.log("Order tracked successfully:", orderData);

    } catch (err) {
        console.error("Tracking error:", err);
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
};


    const handleLogin = (authData) => {
        if (authData.token && authData.user) {
            console.log("🔑 Login successful:", authData.user.email);
            setAuthToken(authData.token);
            setCurrentUser(authData.user);
            localStorage.setItem('authToken', authData.token);
            localStorage.setItem('currentUser', JSON.stringify(authData.user));
            handleNavigate('home'); 
        } else {
            console.error("Login failed: Invalid auth data received", authData);
            setError("Login failed. Please try again.");
        }
    };


    // === 3. EFFECTS AND INITIAL DATA FETCHERS (Follow the handlers) ===

    // Fetch Initial Public Data (Products & Categories)
    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const productsResponse = await fetch(`${API_BASE_URL}/products`);
                if (!productsResponse.ok) throw new Error('Failed to fetch products');
                const productsData = await productsResponse.json();
                
                // Fix: Ensure we correctly handle array assignment.
                setAllProducts(productsData || []);

                // Ensure categories are fetched within the same successful block
                await fetchCategories();

            } catch (err) {
                console.error("Error fetching initial data:", err);
                setError(err.message);
                setAllProducts([]);
                setAllCategories([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Fetch User Data if Token Exists (This is the most complex effect)
    useEffect(() => {
        const fetchUserData = async () => {
            if (authToken) {
                setIsLoading(true); 
                try {
                    // Attempt to restore user from localStorage first for faster UI update
                    try {
                        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
                        if (storedUser) {
                             setCurrentUser(storedUser);
                        }
                    } catch (e) {
                         localStorage.removeItem('currentUser'); 
                    }

                    // --- Fetch Cart & Order History ---
                    // NOTE: These now rely on currentUser being set, which happens above.
                    // If authToken is present, fetchCart and fetchOrderHistory will use it.
                    await fetchCart(); 
                    await fetchOrderHistory(); 
                } catch (err) {
                    if (String(err).includes("Session expired") || String(err).includes("401") || String(err).includes("403")) {
                        handleLogout(); 
                    } else {
                        setError("Could not load your session data.");
                    }
                    setCurrentUser(null);
                    setCart([]);
                    setOrderHistory([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setCurrentUser(null);
                setCart([]);
                setOrderHistory([]);
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [authToken]); 


    // ENFORCE DARK THEME GLOBALLY (Unchanged)
    useEffect(() => {
        document.documentElement.classList.add('dark');
        document.body.style.backgroundColor = '#000'; 
    }, []);


    // --- Final Render ---
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const isHomePage = page === 'home';

    const renderPage = () => {
        
        if (isLoading && !currentUser && allProducts.length === 0 && !error) {
            return <div className="page container mx-auto p-8 text-center text-white">Loading...</div>;
        }
        if (error && allProducts.length === 0) {
            return <div className="page container mx-auto p-8 text-center text-red-500">Error: {error}</div>;
        }
        if (page === 'search-modal') {
             setIsSearchModalOpen(true);
             setPage('home'); 
             return null;
        }
        
        switch (page) {
            case 'profile':
                if (!currentUser) { return <AuthPage onLogin={handleLogin} />; }
                return (<FullProfilePage currentUser={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} orderHistory={orderHistory} initialTab={pageData.initialTab || 'info'} />);
            case 'home':
            default:
                return (<HomePage onNavigate={handleNavigate} detailedProducts={allProducts} categories={allCategories} allProductsCategory={{ name: 'All products', id: 'all', count: allProducts.length, image: 'https://www.techspot.com/articles-info/2772/images/2023-11-23-image-12.jpg' }} heroSlides={heroSlides} onAddToCart={handleAddtoCart} bannerKey={bannerKey} />);
            case 'product-details':
                if (!pageData || !pageData.id) { return <div className="page container mx-auto p-8 text-center text-white">Loading product details...</div>; }
                return <ProductDetailsPage product={pageData} onNavigate={handleNavigate} onAddToCart={handleAddtoCart} handleDirectBuy={handleDirectBuy} />;
            case 'category':
                return <CategoryPage onNavigate={handleNavigate} pageData={pageData} detailedProducts={allProducts} categories={allCategories} allProductsCategory={{ name: 'All products', id: 'all', count: allProducts.length, image: 'https://www.techspot.com/articles-info/2772/images/2023-11-23-image-12.jpg' }}/>;
            case 'cart':
                return <CartPage cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemoveFromCart} onNavigate={handleNavigate} />;
            case 'order-confirmed':
                return <OrderConfirmedPage onNavigate={handleNavigate} pageData={pageData} handleConfirmOrder={handleConfirmOrder} />;
            case 'address': return <AddressPage onNavigate={handleNavigate} />;
            case 'payment':
                const subtotalFromPageData = pageData?.subtotal ? parsePrice(pageData.subtotal) : cart.reduce((sum, item) => sum + parsePrice(item.product.price) * item.quantity, 0);
                return <PaymentPage onNavigate={handleNavigate} pageData={{ subtotal: subtotalFromPageData }} handleConfirmOrder={handleConfirmOrder} />;
            case 'login': return <AuthPage onLogin={handleLogin} />;
            case 'track-order': return <TrackOrderPage onNavigate={handleNavigate} trackedOrder={trackedOrder} isLoading={isLoading} setError={setError} handleTrackOrderSubmit={handleTrackOrderSubmit} />;
            case 'warranty': return <WarrantyPage />;
            case 'contact': return <ContactUsPage onNavigate={handleNavigate} />;
            case 'returns': return <ReturnsPage />;
            case 'faq': return <FAQPage />;
            case 'refund-policy': return <RefundPolicyPage />;
            case 'privacy-policy': return <PrivacyPolicyPage />;
            case 'terms-of-service': return <TermsOfServicePage />;
            case 'shipping-policy': return <ShippingPolicyPage />;
        }
    };


    return (
        <div className={'dark'}> 
            <div className="bg-black text-gray-200 transition-colors duration-300 min-h-screen flex flex-col">
                <GlobalStyles />
                <Navbar
                    onNavigate={handleNavigate}
                    cartItemCount={cartItemCount}
                    onSearchClick={() => setIsSearchModalOpen(true)}
                />
                <main className="flex-grow">
                    {renderPage()}
                </main>
                
                <ScrollingBanner isHomePage={isHomePage} />
                
                <Footer onNavigate={handleNavigate} />

                <SearchModal 
                    isOpen={isSearchModalOpen} 
                    onClose={() => setIsSearchModalOpen(false)} 
                    products={allProducts} 
                    onNavigate={handleNavigate} 
                />
            </div>
        </div>
    );
}
