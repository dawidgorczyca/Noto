process.on('message', (msg) => {
  // tslint:disable-next-line:no-console
  console.log('Message from parent:', msg)
})

let counter = 0

setInterval(() => {
  process.send({ counter: counter++ })
}, 1000)
