const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    console.log(location)
    messageOne.textContent='Loading .... '
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent= data.error
            messageTwo.textContent=""
        }else{
            console.log(data.location)
            messageOne.textContent= data.location
            messageTwo.textContent = 'Temperature :'+data.Temperature + ' , Rain chances are : ' + data.Rain_Chance
        }
    })
})
})