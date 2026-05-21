import { UserValidation } from "@/src/lib/validation/user-validation";
import { register } from "@/src/services/auth-services";
import { serverError } from "@/src/utils/api-helper";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = UserValidation.CREATE.safeParse({
      ...body,
      role: "OPERATOR",
    });

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Data tidak valid",
          errors: validation.error.flatten((issue) => issue.message)
            .fieldErrors,
        },
        { status: 400 },
      );
    }

    const response = await register(body);

    if (response.status !== 201) {
      return NextResponse.json(
        { error: response.message },
        { status: response.status },
      );
    }
    return NextResponse.json({ message: response.message }, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}
