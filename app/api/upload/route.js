// app/api/upload/route.js
import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export async function POST(request) {
  const data = await request.formData()
  const file = data.get('file')

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this example, we'll save it to the public directory
  const filename = file.name.replace(/\s/g, '-')
  const uploadDir = path.join(process.cwd(), 'public/uploads')
  const filepath = path.join(uploadDir, filename)

  try {
    await writeFile(filepath, buffer)
    return NextResponse.json({ success: true, fileUrl: `/uploads/${filename}` })
  } catch (error) {
    console.error('Error saving file:', error)
    return NextResponse.json({ success: false, error: 'Failed to save file' }, { status: 500 })
  }
}