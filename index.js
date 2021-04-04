// Variables Globales

let baseColor = 'FF0000'
let transpColor = 'FF'
let brilloColor, satColor, finalColor

// Output
const base = document.querySelector('.base')
const final = document.querySelector('.finalColor')
const finalCode = document.querySelector('.colorCode')

// Input
const matiz = document.querySelector('.Matiz')
const transparencia = document.querySelector('.Transparencia')
const brillo = document.querySelector('.Brillo')
const saturacion = document.querySelector('.Saturacion')

const colorSelector = document.querySelector('.colorSelector')
const selector = document.querySelector('.point')

// Functions

// console.log(matiz.value) // 0 - 96
// console.log(transparencia.value/1000) // 0 - 1
// console.log(brillo.value) // 0 -100
// console.log(saturacion.value) // 0 -100

function Inicio(){
    matiz.value = 40
    transparencia.value = 1000
    brillo.value = 100
    saturacion.value = 100

    brillo.style.background = `linear-gradient(90deg, #000 0%, #${baseColor} 100%)`
    saturacion.style.background = `linear-gradient(90deg, #FFF 0%, #${baseColor} 100%)`

    ColorBase(baseColor)

    finalCode.innerHTML = `Hex Code: #${baseColor}`
    final.style.background = `#${baseColor}`
}

function ColorBase(color) {
    base.style.background = `#${color}`
    Mods()
    brillo.style.background = `linear-gradient(90deg, #000 0%, #${brilloColor} 100%)`
    saturacion.style.background = `linear-gradient(90deg, #FFF 0%, #${satColor} 100%)`
}

function DectoHex(num) {
    let val
    if (num <= 15){
        return (`0${num.toString(16).toUpperCase()}`)
    }
    val = num.toString(16).toUpperCase()
    return val
}

function moveSelector(x,y){
    selector.style.left = `${x-5}px`
    selector.style.top = `${y-5}px`
    // console.log(x-5, y-5)
}

function Mods(){
    let de0mode = parseInt(baseColor.slice(0,2), 16)
    let de1mode = parseInt(baseColor.slice(2,4), 16)
    let de2mode = parseInt(baseColor.slice(4,6), 16)

    let ba = Math.round(de0mode + ((255-de0mode) * Math.abs((saturacion.value/100)-1)))
    let bb = Math.round(de1mode + ((255-de1mode) * Math.abs((saturacion.value/100)-1)))
    let bc = Math.round(de2mode + ((255-de2mode) * Math.abs((saturacion.value/100)-1)))

    // console.log(ba, bb, bc)

    if (ba <= 15) 
        ba = `0${ba}`
    else
        ba = ba.toString(16).toUpperCase()
    if (bb <= 15) 
        bb = `0${bb.toString(16).toUpperCase()}`
    else
        bb = bb.toString(16).toUpperCase()
    if (bc <= 15) 
        bc = `0${bc.toString(16).toUpperCase()}`
    else    
        bc = bc.toString(16).toUpperCase()

    brilloColor = ba+bb+bc
    // console.log(brilloColor, ba, bb, bc)

    let sa = Math.round(Math.abs((de0mode-0)*(brillo.value/100)))
    let sb = Math.round(Math.abs((de1mode-0)*(brillo.value/100)))
    let sc = Math.round(Math.abs((de2mode-0)*(brillo.value/100)))

    if (sa <= 15) 
        sa = `0${sa}`
    else
        sa = sa.toString(16).toUpperCase()
    if (sb <= 15) 
        sb = `0${sb.toString(16).toUpperCase()}`
    else
        sb = sb.toString(16).toUpperCase()
    if (sc <= 15) 
        sc = `0${sc.toString(16).toUpperCase()}`
    else    
        sc = sc.toString(16).toUpperCase()

    satColor = sa+sb+sc

    let fa = Math.round(Math.abs((parseInt(ba,16)-0)*(brillo.value/100)))
    let fb = Math.round(Math.abs((parseInt(bb,16)-0)*(brillo.value/100)))
    let fc = Math.round(Math.abs((parseInt(bc,16)-0)*(brillo.value/100)))

    if (fa <= 15) 
        fa = `0${fa}`
    else
        fa = fa.toString(16).toUpperCase()
    if (fb <= 15) 
        fb = `0${fb.toString(16).toUpperCase()}`
    else
        fb = fb.toString(16).toUpperCase()
    if (fc <= 15) 
        fc = `0${fc.toString(16).toUpperCase()}`
    else    
        fc = fc.toString(16).toUpperCase()

    finalColor = fa+fb+fc
    
    transparencia.style.background = `linear-gradient(90deg, transparent 0%, #${finalColor} 100%)`
    transpColor = (parseInt(transparencia.value)).toString(16).toUpperCase()
    if (parseInt(transparencia.value) <= 15)
        finalColor += `0${transpColor}`
    else if(parseInt(transparencia.value) != 255)
        finalColor += transpColor
        

    final.style.background = `#${finalColor}`
    finalCode.innerHTML = `Hex Code: #${finalColor}`

    selector.style.border = `2px solid #${finalColor}`
    selector.style.filter = `invert(100%)`
}

// Events

colorSelector.addEventListener('click', (clickEvent) => {
    let capBri = Math.abs((clickEvent.layerY/300)-1)*100
    let capSat = (clickEvent.layerX/300)*100

    moveSelector(clickEvent.layerX,clickEvent.layerY)

    brillo.value = capBri
    saturacion.value = capSat

    Mods()

    brillo.style.background = `linear-gradient(90deg, #000 0%, #${brilloColor} 100%)`
    saturacion.style.background = `linear-gradient(90deg, #FFF 0%, #${satColor} 100%)`
    
    // console.log(`cambio`)
})

matiz.addEventListener('change', () => {
    // let colorArray = []
    if (matiz.value <= 255) {
        // console.log('FFXX00+ 0-255 '+ matiz.value)
        baseColor = `FF${DectoHex(matiz.value * 1)}00`
    }
    else if (matiz.value <= 511) {
        // console.log('XXFF00- 256-511 ' + (-matiz.value + 511) + ` ${matiz.value}`)
        baseColor = `${DectoHex(-matiz.value + 511)}FF00`
    }
    else if (matiz.value <= 767) {
        // console.log('00FFXX+ 512-767 ' + (matiz.value - 512) + ` ${matiz.value}`)
        baseColor = `00FF${DectoHex(matiz.value - 512)}`
    }
    else if (matiz.value <= 1023) {
        // console.log('00XXFF- 768-1023 ' + (-matiz.value + 1023) + ` ${matiz.value}`)
        baseColor = `00${DectoHex(-matiz.value + 1023)}FF`
    }
    else if (matiz.value <= 1279) {
        // console.log('XX00FF+ 1024-1279 ' + (matiz.value - 1024) + ` ${matiz.value}`)
        baseColor = `${DectoHex(matiz.value - 1024)}00FF`
    }
    else {
        // console.log('FF00XX- 1280-1535 ' + (-matiz.value + 1535) + ` ${matiz.value}`)
        baseColor = `FF00${DectoHex(-matiz.value + 1535)}`
    }
    // console.log(baseColor)               
    // finalCode.innerHTML = `${((matiz.value)/1535)*100} ${baseColor}`
    ColorBase(baseColor)
})

brillo.addEventListener('change', (val) => {
    // transformar de (0-100) a (300 a 0)
    console.log(brillo.value)
    let YY = Math.abs((brillo.value/100)-1)*300
    selector.style.top = `${YY-5}px`
    Mods()
})

saturacion.addEventListener('change', () => {
    // transformar de (0-100) a (0 a 300)
    console.log(saturacion.value)
    let XX = Math.abs(saturacion.value/100)*300
    selector.style.left = `${XX-5}px`
    Mods()
})

transparencia.addEventListener('change', () => {
    Mods()
})

// Llamado a funciones

Inicio()

