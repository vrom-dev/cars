function Car(id) {
  this.id = id;
  this.position = 0;

  this.reset = () => {
    this.position = 0;
    $(`#car${id}`).animate({ "margin-left": `${this.position}%` }, 500);
    return this.position;
  };

  this.move = (move) => {
    console.log(this.id, this.position);
    this.position += move;
    if (this.position > 93.75) this.position = 93.75;
    $(`#car${id}`).animate({ "margin-left": `${this.position}%` }, 500);
    console.log(this.id, this.position);
    return this.position;
  };
}

const createCars = (numberOfCars) => {
  for (let i = 0; i < numberOfCars; ++i) {
    cars[i] = new Car(i + 1);
  }
};

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

const resetCars = (cars) => {
  const root = document.getElementById("root");
  root.innerHTML = "";
  cars.forEach((car) => {
    car.reset();
  });
};

const getRaceResult = (cars) => {
  carsPositions = [...cars];
  carsPositions.sort((carA, carB) => carB.position - carA.position);
  return carsPositions;
};

const createWinnerTable = (cars) => {
  const root = document.getElementById("root");
  const title = document.createElement("h2");
  title.textContent = "Resultados:";
  const list = document.createElement("ol");
  const fragment = document.createDocumentFragment();

  cars.forEach((car) => {
    const li = document.createElement("li");
    li.textContent = `Coche ${car.id}`;
    fragment.appendChild(li);
  });
  setTimeout(() => {
    list.appendChild(fragment);
    root.appendChild(title);
    root.appendChild(list);
  }, 7500);
};

const numberOfCars = 6;
// Porcentaje en el que fijamos la meta
const finishAt = 93.75;
// Vector que almacena cada coche con su posición
const cars = [];

$(document).ready(() => {
  $("#reset").hide();
  createCars(numberOfCars);
  $("#start").click(() => {
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

//console.log(document.getElementById("num-cars").value);
