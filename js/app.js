//* Constructor de cada objeto coche

function Car(id) {
  this.id = id;
  this.position = 0;

  //Resetea la posición del coche
  this.reset = () => {
    this.position = 0;
    $(`#car${id}`).animate({ "margin-left": `${this.position}%` }, 500);
    return this.position;
  };

  //Actualiza la posición del coche y muestra la animación
  this.move = (move) => {
    this.position += move;
    if (this.position > 93.75) this.position = 93.75;
    $(`#car${id}`).animate({ "margin-left": `${this.position}%` }, 500);
    return this.position;
  };
}

//* Rellenamos el array de objetos-coche
const createCars = (numberOfCars) => {
  for (let i = 0; i < numberOfCars; ++i) {
    cars[i] = new Car(i + 1);
  }
};

//* Inicia la carrera y realiza movimientos para cada
//* coche hasta que alguno llega a la línea de meta.
const beginRace = (cars, finishAt) => {
  let index = 0;
  let newPosition;
  while (cars[index].position < finishAt) {
    for (let i = 0; i < cars.length; ++i) {
      const randomMove = Math.floor(Math.random() * 10 + 1);
      newPosition = cars[i].move(randomMove);
      index = newPosition < finishAt ? index : i;
    }
  }
};

//* Devuelve todos los coches a la posición inicial y
//* vacía el array de objetos-coche.
const resetCars = (cars) => {
  cars.forEach((car) => {
    car.reset();
  });
  while (cars.length > 0) {
    cars.pop();
  }
};

//* Copia el array de coches y lo ordena para obtener los resultados.
//* Devuelve el nuevo array ordenado.
const getRaceResult = (cars) => {
  carsPositions = [...cars];
  carsPositions.sort((carA, carB) => carB.position - carA.position);
  return carsPositions;
};

//* Crea una lista con los resultados de la carrera.
const createWinnerTable = (cars) => {
  const root = document.getElementById("root");
  const title = document.createElement("h2");
  title.classList.add("results-title");
  title.textContent = "Resultados:";
  const list = document.createElement("ol");
  const fragment = document.createDocumentFragment();

  cars.forEach((car) => {
    const li = document.createElement("li");
    li.textContent = `Coche ${car.id}`;
    li.classList.add("results-item");
    fragment.appendChild(li);
  });

  //* Utilizo un setTimeOut para que la tabla no se muestre
  //* directamente al iniciar la carrera.
  setTimeout(() => {
    root.innerHTML = "";
    list.appendChild(fragment);
    root.appendChild(title);
    root.appendChild(list);
  }, 7500);
};

//* Crea un contenedor con una pista y una imagen para cada coche.
const createRoads = (cars) => {
  const grid = document.getElementById("grid");
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < cars.length; i++) {
    const road = document.createElement("div");
    road.classList.add("road");
    const car = document.createElement("div");
    car.classList.add("car");
    car.setAttribute("id", `car${i + 1}`);
    const img = document.createElement("img");
    img.src = `./img/car${i + 1}.png`;
    img.alt = `Coche ${i + 1}`;
    car.appendChild(img);
    road.appendChild(car);
    fragment.appendChild(road);
  }
  grid.innerHTML = "";
  grid.appendChild(fragment);
};

//* finishAt es la posición en que está la línea de meta.
//* cars es el array de objetos-coche, donde se almacena
//* la información de cada coche.
const finishAt = 93.75;
const cars = [];

//* Con jQuery, espera a que cargue el documento y añade
//* eventos de "click" para el button start y el button reset
//* (que empieza oculto). En función de en qué button se
//* clickea se van llamando a las funciones anteriores.
$(document).ready(() => {
  $("#reset").hide();
  $("#start").click(() => {
    // Se recoge el número de participantes del select.
    const numberOfCars = document.getElementById("num-cars").value;
    createCars(numberOfCars);
    createRoads(cars);
    beginRace(cars, finishAt);
    const result = getRaceResult(cars);
    createWinnerTable(result);
    $("#start").hide();
    $("#reset").show();
  });
  $("#reset").click(() => {
    resetCars(cars);
    $("#reset").hide();
    $("#start").show();
  });
});
