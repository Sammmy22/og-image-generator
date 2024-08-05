"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;

        // Ensure base64Image is a string before storing it in sessionStorage
        const imageToStore = typeof base64Image === "string" ? base64Image : "";

        // Store data in session storage
        sessionStorage.setItem("title", title);
        sessionStorage.setItem("content", content);
        sessionStorage.setItem("image", imageToStore);

        // Navigate to the display page
        router.push("/display");
      };

      reader.readAsDataURL(image);
    } else {
      // Store data in session storage without image
      sessionStorage.setItem("title", title);
      sessionStorage.setItem("content", content);
      sessionStorage.setItem("image", "");

      // Navigate to the display page
      router.push("/display");
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">OG Image Generator</CardTitle>
            <CardDescription>
              Enter in details to generate an image
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Some title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Some content"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Attach image (optional)</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Generate image</Button>
          </CardFooter>
        </form>
      </Card>
      {/* <ImageDisplay /> */}
    </div>
  );
}
