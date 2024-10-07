// import React, { useEffect, useState } from 'react';

// const Timer = ({ min, startTimer }) => {
//   const [minutes, setMinutes] = useState(min);
//   const [seconds, setSeconds] = useState(0);

//   useEffect(() => {
//     if (startTimer) {
//       const interval = setInterval(() => {
//         if (seconds === 0) {
//           if (minutes === 0) {
//             clearInterval(interval);
//           } else {
//             setMinutes(minutes - 1);
//             setSeconds(59);
//           }
//         } else {
//           setSeconds(seconds - 1);
//         }
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [seconds, startTimer]);

//   return (
//     <div>
//       {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
//     </div>
//   );
// };

// export default Timer;
