const CAR_WIDTH = 66;
const CAR_HEIGHT = 135;

self.onmessage = (event) => {
  const { cars, modifiedCars } = event.data;

  const updatedCars = cars.map((car) => {
    const isExist = modifiedCars.has(car.id);

    if (!isExist) {
      return car;
    }

    const updatedCar = modifiedCars.get(car.id);

    if (!updatedCar) {
      return car;
    }

    const { type, isNew, ...restCar } = updatedCar;

    return restCar;
  });

  const modifiedCarsIterator = modifiedCars.values();

  const overlappedCars = new Set();

  for (const modifiedCar of modifiedCarsIterator) {
    const { type } = modifiedCar;

    if (type === "rotation") continue;

    for (const car of updatedCars) {
      if (car.id === modifiedCar.id) continue;

      if (
        modifiedCar.x < car.x + CAR_WIDTH &&
        modifiedCar.x + CAR_WIDTH > car.x &&
        modifiedCar.y < car.y + CAR_HEIGHT &&
        modifiedCar.y + CAR_HEIGHT > car.y
      ) {
        overlappedCars.add(car.id).add(modifiedCar.id);
      }
    }
  }

  self.postMessage(overlappedCars);
};
