import { ReservationEnquiry } from "@/types/reservation-enquiry";
import { API_KEY } from "./constants";
import { AdminMessage } from "@/types/message";

const cloudinaryBaseUrl =
  "https://res.cloudinary.com/shallowfeet/image/upload/{{trans}}/thecitynook/{{slug}}";

export function getResizedURL(
  slug: string,
  fileName: string,
  height: string,
  width: string,
  trans: string = ""
): string {
  let transStr = "f_auto";
  if (!!height && !!width) {
    transStr = `w_${height},h_${width},f_auto,${trans || "c_fill"}`;
  } else if (!!height && !width) {
    transStr = `h_${height},f_auto,${trans || "c_fill"}`;
  } else if (!height && !!width) {
    transStr = `w_${width},f_auto,${trans || "c_fill"}`;
  }

  const transBaseUrl = cloudinaryBaseUrl
    .replace("{{trans}}", transStr)
    .replace("{{slug}}", slug);

  const finalUrl = `${transBaseUrl}/${fileName}.webp`;

  return finalUrl;
}

export async function sendReservationEnquiry(data: ReservationEnquiry) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/reservation-enquiry`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        key: API_KEY,
      },
      body: JSON.stringify(data),
    }
  );

  if (response.ok && response.status === 201) {
    return true;
  }

  return false;
}

export async function sendMessageToAdmin(data: AdminMessage): Promise<boolean> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/send-message`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        key: API_KEY,
      },
      body: JSON.stringify(data),
    }
  );

  if (response.ok && response.status === 200) {
    return true;
  }

  return false;
}
