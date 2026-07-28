import localFont from "next/font/local";

export const googleSans = localFont({
  src: [
    {
      path: "./GoogleSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./GoogleSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./GoogleSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./GoogleSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./GoogleSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./GoogleSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./GoogleSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./GoogleSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});
