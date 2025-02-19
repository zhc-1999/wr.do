import { NextRequest, NextResponse } from "next/server";

import { createUserShortUrlMeta, getUrlBySuffix } from "@/lib/dto/short-urls";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");
    const ip = url.searchParams.get("ip");
    if (!slug || !ip) return Response.json(null);

    const res = await getUrlBySuffix(slug);
    if (res?.target && res?.active === 1) {
      console.log("[api/s]", ip, res.id);
      // TODO
      await createUserShortUrlMeta({
        urlId: res.id,
        click: 1,
        ip: ip ? ip.split(",")[0] : "127.0.0.1",
        city: "",
        region: "",
        country: "",
        latitude: "",
        longitude: "",
      });
      return Response.json(res.target);
    }
    return Response.json(null);
  } catch (error) {
    return Response.json(null);
  }
}
