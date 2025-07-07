FakePromise = function(callback) {
this.promiseSuccess
this.promiseError
callback(success => {
	console.log('success: ', success)
	if (typeof this.promiseSuccess === 'function') this.promiseSuccess()
}, error=> {
	console.log('error: ', error)
	if (typeof this.promiseError === 'function') this.promiseError()
})
	this.then=(callback)=>{this.promiseSuccess = callback}
	this.catch=(callback)=>{this.promiseError = callback}
}
new FakePromise(function(resolve, reject) {
  setTimeout(() => reject('fine!'), 1000);
}).then(()=> {
	console.log('inside then')
})
