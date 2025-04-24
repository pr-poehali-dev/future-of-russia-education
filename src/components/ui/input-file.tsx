
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Upload, FileIcon, CheckCircle2, XCircle } from "lucide-react";

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileSelect?: (files: FileList | null) => void;
  buttonText?: string;
  showPreview?: boolean;
  showFileDetails?: boolean;
  maxSizeMB?: number;
  containerClassName?: string;
  multiple?: boolean;
}

export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  ({
    className,
    type,
    onFileSelect,
    buttonText = "Выбрать файл",
    showPreview = false,
    showFileDetails = true,
    maxSizeMB = 10,
    containerClassName,
    multiple = false,
    accept,
    ...props
  }, ref) => {
    const [selectedFiles, setSelectedFiles] = React.useState<FileList | null>(null);
    const [preview, setPreview] = React.useState<string[]>([]);
    const [fileErrors, setFileErrors] = React.useState<{[key: string]: string}>({});
    const inputRef = React.useRef<HTMLInputElement>(null);

    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;

      setSelectedFiles(files);
      
      // Validate files
      const errors: {[key: string]: string} = {};
      Array.from(files).forEach(file => {
        if (file.size > maxSizeBytes) {
          errors[file.name] = `Файл превышает максимальный размер ${maxSizeMB} MB`;
        }
      });
      setFileErrors(errors);

      // Create previews for images
      if (showPreview) {
        const newPreviews: string[] = [];
        Array.from(files).forEach(file => {
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target?.result) {
                newPreviews.push(e.target.result as string);
                setPreview([...newPreviews]);
              }
            };
            reader.readAsDataURL(file);
          }
        });
      }

      if (onFileSelect) {
        onFileSelect(files);
      }
    };

    const clearFiles = () => {
      setSelectedFiles(null);
      setPreview([]);
      setFileErrors({});
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      if (onFileSelect) {
        onFileSelect(null);
      }
    };

    // Format file size to KB, MB
    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const isImage = (fileName: string): boolean => {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      return imageExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
    };

    return (
      <div className={cn("space-y-2", containerClassName)}>
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
          multiple={multiple}
          accept={accept}
          {...props}
        />
        
        <div className="flex flex-wrap gap-2">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            {buttonText}
          </Button>
          
          {selectedFiles && selectedFiles.length > 0 && (
            <Button 
              type="button" 
              variant="outline" 
              className="text-red-500 hover:text-red-700"
              onClick={clearFiles}
            >
              Очистить
            </Button>
          )}
        </div>
        
        {selectedFiles && showFileDetails && selectedFiles.length > 0 && (
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {Array.from(selectedFiles).map((file, index) => (
              <div 
                key={`${file.name}-${index}`}
                className={cn(
                  "text-sm border rounded-md p-2 flex items-start",
                  fileErrors[file.name] ? "border-red-300 bg-red-50" : "border-gray-200"
                )}
              >
                <div className="mr-2">
                  {isImage(file.name) ? (
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs">IMG</span>
                    </div>
                  ) : (
                    <FileIcon className="h-8 w-8 text-blue-500" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-medium truncate" style={{maxWidth: '200px'}}>{file.name}</p>
                  <p className="text-gray-500">{formatFileSize(file.size)}</p>
                  {fileErrors[file.name] && (
                    <p className="text-red-500 text-xs mt-1">{fileErrors[file.name]}</p>
                  )}
                </div>
                {fileErrors[file.name] ? (
                  <XCircle className="h-5 w-5 text-red-500 mt-1" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                )}
              </div>
            ))}
          </div>
        )}

        {showPreview && preview.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {preview.map((src, index) => (
              <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                <img 
                  src={src} 
                  alt={`Preview ${index}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

InputFile.displayName = "InputFile";
