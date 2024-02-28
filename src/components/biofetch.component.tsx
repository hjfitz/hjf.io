import React from 'react'

const Details = () => {
	return (
		<dl>
			harry@hjf.io
			<div aria-hidden="true">------------</div>
			<div>
				<dt>Uptime:</dt>
				<dd> 26 Years</dd>
			</div>
			<div>
				<dt>Languages:</dt>
				<dd> TypeScript, Go, Shell</dd>
			</div>
			<div>
				<dt>Frameworks:</dt>
				<dd> React, Redux, Svelte, Next, Express</dd>
			</div>
			<div>
				<dt>Currently:</dt>
				<dd> Lead Full Stack Developer</dd>
			</div>
			<div>
				<dt>Host:</dt>
				<dd> Great Britain</dd>
			</div>
			<div>
				<dt>Editor:</dt>
				<dd> Vim</dd>
			</div>
			<div>
				<dt>Hobbies:</dt>
				<dd> Code, Coffee, Cooking</dd>
			</div>
			<pre>{'\n'}</pre>
			contact
			<div aria-hidden="true">------------</div>
			<div>
				<dt>Mail:</dt>
				<dd> hjfitz@pm.me</dd>
			</div>
			<div>
				<dt>LinkedIn:</dt>
				<dd> /in/hjfitz</dd>
			</div>
		</dl>
	)
}

const Header = () => {
	return (
		<header>
			<pre>
				{`
harry@hjf.io:~/ 
> biofetch
			`}
			</pre>
		</header>
	)
}

const LogoLeft = () => {
	return (
		<pre aria-hidden="true">
			{`


██╗░░██╗░░░░░██╗███████╗  
██║░░██║░░░░░██║██╔════╝  
███████║░░░░░██║█████╗░░  
██╔══██║██╗░░██║██╔══╝░░  
██║░░██║╚█████╔╝██║░░░░░  
╚═╝░░╚═╝░╚════╝░╚═╝░░░░░  
		`}
		</pre>
	)
}

export const BioFetch = () => {
	return (
		<section className="font-mono text-sm">
			<Header />
			<div className="flex">
				<LogoLeft />
				<Details />
			</div>
		</section>
	)
}
