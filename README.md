#README

Simple jquery-plugin that expands and shrinks the size of a textarea as you type. The plugin also allows for a textarea to behave as a input, disabling line breaks, and using the enter-key to submit a form.

##Usage:
	
Adding autoexpand is as simple as adding `data-autoexpand` to your `textarea`:

	<textarea data-autoexpand></textarea>

	<!-- with options -->
	<textarea data-autoexpand data-autoexpand-options="min:100;max:200;actAsInput:true;"></textarea>

or, using javascript:

	$('#mytextarea').autoexpand();
	
	//with options
	$('#mytextarea').autoexpand({ min:100, max:200, actAsInput:true });	

###Caveats
For the resizing to work properly the textarea should have the css-rules:
	
	box-sizing: border-box;
	overflow: hidden;
	resize: none;

##Options *(defaults)*

	$('textarea[data-autoexpand]').autoexpand({
		resizeOnInit: false,	//Resize the textarea when the plugin inits
		actAsInput: false,		//The textarea acts a input-field disabling enter-key
		min: 0,					//Min height of the textarea. Disable by setting 0
		max: 0					//Max height of the textarea. Disable by setting 0
	});