import { deleteSekat } from "@/src/services/sekat-services";
import { serverError } from "@/src/utils/api-helper";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const res = await deleteSekat(id);

    if (res.status !== 200) {
      return NextResponse.json(
        { message: res.message },
        { status: res.status },
      );
    }

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    return serverError(error);
  }
}
