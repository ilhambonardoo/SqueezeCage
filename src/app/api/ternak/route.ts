import { serverError } from "@/src/utils/api-helper";
import { createTernak, getAllTernak } from "@/src/services/ternak-services";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ...formData } = body;

    const payload = {
      ...body,
      imageUrl:
        formData.imageUrl === null || formData.imageUrl === ""
          ? undefined
          : formData.imageUrl,
      imageKey:
        formData.imageKey === null || formData.imageKey === ""
          ? undefined
          : formData.imageKey,
    };

    const res = await createTernak(payload);

    if (res.status !== 201) {
      return NextResponse.json(
        {
          message: res.message,
          errors:
            res.status === 409 ? { kode_hewan: [res.message] } : undefined,
        },
        {
          status: res.status,
        },
      );
    }

    return NextResponse.json({ message: res.message }, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}

export async function GET() {
  try {
    const res = await getAllTernak();

    if (res.status !== 200) {
      return NextResponse.json(
        { message: res.message },
        { status: res.status },
      );
    }

    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    return serverError(error);
  }
}
