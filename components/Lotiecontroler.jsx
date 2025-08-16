import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Lotiecontroler = ({src, label="name a btn",className,cl,onClick}) => {
  const [play, setplay] = useState(null);

  const handleMouseEnter = () => {
   
    if (play) {
      play.setLoop(true); // enable infinite loop
      play.play();
      // start playing
    }
  };
  return (
    <>
      <button
        type="button"
       className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => play?.stop()}
        onClick={onClick}
      >
        <DotLottieReact
          src={src}
          loop={false}
          autoplay={false}
          dotLottieRefCallback={setplay}
          className={cl}
        />
        {label}
      </button>
    </>
  );
};

export default Lotiecontroler;
