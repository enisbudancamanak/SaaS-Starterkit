import { PUBLIC_R2_BUCKET_NAME } from '$env/static/public'
import { S3 } from '$lib/s3'
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { json } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'

const slugifyString = (str: string) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\./g, '-')
    .replace(/-+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
}

// delete and upload new profile Picture to cloudflare r2
export const POST = async ({ request }) => {
  const { fileName, fileType, userId, previousImage } =
    (await request.json()) as {
      fileName: string | undefined
      fileType: string | undefined
      userId: string | undefined
      previousImage: string | undefined
    }

  // If image is empty in request
  if (
    !fileName ||
    !fileType ||
    fileName.trim() === '' ||
    fileType.trim() === ''
  ) {
    return json({ message: 'Missing required parameters.' }, { status: 400 })
  }

  // If user has profile picture hosted on cloudflare -> delete first
  if (previousImage?.startsWith('cloudflare-')) {
    try {
      await S3.send(
        new DeleteObjectCommand({
          Bucket: PUBLIC_R2_BUCKET_NAME,
          Key: previousImage,
        })
      )
    } catch (e) {
      console.log(e)
    }
  }

  // Create new id for image
  const imageId = `cloudflare-${slugifyString(
    Date.now().toString()
  )}-${slugifyString(fileName)}`

  // create presigned url to get ready for upload
  const presignedUrl = await getSignedUrl(
    S3,
    new PutObjectCommand({
      Bucket: PUBLIC_R2_BUCKET_NAME,
      Key: imageId,
      ContentType: fileType,
    }),
    {
      expiresIn: 60 * 1, // 1 min
    }
  )

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        profile_picture: `${imageId}`,
      },
    })
  } catch (e) {}

  return json({ presignedUrl })
}
