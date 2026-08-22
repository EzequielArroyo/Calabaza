import { getMockUserId } from "@/lib/auth-mock";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const uploadthing = createUploadthing();

const authenticateUpload = async () => ({
  userId: await getMockUserId(),
});

export const appFileRouter = {
  storeImage: uploadthing({
    image: { maxFileCount: 1 },
  })
    .middleware(authenticateUpload)
    .onUploadComplete(({ file }) => ({ url: file.ufsUrl })),

  productImages: uploadthing({
    image: { maxFileCount: 1 },
  })
    .middleware(authenticateUpload)
    .onUploadComplete(({ file }) => ({ url: file.ufsUrl })),
} satisfies FileRouter;

export type AppFileRouter = typeof appFileRouter;
