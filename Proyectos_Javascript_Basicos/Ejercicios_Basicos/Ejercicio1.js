
//suma

function suma (nun1, nun2){
    return nun1 + nun2
}

console.log(suma(5,8))

//factorial

function factorial(n){
    if (n === 0 || n === 1){
        return 1
    } else{
        return n * factorial(n - 1)
    }
}

console.log(factorial(5))

//Invertir cadena

function invertirCadena(cadena){
  return cadena.split('').reverse().join('')
}

console.log(invertirCadena("carretera"))

//Dividir Cadena 

function dividirCadena(cadena){
 return cadena.split(' ').length
}
console.log(dividirCadena("TODOS CORREN AL BAUL DE PEDRO"))


//  Numero Mayor en un arreglo

function numeroMayor(array){
    return Math.max(...array)
}

console.log(numeroMayor([2,4,6,30,3]))

// Suma de numero en un array

function sumaArray(array){
    return array.reduce((total, current) => total + current, 0)

}

console.log(sumaArray([5, 6, 7, 5, 90]))

// Palindromo

function Palindromo(cadena){
    return cadena === cadena.split('').reverse().join('')
}

console.log(Palindromo("reconocer"))


// Duplicados

function duplicados(array){

    return [...new Set(array)]

}

console.log(duplicados([3,3,3,5,6,4,4,7,7,2,1,2,3,9,8,9]))

