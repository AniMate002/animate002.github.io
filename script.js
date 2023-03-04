let api

let info = {
    name: '',
    clouds: 0,
    temperature: 0,
    feels_like: 0,
    visibility: 0,
    windSpeed: 0,
    description: '',
    humidity: 0

}

const fetchData = async (city) => {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=322d88ddc6500cfab7f424a868d0460b`
    try{
        const result = await fetch(api)
        const data = await result.json()


        const {
            name,
            main:{feels_like, humidity, temp:temperature},
            clouds:{all:clouds},
            visibility,
            wind:{speed:windSpeed},
            weather
            
        } = data

        
        info = {
            name,
            clouds,
            temperature,
            feels_like,
            visibility,
            windSpeed,
            description: weather[0].description,
            humidity
        }

        console.log(info)

    }catch(e){
        Swal.fire({
            title: 'Ooops...',
            text: `We didn't find this place`,
            icon: 'error'
        })
    }
    
    


}

 



let input_city = document.getElementById('search')

input_city.onkeydown = function(event){
    if(event.key == 'Enter') {

        if(input_city.value){
            cities = JSON.parse(localStorage.getItem('cities'))
            cities.push(input_city.value)
            localStorage.setItem('cities', JSON.stringify(cities))

            updateCities()



            fetchData(input_city.value).then(data => {
                console.log(data)
                updateWeather(input_city.value)
                input_city.value = ''
            }) 

            
        }
        

        
    }
}


let cities = []
const scale = document.getElementById('scale')


const Week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
let DATE = new Date();
let day = DATE.getDay();
let month = DATE.getMonth()
let dayOfWeek = DATE.getDay()
let date = DATE.getDate() 
let hour = DATE.getHours()
let minutes = DATE.getMinutes()
console.log(day, month, Week[dayOfWeek], date, Months[month], hour, minutes)

function funOnload(){
    if(!localStorage.getItem('cities')){
        localStorage.setItem('cities', '[]')
    }
    fetchData('London').then(() => {
        updateWeather('London')





        
    })

    document.querySelector('.bot_time').innerHTML = `${date} / ${month} - ${Week[dayOfWeek]}, ${Months[month]} ${hour} : ${minutes}`
    
}


updateCities()

function updateCities(){

    cities = JSON.parse(localStorage.getItem('cities'))
    let block = document.getElementById('users')
    block.innerHTML = ''
    for(var i = 0; i < cities.length; i++){
        block.insertAdjacentHTML("afterbegin", `
        
        <li><p id="${i}" onclick="clickCity(${i})" class="city_item">${cities[i]}</p> <i onclick="deleteItem(${i})" class="fa-solid fa-xmark"></i></li>


        `)

    }
    
}




function deleteItem(number){

    let block = document.getElementById('users')
    block.innerHTML = ''

    cities = JSON.parse(localStorage.getItem('cities'))
    cities.splice(number, 1)
    localStorage.setItem('cities', JSON.stringify(cities))
    updateCities()

}


scale.onclick = function(){

    if(input_city.value){
        cities = JSON.parse(localStorage.getItem('cities'))
        cities.push(input_city.value)
        localStorage.setItem('cities', JSON.stringify(cities))

        updateCities()



        fetchData(input_city.value).then(data => {
            console.log(data)

        }) 

        input_city.value = ''
    }
    
        
}


function updateWeather(city){
    document.querySelector('.bot_temperature').innerHTML = `${Math.round(info.temperature) - 273}°`
    document.querySelector('.bot_city').innerHTML = city
    document.querySelector('.bot_desc').innerHTML = `${info.description}`
    document.querySelector('.cloudy_value').innerHTML = `${info.clouds}%`
    document.querySelector('.feelsLike_value').innerHTML = `${Math.round(info.feels_like) - 273}°`
    document.querySelector('.visibility_value').innerHTML = `${info.visibility}`
    document.querySelector('.windSpeed_value').innerHTML = `${info.windSpeed}km/h`
    document.querySelector('.humidity_value').innerHTML = `${info.humidity}%`
}



function clickCity(number){

    cities = JSON.parse(localStorage.getItem('cities'))
    fetchData(cities[number]).then(() => {
        updateWeather(cities[number])
    })
    

}