import React, { FC, memo, ReactEventHandler, useEffect, useRef, useState } from 'react';
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import { Avatar } from '@mui/material';
import { useSpring, animated } from 'react-spring';
interface Props {}

const Introduction: FC<Props> = (props) => {
  const [step, setStep] = useState(0);
  const [enableRoleTyping, setEnableRoleTyping] = useState(false);
  const [springStyle, springAction] = useSpring(() => ({
    opacity: 0,
    display: 'none',
    transform: 'translateY(-100px)',
  }));
  function onInitTypewriter(typewriter: TypewriterClass) {
    const string1 = "I'm Nghiem Xuan Hau. ";
    typewriter
      .typeString('Hi. ')
      .pauseFor(1500)
      .typeString(string1)
      .pauseFor(1000)
      .deleteAll(20)
      .callFunction(async (state) => {
        springAction.start({
          to: {
            opacity: 1,
            display: 'flex',
            transform: 'translateY(0)',
          },
          config: {
            duration: 500,
          },
        });
      })
      .pauseFor(500)
      .callFunction(() => setStep(1))
      .start();
  }

  function onInitTypewriterMe(typewriter: TypewriterClass) {
    typewriter.typeString("I'm a").callFunction(() => setEnableRoleTyping(true));
    typewriter.start();
  }

  return (
    <div className="h-screen w-screen bg-jacartar flex flex-col justify-center items-center text-white">
      <animated.div style={springStyle} className="flex flex-col items-center">
        <Avatar
          src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
          sx={{ width: 100, height: 100 }}
          alt="Avatar"
        />
        <span className="font-bold text-4xl mt-6">Nghiem Xuan Hau</span>
      </animated.div>
      <div className="text-white text-4xl mt-6">
        {step === 0 && <Typewriter onInit={onInitTypewriter} options={{ autoStart: true }} />}
        {step === 1 && (
          <div className="flex">
            {enableRoleTyping ? (
              <>
                {"I'm a"}
                &nbsp;
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: true,
                    strings: [
                      '<b>Full-stack Developer</b>',
                      '<b>Flutter Developer</b>',
                      '<b>React Native Developer</b>',
                      '<b>Web Developer</b>',
                      '<b>Music Enthusiast</b>',
                    ],
                  }}
                />
              </>
            ) : (
              <Typewriter onInit={onInitTypewriterMe} options={{ autoStart: true }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Introduction);
