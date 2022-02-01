<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  export let value;
  export let queryKeyword;

function selectFromList(val){
		dispatch('selectFromList', {
      value: val
		});
  }

  //highlight matched words
  function makeTextBolder(text){
    let splitedText = text.split(' ')
    splitedText.map((textVal,index2)=>{
      let shouldSkip = false
      const tempText =  queryKeyword.split(' ').map((value,index)=>{
        let position = textVal.toUpperCase().search(value.toUpperCase());
        if(position<0 || shouldSkip){
          return textVal
        }
        const newString = textVal.substr(0, position) + 
          "<span class='needBold'>" + textVal.slice(position, position + value.length) + 
          "</span>" + textVal.substr((position) + value.length)
        splitedText[index2] = newString
        shouldSkip = true
      })
    })
    splitedText = splitedText.join(' ')
    return splitedText
  }
</script>
<div on:click={selectFromList(value)} class="dataValue">{@html makeTextBolder(value)}</div> 
<style>
  :global(.needBold){
    font-weight: bolder;
  }
  .dataValue{
    cursor: pointer;
    
  }
  .dataValue:hover{
    background-color: lightgray;
  }
</style>