import { getTernakStats } from "@/src/services/ternak-services";
import { serverError } from "@/src/utils/api-helper";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await getTernakStats();
    if (res.status !== 200) {
      return NextResponse.json(
        { message: res.message },
        { status: res.status },
      );
    }
    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    serverError(error);
  }
}
