import { KambingValidation } from "@/src/lib/validation/kambing-validation";
import { createKambing, getAllKambing } from "@/src/services/kambing-services";
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
    const payload = { ...body, userId: session.user.id };
    const validation = KambingValidation.CREATE.safeParse(payload);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation Failed!",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const res = await createKambing(payload);
    if (res.status !== 201) {
      return NextResponse.json(
        {
          message: res.message,
          errors:
            res.status === 409 ? { kode_kambing: [res.message] } : undefined,
        },
        {
          status: res.status,
        },
      );
    }

    return NextResponse.json({ message: res.message }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Terjadi kesalahan pada server",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unatuhotized" }, { status: 401 });
    }

    const res = await getAllKambing();
    return NextResponse.json(res.data, {
      status: 201,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Gagal mengambil data!",
      },
      {
        status: 500,
      },
    );
  }
}
