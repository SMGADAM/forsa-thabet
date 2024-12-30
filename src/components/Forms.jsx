import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Form = ({ children, onSubmit }) => {
  return (
    <form
      className="box a-center f-center g-20 f-dir-col"
      style={{ maxWidth: "500px", minWidth: "300px" }}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export const PremHeader = ({ PremText = "", NormText = "" }) => {
  return (
    <h1 className="color-light-6">
      <span className="color-main">{PremText}</span> {NormText}
    </h1>
  );
};

export const InpField = ({
  type = "",
  name = "",
  text = "",
  short = "",
  icon,
  click = { type: "", icon },
  nav = { text: "", href: "" },
  formik,
  error,
}) => {
  const navigate = useNavigate();
  const [cond, setCond] = useState(false);

  const HandleClick = () => {
    setCond((data) => !data);
  };

  return (
    <div className="w-100">
      <div
        className={clsx(
          "w-100 h-30-px bb-1-main px-5 f-center g-10",
          formik.errors[name] && formik.touched[name] ? "bb-1-red" : ""
        )}
      >
        <input
          type={cond ? click.type : type}
          name={name}
          placeholder={text}
          className="prime-btn w-100 h-100 color-dark font-bold font-14"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div
          className={clsx(
            "f-center font-14 color-light-7",
            click.icon,
            click.type ? "c-pointer" : ""
          )}
          onClick={HandleClick}
        >
          {cond ? click.icon : icon}
        </div>
      </div>
      <div className="d-flex f-wrap g-5 a-items-line j-content-between">
        <div className="px-5 color-light-5">
          <small className="font-12 font-bold">
            {short}{" "}
            {nav.text.length && nav.href.length ? (
              <span
                className="color-main c-pointer"
                onClick={() => navigate(nav.href)}
              >
                {nav.text}
              </span>
            ) : null}
          </small>
        </div>
        {error || (formik.errors[name] && formik.touched[name]) ? (
          <div className="p-relative pl-20 pr-5 ml-auto color-red d-flex a-items-line g-3 no-space">
            <div className="p-absolute font-12 color-red left-5 top-1">
              <FontAwesomeIcon icon={faCircleExclamation} />
            </div>
            <small>
              {formik.errors[name]}
              {error && "passowrd or email is wrong"}
            </small>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const DoubleBtn = ({ nav = "", textOne = "submit", textTwo = "" }) => {
  const navigate = useNavigate();

  return (
    <div
      className="h-30-px d-flex j-content-center g-10"
      style={{ width: "350px" }}
    >
      <input
        type="submit"
        className="col-8 radius font-bold c-pointer bg-main color-light-0 opacity-hover"
        value={textOne}
      />
      <input
        type="button"
        className="col-4 radius font-bold c-pointer b-1-main color-main opacity-hover"
        value={textTwo}
        onClick={() => navigate(nav)}
      />
    </div>
  );
};
