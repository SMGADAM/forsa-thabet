import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import usePopup from "../../Hooks/usePopup";
import Popup from "../Popup";
import Gallery from "../popaps/Gallery";

const Images = ({ data, columns, loading = false }) => {
  const {
    handle: handleGallery,
    close: closeGallery,
    data: galleryData,
  } = usePopup();

  return (
    <>
      <div
        className={clsx(
          "w-100 p-relative bg-light-2 radius d-flex f-wrap of-hidden",
          { loading }
        )}
      >
        {data.images
          .slice(0, columns ? data.images.length : 4)
          .map((img, idx) => (
            <img
              key={idx}
              className={clsx("fit-cover select-none opacity-hover", {
                "col-2": columns,
                "col-ad": !columns,
              })}
              src={img}
              alt="pic"
              onClick={() => handleGallery({ imgs: data.images, idx })}
            />
          ))}
        {!columns && data.images.length > 12 && (
          <div className="w-50 h-50 p-absolute right-0 bottom-0 bg-light-6 color-light-0 f-center g-5 c-pointer index-2 more-imgs">
            <div className="icon">
              <FontAwesomeIcon icon={faPhotoFilm} />
            </div>
            <h3>المزيد</h3>
          </div>
        )}
      </div>
      {galleryData.active ? (
        <Popup close={closeGallery}>
          <Gallery data={galleryData} close={closeGallery} />
        </Popup>
      ) : null}
    </>
  );
};

export default Images;
