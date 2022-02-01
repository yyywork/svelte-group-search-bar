  
// get deepest property,e.g. get "data.type" from object{data:{type:xxx}}
export function extractDeepestbyIndex(nestedGroup, val){
  let tempVal = val;
  nestedGroup.map((val2, ind2)=>{
    if(tempVal[val2]){
      tempVal = tempVal[val2]
    }else{
      tempVal = null
    }
  })
  return tempVal;
}
  
export function equalIgnoreCase(v1, v2){
  return v1.toUpperCase().search(v2.toUpperCase());
}