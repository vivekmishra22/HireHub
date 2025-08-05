// In your API config file (constants.js or similar)
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const USER_API_END_POINT = isLocal 
  ? "http://localhost:8000/api/v1/user" 
  : "https://hirehub-d63h.onrender.com/api/v1/user";

export const JOB_API_END_POINT = isLocal
  ? "http://localhost:8000/api/v1/job"
  : "https://hirehub-d63h.onrender.com/api/v1/job";

export const APPLICATION_API_END_POINT = isLocal
? "http://localhost:8000/api/v1/application" 
: "https://hirehub-d63h.onrender.com/api/v1/application";

export const COMPANY_API_END_POINT = isLocal
? "http://localhost:8000/api/v1/company"
: "https://hirehub-d63h.onrender.com/api/v1/company";

// const BASE_URL = (() => {
//   const host = window.location.hostname;
//   return (host === 'localhost' || host === '127.0.0.1') 
//     ? 'http://localhost:8000' 
//     : 'https://hirehub-d63h.onrender.com';
// })();

// export const API_ENDPOINTS = {
//   USER: `${BASE_URL}/api/v1/user`,
//   JOB: `${BASE_URL}/api/v1/job`,
//   APPLICATION: `${BASE_URL}/api/v1/application`,
//   COMPANY: `${BASE_URL}/api/v1/company`
// };

// API base endpoint for user-related operations (e.g., login, signup, profile update)
// export const USER_API_END_POINT = "https://hirehub-d63h.onrender.com/api/v1/user";
// export const USER_API_END_POINT = "http://localhost:8000/api/v1/user";

// API base endpoint for job-related operations (e.g., post job, get jobs, update job)
// export const JOB_API_END_POINT = "https://hirehub-d63h.onrender.com/api/v1/job";
// export const JOB_API_END_POINT = "http://localhost:8000/api/v1/job";

// API base endpoint for application-related operations (e.g., apply to job, get applicants)
// export const APPLICATION_API_END_POINT = "https://hirehub-d63h.onrender.com/api/v1/application";
// export const APPLICATION_API_END_POINT = "http://localhost:8000/api/v1/application";

// API base endpoint for company-related operations (e.g., create company, manage details)
// export const COMPANY_API_END_POINT = "https://hirehub-d63h.onrender.com/api/v1/company";
// export const COMPANY_API_END_POINT = "http://localhost:8000/api/v1/company";

// export const USER_API_END_POINT = "https://hirehub-d63h.onrender.com/api/v1/user" || "https://hirehubcareers.netlify.app/api/v1/user";
// export const JOB_API_END_POINT = "https://hirehub-d63h.onrender.com/api/v1/job" || "https://hirehubcareers.netlify.app/api/v1/job";
// export const APPLICATION_API_END_POINT = "https://hirehub-d63h.onrender.com/api/v1/application" || "https://hirehubcareers.netlify.app/api/v1/application";
// export const COMPANY_API_END_POINT = "https://hirehub-d63h.onrender.com/api/v1/company" || "https://hirehubcareers.netlify.app/api/v1/company";