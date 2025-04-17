import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "./errorHelper";

type RouteHandlerType = (
  ...args: any[]
) => Promise<NextResponse> | NextResponse;

export function RouteHandler(handler: RouteHandlerType): RouteHandlerType {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      return errorHandler(error);
    }
  };
} 