import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faAlignRight,
  faHouse,
  faIcons,
  faLocationDot,
  faPhone,
  faPlus,
  faSignature,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import useUpdate from "../../Hooks/useUpdate";
import Cookies from "js-cookie";

const Skill = ({ data, handleDelete }) => {
  return (
    <div className="py-5 px-10 bg-main radius color-light-0 font-bold b-1-main f-center g-5">
      <small>{data.object}</small>
      <button
        className="color-light-0 font-12 c-pointer"
        onFocus={() => handleDelete(data.id)}
      >
        <FontAwesomeIcon icon={faX} />
      </button>
    </div>
  );
};

const Field = ({ name,val, icon, formik, date }) => {
  return (
    <div className="w-100 p-relative d-flex f-dir-col j-content-center g-3">
      <label
        className="d-grid"
        style={{ gridTemplateColumns: "30px auto" }}
        htmlFor={name}
      >
        <div className="color-light-7 font-18 f-center">{icon}</div>
        <p className="color-light-7 font-16 font-bold">{val}</p>
      </label>
      <input
        type={date ? "date" : "text"}
        className={clsx(
          "color-light-7 w-100 font-16 px-10 py-5 radius",
          formik.errors[name] && formik.touched[name] ? "b-1-red" : "b-1"
        )}
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors[name] && formik.touched[name] ? (
        <small className="p-absolute bottom-m-18 right-5 font-12 error">
          {formik.errors[name]}
        </small>
      ) : null}
    </div>
  );
};

const Edit = ({ close, data }) => {
  const { updateData, loading, error } = useUpdate("users");

  const [biography, setBiography] = useState(data.biography);

  const [skills, setSkills] = useState(
    data.skills.map((skill, idx) => ({
      id: idx,
      object: skill.trim(),
    }))
  );

  const skillsRef = useRef(null);
  const handleSkills = (e) => {
    e.preventDefault();
    const skill = skillsRef.current.value.trim();
    if (!skills.includes(skill) && skill) {
      setSkills((prev) => [
        ...prev,
        {
          id: +Object.keys(skills).sort((a, b) => b - a)[0] + 1,
          object: skill,
        },
      ]);
    }
    skillsRef.current.value = "";
  };

  const handleDelete = (id) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      firstName: data.first_name,
      lastName: data.last_name,
      phone: data.phone,
      birthday:
        data.birthday && data.birthday.toDate().toLocaleDateString("en-GB"),
      country: data.country,
      city: data.city,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(),
      phone: Yup.string().matches(phoneRegExp, 'رقم الهاتف غير صحيح'),
    }),
    onSubmit: (values) => {
      if (formik.isValid) {
        try {
          const localData = {first_name: values.firstName,
            last_name: values.lastName,
            phone: values.phone,
            //birthday: new Date(values.birthday),
            country: values.country,
            city: values.city,
            biography: biography,
            skills: skills.map((e) => e.object)}
            
          updateData({
            id: data.id,
            data: localData,
          }).then(()=>{
            const profile = JSON.parse(Cookies.get("profile"));
            Cookies.set("profile", JSON.stringify({...profile, ...localData}));
            close(e=>e);
          })
        } catch (error) {
          alert(error.message);
        }
      }
    },
  });

  return (
    <form
      className="p-relative box d-grid"
      onSubmit={formik.handleSubmit}
      style={{
        maxHeight: "100%",
        width: "clamp(300px, 800px, 100%)",
        gridTemplateRows: "min-content 1fr min-content",
      }}
    >
      <div
        className="p-absolute top-10 right-10 bg-light-0 circle f-center c-pointer close-btn"
        style={{ width: "30px", height: "30px" }}
        onClick={close}
      >
        <div className="icon">
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>
      <h3 className="t-align-center mb-15 color-dark">تخصيص الملف الشخصي</h3>
      <div className="of-y-auto">
        <div className="d-flex f-dir-col g-15">
          <section className="d-flex j-content-between a-items-center g-10">
            <Field
              name="firstName"
              val="الاسم الأول"
              icon={<FontAwesomeIcon icon={faSignature} />}
              formik={formik}
            />
            <Field
              name="lastName"
              val="الاسم الثاني"
              icon={<FontAwesomeIcon icon={faSignature} />}
              formik={formik}
            />
          </section>
          <section className="d-flex j-content-between a-items-center g-10">
            <Field
              name="phone"
              val="الهاتف"
              icon={<FontAwesomeIcon icon={faPhone} />}
              formik={formik}
            />
            <Field
              name="birthday"
              val="تاريخ الميلاد"
              icon={<FontAwesomeIcon icon={faCalendar} />}
              formik={formik}
              date
            />
          </section>
          <section className="d-flex j-content-between a-items-center g-10">
            <Field
              name="country"
              val="الدولة"
              icon={<FontAwesomeIcon icon={faLocationDot} />}
              formik={formik}
            />
            <Field
              name="city"
              val="المدينة"
              icon={<FontAwesomeIcon icon={faHouse} />}
              formik={formik}
            />
          </section>
          <section className="d-flex j-content-between a-items-center g-10">
            <div className="w-100 p-relative d-flex f-dir-col j-content-center g-3">
              <label
                className="d-grid"
                style={{ gridTemplateColumns: "30px auto" }}
                htmlFor="biography"
              >
                <div className="color-light-7 font-18 f-center">
                  <FontAwesomeIcon icon={faAlignRight} />
                </div>
                <p className="color-light-7 font-16 font-bold">السيرة الذاتية</p>
              </label>
              <ReactQuill
                theme="snow"
                id="biography"
                value={biography}
                onChange={setBiography}
              />
            </div>
          </section>
          <section className="d-flex j-content-between a-items-center g-10">
            <div className="w-100 d-flex f-dir-col j-content-center g-3">
              <label
                className="d-grid"
                style={{ gridTemplateColumns: "30px auto" }}
                htmlFor="skills"
              >
                <div className="color-light-7 font-18 f-center">
                  <FontAwesomeIcon icon={faIcons} />
                </div>
                <p className="color-light-7 font-16 font-bold">المهارات</p>
              </label>
              <div
                className="w-100 d-flex a-items-center g-5"
                style={{ height: "32px" }}
              >
                <input
                  type="text"
                  className="w-100 h-100 font-16 p-5 b-1 radius"
                  id="skills"
                  name="skills"
                  ref={skillsRef}
                />
                <button
                  className="px-9 h-100 radius bg-main color-light-0 font-16"
                  onClick={handleSkills}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <small>المهارات المحددة</small>
              <div className="d-flex f-wrap g-5">
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <Skill
                      key={skill.id}
                      data={skill}
                      handleDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="py-5 px-10 bg-main radius color-light-0 font-bold b-1-main f-center">
                    <small>لا يوجد</small>
                  </div>
                )}
              </div>
            </div>
          </section>
          <input
            type="submit"
            className="w-100 bg-main p-7 radius font-bold color-light-1 c-pointer"
            value={loading ? "تحميل..." : "حفظ التغيرات"}
          />
        </div>
      </div>
    </form>
  );
};

export default Edit;
