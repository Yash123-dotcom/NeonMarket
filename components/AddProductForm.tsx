"use client";

import { createProduct } from "@/actions/create-product";
import { UploadDropzone } from "@/utils/uploadthing";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";
import { NeonButton } from "./NeonButton";

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await createProduct(formData);
      toast.success("Product created!");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-8 glass-premium p-8 rounded-3xl relative z-10 shadow-2xl">
      {/* Product Name */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-zinc-400">Product Name</label>
        <input 
          name="name" 
          required 
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-zinc-600 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20 outline-none transition" 
          placeholder="e.g. Cyberpunk UI Kit" 
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-zinc-400">Description</label>
        <textarea 
          name="description" 
          required 
          rows={4} 
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-zinc-600 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20 outline-none transition" 
          placeholder="Describe your asset in detail..." 
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-zinc-400">Price (USD)</label>
        <div className="relative">
          <span className="absolute left-4 top-4 text-zinc-500 font-bold">$</span>
          <input 
            name="price" 
            type="number" 
            step="0.01" 
            required 
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-8 text-white placeholder-zinc-600 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20 outline-none transition" 
            placeholder="29.99" 
          />
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-zinc-400">Product Thumbnail</label>
        {imageUrl ? (
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl group">
            <Image src={imageUrl} alt="Preview" fill className="object-cover" />
            <input type="hidden" name="imagePath" value={imageUrl} />
            <button 
              type="button" 
              onClick={() => setImageUrl("")} 
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-white/10 transition"
            >
              Change Image
            </button>
          </div>
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res: any) => {
              setImageUrl(res[0].url);
              toast.success("Image uploaded!");
            }}
            onUploadError={(error: Error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
            appearance={{
              container: "border-white/10 bg-white/5 hover:bg-white/10 transition rounded-2xl p-8 cursor-pointer border-dashed",
              label: "text-zinc-400 hover:text-white transition font-medium",
              allowedContent: "text-zinc-500 text-xs"
            }}
          />
        )}
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-zinc-400">Digital Asset File (Zip, PDF, etc)</label>
        {fileUrl ? (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 text-sm font-bold flex items-center justify-between shadow-lg">
            <span className="flex items-center gap-2">✓ File Uploaded Successfully</span>
            <input type="hidden" name="filePath" value={fileUrl} />
            <button 
              type="button" 
              onClick={() => setFileUrl("")} 
              className="bg-black/40 hover:bg-black/60 text-xs px-3 py-1.5 rounded-full border border-white/10 transition text-zinc-300 hover:text-white"
            >
              Reset File
            </button>
          </div>
        ) : (
          <UploadDropzone
            endpoint="productFile"
            onClientUploadComplete={(res: any) => {
              setFileUrl(res[0].url);
              toast.success("File uploaded!");
            }}
            onUploadError={(error: Error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
            appearance={{
              container: "border-white/10 bg-white/5 hover:bg-white/10 transition rounded-2xl p-8 cursor-pointer border-dashed",
              label: "text-zinc-400 hover:text-white transition font-medium",
              allowedContent: "text-zinc-500 text-xs"
            }}
          />
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <NeonButton 
          disabled={loading || !imageUrl || !fileUrl}
          className="w-full text-base py-4 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Creating Listing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Publish Digital Asset
            </>
          )}
        </NeonButton>
      </div>
    </form>
  );
}
