// function prime(n){

//     for(var i = 2; i<n;i++){
//         if(i%2!==0&&i%3!==0&&i%4!==0&&i%5!==0&&i%6!==0&&i%7!==0&&i%8!==0&&i%9!==0&&i>10){
//             console.log(i)
//         }else if(i>4 && i%3!==0){
//             console.log(i)
//         }
//     }
// }

// prime(20)

// var jk = [1,3,6,4,1,2]

// function solution(a){
//     var s = [1,2,3,4,5,6,7,8,9]


//     for(var i = 0; i<s.length;i++){
//         console.log(s[i])
//         for(var l = i; l<a.length;i++){
//             // if(a[l]!=s[i]){
//             //     return s[i]
//             // }
//         }
//     }
// }

//     for (var i = 0; i<a.length;i++){
//         console.log(a[i])
//         for(var l = 0; l<s.length;i++){
//             // console.log(s[l])
//         }
//         // for(var k = i;k<s.length;i++){
//         //     console.log(s[k])    
//         // }
//     }
// }

// solution(jk)

// function calculatePoint(totalKill) {
//     var score = 0
//     for(var i = 0;i<totalKill;i++){
//     if(i<10){
//         score+=1
//     }else if(i>=10&&i<20){
//         score+=2
//     }else if(i>=20&&i<30){
//         score+=3
//     }else if(i>=30&&i<40){
//         score+=4
//     }else if(i>=40&&i<50){
//         score+=5
//     }else if(i>=50){
//         score+=6
//     }
// }
// return console.log(score)
// }
// calculatePoint(27)


// function calculatePrice(hour) {
//     var parkir = 0
//     var lima = 0
//     for(var k = 1 ; k<hour+1;k++){
//         if(k%5==0){
//             lima+=1
//         }
//     }

//     for(var i = 0; i<hour%5;i++){
//         parkir+=4000
//     }

//     return parkir+lima*18000
// }


// function miniGitWorks(lastCode, newCode) {
//     var lastc = lastCode.split('') 
//     var newc = newCode.split('')
//     var ba = []

//     var tes=false
//     for ( var i = 0 ; i<lastc.length;i++){
//         if(tes){
//             tes=false
//             continue
//         }
//         if(lastc[i]==newc[i]){
//             ba.push(lastc[i])
//         }else if (lastc[i]!=newc[i]){
//             if(lastc[i+1]!=newc[i+1]){
//                 ba.push('['+lastc[i]+lastc[i+1]+'|'+newc[i]+newc[i+1]+']')
//                 tes=true
//             }else{
//                 ba.push('['+lastc[+i]+'|')
//                 ba.push(newc[i]+']') 
//                 tes=false
//             }
//         }
//     }

//     return console.log(ba.join(''))

// }

// var a='Programmer'
// var b='noobgamers'
// var c = 'CHIP'
// var d = 'CHiP'

// miniGitWorks(a,b)



/*
 * Complete the 'calculateTotalPayment' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY drinks as parameter.
 */

// function calculateTotalPayment(drinks) {
//     var l = 20000
//     var a = 20000
//     var c = 25000
//     var w = 5000

//     for(var i = 0; i<drinks.length;i++){
        
//     }

//     return
// }
// function main() {



const cap =(s)=>{
    var nama = s.split('')
    nama[0] = nama[0].toUpperCase()
    return console.log(nama.join(''))
}


cap('alah')