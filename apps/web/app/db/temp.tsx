'use client'
import { Button } from '@repo/ui/button'
import React from 'react'
import { createPost } from '../../modules/actions'

export default async function Temp() {
  return (
    <Button
        onClick={()=>createPost("Hi there")}
    >
        Post
    </Button>
  )
}