import { createKandang, getAllKandang } from "@/src/services/kandang-services";
import { serverError } from "@/src/utils/api-helper";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await getAllKandang();

    if (res.status !== 200) {
      return NextResponse.json(
        {
          message: res.message,
        },
        { status: res.status },
      );
    }

    if (!res.data || res.data.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await createKandang(body);

    if (res.status !== 201) {
      return NextResponse.json(
        { message: res.message },
        { status: res.status },
      );
    }

    return NextResponse.json(res.data, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}
