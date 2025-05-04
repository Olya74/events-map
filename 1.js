// const arr=[1,[2,[3,[4,[5,[6,[7,[8,[9,[10]]]]]]]]]];
// const zeroMoveArr=[1,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10];
// // const flArr=arr=>arr.reduce((acc, val)=>acc.concat(val));
// // console.log(flArr([[2,3],[4,5],[6,7],[8,9],[10]]));
// const zeroMoveRight=arr=>arr.reduce((acc,val)=>val===0 ? [...acc,val] : [val,...acc],[]);
// const flatArr=arr=>arr.reduce((acc, val)=>{
//  return Array.isArray(val) ? [...acc,...flatArr(val)] : [...acc,val]
// },[])

// //console.log(flatArr(arr));
// //console.log(zeroMoveRight(zeroMoveArr));

//triplet
const isTriplet=(arr)=>{
    if(arr.length<3) return false;
    for(let i=0;i<arr.length-2;i++){
        
        if(arr[i]<arr[i+1] && arr[i+1]<arr[i+2]){
            return true;
        }
    
    }
    return false;
  
}
 console.log(isTriplet([0,3,3,5,5,7,7,9]));
