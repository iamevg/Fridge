let Machine = function(power) {
    this._power = power;
    this._enabled = false;

    let self = this;

    this.enable = function() {
        self._enabled = true;
    };

    this.disable = function() {
        self._enabled = false;
    };
};

let Fridge = function(power) {
    Machine.apply(this, arguments);

    let food = [];
    let parentDisable = this.disable;

    this.disable = function() {
        if (food.length) {
            throw new Error(`Нельзя выключить холодильник, в нем же есть еда и она испортится если холодильник не будет работать`);
        } else {
            this._enabled = false;
        }
    }

    this.addFood = function() {
        if (this._enabled) {
            Array.prototype.forEach.call(arguments, item => {
                if (food.length < this._power / 100) {
                    food.push(item);
                } else {
                    throw new Error(`Нельзя добавить, не хватает мощности`);
                }
            });
        } else{
            throw new Error(`Холодильник выключен`);
        }
    };

    this.getFood = function() {
        return food.slice();
    };

    this.removeFood = function(item) {
        if (food.indexOf(item) != -1) food.splice(food.indexOf(item), 1);
    };

    this.filterFood = filter => food.filter(filter);
};

let fridge = new Fridge(500);

fridge.enable();

fridge.addFood({
  title: `Котлета`,
  calories: 100
});

fridge.addFood({
  title: `Сок`,
  calories: 30
});

fridge.addFood({
  title: `Зелень`,
  calories: 10
});

fridge.addFood({
  title: `Варенье`,
  calories: 150
});

let dietItems = fridge.filterFood(item => item.calories < 50);

dietItems.forEach(item => {
    console.log(`${item.title}: ${item.calories}`); // Сок: 30 \n Зелень: 10

    fridge.removeFood(item);
});

fridge.disable(); // Error: Нельзя выключить холодильник, в нем же есть еда и она испортится если холодильник не будет работать
