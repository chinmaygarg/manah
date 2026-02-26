"use client";

import { useState, useRef, useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

interface SelectProps {
  readonly options: readonly SelectOption[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly id?: string;
  readonly name?: string;
}

const EXPO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -4,
    scale: 0.98,
    transition: { duration: 0.15, ease: EXPO_EASE },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: EXPO_EASE },
  },
};

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  required,
  id,
  name,
}: SelectProps) {
  const reactId = useId();
  const resolvedId = id ?? reactId;

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
    buttonRef.current?.focus();
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeDropdown]);

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("[role='option']");
      items[focusedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  function handleSelect(optionValue: string) {
    onChange(optionValue);
    closeDropdown();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "Enter":
      case " ": {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(
            options.findIndex((opt) => opt.value === value)
          );
        } else if (focusedIndex >= 0 && focusedIndex < options.length) {
          handleSelect(options[focusedIndex].value);
        }
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0
          );
        }
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : options.length - 1
          );
        }
        break;
      }
      case "Home": {
        e.preventDefault();
        if (isOpen) setFocusedIndex(0);
        break;
      }
      case "End": {
        e.preventDefault();
        if (isOpen) setFocusedIndex(options.length - 1);
        break;
      }
      case "Escape": {
        e.preventDefault();
        closeDropdown();
        break;
      }
      case "Tab": {
        closeDropdown();
        break;
      }
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden native input for form submission and validation */}
      {name && (
        <input
          type="text"
          name={name}
          value={value}
          required={required}
          tabIndex={-1}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
          onChange={() => {}}
        />
      )}

      {/* Trigger button */}
      <button
        ref={buttonRef}
        type="button"
        id={resolvedId}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${resolvedId}-listbox`}
        onClick={() => {
          setIsOpen((prev) => !prev);
          if (!isOpen) {
            setFocusedIndex(options.findIndex((opt) => opt.value === value));
          }
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full flex items-center justify-between gap-2",
          "px-4 py-3 rounded-lg border text-body-md text-left",
          "transition-all duration-200 bg-white cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-manah-gold/40 focus:border-manah-gold",
          isOpen
            ? "border-manah-gold ring-2 ring-manah-gold/40"
            : "border-manah-gray-200 hover:border-manah-gray-300",
          selectedOption ? "text-manah-gray-700" : "text-manah-gray-400"
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 shrink-0 text-manah-gray-400 transition-transform duration-200",
            isOpen && "rotate-180 text-manah-gold"
          )}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute z-50 w-full mt-1.5"
          >
            <ul
              ref={listRef}
              id={`${resolvedId}-listbox`}
              role="listbox"
              aria-activedescendant={
                focusedIndex >= 0
                  ? `${resolvedId}-option-${focusedIndex}`
                  : undefined
              }
              className={cn(
                "bg-white rounded-xl border border-manah-gray-200/70",
                "shadow-glass-lg py-1.5 max-h-60 overflow-auto",
                "no-scrollbar"
              )}
            >
              {options.map((option, index) => {
                const isSelected = option.value === value;
                const isFocused = index === focusedIndex;

                return (
                  <li
                    key={option.value}
                    id={`${resolvedId}-option-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option.value)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={cn(
                      "flex items-center justify-between gap-2",
                      "px-4 py-2.5 mx-1.5 rounded-lg text-body-md cursor-pointer",
                      "transition-colors duration-100",
                      isSelected && !isFocused &&
                        "text-manah-gold font-medium",
                      isFocused &&
                        "bg-manah-gold/[0.08] text-manah-navy",
                      !isSelected && !isFocused &&
                        "text-manah-gray-600"
                    )}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 shrink-0 text-manah-gold" />
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
