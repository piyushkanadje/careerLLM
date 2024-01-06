import React, { Fragment } from 'react'
import InformationComponent from './InformationComponent';
import { Dropzone, FileMosaic } from "@files-ui/react";

const DashboardComponent = () => {
	const [files, setFiles] = React.useState([]);
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };
	return (
		<Fragment>
			<div class="row gx-xl-5 mb-10">
      		<div className="col-lg-2 col-md-2"></div>
			<div className="col-8">
			<Dropzone onChange={updateFiles} value={files} accept="application/pdf" maxFiles={1} label="Browse or Drop your resume here ">
      {files.map((file) => (
        <FileMosaic {...file} preview />
      ))}
    </Dropzone>
	</div>
	</div>
		<InformationComponent />
		</Fragment>
	  );
};

export default DashboardComponent