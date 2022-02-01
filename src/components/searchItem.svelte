<script>
	import { createEventDispatcher } from 'svelte';
  import { equalIgnoreCase } from './utils'


	const dispatch = createEventDispatcher();

  export let value;
  export let queryKeyword;

function selectFromList(val){
		dispatch('selectFromList', {
      value: val
		});
  }

  // highlight match words even it is not consecutive
  function makeTextBolder(text){
    let splitedText = text.split(' ')
    // split movie/TV show title from API
    splitedText.map((textVal,index2)=>{
      let shouldSkip = false
      // split query string from user input
      queryKeyword.split(' ').map((value,index)=>{
        let position = equalIgnoreCase(textVal, value);
        // position < 0 means current title does not match current query
        if(position<0 || shouldSkip){
          return textVal
        }
        // highlight the text when it is partially/fully match 
        const newString = textVal.substr(0, position) + 
          "<span class='needBold'>" + textVal.slice(position, position + value.length) + 
          "</span>" + textVal.substr((position) + value.length)
        splitedText[index2] = newString
        // skip checking current title if it highlights once
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