import { init } from "./api";

/**
 * An intent option for the select dropdown.
 */
interface IntentOption {
	/** The intent name value. */
	value: string;
	/** The display label. */
	label: string;
	/** The default context type for this intent. */
	defaultContextType: string;
	/** The default context body JSON. */
	defaultContextBody: string;
}

const INTENT_OPTIONS: IntentOption[] = [
	{
		value: "ViewContact",
		label: "View Contact",
		defaultContextType: "fdc3.contact",
		defaultContextBody: JSON.stringify(
			{
				type: "fdc3.contact",
				name: "Andy Young",
				id: { email: "andy.young@example.com" }
			},
			null,
			2
		)
	},
	{
		value: "ViewQuote",
		label: "View Quote",
		defaultContextType: "fdc3.instrument",
		defaultContextBody: JSON.stringify(
			{
				type: "fdc3.instrument",
				name: "Tesla Inc.",
				id: { ticker: "TSLA" }
			},
			null,
			2
		)
	}
];

window.addEventListener("DOMContentLoaded", async () => {
	await init(true);
	initializeDOM();
});

/**
 * Parses a JSON string and returns an error message if invalid.
 * @param json The JSON string to parse.
 * @returns An error message if the JSON is invalid, or an empty string if valid.
 */
function getJsonError(json: string): string {
	try {
		JSON.parse(json);
		return "";
	} catch (error) {
		return error instanceof Error ? error.message : "Invalid JSON";
	}
}

/**
 * Validates the form and updates the submit button and error display.
 */
function validateForm(): void {
	const contextBodyEl = document.querySelector<HTMLTextAreaElement>("#contextBody");
	const contextErrorEl = document.querySelector<HTMLDivElement>("#contextError");
	const raiseIntentBtn = document.querySelector<HTMLButtonElement>("#raiseIntent");

	if (contextBodyEl === null || contextErrorEl === null || raiseIntentBtn === null) {
		return;
	}

	const errorMessage = getJsonError(contextBodyEl.value);

	if (errorMessage) {
		contextErrorEl.textContent = errorMessage;
		contextErrorEl.style.display = "block";
		raiseIntentBtn.disabled = true;
	} else {
		contextErrorEl.textContent = "";
		contextErrorEl.style.display = "none";
		raiseIntentBtn.disabled = contextBodyEl.value.trim().length === 0;
	}
}

/**
 * Populates the intent select dropdown with the available options.
 */
function populateIntentOptions(): void {
	const intentNameEl = document.querySelector<HTMLSelectElement>("#intentName");
	if (intentNameEl === null) {
		return;
	}

	for (const option of INTENT_OPTIONS) {
		const optionEl = document.createElement("option");
		optionEl.value = option.value;
		optionEl.textContent = option.label;
		intentNameEl.append(optionEl);
	}
}

/**
 * Applies the defaults for the currently selected intent option.
 */
function applyIntentDefaults(): void {
	const intentNameEl = document.querySelector<HTMLSelectElement>("#intentName");
	const contextTypeEl = document.querySelector<HTMLInputElement>("#contextType");
	const contextBodyEl = document.querySelector<HTMLTextAreaElement>("#contextBody");

	if (intentNameEl === null || contextTypeEl === null || contextBodyEl === null) {
		return;
	}

	const selected = INTENT_OPTIONS.find((opt) => opt.value === intentNameEl.value);
	if (selected) {
		contextTypeEl.value = selected.defaultContextType;
		contextTypeEl.placeholder = selected.defaultContextType;
		contextBodyEl.value = selected.defaultContextBody;
	}

	validateForm();
}

/**
 * Raises an intent using the FDC3 API with the current form values.
 */
async function raiseIntent(): Promise<void> {
	const intentNameEl = document.querySelector<HTMLSelectElement>("#intentName");
	const contextBodyEl = document.querySelector<HTMLTextAreaElement>("#contextBody");

	if (intentNameEl === null || contextBodyEl === null) {
		return;
	}

	const intent = intentNameEl.value;
	const context: unknown = JSON.parse(contextBodyEl.value);

	if (window.fdc3 !== undefined) {
		try {
			const intentResolver = await window.fdc3.raiseIntent(intent, context as { type: string });
			console.log("Intent resolver received:", intentResolver);
		} catch (error) {
			console.error("Error raising intent:", error);
		}
	} else {
		console.warn("FDC3 is not available.");
	}
}

/**
 * Initialize the DOM elements and event listeners.
 */
function initializeDOM(): void {
	populateIntentOptions();
	applyIntentDefaults();

	const intentNameEl = document.querySelector<HTMLSelectElement>("#intentName");
	const contextBodyEl = document.querySelector<HTMLTextAreaElement>("#contextBody");
	const raiseIntentBtn = document.querySelector<HTMLButtonElement>("#raiseIntent");

	if (intentNameEl !== null) {
		intentNameEl.addEventListener("change", () => {
			applyIntentDefaults();
		});
	}

	if (contextBodyEl !== null) {
		contextBodyEl.addEventListener("input", () => {
			validateForm();
		});
	}

	if (raiseIntentBtn !== null) {
		raiseIntentBtn.addEventListener("click", async () => {
			await raiseIntent();
		});
	}
}
