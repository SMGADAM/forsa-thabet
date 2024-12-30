const Categories = ({ data, loading = false }) => {
  return (
    <div className="d-flex a-items-center j-content-end f-wrap g-5 mr-auto">
      {loading ? (
        <small
          className={
            "py-5 px-10 bg-main radius color-light-0 font-bold b-1-main loading"
          }
        >
          Scholarship
        </small>
      ) : (
        data.map((category, idx) => (
          <small
            key={idx}
            className={
              "py-5 px-10 bg-main radius color-light-0 font-bold b-1-main"
            }
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </small>
        ))
      )}
    </div>
  );
};

export default Categories;
