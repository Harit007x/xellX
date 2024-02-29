import { Button } from "@repo/ui/button";
import db from "../../modules/db";
import { useEffect, useState } from "react";
import { createPost, fetchPost } from "../../modules/actions";
import Temp from "./temp";

export default async function Page() {
  
    
    const res = await fetchPost()
    console.log("res =", res)

    return (
        <div>
            <Temp/>
        </div>
    );
}
