const express = require('express');
const cors = require('cors');
const net = require('net');
const { exec } = require('child_process');
const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

// Function to check if a port is in use
const checkPort = (port) => {
    return new Promise((resolve) => {
        const server = net.createServer()
            .once('error', () => resolve(true))
            .once('listening', () => {
                server.close();
                resolve(false);
            })
            .listen(port);
    });
};

// Function to get process information for a port
const getProcessInfo = async (port) => {
    return new Promise((resolve) => {
        // Different commands for different OS
        const cmd = process.platform === 'win32' 
            ? `netstat -ano | findstr :${port}`
            : `lsof -i :${port}`;

        exec(cmd, (error, stdout) => {
            if (error || !stdout) {
                resolve(null);
                return;
            }
            resolve(stdout.toString());
        });
    });
};

// Common localhost ports to check
const commonPorts = [
    { port: 3000, name: 'React Development' },
    { port: 8080, name: 'HTTP Alternative' },
    { port: 4200, name: 'Angular Development' },
    { port: 8000, name: 'Python/Django' },
    { port: 5000, name: 'Flask/Python' },
    { port: 1337, name: 'Node.js Alternative' },
    { port: 80, name: 'HTTP' },
    { port: 443, name: 'HTTPS' },
    { port: 3306, name: 'MySQL' },
    { port: 27017, name: 'MongoDB' },
    { port: 6379, name: 'Redis' },
    { port: 5432, name: 'PostgreSQL' },
];

// Endpoint to get running services
app.get('/api/services', async (_, res) => {
    try {
        const runningServices = [];

        for (const service of commonPorts) {
            const isInUse = await checkPort(service.port);
            if (isInUse) {
                const processInfo = await getProcessInfo(service.port);
                runningServices.push({
                    ...service,
                    processInfo: processInfo || 'Unknown process',
                    url: `http://localhost:${service.port}`
                });
            }
        }

        res.json(runningServices);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

app.listen(PORT, () => {
    console.log(`Localhost Dashboard backend running on port ${PORT}`);
});