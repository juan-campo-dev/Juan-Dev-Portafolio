"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ExternalLink, Download, ArrowLeft } from "lucide-react";
import type { PartialFormValues } from "@/lib/form-schema";
import {
  submitRodinJob,
  checkJobStatus,
  downloadModel,
} from "@/lib/api-service";
import Form from "@/components/form";
import StatusIndicator from "@/components/status-indicator";
import OptionsDialog from "@/components/options-dialog";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import SectionHeading from "@/components/shared/section-heading";

// Three.js + react-three-fiber + drei pesan ~150KB. Los cargamos solo cuando
// el laboratorio se monta en el cliente.
const ModelViewer = dynamic(() => import("@/components/model-viewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-black bg-radial-gradient" aria-hidden />
  ),
});

export default function RodinPlayground() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [jobStatuses, setJobStatuses] = useState<
    Array<{ uuid: string; status: string }>
  >([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showPromptContainer, setShowPromptContainer] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [options, setOptions] = useState({
    condition_mode: "concat" as const,
    quality: "medium" as const,
    geometry_file_format: "glb" as const,
    use_hyper: false,
    tier: "Regular" as const,
    TAPose: false,
    material: "PBR" as const,
  });

  // Prevent body scroll on mobile
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      };
    }
  }, [isMobile]);

  const handleOptionsChange = (newOptions: any) => {
    setOptions(newOptions);
  };

  async function handleStatusCheck(subscriptionKey: string, taskUuid: string) {
    try {
      setIsPolling(true);

      const data = await checkJobStatus(subscriptionKey);
      console.log("Status response:", data);

      // Check if jobs array exists
      if (!data.jobs || !Array.isArray(data.jobs) || data.jobs.length === 0) {
        throw new Error("No jobs found in status response");
      }

      // Update job statuses
      setJobStatuses(data.jobs);

      // Check status of all jobs
      const allJobsDone = data.jobs.every((job: any) => job.status === "Done");
      const anyJobFailed = data.jobs.some(
        (job: any) => job.status === "Failed",
      );

      if (allJobsDone) {
        setIsPolling(false);

        // Get the download URL using the task UUID
        try {
          const downloadData = await downloadModel(taskUuid);
          console.log("Download response:", downloadData);

          // Check if there's an error in the download response
          if (downloadData.error && downloadData.error !== "OK") {
            throw new Error(`Download error: ${downloadData.error}`);
          }

          // Find the first GLB file to display in the 3D viewer
          if (downloadData.list && downloadData.list.length > 0) {
            const glbFile = downloadData.list.find((file: { name: string }) =>
              file.name.toLowerCase().endsWith(".glb"),
            );

            if (glbFile) {
              const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(
                glbFile.url,
              )}`;
              setModelUrl(proxyUrl);
              setDownloadUrl(glbFile.url);
              setIsLoading(false);
              setShowPromptContainer(false);
            } else {
              setError("No se encontró archivo GLB en los resultados");
              setIsLoading(false);
            }
          } else {
            setError("No hay archivos disponibles para descargar");
            setIsLoading(false);
          }
        } catch (downloadErr) {
          setError(
            `Fallo al descargar el modelo: ${
              downloadErr instanceof Error
                ? downloadErr.message
                : "Error desconocido"
            }`,
          );
          setIsLoading(false);
        }
      } else if (anyJobFailed) {
        setIsPolling(false);
        setError("La tarea de generación falló");
        setIsLoading(false);
      } else {
        // Still processing, poll again after a delay
        setTimeout(() => handleStatusCheck(subscriptionKey, taskUuid), 3000);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Fallo al verificar el estado",
      );
      setIsPolling(false);
      setIsLoading(false);
    }
  }
  async function handleSubmit(values: PartialFormValues) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setModelUrl(null);
    setDownloadUrl(null);
    setJobStatuses([]);

    try {
      const formData = new FormData();

      values.images?.forEach((image: File) => {
        formData.append("images", image);
      });

      if (values.prompt) {
        formData.append("prompt", values.prompt);
      }

      // 💡 Asegúrate de que las opciones estén definidas
      formData.append("condition_mode", options.condition_mode);
      formData.append("geometry_file_format", options.geometry_file_format);
      formData.append("material", options.material);
      formData.append("quality", options.quality);
      formData.append("use_hyper", options.use_hyper.toString());
      formData.append("tier", options.tier);
      formData.append("TAPose", options.TAPose.toString());
      formData.append("mesh_mode", "Quad");
      formData.append("mesh_simplify", "true");
      formData.append("mesh_smooth", "true");

      const data = await submitRodinJob(formData);
      console.log("Generation response:", data);

      setResult(data);

      if (data.jobs && data.jobs.subscription_key && data.uuid) {
        handleStatusCheck(data.jobs.subscription_key, data.uuid);
      } else {
        setError("Faltan datos requeridos para la verificación de estado");
        setIsLoading(false);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocurrió un error desconocido",
      );
      setIsLoading(false);
    }
  }

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    }
  };

  const handleBack = () => {
    setShowPromptContainer(true);
  };

  const ExternalLinks = () => (
    <div className="flex items-center space-x-6">
      <a
        href="https://hyper3d.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-white hover:text-gray-300 transition-colors tracking-normal"
      >
        <span className="mr-1">Sitio Web</span>
        <ExternalLink className="h-4 w-4" />
      </a>
      <a
        href="https://developer.hyper3d.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-white hover:text-gray-300 transition-colors tracking-normal"
      >
        <span className="mr-1">Documentación API</span>
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );

  return (
    <section
      id="playground"
      className="py-20 bg-radial-gradient-section text-white"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Laboratorio"
          subtitle="Experimenta con la Generación de Modelos 3D"
        />

        <div className="relative h-[70vh] w-full rounded-lg overflow-hidden shadow-xl border border-gray-700">
          {/* Full-screen canvas */}
          <div className="absolute inset-0 z-0">
            <ModelViewer modelUrl={isLoading ? null : modelUrl} />
          </div>

          {/* Overlay UI */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Loading indicator */}
            <StatusIndicator isLoading={isLoading} jobStatuses={jobStatuses} />

            {/* Error message */}
            {error && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-gray-900/80 text-white px-4 py-2 rounded-md tracking-normal">
                {error}
              </div>
            )}

            {/* Model controls when model is loaded */}
            {!isLoading && modelUrl && !showPromptContainer && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 pointer-events-auto">
                <Button
                  onClick={handleBack}
                  className="bg-black hover:bg-gray-900 text-white border border-white/20 rounded-full px-4 py-2 flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="tracking-normal">Volver</span>
                </Button>

                <Button
                  onClick={handleDownload}
                  className="bg-white hover:bg-gray-200 text-black rounded-full px-4 py-2 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span className="tracking-normal">Descargar</span>
                </Button>
              </div>
            )}

            {/* Input field at bottom */}
            {showPromptContainer && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4 sm:px-0 pointer-events-auto">
                <Form
                  isLoading={isLoading}
                  onSubmit={handleSubmit}
                  onOpenOptions={() => setShowOptions(true)}
                />

                {/* Links below prompt on mobile */}
                {isMobile && (
                  <div className="mt-4 flex justify-center pointer-events-auto">
                    <ExternalLinks />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Options Dialog/Drawer */}
          <OptionsDialog
            open={showOptions}
            onOpenChange={setShowOptions}
            options={options}
            onOptionsChange={handleOptionsChange}
          />
        </div>
      </div>
    </section>
  );
}
