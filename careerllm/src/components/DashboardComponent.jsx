import React, { Fragment } from "react";
import InformationComponent from "./InformationComponent";
import { Dropzone, FileMosaic } from "@files-ui/react";
import "./DashboardComponent.css";

const DashboardComponent = () => {
  const [files, setFiles] = React.useState([]);
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);

  };
  const uploadFile = async (event) => {
	event.preventDefault();
	const formData = new FormData();
	console.log("aaa", files[0].file)
	formData.append('file_upload', files[0].file)

	for (let [key, value] of formData.entries()) {
		console.log(key, value);
	}

	try {
		const endpoint = "http://127.0.0.1:8000/uploadfile/"
		const response = await fetch(endpoint, {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			console.log("file uploaded sucessfully");
		} else{
			console.error("failed to upload file");
		}

	} catch(error){
		console.log(error);
	}


  }
  return (
    <Fragment>
      <div class="row gx-xl-5 mb-10">
        <div className="col-lg-2 col-md-2"></div>
        <div className="col-8 dropbox-container">
          <Dropzone
            className="dropbox"
            onChange={updateFiles}
            value={files}
            accept="application/pdf"
            maxFiles={1}
            label="Browse or Drop your resume here "
			// actionButtons={{
			// 	position: "after",
			// 	abortButton: {},
			// 	deleteButton: {},
			// 	uploadButton: {uploadFile}
			//   }}
          >
            {files.map((file) => (
              <FileMosaic {...file} preview />
            ))}
          </Dropzone>
        </div>
		<div className="col-lg-2 col-md-2"></div>
		<div className="col-lg-8 col-md-8"></div>

		<button onClick={uploadFile} className="col-lg-1 col-md-1 btn btn-primary" type="button" data-mdb-ripple-init>Upload Resume</button>

      </div>

      <InformationComponent />
    </Fragment>
  );
};

export default DashboardComponent;