import clsx from "clsx";

const SupportBox = ({ icon, text, onClick, className }) => {
  return (
    <div className="bg-light-2 radius f-center of-hidden">
      <button
        className={clsx(
          "bg-hover w-100 h-100 f-center g-5 color-dark font-bold py-5 px-10",
          className
        )}
        onClick={onClick}
      >
        <div className="font-14 f-center">{icon}</div>
        {text ? <p>{text}</p> : null}
      </button>
    </div>
  );
};

export default SupportBox;
