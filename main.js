document.body.addEventListener("click", (event) => {
	let target = event.target;

	if (
		target &&
		target.tagName == "BUTTON" &&
		target.hasAttribute("aria-pressed")
	) {
		if (target.getAttribute("aria-pressed") == "true") {
			target.setAttribute("aria-pressed", "false");
		} else {
			target.setAttribute("aria-pressed", "true");
			if (target.hasAttribute("scrollto")) {
				document
					.getElementById(target.getAttribute("scrollto"))
					.scrollIntoView();
			}
			if (target.hasAttribute("speak")) {
				let utterance = new SpeechSynthesisUtterance(
					target.getAttribute("speak")
				);
				speechSynthesis.speak(utterance);
			}
		}
	}

	if (!window.Android) {
		document.documentElement.requestFullscreen();
	}
});

document.getElementById("reset").addEventListener("click", () => {
	document.body
		.querySelectorAll('button[type="button"][aria-pressed="true"]')
		.forEach((element) => element.setAttribute("aria-pressed", false));
	document.body
		.querySelectorAll("textarea")
		.forEach((element) => (element.value = ""));
});

document.getElementById("scrollup").addEventListener("click", () => {
	window.scrollBy(0, -(window.innerHeight / 2));
});

document.getElementById("scrolldown").addEventListener("click", () => {
	window.scrollBy(0, window.innerHeight / 2);
});

let input = document.getElementById("input");

if (input) {
	document.getElementById("speak").addEventListener("click", () => {
		let utterance = new SpeechSynthesisUtterance(input.value);
		speechSynthesis.speak(utterance);
	});
}

let clock = document.getElementById("clock");

setInterval(() => {
	clock.innerText = new Date().toLocaleTimeString("en-US", {
		hour12: true,
		weekday: "long",
		month: "long",
		day: "numeric",
		//dayPeriod: "short",
		hour: "numeric",
		minute: "2-digit",
	});

	// https://help.android-kiosk.com/en/article/js-device-information-1yc4qmw/
	if (Android && !Android.isCharging()) {
		clock.innerText =
			Math.round(Android.getBatteryLevel()) +
			"% Battery; " +
			clock.innerText;
	}
}, 1000);

document.body.classList.remove("incomplete");
