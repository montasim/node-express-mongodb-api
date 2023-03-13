import fs from 'fs';
import geoip from 'geoip-lite';
import useragent from 'useragent';

export default function logger(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const location = geoip.lookup(ip)?.country || 'Unknown';
  const browser = useragent.parse(req.headers['user-agent']).toString();
  const logData = {
    timestamp: new Date().toISOString(),
    ip: ip,
    location: location,
    browser: browser,
    method: req.method,
    url: req.url,
    status: res.statusCode,
    data: res.body || '',
  };
  const log = JSON.stringify(logData) + '\n';
  fs.appendFile('access.log', log, (err) => {
    if (err) console.error(err);
  });
  next();
}
