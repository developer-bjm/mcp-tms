#!/usr/bin/env bun
/**
 * MCPaaS BunExpress HTTP Server
 *
 * High-performance HTTP server using BunExpress and MCPaaS integration.
 * - Express.js-like API with Bun performance
 * - MCPaaS platform integration
 * - Streamable HTTP transport for MCP protocol
 * - Simple REST route definitions
 * - Built-in middleware, CORS, JSON parsing
 * - Health check and status endpoints
 * - Graceful server start/stop
 *
 * Usage:
 *   npx ts-node src/app.ts
 *
 * Environment Variables:
 *   MCPAAS_API_KEY - MCPaaS API key
 *   MCPAAS_APP_ID  - MCPaaS application ID
 *   PORT           - Server port (default: 3000)
 */

import { BunMCP, BunExpress } from '@mcpweb-org/sdk';
import { MCPAAS_API_KEY, MCPAAS_APP_ID } from './config';
import { registerTicketAPIs } from './tools/tickets';
import { registerMessageAPIs } from './tools/messages';

/**
 * Initialize and configure MCPaaS server
 * Registers ticket and message APIs
 */
function setupMCPaaSServer(): BunMCP {
    console.log('🔧 Setting up MCPaaS server...');
    try {
        const bunMCP = new BunMCP(
            {
                name: "mcpaas-streamable-server",
                description: "MCPaaS example server with StreamableHTTPServerTransport",
                version: "1.0.0",
                capabilities: {
                    tools: true,
                    resources: true,
                    prompts: true,
                },
            },
            MCPAAS_APP_ID,
            MCPAAS_API_KEY
        );
        console.log('✅ BunMCP instance created');
        registerTicketAPIs(bunMCP);
        registerMessageAPIs(bunMCP);
        const stats = bunMCP.getStats();
        console.log(`✅ MCPaaS server: ${stats.toolsCount} tools, ${stats.resourcesCount} resources, ${stats.promptsCount} prompts`);
        return bunMCP;
    } catch (error) {
        console.error('❌ MCPaaS server setup error:', error);
        throw error;
    }
}

/** 
 * Create BunExpress server with MCPaaS integration
 */
const server = new BunExpress({
    bunMCP: setupMCPaaSServer(),
    options: {
        port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
        host: 'localhost',
        cors: true,
        json: true
    }
});

/**
 * Example middleware for API request logging
 */
server.use('/api', (req: any, res: any, next: any) => {
    console.log(`API Request: ${req.method} ${req.path}`);
    next();
});

/**
 * Start BunExpress server and show available endpoints
 */
async function startServer() {
    try {
        await server.start();
        console.log('🚀 Server started!');
        console.log('📊 Server status:', server.health());
        console.log('🔗 Endpoints:');
        console.log('  - GET  /health');
        console.log('  - GET  /status');
        console.log('  - POST /api/hello');
        console.log('  - GET  /api/users');
        console.log('  - PUT  /api/users/:id');
        console.log('  - DELETE /api/users/:id');
        console.log('  - MCP protocol endpoints');
    } catch (error) {
        console.error('❌ Server start error:', error);
        process.exit(1);
    }
}

/**
 * Graceful server shutdown
 */
async function stopServer() {
    try {
        await server.stop();
        console.log('🛑 Server stopped!');
    } catch (error) {
        console.error('❌ Server stop error:', error);
    }
}

/**
 * Handle process signals for graceful shutdown
 */
process.on('SIGINT', async () => {
    console.log('\n🔄 SIGINT received, shutting down...');
    await stopServer();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🔄 SIGTERM received, shutting down...');
    await stopServer();
    process.exit(0);
});

/**
 * Entry point: Start the server
 */
console.log('🔧 Starting MCPaaS BunExpress Server...');
startServer();
