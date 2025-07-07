type CBType<T> = (val: T) => unknown

interface Observable<T> {
	publish(key: string, val: T): void
	unsubscribe(key: string, cb: CBType<T>): void
	subscribe(key: string, cb: CBType<T>): void
}

class Observer<T> implements Observable<T> {
	map: Record<string, CBType<T>[]>
	constructor() {
		this.map = {}
	}

	subscribe(key: string, cb: CBType<T>) {
		if (!this.map[key]) {
			this.map[key] = [cb]
		} else {
			this.map[key].push(cb)
		}
	}

	unsubscribe(key: string, cb: CBType<T>) {
		if (this.map[key]) {
			this.map[key] = this.map[key].filter((c) => c !== cb)
		}
	}

	publish(key: string, val: T) {
		if (this.map[key]) {
			this.map[key].forEach((cb) => {
				cb(val)
			})
		}
	}
}

const ob = new Observer<number>()

const fn1 = (runs: number) => console.log('1 WON by ' + runs + ' runs')
ob.subscribe('Win', fn1)
const fn2 = (runs: number) => console.log('2 WON by ' + runs + ' runs')
ob.subscribe('Win', fn2)
const fn3 = (runs: number) => console.log('3 WON by ' + runs + ' runs')
ob.subscribe('Win', fn3)

ob.subscribe('Loose', (runs: number) =>
	console.log('4 Loose by ' + runs + ' runs'),
)
ob.subscribe('Loose', (runs: number) =>
	console.log('5 Loose by ' + runs + ' runs'),
)

ob.publish('Win', 10)
ob.publish('Loose', 1)

ob.unsubscribe('Win', fn3)

ob.publish('Win', 20)
