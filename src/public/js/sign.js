const form = document.querySelector(".form");
const elname = document.querySelector('.name')
const elpass = document.querySelector('.pass')
const elpic = document.querySelector('.pic')
const elemail = document.querySelector('.email')
const alertim = document.querySelector('.alert')

let type = false

showButton.addEventListener('click', () =>{
    type = !type;
    if(!type){
        elpass.setAttribute("type", "password")
    }
    if(type){
        elpass.setAttribute("type", "text")
    }
});


form.addEventListener("submit", evt => {
    const name = elname.value.trim();
    const pass = elpass.value.trim();
    const email = elemail.value.trim();
    const pic = elpic.value;

    if(!pic){
        alertim.classList.add("alert-danger");
        alertim.classList.remove("alert-info");
        alertim.textContent = "Profilingzi uchun rasm kiritishingiz shart!";
        evt.preventDefault();
        return;
    }

    if(name.length <3 || pass.length <5 || email.length < 6){
        alertim.classList.add("alert-danger");
        alertim.classList.remove("alert-info");
        alertim.textContent = "kiritilgan ma`lumotlarning lengthi kichik";
        evt.preventDefault();
        return;
    }
    if(!isNaN(name)){
        alertim.classList.add("alert-danger");
        alertim.classList.remove("alert-info");
        alertim.textContent = "name xato";
        evt.preventDefault();
        return;
    }
    alertim.classList.remove("alert-danger");
    alertim.classList.add("alert-info");
    alertim.textContent = "Muvaffaqiyatli ro'yhatga olindi!";
 });