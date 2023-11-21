window.addEventListener("load", () => {

    let form = document.querySelector(".form");
    form.user.focus();
    console.log('validación');

    form.addEventListener("submit", (submitEvent) => {
        let errors = [];
        console.log('validación dentro');
        let user = document.querySelector("#user");
        let email = document.querySelector("#email");
        let password = document.querySelector("#password");
        let passwordRepeat = document.querySelector("#passwordRepeat");

        let userError = document.querySelector("#userError");
        let emailError = document.querySelector("#emailError");
        let passwordError = document.querySelector("#passwordError");
        let passwordRepeatError = document.querySelector("#passwordRepeatError");
        
        // --------- user ------------
        if (user.value == "") {
            userError.innerHTML = "Debe ingresar un nombre de usuario";
            errors.push("El campo no puede estar vacío, debe ingresar usuario");
            user.classList.remove("is-valid");
            user.classList.add("is-invalid");
        } else if (user.value.length < 2) {
            userError.innerHTML = "El campo usuario debe tener al menos 2 caracteres";
            errors.push("El campo no puede estar vacío, el usuario debe tener mas de 2 caracteres");
            user.classList.remove("is-valid");
            user.classList.add("is-invalid");
        } else {
            userError.innerHTML = "";
            user.classList.add("is-valid");
            user.classList.remove("is-invalid");
            form.email.focus();
        };

        // --------- email ------------
        let regEmail = /\S+@\S+\.\S+/;
        if (!regEmail.test(email.value)) {
            emailError.innerHTML = "Debe ingresar un email válido";
            errors.push("El campo no puede estar vacío");
            email.classList.remove("is-valid");
            email.classList.add("is-invalid");
        } else {
            emailError.innerHTML = "";
            email.classList.remove("is-invalid");
            email.classList.add("is-valid");
            form.password.focus();
        };

        // --------- password ------------
        let regexp_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/;
        if (!regexp_password.test(password.value)){
            passwordError.innerHTML = "Debe ingresar una contraseña que deberá tener letras mayúsculas, minúsculas, un número y un carácter especial";
            errors.push("El campo no puede estar vacío");
            email.classList.add("is-invalid");
            email.classList.remove("is-valid");
        } else if (password.value.length < 8) {
            passwordError.innerHTML = "El campo contraseña debe tener al menos 8 caracteres";
            errors.push("El campo no puede estar vacío");
            email.classList.add("is-invalid");
            email.classList.remove("is-valid");
        } else if (password.value.length > 15) {
            passwordError.innerHTML = "El campo contraseña no debe tener mas de 15 caracteres";
            errors.push("El campo no puede estar vacío");
            email.classList.add("is-invalid");
            email.classList.remove("is-valid");
        }else
        {
            passwordError.innerHTML = "";
            password.classList.add("is-valid");
            password.classList.remove("is-invalid");
            form.passwordRepeat.focus();
        };

        // --------- password repeat ------------
        if (passwordRepeat.value == "") {
            passwordRepeatError.innerHTML = "Debe repetir su contraseña";
            errors.push("El campo no puede estar vacío");
            passwordRepeat.classList.remove("is-valid");
            passwordRepeat.classList.add("is-invalid");
        } else {
            passwordRepeatError.innerHTML = "";
            passwordRepeat.classList.add("is-valid");
            passwordRepeat.classList.remove("is-invalid");
        };
        console.log(errors);
        if (errors.length > 0) {
            /* El submitEvent de submit está declarado en la linea 6 */
            submitEvent.preventDefault();
            let ulErrors = document.querySelectorAll(".errores");
            ulErrors.innerHTML = "";
        } else {
            console.log('fin de validación');
            alert("La validación fue exitosa");
            form.submit();
        }
    });
})