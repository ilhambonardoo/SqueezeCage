import {
  deleteTernak,
  getTernakById,
  updateTernak,
} from "@/src/services/ternak-services";
import { serverError } from "@/src/utils/api-helper";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { oldImageKeyToDelete, ...formData } = body;

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
      status: 200,
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

    const res = await getTernakById(id);
    if (res.status !== 200) {
      return NextResponse.json(
        {
          message: res.message,
        },
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
