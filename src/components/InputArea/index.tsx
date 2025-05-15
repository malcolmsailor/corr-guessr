import { GuessInput } from "./GuessInput";
import { GuessrContext } from "../../shared/context";
import { useContext, useRef } from "react";
import { NextButton } from "./NextButton";

export const InputArea = () => {
  const { appState } = useContext(GuessrContext);
  const guessInputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  if (!appState.guessActive) {
    return (
      <NextButton guessInputRef={guessInputRef} nextButtonRef={nextButtonRef} />
    );
  } else {
    return (
      <GuessInput guessInputRef={guessInputRef} nextButtonRef={nextButtonRef} />
    );
  }
};
