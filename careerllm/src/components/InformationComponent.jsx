import React, { Fragment, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
const EDUCATION = [
  {
    title: "Certified Web Developer - Web Development Institute",
    date: "2016",
    children:
      "This comprehensive program covered HTML5, CSS3, JavaScript, responsive design, server-side scripting, and web security.",
  },
  {
    title: "Responsive Web Design Certification - FreeCodeCamp",
    date: "2015",
    children:
      "The Responsive Web Design certification signifies competence in designing and developing websites that adapt seamlessly to various screen sizes and devices.",
  },
  {
    title: "JavaScript Developer Certification - Code Academy",
    date: "2014",
    children:
      "This certification demonstrates advanced proficiency in JavaScript programming, including ES6 features and practical applications.",
  },
  {
    title: "Bachelor of Science in Computer Science - XYZ University",
    date: "2014-2016",
    children:
      "Relevant Coursework: Data Structures, Algorithms, Web Development, Software Engineering, Database Management.",
  },
];

const EXPERIENCE = [
  {
    title: "Freelancer Web Developer",
    date: "2023 - PRESENT",
    children:
      "The core of my work involved actual web development. I would write code, design layouts, and create functionality based on the project's specifications.",
  },
  {
    title: "Technical Team Lead",
    date: "2021 - 2023",
    children:
      "I provided strong leadership by overseeing and guiding a team of highly skilled technical professionals.",
  },
  {
    title: "Senior Web Developer",
    date: "2017 - 2021",
    children:
      "Revamped the automated test framework for web services, resulting in a remarkable 90% reduction in debugging and issue resolution time.",
  },
  {
    title: "Junior Web Developer",
    date: "2015 - 2017",
    children:
      "Developed 10+ responsive websites for clients in a variety of industries.",
  },
];

const SKILLS = [
  {
    title: "Front-End Frameworks",
    date: "Technical Skills",
    children:
      "Competent in working with front-end frameworks such as React, Angular, or Vue.js to develop dynamic and responsive web applications with a focus on user experience.",
  },
  {
    title: "Attention to Detail",
    date: "Soft Skills",
    children:
      "Meticulous attention to detail in code quality, user interface design, and testing to ensure error-free and user-friendly web applications.",
  },
  {
    title: "Responsive Web Design",
    date: "Technical Skills",
    children:
      "Skilled in creating responsive layouts using CSS Grid, Flexbox, and media queries. Ensures websites adapt seamlessly to various screen sizes and devices.",
  },
  {
    title: "Time Management",
    date: "Soft Skills",
    children:
      "Excellent time management skills to meet project deadlines, prioritize tasks effectively, and handle multiple projects simultaneously.",
  },
];

const InformationComponent = (props = {}) => {

    const [education, setEducation] = React.useState([]);
    const [experience, setExperience] = React.useState([]);
    const [skills, setSkills] = React.useState([]);



    useEffect(() => {
        console.log("info", props.parsed_data)
        if (props.parsed_data) {
            if (props.parsed_data["Education"] !== undefined) {
                setEducation(props.parsed_data["Education"].split(';'));
            }
            if (props.parsed_data["Experience"] !== undefined) {
                setExperience(props.parsed_data["Experience"].split(';'));
            }
            if (props.parsed_data["Skills"] !== undefined) {
                setSkills(props.parsed_data["Skills"].split(';'));
            }
        }
    }, [props.parsed_data]);

  return (
    <Fragment>
    <div class="row gx-xl-5 mb-10">
      <div className="col-lg-1 col-md-1"></div>
      <div class="col-lg-8 col-md-8 mb-4 mb-lg-0 order-2 order-lg-1">
      <h1>Education</h1>

        {education.map((item, index) => (
          <MDBCard className="w-100 mb-4">
            <MDBCardBody>
              <MDBCardTitle>{item}</MDBCardTitle>
              {/* <MDBCardText>{item.children}</MDBCardText> */}
            </MDBCardBody>
          </MDBCard>
        ))}
      </div>
      <div className="col-lg-1 col-md-1"></div>
    </div>


    <div class="row gx-xl-5 mb-10">
    <div className="col-lg-1 col-md-1"></div>
    <div class="col-lg-8 col-md-8 mb-4 mb-lg-0 order-2 order-lg-1">
        <h1>Experience</h1>
      {experience.map((item, index) => (
        <MDBCard className="w-100 mb-4">
          <MDBCardBody>
            <MDBCardTitle>{item}</MDBCardTitle>
            {/* <MDBCardText>{item.children}</MDBCardText> */}
          </MDBCardBody>
        </MDBCard>
      ))}
    </div>
    <div className="col-lg-1 col-md-1"></div>
  </div>


  <div class="row gx-xl-5">
    <div className="col-lg-1 col-md-1"></div>
    <div class="col-lg-8 col-md-8 mb-4 mb-lg-0 order-2 order-lg-1">
        <h1>Skills</h1>
      {skills.map((item, index) => (
        <MDBCard className="w-100 mb-4">
          <MDBCardBody>
            <MDBCardTitle>{item}</MDBCardTitle>
            {/* <MDBCardText>{item.children}</MDBCardText> */}
          </MDBCardBody>
        </MDBCard>
      ))}
    </div>
    <div className="col-lg-1 col-md-1"></div>
  </div>
  </Fragment>
  );
};

export default InformationComponent;
