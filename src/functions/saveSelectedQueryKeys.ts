
const saveSelectedQueryKeys = async (queries: string[]) => {
  console.log('*** FUNC INVOKED ****');

  // TESTING - delete later
  const finalSessionResultBEFORE = await chrome.storage.local.get(['thisSessionsQueries']);
  console.log('SessionQueries BEFORE: ', finalSessionResultBEFORE.thisSessionsQueries);
  const finalResultBEFORE = await chrome.storage.local.get(['selectedQueries']);
  console.log('final BEFORE: ', finalResultBEFORE.selectedQueries);
  
  // *** Persisting Query Selection ***
  // this is complex because we may store queries that are not yet visible in the drop-down

  // to allow users to remove queries, we separately store the data from the session as "thisSessionsQueries" - this will allow us to see when a query has been removed by comparies the queries that come in as an arguement to the queries that were previously selected
  // once we have the query keys that were removed, we update the storage to be: union of what's currently stored and what was added. Less any queries that were removed
  
  // clear session queries when first invoked:
  if (queries.length === 0) {
    await chrome.storage.local.set({
      thisSessionsQueries: []
    });
  }

  const queriesSet = new Set(queries);
  const sessionResult = await chrome.storage.local.get(['thisSessionsQueries']);
  
  // if no queries have been stored as part of the session set to an empty array
  const sessionQueries: string[] =
    sessionResult.thisSessionsQueries ?
      sessionResult.thisSessionsQueries :
      [];

  // determine the queries that the user removed by finding the difference between the queries passed into the function and the queries stored as SessionQueries
  // I'm currently marking queries as removed 
  const queriesRemoved: string[] = sessionQueries.filter( queryKey => !queriesSet.has(queryKey))
  console.log('queriesRemoved: ', queriesRemoved );

  // update storage for current session's selections now that we've found if any query keys were removed 
  console.log('queries: ', queries);
  await chrome.storage.local.set({
    thisSessionsQueries: queries
  });


  // get the query keys that were selected in previous sessions
  const selectedResult = await chrome.storage.local.get(['selectedQueries'])
  console.log('From previous session: ', selectedResult.selectedQueries);

  // if no queries have been stored as part of previous sessions set to an empty array
  const selectedQueries: string[] =
    selectedResult.selectedQueries ?
      selectedResult.selectedQueries :
      [];

  // combine existing queries with the new ones and handle duplicates
  const combinedQueries = new Set([...selectedQueries, ...queries]);
  console.log('combinedQueries: ', selectedQueries);

  // remove the queries that users unselected
  const combinedQueriesWithRemovals: string[] = [];
  for (const queryKey of combinedQueries) {
    // if queryKey is not in the removals list, add it to be stored
    if (!queriesRemoved.includes(queryKey)) {
      // store as a set for faster access
      combinedQueriesWithRemovals.push(queryKey);
    }
  }

  // add the combinedQueries into local storage
  console.log('combinedQueriesWithRemovals: ', combinedQueriesWithRemovals);
  await chrome.storage.local.set({
    selectedQueries: combinedQueriesWithRemovals,
  });

  // TESTING - delete later
  const finalSessionResult = await chrome.storage.local.get(['thisSessionsQueries']);
  console.log('SessionQueries AFTER: ', finalSessionResult.thisSessionsQueries);
  const finalResult = await chrome.storage.local.get(['selectedQueries']);
  console.log('final AFTER: ', finalResult.selectedQueries);
};

export default saveSelectedQueryKeys;