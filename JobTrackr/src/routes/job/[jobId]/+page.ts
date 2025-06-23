export const load = async ({ params, fetch }) => {
    const jobId = params.jobId;
    const job = await fetch("/api/jobs/get-job", {
        method: "POST",
        body: JSON.stringify({ JobId: jobId })
    });
    const jobData = await job.json();
    console.log(jobData);
    /* const job = {
        id: jobId,
        company_name: "Google",
        role_title: "Frontend Developer", 
        application_date: "2025-06-12",
        description: "Fine Description",
        location: "Oslo, Norway",
        status: "Applied",
        notes: "Kjempe fin",
        timeline: {
            steps: [
                { date: "2025-05-22", event: "Applied" },
                { date: "2025-05-24", event: "Interview" },
                { date: "2025-05-28", event: "Offer" }
            ]
        },
        job_link: "https://google.com"
    }; */
    
    // Check if we got a successful response and jobs exist
    if (jobData.status === 200 && jobData.jobs && jobData.jobs.length > 0) {
        return { job: jobData.jobs[0] };
    } else {
        // Handle error case - return null or throw error
        throw new Error(jobData.error || "Job not found");
    }
};