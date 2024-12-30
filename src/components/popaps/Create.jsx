import { useState, useCallback, useContext, useEffect, useRef } from "react";
import { collection, serverTimestamp } from "firebase/firestore";
import { faImage, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Publishee from "../card-system/Publishee";
import Images from "../card-system/Images";
import usePost from "../../Hooks/usePost";
import Info from "../card-system/Info";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//Defaults
import { db } from "../../Constants/Firebase";
import { RefreshContext } from "../../Contexts/RefreshContext";
import Cookies from "js-cookie";

const Create = ({ data, close }) => {
  const [categories, setCategories] = useState([]);
  const [topic, setTopic] = useState(data);
  const [images, setImages] = useState([]);

  //fetch
  const profile = JSON.parse(Cookies.get('profile'));

  //Categories
  const categoryRef = useRef(null);
  const addCategory = (e) => {
    e.preventDefault();
    const category = categoryRef.current.value.trim();
    if (!categories.includes(category) && category) {
      setCategories((prev) => [...prev, category]);
    }
    categoryRef.current.value = "";
  };
  const removeCategory = (e) => {
    e.preventDefault();
    const category = e.currentTarget.parentNode.firstChild.innerText;
    setCategories((prev) => prev.filter((cat) => cat !== category));
  };

  useEffect(() => {
    const enter = (event) => {
      if (event.key === "Enter") {
        addCategory();
      }
    };
    document.addEventListener("keypress", enter);
    return () => {
      document.removeEventListener("keypress", enter);
    };
  }, []);

  //Images
  const cloudName = "dzywoxyan"; 
  const uploadPreset = "forsa_app";

  const handleImages = (event) => {
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
      setImages((prev) => [...prev, newImage]);
    })
  };

  //submit
  const { refresh, setRefresh } = useContext(RefreshContext);
  const { postData, loading, error } = usePost(collection(db, "posts"));

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (topic !== "<p><br></p>") {
        await postData({
          user_id: profile.id,
          topic,
          categories,
          images,
          type: "post",
          comments: 0,
          supports: 0,
          supporters_id: [],
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        });
        setRefresh(true);
        setCategories([]);
        setTopic("");
        close();
      }
    },
    [topic, categories, images]
  );

  return (
    <form
      className="p-relative d-grid box g-10 p-10 color-dark"
      style={{
        maxHeight: "100%",
        width: "clamp(300px, 500px, 100%)",
        gridTemplateRows: "min-content 1fr min-content",
      }}
      onSubmit={handleSubmit}
    >
      <div className="w-100 t-align-center d-flex a-items-center j-content-between index-10">
          <div className="d-flex g-10">
            <Publishee data={{ user: { ...profile } }} />
            <Info data={{ user: { ...profile } }} type />
          </div>
        <button
          className="w-30-px h-30-px p-absolute top-10 left-10 font-16 bg-light-3 circle f-center c-pointer close-btn"
          onClick={close}
        >
          <div className="icon">
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </button>
      </div>
      <div className="of-y-auto">
        <div className="d-flex f-dir-col g-10">
          {error ? (
            <div className="p-7 d-flex radius bg-red color-light-0">
              <small>{error}</small>
            </div>
          ) : null}
          <div className="w-100">
            <div
              className="w-100 d-flex a-items-center g-5"
              style={{ height: "32px" }}
            >
              <input
                className="col h-100 radius p-7 b-1 focus"
                type="text"
                name="category"
                placeholder="أضف فئة"
                ref={categoryRef}
              />
              <button
                className="px-9 h-100 radius bg-main color-light-0 font-16"
                onClick={addCategory}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            {categories.length !== 0 && (
              <div className="w-fit d-flex f-wrap g-5 mt-5">
                {categories.map((category, idx) => (
                  <div
                    key={idx}
                    className="py-3 px-5 f-center g-3 radius bg-main color-light-0"
                  >
                    <small>{category}</small>
                    <button
                      className="icon color-light-0 mt-2"
                      onClick={removeCategory}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <ReactQuill theme="snow" value={topic} onChange={setTopic} />
          {images.length !== 0 && <Images data={{ images }} columns />}
        </div>
      </div>
      <div className="w-100 d-flex g-5 index-10">
        <label
          htmlFor="image-btn"
          className="h-100 w-42-px bg-light-0 radius color-light-0 bg-green font-16 f-center c-pointer icon"
        >
          <FontAwesomeIcon icon={faImage} />
        </label>
        <input
          id="image-btn"
          className="d-none"
          type="file"
          accept="image/*"
          onChange={handleImages}
        />
        <input
          className="w-100 bg-main color-light-1 font-bold b-10 index-10 b-0 radius p-7 c-pointer"
          type="submit"
          name="publish"
          value={loading ? "تحميل..." : "نشر"}
          disabled={!topic || topic === "<p><br></p>" || loading}
        />
      </div>
    </form>
  );
};

export default Create;
