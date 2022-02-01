<script>
  import { extractDeepestbyIndex } from './utils.js';
  import SearchItem from './searchItem.svelte';
	import { createEventDispatcher } from 'svelte';

  export let queryKeyword;
  export let queryList;
  export let groupList;
  
	const dispatch = createEventDispatcher();
  let extractedList = []
  export let isShow;
    
  //read and re-create the selection list
 $: initList(queryList);

  function initList(queryList){
    extractedList = []
    isShow = false;
    if(queryList && queryKeyword !== "" && queryKeyword === queryList.currentKey && queryList.list){
      try{
        extractList();
        isShow = true;
      }catch(err){
        console.log('init list error', err);
      }
    }
  }

  // extract needed data from api response according to the group list setting
  function extractList(){
    groupList.map((gval, ind)=>{
      queryList?.list.map((val, ind)=>{
        // find where to get grouping prop
        let onlyCurrentType = extractDeepestbyIndex(gval.prop.split('.'),val);
        if(onlyCurrentType && onlyCurrentType === gval.value){
          // find where to get value prop
          let onlyCurrentDisplayVal = extractDeepestbyIndex(gval.displayProp.split('.'),val);
  
          if(onlyCurrentDisplayVal){
            const currentDisplayName = gval.displayName ?? gval.value
            const maxLimit = gval.maxCount ?? 1000
            // initialize when index not found
            if(currentDisplayName && !extractedList[currentDisplayName]){
              extractedList[currentDisplayName] = []
            }
            //  check if excceeds limit
            if(extractedList[currentDisplayName].length >= maxLimit){
              return false;
            }
            extractedList[currentDisplayName].push(onlyCurrentDisplayVal)
          }
        }
      })
    })
  }
  
//return selected item
function selectFromList(val){
		dispatch('selectFromList', {
      value: val.detail.value
    });
  }

  </script>

  {#if isShow }
    <div id="searchList">
      {#each Object.keys(extractedList) as displayValue, displayIndex}
        <div class="dataGroup">{displayValue}</div>
        {#each extractedList[displayValue] as value, index}
          <SearchItem on:selectFromList={selectFromList} value={value} queryKeyword={queryKeyword} />
        {/each}
      {/each}
    </div>
  {/if}
    
  <style>
    
    #searchList{
      padding: 5px 5px;
      border: 1px solid lightgray;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
      position: absolute;
      width: 100%;
      border-top: 0px;
      box-sizing: border-box;
    }
    :global(#searchList div){
      padding:  5px 10px;
      border-radius: 5px;
    }
    .dataGroup{
      padding-top: 5px;
      color: gray;
      font-size: 0.8em;
    }
  </style>