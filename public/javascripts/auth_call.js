const exampleForm = document.getElementById("authform");

/**
 * We'll define the `handleFormSubmit()` event handler function in the next step.
 */
exampleForm.addEventListener("submit", handleFormSubmit);
/**
 * Event handler for a form submit event.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
 * 
 * @param {SubmitEvent} event
 */

async function handleFormSubmit(event) {
	/**
	 * This prevents the default behaviour of the browser submitting
	 * the form so that we can handle things instead.
	 */
	event.preventDefault();

	/**
	 * This gets the element which the event handler was attached to.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
	 */
	const form = event.currentTarget;

	/**
	 * This takes the API URL from the form's `action` attribute.
	 */
	const url = form.action;

	try {
		/**
		 * This takes all the fields in the form and makes their values
		 * available through a `FormData` instance.
		 * 
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/FormData
		 */
		const formData = new FormData(form);

		/**
		 * We'll define the `postFormDataAsJson()` function in the next step.
		 */
		const responseData = await postFormDataAsJson({ url, formData });

		/**
		 * Normally you'd want to do something with the response data,
		 * but for this example we'll just log it to the console.
		 */
		console.log({ responseData });
        $window.sessionStorage.accessToken = response.body.accessToken;

	} catch (error) {
		console.error(error);
	}
}
/**
 * Helper function for POSTing data as JSON with fetch.
 *
 * @param {Object} options
 * @param {string} options.url - URL to POST data to
 * @param {FormData} options.formData - `FormData` instance
 * @return {Object} - Response body from URL that was POSTed to
 */
async function postFormDataAsJson({ url, formData }) {
	/**
	 * We can't pass the `FormData` instance directly to `fetch`
	 * as that will cause it to automatically format the request
	 * body as "multipart" and set the `Content-Type` request header
	 * to `multipart/form-data`. We want to send the request body
	 * as JSON, so we're converting it to a plain object and then
	 * into a JSON string.
	 * 
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
	 */
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);

    const data = { email: "dummy", password: "dummy" };
	const fetchOptions = {
		/**
		 * The default method for a request with fetch is GET,
		 * so we must tell it to use the POST HTTP method.
		 */
		method: "POST",
	/**
		 * These headers will be added to the request and tell
		 * the API that the request body is JSON and that we can
		 * accept JSON responses.
		 */
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		/**
		 * The body of our POST request is the JSON string that
		 * we created above.
		 */
		body: formDataJsonString
	};

    console.info(formDataJsonString);
	const response = await fetch(url, fetchOptions);

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

    //this.props.history.push('');
	return response.json();
}
