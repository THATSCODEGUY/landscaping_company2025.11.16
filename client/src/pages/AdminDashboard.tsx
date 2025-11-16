import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Upload, Trash2, Edit2, Plus } from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = [
  { value: "interlocking", label: "Interlocking (铺砖)" },
  { value: "powerwashing", label: "Powerwashing (高压清洗)" },
  { value: "relevelling", label: "Relevelling (车道修复)" },
  { value: "polymer_sand", label: "Polymer Sand (胶沙更换)" },
  { value: "paver_sealing", label: "Paver Sealing (铺路石密封)" },
  { value: "yard_works", label: "Yard Works (庭院工作)" },
  { value: "about", label: "About (关于我们)" },
  { value: "hero", label: "Hero (英雄区域)" },
  { value: "other", label: "Other (其他)" },
];

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("interlocking");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [googleDriveUrl, setGoogleDriveUrl] = useState("");
  const [googleDriveFileId, setGoogleDriveFileId] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Queries
  const { data: allImages, refetch: refetchImages } = trpc.admin.images.list.useQuery();
  const { data: categoryImages } = trpc.admin.images.byCategory.useQuery({ category: selectedCategory });
  const { data: services } = trpc.admin.services.list.useQuery();

  // Mutations
  const uploadImageMutation = trpc.admin.images.upload.useMutation({
    onSuccess: () => {
      toast.success("Image uploaded successfully!");
      setUploadTitle("");
      setUploadDescription("");
      setUploadFile(null);
      refetchImages();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload image");
    },
  });

  const deleteImageMutation = trpc.admin.images.delete.useMutation({
    onSuccess: () => {
      toast.success("Image deleted successfully!");
      refetchImages();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete image");
    },
  });

  const addGoogleDriveMutation = trpc.admin.images.addGoogleDrive.useMutation({
    onSuccess: () => {
      toast.success("Google Drive image added successfully!");
      setGoogleDriveUrl("");
      setGoogleDriveFileId("");
      refetchImages();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add Google Drive image");
    },
  });

  // Check admin access
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You do not have permission to access this page</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const handleFileUpload = async () => {
    if (!uploadFile || !uploadTitle || !selectedCategory) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = (e.target?.result as string).split(",")[1];
        await uploadImageMutation.mutateAsync({
          title: uploadTitle,
          description: uploadDescription,
          category: selectedCategory,
          base64Data,
          fileName: uploadFile.name,
          mimeType: uploadFile.type,
        });
      };
      reader.readAsDataURL(uploadFile);
    } catch (error) {
      toast.error("Failed to process file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddGoogleDrive = async () => {
    if (!googleDriveFileId || !googleDriveUrl || !uploadTitle) {
      toast.error("Please fill in all required fields");
      return;
    }

    await addGoogleDriveMutation.mutateAsync({
      title: uploadTitle,
      description: uploadDescription,
      category: selectedCategory,
      googleDriveFileId,
      googleDriveUrl,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage images and services for your landscaping website</p>
        </div>

        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Image Gallery</CardTitle>
                <CardDescription>View and manage all uploaded images</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryImages?.map((image) => (
                    <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{image.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{image.description}</p>
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              // TODO: Implement edit functionality
                              toast.info("Edit functionality coming soon");
                            }}
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this image?")) {
                                deleteImageMutation.mutate({ id: image.id });
                              }
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {!categoryImages || categoryImages.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No images found in this category</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Local Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload Local Image</CardTitle>
                  <CardDescription>Upload images from your computer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <Input
                      placeholder="Image title"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <Textarea
                      placeholder="Image description"
                      value={uploadDescription}
                      onChange={(e) => setUploadDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image File *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                        <p className="text-sm text-gray-600">
                          {uploadFile ? uploadFile.name : "Click to upload or drag and drop"}
                        </p>
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={handleFileUpload}
                    disabled={isUploading || uploadImageMutation.isPending}
                    className="w-full"
                  >
                    {isUploading || uploadImageMutation.isPending ? "Uploading..." : "Upload Image"}
                  </Button>
                </CardContent>
              </Card>

              {/* Google Drive Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Add Google Drive Image</CardTitle>
                  <CardDescription>Link images from Google Drive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <Input
                      placeholder="Image title"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <Textarea
                      placeholder="Image description"
                      value={uploadDescription}
                      onChange={(e) => setUploadDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Google Drive File ID *</label>
                    <Input
                      placeholder="e.g., 1ABC123XYZ"
                      value={googleDriveFileId}
                      onChange={(e) => setGoogleDriveFileId(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Get the file ID from the Google Drive URL: drive.google.com/file/d/<strong>FILE_ID</strong>/view
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Google Drive URL *</label>
                    <Input
                      placeholder="https://drive.google.com/uc?export=view&id=..."
                      value={googleDriveUrl}
                      onChange={(e) => setGoogleDriveUrl(e.target.value)}
                    />
                  </div>

                  <Button
                    onClick={handleAddGoogleDrive}
                    disabled={addGoogleDriveMutation.isPending}
                    className="w-full"
                  >
                    {addGoogleDriveMutation.isPending ? "Adding..." : "Add Google Drive Image"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Services Management</CardTitle>
                <CardDescription>Manage service descriptions and images</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services?.map((service) => (
                    <div key={service.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{service.titleEn}</h3>
                          <p className="text-sm text-gray-600">{service.titleZh}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Edit2 size={16} />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{service.descriptionEn}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
