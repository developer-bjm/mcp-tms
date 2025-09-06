/**
 * Ticket Management API Registrations
 */

import { BunMCP } from '@mcpass/sdk';
import { z } from 'zod';
import { COMPLEX_ID, BASE_URL, getAuthToken } from '../config';

export function registerTicketAPIs(bunMCP: BunMCP): void {
    // Get Tickets API
    bunMCP.registerAPI(
        'get-tickets',
        {
            title: 'Get Tickets',
            description: 'Fetch all tickets for a complex with optional filtering and pagination',
            inputSchema: {
                parentId: z.string().default(COMPLEX_ID).describe('Complex ID to fetch tickets from'),
                limit: z.number().min(1).max(100).default(10).describe('Number of tickets to return'),
                status: z.enum(['open', 'inProgress', 'onHold', 'resolved', 'closed']).optional().describe('Filter by ticket status'),
                priority: z.enum(['low', 'medium', 'high']).optional().describe('Filter by ticket priority'),
                isArchive: z.boolean().optional().describe('Filter by archive status'),
                assetId: z.string().optional().describe('Filter by asset ID'),
                userId: z.string().optional().describe('Filter by user ID'),
                token: z.string().default(getAuthToken()).describe('Authentication token'),
            }
        },
        {
            uri: `${BASE_URL}/getTickets`,
            method: "GET",
            queryParams: ['parentId', 'limit', 'status', 'priority', 'isArchive', 'assetId', 'userId', 'lastDocumentId'],
            auth: {
                type: 'bearer',
            }
        }
    );
    console.log('✅ Get Tickets API registered');

    // Get specific ticket by ID
    bunMCP.registerAPI(
        "get-ticket-by-id",
        {
            title: "Get Ticket By ID",
            description: "Fetch a specific ticket by its ID",
            inputSchema: {
                parentId: z.string().default(COMPLEX_ID).describe("Complex ID containing the ticket"),
                ticketId: z.string().describe("Specific ticket ID to fetch"),
                token: z.string().default(getAuthToken()).describe('Authentication token'),
            }
        },
        {
            uri: `${BASE_URL}/getTicketById`,
            method: "GET",
            queryParams: ["parentId", "ticketId"],
            auth: {
                type: 'bearer',
            }
        }
    );
    console.log('✅ Get Ticket By ID API registered');

    // Create new ticket
    bunMCP.registerAPI(
        "create-ticket",
        {
            title: "Create Ticket",
            description: "Create a new ticket in Firestore",
            inputSchema: {
                parentId: z.string().default(COMPLEX_ID).describe("Complex ID to create ticket in"),
                title: z.string().describe("Ticket title"),
                description: z.string().describe("Ticket description"),
                status: z.enum(['open', 'inProgress', 'onHold', 'resolved', 'closed']).optional().describe('Ticket status'),
                priority: z.enum(['low', 'medium', 'high']).optional().describe('Ticket priority'),
                assetId: z.string().optional().describe("Associated asset ID"),
                userId: z.string().optional().describe("Assigned user ID"),
                token: z.string().default(getAuthToken()).describe('Authentication token'),
            }
        },
        {
            uri: `${BASE_URL}/createTicket`,
            method: "POST",
            bodyParams: ["parentId", "title", "description", "status", "priority",
                "assetId", "userId"],
            auth: {
                type: 'bearer',
            }
        }
    );
    console.log('✅ Create Ticket API registered');

    // Update existing ticket
    bunMCP.registerAPI(
        "update-ticket",
        {
            title: "Update Ticket",
            description: "Update an existing ticket in Firestore",
            inputSchema: {
                parentId: z.string().default(COMPLEX_ID).describe("Complex ID containing the ticket"),
                ticketId: z.string().describe("Ticket ID to update"),
                title: z.string().optional().describe("Updated ticket title"),
                description: z.string().optional().describe("Updated description"),
                status: z.enum(['open', 'inProgress', 'onHold', 'resolved', 'closed']).optional().describe('Ticket status'),
                priority: z.enum(['low', 'medium', 'high']).optional().describe('Ticket priority'),
                assetId: z.string().optional().describe("Updated asset ID"),
                userId: z.string().optional().describe("Updated assigned user ID"),
                token: z.string().default(getAuthToken()).describe('Authentication token'),
            }
        },
        {
            uri: `${BASE_URL}/updateTicket`,
            method: "PUT",
            bodyParams: ["parentId", "ticketId", "title", "description", "status",
                "priority", "assetId", "userId"],
            auth: {
                type: 'bearer',
            }
        }
    );
    console.log('✅ Update Ticket API registered');

    // Delete ticket
    bunMCP.registerAPI(
        "delete-ticket",
        {
            title: "Delete Ticket",
            description: "Delete a ticket from Firestore",
            inputSchema: {
                parentId: z.string().default(COMPLEX_ID).describe("Complex ID containing the ticket"),
                ticketId: z.string().describe("Ticket ID to delete"),
                token: z.string().default(getAuthToken()).describe('Authentication token'),
            }
        },
        {
            uri: `${BASE_URL}/deleteTicket`,
            method: "DELETE",
            queryParams: ["parentId", "ticketId"],
            auth: {
                type: 'bearer',
            }
        }
    );
    console.log('✅ Delete Ticket API registered');

    // Get ticket count
    bunMCP.registerAPI(
        "get-ticket-count",
        {
            title: "Get Ticket Count",
            description: "Get the count of tickets with optional filtering",
            inputSchema: {
                parentId: z.string().default(COMPLEX_ID).describe("Complex ID to count tickets from"),
                status: z.enum(['open', 'inProgress', 'onHold', 'resolved', 'closed']).optional().describe('Filter by ticket status'),
                isArchive: z.boolean().optional().describe("Filter by archive status"),
                token: z.string().default(getAuthToken()).describe('Authentication token'),
            }
        },
        {
            uri: `${BASE_URL}/getTicketCount`,
            method: "GET",
            queryParams: ["parentId", "status", "isArchive"],
            auth: {
                type: 'bearer',
            }
        }
    );
    console.log('✅ Get Ticket Count API registered');
}
