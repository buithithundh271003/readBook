import PDF from "../models/pdf";

export const uploadFile = async (req, res) => {
    console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  console.log("tile", title);
  try {
    await PDF.create({ title: title, fileName: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }



   
};
export const getFile = async (req, res) => {
try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
}
