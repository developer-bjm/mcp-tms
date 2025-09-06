import 'dotenv/config'
/**
 * Configuration constants for the MCPaaS server
 */

export const MCPAAS_API_KEY = process.env.MCPAAS_API_KEY || 'demo-api-key-12345';
export const MCPAAS_APP_ID = process.env.MCPAAS_APP_ID || 'demo-app-id-67890';
export const COMPLEX_ID = process.env.COMPLEX_ID || 'ex-id';

// Base URL for Firebase Functions
export const BASE_URL = process.env.BASE_URL || '';

// Authentication token for all API calls
let AUTH_TOKEN: string = "";
export function setAuthToken(token: string) {
    AUTH_TOKEN = token;
}

export function getAuthToken(): string {
    return AUTH_TOKEN;
}
