'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Upload } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function FileUploadPage() {
  const [files, setFiles] = useState([])
  const [isPublic, setIsPublic] = useState(false)
  const [isCompressed, setIsCompressed] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [linkToOpen, setLinkToOpen] = useState('')

  const onDrop = useCallback((acceptedFiles:any) => {
    setFiles(acceptedFiles.map((file:any) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleOpenLink = () => {
    setLinkToOpen('https://example.com')
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">File Upload Center</h1>
      
      <div 
        {...getRootProps()} 
        className={`w-full max-w-2xl h-64 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        {
          files.length > 0 ? (
            <div className="text-center">
              <p className="text-lg font-semibold">{files.length} file(s) selected</p>
              <ul className="mt-2">
                {files.map((file:File) => (
                  <li key={file.name} className="text-sm text-gray-600">{file.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Drag 'n' drop some files here, or click to select files</p>
            </div>
          )
        }
      </div>

      <div className="w-full max-w-md mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="public-toggle" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Make files public</Label>
          <Switch
            id="public-toggle"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="compress-toggle" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Compress files</Label>
          <Switch
            id="compress-toggle"
            checked={isCompressed}
            onCheckedChange={setIsCompressed}
          />
        </div>
        <Button onClick={handleOpenLink} className="w-full">Open Link</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Open External Link</DialogTitle>
            <DialogDescription>
              Are you sure you want to open this external link?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => window.open(linkToOpen, '_blank')}>
              Open Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}