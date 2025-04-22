
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { UploadCloud } from "lucide-react"

interface InputFileProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  accept?: string
  icon?: React.ReactNode
  buttonText?: string
  onFileSelect?: (files: FileList | null) => void
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  ({ className, label, accept, buttonText = "Выбрать файл", icon, onFileSelect, variant = "default", ...props }, ref) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    const [selectedFileName, setSelectedFileName] = React.useState<string>("")

    const handleClick = () => {
      fileInputRef.current?.click()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      setSelectedFileName(files && files.length > 0 ? files[0].name : "")
      if (onFileSelect) {
        onFileSelect(files)
      }
    }

    return (
      <div className={cn("grid w-full gap-1.5", className)}>
        {label && <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={handleClick}
            variant={variant}
            className="flex items-center gap-2"
          >
            {icon || <UploadCloud className="h-4 w-4" />}
            {buttonText}
          </Button>
          {selectedFileName && (
            <span className="text-sm text-muted-foreground truncate max-w-[200px]">
              {selectedFileName}
            </span>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          ref={(e) => {
            if (ref) {
              if (typeof ref === 'function') {
                ref(e)
              } else {
                ref.current = e
              }
            }
            fileInputRef.current = e
          }}
          accept={accept}
          onChange={handleChange}
          {...props}
        />
      </div>
    )
  }
)

InputFile.displayName = "InputFile"

export { InputFile }
