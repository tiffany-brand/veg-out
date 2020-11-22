import * as React from 'react';

// click function canhappen inside the return here to only affect the actual path of the image creating precise clicks

// may need to pass click through depending on need

export function TestButton({stroke = "#8BC53F"}) {

  const clickTest = () =>  {
    console.log("clicked me");
  }

  return (
    <svg onClick={clickTest} viewBox="0 0 32 32" height={90} width={90}>
        <path
          d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zM32 10.7v14.9c0 2.3-1.9 4.3-4.3 4.3H4.3C1.9 29.9 0 28 0 25.6v-15c0-2.3 1.9-4.3 4.3-4.3H8L8.8 4c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"
          color="currentColor"
        />
    </svg>
  )
};

// localhost:5000/api/characterchoices/seed
// localhost:5000/api/users/seed
// localhost:5000/api/veggies/seed