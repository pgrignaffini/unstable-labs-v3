import { useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import Toast from "@components/Toast";

interface Props {
  className?: string;
  onClick?: () => void;
  text?: string;
  rounded?: boolean;
  label?: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  color: "green" | "red" | "blue";
  error?: boolean;
}

function SolidButton({
  className,
  onClick,
  text,
  rounded,
  label,
  type,
  loading,
  color,
  error,
}: Props) {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <button
        type={type}
        disabled={loading}
        className={`relative outline-none ${className}`}
        onPointerOver={() => setClicked(false)}
        onClick={() => {
          setClicked(true);
          if (error) {
            toast.custom((t) => (
              <Toast
                toastInfo={t}
                message="You need to connect your wallet to perform this action"
                error
              />
            ));
            return;
          }
          onClick?.();
        }}
      >
        <div
          className={`absolute inset-x-0 -bottom-2 h-full 
        ${
          color === "green"
            ? "bg-dark-acid"
            : color === "red"
            ? "bg-red-900"
            : "bg-blue-900"
        }
        ${rounded ? "rounded-full" : null}`}
        />
        <label htmlFor={label} className="cursor-pointer ">
          <div
            className={`${
              rounded ? "rounded-full" : "px-4"
            } relative flex items-end space-x-2
                  ${
                    color === "green"
                      ? "bg-acid"
                      : color === "red"
                      ? "bg-red-600"
                      : "bg-blue-600"
                  }
                  transform py-4 transition duration-500 ${
                    clicked ? "hover:translate-y-2" : "hover:translate-y-1"
                  }`}
          >
            <p>{text}</p>
            {loading ? (
              <img src="/flask.png" className="h-7 w-5 animate-tremble" />
            ) : (
              <></>
            )}
          </div>
        </label>
      </button>
    </>
  );
}

export default SolidButton;
