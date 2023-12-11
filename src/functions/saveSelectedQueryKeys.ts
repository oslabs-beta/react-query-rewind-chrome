
const saveSelectedQueryKeys = async (queries: string[]) => {
  // *** Persisting Query Selection ***
  // this is complex because we may store queries that are not yet visible in the drop-down

  // *** Refactor notes: handle errors (maybe update to promises)

  // set thisSessionsQueries to the queries array the function takes in because on page load, queries will be an empty array, effectively resetting it. If queries is an empty array, we initialize it here to an empty array. When queries is not empty, we will set it at the end of the function
  if (queries.length === 0) {
    await chrome.storage.local.set({ thisSessionsQueries: queries });
  }

  // to allow users to remove queries, we will separately store the data from the session as "thisSessionsQueries" - this will allow us to see when a query has been removed
  const queriesSet = new Set(queries);
  chrome.storage.local.get(['thisSessionsQueries'], (result) => {
    if (
      result.thisSessionsQueries &&
      Array.isArray(result.thisSessionsQueries)
    ) {
      const queriesRemoved: string[] = [];
      for (const queryKey of result.thisSessionsQueries) {
        if (!queriesSet.has(queryKey)) {
          queriesRemoved.push(queryKey);
        }
      }

      // get the query keys that were stored from previous sessions
      chrome.storage.local.get(['selectedQueries'], (result) => {
        // get the queries out of local storage and store them as an array
        let existingQueries: string[] = [];
        if (result.selectedQueries && Array.isArray(result.selectedQueries)) {
          existingQueries = result.selectedQueries;
        }

        // combine existing queries with the new ones and handle duplicates
        const combinedQueries = new Set([...existingQueries, ...queries]);
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
        chrome.storage.local.set({
          selectedQueries: combinedQueriesWithRemovals,
        });

        // update storage for current session's selections
        chrome.storage.local.set({ thisSessionsQueries: queries });
      });
    }
  });
};

export default saveSelectedQueryKeys;