// pages/api/upload.js
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable-serverless";

cloudinary.config({
  cloud_name: "dyjv8k20k",
  api_key: "186357463439535",
  api_secret: "jyf47adExR0FMzBbVjnf-WDQKQs",
  secure: true,
});
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: "Error al parsear el formulario: " + err });
      return;
    }
    try {
      const file = files.file.path;
      const uploadResponse = await cloudinary.uploader.upload(file, {
        upload_preset: "ml_default",
      });
      console.log(uploadResponse)
      res.status(200).json({ url: uploadResponse.secure_url });
    } catch (error) {
      res.status(500).json({ error: "Error al subir archivo: " + error });
    }
  });
}
