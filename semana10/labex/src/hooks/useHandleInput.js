import { useState } from "react";

export default function useHandleInput() {
  const [ value, setValue ] = useState("");

  function onChange(event) {
    setValue(event.target.value);
  }

  return [ value, onChange ];
}
