import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { useEffect, useState } from "react";
const ZOHO = window.ZOHO;

function App() {
  const [zohoLoaded, setZohoLoaded] = useState(false);
  const [documentList,setDocumentList] = useState([])

  const fetchTemplateList = async () => {
    const res = await fetch(
      "https://www.zohoapis.com/writer/api/v1/templates?type=organization",
      {
        headers: {
          Authorization: "Zoho-oauthtoken xyz",
        },
      }
    );
    const data = await res.json();
    console.log(data);
  };

  async function initZoho() {
    ZOHO.embeddedApp.on("PageLoad", async function (data) {
      console.log(data);
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
      // var conn_name = "zoho_one_conn";
      // var req_data = {
      //   method: "GET",
      //   url: "https://www.zohoapis.com/crm/v6/settings/modules",
      //   param_type: 2,
      // };
      // ZOHO.CRM.CONNECTION.invoke(conn_name, req_data).then(function (data) {
      //   console.log(data);
      // });

      var conn_name = "zoho_writer_fahim";
      var req_data = {
        parameters: {},
        headers: {},
        method: "GET",
        url: "https://www.zohoapis.com/writer/api/v1/documents",
        param_type: 2,
      };
      ZOHO.CRM.CONNECTION.invoke(conn_name, req_data).then(function (data) {
        console.log(data);
        setDocumentList(data?.details?.statusMessage?.documents)
      });
    }
  }, [zohoLoaded]);

  console.log(documentList)

  return (
    <div className="App">
      <Home documentList={documentList}/>
    </div>
  );
}

export default App;
