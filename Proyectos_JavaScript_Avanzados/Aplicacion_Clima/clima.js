const clima = document.querySelector('.clima')
const from = document.querySelector('.ver-clima')

const nameCity = document.querySelector('#city')

from.addEventListener('submit', (e) => {
    e.preventDefault();


    if (nameCity.value === '')
    {
        showError('El campo es obligatorio...')
        return
    }

    callAPI(nameCity.value)

    //console.log(nameCity.value)
})


function callAPI(city){
    const apiID = '22e7b1e5c311bd5f437d79702876b150'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiID}`

    fetch(url)
    .then(data => {
        return data.json()
    })
    .then(dataJSON => {

        if(dataJSON.cod ==='404'){
            showError('Ciudad no encontrada...')
        } else{
            limpiarclima()
            showclima(dataJSON)
        } 
        //console.log(dataJSON)
    })
   .catch(error)
   {
    console.log(error)
   }
    
}

function showclima(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;

    const degrees = tranforCentigrado(temp)
    const max = tranforCentigrado(temp_max)
    const min = tranforCentigrado(temp_min)

    const content = document.createElement('div')

    content.innerHTML = `
             <h4>Clima en ${name}</h4>
             <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
             <h2>${degrees}°C</h2>
             <p>Max: ${max}°C</p>
             <p>Min: ${min}°C</p>
    `

clima.appendChild(content)
    console.log(name)
    console.log(temp)
    console.log(temp_max)
    console.log(temp_min)
    console.log(arr.icon)
}


function tranforCentigrado(temp) {
    return parseInt(temp - 273.15)

}

function limpiarclima(){
    clima.innerHTML = ('')
}


function showError(message){
    console.log(message)
    const alert = document.createElement('p')
    alert.classList.add('alert-message')
    alert.innerHTML = message

    from.appendChild(alert)
    setTimeout(() => {
        alert.remove()
    }, 3000);
}
