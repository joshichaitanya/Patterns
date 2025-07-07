interface Coffee {
	getPrice(): number
}

class LatteCoffee implements Coffee {
	getPrice() {
		return 10
	}
}

class CappuccinoCoffee implements Coffee {
	getPrice() {
		return 12
	}
}

abstract class ToppingDecorator implements Coffee {
	coffee: Coffee
	constructor(coffee: Coffee) {
		this.coffee = coffee
	}
	abstract getPrice(): number
}

class MilkTopping extends ToppingDecorator {
	constructor(coffee: Coffee) {
		super(coffee)
	}
	getPrice() {
		return this.coffee.getPrice() + 3
	}
}

class SugarTopping extends ToppingDecorator {
	constructor(coffee: Coffee) {
		super(coffee)
	}
	getPrice() {
		return this.coffee.getPrice() + 1
	}
}

class ToffeeTopping extends ToppingDecorator {
	constructor(coffee: Coffee) {
		super(coffee)
	}
	getPrice() {
		return this.coffee.getPrice() + 2
	}
}

class CreamTopping extends ToppingDecorator {
	constructor(coffee: Coffee) {
		super(coffee)
	}
	getPrice() {
		return this.coffee.getPrice() + 2
	}
}

const coffee1 = new ToffeeTopping(
	new MilkTopping(new SugarTopping(new CreamTopping(new LatteCoffee()))),
)

const coffee2 = new MilkTopping(new CappuccinoCoffee())
const x = new LatteCoffee()
console.log('@@@', x.getPrice())
console.log('coffee1', coffee1.getPrice())
console.log('coffee2', coffee2.getPrice())
