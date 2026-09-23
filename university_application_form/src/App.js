import './App.css';
import { useState } from 'react';

function App() {
  const [full_name, setFull_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [DOB, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  const [photo, setPhoto] = useState(null);
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [courseReason, setCourseReason] = useState("");

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    // Check Full Name
    if (full_name.trim() === "") {
      newErrors.full_name = "Name is required.";
    }

    // Check Phone Number
    if (phone_number.trim() === "") {
      newErrors.phone_number = "Phone Number is required.";
    }

    // Check Email
    if (email.trim() === "") {
      newErrors.email = "Email is required.";
    }

    // Check Date of Birth
    if (DOB === "") {
      newErrors.DOB = "Date of Birth is required.";
    }

    // Check Gender
    if (gender === "") {
      newErrors.gender = "Gender is required.";
    }

    // Check Course
    if (course === "") {
      newErrors.course = "Course is required.";
    }

    // Check Course Reason
    if (courseReason.trim() === "") {
      newErrors.courseReason = "Course Reason is required.";
    }

    // Check Terms
    if (!agreeToTerms) {
      newErrors.agreeToTerms = "You must accept the terms.";
    }

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
      return;
    }

    // Everything is valid
    setErrors({});
    setSubmitted(true);

    console.log("Application Information:", {
      full_name,
      phone_number,
      email,
      DOB,
      gender,
      address,
      emergencyName,
      emergencyPhone,
      course,
      courseReason,
      photo
    });

    alert("Application submitted successfully!");
  }

  function handleReset() {
    setFull_name("");
    setPhone_number("");
    setEmail("");
    setDOB("");
    setAddress("");
    setEmergencyName("");
    setEmergencyPhone("");

    setPhoto(null);
    setGender("");
    setCourse("");
    setAgreeToTerms(false);
    setCourseReason("");

    setErrors({});
    setSubmitted(false);
  }

  return (
    <div className="App">
      <h1>University Application Form</h1>

      <form onSubmit={handleSubmit}>

        {/* PERSONAL DATA */}
        <div>
          <label className="data">Personal Data</label>

          <br />

          <input
            className="inputName"
            type="text"
            value={full_name}
            onChange={(e) => setFull_name(e.target.value)}
          />

          <input
            className="DOB"
            type="date"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
          />

          <br />

          <label className="name">
            Full Name ↵
          </label>

          <label className="dob">
            Date of Birth ↵
          </label>

          {/* Name Error */}
          {errors.full_name && (
            <p className="error">
              {errors.full_name}
            </p>
          )}

          {/* DOB Error */}
          {errors.DOB && (
            <p className="error">
              {errors.DOB}
            </p>
          )}
        </div>


        {/* GENDER */}
        <div className="gender">
          <label>Gender: </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={gender === "Other"}
              onChange={(e) => setGender(e.target.value)}
            />
            Other
          </label>

          {/* Gender Error */}
          {errors.gender && (
            <p className="error">
              {errors.gender}
            </p>
          )}
        </div>


        {/* CONTACT INFORMATION */}
        <div>
          <label className="contact">
            Contact Information
          </label>

          <br />

          <input
            className="inputAddress"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <br />

          <label className="address">
            Address ↵
          </label>
        </div>


        {/* PHONE AND EMAIL */}
        <div>
          <input
            className="inputPhone"
            type="text"
            value={phone_number}
            onChange={(e) => setPhone_number(e.target.value)}
          />

          <input
            className="inputEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />

          <label className="phone">
            Phone Number ↵
          </label>

          <label className="email">
            Email ↵
          </label>

          {/* Phone Error */}
          {errors.phone_number && (
            <p className="error">
              {errors.phone_number}
            </p>
          )}

          {/* Email Error */}
          {errors.email && (
            <p className="error">
              {errors.email}
            </p>
          )}
        </div>


        {/* EMERGENCY CONTACT */}
        <div>
          <label className="E">
            Contact In Emergency Situation
          </label>

          <br />

          <input
            className="inputEName"
            type="text"
            value={emergencyName}
            onChange={(e) => setEmergencyName(e.target.value)}
          />

          <input
            className="inputEPhone"
            type="text"
            value={emergencyPhone}
            onChange={(e) => setEmergencyPhone(e.target.value)}
          />

          <br />

          <label className="EName">
            Name ↵
          </label>

          <label className="EPhone">
            Phone Number ↵
          </label>
        </div>


        {/* COURSE INFORMATION */}
        <div>
          <label className="courseInfo">
            Course Information
          </label>

          <br />

          <label className="course">
            Course:
          </label>

          <select
            className="selectCourse"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">
              -- Select Course --
            </option>

            <option value="Computer Science">
              Computer Science
            </option>

            <option value="Information Technology">
              Information Technology
            </option>

            <option value="Business">
              Business
            </option>

            <option value="Engineering">
              Engineering
            </option>

            <option value="Design">
              Design
            </option>
          </select>

          {/* Course Error */}
          {errors.course && (
            <p className="error">
              {errors.course}
            </p>
          )}

          <p></p>


          {/* COURSE REASON */}
          <textarea
            className="inputCourseReason"
            value={courseReason}
            onChange={(e) => setCourseReason(e.target.value)}
          />

          <br />

          <label className="courseReason">
            Reason For Choosing This Course ↵
          </label>

          {/* Course Reason Error */}
          {errors.courseReason && (
            <p className="error">
              {errors.courseReason}
            </p>
          )}

          <p></p>


          {/* TERMS */}
          <label className="agree">
            <input
              type="checkbox"
              className="checkbox"
              checked={agreeToTerms}
              onChange={(e) =>
                setAgreeToTerms(e.target.checked)
              }
            />

            Agree To Terms
          </label>

          {/* Terms Error */}
          {errors.agreeToTerms && (
            <p className="error">
              {errors.agreeToTerms}
            </p>
          )}

          <p></p>


          {/* PHOTO */}
          <label>
            Photo:

            <input
              type="file"
              onChange={(e) =>
                setPhoto(e.target.files[0])
              }
            />
          </label>

          <p></p>


          {/* SUBMIT */}
          <button
            className="submit"
            type="submit"
          >
            Submit
          </button>

        </div>

      </form>


      {/* APPLICATION RESULT */}
      {submitted && (
        <div className="application">

          <h2>
            Application Submitted
          </h2>

          <p>
            <strong>Name:</strong> {full_name}
          </p>

          <p>
            <strong>Phone:</strong> {phone_number}
          </p>

          <p>
            <strong>Email:</strong> {email}
          </p>

          <p>
            <strong>Date of Birth:</strong> {DOB}
          </p>

          <p>
            <strong>Gender:</strong> {gender}
          </p>

          <p>
            <strong>Course:</strong> {course}
          </p>

          <p>
            <strong>Course Reason:</strong> {courseReason}
          </p>

          <p>
            <strong>Address:</strong> {address}
          </p>

          {photo && (
            <p>
              <strong>Photo:</strong> {photo.name}
            </p>
          )}

          <button
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>

        </div>
      )}

    </div>
  );
}

export default App;
