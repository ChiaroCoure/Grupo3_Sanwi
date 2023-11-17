window.addEventListener("load", () => {

    let form = document.querySelector(".form");
    form.user.focus();

    form.addEventListener("submit", (submitEvent) => {
        let errors = [];
        let user = document.querySelector("#username");
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
            errors.push("El campo no puede estar vacío");
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
            email.classList.add("is-invalid");
            email.classList.remove("is-valid");
        } else {
            emailError.innerHTML = "";
            email.classList.add("is-valid");
            email.classList.remove("is-invalid");
            form.password.focus();
        };

        // --------- password ------------
        if (password.value == "") {
            passwordError.innerHTML = "Debe ingresar una contraseña";
            errors.push("El campo no puede estar vacío");
            password.classList.remove("is-valid");
            password.classList.add("is-invalid");
        } else if (password.value.length < 5) {
            passwordError.innerHTML = "El campo contraseña debe tener al menos 5 caracteres";
            errors.push("El campo no puede estar vacío");
            password.classList.remove("is-valid");
            password.classList.add("is-invalid");
        } else if (password.value.length > 8) {
            passwordError.innerHTML = "El campo contraseña no debe tener mas de 8 caracteres";
            errors.push("El campo no puede estar vacío");
            password.classList.remove("is-valid");
            password.classList.add("is-invalid");
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
        console.log(errors)
        if (errors.length > 0) {
            /* El submitEvent de submit está declarado en la linea 6 */
            submitEvent.preventDefault();
            let ulErrors = document.querySelector(".errores");
            ulErrors.classList.add("alert-warning");
            ulErrors.innerHTML = "";
        } else {
            //alert("La validación fue exitosa")
            form.submit();
        }
    });
})