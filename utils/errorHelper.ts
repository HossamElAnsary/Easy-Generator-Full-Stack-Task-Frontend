import { AppError } from "@/errors/AppError";
import { NextResponse } from "next/server";

export function errorHandler(error: any): NextResponse {

  if (error instanceof AppError) {
    return NextResponse.json(
      { message: error.message, statusCode: error.statusCode },
      { status: error.statusCode }
    );
  }

  console.error("Unexpected error:", error);
  return NextResponse.json(
    { message: "Something went wrong!", statusCode: 500 },
    { status: 500 }
  );

}