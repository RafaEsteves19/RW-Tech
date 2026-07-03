import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import "./CustomSelect.css";

function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Selecione uma opção",
}) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  function getValue(option) {
    return typeof option === "string"
      ? option
      : option.value;
  }

  function getLabel(option) {
    return typeof option === "string"
      ? option
      : option.label;
  }

  const selected = options.find(
    (option) => getValue(option) === value
  );

  return (
    <div
      className="custom-select"
      ref={selectRef}
    >
      <div
        className="custom-select-trigger"
        onClick={() => setOpen(!open)}
      >
        <span
          className={
            selected
              ? "custom-select-value"
              : "custom-select-placeholder"
          }
        >
          {selected
            ? getLabel(selected)
            : placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`arrow ${
            open ? "rotate" : ""
          }`}
        />
      </div>

      {open && (
        <div className="custom-select-menu">

          {options.map((option) => {

            const optionValue = getValue(option);

            return (
              <div
                key={optionValue}
                className={`custom-select-option ${
                  optionValue === value
                    ? "selected"
                    : ""
                }`}
                onClick={() => {
                  onChange(optionValue);
                  setOpen(false);
                }}
              >
                {getLabel(option)}
              </div>
            );

          })}

        </div>
      )}

    </div>
  );
}

export default CustomSelect;