import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { saveAs } from "file-saver";
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

  // const handleMerge = () => {
  //   var conn_name = "zoho_writer_fahim";
  //   var req_data = {
  //     parameters: {
  //       output_format: "docx",
  //       response_type: "link",
  //       merge_data: {
  //         data: {
  //           Deal_Name: "Test Deal 2",
  //           Account_Name: "test",
  //         },
  //       },
  //     },
  //     headers: {},
  //     method: "POST",
  //     url: `https://www.zohoapis.com/writer/api/v1/documents/${documentList[0]?.document_id}/merge`,
  //     param_type: 1,
  //   };
  //   ZOHO.CRM.CONNECTION.invoke(conn_name, req_data).then(function (data) {
  //     console.log(data);
  //     if (data?.details?.statusMessage?.URL) {
  //       const link = document.createElement("a");
  //       link.href = data?.details?.statusMessage?.URL;
  //       // link.setAttribute("download", ""); // Optional: Set the file name if needed
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     }
  //     // setDocumentList(data?.details?.statusMessage?.documents)
  //   });
  // };

  // const handleMerge = (data) => {
  //   console.log(data)
  //   const document = documentList.find((document)=>document.document_name === data.selectedDocument)
  //   let Api_key
  //   console.log({document})
  //   if (data.downloadToComputer && data.fileType && data.currentRecord.label) {
  //     var conn_name = "zoho_writer_fahim";

  //     var req_data = {
  //       // parameters: {
  //       //   "download_mail_merge": [
  //       //     {
  //       //       "mail_merge_template": {
  //       //         "name": document.document_name
  //       //       },
  //       //       "output_format": data.fileType,
  //       //       "file_name": "testdocument"
  //       //     }
  //       //   ]
  //       // },
  //       parameters: {},
  //       headers: {},
  //       method: "GET",
  //       // url: `https://www.zohoapis.com/crm/v6/${moduleName}/${recordId}/actions/download_mail_merge`,
  //       url: `https://www.zohoapis.com/crm/v6/settings/email_templates`,
  //       param_type: 1,
  //     };
  //     ZOHO.CRM.CONNECTION.invoke(conn_name, req_data).then(function (data) {
  //       // Api_key= data?.details?.statusMessage?.merge?.map((element)=>element.id)
  //       // console.log({Api_key});
  //       // ZOHO.CRM.API.getRecord({
  //       //   Entity: moduleName, approved: "both", RecordID:recordId
  //       //  }).then(data => console.log(data))
  //       console.log(data)

  //       // setDocumentList(data?.details?.statusMessage?.documents);
  //     })
  //   }

  // };
  // console.log(recordId);
  // console.log(documentList);

  const handleMerge = (data) => {
    const document = documentList.find(
      (document) => document.document_name === data.selectedDocument
    );
    console.log({ document });
    if (
      data.currentRecord &&
      data.downloadToComputer &&
      data.fileType &&
      data.saveToRecord &&
      data.selectedDocument
    ) {
      var fileType = data.fileType;
      var conn_name = "zoho_writer_fahim";
      var req_data = {
        parameters: {},
        headers: {},
        method: "GET",
        url: "https://www.zohoapis.com/crm/v2.1/settings/templates?type=mailmerge&module=Deals",
        param_type: 1,
      };
      ZOHO.CRM.CONNECTION.invoke(conn_name, req_data).then(function (data) {
        // Api_key = data?.details?.statusMessage?.merge?.map((element) => element.id)
        console.log(data);
        const template_name = data.details?.statusMessage?.templates[0].name;
        var req_data = {
          parameters: {
            download_mail_merge: [
              {
                mail_merge_template: {
                  name: "Test anotehr",
                },
                output_format: "pdf",
                file_name: "testdocument",
              },
            ],
          },
          method: "POST",
          url: `https://www.zohoapis.com/crm/v5/${moduleName}/${recordId}/actions/download_mail_merge`,
          param_type: 2,
        };
        console.log(req_data);
        ZOHO.CRM.CONNECTION.invoke(conn_name, req_data).then(async function (
          response
        ) {
          // Api_key= data?.details?.statusMessage?.merge?.map((element)=>element.id)
          console.log(response);
          const blob = response;
          const file = new Blob([blob], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          saveAs(file, "downloadedDocument.pdf");
          const samplePdfContent = `%PDF-1.4
          1 0 obj
          <<
          /Type /Catalog
          /Pages 2 0 R
          >>
          endobj
          2 0 obj
          <<
          /Type /Pages
          /Kids [3 0 R]
          /Count 1
          >>
          endobj
          3 0 obj
          <<
          /Type /Page
          /Parent 2 0 R
          /MediaBox [0 0 612 792]
          /Contents 4 0 R
          >>
          endobj
          4 0 obj
          <<
          /Length 55
          >>
          stream
          BT
          /F1 24 Tf
          100 700 Td
          (Hello, PDF!) Tj
          ET
          endstream
          endobj
          5 0 obj
          <<
          /Type /Font
          /Subtype /Type1
          /Name /F1
          /BaseFont /Helvetica
          >>
          endobj
          xref
          0 6
          0000000000 65535 f
          0000000010 00000 n
          0000000074 00000 n
          0000000124 00000 n
          0000000226 00000 n
          0000000327 00000 n
          trailer
          <<
          /Root 1 0 R
          /Size 6
          >>
          startxref
          381
          %%EOF`;
          // Convert the string to a byte array
          const byteCharacters = new TextEncoder().encode(response);
          const blob1 = new Blob([byteCharacters], { type: "application/pdf" });

          ZOHO.CRM.API.attachFile({
            Entity: `${moduleName}`,
            RecordID: `${recordId}`,
            File: { Name: "test.pdf", Content: blob1 },
          }).then(function (data) {
            console.log("fahim", data);
          });

          // const binaryData = response;
          // const blob = new Blob([binaryData], { type: "application/pdf" });
          // saveAs(blob, "downloadedDocument.pdf");

          // const binaryString = data;
          // const binaryLength = binaryString.length;
          // const bytes = new Uint8Array(binaryLength);
          // for (let i = 0; i < binaryLength; i++) {
          //   bytes[i] = binaryString.charCodeAt(i);
          // }

          // const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
          // saveAs(pdfBlob, 'downloadedDocument.pdf');
        });
        // console.log({ Api_key });

        // setDocumentList(data?.details?.statusMessage?.documents);
      });
    }
  };

  return (
    <div className="App">
      <Home documentList={documentList} handleMerge={handleMerge} />
    </div>
  );
}

export default App;
