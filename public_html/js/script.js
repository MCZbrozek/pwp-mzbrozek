$(document).ready(function (){
    $('#contact').validate({
        debug: true,
        errorClass: 'alert alert-danger',
        ErrorLabelContainer: '#output-area',
        errorElement: 'div',
    //
    //rules are for name attribute values
        rules: {
            name: {
                required: true
            },
            email: {
                email: true,
                required: true
            },
            // skipping subject
            message: {
                required: true,
                maxlength: 2000
            }
        },
        messages: {
            name: {
                required: 'Please add your name.'
            },
            email: {
                email: 'Please provide a valid email.',
                required: 'Must provide a return email'
            },
            message: {
                required: 'Cannot send email without a message.',
                maxlength: 'Message is too long, 2000 character max.'
            }
        },
        submitHandler: (form) => {
            console.log("is this thing on")
            $('#contact').ajaxSubmit({
                type: 'POST',
                url: $('#contact').attr('action'),
                success: (ajaxOutput) => {
                    $('#output-area').css('display', '')
                        $('#output-area').html(ajaxOutput)

                    if($('.alert-success') >= 1) {
                        $('#contact')[0].reset()
                    }

                }
            })
        }
    })
})