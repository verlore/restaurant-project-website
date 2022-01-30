var funky = document.querySelector('#funky');
var array = [];
var finalHex = "#"
var white = "#fff"
var m = 0;
var l = 0;

//buttons
var menuBtn = document.getElementById('menu-btn');
var locationBtn = document.getElementById('location-btn');


//fills an array with 6 ints
var randomHex = () => { for(let i = 0; i < 6; i++ ){ array.push(Math.floor(Math.random() * 15))}}; 

// concats ints into a variable and if int is greater than 9 then assign an alphanumeric value corresponding to hex value.
var hexify = (arr) => { arr.forEach((element) => { return finalHex += element > 9 ?  String.fromCharCode(87 + element) : element; }) }; 

//changes the the color by using previous two function's outputs
var change = () => { 
    randomHex(); 
    hexify(array);
    
    document.getElementById("funky").style.color = finalHex;
    
    finalHex = "#";
    array = [];
}

var colorchange = setInterval(change, 2000);


menuBtn.addEventListener('click', () => {
    console.log("hi");
    m += 1;
    document.querySelector('.menu-content').style.opacity = m;

    if(m === 2){
        m = 0;
        document.querySelector('.menu-content').style.opacity = m;
        console.log("lol");
    }

})

locationBtn.addEventListener('click', () => {
    console.log("hi");
    l += 1;
    document.querySelector('.location-content').style.opacity = l;

    if(l === 2){
        l = 0;
        document.querySelector('.location-content').style.opacity = l;
        console.log("lol");
    }
})

