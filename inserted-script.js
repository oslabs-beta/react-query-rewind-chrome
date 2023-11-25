// This is included and executed in the inspected page
function inserted() {
	console.log('External script attached');
}
inserted();

//this grabs the user's application's store
// const store = window.store;


// //so jump to state does not add snapshots to the array
// let isRestoringState = false;
// //this adds a listener to the user's store so that whenever a change to their store happens, a snapshot of the state is made and sent in a message to our chrome dev tool
// store.subscribe(() => {
//   //check to make sure isRestoringState is false
//   if (!isRestoringState) {
//     //grabs a snapshot of state
//     const snapshot = store.getState();
//     //make the snapshot a string, otherwise it cannot be sent in a message
//     const stringSnapshot = JSON.stringify(snapshot);
//     //send message
//     window.postMessage({ body: 'stateSnapshot', snapshot: stringSnapshot });
//   }
// });

// //this is listening for messages from content script to time travel
// window.addEventListener('message', (event) => {
//   if (event.data.body === 'TIMETRAVEL') {
//     //we must parse the previous state from a string back into an object
//     const parsedPreviousState = JSON.parse(event.data.previousState);
//     //this sets the user's store back to its previous state
//     //set is restoring state to true so snapshots are temporarily ignored
//     isRestoringState = true;
//     store.setState(parsedPreviousState);
//     //set is restoring state back to false
//     isRestoringState = false;
//   }
// });