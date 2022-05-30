import { useState } from "react";
import { nanoid } from "nanoid";
import { getDatabase, child, ref, set, get } from "firebase/database";
import { isWebUri } from "valid-url";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Form = () => {
  const [formData, setFormData] = useState({
    longURL: "",
    generatedURL: "",
    loading: false,
    errors: [],
    errorMessages: {},
    toolTipMessage: "Copy To Clipboard",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      loading: true,
      generatedURL: "",
    });

    // validate the user input
    var isFormValid = validateInput();
    if (!isFormValid) {
      return;
    }

    var generatedKey = nanoid(5);
    var generatedURL = "smallurl.com/" + generatedKey;

    const db = getDatabase();
    set(ref(db, "/" + generatedKey), {
      generatedKey: generatedKey,
      longURL: formData.longURL,
      generatedURL: generatedURL,
    })
      .then((result) => {
        setFormData({
          ...formData,
          generatedURL: generatedURL,
          loading: false,
          errors: [],
        });
      })
      .catch((e) => {
        //handle error
      });
  };

  //haserror
  //Checks if feild has an error
  const hasError = (key) => {
    return formData.errors.indexOf(key) !== -1;
  };

  // handle change
  // Save the content of the form as the user is typing!
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(() => ({
      ...formData,
      [id]: value,
    }));
  };

  const validateInput = () => {
    var errors = [];
    var errorMessages = formData.errorMessages;

    //Validate Long URL
    if (formData.longURL.length === 0) {
      errors.push("longURL");
      errorMessages["longURL"] = "Please enter your URL!";
    } else if (!isWebUri(formData.longURL)) {
      errors.push("longURL");
      errorMessages["longURL"] = "Please a URL in the form of https://www....";
    }

    setFormData({
      ...formData,
      errors: errors,
      errorMessages: errorMessages,
      // loading: false,
    });

    if (errors.length > 0) {
      return false;
    }
    return true;
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(formData.generatedURL);
    setFormData({
      ...formData,
      toolTipMessage: "Copied!",
    });
  };

  return (
    <div className="container">
      <form autoComplete="off">
        <h3>Small URL</h3>

        <div className="form-group">
          <label>Enter Your Long URL</label>
          <input
            id="longURL"
            onChange={handleChange}
            value={formData.longURL}
            type="url"
            required
            placeholder="https://www..."
            className={
              hasError("longURL") ? "form-control is-invalid" : "form-control"
            }
          />
        </div>
        <div
          className={hasError("longURL") ? "text-danger" : "visually-hidden"}
        >
          {formData.errorMessages.longURL}
        </div>

        <button className="btn btn-primary" type="button" onClick={onSubmit}>
          {formData.loading ? (
            <div>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </div>
          ) : (
            <div>
              <span
                className="visually-hidden spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span>Squeez</span>
            </div>
          )}
        </button>

        {formData.generatedURL === "" ? (
          <div></div>
        ) : (
          <div className="generatedurl">
            <span>Your generated URL is: </span>
            <div className="input-group mb-3">
              <input
                disabled
                type="text"
                value={formData.generatedURL}
                className="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <OverlayTrigger
                  key={"top"}
                  placement={"top"}
                  overlay={
                    <Tooltip id={`tooltip-${"top"}`}>
                      {formData.toolTipMessage}
                    </Tooltip>
                  }
                >
                  <button
                    onClick={copyToClipBoard}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Tooltip on top"
                    className="btn btn-outline-secondary"
                    type="button"
                  >
                    Copy
                  </button>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
