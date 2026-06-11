import { serverError } from "@/src/utils/api-helper";
import { TernakValidation } from "@/src/lib/validation/ternak-validation";
import { createTernak, getAllTernak } from "@/src/services/ternak-services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { ...formData } = body;

    const payload = {
      ...body,
      userId: session.user.id,
      imageUrl:
        formData.imageUrl === null || formData.imageUrl === ""
          ? undefined
          : formData.imageUrl,
      imageKey:
        formData.imageKey === null || formData.imageKey === ""
          ? undefined
          : formData.imageKey,
    };
    const validation = TernakValidation.CREATE.safeParse(payload);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation Failed!",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

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
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unatuhotized" }, { status: 401 });
    }

    const res = await getAllTernak();
    return NextResponse.json(res.data, {
      status: 201,
    });
  } catch (error) {
    return serverError(error);
  }
}
