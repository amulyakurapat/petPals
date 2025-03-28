import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "npm:nodemailer";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const smtpConfig = {
  host: Deno.env.get("SMTP_HOST"),
  port: 587,
  secure: false,
  auth: {
    user: Deno.env.get("SMTP_USER"),
    pass: Deno.env.get("SMTP_PASS"),
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, email, petDetails } = await req.json();
    const smtp = new SmtpClient(smtpConfig);

    let subject = "";
    let text = "";

    switch (type) {
      case "newsletter":
        subject = "Welcome to PetPals Newsletter!";
        text = "Thank you for subscribing to our newsletter. You'll receive updates about new pets and adoption stories.";
        break;
      case "rehome":
        subject = "Pet Rehoming Request Received";
        text = `Thank you for submitting a rehoming request for your pet. Here are the details we received:\n\n` +
          `Pet Name: ${petDetails.petName}\n` +
          `Pet Type: ${petDetails.petType}\n` +
          `Breed: ${petDetails.breed}\n` +
          `Age: ${petDetails.age}\n\n` +
          `We will review your request and contact you soon.`;
        break;
      default:
        throw new Error("Invalid email type");
    }

    await smtp.send({
      from: "noreply@petpals.com",
      to: email,
      subject,
      text,
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});