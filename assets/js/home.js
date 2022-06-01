(function ($) {
    'use strict';

    const response	= document.getElementById("form-response"),
        btn_response = document.querySelector("#form-response button"),
        cargando = document.querySelector(".cargando");

    // Muestra el mensaje de agradecimiento.
    function formResponse() {
    	tl.to(response, 0.15, {autoAlpha: 1, ease: Expo.easeInOut});
        btn_response.focus();
    }

    // Oculta el mensaje de agradecimiento.
    function formResponseRevers(e) {
    	tl.to(response, 0.15, {autoAlpha: 0, ease: Expo.easeInOut});
        document.getElementById("nombre").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("escribenos").value = "";

        setTimeout(function(){
            window.scrollTo(0, 0);
        }, 500);
    }

    if (btn_response) {
        btn_response.addEventListener("click", formResponseRevers);
    }

    $(document).ready(function() {
        if ($("#contactanos")[0]){
            $.validator.setDefaults({
                submitHandler: function() {
                    formResponse();
                }
            });

            $("#contactanos").validate({
                rules: {
                    nombre: "required",
                    correo: {
                        required: true,
                        email: true
                    },
                    escribenos: "required"
                },
                messages: {
                    nombre: "Debe ingresar su nombre",
                    correo: {
                        required: "Debe ingresar un correo electrónico",
                        email: "Debe ser un correo electrónico válido"
                    },
                    escribenos: "Debe ingresar un mensaje"
                },
                focusWrongField: true,
                submitHandler: function(form,e) {
                    e.preventDefault();
                    $.ajax({
                        url:$("#contactanos").attr("action"),
                        type: "POST",             // Type of request to be send, called as method
                        data: new FormData(document.getElementById("contactanos")), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                        contentType: false,       // The content type used when sending data to the server.
                        cache: false,             // To unable request pages to be cached
                        processData: false,        // To send DOMDocument or non processed data file it is set to false
                        beforeSend: function() {
                            tl.to(cargando, 0.5, {autoAlpha: 1, ease: Expo.easeInOut});
                        },
                        success: function (data)   // A function to be called if request succeeds
                        {
                            formResponse();
                            tl.to(cargando, 0.5, {autoAlpha: 0, ease: Expo.easeInOut});
                        },
                        complete: function(){

                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                        }
                    });
                    return false;
                    //var formu = document.getElementById("form-registro");
                    //formu.submit();
                },
                invalidFormCallback: function (errors) {
                    console.log(errors);
                }
            });
        }

       
    })
}(jQuery));
