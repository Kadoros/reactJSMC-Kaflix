import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: raw;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BoxVariants = {
  entry: (isBack: boolean) => ({
    x: isBack? -500: 500,
    opacity: 0,
    scale: 0,
  }),
  centre: {
    opacity: 1,
    scale: 1,
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack? 500: -500,
    opacity: 0,
    scale: 0,
  }),
};

function App() {
  const [visible, setvisible] = useState(1);
  const [back, setback] = useState(false);
  const next = () => {
    setback(false);
    setvisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prev = () => {
    setback(true);
    setvisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  return (
    <Wrapper>
      <AnimatePresence custom={back}>
        <Box
          key={visible}
          custom={back}
          variants={BoxVariants}
          initial="entry"
          animate="centre"
          exit="exit"
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
    </Wrapper>
  );
}

export default App;
