/**
 * Message Management API Registrations
 */

import { BunMCP } from '@mcpweb-org/sdk';
import { z } from 'zod';
import { COMPLEX_ID, BASE_URL, getAuthToken } from '../config';

export function registerMessageAPIs(bunMCP: BunMCP): void {
    // Create new message
    bunMCP.registerAPI(
        "create-message",
        {
            title: "Create Message",
            description: "Create a new message in a ticket",
            inputSchema: {
                parentId: z.string().default(COMPLEX_ID).describe("Complex ID containing the ticket"),
                ticketId: z.string().describe("Ticket ID to add message to"),
                comment: z.string().describe("Message content"),
                userId: z.string().optional().describe("User ID of message author"),
                token: z.string().default(getAuthToken()).describe('Authentication token'),
            }
        },
        {
            uri: `${BASE_URL}/createMessage`,
            method: "POST",
            bodyParams: ["parentId", "ticketId", "comment", "userId", "type"],
            auth: {
                type: 'bearer',
            }
        }
    );
    console.log('✅ Create Message API registered');

    // Get all messages from a ticket
    bunMCP.registerAPI(
        "get-messages",
        {
            title: "Get Messages",
            description: "Fetch all messages from a specific ticket",
            inputSchema: {
                parentId: z.string().default(COMPLEX_ID).describe("Complex ID containing the ticket"),
                ticketId: z.string().describe("Ticket ID to fetch messages from"),
                token: z.string().default(getAuthToken()).describe('Authentication token'),
            }
        },
        {
            uri: `${BASE_URL}/getMessages`,
            method: "GET",
            queryParams: ["parentId", "ticketId"],
            auth: {
                type: 'bearer',
            }
        }
    );
    console.log('✅ Get Messages API registered');

    // Delete message
    bunMCP.registerAPI(
        "delete-message",
        {
            title: "Delete Message",
            description: "Delete a message from a ticket",
            inputSchema: {
                parentId: z.string().default(COMPLEX_ID).describe("Complex ID containing the ticket"),
                ticketId: z.string().describe("Ticket ID containing the message"),
                messageId: z.string().describe("Message ID to delete"),
                token: z.string().default(getAuthToken()).describe('Authentication token'),
            }
        },
        {
            uri: `${BASE_URL}/deleteMessage`,
            method: "DELETE",
            queryParams: ["parentId", "ticketId", "messageId"],
            auth: {
                type: 'bearer',
            }
        }
    );
    console.log('✅ Delete Message API registered');
}
