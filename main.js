const input_nombre = document.querySelector("#input_nombre_nota");
const input_texto = document.querySelector("#input_texto_nota");
const btn_guardar = document.querySelector("#btn_guardar");
const container_cards = document.querySelector("#container_cards")
const form_notas = document.querySelector("#form_notas")

array_notas = []

function crear_nota(nombre, texto,) {
  let fecha = new Date();
  return nota = {
    fecha: fecha.getDate()+ "/" +`${fecha.getMonth()+1}`+"/"+ fecha.getFullYear(),
    nombre: nombre,
    texto: texto,
    
  }
}

btn_guardar.addEventListener("click", (e) => {
  e.preventDefault
  nombre = input_nombre.value;
  texto = input_texto.value;
  
  array_notas.push(crear_nota(nombre, texto))

  setDB()
  form_notas.reset()
  draw();



})






function setDB() {

  localStorage.setItem("notas", JSON.stringify(array_notas))
}
function getDB() {
  if (localStorage.getItem("notas") != null) { 
    array_notas = JSON.parse(localStorage.getItem("notas"))
    draw()
    if (localStorage.getItem("notas") =="[]" || localStorage.getItem("notas")=="") {
      draw_vacio()
    }
  }
}

function draw_vacio(){
  let img=document.createElement("img")
  img.src="caja-vacia(5).png"
  let div=document.createElement("div")
  div.classList.add("text-center","mt-5")
  
  div.append(img)
  container_cards.append(div)
}
function draw() {
  container_cards.innerHTML = null;
  array_notas.forEach((element, indice) => {
   
    let col = document.createElement("div")
    col.classList.add("col-12", "col-sm-6", "col-md-4",);
    col.innerHTML = `
        <div class="card my-1 border border-warning shadow p-3 mb-5 bg-body-tertiary rounded "  >
        <div class="text-center fs-4  border-bottom border-warning-subtle ">
          ${capitalizeFirstLetter(element.nombre)}
        </div>

        <p class="card-text text mx-1 fw-light   ">${element.texto.substring(0,25)+"..."}</p>
        
        <div class="text-center">
        <button class="btn-borrar btn btn-outline-danger btn-sm" actividadID="${indice}" onclick="remove(event)">&#215;</button>
        <button type="button" class="btn btn-outline-warning btn-sm" actividadID="${indice}" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="abrir_modal(event)">
        Abrir
        </button>

      
        </div>
        </div>
  

        </div>

       </div>
        `
        
    container_cards.append(col)
  })

}

function abrir_modal(e){
let button=e.target;
let actividadID=button.getAttribute("actividadID");
let boton_cerrar=document.querySelector("#cerrar")
let boton_guardar=document.querySelector("#Guardar")
let objeto=array_notas[actividadID];
const foter=document.querySelector(".fecha_div")
let titulo_modal=document.querySelector(".modal-title")
titulo_modal.textContent=capitalizeFirstLetter(objeto.nombre)


texto_modal=document.querySelector(".modal-body");
texto_modal.textContent=objeto.texto;
texto_modal.contentEditable=true
p=document.createElement("p");
p.innerText=objeto.fecha
foter.innerHTML=null
foter.append(p);


boton_guardar.addEventListener("click",()=>{
  objeto.texto=texto_modal.textContent;
  

})
boton_cerrar.addEventListener("click",()=>{
  setDB();
  draw();
})
}

function remove(e) {
  let button=e.target;
  let indiceActividad=button.getAttribute("actividadID");
 array_notas.splice(indiceActividad,1);
  draw();
  setDB()
  
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
getDB()
setDB()


