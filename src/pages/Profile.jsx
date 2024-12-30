import { useContext, useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faCalendar,
  faCamera,
  faCheck,
  faEdit,
  faFileAlt,
  faIcons,
  faLeaf,
  faLocationDot,
  faMap,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "../components/Popup";
import usePopup from "../Hooks/usePopup";
import Scroller from "../components/Scroller";
import Edit from "../components/popaps/Edit";
import useUpdate from "../Hooks/useUpdate";
import Gallery from "../components/popaps/Gallery";
import { db } from "../Constants/Firebase";
import { collection, where } from "firebase/firestore";
import { RefreshContext } from "../Contexts/RefreshContext";
import Cookies from "js-cookie";

const Profile = () => {
  const profile = JSON.parse(Cookies.get('profile'));

  const edit_mode = true;

  //Portal Setup
  const {
    handle: handleGallery,
    close: closeGallery,
    data: galleryData,
  } = usePopup();

  const { handle: handleEdit, close: closeEdit, data: editData } = usePopup();

  const information_Data = [
    {
      icon: <FontAwesomeIcon icon={faLeaf} />,
      name: "الحساب",
      value: profile.type ,
    },
    {
      icon: <FontAwesomeIcon icon={faLocationDot} />,
      name: "الدولة",
      value: profile.country ,
    },
    {
      icon: <FontAwesomeIcon icon={faMap} />,
      name: "المدينة",
      value: profile.city ,
    },
    {
      icon: <FontAwesomeIcon icon={faPhone} />,
      name: "الهاتف",
      value: profile.phone ,
    },
    {
      icon: <FontAwesomeIcon icon={faCalendar} />,
      name: "الميلاد",
      value: profile.birthday && profile.birthday.toDate().toLocaleDateString("en-GB")
    },
  ];

  const {
    updateData,
    loading: updateLoading,
    error: updateError,
  } = useUpdate("users");

  const { setRefreshAuth } = useContext(RefreshContext);

  const [fel, setFel] = useState();
  
  const cloudName = "dzywoxyan"; 
  const uploadPreset = "forsa_app";

  const handleImages = (event, field) => {
    setFel(field);
    const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      // Use Cloudinary API to upload the image
      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        const newImage = data.secure_url;
        const localData = {
          [field]: newImage,
        }
        updateData({
          id: profile.id,
          data: localData,
        }).then(() => {
          Cookies.set("profile", JSON.stringify({...profile, ...localData}));
        });
    })
  };

  return (
    <>
      <div className="w-100">
        <div className="p-20 box">
          <div className="w-100 p-relative radius">
            <div
              className="profile-bg w-100 p-relative radius of-hidden c-pointer"
              style={{ height: "300px" }}
            >
              <img
                src={profile.background}
                alt="Background"
                className="w-100 h-100 fit-cover select-none"
                onClick={() =>
                  profile.background
                    ? handleGallery({ imgs: [profile.background], idx: 0 })
                    : null
                }
              />
              {edit_mode ? (
                <>
                  <label
                    htmlFor="bg-id-btn"
                    className="p-absolute right-20 bottom-20 font-16 px-10 py-6 bg-main font-bold radius color-light-0 d-flex j-content-line g-5"
                  >
                    <div className="f-center font-14 mt-1">
                      <FontAwesomeIcon icon={faEdit} />
                    </div>
                    {updateLoading && fel === "background" ? (
                      <p>تحميل...</p>
                    ) : (
                      <p>
                        تعديل<span className="lg:d-none"> الغلاف</span>
                      </p>
                    )}
                  </label>
                  <input
                    id="bg-id-btn"
                    className="d-none"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImages(e, "background")}
                  />
                </>
              ) : null}
            </div>
            <div
              className="p-absolute circle ol-5-light-0 f-center pointer"
              style={{
                width: "160px",
                height: "160px",
                bottom: "-75px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {profile.image ? (
                <img
                  src={profile.image}
                  alt="Account"
                  className="w-100 h-100 fit-cover circle select-none before-circle"
                  onClick={() => handleGallery({ imgs: [profile.image], idx: 0 })}
                />
              ) : (
                <div className="w-100 h-100 bg-main circle f-center color-light-0 font-64">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              )}
              {edit_mode ? (
                <>
                  <label
                    htmlFor="image-id-btn"
                    className="p-absolute right-5 bottom-5 w-25 h-25 circle bg-main color-light-0 ol-5-light-0 font-16 f-center index-10 c-pointer"
                  >
                    {updateLoading && fel === "image" ? (
                      <div class="loader"></div>
                    ) : (
                      <div className="f-center font-16">
                        <FontAwesomeIcon icon={faCamera} />
                      </div>
                    )}
                  </label>
                  <input
                    id="image-id-btn"
                    className="d-none"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImages(e, "image")}
                  />
                </>
              ) : null}
            </div>
          </div>
          <div className="mt-85 d-flex f-dir-col a-items-center">
            <h3
              className={clsx(
                "w-fit f-center g-5 color-dark line-height-1"
              )}
            >
              {profile.first_name + " " + profile.last_name}
              {
                profile.documented ? (
                  <div className="w-16-px h-16-px mt-3 radius bg-main color-light-0 font-10 f-center">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                ) : null
              }
            </h3>
            <p
              className={clsx(
                "w-fit color-light-6",
              )}
            >
              {"@" + profile.user_name}
            </p>
          </div>
        </div>
        <div className="w-100 mt-10 d-flex f-wrap gr-10">
          <div className="col-4 lg:col-12 d-flex f-dir-col g-10">
            <div className="box d-flex f-dir-col g-10">
              <div className="ir-grid">
                <div className="f-center color-dark">
                  <FontAwesomeIcon icon={faFileAlt} />
                </div>
                <h4 className="color-dark">معلومات الحساب</h4>
              </div>
              <div className="hr-100" />
              {information_Data.map((doc, idx) =>
                doc.value ? (
                  <div key={idx} className="un-grid">
                    <div className="f-center color-dark">{doc.icon}</div>
                    <h4 className="color-dark">{doc.name}</h4>
                    <p>
                      {doc.value}
                    </p>
                  </div>
                ) : null
              )}
            </div>
            {profile.biography ? (
              <div className="box d-flex f-dir-col g-10">
                <div className="ir-grid">
                  <div className="f-center color-dark">
                    <FontAwesomeIcon icon={faAlignLeft} />
                  </div>
                  <h4 className="color-dark">السيرة الذاتية</h4>
                </div>
                <div className="hr-100" />
                <p
                  className={clsx("color-light-7")}
                  dangerouslySetInnerHTML={{
                    __html: profile.biography
                  }}
                ></p>
              </div>
            ) : null}
            {profile.skills.length !== 0 ? (
              <div className="box d-flex f-dir-col g-10">
                <div className="ir-grid">
                  <div className="f-center color-dark">
                    <FontAwesomeIcon icon={faIcons} />
                  </div>
                  <h4 className="color-dark">المهارات</h4>
                </div>
                <div className="hr-100" />
                <div className="d-flex f-wrap g-5">
                  {profile.skills.map((skill, idx) => (
                    <small
                      key={idx}
                      className={
                        "py-5 px-10 bg-main radius color-light-0 font-bold b-1-main"
                      }
                    >
                      {skill}
                    </small>
                  ))}
                </div>
              </div>
            ) : null}
            {edit_mode ? (
              <button
                className="bg-main w-100 p-8 radius font-bold color-light-0 f-center g-8 c-pointer"
                onClick={handleEdit}
              >
                <div className="f-center">
                  <FontAwesomeIcon icon={faEdit} />
                </div>
                <p>تعديل الحساب</p>
              </button>
            ) : null}
          </div>
          <div className="col-8 lg:col-12 pr-20 lg:p-0">
              <Scroller
                type="posts"
                column={collection(db, "posts")}
                conditions={where("user_id", "==", profile.id)}
              />
          </div>
        </div>
      </div>
      {galleryData.active ? (
        <Popup close={closeGallery}>
          <Gallery data={galleryData} close={closeGallery} />
        </Popup>
      ) : null}

      {editData.active ? (
        <Popup close={closeEdit}>
          <Edit id={profile.email} data={profile} close={closeEdit} />
        </Popup>
      ) : null}
    </>
  );
};

export default Profile;
