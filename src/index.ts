import axios from "axios";
import { drive_v3, google } from "googleapis";

import "dotenv/config";

console.log(process.env.BLOG_ID);

const BASE_URL = `https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOG_ID}/posts/`;

async function getCode() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "http://localhost:3000"
  );
  const scopes = ["https://www.googleapis.com/auth/blogger"];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    // If you only need one scope you can pass it as a string
    scope: scopes,
  });
  console.log("url", url);
  //   axios.get(url).then((result) => console.log(result));

  // code=4%2FywG0RDXWMIHXIepkGxVU_2nlV4EN68q7F0jTKkDkibyP3_lM8rLSxxmhwWBd7ePHTyPL4ZBdDfhrd8ED2wI2dSA
  // &redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground
  // &client_id=407408718192.apps.googleusercontent.com
  // &client_secret=************
  // &scope=
  // &grant_type=authorization_code
  // https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fblogger&response_type=code&client_id=335440107570-h6jacrkpu7bdbai9fkn2ctem4bb7eccp.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000
  const code = `4/ywHeVLWeI8L8Yktc_9lvLSheftuY3cMSVIfr13KUDscOB7bo5coURzXB9QlwKiFStEoASj_icIonOVuptFs-t0Y`;

  const { tokens } = await oauth2Client.getToken(code);
  console.log(tokens);
  oauth2Client.setCredentials(tokens);

  oauth2Client.on("tokens", (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
  });
}

getCode();
function addPost() {
  const headers = {
    Authorization:
      "Bearer " +
      "ya29.a0Ae4lvC3hhscQuhvsjFg_eeoWtq4JH1-g45ha7bk2tG3g7uIRYB9OQ0paRUl8as1-2pY0yCMQTbxRDKec4lYmrMCAOWuRum6NYuLFOCMwTfOZvDqxLjTEBh_p5i3pylfkJWEefuXJ78LVKSHV7qIeGZgNQFwFzXTUMLA" /* OAuth 2.0 token here */,
    "Content-Type": "application/json",
  };
  const params = {
    kind: "blogger#post",
    blog: {
      id: `${process.env.BLOG_ID}`,
    },
    title: "A new post",
    content: "With <b>exciting</b> content...",
  };
  axios.post(BASE_URL, { params, headers }).then((str) => console.log(str));
}
// addPost();
