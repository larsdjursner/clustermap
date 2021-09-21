import { useState } from "react";
import { Switch } from "@headlessui/react";

const DarkModeToggle = () => {
  const [enabled, setEnabled] = useState(false);
  

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? "bg-gray-600" : "bg-gray-200"
      } relative inline-flex items-center h-5 rounded-full w-11`}
    >
      <span className="sr-only">Darkmode</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform bg-white rounded-full`}
      />
    </Switch>
  );
};

export default DarkModeToggle;