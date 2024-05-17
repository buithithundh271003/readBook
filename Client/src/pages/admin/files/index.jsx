import { useEffect, useState } from "react";
import axios from "axios";

import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


function App() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // pdf file onChange state
  const [pdfFile, setPdfFile]=useState(null);

  // pdf file error state
  const [pdfError, setPdfError]=useState('');


  // handle file onChange event
  const allowedFiles = ['application/pdf'];
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  // const [allImage, setAllImage] = useState(null);

 
  

  useEffect(() => {
  }, []);
  // const getPdf = async () => {
  //   const result = await axios.get("http://localhost:5000/api/files/getFile");
  //   console.log(result.data.data);
  //   setAllImage(result.data.data);
  // };
  const handleFile = (e) =>{
    setFile(e.target.files[0])
    let selectedFile = e.target.files[0];
    console.log(selectedFile);
    if(selectedFile){
      if(selectedFile&&allowedFiles.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        console.log(typeof(selectedFile));
        reader.onloadend=(e)=>{
          setPdfError('');
          setPdfFile(e.target.result);
        }
      }
      else{
        setPdfError('Not a valid pdf: Please select only PDF');
        setPdfFile('');
      }
    }
    else{
      console.log('please select a PDF');
    }
  }
  const submitImage = async (e) => {

    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);
    console.log(typeof(title), typeof(file));


    const results = await axios.post(
      "http://localhost:3000/api/files/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(results);
    if (results.data.status == "ok") {
      alert("Uploaded Successfully!!!");
    }
  };



  return (
    <div className="App">
      <form className="formStyle" onSubmit={submitImage}>
        <h4>Upload Pdf in React</h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          class="form-control"
          accept="application/pdf"
          required
          onChange={handleFile}
        
        />
        <br />
        <button class="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <div className="viewer">

{/* render this if we have a pdf file */}
{pdfFile&&(
  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
    <Viewer fileUrl={pdfFile}
    plugins={[defaultLayoutPluginInstance]}></Viewer>
  </Worker>
)}

{/* render this if we have pdfFile state null   */}
{!pdfFile&&<>No file is selected yet</>}

</div>
    </div>

  );
}

export default App;