// const handleAutoPlay = (
//   setIsPlaying,
//   setCurrentIndex,
//   setIntervalId,
//   currentIndex,
//   queryDisplay,
//   intervalId
// ) => {
//   setIsPlaying((prevIsPlaying: boolean) => {
//     if (!prevIsPlaying) {
//       if (currentIndex >= queryDisplay.length - 1) {
//         setCurrentIndex(0);
//       }

//       const newIntervalId = window.setInterval(() => {
//         setCurrentIndex((prevIndex: number) => {
//           if (prevIndex >= queryDisplay.length - 1) {
//             clearInterval(newIntervalId);
//             return prevIndex;
//           }
//           return prevIndex + 1;
//         });
//       }, 1000);

//       setIntervalId(newIntervalId);
//       return true;
//     } else {
//       // Stop playing
//       if (intervalId !== undefined) {
//         clearInterval(intervalId);
//         setIntervalId(undefined);
//       }
//       return false;
//     }
//   });
// };
