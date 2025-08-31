import React from 'react'

export default function BashSkill() {
    return (
        <pre className="text-sm">
            <dl>
                <dt className="block pt-2 text-gray-500 font-bold"># Core Technologies</dt>
                <dd className="block">
                    <dl className="block">
                        <dt>DISTRIBUTED_ARCHITECTURE=</dt>
                        <dd className="text-green-500">true</dd>
                    </dl>
                    <dl className="block">
                        <dt>GOLANG_VERSION=</dt>
                        <dd className="text-purple-500">"1.21+"</dd>
                    </dl>
                    <dl className="block">
                        <dt>NODE_ENV=</dt>
                        <dd className="text-purple-500">"production"</dd>
                    </dl>
                    <dl className="block">
                        <dt>BUN_RUNTIME=</dt>
                        <dd className="text-purple-500">"latest"</dd>
                    </dl>
                </dd>
                <dt className="block pt-2 text-gray-500 font-bold"># Frontend Stack</dt>
                <dd className="block">
                    <dl className="block">
                        <dt>NEXTJS_VERSION=</dt>
                        <dd className="text-purple-500">"14+"</dd>
                    </dl>
                    <dl className="block">
                        <dt>REACT_VERSION=</dt>
                        <dd className="text-purple-500">"18+"</dd>
                    </dl>
                    <dl className="block">
                        <dt>TAILWIND_CSS=</dt>
                        <dd className="text-green-500">true</dd>
                    </dl>
                </dd>
                <dt className="block pt-2 text-gray-500 font-bold"># DevOps & CI/CD</dt>
                <dd className="block">
                    <dl className="block">
                        <dt>DOCKER_ENABLED=</dt>
                        <dd className="text-green-500">true</dd>
                    </dl>
                    <dl className="block">
                        <dt>GITHUB_ACTIONS=</dt>
                        <dd className="text-green-500">true</dd>
                    </dl>
                    <dl className="block">
                        <dt>GITLAB_CI=</dt>
                        <dd className="text-green-500">true</dd>
                    </dl>
                </dd>
            </dl>
        </pre>
    )
}