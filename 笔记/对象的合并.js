let obj = { name : 'andy' }

let obj2 = { user : 'admin' }

obj2 = { ...obj, ...obj2 }

console.log(obj2);