import { authOptions } from "@/auth";
import { TernakValidation } from "@/src/lib/validation/ternak-validation";
import {
  deleteTernak,
  getTernakById,
  updateTernak,
} from "@/src/services/ternak-services";
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

    const { oldImageKeyToDelete, ...formData } = body;

    const payload = {
      ...formData,
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
    const validation = TernakValidation.UPDATE.safeParse(payload);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation failed!",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const res = await updateTernak(id, formData, oldImageKeyToDelete);
    if (res.status !== 200) {
      return NextResponse.json(
        { message: res.message },
        { status: res.status },
      );
    }

    return NextResponse.json({
      message: "Data ternak berhasil di update",
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
    const res = await deleteTernak(id);
    if (res.status !== 200) {
      return NextResponse.json(
        { message: res.message },
        { status: res.status },
      );
    }
    return NextResponse.json({
      status: 201,
      message: "Data ternak berhasil dihapus!",
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

    const res = await getTernakById(id);
    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error) {
    return serverError(error);
  }
}
