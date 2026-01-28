import express from "express"
 const router = express.Router();

 router.get("/send", (req, res) => {
  res.send("send Messages endpoint");});
   router.get("/receive", (req, res) => {
  res.send("receive Messages endpoint");});

  export default router;
  