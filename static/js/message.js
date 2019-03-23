$( document ).ready(function() {
    // init code after window finished loading to be absoloutly sure everything works fine
    $(window).on('load', function(){
    $('.sendMessage').on('click', function(){
        // we submit the notification form container and the list of fields we want to sbmit for the form
        emailSentFunc('.status', ['#name', '#email', '#phone', '#company','#subject', '#message']);
    });


    function emailSentFunc(infoContainer, inputFields){
        var postMessage = '';
        //Loop through all form fields and check if they are empty or not, can be expanded
        // for more sophisitacted authentication
        for (let field of inputFields) {
            if ($(field).val() == ''){
                $(infoContainer).html('Please Fill out all fields');
                return
            } 
        }

        for (let field of inputFields) {
            postMessage += field + ' ' + $(field).val() + '\n';  
        }
        $(infoContainer).append("<img src='https://fabio.design/dist/img/loading.gif' width=100 height=auto>").show('slow');

        // submit the form fields to php to get it sent out. The message Display is very simple but can be 
        // amended for what is desired.
        $.post( "https://gutterguardking.com.au/chris.php", { message: "New Message:\n" + postMessage }, function( data ) {
            if (data == 'Email Sent'){
                $(infoContainer).html(data).show('slow');
                        // Loop through all the fields and connect them to a message that needs to be submitted
                for (let field of inputFields) {
                    $(field).val('');
                }
            }    
        });
        return
    }
    });
});