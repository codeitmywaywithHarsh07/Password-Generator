// Variable Declarations

let displayPassw=document.querySelector('.display');
let copyBtn=document.querySelector('.copy-button');
let copyMsg=document.getElementById('copied');
let displayLength=document.querySelector('.display-length');
let slider=document.getElementById('mySlider');
let upperCase=document.querySelector('#uppercase');
let lowerCase=document.querySelector('#lowercase');
let numbers=document.querySelector('#numbers');
let symbols=document.querySelector('#symbols');
let allCheckBox=document.querySelectorAll('input[type=checkbox]');
let indicator=document.querySelector('.round-indicator');
let generatePassw=document.querySelector('.submit');


// Default
let checkCount=0;
let passwLength=8;
let password="";
slider.value=passwLength;
handleSlider();
let symbolString=`!@#$%^&*()_+=-}{[]|"'><.,?/,`;

// Handle Slider

function handleSlider(){
    // slider.value=passwLength;
    displayLength.innerHTML=passwLength;
}

slider.addEventListener('input',function(){
    passwLength=slider.value;
    handleSlider();
});

// Indicator

function setIndicator(color){
    indicator.style.cssText=`background-color: ${color}; box-shadow: 1px 1px 5px ${color}`;
}


// Random Generate

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

// Random Number

function getRandomNumber(){
    return getRandom(0,9);
}

// LowerCase

function getLowerCase(){
    let ascii=getRandom(97,123);
    return String.fromCharCode(ascii);
}

// UpperCase

function getUpperCase(){
    let ascii=getRandom(65,91);
    return String.fromCharCode(ascii);
}

// displayPassw.value=getUpperCase();

// Symbols

function getSymbols(){
    let index= getRandom(0,symbolString.length-1);
    return symbolString.charAt(index);
}

// Password Strength

function calcStrength(){
    let hasLower=false;
    let hasUpper=false;
    let hasNumber=false;
    let hasSymbol=false;

    if(lowerCase.checked){
        hasLower=true;
    }
    if(upperCase.checked)
    {
        hasUpper=true;
    }
    if(numbers.checked)
    {
        hasNumber=true;
    }
    if(symbols.checked)
    {
        hasSymbol=true;
    }

    console.log(passwLength);
    console.log(hasUpper);
    console.log(hasLower);
    console.log(hasNumber);
    console.log(hasSymbol);

    if(hasUpper && hasLower && hasNumber && hasSymbol && passwLength>=8)
    {
        setIndicator('rgb(1, 200, 1)');
        displayLength.style.color="rgb(1, 200, 1)"
    }
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwLength>=5)
    {
        setIndicator('yellow');
        displayLength.style.color="rgb(248, 203, 5)";

    }
    else{
        setIndicator('red');
        displayLength.style.color="red";
    }

}

// Copy Text to clipboard

async function copyPassw(){

    if(displayPassw.value!='')
    {
        copyBtn.classList.add('hide');
        await navigator.clipboard.writeText(displayPassw.value);
        copyMsg.innerHTML='✔';
        await displayMsg();
    }
}

async function displayMsg(){
    setTimeout(() => {
        copyMsg.innerHTML="";
        copyBtn.classList.remove('hide');
    }, 2000);
}

// Checking count of check box count

function handleCheckBox(){
    // checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwLength<checkCount){
        passwLength=checkCount;
        handleSlider();
    }
    
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBox);
});

function newPassw(){

    if(checkCount<=0)
    {
        return;
    }
    

    let password="";
    let funcArr=[];

    if(upperCase.checked){
        funcArr.push(getUpperCase);
    }

    if(lowerCase.checked)
    {
        funcArr.push(getLowerCase);
    }
    if(numbers.checked)
    {
        funcArr.push(getRandomNumber);
    }
    if(symbols.checked)
    {
        funcArr.push(getSymbols);
    }

    // Compulsory Kaam
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }

    for(let i=0;i<passwLength-funcArr.length;i++)
    {
        password+=funcArr[getRandom(0,funcArr.length)]();
    }

    password=shufflePassword(Array.from(password));

    displayPassw.value=password;

    calcStrength();
}


function shufflePassword(arr){

    for (let i = arr.length - 1; i > 0; i--)
    {
     
        // Pick a random index from 0 to i inclusive
        let j = Math.floor(Math.random() * (i + 1));
 
        // Swap arr[i] with the element
        // at random index
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    let str="";
    arr.forEach((i)=>{
        str+=i;
    });
    return str;

}









