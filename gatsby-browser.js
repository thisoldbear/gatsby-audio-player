import React from "react"

import AudioContextProvider from "./src/context/audio";

export const wrapRootElement = ({ element }) => (
  <AudioContextProvider>{element}</AudioContextProvider>
)