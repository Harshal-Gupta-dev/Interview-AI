import { useContext, useEffect } from "react";
import { interviewContext } from "../interview.context";
import { generateInterviewReport, getAllInterviewReport, getInterviewReportbyId,generateResumePdf } from "../services/interview.api"


export const useInterview = () => {
    const context = useContext(interviewContext)

    if (!context) {
        throw new Error("useInterview must be used inside an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null;
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })

            
            if (response) {
                const serverData = response.data || response;
                const finalReport = serverData.interviewReport || serverData;
                setReport(finalReport);
            }
        } catch (err) {
            console.log("Submission pipeline error:", err)
        } finally {
            setLoading(false)
        }
        return response ? (response.interviewReport || response.data?.interviewReport || response) : null;
    }


    const getReportbyId = async (interviewId) => {
        setLoading(true);
        let response = null;
        try {
            response = await getInterviewReportbyId(interviewId);
            if (response) {
                // Check if it's an Axios wrapper, a nested key, or direct data
                const cleanData = response.data || response;
                const finalReport = cleanData.interviewReport || cleanData;
                setReport(finalReport);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
        return response;
    };


    const getAllReport = async () => {
        setLoading(true);
        

        let response = null;
        try {
            response = await getAllInterviewReport();

            if (response) {
                // Unpeel the Axios network packet wrapper layer if present
                const cleanData = response.data || response;
                const finalReportsArray = cleanData.interviewReport || cleanData;
                

                if (Array.isArray(finalReportsArray)) {
                    setReports(finalReportsArray);
                }
            }
        } catch (error) {
            console.error(error);
            
        } finally {
            setLoading(false);
        }
        return response;
    };


    const getResumePdf = async(interviewReportId) => {
        setLoading(true)
        let response = null
        try{
           response= await generateResumePdf(interviewReportId)
           const url = window.URL.createObjectURL(new Blob([response],{type:"application/pdf"}))
           const link = document.createElement("a")
           link.href=url
           link.setAttribute("download",`resume_${interviewReportId}.pdf`)
           document.body.appendChild(link)
           link.click()
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }
    

    // 🟢 ALL state items are now cleanly returned to your UI components!
    return {
        loading,
        report,
        reports,
        setLoading,
        setReport,
        setReports,
        generateReport,
        getReportbyId,
        getAllReport,
        getResumePdf
    }
}