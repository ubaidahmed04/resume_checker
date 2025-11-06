import React, { useState } from "react";
import axios from "axios";
import { Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const ResumeAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    // const URL = "http://localhost:3000/api/"
    const URL = "https://resume-checkeers.vercel.app/api/"
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Please upload a resume file first!");
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post(`${URL}resume/analyze`, formData);
            setFeedback(res.data.feedback);
        } catch (err) {
            console.error(err);
            alert("Error analyzing resume");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col items-center py-10 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    🤖 Smart Resume Analyzer
                </h1>

                {/* Upload Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition">
                    <Upload className="mx-auto mb-3 text-gray-500" size={40} />
                    <p className="text-gray-600 mb-2">
                        Upload your <span className="font-semibold">PDF</span> or <span className="font-semibold">DOCX</span> file
                    </p>
                    <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleFileChange}
                        className="block mx-auto mt-3 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                </div>

                <div className="text-center mt-6">
                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center mx-auto"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                        {loading ? "Analyzing..." : "Analyze Resume"}
                    </button>
                </div>

                {/* AI Feedback */}
                {feedback && (
                    <div className="mt-6 bg-gray-100 p-6 rounded-xl shadow-md w-full max-w-2xl border border-gray-200">
                        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">AI Resume Analysis</h2>

                        {/* Summary */}
                        <p className="mb-4 text-gray-700 leading-relaxed">
                            <strong>Summary:</strong> {feedback.summary}
                        </p>

                        {/* Score Display */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-lg font-medium text-gray-800">
                                Score: <span className="text-indigo-600 font-bold">{feedback.score}/100</span>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${feedback.rating_message === "Excellent"
                                        ? "bg-green-100 text-green-700"
                                        : feedback.rating_message === "Good"
                                            ? "bg-blue-100 text-blue-700"
                                            : feedback.rating_message === "Average"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {feedback.rating_message}
                            </span>
                        </div>

                        {/* Strengths */}
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Strengths:</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {feedback.strengths.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Weaknesses */}
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Weaknesses:</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {feedback.weaknesses.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Recommended Keywords */}
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Recommended Keywords:</h3>
                            <div className="flex flex-wrap gap-2">
                                {feedback.recommended_keywords.map((word, i) => (
                                    <span
                                        key={i}
                                        className="bg-indigo-50 text-indigo-700 text-sm px-3 py-1 rounded-full border border-indigo-100"
                                    >
                                        {word}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ResumeAnalyzer;
