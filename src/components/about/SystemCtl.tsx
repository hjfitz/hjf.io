import React from 'react'

const SystemCtl = () => (
    <pre className="text-sm">
    <span className="block">● skills.service - Harry's Technical Skills</span>
    <span className="block">{`  Loaded: loaded (/etc/systemd/skills.service; enabled)`}</span>
    <span className="block">{`  `}<span className="text-green-500">Active: active (running)</span> since 2020-12-02 19:00:00 UTC</span>
    <span className="block">{`Main PID: 1337 (skills)`}</span>
    <span className="block">{`   Tasks: 5 (limit: 4915)`}</span>
    <span className="block">{`  Memory: 42.0M`}</span>
    <span className="block">{`  CGroup: /system.slice/skills.service`}</span>
    <span className="block">{`          ├─1337 /usr/bin/distributed-architecture`}</span>
    <span className="block">{`          ├─1338 /usr/bin/golang`}</span>
    <span className="block">{`          ├─1339 /usr/bin/nodejs-bun`}</span>
    <span className="block">{`          ├─1340 /usr/bin/nextjs-react`}</span>
    <span className="block">{`          └─1341 /usr/bin/docker-cicd`}</span>
</pre>
)

export default SystemCtl