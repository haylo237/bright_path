import prisma from "@/backend/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_MODELS = new Set([
  "admin",
  "announcement",
  "assignment",
  "attendance",
  "class",
  "event",
  "exam",
  "lesson",
  "parent",
  "result",
  "student",
  "subject",
  "teacher",
]);

type ListBody = {
  action?: "list" | "count" | "groupBy";
  model: string;
  where?: unknown;
  include?: unknown;
  select?: unknown;
  orderBy?: unknown;
  page?: number;
  perPage?: number;
  by?: string[];
  aggregateCount?: boolean;
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ListBody;
  const model = body.model;
  const action = body.action || "list";

  if (!ALLOWED_MODELS.has(model)) {
    return NextResponse.json({ error: "Invalid model" }, { status: 400 });
  }

  const page = Math.max(1, Number(body.page || 1));
  const perPage = Math.max(1, Number(body.perPage || 10));
  const skip = perPage * (page - 1);

  const modelClient = (prisma as any)[model];
  if (!modelClient?.findMany || !modelClient?.count) {
    return NextResponse.json({ error: "Model not queryable" }, { status: 400 });
  }

  if (action === "count") {
    const count = await modelClient.count({ where: body.where || {} });
    return NextResponse.json({ count });
  }

  if (action === "groupBy") {
    if (!modelClient.groupBy || !Array.isArray(body.by) || body.by.length === 0) {
      return NextResponse.json({ error: "Invalid groupBy payload" }, { status: 400 });
    }

    const grouped = await modelClient.groupBy({
      by: body.by,
      where: body.where || {},
      _count: body.aggregateCount ? true : undefined,
    });

    return NextResponse.json({ data: grouped });
  }

  const findManyArgs: any = {
    where: body.where || {},
    take: perPage,
    skip,
  };

  if (body.include) findManyArgs.include = body.include;
  if (body.select) findManyArgs.select = body.select;
  if (body.orderBy) findManyArgs.orderBy = body.orderBy;

  const [data, count] = await prisma.$transaction([
    modelClient.findMany(findManyArgs),
    modelClient.count({ where: body.where || {} }),
  ]);

  return NextResponse.json({ data, count });
}
