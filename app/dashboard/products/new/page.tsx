"use client";

import { createProduct } from "@/actions/create-product";
import Navbar from "@/components/Navbar";
import { UploadDropzone } from "@/utils/uploadthing";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function AddProductPage() {
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
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-32">
        <h1 className="text-4xl font-black mb-8">Add New Product</h1>

        <form action={handleSubmit} className="space-y-8 bg-gray-900/50 p-8 rounded-3xl border border-gray-800">
            
            {/* Name */}
            <div>
                <label className="block text-sm font-bold mb-2 text-gray-400">Product Name</label>
                <input name="name" required className="w-full bg-black border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-purple-500 outline-none transition" placeholder="e.g. Cyberpunk UI Kit" />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-bold mb-2 text-gray-400">Description</label>
                <textarea name="description" required rows={4} className="w-full bg-black border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-purple-500 outline-none transition" placeholder="Describe your asset..." />
            </div>

            {/* Price */}
            <div>
                <label className="block text-sm font-bold mb-2 text-gray-400">Price (USD)</label>
                <div className="relative">
                    <span className="absolute left-4 top-4 text-gray-500">$</span>
                    <input name="price" type="number" step="0.01" required className="w-full bg-black border border-gray-700 rounded-xl p-4 pl-8 focus:ring-2 focus:ring-purple-500 outline-none transition" placeholder="29.99" />
                </div>
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-bold mb-2 text-gray-400">Product Thumbnail</label>
                {imageUrl ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-purple-500/50">
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <input type="hidden" name="imagePath" value={imageUrl} />
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
                            container: "border-gray-700 bg-black hover:bg-gray-900 transition",
                            label: "text-gray-400 hover:text-white",
                            allowedContent: "text-gray-500"
                        }}
                    />
                )}
            </div>

            {/* File Upload */}
            <div>
                <label className="block text-sm font-bold mb-2 text-gray-400">Digital Asset File (Zip, PDF, etc)</label>
                {fileUrl ? (
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm font-bold flex items-center gap-2">
                        ✓ File Uploaded Successfully
                        <input type="hidden" name="filePath" value={fileUrl} />
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
                            container: "border-gray-700 bg-black hover:bg-gray-900 transition",
                            label: "text-gray-400 hover:text-white",
                            allowedContent: "text-gray-500"
                        }}
                    />
                )}
            </div>

            {/* Submit */}
            <button 
                disabled={loading || !imageUrl || !fileUrl}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-4 rounded-xl text-lg hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading && <Loader2 className="animate-spin" />}
                {loading ? "Creating..." : "Publish Product"}
            </button>
        </form>
      </div>
    </div>
  );
}
