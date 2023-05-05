const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const resultsIP = Object.create(null); // Or just '{}', an empty object
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!resultsIP[name]) {
                resultsIP[name] = [];
            }
            resultsIP[name].push(net.address);
        }
    }
}

const ipv4 = resultsIP['Wi-Fi'] ? resultsIP['Wi-Fi'][0] : resultsIP.Ethernet[0]

module.exports = ipv4