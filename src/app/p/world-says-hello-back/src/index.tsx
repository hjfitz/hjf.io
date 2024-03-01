import React, { useEffect, useRef, useState } from "react";
import type Peer from "peerjs";
import { render } from "react-dom";

// largely broken
import "./style.css";

const randID = () => Math.random().toString(36).substr(2, 10);

// largely broken
/*
function useSpeech() {
	const [result, setResult] = useState('')
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
	const rec = new SpeechRecognition()
	rec.continuous = true

	rec.lang = 'en-US'
	rec.interimResults = true
	// bind the result handler for parsing the results

	// add a handler for results

	// hack to make sure it's continuous in firefox??
	rec.addEventListener('end', () => rec.start())
	rec.start()

	rec.addEventListener("result", ev => {
		setResult(res => [...res, ev])
	})
	return result
}
 */

function copyID(ev: React.MouseEvent<HTMLSpanElement>) {
	const rng = document.createRange();
	rng.selectNode(ev.currentTarget);
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(rng);
	document.execCommand("copy");
	window.getSelection().removeAllRanges();
}

function useChat(peer: Peer) {
	const [messages, setMessages] = useState([]);
	peer.on("connection", (conn) => {
		conn.on("open", () =>
			conn.on("data", (data) => {
				const msg = JSON.parse(data);
				if (msg.type !== "chat") return;
				setMessages((msgs) => {
					const tail = msgs[msgs.length - 1];
					if (tail && tail.id === `t-${msg.id}`) return msgs;
					return [...msgs, { id: `t-${msg.id}`, from: "them", text: msg.text }];
				});
			})
		);
	});
	return { messages, setMessages };
}

const ChatApp = () => {
	if (typeof window === "undefined") return "";
	const Peer = require("peerjs").default;
	const idInit = randID();
	const id = useRef(idInit);
	const peer = useRef<Peer>(new Peer(idInit));

	const [stream, setStream] = useState<MediaStream>(null);
	const [muted, setMuted] = useState<boolean>(false);
	const [partner, setPartner] = useState<Peer.DataConnection>(null);
	const [showChat, setChat] = useState<boolean>(false);
	const [sharing, setSharing] = useState<boolean>(false);

	const them = useRef(null);
	const idIn = useRef(null);
	const video = useRef(null);
	const theirScreen = useRef(null);

	const { messages, setMessages } = useChat(peer.current);

	const toggleChat = () => setChat((cur) => !cur);

	function sendMessage(ev: React.KeyboardEvent<HTMLInputElement>) {
		if (ev.key !== "Enter") return;
		const id = randID();
		// @todo: cleanup
		partner.send(
			JSON.stringify({ id, type: "chat", text: ev.currentTarget.value.trim() })
		);
		setMessages((msgs) => [
			...msgs,
			{ id: `m-${id}`, from: "me", text: ev.currentTarget.value.trim() },
		]);
		setTimeout(() => (ev.currentTarget.value = ""), 10);
	}

	async function share() {
		const capture = await navigator.mediaDevices.getDisplayMedia({
			video: true,
			audio: false,
		});
		peer.current.call(idIn.current.value, capture);
	}

	function call() {
		const dial = peer.current.call(idIn.current.value, stream);
		dial.on("stream", (remote) => {
			them.current.srcObject = remote;
			them.current.play();
			const conn = peer.current.connect(idIn.current.value);
			conn.on("open", () => setPartner(conn));
		});
	}

	const tryCall = ({ key }) => key === "Enter" && call();

	async function mute() {
		setMuted((state) => {
			// set enabled to what we're inverting to
			stream.getAudioTracks().forEach((track) => (track.enabled = state));
			return !state;
		});
	}

	useEffect(() => {
		if (!stream) {
			navigator.mediaDevices
				.getUserMedia({ audio: true, video: true })
				.then((s) => setStream(s));
		} else {
			video.current.srcObject = stream;
			video.current.play();
			peer.current.on("call", (dial) => {
				idIn.current.value = dial.peer;
				dial.answer(stream);
				dial.on("stream", (remote) => {
					// make sure we're not already streaming
					// prevents us playing the webcam doubly in the screen share box
					if (!them.current.paused && them.current.dataset.id === remote.id)
						return;

					// if 'them' (cam) is paused, play their cam there
					if (them.current.paused) {
						them.current.dataset.id = remote.id;
						them.current.srcObject = remote;
						them.current.play();

						// else, we've called, so we must want to share screens
					} else {
						theirScreen.current.srcObject = remote;
						theirScreen.current.play();
						setSharing(true);
					}

					const conn = peer.current.connect(dial.peer);
					conn.on("open", () => setPartner(conn));
				});
			});
			return () => stream.getTracks().forEach((track) => track.stop());
		}
	}, [stream]);

	return (
		<main className="pt-3">
			<div>
				<div className="h-12">
					<span className="px-4 py-2 text-sm whitespace-no-wrap bg-gray-300 border-2 border-r-0 rounded-l">
						Your ID:
					</span>
					<span
						className="px-4 py-2 text-sm bg-white border-2 rounded-r cursor-pointer"
						onClick={copyID}
					>
						{id.current}
					</span>
				</div>

				<div className="flex">
					<span className="px-4 py-2 text-sm whitespace-no-wrap bg-gray-300 border-2 border-r-0 rounded-l">
						Partner ID:
					</span>
					<input
						ref={idIn}
						onKeyUp={tryCall}
						name="field_name"
						className="px-4 py-2 border-2 rounded-r"
						type="text"
						placeholder="Enter your partner's ID"
					/>
				</div>
			</div>

			<div className="my-4 grid grid-cols-10 grid-rows-2 gap-8">
				<section className="bg-white shadow col-span-5">
					<video muted ref={video} className="us" />
					<div className="flex flex-wrap justify-between px-4 py-2 sm:flex-nowrap">
						<button type="button" onClick={mute}>
							Mute (muted: {muted.toString()})
						</button>
						<button type="button" onClick={share}>
							Share screen
						</button>
					</div>
				</section>

				<section className="bg-white shadow col-span-5">
					<h2 className="py-2 text-center">Your Partner</h2>
					<video ref={them} />
				</section>

				<section className="col-span-10">
					<video ref={theirScreen} />
				</section>
			</div>
		</main>
	);
};

export default ChatApp;
