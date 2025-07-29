export const load = async ({ params, fetch }) => {
    try {
        const jobId = params.jobId;
        console.log('Loading job with ID:', jobId);
        
        const response = await fetch("/api/jobs/get-job", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ JobId: jobId })
        });
        
        if (!response.ok) {
            console.error('API response not ok:', response.status, response.statusText);
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const jobData = await response.json();
        console.log('Job data received:', jobData);
        
        // Check if we got a successful response and jobs exist
        if (jobData.status === 200 && jobData.jobs && jobData.jobs.length > 0) {
            console.log('Returning job:', jobData.jobs[0]);
            return { job: jobData.jobs[0] };
        } else {
            console.error('Job not found or invalid response:', jobData);
            throw new Error(jobData.error || "Job not found");
        }
    } catch (error) {
        console.error('Error in load function:', error);
        throw error;
    }
};