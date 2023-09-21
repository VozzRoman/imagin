import scss from "../SerachForm/SerachForm.module.scss";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
const SerachForm = ({ handleFilterUser }) => {
  const [name, setName] = useState("");

  const handleOnChange = (e) => {
    setName(e.target.value);
  };
  const handelSubmit = (e) => {
    e.preventDefault();

    handleFilterUser(name.toLowerCase());
    //  setName("");
  };
  return (
    <>
      <form className={scss.formBody} onSubmit={handelSubmit}>
        {" "}
        <input
          className={scss.allUsersinput}
          onChange={handleOnChange}
          type="text"
          name="name"
          placeholder="шукати користувача"
          value={name}
        />
        <button className={scss.formButton} type="submit">
          <FaSearch />
        </button>
      </form>
    </>
  );
};
export default SerachForm;
