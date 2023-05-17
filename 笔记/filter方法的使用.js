let oldArr = ['1', '2',  '3']
let newArr = []
newArr = oldArr.filter((item)=>{
    if(item == '1'){
      return true
    }else{
      return false
    }
})

console.log(newArr); ['1']