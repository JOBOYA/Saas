declare module 'pdf-parse' {
    function pdfParse(data: Buffer | ArrayBuffer | Uint8Array): Promise<any>;
    export default pdfParse;
  }
  