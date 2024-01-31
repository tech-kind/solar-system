import React from "react";
import {
  useDisplayOptions,
  useToggleDisplayOptions,
} from "../context/AppContext/hooks";
import { BiCog, BiX } from "react-icons/bi";
import "./SettingsButton.scss";

const SettingsButton = () => {
  const toggle = useToggleDisplayOptions();
  const display = useDisplayOptions();

  const cn = React.useMemo(
    () =>
      display ? "settings-button-close setting-button" : "settings-button",
    [display]
  );

  return (
    <div className={cn} onClick={toggle}>
      {display ? <BiX size={24} /> : <BiCog size={24} />}
    </div>
  );
};

export default SettingsButton;
