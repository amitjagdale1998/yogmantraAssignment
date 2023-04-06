//Write a function in JavaScript that takes an array of integers and returns the sum of all
// even numbers in the array.






 function sumArray(array) {
    let sum = 0;
  
    for (let i = 0; i < array.length; i++) {
        if(array[i]%2==0)
        {
            sum += array[i];
        }
     
    }
    
    return sum;
  }
  
  console.log(sumArray([1, 2, 3, 4, 5,6,7,8,9,10]));
