<script>
	import { onMount } from 'svelte';
	import SearchList from './components/SearchList.svelte';
	import { apiComposer } from './apis/api.js';
  // import { env } from './lib/env.js'

	export let queryKeyword = "";
	const apiInterval = 100;
	let enableAPI = true;
	let isShow = false;
	let queryList;
	const groupList = [
		{prop: "Type", value: "movie", maxCount: 3, displayName: "Movies", displayProp: "Title"},
		{prop: "Type", value: "series", maxCount: 3, displayName: "TV Shows", displayProp: "Title"}
	]
	
	$: callingAPI(queryKeyword)

	async function callingAPI(){
		if(queryKeyword && enableAPI){
			resetquerList();
			enableAPI = false;
			const response = await fetch(apiComposer(queryKeyword))
    	const resJson =  await response.json();
			if(resJson.Response){
				queryList = {
					currentKey: queryKeyword,
					list: resJson.Search
				}
			}
			setTimeout(()=>{
				enableAPI = !enableAPI;
			}, apiInterval)
		}
	}
	
	function resetquerList(){
		queryList = {
			currentKey: null,
			list: []
		}
	}

	function selectFromList(data){
		queryKeyword = data.detail.value
	}
	
	onMount(() => {
		resetquerList()
	});
</script>
<div id="searchContainer">
	<input type="text" on:blur={()=>{isShow = false}} name="searchBar" id="searchBar" class:emptyItem={((!queryList?.list) || queryList.list.length<=0) && !isShow} bind:value={queryKeyword} />
	<SearchList on:selectFromList={selectFromList} isShow={isShow} queryList={queryList} queryKeyword={queryKeyword} groupList={groupList} />
</div>

<style>
	#searchContainer{
		position: relative;
    margin: 1% 5%;
	}
	#searchBar.emptyItem{
		border-radius: 5px;
	}
	#searchBar{
		width: 100%;
		border-radius: 5px;
		padding: 10px 15px;
		margin-bottom: 0px;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
		border: 1px solid gray;
	}
</style>