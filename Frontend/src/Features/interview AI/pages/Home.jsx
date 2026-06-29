import React, { useState, useRef, useEffect } from 'react';
import { useInterview } from '../hooks/useinterview';
import { useNavigate } from 'react-router';

export default function Home() {
    const { loading, generateReport, reports, getAllReport, setReport } = useInterview();
    const [jobDescription, setJobDescription] = useState('');
    const [selfDescription, setSelfDescription] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    useEffect(() => {
        getAllReport();
    }, []);

    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                setResumeFile(file);
            } else {
                alert("Please upload a PDF or DOCX file only.");
            }
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    const handleGenerateReport = async (e) => {
        if (e && e.preventDefault) e.preventDefault();

        if (!jobDescription.trim()) {
            alert("Please paste a target job description first.");
            return;
        }
        if (!resumeFile && !selfDescription.trim()) {
            alert("Please upload your resume OR write a brief self description.");
            return;
        }

        setIsGenerating(true);

        try {
            const data = await generateReport({ selfDescription, jobDescription, resumeFile });

            if (data && data._id) {
                navigate(`/interview/${data._id}`);
            } else {
                setIsGenerating(false);
                alert("Failed to read report configurations. Check your backend console logs.");
            }
        } catch (error) {
            console.error(error);
            setIsGenerating(false);
        }
    };

    const handleCardClick = (singleReport) => {
        setReport(singleReport);
        navigate(`/interview/${singleReport._id}`);
    };

    if (isGenerating) {
        return (
            <main className="h-screen w-screen bg-[#0d0e12] text-white flex flex-col items-center justify-center font-sans antialiased">
                <div className="w-12 h-12 border-4 border-t-[#ec4899] border-gray-800 rounded-full animate-spin mb-4"></div>
                <h1 className='text-2xl font-bold tracking-wide'>Your report is Generating</h1>
                <p className="text-xs text-gray-500 mt-2 font-medium">Please wait, AI generation takes about 30 seconds...</p>
            </main>
        );
    }

    return (
        // 1. Fixed Outer Wrapper: Uses min-h-screen and handles overall viewport flow naturally
        <div className="min-h-screen max-w-full bg-[#0d0e12] text-white flex flex-col items-center p-4 md:p-6 overflow-y-auto overflow-x-hidden antialiased font-sans space-y-6">
            <style>{`
                /* Custom Scrollbar for Textareas and History container */
                .custom-layout-scroll::-webkit-scrollbar {
                    width: 6px !important;
                }
                .custom-layout-scroll::-webkit-scrollbar-track {
                    background: #14161d !important;
                    border-radius: 8px;
                }
                .custom-layout-scroll::-webkit-scrollbar-thumb {
                    background-color: rgba(156, 163, 175, 0.2) !important;
                    border-radius: 9999px !important;
                }
                .custom-layout-scroll::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(236, 72, 153, 0.4) !important;
                }
            `}</style>

            {/* Top Header Section */}
            <div className="text-center max-w-2xl w-full pt-2">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1">
                    Create Your Custom <span className="text-[#ec4899]">Interview Plan</span>
                </h1>
                <p className="text-gray-400 text-xs md:text-sm font-medium">
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                </p>
            </div>

            {/* 2. Main Input Form Container Card: Height restrictions removed to prevent workspace squeezing */}
            <div className="w-full max-w-5xl bg-[#14161d] border border-gray-800/60 rounded-xl shadow-2xl p-4 md:p-6">
                <form onSubmit={handleGenerateReport} className="flex flex-col space-y-4">

                    {/* Two-Column Grid Setup */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Left Column: Target Job Description */}
                        {/* Left Column: Target Job Description */}
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2 text-gray-200 font-semibold text-xs tracking-wide uppercase">
                                    <svg className="w-4 h-4 text-[#ec4899]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>Target Job Description</span>
                                </div>
                                <span className="bg-red-500/10 text-red-400 text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase border border-red-500/20">
                                    Required
                                </span>
                            </div>

                            {/* Restored to full scale height and your original professional multi-line placeholder layout */}
                            <div className="relative flex-1 flex flex-col">
                                <textarea
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    maxLength={5000}
                                    className="w-full flex-1 min-h-[280px] bg-[#1a1d26] border border-gray-800 focus:border-[#ec4899] rounded-lg p-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none resize-none transition-all duration-200 custom-layout-scroll overflow-y-auto"
                                    placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                                    style={{
                                        scrollbarWidth: "thin",
                                        scrollbarColor: "#374151 #1a1d26"
                                    }}
                                />
                                <div className="text-right text-[10px] text-gray-600 mt-1 font-mono">
                                    {jobDescription.length} / 5000 chars
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Your Profile Details */}
                        <div className="flex flex-col h-full justify-between">
                            <div className="flex items-center space-x-2 text-gray-200 font-semibold text-xs tracking-wide uppercase mb-2">
                                <svg className="w-4 h-4 text-[#ec4899]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>Your Profile</span>
                            </div>

                            {/* File Uploader Section */}
                            <div className="space-y-1.5 mb-3">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-400 font-medium">Upload Resume</span>
                                    <span className="bg-pink-500/10 text-[#ec4899] text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase border border-pink-500/20">
                                        Best Results
                                    </span>
                                </div>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept=".pdf,.docx"
                                    className="hidden"
                                />

                                <div
                                    onClick={() => fileInputRef.current.click()}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer p-4 h-[72px] transition-all duration-200 ${resumeFile ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-gray-800 bg-[#1a1d26] hover:bg-[#1e222c]'}`}
                                >
                                    {resumeFile ? (
                                        <span className="text-xs font-medium text-emerald-400 break-all px-2 line-clamp-1">
                                            📎 {resumeFile.name}
                                        </span>
                                    ) : (
                                        <div className="flex flex-col items-center text-center space-y-0.5">
                                            <span className="text-xs font-semibold text-gray-300">Click or drag & drop resume</span>
                                            <span className="text-[10px] text-gray-600">PDF or DOCX (Max 3MB)</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="relative flex py-1 items-center mb-2">
                                <div className="flex-grow border-t border-gray-800/40"></div>
                                <span className="flex-shrink mx-3 text-[10px] font-bold text-gray-600 tracking-widest font-mono">OR</span>
                                <div className="flex-grow border-t border-gray-800/40"></div>
                            </div>

                            {/* Quick Self-Description Area */}
                            <div className="space-y-1">
                                <label className="text-xs text-gray-400 font-medium tracking-wide">
                                    Quick Self-Description
                                </label>
                                <textarea
                                    value={selfDescription}
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                    rows={3}
                                    placeholder="Describe your experience, key skills, and stack if you don't have a resume..."
                                    className="w-full bg-[#1a1d26] border border-gray-800 focus:border-[#ec4899] rounded-lg p-2.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none resize-none custom-layout-scroll overflow-y-auto"
                                />
                            </div>

                            {/* Warning/Guidance Banner */}
                            <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-2 flex items-start space-x-2 mt-3">
                                <p className="text-[11px] text-gray-400 leading-normal">
                                    💡 Either a <span className="text-gray-200 font-medium">Resume</span> or a <span className="text-gray-200 font-medium">Self Description</span> is required.
                                </p>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-800/40 mt-2" />

                    {/* Bottom Generation Metrics Row */}
                    <div className="flex flex-row items-center justify-between gap-4 pt-1">
                        <span className="text-[11px] text-gray-600 font-medium tracking-wide">
                            AI-Powered Strategy Generation • Approx 30s
                        </span>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#ec4899] hover:bg-[#db2777] active:scale-[0.98] text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center space-x-2 shadow-lg shadow-pink-500/10 transition-all duration-150"
                        >
                            <span>★</span>
                            <span>{loading ? "Generating..." : "Generate My Interview Strategy"}</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* 3. Dedicated History Layout Section: Completely separated and given an internal card scroll option */}
            <div className="w-full max-w-5xl flex flex-col space-y-3 pb-8">
                <h2 className="text-md font-bold tracking-tight flex items-center space-x-2">
                    <span className="text-[10px] text-gray-400 bg-gray-800/60 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                        Database Archives
                    </span>
                    <span className="text-gray-300">Your Previously Generated Plans</span>
                </h2>

                {reports && reports.length > 0 ? (
                    <div className="w-full max-h-[380px] overflow-y-auto overflow-x-hidden pr-1 custom-layout-scroll">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {reports.map((singleReport, index) => {
                                const reportId = singleReport._id;
                                const score = singleReport.matchScore || 0;
                                const reportTitle = singleReport.title || "Custom Interview Blueprint";
                                const totalTechnical = singleReport.technicalQuestion?.length || 0;

                                return (
                                    <div
                                        key={reportId || index}
                                        onClick={() => handleCardClick(singleReport)}
                                        className="bg-[#14161d] border border-gray-800/60 rounded-xl p-4 cursor-pointer hover:border-[#ec4899]/60 hover:shadow-lg transition-all duration-200 group flex flex-col justify-between min-h-[135px]"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[9px] font-mono text-gray-500">Record #{index + 1}</span>
                                                <span className="bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[9px] px-2 py-0.5 rounded border border-emerald-500/20">
                                                    {score}% Match
                                                </span>
                                            </div>
                                            <h3 className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors line-clamp-2 leading-relaxed">
                                                {reportTitle}
                                            </h3>
                                        </div>

                                        <div className="flex items-center justify-between pt-2.5 mt-3 border-t border-gray-800/40 text-[11px] text-gray-500">

                                            <span className="text-[#ec4899] font-medium group-hover:translate-x-0.5 transition-transform">View Report →</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 bg-[#14161d]/30 border border-dashed border-gray-800 rounded-xl text-xs text-gray-500 font-medium">
                        No previous interview reports found in your profile logs.
                    </div>
                )}
            </div>
        </div>
    );
}