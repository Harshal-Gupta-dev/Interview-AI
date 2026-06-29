import React, { useState, useEffect } from 'react';
import { useInterview } from "../hooks/useinterview";
import { useParams } from 'react-router'; 

export default function Interview() {
    const params = useParams();
    const { report, getReportbyId, getResumePdf } = useInterview();

    const [activeTab, setActiveTab] = useState('technical');
    const [expandedIndex, setExpandedIndex] = useState(0);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile state tracker

    const targetId = params.interview;

    useEffect(() => {
        if (targetId) {
            getReportbyId(targetId);
        }
    }, [targetId]);

    const handlePdfDownload = async () => {
        if (!targetId) return;
        setPdfLoading(true);
        try {
            await getResumePdf(targetId);
        } catch (error) {
            console.error("Download execution lifecycle crashed:", error);
        } finally {
            setPdfLoading(false);
        }
    };

    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const currentScore = report?.matchScore || 0;
    const strokeDashoffset = circumference - (currentScore / 100) * circumference;

    const getSeverityStyle = (severity) => {
        switch (severity?.toLowerCase()) {
            case 'high': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'low': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="min-h-screen lg:h-screen w-screen bg-[#0d0e12] text-white flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden antialiased font-sans">
            
            {pdfLoading && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex flex-col items-center justify-center space-y-4 p-4">
                    <div className="w-12 h-12 border-4 border-[#ec4899] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(236,72,153,0.4)]"></div>
                    <div className="text-center space-y-1">
                        <p className="text-white font-semibold text-sm sm:text-base tracking-wide animate-pulse">
                            Compiling Premium PDF Layout...
                        </p>
                        <p className="text-gray-500 text-xs font-mono">
                            Running headless formatting engines. Please hold on.
                        </p>
                    </div>
                </div>
            )}

            {/* 📱 MOBILE RESPONSIVE TOP NAV BAR (Hidden on Desktops) */}
            <div className="lg:hidden w-full bg-[#111217] border-b border-gray-800/60 p-4 flex items-center justify-between sticky top-0 z-40">
                <div className="text-xs font-bold text-gray-400 tracking-widest uppercase">Report View</div>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="bg-[#1a1c23] border border-gray-800 text-xs px-3 py-2 rounded-lg text-gray-300 font-semibold active:scale-95 transition-all"
                    >
                        {isMobileMenuOpen ? "Close Tabs ✕" : "Switch Tabs ☰"}
                    </button>
                    <button
                        onClick={() => handlePdfDownload()}
                        disabled={pdfLoading}
                        className="p-2 bg-[#ec4899] disabled:bg-gray-800 rounded-lg text-white shadow-md active:scale-95 transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* 🚀 1. LEFT SIDEBAR COLUMN: Navigation Options */}
            <div className={`
                ${isMobileMenuOpen ? 'flex' : 'hidden'} 
                lg:flex w-full lg:w-64 bg-[#111217] border-b lg:border-b-0 lg:border-r border-gray-800/60 flex-col justify-between flex-shrink-0 sticky lg:relative top-[57px] lg:top-0 z-30 max-h-[calc(100vh-57px)] lg:max-h-full
            `}>
                <div className="p-4 lg:p-5 space-y-4 lg:space-y-6">
                    <div className="hidden lg:block text-xs font-bold text-gray-500 tracking-widest uppercase px-2">Generated Report</div>
                    <nav className="space-y-1.5 flex flex-col sm:flex-row lg:flex-col gap-1 sm:gap-0">
                        <button
                            onClick={() => { setActiveTab('technical'); setExpandedIndex(0); setIsMobileMenuOpen(false); }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-150 ${activeTab === 'technical' ? 'bg-pink-500/10 text-[#ec4899] border-l-4 lg:border-l-4 border-[#ec4899] lg:rounded-l-none' : 'text-gray-400 hover:text-gray-200 hover:bg-[#1a1c23]'}`}
                        >
                            <span>{`</>`}</span>
                            <span>Technical Drill</span>
                        </button>
                        <button
                            onClick={() => { setActiveTab('behavioral'); setExpandedIndex(0); setIsMobileMenuOpen(false); }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-150 ${activeTab === 'behavioral' ? 'bg-pink-500/10 text-[#ec4899] border-l-4 lg:border-l-4 border-[#ec4899] lg:rounded-l-none' : 'text-gray-400 hover:text-gray-200 hover:bg-[#1a1c23]'}`}
                        >
                            <span>💬</span>
                            <span>Behavioral Drill</span>
                        </button>
                        <button
                            onClick={() => { setActiveTab('roadmap'); setExpandedIndex(0); setIsMobileMenuOpen(false); }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-150 ${activeTab === 'roadmap' ? 'bg-pink-500/10 text-[#ec4899] border-l-4 lg:border-l-4 border-[#ec4899] lg:rounded-l-none' : 'text-gray-400 hover:text-gray-200 hover:bg-[#1a1c23]'}`}
                        >
                            <span>📍</span>
                            <span>Road Map</span>
                        </button>
                    </nav>
                </div>
                <div className="bg-[#111217] p-4 border-t border-gray-800/20 lg:block hidden">
                    <div className="pb-2">
                        <button
                            onClick={() => handlePdfDownload()}
                            disabled={pdfLoading}
                            className="w-full flex items-center justify-center space-x-2.5 px-4 py-3 bg-[#ec4899] hover:bg-[#db2777] disabled:bg-gray-800 text-white text-sm font-semibold tracking-wide rounded-xl shadow-[0_4px_20px_rgba(236,72,153,0.15)] transition-all duration-150"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 animate-pulse">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                                <path d="M9 15h6" />
                                <path d="M9 11h3" />
                            </svg>
                            <span>Generate PDF</span>
                        </button>
                    </div>
                    <div className="pt-2 text-[11px] font-mono text-gray-600 text-center tracking-wide">
                        Dashboard View v1.0
                    </div>
                </div>
            </div>

            {/* 🚀 2. CENTER CONTENT COLUMN: Interactive Active Tab Render Space */}
            <div className="flex-1 bg-[#0d0e12] p-4 sm:p-6 md:p-8 flex flex-col order-2 lg:order-1 overflow-y-auto h-full">
                
                {/* Dynamic Context Header View Title Blocks */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight capitalize">
                            {activeTab === 'technical' && "Technical Interview Drill"}
                            {activeTab === 'behavioral' && "Behavioral Assessment"}
                            {activeTab === 'roadmap' && "Personalized Preparation Road Map"}
                        </h1>
                        <p className="text-xs text-gray-400 mt-1 max-w-xl">
                            {activeTab === 'technical' && `Review recommended engineering question modules tailored to matching gaps.`}
                            {activeTab === 'behavioral' && `Transferable skill assessments checking core cross-functional performance.`}
                            {activeTab === 'roadmap' && `Structured milestones engineered to accelerate target requirement mastery.`}
                        </p>
                    </div>
                    <span className="self-start sm:self-center bg-[#14161d] border border-gray-800 text-[11px] px-3 py-1 font-mono text-gray-400 rounded-full whitespace-nowrap">
                        {activeTab === 'technical' && `${report?.technicalQuestion?.length || 0} questions loaded`}
                        {activeTab === 'behavioral' && `${report?.behavioralQuestion?.length || 0} modules loaded`}
                        {activeTab === 'roadmap' && `${report?.preparationPlan?.length || 0} day sprint`}
                    </span>
                </div>

                {/* Dynamic List Rendering Conditional Containers */}
                <div className="space-y-4 flex-1">
                    {/* TECHNICAL TAB RENDER LAYOUT */}
                    {activeTab === 'technical' && report?.technicalQuestion?.map((q, idx) => (
                        <div key={idx} className="bg-[#14161d] border border-gray-800/60 rounded-xl overflow-hidden transition-all duration-200">
                            <button
                                onClick={() => setExpandedIndex(expandedIndex === idx ? -1 : idx)}
                                className="w-full text-left p-4 flex items-start justify-between space-x-3 hover:bg-[#1a1d26] transition-colors"
                            >
                                <div className="flex items-start space-x-3">
                                    <span className="text-xs font-bold tracking-wider font-mono text-[#ec4899] bg-pink-500/10 px-2 py-0.5 rounded mt-0.5 flex-shrink-0">Q{idx + 1}</span>
                                    <span className="text-sm font-semibold text-gray-100 leading-relaxed">{q.question}</span>
                                </div>
                                <span className="text-gray-500 text-xs transform transition-transform duration-150 mt-1 flex-shrink-0">
                                    {expandedIndex === idx ? '▲' : '▼'}
                                </span>
                            </button>

                            {expandedIndex === idx && (
                                <div className="p-4 bg-[#181a22] border-t border-gray-800/40 space-y-3.5 text-xs animate-fadeIn">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 font-mono">Intention</div>
                                        <p className="text-gray-400 leading-relaxed font-medium">{q.intention}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 font-mono"> Answer</div>
                                        <p className="text-gray-300 leading-relaxed font-medium bg-[#13141a] border border-gray-800/60 rounded-lg p-3 overflow-x-auto">{q.answer}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* BEHAVIORAL TAB RENDER LAYOUT */}
                    {activeTab === 'behavioral' && report?.behavioralQuestion?.map((q, idx) => (
                        <div key={idx} className="bg-[#14161d] border border-gray-800/60 rounded-xl overflow-hidden transition-all duration-200">
                            <button
                                onClick={() => setExpandedIndex(expandedIndex === idx ? -1 : idx)}
                                className="w-full text-left p-4 flex items-start justify-between space-x-3 hover:bg-[#1a1d26] transition-colors"
                            >
                                <div className="flex items-start space-x-3">
                                    <span className="text-xs font-bold tracking-wider font-mono text-[#ec4899] bg-pink-500/10 px-2 py-0.5 rounded mt-0.5 flex-shrink-0">B{idx + 1}</span>
                                    <span className="text-sm font-semibold text-gray-100 leading-relaxed">{q.question}</span>
                                </div>
                                <span className="text-gray-500 text-xs transform transition-transform duration-150 mt-1 flex-shrink-0">
                                    {expandedIndex === idx ? '▲' : '▼'}
                                </span>
                            </button>

                            {expandedIndex === idx && (
                                <div className="p-4 bg-[#181a22] border-t border-gray-800/40 space-y-3.5 text-xs">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 font-mono">Intention</div>
                                        <p className="text-gray-400 leading-relaxed font-medium">{q.intention}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 font-mono"> Answer</div>
                                        <p className="text-gray-300 leading-relaxed font-medium bg-[#13141a] border border-gray-800/60 rounded-lg p-3 overflow-x-auto">{q.answer}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* ROADMAP TIMELINE PLAN RENDER LAYOUT */}
                    {activeTab === 'roadmap' && report?.preparationPlan?.map((p, idx) => (
                        <div key={idx} className="bg-[#14161d] border border-gray-800/60 rounded-xl p-4 sm:p-5 space-y-4 shadow-xl">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800/40 pb-3 gap-2">
                                <div className="flex items-center space-x-3">
                                    <span className="text-xs font-extrabold bg-[#ec4899] text-white px-2.5 py-1 rounded-md tracking-wide uppercase font-mono shadow-sm">{p.day}</span>
                                    <h3 className="text-sm font-bold text-gray-200 tracking-wide">{p.focus}</h3>
                                </div>
                                <span className="text-[10px] text-gray-500 font-mono font-medium self-start sm:self-auto"> Sprint Module 0{idx + 1}</span>
                            </div>
                            <ul className="space-y-2.5">
                                {p.tasks?.map((task, tIdx) => (
                                    <li key={tIdx} className="flex items-start space-x-3 text-xs font-medium text-gray-400 leading-relaxed">
                                        <span className="text-[#ec4899] mt-0.5 select-none flex-shrink-0">✔</span>
                                        <span className="text-gray-300">{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🚀 3. RIGHT COLUMN: Static Evaluation Score and Skill Gaps Panel */}
            <div className="w-full lg:w-80 bg-[#111217] border-t lg:border-t-0 lg:border-l border-gray-800/60 p-4 sm:p-6 flex flex-col space-y-6 flex-shrink-0 order-1 lg:order-2 h-auto lg:h-full lg:overflow-y-auto">
                
                {/* Match Score Gauge Card Wrapper */}
                <div className="bg-[#14161d] border border-gray-800/60 rounded-xl p-5 flex flex-col items-center text-center shadow-lg">
                    <div className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4 w-full text-left">Match Score</div>

                    {/* Circular Progress Gauge */}
                    <div className="relative flex items-center justify-center mb-3">
                        <svg className="w-24 h-24 transform -rotate-90">
                            <circle cx="48" cy="48" r={radius} stroke="#1a1d26" strokeWidth="6" fill="transparent" />
                            <circle
                                cx="48"
                                cy="48"
                                r={radius}
                                stroke="#10b981"
                                strokeWidth="6"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                className="transition-all duration-500"
                            />
                        </svg>
                        <div className="absolute text-xl font-extrabold font-mono text-white flex flex-col items-center">
                            <span>{report?.matchScore || 0}%</span>
                        </div>
                    </div>

                    <p className="text-xs font-bold text-emerald-400 tracking-wide mt-1">
                        Strong match for this role
                    </p>
                </div>

                {/* Skill Gaps Metrics Feed Card */}
                <div
                    className="space-y-2.5 max-h-[40vh] lg:max-h-[55vh] overflow-y-auto pr-1"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#374151 #111217',
                    }}
                >
                    <style>{`
                        .overflow-y-auto::-webkit-scrollbar { width: 6px !important; }
                        .overflow-y-auto::-webkit-scrollbar-track { background: #111217 !important; }
                        .overflow-y-auto::-webkit-scrollbar-thumb { background-color: rgba(156, 163, 175, 0.3) !important; border-radius: 9999px !important; }
                        .overflow-y-auto::-webkit-scrollbar-thumb:hover { background-color: rgba(236, 72, 153, 0.4) !important; }
                    `}</style>

                    <div className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">Skill Gaps</div>
                    
                    {report?.skillGaps?.map((gap, idx) => (
                        <div key={idx} className="bg-[#14161d] border border-gray-800/40 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-gray-800 transition-all shadow-md">
                            <div className="text-xs font-bold text-gray-200 leading-relaxed">
                                {gap.skill}
                            </div>
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border tracking-wider uppercase self-start sm:self-auto ${getSeverityStyle(gap.severity)}`}>
                                {gap.severity}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}