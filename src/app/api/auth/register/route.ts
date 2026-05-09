import { register } from "@/src/services/auth-services";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await register(body);

    if (response.status !== 201) {
      return NextResponse.json(
        { error: response.message },
        { status: response.status },
      );
    }
    return NextResponse.json({ message: response.message }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        message: "Terjadi kesalahan pada server",
      },
      { status: 500 },
    );
  }
}
