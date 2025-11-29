import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
      try {
            const formData = await request.formData();
            const file = formData.get('file') as File;

            if (!file) {
                  return NextResponse.json(
                        { error: 'No file uploaded' },
                        { status: 400 }
                  );
            }

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Create unique filename
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const filename = file.name.replace(/\.[^/.]+$/, "") + '-' + uniqueSuffix + '.' + file.name.split('.').pop();

            // Ensure uploads directory exists
            const uploadDir = join(process.cwd(), 'public', 'uploads');
            await mkdir(uploadDir, { recursive: true });

            // Write file
            const path = join(uploadDir, filename);
            await writeFile(path, buffer);

            return NextResponse.json({
                  url: `/uploads/${filename}`,
                  success: true
            });
      } catch (error) {
            console.error('Upload error:', error);
            return NextResponse.json(
                  { error: 'Error uploading file' },
                  { status: 500 }
            );
      }
}
