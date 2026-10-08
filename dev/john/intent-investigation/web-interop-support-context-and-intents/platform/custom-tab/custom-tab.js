const url = document.querySelector('#url');
const actionBtn = document.querySelector('#actionBtn');
const previewBtn = document.querySelector('#previewBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const previewContainer = document.querySelector('#preview');
const previewFrame = document.querySelector('#preview-iframe');
const urlContainer = document.querySelector('#url-container');

/**
 * Is the query text a url.
 * @param value The value to test.
 * @returns True if the input is a url.
 */
function isValueAUrl(value) {
	return /^https?:\/\//.test(value);
}

/**
 * Switch the label based on the content.
 * @param e The event to get the value from.
 */
function validateValue(e) {
	setPreviewEnabledState(e.target.value);
}

/**
 * Sets whether the preview button is enabled.
 * @param urlToValidate The url to validate.
 */
function setPreviewEnabledState(urlToValidate) {
	if (isValueAUrl(urlToValidate)) {
		previewBtn.disabled = false;
	} else {
		previewBtn.disabled = true;
	}
}

/**
 * Open the query or search.
 */
async function actionQuery() {
	const targetUrl = url.value;
	if (isValueAUrl(targetUrl)) {
		location.href = url.value;
	}
}

/**
 * Init the content.
 */
async function init() {
	url.addEventListener('input', validateValue);
	url.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			actionQuery();
		}
	});
	actionBtn.addEventListener('click', actionQuery);
	previewBtn.addEventListener('click', async () => {
		urlContainer.style.display = 'none';
		previewContainer.style.display = 'block';
		previewFrame.src = url.value;
		cancelBtn.style.display = 'block';
		previewBtn.style.display = 'none';
		actionBtn.style.display = 'block';
	});
	cancelBtn.addEventListener('click', () => {
		urlContainer.style.display = 'block';
		previewContainer.style.display = 'none';
		previewFrame.src = 'about:blank';
		cancelBtn.style.display = 'none';
		previewBtn.style.display = 'block';
		actionBtn.style.display = 'none';
		url.focus();
	});
	setTimeout(() => {
		setPreviewEnabledState(url.value);
	}, 500);
}

document.addEventListener('DOMContentLoaded', () => {
	try {
		init();
	} catch (error) {
		console.error(error);
	}
});
