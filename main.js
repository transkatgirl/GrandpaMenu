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
		}
	}
});

let reset = document.getElementById("reset");

reset.addEventListener("click", () => {
	document.body
		.querySelectorAll('button[type="button"][aria-pressed="true"]')
		.forEach((element) => element.setAttribute("aria-pressed", false));
	document.body
		.querySelectorAll("textarea")
		.forEach((element) => (element.value = ""));
});

let clock = document.getElementById("clock");

if (clock) {
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

		if (Android && !Android.isCharging()) {
			clock.innerText =
				Android.getBatteryLevel() + "% Battery; " + clock.innerText;
		}
	}, 1000);
}
