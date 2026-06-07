import { authOptions } from "@/auth";
import { getKambingStats } from "@/src/services/kambing-services";
import { serverError } from "@/src/utils/api-helper";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const res = await getKambingStats();

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    serverError(error);
  }
}
