function prime(n){

    for(var i = 2; i<n;i++){
        if(i%2!==0&&i%3!==0&&i%4!==0&&i%5!==0&&i%6!==0&&i%7!==0&&i%8!==0&&i%9!==0&&i>10){
            console.log(i)
        }else if(i>4 && i%3!==0){
            console.log(i)
        }
    }
}

prime(20)