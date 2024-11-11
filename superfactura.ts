import fetch from "node-fetch";
import * as fs from "fs";
import pako, { Data } from "pako";

export class SuperFacturaAPI {
  version: string;
  user: string;
  password: string;
  serverUrl = "https://superfactura.cl/";

  constructor(user: string, password: string) {
    this.version = "0.1-nodejs";
    this.user = user;
    this.password = password;
  }

  async SendDTE(
    data: any,
    ambiente: "cer" | "pro" | "dem",
    options: {
      mail?: string;
      savePDF?: string;
      getPDF?: 1 | 0;
      saveXML?: string;
      getXML?: 1 | 0;
      saveHTML?: string;
      getHTML?: 1 | 0;
      saveEscPos?: boolean;
      getEscPos?: 1 | 0;
      documentID?: string;
      encoding?: string;
      import?: number;
      isSigned?: 1 | 0;
      fix?: 1 | 0;
      printer?: string;
      model?: string;
      copias?: number;
      cedible?: 1 | 0;
      url?: string;
      fileExtensions?: {
        xml?: string;
        pdf?: string;
        html?: string;
        escpos?: string;
      };
    } = {}
  ) {
    return new Promise(async (resolve, reject) => {
      options["ambiente"] = ambiente;
      // options["encoding"] = "UTF-8";
      options["version"] = this.version;

      if (options["url"]) {
        this.serverUrl = options["url"];
      }

      if (options["savePDF"]) {
        options["getPDF"] = 1;
      }

      if (options["saveXML"]) {
        options["getXML"] = 1;
      }

      if (options["saveEscpos"]) {
        // Add compatibility with standard syntax "save... (like savePDF or saveXML)"
        options["getEscPos"] = options["saveEscpos"];
      }

      this.SendRequest(data, options)
        .then((output) => {
          const obj = JSON.parse(output as string);
          if (obj["ack"] !== "ok") {
            const text =
              obj["response"]["title"] + " - " + obj["response"]["message"];
            return reject(text);
          }

          const appRes = obj["response"];
          const folio = appRes["folio"];

          if (appRes["ok"] === "1") {
            const savePDF = options["savePDF"];
            if (savePDF) {
              this.WriteFile(
                `${savePDF}.pdf`,
                this.DecodeBase64(appRes["pdf"])
              );

              if (appRes["pdfCedible"]) {
                this.WriteFile(
                  `${savePDF}-cedible.pdf`,
                  this.DecodeBase64(appRes["pdfCedible"])
                );
              }
            }

            const saveXML = options["saveXML"];
            if (saveXML) {
              this.WriteFile(`${saveXML}.xml`, appRes["xml"].encode("latin-1"));
            }

            const saveEscpos = options["getEscPos"];
            if (saveEscpos) {
              const b64escpos = appRes["escpos"];
              this.WriteFile(`${saveEscpos}.pos`, this.DecodeBase64(b64escpos));
            }
          } else {
            return reject(output);
          }

          resolve(obj);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  private async SendRequest(data, options) {
    const params = {
      user: this.user,
      pass: this.password,
      content: JSON.stringify(data),
      options: JSON.stringify(options),
    };

    const searchParams = new URLSearchParams(params);

    const headers = {
      "Content-type": "application/x-www-form-urlencoded",
      Accept: "text/plain",
    };

    try {
      const response = await fetch(`${this.serverUrl}?a=json`, {
        method: "POST",
        headers,
        body: searchParams.toString(),
      });

      if (response) {
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        return this.Decompress(arrayBuffer);
      } else {
        console.error("Fetch failed");
      }
    } catch (err) {
      throw err;
    }
  }

  private Decompress(gzip: Data) {
    return pako.ungzip(gzip, { to: "string" });
  }

  private DecodeBase64(b64: string) {
    return Buffer.from(b64, "base64");
  }

  private WriteFile(filename: string, data: any) {
    try {
      fs.writeFileSync(filename, data);
    } catch (err) {
      throw err;
    }
  }
}
