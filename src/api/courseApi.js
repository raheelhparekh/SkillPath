const COUNTRY_API_URL = "https://syncsphere-hiv6.onrender.com/assignment/country-code";
const COURSES_API_URL = "https://syncsphere-hiv6.onrender.com/assignment/course-data";

/**
 * Helper to fetch API requests with a single automatic retry policy.
 * @param {string} url 
 * @param {number} retries 
 * @returns {Promise<any>}
 */
async function fetchWithRetry(url, retries = 1) {
  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      throw new Error(`HTTP status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    if (retries > 0) {
      // Wait 1 second before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchWithRetry(url, retries - 1);
    }
    throw err;
  }
}

/**
 * Fetch detected user country code (isolated to allow fallback on failure).
 * @returns {Promise<string>} Country code ('IN', 'US', etc.)
 */
export async function fetchCountryCode() {
  const data = await fetchWithRetry(COUNTRY_API_URL, 1);
  if (data && (data.country_code === "IN" || data.country_code === "US")) {
    return data.country_code;
  }
  throw new Error("Invalid or unsupported country code response");
}

/**
 * Fetch course catalog list.
 * @returns {Promise<Array>} Array of course objects.
 */
export async function fetchCourses() {
  const data = await fetchWithRetry(COURSES_API_URL, 1);
  if (!Array.isArray(data)) {
    throw new Error("Data format invalid: Expected an array of courses.");
  }
  return data;
}
