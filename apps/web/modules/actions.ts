'use server'

import db from "./db"

export async function fetchPost() {
    'use server'
    const res = await db.post.findMany({ orderBy: { createdAt: 'desc' } });

    return res
}

export async function createPost(content: string) {
    'use server'
    await db.post.create({
        data: {
            content
        }
    })
}
