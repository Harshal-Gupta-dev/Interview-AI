// import axios from "axios"

// export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
//     const formData = new FormData();
//     formData.append("jobDescription", jobDescription);
//     formData.append("selfDescription", selfDescription);
//     formData.append("resume", resumeFile);


//     const response = await axios.post("http://localhost:3000/api/interview/", formData, {
//         withCredentials: true
//     });

//     return response.data;
// };


// export const getInterviewReportbyId = async (interviewId) => {

//     const response = await axios.get(`http://localhost:3000/api/interview/report/${interviewId}`, {
//         withCredentials: true
//     })
//     return response.data
// }

// export const getAllInterviewReport = async () => {
//     const response = await axios.get("http://localhost:3000/api/interview/", {
//         withCredentials: true
//     })
//     return response.data
// }


// export const generateResumePdf = async (interviewReportId) => {
//     const response = await axios.post(`http://localhost:3000/api/interview/resume/pdf/${interviewReportId}`, null, {
//         responseType: "blob",
//         withCredentials: true,
      
//     })
//     return response.data
// }


import axios from "axios";

// Define the live production Render URL
const BASE_URL = "https://interview-ai-xb7p.onrender.com";

export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    const response = await axios.post(`${BASE_URL}/api/interview/`, formData, {
        withCredentials: true
    });

    return response.data;
};

export const getInterviewReportbyId = async (interviewId) => {
    const response = await axios.get(`${BASE_URL}/api/interview/report/${interviewId}`, {
        withCredentials: true
    });
    return response.data;
};

export const getAllInterviewReport = async () => {
    const response = await axios.get(`${BASE_URL}/api/interview/`, {
        withCredentials: true
    });
    return response.data;
};

export const generateResumePdf = async (interviewReportId) => {
    const response = await axios.post(`${BASE_URL}/api/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob",
        withCredentials: true,
    });
    return response.data;
};
