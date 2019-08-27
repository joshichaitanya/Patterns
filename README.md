# EventSubscriberJS


```
function EventBus () {
    this.data = {}
    this.subscribe = (eventName, callback) => {
        if (!this.data[eventName])
            this.data[eventName] = []
        return (this.data[eventName].push(callback) - 1)
    }

    this.publish = (eventName, data) => {
        if (!this.data[eventName]) return
        this.data[eventName].map(val => {
            if (typeof val === 'function') val(data)
        })
    }

    this.unsubscribe = (eventName, index) => {
        if (!this.data[eventName]) return
        this.data[eventName][index] = null;
    }
}

var bus = new EventBus();

let sub1 = bus.subscribe("PRODUCT_ADDED", function (pInfo) {
    console.log('Triggred - PRODUCT_ADDED');
})

let sub2 = bus.subscribe("USER_ADDED", function (pInfo) {
    console.log('Triggred - USER_ADDED');
})
let sub22 = bus.subscribe("USER_ADDED", function (pInfo) {
    console.log('Triggred - USER_ADDED AGAIN');
})

let sub3 = bus.subscribe("AGENT_ADDED", function (pInfo) {
    console.log('Triggred - AGENT_ADDED');
})

let sub4 = bus.subscribe("CART_ADDED", function (pInfo) {
    console.log('Triggred - CART Added');
})
let sub5 = bus.subscribe("PRODUCT_ADDED", function (pInfo) {
    console.log('Triggred - PRODUCT_ADDED Again');
})

bus.publish('PRODUCT_ADDED');

console.log('---------')
bus.publish('USER_ADDED');
console.log('---------')
bus.unsubscribe('USER_ADDED', sub22);
console.log('---------')
bus.publish('USER_ADDED');
console.log('---------')


bus.publish('AGENT_ADDED');
bus.publish('CART_ADDED');

```

