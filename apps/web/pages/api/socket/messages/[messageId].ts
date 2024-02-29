import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "../../../../types";
import { Post } from "@prisma/client";
import { createPost } from "../../../../modules/actions";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
  ) {

    // if (req.method !== "DELETE" && req.method !== "PATCH") {
    //   return res.status(405).json({ error: "Method not allowed" });
    // }

    if (!req.body) {
      return res.status(400).json({ error: "Missing body" });
    }else{
      createPost(req.body['message'])
    }

    res?.socket?.server?.io?.emit("message", req.body['message'])    
    
    console.log("req =", req.body['message'], req.body, req.method)
    res.end();
}