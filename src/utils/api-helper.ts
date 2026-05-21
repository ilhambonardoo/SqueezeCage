import { NextResponse } from "next/server";

const apiResponse = (
  status: number,
  message: string,
  errors?: Record<string, string[]>,
) => {
  return NextResponse.json(
    {
      status,
      message,
      errors,
    },
    { status },
  );
};

export const serverError = (error?: unknown) => {
  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("API Error:", message);
  }
  return apiResponse(500, "Terjadi kesalahan pada server");
};
