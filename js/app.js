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
    if (this.position > 92) this.position = 93;
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
  cars.forEach((car) => {
    car.reset();
  });
};

var numberOfCars = 9;
// Porcentaje en el que fijamos la meta
var finishAt = 93;
// Vector que almacena cada coche con su posición
var cars = [];

$(document).ready(function () {
  createCars(numberOfCars);
  $("#start").click(function () {
    $(this).hide();
    $("#reset").show();
    beginRace(cars, finishAt);
  });
  $("#reset").click(function () {
    $(this).hide();
    $("#start").show();
    resetCars(cars);
  });
});
