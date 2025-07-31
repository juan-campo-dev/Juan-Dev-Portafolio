"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Download, ArrowLeft } from "lucide-react"
import type { PartialFormValues } from "@/lib/form-schema"
import { submitRodinJob, checkJobStatus, downloadModel } from "@/lib/api-service"
import ModelViewer from "./model-viewer"
import Form from "./form"
import StatusIndicator from "./status-indicator"
import OptionsDialog from "./options-dialog"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Rodin() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [isPolling, setIsPolling] = useState(false)
  const [modelUrl, setModelUrl] = useState<string | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [jobStatuses, setJobStatuses] = useState<Array<{ uuid: string; status: string }>>([])
  const [showOptions, setShowOptions] = useState(false)
  const [showPromptContainer, setShowPromptContainer] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const [options, setOptions] = useState({
    condition_mode: "concat" as const,
    quality: "medium" as const,
    geometry_file_format: "glb" as const,
    use_hyper: false,
    tier: "Regular" as const,
    TAPose: false,
    material: "PBR" as const,
  })

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
        document.documentElement.style.overflow = ""
      }
    }
  }, [isMobile])

  const handleOptionsChange = (newOptions: typeof options) => {
    setOptions(newOptions)
  }

  async function handleStatusCheck(subscriptionKey: string, taskUuid: string) {
    try {
      setIsPolling(true)

      const data = await checkJobStatus(subscriptionKey)
      if (!data.jobs || !Array.isArray(data.jobs) || data.jobs.length === 0) {
        throw new Error("No jobs found in status response")
      }

      setJobStatuses(data.jobs)

      const allJobsDone = data.jobs.every((job: any) => job.status === "Done")
      const anyJobFailed = data.jobs.some((job: any) => job.status === "Failed")

      if (allJobsDone) {
        setIsPolling(false)
        try {
          const downloadData = await downloadModel(taskUuid)
          if (downloadData.error && downloadData.error !== "OK") {
            throw new Error(`Download error: ${downloadData.error}`)
          }

          if (downloadData.list && downloadData.list.length > 0) {
            const glbFile = downloadData.list.find((file: { name: string }) =>
              file.name.toLowerCase().endsWith(".glb")
            )

            if (glbFile) {
              const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(glbFile.url)}`
              setModelUrl(proxyUrl)
              setDownloadUrl(glbFile.url)
              setIsLoading(false)
              setShowPromptContainer(false)
            } else {
              setError("No GLB file found in the results")
              setIsLoading(false)
            }
          } else {
            setError("No files available for download")
            setIsLoading(false)
          }
        } catch (downloadErr) {
          setError(`Failed to download model: ${downloadErr instanceof Error ? downloadErr.message : "Unknown error"}`)
          setIsLoading(false)
        }
      } else if (anyJobFailed) {
        setIsPolling(false)
        setError("Generation task failed")
        setIsLoading(false)
      } else {
        setTimeout(() => handleStatusCheck(subscriptionKey, taskUuid), 3000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to check status")
      setIsPolling(false)
      setIsLoading(false)
    }
  }

  async function handleSubmit(values: PartialFormValues) {
    setIsLoading(true)
    setError(null)
    setResult(null)
    setModelUrl(null)
    setDownloadUrl(null)
    setJobStatuses([])

    try {
      const formData = new FormData()

      if (values.images && values.images.length > 0) {
        values.images.forEach((image: File) => {
          formData.append("images", image)
        })
      }

      if (values.prompt) {
        formData.append("prompt", values.prompt)
      }

      formData.append("condition_mode", options.condition_mode)
      formData.append("geometry_file_format", options.geometry_file_format)
      formData.append("material", options.material)
      formData.append("quality", options.quality)
      formData.append("use_hyper", options.use_hyper.toString())
      formData.append("tier", options.tier)
      formData.append("TAPose", options.TAPose.toString())
      formData.append("mesh_mode", "Quad")
      formData.append("mesh_simplify", "true")
      formData.append("mesh_smooth", "true")

      const data = await submitRodinJob(formData)
      setResult(data)

      if (data.jobs && data.jobs.subscription_key && data.uuid) {
        handleStatusCheck(data.jobs.subscription_key, data.uuid)
      } else {
        setError("Missing required data for status checking")
        setIsLoading(false)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank")
    }
  }

  const handleBack = () => {
    setShowPromptContainer(true)
  }

  const ExternalLinks = () => (
    <div className="flex items-center space-x-6">
      <a
        href="https://hyper3d.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-white hover:text-gray-300 transition-colors tracking-normal"
      >
        <span className="mr-1">Website</span>
        <ExternalLink className="h-4 w-4" />
      </a>
      <a
        href="https://developer.hyper3d.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-white hover:text-gray-300 transition-colors tracking-normal"
      >
        <span className="mr-1">API Docs</span>
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  )

  return (
    <div className="relative h-[100dvh] w-full">
      <div className="absolute inset-0 z-0">
        <ModelViewer modelUrl={isLoading ? null : modelUrl} />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-6 left-6 pointer-events-auto">
          <h1 className="text-3xl text-white font-normal tracking-normal">3D Model Generator</h1>
          <p className="text-gray-400 text-sm mt-1 tracking-normal">Powered by Hyper3D Rodin</p>
        </div>

        {!isMobile && (
          <div className="absolute top-6 right-6 pointer-events-auto">
            <ExternalLinks />
          </div>
        )}

        <StatusIndicator isLoading={isLoading} jobStatuses={jobStatuses} />

        {error && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-gray-900/80 text-white px-4 py-2 rounded-md tracking-normal">
            {error}
          </div>
        )}

        {!isLoading && modelUrl && !showPromptContainer && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 pointer-events-auto">
            <Button
              onClick={handleBack}
              className="bg-black hover:bg-gray-900 text-white border border-white/20 rounded-full px-4 py-2 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="tracking-normal">Back</span>
            </Button>

            <Button
              onClick={handleDownload}
              className="bg-white hover:bg-gray-200 text-black rounded-full px-4 py-2 flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span className="tracking-normal">Download</span>
            </Button>
          </div>
        )}

        {showPromptContainer && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4 sm:px-0 pointer-events-auto">
            <Form isLoading={isLoading} onSubmit={handleSubmit} onOpenOptions={() => setShowOptions(true)} />
            {isMobile && (
              <div className="mt-4 flex justify-center pointer-events-auto">
                <ExternalLinks />
              </div>
            )}
          </div>
        )}
      </div>

      <OptionsDialog
        open={showOptions}
        onOpenChange={setShowOptions}
        options={options}
        onOptionsChange={handleOptionsChange}
      />
    </div>
  )
}
