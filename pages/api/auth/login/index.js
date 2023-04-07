import cache from "@/src/services/cache";
import db from "@/src/services/db";
import User from "@/src/services/db/models/User";
import sendMail from "@/src/services/mail";
import mail from "@/src/services/mail";
import mailConfig from "@/src/services/mail/mailConfig";
import { userOTPVerification } from "@/src/services/mail/templates";
import { generateOTP, set as setOTP } from "@/src/services/otp";

export default db(async function (req, res) {
  if (req.method !== "POST") return res.status(405).send("method not allowed");
  const { email } = req.body;
  try {
    const getUser = await User.findOne({ email });
    if (!getUser) throw new Error("user does not exists");
    if (!getUser.verified) throw new Error("user is not verified");
    const otp = generateOTP();
    const initiateOTP = await setOTP(email, otp);
    if (initiateOTP) {
      await sendMail(userOTPVerification({ email, otp, to_name: email }));
      return res.status(200).json(`An otp has been sent to ${email}`);
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
    return res.status(400).json(error);
  }
});
