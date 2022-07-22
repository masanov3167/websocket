const form = document.querySelector(".form");
const elname = document.querySelector('.name')
const elpass = document.querySelector('.pass')
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

    if(name.length <3 || pass.length <5){
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
    alertim.textContent = "Forma muvaffaqiyatli to'ldirildi!";
 });

