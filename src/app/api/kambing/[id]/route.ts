import { authOptions } from "@/auth";
import { KambingValidation } from "@/src/lib/validation/kambing-validation";
import {
  deleteKambing,
  getKambingById,
  updateKambing,
} from "@/src/services/kambing-services";
import { serverError } from "@/src/utils/api-helper";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const payload = { ...body, userId: session.user.id };
    const validation = KambingValidation.UPDATE.safeParse(payload);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation failed!",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const res = await updateKambing(id, body);
    if (res.status !== 200) {
      return NextResponse.json(
        { message: res.message },
        { status: res.status },
      );
    }

    return NextResponse.json({
      message: "Data kambing berhasil di update",
      status: 200,
    });
  } catch (error) {
    return serverError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const res = await deleteKambing(id);
    if (res.status !== 200) {
      return NextResponse.json(
        { message: res.message },
        { status: res.status },
      );
    }
    return NextResponse.json({
      status: 201,
      message: "Data kambing berhasil dihapus!",
    });
  } catch (error) {
    return serverError(error);
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await getKambingById(id);
    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    return serverError(error);
  }
}
