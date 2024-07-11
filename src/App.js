import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { useEffect, useState } from "react";
const ZOHO = window.ZOHO;

function App() {
  const [zohoLoaded, setZohoLoaded] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [recordId, setRecordId] = useState();
  const [moduleName, setModuleName] = useState();

  async function initZoho() {
    ZOHO.embeddedApp.on("PageLoad", async function (data) {
      console.log(data);
      setRecordId(data.EntityId[0]);
      setModuleName(data.Entity);
    });
    ZOHO.embeddedApp.init().then(() => {
      setZohoLoaded(true);
    });
  }

  useEffect(() => {
    initZoho();
  }, []);

  useEffect(() => {
    // fetchTemplateList();
    if (zohoLoaded) {

      var conn_name = "zoho_writer_fahim";
      var req_data = {
        parameters: {},
        headers: {},
        method: "GET",
        url: "https://www.zohoapis.com/writer/api/v1/documents?resource_type=merge",
        param_type: 2,
      };
      ZOHO.CRM.CONNECTION.invoke(conn_name, req_data).then(function (data) {
        console.log(data);
        setDocumentList(data?.details?.statusMessage?.documents);
      });
      
    }
  }, [zohoLoaded]);

  console.log("fahim", documentList[0]?.document_id);

  const handleMerge = () => {
    var conn_name = "zoho_writer_fahim";
    var req_data = {
      parameters: {
        output_format: "docx",
        response_type: "link",
        merge_data: {
          data: {
            Deal_Name: "Test Deal 2",
            Account_Name: "test",
          },
        },
      },
      headers: {},
      method: "POST",
      url: `https://www.zohoapis.com/writer/api/v1/documents/${documentList[0]?.document_id}/merge`,
      param_type: 1,
    };
    ZOHO.CRM.CONNECTION.invoke(conn_name, req_data).then(function (data) {
      console.log(data);
      if (data?.details?.statusMessage?.URL) {
        const link = document.createElement("a");
        link.href = data?.details?.statusMessage?.URL;
        // link.setAttribute("download", ""); // Optional: Set the file name if needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      // setDocumentList(data?.details?.statusMessage?.documents)
    });
  };

  console.log(recordId);
  console.log(documentList);

  return (
    <div className="App">
      <Home documentList={documentList} handleMerge={handleMerge} />
    </div>
  );
}

export default App;
