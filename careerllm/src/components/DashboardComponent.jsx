import React, { Fragment } from "react";
import InformationComponent from "./InformationComponent";
import { Dropzone, FileMosaic } from "@files-ui/react";
import "./DashboardComponent.css";
import { ReactComponent as Loader } from '../assets/spinner.svg';
import { useNavigate } from 'react-router-dom';


const DashboardComponent = () => {

  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState();
  const navigate = useNavigate();



  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);

  };
  const uploadFile = async (event) => {

	event.preventDefault();
	const formData = new FormData();
	console.log("aaa", files[0].file)
	formData.append('file_upload', files[0].file)


	try {
		setLoading(true)

		const endpoint = "http://127.0.0.1:8000/parseresume/"
		const response = await fetch(endpoint, {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			const jsonResponse = await response.json();
			setData(jsonResponse)
            console.log("file uploaded successfully", jsonResponse);
			setFiles([])
			setLoading(false)
		} else{
			console.error("failed to upload file");
			setFiles([])
			setLoading(false)
		}

	} catch(error){
		console.log(error);
		setFiles([])
		setLoading(false)
	}


  }

  const compareJobDesc = () => {
	navigate('/comparison');
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
		<div className="col-lg-5 col-md-5"></div>
		<button onClick={compareJobDesc} to = "/comparison" className="col-lg-1 col-md-1 btn btn-primary dash-button" disabled={loading || data === undefined} type="button" data-mdb-ripple-init>
		Compare Job Desc</button>
		<div className="col-lg-1 col-md-1"></div>

		<button onClick={uploadFile} className="col-lg-1 col-md-1 btn btn-primary dash-button" disabled={loading} type="button" data-mdb-ripple-init>
		{!loading ? "Submit Resume" : <Loader className="spinner" />}
		</button>

      </div>

      <InformationComponent parsed_data = {data}/>
    </Fragment>
  );

};

export default DashboardComponent;
