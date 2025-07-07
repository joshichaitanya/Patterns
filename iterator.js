class MyPromise {
	isSuccess
	data
	error
	constructor(cb) {
		cb((data) => {
			this.isSuccess = true
			this.data = data
		}, (error) => {
			this.isSuccess = false
			this.error = error
		})
	}
	then(cb) {
		if (this.isSuccess) {
			cb(this.data)
		}
		return this
	}
	catch(cb) {
		if (!this.isSuccess) {
			cb(this.error)
		}
		return this
	}
}

// new MyPromise((resolve, reject) => {
// 	reject(111)
// }).then(console.log).catch(console.log)

const promisifiedTimeout = () =>
	new MyPromise((resolve) => {
		setTimeout(() => resolve('DONE-'), 500)
	})



function* foo(index) {
	while (index < 10) {
		yield promisifiedTimeout()
		index++
	}
}

(async () => {
	const iterator = foo(0);

	for (let result = iterator.next(); !result.done; result = iterator.next()) {
		console.log(await result.value)
	}
	console.log('@@@@@')
	for await (const result of foo(0)) {
		console.log(result)
	}
})()
