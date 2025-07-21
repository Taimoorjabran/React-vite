import React, {useState, useEffect} from "react";

const data = {a: 5, b: {c: [{d: 5, e: 6}], f: 8}, g: 9};
 //add sum of integers

 export function sumIntegers (data: any) {
    let sum = 0;

    if (typeof data === 'number') {
        return data;
    }
    
    if  (Array.isArray(data)) {
        for (const item of data) {
            sum += sumIntegers(item);
        }
    } else if (typeof data === 'object' && data !== null) {
        for (const key in data) {
            sum += sumIntegers(data[key]);
        }
    }

    return sum;
 }


export function sumIntegersIterative(input: any) {
    let sum = 0;
    const stack = [input];
    console.log(stack, sum);
    
  
    while (stack.length) {
      const current = stack.pop();
      console.log(stack, sum, current);
      if (typeof current === 'number') {
        sum += current;
      } else if (Array.isArray(current)) {
        stack.push(...current);
      } else if (typeof current === 'object' && current !== null) {
        stack.push(...Object.values(current));
      }
    }
  
    return sum;
  }
  
  console.log(sumIntegersIterative(data)); // Output: 33
  


//  find missing
// const arr = [1, 2, 3, 4, 6, 7, 9, 10];
// export function missingValue (data) {

// }


export const debouncedSearch = (query: string, delay: number) => {
 const [data, setData] = useState('');

 useEffect(() =>{
  const handler = setTimeout(() => {
    setData(query);
   }, delay);

   return () => {
     clearTimeout(handler);
   }
 },[query, delay])

 return data;
}
